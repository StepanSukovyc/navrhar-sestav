//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GAlCode.cs                                   </Name>
//    <Description> ALCODE kódování                                             </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                  </Copyright>
//    <Created>     2007-05-21                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Runtime.InteropServices;

namespace Gordic.General
{
    /// <summary>
    /// Metoda kruptování ALCODE
    /// </summary>
    public enum GAlCodeMethod 
    {
        /// <summary>
        /// Nekódovanáno
        /// </summary>
        Uncoded = 0,
        /// <summary>
        /// Normální (měkká)
        /// </summary>
        Normal = 0x2440,
        /// <summary>
        /// Tvrdá (pouze čtení)
        /// </summary>
        Hard = 0x2121,
    };

    /// <summary>
    /// Třída pro ALCODE algoritmus.
    /// </summary>
    [System.Security.SecurityCritical]
    internal sealed class GAlCode
    {

        private static byte[] ALCODE_HEADER =
            System.Text.Encoding.ASCII.GetBytes(
                "\t!!! POZOR !!!\r\n"
                + "Tento soubor je kodovany!\r\n"
                + "V zadnem pripade ho nemente a neukladejte\r\n"
                + "Mohli by jste tim poskodit originalni obsah\r\n"
                + "\t!!! POZOR !!!\r\n"
            );

        /// <summary>
        /// Délka hlavičky kódovaného souboru
        /// </summary>
        public static int HeaderLength
        {
            get { return ALCODE_HEADER.Length + 16; }
        }

        private const int ALCODE_MAGIC_CODE1 = 0x2440;
        private const int ALCODE_MAGIC_CODE2 = 0x2121;

        static byte[] InTable = new byte[]
        {
            0xD9,0xAD,0x3F,0x3C,0x80,0x69,0xBC,0xAF,0x90,0x8B,0x0A,0x05,0xCF,0x0D,0xE7,0x11,
            0x23,0x08,0x30,0xBF,0x6E,0x1B,0xD5,0x40,0x9D,0x9C,0x1A,0xE1,0xAC,0x9F,0xF1,0x16,
            0xFB,0xFA,0xDF,0xDE,0xB1,0xC4,0x5E,0xDD,0xE0,0xCA,0x77,0x78,0xE8,0xA5,0x54,0xA6,
            0xDB,0xF4,0xCE,0x5D,0x12,0x62,0x52,0x5A,0x56,0x6C,0xBA,0xCC,0x68,0x55,0x49,0x72,
            0xD7,0xA2,0xDC,0x29,0x22,0x6F,0x98,0x76,0x10,0x48,0xC0,0x8C,0xB5,0xB6,0xA4,0x97,
            0x01,0x9A,0xEB,0x03,0x5B,0xE9,0x0B,0x3A,0x9B,0xBB,0x41,0xC9,0x95,0x34,0x3B,0x2B,
            0xF5,0xEC,0xEE,0xB8,0xE5,0x88,0xB0,0x8D,0x84,0x6B,0x26,0xEF,0x0C,0x04,0xFF,0x9E,
            0x38,0x94,0x02,0xF3,0xFE,0x0E,0xFD,0x2C,0x32,0xAB,0x64,0x4F,0xB2,0x0F,0xA1,0x1C,
            0x85,0xF8,0x31,0x43,0xF2,0x2A,0x61,0x28,0xC7,0x89,0x36,0xA0,0x00,0x7C,0x59,0x4E,
            0xC2,0xC8,0xA9,0xE4,0xB3,0xF7,0x15,0x45,0x20,0xA8,0x51,0xBD,0x63,0x70,0x2F,0x18,
            0xC1,0x5F,0x39,0xC6,0x25,0x81,0x37,0x4D,0x60,0x82,0x86,0x06,0x7D,0x74,0x4B,0xAE,
            0x5C,0xCB,0x67,0xE6,0x27,0xD6,0x3E,0x1D,0x09,0xC5,0xD3,0xAA,0x58,0xDA,0xD8,0x65,
            0xED,0x46,0xD4,0x91,0x92,0x14,0xF0,0x24,0x87,0xA3,0xD2,0x42,0x96,0xEA,0x8A,0x1F,
            0x6A,0x13,0xB9,0x21,0x7F,0x2D,0xD1,0x93,0x57,0x83,0x8F,0xF6,0x17,0xA7,0x73,0xCD,
            0xB4,0x7B,0x7A,0x44,0xE2,0x50,0xF9,0x3D,0x47,0x33,0x07,0x75,0x53,0x8E,0xE3,0x2E,
            0xFC,0x79,0xC3,0x4A,0xB7,0x71,0x19,0xBE,0x6D,0x4C,0x35,0x7E,0xD0,0x1E,0x66,0x99,
        };

