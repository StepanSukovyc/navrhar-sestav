//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GDataView.cs                                 </Name>
//    <Description> Pohled na data v datové tabulce                             </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2009-04-21                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;
using System.Collections;
using System.ComponentModel;
using System.Data;

namespace Gordic.General
{

    /// <summary>
    /// Pohled na data v datové tabulce
    /// </summary>
    public class GDataView : MarshalByValueComponent, IList, ITypedList, IBindingList, IEnumerable<DataRow> //nededi se DataView!
    {
        #region Základ
        DataTable m_table;
        List<DataRow> m_list = new List<DataRow>();
        Dictionary<DataRow, int> m_trs = new Dictionary<DataRow, int>();
        int m_stl = -1;
        List<int> m_subl = new List<int>();
        Dictionary<DataRow, GGroupingDataRow> m_grl = new Dictionary<DataRow, GGroupingDataRow>();
        int m_grouplevel = -1;
        GGridFormat m_gf = null;

        private GDataView() { }

        /// <summary>Konstruktor</summary>
        public GDataView(DataTable dt)
        {
            m_table = dt;
            m_sort = new GSort(this);
            RegisterListChangedEvent();
            m_DataFilter = new GDataFilter();
            ReadData();
        }

        /// <summary>Konstruktor</summary>
        public GDataView(DataTable dt, GDataFilter dataFilter)
        {
            m_table = dt;
            m_sort = new GSort(this);
            RegisterListChangedEvent();
            m_DataFilter = dataFilter;
            ReadData();
        }
        /// <summary>Konstruktor</summary>
        public GDataView(DataTable dt, IEnumerable<DataRow> rows, GDataFilter dataFilter = null, GSort orderBy = null, GSort groupBy = null, bool listenChanges = false)
        {
            m_table = dt;
            if (orderBy != null) { orderBy.SetView(this); m_sort = orderBy; } else m_sort = new GSort(this);
            if (groupBy != null) { groupBy.SetView(this); m_grouping = groupBy; }

            if (listenChanges) RegisterListChangedEvent();
            m_DataFilter = dataFilter ?? new GDataFilter();
            ReadData(rows);
        }

        /// <summary>Konstruktor</summary>
        public static GDataView FromList<T>(ref List<T> list, GDataFilter dataFilter = null, GSort orderBy = null, GSort groupBy = null, bool listenChanges = false) where T : IGDto
        {
            var dt = list.ToDataTable();
            list.Clear();
            list = null;
            return new GDataView(dt, null, dataFilter: dataFilter, orderBy: orderBy, groupBy: groupBy, listenChanges: listenChanges);
        }
        /// <summary>Konstruktor</summary>
        public static GDataView FromList<T>(ref IList<T> list, GDataFilter dataFilter = null, GSort orderBy = null, GSort groupBy = null, bool listenChanges = false) where T:IGDto
        {
            var dt = list.ToDataTable();
            list.Clear();
            list = null;
            return new GDataView(dt, null, dataFilter: dataFilter, orderBy: orderBy, groupBy: groupBy, listenChanges: listenChanges);
        }

        /// <summary>Klon pohledu nad jinou tabulkou dat</summary>
        public static GDataView SameViewAs(GDataView v, DataTable dt)
        {
            GDataView c = new GDataView();
            c.ReadOnly = v.ReadOnly;
            c.m_table = dt;
            c.RegisterListChangedEvent();
            c.m_DataFilter = v.m_DataFilter;
            c.m_sort = new GSort(c);
            c.m_sort.AddRange(v.m_sort);
            c.m_gf = v.m_gf;
            if (v.m_grouping != null)
            {
                c.m_grouping = new GSort(c);
                c.m_grouping.AddRange(v.m_grouping);
            }
            c.m_computes = v.m_computes;
            c.ReadData();
            if (v.SubtotalLevel >= 0) c.ComputeSubtotals(v.SubtotalLevels);
            if (v.TotalFilter != GTotalFilter.AllRows) c.RunFilter(v.TotalFilter);

            //pokus o obnovu rozbaleni skupin
            if (v.m_grouping != null)
            {
                for (int i = 0; i < c.Count; i++)
                {
                    var g = c[i] as GGroupingDataRow;
                    if (g == null) continue;
                    var og = v[i] as GGroupingDataRow;
                    if (og == null) continue;
                    g.IsExpanded = og.IsExpanded;
                }
            }
            return c;
        }

        /// <exclude/>
        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
            if (disposing) UnRegisterListChangedEvent();
        }

        private void RegisterListChangedEvent()
        {
            m_table.ColumnChanging += m_table_ColumnChanging;
            m_table.Columns.CollectionChanged += m_table_ColumnsChanged;
            m_table.RowChanged += m_table_RowChanged;
            m_table.RowDeleted += m_table_RowChanged;
            m_table.TableCleared += m_table_TableCleared;
        }

        private void UnRegisterListChangedEvent()
        {
            m_table.ColumnChanging -= m_table_ColumnChanging;
            m_table.Columns.CollectionChanged -= m_table_ColumnsChanged;
            m_table.RowChanged -= m_table_RowChanged;
            m_table.RowDeleted -= m_table_RowChanged;
            m_table.TableCleared -= m_table_TableCleared;
        }
        void m_table_TableCleared(object sender, DataTableClearEventArgs e)
        {
            Refresh();
        }
        private void m_table_ColumnsChanged(object sender, CollectionChangeEventArgs e)
        {
            OnListChanged(new GListChangedEventArgs(ListChangedType.PropertyDescriptorAdded, -1));
        }

        private class ValueChange { public DataRow row; public DataColumn col; /*public object OldValue; public object NewValue { get { return row[col]; } }*/ }
        List<ValueChange> m_ValueChanges = null;
        void m_table_ColumnChanging(object sender, DataColumnChangeEventArgs e)
        {
            if (m_ValueChanges == null) m_ValueChanges = new List<ValueChange>();
            var old = e.Row[e.Column];
            if (e.Row.RowState == DataRowState.Detached)  //v tomto pripade neprijde RowChanged
                return;
            if (object.Equals(e.ProposedValue, old) == false)
                m_ValueChanges.Add(new ValueChange() { row = e.Row, col = e.Column/*, OldValue = old*/ });
        }
        void m_table_RowChanged(object sender, DataRowChangeEventArgs e)
        {
            int l_index = m_list.IndexOf(e.Row);
            if (e.Action == DataRowAction.Commit || e.Action == DataRowAction.Change || e.Action == DataRowAction.ChangeCurrentAndOriginal)
            {
                if (l_index < 0) return; //zmena nejakeho radku, ktery ani neni v pohledu?!
                if (m_ValueChanges != null && m_ValueChanges.Count > 0)
                {
                    List<ValueChange> l_ValueChanges = m_ValueChanges;
                    m_ValueChanges = null;
                    //radek je opravdu zmenen?
                    if (RowChangeForRefresh(e))
                    {
                        foreach (ValueChange v in l_ValueChanges) //mela by to byt jen jedna hodnota
                        {
                            if (v.row != e.Row) continue;

                            //zmena sloupce podle ktereho se tridi?
                            if (SortObject != null)
                            {
                                foreach (GSortItem si in SortObject)
                                {
                                    if (si.ColumnName.Equals(v.col.ColumnName, StringComparison.OrdinalIgnoreCase))
                                    {
                                        Refresh(); //nalezena zmena sloupce, ktery je v trideni
                                        return;
                                    }
                                }
                            }
                            //hledani zmeny ve filtru
                            foreach (string col in m_DataFilter.GetColumns())
                            {
                                if (col.Equals(v.col.ColumnName, StringComparison.OrdinalIgnoreCase))
                                {
                                    Refresh(); //nalezena zmena sloupce, ktery je ve filtru
                                    return;
                                }
                            }
                        }
                    }
                }

                if (e.Row is GGroupingDataRow)
                {
                    GGroupingDataRow group = (GGroupingDataRow)e.Row;
                    if (e.Action == DataRowAction.Change) //je mozne ze se meni pocet radku ve skupine - prenactu
                    {
                        OnBeforeGroupToggle(EventArgs.Empty);
                        var le = GListChangedEventArgs.Reset(this);
                        RemoveRows(group.Rows, group);
                        ReadRows(group.Rows, group, l_index + 1);
                        OnListChanged(le);
                        OnAfterGroupToggle(EventArgs.Empty);
                    }
                    else //pravdepodobne Toggle skupiny
                        HandleGroup(group, l_index);
                    return;
                }
            }
            //TODO: po pridani/ubrani jednoho radku by nebyl nutny cely refresh (coz muze byt potencionalne narocna operace)
            //  stacilo by ten jeden radek zatridit/vyfiltrovat, prepocitat pripadne mezisoucty apod.
            //  a poslat OnListChanged(ListChangedType.ItemAdded) nikoliv cely .Reset
            if (e.Action == DataRowAction.Add)
            {
                if (RowChangeForRefresh(e))
                    Refresh();
                else
                {
                    l_index = m_list.Count;
                    m_list.Add(e.Row); //pridani na konec
                    OnListChanged(new GListChangedEventArgs(ListChangedType.ItemAdded, l_index));
                }
            }
            else if (e.Action == DataRowAction.Delete)
            {
                if (RowChangeForRefresh(e))
                    Refresh();
                else
                {   //TODO takto by se mohlo delat kazde Delete. Jen je potreba obnovit pripadne skupiny a mezisoucty
                    m_list.Remove(e.Row); //odebrani
                    OnListChanged(new GListChangedEventArgs(ListChangedType.ItemDeleted, l_index));
                }
            }
            else if (e.Action == DataRowAction.Rollback || l_index < 0)
                Refresh();
            else
            {
                //mala Changed - preposlu
                OnListChanged(new GListChangedEventArgs(ListChangedType.ItemChanged, l_index));
            }
        }

