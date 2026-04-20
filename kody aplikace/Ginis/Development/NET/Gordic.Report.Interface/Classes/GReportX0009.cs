//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Client.GReportX0009.cs        </Name>
//    <Description> Pomocná tøída pro vytvoøení X0009 parametru </Description>
//    <Author>      Martin Aliger                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2005  </Copyright>
//    <Created>     2007-01-29                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;
using Gordic.General;
using Gordic.Report.Interface;

namespace Gordic.Report.Interface
{
    /// <exclude/>
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    [System.Security.SecurityCritical]
    public class GReportX0009Base
    {
        IGSessionInfo m_si;
        IGReport m_report;
        char[] m_fixed = new char[17];
        Dictionary<string, object> m_vari = new Dictionary<string, object>();
        GEkoParams m_eko;

        /// <exclude/>
        public GReportX0009Base(IGSessionInfo si, GEkoParams eko)
            : this(si, eko, null)
        {
        }

        /// <exclude/>
        public GReportX0009Base(IGSessionInfo si, GEkoParams eko, IGReport r)
        {
            m_si = si;
            m_eko = eko;
            m_report = r;
            InitDefault();
        }

        /// <summary>
        /// Konstruktor ke ètení hodnot
        /// </summary>
        public GReportX0009Base(IGSessionInfo si, GEkoParams eko, IGReport r, bool readValues)
        {
            m_si = si;
            m_eko = eko;
            m_report = r;
            if (!readValues) InitDefault();
            else
            {
                object x9 = m_report.Parameters["X0009"];
                if (x9 == null)
                    throw new Gordic.General.GArgumentNullException(21000008);
                string s9 = x9.ToString().Trim();
                if (s9.Length >= 17)
                    InitValue(s9);
                else
                    "2                ".CopyTo(0, m_fixed, 0, 17); //neni naplneno (nebo je nejaky nesmysl)
            }
        }

        /// <exclude/>
        protected void InitValue(string x9)
        {
            if (x9.Length < 17)
                throw new Gordic.General.GArgumentException(21000007);
            x9.CopyTo(0, m_fixed, 0, 17);

            string[] vals = x9.Substring(18).Split('|');
            foreach (string val in vals)
            {
                string[] nv = val.Split(new char[] { '=' }, 2);
                if (nv.Length == 2)
                    Add(nv[0], nv[1]);
            }
        }

        /// <exclude/>
        protected void InitDefault()
        {
            //TXYZZZZIIIIIIIIII
            //Kde
            //T	typ tisku – GINVID01.DLL, native, …
            //X	znak identifikující pohled do archivních struktur (xx tabulek) „X“ nebo „ “
            //Y	znak identifikující pøesmìrování tabulek UCT* na DUG* „D“ nebo „ “
            //ZZZZ	úèetní období
            //IIIIIIIIII	IÈO aktuální

            String.Format("2  {0,4}{1,10}",
                m_eko == null || m_eko.Rok.IsNull ? "" : m_eko.Rok.ToString(),
                m_eko == null || m_eko.Ico.IsNull ? "" : m_eko.Ico.BaseValueTrimmed
            ).CopyTo(0, m_fixed, 0, 17);

            if (m_si != null)
            {
                Add("LPC", m_si.LogPorCislo);//LPC	Aktuální LOG_POR_CISLO uživatele pøi pøihlášení do GINIS	všechny
                Add("IXS_LPC", m_si.IxsLpc);
                Add("LIC", m_si.LicAdr);
                Add("ZMP", m_si.IxsZmp);     //ZMP	Identifikátor aktuálnì pøihlášeného uživatele 	všechny
                Add("FUN", m_si.IxsFun);     //FUN	identifikátor aktuální funkce	KDF,KOF,POU,PRE
                Add("TAG", m_si.TypAg);      //TAG	Typ agendy, která sestavu tiskne (MAT- 60)	všechny
                Add("IKC", new GIkc().Value.ToString()); //IKC doplnìno 2024/09/06  ref T5105
            }
            if (m_eko != null)
            {
                if (m_eko.Uus.IsNull == false) Add("UUS", m_eko.Uus.BaseValueTrimmed);          //UUS	Aktuální UUS
                if (m_eko.Ucs.IsNull == false) Add("UCS", m_eko.Ucs.BaseValueTrimmed);          //UCS	Aktuální UCS
                if (m_eko.Nks.IsNull == false) Add("NKS", m_eko.Nks.BaseValueTrimmed);          //NKS	Aktuální NKS
                if (m_eko.Mesic.IsNull == false) Add("MES", m_eko.Mesic.ToString());            //MES	Mìsíc
                if (m_eko.IxpDen.IsNull == false) Add("IDK", m_eko.IxpDen.BaseValueTrimmed);    //IDK	identifikátor aktuální knihy	KDF,KOF,POU,PRE
            }

            //LOK_ICO_N	Data vybírána negací IÈO 	UCR
            //LOK_UCS_N	Data vybírána negací UCS	UCR
            //LOK_UUS_N	Data vybírána negací UUS	UCR
            //LOK_NKS_N	Data vybírána negací NKS	UCR
            //LOK_ICO_S	Vytváøení mezisouètù za IÈO 	UCR
            //LOK_UCS_S	Vytváøení mezisouètù za UCS	UCR
            //LOK_UUS_S	Vytváøení mezisouètù za UUS	UCR
            //LOK_NKS_S	Vytváøení mezisouètù za NKS	UCR
            //LOK_ICO	IÈO pro tisk hlavièky	UCR
            //LOK_UCS	UCS pro tisk hlavièky	UCR
            //LOK_UUS	UUS pro tisk hlavièky	UCR
            //LOK_NKS	NKS pro tisk hlavièky	UCR

            //XXPEP	Nucený tisk z XX tabulek MATSPEP a MATSPID	SMM
            //HLA	Pøíznak pro øízení hlavièky sestavy: 0 – standard, 1 – uživatelsky definovaná v okamžiku generování sestavy	UCR
            //VIE	Pøíznak pohledu na jednu èi všechny knihy: 0 - pohled na jednu knihu, 1 - pohled na všechny knihy 	
            //ODLOZ	Sestava je tisknuta odloženým zpracováním: -1 - ne, 0> ano	UCR,SMM
        }
/*
        /// <exclude/>
        public static string GetEkoParam(object eko, string name)
        {
            if (eko == null)
                return null;
            System.Reflection.PropertyInfo l_pi = eko.GetType().GetProperty(name);
            if (l_pi == null)
                return null;
            object l_value = l_pi.GetValue(eko, null);
            if (l_value == null)
                return null;
            if ((l_value is IGDbType) && ((IGDbType)l_value).IsNull)
                return null;
            return l_value.ToString();
        }

        /// <exclude/>
        private string GetEkoParam(string name)
        {
            return GetEkoParam(m_eko, name);
        }
*/
        /// <summary>
        /// Pøidání položky do variabilní èásti. Pokud již polžoka existuje, bude pøepsána novou hodnotou.
        /// </summary>
        /// <param name="name">jméno</param>
        /// <param name="value">hodnota</param>
        public GReportX0009Base Add(string name, object value)
        {
            if (value != null)
                m_vari[name] = value; //pripadne prepise jiz stavajici hodnotu
            return this; //fluent API
        }