        static byte[] OutTable = new byte[]
        {
            0x8C,0x50,0x72,0x53,0x6D,0x0B,0xAB,0xEA,0x11,0xB8,0x0A,0x56,0x6C,0x0D,0x75,0x7D,
            0x48,0x0F,0x34,0xD1,0xC5,0x96,0x1F,0xDC,0x9F,0xF6,0x1A,0x15,0x7F,0xB7,0xFD,0xCF,
            0x98,0xD3,0x44,0x10,0xC7,0xA4,0x6A,0xB4,0x87,0x43,0x85,0x5F,0x77,0xD5,0xEF,0x9E,
            0x12,0x82,0x78,0xE9,0x5D,0xFA,0x8A,0xA6,0x70,0xA2,0x57,0x5E,0x03,0xE7,0xB6,0x02,
            0x17,0x5A,0xCB,0x83,0xE3,0x97,0xC1,0xE8,0x49,0x3E,0xF3,0xAE,0xF9,0xA7,0x8F,0x7B,
            0xE5,0x9A,0x36,0xEC,0x2E,0x3D,0x38,0xD8,0xBC,0x8E,0x37,0x54,0xB0,0x33,0x26,0xA1,
            0xA8,0x86,0x35,0x9C,0x7A,0xBF,0xFE,0xB2,0x3C,0x05,0xD0,0x69,0x39,0xF8,0x14,0x45,
            0x9D,0xF5,0x3F,0xDE,0xAD,0xEB,0x47,0x2A,0x2B,0xF1,0xE2,0xE1,0x8D,0xAC,0xFB,0xD4,
            0x04,0xA5,0xA9,0xD9,0x68,0x80,0xAA,0xC8,0x65,0x89,0xCE,0x09,0x4B,0x67,0xED,0xDA,
            0x08,0xC3,0xC4,0xD7,0x71,0x5C,0xCC,0x4F,0x46,0xFF,0x51,0x58,0x19,0x18,0x6F,0x1D,
            0x8B,0x7E,0x41,0xC9,0x4E,0x2D,0x2F,0xDD,0x99,0x92,0xBB,0x79,0x1C,0x01,0xAF,0x07,
            0x66,0x24,0x7C,0x94,0xE0,0x4C,0x4D,0xF4,0x63,0xD2,0x3A,0x59,0x06,0x9B,0xF7,0x13,
            0x4A,0xA0,0x90,0xF2,0x25,0xB9,0xA3,0x88,0x91,0x5B,0x29,0xB1,0x3B,0xDF,0x32,0x0C,
            0xFC,0xD6,0xCA,0xBA,0xC2,0x16,0xB5,0x40,0xBE,0x00,0xBD,0x30,0x42,0x27,0x23,0x22,
            0x28,0x1B,0xE4,0xEE,0x93,0x64,0xB3,0x0E,0x2C,0x55,0xCD,0x52,0x61,0xC0,0x62,0x6B,
            0xC6,0x1E,0x84,0x73,0x31,0x60,0xDB,0x95,0x81,0xE6,0x21,0x20,0xF0,0x76,0x74,0x6E,
        };


        ushort m_HeaderWord;
        ushort m_CRC;
        byte m_code; //kodovaci znak
        byte m_start;

        /// <summary>
        /// konstruktor. Čte výchozí nastavení z INI souboru
        /// </summary>
        public GAlCode(GAlCodeMethod method)
        {
            m_HeaderWord = (ushort)method;
            m_CRC = 0;
            m_start = m_code = ReadIni();
        }