        HashSet<DataRowState> m_ignoredStates = new HashSet<DataRowState>();
        private bool RowChangeForRefresh(DataRowChangeEventArgs e)
        {
            var state = e.Row.RowState;
            if (state == DataRowState.Unchanged) return false;
            if (state == DataRowState.Detached) return false;
            if (m_ignoredStates.Contains(state)) return false;
            return true;
        }
        /// <summary>Možnost ignorování změn v DataTable pro přepočet třídení, filtrování, atp.</summary>
        public void IgnoreChanges(bool ignore, params DataRowState[] states)
        {
            foreach (var state in states)
            {
                if (ignore)
                    m_ignoredStates.Add(state);
                else
                    m_ignoredStates.Remove(state);
            }
        }

        private void HandleGroup(GGroupingDataRow group, int rowIndex)
        {
            System.Diagnostics.Debug.Assert(rowIndex >= 0);

            bool l_wasExpanded = m_grl.ContainsValue(group);
            if (l_wasExpanded != group.IsExpanded) //doslo ke zmene?
            {
                OnBeforeGroupToggle(EventArgs.Empty);
                var le = GListChangedEventArgs.Reset(this);
                if (l_wasExpanded)
                {
                    RemoveRows(group.Rows, group);
                }
                else
                {
                    if (group.GroupingLevel > m_grouplevel) m_grouplevel = group.GroupingLevel;
                    ReadRows(group.Rows, group, rowIndex + 1);
                }
                OnListChanged(le);
                OnAfterGroupToggle(EventArgs.Empty);
            }
            else
            {
                bool changed = false;
                var le = GListChangedEventArgs.Reset(this);
                HandleGroupRecu(group, ref changed);
                if (changed)
                {
                    OnListChanged(le);
                    OnAfterGroupToggle(EventArgs.Empty);
                }
                else
                {
                    OnListChanged(new GListChangedEventArgs(ListChangedType.ItemChanged, rowIndex)); //poslu alespon zmenu polozky (+/- se mohlo zmenit)
                }
            }
        }
        private void HandleGroups(GGroupingDataRow[] groups)
        {
            if (groups.Length == 1) { var g = groups[0]; HandleGroup(g, m_list.IndexOf(g)); return; }

            bool changed = false;
            var le = GListChangedEventArgs.Reset(this);
            foreach (var group in groups)
            {
                int rowIndex = m_list.IndexOf(group);

                bool l_wasExpanded = m_grl.ContainsValue(group);
                if (l_wasExpanded != group.IsExpanded) //doslo ke zmene?
                {
                    if (changed == false) { OnBeforeGroupToggle(EventArgs.Empty); changed = true; }
                    if (l_wasExpanded)
                    {
                        RemoveRows(group.Rows, group);
                    }
                    else
                    {
                        if (group.GroupingLevel > m_grouplevel) m_grouplevel = group.GroupingLevel;
                        ReadRows(group.Rows, group, rowIndex + 1);
                    }
                }
                else
                {
                    HandleGroupRecu(group, ref changed);
                }
            }

            OnListChanged(le); //radsi vzdy
            if (changed) OnAfterGroupToggle(EventArgs.Empty);
        }
        private void HandleGroupRecu(GGroupingDataRow parent, ref bool changed)
        {
            foreach (DataRow r in parent.Rows)
            {
                GGroupingDataRow group = r as GGroupingDataRow;
                if (group == null) continue;

                bool l_wasExpanded = m_grl.ContainsValue(group);
                if (l_wasExpanded != group.IsExpanded) //doslo ke zmene?
                {
                    if (changed == false) { OnBeforeGroupToggle(EventArgs.Empty); changed = true; }
                    if (l_wasExpanded)
                    {
                        RemoveRows(group.Rows, group);
                    }
                    else
                    {
                        if (group.GroupingLevel > m_grouplevel) m_grouplevel = group.GroupingLevel;
                        ReadRows(group.Rows, group, m_list.IndexOf(group) + 1);
                    }
                }
                HandleGroupRecu(group, ref changed);
            }
        }

        #endregion
        #region ReadData (motor)
        private void ReadData(IEnumerable dataRowCollection = null)
        {
            m_list.Clear();
            m_trs.Clear();
            m_stl = -1;
            m_subl.Clear();
            m_grl.Clear();
            m_grouplevel = -1;
            m_totalFilter = GTotalFilter.AllRows;
            ReadRows(dataRowCollection ?? m_table.Rows, null, 0);
            DoGrouping();
        }

        private int ReadRows(IEnumerable dataRowCollection, GGroupingDataRow group, int insertAt)
        {
            int start = insertAt;
            List<GGroupingDataRow> groupsToExpand = null;
            foreach (DataRow r in dataRowCollection)
            {
                if (RunStateFilter(r, group) == false) continue;
                if (group != null) m_grl.Add(r, group);

                GGroupingDataRow g = r as GGroupingDataRow;
                if (g != null)
                {
                    if (g.GroupingLevel > m_grouplevel) m_grouplevel = g.GroupingLevel;
                    if (g.SortWithRows == false) //preruseni trideni
                    {
                        if (group == null || group.Sortable) SortList(start, insertAt - start);
                    }

                    if (DataFilter.RunFilter(g) || GroupRowsInFilterRecursive(g, DataFilter)) //filtrovani skupin: projde skupina nebo nektery radek vnoreny ve skupine
                    {
                        AddToList(r, ref insertAt);
                        if (g.IsExpanded)
                        {
                            if (g.SortWithRows == false)
                                insertAt = ReadRows(g.Rows, g, insertAt);
                            else
                            {
                                if (groupsToExpand == null) groupsToExpand = new List<GGroupingDataRow>();
                                groupsToExpand.Add(g);
                            }
                        }
                    }
                    if (g.SortWithRows == false) //trideni pokracuje odtud
                    {
                        start = insertAt;
                    }
                }
                else
                {
                    if (DataFilter.RunFilter(r))
                    {
                        AddToList(r, ref insertAt);
                    }
                }
            }

            //MAL 2013/04/26 - pri rozbaleni skupiny nebyly nove pridane radky setridene, coz je divne. Snad to staci udelat tady.
            //if (group == null || group.Sortable) SortList(start, insertAt - start);
            SortList(start, insertAt - start);

            //rozbaleni skupin, ktere byly samy zatrideny jako radky
            if (groupsToExpand != null)
                foreach (GGroupingDataRow g in groupsToExpand)
                {
                    int i = m_list.IndexOf(g);
                    int j = ReadRows(g.Rows, g, i + 1);
                    insertAt += (j - i - 1);
                }

            return insertAt;
        }

        DataRowState m_RowStateFilter = DataRowState.Unchanged | DataRowState.Added | DataRowState.Modified;
        /// <summary>Filtr pro Stavy řádků</summary>
        public DataRowState RowStateFilter
        {
            get { return m_RowStateFilter; }
            set { m_RowStateFilter = value; Refresh(); }
        }

        private bool RunStateFilter(DataRowState state)
        {
            var v = state & RowStateFilter;
            return v != 0;
        }
        private bool RunStateFilter(DataRow row, GGroupingDataRow group = null)
        {
            //radky ve skupine nelze filtrovat na State (jsou vzdy detached)
            if (group != null)
            {
                return row.RowState != DataRowState.Deleted;
            }
            return RunStateFilter(row.RowState);
        }

        private bool GroupRowsInFilterRecursive(GGroupingDataRow group, GDataFilter dataFilter)
        {
            group.ExpandInternal(); //pripadne on-demand nacteni skupiny - nemeni stav na Expanded (a nevyvola zmenu skupiny, coz by bylo fatalni)
            foreach (DataRow r in group.Rows)
            {
                if (dataFilter.RunFilter(r))
                    return true;
                if (r is GGroupingDataRow && GroupRowsInFilterRecursive((GGroupingDataRow)r, dataFilter))
                    return true;
            }
            return false;
        }

        private void AddToList(DataRow r, ref int insertAt)
        {
            System.Diagnostics.Debug.Assert(insertAt >= 0);
            m_list.Insert(insertAt, r);
            //OnListChanged(new ListChangedEventArgs(ListChangedType.ItemAdded, insertAt));
            insertAt++;
        }

