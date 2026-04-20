//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.GReportXmeReader.cs                 </Name>
//    <Description> Parser na strukturu                                         </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2012                            </Copyright>
//    <Created>     2012-06-11                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using Gordic.General;
using Gordic.Report.Interface;
using System.Runtime.InteropServices;

namespace Gordic.Report.Implementation
{

    /// <summary>
    /// Pomocná třída seznamu pouze pro čtení, který zachovává pořadí a přitom má klíče
    /// </summary>    public class GReadonlyList<K, V> : IEnumerable<V>//, IDictionary<K, V>
    {
        #region Wrapper
        GBaseList<K, V> list;
        internal GReadonlyList(GBaseList<K,V> list)
        {
            this.list = list;
        }
        /// <summary>Položka dle indexu</summary>
        public V this[int index]
        {
            get { return list[index]; }
        }

        /// <summary>Položka dle klíče</summary>
        public V this[K key]
        {
            get { return list[key]; }
        }
        ///<summary>Počet položek</summary>
        public int Count
        {
            get { return list.Count; }
        }
        /// <summary>Položka dle klíče s defaultem, pokud neexistuje</summary>
        public V GetWithDefault(K key, V defaultValue)
        {
            return list.GetWithDefault(key, defaultValue);
        }
        /// <summary>Text existence klíče</summary>
        public bool ContainsKey(K key)
        {
            return list.ContainsKey(key);
        }

        /// <summary>Text existence hodnoty</summary>
        public int IndexOfValue(V value)
        {
            return list.IndexOfValue(value);
        }
        /// <summary>Text existence klíče</summary>
        public int IndexOfKey(K key)
        {
            return list.IndexOfKey(key);
        }
        #endregion
        #region IEnumerable Members
        System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
        {
            return list.d.Values.GetEnumerator();
        }
        /// <summary/>
        public IEnumerator<V> GetEnumerator()
        {
            return list.d.Values.GetEnumerator();
        }
        //IEnumerator<KeyValuePair<K, V>> IEnumerable<KeyValuePair<K, V>>.GetEnumerator()
        //{
        //    return list.d.GetEnumerator();
        //}
        #endregion
        #region IDictionary<K,V> Members
        //ICollection<K> IDictionary<K, V>.Keys
        //{
        //    get { return list.d.Keys; }
        //}

        //bool IDictionary<K, V>.Remove(K key)
        //{
        //    throw new NotSupportedException();
        //}

        //bool IDictionary<K, V>.TryGetValue(K key, out V value)
        //{
        //    return list.d.TryGetValue(key, out value);
        //}

        //ICollection<V> IDictionary<K, V>.Values
        //{
        //    get { return list.d.Values; }
        //}

        //V IDictionary<K, V>.this[K key]
        //{
        //    get { return list[key]; }
        //    set { throw new NotSupportedException(); }
        //}

        //void ICollection<KeyValuePair<K, V>>.Clear()
        //{
        //    throw new NotSupportedException();
        //}

        //bool ICollection<KeyValuePair<K, V>>.Contains(KeyValuePair<K, V> item)
        //{
        //    return list.l.Contains(item);
        //}

        //void ICollection<KeyValuePair<K, V>>.CopyTo(KeyValuePair<K, V>[] array, int arrayIndex)
        //{
        //    list.l.CopyTo(array, arrayIndex);
        //}

        //bool ICollection<KeyValuePair<K, V>>.IsReadOnly
        //{
        //    get { return true; }
        //}

        //bool ICollection<KeyValuePair<K, V>>.Remove(KeyValuePair<K, V> item)
        //{
        //    throw new NotSupportedException();
        //}

        //void IDictionary<K, V>.Add(K key, V value)
        //{
        //    throw new NotSupportedException();
        //}

        //void ICollection<KeyValuePair<K, V>>.Add(KeyValuePair<K, V> item)
        //{
        //    throw new NotSupportedException();
        //}
        #endregion
    }

