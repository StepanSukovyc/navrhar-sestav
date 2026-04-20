//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        GFEFormatRegion.cs                          </Name>
//    <Description> Parser formatu (ALF) - region               </Description>
//    <Author>      Ing. Martin Aliger                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025  </Copyright>
//    <Created>     2006-10-05                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Windows.Forms;
using Gordic.General;
using Gordic.GFE.Parsers.Dom;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// 
    /// </summary>
    public class GFEFormatRegion : GFEFormatTag
    {
        readonly string m_name;
        GFEFormat m_format;
        readonly GFEFormatRegion m_parent;
        List<GFEFormatTag> m_head;
        List<GFEFormatTag> m_body;
        List<GFEFormatTag> m_foot;
        List<GFEFormatGroup> m_groups;
        List<GFEFormatVariable> m_vars;
        object m_vr;

        public override string ToString()
        {
            return StringFromTag(TagName + " name=" + Name);
        }
        /// <summary>
        /// 
        /// </summary>
        public string Name { get { return m_name; } }

        /// <summary>
        /// Odkaz na formát
        /// </summary>
        public GFEFormat Format { get { return m_format; } }

        /// <summary>
        /// 
        /// </summary>
        public GFEFormatRegion Parent { get { return m_parent; } }

        /// <summary>
        /// 
        /// </summary>
        public List<GFEFormatTag> Head { get { return m_head; } }

        /// <summary>
        /// 
        /// </summary>
        public List<GFEFormatTag> Body { get { return m_body; } }

        /// <summary>
        /// 
        /// </summary>
        public List<GFEFormatTag> Foot { get { return m_foot; } }

        /// <summary>
        /// 
        /// </summary>
        public List<GFEFormatGroup> Groups { get { return m_groups; } }

        /// <summary>
        /// 
        /// </summary>
        public List<GFEFormatVariable> Variables { get { return m_vars; } }

        string datafullname;
        /// <summary>
        /// úplný název položky 
        /// </summary>
        public string DataFullName
        {
            get
            {
                if (string.IsNullOrEmpty(datafullname))
                    datafullname = GetFullName(this);

                return datafullname;
            }
        }

        /// <summary>
        /// Položka struktury
        /// </summary>
        public override object StructureItem
        {
            get
            {
                if (structureItem == null && getstructureitem != null)
                    structureItem = getstructureitem.Invoke(DataFullName);
                return structureItem;
            }
        }
        /// <summary>
        /// nastavení struktury regionu
        /// </summary>
        /// <param name="reg">region</param>
        public void SetStructureItem(GFERegion reg)
        {
            structureItem = reg;
        }

        /// <summary>
        /// Získání úplného názvu regionu
        /// </summary>
        /// <param name="re">Informace o formátu regionu</param>
        /// <returns>Úplný název regionu od vìtve ROOT</returns>
        string GetFullName(GFEFormatRegion re)
        {
            // zafixujeme nadøazený region
            GFEFormatRegion region = re.Region;
            // prozatimní název regionu je...
            string result = re.Name;
            // pokud nadøazeným regionem není hlavní region a jeho název není NULL
            while (region != null
                && (!string.Equals(region.Name, "ROOT", StringComparison.InvariantCultureIgnoreCase)))
            {
                result = string.Format("{0}.{1}", region.Name, result);
                region = region.Region;
            }
            return result;
        }

        public bool RunOnlyIf(DataRegion dr, IPage page)
        {
            if (dr.ScriptManager == null) throw new ArgumentOutOfRangeException();
            var l_script = Attributes.GetValueDefault("only-if", "");
            if (l_script.Length == 0) return true;

            using (var s = dr.ScriptManager.PrepareExpression(this, "only-if", l_script, dr.GetDataRow(0), dr.Manager, page))
            {
                using (var ret = dr.ScriptManager.RunExpression(s))
                {
                    return ret != null && ret.ToInt() != 0;
                }
            }
        }

        /// <summary>
        /// Vizuální region, prezentující daný formát
        /// </summary>
        public object VisualRegion { get { return m_vr; } set { m_vr = value; } }

        internal GFEFormatRegion(GFEFormat format, GFEFormatRegion p, Gordic.Report.Implementation.IGFormatRegion r, Gordic.Report.Implementation.IGFormatDevTools dev)
            : base(p, (Gordic.Report.Implementation.IGFormatTag)r, dev)
        {
            m_format = format;
            if (
                m_format.FormattingGroup != "GRF"
                && m_format.FormattingGroup != "GRR"
                && m_format.FormattingGroup != "RTF"
                && m_format.FormattingGroup != "MSE"
                && m_format.FormattingGroup != "OXS"
                )
            {
                MessageBox.Show(string.Format(string.Join(" ", GResources.GetResourceText(29450003), "{0}", GResources.GetResourceText(29450164)), //RC 29450164 : není podporován!
                    m_format.FormattingGroup), GResources.GetResourceText(29450004), MessageBoxButtons.OK, MessageBoxIcon.Information); //RC 29450004 : Informace
                return;
            }

            m_parent = p;
            r.getName(out m_name);
            r.getHeadCount(out int hc);
            m_head = new List<GFEFormatTag>(hc);
            for (int i = 0; i < hc; i++)
            {
                Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(r.getHead(i, out Report.Implementation.IGFormatTag t));
                try
                {
                    m_head.Add(GFEFormatTag.Create(this, t, dev));
                } // end try
                finally
                {
                    //Marshal.ReleaseComObject(t);
                } // end finally
            } // end for
            r.getBodyCount(out int bc);
            m_body = new List<GFEFormatTag>(bc);
            for (int i = 0; i < bc; i++)
            {
                Report.Interface.GUnsafeRepWrapper.Throw06Error(r.getBody(i, out Report.Implementation.IGFormatTag t));
                try
                {
                    m_body.Add(GFEFormatTag.Create(this, t, dev));
                } // end try
                finally
                {
                    //Marshal.ReleaseComObject(t);
                } // end finally
            } // end for
            r.getFootCount(out int fc);
            m_foot = new List<GFEFormatTag>(fc);
            for (int i = 0; i < fc; i++)
            {
                Report.Interface.GUnsafeRepWrapper.Throw06Error(r.getFoot(i, out Report.Implementation.IGFormatTag t));
                try
                {
                    m_foot.Add(GFEFormatTag.Create(this, t, dev));
                } // end try
                finally
                {
                    //Marshal.ReleaseComObject(t);
                } // end finally
            } // end for
            r.getGroupCount(out int gc);
            m_groups = new List<GFEFormatGroup>(gc);
            for (int i = 0; i < gc; i++)
            {
                Report.Interface.GUnsafeRepWrapper.Throw06Error(r.getGroup(i, out Report.Implementation.IGFormatGroup g));
                try
                {
                    m_groups.Add(new GFEFormatGroup(this, g, dev));
                } // end try
                finally
                {
                    Marshal.ReleaseComObject(g);
                } // end finally
            } // end for
            r.getVariableCount(out int vc);
            m_vars = new List<GFEFormatVariable>(vc);
            for (int i = 0; i < vc; i++)
            {
                Report.Interface.GUnsafeRepWrapper.Throw06Error(r.getVariable(i, out Report.Implementation.IGFormatVariable v));
                try
                {
                    m_vars.Add(new GFEFormatVariable(this, v));
                } // end try
                finally
                {
                    Marshal.ReleaseComObject(v);
                } // end finally
            } // end for
        } // end method

        internal GFEFormatRegion(GFEFormatRegion p, Gordic.Report.Implementation.IGFormatRegion r, Gordic.Report.Implementation.IGFormatDevTools dev)
            : this(p.Format, p, r, dev)
        {
        }

        internal GFEFormatRegion(GFEFormat format, Gordic.Report.Implementation.IGFormatRegion r, Gordic.Report.Implementation.IGFormatDevTools dev)
            : this(format, null, r, dev)
        {
        }

        /// <summary>
        /// uvolnìní regionu
        /// </summary>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                m_vr = null;

                if (m_head != null)
                    foreach (GFEFormatTag t in m_head)
                        t.Dispose();

                if (m_body != null)
                    foreach (GFEFormatTag t in m_body)
                        t.Dispose();

                if (m_foot != null)
                    foreach (GFEFormatTag t in m_foot)
                        t.Dispose();

                if (m_groups != null)
                    foreach (GFEFormatGroup g in m_groups)
                        g.Dispose();

                if (m_vars != null)
                    foreach (GFEFormatVariable v in m_vars)
                        v.Dispose();
            }

            base.Dispose(disposing);
        }

        internal void RegisterNamedComponent(Gordic.GFE.Parsers.Dom.INamedComponent tag)
        {
            m_format.RegisterNamedComponent(tag);
        }
        internal void UnregisterNamedComponent(Gordic.GFE.Parsers.Dom.INamedComponent tag)
        {
            m_format.UnregisterNamedComponent(tag);
        }

        public bool Is(string regionName) => string.Equals(this.Name, regionName, StringComparison.OrdinalIgnoreCase);
        public bool HasChild(string regionName) => this.Body != null && this.Body.Find(t => (t is GFEFormatRegion r) && r.Is(regionName)) != null;
        public bool HasChildRecursive(string regionName)
        {
            if (Is(regionName)) return true;
            foreach (var r in this.Body.OfType<GFEFormatRegion>())
                if (r.HasChildRecursive(regionName)) return true;
            return false;
        }

        public GFEFormatGRRLine LastLine()
        {
            var last = Foot.LastOrDefault();
            if (last is GFEFormatGRRLine l1) return l1;

            last = Body.LastOrDefault();
            if (last is GFEFormatGRRLine l2) return l2;
            if (last is GFEFormatRegion r) return r.LastLine();

            last = Head.LastOrDefault();
            if (last is GFEFormatGRRLine l3) return l3;

            return null;
        }

    }
}