        private void RemoveRows(IEnumerable dataRowCollection, GGroupingDataRow group)
        {
            foreach (DataRow r in dataRowCollection)
            {
                if (group != null) m_grl.Remove(r);

                int l_index = m_list.IndexOf(r);
                if (l_index >= 0) //mohlo by se stat, ze to tam neni -> napr. Filtr
                {
                    m_list.RemoveAt(l_index);
                    //OnListChanged(new ListChangedEventArgs(ListChangedType.ItemDeleted, l_index));
                }

                GGroupingDataRow g = r as GGroupingDataRow;
                if (g != null && g.IsExpanded)
                    RemoveRows(g.Rows, g);
            }
        }

        //------------------------------------------------------------------
        /// <summary>
        /// Pročistí mezisoučty apod, zachová celkový součet
        /// </summary>
        public void ClearFilter()
        {
            var le = GListChangedEventArgs.Reset(this);
            //DataRow l_total = GetTotalRow();
            ReadData();
            //if (l_total != null)
            //    InsertSubtotalRow(m_list.Count, l_total, 0);
            OnListChanged(le);
        }

        /// <summary>aktualizace</summary>
        public void Refresh()
        {
            //bool l_ShowTotals = ContainsTotals;
            //int l_SubtotalLevel = SubtotalLevel;
            //GTotalFilter l_TotalFilter = TotalFilter;

            ClearFilter();

            //if (l_ShowTotals)
            //    ComputeTotals();
            //else
            //    RemoveTotals();

            //if (l_SubtotalLevel > 0)
            //    ComputeSubtotals(l_SubtotalLevel);

            //if (l_TotalFilter != GTotalFilter.AllRows)
            //    RunFilter(l_TotalFilter);
        }

        /// <summary>Nastaví filtr řádků</summary>
        public void RunFilter(GTotalFilter filter)
        {
            GListChangedEventArgs l_changed = null;
            switch (filter)
            {
                case GTotalFilter.AllRows:
                    break;
                case GTotalFilter.JustTotals:
                    {
                        int i = 0;
                        while (i < m_list.Count)
                        {
                            DataRow r = m_list[i];
                            if (!IsSubtotalRow(r))
                            {
                                if (l_changed == null) l_changed = GListChangedEventArgs.Reset(m_list);
                                m_list.RemoveAt(i);
                            }
                            else
                                i++;
                        }
                    }
                    break;
            }
            m_totalFilter = filter;
            if (l_changed != null) OnListChanged(l_changed);
        }

        /// <summary>
        /// Vyvolá ListChanged event
        /// </summary>
        protected internal void OnListChanged(GListChangedEventArgs listChangedEventArgs)
        {
            if (ListChanged != null)
                ListChanged(this, listChangedEventArgs);
        }
        /// <summary>
        /// ListChanged event
        /// </summary>
        public class GListChangedEventArgs : ListChangedEventArgs
        {
            List<DataRow> m_oldlist = null;
            /// <summary>
            /// původní seznam pro událost ListChanged
            /// </summary>
            public IEnumerable<DataRow> OldList { get { return m_oldlist; } }

            internal GListChangedEventArgs(ListChangedType listChangedType, int newIndex) : base(listChangedType, newIndex) { }
            internal GListChangedEventArgs(ListChangedType listChangedType, PropertyDescriptor propDesc) : base(listChangedType, propDesc) { }
            internal GListChangedEventArgs(ListChangedType listChangedType, int newIndex, PropertyDescriptor propDesc) : base(listChangedType, newIndex, propDesc) { }
            internal GListChangedEventArgs(ListChangedType listChangedType, int newIndex, int oldIndex) : base(listChangedType, newIndex, oldIndex) { }
            /// <summary>
            /// ListChanged event Reset
            /// </summary>
            public static GListChangedEventArgs Reset(List<DataRow> list)
            {
                var l = new GListChangedEventArgs(ListChangedType.Reset, 0);
                l.m_oldlist = new List<DataRow>(list); //schovám pro účely události ListChanged
                return l;
            }
            /// <summary>
            /// ListChanged event Reset
            /// </summary>
            public static GListChangedEventArgs Reset(GDataView dv) { return Reset(dv.m_list); }
        }

        private void OnAfterGroupToggle(EventArgs e)
        {
            if (AfterGroupToggle != null)
                AfterGroupToggle(this, e);
        }

        private void OnBeforeGroupToggle(EventArgs e)
        {
            if (BeforeGroupToggle != null)
                BeforeGroupToggle(this, e);
        }

        #endregion
        #region Vlastnosti
        /// <summary>
        /// Tabulka nad kterou dělám pohled
        /// </summary>
        public DataTable Table
        {
            get { return m_table; }
        }

        /// <summary>
        /// Řádky
        /// </summary>
        public DataRow this[int index]
        {
            get { return m_list[index]; }
        }

        //------------------------------------------------------------------
        /// <summary>
        /// Typ filtru řádků
        /// </summary>
        public enum GTotalFilter
        {
            /// <summary>
            /// všechny řádky (bez filtru)
            /// </summary>
            AllRows,
            /// <summary>
            /// Pouze součtové řádky (mezisoučty, celkové součty)
            /// </summary>
            JustTotals,
        }
        GTotalFilter m_totalFilter = GTotalFilter.AllRows;
        /// <summary>
        /// Filtr řádků. Lze odfiltrovat pouze součty.
        /// </summary>
        public GTotalFilter TotalFilter
        {
            get { return m_totalFilter; }
        }

        //------------------------------------------------------------------
        private GDataFilter m_DataFilter;
        ///<summary>filtr pro řádky</summary>
        public GDataFilter DataFilter
        {
            get { return m_DataFilter; }
            set
            {
                if (m_DataFilter == value) return;
                if (m_DataFilter.IsEmpty && value.IsEmpty) return;
                m_DataFilter = value; Refresh();
            }
        }

        //------------------------------------------------------------------
        private bool m_ReadOnly = false;
        ///<summary>příznak pouze pro čtení</summary>
        public bool ReadOnly
        {
            get { return m_ReadOnly; }
            set { m_ReadOnly = value; }
        }

        #endregion
        #region Drobné metody
        /// <summary>Vrací pozici sloupce v tabulce</summary>
        public int GetColumnIndex(string ColumnName)
        {
            int t = Table.Columns.IndexOf(ColumnName); //case-insensitive
            if (t < 0)
            {
                t = GetComputedColumnIndex(ColumnName);
                if (t >= 0) t += Table.Columns.Count;
            }
            return t;
        }
        /// <summary>Hodnota v daném řadku a sloupci tabulky</summary>
        public object GetRowValue(DataRow r, int columnIndex)
        {
            var tc = Table.Columns.Count;
            if (columnIndex < tc) return _GetRowValue(r, columnIndex);
            columnIndex -= tc;
            return m_computes[columnIndex].GetValue(r);
        }
        internal static object _GetRowValue(DataRow dr, int columnIndex)
        {
            switch (dr.RowState)
            {
                //Detached je radny stav s datama! vsechny skupiny, mezisoucty, atp. to vyuzivaji!
                //case DataRowState.Detached:
                //    return null;
                case DataRowState.Deleted:
                    return dr[columnIndex, DataRowVersion.Original];
                default:
                    return dr[columnIndex];
            }
        }

        /// <summary>Vyhledá řádek s hledanou hodnotou</summary>
        /// <param name="ColumnName">sloupec, který má obsahovat hodnotu</param>
        /// <param name="Key">hodnota</param>
        /// <returns>index řádku</returns>
        public int Find(string ColumnName, object Key)
        {
            int index = GetColumnIndex(ColumnName);
            if (index == -1) throw new GArgumentException(23200284);
            //if(index == m_sortColumn)
            //    return m_list.BinarySearch(
            //else
            {
                for (int i = 0; i < m_list.Count; i++)
                {
                    DataRow r = m_list[i];
                    if (CompareValues(Key, GetRowValue(r, index)) == 0) return i;
                }
            }
            return -1;
        }

        /// <summary>Vyhledaná a setříděná data zkopíruje do jiné tabulky (včetně případných hlaviček skupin, mezisoučtů atp.)</summary>
        public DataTable ToTable()
        {
            DataTable l_oResultTable;
            if (Table.DataSet != null)
                l_oResultTable = Table.DataSet.Clone().Tables[Table.TableName];
            else
                l_oResultTable = Table.Clone();

            foreach (DataRow row in m_list)
            {
                l_oResultTable.Rows.Add(row.ItemArray);
            }
            l_oResultTable.AcceptChanges();

            if (Table.DataSet != null)
            {
                foreach (DataTable t in Table.DataSet.Tables)
                {
                    if (t == Table) continue;
                    l_oResultTable.DataSet.Tables[t.TableName].Merge(t);
                }
            }


            return l_oResultTable;
        }

        #endregion
        #region Mezisoučty

        /// <summary>
        /// úroveň mezisoučtů (-1 = bez mezisoučtu)
        /// </summary>
        public int SubtotalLevel
        {
            get { return m_stl; }
        }

        /// <summary>
        /// všechny napočítané úroveně mezisoučtů
        /// </summary>
        public int[] SubtotalLevels
        {
            get { return m_subl.ToArray(); }
        }

