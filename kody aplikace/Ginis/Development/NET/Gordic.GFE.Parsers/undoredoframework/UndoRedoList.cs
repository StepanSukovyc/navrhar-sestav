//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.UndoRedoList.cs                          </Name>
//    <Description> Seznam, stav kterého lze vratit zpět                        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.Parsers.Core;
using System.Xml;

namespace Gordic.GFE.Parsers.UndoRedoFramework
{
    /// <summary>
    /// rozhraní seznamu komponent
    /// </summary>
    public interface IListComponent<T> : IList<T>, ICollection<T>, IEnumerable<T>, IList, ICollection, IEnumerable
    {
        /// <summary>
        /// reakce na změnu seznamu
        /// </summary>
        event EventHandler ListChanged;
        /// <summary>
        /// přidání celé kolekce do seznamu
        /// </summary>
        /// <param name="collection">přidávaná kolekce</param>
        void AddRange(IEnumerable<T> collection);
        /// <exclude/>
        void ForEach(Action<T> action);
        /// <exclude/>
        void Reverse(int index, int count);
        /// <exclude/>
        List<T> FindAll(Predicate<T> match);
        /// <exclude/>
        bool TrueForAll(Predicate<T> match);
        /// <exclude/>
        T FindLast(Predicate<T> match);
        /// <exclude/>
        bool Exists(Predicate<T> match);
        /// <exclude/>
        T Find(Predicate<T> match);
        /// <exclude/>
        int RemoveAll(Predicate<T> match);
        /// <exclude/>
        void MoveFromTo(int oldPosition, int newPosition);
    }

    /// <summary>
    /// seznam komponent
    /// </summary>
    /// <typeparam name="T">typ komponenty seznamu</typeparam>
    public class ListComponent<T> : IListComponent<T>
    {
        #region IListComponent
        protected List<T> list;
        event EventHandler List_Changed;
        /// <summary>
        /// Volá se poprovedení jakýchkoliv změn v počtu položek v seznamu,
        /// nebo jejích pořadí
        /// </summary>
        public event EventHandler ListChanged
        {
            add
            {
                if (List_Changed != null)
                    List_Changed -= value;
                List_Changed += value;
            }
            remove
            {
                if (List_Changed != null)
                    List_Changed -= value;
            }
        }
        /// <summary>
        /// přidání celé kolekce do seznamu
        /// </summary>
        /// <param name="collection">přidávaná kolekce</param>
        public virtual void AddRange(IEnumerable<T> collection)
        {
            foreach (T item in collection)
                if (item is IParentable)
                    (item as IParentable).Parent = this is ISizable ? this as ISizable :
                        (this is IParentable ? (this as IParentable).Parent : null);

            list.AddRange(collection);
            OnListChanged();
        }

        /// <exclude/>
        public void ForEach(Action<T> action) { list.ForEach(action); }
        /// <exclude/>
        public virtual void Reverse(int index, int count)
        {
            list.Reverse(index, count);
            OnListChanged();
        }
        /// <exclude/>
        public List<T> FindAll(Predicate<T> match) => list?.FindAll(match);
        /// <exclude/>
        public bool TrueForAll(Predicate<T> match) => list.TrueForAll(match);
        /// <exclude/>
        public T FindLast(Predicate<T> match) => list.FindLast(match);
        /// <exclude/>
        public bool Exists(Predicate<T> match) => list.Exists(match);
        /// <exclude/>
        public T Find(Predicate<T> match) => list.Find(match);
        /// <exclude/>
        public virtual int RemoveAll(Predicate<T> match)
        {
            int result = list.RemoveAll(match);
            OnListChanged();
            return result;
        }
        /// <exclude/>
        public virtual void MoveFromTo(int oldPosition, int newPosition)
        {
            if (oldPosition == newPosition)
                return;

            if (newPosition >= this.Count)
            {
                MoveFromTo(oldPosition, this.Count - 1);
                return;
            }
            if (newPosition < 0)
            {
                MoveFromTo(oldPosition, 0);
                return;
            }

            if (oldPosition >= this.Count)
            {
                MoveFromTo(this.Count - 1, newPosition);
                return;
            }
            if (oldPosition < 0)
            {
                MoveFromTo(0, newPosition);
                return;
            }

            AfterMove(oldPosition, newPosition);
        }

