//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.GBackedMemoryFile.cs                          </Name>
//    <Description> Třída pro soubory mapované do paměti s automatickým uložením</Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2012                            </Copyright>
//    <Created>     2012-01-02                                                  </Created>
//  </FileHeader>


using System;
using Gordic.General;
using System.Collections;
using System.IO;
using System.Text;


namespace Gordic.Report.Interface
{
    /// <summary>
    /// Třída pro soubory mapované do paměti s automatickým uložením na disk
    /// </summary>
    public class GBackedMemoryFile : IGObject, IGMemoryFile, IDisposable
    {
        Stream m_Stream;
        BinaryReader m_oBinReader;
        StreamReader m_oStrReader;
        Encoding m_oEncoding;

        string m_sFileName = "";
        int m_mode;
        bool m_autoFlush = false;

        /// <summary>Informace o používaném kódování</summary>
        public Encoding Encoding => m_oEncoding;

        /// <summary>
        /// Limit délky, kdy začne zapisovat na disk
        /// </summary>
        public const int MEMORY_THRESHOLD = 10 * 1024 * 1024; //10MB

        /// <summary>
        /// Konstruktor, založí soubor mapovaný do paměti
        /// </summary>
        public GBackedMemoryFile(Encoding encoding = null)
        {
            m_Stream = new MemoryStream();
            m_oEncoding = encoding ?? Encoding.GetEncoding(1250);
            m_mode = 0;
        }

        /// <summary>
        /// Konstruktor, a rovnou na disku
        /// </summary>
        public GBackedMemoryFile(string diskPath, bool autoFlush = false, Encoding encoding = null, FileMode fileMode = FileMode.Create, bool setEndOfFile = false)
        {
            m_Stream = new FileStream(diskPath, fileMode, FileAccess.ReadWrite, FileShare.ReadWrite);
            m_oEncoding = encoding ?? Encoding.GetEncoding(1250);
            m_mode = 1;
            m_autoFlush = autoFlush;
            if (setEndOfFile) SetEndOfFile();
        }

        public void SetEncoding(Encoding encoding)
        {
            m_oEncoding = encoding;
            m_oStrReader = null;
            m_oBinReader = null;
        }

        /// <summary>Nastaví stream na konec</summary>
        public void SetEndOfFile()
        {
            m_Stream.Seek(0, SeekOrigin.End);
        }

        /// <exclude/>        ~GBackedMemoryFile()
        {
            Close();
        }
 
        private void CheckMode()
        {
            if (m_mode == 0 && Length > MEMORY_THRESHOLD)
            {
                string l_sPath = GTempFiles.CreateRegisteredTempFile();
                long l_iPos = m_Stream.Position;
                FileStream l_oFileStream = new FileStream(l_sPath, FileMode.Create, FileAccess.ReadWrite, FileShare.ReadWrite);

                m_Stream.Position = 0;
                GIOSupport.CopyStream(m_Stream, l_oFileStream);
                
                m_Stream.Close();
                m_Stream = l_oFileStream;
                m_Stream.Position = l_iPos;
                m_oStrReader = null;
                m_oBinReader = null;

                m_mode = 1;
            }
        }

        private void Close()
        {
            m_Stream.Close();
            if (m_mode == 1)
            {
                var l_sPath = (m_Stream as FileStream).Name;
                GTempFiles.DeleteRegisteredTempFile(l_sPath);
                m_mode = -1;
            }
        }