        /// <summary>
        /// Test na existenci nějakých mezisoučtů
        /// </summary>
        public bool ContainsSubtotals
        {
            get { return m_trs.Count > 0; }
        }

        /// <summary>
        /// Test na existenci celkového součtu
        /// </summary>
        public bool ContainsTotals
        {
            get
            {
                if (m_stl == 0) return true;
                return GetTotalRow() != null;
            }
        }

        /// <summary>
        /// Test, zda daný řádek je mezisoučet
        /// </summary>
        /// <param name="row"></param>
        /// <returns></returns>
        public bool IsSubtotalRow(DataRow row)
        {
            int level;
            if (m_trs.TryGetValue(row, out level)) return true;
            return false;
        }

        /// <summary>
        /// Seznam řádků 
        /// </summary>
        public Dictionary<DataRow, int>.KeyCollection SubtotalRows
        {
            get
            {
                return m_trs.Keys;
            }
        }


        /// <summary>
        /// Vrací úroveň mezisoučtu konkretního řádku
        /// </summary>
        public int GetSubtotalLevel(DataRow row)
        {
            int level;
            if (m_trs.TryGetValue(row, out level)) return level;
            return -1;
        }

        /// <summary>
        /// Vrací řádek celkového součtu nebo null
        /// </summary>
        public DataRow GetTotalRow()
        {
            if (ContainsSubtotals)
            {
                if (m_list.Count >= 1) //alespon 2 radky (radek+total) (nebo 1 pokud je aktivni TotalFilter)
                {
                    DataRow r = m_list[m_list.Count - 1];
                    if (GetSubtotalLevel(r) == 0)
                    {
                        return r;
                    }
                }
            }
            return null;
        }

        /// <summary>
        /// Přidá mezisoučtový řádek (nepočítá ho, jen přidá)
        /// </summary>
        public DataRow AddSubtotalRow(int level)
        {
            DataRow r = Table.NewRow();
            m_list.Add(r);
            m_trs.Add(r, level);
            m_stl = Math.Max(m_stl, level);
            if (!m_subl.Contains(level)) m_subl.Add(level);
            OnListChanged(new GListChangedEventArgs(ListChangedType.ItemAdded, m_list.Count - 1));
            return r;
        }

        private void _ComputeSubtotals(int level, int[] sort, IList<DataRow> rows)
        {
            int llev = m_stl; if (llev < 0) llev = 0;
            DataColumn lc = Table.Columns[sort[level - 1]];
            DataRow sum = null;
            for (int i = 0; i < rows.Count; i++)
            {
                DataRow r = rows[i];

                if (r is GGroupingDataRow)
                {
                    System.Diagnostics.Debug.Assert(sum == null);
                    _ComputeSubtotals(level, sort, ((GGroupingDataRow)r).Rows);
                    continue;
                }
                if (IsSubtotalRow(r))
                {
                    if (sum != null)
                    {
                        InsertSubtotalRow(i++, sum, level, rows);
                        sum = null;
                    }
                    continue;
                }

                if (sum == null)
                {
                    sum = Table.NewRow();
                    foreach (DataColumn c in Table.Columns)
                    {
                        if (c.DataType == typeof(decimal))
                            sum[c] = nndec(r[c]);
                        else
                            sum[c] = r[c];
                    }
                    continue;
                }

                if (KeyChanged(lc, level, llev, sort, r, sum)) //zmena klice?
                {
                    InsertSubtotalRow(i, sum, level, rows);
                    sum = null;
                }
                else //stale stejne
                {
                    foreach (DataColumn c in Table.Columns)
                    {
                        if (c.DataType == typeof(decimal))
                            sum[c] = ((decimal)sum[c]) + nndec(r[c]);
                        else if (sum[c] != DBNull.Value)
                        {
                            if (!sum[c].Equals(r[c]) && !(lc.DataType == typeof(string) && GString.Parse(r[lc], true).BaseValueTrimmed.Equals(GString.Parse(sum[lc], true).BaseValueTrimmed)))
                                sum[c] = DBNull.Value;
                        }

                    }
                }
            }
            if (sum != null) InsertSubtotalRow(rows.Count, sum, level, rows);
        }

        private bool KeyChanged(DataColumn lc, int level, int llev, int[] sort, DataRow r, DataRow sum)
        {
            while (true)
            {
                if (!r[lc].Equals(sum[lc]) && !(lc.DataType == typeof(string) && GString.Parse(r[lc], true).BaseValueTrimmed.Equals(GString.Parse(sum[lc], true).BaseValueTrimmed)))
                        return true;
                level--;
                if (level <= llev) return false;
                lc = Table.Columns[sort[level - 1]];
            }
        }

        private decimal nndec(object p)
        {
            if (p is DBNull) return 0;
            System.Diagnostics.Debug.Assert(p is decimal);
            if (!(p is decimal)) return 0;
            return (decimal)p;
        }

        /// <summary>
        /// Výpočet mezisoučtů do dané úrovně
        /// </summary>
        public void ComputeSubtotals(int level)
        {
            ComputeSubtotals(System.Linq.Enumerable.ToArray(System.Linq.Enumerable.Range(1, level)));
            //if (m_sort == null) throw new GArgumentNullException(23200285);
            //if (m_list.Count == 0) return; //neni co pocitat
            //if (level < 1 || level > m_sort.Count) throw new GArgumentOutOfRangeException(23200286);
            //if (level < m_stl) return; //jiz napocitano

            //var le = GListChangedEventArgs.Reset(this);
            //for (int i = 1; i <= level; i++)
            //    _ComputeSubtotals(i);
            //OnListChanged(le);
        }

        /// <summary>
        /// Výpočet mezisoučtů do daných úrovní
        /// </summary>
        public void ComputeSubtotals(int[] levels)
        {
            if (m_list.Count == 0 || levels.Length == 0) return; //neni co pocitat
            bool changed = false;
            var le = GListChangedEventArgs.Reset(this);
            int[] l_sort = null;
            foreach (int level in levels)
            {
                if (level == 0) { changed = true; ComputeTotals(); continue; }
                if (m_sort == null && m_grouping == null) throw new GArgumentNullException(23200287); //podminka az tady -> projde Compute na level 0
                if (l_sort == null)
                {
                    l_sort = new int[(m_sort?.Count ?? 0) + (m_grouping?.Count ?? 0)];
                    int i = 0;
                    if (m_grouping != null)
                        foreach (var si in m_grouping) l_sort[i++] = si.ColumnIndex;
                    if (m_sort != null)
                        foreach (var si in m_sort) l_sort[i++] = si.ColumnIndex;
                }
                if (level < 1 || level > l_sort.Length) throw new GArgumentOutOfRangeException(23200288);
                if (level < m_stl) continue; //jiz napocitano
                changed = true;
                _ComputeSubtotals(level, l_sort, m_list);
            }
            if (changed)
                OnListChanged(le);
        }


        /// <summary>
        /// Výpočet celkového součtu
        /// </summary>
        public void ComputeTotals()
        {
            if (GetTotalRow() != null) return;
            if (m_list.Count == 0) return; //neni co pocitat
            DataRow sum = AddSubtotalRow(0);
            foreach (DataColumn c in Table.Columns)
            {
                if (c.DataType == typeof(decimal))
                {
                    sum[c] = (decimal)0;
                }
            }
            for (int i = 0; i < m_list.Count; i++)
            {
                DataRow r = m_list[i];
                if (IsSubtotalRow(r)) continue;
                foreach (DataColumn c in Table.Columns)
                {
                    if (c.DataType == typeof(decimal))
                    {
                        decimal d = ((decimal)sum[c]) + nndec(r[c]);
                        sum[c] = d;
                    }
                }
            }
        }

        /// <summary>
        /// Vyjme součty
        /// </summary>
        public void RemoveTotals()
        {
            if (ContainsSubtotals)
            {
                if (m_list.Count > 1) //alespon 2 radky (radek+total)
                {
                    int index = m_list.Count - 1;
                    DataRow r = m_list[index];
                    if (GetSubtotalLevel(r) == 0)
                    {
                        m_list.RemoveAt(index);
                        m_trs.Remove(r);
                        if (m_stl == 0) { m_stl = -1; m_subl.Clear(); } else m_subl.Remove(0);

                        OnListChanged(new GListChangedEventArgs(ListChangedType.ItemDeleted, index));
                    }
                }
            }
        }

        private void InsertSubtotalRow(int index, DataRow sum, int level, IList<DataRow> parent)
        {
            sum.EndEdit();
            parent.Insert(index, sum);
            m_trs.Add(sum, level);
            m_stl = Math.Max(m_stl, level);
            if (!m_subl.Contains(level)) m_subl.Add(level);
        }

        #endregion
        #region Sort

        private GSort m_sort;

