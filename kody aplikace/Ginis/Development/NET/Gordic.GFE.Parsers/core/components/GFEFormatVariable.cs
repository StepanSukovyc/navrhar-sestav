//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        GFEFormatVariable.cs                        </Name>
//    <Description> Parser formatu (ALF) - promenna formatu     </Description>
//    <Author>      Ing. Martin Aliger                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025  </Copyright>
//    <Created>     2006-10-05                                  </Created>
//  </FileHeader>

using System;
using System.Runtime.InteropServices;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// promìnná
    /// </summary>
    public class GFEFormatVariable : IDisposable
    {
        readonly string m_name;
        readonly string m_value;
        readonly GFEFormatRegion m_region;
        readonly Report.Implementation.Grr06DataType m_datatype;

        /// <summary>
        /// název promìnné
        /// </summary>
        public string Name { get { return m_name; } }

        /// <summary>
        /// hodnota promìnne
        /// </summary>
        public string ValueScript { get { return m_value; } }

        /// <summary>
        /// region promìnné
        /// </summary>
        public GFEFormatRegion Region { get { return m_region; } }

        /// <summary>
        /// typ promìnné
        /// </summary>
        public Report.Implementation.Grr06DataType DataType { get { return m_datatype; } }

        internal GFEFormatVariable(GFEFormatRegion r, Gordic.Report.Implementation.IGFormatVariable v)
        {
            m_region = r;
            v.getDataType(out m_datatype);
            v.getName(out m_name);
            v.getValueScript(out Report.Implementation.IGScript l_script);
            if (l_script != null)
            {
                try
                {
                    l_script.getScriptText(out m_value);
                }
                finally
                {
                    Marshal.ReleaseComObject(l_script);
                }
            }
        }

        #region IDisposable Members
        /// <summary>
        /// uvolnìní objektu
        /// </summary>
        public void Dispose() { Dispose(true); GC.SuppressFinalize(this); }
        protected virtual void Dispose(bool disposing) { }
        ~GFEFormatVariable() { Dispose(false); }
        #endregion
    } // end class
} // end namespace
