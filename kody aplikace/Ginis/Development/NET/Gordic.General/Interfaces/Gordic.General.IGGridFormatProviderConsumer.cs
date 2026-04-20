//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGGridFormatProviderConsumer.cs              </Name>
//    <Description> Výčet účelu formátovacího předpisu pro grid                 </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                  </Copyright>
//    <Created>     2008-09-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;

namespace Gordic.General
{
    /// <summary>
    /// Výčet účelu formátovacího předpisu pro grid. Pro různé učely je možno vytvářet modifikované předpisy
    /// </summary>
    public enum GGridFormatIntent
    {
        /// <summary>
        /// Určeno pro prohlížení na obrazovce (Grid)
        /// </summary>
        Viewing,
        /// <summary>
        /// Určeno pro filtrování uživatelem (různé filtrovací komponenty)
        /// </summary>
        Filtering,
        /// <summary>
        /// Určeno pro tisk (operativní tisk)
        /// </summary>
        Printing,
        /// <summary>
        /// Určeno pro tisk vybraných řádků (operativní tisk)
        /// </summary>
        PrintingSelected,
    }

    /// <summary>
    /// Kompomenta umí vytvořit předpis pro formátování gridu
    /// </summary>
    public interface IGGridFormatProvider
    {
        /// <summary>
        /// Vytvoření předpisu pro formátování gridu
        /// </summary>
        /// <param name="intent">zamýšlený účel</param>
        /// <param name="data">vrací data</param>
        /// <param name="format">vrací formátovací předpis</param>
        void GetGridFormat(GGridFormatIntent intent, out object data, out GGridFormat format);

        /// <summary>
        /// Formátovací předpis (interní, nebo nově vytvořený pro účel zobrazení)
        /// </summary>
        GGridFormat GridFormat { get; }
    }

    /// <summary>
    /// Kompomenta umí načíst předpis pro formátování gridu
    /// </summary>
    public interface IGGridFormatConsumer
    {
        /// <summary>
        /// Nastavení gridu na předaná data a formát
        /// </summary>
        /// <param name="data">data</param>
        /// <param name="format">formát</param>
        void SetGridFormat(object data, GGridFormat format);
        /// <summary>
        /// Nastavení formátovacího předpisu
        /// </summary>
        GGridFormat GridFormat { set; }
    }


}