        /// <summary>
        /// Struktura pro třídící položku
        /// </summary>
        public class GSortItem
        {
            /// <summary>jméno sloupce</summary>
            public string ColumnName;
            /// <summary>Index sloupce</summary>
            public int ColumnIndex;
            /// <summary>Směr třídění</summary>
            public ListSortDirection Direction;
            /// <summary>Vlastní třídíci kritérium</summary>
            public IComparer<DataRow> Comparer;
            /// <summary>Template pro hašování</summary>
            public GTemplate HashTemplate;

            /// <summary>titlek sloupce</summary>
            public string ColumnTitle;
            /// <summary>Template pro titlek sloupce</summary>
            public GTemplate HeaderTemplate;

            /// <summary>kontruktor</summary>
            public GSortItem(string columnName, int columnIndex, ListSortDirection direction)
            {
                this.ColumnName = columnName;
                this.ColumnIndex = columnIndex;
                this.Direction = direction;
                this.Comparer = null;
                this.HashTemplate = null;
                this.ColumnTitle = "";
                this.HeaderTemplate = null;
            }
        }

        /// <summary>Třídění pohledu přes tabulku</summary>
        public class GSort : IComparer<DataRow>, IEnumerable<GSortItem>
        {
            GDataView m_view;
            List<GSortItem> m_srt = new List<GSortItem>();

            /// <summary>konstruktor</summary>
            public GSort()
            {
            }

            /// <summary>konstruktor</summary>
            public GSort(GDataView view)
            {
                m_view = view;
            }

            /// <summary>konstruktor</summary>
            public GSort(GDataView view, string column, ListSortDirection direction)
                : this(view)
            {
                int l_index = view.GetColumnIndex(column);
                m_srt.Add(new GSortItem(column, l_index, direction));
            }

            /// <summary>klon s vyjmutím jedné položky</summary>
            public GSort CloneButOne(GSortItem i)
            {
                GSort l_clone = new GSort(m_view);
                foreach (GSortItem si in m_srt)
                {
                    if (si.ColumnIndex != i.ColumnIndex)
                        l_clone.Add(si);
                }
                return l_clone;
            }
            internal void SetView(GDataView v)
            {
                if (m_view == v) return;
                if (m_view != null) throw new GArgumentOutOfRangeException(21000015);
                m_view = v;
            }


            /// <summary>
            /// Je sloupec daného indexu třídícím kritériem?
            /// </summary>
            /// <param name="columnIndex"></param>
            /// <returns></returns>
            public int ContainsIndex(int columnIndex)
            {
                for (int i = 0; i < m_srt.Count; i++)
                {
                    if (m_srt[i].ColumnIndex == columnIndex)
                        return i;
                }
                return -1;
            }

            /// <summary>
            /// Je sloupec daného jména třídícím kritériem?
            /// </summary>
            public int ContainsName(string columnName)
            {
                for (int i = 0; i < m_srt.Count; i++)
                {
                    if (String.Compare(m_srt[i].ColumnName, columnName, true) == 0)
                        return i;
                }
                return -1;
            }

            /// <summary>Parse řetězce s popisem třídění - pro interní použití</summary>
            public static bool ParseColumnString(string s, out string column, out ListSortDirection sortDir)
            {
                column = s.ToUpper().Trim();
                sortDir = ListSortDirection.Ascending;
                if (column.Length == 0) return false;
                if (column.EndsWith(" ASC"))
                {
                    sortDir = ListSortDirection.Ascending;
                    column = column.Substring(0, column.Length - 4).Trim();
                }
                else if (column.EndsWith(" DESC"))
                {
                    sortDir = ListSortDirection.Descending;
                    column = column.Substring(0, column.Length - 5).Trim();
                }
                return true;
            }
            /// <summary>
            /// Vrací třídění podle předpisu z řetězce
            /// </summary>
            public static GSort Parse(GDataView view, string value)
            {
                if (value == null) return null;
                GSort res = new GSort(view);
                foreach (string s in value.Split(','))
                {
                    string l_columnName;
                    ListSortDirection l_SortDir;
                    if (ParseColumnString(s, out l_columnName, out l_SortDir) == false) continue;

                    int l_index = view.GetColumnIndex(l_columnName);
                    if (l_index == -1) throw new GException(21000006, 21090003); //RC-EX 21090003 : nelze třídit podle skrytého sloupce
                    res.m_srt.Add(new GSortItem(l_columnName, l_index, l_SortDir));
                }
                return res;
            }
            /// <summary>
            /// Vrací třídění podle předpisu z řetězce
            /// </summary>
            public static GSort Parse(DataTable table, string value)
            {
                GSort res = new GSort();
                foreach (string s in value.Split(','))
                {
                    string l_column = s.ToUpper().Trim();
                    if (l_column.Length == 0) continue;
                    ListSortDirection l_SortDir = ListSortDirection.Ascending;
                    if (l_column.EndsWith(" ASC"))
                    {
                        l_SortDir = ListSortDirection.Ascending;
                        l_column = l_column.Substring(0, l_column.Length - 4).Trim();
                    }
                    else if (l_column.EndsWith(" DESC"))
                    {
                        l_SortDir = ListSortDirection.Descending;
                        l_column = l_column.Substring(0, l_column.Length - 5).Trim();
                    }
                    int l_index = table.Columns.IndexOf(l_column);
                    if (l_index == -1) throw new GException(21000013, 21090003); //RC-EX 21090003 : nelze třídit podle skrytého sloupce
                    res.m_srt.Add(new GSortItem(l_column, l_index, l_SortDir));
                }
                return res;
            }


            /// <summary>
            /// řetězcové vyjádření třídění
            /// </summary>
            public override string ToString()
            {
                StringBuilder res = new StringBuilder();
                foreach (GSortItem si in m_srt)
                {
                    if (si.ColumnIndex < 0) continue;
                    res.Append(si.ColumnName);
                    if (si.Direction == ListSortDirection.Descending)
                        res.Append(" DESC");
                    res.Append(",");
                }
                if (res.Length > 0 && res[res.Length - 1] == ',')
                    res.Remove(res.Length - 1, 1);
                return res.ToString();
            }

            /// <summary>
            /// pořet kritérií
            /// </summary>
            public int Count
            {
                get { return m_srt.Count; }
            }

            /// <summary>
            /// Položky (kritéria)
            /// </summary>
            public GSortItem this[int index]
            {
                get { return m_srt[index]; }
            }

            /// <summary>přidá třídící položku</summary>
            public void Add(GSortItem it)
            {
                m_srt.Add(it);
            }

            /// <summary>klon s vyjmutím jedné položky</summary>
            public void AddRange(IEnumerable<GSortItem> items)
            {
                foreach (GSortItem si in items)
                {
                    Add(si);
                }
            }

            /// <summary>nastaví třídící položku</summary>
            public void Set(int index, GSortItem it)
            {
                m_srt[index] = it;
            }

            #region Comparer

            /// <summary>Hodnota v daném řadku a sloupci tabulky</summary>
            private object GetRowValue(DataRow r, int columnIndex)
            {
                if (m_view != null) return m_view.GetRowValue(r, columnIndex);
                return _GetRowValue(r, columnIndex);
            }
            internal static object _GetRowValue(DataRow dr, int columnIndex)
            {
                return dr.RowState != DataRowState.Deleted ? dr[columnIndex] : dr[columnIndex, DataRowVersion.Original];
            }

            int IComparer<DataRow>.Compare(DataRow r1, DataRow r2)
            {
                if (r1 == r2) return 0; //radek je sam se sebou vzdycky stejny (proc to vubec posilaj?)

                var gl = 0;
                if (m_view != null && m_view.m_grouping != null)
                {
                    gl = m_view.m_grouping.Count;
                    int g1 = GetGroupLevel(r1);
                    int g2 = GetGroupLevel(r2);
                    int g = Math.Min(g1, g2);
                    if (g == -1)
                        g = gl;

                    //první třídění podle Grouping
                    for (int i = 0; i < g; i++)
                    {
                        int result;
                        GSortItem si = m_view.m_grouping[i];
                        if (si.Comparer != null)
                            result = si.Comparer.Compare(r1, r2);
                        else
                        {
                            object v1 = GetRowValue(r1, si.ColumnIndex);
                            object v2 = GetRowValue(r2, si.ColumnIndex);
                            result = CompareValues(v1, v2);
                        }
                        if (result != 0)
                        {
                            if (si.Direction == ListSortDirection.Descending) return -result;
                            return result;
                        }
                    }
                    if (g1 != g2)
                    {
                        if (g1 < 0) return 1;
                        if (g2 < 0) return -1;
                        return g1 > g2 ? 1 : -1; //podskupina za
                    }
                }

                int l1 = m_view != null ? m_view.GetSubtotalLevel(r1) : -1;
                int l2 = m_view != null ? m_view.GetSubtotalLevel(r2) : -1;
                int l = 0;
                if (l1 == 0) return l2 == 0 ? 0 : 1;
                if (l2 == 0) return -1;
                if (l1 > 0 && l2 > 0)
                {
                    if (l1 < l2)
                        return +1;
                    if (l1 > l2)
                        return -1;
                    //pokud jsou stejny, pokracuju (takze se vezme l2+1)
                }
                if (l2 >= 0)
                    l = l2 - gl;
                else if (l1 >= 0)
                    l = l1 - gl;
                else
                    l = this.Count;

                for (int i = 0; i < l; i++)
                {
                    int result;
                    GSortItem si = this[i];
                    if (si.Comparer != null)
                        result = si.Comparer.Compare(r1, r2);
                    else
                    {
                        object v1 = GetRowValue(r1, si.ColumnIndex);
                        object v2 = GetRowValue(r2, si.ColumnIndex);
                        result = CompareValues(v1, v2);
                    }
                    if (result != 0)
                    {
                        if (si.Direction == ListSortDirection.Descending) return -result;
                        return result;
                    }
                }

                //radky jsou shodne!
                if (l1 != l2)
                {
                    if (l1 >= 0) return 1; //mezisoucet za
                    if (l2 >= 0) return -1; //mezisoucet za
                }
                if (m_view != null)
                    return m_view.m_table.Rows.IndexOf(r1) - m_view.m_table.Rows.IndexOf(r2); //stable sort
                return 0;
            }
            #endregion
            #region IEnumerable<GSortItem> Members
            /// <summary>Enumerator</summary>
            public IEnumerator<GSortItem> GetEnumerator()
            {
                return m_srt.GetEnumerator();
            }

