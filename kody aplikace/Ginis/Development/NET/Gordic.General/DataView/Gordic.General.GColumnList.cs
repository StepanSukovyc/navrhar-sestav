//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GColumnList.cs                               </Name>
//    <Description> argumenty pro událost povolení editace                      </Description>
//    <Author>      Martin Aliger (Jiøí Dvoøák)                                 </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                  </Copyright>
//    <Created>     2004-06-30                                                  </Created>
//  </FileHeader>

using System;
using System.Xml;
using System.Collections;
using System.Collections.Generic;
using Gordic.General;

namespace Gordic.General
{
    //---------------------------------------------------------------------
    /// <summary>
    /// Sada sloupcù
    /// </summary>
    public class GColumnList : IGObject, IEnumerable<GColumn>
    {
        #region Init
        /// <summary>
        /// Pole pro uchování sady sloupcù
        /// </summary>
        internal List<GColumn> m_oColumnList = new List<GColumn>();
        ///// <summary>
        ///// Implicitní styl hlavièky sloupce
        ///// </summary>
        //private GStyle moDefaultHeaderStyle = GDVCommon.DefaultHeaderStyle;
        ///// <summary>
        ///// Implicitní styl sloupce
        ///// </summary>
        //private GStyle moDefaultColumnStyle = GDVCommon.DefaultStyle;
        ///// <summary>
        ///// Implicitní styl alternativní boòky sloupce
        ///// </summary>
        //private GStyle moDefaultAlternativColumnStyle = GDVCommon.DefaultAlternativeStyle;
        ///// <summary>
        ///// Implicitní styl tabulky pro WEB
        ///// </summary>
        //private string msDefaultTableCssClass = GDVCommon.TableCssClass;

        //---------------------------------------------------------------------
        /// <summary>Konstruktor</summary>
        public GColumnList()
        {
        }

        /// <summary>Porovnání</summary>
        public override bool Equals(object obj)
        {
            GColumnList c = obj as GColumnList;
            if (c == null) return false;
            if (c.Count != Count) return false;
            for (int i = 0; i < Count; i++)
            {
                if (this[i].Equals(c[i]) == false)
                    return false;
            }
            return true;
        }

        /// <summary>Hashcode</summary>
        public override int GetHashCode()
        {
            int c = 0;
            foreach (GColumn col in m_oColumnList)
            {
                unchecked
                {
                    c += col.GetHashCode();
                }
            }
            return c;
        }
        #endregion

        #region ***************** private methods *****************
        //---------------------------------------------------------------------
        /// <summary>
        /// Vrátí true pokud index v poli existuje 
        /// </summary>
        /// <param name="index">index</param>
        /// <returns>true = existuje</returns>
        private bool ItemIndexExist(int index)
        {
            return ((index >= 0) & (index < m_oColumnList.Count));
        }// end method

        //---------------------------------------------------------------------
        /// <summary>
        /// Vrátí sloupec dle jména
        /// </summary>
        /// <param name="name">jméno (mapping name) sloupce</param>
        /// <returns>nalezený sloupec, nebo null pokud ho nenašel</returns>
        private GColumn GetColByName(string name)
        {
            foreach (GColumn col in m_oColumnList)
            {
                if (string.Equals(col.Name, name, StringComparison.OrdinalIgnoreCase))
                {
                    return col;
                }// end if
            }// end foreach
            return null;
        }// end method

        //---------------------------------------------------------------------
        /// <summary>
        /// Vrátí index sloupce dle jména sloupce
        /// </summary>
        /// <param name="name">jméno sloupce</param>
        /// <returns>index nalezeného sloupce nebo -1 pokud sloupec nenašel</returns>
        private int GetIndexOfColumn(string name)
        {
            name = name.ToUpper();
            for (int i = 0; i < m_oColumnList.Count; i++)
            {
                if (this[i].Name.ToUpper() == name) return i;
            }// end for
            return -1;
        }// end method

