//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Install.Server.GTypModuluEnum.cs                     </Name>
//    <Description> Typ instalačného modulu systému GINIS                       </Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2018-12-12                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.General
{
    /// <summary>
    /// Typ instalačního modulu systému GINIS
    /// </summary>
    public enum GTypModuluEnum
    {
        /// <summary>
        /// Modul je typu spustitelné aplikace
        /// </summary>
        EXE,
        /// <summary>
        /// Modul je typu sestav
        /// </summary>
        SES,
        /// <summary>
        /// Modul je typu dokumentace
        /// </summary>
        DOC,
        /// <summary>
        /// Modul je typu nápověda
        /// </summary>
        HLP,
        /// <summary>
        /// Modul je typu sdílené soubory ( sdílené DLL )
        /// </summary>
        COM,
        /// <summary>
        /// Nejedná se o známý modul systému GINIS
        /// </summary>
        NO,
        /// <summary>
        /// Reporty - mají přiřazeno písmeno R
        /// </summary>
        REP
    }
}
