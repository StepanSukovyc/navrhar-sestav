//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        GRFConverter.cs                                             </Name>
//    <Description> Converter do GRF formatu                                    </Description>
//    <Author>      Ing. Martin Aliger                                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025                  </Copyright>
//    <Created>     2009-08-26                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;
using Gordic.Report.Interface;
using System.IO;
using System.Runtime.InteropServices;
using Gordic.General;

namespace Gordic.GFE.WinClient
{
    /// <summary>Converter z GRR do GRF formatu</summary>
    public class PRFConverter : IDisposable
    {
        #region IDisposable
        /// <summary>
        /// uvolnění objektu
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        void Dispose(bool disposing)
        {
            if (disposing)
                if (m_out != null)
                {
                    m_out.Dispose();
                    m_out = null;
                }
        }

        /// <summary>
        /// uvolnění objektu
        /// </summary>
        ~PRFConverter() { Dispose(false); }
        #endregion

        GUnsafeRepWrapper.GReporterStructure m_xme;

        int m_ind;
        Dictionary<string, string> m_Columns = new Dictionary<string, string>();

        StringWriter m_out = new StringWriter();
        int m_level = 0;
        string m_reg = "";
        bool m_started = false;
        string m_Nazev = "";

        int m_Units = 0;

        int m_pwidth, m_pheight;
        Gordic.Report.Implementation.GrrRect m_pmarg;

//        int m_pcount = 0;

        /// <summary>TODO</summary>
        public PRFConverter(string xme)
        {
            m_xme = GUnsafeRepWrapper.OpenStructure(xme);
        }

        /// <summary>
        /// 
        /// </summary>
        public string Output { get { return m_out.ToString(); } }

        private bool isOpenLine(string line)
        {
            int c = 0;
            foreach (char ch in line)
                switch (ch)
                {
                    case '(': c++; break;
                    case ')': c--; break;
                }
            return c > 0;
        }
        private int lookForClose(string line, int open)
        {
            if (line[open] != '(') throw new ArgumentException();
            int c = 1;
            for (int i = open + 1; i < line.Length; i++)
            {
                switch (line[i])
                {
                    case '(': c++; break;
                    case ')': c--; break;
                }
                if (c == 0) return i;
            }
            throw new GArgumentException(GResources.GetResourceText(29450314)); //RC 29450314 : Chybí uzavírací závorka!
        }
        private string readValue(string line, int i, out int e)
        {
            if (line[i] == '"')
            {
                int i2 = line.IndexOf('"', i + 1);
                e = i2 + 1;
                return line.Substring(i + 1, i2 - i - 1);
            }
            if (line[i] == '(')
            {
                int i2 = lookForClose(line, i);
                e = i2 + 1;
                return line.Substring(i + 1, i2 - i - 2);
            }
            //else
            {
                int i2 = i;
                while (!char.IsWhiteSpace(line[i2]))
                    i2++;
                e = i + 1;
                return line.Substring(i, i2 - i);
            }
        }
        private string readValue(string line, int i)
        {
            int e;
            return readValue(line, i, out e);
        }
        private string readAttr(string line, string name)
        {
            line = " " + line;
            int i1 = line.IndexOf(" " + name + "=");
            if (i1 < 0) return null;
            return readValue(line, i1 + name.Length + 2);
        }
        private string readAttr(string line, string name,string def)
        {
            line = " " + line;
            int i1 = line.IndexOf(" " + name + "=");
            if (i1 < 0) return def;
            return readValue(line, i1 + name.Length + 2);
        }

