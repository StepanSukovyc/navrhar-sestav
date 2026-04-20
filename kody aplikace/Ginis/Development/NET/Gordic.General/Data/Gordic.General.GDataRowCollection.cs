//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GDataRowCollection.cs                        </Name>
//    <Description> podpora obecných typových datasetù                          </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                  </Copyright>
//    <Created>     2009-04-09                                                  </Created>
//  </FileHeader>

using System;
using System.Linq;
using System.Data;
using System.Xml;
using System.Runtime.Serialization;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace Gordic.General {

    /// <summary>podpora obecných typových datasetù</summary>
    #if !DEBUG
	    [System.Diagnostics.DebuggerStepThrough]
    #endif
    public class GDataRowCollection<T> : IList<T> where T : GDataRow {

        #region datové èleny

        /// <summary>kolekce øádkù</summary>
        private readonly DataRowCollection m_oRows = null;

        #endregion

        #region vlastnosti

        /// <summary>netypový pøístup ke kolekci</summary>
        public DataRowCollection Untyped {
            get { return m_oRows; }
        }

        /// <summary>poèet øádkù v kolekci</summary>
        public int Count { 
            get { return m_oRows.Count; }
        } // end property

        /// <summary>veøejný indexer</summary>
        public T this[int index] {
            get { return (T)m_oRows[index]; }
        } // end property

        /// <summary>pøíznak synchronizace kolekce øádkù</summary>
        [Browsable(false)]
        public bool IsSynchronized { 
            get { return m_oRows.IsSynchronized; }
        } // end property

        /// <summary>objekt pro synchronizaci kolekce øádkù</summary>
        [Browsable(false)]
        public object SyncRoot { 
            get { return m_oRows.SyncRoot; }
        } // end property

        #endregion

        #region konstruktory

        /// <summary>veøejný konstuktor</summary>
        public GDataRowCollection(DataRowCollection rows) { m_oRows = rows; }

        #endregion

        #region veøejné metody

        /// <summary>pøidání øádku do kolekce</summary>
        /// <param name="row">øádek k pøidání</param>
        public void Add(T row) { m_oRows.Add(row); }

        /// <summary>pøidání øádku do kolekce</summary>
        /// <param name="row">øádek k pøidání</param>
        public void Add(DataRow row) 
        {
            if (!(row is T || row is GGroupingDataRow)) throw new GArgumentException(23200374);
            m_oRows.Add(row); 
        }

        /// <summary>pøidání nového øádku do kolekce</summary>
        /// <param name="values">hodnoty pro vytvoøení nového øádku</param>
        /// <returns>novì pøidaný øádek</returns>
        public T Add(params object[] values) { return (T)m_oRows.Add(values); }

        /// <summary>výmaz všech øádkù z kolekce</summary>
        public void Clear() { m_oRows.Clear(); }

        /// <summary>pøíznak existence øádku se specifikovaným primárním klíèem</summary>
        /// <param name="key">primární klíè øádku</param>
        /// <returns>pøíznak existence øádku</returns>
        public bool Contains(object key) { return m_oRows.Contains(key); }

        /// <summary>pøíznak existence øádku se specifikovaným složeným primárním klíèem</summary>
        /// <param name="keys">primární klíè øádku</param>
        /// <returns>pøíznak existence øádku</returns>
        public bool Contains(object[] keys) { return m_oRows.Contains(keys); }

        /// <summary>kopie øádkù z kolekce do specifikovaného pole na pozici dle zadaného indexu</summary>
        /// <param name="array">cílové pole</param>
        /// <param name="index">cílový index</param>
        public void CopyTo(Array array,int index) { m_oRows.CopyTo(array,index); }

        /// <summary>kopie øádkù z kolekce do specifikovaného pole na pozici dle zadaného indexu</summary>
        /// <param name="array">cílové pole</param>
        /// <param name="index">cílový index</param>
        public void CopyTo(T[] array,int index) { m_oRows.CopyTo(array,index); }

        /// <summary>nalezení øádku dle primárního klíèe</summary>
        /// <param name="key">primární klíè øádku</param>
        /// <returns>nalezený øádek</returns>
        public T Find(object key) { return (T)m_oRows.Find(key); }

        /// <summary>nalezení øádku dle primárního klíèe</summary>
        /// <param name="keys">primární klíè øádku</param>
        /// <returns>nalezený øádek</returns>
        public T Find(object[] keys) { return (T)m_oRows.Find(keys); }

        /// <summary>nalezení øádku dle predikátu</summary>
        /// <param name="match">predikát</param>
        /// <returns>nalezený øádek</returns>
        public T Find(Func<T,bool> match) { return this.FirstOrDefault(match); }

        /// <summary>vrací index øádku v kolekci</summary>
        /// <param name="row">hledaný øádek</param>
        /// <returns>index øádku v kolekci</returns>
        public int IndexOf(T row) { return m_oRows.IndexOf(row); }

        /// <summary>vrací index øádku v kolekci</summary>
        /// <param name="row">hledaný øádek</param>
        /// <returns>index øádku v kolekci</returns>
        public int IndexOf(DataRow row) { return m_oRows.IndexOf(row); }

        /// <summary>vložení øádku do kolekce na specifikovanou pozici</summary>
        /// <param name="row">øádek k vložení</param>
        /// <param name="pos">index pozice na kterou má být øádek vložen</param>
        public void InsertAt(T row,int pos) { m_oRows.InsertAt(row,pos); }

        /// <summary>odstranìní øádku z kolekce</summary>
        /// <param name="row">øádek k odstranìní</param>
        /// <returns>pøíznak úspìšného odstranìní øádku</returns>
        public bool Remove(T row) { m_oRows.Remove(row); return true; }

        /// <summary>odstranìní øádku na specifikované pozici</summary>
        /// <param name="index">index øádku k odstranìní</param>
        public void RemoveAt(int index) { m_oRows.RemoveAt(index); }

        /// <summary>získání objektu pro procházení kolekce øádkù</summary>
        /// <returns>objekt pro procházení kolekce øádkù</returns>
        IEnumerator IEnumerable.GetEnumerator() { return m_oRows.GetEnumerator(); }

        #endregion

        #region metody rozhraní IList<T>

        /// <summary>vložení položky do kolekce na specifikovanou pozici</summary>
        /// <param name="index">index požadované prozice pro vložení</param>
        /// <param name="item">položka ke vložení</param>
        void IList<T>.Insert(int index,T item) { InsertAt(item,index); }

        /// <summary>indexer</summary>
        /// <param name="index">index položky</param>
        /// <returns>položka kolekce</returns>
        T IList<T>.this[int index] {
            get { return (T)m_oRows[index]; }
            set { throw new NotImplementedException(); }
        } // end property

        #endregion

        #region metody rozhraní Collection<T>

        /// <summary>vrací pøíznak existence položky v kolekci</summary>
        /// <param name="item">položka kolekce</param>
        /// <returns>pøíznak existence položky v kolekci</returns>
        /// <remarks>metoda vždy vrací výjimku GNotImplementedException</remarks>
        bool ICollection<T>.Contains(T item) { throw new GNotImplementedException(23200349); }

        /// <summary>pøíznak kolekce pouze pro ètení</summary>
        bool ICollection<T>.IsReadOnly { get { return false; } }

        #endregion

        #region metody rozhraní IEnumerable<T>

        /// <summary>získání objektu pro procházení kolekce øádkù</summary>
        /// <returns>objekt pro procházení kolekce øádkù</returns>
        public IEnumerator<T> GetEnumerator() { return new GDataRowCollectionEnumerator(this); }

        #endregion

        #region vnoøené tøídy

        /// <summary>podpora procházení položek pole</summary>
        private class GDataRowCollectionEnumerator : IEnumerator<T>, IGObject {

            #region datové èleny

            /// <summary>index aktuální pozice</summary>
            int m_nIndex = -1;

            /// <summary>instance procházené kolekce</summary>
            GDataRowCollection<T> m_oRows;

            #endregion

            #region vlastnosti

            /// <summary>aktuální položka</summary>
            object IEnumerator.Current { get { return m_oRows[m_nIndex]; } }

            /// <summary>aktuální položka</summary>
            public T Current { get { return m_oRows[m_nIndex]; } }

            #endregion

            #region konstruktory

            /// <summary>veøejný konstruktor</summary>
            /// <param name="rows">instance procházené kolekce</param>
            public GDataRowCollectionEnumerator(GDataRowCollection<T> rows) { m_oRows = rows; }

            #endregion

            #region veøejné metody

            /// <summary>pøechod na další položku</summary>
            /// <returns>true v pøípadì úspìchu, false pokud byl dosažen konec procházení</returns>
            public bool MoveNext() {
                m_nIndex++;
                return m_nIndex < m_oRows.Count;
            } // end method

            /// <summary>nastavení procházení znovu na zaèátek</summary>
            public void Reset() {
                m_nIndex = -1;
            } // end method

            /// <summary>finální uvolnìní zdrojù</summary>
            public void Dispose() {
            } // end method

            #endregion

        } // end class

        #endregion

    } // end class

} // end namespace