        public GAlCodeMethod Method
        {
            get { return (GAlCodeMethod)m_HeaderWord; }
        }

        /// <summary>
        /// Nastavení pozice pro kódování
        /// </summary>
        public void Seek(long pos)
        {
            m_code = (byte)(pos + m_start);
        }

        private FileInfo FindGinisIni()
        {
            string[] l_paths = Environment.GetEnvironmentVariable("Path").Split(';');
            foreach (string path in l_paths)
            {
                if (string.IsNullOrWhiteSpace(path) || path.IndexOfAny(Path.GetInvalidPathChars()) >= 0) continue;
                DirectoryInfo di;
                try
                {
                    di = new DirectoryInfo(path);
                }
                catch { continue; }
                if (di.Exists)
                {
                    FileInfo[] fis = di.GetFiles("ginis.ini");
                    if (fis.Length > 0)
                        return fis[0];
                }
            }
            return null;
        }

        private byte ReadIni()
        {
            FileInfo l_ginisini = FindGinisIni();
            if (l_ginisini == null)
                return 0;

            using (StreamReader sr = l_ginisini.OpenText())
            {
                while (true)
                {
                    string line = sr.ReadLine();
                    if (line == null) //EOF
                        return 0;
                    else line = line.TrimStart();
                    if (line.StartsWith("alcode="))
                    {
                        return Byte.Parse(line.Split('=')[1]);
                    }
                }
            }
        }

        /// <summary>
        /// Zakóduje jeden byte
        /// </summary>
        public byte Encrypt(byte b)
        {
            switch(Method)
            {
                case GAlCodeMethod.Normal : return Encrypt_N(b);
                default: throw new GNotImplementedException(23200354);
            }
        }

        /// <summary>
        /// Zakóduje jeden byte
        /// </summary>
        public byte Encrypt_N(byte b)
        {
            switch (b)
            {
                default:
                    m_CRC += b;
                    b = InTable[b];
                    b ^= m_code;
                    if (b == 0x0D || b == 0x0A || b == 0x1A)
                        b ^= m_code;
                    m_code++;
                    return b;
                case 0x0D:
                case 0x0A:
                case 0x1A:
                    m_code++;
                    return b;
            }
        }

        /// <summary>
        /// Dekóduje jeden byte
        /// </summary>
        public byte Decrypt_N(byte b)
        {
            switch (b)
            {
                default:
                    m_CRC += b;
                    b ^= m_code;
                    if (b == 0x0D || b == 0x0A || b == 0x1A)
                        b ^= m_code;
                    b = OutTable[b];
                    m_code++;
                    return b;
                case 0x0D:
                case 0x0A:
                case 0x1A:
                    m_code++;
                    return b;
            }
        }

        /// <summary>
        /// Hlavička kódovaného souboru (je vždy <see cref="HeaderLength"/> dlouhá)
        /// </summary>
        public byte[] Header
        {
            get
            {
                byte[] h = new byte[HeaderLength];
                ALCODE_HEADER.CopyTo(h, 0);
                MemoryStream ms = new MemoryStream(h, ALCODE_HEADER.Length, 16, true);
                using (BinaryWriter bw = new BinaryWriter(ms))
                {
                    bw.Write(m_HeaderWord);
                    bw.Write((uint)0);
                    bw.Write((uint)0);
                    bw.Write((uint)0);
                    bw.Write(m_CRC);
                }
                return h;
            }
        }

        internal static GAlCodeMethod DetectHeader(Stream s, bool seekBackUncoded, bool seekBackCoded)
        {
            ushort l_HeaderWord = 0;
            long oldPos = s.Position;
            try
            {
                byte[] buf = new byte[HeaderLength];
                if (s.Read(buf, 0, HeaderLength) < HeaderLength) return GAlCodeMethod.Uncoded;
                for(int i=0;i<ALCODE_HEADER.Length;i++)
                {
                    if (buf[i] != ALCODE_HEADER[i]) return GAlCodeMethod.Uncoded;
                }
                using(BinaryReader br = new BinaryReader(new MemoryStream(buf,ALCODE_HEADER.Length, 16, false)))
                {
                    l_HeaderWord = br.ReadUInt16();
                    return (GAlCodeMethod)l_HeaderWord;
                }
            }
            finally
            {
                if (s.CanSeek)
                {
                    if((seekBackUncoded && l_HeaderWord==0) || (seekBackCoded && l_HeaderWord>0))
                        s.Position = oldPos;
                }
            }
        }
    }