            IEnumerator<GSortItem> IEnumerable<GSortItem>.GetEnumerator()
            {
                return GetEnumerator();
            }

            IEnumerator IEnumerable.GetEnumerator()
            {
                return GetEnumerator();
            }
            #endregion
        }

        private static int GetGroupLevel(DataRow r)
        {
            var g = r as GGroupingDataRow;
            if (g == null) return -1;
            return g.GroupingLevel + 1;
        }

        private static int CompareValues(object v1, object v2)
        {
            if (v1 == DBNull.Value || v1 == null)
            {
                if (v2 == DBNull.Value || v2 == null)
                    return 0;
                else
                    return -1;
            }
            if (v2 == DBNull.Value || v2 == null)
                return 1;
            IComparable c1 = v1 as IComparable;
            if (c1 == null)
                return v1.Equals(v2) ? 0 : v1.GetHashCode() - v2.GetHashCode();
            return c1.CompareTo(v2);
        }

        /// <summary>
        /// Třídění (jako string)
        /// </summary>
        public string Sort
        {
            get { return m_sort != null ? m_sort.ToString() : ""; }
            set
            {
                if (string.IsNullOrEmpty(value) && (m_sort == null || m_sort.Count == 0)) return; //oba prazdne sorty
                if (m_sort != null && m_sort.ToString() == value) return; //stejny sort jako minule
                SetSort(GSort.Parse(this, value));
            }
        }

        /// <summary>Třídění</summary>
        public GSort SortObject
        {
            get { return m_sort.Count > 0 ? m_sort : null; }
            set
            {
                if (m_sort == value) return; //identicky sort?
                SetSort(value);              //zamerne neporovnavam na obsah, ale jen referenci
            }
        }

        /// <summary>Příznak existence třídění</summary>
        public bool HasSort
        {
            get { return m_sort != null && m_sort.Count > 0; }
        }

        private void SetSort(GSort sort)
        {
            sort.SetView(this);
            if (SubtotalLevel > 0)
            {
                bool needRefresh = false;
                if (sort.Count < SubtotalLevel) needRefresh = true;
                else
                    for (int i = 0; i < SubtotalLevel; i++)
                    {
                        if (string.Compare(sort[i].ColumnName, m_sort[i].ColumnName, StringComparison.OrdinalIgnoreCase) != 0) { needRefresh = true; break; }
                    }
                if (needRefresh) ClearFilter(); //smazu mezisoucty
            }
            m_sort = sort;
            ApplySort();
        }

        private void SortList(int start, int count)
        {
            if (count == 0) return;
            if (HasSort || HasGrouping)
                m_list.Sort(start, count, m_sort);
        }

        /// <summary>Třídění</summary>
        public void ApplySort()
        {
            //ClearFilter();
            //return;

            if (HasSort == false && HasGrouping == false)
                return;

            var le = GListChangedEventArgs.Reset(this);
            if (HasGroups == false)
            {
                m_list.Sort(m_sort);
                OnListChanged(le);
                return;
            }

            //trideni pro pohledy se skupinama (at jiz seskupenim nebo explicitne od programatora)
            //ciste seskupeni bez expl.skupin ale jen proleze a setridi se na konci cele najednou (pridane skupiny totiz maji Sortable==false)
            int start = 0;
            int i = 0;
            int c = m_list.Count;
            while (i < c)
            {
                DataRow r = m_list[i];
                if (r is GGroupingDataRow && ((GGroupingDataRow)r).Sortable) //Sortable je specialni vlastnost pro skupinovani. Tyto skupiny se netridi explicitne - spoleha se na zatrideni v hromadnem setrideni
                {
                    if (((GGroupingDataRow)r).SortWithRows) //nelze setridit -> musim prenacist data (musel bych tridit s ohledem na prislusnost do skupiny)
                    {
                        ClearFilter(); return;
                    }
                    if (start < i) m_list.Sort(start, i - start, m_sort);
                    start = ++i;
                }
                else
                    i++;
            }
            if (start < c) m_list.Sort(start, c - start, m_sort);
            OnListChanged(le);
        }


        #endregion
        #region Počítané sloupce
        List<GDataViewComputedPropertyDescriptor> m_computes = new List<GDataViewComputedPropertyDescriptor>();
        /// <summary>Přidání počítaného sloupce do pohledu</summary>
        public void AddComputedColumn(GDataViewComputedColumn c)
        {
            m_computes.Add(new GDataViewComputedPropertyDescriptor(c.Name, c.Type, c.Expression));
            OnListChanged(new GListChangedEventArgs(ListChangedType.PropertyDescriptorAdded, -1));
        }
        /// <summary>Přidání počítaného sloupce do pohledu</summary>
        public void AddComputedDecimal(string name, GDataExpression expression)
        {
            m_computes.Add(new GDataViewComputedPropertyDescriptor(name, typeof(decimal), expression));
            OnListChanged(new GListChangedEventArgs(ListChangedType.PropertyDescriptorAdded, -1));
        }
        /// <summary>Zrušení všech počítaných sloupců</summary>
        public void ClearComputedColumns()
        {
            if (m_computes.Count > 0)
            {
                m_computes.Clear();
                OnListChanged(new GListChangedEventArgs(ListChangedType.Reset, -1));
            }
        }
        /// <summary>Hledání počítaného sloupce dle jména</summary>
        public bool HasComputedColumn(string name)
        {
            return GetComputedColumnDescriptor(name) != null;
        }
        /// <summary>Hledání počítaného sloupce dle jména</summary>
        internal GDataViewComputedPropertyDescriptor GetComputedColumnDescriptor(string name)
        {
            foreach (GDataViewComputedPropertyDescriptor d in m_computes)
            {
                if (d.Name == name) return d;
            }
            return null;
        }
        /// <summary>Hledání počítaného sloupce dle jména</summary>
        internal int GetComputedColumnIndex(string name)
        {
            int i = 0;
            foreach (GDataViewComputedPropertyDescriptor d in m_computes)
            {
                if (d.Name.Equals(name, StringComparison.OrdinalIgnoreCase)) return i; //case-insensitive
                i++;
            }
            return -1;
        }
        /// <summary>Hledání počítaného sloupce dle jména</summary>
        public GDataViewComputedColumn GetComputedColumn(string name)
        {
            var d = GetComputedColumnDescriptor(name);
            return d == null ? null : new GDataViewComputedColumn(d);
        }
        /// <summary>Seznam počítaných sloupců</summary>
        public IEnumerable<GDataViewComputedColumn> ComputedColumns
        {
            get { return new GVirtualArray<GDataViewComputedColumn>(m_computes.Count, index => new GDataViewComputedColumn(m_computes[index])); }
        }
        /// <summary>Počet počítaných sloupců</summary>
        public int ComputedColumnsCount
        {
            get { return m_computes.Count; }
        }
        /// <summary>Obsahuje počítaný sloupec?</summary>
        public bool HasComputedColumns
        {
            get { return m_computes.Count > 0; }
        }
        /// <summary>Počítaný sloupec</summary>
        public class GDataViewComputedColumn
        {
            internal GDataViewComputedColumn(GDataViewComputedPropertyDescriptor d)
            {
                m_Name = d.Name;
                m_Type = d.PropertyType;
                m_Expression = d.Expression;
            }
            /// <summary>Konstruktor</summary>
            public GDataViewComputedColumn(string name, Type type, GDataExpression expression)
            {
                m_Name = name;
                m_Type = type;
                m_Expression = expression;
            }

            //------------------------------------------------------------------
            private string m_Name;
            ///<summary>Jméno</summary>
            public string Name
            {
                get { return m_Name; }
            }
            //------------------------------------------------------------------
            private Type m_Type;
            ///<summary>Typ</summary>
            public Type Type
            {
                get { return m_Type; }
                set { m_Type = value; }
            }
            //------------------------------------------------------------------
            private GDataExpression m_Expression;
            ///<summary>Výraz</summary>
            public GDataExpression Expression
            {
                get { return m_Expression; }
            }

        }
        internal class GDataViewComputedPropertyDescriptor : System.ComponentModel.PropertyDescriptor
        {
            public GDataViewComputedPropertyDescriptor(string columnName, Type propertyType, GDataExpression expression)
                : base(columnName, null)
            {
                m_PropertyType = propertyType;
                m_Expression = expression;
            }

