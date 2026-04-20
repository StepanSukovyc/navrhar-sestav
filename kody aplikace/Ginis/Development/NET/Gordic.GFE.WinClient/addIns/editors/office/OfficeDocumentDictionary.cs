//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.OfficeDocumentDictionary.cs            </Name>
//    <Description> slovník položek office dokumentu                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-07-19                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.Linq;
using Gordic.GFE.Parsers.Services;
using System;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// položka office dokumentu
    /// </summary>
    interface IOfficeDocumentItem
    {
        /// <summary>
        /// zavření dokumentu
        /// </summary>
        void CloseDocument();
    }

    /// <summary>
    /// položka Office dokumentu
    /// </summary>
    interface IOfficeItem
    {
        /// <summary>
        /// typ dokumentu
        /// </summary>
        String Type { get; }
        /// <summary>
        /// Jednoznačný identifikátor políčka
        /// </summary>
        Guid Guid { get; set; }
        /// <summary>
        /// Název políčka
        /// </summary>
        string Name { get; set; }
        /// <summary>
        /// Filter-Out políčka
        /// </summary>
        string FilterOut { get; set; }
        /// <summary>
        /// Filter-In políčka
        /// </summary>
        string FilterIn { get; set; }
    }
    /// <summary>
    /// slovník položek office dokumentu
    /// </summary>
    sealed class OfficeDocumentDictionary<T> : IDictionary<OpenedFile, T>
    {
        Dictionary<OpenedFile, T> dictionary = new Dictionary<OpenedFile, T>();
        public void Add(OpenedFile key, T value)
        {
            if (!dictionary.ContainsKey(key))
                dictionary.Add(key, value);
            else
            {
                if (dictionary[key] != null && dictionary[key] is IOfficeDocumentItem)
                    (dictionary[key] as IOfficeDocumentItem).CloseDocument();
                dictionary[key] = value;
            }
        }
        /// <exclude/>
        public bool ContainsKey(OpenedFile key) { return dictionary.ContainsKey(key); }

        /// <exclude/>
        public ICollection<OpenedFile> Keys { get { return dictionary.Keys; } }

        /// <exclude/>
        public bool Remove(OpenedFile key)
        {
            if (dictionary.ContainsKey(key) && dictionary[key] is IOfficeDocumentItem)
                (dictionary[key] as IOfficeDocumentItem).CloseDocument();
            return dictionary.Remove(key);
        }

        /// <exclude/>
        public bool TryGetValue(OpenedFile key, out T value)
        {
            return dictionary.TryGetValue(key, out value);
        }

        /// <exclude/>
        public ICollection<T> Values { get { return dictionary.Values; } }

        /// <exclude/>
        public T this[OpenedFile key]
        {
            get { return dictionary[key]; }
            set { dictionary[key] = value; }
        }

        /// <exclude/>
        public void Add(KeyValuePair<OpenedFile, T> item)
        {
            dictionary.Add(item.Key, item.Value);
        }

        /// <exclude/>
        public void Clear()
        {
            foreach (var item in dictionary.Values)
                if (item is IOfficeDocumentItem)
                    (item as IOfficeDocumentItem).CloseDocument();

            dictionary.Clear();
        }

        /// <exclude/>
        public bool Contains(KeyValuePair<OpenedFile, T> item)
        {
            return dictionary.Contains(item);
        }

        /// <exclude/>
        public void CopyTo(KeyValuePair<OpenedFile, T>[] array, int arrayIndex) { }

        /// <exclude/>
        public int Count { get { return dictionary.Count; } }

        /// <exclude/>
        public bool IsReadOnly { get { return false; } }

        /// <exclude/>
        public bool Remove(KeyValuePair<OpenedFile, T> item)
        {
            if (dictionary.Contains(item) && item.Value is IOfficeDocumentItem)
                (item.Value as IOfficeDocumentItem).CloseDocument();
            return dictionary.Remove(item.Key);
        }

        /// <exclude/>
        public IEnumerator<KeyValuePair<OpenedFile, T>> GetEnumerator()
        {
            return dictionary.GetEnumerator();
        }

        /// <exclude/>
        System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
        {
            return dictionary.GetEnumerator();
        }
    }
}
