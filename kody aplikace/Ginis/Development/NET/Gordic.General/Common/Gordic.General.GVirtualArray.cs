//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GVirtualArray.cs            </Name>
//    <Description> Virtuální pole                             </Description>
//    <Author>      Martin Aliger                              </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021 </Copyright>
//    <Created>     2008-10-29                                 </Created>
//  </FileHeader>

using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace Gordic.General {
    
    /// <summary>
    /// Virtuální pole. Vůbec interně nedrží prvky, tudíž je možno ho vytvářet i na poměrně velké seznamy.
    /// Vhodné pro použití k přetypování prvků v jiném již existujícím poli nebo seznamu.
    /// </summary>
    public class GVirtualArray<T> :  IEnumerable<T>, IList<T>, IGObject where T : class {

        #region datové členy

        /// <summary>počet položek pole</summary>
        private int m_nCount;

        /// <summary>instance delegáta pro přístup k prvku virtuálního pole</summary>
        private VirtualArrayDelegate m_oDelegate;
        
        #endregion

        #region vlastnosti

        /// <summary>počet položek pole</summary>
        public int Count { get { return m_nCount; } }

        /// <summary>počet položek pole</summary>
        public int Length { get { return m_nCount; } }

        /// <summary>položka pole</summary>
        public T this[int index] { get { return m_oDelegate(index); } }

        #endregion

        #region delegáti

        /// <summary>delegát pro přístup k položce virtuálního pole</summary>
        /// <param name="index">index položky pole</param>
        /// <returns>instance položky</returns>
        public delegate T VirtualArrayDelegate(int index);

        #endregion
        
        #region konstruktory

        /// <summary>veřejný konstruktor</summary>
        /// <param name="count"></param>
        /// <param name="d"></param>
        public GVirtualArray(int count, VirtualArrayDelegate d) {
            if(count < 0) throw new GArgumentOutOfRangeException(23200309);
            if(d == null) throw new GArgumentNullException(23200310);
            m_nCount = count;
            m_oDelegate = d;
        } // end method

        #endregion

        #region veřejné metody

        /// <summary>získání objektu k procházení položek pole</summary>
        /// <returns>objekt k procházení položek pole</returns>
        public IEnumerator<T> GetEnumerator() {
            return new GVirtualArrayEnumerator(this); 
        } // end method

        /// <summary>vyhledání indexu položky pole</summary>
        /// <param name="item">hledaná položka</param>
        /// <returns>index hledané položky, byla-li nalezena, jinak -1 </returns>
        public int IndexOf(T item) {
            for(int i = 0; i < Count; i++) {
                T v = this[i];
                if(v.Equals(item)) return i;
            } // end for
            return -1;
        } // end method

        /// <summary>test na přítomnost položky v poli</summary>
        /// <param name="item">hledaná položka</param>
        /// <returns>true byla-li nalezena, jinak false </returns>
        public bool Contains(T item) {
            return IndexOf(item) >= 0;
        } // end method

        /// <summary>Kopíruje data z pole do jiného pole</summary>
        /// <param name="array">kamkopírovat</param>
        /// <param name="arrayIndex">index kde začít s kopírováním</param>
        public void CopyTo(T[] array, int arrayIndex) {
            for(int i = 0; i < Count; i++) {
                T v = this[i];
                array[arrayIndex + i] = v;
            } // end for
        } // end method

        /// <summary>Kopíruje data do pole</summary>
        public T[] ToArray()
        {
            T[] ret = new T[Count];
            for (int i = 0; i < Count; i++)
            {
                ret[i] = this[i];
            } // end for
            return ret;
        } // end method

        /// <summary>sloučení polí do jednoho</summary>
        /// <param name="with">pole ke sloučení</param>
        /// <returns>výsledné pole</returns>
        public GVirtualArray<T> Union(GVirtualArray<T> with) {
            return Union(this,with);
        } // end method

        /// <summary>sloučení několika polí do jednoho</summary>
        /// <param name="firstArray">první pole ke sloučení</param>
        /// <param name="nextArrays">další pole ke sloučení</param>
        /// <returns>výsledné pole</returns>
        public static GVirtualArray<T> Union(GVirtualArray<T> firstArray,params GVirtualArray<T>[] nextArrays) {
            int l_nLength = 1 + nextArrays.Length;
            int[] l_nStart = new int[l_nLength];
            int[] l_nEnd = new int[l_nLength];
            l_nStart[0] = 0;
            l_nEnd[0] = firstArray.Length;
            for(int i = 1; i < l_nLength; i++) {
                l_nStart[i] = l_nEnd[i - 1];
                l_nEnd[i] = l_nStart[i] + nextArrays[i - 1].Length;
            } // end for
            return new GVirtualArray<T>(
                l_nEnd[l_nLength - 1],
                delegate(int index) {
                    for(int i = 0; i < l_nLength; i++) {
                        if(index < l_nEnd[i]) {
                            if(i == 0) return firstArray[index];
                            else return nextArrays[i - 1][index - l_nStart[i]];
                        } // end if
                    } // end for
                    throw new GArgumentOutOfRangeException(23200351);
                } // end delegate
            );
        } // end method

        #endregion

        #region vnořené třídy

        /// <summary>podpora procházení položek pole</summary>
        private class GVirtualArrayEnumerator : IEnumerator<T>, IGObject {

            #region datové členy

            /// <summary>index aktuální pozice</summary>
            int m_nIndex = -1;

            /// <summary>instance procházené kolekce</summary>
            GVirtualArray<T> m_oCollection;

            #endregion

            #region vlastnosti

            /// <summary>aktuální položka</summary>
            object IEnumerator.Current { get { return m_oCollection[m_nIndex]; } }

            /// <summary>aktuální položka</summary>
            public T Current { get { return m_oCollection[m_nIndex]; } }

            #endregion

            #region konstruktory

            /// <summary>veřejný konstruktor</summary>
            /// <param name="collection">instance procházené kolekce</param>
            public GVirtualArrayEnumerator(GVirtualArray<T> collection) { m_oCollection = collection; }

            #endregion

            #region veřejné metody

            /// <summary>přechod na další položku</summary>
            /// <returns>true v případě úspěchu, false pokud byl dosažen konec procházení</returns>
            public bool MoveNext() { 
                m_nIndex++;
                return m_nIndex < m_oCollection.Count;
            } // end method
            
            /// <summary>nastavení procházení znovu na začátek</summary>
            public void Reset() {
                m_nIndex = -1;
            } // end method

            /// <summary>finální uvolnění zdrojů</summary>
            public void Dispose() {
            } // end method

            #endregion

        } // end method

        #endregion

        #region metody rozhraní IEnumerable

        /// <summary>získání objektu k procházení položek pole</summary>
        /// <returns>objekt k procházení položek pole</returns>
        IEnumerator IEnumerable.GetEnumerator() {
            return new GVirtualArrayEnumerator(this);
        } // end method

        #endregion

        #region metody rozhraní IList
        
        /// <summary>vložení položky do pole</summary>
        /// <param name="index">index, kam má být vložena</param>
        /// <param name="item">položka k vložení</param>
        /// <remarks>metoda vždy vrací výjimku</remarks>
        void IList<T>.Insert(int index, T item) {
            throw new GNotImplementedException(23200311);
        } // end method
        
        /// <summary>odstranění položky z pole</summary>
        /// <param name="index">index položky</param>
        /// <remarks>metoda vždy vrací výjimku</remarks>
        void IList<T>.RemoveAt(int index) {
            throw new GNotImplementedException(23200312);
        } // end method
        
        /// <summary>indexer</summary>
        /// <param name="index">index položky</param>
        /// <returns>položka pole</returns>
        T IList<T>.this[int index] {
            get { return m_oDelegate(index); }
            set { throw new GNotImplementedException(23200313); }
        } // end method
        
        #endregion

        #region metody rozhraní ICollection

        /// <summary>přidání položky</summary>
        /// <param name="item">položka</param>
        /// <remarks>metoda vždy vrací výjimku</remarks>
        void ICollection<T>.Add(T item) {
            throw new GNotImplementedException(23200314);
        } // end method
        
        /// <summary>vyčištění pole</summary>
        /// <remarks>metoda vždy vrací výjimku</remarks>
        void ICollection<T>.Clear() {
            throw new GNotImplementedException(23200315);
        } // end method
        
        /// <summary>příznak pole určeného pouze pro čtení</summary>
        bool ICollection<T>.IsReadOnly {
            get { return true; }
        } // end method
        
        /// <summary>vymazání prvního výskytu položky z pole</summary>
        /// <param name="item">položka</param>
        /// <returns>true, pokud byla položka vymazána, jinak false</returns>
        /// <remarks>metoda vždy vrací výjimku</remarks>
        bool ICollection<T>.Remove(T item) {
            throw new GNotImplementedException(23200316);
        } // end method
        
        #endregion

    } // end class

} // end namespace
