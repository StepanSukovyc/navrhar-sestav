//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        GFEFormatTag.cs                             </Name>
//    <Description> Parser formatu (ALF) - predek vsech tagu    </Description>
//    <Author>      Ing. Martin Aliger                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025  </Copyright>
//    <Created>     2006-10-05                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;
using System.Runtime.InteropServices;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Tøídy neznamých tagù 
    /// </summary>
    [ComVisible(false)]
    public class GfeFormatTags : List<GFEFormatTag>, IDisposable
    {
        /// <summary>
        /// Prázdný konstruktor tøídy 
        /// </summary>
        public GfeFormatTags() { }
        /// <summary>
        /// Inicializuje novou instanci tøídy, která je prázdná a má zadanou poèáteèní kapacitu
        /// </summary>
        /// <param name="cnt">Poèáteèní kapacita</param>
        public GfeFormatTags(int cnt)
            : base(cnt)
        {
        }

        #region IDisposable Members

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
                foreach (GFEFormatTag t in this)
                    t.Dispose();
        }
        ~GfeFormatTags() { Dispose(false); }
        #endregion
    }

    /// <summary>
    /// 
    /// </summary>
    public abstract class GFEFormatTag : IDisposable, Dom.IScriptOwner
    {
        /// <summary>
        /// prázdný formát
        /// </summary>
        public static GFEFormatTag Empty { get => null; }

        internal static GFEFormatTag Create(GFEFormatRegion reg, Gordic.Report.Implementation.IGFormatTag t)
        {
            Gordic.Report.Implementation.IGFormatDevTools l_dev = reg.Format.Native as Gordic.Report.Implementation.IGFormatDevTools;
            return Create(reg, t, l_dev);
        }

        internal static GFEFormatTag Create(GFEFormatRegion reg, Gordic.Report.Implementation.IGFormatTag t, Gordic.Report.Implementation.IGFormatDevTools dev)
        {
            GFEFormatTag res = _Create(reg, t, dev);

            //grf rect handling
            GFEFormatGRF grf = reg != null ? reg.Format as GFEFormatGRF : null;
            if (grf != null)
            {
                res.m_grfRect = grf.GetRect(t);
                //res.m_grfRowIndex = grf.GetRowIndex(t);
            }
            if (res.NativeContent != t) Marshal.ReleaseComObject(t);
            return res;
        }

        internal static GFEFormatTag CreateBorrowed(GFEFormatRegion reg, Gordic.Report.Implementation.IGFormatTag t, Gordic.Report.Implementation.IGFormatDevTools dev)
        {
            var res = Create(reg, t, dev);
            res.NativeContent = null;
            return res;
        }

        private static GFEFormatTag _Create(GFEFormatRegion reg, Gordic.Report.Implementation.IGFormatTag t, Gordic.Report.Implementation.IGFormatDevTools dev)
        {

            if (t is Gordic.Report.Implementation.IGFormatRegion) return new GFEFormatRegion(reg, (Gordic.Report.Implementation.IGFormatRegion)t, dev); // end if

            //GRR
            if (t is Gordic.Report.Implementation.IGFormatGRRCell) return new GFEFormatGRRCell((Gordic.Report.Implementation.IGFormatGRRCell)t, reg, dev);
            if (t is Gordic.Report.Implementation.IGFormatGRRLine) return new GFEFormatGRRLine(reg, (Gordic.Report.Implementation.IGFormatGRRLine)t, dev);

            if (t is Gordic.Report.Implementation.IGFormatContentBarcode) return new GFEFormatContentBarcode(reg, (Gordic.Report.Implementation.IGFormatContentBarcode)t, dev);
            if (t is Gordic.Report.Implementation.IGFormatContentChart) return new GFEFormatContentChart(reg, (Gordic.Report.Implementation.IGFormatContentChart)t, dev);
            if (t is Gordic.Report.Implementation.IGFormatContentDrawing) return new GFEFormatContentDrawing(reg, (Gordic.Report.Implementation.IGFormatContentDrawing)t, dev);
            if (t is Gordic.Report.Implementation.IGFormatContentImage) return new GFEFormatContentImage(reg, (Gordic.Report.Implementation.IGFormatContentImage)t, dev);

            if (t is Gordic.Report.Implementation.IGFormatContentText) return new GFEFormatContentText(reg, (Gordic.Report.Implementation.IGFormatContentText)t, dev);
            if (t is Gordic.Report.Implementation.IGFormatContentValue) return new GFEFormatContentValue(reg, (Gordic.Report.Implementation.IGFormatContentValue)t, dev);
            if (t is Gordic.Report.Implementation.IGFormatContentTable) return new GFEFormatContentTable(reg, (Gordic.Report.Implementation.IGFormatContentTable)t, dev);
            if (t is Gordic.Report.Implementation.IGFormatContentTextbox)
            {
                if (reg.Format is GFEFormatGRF)
                {
                    Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(((Gordic.Report.Implementation.IGFormatContentTextbox)t).getContent(0, out Report.Implementation.IGFormatContent cc));
                    if (cc is Gordic.Report.Implementation.IGFormatContentText) return new GFEFormatContentText(reg, (Gordic.Report.Implementation.IGFormatContentText)cc, dev);
                    if (cc is Gordic.Report.Implementation.IGFormatContentValue) return new GFEFormatContentValue(reg, (Gordic.Report.Implementation.IGFormatContentValue)cc, dev);
                    Marshal.ReleaseComObject(cc);
                }
                return new GFEFormatContentTextbox(reg, (Gordic.Report.Implementation.IGFormatContentTextbox)t, dev);
            }
            if (t is Gordic.Report.Implementation.IGFormatContentSelect) return new GFEFormatContentSelect(reg, (Gordic.Report.Implementation.IGFormatContentSelect)t, dev);
            if (t is Gordic.Report.Implementation.IGFormatContentPar) return new GFEFormatContentPar(reg, (Gordic.Report.Implementation.IGFormatContentPar)t, dev);

            //GRF
            if (t is Gordic.Report.Implementation.IGFormatGrfBlock) return new GFEFormatGRFBlock(reg, (Gordic.Report.Implementation.IGFormatGrfBlock)t, dev);
            if (t is Gordic.Report.Implementation.IGFormatGrfContainer) return new GFEFormatGRFPart(reg, (Gordic.Report.Implementation.IGFormatGrfContainer)t, dev);
            
            //RTF
            if (t is Gordic.Report.Implementation.IGFormatRTFItem) return new GFEFormatRTFItem(reg, (Gordic.Report.Implementation.IGFormatRTFItem)t, dev);
            if (t is Gordic.Report.Implementation.IGFormatRTFRTF) return new GFEFormatRTFRtf(reg, (Gordic.Report.Implementation.IGFormatRTFRTF)t, dev);
            if (t is Gordic.Report.Implementation.IGFormatRTFRow) return new GFEFormatRTFRow(reg, (Gordic.Report.Implementation.IGFormatRTFRow)t, dev);

            if (t is Gordic.Report.Implementation.IGScript) return new GFEScript(reg, (Gordic.Report.Implementation.IGScript)t, dev);
            if (t is Gordic.Report.Implementation.IGFormatComment) return new GFEFormatComment(reg, (Gordic.Report.Implementation.IGFormatComment)t, dev);

            if (t is Gordic.Report.Implementation.IGFormatContent)
                return new GFEFormatUnknownContent(reg, (Gordic.Report.Implementation.IGFormatContent)t, dev);

            return new GFEFormatUnknown(reg, t, dev);
        }

        GFEAttrList m_atrs;
        readonly string m_tagname;
        readonly int m_column;
        GrfRect m_grfRect;
        protected object structureItem;
        protected EventHandlerStringArgument getstructureitem;
        readonly int m_line;
        /// <summary>
        /// Pozice øádku ve kterém se nachází daný tag 
        /// </summary>
        public int LinePosition { get { return m_line; } }

        public override string ToString()
        {
            return StringFromTag(TagName);
        }
        protected string StringFromTag(string name)
        {
            string loc = m_atrs.Loc;
            if (loc != null)
            //if (Attributes.TryGetValue("__loc", out loc))
            {
                return "<" + name + "> in " + loc;
            }
            return "<" + name + ">";
        }

        /// <summary>
        /// region, kterému patøí objekt
        /// </summary>
        public GFEFormatRegion Region { get; }

        /// <summary>
        /// atributy objektu
        /// </summary>
        public GFEList Attributes { get { return m_atrs; } }

        /// <summary>
        /// vnitøní objekty daného objektu
        /// </summary>
        public GfeFormatTags Children { get; }

        /// <summary>
        /// Název vìtve objektu
        /// </summary>
        public string TagName { get { return m_tagname; } }

        /// <summary>
        /// Položka struktury
        /// </summary>
        public virtual object StructureItem { get { return structureItem; } }

        /// <summary>Native content</summary>
        public Gordic.Report.Implementation.IGFormatTag NativeContent { get; private set; }

        /// <summary>
        /// Rect pro GRF sestavy
        /// </summary>
        /// <summary>
        /// Metoda na získání položky struktury
        /// </summary>
        public event EventHandlerStringArgument GetStructureItem { add { if (getstructureitem == null) getstructureitem += value; } remove { if (getstructureitem == null) getstructureitem -= value; } }

        /// <exclude/>
        public GrfRect GrfRect { get { return m_grfRect; } }

        internal GFEFormatTag(GFEFormatRegion r, Gordic.Report.Implementation.IGFormatTag t, Gordic.Report.Implementation.IGFormatDevTools dev)
        {
            NativeContent = t;
            Region = r;
            //m_grfRect = grf rect neplnim. Pro GRF format je specialni doplneni v Create metode
            t.getTagName(out m_tagname);
            Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(t.getAttributes(out Report.Implementation.IGAttrList list));

            try { m_atrs = new GFEAttrList(list); } // end try
            finally { Marshal.ReleaseComObject(list); }

            //if (dev != null)
            //    if (!Gordic.Report.Interface.GUnsafeRepWrapper.S_Check06Error(dev.getTagLocation(t, out m_line, out m_column)))
            //        System.Diagnostics.Debug.WriteLine(String.Format(string.Join(" ", GResources.GetResourceText(29450005), "{0}", GResources.GetResourceText(29450165)), m_tagname)); //RC 29450165 : informace nebyla nalezená!
            if (dev != null)
                dev.getTagLocation(t, out m_line, out m_column);

            t.getChildCount(out int cnt);
            Children = new GfeFormatTags(cnt);
            for (int i = 0; i < cnt; i++)
            {
                Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(t.getChild(i, out Report.Implementation.IGFormatTag ch));

                try { Children.Add(GFEFormatTag.Create(Region, ch, dev)); } // end try
                finally { } // end finally
            }
        }

        /// <exclude/>
        public string GetInnerXml()
        {
            StringBuilder sb = new StringBuilder();
            GetInnerXml(sb, 0);
            return sb.ToString();
        }
        /// <exclude/>
        public string GetOuterXml()
        {
            StringBuilder sb = new StringBuilder();
            GetOuterXml(sb, 0);
            return sb.ToString();
        }

        public string GetInnerText()
        {
            if (NativeContent is Report.Implementation.IGFormatTag2 t2)
            {
                t2.getInnerText(out string l_Text);
                if (string.IsNullOrWhiteSpace(l_Text) == false)
                    return l_Text.Trim('\r', '\n', '\t');
            }
            return "";
        }

        void GetInnerXml(StringBuilder sb, int indent, string it = null)
        {
            if (it == null) it = GetInnerText();
            if (it.Length > 0)
                sb.Append(it);

            foreach (GFEFormatTag t in Children)
                t.GetOuterXml(sb, indent);
        }
        void GetOuterXml(StringBuilder sb, int indent)
        {
            if (indent > 0) sb.Append(new string(' ', indent));

            if (this.TagName == "!") //vyjimka na komentar
                { sb.Append("<!--"); sb.Append(GetInnerText()); sb.AppendLine("-->"); return; }

            sb.Append("<");
            sb.Append(this.TagName);
            GetAttributeXml(sb);

            var it = GetInnerText();
            if (it.Length==0 && Children.Count == 0) { sb.AppendLine("/>"); return; }
            sb.Append('>');

            GetInnerXml(sb, indent + 4, it);

            if (indent > 0) sb.Append(new string(' ', indent));
            sb.Append("</");
            sb.Append(this.TagName);
            sb.Append(">");
        }
        void GetAttributeXml(StringBuilder sb)
        {
            foreach (KeyValuePair<string, string> t in Attributes)
            {
                sb.Append(" ");
                sb.Append(t.Key);
                sb.Append("=\"");
                sb.Append(t.Value.Replace("<", "&lt;").Replace(">", "&gt;"));
                sb.Append("\"");
            }
        }

        #region IDisposable Members
        /// <summary>
        /// uvolnìní objektu
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
#if MEMORYDEBUG
            //Gordic.General.GLoggerExtensions.Trace(GFEFormat.MemoryDebugLog, $"{GetType()} Dispose {disposing}");
#endif
            if (disposing)
            {
                Children.Dispose();
            }
            if (NativeContent != null)
            {
#if MEMORYDEBUG
                //Gordic.General.GLoggerExtensions.Trace(GFEFormat.MemoryDebugLog, $"{GetType()} NativeContent release");
#endif
                Marshal.ReleaseComObject(NativeContent);
                NativeContent = null;
            }
        }
        ~GFEFormatTag() { Dispose(false); }
        #endregion
    }

    /// <summary>
    /// 
    /// </summary>
    public struct GFEUnit
    {
        /// <summary>
        /// 
        /// </summary>
        public double met;

        /// <summary>
        /// 
        /// </summary>
        public Gordic.Report.Implementation.Grr06Metrics mtr;
    } // end struct
   
    /// <summary>
    /// 
    /// </summary>
    public abstract class GFEFormatContent : GFEFormatTag
    {
        readonly GFEFormatStyle m_style;

        /// <summary>
        /// 
        /// </summary>
        public GFEFormatStyle Style
        {
            get { return m_style; }
        }

        string[] datafullpath = null;
        /// <summary>
        /// plná cesta k položce bez uvedení ROOT oblasti
        /// </summary>
        public string DataFullPath
        {
            get
            {
                if (datafullpath == null) datafullpath = GetFullPath();
                var c = datafullpath.Length;
                if (c == 0) return string.Empty;
                if (c > 1 && datafullpath[0].Equals("root", StringComparison.InvariantCultureIgnoreCase))
                    return string.Join(".", datafullpath, 1, c - 1);
                return string.Join(".", datafullpath);
            }
        }
        /// <summary>
        /// plná jméno položky, tj. jméno oblasti + jméno položky
        /// </summary>
        public string DataFullName
        {
            get
            {
                if (datafullpath == null) datafullpath = GetFullPath();
                var c = datafullpath.Length;
                if (c == 0) return string.Empty;
                if (c > 1)
                    return datafullpath[c - 2] + "." + datafullpath[c - 1];
                return datafullpath[c - 1];
            }
        }
        /// <summary>
        /// krátké jméno položky, bez jména oblasti
        /// </summary>
        public string DataShortName
        {
            get
            {
                if (datafullpath == null) datafullpath = GetFullPath();
                var c = datafullpath.Length;
                if (c == 0) return string.Empty;
                return datafullpath[c - 1];
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
                    structureItem = getstructureitem.Invoke(DataFullPath);
                return structureItem;
            }
        }

        private string[] GetFullPath()
        {
            if (!Attributes.ContainsKey("name"))
                return new string[0];

            GFEFormatRegion region = Region;
            string result = Attributes["name"];
            var splitted = result.Split('.');
            if (splitted.Length > 1)
            {
                string rname = splitted[0];
                result = splitted[1];
                while (region != null && region.Name.Equals(rname, StringComparison.InvariantCultureIgnoreCase) == false)
                    region = region.Parent;
            }
            else
            {
                while (region != null)
                {
                    var r = region.StructureItem as GFERegion;
                    var di = r.GetDataItemByName(result);
                    if (di != null) break;
                    region = region.Parent;
                }
            }

            var l = new List<string> { result };
            while (region != null)
            {
                l.Insert(0, region.Name);
                region = region.Parent;
            }
            return l.ToArray();
        }

        internal GFEFormatContent(GFEFormatRegion r, Gordic.Report.Implementation.IGFormatContent t, Gordic.Report.Implementation.IGFormatDevTools dev)
            : base(r, (Gordic.Report.Implementation.IGFormatTag)t, dev)
        {
            t.getStyle(out Report.Implementation.IGFormatGRRCellStyle style);
            if (style != null) // end if
            try
            {
                m_style = new GFEFormatStyle(style);
            } // end try
            finally
            {
                Marshal.ReleaseComObject(style);
            } // end finally
        }

    } // end class

    /// <summary>
    /// 
    /// </summary>
    public abstract class GFEFormatContainer : GFEFormatContent
    {
        internal GFEFormatContainer(GFEFormatRegion r, Gordic.Report.Implementation.IGFormatContainer t, Gordic.Report.Implementation.IGFormatDevTools dev)
            : base(r, (Gordic.Report.Implementation.IGFormatContent)t, dev)
        {
        }
    } // end class
} // end namespace
