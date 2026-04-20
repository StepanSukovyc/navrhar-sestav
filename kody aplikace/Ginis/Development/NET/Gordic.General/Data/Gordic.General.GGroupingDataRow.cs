//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GGroupingDataRow.cs                          </Name>
//    <Description> øádek datasetu pro skupinování (netypový)                   </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                  </Copyright>
//    <Created>     2009-12-14                                                  </Created>
//  </FileHeader>

using System;
using System.Data;
using System.Xml;
using System.Runtime.Serialization;
using System.Collections.Generic;
using System.Collections;
using System.ComponentModel;

namespace Gordic.General
{

    /// <summary>øádek datasetu pro skupinování (netypový)</summary>
#if !DEBUG
	[System.Diagnostics.DebuggerStepThrough]
#endif
    public class GGroupingDataRow : GDataRow
    {

        /// <summary>konstruktor</summary>
        protected internal GGroupingDataRow(DataRowBuilder builder)
            : base(builder)
        {
            m_rows = new GGroupingDataRowCollection(this);
        }

        //------------------------------------------------------------------
        GGroupingDataRowCollection m_rows;
        /// <summary>podøízené øádky</summary>
        public GGroupingDataRowCollection Rows
        {
            get { return m_rows; }
        }

        /// <summary>Seznam všech øádkù vèetnì øádkù vnoøených skupin</summary>
        public IEnumerable<DataRow> AllRows()
        {
            List<DataRow> l_list = new List<DataRow>();
            foreach (DataRow r in Rows)
            {
                if (r is GGroupingDataRow)
                    l_list.AddRange(((GGroupingDataRow)r).AllRows());
                else
                    l_list.Add(r);
            }
            return l_list;
        }

        //------------------------------------------------------------------
        /// <summary>úrovìò zanoøení</summary>
        public int GroupingLevel
        {
            get
            {
                if (ParentGroup != null) return ParentGroup.GroupingLevel + 1;
                return 0;
            }
        }

        //------------------------------------------------------------------
        private bool m_Sortable = true;
        ///<summary>pøíznak tøídìní položek ve skupinì - urceno jen pro Skupinovani</summary>
        ///<remarks>true = tridi se obsah skupiny, skupina samotna zachovava svoje poradi</remarks>
        ///<remarks>false = obsah skupiny se netridi (predpoklada se, ze je jiz setrideno), skupina samotna se vsak zatridi na ApplySort (pri nacteni se predpoklada spravne zatrideni)</remarks>
        internal bool Sortable
        {
            get { return m_Sortable; }
            set { m_Sortable = value; }
        }
        //------------------------------------------------------------------
        private bool m_Sort = false;
        ///<summary>pøíznak tøídìní skupiny samotné spolu s ostatními øádky </summary>
        ///<remarks>false = skupina samotna zachovava svoje poradi</remarks>
        ///<remarks>true = skupina samotna se zatridi stejne jako obycenjne radky</remarks>
        public bool SortWithRows
        {
            get { return m_Sort; }
            set { m_Sort = value; }
        }

        //------------------------------------------------------------------
        private GGroupingDataRow m_ParentGroup = null;
        ///<summary>nadøazená skupina, pokud je vnoøení, neno null</summary>
        public GGroupingDataRow ParentGroup
        {
            get { return m_ParentGroup; }
        }

        //------------------------------------------------------------------
        private bool m_Expanded;
        ///<summary>pøíznak rozbalení položek</summary>
        public bool IsExpanded
        {
            get { return m_Expanded; }
            set { if (value) Expand(); else Collapse(); }
        }

        //------------------------------------------------------------------
        private int m_Color = 0;
        ///<summary>barva skupiny. Grid mùže použít pro vizualizaci skupiny.</summary>
        public int GroupColor
        {
            get { return m_Color; }
            set { m_Color = value; }
        }

        //------------------------------------------------------------------
        private string m_GroupTitle = null;
        ///<summary>titulek skupiny, zobrazuje se pøes buòky, pokud je vyplnìn</summary>
        public string GroupTitle
        {
            get { return m_GroupTitle; }
            set { m_GroupTitle = value; }
        }

        //------------------------------------------------------------------
        GColumnAggregateMethods m_colmethods = null;
        ///<summary>Agregace poèítanách sloupcù v øádku skupiny</summary>
        public GColumnAggregateMethods ColumnAggregateMethods
        {
            get { if (m_colmethods == null) m_colmethods = new GColumnAggregateMethods(); return m_colmethods; }
        }
        ///<summary>Agregace poèítanách sloupcù v øádku skupiny</summary>
        public class GColumnAggregateMethods
        {
            internal GColumnAggregateMethods() { }
            Dictionary<DataColumn, GColumnAggregateMethod> a = new Dictionary<DataColumn, GColumnAggregateMethod>();
            ///<summary>Agregace poèítanách sloupcù v øádku skupiny</summary>
            public GColumnAggregateMethod this[DataColumn c]
            {
                get { GColumnAggregateMethod m; if (a.TryGetValue(c, out m)) return m; return GColumnAggregateMethod.none; }
                set { a[c] = value; }
            }
        }

