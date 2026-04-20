//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.IVariable.cs                           </Name>
//    <Description> rozhraní proměnných                                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-23                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.UndoRedoFramework;
using System;
using System.Collections.Generic;

namespace Gordic.GFE.Parsers.Editor
{
    /// <summary>
    /// rozhraní proměnných
    /// </summary>a
    public interface IVariable
    {
        /// <summary>
        /// Region, kterému daná proměnna patři
        /// </summary>
        IGRRLabel Region { get; set; }
        /// <summary>
        /// Název proměnné
        /// </summary>
        string Name { get; set; }
        /// <summary>
        /// Hodnota proměnné
        /// </summary>
        string ValueScript { get; set; }

        /// <summary>
        /// Typ proměnné
        /// </summary>
        string DataType { get; set; }
    }
    /// <summary>
    /// Třída porovnání dvou proměnných objektů
    /// </summary>
    class VariableComparer : IEqualityComparer<object>
    {
        /// <summary>
        /// Rovná se
        /// </summary>
        /// <param name="x">První objekt pro porovnání</param>
        /// <param name="y">Druhý objekt pro porovnání</param>
        /// <returns></returns>
        public new bool Equals(object x, object y)
        {
            // zkontrolujeme, zda porovnávané objekty odkazují na stejné data
            if (ReferenceEquals(x, y)) return true;
            // zkontrolujeme, zda nějaký z objektu je NULL
            if (ReferenceEquals(x, null) || ReferenceEquals(y, null))
                return false;
            // zkontrolujeme, zda obsa některého z objektu je nULL nebo neimplikuje rozhraní ILineable
            if (!(x is IVariable) || !(y is IVariable))
                return false;

            // zkontrolujeme odkazy na řádky
            return Object.ReferenceEquals(x as IVariable, y as IVariable);
        }

        /// <summary>
        /// Hash kód
        /// </summary>
        /// <param name="obj">Objekt pro výpčet Hash kódu</param>
        /// <returns></returns>
        public int GetHashCode(object obj)
        {
            // zkontrolujeme, zda objekt je NULL nebo obsah není ILineable
            if (ReferenceEquals(obj, null) || !(obj is IVariable)) return 0;

            // získáme hash kód řádku, pokud není NULL.
            return (obj as IVariable) == null ? 0 : (obj as IVariable).GetHashCode();
        }
    }

    /// <summary>
    /// Rozhraní pro práci s proměnnými
    /// </summary>
    public interface IVariableHandler
    {
        /// <summary>
        /// Proměnné
        /// </summary>
        IListComponent<IVariable> Variables { get; }
    }

}
