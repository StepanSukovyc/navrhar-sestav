//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DataRegion.cs                            </Name>
//    <Description> Množina řádků, pro GRF sestavy/formuláře                    </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-25                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Runtime.InteropServices;
using Gordic.General;

namespace Gordic.GFE.Parsers.Dom
{
    public interface IDataRegion
    {
        DefaultDataManager Manager { get; }
        DataRow GetDataRow(GFEList attributes, out int index);
        DataRow GetDataRow(GFEList attributes, string componentName, bool throwOnNotFound, out int index);
        string GetFormattedValue(DefaultAbstractContent component);
        string GetFormattedValue(Gordic.Report.Implementation.IGFormatTag tag);
    }
    /// <summary>
    /// Množina řádků, pro GRF sestavy/formuláře. Dle atributu row se pak vybere konkretní řádek. Filtruje, třídí, ... data dle nastavení regionu v němž je obsažena
    /// </summary>
    public class DataRegion : IDataRegion
    {
        DataRegion m_parent;
        DataTable m_tbl;
        DataRelation m_rel;
        DataRow m_parentRow;
        public DataRow[] m_rows;

        internal DataRegion(DefaultDataManager manager, DataRow rootRow)
        {
            m_Manager = manager;
            m_parent = null;
            m_parentRow = null;
            m_tbl = rootRow.Table;
            m_rows = new DataRow[] { rootRow };
        }
        internal DataRegion(DataRegion parent, DataRow row, int index = 0)
        {
            m_Manager = parent.m_Manager;
            m_parent = parent;
            m_parentRow = parent.m_rows[index];
            m_tbl = row.Table;
            m_rows = new DataRow[] { row };
        }
        //public DataRegion(DataRegion parent, AttributeList Attributes, string regionName)
        //{
        //    m_Manager = parent.m_Manager;
        //    m_parent = parent;
        //    Init(parent.GetDataRow(Attributes), regionName);
        //}
        public DataRegion(DataRegion parent, Core.GFEFormatRegion r)
        {
            m_Manager = parent.m_Manager;
            m_parent = parent;

            Init(parent.GetDataRow(r.Attributes, out _), r.Name, r
                , filterIn: r.Attributes.GetValueDefault("filter-in", "")
                , filterOut: r.Attributes.GetValueDefault("filter-out", "")
                , orderBy: r.Attributes.GetValueDefault("order-by", "")
            );
        }

        private void Init(DataRow parentRow, string regionName, IScriptOwner owner, string filterIn = "", string filterOut = "", string orderBy = "")
        {
            m_parentRow = parentRow;

            foreach (DataRelation rel in parentRow.Table.ChildRelations)
                if (rel.ChildTable.TableName == regionName)
                {
                    m_rel = rel;
                    m_tbl = rel.ChildTable;
                    m_rows = PrepareRows(parentRow.GetChildRows(rel), filterIn, filterOut, orderBy, owner);
                    return;
                }
            throw new Exception(string.Join(" ", GResources.GetResourceText(29450290), regionName)); //RC 29450290 : Neznámá oblast
        }
        private DataRow[] PrepareRows(DataRow[] rows, string filterIn, string filterOut, string orderBy, IScriptOwner owner)
        {
            if (rows.Length == 0)
                return rows;
            if (string.IsNullOrEmpty(filterIn) && string.IsNullOrEmpty(filterOut) && string.IsNullOrEmpty(orderBy))
                return rows;

            string filter = "";
            if (string.IsNullOrEmpty(filterIn) == true)
            {
                if (string.IsNullOrEmpty(filterOut) == false)
                    filter = "not(" + filterOut + ")";
            }
            else
            {
                if (string.IsNullOrEmpty(filterOut) == false)
                    filter = "(" + filterIn + ") and not(" + filterOut + ")";
                else
                    filter = filterIn;
            }

            var tbl = rows[0].Table;
            //Gordic.General.GDataView v;
            //if (tbl.Rows.Count == rows.Length)
            //    v = new General.GDataView(tbl);
            //else
            //{
            //    var t2 = tbl.Clone();
            //    foreach (var r in rows)
            //    {
            //        t2.ImportRow(r);
            //    }
            //    v = new General.GDataView(t2);
            //}
            //v.DataFilter = new General.GDataFilter(filter);

            //if (string.IsNullOrEmpty(orderBy) == false)
            //    v.Sort = orderBy;

            //rows = new DataRow[v.Count];
            //int i = 0;
            //foreach (DataRow r in v)
            //{
            //    rows[i++] = r;
            //}

            List<DataRow> l = new List<DataRow>();
            if (string.IsNullOrEmpty(filter) == false)
            {
                foreach (DataRow r in rows)
                {
                    using (var ex = ScriptManager.PrepareExpression(owner, "filter", filter, r, Manager))
                    {
                        var res = ScriptManager.RunExpression(ex);
                        if (res != null)
                        {
                            if (res.ToInt() > 0)
                                l.Add(r);
                            res.Dispose();
                        }
                    }
                }
            }
            else
                l.AddRange(rows);

            if (string.IsNullOrEmpty(orderBy) == false)
            {
                var s = Gordic.General.GDataView.GSort.Parse(tbl, orderBy);
                l.Sort(s);
            }
            rows = l.ToArray();
            return rows;
        }