        //------------------------------------------------------------------
        private bool m_EmptyGroup = false;
        ///<summary>pøíznak prázdné skupiny</summary>
        public bool EmptyGroup
        {
            get { return m_EmptyGroup; }
            set { if (m_EmptyGroup != value) { m_EmptyGroup = value; FireChangeEvent(); } }
        }

        /// <summary>Rozbalí skupinu</summary>
        public void Expand() {Expand(true);}
        internal bool Expand(bool fireChange)
        {
            if (IsExpanded == true) return false;
            if (EmptyGroup == true) return false;

            var ce = new CancelEventArgs();
            OnBeforeExpand(ce);
            if (ce.Cancel) return false;
            EmptyGroup = Rows.Count == 0;
            if (!EmptyGroup) m_Expanded = true;
            OnAfterExpand(new EventArgs());
            if (fireChange) FireChangeEvent();
            return true;
        }

        /// <summary>Rozbalí skupinu - nenastavi priznak ze je rozbalena!</summary>
        internal void ExpandInternal()
        {
            if (IsExpanded == true) return;
            if (EmptyGroup == true) return;

            var ce = new CancelEventArgs();
            OnBeforeExpand(ce);
        }

        /// <summary>Zabalí skupinu</summary>
        public void Collapse() { Collapse(true); }
        internal bool Collapse(bool fireChange)
        {
            if (IsExpanded == false) return false;
            
            var ce = new CancelEventArgs();
            OnBeforeCollapse(ce);
            if (ce.Cancel) return false;
            m_Expanded = false;
            OnAfterCollapse(new EventArgs());
            if (fireChange) FireChangeEvent();
            return true;
        }

        /// <summary>Rozbalí skupinu pokud byla zabalená, jinak zabalí (pøepnutí stavu)</summary>
        public void Toggle()
        {
            if (!IsExpanded) Expand(); else Collapse();
        }

        /// <summary>Rozbalí skupinu a všechny podskupiny</summary>
        public void ExpandAll() { ExpandAll(true); }
        internal bool ExpandAll(bool fireChange)
        {
            var ce = new CancelEventArgs();
            OnBeforeExpandAll(ce);
            if (ce.Cancel) return false;

            foreach (DataRow r in Rows)
            {
                GGroupingDataRow g = r as GGroupingDataRow;
                if (g != null) g.ExpandAll(false);
            }
            Expand(false);
            OnAfterExpandAll(new EventArgs());
            if (fireChange) FireChangeEvent();
            return true;
        }

        /// <summary>Vyvoláno pøed rozbalením</summary>
        protected virtual void OnBeforeExpand(CancelEventArgs e)
        {
            if (BeforeExpand != null) BeforeExpand(this, e);
        }

        /// <summary>Vyvoláno pøed zabalením</summary>
        protected virtual void OnBeforeCollapse(CancelEventArgs e)
        {
            if (BeforeCollapse != null) BeforeCollapse(this, e);
        }

        /// <summary>Vyvoláno po rozbalení</summary>
        protected virtual void OnAfterExpand(EventArgs e)
        {
            if (AfterExpand != null) AfterExpand(this, e);
        }

        /// <summary>Vyvoláno po zabalením</summary>
        protected virtual void OnAfterCollapse(EventArgs e)
        {
            if (AfterCollapse != null) AfterCollapse(this, e);
        }

        /// <summary>Vyvoláno pøed rozbalením ExpandAll</summary>
        protected virtual void OnBeforeExpandAll(CancelEventArgs e)
        {
            if (BeforeExpandAll != null) BeforeExpandAll(this, e);
        }
        /// <summary>Vyvoláno po rozbalení ExpandAll</summary>
        protected virtual void OnAfterExpandAll(EventArgs e)
        {
            if (AfterExpandAll != null) AfterExpandAll(this, e);
        }


        private void FireChangeEvent()
        {
            GDataTable.RaiseRowChanged(new DataRowChangeEventArgs(this, DataRowAction.Commit));
        }
        private void FireChangeEvent(DataRowAction act)
        {
            GDataTable.RaiseRowChanged(new DataRowChangeEventArgs(this, act));
        }

