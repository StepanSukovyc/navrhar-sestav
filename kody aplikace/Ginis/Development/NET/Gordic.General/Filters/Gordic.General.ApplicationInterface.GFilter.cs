//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.ApplicationInterface.GFilter.cs              </Name>
//    <Description> Dynamický generický filtr pro předávání kritérií na filtraci</Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2006-01-13                                                  </Created>
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
    /// Dynamický generický filtr pro předávání kritérií na filtraci
    /// </summary>
    /// <remarks>
    /// Filtr se skládá z Identifikace filtru a kolekce operátorů a hodnot.
    /// Identifikace filtru určuje, jak bude filtr filtrovat - podle ní aplikační server určuje nad kterými sloupci tabulky vytvoří v selectu WHERE podmnínku.
    /// Operátor je výčet určující jakým operátorem se má porovnávat hodnota (Equal, Greater, Lower, Like, In....)
    /// Hodnota je potom hodnota, která se má vyskytovat.
    /// K jednomu filtru se může vázat více dvojic operátor-hodnota. 
    /// Například filtr pro filtraci jména může mít operátor Equal, hodnotu "Pavel" a dále oprátor Equal "Jan".
    /// Aplikační server více hodnot pro jeden filtr většinou zpracovává tak, že mezi ně vkládá operátor OR. Je-li tomu jinak, mělo by to v popisu filtru být uvedeno.
    /// </remarks>
    [Serializable()]
    public class GFilter<TFilterId> : GBaseFilter<IGDbType>, IGFilter where TFilterId : Enum
    {
        #region ****************** Konstruktory *********************
        //---------------------------------------------------------------------
        /// <summary>
        /// Implicitní konstruktor, vytvoří neinicializovaný filtr IsEmpty = true
        /// </summary>
        public GFilter()
        {
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor -  zakládá filtr pro sloupec i s identifikací sloupce
        /// </summary>
        /// <param name="filterId">identifikátor filtru - měl by se předat výčet říkající aplikační logice, co tento filtr znamená (např. filtruje podle názvu)</param>
        public GFilter(TFilterId filterId)
        {
            FilterId = filterId;
        }
        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor -  zakládá filtr pro sloupec i s identifikací sloupce
        /// </summary>
        /// <param name="filterId">identifikátor filtru - měl by se předat výčet říkající aplikační logice, co tento filtr znamená (např. filtruje podle názvu)</param>
        /// <param name="caseSensitive">zda se má tetstovat case sensitive</param>
        public GFilter(TFilterId filterId, bool caseSensitive)
        {
            FilterId = filterId;
            m_bCaseSensitive = caseSensitive;
        }
        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor -  zakládá filtr pro sloupec i s identifikací sloupce
        /// </summary>
        /// <param name="filterId">identifikátor filtru - měl by se předat výčet říkající aplikační logice, co tento filtr znamená (např. filtruje podle názvu)</param>
        /// <param name="values">kolekce hodnot a operátorů</param>
        public GFilter(TFilterId filterId, params GOperatorValue<IGDbType>[] values)
        {
            m_aoFilterValues.AddRange(values);
            FilterId = filterId;
        }
        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor -  zakládá filtr pro sloupec i s identifikací sloupce
        /// </summary>
        /// <param name="filterId">identifikátor filtru - měl by se předat výčet říkající aplikační logice, co tento filtr znamená (např. filtruje podle názvu)</param>
        /// <param name="values">kolekce hodnot a operátorů</param>
        public GFilter(TFilterId filterId, IEnumerable<GOperatorValue<IGDbType>> values)
        {
            m_aoFilterValues.AddRange(values);
            FilterId = filterId;
        }
        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor -  zakládá filtr pro sloupec i s identifikací sloupce
        /// </summary>
        /// <param name="filterId">identifikátor filtru - měl by se předat výčet říkající aplikační logice, co tento filtr znamená (např. filtruje podle názvu)</param>
        /// <param name="values">kolekce hodnot a operátorů</param>
        public GFilter(TFilterId filterId, params IGOperatorValue[] values)
        {
            foreach (IGOperatorValue ov in values)
            {
                m_aoFilterValues.Add(new GOperatorValue<IGDbType>(ov.Operator, ov.Value));
            }
            FilterId = filterId;
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor -  zakládá filtr pro sloupec i s identifikací sloupce
        /// </summary>
        /// <param name="filterId">identifikátor filtru - měl by se předat výčet říkající aplikační logice, co tento filtr znamená (např. filtruje podle názvu)</param>
        /// <param name="caseSensitive">zda se má tetstovat case sensitive</param>
        /// <param name="values">kolekce hodnot a operátorů</param>
        public GFilter(TFilterId filterId, bool caseSensitive, params GOperatorValue<IGDbType>[] values)
        {
            m_aoFilterValues.AddRange(values);
            FilterId = filterId;
            m_bCaseSensitive = caseSensitive;
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor - zakládá filtr pro sloupec i s identifikací sloupce
        /// </summary>
        /// <param name="filterId">identifikátor filtru - měl by se předat výčet říkající aplikační logice, co tento filtr znamená (např. filtruje podle názvu)</param>
        /// <param name="baseFilter">baseFilter bez FilterId</param>
        public GFilter(TFilterId filterId, GBaseFilter<IGDbType> baseFilter)
        {
            if (baseFilter == null) throw new GArgumentNullException(21000042, "baseFilter");
            FilterId = filterId;
            m_bCaseSensitive = baseFilter.CaseSensitive;
            Enabled = baseFilter.Enabled;
            DefaultFilter = baseFilter.DefaultFilter;
            foreach (GOperatorValue<IGDbType> val in baseFilter.OperatorValueList)
            {
                m_aoFilterValues.Add((GOperatorValue<IGDbType>)val.Clone());
            }
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor -  zakládá filtr pro sloupec i s identifikací sloupce
        /// </summary>
        /// <param name="filterId">identifikátor filtru - měl by se předat výčet říkající aplikační logice, co tento filtr znamená (např. filtruje podle názvu)</param>
        /// <param name="v1">první hodnota</param>
        /// <param name="v2">druhá hodnota</param>
        /// <param name="inValues">kolekce hodnot které budou spojeny v in.</param>
        public GFilter(TFilterId filterId, IGDbType v1, IGDbType v2, params IGDbType[] inValues)
        {
            m_aoFilterValues.Add(new GOperatorValue<IGDbType>(OperatorEnum.In, v1));
            m_aoFilterValues.Add(new GOperatorValue<IGDbType>(OperatorEnum.In, v2));
            foreach (IGDbType val in inValues)
            {
                m_aoFilterValues.Add(new GOperatorValue<IGDbType>(OperatorEnum.In, val));
            }
            FilterId = filterId;
        }
        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor -  zakládá filtr pro sloupec i s identifikací sloupce
        /// </summary>
        /// <param name="filterId">identifikátor filtru - měl by se předat výčet říkající aplikační logice, co tento filtr znamená (např. filtruje podle názvu)</param>
        /// <param name="inValues">kolekce hodnot které budou spojeny v in. Je-li předána pouze jedna hodnota, bude použit operátor equal.</param>
        public GFilter(TFilterId filterId, ICollection<IGDbType> inValues)
        {
            foreach (IGDbType val in inValues)
            {
                m_aoFilterValues.Add(new GOperatorValue<IGDbType>(ColOperator((ICollection)inValues), val));
            }
            FilterId = filterId;
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor -  zakládá filtr pro sloupec i s identifikací sloupce
        /// </summary>
        /// <param name="filterId">identifikátor filtru - měl by se předat výčet říkající aplikační logice, co tento filtr znamená (např. filtruje podle názvu)</param>
        /// <param name="val">hodnota</param>
        /// <param name="operato">operátor</param>
        public GFilter(TFilterId filterId, OperatorEnum operato, IGDbType val)
        {
            m_aoFilterValues.Add(new GOperatorValue<IGDbType>(operato, val));
            FilterId = filterId;
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor -  zakládá filtr pro sloupec i s identifikací sloupce
        /// </summary>
        /// <param name="filterId">identifikátor filtru - měl by se předat výčet říkající aplikační logice, co tento filtr znamená (např. filtruje podle názvu)</param>
        /// <param name="val">hodnota</param>
        /// <param name="operato">operátor</param>
        /// <param name="caseSensitive">zda se má tetstovat case sensitive</param>
        public GFilter(TFilterId filterId, OperatorEnum operato, IGDbType val, bool caseSensitive)
        {
            m_aoFilterValues.Add(new GOperatorValue<IGDbType>(operato, val));
            FilterId = filterId;
            m_bCaseSensitive = caseSensitive;
        }

        #endregion
        #region ****************** Ostatní **************************
        //---------------------------------------------------------------------
        /// <summary>
        /// Vyrobí kopii instance filtru
        /// </summary>
        /// <returns></returns>
        public override object Clone()
        {
            GFilter<TFilterId, IGDbType> l_oNewFilter = new GFilter<TFilterId, IGDbType>();
            l_oNewFilter.FilterId = this.FilterId;
            l_oNewFilter.m_bCaseSensitive = this.m_bCaseSensitive;
            l_oNewFilter.Enabled = this.Enabled;
            l_oNewFilter.DefaultFilter = this.DefaultFilter;
            foreach (GOperatorValue<IGDbType> val in m_aoFilterValues)
            {
                l_oNewFilter.m_aoFilterValues.Add((GOperatorValue<IGDbType>)val.Clone());
            }
            return l_oNewFilter;
        }

        #endregion
        #region ******************* Veřejné vlastnosti *****************
        //---------------------------------------------------------------------
        /// <summary>Idenitifikátor sloupce</summary>
        protected TFilterId m_oFilterId;
        /// <summary>
        /// Identifikace sloupce - vazba mezi prezenční a aplikační logikou
        /// </summary>
        public virtual TFilterId FilterId
        {
            get { return m_oFilterId; }
            set { m_oFilterId = value; }
        }
        int IGFilter.FilterId
        {
            get => Convert.ToInt32(FilterId);
            set => FilterId = (TFilterId)((object)value);
        }
        string IGFilter.FilterName => FilterId.ToString();

        //---------------------------------------------------------------------
        /// <summary>
        /// Převede a string
        /// </summary>
        /// <returns>string</returns>
        public override string ToString()
        {
            return FilterId.ToString() + " " + base.ToString();
        }

        #endregion
        #region ************* Veřejné statické metody *****************
        //---------------------------------------------------------------------
        /// <summary>
        /// Spojí dvě pole filtrů do jednoho
        /// </summary>
        /// <param name="filterArray">pole filtrů</param>
        /// <param name="addFilters">nové pole filtrů</param>
        /// <returns>spojená pole filtrů</returns>
        public static GFilter<TFilterId>[] JoinFilters(GFilter<TFilterId>[] filterArray, params GFilter<TFilterId>[] addFilters)
        {
            return GFilterSet<TFilterId>.JoinFilterArrays(filterArray, addFilters);
        }
        public static GFilterSet<TFilterId> JoinFilters(GFilterSet<TFilterId> filterSet, params GFilter<TFilterId>[] addFilters)
        {
            return GFilterSet<TFilterId>.JoinFilters(filterSet, addFilters);
        }
        public static GFilterSet<TFilterId> JoinFilters(GFilterSet<TFilterId> filterSet, GFilterSet<TFilterId> addFilters)
        {
            return GFilterSet<TFilterId>.JoinFilters(filterSet, addFilters);
        }
        #endregion
    }

    /// <summary>
    /// Dynamický generický filtr pro předávání kritérií na filtraci
    /// </summary>
    /// <remarks>
    /// Filtr se skládá z Identifikace filtru a kolekce operátorů a hodnot.
    /// Identifikace filtru určuje, jak bude filtr filtrovat - podle ní aplikační server určuje nad kterými sloupci tabulky vytvoří v selectu WHERE podmnínku.
    /// Operátor je výčet určující jakým operátorem se má porovnávat hodnota (Equal, Greater, Lower, Like, In....)
    /// Hodnota je potom hodnota, která se má vyskytovat.
    /// K jednomu filtru se může vázat více dvojic operátor-hodnota. 
    /// Například filtr pro filtraci jména může mít operátor Equal, hodnotu "Pavel" a dále oprátor Equal "Jan".
    /// Aplikační server více hodnot pro jeden filtr většinou zpracovává tak, že mezi ně vkládá operátor OR. Je-li tomu jinak, mělo by to v popisu filtru být uvedeno.
    /// </remarks>
    [Serializable()]
    public class GFilter<TFilterId, TValue> : GFilter<TFilterId> where TFilterId : Enum
        where TValue : IGDbType, ICloneable, IGObject
    {
        #region ****************** Konstruktory *********************
        //---------------------------------------------------------------------
        /// <summary>
        /// Implicitní konstruktor, vytvoří neinicializovaný filtr IsEmpty = true
        /// </summary>
        public GFilter()
            : base()
        {
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor -  zakládá filtr pro sloupec i s identifikací sloupce
        /// </summary>
        /// <param name="filterId">identifikátor filtru - měl by se předat výčet říkající aplikační logice, co tento filtr znamená (např. filtruje podle názvu)</param>
        public GFilter(TFilterId filterId)
            : base(filterId)
        {
        }
        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor -  zakládá filtr pro sloupec i s identifikací sloupce
        /// </summary>
        /// <param name="filterId">identifikátor filtru - měl by se předat výčet říkající aplikační logice, co tento filtr znamená (např. filtruje podle názvu)</param>
        /// <param name="caseSensitive">zda se má tetstovat case sensitive</param>
        public GFilter(TFilterId filterId, bool caseSensitive)
            : base(filterId, caseSensitive)
        {
        }
        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor -  zakládá filtr pro sloupec i s identifikací sloupce
        /// </summary>
        /// <param name="filterId">identifikátor filtru - měl by se předat výčet říkající aplikační logice, co tento filtr znamená (např. filtruje podle názvu)</param>
        /// <param name="values">kolekce hodnot a operátorů</param>
        public GFilter(TFilterId filterId, params GOperatorValue<IGDbType>[] values)
            : base(filterId, values)
        {
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor -  zakládá filtr pro sloupec i s identifikací sloupce
        /// </summary>
        /// <param name="filterId">identifikátor filtru - měl by se předat výčet říkající aplikační logice, co tento filtr znamená (např. filtruje podle názvu)</param>
        /// <param name="values">kolekce hodnot a operátorů</param>
        public GFilter(TFilterId filterId, params GOperatorValue<TValue>[] values)
            : base(filterId, values)
        {
        }
        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor -  zakládá filtr pro sloupec i s identifikací sloupce
        /// </summary>
        /// <param name="filterId">identifikátor filtru - měl by se předat výčet říkající aplikační logice, co tento filtr znamená (např. filtruje podle názvu)</param>
        /// <param name="caseSensitive">zda se má tetstovat case sensitive</param>
        /// <param name="values">kolekce hodnot a operátorů</param>
        public GFilter(TFilterId filterId, bool caseSensitive, params GOperatorValue<IGDbType>[] values)
            : base(filterId, caseSensitive, values)
        {
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor -  zakládá filtr pro sloupec i s identifikací sloupce
        /// </summary>
        /// <param name="filterId">identifikátor filtru - měl by se předat výčet říkající aplikační logice, co tento filtr znamená (např. filtruje podle názvu)</param>
        /// <param name="caseSensitive">zda se má tetstovat case sensitive</param>
        /// <param name="values">kolekce hodnot a operátorů</param>
        public GFilter(TFilterId filterId, bool caseSensitive, params GOperatorValue<TValue>[] values)
            : base(filterId, caseSensitive)
        {
            foreach (GOperatorValue<TValue> val in values)
            {
                m_aoFilterValues.Add(new GOperatorValue<IGDbType>(val));
            }
        }

        ////---------------------------------------------------------------------
        ///// <summary>
        ///// Konstruktor - zakládá filtr pro sloupec i s identifikací sloupce
        ///// </summary>
        ///// <param name="filterId">identifikátor filtru - měl by se předat výčet říkající aplikační logice, co tento filtr znamená (např. filtruje podle názvu)</param>
        ///// <param name="baseFilter">baseFilter bez FilterId</param>
        //public GFilter(TFilterId filterId, GBaseFilter<IGDbType> baseFilter)
        //    : base(filterId, baseFilter)
        //{
        //}

        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor - zakládá filtr pro sloupec i s identifikací sloupce
        /// </summary>
        /// <param name="filterId">identifikátor filtru - měl by se předat výčet říkající aplikační logice, co tento filtr znamená (např. filtruje podle názvu)</param>
        /// <param name="baseFilter">baseFilter bez FilterId</param>
        public GFilter(TFilterId filterId, GBaseFilter<TValue> baseFilter)
        {
            if (baseFilter == null) throw new GArgumentNullException(21000044, "baseFilter");
            FilterId = filterId;
            m_bCaseSensitive = baseFilter.CaseSensitive;
            Enabled = baseFilter.Enabled;
            DefaultFilter = baseFilter.DefaultFilter;
            foreach (GOperatorValue<TValue> val in baseFilter.OperatorValueList)
            {
                m_aoFilterValues.Add(new GOperatorValue<IGDbType>(val));
            }
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor -  zakládá filtr pro sloupec i s identifikací sloupce
        /// </summary>
        /// <param name="filterId">identifikátor filtru - měl by se předat výčet říkající aplikační logice, co tento filtr znamená (např. filtruje podle názvu)</param>
        /// <param name="inValues">kolekce hodnot které budou spojeny v in. Je-li předána pouze jedna hodnota, bude použit operátor equal.</param>
        public GFilter(TFilterId filterId, ICollection<TValue> inValues)
        {
            foreach (TValue val in inValues)
            {
                m_aoFilterValues.Add(new GOperatorValue<IGDbType>(ColOperator((ICollection)inValues), val));
            }
            FilterId = filterId;
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor -  zakládá filtr pro sloupec i s identifikací sloupce
        /// </summary>
        /// <param name="filterId">identifikátor filtru - měl by se předat výčet říkající aplikační logice, co tento filtr znamená (např. filtruje podle názvu)</param>
        /// <param name="v1">první hodnota</param>
        /// <param name="v2">druhá hodnota</param>
        /// <param name="inValues">kolekce hodnot které budou spojeny v in.</param>
        public GFilter(TFilterId filterId, TValue v1, TValue v2, params IGDbType[] inValues)
            : base(filterId, v1, v2, inValues)
        {
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor -  zakládá filtr pro sloupec i s identifikací sloupce
        /// </summary>
        /// <param name="filterId">identifikátor filtru - měl by se předat výčet říkající aplikační logice, co tento filtr znamená (např. filtruje podle názvu)</param>
        /// <param name="val">hodnota</param>
        /// <param name="operato">operátor</param>
        public GFilter(TFilterId filterId, OperatorEnum operato, TValue val)
            : base(filterId,operato,val)
        {
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor -  zakládá filtr pro sloupec i s identifikací sloupce
        /// </summary>
        /// <param name="filterId">identifikátor filtru - měl by se předat výčet říkající aplikační logice, co tento filtr znamená (např. filtruje podle názvu)</param>
        /// <param name="val">hodnota</param>
        /// <param name="operato">operátor</param>
        /// <param name="caseSensitive">zda se má tetstovat case sensitive</param>
        public GFilter(TFilterId filterId, OperatorEnum operato, TValue val, bool caseSensitive)
            : base(filterId,operato,val,caseSensitive)
        {
        }

        #endregion

        //---------------------------------------------------------------------
        /// <summary>
        /// Přidá hodnotu do filtru
        /// </summary>
        /// <param name="val">hodnota - dvojice text a podmínka testu</param>
        public void AddFilterValue(GOperatorValue<TValue> val)
        {
            m_aoFilterValues.Add(new GOperatorValue<IGDbType>(val));
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Vyrobí kopii instance filtru
        /// </summary>
        /// <returns></returns>
        public override object Clone()
        {
            GFilter<TFilterId, TValue> l_oNewFilter = new GFilter<TFilterId, TValue>();
            l_oNewFilter.FilterId = this.FilterId;
            l_oNewFilter.m_bCaseSensitive = this.m_bCaseSensitive;
            l_oNewFilter.Enabled = this.Enabled;
            l_oNewFilter.DefaultFilter = this.DefaultFilter;
            foreach (GOperatorValue<IGDbType> val in m_aoFilterValues)
            {
                l_oNewFilter.m_aoFilterValues.Add((GOperatorValue<IGDbType>)val.Clone());
            }
            return l_oNewFilter;
        }
        //---------------------------------------------------------------------
        /// <summary>
        /// Spojí dvě pole filtrů do jednoho
        /// </summary>
        /// <param name="filterArray">pole filtrů</param>
        /// <param name="addFilters">nové pole filtrů</param>
        /// <returns>spojená pole filtrů</returns>
        public static GFilter<TFilterId, TValue>[] JoinFilters(GFilter<TFilterId, TValue>[] filterArray, params GFilter<TFilterId, TValue>[] addFilters)
        {
            if (filterArray.Length == 0) return addFilters;
            if (addFilters.Length == 0) return filterArray;

            GFilter<TFilterId, TValue>[] l_oNewArray = new GFilter<TFilterId, TValue>[filterArray.Length + addFilters.Length];
            int i = 0;
            foreach (GFilter<TFilterId, TValue> oldFilter in filterArray) l_oNewArray[i++] = oldFilter;
            foreach (GFilter<TFilterId, TValue> newFilter in addFilters) l_oNewArray[i++] = newFilter;
            return l_oNewArray;
        }
    }


}