        /// <summary>TODO</summary>
        public void ConvertPRFFormat(string prffile)
        {
            m_out.WriteLine("<?xml version='1.0' encoding='utf-8' ?>");
            m_out.WriteLine("<format xmlns='http://www.gordic.cz/TR/alf/1.4' type='grf'>");
            m_out.WriteLine();

            try
            {
                using (var sr = new StreamReader(prffile, Encoding.GetEncoding(1250)))
                {
                    string line = sr.ReadLine();
                    //release 7;
                    if (line != "release 7;") throw new GArgumentException(GResources.GetResourceText(29450315)); //RC 29450315 : Vyžadována sestava formátu PRF7!

                    while (!sr.EndOfStream)
                    {
                        line = sr.ReadLine();
                        while (isOpenLine(line)) line += sr.ReadLine();

                        int i1 = line.IndexOf('(');
                        string key = line.Substring(0, i1);
                        string val = line.Substring(i1 + 1, line.LastIndexOf(')') - i1 - 1).Trim();
                        switch (key)
                        {
                            //datawindow(units=0 timer_interval=0 color=12632256 processing=0 print.documentname="Obálka doručenky"  print.orientation=2 print.margin.left=0 print.margin.right=0 print.margin.top=0 print.margin.bottom=0 print.paper.size=9 print.paper.source=0 selected.mouse=no)
                            case "datawindow":
                                //units=0
                                m_Units = int.Parse(readAttr(val, "units"));
                                m_Nazev = readAttr(val, "print.documentname") ?? "";
                                //print.paper.size=9
                                //print.orientation=2
                                //print.documentname="Obálka doručenky"
                                //print.margin.left=0 print.margin.right=0 print.margin.top=0 print.margin.bottom=0
                                string pps = readAttr(val, "print.paper.size");
                                if (pps == null)
                                {
                                    m_pwidth = 210;
                                    m_pheight = 297;
                                }
                                else
                                    switch (int.Parse(readAttr(val, "print.paper.size")))
                                    {
                                        // 1 // Letter, 8 1/2 x 11 in. 
                                        // 2 // Letter Small, 8 1/2 x 11 in. 
                                        // 3 // Tabloid, 11 x 17 in. 
                                        // 4 // Ledger, 17 x 11 in. 
                                        // 5 // Legal, 8 1/2 x 14 in. 
                                        // 6 // Statement, 5 1/2 x 8 1/2 in. 
                                        // 7 // Executive, 7 1/2 x 10 1/2 in. 
                                        case 8: m_pwidth = 297; m_pheight = 420; break;  //A3
                                        case 9: m_pwidth = 210; m_pheight = 297; break;  //A4
                                        case 10: m_pwidth = 210; m_pheight = 297; break; // 10 // A4 Small, 210 x 297 mm 
                                        case 11: m_pwidth = 148; m_pheight = 210; break; //A5
                                        case 12: m_pwidth = 250; m_pheight = 354; break; // 12 // B4, 250 x 354 mm 
                                        case 13: m_pwidth = 182; m_pheight = 257; break; // 13 // B5, 182 x 257 mm 
                                        // 14 // Folio, 8 1/2 x 13 in. 
                                        case 15: m_pwidth = 215; m_pheight = 275; break;// 15 // Quarto, 215 x 275 mm 
                                        // 16 // 10 x 14 in. 
                                        // 17 // 11 x 17 in. 
                                        // 18 // Note, 8 1/2 x 11 in. 
                                        // 19 // Envelope #9, 3 7/8 x 8 7/8 in. 
                                        // 20 // Envelope #10, 4 1/8 x 9 1/2 in. 
                                        // 21 // Envelope #11, 4 1/2 x 10 3/8 in. 
                                        // 22 // Envelope #12, 4 1/2 x 11 in. 
                                        // 23 // Envelope #14, 5 x 11 1/2 in. 
                                        // 24 // C size sheet 
                                        // 25 // D size sheet 
                                        // 26 // E size sheet 
                                        case 27: m_pwidth = 110; m_pheight = 220; break;// 27 // Envelope DL, 110 x 220 mm 
                                        case 29: m_pwidth = 324; m_pheight = 458; break;// 29 // Envelope C3, 324 x 458 mm 
                                        case 30: m_pwidth = 229; m_pheight = 324; break;// 30 // Envelope C4, 229 x 324 mm 
                                        case 28: m_pwidth = 162; m_pheight = 229; break;// 28 // Envelope C5, 162 x 229 mm 
                                        case 31: m_pwidth = 114; m_pheight = 162; break;// 31 // Envelope C6, 114 x 162 mm 
                                        case 32: m_pwidth = 114; m_pheight = 229; break;// 32 // Envelope C65, 114 x 229 mm 
                                        case 33: m_pwidth = 250; m_pheight = 353; break;// 33 // Envelope B4, 250 x 353 mm 
                                        case 34: m_pwidth = 176; m_pheight = 250; break;// 34 // Envelope B5, 176 x 250 mm 
                                        case 35: m_pwidth = 176; m_pheight = 125; break;// 35 // Envelope B6, 176 x 125 mm 
                                        case 36: m_pwidth = 110; m_pheight = 230; break;// 36 // Envelope, 110 x 230 mm 
                                        // 37 // Envelope Monarch, 3 7/8 x 7 1/2 in. 
                                        // 38 // Envelope, 3 5/8 x 6 1/2 in. 
                                        // 39 // U.S. Standard Fanfold, 14 7/8 x 11 in. 
                                        // 40 // German Standard Fanfold, 8 1/2 x 12 in. 
                                        // 41 // German Legal Fanfold, 8 1/2 x 13 in. 
                                    }
                                if (readAttr(val, "print.orientation", "2") == "1") { int w = m_pwidth; m_pwidth = m_pheight; m_pheight = w; }

                                m_pmarg.left = cnv(int.Parse(readAttr(val, "print.margin.left", "0")), 'H');
                                m_pmarg.right = cnv(int.Parse(readAttr(val, "print.margin.right", "0")), 'H');
                                m_pmarg.top = cnv(int.Parse(readAttr(val, "print.margin.top", "0")), 'V');
                                m_pmarg.bottom = cnv(int.Parse(readAttr(val, "print.margin.bottom", "0")), 'V');

                                break;
                            //header(height=0 )
                            //summary(height=4 color="536870912" )
                            //footer(height=0 color="536870912" )
                            //detail(height=2520 color="536870912" )
                            //table(column=(type=char(12) updatewhereclause=yes name=ixp dbname="ixp"  )
                            case "table":
                                ParseTable(val);
                                break;
                            //text(name=org_adr_ulice_id band=detail font.charset="238" font.face="Arial CE" font.family="2" font.height="-8" font.pitch="2" font.weight="400" background.mode="1" background.color="553648127" color="0" alignment="0" border="0" x="1330" y="112" height="56" width="773" text="Novoměstská 321/123" )
                            case "text":
                                StartBody();
                                ParseText(val);
                                break;
                            //column(name=nazev_start_su band=detail id=39 x="1330" y="232" height="56" width="773" color="0" border="0" alignment="0" format="[general]" edit.autohscroll=no edit.autoselect=yes edit.autovscroll=no edit.case=any edit.codetable=no edit.displayonly=no edit.hscrollbar=no edit.imemode=0 edit.limit=0 edit.password=no edit.vscrollbar=no edit.validatecode=no edit.nilisnull=no edit.required=no criteria.required=no criteria.override_edit=no crosstab.repeat=no background.mode="1" background.color="536870912" font.charset="238" font.face="Arial CE" font.family="2" font.height="-8" font.pitch="2" font.weight="400" tabsequence=0 )
                            case "column":
                                StartBody();
                                ParseValueOf(val);
                                break;
                            //compute(name=text_psc_posta band=detail font.charset="238" font.face="Arial CE" font.family="2" font.height="-9" font.pitch="2" font.weight="700" background.mode="1" background.color="536870912" color="0" x="1033" y="1732" height="60" width="1349" format="[general]" expression="if ( len(st6)=5 , (Left(Trim(st6),3) + ' ' + Right(Trim(st6),2) + '  ' +  Trim(st5)) , ( Trim(st6) + '  ' + Trim(st5) ))" alignment="0" border="0" crosstab.repeat=no )
                            case "compute":
                                StartBody();
                                break;
                        }
                    }
                }
                CloseBody();
            }
            finally { if (m_xme != null) { m_xme.Dispose(); m_xme = null; } }
            m_out.WriteLine();
            m_out.WriteLine("</format>");
        }