        /// <summary>Vyvoláno pøed rozbalením</summary>
        public event CancelEventHandler BeforeExpand;
        /// <summary>Vyvoláno pøed zabalením</summary>
        public event CancelEventHandler BeforeCollapse;

        /// <summary>Vyvoláno po rozbalení</summary>
        public event EventHandler AfterExpand;
        /// <summary>Vyvoláno po zabalením</summary>
        public event EventHandler AfterCollapse;

        /// <summary>Vyvoláno pøed rozbalením ExpandAll</summary>
        public event CancelEventHandler BeforeExpandAll;
        /// <summary>Vyvoláno po rozbalení ExpandAll</summary>
        public event EventHandler AfterExpandAll;

        /// <summary>Vloží øádek, který mùže patøít do jiné tabulky</summary>
        public void ImportRow(DataRow row)
        {
            Rows.ImportRow(row);
        }

        /// <exclude/>
        public class GGroupingDataRowCollection : IList<DataRow>, ICollection, IEnumerable<DataRow>, IEnumerable
        {
            List<DataRow> m_list = new List<DataRow>();
            private int m_ChildGroups = 0;
            private readonly GGroupingDataRow m_g;
            internal GGroupingDataRowCollection(GGroupingDataRow g) { m_g = g; }

            internal List<DataRow> List { get { return m_list; } }

            /// <exclude/>
            public void Add(DataRow r)
            {
                if (r.RowState != DataRowState.Detached && r.Table != m_g.Table)
                {
                    throw new System.Data.DataException("already in table");
                }
                if (r is GGroupingDataRow) { ((GGroupingDataRow)r).m_ParentGroup = m_g; m_ChildGroups++; }
                m_list.Add(r);
                if (m_g.IsExpanded) m_g.FireChangeEvent(DataRowAction.Change);
            }

            /// <exclude/>
            public DataRow Add(params object[] values)
            {
                DataRow r = m_g.Table.NewRow();
                r.ItemArray = values;
                Add(r);
                return r;
            }

            /// <summary>Pøidá více položek najednou</summary>
            public void AddRange<T>(GDataRowCollection<T> rows) where T : GDataRow
            {
                AddRange(rows.Untyped);
            }
            /// <summary>Pøidá více položek najednou</summary>
            public void AddRange(DataRowCollection rows)
            {
                foreach (DataRow r in rows)
                {
                    Add(r);
                }
            }
            /// <summary>Pøidá více položek najednou</summary>
            public void AddRange(IEnumerable<DataRow> rows)
            {
                foreach (DataRow r in rows)
                {
                    Add(r);
                }
            }

            /// <summary>Inserts a row into the collection at the specified location.</summary>
            public void InsertAt(DataRow r, int pos)
            {
                if (r.RowState != DataRowState.Detached && r.Table != m_g.Table)
                {
                    throw new System.Data.DataException("already in table");
                }
                if (r is GGroupingDataRow) { ((GGroupingDataRow)r).m_ParentGroup = m_g; m_ChildGroups++; }
                m_list.Insert(pos, r);
                if (m_g.IsExpanded) m_g.FireChangeEvent(DataRowAction.Change);
            }

            /// <summary>Vyruší všechny øádky</summary>
            public void Clear()
            {
                bool exp = m_g.IsExpanded;
                if (exp) m_g.Collapse();  //Change udalost nestaci - DataView nevi co te skupine puvodne patrilo a tudiz to nemuze odstranit ze seznamu

                foreach (DataRow r in m_list)
                {
                    if (r is GGroupingDataRow) { ((GGroupingDataRow)r).m_ParentGroup = null; }
                }
                m_list.Clear();
                m_ChildGroups = 0;

                if (exp) m_g.Expand(); //if (m_g.IsExpanded) m_g.FireChangeEvent(DataRowAction.Change);
            }

            /// <summary>Vyjme pøedaný øádek</summary>
            public void Remove(DataRow r)
            {
                bool exp = m_g.IsExpanded;
                if (exp) m_g.Collapse();  //Change udalost nestaci - DataView nevi co te skupine puvodne patrilo a tudiz to nemuze odstranit ze seznamu

                if (r is GGroupingDataRow) { ((GGroupingDataRow)r).m_ParentGroup = null; m_ChildGroups--; }
                m_list.Remove(r);

                if (exp) m_g.Expand(); //if (m_g.IsExpanded) m_g.FireChangeEvent(DataRowAction.Change);
            }

            /// <summary>Vloží øádek, který mùže patøít do jiné tabulky</summary>
            public void ImportRow(DataRow row)
            {
                if (row is GGroupingDataRow)
                    ImportGroupingRow((GGroupingDataRow)row);
                else
                    Add(row.ItemArray);
            }