        /// <exclude/>
        protected void AfterMove(int oldPosition, int newPosition)
        {
            if (oldPosition < newPosition)
                for (int index = oldPosition; index < newPosition; index++)
                    list.Reverse(index, 2);
            else
                for (int index = oldPosition - 1; index >= newPosition; index--)
                    list.Reverse(index, 2);
            OnListChanged();
        }

        #endregion

        #region IList<T>
        /// <summary>
        /// hodnota položky dle indexu
        /// </summary>
        /// <param name="index">index položky</param>
        /// <returns></returns>
        public virtual T this[int index]
        {
            get { return list[index]; }
            set { list[index] = value; }
        }

        /// <summary>
        /// pozice položky v seznamu
        /// </summary>
        /// <param name="item">daná položka</param>
        /// <returns></returns>
        public virtual int IndexOf(T item) { return list.IndexOf(item); }
        /// <summary>
        /// vložení položky na dané umístění
        /// </summary>
        /// <param name="index">index místa do kterého se vkládá</param>
        /// <param name="item">vkládaná položka</param>
        public virtual void Insert(int index, T item)
        {
            if (Count <= index)
                list.Add(item);
            else
                list.Insert(index, item);

            if (item is IParentable)
                (item as IParentable).Parent = this is ISizable ? this as ISizable :
                    (this is IParentable ? (this as IParentable).Parent : null);

            OnListChanged();
        }
        /// <summary>
        /// odstranění položky na daném umístění
        /// </summary>
        /// <param name="index">umístění položky k odstranění</param>
        public virtual void RemoveAt(int index)
        {
            list.RemoveAt(index);
            OnListChanged();
        }
        #endregion

        #region ICollection<T>
        /// <summary>
        /// indikuje, jestli seznam je pouze pro čtení
        /// </summary>
        bool ICollection<T>.IsReadOnly { get { return ((ICollection<T>)list).IsReadOnly; } }

        /// <summary>
        /// přidání položky do seznamu
        /// </summary>
        /// <param name="item">přidávaná položka</param>
        public virtual void Add(T item)
        {
            if (item is IParentable)
                if (this is ISizable)
                    (item as IParentable).Parent = this as ISizable;
                else if (this is IParentable)
                    (item as IParentable).Parent = (this as IParentable).Parent;

            list.Add(item);
            OnListChanged();
        }
        /// <summary>
        /// odstranění všech položek seznamu
        /// </summary>
        public virtual void Clear()
        {
            // uvolníme všechny objekty, které jsou 'uvolnitelné'
            list.ForEach(itm => itm is IDisposable, Dispose);
            list.Clear();
            OnListChanged();
        }
        /// <summary>
        /// indikace přítomnosti položky v seznamu
        /// </summary>
        /// <param name="item">hledaná položka</param>
        /// <returns>TRUE - pokud položka se nachází v seznamu, jinak FALSE</returns>
        public bool Contains(T item) { return list.Contains(item); }
        /// <exclude/>
        public void CopyTo(T[] array, int arrayIndex) { list.CopyTo(array, arrayIndex); }

        /// <summary>
        /// odstranění položky ze seznamu
        /// </summary>
        /// <param name="item">položka k odstranění</param>
        /// <returns></returns>
        public virtual bool Remove(T item)
        {
            if (list.Remove(item))
            {
                OnListChanged();
                return true;
            }
            else return false;
        }

        #endregion

        #region IEnumerable<T>
        /// <exclude/>
        public virtual IEnumerator<T> GetEnumerator() { return list.GetEnumerator(); }
        #endregion

        #region IEnumerable
        /// <exclude/>
        IEnumerator IEnumerable.GetEnumerator() { return ((IEnumerable)list).GetEnumerator(); }
        #endregion

        #region IList
        /// <exclude/>
        bool IList.Contains(object value) { return ((IList)list).Contains((T)value); }
        /// <exclude/>
        int IList.IndexOf(object value) { return ((IList)list).IndexOf((T)value); }
        /// <exclude/>
        bool IList.IsFixedSize { get { return ((IList)list).IsFixedSize; } }
        /// <exclude/>
        bool IList.IsReadOnly { get { return ((IList)list).IsReadOnly; } }

