//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GFilterAttribute.cs                          </Name>
//    <Description> Atribut k oznaceni vlastnosti, označující filtr. Pro filtrační DTO</Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2017-03-22                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.General
{
    /// <summary>Atribut k oznaceni vlastnosti, označující filtr. Pro filtrační DTO (IGFilterDto)</summary>
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field, AllowMultiple = false)]
    public sealed class GFilterAttribute : Attribute
    {
        public GFilterAttribute()
        {
        }
        //public GFilterAttribute(Enum enumValue)
        //{
        //    FilterEnumVal = enumValue.ToString();
        //}
        public GFilterAttribute(string enumValue)
        {
            FilterEnumVal = enumValue;
        }

        //NOTE: Bylo by mozne odvodit hodnotu z 
        public string FilterEnumVal { get; set; } //jak nacist primo int z enumu bez 

        public string Group { get; set; }

        public OperatorEnum Operator { get; set; }
    }

    /// <summary>Atribut k oznaceni typu filtracniho DTO pro ISL metody (hlavne list)</summary>
    [AttributeUsage(/*AttributeTargets.Method | */AttributeTargets.Parameter, AllowMultiple = false)]
    public sealed class GFilterDtoAttribute : Attribute
    {
        public GFilterDtoAttribute()
        {
        }
        public GFilterDtoAttribute(Type filterDtoType)
        {
            FilterDtoType = filterDtoType;
        }
        /// <summary>
        /// Typ filtračního DTO. Typ by mel implementovat IGFilterDto
        /// </summary>
        public Type FilterDtoType { get; set; }
    }
}