        #endregion

        #region ***************** public methods *****************


        //---------------------------------------------------------------------
        /// <summary>
        /// Vrátí enumerátor - aby bylo možno procházet foreach
        /// </summary>
        public IEnumerator<GColumn> GetEnumerator()
        {
            return m_oColumnList.GetEnumerator();
        }
        /// <summary>
        /// Vrátí enumerátor - aby bylo možno procházet foreach
        /// </summary>
        IEnumerator IEnumerable.GetEnumerator()
        {
            return m_oColumnList.GetEnumerator();
        }

        /// <summary> Pridani nekolika GColumn</summary>
        /// <param name="aItems"></param>
        public void AddRange(IEnumerable<GColumn> aItems)
        {
            //m_oColumnList.AddRange(aItems); 
            foreach (GColumn c in aItems)
            {
                Add(c);
            }
        } // end method

        //---------------------------------------------------------------------
        /// <summary> Pøidání sloupce do pole </summary>
        /// <param name="column">sloupec</param>
        /// <returns>true = byl pøidán</returns>
        public bool Add(GColumn column)
        {
            if (column == null)
                throw new GArgumentNullException(23400006, "column");
            if (column.m_list != null)
                throw new GException(21000001, 21090001); //RC-EX 21090001 : Sloupec již je v seznamu sloupcù

            column.m_list = this;
            column.Index = m_oColumnList.Count;
            //if (column.InternalName != null)
            {
                GColumn CTmp = GetColByName(column.Name);
                if (CTmp != null) throw new GException(21000002, 21090002, column.Name); //RC-EX 21090002 : Sloupec {0} již v kolekci existuje.
            }
            m_oColumnList.Add(column);
            return true;
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Pøidání sloupce do pole
        /// </summary>
        /// <param name="column">sloupec</param>
        /// <param name="position">pozice na kterou se má vlo</param>
        /// <returns>true = byl pøidán</returns>
        public bool Insert(int position, GColumn column)
        {
            if (column == null)
                throw new GArgumentNullException(23400012, "column");
            if (position < 0 || position > m_oColumnList.Count)
                throw new GArgumentNullException(23400010, "position");
            if (column.m_list != null)
                throw new GException(21000003, 21090001); //RC-EX 21090001 : Sloupec již je v seznamu sloupcù

            column.m_list = this;
            column.Index = position;
            //if (column.InternalName != null)
            {
                GColumn CTmp = GetColByName(column.Name);
                if (CTmp != null) throw new GException(21000004, 21090002, column.Name); //RC-EX 21090002 : Sloupec {0} již v kolekci existuje.
            }
            
            m_oColumnList.Insert(position, column);
            return true;
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Vrací index sloupce dle jména
        /// </summary>
        /// <param name="columnName">jméno sloupce</param>
        /// <returns>index nebo -1</returns>
        public int IndexOf(string columnName)
        {
            return GetIndexOfColumn(columnName);
        }

        /// <summary>
        /// Vrací index sloupce
        /// </summary>
        public int IndexOf(GColumn c)
        {
            return m_oColumnList.IndexOf(c);
        }
        //---------------------------------------------------------------------
        /// <summary>
        /// Vrací zda sloupec dle jména existuje
        /// </summary>
        public bool Contains(string columnName)
        {
            return GetIndexOfColumn(columnName) >= 0;
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Smaže sloupec dle pozice
        /// </summary>
        /// <param name="index">pozice</param>
        /// <returns>true = smazán</returns>
        public bool Remove(int index)
        {
            if (ItemIndexExist(index))
            {
                GColumn c = this[index];
                m_oColumnList.Remove(c);
                c.m_list = null;
                return true;
            }
            else
                return false;
        }

        /// <summary> Smaže všechny sloupce
        /// </summary>
        public void Clear()
        {
            foreach (GColumn c in m_oColumnList)
            {
                c.m_list = null;
            }
            m_oColumnList.Clear();
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Smaže sloupec dle jména
        /// </summary>
        /// <param name="columnName">jméno sloupce</param>
        /// <returns>true = smazán</returns>
        public bool Remove(string columnName)
        {
            int l_nIdx = GetIndexOfColumn(columnName);
            if (l_nIdx < 0) return false;
            return Remove(l_nIdx);
        }// end method

        //---------------------------------------------------------------------
        /// <summary>
        /// Smaže sloupec
        /// </summary>
        /// <param name="column">sloupec</param>
        /// <returns>true = smazán</returns>
        public bool Remove(GColumn column)
        {
            int l_nIndex = m_oColumnList.IndexOf(column);
            if (l_nIndex < 0) return false;
            return Remove(l_nIndex);
        }// end method

        //---------------------------------------------------------------------
        /// <summary>
        /// Nastaví pozici sloupce
        /// </summary>
        /// <param name="column">sloupec, který se má pøesunout</param>
        /// <param name="index">index, na který se má pøesunout</param>
        public bool SetPosition(GColumn column, int index)
        {
            if (!Remove(column)) return false;
            if (!Insert(index, column)) return false;
            return true;
        }// end method

        //---------------------------------------------------------------------
        /// <summary>
        /// Nastaví pozici sloupce
        /// </summary>
        /// <param name="columnName">jméno sloupce</param>
        /// <param name="index">index, na který se má pøesunout</param>
        public bool SetPosition(string columnName, int index)
        {
            GColumn l_oColumn = this[columnName];
            if (l_oColumn == null) return false;
            if (!Remove(l_oColumn)) return false;
            if (!Insert(index, l_oColumn)) return false;
            return true;
        }// end method


        //---------------------------------------------------------------------
        /// <summary>
        /// Nastaví pozici sloupce
        /// </summary>
        /// <param name="currentIndex">souèasný index</param>
        /// <param name="newIndex">nový index</param>
        public bool SetPosition(int currentIndex, int newIndex)
        {
            if (!ItemIndexExist(currentIndex)) return false;
            GColumn l_oColumn = (GColumn)(m_oColumnList[currentIndex]);
            if (!Remove(l_oColumn)) return false;
            if (!Insert(newIndex, l_oColumn)) return false;
            return true;
        }// end method

        #endregion

        #region ***************** public properties and indexers *****************
        //---------------------------------------------------------------------
        /// <summary>
        /// Vrací poèet sloupcù
        /// </summary>
        public int Count
        {
            get { return m_oColumnList.Count; }
        }// end property

        //---------------------------------------------------------------------
        /// <summary>
        /// Vrací sloupec na indexu 'index'
        /// </summary>
        public GColumn this[int index]
        {
            get
            {
                if (ItemIndexExist(index)) return m_oColumnList[index];
                else return null;
            }// end get
        }// end property

        //---------------------------------------------------------------------
        /// <summary>
        /// Vrací sloupec jména 'name'
        /// </summary>
        public GColumn this[string name]
        {
            get { return GetColByName(name); }
        }// end property

        ////---------------------------------------------------------------------
        ///// <summary>
        ///// Implicitní styl hlavièky sloupce
        ///// </summary>
        //public GStyle DefaultHeaderStyle
        //{
        //    get { return moDefaultHeaderStyle; }
        //    set { moDefaultHeaderStyle = value; }
        //}// end property

        ////---------------------------------------------------------------------
        ///// <summary>
        ///// Implicitní styl sloupce
        ///// </summary>
        //public GStyle DefaultColumnStyle
        //{
        //    get { return moDefaultColumnStyle; }
        //    set { moDefaultColumnStyle = value; }
        //}// end property

        ////---------------------------------------------------------------------
        ///// <summary>
        ///// Implicitní styl alternativní boòky sloupce
        ///// </summary>
        //public GStyle DefaultAlternativColumnStyle
        //{
        //    get { return moDefaultAlternativColumnStyle; }
        //    set { moDefaultAlternativColumnStyle = value; }
        //}// end property

        ////---------------------------------------------------------------------
        ///// <summary>
        ///// Implicitní styl tabulky pro WEB
        ///// </summary>
        //public string DefaultTableCssClass
        //{
        //    get { return msDefaultTableCssClass; }
        //    set { msDefaultTableCssClass = value; }
        //}// end property
        /*
        //---------------------------------------------------------------------
        const string m_csNamespace = "http://www.gordic.cz/shared/grid-user-config/v_1.0.0.0";
        //---------------------------------------------------------------------
        /// <summary>
        /// Nastaví uživatelské poøadí, šíøku a viditelnost sloupcù
        /// </summary>
        /// <param name="userColumnConfig">Uživatelské nastavení sloupcù gridu v xml formátu</param>
        public void SetUserColumnConfig(string userColumnConfig)
        {
            GUserGridFormat l_oUserGridFormat = new GUserGridFormat();
            try
            {
                l_oUserGridFormat.ParseFormat(userColumnConfig);
                foreach (GColumn column in this)
                {
                    column.Visible = false;
                }// end foreach
                int l_nColIdx = 0;
                foreach (GUserColumn column in l_oUserGridFormat.ColumnList)
                {
                    GColumn l_oColumn = this[column.Name];
                    if (l_oColumn != null)
                    {
                        l_oColumn.Width = column.Width;
                        l_oColumn.Visible = column.Visible;
                        SetPosition(l_oColumn, l_nColIdx);
                    }// end if
                    l_nColIdx++;
                }// end foreach
            }// end try
            catch (Exception e)
            {
                throw new GDataViewException(23400003, 23420002, e); // <resource value=23420002>Chyba v øetìzci urèujícím viditelnost, poøadí a šíøi sloupcù v data gridu</resource>
            }// end catch
        }// end method

        //---------------------------------------------------------------------
        /// <summary>
        /// Vrátí uživatelské poøadí, šíøku a viditelnost sloupcù pro databázi
        /// </summary>
        /// <returns>xml popis konfigurace sloupcù data gridu</returns>
        public string GetUserColumnConfig()
        {
            XmlDocument l_oDocument = new XmlDocument();
            XmlNamespaceManager nsmgr = new XmlNamespaceManager(l_oDocument.NameTable);
            nsmgr.AddNamespace("x", m_csNamespace);
            XmlElement l_oGridUSerConfigNode = l_oDocument.CreateElement("DataGridUserConfig", m_csNamespace);
            l_oDocument.AppendChild(l_oGridUSerConfigNode);

            string l_sResult = String.Empty;
            foreach (GColumn column in this)
            {
                if (column.Visible)
                {

                    XmlElement l_oGridColumnNode = l_oDocument.CreateElement("Column", m_csNamespace);
                    l_oGridUSerConfigNode.AppendChild(l_oGridColumnNode);

                    XmlAttribute l_oNameAttribute = l_oDocument.CreateAttribute("name");
                    l_oNameAttribute.InnerText = column.Name;
                    l_oGridColumnNode.Attributes.Append(l_oNameAttribute);

                    XmlAttribute l_oVisibleAttribute = l_oDocument.CreateAttribute("visible");
                    l_oVisibleAttribute.InnerText = column.Visible.ToString();
                    l_oGridColumnNode.Attributes.Append(l_oVisibleAttribute);

                    XmlElement l_oColumnWidthNode = l_oDocument.CreateElement("Width", m_csNamespace);
                    l_oColumnWidthNode.InnerText = column.Width.ToString();
                    l_oGridColumnNode.AppendChild(l_oColumnWidthNode);

                }// end if
            }// end foreach
            return l_oDocument.InnerXml;
        }// end method
        */
        #endregion

    }
}
