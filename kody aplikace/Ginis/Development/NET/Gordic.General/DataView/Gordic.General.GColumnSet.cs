//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GColumnSet.cs                                </Name>
//    <Description> Množina sloupcù                                             </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2011-11-07                                                  </Created>
//  </FileHeader>

using System;
using System.Data;
using Gordic.General;
using System.Xml;

namespace Gordic.General
{
    //---------------------------------------------------------------------
    /// <summary>
    /// Množina sloupcù
    /// </summary>
    public class GColumnSet : IGObject
    {

        /// <summary>Množina sloupcù</summary>
        public GColumnSet()
        {
        }

        //------------------------------------------------------------------
        private bool m_AllowReorder = false;
        ///<summary>povolení pøerovnání sloupcù ve skupinì (v rámci skupiny)</summary>
        public bool AllowReorder
        {
            get { return m_AllowReorder; }
            set { m_AllowReorder = value; }
        }

    }

}
