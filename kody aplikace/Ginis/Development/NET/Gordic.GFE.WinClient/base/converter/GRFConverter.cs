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
    public class GRFConverter : IDisposable
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
        ~GRFConverter() { Dispose(false); }
        #endregion
        /// <exclude/>
        public static double mm2tw(double a)
        {
            return Math.Ceiling((a * 14400) / 254);
        }

        class Formatter : Report.Implementation.IPageInformation, Report.Implementation.IMetrics
        {
            internal int m_pw, m_ph;
            internal Gordic.Report.Implementation.Grr06Widths m_pmargs;

            public int getPageBounds(out Gordic.Report.Implementation.GrrRect pbounds)
            {
                pbounds = new Gordic.Report.Implementation.GrrRect();
                pbounds.left = 0;// m_pmargs.left;
                pbounds.top = 0;// m_pmargs.top;
                pbounds.right = m_pw - m_pmargs.right - m_pmargs.left;
                pbounds.bottom = m_ph - m_pmargs.bottom - m_pmargs.top;
                return 0;
            }

            public int getPaperSize(out Gordic.Report.Implementation.GrrSize psize)
            {
                psize = new Gordic.Report.Implementation.GrrSize();
                psize.width = m_pw;
                psize.height = m_ph;
                return 0;
            }

            public int computeTextSize(string text, Gordic.Report.Implementation.IGFormatGRRCellStyle style, out double aw, out double ah)
            {
                int fs;
                style.getFontSize(out fs);

                aw = 0;
                ah = fs * 1.115; //vyska podle fontu (+0,115 line leading)
                return 0;
            }

            public int getCalcHandle(out IntPtr rdc)
            {
                throw new NotImplementedException();
            }
        }

        GUnsafeRepWrapper.GReporterStructure m_xme;
        GUnsafeRepWrapper.GReporterFormat m_frm;
        GUnsafeRepWrapper.GReporterData m_dat;
        Report.Implementation.IPageCache m_pc;

        class s_reg
        {
            public Gordic.Report.Implementation.IGRegion sreg; //akt.region
            public Gordic.Report.Implementation.GrrRect crect; //zpocteny rect akt.regionu
            public int crpos; //pozice kam zapsat rect aktualniho regionu
            public int ccount;
            string sname;
            public int page1;
            public int page2;

            public s_reg(Gordic.Report.Implementation.IGRegion sreg, string sname) { this.sname = sname; this.sreg = sreg; this.crect = new Gordic.Report.Implementation.GrrRect(); this.crpos = -1; this.ccount = 0; this.page1 = this.page2 = 0; }
            public override string ToString() { return "REG " + sname; }

            internal void UpdateRect(Gordic.Report.Implementation.GrrRect b, int page)
            {
                if (crect.left == 0 && crect.right == 0) { crect = b; this.page1 = this.page2 = page; return; } //empty

                if (page < page2) throw new ArgumentOutOfRangeException();
                if (page > page2) page2 = page;
                else
                {
                    crect.left = Math.Min(crect.left, b.left);
                    crect.top = Math.Min(crect.top, b.top);
                }
                crect.right = Math.Max(crect.right, b.right);
                crect.bottom = Math.Max(crect.bottom, b.bottom);
            }

            internal void UpdateCont(Gordic.Report.Implementation.GrrRect b, int page)
            {
                ccount++;
                UpdateRect(b, page);
            }
        };
        Stack<s_reg> m_regs = new Stack<s_reg>();

        int m_ind;

        StringWriter m_out = new StringWriter();

        Formatter m_formatter;
