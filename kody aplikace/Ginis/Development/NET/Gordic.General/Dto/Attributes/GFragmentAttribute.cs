//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GFragmentAttribute.cs                        </Name>
//    <Description> Atribut pro oznaceni příslušnosti k fragmentu v DTO         </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2018-10-22                                                  </Created>
//  </FileHeader>

using System;
using System.Diagnostics;

namespace Gordic.General
{
    /// <summary>Atribut pro označení příslušnosti k fragmentu v DTO </summary>
    [DebuggerDisplay("[GFragment({Name})]")]
    [AttributeUsage(AttributeTargets.Field | AttributeTargets.Property, AllowMultiple = true)]
    public class GFragmentAttribute : Attribute
    {
        /// <summary>Jméno fragmentu</summary>
        public string Name { get; set; }

        /// <summary>Konstruktor</summary>
        public GFragmentAttribute(string name) { Name = name; }

        /// <summary>Konstruktor</summary>
        public GFragmentAttribute(GDefaultFragment f)
        {
            Name = f.ToString();
        }
    }
    /// <summary>Předdefinované fragmenty</summary>
    public enum GDefaultFragment
    {
        /// <summary>Výchozí fragment</summary>
        Default,
        /// <summary>Základní fragment</summary>
        Base,
        /// <summary>Fragment pro minimální set sloupců</summary>
        Minimal,
        /// <summary>Fragment pro rozšířený set sloupců</summary>
        Extended,
        /// <summary>Fragment pro rozšířený set sloupců 2</summary>
        Extended2,
        /// <summary>Fragment pro rozšířený set sloupců 3</summary>
        Extended3,
        /// <summary>Fragment pro oprávnění</summary>
        Permissions,
    };


    [DebuggerDisplay("[GForeignKey({Scope}, {Name})]")]
    [AttributeUsage(AttributeTargets.Field | AttributeTargets.Property, AllowMultiple = true)]
    public class GForeignKeyAttribute : Attribute
    {
        /// <summary>Scope - jméno vlastnosti s vázaným objektem</summary>
        public string Scope { get; set; }
        /// <summary>jméno klíče ve vázaném objektu</summary>
        public string Property { get; set; }

        public GForeignKeyAttribute(string scope, string property) { Scope = scope; Property = property; }

    }



}