            private GDataExpression m_Expression;
            ///<summary>výraz</summary>
            public GDataExpression Expression
            {
                get { return m_Expression; }
            }

            public override object GetValue(object component)
            {
                return m_Expression.Compute((DataRow)component, m_PropertyType);
            }

            public override Type ComponentType
            {
                get { return typeof(DataRow); }
            }

            Type m_PropertyType;
            public override Type PropertyType
            {
                get { return m_PropertyType; }
            }

            public override void ResetValue(object component)
            {
            }

            public override void SetValue(object component, object value)
            {
            }

            public override bool CanResetValue(object component)
            {
                return false;
            }

            public override bool ShouldSerializeValue(object component)
            {
                return false;
            }

            public override bool IsReadOnly
            {
                get { return true; }
            }

        }

        #endregion
        #region IList Members

        int IList.Add(object value)
        {
            throw new InvalidOperationException("The Item property is read-only.");
        }

        void IList.Clear()
        {
            ClearFilter();
        }

        bool IList.Contains(object value)
        {
            if (value is DataRow)
                return m_list.Contains((DataRow)value);
            return false;
        }

        int IList.IndexOf(object value)
        {
            if (value is DataRow)
                return m_list.IndexOf((DataRow)value);
            return -1;
        }

        void IList.Insert(int index, object value)
        {
            throw new InvalidOperationException("The Item property is read-only.");
        }

        bool IList.IsFixedSize
        {
            get { return true; }
        }

        bool IList.IsReadOnly
        {
            get { return ReadOnly; }
        }

        void IList.Remove(object value)
        {
            throw new InvalidOperationException("The Item property is read-only.");
        }

        void IList.RemoveAt(int index)
        {
            throw new InvalidOperationException("The Item property is read-only.");
        }

        object IList.this[int index]
        {
            get
            {
                return m_list[index];
            }
            set
            {
                throw new InvalidOperationException("The Item property is read-only.");
            }
        }

        #endregion
        #region ICollection Members

        void ICollection.CopyTo(Array array, int index)
        {
            m_list.CopyTo((DataRow[])array, index);
        }

        /// <summary>
        /// Počet řádků v pohledu
        /// </summary>
        public int Count
        {
            get { return m_list.Count; }
        }

        bool ICollection.IsSynchronized
        {
            get { return false; }
        }

        object ICollection.SyncRoot
        {
            get { return this; }
        }

        #endregion
        #region IEnumerable Members

        IEnumerator IEnumerable.GetEnumerator()
        {
            return m_list.GetEnumerator();
        }

        IEnumerator<DataRow> IEnumerable<DataRow>.GetEnumerator()
        {
            return m_list.GetEnumerator();
        }

        #endregion
        #region ITypedList Members

        PropertyDescriptorCollection ITypedList.GetItemProperties(PropertyDescriptor[] listAccessors)
        {
            PropertyDescriptor[] l_pdesc = new PropertyDescriptor[Table.Columns.Count + m_computes.Count];
            int i = 0;
            for (; i < Table.Columns.Count; i++)
            {
                l_pdesc[i] = new GDataViewPropertyDescriptor(Table.Columns[i].ColumnName, i, Table.Columns[i].DataType, false);
            }
            foreach (GDataViewComputedPropertyDescriptor c in m_computes)
            {
                l_pdesc[i++] = c;
            }
            return new PropertyDescriptorCollection(l_pdesc);
        }

        string ITypedList.GetListName(PropertyDescriptor[] listAccessors)
        {
            return m_table + "_GDataView";
        }

        #endregion
        #region IBindingList Members

        void IBindingList.AddIndex(PropertyDescriptor property)
        {
        }

        object IBindingList.AddNew()
        {
            throw new InvalidOperationException("The Item property is read-only.");
        }

        bool IBindingList.AllowEdit
        {
            get { return !ReadOnly; }
        }

        bool IBindingList.AllowNew
        {
            get { return false; }
        }

        bool IBindingList.AllowRemove
        {
            get { return false; }
        }

        void IBindingList.ApplySort(PropertyDescriptor property, ListSortDirection direction)
        {
            m_sort = new GDataView.GSort(this, property.DisplayName, direction);
            ApplySort();
        }

        int IBindingList.Find(PropertyDescriptor property, object key)
        {
            return Find(property.DisplayName, key);
        }

        bool IBindingList.IsSorted
        {
            get { return m_sort != null; }
        }

        /// <summary>
        /// Událost při změně seznamu (nové řádky, apod.)
        /// </summary>
        public event ListChangedEventHandler ListChanged;
        /// <summary>
        /// Událost před rozbalením/zabalením skupiny
        /// </summary>
        public event EventHandler AfterGroupToggle;
        /// <summary>
        /// Událost před rozbalením/zabalením skupiny
        /// </summary>
        public event EventHandler BeforeGroupToggle;

        void IBindingList.RemoveIndex(PropertyDescriptor property)
        {
        }

        void IBindingList.RemoveSort()
        {
            m_sort = new GSort(this);
            ApplySort();
        }

        ListSortDirection IBindingList.SortDirection
        {
            get
            {
                if (m_sort != null && m_sort.Count > 0 && m_sort[0].ColumnIndex >= 0)
                    return m_sort[0].Direction;
                return ListSortDirection.Ascending;
            }
        }

        PropertyDescriptor IBindingList.SortProperty
        {
            get
            {
                if (m_sort != null && m_sort.Count > 0)
                {
                    var s = m_sort[0];
                    var i = s.ColumnIndex;
                    if (i >= 0)
                    {
                        if (i >= Table.Columns.Count)
                        {
                            i -= Table.Columns.Count;
                            if (m_computes.Count <= i) return null;//odkaz na jiz smazanou compute?
                            return m_computes[i];
                        }
                        return new GDataViewPropertyDescriptor(s.ColumnName, s.ColumnIndex, Table.Columns[s.ColumnIndex].DataType, false);
                    }
                }
                return null;
            }
        }

        bool IBindingList.SupportsChangeNotification
        {
            get { return true; }
        }

        bool IBindingList.SupportsSearching
        {
            get { return true; }
        }

        bool IBindingList.SupportsSorting
        {
            get { return true; }
        }

        #endregion
        #region GDataViewPropertyDescriptor
        private class GDataViewPropertyDescriptor : System.ComponentModel.PropertyDescriptor
        {
            Type m_ColType;
            int m_ColIndex;
            bool m_ColIsReadOnly;

            public GDataViewPropertyDescriptor(string ColumnName, int ColumnIndex, Type ColumnType, bool ColumnIsReadOnly)
                : base(ColumnName, null)
            {
                m_ColIndex = ColumnIndex;
                m_ColType = ColumnType;
                m_ColIsReadOnly = ColumnIsReadOnly;
            }

            public override object GetValue(object component)
            {
                if (component == null)
                {
                    throw new Exception("component null");
                }

                if (!(component is DataRow))
                {
                    throw new Exception("nesprávná komponenta: " + component.GetType());
                }

                object s = GDataView._GetRowValue((DataRow)component, m_ColIndex);
                if (m_ColType == typeof(string) && (s is string))
                    return ((string)s).TrimEnd();
                return s;
            }

            public override Type ComponentType
            {
                get { return typeof(DataRow); }
            }

            public override Type PropertyType
            {
                get { return m_ColType; }
            }

            public override void ResetValue(object component)
            {
            }

            public override void SetValue(object component, object value)
            {
                ((DataRow)component)[m_ColIndex] = value;
            }

            public override bool CanResetValue(object component)
            {
                return false;
            }

            public override bool ShouldSerializeValue(object component)
            {
                return false;
            }

            public override bool IsReadOnly
            {
                get { return m_ColIsReadOnly; }
            }

        }
        #endregion
        #region Skupinování

        private GSort m_grouping = null;

        /// <summary>Příznak existence skupinování</summary>
        public bool HasGrouping
        {
            get { return m_grouping != null && m_grouping.Count > 0; }
        }

        /// <summary>Třídění</summary>
        public GSort GroupingObject
        {
            get { return m_grouping; }
            set
            {
                if (value != null && value.Count == 0) value = null;
                if (m_grouping != value)
                {
                    m_grouping = value;
                    ClearFilter();
                }
            }
        }

        /// <summary>Zapne skupiny a třídění současně</summary>
        public void SetGroupingAndSort(GSort grouping, GSort sort, GGridFormat gf = null)
        {
            if (grouping.Count == 0) SetSort(sort);
            else
            {
                sort.SetView(this);
                grouping.SetView(this);
                m_grouping = grouping;
                m_sort = sort;
                m_gf = gf;
                ClearFilter();
            }
        }