        Stream IGMemoryFile.ReadStream()
        {
            if (m_mode == 0)
            {
                MemoryStream m_oMemFile = (m_Stream as MemoryStream);
                return new MemoryStream(m_oMemFile.GetBuffer(), 0, (int)m_oMemFile.Length, false);
            }
            if (m_mode == 1)
            {
                var l_sPath = (m_Stream as FileStream).Name;
                return new FileStream(l_sPath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
            }
            return null;
        }

        #region IGMemoryFile Members

        void IGMemoryFile.SaveTo(string destination, bool asCopy)
        {
            long l_iPos = m_Stream.Position;

            // pokud není zadán název souboru, použije se FileName
            if ((destination == null) || (destination.Equals(""))) destination = m_sFileName;
            using (FileStream l_oFileStream = new FileStream(destination, FileMode.Create))
            {
                m_Stream.Position = 0;
                GIOSupport.CopyStream(m_Stream, l_oFileStream);
            }
            if (asCopy == false) m_sFileName = destination;
            m_Stream.Position = l_iPos;
        }

        void IGMemoryFile.AppendTo(string destination)
        {
            long l_iPos = m_Stream.Position;

            // pokud není zadán název souboru, použije se FileName
            if ((destination == null) || (destination.Equals(""))) destination = m_sFileName;
            using (FileStream l_oFileStream = new FileStream(destination, FileMode.Append))
            {
                m_Stream.Position = 0;
                GIOSupport.CopyStream(m_Stream, l_oFileStream);
            }
            m_sFileName = destination;
            m_Stream.Position = l_iPos;
        }

        string IGMemoryFile.SaveToTemp(string path, bool asCopy)
        {
            string l_sPath = GTempFiles.CreateTempFile(path);
            ((IGMemoryFile)this).SaveTo(l_sPath, asCopy);
            return l_sPath;
        }

        string IGMemoryFile.SaveToTemp(string path, string extension, bool asCopy)
        {
            string l_sPath = GTempFiles.CreateTempFile(path, extension);
            ((IGMemoryFile)this).SaveTo(l_sPath, asCopy);
            return l_sPath;
        }

        void IGMemoryFile.LoadFrom(string source)
        {
            throw new GNotImplementedException();
        }

        byte IGMemoryFile.this[int idx]
        {
            get
            {
                if (Position != idx)
                    Position = idx;
                return (byte)m_Stream.ReadByte();
            }
            set
            {
                if (Position != idx)
                    Position = idx;
                m_Stream.WriteByte(value);
            }
        }

        /// <summary>Délka souboru</summary>
        public long Length
        {
            get { return m_Stream.Length; }
        }

        /// <summary>Pozice v souboru</summary>
        public long Position
        {
            get { return m_Stream.Position; }
            set { m_Stream.Position = value; if (m_oStrReader != null) m_oStrReader.DiscardBufferedData(); }
        }

        byte IGMemoryFile.ReadByte()
        {
            if (m_oBinReader == null)
                m_oBinReader = new BinaryReader(m_Stream); 
            return m_oBinReader.ReadByte();
        }

        void IGMemoryFile.WriteByte(byte value)
        {
            m_Stream.WriteByte(value);
            if (m_autoFlush) m_Stream.Flush();
        }

        /// <summary>Jméno souboru</summary>
        public string FileName
        {
            get { return m_sFileName; }
            set { m_sFileName = value; }
        }

        ushort IGMemoryFile.ReadUInt16()
        {
            if (m_oBinReader == null)
                m_oBinReader = new BinaryReader(m_Stream);
            return m_oBinReader.ReadUInt16();
        }

        uint IGMemoryFile.ReadUInt32()
        {
            if (m_oBinReader == null)
                m_oBinReader = new BinaryReader(m_Stream);
            return m_oBinReader.ReadUInt32();
        }

        void IGMemoryFile.Write(string s)
        {
            if (Length == 0)
            {
                byte[] l_Preamble = m_oEncoding.GetPreamble();
                m_Stream.Write(l_Preamble, 0, l_Preamble.Length);
            }
            CheckMode();
            byte[] l_mByte = m_oEncoding.GetBytes(s);
            m_Stream.Write(l_mByte, 0, l_mByte.Length);
            if (m_autoFlush) m_Stream.Flush();
        }

        void IGMemoryFile.WriteLine(string s)
        {
            if (Length == 0)
            {
                byte[] l_Preamble = m_oEncoding.GetPreamble();
                m_Stream.Write(l_Preamble, 0, l_Preamble.Length);
            }
            CheckMode();
            byte[] l_mByte = m_oEncoding.GetBytes(s);
            m_Stream.Write(l_mByte, 0, l_mByte.Length);
            byte[] l_mNewLine = m_oEncoding.GetBytes(Environment.NewLine);
            m_Stream.Write(l_mNewLine, 0, l_mNewLine.Length);
            if (m_autoFlush) m_Stream.Flush();
        }

        string IGMemoryFile.ReadLine()
        {
            if (m_oStrReader == null)
                m_oStrReader = new StreamReader(m_Stream, m_oEncoding);
            return m_oStrReader.ReadLine();
        }

        byte[] IGMemoryFile.ToArray()
        {
            switch (m_mode)
            {
                case 0:
                    MemoryStream m_oMemFile = (m_Stream as MemoryStream);
                    return m_oMemFile.ToArray();
                case -1:
                    throw new GIOException(21000049);
                case 1:
                    long l_iPos = m_Stream.Position;
                    try
                    {
                        //dela IOSupport: m_Stream.Position = 0;
                        return GIOSupport.StreamToBytes(m_Stream);
                    }
                    finally
                    {
                        m_Stream.Position = l_iPos;
                    }
                default:
                    throw new GNotImplementedException(21000042);
            }
        }

        #endregion

        /// <summary>
        /// Debug označení streamu. Nepracuje s uloženými daty.
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            if (m_mode == -1)
                return "BackedMF (closed)";
            if (m_mode == 1)
                return "BackedMF (on disk) Length=" + Length.ToString();
            return "BackedMF (in memory) Length=" + Length.ToString();
        }        void IDisposable.Dispose()
        {
            Close();
        }
    }


}
