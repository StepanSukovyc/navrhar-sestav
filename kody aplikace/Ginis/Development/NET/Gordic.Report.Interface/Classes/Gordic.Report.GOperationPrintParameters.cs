//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.GOperationPrintParameters.cs                  </Name>
//    <Description> Parametry pro generování operatovního tisku                 </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2009                  </Copyright>
//    <Created>     2009-02-24                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;
using Gordic.General;

namespace Gordic.Report.Interface
{
    /// <summary>
    /// Parametry pro generování operatovního tisku
    /// </summary>
    public class GOperationPrintParameters : IGGridFormatConsumer
	{
        private GGridFormat m_gf = new GGridFormat();

        /// <summary>GridFormat</summary>
        public GGridFormat GridFormat
        {            get { return m_gf; }            set { m_gf = value; }
        }

        /// <summary>Nastaví GridFormat</summary>        public void SetGridFormat(object data, GGridFormat format)
        {
            m_data = data;
            m_gf = format;
        }

        /// <summary>Zda uživatel vybral variantu tisku jen s oznaèenými øádky</summary>
        public bool PrintOnlySelected { get; set; }

        /// <summary>Nastaví GridFormat</summary>        public void SetGridFormat(IGGridFormatProvider provider)
        {
            provider.GetGridFormat(PrintOnlySelected ? GGridFormatIntent.PrintingSelected : GGridFormatIntent.Printing, out m_data, out m_gf);
        }

        //------------------------------------------------------------------
        private GReportHeader m_header = new GReportHeader();
        ///<summary>Hlavièka operativního tisku</summary>
        public GReportHeader Header
        {            get { return m_header; }
        }

        //------------------------------------------------------------------
        private object m_data;
        ///<summary>Data pro operativní tisk</summary>
        public object Data
        {            get { return m_data; }            set { m_data = value; }
        }

        /// <summary>
        /// Nastaví parametry pøedané sestavy dle konfigurace
        /// </summary>
        /// <param name="report"></param>
        [System.Security.SecurityCritical]
        public void SetupReport(IGReport report)
        {
            report.Parameters[GReportParams.DataTable] = m_data;
            report.Parameters[GReportParams.ColumnList] = m_gf.Columns;
            report.Parameters[GReportParams.Header] = m_header;
            report.Parameters["bkc0"] = GridFormat.RowsColor;
            report.Parameters["bkc1"] = GridFormat.AlternatingRowsColor;
            report.Parameters["nums"] = GridFormat.RowNumbering;
        }


}


}
