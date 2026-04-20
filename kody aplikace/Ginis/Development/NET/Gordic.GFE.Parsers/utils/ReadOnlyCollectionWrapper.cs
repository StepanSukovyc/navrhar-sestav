//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ReadOnlyCollectionWrapper.cs           </Name>
//    <Description> Kolekce jen pro čtení                                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-09                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using Gordic.General;
using System.Collections;

namespace Gordic.GFE.Parsers.Utils
{
    /// <summary>
    /// Kolekce jen pro čtení
    /// </summary>
    public sealed class ReadOnlyCollectionWrapper<T> : ICollection<T>
    {
        readonly ICollection<T> c;

        /// <summary>
        /// Vytvoření instance nové třídy
        /// </summary>
        /// <param name="c"></param>
        public ReadOnlyCollectionWrapper(ICollection<T> c)
        {
            this.c = c ?? throw new ArgumentNullException(GResources.GetResourceText(29450500));
        }

        /// <summary>
        /// Počet prvků v kolekci
        /// </summary>
        public int Count { get { return c.Count; } }

        /// <summary>
        /// Je pouze pro čtení
        /// </summary>
        public bool IsReadOnly { get { return true; } }

        /// <summary>
        /// Přidání položky do kolekce
        /// </summary>
        /// <param name="item">Přidávaná položka</param>
        void ICollection<T>.Add(T item)
        {
            throw new NotSupportedException();
        }

        /// <summary>
        /// Vypráznění kolekce položek
        /// </summary>
        void ICollection<T>.Clear()
        {
            throw new NotSupportedException();
        }

        /// <summary>
        /// Indikuje, zda kolekce obsahuje položk, či nikoli
        /// </summary>
        /// <param name="item">Indikovaná polžka</param>
        /// <returns></returns>
        public bool Contains(T item)
        {
            return c.Contains(item);
        }

        /// <summary>
        /// Kopírování kolekce do pole
        /// </summary>
        /// <param name="array">Nové pole obsahující položky kolekce</param>
        /// <param name="arrayIndex">Inde začátku kopírování</param>
        public void CopyTo(T[] array, int arrayIndex)
        {
            c.CopyTo(array, arrayIndex);
        }

        /// <summary>
        /// Odstranění položky z kolekce položek
        /// </summary>
        /// <param name="item">Odstraňovaná položka</param>
        /// <returns></returns>
        bool ICollection<T>.Remove(T item)
        {
            throw new NotSupportedException();
        }

        /// <summary>
        /// Enumerátor
        /// </summary>
        /// <returns></returns>
        public IEnumerator<T> GetEnumerator()
        {
            return c.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return ((IEnumerable)c).GetEnumerator();
        }
    }
}