    [System.Security.SecurityCritical]
    internal class GHardCode
    {
        static byte[] TreeData = new byte[] 
        {
           0,  3,  0,  3,  0,  3,  0,  3,  0,  3,255,  4,101,  3,  0,  3, 74,
           3,  0,  3, 74,  0, 72,  0,  0,  3, 66,  0, 68,  0, 76,  3, 67,  0,
          76,  0,  0,  3,  0,  3,  0,  3, 88,  0,  0,  3, 81,  0, 87,  0, 70,
           0, 71,  0,101,  3,  0,  3,  0,  3, 40,  3, 40,  0, 41,  0, 41,  3,
          90,  0, 86,  0,  0,  3, 48,  0, 49,  0,  0,  3,  0,  3, 50,  0, 51,
           0,  0,  3,  0,  3, 43,  0, 45,  0,  0,  3, 42,  0, 47,  0,101,  3,
           0,  3,  0,  3, 33,  3,118,  0, 63,  0, 63,  3, 77,  0, 78,  0,  0,
           3, 44,  3, 44,  0, 46,  0, 46,  3, 80,  0, 82,  0,  0,  3,  0,  3,
           0,  3,115,  0, 83,  0,116,  3,116,  0, 84,  0,  0,  3,  0,  3, 34,
           3, 34,  3, 34,  0, 35,  0,  0,  3,113,  0,119,  0,  0,  3,100,  0,
          99,  0,  0,  3, 36,  3, 98,  0,  0,  3, 79,  0, 36,  0,  0,  3,  0,
           3,102,  0,  0,  3,123,  0,125,  0,  0,  3, 33,  0,110,  3,124,  0,
         126,  0,  0,  3, 65,  3, 65,  3, 65,  0, 69,  0, 69,  3, 97,  3, 97,
           0,255,  8,101,  0, 69,  3,105,  3,105,  3,105,  0,  0,  3,104,  0,
         106,  0, 73,  3,  0,  3,109,  0,110,  0, 73,  0,  0,  3,  0,  3, 60,
           3,  0,  3, 60,  0, 62,  0, 52,  0,  0,  3, 53,  0, 54,  0,  0,  3,
           0,  3, 55,  0, 56,  0,  0,  3, 57,  0, 61,  0,  0,  3,  0,  3,  0,
           3,  0,  3,111,  0,254,  0,  0,  3,117,  0, 85,  0,  0,  3,  0,  3,
           0,  3,121,  0, 75,  0,  0,  3,107,  0, 89,  0, 32,  0,  0,  3,  0,
           3,  0,  3,  0,  3,  0,  3,  0,  3,  0,  3,  0,  3,  1,  0, 11,  0,
           0,  3,  3,  0,  2,  0,  0,  3,  0,  3,  5,  0,  7,  0,  0,  3, 14,
           0,  4,  0,  0,  3,  0,  3,  0,  3,  9,  0,  6,  0, 10,  3, 10,  0,
          39,  0,  0,  3, 12,  3, 15,  0, 13,  0,  0,  3,  8,  0, 12,  0,  0,
           3,  0,  3,  0,  3,  0,  3, 23,  0, 22,  0,  0,  3, 21,  0, 20,  0,
           0,  3,  0,  3, 19,  0, 18,  0, 22,  3, 17,  0, 16,  0,  0,  3,  0,
           3,  0,  3, 25,  0, 31,  0,  0,  3, 26,  0, 28,  0,  0,  3,  0,  3,
          30,  0, 27,  0,  0,  3, 24,  0, 29,  0,  0,  3,  0,  3,  0,  3, 37,
           0, 58,  0,  0,  3, 59,  0, 64,  0,  0,  3,  0,  3,  0,  3, 91,  0,
          93,  0,  0,  3, 92,  0, 95,  0,  0,  3,  0,  3, 96,  0, 94,  0,120,
           0,  0,  3,  0,  3,  0,  3,  0,  3,108,  0,112,  0,  0,  3,114,  0,
         122,  0,103,  3,103,  0,  0,  3,127,  3,  0,  3,127,  0,129,  0,  0,
           3,130,  0,131,  0,128,  0,  0,  3,  0,  3,  0,  3,  0,  3,  0,  3,
         132,  0,161,  0,  0,  3,150,  0,135,  0,  0,  3,  0,  3,171,  0,137,
           0,  0,  3,138,  0,159,  0,  0,  3,  0,  3,  0,  3,157,  0,147,  0,
           0,  3,153,  0,165,  0,  0,  3,  0,  3,166,  0,133,  0,  0,  3,136,
           0,158,  0,  0,  3,  0,  3,  0,  3,  0,  3,167,  0,148,  0,170,  3,
         170,  0,172,  0,  0,  3,  0,  3,156,  0,162,  0,  0,  3,160,  0,173,
           0,  0,  3,  0,  3,  0,  3,149,  0,139,  0,  0,  3,174,  0,176,  0,
           0,  3,  0,  3,177,  0,179,  0,  0,  3,168,  0,134,  0,  0,  3,  0,
           3,  0,  3,  0,  3,  0,  3,  0,  3,  0,  3,151,  0,155,  0,  0,  3,
         180,  0,185,  0,  0,  3,  0,  3,182,  0,145,  0,  0,  3,141,  0,191,
           0,  0,  3,  0,  3,  0,  3,193,  0,143,  0,  0,  3,144,  0,188,  0,
           0,  3,  0,  3,140,  0,183,  0,  0,  3,186,  0,195,  0,  0,  3,  0,
           3,  0,  3,  0,  3,  0,  3,200,  0,204,  0,  0,  3,142,  0,178,  0,
           0,  3,152,  0,  0,  3,154,  0,146,  0,  0,  3,  0,  3,  0,  3,163,
           0,202,  0,  0,  3,189,  0,164,  0,  0,  3,  0,  3,187,  0,190,  0,
           0,  3,197,  0,169,  0,  0,  3,  0,  3,  0,  3,  0,  3,175,  0,184,
           0,  0,  3,192,  0,215,  0,  0,  3,  0,  3,206,  0,181,  0,  0,  3,
         199,  0,201,  0,  0,  3,  0,  3,  0,  3,211,  0,196,  0,  0,  3,194,
           0,224,  0,  0,  3,  0,  3,210,  0,217,  0,  0,  3,198,  0,227,  0,
           0,  3,  0,  3,  0,  3,  0,  3,  0,  3,  0,  3,223,  0,219,  0,  0,
           3,218,  0,214,  0,  0,  3,  0,  3,220,  0,203,  0,  0,  3,226,  0,
         240,  0,  0,  3,  0,  3,  0,  3,230,  0,212,  0,  0,  3,222,  0,207,
           0,  0,  3,  0,  3,233,  0,229,  0,  0,  3,242,  0,246,  0,  0,  3,
           0,  3,  0,  3,221,  0,232,  0,  0,  3,  0,  3,236,  0,239,  0,  0,
           3,249,  0, 38,  0,  0,  3,  0,  3,241,  0,228,  0,  0,  3,244,  0,
         235,  0,  0,  3,  0,  3,  0,  3,237,  3,237,  0,231,  0,234,  3,234,
           0,  0,  3,213,  0,245,  0,  0,  3,243,  0,205,  0,  0,  3,  0,  3,
           0,  3,225,  3,225,  0,  0,  0,238,  0,  0,  3,248,  0,250,  0,  0,
           3,  0,  3,208,  3,208,  0,255,  0,  0,  3,247,  0,252,  0,  0,  3,
           0,  3,216,  0,251,  0,  0,  3,253,  0,209,  0,255,  8};

