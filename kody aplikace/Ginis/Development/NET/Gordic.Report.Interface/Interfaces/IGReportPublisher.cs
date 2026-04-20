//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.IGReportList.cs                     </Name>
//    <Description> Čtení seznamů sestav, vazeb atp.                            </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2011                            </Copyright>
//    <Created>     2010-01-28                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;
using Gordic.General;
using Gordic.General.ApplicationInterface;
using System.Data;

namespace Gordic.Report.Interface
{
    /// <summary>
    /// Zveřejnění požadavků ke generování sestav
    /// </summary>
    [ActivatedObject("Gordic.Report.Server.GPublisher")]
    [System.Security.SecurityCritical]
    public interface IGReportPublisher
    {
        /// <summary>Nahrazení zástupek</summary>
        string ReplaceWildcards(GReportInfoDto reportInfo, string s);
    }

}
