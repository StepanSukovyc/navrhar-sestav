//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GKeyAttribute.cs                             </Name>
//    <Description> Atribut pro oznaceni primarniho klice property v DTO        </Description>
//    <Author>      bmartinek                                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2016-07-28                                                  </Created>
//  </FileHeader>

using System;
using System.Diagnostics;

namespace Gordic.General
{
    /// <summary>Atribut pro oznaceni primarniho klice property v DTO </summary>
    [DebuggerDisplay("[Key({Order})]")]
    [AttributeUsage(AttributeTargets.Field|AttributeTargets.Property, AllowMultiple = false)]
    public class GKeyAttribute : Attribute
    {
        /// <summary>Poradi klice v tbl (od 0). Je-li jediny, zustane 0.</summary>
        public int Order { get; set; }

        /// <summary>Ctor</summary>
        public GKeyAttribute()
        {}
    }
}
