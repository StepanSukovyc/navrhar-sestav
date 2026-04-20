//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GDataTemplateGroupingSource.cs               </Name>
//    <Description> Zdroj dat šablon pro skupinování                            </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2011-08-18                                                  </Created>
//  </FileHeader>

using System;
using System.Data;
using System.Collections.Generic;
using System.Text;

namespace Gordic.General
{

    /// <summary>Zdroj dat šablon pro skupinování</summary>
    public class GDataTemplateGroupingSource : GDataTemplateSource
    {
        IEnumerable<DataRow> m_rows;
        GGroupingDataRow m_g;
        DataColumn m_column;
        object m_key;
        object m_hash;
        GDataTemplateDynamicSource.GetDataByNameDelegate m_nd;
        internal int m_knownCount = -1;

        /// <summary>Zdroj dat šablon pro skupinování</summary>
        public GDataTemplateGroupingSource(DataColumn dataColumn, GDataView view, GGroupingDataRow g, object key, object hash = null, GDataTemplateDynamicSource.GetDataByNameDelegate dataByName = null)
        {
            m_column = dataColumn; m_key = key; m_hash = hash;
            m_g = g;
            if (g == null) { m_rows = new DataRow[0]; m_knownCount = 0; }
            else
            {
                m_rows = g.Rows.NormalRows(view);
                /*TODO:m_knownCount, po vylouceni mezisouctu bude vracet nespravny Count*/
            }
            m_nd = dataByName;
        }
        /// <summary>Zdroj dat šablon pro skupinování</summary>
        public GDataTemplateGroupingSource(DataColumn dataColumn, ICollection<DataRow> rows, object key, object hash = null) { m_column = dataColumn; m_key = key; m_rows = rows; m_knownCount = rows.Count; m_hash = hash; }

        //------------------------------------------------------------------
        ///<summary>sloupec nad kterým se provádí šablona</summary>
        public DataColumn DataColumn
        {
            get { return m_column; }
        }

        ///<summary>první øádek nebo null</summary>
        protected DataRow FirstRow
        {
            get
            {
                var en = m_rows.GetEnumerator();
                if (en.MoveNext())
                {
                    var r = en.Current;
                    return r;
                }
                return null;
            }
        }

        ///<summary>sloupec podle jména</summary>
        protected DataColumn ColumnFromName(string name)
        {
            if (m_g != null) return m_g.Table.Columns[name];
            var r = FirstRow;
            if (r == null) return null;
            return r.Table.Columns[name];
        }

        /// <summary>Data pomocí indexu</summary>
        public override object GetDataByIndex(int index) { return null; }
        /// <summary>Data pomocí jména</summary>
        public override object GetDataByName(string name)
        {
            var na = name.Split('!');
            DataColumn col = null;
            if (na.Length == 2)
            {
                name = na[0] + "!";
                string cn = na[1];
                if (string.IsNullOrEmpty(cn)) col = DataColumn;
                else col = ColumnFromName(cn);
                if (col == null && name != "count!") return null; //krome count musi byt sloupec definovan!
            }
            if (m_nd != null) { var r = m_nd(name); if (r != null) return r; }
            switch (name)
            {
                case "#text": return Text;
                case "#value": return Text;
                case "#hash": return (Hash ?? "").ToString();
                case "count!": return Count;
                case "sum!": return Sum(col);
                case "min!": return Min(col);
                case "max!": return Max(col);
                case "avg!": return Avg(col);
                case "countnn!": return CountNn(col);
                case "firstnn!": return FirstNn(col);
                case "lastnn!": return LastNn(col);
                default:
                    var r = FirstRow;
                    if (r != null) return r[name];
                    return null;
            }
        }
        /// <summary>Klíè</summary>
        public object Key
        {
            get { return m_key; }
        }
        /// <summary>Text</summary>
        public string Text
        {
            get { return m_key.ToString(); }
        }
        /// <summary>Hash</summary>
        public object Hash
        {
            get { return m_hash; }
        }
        /// <summary>Poèet øádkù</summary>
        public int Count
        {
            get
            {
                if (m_knownCount >= 0) return m_knownCount;
                if (m_g != null) return m_g.Rows.CountRecursive;
                //return m_rows.Count;
                return System.Linq.Enumerable.Count(m_rows);
            }
        }
        private bool IsColumnAggregate(DataColumn c, GColumnAggregateMethod am)
        {
            if (m_g == null) return false;
            return m_g.ColumnAggregateMethods[c] == am;
        }
        /// <summary>Souèet všech øádkù daného sloupce</summary>
        public decimal Sum(DataColumn col)
        {
            if (IsColumnAggregate(col, GColumnAggregateMethod.sum)) return Convert.ToDecimal(m_g[col]);
            decimal sum = 0;
            foreach (DataRow r in this.m_rows)
            {
                var val = _GetVal(r, col, GColumnAggregateMethod.sum);
                if (val == DBNull.Value) continue;
                sum += Convert.ToDecimal(val);
            }
            return sum;
        }
        /// <summary>Prùmìr všech øádkù daného sloupce</summary>
        public decimal Avg(DataColumn col)
        {
            if (IsColumnAggregate(col, GColumnAggregateMethod.avg)) return Convert.ToDecimal(m_g[col]);
            return Sum(col) / Count;
        }
        /// <summary>Minumum všech øádkù daného sloupce</summary>
        public object Min(DataColumn col)
        {
            if (IsColumnAggregate(col, GColumnAggregateMethod.min)) return m_g[col];
            object min = DBNull.Value;
            foreach (DataRow r in this.m_rows)
            {
                object v = _GetVal(r, col, GColumnAggregateMethod.min);
                if (min == DBNull.Value) min = v;
                else
                {
                    var c = v as IComparable;
                    if (c != null && c.CompareTo(min) < 0)
                        min = v;
                }
            }
            return min;
        }
        /// <summary>Maximum všech øádkù daného sloupce</summary>
        public object Max(DataColumn col)
        {
            if (IsColumnAggregate(col, GColumnAggregateMethod.max)) return m_g[col];
            object max = DBNull.Value;
            foreach (DataRow r in this.m_rows)
            {
                object v = _GetVal(r, col, GColumnAggregateMethod.max);
                if (max == DBNull.Value) max = v;
                else
                {
                    var c = v as IComparable;
                    if (c != null && c.CompareTo(max) > 0)
                        max = v;
                }
            }
            return max;
        }
        /// <summary>Poèet not-null øádkù daného sloupce</summary>
        public int CountNn(DataColumn col)
        {
            if (IsColumnAggregate(col, GColumnAggregateMethod.countnn)) return Convert.ToInt32(m_g[col]);
            int cnt = 0;
            foreach (DataRow r in this.m_rows)
            {
                object v = _GetVal(r, col, GColumnAggregateMethod.countnn);
                if (v != null && v != DBNull.Value) cnt++;
            }
            return cnt;
        }
        /// <summary>První not-null øádek daného sloupce</summary>
        public object FirstNn(DataColumn col)
        {
            if (IsColumnAggregate(col, GColumnAggregateMethod.firstnn)) return m_g[col];
            foreach (DataRow r in this.m_rows)
            {
                object v = _GetVal(r, col, GColumnAggregateMethod.firstnn);
                if (v != null && v != DBNull.Value) return v;
            }
            return DBNull.Value;
        }
        /// <summary>Poslední not-null øádek daného sloupce</summary>
        public object LastNn(DataColumn col)
        {
            if (IsColumnAggregate(col, GColumnAggregateMethod.lastnn)) return m_g[col];
            object lv = DBNull.Value;
            foreach (DataRow r in this.m_rows)
            {
                object v = _GetVal(r, col, GColumnAggregateMethod.lastnn);
                if (v != null && v != DBNull.Value) lv = v;
            }
            return lv;
        }