        //------------------------------------------------------------------
        private DefaultDataManager m_Manager;
        ///<summary>Manager</summary>
        public DefaultDataManager Manager
        {
            get { return m_Manager; }
        }
        ///<summary>Skript Manager</summary>
        public ScriptManager ScriptManager
        {
            get { return m_Manager.ScriptManager; }
        }

        ///<summary>Jméno oblasti</summary>
        public string RegionName
        {
            get { return m_tbl.TableName; }
        }



        public DataRow GetDataRow(GFEList attributes, string componentName, bool throwOnNotFound, out int index)
        {
            var s = this;
            var r = GetDataRow(attributes, out index);

            if (string.IsNullOrEmpty(componentName))
            {
                return r;
            }
            else
            {
                int i = componentName.LastIndexOf('.');
                if (i >= 0)
                {
                    var t = componentName.Substring(0, i);
                    //n = componentName.Substring(i + 1);

                    while (true)
                    {
                        if (r.Table.TableName == t) return r;
                        r = s.m_parentRow;
                        if (r == null) break;
                        s = s.m_parent; Debug.Assert(s != null);
                        index = Array.IndexOf(s.m_rows, r);
                    }
                }
                else
                {
                    var n = componentName;

                    while (true)
                    {
                        if (r.Table.Columns.Contains(n)) return r;
                        r = s.m_parentRow;
                        if (r == null) break;
                        s = s.m_parent; Debug.Assert(s != null);
                        index = Array.IndexOf(s.m_rows, r);
                    }
                }
            }

            if (throwOnNotFound)
                throw new Exception(GResources.GetResourceText(21000008, RegionName, componentName)); //RC 21000008 : Oblast {0} ani žádná nadřízená neobsahuje položku {1}

            return null;
        }
        //public DataRow GetDataRow(GFEList attributes)
        //{
        //    string rowString = attributes.Exists(itm => itm.Key.Equals("row")) ? attributes.Find(itm => itm.Key.Equals("row")).Value : null;
        //    int rowIndex;
        //    if (rowString == null || Int32.TryParse(rowString, out rowIndex) == false) rowIndex = 1;
        //    return GetDataRow(rowIndex);
        //}
        public DataRow GetDataRow(GFEList attributes, out int index)
        {
            string rowString = attributes.GetValueDefault("row", null);
            if (rowString == null || Int32.TryParse(rowString, out index) == false) index = 1;
            index--;
            return GetDataRow(index);
        }

        public DataRow GetDataRow(int rowIndex)
        {
            var c = m_rows.Length;
            if (c > rowIndex)
                return m_rows[rowIndex];

            Array.Resize(ref m_rows, rowIndex + 1);
            int idx = c;
        add_more:
            DataRow r = m_tbl.Rows.Add();
            if (m_rel != null)
            {
                var l = m_rel.ParentColumns.Length;
                for (int i = 0; i < l; i++)
                    r[m_rel.ChildColumns[i]] = m_parentRow[m_rel.ParentColumns[i]];
            }
            m_rows[idx++] = r;
            if (idx <= rowIndex) goto add_more;
            return r;

        }

