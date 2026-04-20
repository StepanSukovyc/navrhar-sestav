//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.GReportDistributionType.cs          </Name>
//    <Description> Typ distribuce sestavy                                      </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2011                            </Copyright>
//    <Created>     2011-04-26                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;

namespace Gordic.Report.Interface
{
    /// <summary>
    /// Typ distribuce sestavy
    /// </summary>
    public enum GReportDistributionType
    {
        /// <summary>Neznámo odkud se vzalo</summary>
        Unknown = -1,
        /// <summary>Uživatelská sestava, psaná pøímo uživatelem</summary>
        UserAdded = 0,
        /// <summary>Distribuèní sestava vydaná implementaèním týmem - novì by nemìly vznikat</summary>
        Bundled = 1,
        /// <summary>Distribuèní sestava vydaná implementaèním týmem se zdrojovým kódem</summary>
        BundledWithSource = 2,
        /// <summary>Distribuèní sestava vydaná centrálním vývojovým týmem</summary>
        Central = 3,
    }
}
