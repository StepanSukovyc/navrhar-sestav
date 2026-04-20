//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.GMemoryFile.cs                </Name>
//    <Description> Objekt reprezentující soubor v pamìti       </Description>
//    <Author>      Jan Brabec, Martin Aliger                   </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2005  </Copyright>
//    <Created>     2003-06-29                                  </Created>
//  </FileHeader>
// 2005-09-26  Martin Aliger prevezmuto - zda se mi, ze to nebude chodit prez remoting

using System;
using Gordic.General;
using System.Collections;
using System.IO;
using System.Text;
using System.Runtime.Serialization;


namespace Gordic.Report.Interface
{
    /// <summary>
    /// Tøída pro soubory mapované do pamìti
    /// </summary>
    [Serializable]
    public class GMemoryFile : IGObject, IGMemoryFile, ISerializable
    {

        private class GNCMemoryStream : MemoryStream
        {
            public override void Close()
            {
                //base.Close();
            }
        }

        #region private Members

        MemoryStream m_oMemFile;
        BinaryReader m_oBinReader;
        StreamReader m_oStrReader;
        Encoding m_oEncoding = Encoding.GetEncoding(1250);

        string m_sFileName;

        #endregion

        /// <summary>
        /// Kontruktor, založí soubor mapovaný do pamìti
        /// </summary>
        public GMemoryFile()
        {
            m_oMemFile = new GNCMemoryStream();
            m_oBinReader = new BinaryReader(m_oMemFile);
            m_oStrReader = new StreamReader(m_oMemFile, Encoding.GetEncoding(1250));
            m_sFileName = "";
        }

        /// <summary>
        /// Konstruktor, založí soubor mapovaný do pamìti podle pole bytu
        /// </summary>
        /// <param name="data">vstupní data</param>
        /// <param name="fileName">jméno souboru</param>
        public GMemoryFile(byte[] data, string fileName = null)
            : this()
        {
            m_oMemFile.Write(data, 0, data.Length);
            m_oMemFile.Position = 0;
            m_sFileName = fileName ?? "";
        }

        /// <summary>
        /// Konstruktor, založí soubor mapovaný do pamìti ze streamu
        /// </summary>
        /// <param name="st">vstupní data</param>
        /// <param name="fileName">jméno souboru</param>
        public GMemoryFile(System.IO.Stream st, string fileName = null)
            : this()
        {
            if (st == null)
                return;
            //m_oMemFile.Capacity = (int) st.Length;
            const int LEN = 8 * 1024;
            byte[] buf = new byte[LEN];
            while (true)
            {
                int l = st.Read(buf, 0, LEN);
                if (l == 0)
                    break;
                m_oMemFile.Write(buf, 0, l);
            }
            m_oMemFile.Position = 0;
            m_sFileName = fileName ?? "";
        }

