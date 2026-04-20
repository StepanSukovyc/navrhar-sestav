//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.Set.cs                                 </Name>
//    <Description> Třída SET pro kontejnery. Obsahuje seřazený seznam jedinečných parametrů.</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-09                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.Collections;

namespace Gordic.GFE.Parsers.Utils
{
    /// <summary>
    /// Třída SET pro kontejnery. Obsahuje seřazený seznam jedinečných parametrů.
    /// </summary>
    public sealed class Set<T> : ICollection<T>
    {
        SortedDictionary<T, object> dict;

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public Set()
        {
            dict = new SortedDictionary<T, object>();
        }

        /// <summary>
        /// Konstrauktor třídy
        /// </summary>
        /// <param name="list">seznam parametrů</param>
        public Set(IEnumerable<T> list)
            : this()
        {
            AddRange(list);
        }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="list">Seznam parametrů</param>
        public Set(params T[] list)
            : this()
        {
            AddRange(list);
        }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="comparer"></param>
        public Set(IComparer<T> comparer)
        {
            dict = new SortedDictionary<T, object>(comparer);
        }

        /// <summary>
        /// Konstraultor třídy
        /// </summary>
        /// <param name="list"></param>
        /// <param name="comparer"></param>
        public Set(IEnumerable<T> list, IComparer<T> comparer)
            : this(comparer)
        {
            AddRange(list);
        }

        /// <summary>
        /// Přidání nového elementu do seznamu
        /// </summary>
        /// <param name="element">Přidávaný element</param>
        public void Add(T element)
        {
            dict[element] = null;
        }

        /// <summary>
        /// Přidání více elementů najednou do seznamu
        /// </summary>
        /// <param name="elements">Přidávané elementy</param>
        public void AddRange(IEnumerable<T> elements)
        {
            foreach (T element in elements)
                Add(element);
        }

        /// <summary>
        /// Indikuje, zda seznam obsahuje element
        /// </summary>
        /// <param name="element">Indikovaný element</param>
        /// <returns></returns>
        public bool Contains(T element)
        {
            return dict.ContainsKey(element);
        }

        /// <summary>
        /// Odstranění elementu ze seznamu
        /// </summary>
        /// <param name="element">Element k odstranění</param>
        /// <returns></returns>
        public bool Remove(T element)
        {
            return dict.Remove(element);
        }

        /// <summary>
        /// Enumerátor třídy
        /// </summary>
        /// <returns></returns>
        public IEnumerator<T> GetEnumerator()
        {
            return dict.Keys.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return this.GetEnumerator();
        }

        /// <summary>
        /// POčet elementů 
        /// </summary>
        public int Count { get { return dict.Count; } }

        /// <summary>
        /// Indikuje, zda elementy jsou pouze na čtení
        /// </summary>
        bool ICollection<T>.IsReadOnly { get { return true; } }

        /// <summary>
        /// Odstranění všech elementů
        /// </summary>
        public void Clear() { dict.Clear(); }
        /// <summary>
        /// Kopírování elementů do pole
        /// </summary>
        /// <param name="array">Pole do ketrého se kopíruje</param>
        /// <param name="arrayIndex">Začátek kopírování</param>
        public void CopyTo(T[] array, int arrayIndex)
        {
            dict.Keys.CopyTo(array, arrayIndex);
        }

        /// <summary>
        /// Převod všech elementů do pole
        /// </summary>
        /// <returns></returns>
        public T[] ToArray()
        {
            T[] arr = new T[dict.Count];
            dict.Keys.CopyTo(arr, 0);
            return arr;
        }

        /// <summary>
        /// Vytvoření třídy pro čtení
        /// </summary>
        /// <returns></returns>
        public ReadOnlyCollectionWrapper<T> AsReadOnly()
        {
            return new ReadOnlyCollectionWrapper<T>(dict.Keys);
        }
    }
}