        private class HardTree
        {
            internal byte obj;
            internal HardTree left;
            internal HardTree right;
            internal bool st;
            //void _Load();//var p:pointer);
            //void _Find(byte a,byte h,byte[] p);
            //Constructor Init;
            //Constructor Load;
            //Destructor Done;
            //Procedure Find(a:byte;var p:tpack);
            //Function GetStat:byte;
            internal void Load(byte[] p, ref int index)
            {
                st = false;
                obj = p[index++];
                byte a = p[index++];
                if ((a & 1) > 0) { left = new HardTree(); left.Load(p, ref index); }
                if ((a & 2) > 0) { right = new HardTree(); right.Load(p, ref index); }
                if ((a & 4) > 0) { st = true; obj = 2; }
                if ((a & 8) > 0) { st = true; obj = 3; }
            }
            internal byte Stat
            {
                get
                {
                    if (st) return obj;
                    return (left == null) && (right == null) ? (byte)1 : (byte)0;
                }
            }

        }

        private static HardTree m_root = LoadHardTree();
        private HardTree m_current = null;
        private byte m_cbyte;
        private byte m_cpos = 0;
        private Stream m_inp;

        private static HardTree LoadHardTree()
        {
            var root = new HardTree();
            int index = 0;
            root.Load(TreeData, ref index);
            return root;
        }

