//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DataParser.cs                         </Name>
//    <Description> Parser pro vazbu na nativni knihovnu a jeji zpracovani dat  </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-20                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Data;
using System.Runtime.InteropServices;
using Gordic.GFE.Parsers.Core;
using Gordic.Report.Implementation;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Parser pro vazbu na nativni knihovnu a jeji zpracovani dat
    /// </summary>
    public class DataManagerNativeParser : IGDataParser, IGDataParserSeekable, IGDataParser2
    {
        readonly DefaultDataManager m_manager;
        GFERegion m_region;

        struct Act
        {
            public DataRow row;
            public DataRow[] rows;
            public int rowIndex;
            public Act(DataRow row)
            {
                this.row = row;
                this.rows = new DataRow[1] { row };
                this.rowIndex = -1;
            }
            public Act(DataRow[] rows)
            {
                this.row = rows[0];
                this.rows = rows;
                this.rowIndex = -1;
            }

            internal bool Next()
            {
                if (++rowIndex >= rows.Length) return false;
                row = rows[rowIndex];
                return true;
            }
        }
        Stack<Act> m_stack;
        Act m_act;
        internal DataRow CurrentRow { get { return m_act.row; } }
        internal int CurrentRowIndex { get { return m_act.rowIndex; } }

        public DataManagerNativeParser(DefaultDataManager dataManager, DataRow dataRow, GFERegion region)
        {
            m_manager = dataManager;
            m_region = region;
            m_act = new Act(dataRow);
            m_stack = new Stack<Act>();
        }
        public void Reset()
        {
            m_act.rowIndex = -1;
            System.Diagnostics.Debug.Assert(m_act.rows.Length == 1);
            System.Diagnostics.Debug.Assert(m_act.row == m_act.rows[0]);
        }

        internal DefaultDataManager Manager { get { return m_manager; } }

        #region IGDataParser Members

        int IGDataParser.open(string fname, IGAttrList alist)
        {
            throw new NotImplementedException();
        }

        int IGDataParser.close()
        {
            throw new NotImplementedException();
        }

        int IGDataParser.getStructureVersion(out string ident, out int major, out int minor)
        {
            throw new NotImplementedException();
        }

        int IGDataParser.openDataRegion(IGRegion reg)
        {
            string rname;
            if (reg is GFERegion greg) //if (Marshal.IsComObject(reg)==false)
                rname = greg.Name; //volání .getName udělá malý memleak v GNativeStringCache marshalleru
            else
                reg.getName(out rname);

            var rows = m_act.row.GetChildRows(rname);
            if (rows == null || rows.Length == 0) return 1;
            m_stack.Push(m_act);
            m_act = new Act(rows);
            m_region = m_region.Children[rname];
#if DEBUG
            System.Diagnostics.Debug.Assert(m_region.Name == m_act.row.Table.TableName);
#endif
            return 0;
        }

        int IGDataParser.closeDataRegion()
        {
            if (m_stack.Count == 0) return 1;
            m_act = m_stack.Pop();
            m_region = m_region.Parent;
#if DEBUG
            System.Diagnostics.Debug.Assert(m_region.Name == m_act.row.Table.TableName);
#endif
            return 0;
        }

        int IGDataParser.getValues(IGDataRow row)
        {
            try
            {
                if (m_act.Next() == false)
                    return 1; //jiz nejsou data

                var cols = m_act.row.Table.Columns;
                int c = cols.Count;
                int s = 0;
                while (s <= c && cols[s].ColumnName.StartsWith("_")) { s++; c--; }

#if DEBUG
                row.getDataCount(out int rc);
                System.Diagnostics.Debug.Assert(c <= rc);
#endif
                for (int i = 0; i < c; i++)
                {
                    var cl = cols[i + s];

#if DEBUG
                    row.getName(i, out string cname);
                    System.Diagnostics.Debug.Assert(cname == cl.ColumnName);
#endif
                    //var cl = m_act.row.Table.Columns[cname];
                    var val = m_act.row[cl];

                    if (cl.DataType == typeof(Decimal))
                        row.setDecimal1(i, val == DBNull.Value ? "" : ((decimal)val).ToString(System.Globalization.CultureInfo.InvariantCulture));
                    else if (cl.DataType == typeof(DateTime))
                        row.setDatetime1(i, val == DBNull.Value ? "" : ((DateTime)val).ToString("O"));
                    else if (cl.DataType == typeof(DateTimeOffset))
                        row.setDatetime1(i, val == DBNull.Value ? "" : ((DateTimeOffset)val).ToString("O"));
                    else
                        row.setString(i, val.ToString());
                }

                return 0;
            }
            finally //nutne uvolnit jeste v teto metode!
            {
                Marshal.ReleaseComObject(row);
            }
        }

        int IGDataParser.getOpenedRegion(out IntPtr reg) //borrowed
        {
            reg = Marshal.GetComInterfaceForObject(m_region, typeof(IGRegion));
            Marshal.Release(reg);
            return 0;
        }

        int IGDataParser.CheckValidEOF()
        {
            throw new NotImplementedException();
        }

        int IGDataParser.getRootData(string name, out string value)
        {
            throw new NotImplementedException();
        }

        int IGDataParser.getRootDatas(out IGAttrList list)
        {
            throw new NotImplementedException();
        }

        int IGDataParserSeekable.open(string fname, IGAttrList alist)
        {
            return ((IGDataParser)this).open(fname, alist);
        }

        int IGDataParserSeekable.close()
        {
            return ((IGDataParser)this).close();
        }

        int IGDataParserSeekable.getStructureVersion(out string ident, out int major, out int minor)
        {
            return ((IGDataParser)this).getStructureVersion(out ident, out major, out minor);
        }

        int IGDataParserSeekable.openDataRegion(IGRegion reg)
        {
            return ((IGDataParser)this).openDataRegion(reg);
        }

        int IGDataParserSeekable.closeDataRegion()
        {
            return ((IGDataParser)this).closeDataRegion();
        }

        int IGDataParserSeekable.getValues(IGDataRow row)
        {
            return ((IGDataParser)this).getValues(row);
        }

        int IGDataParserSeekable.getOpenedRegion(out IntPtr reg)
        {
            return ((IGDataParser)this).getOpenedRegion(out reg);
        }

        int IGDataParserSeekable.CheckValidEOF()
        {
            return ((IGDataParser)this).CheckValidEOF();
        }

        int IGDataParserSeekable.getRootData(string name, out string value)
        {
            return ((IGDataParser)this).getRootData(name, out value);
        }

        int IGDataParserSeekable.getRootDatas(out IGAttrList list)
        {
            return ((IGDataParser)this).getRootDatas(out list);
        }

        int IGDataParserSeekable.getPosition(out int pos)
        {
            pos = m_act.rowIndex;
            if (pos >= 0) pos--;
            return 0;
        }

        int IGDataParserSeekable.getEndPosition(out int pos)
        {
            pos = m_act.rowIndex;
            return 0;
        }

        int IGDataParserSeekable.setPosition(int pos)
        {
            if (pos >= m_act.rows.Length) return 1;
            m_act.rowIndex = pos;
            m_act.row = pos == -1 ? m_act.rows[0] : m_act.rows[pos];
            return 0;
        }

        int IGDataParser2.getAllValues(IGDataVector2 vec)
        {
            try
            {
                if (m_act.Next() == false)
                    return 1; //jiz nejsou data
                var row = m_act.row;
                var reg = m_region;
                while (true)
                {
                    System.Diagnostics.Debug.Assert(row.Table.TableName == reg.Name);

                    var cols = row.Table.Columns;
                    int c = cols.Count;
                    int s = 0;
                    while (s <= c && cols[s].ColumnName.StartsWith("_")) { s++; c--; }
                    int i = 0;
                    foreach (var item in reg.Items)
                    {
                        var cl = cols[i + s];
                        System.Diagnostics.Debug.Assert(item.Name == cl.ColumnName);

                        (item as IGDataItem).getOrder(out var order_sta);
#if DEBUG
                        vec.getByOrder(order_sta, out var data);
                        data.getName(out var cname);
                        System.Diagnostics.Debug.Assert(cname == cl.ColumnName);
                        Marshal.ReleaseComObject(data);
#endif

                        var val = row[cl];

                        if (cl.DataType == typeof(Decimal))
                            vec.setDecimal1(order_sta, val == DBNull.Value ? "" : ((decimal)val).ToString(System.Globalization.CultureInfo.InvariantCulture));
                        else if (cl.DataType == typeof(DateTime))
                            vec.setDatetime1(order_sta, val == DBNull.Value ? "" : ((DateTime)val).ToString("O"));
                        else if (cl.DataType == typeof(DateTimeOffset))
                            vec.setDatetime1(order_sta, val == DBNull.Value ? "" : ((DateTimeOffset)val).ToString("O"));
                        else
                            vec.setString(order_sta, val.ToString());

                        i++;
                    }
                    var rels = row.Table.ParentRelations;
                    if (rels.Count == 0) break;
                    row = row.GetParentRow(rels[0]);
                    reg = reg.Parent;
                    System.Diagnostics.Debug.Assert(reg != null);
                }
                return 0;
            }
            finally //nutne uvolnit jeste v teto metode!
            {
                Marshal.ReleaseComObject(vec);
            }
        }

        #endregion
    }
}
