//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GVarFazeEnum.cs                              </Name>
//    <Description> Číselník variant programových fází GINIS - to jsou první dvě čísla v řetězci revize</Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>  © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2020-06-16                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.General
{
    /// <summary>
    /// Číselník variant programových fází GINIS - to jsou první dvě čísla v řetězci revize
    /// </summary>
    public enum GVarFazeEnum
    {
        /// <summary>
        /// Ginis Express aplikace
        /// </summary>
        GNE = 10,
        /// <summary>
        /// multi platformní formáty sestavy
        /// </summary>
        GMS = 20,
        /// <summary>
        /// formáty sestav pro modul IPA
        /// </summary>
        GIP = 21,
        /// <summary>
        /// tlustý (WIN32) klient - PB, Centura
        /// </summary>
        GIN = 32,
        /// <summary>
        /// tlustý (WIN.NET) klient
        /// </summary>
        GSA = 40,
        /// <summary>
        /// webová aplikace
        /// </summary>
        GWA = 41,
        /// <summary>
        /// webová služba
        /// </summary>
        GWS = 42,
        /// <summary>
        /// systémová služba
        /// </summary>
        GSS = 43,
        /// <summary>
        /// datawarehouse MS SQL2000
        /// </summary>
        DWH2000 = 50,
        /// <summary>
        /// datawarehouse MS SQL2005
        /// </summary>
        DWH2005 = 51,
        /// <summary>
        /// datawarehouse MS SQL2008
        /// </summary>
        DWH2008 = 52,
        /// <summary>
        /// datawarehouse MS SQL2008 R2
        /// </summary>
        DWH2008R2 = 53
    }
}