        private void CloseBody()
        {
            for (int i = 0; i < m_level; i++)
            {
                WriteIndDec();m_out.WriteLine("</body>");
                WriteIndDec();m_out.WriteLine("</region>");
            }
        }

        private void StartBody()
        {
            if(m_started) return;
            m_started=true;

            string l_id; int l_maj, l_min;
            m_xme.getStructureVersion(out l_id, out l_maj, out l_min);
            m_out.WriteLine("<info ixs_xme='{0}' xmeta_ver='{1}' xmeta_subver_min='{2}' nazev='{3}' ixs_alv='?' poznamka='' ixs_frm='?' maker='?'/>",
                l_id, l_maj, l_min, m_Nazev);

            m_out.WriteLine("<paper-setting paper-width='{0}mm' paper-height='{1}mm' left-margin='{2}mm' right-margin='{3}mm' top-margin='{4}mm' bottom-margin='{5}mm'/>",
                m_pwidth, m_pheight, m_pmarg.left, m_pmarg.right, m_pmarg.top, m_pmarg.bottom);

            m_out.WriteLine();

            Gordic.Report.Implementation.IGRegion root = m_xme.getRoot() as Gordic.Report.Implementation.IGRegion;
            string[] names = new string[m_level+1];
            StartBody(root, 0, names);
            //string res = FindCol(root, name, 0);
            if (root != null)
                Marshal.ReleaseComObject(root);

            for (int i = 0; i < m_level; i++)
            {
                WriteIndInc(); m_out.WriteLine("<region name='{0}'>",names[i+1]);
                WriteIndInc(); m_out.WriteLine("<body>");
            }
        }

