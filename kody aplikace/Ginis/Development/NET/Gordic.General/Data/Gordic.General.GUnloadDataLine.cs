//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GUnloadDataLine.cs                           </Name>
//    <Description> Pomocná tøída pro DataAdapter                               </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2015-04-24                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;

namespace Gordic.General
{
    /// <summary>
    /// Pomocná tøída pro DataAdapter
    /// </summary>
    [System.Security.SecurityCritical]
    internal class GUnloadDataLine
    {
        string[] m_items;

        private GUnloadDataLine() { }
        /// <summary>ctor z pole</summary>
        public GUnloadDataLine(string[] items)
        {
            m_items = items;
        }

        /// <summary>ctor ze stringu</summary>
        public static GUnloadDataLine Parse(string line)
        {
            GUnloadDataLine res = new GUnloadDataLine();

            var s = new List<string>();
            var b = new StringBuilder();
            var escape = false;
            foreach (char a in line)
            {
                if (escape) 
                {
                    switch (a)
                    {
                        case 'n': b.Append('\n'); break;
                        case 'r': break;
                        case '\\': b.Append('\\'); break;
                        case '|': b.Append('|'); break;
                        default: if (a < '0' && a >= ' ')
                                b.Append(a);
                            else
                                throw new GException(21000016, 21090020, a.ToString()); //RC-EX 21090020 : unload soubor: chybné "\{0}"
                            break;
                    }
                    escape = false;
                    continue; 
                }
                if (a < 32) continue;
                if (a == '\\') { escape = true; continue; }
                if (a == '|')
                {
                    //položka je kompletní
                    s.Add(b.ToString());
                    b.Clear();
                    continue;
                }
                b.Append(a);
            }

            if(escape)
                throw new GException(21000017, 21090020, ""); //RC-EX 21090020 : unload soubor: chybné "\{0}"
            if (b.Length > 0)
                throw new GException(21000018, 21090021); //RC-EX 21090021 : Chyba unload souboru: øádek nekonèí oddìlovaèem

            res.m_items = s.ToArray();
            return res;
        }

        /// <summary>do stringu</summary>
        public string Serialize()
        {
            StringBuilder sb = new StringBuilder();
            foreach (string item in Items)
            {
                foreach (char a in item)
                {
                    switch (a)
                    {
                        case '\n': sb.Append("\\n"); break;
                        case '\r': break;
                        case '\\': sb.Append("\\\\"); break;
                        case '|': sb.Append("\\|"); break;
                        default: sb.Append(a); break;
                    }
                }                
                sb.Append('|');
            }
            return sb.ToString();
        }


        /// <summary>indexer</summary>
        public string this[int index]
        {
            get { return m_items[index]; }
        }

        /// <summary>položky</summary>
        public string[] Items
        {
            get { return m_items; }
        }

    }
}