//        int m_pcount = 0;

        /// <summary>TODO</summary>
        public GRFConverter(string xme)
        {
            m_formatter = new Formatter();
            m_xme = GUnsafeRepWrapper.OpenStructure(xme);
        }

        /// <summary>
        /// 
        /// </summary>
        public string Output
        {
            get { return m_out.ToString(); }
        }

        private string CreateTempData(GUnsafeRepWrapper.GReporterStructure xme)
        {
            string l_fname = Path.GetTempFileName();
            using (StreamWriter sw = File.CreateText(l_fname))
            {
                string id;
                int maj,min;
                xme.getStructureVersion(out id,out maj, out min);
                sw.WriteLine("ixs_xme|{0}|{1}|{2}|", id, maj, min);

                Gordic.Report.Implementation.IGRegion reg = xme.getRoot() as Gordic.Report.Implementation.IGRegion;
                CreateDataRef(reg, sw);
            }
            return l_fname;
        }

        private void CreateData(Gordic.Report.Implementation.IGRegion reg, StreamWriter sw)
        {
            string name; reg.getName(out name);
            sw.Write(name);
            sw.Write('|');

            int c; reg.getDataItemCount(out c);
            for (int i = 0; i < c; i++)
            {
                sw.Write('|');
                //Gordic.Report.Implementation.IGDataItem di;
                //reg.getDataItem(i, out di);
            }
            sw.WriteLine();
            CreateDataRef(reg, sw);
        }

        private void CreateDataRef(Gordic.Report.Implementation.IGRegion reg, StreamWriter sw)
        {
            int c; reg.getChildrenCount(out c);
            for (int i = 0; i < c; i++)
            {
                Gordic.Report.Implementation.IGRegion cr;
                reg.getChild(i, out cr);
                CreateData(cr, sw);
            }
        }


        /// <summary>TODO</summary>
        public void ConvertGRRFormat(string format)
        {
            m_frm = GUnsafeRepWrapper.OpenFormat(format);
            if (m_frm.GetFormatGroup() != "GRR") throw new GArgumentException(GResources.GetResourceText(29450310)); //RC 29450310 : Vyžadována sestava formátu GRR!

            m_out.WriteLine("<?xml version='1.0' encoding='utf-8' ?>");
            m_out.WriteLine("<format xmlns='http://www.gordic.cz/TR/alf/1.4' type='grf'>");
            m_out.WriteLine();

            using(Gordic.Report.Interface.GUnsafeRepWrapper.GInfoList infos = m_frm.getAllInfo())
                for (int i = 0; i < infos.Count; i++)
                {
                    string name,value;
                    infos.getItem(i, out name, out value);
                    m_out.WriteLine("<info {0}='{1}'/>", name, value);
                }

            m_frm.Format.getPaperSize(out m_formatter.m_pw, out m_formatter.m_ph);
            if (m_formatter.m_pw == 0) m_formatter.m_pw = 210;
            if (m_formatter.m_ph == 0) m_formatter.m_ph = 297;
            m_formatter.m_pw = (int)mm2tw(m_formatter.m_pw);
            m_formatter.m_ph = (int)mm2tw(m_formatter.m_ph);

            m_frm.Format.getPaperMargins(out m_formatter.m_pmargs);
            if (m_formatter.m_pmargs.left == 0) m_formatter.m_pmargs.left = 10;
            if (m_formatter.m_pmargs.top == 0) m_formatter.m_pmargs.top = 10;
            if (m_formatter.m_pmargs.right == 0) m_formatter.m_pmargs.right = 10;
            if (m_formatter.m_pmargs.bottom == 0) m_formatter.m_pmargs.bottom = 10;
            m_formatter.m_pmargs.left = (int)mm2tw(m_formatter.m_pmargs.left);
            m_formatter.m_pmargs.top = (int)mm2tw(m_formatter.m_pmargs.top);
            m_formatter.m_pmargs.right = (int)mm2tw(m_formatter.m_pmargs.right);
            m_formatter.m_pmargs.bottom = (int)mm2tw(m_formatter.m_pmargs.bottom);
  
            string l_temp = CreateTempData(m_xme);
            try
            {
                m_dat = GUnsafeRepWrapper.OpenData(l_temp, m_xme, m_frm);

                Guid g = typeof(Gordic.Report.Implementation.IPageCache).GUID;
                object ret;
                GUnsafeRepWrapper.Throw08Error(GUnsafeRepWrapper.grr08_CreatePageCache(
                    m_dat.Data,
                    m_formatter, m_formatter,
                    ref g, out ret
                    ));

                m_ind = 0;
                m_pc = ret as Gordic.Report.Implementation.IPageCache;
                int l_pcount; m_pc.getPageCount(out l_pcount);

                Gordic.Report.Implementation.IGRegion sroot = m_xme.getRoot() as Gordic.Report.Implementation.IGRegion;
                if (sroot != null)
                    Marshal.ReleaseComObject(sroot);
                m_regs.Push(new s_reg(sroot, "ROOT"));

                m_out.WriteLine("<paper-setting paper-width='{0}tw' paper-height='{1}tw' left-margin='{2}tw' right-margin='{3}tw' top-margin='{4}tw' bottom-margin='{5}tw'{6}/>",
                    m_formatter.m_pw, m_formatter.m_ph, m_formatter.m_pmargs.left, m_formatter.m_pmargs.top, m_formatter.m_pmargs.right, m_formatter.m_pmargs.bottom,
                    l_pcount > 1 ? String.Format(" page-count='{0}'", l_pcount) : ""
                    );

                m_out.WriteLine();
                m_out.WriteLine();

                for (int i = 0; i < l_pcount; i++)
                {
                    Gordic.Report.Implementation.IPage pp;
                    m_pc.getPage(i, out pp);
                    ExportPage(i + 1, pp);
                    if (pp != null)
                        Marshal.ReleaseComObject(pp);
                }

                while (true)
                {
                    s_reg sr = m_regs.Peek();
                    if (sr.sreg != sroot) CloseReg();
                    else break;
                }

                if (ret != null)
                    Marshal.ReleaseComObject(ret);
                m_out.WriteLine();
                m_out.WriteLine("</format>");
            }
            finally
            {
                if (m_dat != null) { m_dat.Dispose(); m_dat = null; }
                if (m_frm != null) { m_frm.Dispose(); m_frm = null; }
                if (m_xme != null) { m_xme.Dispose(); m_xme = null; }
                File.Delete(l_temp);
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

        private static Report.Implementation.IGRegion _OpenReg(Gordic.Report.Implementation.IGRegion greg, string sname)
        {
            Gordic.Report.Implementation.IGRegion sreg;
            greg.getChildByName(sname, out sreg);
            if (sreg == null) //neni primy potomek
            {
                int cnt;
                greg.getChildrenCount(out cnt);
                for (int i = 0; i < cnt; i++)  //zkusim jeste vsechny deti, jestli to neni jejich potomek (vicenasobne zanoreni)
                {
                    greg.getChild(i, out sreg);
                    if (sreg != null)
                        Marshal.ReleaseComObject(sreg);
                    Gordic.Report.Implementation.IGRegion chreg = _OpenReg(sreg, sname);
                    if (chreg != null) return chreg;
                }
                return null;
            }
            return sreg;
        }

        private void _OpenReg2(Report.Implementation.IGRegion greg, Gordic.Report.Implementation.IGRegion sreg)
        {
            Gordic.Report.Implementation.IGRegion preg;
            IntPtr areg; sreg.getParentBorrowed(out areg); preg = (Gordic.Report.Implementation.IGRegion)Marshal.GetObjectForIUnknown(areg);
            if (preg != greg) _OpenReg2(greg, preg);

            string sname; sreg.getName(out sname);
            WriteIndInc(); m_out.Write("<region name='{0}'", sname);
            m_out.Flush();
            int l_crpos = m_out.GetStringBuilder().Length;
            m_out.WriteLine(">");
            WriteIndInc(); m_out.WriteLine("<body>");
            m_regs.Push(new s_reg(sreg, sname) { crpos = l_crpos });
        }

        private bool OpenReg(string sname)
        {
            Gordic.Report.Implementation.IGRegion sreg = _OpenReg(m_regs.Peek().sreg, sname);
            if (sreg == null) return false;
            _OpenReg2(m_regs.Peek().sreg, sreg);
            return true;
        }

        private void CloseReg()
        {
            s_reg sr = m_regs.Pop();
            Gordic.Report.Implementation.IGRegion preg;
            IntPtr areg; sr.sreg.getParentBorrowed(out areg); preg = (Gordic.Report.Implementation.IGRegion)Marshal.GetObjectForIUnknown(areg);

            if (preg == null) throw new GArgumentOutOfRangeException(GResources.GetResourceText(29450311)); //RC 29450311 : Chybné vnoření regionů!
            if (preg != m_regs.Peek().sreg) throw new GArgumentOutOfRangeException(GResources.GetResourceText(29450312) + " (2)!"); //RC 29450312 : Chybné vnoření regionů

            WriteIndDec(); m_out.WriteLine("</body>");
            WriteIndDec(); m_out.WriteLine("</region>");
            if (sr.ccount > 0)
            {
                m_out.Flush();
                string ins = " rect='" + FormatRect(sr.crect) + "'";

                if (sr.page1 != sr.page2) throw new GArgumentOutOfRangeException(GResources.GetResourceText(29450313)); //RC 29450313 : Nelze konvertovat oblast přesahující více stran!
                if (sr.page1 > 1)
                    ins += String.Format(" page='{0}'", sr.page1);

                m_out.GetStringBuilder().Insert(sr.crpos, ins);
            }
            if (sr.sreg != null)
                Marshal.ReleaseComObject(sr.sreg);
            m_regs.Peek().UpdateRect(sr.crect, sr.page2);
        }

        int m_pagenum = 0;
        private void ExportPage(int num, Gordic.Report.Implementation.IPage page)
        {
            m_pagenum = num;
            int cnt;
            page.getContainerCount(out cnt);
            for (int i = 0; i < cnt; i++)
            {
                Gordic.Report.Implementation.GrrRect l_bounds;
                Gordic.Report.Implementation.IPageContainer l_pc;
                page.getContainer(i, out l_bounds, out l_pc);
                ExportContainer(l_pc, l_bounds);
                if (l_pc != null)
                    Marshal.ReleaseComObject(l_pc);
            }
        }

        private void ExportContainer(Gordic.Report.Implementation.IPageContainer pc, Gordic.Report.Implementation.GrrRect bounds)
        {
            Gordic.Report.Implementation.IGFormatRegion freg;
            Gordic.Report.Implementation.IGRegion sreg;
            pc.getRegion(out freg);
            freg.getStructureRegion(out sreg);
            if (freg != null)
                Marshal.ReleaseComObject(freg);
            if (sreg != m_regs.Peek().sreg)
            {
                string sname; sreg.getName(out sname);
                while (true)
                {
                    if (OpenReg(sname)) break;
                    CloseReg();
                }
             
                if (sreg != null)
                    Marshal.ReleaseComObject(sreg);
            }
            ExportContainer2(pc, bounds);
        }

        private void ExportContainer2(Gordic.Report.Implementation.IPageContainer pc, Gordic.Report.Implementation.GrrRect bounds)
        {
            //Gordic.Report.Implementation.IGFormatContent tag = pc as Gordic.Report.Implementation.IGFormatContent;
            //IntPtr atxt; tag.getTagName(out atxt);
            //string tagname = Marshal.PtrToStringAnsi(atxt);

            int cnt;
            pc.getContentCount(out cnt);

            bool isEmpty = true;
            for (int i = 0; i < cnt; i++)
            {
                Gordic.Report.Implementation.GrrRect l_bounds;
                object oo;
                Gordic.Report.Implementation.IPageRenderingInfo info;
                pc.getContent2(i, out l_bounds, out oo, out info);
                if (ExportContent(l_bounds, bounds, oo, info)) isEmpty = false;
                if (oo != null)
                    Marshal.ReleaseComObject(oo);
                if (info != null) 
                    Marshal.ReleaseComObject(info);
            }

            if(isEmpty)//if (cnt == 0)
            {
                ExportEmptyContainer(pc as Gordic.Report.Implementation.IGFormatContent, ref bounds);
                return;
            }

        }

        private void ExportEmptyContainer(Gordic.Report.Implementation.IGFormatContent pc, ref Gordic.Report.Implementation.GrrRect bounds)
        {
            bool gotIntStyle = false;
            Gordic.Report.Implementation.IGFormatGRRCellStyle st;
            pc.getStyle(out st);
            if (st != null)
            {
                Gordic.Report.Implementation.IGAttrList sts;
                st.getStyleAttributes(out sts);
                int cnt; sts.getCount(out cnt);
                for (int i = 0; gotIntStyle == false && i < cnt; i++)
                {
                    string name, _val;
                    sts.getItem(i, out name, out _val);

                    if (name.Contains("border")) gotIntStyle = true;
                    else if (name.Contains("background")) gotIntStyle = true;
                }
                if (sts != null)
                    Marshal.ReleaseComObject(sts);
                if (st != null)
                    Marshal.ReleaseComObject(st);
            }
            if (gotIntStyle)
            {
                //vlozeni prazdneho textoveho policka
                using (ExportStyle(pc))
                {
                    WriteInd(); m_out.Write("<text value='' ");
                    ExportRect(bounds);
                    m_out.WriteLine("/>");
                }
            }
            m_regs.Peek().UpdateCont(bounds, m_pagenum);
        }

        private bool ExportContent(Gordic.Report.Implementation.GrrRect lbounds, Gordic.Report.Implementation.GrrRect pbounds, object content, Gordic.Report.Implementation.IPageRenderingInfo pi)
        {
            Gordic.Report.Implementation.IGFormatContent tag = content as Gordic.Report.Implementation.IGFormatContent;
            string tagname; tag.getTagName(out tagname);

            System.Diagnostics.Debug.Assert(pbounds.left-lbounds.left < pbounds.right-lbounds.right);

            if (tagname == "table")
                return false;
            if (tagname == "textbox")
            {
                Gordic.Report.Implementation.IGFormatTag chtag;
                tag.getChild(0, out chtag);
                //IntPtr atxt; tag.getTagName(out atxt);
                //string tagname = Marshal.PtrToStringAnsi(atxt);
                try { return ExportContent(lbounds, pbounds, chtag, pi); }
                finally
                {
                    if (chtag != null)
                        Marshal.ReleaseComObject(chtag);
                }
            }

            //if (content is Gordic.Report.Implementation.IPageContainer)
            //{
            //    m_out.Write("<{0}", tagname);
            //    ExportContainer2(content as Gordic.Report.Implementation.IPageContainer,
            //        new Gordic.Report.Implementation.GrrRect()
            //        {
            //            left = pbounds.left + lbounds.left,
            //            top = pbounds.top + lbounds.top,
            //            right = pbounds.left + lbounds.right,
            //            bottom = pbounds.top + lbounds.bottom
            //        }
            //        );
            //    m_out.WriteLine("/>");
            //    return;
            //}

            using (ExportStyle(tag))
            {
                WriteInd(); m_out.Write("<{0}", tagname);
                Gordic.Report.Implementation.IGAttrList atrs; tag.getAttributes(out atrs); ExportAttributes(atrs);
                if (atrs != null)
                    Marshal.ReleaseComObject(atrs);
                ExportRect(pbounds);
                m_out.WriteLine("/>");
            }
            m_regs.Peek().UpdateCont(pbounds, m_pagenum);
            return true;
        }

        private void ExportRect(Gordic.Report.Implementation.GrrRect b)
        {
            m_out.Write(" rect='{0}'", FormatRect(b));
            if (m_pagenum > 1)
                m_out.Write(" page='{0}'", m_pagenum);
        }
        private string FormatRect(Gordic.Report.Implementation.GrrRect b)
        {
            System.Diagnostics.Debug.Assert(b.right > b.left);
            System.Diagnostics.Debug.Assert(b.bottom > b.top);
            return String.Format("{0}tw,{1}tw,{2}tw,{3}tw", Math.Truncate(b.left), Math.Truncate(b.top), Math.Truncate(b.right), Math.Truncate(b.bottom));
        }

        internal void ExportAttributes(Gordic.Report.Implementation.IGAttrList ats)
        {
            int cnt; ats.getCount(out cnt);
            for (int i = 0; i < cnt; i++)
            {
                string name, val;
                ats.getItem(i, out name, out val);
                m_out.Write(" {0}='{1}'", name, MangleAttrValue(val));
            }
        }

        private string MangleAttrValue(string v)
        {
            StringBuilder s = new StringBuilder(v.Length);
            foreach (char c in v)
            {
                switch (c)
                {
                    case '\'': s.Append("&apos;"); break;
                    case '\n': s.Append("&#10;"); break;
                    case '\r': break;
                    case '<': s.Append("&lt;"); break;
                    case '>': s.Append("&gt;"); break;
                    default: s.Append(c); break;
                }
            }
            return s.ToString();
        }

        private class StyleExporter : IDisposable
        {
            bool m_nostyle = false;
            GRFConverter m_cnv;
            public StyleExporter(GRFConverter cnv, Gordic.Report.Implementation.IGFormatContent c)
            {
                Gordic.Report.Implementation.IGFormatGRRCellStyle st;
                Gordic.Report.Implementation.IGAttrList sts;
                c.getStyle(out st);
                if (st == null) { m_nostyle = true; return; }

                m_cnv = cnv;
                m_cnv.WriteIndInc(); m_cnv.m_out.Write("<style");

                st.getStyleAttributes(out sts);
                int cnt; sts.getCount(out cnt);
                for (int i = 0; i < cnt; i++)
                {
                    string name, val;
                    sts.getItem(i, out name, out val);
                    val = m_cnv.MangleAttrValue(val);

                    if (name == "width") continue;
                    if (name == "height") continue;
                    if (name.Contains("spacing")) continue;
                    m_cnv.m_out.Write(" {0}='{1}'", name, val);
                }
                if (sts != null)
                    Marshal.ReleaseComObject(sts);
                if (st != null)
                    Marshal.ReleaseComObject(st);

                m_cnv.m_out.WriteLine(">");
            }
            public void Dispose()
            {
                if (!m_nostyle)
                    m_cnv.WriteIndDec(); m_cnv.m_out.WriteLine("</style>");
            }
        }
        private StyleExporter ExportStyle(Gordic.Report.Implementation.IGFormatContent c)
        {
            return new StyleExporter(this, c);
        }
    }
}