    /// <summary>
    /// Pomocná třída seznamu, který zachovává pořadí a přitom má klíče
    /// </summary>    public class GBaseList<K, V> : IEnumerable<V>, IDictionary<K, V>
    {
        #region Init
        /// <summary/>
        protected GBaseList()
        {
        }
        /// <summary/>
        public GBaseList(int capacity, IEqualityComparer<K> comparer = null)
        {
            this.d = new Dictionary<K, V>(capacity, comparer);
            this.l = new List<KeyValuePair<K, V>>(capacity);
        }
        /// <summary/>
        public GBaseList(IDictionary<K, V> d)
        {
            this.d = d;
            this.l = new List<KeyValuePair<K, V>>(d);
        }

        /// <summary/>
        protected internal IDictionary<K, V> d;
        /// <summary/>
        protected internal List<KeyValuePair<K, V>> l;
        #endregion
        #region Vlastnosti
        ///<summary>Počet položek</summary>
        public int Count
        {
            get { return d.Count; }
        }

        /// <summary>Položka dle indexu</summary>
        public KeyValuePair<K, V> GetPair(int index)
        {
            return l[index];
        }
        /// <summary>Položka dle indexu</summary>
        public V this[int index]
        {
            get { return l[index].Value; }
        }

        /// <summary>Položka dle klíče</summary>
        public V this[K key]
        {
            get { V v; d.TryGetValue(key, out v); return v; }
        }
        /// <summary>Položka dle klíče s defaultem, pokud neexistuje</summary>
        public V GetWithDefault(K key, V defaultValue)
        {
            V v;
            if (d.TryGetValue(key, out v)) return v;
            return defaultValue;
        }

        /// <summary>Přidání položky</summary>
        public void Add(K k, V v)
        {
            KeyValuePair<K, V> kv = new KeyValuePair<K, V>(k, v);
            d.Add(kv);
            l.Add(kv);
        }
        /// <summary>Přidání položky</summary>
        public void Add(KeyValuePair<K, V> kv)
        {
            d.Add(kv);
            l.Add(kv);
        }

        /// <summary>Text existence klíče</summary>
        public bool ContainsKey(K key)
        {
            return d.ContainsKey(key);
        }

        /// <summary>Text existence hodnoty</summary>
        public int IndexOfValue(V value)
        {
            int i = 0;
            foreach (KeyValuePair<K, V> kv in l)
            {
                if (kv.Value.Equals(value)) return i;
                i++;
            }
            return -1;
        }
        /// <summary>Text existence klíče</summary>
        public int IndexOfKey(K key)
        {
            int i = 0;
            foreach (KeyValuePair<K, V> kv in l)
            {
                if (kv.Key.Equals(key)) return i;
                i++;
            }
            return -1;
        }

        /// <summary>Vytvoří Read-only wrapper na tento seznam</summary>
        public GReadonlyList<K, V> ReadOnly
        {
            get { return new GReadonlyList<K, V>(this); }
        }
        #endregion
        #region IEnumerable Members
        System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
        {
            return this.d.Values.GetEnumerator();
        }
        /// <summary/>
        public IEnumerator<V> GetEnumerator()
        {
            return this.d.Values.GetEnumerator();
        }
        IEnumerator<KeyValuePair<K, V>> IEnumerable<KeyValuePair<K, V>>.GetEnumerator()
        {
            return d.GetEnumerator();
        }
        #endregion
        #region IDictionary<K,V> Members
        ICollection<K> IDictionary<K, V>.Keys
        {
            get { return d.Keys; }
        }

        bool IDictionary<K, V>.Remove(K key)
        {
            V value;
            if(d.TryGetValue(key, out value) == false) return false;
            d.Remove(key);
            return l.Remove(new KeyValuePair<K, V>(key, value));
        }

        bool IDictionary<K, V>.TryGetValue(K key, out V value)
        {
            return d.TryGetValue(key, out value);
        }

        ICollection<V> IDictionary<K, V>.Values
        {
            get { return d.Values; }
        }

        V IDictionary<K, V>.this[K key]
        {
            get { return d[key]; }
            set { d[key] = value; }
        }

        public void Clear()
        {
            d.Clear();
            l.Clear();
        }

        bool ICollection<KeyValuePair<K, V>>.Contains(KeyValuePair<K, V> item)
        {
            return l.Contains(item);
        }

        void ICollection<KeyValuePair<K, V>>.CopyTo(KeyValuePair<K, V>[] array, int arrayIndex)
        {
            l.CopyTo(array, arrayIndex);
        }

        bool ICollection<KeyValuePair<K, V>>.IsReadOnly
        {
            get { return false; }
        }

        bool ICollection<KeyValuePair<K, V>>.Remove(KeyValuePair<K, V> item)
        {
            if (d.ContainsKey(item.Key) == false) return false;
            d.Remove(item.Key);
            return l.Remove(item);
        }
        #endregion
    }

    /// <summary>Seznam atributu</summary>
    [System.Security.SecurityCritical]
    public class GAttrList : GBaseList<string,string>, IGAttrList
    {
        IGNativeStringOwner owner;

        /// <summary>Seznam atributu</summary>
        public GAttrList(IGNativeStringOwner owner, int capacity)
            : base(capacity)
        {
            this.owner = owner;
        }

        /// <summary>Seznam atributu</summary>
        public GAttrList(IGNativeStringOwner owner, IDictionary<string, string> d)
            : base(d)
        {
            this.owner = owner;
        }