        string IDataRegion.GetFormattedValue(DefaultAbstractContent component) { return null; }
        string IDataRegion.GetFormattedValue(Gordic.Report.Implementation.IGFormatTag tag) { return null; }
    }

    /// <summary>
    /// Konkrétní řádek, pro GRR sestavy/grid část GRF. Vždy vrací konkrétní řádek s nímž je vytvořen (ignoruje atribut row atp.)
    /// </summary>
    internal class DataRegionGrr : IDataRegion
    {
        private class UnknownValue { }
        internal static object unknown_value = new UnknownValue();

        Gordic.Report.Implementation.IGDataParser m_p;
        Gordic.Report.Implementation.IGDataCacheFillerRow2 m_f;
        public DataRegionGrr(DefaultDataManager manager, DataManagerNativeParser parser, Gordic.Report.Implementation.IGDataParser p, Gordic.Report.Implementation.IGDataCacheFillerRow2 f)
        {
            m_Manager = manager;

            //DataRow nelze prevzit z parser.CurrentRow. Pri sortu, ve skupinach, souctech atp muze jit o uplne jiny radek
            //zde se vytvori jiny DataRow (mimo vlastni vstupni tabulku) a pokusi vyplnit daty z motoru
            //motor ma mnohdy vice dat - vraci i pocitane sloupce (variables, SUM, ...) ktere nemame kam nacpat.
            //Ani je nepotrebujeme, mame jejich formatovane varianty a editovat je nelze, kdyz nejsou ve vstupnich datech
            var table = parser.CurrentRow.Table;
            m_Row = table.NewRow();
            m_RowIndex = parser.CurrentRowIndex;
            bool same = true;
            f.getRow(out Report.Implementation.IGDataRow r);
            try
            {
                r.getDataCount(out int rc);
                for (int i = 0; i < rc; i++)
                {
                    r.getData(i, out Report.Implementation.IDataData value);
                    try
                    {
                        //IntPtr l_ptr;
                        //value.getName(out l_ptr);
                        //var l_dname = System.Runtime.InteropServices.Marshal.PtrToStringAnsi(l_ptr);
                        value.getName(out string l_dname);
                        var c = table.Columns[l_dname];
                        if (c != null)
                        {
                            //value.getString(out l_ptr);
                            //var s = System.Runtime.InteropServices.Marshal.PtrToStringAnsi(l_ptr);
                            value.getString(out string s);
                            if (c.DataType == typeof(decimal))
                                m_Row[c] = Gordic.Report.Implementation.GDataScriptable.ToDecimalOrDbNull(s);
                            else if (c.DataType == typeof(DateTime))
                                m_Row[c] = Gordic.Report.Implementation.GDataScriptable.ToDateTimeOrDbNull(s);
                            else if (c.DataType == typeof(DateTimeOffset))
                                m_Row[c] = Gordic.Report.Implementation.GDataScriptable.ToDateTimeOffsetOrDbNull(s);
                            else
                                m_Row[c] = s;
                            if (same) same = CompareValues(m_Row[c], parser.CurrentRow[c]);
                        }
                    }
                    finally
                    {
                        Marshal.ReleaseComObject(value);
                        value = null;
                    }
                }
            }
            finally
            {
                Marshal.ReleaseComObject(r);
                r = null;
            }

            //pokud jsou vsechny hodnoty shodne s CurrentRow, pouziju primo ten. Pak bude mozno napr. editovat puvodni data
            if (same)
            {
                m_Row.Delete(); //?
                m_Row = parser.CurrentRow;
            }

            Attach(p, f);
        }
        private bool CompareValues(object p1, object p2)
        {
            //p1 by mela by vzdy byt formatovana hodnota, tj. string.Empty i pro NULL.
            if(p1 == DBNull.Value) //ToDateTimeOffsetOrDbNull přeci jen může vrátit DbNull
            {
                return p2 == null || p2 == DBNull.Value
                    || (p2 is string && (string)p2 == string.Empty)
                    || (p2 is decimal && (decimal)p2 == 0)
                    || (p2 is DateTime && (DateTime)p2 == DateTime.MinValue)
                    || (p2 is DateTimeOffset && (DateTimeOffset)p2 == DateTimeOffset.MinValue)
                    ;
            }
            if (p2 == null || p2 == DBNull.Value)
            {
                return p1 == null || p1 == DBNull.Value
                    || (p1 is string && (string)p1 == string.Empty)
                    || (p1 is decimal && (decimal)p1 == 0)
                    || (p1 is DateTime && (DateTime)p1 == DateTime.MinValue)
                    || (p1 is DateTimeOffset && (DateTimeOffset)p1 == DateTimeOffset.MinValue)
                    ;
            }
            if (p1 is DateTimeOffset do1 && p2 is DateTimeOffset do2)
            {
                return do1.Ticks == do2.Ticks; //Offset se lisit muze!?
            }
            return p2.Equals(p1);
        }

