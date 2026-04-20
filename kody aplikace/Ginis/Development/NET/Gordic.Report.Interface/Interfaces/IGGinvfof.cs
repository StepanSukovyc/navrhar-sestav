//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.IGGinvfof.cs                        </Name>
//    <Description> Oblíbené tisky                                              </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2011                            </Copyright>
//    <Created>     2011-04-26                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;
using Gordic.General;
using Gordic.General.ApplicationInterface;

namespace Gordic.Report.Interface
{
    /// <summary>
    /// Oblíbené tisky
    /// </summary>
    [ActivatedObject("Gordic.Report.Server.GGinvfof")]
    [System.Security.SecurityCritical]
    public interface IGGinvfof
    {
        /// <summary>
        /// Seznam oblíbených sestav
        /// </summary>
        GGinvfofDataSet.SeznamDataTable Seznam(params GFilter<FilterGinvfof>[] filters);
        /// <summary>
        /// Přidání oblíbené sestavy
        /// </summary>
        void Add(GString ixs_fun, GString ixs_str, GString ixs_alv, GString ixs_frm, GInt16 priz_fos, GInt16 k_v, GString popis);
        /// <summary>
        /// Editace oblíbené sestavy
        /// </summary>
        void Update(GString ixs_fun, GString ixs_str, GString ixs_alv, GString ixs_frm, GInt16 priz_fos, GInt16 k_v, GString popis);
        /// <summary>
        /// Smazání oblíbené sestavy
        /// </summary>
        void Delete(GString ixs_fun, GString ixs_str, GString ixs_alv, GString ixs_frm);
    }

    /// <summary>
    /// Filtr pro Oblíbené tisky
    /// </summary>
    public enum FilterGinvfof
    {
        /// <exclude/>
        tema,
        /// <exclude/>
        ixs_fun,
        /// <exclude/>
        restrictionAlv,
    }

}
