//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.ApplicationInterface.IGFilter.cs             </Name>
//    <Description> Interfaces pro práci s filtry                               </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2008-07-24                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;
using Gordic.General;

namespace Gordic.General
{

    /// <summary>
    /// BaseFiltr interface
    /// </summary>
    public interface IGBaseFilter
    {
        /// <summary>Pole dvojic operátor/hodnota podle kterých se bude danný sloupec filtrovat</summary>
        IGOperatorValue[] OperatorValueList { get; }
        ///<summary>Zda je filtr povolen, je-li zakázán, bude ho WhereBuilder ignorovat při vytváření klauzule Where</summary>
        bool Enabled { get; set; }
        /// <summary>Zda bude hrát při porovnání roli velikost písmen</summary>
        bool CaseSensitive { get; set; }
        /////<summary>Zde lze k dannému sloupci uložit libovolnou pomocnou informaci, na funkci nemající vliv</summary>
        /// <summary>Přidá hodnotu do filtru</summary>
        void AddFilterValue(IGOperatorValue val);
        ///<summary>True, pokud je filtr zakázán nebo neobsahuje žádnou hodnotu</summary>
        bool IsEmpty { get; }
        ///<summary>složený filtr</summary>
        bool IsCompound();
        /// <summary>Odstraní všechny hodnoty z filtru sloupce</summary>
        void ClearValues();
        /// <summary>Převede na string</summary>
        string Serialize();
        /// <summary>Příznak výchozího filtru, např. aktivita=100</summary>
        bool DefaultFilter { get; }
    }

    /// <summary>
    /// Filtr interface
    /// </summary>
    public interface IGFilter : IGBaseFilter
    {
        /// <summary>Identifikace sloupce - vazba mezi prezenční a aplikační logikou</summary>
        int FilterId { get; set; }
        /// <summary>Identifikace sloupce - vazba mezi prezenční a aplikační logikou</summary>
        string FilterName { get; }
    }

    /// <summary>
    /// OperatorValue interface
    /// </summary>
    public interface IGOperatorValue
    {
        /// <summary>Hodnota v sloupci podle které se filtruje</summary>
        IGDbType Value { get; }
        /// <summary>Jaká podmínka je použita pro filtrování podle této hodnoty</summary>
        OperatorEnum Operator { get; }
    }

}
