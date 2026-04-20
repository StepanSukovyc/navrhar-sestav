//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGDbTypeDateTime.cs                          </Name>
//    <Description> Interface pro datumčas hodnoty - tedy GDate, GDateTime,     </Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2019-10-11                                                  </Created>
//  </FileHeader>


using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.General
{
    /// <summary>
    /// Interface pro datumčas hodnoty - tedy GDate, GDateTime, 
    /// Pro dynamické převody celočíselných typů navzájem
    /// </summary>
    public interface IGDbTypeDateTime : IGDbType
    {
        /// <summary>
        /// 
        /// </summary>
        DateTime Value { get; set; }

        /// <summary>
        /// Příznak, že hodnota je dynamického databázového typu current - tedy z pohledu c# má hodnotu NULL ale při ukládání do 
        /// databáze se automaticky zamění za current
        /// </summary>
        bool IsCurrent { get;  }
    }
}
