//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GValidationContext.cs                        </Name>
//    <Description> Validacni kontext.                                          </Description>
//    <Author>      bmartinek                                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2016-07-28                                                  </Created>
//  </FileHeader>

namespace Gordic.General
{
    /// <summary>
    /// Validacni kontext.
    /// (vychazi ze System.ComponentMode.DataAnnotations.ValidationContext)
    /// </summary>
    public class GValidationContext
    {
        /// <summary>Instance, ve ktere se provadi validace</summary>
        public object ObjectInstance { get; set; }

        /// <summary>Nazev property nebo fieldu, ktere se validuje</summary>
        public string MemberName { get; set; }

        /// <summary>Seznam skupin, ktere maji byt validovany</summary>
        public string[] Groups { get; set; }
    }
}