        /// <summary>
        /// Konstruktor, založí soubor mapovaný do pamìti podle jiného MemoryFile
        /// </summary>
        /// <param name="f">vstupní soubor</param>
        public GMemoryFile(IGMemoryFile f)
            : this(f.ToArray())
        {
            FileName = f.FileName;
        }
        /// <summary>
        /// Konstruktor, založí soubor mapovaný do pamìti podle jiného MemoryFile
        /// </summary>
        /// <param name="f">vstupní soubor</param>
        public static GMemoryFile Clone(IGMemoryFile f)
        {
            if (f == null) return null;
            return new GMemoryFile(f);
        }
        /// <summary>
        /// Konstruktor, založí soubor mapovaný do pamìti ze souboru
        /// </summary>
        public static GMemoryFile ReadFromFile(string fileName)
        {
            //using (Stream stream = File.OpenRead(fileName))
            using (Stream stream = File.Open(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
            {
                return new GMemoryFile(stream) { FileName = fileName };
            }
        }

        /// <summary>
        /// Vrátí interní stream, používat obezøetnì
        /// </summary>
        public MemoryStream Stream
        {
            get
            {
                Position = 0;
                return m_oMemFile;
            }
        }

        public Stream ReadStream()
        {
            return new MemoryStream(m_oMemFile.GetBuffer(), 0, (int)m_oMemFile.Length, false);
        }

        #region IGMemoryFile Members

        /// <summary>
        /// Uloží data souboru do destination
        /// </summary>
        public void SaveTo(string destination, bool asCopy)
        {
            long l_iPos = m_oMemFile.Position;

            // pokud není zadán název souboru, použije se FileName
            if ((destination == null) || (destination.Equals(""))) destination = m_sFileName;
            using (FileStream l_oFileStream = new FileStream(destination, FileMode.Create))
            {
                m_oMemFile.Position = 0;
                GIOSupport.CopyStream(m_oMemFile, l_oFileStream);
            }
            if (asCopy == false) m_sFileName = destination;
            m_oMemFile.Position = l_iPos;
        }

        /// <summary>
        /// Pøipojí data do existujícího souboru
        /// </summary>
        public void AppendTo(string destination)
        {
            long l_iPos = m_oMemFile.Position;

            // pokud není zadán název souboru, použije se FileName
            if ((destination == null) || (destination.Equals(""))) destination = m_sFileName;
            using (FileStream l_oFileStream = new FileStream(destination, FileMode.Append))
            {
                m_oMemFile.Position = 0;
                GIOSupport.CopyStream(m_oMemFile, l_oFileStream);
            }
            m_sFileName = destination;
            m_oMemFile.Position = l_iPos;
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
            try
            {
                // pokud není zadán název souboru, použije se FileName
                if ((source == null) || (source.Equals(""))) source = m_sFileName;
                using (Stream stream = new FileStream(source, FileMode.Open, FileAccess.Read))
                {
                    m_oMemFile.Position = 0;
                    m_oMemFile.SetLength((int)stream.Length);   //zafunguje i pri nacteni jineho souboru do jiz nacteneho MemoryFile (napr. Refresh)
                    GIOSupport.CopyStream(stream, m_oMemFile);
                }
                Position = 0;
                m_sFileName = source;
            }
            catch (IOException e)
            {
                throw new GException(21000001, 2, e, source); // <resource value=2>Nelze naèíst soubor {0}.</resource>
            }
        }

        byte IGMemoryFile.this[int idx]
        {
            get
            {
                if (Position != idx)
                    Position = idx;
                return (byte)m_oMemFile.ReadByte();
            }
            set
            {
                if (Position != idx)
                    Position = idx;
                m_oMemFile.WriteByte(value);
            }
        }

        /// <summary>
        /// Délka souboru
        /// </summary>
        public long Length
        {
            get
            {
                return m_oMemFile.Length;
            }
        }

        /// <summary>Pozice v souboru</summary>
        public long Position
        {
            get
            {
                return m_oMemFile.Position;
            }
            set
            {
                m_oMemFile.Position = value;
                m_oStrReader.DiscardBufferedData();
            }
        }

        byte IGMemoryFile.ReadByte()
        {
            return m_oBinReader.ReadByte();
        }

        void IGMemoryFile.WriteByte(byte value)
        {
            m_oMemFile.WriteByte(value);
        }

        /// <summary>
        /// Jméno souboru
        /// </summary>
        public string FileName
        {
            get
            {
                return m_sFileName;
            }
            set
            {
                m_sFileName = value;
            }
        }

        ushort IGMemoryFile.ReadUInt16()
        {
            return m_oBinReader.ReadUInt16();
        }

        uint IGMemoryFile.ReadUInt32()
        {
            return m_oBinReader.ReadUInt32();
        }

        void IGMemoryFile.Write(string s)
        {
            byte[] l_mByte = m_oEncoding.GetBytes(s);
            m_oMemFile.Write(l_mByte, 0, l_mByte.Length);
        }

        void IGMemoryFile.WriteLine(string s)
        {
            byte[] l_mByte = m_oEncoding.GetBytes(s);
            m_oMemFile.Write(l_mByte, 0, l_mByte.Length);
            byte[] l_mNewLine = m_oEncoding.GetBytes(Environment.NewLine);
            m_oMemFile.Write(l_mNewLine, 0, l_mNewLine.Length);
        }

        string IGMemoryFile.ReadLine()
        {
            return m_oStrReader.ReadLine();
        }

        public byte[] ToArray()
        {
            return m_oMemFile.ToArray();
        }

        #endregion

        /// <summary>
        /// ToString pøevede data streamu na string
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            long l_iPos = Position;
            try
            {
                Position = 0;
                return m_oStrReader.ReadToEnd();
            }
            finally
            {
                Position = l_iPos;
            }
        }

        /// <summary>
        /// Konstruktor pro deserializaci
        /// </summary>
        protected GMemoryFile(SerializationInfo info, StreamingContext context)
            : this()
        {
            //deserializace
            foreach (var se in info)
            {
                var t = se.Name[0];
                switch (t)
                {
                    case 'a':
                        var data = (byte[])se.Value;
                        m_oMemFile.Write(data, 0, data.Length);
                        m_oMemFile.Position = 0;
                        break;
                    case 'f':
                        m_sFileName = (string)se.Value;
                        break;
                }

            }
        }

        [System.Security.SecurityCritical]
        void ISerializable.GetObjectData(SerializationInfo info, StreamingContext context)
        {
            //serializace
            info.AddValue("a", ToArray());
            if (string.IsNullOrEmpty(FileName) == false) info.AddValue("f", FileName);
        }
    }

    /// <summary>
    /// Seznam souborù mapovaných do pamìti <see cref="GMemoryFile"/>
    /// </summary>
    [Newtonsoft.Json.JsonConverter(null)] //spadne pøi pokusu o serializaci
    public class GMemoryFiles : System.Collections.Generic.List<IGMemoryFile>
    {
        /// <summary>
        /// Konstruktor
        /// </summary>
        /// <param name="capacity"></param>
        public GMemoryFiles(int capacity)
            : base(capacity)
        {
            for (int i = 0; i < capacity; i++)
            {
                base.Add(null);
            }
        }

        /// <summary>
        /// indexer
        /// </summary>
        public new IGMemoryFile this[int index]
        {
            get
            {
                if (index >= Count) return null;
                return Get(index);
            }
            set
            {
                for (int i = Count; i <= index; i++)
                {
                    base.Add(null);
                }
                base[index] = value;
            }
        }
        protected virtual IGMemoryFile Get(int index)
        {
            return base[index];
        }

    }

}
