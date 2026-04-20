//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GDataTable.cs                                </Name>
//    <Description> podpora obecných typových datasetů                          </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                  </Copyright>
//    <Created>     2009-04-21                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.Reflection;
using System.Runtime.Serialization;

namespace Gordic.General {

    /// <summary>podpora obecných typových datasetů</summary>
    [Serializable]
    public class GDataTable : DataTable
    {

        /// <exclude/>
        public GDataTable()
            : base()
        { 
        }

        /// <exclude/>
        public GDataTable(string tableName)
            : base(tableName)
        {
        }

        /// <exclude/>
        public GDataTable(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }

        /// <summary>vytvoří novou tabulku z předaných řádků</summary>
        public static DataTable FromRows(IEnumerable<DataRow> rows) {
            if (rows == null) throw new GArgumentNullException(23200350);
            DataTable dt = null;
            foreach (DataRow row in rows) {
                if (dt == null) dt = row.Table.Clone();
                dt.ImportRow(row);
            } // end foreach
            if (dt == null) return new DataTable();
            return dt;
        } // end method


        internal static DataRowBuilder GetRowBuilder(DataTable table)
        {
            FieldInfo f = typeof(DataTable).GetField("rowBuilder", BindingFlags.Instance | BindingFlags.NonPublic);
            if (f != null) return (DataRowBuilder)f.GetValue(table);
            return null;
        }
        internal static void RaiseRowChanged(DataRowChangeEventArgs e)
        {
            if (e.Action == DataRowAction.Commit && e.Row.RowState != DataRowState.Detached)
                e.Row.AcceptChanges();
            else
            {
                MethodInfo m = typeof(DataTable).GetMethod("OnRowChanged", BindingFlags.Instance | BindingFlags.NonPublic, null, new Type[] { typeof(DataRowChangeEventArgs) }, null);
                if (m != null)
                    m.Invoke(e.Row.Table, new object[] { e });
            }
        }
        /// <summary>vytvoří nový GGroupingDataRow pro předanou tabulku (ale nevloží ho)</summary>
        public static GGroupingDataRow NewGroupingRow(DataTable table)
        {
            table.NewRow();
            return new GGroupingDataRow(GetRowBuilder(table));
        }

        /// <summary>vytvoří nový GGroupingDataRow pro předanou tabulku (ale nevloží ho)</summary>
        public static GGroupingDataRow NewGroupingRow(DataTable table, params object[] values)
        {
            table.NewRow().ItemArray = values;
            return new GGroupingDataRow(GetRowBuilder(table));
        }

        /// <summary>vloží nový GGroupingDataRow do předané tabulky</summary>
        public static GGroupingDataRow AddGroupingRow(DataTable table)
        {
            GGroupingDataRow r = NewGroupingRow(table);
            table.Rows.Add(r);
            return r;
        }

        /// <summary>vloží nový GGroupingDataRow do předané tabulky</summary>
        public static GGroupingDataRow AddGroupingRow(DataTable table, params object[] values)
        {
            GGroupingDataRow r = NewGroupingRow(table, values);
            table.Rows.Add(r);
            return r;
        }


        /// <summary>Test na nalezení konkrétního řádku včetně vnořených skupin</summary>
        public static bool ContainsRow(DataTable table, DataRow item)
        {
            foreach (DataRow r in table.Rows)
            {
                if (r == item) return true;
                if (r is GGroupingDataRow && ((GGroupingDataRow)r).Rows.ContainsRecursive(item)) return true;
            }
            return false;
        }

        /// <summary>Seznam všech řádků včetně řádků vnořených skupin</summary>
        public static IEnumerable<DataRow> AllRows(DataTable table)
        {
            var l_enums = new Stack<System.Collections.IEnumerator>();
            
            var l_enum = table.Rows.GetEnumerator();
            while (true)
            {
                while (l_enum.MoveNext())
                {
                    var r = (DataRow)l_enum.Current;
                    if (r is GGroupingDataRow)
                    {
                        l_enums.Push(l_enum);
                        l_enum = ((GGroupingDataRow)r).Rows.GetEnumerator();
                    }
                    else
                        yield return r;
                }

                if (l_enums.Count == 0) yield break;
                l_enum = l_enums.Pop();
            }            
        }

    } // end class

} // end namespace