        /// <exclude/>
        public int Add(object value)
        {
            Add((T)value);
            return IndexOf((T)value);
        }
        /// <exclude/>
        public void Insert(int index, object value)
        {
            this.Insert(index, (T)value);
        }
        /// <exclude/>
        public virtual void Remove(object value)
        {
            ((IList)list).Remove((T)value);
            OnListChanged();
        }
        /// <exclude/>
        object IList.this[int index]
        {
            get { return list[index]; }
            set
            {
                list[index] = (T)value;
                OnListChanged();
            }
        }
        #endregion

        #region ICollection
        /// <summary>
        /// Počet položek seznamu
        /// </summary>
        [Browsable(false)]
        public int Count { get { return list.Count; } }

        /// <exclude/>
        void ICollection.CopyTo(Array array, int index)
        {
            try { ((ICollection)list).CopyTo(array, index); }
            catch { ((ICollection)list).CopyTo((object[])array, index); }
        }
        /// <exclude/>
        bool ICollection.IsSynchronized { get { return ((ICollection)list).IsSynchronized; } }
        /// <exclude/>
        object ICollection.SyncRoot { get { return ((ICollection)list).SyncRoot; } }

        #endregion

        /// <summary>
        /// Kapacita seznamu
        /// </summary>
        [Browsable(false)]
        public int Capacity
        {
            get { return list.Capacity; }
            set { list.Capacity = value; }
        }

        ///<summary>
        /// Vytvoření nové instance třídy System.Collections.Generic.List.
        /// </summary>
        public ListComponent() { list = new List<T>(); }
        /// <summary>
        /// konstruktor třídy dle známé kolekce
        /// </summary>
        /// <param name="collection">kolekce položek</param>
        public ListComponent(IEnumerable<T> collection) { list = new List<T>(collection); }

        void OnListChanged()
        {
            List_Changed?.Invoke(this, EventArgs.Empty);
        }
        void Dispose(T obj)
        {
            if (obj is IDisposable)
                (obj as IDisposable).Dispose();
        }
    }

