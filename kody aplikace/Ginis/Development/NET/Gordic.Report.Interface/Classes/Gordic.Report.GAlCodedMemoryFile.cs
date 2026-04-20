//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.GAlCodedMemoryFile.cs                         </Name>
//    <Description> Soubory mapované do paměti kódované ALCODE algoritmem       </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2014                            </Copyright>
//    <Created>     2007-05-21                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Runtime.InteropServices;
using Gordic.General;

namespace Gordic.Report.Interface
{
    /// <summary>
    /// Soubory mapované do paměti kódované ALCODE algoritmem
    /// </summary>
    /// <remarks>
    /// Lze použít pouze pro zápis! 
    /// </remarks>
    [System.Security.SecurityCritical]
    public class GAlCodedMemoryFile : IGMemoryFile
    {
        MemoryStream m_oMemFile;
        GAlCodeStream m_Stream;
        Encoding m_oEncoding;

        string m_sFileName = "";

        /// <summary>
        /// Kontruktor, založí soubor mapovaný do paměti
        /// </summary>
        public GAlCodedMemoryFile(Encoding encoding = null)
        {
            m_oMemFile = new MemoryStream();
            m_Stream = GAlCodeStream.CreateNew(m_oMemFile, GAlCodeMethod.Normal);
            m_oEncoding = encoding ?? Encoding.GetEncoding(1250);
        }

        /// <summary>
        /// Kontruktor, otevře soubor mapovaný do paměti
        /// </summary>
        public GAlCodedMemoryFile(string dataFile, Encoding encoding = null)
        {
            m_oMemFile = new MemoryStream();
            using(var fs = new FileStream(dataFile, FileMode.Open, FileAccess.Read))
            {
                fs.CopyTo(m_oMemFile);
            }
            m_Stream = GAlCodeStream.Append(m_oMemFile, GAlCodeMethod.Normal);
            m_oEncoding = encoding ?? Encoding.GetEncoding(1250);
        }

        private void UpdateHeader()
        {
            m_Stream.Flush();
        }

        #region IGMemoryFile Members        Stream IGMemoryFile.ReadStream()
        {
            UpdateHeader();
            return new MemoryStream(m_oMemFile.GetBuffer(), 0, (int)m_oMemFile.Length, false);
        }        void IGMemoryFile.SaveTo(string destination, bool asCopy)
        {
            UpdateHeader();

            // pokud není zadán název souboru, použije se FileName
            if ((destination == null) || (destination.Equals(""))) destination = m_sFileName;
            using (BufferedStream l_oFileStream = new BufferedStream(new FileStream(destination, FileMode.Create)))
            {
                l_oFileStream.Write(m_oMemFile.GetBuffer(), 0, (int)m_oMemFile.Length);
            }
            if (asCopy == false) m_sFileName = destination;
        }        void IGMemoryFile.AppendTo(string destination)
        {
            throw new GNotImplementedException(24600110);
        }        string IGMemoryFile.SaveToTemp(string path, bool asCopy)
        {
            string l_sPath = GTempFiles.CreateTempFile(path);
            ((IGMemoryFile)this).SaveTo(l_sPath, asCopy);
            return l_sPath;
        }        string IGMemoryFile.SaveToTemp(string path, string extension, bool asCopy)
        {
            string l_sPath = GTempFiles.CreateTempFile(path, extension);
            ((IGMemoryFile)this).SaveTo(l_sPath, asCopy);
            return l_sPath;
        }        void IGMemoryFile.LoadFrom(string source)
        {
            throw new GNotImplementedException(24600111);
        }

        byte IGMemoryFile.this[int idx]
        {            get
            {
                throw new GNotImplementedException(24600112);
            }            set
            {
                throw new GNotImplementedException(24600113);
            }
        }

        /// <summary>
        /// Délka souboru
        /// </summary>        
        public long Length
        {            get
            {
                return m_Stream.Length;
            }
        }

        long IGMemoryFile.Position
        {            get
            {
                return m_Stream.Position;
            }            set
            {
                m_Stream.Position = value;
            }
        }        byte IGMemoryFile.ReadByte()
        {
            throw new GNotImplementedException(24600114);
        }        void IGMemoryFile.WriteByte(byte value)
        {
            m_Stream.WriteByte(value);
        }

        /// <summary>
        /// Jméno souboru
        /// </summary>
        public string FileName
        {            get
            {
                return m_sFileName;
            }            set
            {
                m_sFileName = value;
            }
        }        ushort IGMemoryFile.ReadUInt16()
        {
            throw new GNotImplementedException(24600115);
        }        uint IGMemoryFile.ReadUInt32()
        {
            throw new GNotImplementedException(24600116);
        }        void IGMemoryFile.Write(string s)
        {
            if (Length == 0)
            {
                byte[] l_Preamble = m_oEncoding.GetPreamble();
                m_Stream.Write(l_Preamble, 0, l_Preamble.Length);
            }
            byte[] l_mByte = m_oEncoding.GetBytes(s);
            m_Stream.Write(l_mByte, 0, l_mByte.Length);
        }        void IGMemoryFile.WriteLine(string s)
        {
            if (Length == 0)
            {
                byte[] l_Preamble = m_oEncoding.GetPreamble();
                m_Stream.Write(l_Preamble, 0, l_Preamble.Length);
            }
            byte[] l_mByte = m_oEncoding.GetBytes(s);
            m_Stream.Write(l_mByte, 0, l_mByte.Length);
            byte[] l_mNewLine = m_oEncoding.GetBytes(Environment.NewLine);
            m_Stream.Write(l_mNewLine, 0, l_mNewLine.Length);
        }        string IGMemoryFile.ReadLine()
        {
            throw new GNotImplementedException(24600117);
        }        byte[] IGMemoryFile.ToArray()
        {
            UpdateHeader();
            return m_oMemFile.ToArray();
        }

        #endregion

    }

}