        public DataRegionGrr Attach(Gordic.Report.Implementation.IGDataParser p, Gordic.Report.Implementation.IGDataCacheFillerRow2 f)
        {
            m_p = p;
            m_f = f;
            return this;
        }
        //TOTO SE MUSI UVOLNIT HNED VE GRID.FILLROW!!
        public void Release()
        {
            m_p = null;
            m_f = null;
        }
        //------------------------------------------------------------------
        private DefaultDataManager m_Manager;
        ///<summary>Manager</summary>
        public DefaultDataManager Manager
        {
            get { return m_Manager; }
        }
        ///<summary>Skript Manager</summary>
        public ScriptManager ScriptManager
        {
            get { return m_Manager.ScriptManager; }
        }

        //------------------------------------------------------------------
        private DataRow m_Row;
        private int m_RowIndex;
        public DataRow Row => m_Row;
        public int RowIndex => m_RowIndex;

        #region IGDataRegionRow Members
        DataRow IDataRegion.GetDataRow(GFEList attributes, out int index) { index = m_RowIndex; return Row; }
        DataRow IDataRegion.GetDataRow(GFEList attributes, string componentName, bool throwOnNotFound, out int index)
        {
            var r = Row;
            index = m_RowIndex;
            int i = componentName.LastIndexOf('.');
            if (i >= 0)
            {
                var regName = componentName.Substring(0, i);
                while (r.Table.TableName != regName)
                {
                    if (r.Table.ParentRelations.Count == 0)
                    {
                        if (regName == "ROOT") { index = 0; return Manager.RootRow; }
                        if (throwOnNotFound) throw new Exception(GResources.GetResourceText(29450719));
                        index = 0; return null;
                    }
                    if (r.RowState == DataRowState.Detached)
                        r = r.Table.Rows[index].GetParentRow(r.Table.ParentRelations[0]);
                    else
                        r = r.GetParentRow(r.Table.ParentRelations[0]);
                    index = 0;
                    if (r.Table.ParentRelations.Count > 0) index = r.GetParentRow(r.Table.ParentRelations[0]).Table.Rows.IndexOf(r);
                }
            }
            return r;
        }
        #endregion

        public string GetFormattedValue(DefaultAbstractContent component)
        {
            if (component == null || component.FormatTag == null) return null;
            return GetFormattedValue(component.FormatTag.NativeContent as Gordic.Report.Implementation.IGDataCacheItem);
        }
        string IDataRegion.GetFormattedValue(Gordic.Report.Implementation.IGFormatTag tag) { return GetFormattedValue(tag as Gordic.Report.Implementation.IGDataCacheItem); }


        Gordic.Report.Implementation.IGDataCacheItem m_lastdci = null;
        string m_lastvalue;
        internal string GetFormattedValue(Gordic.Report.Implementation.IGDataCacheItem dci)
        {
            if (dci == null) return null;
            if (dci == m_lastdci) return m_lastvalue;
            if (Gordic.Report.Interface.GUnsafeRepWrapper.S_Check06Error(m_f.getValue(dci, m_p, out Report.Implementation.IDataData value)))
            {
                try
                {
                    value.getString(out string s);
                    m_lastdci = dci;
                    m_lastvalue = s;
                    return s;
                }
                finally
                {
                    Marshal.ReleaseComObject(value);
                    value = null;
                }
            }
            return null;
        }

    }

}
