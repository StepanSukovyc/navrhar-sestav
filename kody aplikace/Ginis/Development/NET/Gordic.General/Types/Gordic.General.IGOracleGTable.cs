//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGOracleGTable.cs                            </Name>
//    <Description> Interface pro získání ORACLE table argument hodnoty         </Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2019-05-13                                                  </Created>
//  </FileHeader>

// funkční varianta s TABLE typem - vyžaduje ale using Oracle.DataAccess.Client;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.General
{
    /// <summary>
    /// Interface pro získání ORACLE table argument hodnoty
    /// </summary>
    public interface IGOracleGTable
    {
        /// <summary>
        /// Funkce pro získání hodnoty ORACLE argumentu typu TABLE
        /// </summary>
        /// <returns></returns>
        object ConvertDataTableToOracleUdt();
    }
}


