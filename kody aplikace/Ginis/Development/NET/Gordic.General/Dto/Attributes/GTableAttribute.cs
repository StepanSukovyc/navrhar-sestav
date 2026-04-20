//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GTableAttribute.cs                           </Name>
//    <Description> Atribut drzici info o tabulce, ze ktere bylo DTO vygenerovano</Description>
//    <Author>      bmartinek                                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2016-09-07                                                  </Created>
//  </FileHeader>

using System;
using System.Diagnostics;

namespace Gordic.General
{
    /// <summary>Atribut drzici info o tabulce, ze ktere bylo DTO vygenerovano</summary>
    [DebuggerDisplay("[Table({Name})]")]
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
    public class GTableAttribute : Attribute
    {
        /// <summary>Nazev tabulky</summary>
        public string Name { get; set; }

        /// <summary>Ctor</summary>
        public GTableAttribute(string name)
        {
            Name = name;
        }

        /// <summary>Příznak pro update nástroj</summary>
        public bool DbRefresh = false;
        /// <summary>Verze DB pro update nástroj</summary>
        public string DbFromVersion = null;

    }
}