        private bool StartBody(Gordic.Report.Implementation.IGRegion reg, int level, string[] names)
        {
            string regname; reg.getName(out regname);
            names[level]=regname;
            if(level==m_level) return regname==m_reg;

            int cnt;
            reg.getChildrenCount(out cnt);
            for (int i = 0; i < cnt; i++)
            {
                Gordic.Report.Implementation.IGRegion ch;
                reg.getChild(i, out ch);
                bool res = StartBody(ch, level + 1, names);
                if (ch != null)
                    Marshal.ReleaseComObject(ch);
                if (res) return true;
            }
            return false;
        }

        private void ParseText(string val)
        {
            //text(name=org_adr_ulice_id band=detail font.charset="238" font.face="Arial CE" font.family="2" font.height="-8" font.pitch="2" font.weight="400" background.mode="1" background.color="553648127" color="0" alignment="0" border="0" x="1330" y="112" height="56" width="773" text="Novoměstská 321/123" )
            string text = readAttr(val, "text");
            int x = int.Parse(readAttr(val, "x"));
            int y = int.Parse(readAttr(val, "y"));
            int width = int.Parse(readAttr(val, "width"));
            int height = int.Parse(readAttr(val, "height"));

            OpenStyle(val);
            WriteInd(); m_out.WriteLine("<text rect='{1}'>{0}</text>", text, Rect(x, y, width, height));
            CloseStyle(val);
        }

        private void ParseValueOf(string val)
        {
            //name=nazev_start_su
            string name = readAttr(val, "name");

            //umazu _2 ci _3 na konci.
            if (Char.IsNumber(name[name.Length - 1]) && name[name.Length - 2] == '_')
                name = name.Substring(0, name.Length - 2);

            if(!m_Columns.ContainsKey(name))
                throw new GException(string.Format(string.Join(" ", GResources.GetResourceText(29450316), "'{0}'", GResources.GetResourceText(29450317)), name)); //RC 29450317 : nenalezena ve struktuře!

            int x = int.Parse(readAttr(val,"x"));
            int y = int.Parse(readAttr(val,"y"));
            int width = int.Parse(readAttr(val, "width"));
            int height = int.Parse(readAttr(val, "height"));

            //x="1330" y="232" height="56" width="773"
            //color="0" border="0" alignment="0"
            //format="[general]"
            //background.mode="1" background.color="536870912"
            //font.charset="238" font.face="Arial CE" font.family="2" font.height="-8" font.pitch="2" font.weight="400"
            OpenStyle(val);
            WriteInd(); m_out.WriteLine("<value-of name='{0}' rect='{1}'/>", m_Columns[name], Rect(x, y, width, height));
            CloseStyle(val);            
        }

        private void OpenStyle(string val)
        {
            string ff = readAttr(val, "font.face");
            int fs = Math.Abs(int.Parse(readAttr(val, "font.height")));
            bool fbold = int.Parse(readAttr(val, "font.weight", "0")) > 500;
            int forient = int.Parse(readAttr(val, "font.escapement", "0"));
            WriteIndInc(); m_out.Write("<style ");

            if (ff == "Arial CE") m_out.Write("font-face='arial' ");
            else if (ff == "Times New Roman") m_out.Write("font-face='times' ");
            else if (ff == "CKKrausSmall") m_out.Write("font-face='custom' font-name='CKGinisSmall' ");
            else if (ff == "CKKraus") m_out.Write("font-face='custom' font-name='CKGinis' ");
            else m_out.Write("font-face='custom' font-name='{0}' ", ff);

            m_out.Write("font-size='{0}pt' ", fs);
            if (fbold) m_out.Write("font-bold='true' ");
            if (forient != 0) m_out.Write("text-orientation='{0}' ", forient / 10);

            m_out.Write("padding='0' ");
            m_out.WriteLine(">");
        }
        private void CloseStyle(string val)
        {
            WriteIndDec(); m_out.WriteLine("</style>");
        }

