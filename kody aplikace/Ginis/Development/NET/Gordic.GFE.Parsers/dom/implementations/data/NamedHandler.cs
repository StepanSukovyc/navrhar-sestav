//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.NamedHandler.cs                          </Name>
//    <Description> Zpracování náhrady zástupek ve jménech objektů              </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-12-18                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Zpracování náhrady zástupek ve jménech objektů 
    /// </summary>
    public class NamedHandler : IEnumerable<NamedHandler.NamedItem>
    {
        public class NamedItem
        {
            NamedHandler h;
            internal int s;
            internal int e;
            public NamedItem(NamedHandler h, int s, int e)
            {
                this.h = h; this.s = s; this.e = e;
            }

            ///<summary>Name</summary>
            public string Name
            {
                get { return h.Name.Substring(s + 1, e - s - 1); }
            }
            public int Length
            {
                get { return e - s + 2; }
            }
            public void Resolve(string value)
            {
                h.Resolve(this, value);
            }
            public void MarkAsResolved() { s = -1; e = 0; }

            internal void Offset(int ofs)
            {
                s += ofs;
                e += ofs;
            }
        }

        string m_Name;
        ///<summary>Name</summary>
        public string Name
        {
            get { return m_Name; }
        }

        public int Count { get { return m_Items.Count; } }

        List<NamedItem> m_Items = new List<NamedItem>();

        public NamedHandler(string name, IDefaultDataBound di = null)
        {
            m_Name = name;
            int s = 0;
            while (true) //m_Name != null && m_Name.Contains('{'))
            {
                s = m_Name.IndexOf('{', s);
                if (s < 0) break;
                int e = m_Name.IndexOf('}', s + 1);
                m_Items.Add(new NamedItem(this, s, e));
                s = e + 1;
            }
            if (di != null)
                ResolveNames(di);
        }

        public void Resolve(NamedItem ni, string value)
        {
            int i = m_Items.IndexOf(ni) + 1;
            if (i < m_Items.Count)
            {
                var ofs = value.Length - ni.Length;
                for (; i < m_Items.Count; i++) m_Items[i].Offset(ofs);
            }
            m_Name = m_Name.Remove(ni.s, ni.e - ni.s + 1).Insert(ni.s, value);
            ni.MarkAsResolved();
        }

        public void ResolveNames(IDefaultDataBound di)
        {
            if (Count == 0) return;

            System.Data.DataRow row = di.DataRow;
            while (row != null)
            {
                var reg = row.Table.TableName;

                foreach (var ni in m_Items)
                {
                    if (ni.Name.StartsWith(reg + "."))
                    {
                        var con = ni.Name.Substring(reg.Length + 1);
                        var col = row.Table.Columns[con];
                        if (col != null)
                            Resolve(ni, row[col].ToString());
                    }
                }
                if (row.Table.ParentRelations.Count < 1) break;
                row = row.GetParentRow(row.Table.ParentRelations[0]);
            }
        }

        #region IEnumerable<NamedItem> Members
        IEnumerator<NamedHandler.NamedItem> IEnumerable<NamedHandler.NamedItem>.GetEnumerator()
        {
            return m_Items.GetEnumerator();
        }
        System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
        {
            return m_Items.GetEnumerator();
        }
        #endregion
    }

}
