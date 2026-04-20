//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.GReportHeader.cs                              </Name>
//    <Description> Popis hlavièky sestavy                                      </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2009                  </Copyright>
//    <Created>     2009-02-24                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;

namespace Gordic.Report.Interface
{
    /// <summary>
    /// Popis hlavièky sestavy
    /// </summary>
    public class GReportHeader
	{
        /// <summary>
        /// Tøída pro uložení dodateèných informací v hlavièce sestavy
        /// </summary>
        public class Info
        {
            string m_name;
            string m_value;

            /// <summary>
            /// Konstruktor
            /// </summary>
            public Info(string name, string value)
            {
                m_name = name;
                m_value = value;
            }

            /// <summary>
            /// Název informace
            /// </summary>
            public string Name
            {
                get { return m_name; }
            }

            /// <summary>
            /// Hodnota informace
            /// </summary>
            public string Value
            {
                get { return m_value; }
            }
        }

        string m_title;
        string m_title2;
        string m_title3;
        List<Info> m_infos = new List<Info>();

        /// <summary>
        /// Defaultní nastavení hlavièky
        /// </summary>
        public GReportHeader()
        {
        }

        /// <summary>
        /// Hlavní nadpis sestavy
        /// </summary>
        public string Title
        {
            get { return m_title; }
            set { m_title = value; }
        }

        /// <summary>
        /// 2. nadpis sestavy
        /// </summary>
        public string Title2
        {
            get { return m_title2; }
            set { m_title2 = value; }
        }

        /// <summary>
        /// 3. nadpis sestavy
        /// </summary>
        public string Title3
        {
            get { return m_title3; }
            set { m_title3 = value; }
        }

        /// <summary>
        /// Informaèní øádky sestavy
        /// </summary>
        public List<Info> Infos
        {
            get { return m_infos; }
        }

    }


}
