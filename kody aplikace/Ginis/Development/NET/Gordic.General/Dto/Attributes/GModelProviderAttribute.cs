//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GModelProviderAttribute.cs                   </Name>
//    <Description> Atribut pro urceni DTO k modelu                             </Description>
//    <Author>      bmartinek                                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2016-07-28                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.General
{
    /// <summary>Atribut pro urceni DTO k modelu</summary>
    [AttributeUsage(AttributeTargets.Class)]
    public sealed class GModelProviderAttribute : Attribute
    {
        /// <summary>Datovy typ DTO</summary>
        public Type Type { get; private set; }

        /// <summary>Ctor</summary>
        /// <param name="dtoType">Datovy typ DTO</param>
        public GModelProviderAttribute(Type dtoType)
        {
            Type = dtoType;
        }
    }
}
