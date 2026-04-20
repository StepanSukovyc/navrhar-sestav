//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.GReportSsrReader.cs                 </Name>
//    <Description> Parser na SSR soubory                                       </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2009                  </Copyright>
//    <Created>     2009-07-23                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using Gordic.General;
using Gordic.Report.Interface;

namespace Gordic.Report.Implementation
{
    /// <summary>
    /// Parser na SSR soubory
    /// </summary>
    public class GSrz: GSsr
    {
        string m_temp;

        /// <summary>Načtení SRZ ze souboru</summary>
        public GSrz(string fname)
            : base()
        {
            m_temp = GTempFiles.CreateTempDirectory();
            GZip.Unzip(fname, m_temp);
            DirectoryInfo di = new DirectoryInfo(m_temp);
            FileInfo[] fi = di.GetFiles("*.ssr");
            if (fi.Length == 0) throw new GReportException(21000037, 28); //RC-EX 28 : SRZ soubor neosahuje SSR.
            LoadFromFile(fi[0].FullName);
        }

        /// <summary>Načtení SRZ ze souboru</summary>
        public GSrz(Stream stream)
            : base()
        {
            m_temp = GTempFiles.CreateTempDirectory();
            GZip.Unzip(stream, m_temp);
            DirectoryInfo di = new DirectoryInfo(m_temp);
            FileInfo[] fi = di.GetFiles("*.ssr");
            if (fi.Length == 0) throw new GReportException(21000038, 28); //RC-EX 28 : SRZ soubor neosahuje SSR.
            LoadFromFile(fi[0].FullName);
        }

        /// <summary>Dispose</summary>
        public override void Dispose()
        {
            base.Dispose();
            GTempFiles.DeleteTempDirectory(m_temp);
        }

    }


}