        /// <summary>Seznam atributu</summary>
        public GAttrList(IGNativeStringOwner owner, System.Collections.Hashtable ht)
            :base(ht.Count)
        {
            this.owner = owner;
            foreach (System.Collections.DictionaryEntry de in ht)
            {
                d.Add(de.Key.ToString(), de.Value.ToString());
            }
            this.l = new List<KeyValuePair<string, string>>(d);
        }

        /// <summary>Seznam atributu</summary>
        public GAttrList(IGNativeStringOwner owner, IGAttrList input)
        {
            int c; input.getCount(out c);

            this.owner = owner;
            this.d = new Dictionary<string, string>(c);
            this.l = new List<KeyValuePair<string, string>>(c);

            for (int i = 0; i < c; i++)
            {
                string l_name, l_value;
                input.getItem(i, out l_name, out l_value);
                var kv = new KeyValuePair<string, string>(l_name, l_value);
                d.Add(kv);
                l.Add(kv);
            }
        }

        //------------------------------------------------------------------
        [System.Security.SecurityCritical]
        int IGAttrList.getCount(out int cnt)
        {
            cnt = Count;
            return 0;
        }

        [System.Security.SecurityCritical]
        int IGAttrList.getItem(int index, out string name, out string value)
        {
            if (index < 0 || index > Count) { name = null; value = null; return 1; }
            var kv = l[index];
            name = GNativeStringCache.RepString(owner, kv.Key);
            value = GNativeStringCache.RepString(owner, kv.Value);
            return 0;
        }

        /// <summary>Položka dle jména</summary>
        [System.Security.SecurityCritical]
        public int getAttribute(string name, out string value)
        {
            string v;
            if (d.TryGetValue(name, out v))
            {
                value = GNativeStringCache.RepString(owner, v);
                return 0;
            }
            value = null;
            return 1;
        }
        ///// <summary>Položka dle jména</summary>
        //[System.Security.SecurityCritical]
        //public int getAttribute(string name, out IntPtr value)
        //{
        //    string v;
        //    if (d.TryGetValue(name, out v))
        //    {
        //        value = GNativeStringCache.Ansi(owner, v);
        //        return 0;
        //    }
        //    value = IntPtr.Zero;
        //    return 1;
        //}
    }

    /// <summary>Seznam infos</summary>
    [System.Security.SecurityCritical]
    public class GInfoList : GBaseList<string, string>, IGInfoList
    {
        IGNativeStringOwner owner;

        /// <summary>Seznam infos</summary>
        public GInfoList(IGNativeStringOwner owner, IDictionary<string, string> d)
            :base(d)
        {
            this.owner = owner;
        }

        /// <summary>Seznam infos</summary>
        public GInfoList(IGNativeStringOwner owner, IGInfoList input)
        {
            int c; input.getCount(out c);

            this.owner = owner;
            this.d = new Dictionary<string, string>(c);
            this.l = new List<KeyValuePair<string, string>>(c);

            for (int i = 0; i < c; i++)
            {
                string l_name, l_value;
                input.getItem(i, out l_name, out l_value);
                var kv = new KeyValuePair<string, string>(l_name, l_value);
                d.Add(kv);
                l.Add(kv);
            }
        }

        //------------------------------------------------------------------
        [System.Security.SecurityCritical]
        int IGInfoList.getCount(out int cnt)
        {
            cnt = Count;
            return 0;
        }

        /// <summary>Zjištění Info</summary>
        public void getItem(int index, out string name, out string value)
        {
            var kv = l[index];
            name = kv.Key;
            value = kv.Value;
        }
        [System.Security.SecurityCritical]
        int IGInfoList.getItem(int index, out string name, out string value)
        {
            if (index < 0 || index > Count) { name = null; value = null; return 1; }
            var kv = l[index];
            name = GNativeStringCache.RepString(owner, kv.Key);
            value = GNativeStringCache.RepString(owner, kv.Value);
            return 0;
        }

        /// <summary>Zjištění Info</summary>
        public string getInfo(string name)
        {
            string v;
            if (d.TryGetValue(name, out v))
                return v;
            return null;
        }
        /// <summary>Zjištění Info</summary>
        [System.Security.SecurityCritical]
        public int getInfo(string name, out string value)
        {
            string v;
            if (d.TryGetValue(name, out v))
            {
                value = GNativeStringCache.RepString(owner, v);
                return 0;
            }
            value = null;
            return 1;
        }

        [System.Security.SecurityCritical]
        int IGInfoList.convertToText(System.Text.StringBuilder buffer, int size)
        {
            foreach (KeyValuePair<string, string> kv in l)
            {
                buffer.AppendFormat("{0}={1}|", kv.Key, kv.Value);
            }
            return 0;
        }
    }

}
