//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.ApplicationInterface.GFilterSet.cs           </Name>
//    <Description> Množina filtrů, obvykle spojených AND operátorem            </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2022-03-30                                                  </Created>
//  </FileHeader>

using System;
using System.Data;
using Gordic.General;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Diagnostics;

namespace Gordic.General
{
    /// <summary>
    /// Množina filtrů, obvykle spojených AND operátorem
    /// </summary>
    public interface IGFilterSet : IGObject
    {
        Type FilterType { get; }
    }

    [Serializable]
    public abstract class GFilterSetAbstract
    { 
    }

    /// <summary>
    /// Množina filtrů, obvykle spojených AND operátorem
    /// </summary>
    [Serializable]
    public class GFilterSet<TFilterId> : GFilterSetAbstract, IGFilterSet, IEnumerable<GFilter<TFilterId>>
        where TFilterId : Enum
    {
        /// <summary>Filtry</summary>
        [DebuggerBrowsable(DebuggerBrowsableState.RootHidden)]
        protected List<GFilter<TFilterId>> m_filters;
        [DebuggerBrowsable(DebuggerBrowsableState.Never)]
        public int Length => m_filters.Count;
        [DebuggerBrowsable(DebuggerBrowsableState.Never)]
        public int Count => m_filters.Count;
        public GFilter<TFilterId> this[int index]
        {
            get => m_filters[index];
            set => m_filters[index] = value;
        }

        //------------------------------------------------------------------
        public GFilterSet<TFilterId> AddRange(IEnumerable<GFilter<TFilterId>> range) { m_filters.AddRange(range); return this; }
        /// <summary>Filtry</summary>
        public static implicit operator GFilterSet<TFilterId>(GFilter<TFilterId> filter) => new GFilterSet<TFilterId>().Add(filter);
        /// <summary>Filtry</summary>
        public static implicit operator GFilterSet<TFilterId>(GFilter<TFilterId>[] filters) => new GFilterSet<TFilterId>().AddRange(filters);
        /// <summary>Filtry</summary>
        public static implicit operator GFilterSet<TFilterId>(List<GFilter<TFilterId>> filters) => new GFilterSet<TFilterId>(filters);

        /// <summary>Filtry</summary>
        public static implicit operator GFilter<TFilterId>[](GFilterSet<TFilterId> set) => set.m_filters.ToArray();
        /// <summary>Filtry</summary>
        public static implicit operator List<GFilter<TFilterId>>(GFilterSet<TFilterId> set) => set.m_filters.ToList();
        /// <summary>Filtry</summary>
        public GFilter<TFilterId>[] ToArray() => m_filters.ToArray();
        /// <summary>Filtry</summary>
        public List<GFilter<TFilterId>> ToList() => new List<GFilter<TFilterId>>(m_filters);


        IEnumerator<GFilter<TFilterId>> IEnumerable<GFilter<TFilterId>>.GetEnumerator() => m_filters.GetEnumerator();
        IEnumerator IEnumerable.GetEnumerator() => m_filters.GetEnumerator();

        /// <summary>Převede a string</summary>
        public override string ToString()
        {
            return string.Join(" AND ", m_filters.Select(f => f.ToString()));
        }

        //------------------------------------------------------------------
        public GFilterSet()
        {
            m_filters = new List<GFilter<TFilterId>>();
        }
        public GFilterSet(List<GFilter<TFilterId>> list)
        {
            m_filters = list ?? new List<GFilter<TFilterId>>();
        }
        public GFilterSet(IEnumerable<GFilter<TFilterId>> list)
        {
            m_filters = new List<GFilter<TFilterId>>(list);
        }
        public GFilterSet(ArrayList list)  //používá dynamicky Json deserializace GFiltersJsonConverter
        {
            m_filters = new List<GFilter<TFilterId>>(list.Cast<GFilter<TFilterId>>());
        }
        [DebuggerBrowsable(DebuggerBrowsableState.Never)]
        public Type FilterType => typeof(GFilter<TFilterId>);
        /// <summary>Nová instance se stejnými filtry</summary>
        public GFilterSet<TFilterId> Clone()
        {
            return new GFilterSet<TFilterId>().Add(this);
        }

        /// <summary>Přidat filtr</summary>
        public GFilterSet<TFilterId> Add(GFilter<TFilterId> filter) { m_filters.Add(filter); return this; }
        /// <summary>Přidat filtry</summary>
        public GFilterSet<TFilterId> Add(GFilterSet<TFilterId> set) => AddRange(set.m_filters);

        /// <summary>Přidání nového filtru</summary>
        public GFilterSet<TFilterId> Add<TValue>(TFilterId i, TValue value) where TValue : IGDbType, ICloneable, IGObject => Add(new GFilter<TFilterId, TValue>(i, value));
        /// <summary>Přidání nového filtru</summary>
        public GFilterSet<TFilterId> Add<TValue>(TFilterId i, OperatorEnum operato, TValue value) where TValue : IGDbType, ICloneable, IGObject => Add(new GFilter<TFilterId, TValue>(i, operato, value));
        /// <summary>Přidání nového filtru</summary>
        public GFilterSet<TFilterId> Add<TValue>(TFilterId i, GBaseFilter<TValue> filter) where TValue : IGDbType, ICloneable, IGObject => Add(new GFilter<TFilterId, TValue>(i, filter));

        /// <summary>Odstraní první výskyt filtru</summary>
        public bool Remove(GFilter<TFilterId> item) => m_filters.Remove(item);

        //------------------------------------------------------------------
        /// <summary>Spojení filtrů operátorem AND</summary>
        public static GFilterSet<TFilterId> And(GFilterSet<TFilterId> set1, GFilterSet<TFilterId> set2)
        {
            return new GFilterSet<TFilterId>().Add(set1).Add(set2);
        }

        /// <summary>Spojení filtrů operátorem AND</summary>
        public static GFilterSet<TFilterId> And(params GFilter<TFilterId>[] filters)
        {
            return new GFilterSet<TFilterId>().Add(filters);
        }

        //------------------------------------------------------------------
        public bool Contains(TFilterId filter) => m_filters.Any(f => filter.Equals(f.FilterId));

        public GFilter<TFilterId> Find(TFilterId filter) => m_filters.FirstOrDefault(f => filter.Equals(f.FilterId));

        /// <summary>
        /// Zkrácení o neaktivní filtry (inplace)
        /// </summary>
        public GFilterSet<TFilterId> Shrink()
        {
            var l_filters = new List<GFilter<TFilterId>>(m_filters.Count);
            foreach (var item in m_filters)
            {
                if (item != null && item.NotEmpty) l_filters.Add(item);
            }
            m_filters = l_filters;
            return this;
        }

        /// <summary>
        /// Vytvoření nové kolekce s aktivními filtry
        /// </summary>
        public static GFilterSet<TFilterId> Shrinked(IEnumerable<GFilter<TFilterId>> list)
        {
            var l_filters = new List<GFilter<TFilterId>>();
            foreach (var item in list)
            {
                if (item != null && item.NotEmpty) l_filters.Add(item);
            }
            return new GFilterSet<TFilterId>(l_filters);
        }


        //------------------------------------------------------------------
        /// <summary>Parse filtračního výrazu OData</summary>
        public static GFilterSet<TFilterId> ParseOData(string odataFilter) => GFilterOData.ParseOData<TFilterId>(odataFilter);

        //---------------------------------------------------------------------
        public static GFilterSet<TFilterId> JoinFilters(GFilterSet<TFilterId> filterArray, GFilterSet<TFilterId> addFilters)
            => new GFilterSet<TFilterId>().Add(filterArray).Add(addFilters);
        public static GFilterSet<TFilterId> JoinFilters(GFilterSet<TFilterId> filterArray, params GFilter<TFilterId>[] addFilters)
            => new GFilterSet<TFilterId>().Add(filterArray).Add(addFilters);
        public static GFilterSet<TFilterId> JoinFilters(GFilter<TFilterId>[] filterArray, params GFilter<TFilterId>[] addFilters)
            => new GFilterSet<TFilterId>().Add(filterArray).Add(addFilters);

        /// <summary>
        /// Spojí dvě pole filtrů do jednoho
        /// </summary>
        /// <param name="filterArray">pole filtrů</param>
        /// <param name="addFilters">nové pole filtrů</param>
        /// <returns>spojená pole filtrů</returns>
        public static GFilter<TFilterId>[] JoinFilterArrays(GFilter<TFilterId>[] filterArray, params GFilter<TFilterId>[] addFilters)
        {
            if (filterArray.Length == 0) return addFilters;
            if (addFilters.Length == 0) return filterArray;

            GFilter<TFilterId>[] l_oNewArray = new GFilter<TFilterId>[filterArray.Length + addFilters.Length];
            int i = 0;
            foreach (GFilter<TFilterId> oldFilter in filterArray) l_oNewArray[i++] = oldFilter;
            foreach (GFilter<TFilterId> newFilter in addFilters) l_oNewArray[i++] = newFilter;
            return l_oNewArray;
        }
    }



}
