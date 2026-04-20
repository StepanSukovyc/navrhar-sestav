//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGDtoPropertyValidator.cs                    </Name>
//    <Description> Iface pro validaci pres property DTO                        </Description>
//    <Author>      bmartinek                                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2016-08-16                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;

namespace Gordic.General
{
    /// <summary>Iface pro validaci pres property DTO</summary>
    public interface IGDtoPropertyValidator
    {
        /// <summary>Validace dto</summary>
        /// <param name="dto">DTO</param>
        /// <param name="validatedDtos">Seznam jiz zvalidovanych DTO</param>
        /// <param name="parentName">Nazev parenta (root ma string.Empty)</param>
        /// <param name="groups">Seznam validacnich skupin</param>
        /// <returns>Seznam vysledku validace (v pripade ze je vse OK, mel by byt vracen prazny seznam)</returns>
        IEnumerable<GValidationResult> Validate(object dto, List<object> validatedDtos, string parentName, string[] groups);
    }
}