            /// <summary>Vloží øádek skupiny, který mùže patøít do jiné tabulky</summary>
            /// <returns>row nebo jeho kopie, pokud row patøil do jiné tabulky</returns>
            public GGroupingDataRow ImportGroupingRow(GGroupingDataRow row)
            {
                if (row.Table == m_g.Table) { Add(row); return row; }

                GGroupingDataRow r = GDataTable.NewGroupingRow(m_g.Table, row.ItemArray);
                r.m_Expanded = row.IsExpanded;
                r.m_EmptyGroup = row.EmptyGroup;
                //parent a level nenastavuju
                r.BeforeCollapse = row.BeforeCollapse;
                r.BeforeExpand = row.BeforeExpand;
                r.AfterCollapse = row.AfterCollapse;
                r.AfterExpand = row.AfterExpand;
                Add(r);
                foreach (DataRow ch in row.Rows)
                {
                    r.ImportRow(ch);
                }
                return r;
            }

            /// <summary>Gets the element at the specified index.</summary>
            public DataRow this[int index]
            {
                get { return m_list[index]; }
            }

            #region IEnumerable Members

            /// <summary>Enumerator</summary>
            public IEnumerator GetEnumerator()
            {
                return m_list.GetEnumerator();
            }

            #endregion
            #region IEnumerable<T> Members

            IEnumerator<DataRow> IEnumerable<DataRow>.GetEnumerator()
            {
                return m_list.GetEnumerator();
            }

            #endregion
            #region ICollection<DataRow> Members
            void ICollection<DataRow>.Clear()
            {
                throw new NotImplementedException();
            }

            /// <summary>Test na pøíslušnost</summary>
            public bool Contains(DataRow item)
            {
                return m_list.Contains(item);
            }

            /// <summary>Test na pøíslušnost vèetnì vnoøených skupin</summary>
            public bool ContainsRecursive(DataRow item)
            {
                foreach (DataRow r in m_list)
                {
                    if (r == item) return true;
                    if (r is GGroupingDataRow && ((GGroupingDataRow)r).Rows.ContainsRecursive(item)) return true;
                }
                return false;
            }

            /// <summary>Kopíruje do pole</summary>
            public void CopyTo(DataRow[] array, int arrayIndex)
            {
                (m_list as ICollection<DataRow>).CopyTo(array, arrayIndex);
            }

            /// <summary>Poèet øádkù ve skupinì</summary>
            public int Count
            {
                get { return m_list.Count; }
            }

            bool ICollection<DataRow>.IsReadOnly
            {
                get { return true; }
            }

            bool ICollection<DataRow>.Remove(DataRow item)
            {
                throw new NotImplementedException();
            }

            #endregion
            #region ICollection Members

            void ICollection.CopyTo(Array array, int index)
            {
                (m_list as ICollection).CopyTo(array, index);
            }

            bool ICollection.IsSynchronized
            {
                get { return (m_list as ICollection).IsSynchronized; }
            }

            object ICollection.SyncRoot
            {
                get { return (m_list as ICollection).SyncRoot; }
            }
            #endregion
            #region IList<DataRow> Members
            int IList<DataRow>.IndexOf(DataRow item)
            {
                return m_list.IndexOf(item);
            }

            void IList<DataRow>.Insert(int index, DataRow item)
            {
                m_list.Insert(index, item);
            }

            void IList<DataRow>.RemoveAt(int index)
            {
                m_list.RemoveAt(index);
            }

            DataRow IList<DataRow>.this[int index]
            {
                get { return m_list[index]; }
                set { m_list[index] = value; }
            }
            #endregion

            /// <summary>Poèet listových øádkù v této skupinì nebo jejích podskupinách</summary>
            public int CountRecursive
            {
                get
                {
                    int c = Count;
                    int l_ChildGroups = m_ChildGroups;
                    if (l_ChildGroups == 0) return c;
                    foreach (DataRow r in m_list)
                    {
                        if (r is GGroupingDataRow)
                        {
                            c += -1 + ((GGroupingDataRow)r).Rows.CountRecursive;
                            l_ChildGroups--;
#if !(DEBUG || DEVELOP_VERSION)
                            if (l_ChildGroups == 0) break;
#endif
                        }
                    }
#if DEBUG || DEVELOP_VERSION
                    System.Diagnostics.Debug.Assert(l_ChildGroups == 0);
#endif
                    return c;

                }
            }

            internal IEnumerable<DataRow> NormalRows(GDataView view)
            {
                foreach (DataRow r in this)
                {
                    if (view.IsSubtotalRow(r)) continue;
                    yield return r;
                }
            }

        }

    }
}