        private string Rect(int x, int y, int w, int h)
        {
            string r = String.Format("{0}mm,{1}mm,{2}mm,{3}mm", cnv(x), cnv(y), cnv(x + w), cnv(y + h));
            return r;
            //return "0tw,0tw,11905tw,259tw";
        }

        private void ParseTable(string tab)
        {
            while (tab.Length > 0)
            {
                //aa=bb
                int i = tab.IndexOf('=');
                string key = tab.Substring(0, i).Trim();
                i++; while (Char.IsWhiteSpace(tab[i])) i++;
                int e;
                string val = readValue(tab, i, out e);
                tab = tab.Substring(e).TrimStart();

                switch (key)
                {
                    case "column":
                        ParseColumn(val);
                        break;
                }
            }
        }

        //column=(type=char(12) updatewhereclause=yes name=ixp dbname="ixp"  )
        private void ParseColumn(string col)
        {
            string name1 = readAttr(col, "dbname");

            Gordic.Report.Implementation.IGRegion root = m_xme.getRoot() as Gordic.Report.Implementation.IGRegion;
            string res = FindCol(root, name1, 0);
            if (root != null)
                Marshal.ReleaseComObject(root);
            if (res != null) m_Columns[name1] = res;
            
            string name2 = readAttr(col, "name");
            //umazu _2 ci _3 na konci.
            if (Char.IsNumber(name2[name2.Length - 1]) && name2[name2.Length - 2] == '_')
                name2 = name2.Substring(0, name2.Length - 2);

            if (name2 != name1) m_Columns[name2] = res;
        }

        private string FindCol(Gordic.Report.Implementation.IGRegion reg, string col, int level)
        {
            string regname; reg.getName(out regname);

            int cnt;
            reg.getDataItemCount(out cnt);
            for (int i = 0; i < cnt; i++)
            {
                Gordic.Report.Implementation.IGDataItem di;
                reg.getDataItem(i, out di);
                string name; di.getName(out name);
                string oldname; di.getAttribute("oldnames",out oldname);
                string description; di.getDescription(out description);
                if (di != null)
                    Marshal.ReleaseComObject(di);
                string res = regname + "." + name;


                if (String.Equals(name, col, StringComparison.InvariantCultureIgnoreCase)) { SetLevel(level, regname); return res; }
                if (oldname != null && Contains(col,oldname)) { SetLevel(level, regname); return res; }
            }

            reg.getChildrenCount(out cnt);
            for (int i = 0; i < cnt; i++)
            {
                Gordic.Report.Implementation.IGRegion ch;
                reg.getChild(i,out ch);
                string res = FindCol(ch, col, level+1);
                if (ch != null)
                    Marshal.ReleaseComObject(ch);
                if (res != null) return res;
            }

            return null;
        }

        private bool Contains(string col, string s)
        {
            int i =0;
            while (i<s.Length)
            {
                int i1 = s.IndexOf(col, i, StringComparison.InvariantCultureIgnoreCase);
                if (i1 < 0) return false;
                int i2 = i1 + col.Length;
                if (i1 == 0 || !Char.IsLetterOrDigit(s[i1 - 1]))
                    if (i2 == s.Length || !Char.IsLetterOrDigit(s[i2]))
                        return true;
                i = i2 + 1;
            }
            return false;
        }

        private void SetLevel(int level, string regname)
        {
            if (level > m_level)
            {
                m_level = level;
                m_reg = regname;
            }
        }

        private void WriteIndInc()
        {
            WriteInd();
            m_ind += 4;
        }
        private void WriteIndDec()
        {
            m_ind -= 4;
            WriteInd();
        }
        private void WriteInd()
        {
            m_out.Write("".PadLeft(m_ind,' '));
        }

        double cnv(int hodnota,char s)
        {
            int na_jednotky = 3;
            if (m_Units == na_jednotky) return hodnota;

            double[] v_miry = { 1000.0, 250.0, 2.604, 66.0/*mm*/ };
            double[] h_miry = { 1000.0, 219.0, 2.281, 57.8/*mm*/ };
            if(s=='H') return Math.Ceiling((hodnota * h_miry[na_jednotky] / h_miry[m_Units]));
            return Math.Ceiling((hodnota * v_miry[na_jednotky] / v_miry[m_Units]));
        }

        double cnv(int hodnota)
        {
            return cnv(hodnota, 'H');
        }

    }
}