        public GHardCode(Stream inp)
        {
            m_inp = inp;
        }

        /// <summary>
        /// Dekóduje jeden byte
        /// </summary>
        public int Decrypt_T()
        {
            while (true)
            {
                if (m_cpos == 0)
                {
                    if (!GetByte())
                        return -1;
                    if (m_cbyte == 0x0D || m_cbyte == 0x0A || m_cbyte == 0x1A)
                    {
                        m_current = null;
                        m_cpos = 0;
                        return m_cbyte;
                    }
                }
                if (m_current == null) m_current = m_root;

                if (GetBit()) m_current = m_current.right; else m_current = m_current.left;
                switch (m_current.Stat)
                {
                    case 1: byte res = m_current.obj; m_current = null; return res;
                    case 2: m_current = null; break; //melo by nasledovat EOL nebo EOF   {00000}
                    case 3: m_current = null; break;//{1111,010101}
                }
            }
        }

        private bool GetByte()
        {
            int r = m_inp.ReadByte();
            if (r < 0) { m_cbyte = m_cpos = 0; return false; }
            m_cbyte = (byte)r;
            m_cpos = 8;
            return true;
        }

        private bool GetBit()
        {
            System.Diagnostics.Debug.Assert(m_cpos > 0);
            bool res = (m_cbyte & 0x80) > 0;
            m_cbyte <<= 1;
            m_cpos--;
            return res;
        }
    }

    /// <summary>
    /// Stream na čtení a zápis so ALCODE kódovaných souborů
    /// </summary>
    [System.Security.SecurityCritical]
    public class GAlCodeStream : Stream
    {
        Stream m_bstream;
        GAlCode m_code;
        GHardCode m_hard;

        private GAlCodeStream(Stream bstream, GAlCodeMethod method)
        {
            m_bstream = bstream;
            m_code = new GAlCode(method);
            if (method == GAlCodeMethod.Hard) m_hard = new GHardCode(bstream);
        }
    
        /// <summary>
        /// otevře existující stream pro dekódování ALCODE
        /// </summary>
        public static GAlCodeStream OpenExisting(Stream bstream)
        {
            System.Diagnostics.Debug.Assert(bstream.CanRead);
            GAlCodeMethod l_method = GAlCode.DetectHeader(bstream, true, false);
            GAlCodeStream res = new GAlCodeStream(bstream, l_method);
            return res;
        }