        /// <summary>seznam klíèù existujících položek</summary>
        public List<string> ItemKeys
        {
            get
            {
                return new List<string>(m_vari.Keys);
            }
        }

        /// <summary>Indexer - vrací hodnotu existujícího klíèe</summary>
        public object this[string key]
        {
            get
            {
                object res;
                if (m_vari.TryGetValue(key, out res)) return res;
                return null;
            }
        }

        /// <summary>
        /// Smaže existující klíè
        /// </summary>
        /// <param name="key"></param>
        public void Remove(string key)
        {
            m_vari.Remove(key);
        }

        /// <exclude/>
        public IGReport Report
        {
            get { return m_report; }
        }

        /// <summary>Pøíznak pøístupu do archivních struktur</summary>
        public bool ArchivniStruktury
        {
            get { return m_fixed[1] == 'X'; }
            set { m_fixed[1] = value ? 'X' : ' '; if (PresmerovaniDUG == false) m_fixed[2] = m_fixed[1]; }
        }

        /// <summary>Pøíznak pøesmìrování DUG</summary>
        public bool PresmerovaniDUG
        {
            get { return m_fixed[2] == 'D'; }
            set { m_fixed[2] = value ? 'D' : m_fixed[1]; }
        }

        /// <summary>Typ zpùsobu tisku</summary>
        public int ZpusobTisku
        {
            get { return Byte.Parse(m_fixed[0].ToString()); }
            set { m_fixed[0] = value.ToString()[0]; }
        }

        /// <summary>Rok</summary>
        public int Rok
        {
            get { return Int32.Parse(new String(m_fixed,3,4)); }
            set
            {
                string nw = String.Format("{0,4}", value);
                m_fixed[3] = nw[0];
                m_fixed[4] = nw[1];
                m_fixed[5] = nw[2];
                m_fixed[6] = nw[3];
            }
        }

        /// <summary>IÈO</summary>
        public string Ico
        {
            get { return new String(m_fixed, 7, 10).Trim(); }
            set
            {
                value = value.PadLeft(10, ' ');
                Array.Copy(value.ToCharArray(), 0, m_fixed, 7, 10);
            }
        }

        /// <summary>Pøíznak vyplnìnosti Rok</summary>
        public bool RokPresent
        {
            get { return new String(m_fixed, 3, 4).TrimEnd().Length > 0; }
        }
        /// <summary>Pøíznak vyplnìnosti IÈO</summary>
        public bool IcoPresent
        {
            get { return new String(m_fixed, 7, 10).TrimEnd().Length > 0; }
        }

        /// <exclude/>
        public string ParameterValue
        {
            get
            {
                StringBuilder l_v = new StringBuilder();
                foreach (KeyValuePair<string, object> kv in m_vari)
                {
                    l_v.Append(kv.Key);
                    l_v.Append("=");
                    l_v.Append(kv.Value.ToString());
                    l_v.Append("|");
                }
                return new String(m_fixed) + "#" + l_v;
            }
        }

    }
}
