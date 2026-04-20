//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.IGReportVykaz.cs                    </Name>
//    <Description> Informace kolem sestav které jsou výkazem                   </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2011                            </Copyright>
//    <Created>     2011-04-26                                                  </Created>
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
    /// Informace kolem sestav které jsou výkazem
    /// </summary>
    [ActivatedObject("Gordic.Report.Server.GReportVykaz")]
    [System.Security.SecurityCritical]
    public interface IGReportVykaz
    {
        /// <summary>Zapíše stav vygenerování výkazu</summary>
        void VykazPripraven(IGReport report);
    }



}
