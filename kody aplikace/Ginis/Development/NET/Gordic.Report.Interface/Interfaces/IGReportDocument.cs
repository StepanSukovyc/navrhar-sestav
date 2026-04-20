//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.IGReportDocument.cs                 </Name>
//    <Description> Zpracování dokumentù vzniklých ze sestav                    </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2013                            </Copyright>
//    <Created>     2013-07-30                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;
using Gordic.General;
using Gordic.General.ApplicationInterface;

namespace Gordic.Report.Interface
{

    /// <summary>
    /// Zpracování dokumentù vzniklých ze sestav
    /// </summary>
    [ActivatedObject("Gordic.Report.Server.GReportDocumentApp")]
    [System.Security.SecurityCritical]
    public interface IGReportDocument
    {
        /// <summary>Pøíprava pro obèerstvení obrazu</summary>
        void ObrazDokumentu(GString ixp, out GReportIdentity reportId, out GString ixb, out GString popis);
    }

}