        /// <summary>
        /// otevře nový stream pro zápis ALCODE
        /// </summary>
        public static GAlCodeStream CreateNew(Stream bstream, GAlCodeMethod method)
        {
            System.Diagnostics.Debug.Assert(bstream.CanWrite && bstream.CanSeek);
            GAlCodeStream res = new GAlCodeStream(bstream, method);
            byte[] l_buf = new byte[GAlCode.HeaderLength];
            bstream.Write(l_buf, 0, l_buf.Length);
            return res;
        }
        /// <summary>
        /// otevře existující stream pro zápis ALCODE
        /// </summary>
        public static GAlCodeStream Append(Stream bstream, GAlCodeMethod method)
        {
            System.Diagnostics.Debug.Assert(bstream.CanWrite && bstream.CanSeek);
            GAlCodeStream res = new GAlCodeStream(bstream, method);
            bstream.Seek(0, SeekOrigin.End);
            return res;
        }

        private int HeaderLength
        {
            get
            {
                if (m_code.Method == GAlCodeMethod.Uncoded) return 0;
                return GAlCode.HeaderLength;
            }
        }

        /// <exclude/>
        public override bool CanRead
        {
            [System.Security.SecuritySafeCritical]
            get { return m_bstream.CanRead; }
        }

        /// <exclude/>
        public override bool CanSeek
        {
            [System.Security.SecuritySafeCritical]
            get { return (m_code.Method != GAlCodeMethod.Hard) && m_bstream.CanSeek; }
        }

        /// <exclude/>
        public override bool CanWrite
        {
            [System.Security.SecuritySafeCritical]
            get { return m_bstream.CanWrite; }
        }

        /// <exclude/>
        [System.Security.SecuritySafeCritical]
        public override void Flush()
        {
            long origPos = m_bstream.Position;
            try
            {
                m_bstream.Position = 0;
                m_bstream.Write(m_code.Header, 0, GAlCode.HeaderLength);
            }
            finally
            {
                m_bstream.Position = origPos;
                m_bstream.Flush();
            }
        }

        /// <exclude/>
        public override long Length
        {
            [System.Security.SecuritySafeCritical]
            get { return m_bstream.Length - HeaderLength; }
        }

        /// <exclude/>
        public override long Position
        {
            [System.Security.SecuritySafeCritical]
            get
            {
                return m_bstream.Position - HeaderLength;
            }
            [System.Security.SecuritySafeCritical]
            set
            {
                m_bstream.Position = value + HeaderLength;
                m_code.Seek(value);
            }
        }

        /// <exclude/>
        [System.Security.SecuritySafeCritical]
        public override int Read(byte[] buffer, int offset, int count)
        {
            if (m_code.Method == GAlCodeMethod.Uncoded) return m_bstream.Read(buffer, offset, count);
            byte[] cbuf = new byte[count];
            if (m_code.Method == GAlCodeMethod.Normal)
            {
                int cnt = m_bstream.Read(cbuf, 0, count);
                for (int i = 0; i < cnt; i++)
                {
                    buffer[offset + i] = m_code.Decrypt_N(cbuf[i]);
                }
                return cnt;
            }
            if (m_code.Method == GAlCodeMethod.Hard)
            {
                int cnt = 0;
                for (int i = 0; i < count; i++)
                {
                    int r = m_hard.Decrypt_T();
                    if (r < 0) return cnt;
                    buffer[offset + i] = (byte)r;
                    cnt++;
                }
                return cnt;
            }
            throw new GNotImplementedException(23200356);
        }

        /// <exclude/>
        [System.Security.SecuritySafeCritical]
        public override long Seek(long offset, SeekOrigin origin)
        {
            if (origin == SeekOrigin.Begin) offset += HeaderLength;
            return m_bstream.Seek(offset, origin);
        }

        /// <exclude/>
        [System.Security.SecuritySafeCritical]
        public override void SetLength(long value)
        {
            m_bstream.SetLength(value + HeaderLength);
        }

        /// <exclude/>
        [System.Security.SecuritySafeCritical]
        public override void Write(byte[] buffer, int offset, int count)
        {
            if (m_code.Method == GAlCodeMethod.Uncoded) { m_bstream.Write(buffer, offset, count); return; }
            byte[] cbuf = new byte[count];
            for (int i = 0; i < count; i++)
            {
                cbuf[i] = m_code.Encrypt(buffer[offset + i]);
            }
            m_bstream.Write(cbuf, 0, count);
        }
    }

}