    /// <summary>
    /// Seznam, stav kterého lze vratit zpět
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class UndoRedoList<T> : ListComponent<T>, IUndoRedoMember, IList
    {
        #region ListComponent<T>

        /// <summary>
        /// hodnota položky dle indexu
        /// </summary>
        /// <param name="index">index položky</param>
        /// <returns></returns>
        public override T this[int index] { set { Enlist(); base[index] = value; } }

        /// <summary>
        /// vložení položky na dané umístění
        /// </summary>
        /// <param name="index">index místa do kterého se vkládá</param>
        /// <param name="item">vkládaná položka</param>
        public override void Insert(int index, T item)
        {
            Enlist();
            base.Insert(index, item);
        }
        /// <summary>
        /// odstranění položky na daném umístění
        /// </summary>
        /// <param name="index">umístění položky k odstranění</param>
        public override void RemoveAt(int index)
        {
            Enlist();
            base.RemoveAt(index);
        }
        /// <summary>
        /// přidání položky do seznamu
        /// </summary>
        /// <param name="item">přidávaná položka</param>
        public override void Add(T item)
        {
            Enlist();
            base.Add(item);
        }
        /// <summary>
        /// odstranění všech položek seznamu
        /// </summary>
        public override void Clear()
        {
            Enlist();
            base.Clear();
        }
        /// <summary>
        /// odstranění položky ze seznamu
        /// </summary>
        /// <param name="item">položka k odstranění</param>
        /// <returns></returns>
        public override bool Remove(T item)
        {
            Enlist();
            return base.Remove(item);
        }
        /// <summary>
        /// přidání celé kolekce do seznamu
        /// </summary>
        /// <param name="collection">přidávaná kolekce</param>
        public override void AddRange(IEnumerable<T> collection)
        {
            Enlist();
            base.AddRange(collection);
        }
        /// <exclude/>
        public override void Reverse(int index, int count)
        {
            Enlist();
            base.Reverse(index, count);
        }
        /// <exclude/>
        public override int RemoveAll(Predicate<T> match)
        {
            Enlist();
            return base.RemoveAll(match);
        }
        /// <exclude/>
        public override void MoveFromTo(int oldPosition, int newPosition)
        {
            if (oldPosition == newPosition)
                return;

            if (newPosition >= this.Count)
            {
                MoveFromTo(oldPosition, this.Count - 1);
                return;
            }
            if (newPosition < 0)
            {
                MoveFromTo(oldPosition, 0);
                return;
            }

            if (oldPosition >= this.Count)
            {
                MoveFromTo(this.Count - 1, newPosition);
                return;
            }
            if (oldPosition < 0)
            {
                MoveFromTo(0, newPosition);
                return;
            }

            Enlist();
            AfterMove(oldPosition, newPosition);
        }
        #endregion

        #region IList
        ///// <exclude/>
        //public override int Add(object value)
        //{
        //    Add(()
        //    //enlist();
        //    //return base.Add(value);
        //}
        ///// <exclude/>
        //public override void Insert(int index, object value)
        //{
        //    enlist();
        //    base.Insert(index, value);
        //}
        /// <exclude/>
        public override void Remove(object value)
        {
            Enlist();
            base.Remove(value);
        }
        /// <exclude/>
        object IList.this[int index]
        {
            get { return base[index]; }
            set
            {
                Enlist();
                base[index] = (T)value;
            }
        }
        #endregion

        #region IUndoRedoMember Members
        void IUndoRedoMember.OnCommit(object change)
        {
            if (manager != null)
            {
                Debug.Assert(change != null);
                ((Change<List<T>>)change).NewState = list;
            }
        }
        void IUndoRedoMember.OnUndo(object change)
        {
            if (manager != null)
            {
                Debug.Assert(change != null);
                list = ((Change<List<T>>)change).OldState;
            }
        }
        void IUndoRedoMember.OnRedo(object change)
        {
            if (manager != null)
            {
                Debug.Assert(change != null);
                list = ((Change<List<T>>)change).NewState;
            }
        }
        #endregion

        IUndoRedoManager manager;
        ///<summary>
        /// Vytvoření nové instance třídy System.Collections.Generic.List.
        /// </summary>
        private UndoRedoList() : base() { }
        /// <summary>
        /// konstruktor třídy dle známé kolekce
        /// </summary>
        /// <param name="collection">kolekce položek</param>
        /// <param name="manager">služba UNDO/REDO</param>
        public UndoRedoList(IEnumerable<T> collection, IUndoRedoManager manager) : base(collection) { this.manager = manager; }
        ///<summary>
        /// Vytvoření nové instance třídy System.Collections.Generic.List.
        /// </summary>
        /// <param name="manager">služba UNDO/REDO</param>
        public UndoRedoList(IUndoRedoManager manager) : this() { this.manager = manager; }

        void Enlist() { Enlist(true); }
        void Enlist(bool copyItems)
        {
            if (manager != null)
            {
                // TODO: je zapotřebí kontrolovat běh příkazu?
                //manager.AssertCommand();
                if (
                    manager.CurrentCommand != null
                    && !manager.CurrentCommand.ContainsKey(this)
                    )
                {
                    Change<List<T>> change = new Change<List<T>>
                    {
                        OldState = list
                    };
                    manager.CurrentCommand[this] = change;
                    if (copyItems)
                        list = new List<T>(list);
                    else
                        list = new List<T>();
                }
            }
        }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        public virtual void Initialize() { }
        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <param name="parent">vlastník objektu</param>
        public virtual void Initialize(ISizable parent) { Initialize(); }
        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <param name="item">položka analýzeru</param>
        /// <param name="parent">vlastník objektu</param>
        public virtual void Initialize(GFEFormatTag item, ISizable parent) { Initialize(parent); }
        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <param name="item">položka větve</param>
        /// <param name="parent">vlastník řádku</param>
        public virtual void Initialize(XmlElement item, ISizable parent) { Initialize(parent); }

        /// <summary>
        /// inicializace objektu dle dostupných informaci
        /// </summary>
        /// <param name="node">Položka bočního panelu s informaci o vkládaném objektu</param>
        public virtual void Initialize(SideTabItem node) { Initialize(); }
    }
}