        private object _GetVal(DataRow r, DataColumn c, GColumnAggregateMethod am)
        {
            var gk = r as GGroupingDataRow;
            if (gk != null)
            {
                var l_g = m_g;
                var l_rows = m_rows;
                m_g = gk;
                m_rows = gk.Rows;
                try
                {
                    return _ComputeAggregate(gk, c, am);
                }
                finally
                {
                    m_g = l_g;
                    m_rows = l_rows;
                }
            }
            return r[c];
        }

        //pri nullcheck=true vraci null i v pripade, ze jsou vsechny hodnty stejne (tj. gk[c] neni null)
        private object _ComputeAggregate(GGroupingDataRow gk, DataColumn c, GColumnAggregateMethod am, bool nullcheck = false)
        {
            switch (am)
            {
                case GColumnAggregateMethod.sum:
                    return Sum(c);
                case GColumnAggregateMethod.avg:
                    return Avg(c);
                case GColumnAggregateMethod.min:
                    if (nullcheck && gk[c] != DBNull.Value) return null; //vsechny hodnoty jsou stejne -> netreba znovu pocitat
                    return Min(c);
                case GColumnAggregateMethod.max:
                    if (nullcheck && gk[c] != DBNull.Value) return null; //vsechny hodnoty jsou stejne -> netreba znovu pocitat
                    return Max(c);
                case GColumnAggregateMethod.count:
                    return Count;
                case GColumnAggregateMethod.countnn:
                    return CountNn(c);
                case GColumnAggregateMethod.firstnn:
                    if (nullcheck && gk[c] != DBNull.Value) return null; //vsechny hodnoty jsou stejne -> netreba znovu pocitat
                    return FirstNn(c);
                case GColumnAggregateMethod.lastnn:
                    if (nullcheck && gk[c] != DBNull.Value) return null; //vsechny hodnoty jsou stejne -> netreba znovu pocitat
                    return LastNn(c);
            }
            return null;
        }

        /// <summary>Výpoèet agregace pro pøedaný øádek skupiny nad daným sloupcem danou metodou</summary>
        public static object ComputeAggregate(GDataView view, GGroupingDataRow gk, DataColumn c, GColumnAggregateMethod am, bool nullcheck = false, int knownCount = -1)
        {
            try
            {
                var s = new GDataTemplateGroupingSource(null, view, gk, null);
                s.m_knownCount = knownCount;
                return s._ComputeAggregate(gk, c, am, nullcheck);
            }
            catch
            { //vyjimky ve vypoctu agregace osetrim nastaveim NULL hodnoty - napr. sum() na stringovy sloupec nic jineho ani udelat nemuze
                return DBNull.Value;
            }
        }

    }
}
