//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.ApplicationInterface.GValueFilter.cs         </Name>
//    <Description> Filtr (base), který mùže obsahovat jen pouze jednu hodnotu  </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2008-09-08                                                  </Created>
//  </FileHeader>

using System;
using System.Data;
using Gordic.General;
using System.Collections;
using System.Collections.Generic;

namespace Gordic.General
{

    //---------------------------------------------------------------------
    /// <summary>
    /// Filtr (base), který mùže obsahovat jen pouze jednu hodnotu
    /// </summary>
    [Serializable()]
    public class GValueFilter<TValue> : GBaseFilter<TValue>
        where TValue : IGDbType, ICloneable, IGObject
    {
        //---------------------------------------------------------------------
        /// <summary>
        /// Implicitní konstruktor, vytvoøí neinicializovaný filtr
        /// </summary>
        public GValueFilter()
        {
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Vytvoøí nový filtr na rovnost jedné hodnoty
        /// </summary>
        public static implicit operator GValueFilter<TValue>(TValue value)
        {
            //viz tez GFilterConverter.ConvertFrom
            return new GValueFilter<TValue>(value);
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor - zakládá filtr pro sloupec
        /// </summary>
        /// <param name="values">kolekce hodnot a operátorù</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        public GValueFilter(params GOperatorValue<TValue>[] values)
        {
            if (values.Length > 1) throw new GArgumentOutOfRangeException(21000028);
            m_aoFilterValues.AddRange(values);
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor - zakládá filtr pro sloupec
        /// </summary>
        /// <param name="value">hodnota</param>
        public GValueFilter(TValue value)
        {
            m_aoFilterValues.Add(new GOperatorValue<TValue>(OperatorEnum.Equal, value));
        }

        /// <summary>
        /// Konstruktor - zakládá filtr pro sloupec
        /// </summary>
        /// <param name="caseSensitive">zda se má tetstovat case sensitive</param>
        /// <param name="value">hodnota</param>
        public GValueFilter(bool caseSensitive, TValue value)
        {
            m_aoFilterValues.Add(new GOperatorValue<TValue>(OperatorEnum.Equal, value));
            m_bCaseSensitive = caseSensitive;
        }

        ////---------------------------------------------------------------------
        ///// <summary>
        ///// Pøidá hodnotu do filtru
        ///// </summary>
        ///// <param name="val">hodnota - dvojice text a podmínka testu</param>
        //public void AddFilterValue(GOperatorValue<TValue> val)
        //{
        //    m_aoFilterValues.Add(val);
        //}

    }
}
