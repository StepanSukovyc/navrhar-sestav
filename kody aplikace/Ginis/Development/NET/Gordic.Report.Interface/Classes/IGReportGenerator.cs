//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.IGReportGenerator.cs                </Name>
//    <Description> Podpora generovani                                          </Description>
//    <Author>      bmartinek                                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-01-27                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.General.ApplicationInterface;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.Report.Interface
{
    /// <summary>Podpora generovani</summary>
    [ActivatedObject("Gordic.Report.Server.GReportGenerator")]
    public interface IGReportGenerator
    {
        //NOTE: Tohle tu nema cenu mit - generovani vyhazuje udalosti, mezi Server->Cli by je nebylo mozne na APG odchytit.
        //GReportGenerateResultAsyncDto Generate(GCreateReportAsyncDto input)

        /// <summary>Ziskani souboru</summary>
        GReportFile GetFile(GFileInfoDto fileInfo);

        /// <summary>Smazani souboru</summary>
        void RemoveFile(GFileInfoDto fileInfo);
    }

    /// <summary>Soubor generovany async. ulohou. Pouziti mezi APG a WK (nepredpoklada se pouziti teto tridy v JS/TS)</summary>
    public class GReportFile : IGDto
    {
        /// <summary>Soubor</summary>
        public Stream File { get; set; }

        /// <summary>Info o souboru</summary>
        public GFileInfoDto FileInfo { get; set; }
    }
}
