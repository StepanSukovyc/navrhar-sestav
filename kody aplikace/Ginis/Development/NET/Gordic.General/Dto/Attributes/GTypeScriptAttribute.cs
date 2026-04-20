//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GTypeScriptAttribute.cs                      </Name>
//    <Description> Atribut pro označení TypeScript vlastností                  </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2018-04-23                                                  </Created>
//  </FileHeader>

using System;
using System.Diagnostics;

namespace Gordic.General
{
    /// <summary>Atribut pro označení TypeScript vlastností</summary>
    [DebuggerDisplay("[TypeScript(Type={Type})]")]
    [AttributeUsage(AttributeTargets.Field | AttributeTargets.Property, AllowMultiple = false)]
    public class GTypeScriptAttribute : Attribute
    {
        /// <summary>TypeScript type</summary>
        public string Type { get; set; }

        /// <summary>Povolit null hodnotu?</summary>
        public bool AllowNull { get; set; } = true;

        /// <summary>Povolit undefined hodnotu?</summary>
        public bool AllowUndefined { get; set; } = true;

        /// <summary>Vlastnost pouze pro čtení?</summary>
        public bool ReadOnly { get; set; } = false;

        /// <summary>Ctor</summary>
        public GTypeScriptAttribute()
        { }
    }
    /// <summary>Atribut pro označení ignore vlastnosti nebo třídy pro TypeScript generátor</summary>
    [DebuggerDisplay("[TypeScriptIgnore]")]
    [AttributeUsage(AttributeTargets.Field | AttributeTargets.Property | AttributeTargets.Class | AttributeTargets.Interface | AttributeTargets.Enum, AllowMultiple = false)]
    public class GTypeScriptIgnoreAttribute : Attribute
    {
    }
}