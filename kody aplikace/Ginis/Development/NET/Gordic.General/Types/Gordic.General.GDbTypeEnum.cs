//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GDbTypeEnum.cs                               </Name>
//    <Description> Výčet základních GDbType - zděděných z GDbType              </Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2018-12-17                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.General
{
    /// <summary>
    /// Výčet základních GDbType - zděděných z GDbType
    /// </summary>
    public enum GDbTypeEnum
    {
        /// <summary>
        /// Neurčito - nelze zjistit nebo je to obecně nějaká IGDbType
        /// </summary>
        ANY,

        /// <summary>
        /// -32768 až 32767 (SmallInt)
        /// </summary>
        GInt16,

        /// <summary>
        /// -2,147,483,648 až 2,147,483,647 (Integer)
        /// </summary>
        GInt32,

        /// <summary>
        /// -9,223,372,036,854,775,808 až 9,223,372,036,854,775,807 (Long)
        /// </summary>
        GInt64,

        /// <summary>
        /// String 
        /// </summary>
        GString,

        /// <summary>
        /// Datový typ DATE - interně bude uložen vždy jako DateTime
        /// </summary>
        GDate,

        /// <summary>
        /// Datový typ datetime
        /// </summary>
        GDateTime,

        /// <summary>
        /// GEkoDate
        /// </summary>
        GEkoDate,

        ///// <summary>
        ///// -- POZOR! Zatím není vůbec realizovaná podpora tohoto typu
        ///// </summary>
        //TIME,

        /// <summary>
        /// Decimál - při definici lze zadat přesnost a potom budou hodnoty před uložením do ADT proměnné vždy na tuto přesnost zaokrouhleny (finanční zaokrouhlování)
        /// Nebo bude definována bez přesnosti a potom ADT proměnná příjme vždy nejvyšší potřebnou přesnost pro uchování hodnoty
        /// </summary>
        GDecimal,

        /// <summary>
        /// Proměnná typu BOOL
        /// </summary>
        GBoolean,

        /// <summary> 
        /// Proměnná typu BLOB - pole byte
        /// </summary>
        GBlob,

        /// <summary>
        /// G typ pro situace, kdy nelze rozlišit o jaký datový typ se jedná, protože hodnota je NULL
        /// </summary>
        GDbTypeNull,
        /// <summary>
        /// G typ pro tabulku hodnot
        /// </summary>
        GTable
    }
}
