//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGCustomValidation.cs                        </Name>
//    <Description> IFace pro moznost volani custom validace na modelu          </Description>
//    <Author>      bmartinek                                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2016-08-12                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Gordic.General
{
    /// <summary>IFace pro moznost volani custom validace na modelu</summary>
    public interface IGCustomValidation
    {
        /// <summary>Validace modelu</summary>
        /// <param name="groups">Seznam skupin atributu volanych validaci</param>
        /// <returns></returns>
        IEnumerable<GValidationResult> Validate(string[] groups);
    }
}
