//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GEkoCfuSet.cs                                </Name>
//    <Description> Sada položek z EKOSCFU                                      </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                  </Copyright>
//    <Created>     2009-11-03                                                  </Created>
//  </FileHeader>

using System;
using System.Collections;
using System.Collections.Generic;

namespace Gordic.General
{
    /// <summary>
    /// Sada položek z EKOSCFU
    /// </summary>
    [Serializable]
    public class GEkoCfuSet : IGObject, IEnumerable<GEkoCfuItem>
    {
        /// <summary>Sada položek</summary>
        private List<GEkoCfuItem> m_list = new List<GEkoCfuItem>();

        /// <summary>Konstruktor</summary>
        public GEkoCfuSet()
        {
        }

        /// <summary>Konstruktor</summary>
        public GEkoCfuSet(IEnumerable<GEkoCfuItem> list)
        {
            m_list.AddRange(list);
        }

        GEkoParams m_p = null;
        internal GEkoCfuSet(GEkoParams p) : this() { m_p = p; }

        /// <summary>Pøidání položky</summary>
        /// <param name="item">položka</param>
        internal void Add(GEkoCfuItem item)
        {
            m_list.Add(item);
            if (m_p != null) m_p.CfuSetChanged();
        }

        /// <summary>Vyprázdní sadu</summary>
        public void Clear()
        {
            m_list.Clear();
            if (m_p != null) m_p.CfuSetChanged();
        }

        /// <summary>
        /// Nahraje sadu z jiné
        /// </summary>
        /// <param name="sourceObj"></param>
        public void LoadFrom(GEkoCfuSet sourceObj)
        {
            GEkoCfuItem tmpItem;
            GEkoCfuItem NewItem;

            if ((sourceObj != null) && (this != sourceObj))
            {
                m_list.Clear();
                for (int i = 0; i < sourceObj.Count; i++)
                {
                    tmpItem = sourceObj[i];
                    if (tmpItem != null)
                    {
                        NewItem = new GEkoCfuItem();
                        NewItem.LoadFrom(tmpItem);
                        m_list.Add(NewItem);
                    }
                }
                if (m_p != null) m_p.CfuSetChanged();
            }
        }

        /// <summary>
        /// Vrací poèet položek
        /// </summary>
        public int Count
        {
            get { return m_list.Count; }
        }

        /// <summary>Vrácení položky na dané pozici</summary>
        public GEkoCfuItem this[int index]
        {
            get
            {
                if ((index >= 0) && (index < m_list.Count))
                    return (GEkoCfuItem)m_list[index];
                else
                    throw new ArgumentOutOfRangeException();
            }
        }
        /// <summary>Indexer podle jmena (DbNazev)</summary>
        /// <param name="index">DBNazev</param>
        /// <returns>Vrací nalezenou položku nebo NULL</returns>
        public GEkoCfuItem this[string index]
        {
            get
            {
                foreach (GEkoCfuItem ekoItem in this)
                    if (ekoItem.DbNazev == index) return ekoItem;
                return null;
            }
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return m_list.GetEnumerator();
        }

        IEnumerator<GEkoCfuItem> IEnumerable<GEkoCfuItem>.GetEnumerator()
        {
            return m_list.GetEnumerator();
        }
    }

}
