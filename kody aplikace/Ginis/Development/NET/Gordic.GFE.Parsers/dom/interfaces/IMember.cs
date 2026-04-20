//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IMember.cs                               </Name>
//    <Description> jednotka fromátu sestavy                                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-27                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using Gordic.GFE.Parsers.Binding;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// výčet umístění atributu
    /// </summary>
    public enum AttributeTarget
    {
        /// <summary>
        /// neznámé
        /// </summary>
        None,
        /// <summary>
        /// pole
        /// </summary>
        Field,
        /// <summary>
        /// styl
        /// </summary>
        Style
    }

    /// <summary>
    /// rozhraní atributu
    /// </summary>
    public interface IAttribute : IFreezable
    {
        /// <summary>
        /// kompilační jednotka atributu.
        /// </summary>
        ICompilationUnit CompilationUnit { get; }

        /// <summary>
        /// region atributu.
        /// </summary>
        DomRegion Region { get; }
        /// <summary>
        /// umístění atributu
        /// </summary>
        AttributeTarget AttributeTarget { get; }

        /// <summary>
        /// argumenty atributu
        /// </summary>
        IList<object> PositionalArguments { get; }
        /// <summary>
        /// vyjmenované argumenty
        /// </summary>
        IDictionary<string, object> NamedArguments { get; }
    }

    /// <summary>
    /// jednotka fromátu sestavy
    /// </summary>
    public interface IEntity : IFreezable, IComparable
    {
        /// <summary>
        /// název jednotky
        /// </summary>
        string Name { get; }

        /// <summary>
        /// tělo jednotky
        /// </summary>
        DomRegion BodyRegion { get; }
        /// <summary>
        /// atributy jednotky
        /// </summary>
        IList<IAttribute> Attributes { get; }
    }

    /// <summary>
    /// člen formátu sestavy
    /// </summary>
    public interface IMember : IEntity, ICloneable
    {
        /// <summary>
        /// region jednotky (bez těla)
        /// </summary>
        DomRegion Region { get; }        
    }

    /// <summary>
    /// pole
    /// </summary>
    public interface IField : IMember
    {
        /// <summary>TRUE - proměnná proměněná na pole.</summary>
        bool IsLocalVariable { get; }
        /// <summary>TRUE - parametr přeměněný na pole</summary>
        bool IsParameter { get; }
    }
}