        /// <summary>Příznak existence skupin v pohledu (potencionálně i prázdných)</summary>
        public bool HasGroups
        {
            get { return m_grouplevel >= 0; }
        }

        /// <summary>Najde k danému řádku jeho skupinu</summary>
        public GGroupingDataRow GroupingParentRow(DataRow row)
        {
            GGroupingDataRow val;
            if (m_grl.TryGetValue(row, out val)) return val;
            return null;
        }
        /// <summary>Úroveň zanoření konkrétního řádku ve skupinách</summary>
        public int GroupingLevel(DataRow row)
        {
            GGroupingDataRow val;
            if (m_grl.TryGetValue(row, out val)) return 1 + val.GroupingLevel;
            return 0;
        }
        /// <summary>Maximální úroveň zanoření skupin</summary>
        public int GroupingLevelMaximum
        {
            get { return m_grouplevel; }
        }

        private void DoGrouping()
        {
            if (m_grouping == null) return;

            List<DataRow> l_list = new List<DataRow>();
            int gc = GroupingObject.Count;
            GGroupingDataRow[] g = new GGroupingDataRow[gc];
            int[] gcnt = new int[gc];
            object[] h = new object[gc];

            var l_nonGroupColumns = new Dictionary<DataColumn, GColumnAggregateMethod>();
            foreach (DataColumn c in Table.Columns)
            {
                if (GroupingObject.ContainsName(c.ColumnName) >= 0) continue;

                GColumnAggregateMethod l_AggregateMethod = GColumnAggregateMethod.none;
                GColumn colg = m_gf != null ? m_gf.Columns[c.ColumnName] : null;
                if (colg != null) l_AggregateMethod = colg.AggregateMethod;
                //toto dela problemy, nebot na ORA je decimal kdeco (vcetne typ_ag) a pak se to scita, i kdyz je to nesmysl   else if (c.DataType == typeof(decimal)) l_AggregateMethod = GColumnAggregateMethod.sum;

                l_nonGroupColumns.Add(c, l_AggregateMethod);
            }

            foreach (DataRow r in m_list)
            {
                for (int k = 0; k < gc; k++)
                {
                    GSortItem gi = GroupingObject[k];
                    object key = GetRowValue(r, gi.ColumnIndex);
                    if (key is string) key = ((string)key).TrimEnd();
                    object hash = gi.HashTemplate != null && key != DBNull.Value
                        ? gi.HashTemplate.GetFormattedValue(new GDataTemplateGroupingSource(null, this, (GGroupingDataRow)null, key))
                        : key;

                    bool l_newGroup = g[k] == null;
                    if (l_newGroup == false)
                    {
                        object oldhash = h[k];
                        l_newGroup = oldhash.Equals(hash) == false;
                        if (l_newGroup) FinishGroup(gi, g[k], gcnt[k], oldhash, l_nonGroupColumns);
                    }
                    if (l_newGroup)
                    {
                        g[k] = _newGroup(k, r, l_nonGroupColumns);
                        h[k] = hash;
                        gcnt[k] = 1; //1 radek uz tam je
                        if (k > 0) g[k - 1].Rows.Add(g[k]); else l_list.Add(g[k]);

                        for (int j = k + 1; j < gc; j++)
                        {
                            if (g[j] != null) FinishGroup(GroupingObject[j], g[j], gcnt[j], h[j], l_nonGroupColumns);
                            g[j] = null;
                            h[j] = null;
                        }
                    }
                    else
                        gcnt[k]++;
                }
                g[gc - 1].Rows.Add(r);

                //vymazani sloupcu, ktere nejsou shodne pro celou skupinu (az od 2. radku)
                for (int k = 0; k < gc; k++)
                {
                    if (gcnt[k] == 1) continue; //prvni radek
                    GGroupingDataRow gk = g[k];
                    foreach (DataColumn c in l_nonGroupColumns.Keys)
                    {
                        if (gk[c] != DBNull.Value && gk[c].Equals(r[c]) == false)
                            gk[c] = DBNull.Value;
                    }
                }
            }
            for (int k = 0; k < gc; k++)
            {
                FinishGroup(GroupingObject[k], g[k], gcnt[k], h[k], l_nonGroupColumns);
            }

            m_list = l_list;
            m_grouplevel += gc;
        }

        private void FinishGroup(GSortItem gi, GGroupingDataRow gk, int cnt, object hash, Dictionary<DataColumn, GColumnAggregateMethod> columns)
        {
            if (gk == null) return; //nastane pri prazdnem seznamu, ktery se pokousi zgroupovat
            foreach (KeyValuePair<DataColumn, GColumnAggregateMethod> ca in columns)
            {
                if (ca.Value == GColumnAggregateMethod.none) continue;
                DataColumn c = ca.Key;
                var newValue = GDataTemplateGroupingSource.ComputeAggregate(this, gk, c, ca.Value, true, cnt);
                if (newValue != null) gk[c] = newValue;
                gk.ColumnAggregateMethods[c] = ca.Value;
            }

            if (gi.HeaderTemplate == null)
            {
                string value = hash.ToString().TrimEnd(); //hash, nikoliv key
                value = string.Format("{0} ({1})", value, /*gk.Rows.CountRecursive*/cnt);
                if (gi.ColumnTitle != "")
                    gk.GroupTitle = gi.ColumnTitle + ": " + value;
                else
                    gk.GroupTitle = value;
                return;
            }
            object key = GetRowValue(gk, gi.ColumnIndex);
            gk.GroupTitle = gi.HeaderTemplate.GetFormattedValue(
                new GDataTemplateGroupingSource(Table.Columns[gi.ColumnIndex], this, gk, key, hash) { m_knownCount = cnt }
                );
        }

        private GGroupingDataRow _newGroup(int k, DataRow row, Dictionary<DataColumn, GColumnAggregateMethod> columns)
        {
            var g = GDataTable.NewGroupingRow(m_table);
            g.Sortable = false;
            g.ItemArray = row.ItemArray;
            return g;
        }

        /// <summary>Obnovení skupinování</summary>
        public void RestoreGrouping(string groupList, GGridFormat gf)
        {
            m_gf = gf;
            m_grouping = GSort.Parse(this, groupList);
            //nevolám!! ClearFilter(); //zrusi mezisoucty atp., pretridi
        }

        /// <summary>Skupinování dle sloupce s rozšířeným nastavením</summary>
        public void GroupBy(string columnName, ListSortDirection sortDirection = ListSortDirection.Ascending, string columnTitle = null, GTemplate headerTemplate = null, GTemplate hashTemplate = null, GGridFormat gf = null)
        {
            m_gf = gf;
            if (m_grouping == null) m_grouping = new GSort(this);
            if (m_grouping.ContainsName(columnName) >= 0) return;

            int l_index = GetColumnIndex(columnName);
            if (l_index == -1) throw new GException(21000007, 21090003); //RC-EX 21090003 : nelze třídit podle skrytého sloupce
            m_grouping.Add(new GSortItem(columnName, l_index, sortDirection) { ColumnTitle = columnTitle, HeaderTemplate = headerTemplate, HashTemplate = hashTemplate });

            ClearFilter(); //zrusi mezisoucty atp., pretridi
        }


        /// <summary>Skupinování dle sloupce s rozšířeným nastavením</summary>
        public void GroupBy(string columnName, ListSortDirection sortDirection, GGridFormat gf)
        {
            GColumn gc = gf.Columns[columnName];

            string l_headerText = gc.Title;
            if (l_headerText == "" && string.IsNullOrEmpty(gc.Description) == false)
            {
                l_headerText = gc.Description;
            }
            GroupBy(columnName, sortDirection, l_headerText, gc.GroupHeaderTemplate, gc.GroupHashTemplate, gf);
        }

        //------------------------------------------------------------------
        /// <summary>Rozbalí všechny skupiny v celém View</summary>
        public void ExpandGroups()
        {
            List<GGroupingDataRow> gs = new List<GGroupingDataRow>();
            foreach (DataRow row in m_list)
            {
                var g = row as GGroupingDataRow;
                if (g != null && g.Expand(false)) gs.Add(g);
            }
            if (gs.Count > 0)
                HandleGroups(gs.ToArray());
        }
        /// <summary>Rozbalí všechny skupiny a podskupiny v celém View</summary>
        public void ExpandAllGroups()
        {
            List<GGroupingDataRow> gs = new List<GGroupingDataRow>();
            foreach (DataRow row in m_list)
            {
                var g = row as GGroupingDataRow;
                if (g != null && g.ExpandAll(false)) gs.Add(g);
            }
            if (gs.Count > 0)
                HandleGroups(gs.ToArray());
        }
        /// <summary>Zabalí všechny skupiny v celém View</summary>
        public void CollapseGroups()
        {
            List<GGroupingDataRow> gs = new List<GGroupingDataRow>();
            foreach (DataRow row in m_list)
            {
                var g = row as GGroupingDataRow;
                if (g != null && g.Collapse(false)) gs.Add(g);
            }
            if (gs.Count > 0)
                HandleGroups(gs.ToArray());
        }

        #endregion
    }

}
