//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.BackgroundRenderer.cs                    </Name>
//    <Description> Renderování Filleru na pozadí (pro LK)                      </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-03-04                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Drawing;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.General;
using System.Linq;
using Gordic.GFE.Parsers.Core.Services;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Renderování Filleru na pozadí (pro LK)
    /// </summary>
    public class BackgroundRenderer : IDisposable
    {
        Filler m_f;
        IFillerContent m_fc;
        IPage m_p;
        Graphics m_cg;
        DateTime m_timestamp;

        /// <summary>konstruktor</summary>
        /// <param name="file"></param>
        /// <param name="isLK">indikuje, jestli se jedná o LK či nikoliv; TRUE - jedná se o LK</param>
        /// <param name="initialPage">Výchozí strana (default 1)</param>
        /// <param name="openAsReadOnly">Otevře pouze pro čtení</param>
        /// <param name="registrarFunc">Nastavení registrar před otevřením souboru</param>
        public BackgroundRenderer(string file, bool isLK = true, int initialPage = 1, bool openAsReadOnly = false, Func<BackgroundRenderer, ScriptManager.IScriptRegistrar> registrarFunc = null)
        {
            m_f = new Filler();
            m_f.Initialize(isLK: isLK);
            m_f.BeforeLoad += delegate
            {
                m_fc = m_f.View;
                if (m_fc == null)
                    throw new GException(21000031, 21000037, "Report"); //RC-EX 21000037 : Formulář {0} nelze prohlížet!
                m_bmp = new Bitmap(1, 1, System.Drawing.Imaging.PixelFormat.Format32bppArgb);
                m_cg = Graphics.FromImage(m_bmp);
                m_fc.ComputeGraphics = m_cg;
                m_f.View.IsReadOnly = openAsReadOnly;
            };

            if (registrarFunc != null) m_f.ScriptRegistrar = registrarFunc(this);
            Open(file);
            //f.ShowColorOf = false;
            InitializePages(initialPage);
        }

        public void Open(string file)
        {
            if (m_f.Load(file) == false)
                throw new GNoDataFoundException(21000033, 21000038, file); //RC-EX 21000038 : Formulář {0} nelze otevřít!
            m_timestamp = System.IO.File.GetLastWriteTimeUtc(file);
        }

        /// <summary>konstruktor</summary>
        /// <param name="report"></param>
        /// <param name="isLK">indikuje, jestli se jedná o LK či nikoliv; TRUE - jedná se o LK</param>
        /// <param name="initialPage">Výchozí strana (default 1)</param>
        /// <param name="openAsReadOnly">Otevře pouze pro čtení</param>
        /// <param name="registrarFunc">Nastavení registrar před otevřením souboru</param>
        public BackgroundRenderer(Gordic.Report.Interface.IGReport report, bool isLK = true, int initialPage = 1, bool openAsReadOnly = false, Func<BackgroundRenderer, ScriptManager.IScriptRegistrar> registrarFunc = null)
        {
            m_f = new Filler();
            m_f.Initialize(isLK: isLK);
            m_f.BeforeLoad += delegate
            {
                m_fc = m_f.View;
                if (m_fc == null)
                    throw new GException(21000030, 21000037, "Report"); //RC-EX 21000037 : Formulář {0} nelze prohlížet!
                m_bmp = new Bitmap(1, 1, System.Drawing.Imaging.PixelFormat.Format32bppArgb);
                m_cg = Graphics.FromImage(m_bmp);
                m_fc.ComputeGraphics = m_cg;
                m_f.View.IsReadOnly = openAsReadOnly;
            };

            if (registrarFunc != null) m_f.ScriptRegistrar = registrarFunc(this);
            try
            {
                var imp = (report as Gordic.Report.Interface.IGReportImplementation);
                var imp2 = report.VisualRepresentations[0] as Gordic.Report.Interface.IGVisualRepresentationImpl;
                var xme = imp.Files[2];
                var alf = imp2.Files[0];
                var zip = imp2.Files[1];
                var data = imp.Files[1].ToArray();
                m_f.Load(alf.ToArray(), data, xme.ToArray(), zip?.ToArray());
                //f.ShowColorOf = false;
                InitializePages(initialPage);
            }
            catch (Exception ex)
            {
                throw new GException(21000034, 21000038, ex, "Report"); //RC-EX 21000038 : Formulář {0} nelze otevřít!
            }
        }

        public enum Media { print, screen, window };
        public Media CurrentMedia { get; set; } = Media.print;

        private void InitializePages(int initialPage)
        {
            if (Enum.TryParse<Media>(m_fc.Format.EditorSettings["paper-interactive-media"], out Media media) == false) media = Media.print;
            CurrentMedia = media;

            var pc = m_fc.Pages;
            if (pc == null)
                throw new GException(21000035, 21000040, GfrmFile); //RC-EX 21000040 : Formulář {0} nemá žádnou stranu

            switch (CurrentMedia)
            {
                case Media.window:
                    DefaultPageMargins = new Report.Implementation.Grr06Widths()
                    {
                        left = 0,
                        right = 0,
                        bottom = 0,
                        top = 0
                    };
                    break;
                default:
                    DefaultPageMargins = new Report.Implementation.Grr06Widths()
                    {
                        left = pc.MarginLeft.IntValue,
                        right = pc.MarginRight.IntValue,
                        bottom = pc.MarginBottom.IntValue,
                        top = pc.MarginTop.IntValue
                    };
                    break;
            }
            //vypnuti okraju stranky
            var w = pc.MarginLeft + pc.MarginRight;
            var h = pc.MarginTop + pc.MarginBottom;
            pc.PageWidth -= w;
            pc.PageHeight -= h;
            pc.MarginLeft = new Gordic.GFE.Parsers.Utils.SizeValue(0);
            pc.MarginRight = new Gordic.GFE.Parsers.Utils.SizeValue(0);
            pc.MarginBottom = new Gordic.GFE.Parsers.Utils.SizeValue(0);
            pc.MarginTop = new Gordic.GFE.Parsers.Utils.SizeValue(0);

            switch (CurrentMedia)
            {
                case Media.screen:
                case Media.window:
                    initialPage = 1;
                    break;
            }

            NavigateToPage(initialPage);
        }

        /// <summary>Přepnutí na stranu X</summary>
        public void NavigateToPage(int page)
        {
            m_p = m_fc.Pages == null ? null : m_fc.Pages[page - 1] as AbstractPage;
            if (m_p == null)
                throw new GException(21000032, 21000039, GfrmFile, page); //RC-EX 21000039 : Stranu {1} formuláře {0} nelze prohlížet!

            m_offsetX = -m_p.LeftZoom;
            m_offsetY = -m_p.TopZoom;
        }
        public IPage Page
        {
            get { return m_p; }
        }
        public int PageNumber
        {
            get { return m_p.Order; }
        }
        public int PageCount
        {
            get
            {
                if (m_fc.Pages == null) return 0;
                switch (CurrentMedia)
                {
                    case Media.screen:
                    case Media.window:
                        return 1;
                    default:
                        return m_fc.Pages.Count;
                }
            }
        }
        public GFE.Parsers.Utils.SizeValue PageWidth { get { return m_p.Width; } }
        public GFE.Parsers.Utils.SizeValue PageHeight
        {
            get
            {
                switch (CurrentMedia)
                {
                    case Media.screen:
                    case Media.window:
                        var pc = m_fc.Pages;
                        return pc.Count * pc.PageHeight.IntValue;
                    default:
                        return m_p.Height;
                }

            }
        }

        /// <summary>Název zobrazeného formátu</summary>
        public string Nazev
        {
            get { return m_fc.Format.Infos["nazev"]; }
        }

        public DefaultViewContent View
        {
            get { return m_fc as DefaultViewContent; }
        }
        public Filler Filler
        {
            get { return m_f; }
        }
        /// <summary>Seznam chybných položek</summary>
        public IEnumerable<ValidationResult> ValidationErrors { get { return View.ValidationErrors; } }
        /// <summary>Obsahuje chybnou položku?</summary>
        public bool ContainsValidationError
        {
            get
            {
                if (View == null) return false;
                return View.ContainsValidationError;
            }
        }

        /// <summary>Parametry pro skripty</summary>
        public string StartFragment
        {
            get { return m_f.StartFragment; }
            set { m_f.StartFragment = value; }
        }

        /// <summary>Obsahuje editovatelnou položku?</summary>
        public bool IsEditable
        {
            get { return m_f.IsEditable; }
        }
        ///// <summary>Obsahuje povinnou nevyplněnou položku?</summary>
        //public bool ContainsEmptyRequiredValue
        //{
        //    get { return m_f.ContainsEmptyRequiredValue; }
        //}

        public Gordic.Report.Implementation.GScriptEngine ScriptEngine
        {
            get { return View.DataManager.ScriptManager.Engine; }
        }
        public ScriptManager.IScriptRegistrar ScriptRegistrar
        {
            get { return m_f.ScriptRegistrar; }
            set { m_f.ScriptRegistrar = value; }
        }

        /// <summary>Množina aktuálních dat</summary>
        public Gordic.General.GDataSet Data { get { return View.DataManagerInternal.Data; } set { View.DataManagerInternal.Data = value; } }
        /// <summary>Zjištění hodnoty pole</summary>
        public object GetData(string dataName) { return View.DataManagerInternal.GetData(dataName); }
        /// <summary>Nastavení hodnoty pole</summary>
        public bool SetData(string dataName, object value)
        {
            var b = View.DataManager.SetData(dataName, value);
            if (b) Invalidate();
            return b;
        }

        //------------------------------------------------------------------
        //System.Runtime.Serialization.ObjectIDGenerator ids = new System.Runtime.Serialization.ObjectIDGenerator();
        //Dictionary<object, int> m_ids = new Dictionary<object, int>();
        //Dictionary<int, object> m_idsr = new Dictionary<int, object>();
        //public int GetId(object c)
        //{
        //    //bool idft;
        //    //return ids.GetId(c, out idft)
        //    int res;
        //    if (m_ids.TryGetValue(c, out res) == false)
        //    {
        //        res = m_ids.Count + 1;
        //        m_ids.Add(c, res);                
        //        m_idsr.Add(res, c);
        //    }
        //    return res;
        //}
        //private object GetObject(int id)
        //{
        //    return m_idsr[id];
        //}

        //Dictionary<ITagComponent, string> m_ids = new Dictionary<ITagComponent, string>();
        //Dictionary<string, ITagComponent> m_idsr = new Dictionary<string, ITagComponent>();
        public string GetId(IEditableContent c) { return GetId((ITagComponent)c); }
        public string GetId(ITagComponent c)
        {
            //return ToOrder(System.Linq.Enumerable.Concat(new[] { c.Page.Order }, c.Order));
            string res;
            //if (m_ids.TryGetValue(c, out res) == false)
            {
                //res = "C" + (m_ids.Count + 1).ToString();
                res = ToOrder(System.Linq.Enumerable.Concat(new[] { c.Page.Order }, c.Order));
                //m_ids[c] = res;
                //m_idsr[res] = c;
            }
            return res;
        }
        public static string ToOrder(IEnumerable<int> o)
        {
            var sb = new System.Text.StringBuilder();
            bool t = true;
            foreach (int i in o)
            {
                if (t)
                {
                    var v = i;
                    while (true)
                    {
                        sb.Append((char)('A' + v % 26));
                        v /= 26;
                        if (v == 0) break;
                        v--;
                    }
                }
                else
                    sb.Append(i);
                t = !t;
            }
            return sb.ToString();
        }
        static char __get(string o, int len, ref int i)
        {
            if (++i >= len) return (char)0;
            return o[i];
        }
        public static IEnumerable<int> FromOrder(string o)
        {
            int i = 0;
            bool t = true;
            int len = o.Length;
            if (len == 0) yield break;
            char c = o[0];
            while (true)
            {
                int v = 0;
                if (t)
                {
                    int r = 1;
                    while (c >= 'A' && c <= 'Z')
                    {
                        v += r * (c - 'A' + 1);
                        c = __get(o, len, ref i);
                        r *= 26;
                    }
                    yield return v - 1;
                }
                else
                {
                    while (c >= '0' && c <= '9')
                    {
                        v *= 10;
                        v += (c - '0');
                        c = __get(o, len, ref i);
                    }
                    yield return v;
                }
                if (c == 0) yield break;
                t = !t;
            }
        }

        private ITagComponent GetObject(string id)
        {
            //if (m_idsr.TryGetValue(id, out var value)) return value;
            var o = FromOrder(id).GetEnumerator();
            if (o.MoveNext() == false) return null;

            IPage pg;
            if (o.Current == this.PageNumber) pg = this.Page; else pg = m_fc.Pages[o.Current - 1];
            if (o.MoveNext() == false) return null;
            var i = pg[o.Current];
            var p = i as IContainerComponent;
            while (p != null)
            {
                if (o.MoveNext() == false) break;
                i = p[o.Current];
                p = i as IContainerComponent;
            }
            return i as ITagComponent;
        }
        //------------------------------------------------------------------
        Bitmap m_bmp;
        /// <summary>Bitmap</summary>
        public Bitmap Bitmap
        {
            get { Render(); return m_bmp; }
        }

        GImageMap m_map;
        /// <summary>ImageMap</summary>
        public string ImageMap
        {
            get { Render(); return m_map.ToString(); }
        }
        /// <summary>ImageMap</summary>
        public GImageMap Map
        {
            get { Render(); return m_map; }
        }

        //------------------------------------------------------------------
        IPage m_rendered = null;
        /// <summary>Znevalidnění renderované stránky (po provedení nějaké změny)</summary>
        public void Invalidate()
        {
            m_rendered = null;
        }

        //------------------------------------------------------------------
        /// <summary>Výchozí velikost stránky</summary>
        public Size DefaultPageSize
        {
            get { return new Size(PageWidth.IntValue, PageHeight.IntValue); }
        }
        public Report.Implementation.Grr06Widths DefaultPageMargins = new Report.Implementation.Grr06Widths();
        private Size m_ImageSize = Size.Empty;
        /// <summary>Nastavená velikost stránky (renderovaného obrázku)</summary>
        public Size ImageSize
        {
            get { return m_ImageSize.IsEmpty ? DefaultPageSize : m_ImageSize; }
            set { m_ImageSize = value; Invalidate(); }
        }
        /// <summary>Nastavená šířka stránky</summary>
        public int PageWidthInPixels
        {
            get { return m_ImageSize.IsEmpty ? PageWidth.IntValue : m_ImageSize.Width; }
            set { ImageSize = new Size(value, value == PageWidth.IntValue ? PageHeight.IntValue : (int)(PageHeight * value / PageWidth)); }
        }
        /// <summary>Nastavená výška stránky</summary>
        public int PageHeightInPixels
        {
            get { return m_ImageSize.IsEmpty ? PageHeight.IntValue : m_ImageSize.Height; }
            set { ImageSize = new Size(value == PageHeight.IntValue ? PageWidth.IntValue : (int)(PageWidth * value / PageHeight), value); }
        }
        /// <summary>Nastavené zvětšení stránky (poměr mezi nastavenou a výchozí velikostí stránky)</summary>
        public float Zoom
        {
            get { return m_ImageSize.IsEmpty ? 1F : m_ImageSize.Width / PageWidth; }
            set { ImageSize = new Size((int)(PageWidth * value), (int)(PageHeight * value)); }
        }

        public void PrepareRender(bool clearParts = true)
        {
            if (m_rendered == m_p) return;
            GraphicSettingService.SetZoom(View, Zoom);
            m_offsetX = -m_p.LeftZoom;
            m_offsetY = -m_p.TopZoom;
            if (clearParts) RenderParts.Clear();
        }

        internal float m_offsetX, m_offsetY;
        //------------------------------------------------------------------
        private void Render()
        {
            if (m_rendered == m_p) return;
            m_rendered = m_p;

            //try
            {
                //m_errors.Clear();
                //m_ids = new Dictionary<object, int>(); //ID priradim znovu -> neco se mohlo umazat/Disposnout
                //m_idsr = new Dictionary<int, object>();

                var r = new RectangleF(0, 0, PageWidthInPixels + 1, PageHeightInPixels + 1); //+1 aby se veslo oramovani kolem bunek uplne vpravo/dole
                GraphicSettingService.SetZoom(View, Zoom);
                m_offsetX = -m_p.LeftZoom;
                m_offsetY = -m_p.TopZoom;

                int dw = (int)r.Width;
                int dh = (int)r.Height;
                if (m_bmp == null)
                {
                    m_bmp = new Bitmap(dw, dh, System.Drawing.Imaging.PixelFormat.Format24bppRgb);
                }
                else if (m_bmp.Height != dh || m_bmp.Width != dw)
                {
                    m_bmp.Dispose();
                    m_bmp = new Bitmap(dw, dh, System.Drawing.Imaging.PixelFormat.Format24bppRgb);
                }
                m_map = new Gordic.GFE.Parsers.Gui.GImageMap();

                using (var g = Graphics.FromImage(m_bmp))
                {
                    g.FillRectangle(Brushes.White, 0, 0, r.Width, r.Height);
                    g.TranslateTransform(m_offsetX, m_offsetY);
                    switch (CurrentMedia)
                    {
                        case Media.screen:
                        case Media.window:
                            foreach (AbstractPage p in m_fc.Pages)
                                _RenderPage(p, g);
                            break;
                        default:
                            _RenderPage(m_p as AbstractPage, g);
                            break;
                    }
                }

                //m_p.DelayPaintList.Clear();
                //using (var g = Graphics.FromImage(m_bmp))
                //{
                //    g.FillRectangle(Brushes.White, 0, 0, r.Width, r.Height);
                //    g.TranslateTransform(-m_p.LeftZoom, -m_p.TopZoom);
                //    RenderPage(m_p as AbstractPage, g);

                //    foreach (DelayPaintItem i in m_p.DelayPaintList)
                //        i.Paint(g);
                //}
                //m_p.DelayPaintList.Clear();
            }
            //finally
            //{
            //}
        }
        private void _RenderPage(AbstractPage p, Graphics g)
        {
            p.DelayPaintList.Clear();
            RenderPage(p as AbstractPage, g);

            foreach (DelayPaintItem i in p.DelayPaintList)
                i.Paint(g);
            p.DelayPaintList.Clear();
        }

        public bool RenderButtons = true;
        public bool RenderAttachments = true;
        public Dictionary<ITagComponent, PaintArgs> RenderParts = new Dictionary<ITagComponent, PaintArgs>();
        public void PartsForComponent(IEditableContent e, PaintArgs.PartsEnum parts) { PartsForComponent((ITagComponent)e, parts); }
        public void PartsForComponent(ITagComponent c, PaintArgs.PartsEnum parts)
        {
            if (RenderParts.TryGetValue(c, out PaintArgs p) && p.Parts == parts) return; //same

            RenderParts[c] = new PaintArgs() { Parts = parts };
            Invalidate();
        }

        private void RenderPage(IEnumerable<ITagComponent> p, Graphics g)
        {
            foreach (ITagComponent c in p)
            {
                if (c is URAbstractContainer)
                {
                    RenderPage((URAbstractContainer)c, g);
                    continue;
                }

                if (Animated && c is DefaultContentChart)
                {
                    ((DefaultContentChart)c).PaintEmpty(g);
                    continue;
                }

                if (RenderButtons == false && c is DefaultContentButton)
                    continue;
                if (RenderAttachments == false && c is DefaultContentAttachment)
                    continue;

                if (RenderParts.TryGetValue(c, out PaintArgs parts) == false) parts = new PaintArgs();
                parts.ChildPaint = Parts_ChildPaint;
                c.OnPaint(g, parts);
                //g.FillRectangle(Brushes.Pink, c.BoundsInPixels);
                //g.DrawRectangle(Pens.Red, c.LeftZoom, c.TopZoom, c.WidthZoom, c.HeightZoom);
                //c.Text.Paint(g, new PointF(c.LeftZoom, c.TopZoom), new SizeF(c.WidthZoom, c.HeightZoom), 1);

                RegisterMouseActions(c);
            }
        }

        private PaintArgs Parts_ChildPaint(IPaintable obj)
        {
            PaintArgs parts = null;
            if (obj is ITagComponent t)
                RenderParts.TryGetValue(t, out parts);
            if (parts != null) parts.ChildPaint = Parts_ChildPaint;
            return parts;
        }

        private void RegisterMouseActions(ITagComponent c)
        {
            if (c is DefaultContentGrid g) //grid zatim osetrim natvrdo zde
            {
                foreach (GridLine line in g.Lines)
                {
                    if (line.Visible == false) continue;
                    foreach (GridCell cell in line)
                    {
                        foreach (ITagComponent content in cell)
                            RegisterMouseActions(content);
                    }
                }
            }
            if (!(c is IMouseComponent mc)) return;

            if (c is IEditableContent ecc && ecc.Visible == false) return;

            var l_oRectangle = GetInputRectangleF(c);

            GImageMap.Shape ss;
            if (c.Scripts.ContainsKey("onClick"))
                ss = m_map.AddRect(l_oRectangle, GetComponentClickHref(c));
            else
                ss = null;

            if (c is DefaultContentChart vvvv)
            {
                foreach (GImageMap.Shape s1 in vvvv.ImageMap.Shapes)
                {
                    GImageMap.Shape s = GImageMap.Shape.Clone(s1, l_oRectangle.Left, l_oRectangle.Top);

                    var href = s.Href;
                    if (href.StartsWith("chart?"))
                        href = "?chart&c=" + GetId(c) + "&" + href.Substring("chart?".Length);
                    s.Href = MakeHRef(c, href);

                    if (TooltipPrefix != null && TooltipSuffix != null)
                    {
                        var tt = vvvv.SliceTooltip(href);
                        if (tt != null) s.Extra = TooltipPrefix + tt + TooltipSuffix;
                    }

                    m_map.Add(s); //pridam upravene klony vsech shape
                }
            }
            else if (c is DefaultContentValue vvv)
            {
                if (vvv.DataItem.Edit)
                {
                    //ss = m_map.AddRect(l_oRectangle, MakeHRef1(c, "edit"));
                }
            }
            else if (c is DefaultContentButton)
            {
                //button nemusi mit skript a presto klika...
                if (ss == null)
                    ss = m_map.AddRect(l_oRectangle, GetComponentClickHref(c));
            }
            else if (c is DefaultContentSelect vv)
            {
                if (vv.IsClickable)
                {
                    ss = m_map.AddRect(l_oRectangle, GetComponentClickHref(c));
                }
                else if (vv.DataItem.Edit)
                {
                    //ss = m_map.AddRect(l_oRectangle, MakeHRef1(c, "edit"));
                }
            }
            else if (c is DefaultContentPar p)
            {
                foreach (var ch in p.Children)
                {
                    RegisterMouseActions(ch);
                }
                if (ss == null && p.HasClickEvent)
                {
                    ss = m_map.AddRect(l_oRectangle, GetComponentClickHref(c));
                }
            }
            else if (c is DefaultContentAttachment v)
            {
                var r1 = GetInputRectangleF(c, v.AddAttachmentRect);
                ss = m_map.AddRect(r1.Left, r1.Top, r1.Right, r1.Bottom, MakeHRef1(c, "upload"));
                for (int i = 0; i < v.Count; i++)
                {
                    var r3 = GetInputRectangleF(c, v.DeleteAttachmentRect(i));
                    var del_ss = m_map.AddRect(r3.Left, r3.Top, r3.Right, r3.Bottom, MakeHRef2(c, "delattach", i));
                    //del_ss.Extra = "style=\"cursor: no-drop\"";
                    var r2 = GetInputRectangleF(c, v.OpenAttachmentRect(i));
                    m_map.AddRect(r2.Left, r2.Top, r2.Right, r2.Bottom, MakeHRef2(c, "download", i));
                }
            }

            var tooltip = mc.Tooltip;
            if (string.IsNullOrEmpty(tooltip) == false)
            {
                if (ss == null)
                    ss = m_map.AddRect(l_oRectangle, "javascript:;");
                ss.Extra = TooltipPrefix + tooltip + TooltipSuffix;
            }

            if (ErrMsgPrefix != null && c is IEditableContent ec && /*ec.DataItem.Edit == false &&*/ ec.DataItem.IsError == true)
            {
                var errmsg = ec.DataItem.ValidationResult.Message;
                if (string.IsNullOrEmpty(errmsg) == false)
                {
                    if (ss == null)
                        ss = m_map.AddRect(l_oRectangle, "javascript:;");

                    if (string.IsNullOrEmpty(tooltip) == true)
                        ss.Extra += TooltipPrefix + TooltipSuffix; //title chci mít vždy

                    ss.Extra += ErrMsgPrefix + errmsg + ErrMsgSuffix;
                }
            }

            if (ss != null && c is IInlineContent ic)
            {
                var i = ic.InlineText;
                if (i != null)
                {
                    bool first = true;
                    foreach (var ip in i.recs)
                    {
                        var iRect = GetInputInnerRectangleF(c, ip.p.X, ip.p.Y, ip.sz.Width, ip.sz.Height);
                        if (first)
                            first = false;
                        else
                        {
                            ss = GImageMap.Shape.Clone(ss);
                            m_map.Add(ss);
                        }
                        (ss as GImageMap.ShapeRect).SetBounds(iRect);
                    }

                }
            }


        }

        #region IDisposable Members

        /// <summary>Dispose</summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);

            //#if MEMORYDEBUG
            System.Runtime.GCSettings.LargeObjectHeapCompactionMode = System.Runtime.GCLargeObjectHeapCompactionMode.CompactOnce;
            GC.Collect(2, GCCollectionMode.Forced, true);
            //GC.WaitForPendingFinalizers();
            //#endif
        }
        protected virtual void Dispose(bool disposing)
        {
#if MEMORYDEBUG
            Gordic.General.GLoggerExtensions.Trace(GFEFormat.MemoryDebugLog, $"{GetType()} Dispose {disposing}");
#endif
            if (m_f == null) return; //uz je disposnute
            if (disposing)
            {

                if (m_bmp != null) { m_bmp.Dispose(); m_bmp = null; }
                m_map = null;
                m_rendered = null;

                if (m_cg != null) { m_cg.Dispose(); m_cg = null; }
                m_p = null;
                //var d = (m_fc as IDisposable);
                //if (d != null) d.Dispose();
                m_fc = null;

                //m_ids.Clear();
                //m_idsr.Clear();

                if (m_anims != null)
                {
                    var l_anims = m_anims;
                    m_anims = null;
                    foreach (Animation a in l_anims.Values)
                        a.Dispose();
                }

                m_f.Dispose();
                m_f = null;
            }
        }
        ~BackgroundRenderer() { Dispose(false); }
        #endregion

        ///// <summary>href předpona</summary>
        //public string HrefPrefix { get; set; }
        ///// <summary>href přípona</summary>
        //public string HrefSuffix { get; set; }
        public delegate string MakeHRefDelegate(BackgroundRenderer renderer, ITagComponent c, string href);
        public MakeHRefDelegate CustomMakeHRef = null;

        /// <summary>tooltip předpona</summary>
        public string TooltipPrefix { get; set; }
        /// <summary>tooltip přípona</summary>
        public string TooltipSuffix { get; set; }
        //onMouseOver="ShowTooltip(event, '<span>test test </span><span><b>testtt</b></span><span> gg <br/>papa rapa</span>');" onMouseOut="HideTooltip();" />

        /// <summary>ErrMsg předpona</summary>
        public string ErrMsgPrefix { get; set; }
        /// <summary>ErrMsg přípona</summary>
        public string ErrMsgSuffix { get; set; }


        /// <summary>Vytvoření href pro ImageMap</summary>
        protected virtual string MakeHRef(ITagComponent c, string href)
        {
            if (CustomMakeHRef != null) return CustomMakeHRef(this, c, href);
            //if (HrefPrefix == null || HrefSuffix == null) return href;
            //return HrefPrefix + href + HrefSuffix;
            return href;
        }
        private string MakeHRef1(ITagComponent c, string act)
        {
            return MakeHRef(c, "?" + act + "&c=" + GetId(c));
        }
        private string MakeHRef2(ITagComponent c, string act, int i)
        {
            return MakeHRef(c, "?" + act + "&c=" + GetId(c) + "&i=" + i.ToString());
        }

        public ITagComponent GetComponentFromHref(string href)
        {
            if (href.Length == 0 || href[0] != '?') return null;
            var i = href.IndexOf('&');
            //var act = href.Substring(0, i);
            var spl = href.Substring(i + 1).Split('&');
            return GetComponent(spl);
        }
        public int GetComponentIndexFromHref(string href)
        {
            if (href.Length == 0 || href[0] != '?') return 0;
            var i = href.IndexOf('&');
            //var act = href.Substring(0, i);
            var spl = href.Substring(i + 1).Split('&');
            return GetIndex(spl);
        }
        public string GetEditValueChangeHref(IEditableContent edit)
        {
            return "?value&c=" + GetId(edit);
        }
        public string GetEditValueListChangeHref(IEditableContent edit)
        {
            return "?list&c=" + GetId(edit);
        }
        public string GetButtonClickHref(DefaultContentButton button)
        {
            return "?click&c=" + GetId(button);
        }
        public string GetComponentClickHref(ITagComponent c) => MakeHRef1(c, "click");
        public string GetComponentClickHref(IEditableContent c) => GetComponentClickHref(c as ITagComponent);
        /// <summary>Spuštění akce dle href</summary>
        public void Execute(string href)
        {
            //?click&c=15
            if (href.Length == 0 || href[0] != '?') return;
            var i = href.IndexOf('&');
            var act = i >= 0 ? href.Substring(0, i) : href;
            var spl = i >= 0 ? href.Substring(i + 1).Split('&') : new string[0];
            switch (act)
            {
                case "?edit":
                    {
                        //TODO zajistit volani, pokud ma komponenta onEdit skript. Momentalne se nevola, nebot udalost prekryje v JS input prvek...
                        var t = GetComponent(spl);
                        if (!(t is IDefaultDataItemHandler v)) return;
                        var di = v.DataItem;
                        if (di == null || di.Edit == false) return;

                        if (di.Value == DataRegionGrr.unknown_value) di.MakeDirty();
                        di.SetDisplayValue(); //pripadne spusteni aktualizace hodnoty
                        di.RunOnEdit();       //onEdit skript
                    }
                    Invalidate();
                    break;
                case "?click":
                    {
                        var t = GetComponent(spl);
                        if (t is IMouseComponent c)
                            c.Click(t.LeftZoom, t.TopZoom);
                    }
                    Invalidate();
                    break;
                case "?chart":
                    {
                        if (GetComponent(spl) is DefaultContentChart c)
                            c.Click(href);
                    }
                    Invalidate();
                    break;
                case "?value":
                    {
                        this.View.MakeDirty(); //oznaci formular za zmeneny
                        if (GetComponent(spl) is IDefaultDataItemHandler c)
                        {
                            c.UpdateContent(GetValue(spl));
                            //var dn = c.DataItem.DataName;
                            //if (dn.EndsWith("_txt"))
                            //{
                            //    c.UpdateContent(dn.Substring(0, dn.Length - 4), getKey(spl));
                            //}
                        }
                    }
                    Invalidate();
                    break;
                case "?list":
                    {
                        this.View.MakeDirty(); //oznaci formular za zmeneny
                        if (GetComponent(spl) is IDefaultDataItemHandler c)
                        {
                            c.UpdateContent((c as IEditableContent).ComboKeyName, GetKey(spl));
                            c.UpdateContent((c as IEditableContent).ComboValueName, GetValue(spl));
                        }
                    }
                    Invalidate();
                    break;
                case "?delattach":
                    {
                        this.View.MakeDirty(); //oznaci formular za zmeneny
                        var a = GetComponent(spl) as DefaultContentAttachment;
                        a.DeleteFile(GetIndex(spl));
                    }
                    Invalidate();
                    break;
            }
        }
        public void Upload(string href, byte[] bytes, string fileName)
        {
            var i = href.IndexOf('&');
            var act = href.Substring(0, i);
            var spl = href.Substring(i + 1).Split('&');
            var t = GetComponent(spl);
            var a = t as DefaultContentAttachment;
            a.AddFile(fileName, bytes);
        }
        public void Download(string href, out byte[] bytes, out string fileName)
        {
            var i = href.IndexOf('&');
            var act = href.Substring(0, i);
            var spl = href.Substring(i + 1).Split('&');
            var t = GetComponent(spl);
            var a = t as DefaultContentAttachment;

            var fn = a.GetFile(GetIndex(spl));
            fileName = System.IO.Path.GetFileName(fn);
            bytes = GIOSupport.FileToBytes(fn);
        }


        private ITagComponent GetComponent(string[] spl)
        {
            //Render();
            foreach (string s in spl)
            {
                if (s.StartsWith("c="))
                {
                    //return GetObject(Int32.Parse(s.Substring(2))) as ITagComponent;
                    return GetObject(s.Substring(2)) as ITagComponent;
                }
            }
            return null;
        }
        private string GetValue(string[] spl)
        {
            foreach (string s in spl)
            {
                if (s.StartsWith("v="))
                {
                    return Uri.UnescapeDataString(s.Substring(2));
                }
            }
            return string.Empty;
        }
        private string GetKey(string[] spl)
        {
            foreach (string s in spl)
            {
                if (s.StartsWith("k="))
                {
                    return Uri.UnescapeDataString(s.Substring(2));
                }
            }
            return null;
        }
        private int GetIndex(string[] spl)
        {
            foreach (string s in spl)
            {
                if (s.StartsWith("i="))
                {
                    return Int32.Parse(s.Substring(2));
                }
            }
            return -1;
        }

        public void Save()
        {
            //ulozeni dataku
            //bool isDirty = View.IsDirty;
            //if (isDirty)
            {
                ContentService.Save(View.PrimaryFile);
            }

            //ulozeni GFRM
            m_f.Save(this, EventArgs.Empty);
            m_timestamp = System.IO.File.GetLastWriteTimeUtc(GfrmFile);
        }

        //------------------------------------------------------------------
        /// <summary>
        /// Uložení jako... formuláře
        /// </summary>
        public void SaveGfrm(string fileName)
        {
            if (m_f == null) throw new ObjectDisposedException(GetType().Name);
            m_f.SaveAs(null, new EventArgsFillerSaveAs(fileName, true) { ShowSaveDialog = false });
        }

        /// <summary>
        /// Uložení jako... xml data
        /// </summary>
        public void SaveXml(string fileName)
        {
            if (m_f == null) throw new ObjectDisposedException(GetType().Name);

            using (var fs = System.IO.File.OpenWrite(fileName))
                View.DataManager.SaveTo(fs);
        }
        /// <summary>
        /// Uložení jako... stream
        /// </summary>
        public void SaveData(System.IO.Stream s)
        {
            if (m_f == null) throw new ObjectDisposedException(GetType().Name);
            View.DataManager.SaveTo(s);
        }

        public string GfrmFile { get { if (m_f == null) return null; return m_f.FileName; } }
        public DateTime GfrmTimestamp { get { return m_timestamp; } }
        public bool IsFileChanged(string f) { return GfrmFile != f || m_timestamp != System.IO.File.GetLastWriteTimeUtc(f); }

        public string FormatFile
        {
            get
            {
                var section = m_f.FormatFile;
                string fileName = FileUtility.Combine(section.Items[0].Location, section.Items[0].Name);
                return fileName;
            }
        }
        public string StructureFile
        {
            get
            {
                var section = m_f.StructureSection;
                string fileName = FileUtility.Combine(section.Items[0].Location, section.Items[0].Name);
                return fileName;
            }
        }

        /// <summary>Přetížení URL z relations souboru</summary>
        public string GetUrlRedirect(string url)
        {
            return m_f.GetUrlRedirect(url);
        }

        public class BackgroundContext : IDisposable
        {
            public BackgroundContext()
            {
                Gordic.GFE.Parsers.Core.Services.ServiceManager.MessageService = new Messages(this);
                Gordic.GFE.Parsers.Core.Services.ServiceManager.LoggingService = new List<ILoggingService>() { new Log() };
                Gordic.GFE.Parsers.Core.Services.ServiceManager.GraphicSettingService = new GraphicSetting();
            }
            public void Dispose()
            {
                Gordic.GFE.Parsers.Core.Services.ServiceManager.MessageService = null;
                Gordic.GFE.Parsers.Core.Services.ServiceManager.LoggingService = null;
                Gordic.GFE.Parsers.Core.Services.ServiceManager.GraphicSettingService = null;
            }

            internal List<Exception> m_errors = new List<Exception>();
            public List<Exception> Errors
            {
                get { return m_errors; }
            }

        }

        private class Messages : Gordic.GFE.Parsers.Core.Services.IMessageService
        {
            private BackgroundContext ctx;

            public Messages(BackgroundContext ctx)
            {
                this.ctx = ctx;
            }

            #region IMessageService Members

            public void ShowError(Exception ex, string message)
            {
                ctx.m_errors.Add(ex);
            }

            public void ShowWarning(string message)
            {
                throw new NotImplementedException();
            }

            public bool AskQuestion(string question, string caption)
            {
                throw new NotImplementedException();
            }

            public bool AskCustomQuestion(string question, string caption, ref bool asksNext)
            {
                throw new NotImplementedException();
            }

            public int ShowCustomDialog(string caption, string dialogText, int acceptButtonIndex, int cancelButtonIndex, params string[] buttontexts)
            {
                throw new NotImplementedException();
            }

            public string ShowInputBox(string caption, string dialogText, string defaultValue)
            {
                throw new NotImplementedException();
            }

            public void ShowMessage(string message, string caption)
            {
                throw new NotImplementedException();
            }

            public void InformSaveError(string fileName, string message, string dialogName, Exception exceptionGot)
            {
                throw new NotImplementedException();
            }

            public Core.Services.ChooseSaveErrorResult ChooseSaveError(string fileName, string message, string dialogName, Exception exceptionGot, bool chooseLocationEnabled)
            {
                throw new NotImplementedException();
            }

            public void ShowInformation(string message)
            {
                throw new NotImplementedException();
            }

            public void ShowErrorFormatted(string formatstring, object[] formatitems)
            {
                throw new NotImplementedException();
            }

            public void ShowWarningFormatted(string formatstring, object[] formatitems)
            {
                throw new NotImplementedException();
            }

            public string ProductName
            {
                get
                {
                    throw new NotImplementedException();
                }
                set
                {
                    throw new NotImplementedException();
                }
            }

            public string DefaultMessageBoxTitle
            {
                get
                {
                    throw new NotImplementedException();
                }
                set
                {
                    throw new NotImplementedException();
                }
            }

            public Core.Services.ShowErrorDelegate CustomErrorReporter
            {
                get
                {
                    throw new NotImplementedException();
                }
                set
                {
                    throw new NotImplementedException();
                }
            }

            #endregion
        }
        private class Log : Gordic.GFE.Parsers.Core.Services.ILoggingService
        {
            #region ILoggingService
            /// <summary>
            /// Ladění 
            /// </summary>
            /// <param name="message">Zpráva pro ladění</param>
            public void Debug(object message)
            {
                if (IsDebugEnabled)
                    Write(message, null);
            }

            /// <summary>
            /// Formátované ladění
            /// </summary>
            /// <param name="format">Formátovaná zprava</param>
            /// <param name="args">Argumenty formátované zprávy</param>
            public void DebugFormatted(string format, params object[] args)
            {
                Debug(string.Format(format, args));
            }
            /// <summary>
            /// Varovná zpráva
            /// </summary>
            /// <param name="message">Text varovné zpravy</param>
            /// <param name="exception">Logovaná vyjímka</param>
            public void Warn(object message, Exception exception)
            {
                if (IsWarnEnabled)
                    Write(message, exception);
            }
            /// <summary>
            /// POznamenání varovné zprávy
            /// </summary>
            /// <param name="message">Vrovná zpráva</param>
            public void Warn(object message)
            {
                Warn(message, null);
            }

            /// <summary>
            /// Kritická chyba
            /// </summary>
            /// <param name="message">Zpráva kritické chyby</param>
            public void Fatal(object message)
            {
                Fatal(message, null);
            }
            /// <summary>
            /// Kritická chyba
            /// </summary>
            /// <param name="message">Zprava kritické chyby</param>
            /// <param name="exception">Výjimka</param>
            public void Fatal(object message, Exception exception)
            {
                if (IsFatalEnabled)
                    Write(message, exception);
            }

            /// <summary>
            /// Informační zpráva
            /// </summary>
            /// <param name="message">Obsah zprávy do potokolu</param>
            public void Info(object message)
            {
                if (IsInfoEnabled)
                    Write(message, null);
            }
            /// <summary>
            /// Formátováné protokolování informaci
            /// </summary>
            /// <param name="format">Formát</param>
            /// <param name="args">Parametry formátu</param>
            public void InfoFormatted(string format, params object[] args)
            {
                Info(string.Format(format, args));
            }

            /// <summary>
            /// Indikuje povolení logování ladění
            /// </summary>
            public bool IsDebugEnabled { get; set; }
            /// <summary>
            /// Indikuje povolení logování Informačních zprav
            /// </summary>
            public bool IsInfoEnabled { get; set; }
            /// <summary>
            /// Indikuje povolení logování upozornění
            /// </summary>
            public bool IsWarnEnabled { get; set; }
            /// <summary>
            /// indikuje povolení logování chybových hlášení
            /// </summary>
            public bool IsErrorEnabled { get; set; }
            /// <summary>
            /// Indikuje povolení logování fatáních chyb
            /// </summary>
            public bool IsFatalEnabled { get; set; }
            /// <summary>
            /// Protokolování výjimky
            /// </summary>
            /// <param name="message">Zpráva výjimky</param>
            /// <param name="exception">Výjimka</param>
            public void Error(object message, Exception exception)
            {
                if (IsErrorEnabled)
                    Write(message, exception);
            }
            /// <summary>
            /// Protokolování chyby
            /// </summary>
            /// <param name="message">Zpráva chyby</param>
            public void Error(object message)
            {
                Error(message, null);
            }
            #endregion

            readonly System.IO.StringWriter writer;
            public Log()
            {
                this.writer = new System.IO.StringWriter();
                this.IsFatalEnabled = true;
                this.IsErrorEnabled = true;
                this.IsWarnEnabled = true;
                this.IsInfoEnabled = true;
                this.IsDebugEnabled = true;
            }

            void Write(object message, Exception exception)
            {
                if (message != null)
                    writer.WriteLine(message.ToString());
                if (exception != null)
                    writer.WriteLine(exception.ToString());
            }

            /// <summary>
            /// Uložení obsahu logu do souboru
            /// </summary>
            /// <param name="fileName">Název souboru pro uložení</param>
            public void Save(string fileName)
            {
                System.IO.File.WriteAllText(fileName, writer.ToString());
            }
        }
        private class GraphicSetting : Gordic.GFE.Parsers.Core.IGraphicSettingService
        {
            /// <summary>
            /// Výchozí rozlíšení mřížky grf sestav
            /// </summary>
            public string DefaultResolution { get; set; } = "5mm";
            /// <summary>
            /// Výchozí hodnota indikátoru zobrazení mřížky
            /// </summary>
            public bool DefaultShowGrid { get; set; } = false;
            /// <summary>
            /// Výchozí hodnota indikátoru zobrazení řazení
            /// </summary>
            public bool DefaultShowOrder { get; set; } = false;
            /// <summary>
            /// Výchozí hodnota zvětšení
            /// </summary>
            public float DefaultZoom { get; set; } = 1.0f;
            /// <summary>
            /// Výchozí hodnota indikátoru zobrazení mřížky
            /// </summary>
            public bool DefaultShowColorOf { get; set; } = true;

            #region Labels
            int stepBetween = 5;
            /// <summary>
            /// Indikuje krok mezí štítky
            /// </summary>
            public int StepBetween { get { return stepBetween; } set { stepBetween = value; } }

            int defaultLabelWidth = 20;
            /// <summary>
            /// Výchozí velikost štítku
            /// </summary>
            public int DefaultLabelWidth { get { return defaultLabelWidth; } set { defaultLabelWidth = value; } }

            int defaultGroupWidth = 10;
            /// <summary>
            /// Výchozí velikost skupiny
            /// </summary>
            public int DefaultGroupWidth { get { return defaultGroupWidth; } set { defaultGroupWidth = value; } }

            int defaultLabelFontSize = 15;
            /// <summary>
            /// Výchozí velikost písma štítku skupiny
            /// </summary>
            public int DefaultLabelFontSize { get { return defaultLabelFontSize; } set { defaultLabelFontSize = value; } }

            int defaultGroupFontSize = 7;
            /// <summary>
            /// Výchozí velikost písma štítku skupiny
            /// </summary>
            public int DefaultGroupFontSize { get { return defaultGroupFontSize; } set { defaultGroupFontSize = value; } }
            #endregion

            /// <summary>
            /// Pohled na obsah
            /// </summary>
            public IViewContent View { get => null; set { throw new NotImplementedException(); } }

            /// <summary>
            /// Získání hodnoty ShowGrid z nastavení pro daný pohled
            /// </summary>
            /// <param name="content">Pohled pro získání nastavení mřížky</param>
            /// <returns>TRUE  pokud v aktuálním pohledu se má zobrazit mřížka jinak FALSE</returns>
            public bool GetShowGrid(IViewContent content)
            {
                //if (content == null) return DefaultShowGrid;
                //return CommonService.GetShowGrid(content, DefaultShowGrid);
                return DefaultShowGrid;
            }
            /// <summary>
            /// Nastavení indikátoru zobrazení mřížky
            /// </summary>
            /// <param name="content">Pohled, pro který se hodnota nastavuje.
            /// Použij NULL pro aktuální pohled</param>
            /// <param name="value">Nastavovaná hodnota</param>
            public void SetShowGrid(IViewContent content, bool value)
            {
                //if (content == null) return;
                //CommonService.SetShowGrid(content, value);
            }
            /// <summary>
            /// Nastavení metody reakce na změnu zobrazení mřížky
            /// </summary>
            /// <param name="content">Pohled, na který se váže metoda</param>
            /// <param name="handlerChanged">Reakční metoda</param>
            public void AddShowGridChanged(IViewContent content, EventHandler handlerChanged)
            {
                //if (content == null) return;
                //CommonService.AddShowGridChanged(content, handlerChanged);
            }
            /// <summary>
            /// Odstranění metody reakce na změnu zobrazení mřížky
            /// </summary>
            /// <param name="content">Pohled, na který se váže metoda</param>
            /// <param name="handlerChanged">Reakční metoda</param>
            public void RemoveShowGridChanged(IViewContent content, EventHandler handlerChanged)
            {
                //if (content == null) return;
                //CommonService.RemoveShowGridChanged(content, handlerChanged);
            }
            /// <summary>
            /// Získání hodnoty ShowGrid z nastavení pro daný pohled
            /// </summary>
            /// <param name="content">Pohled pro získání nastavení mřížky</param>
            /// <returns>TRUE  pokud v aktuálním pohledu se má zobrazit mřížka jinak FALSE</returns>
            public bool GetShowOrder(IViewContent content)
            {
                //if (content == null) return DefaultShowOrder;
                //return CommonService.GetShowOrder(content, DefaultShowOrder);
                return DefaultShowOrder;
            }
            /// <summary>
            /// Nastavení indikátoru zobrazení mřížky
            /// </summary>
            /// <param name="content">Pohled, pro který se hodnota nastavuje.
            /// Použij NULL pro aktuální pohled</param>
            /// <param name="value">Nastavovaná hodnota</param>
            public void SetShowOrder(IViewContent content, bool value)
            {
                //if (content == null) return;
                //CommonService.SetShowOrder(content, value);
            }
            /// <summary>
            /// Nastavení metody reakce na změnu zobrazení mřížky
            /// </summary>
            /// <param name="content">Pohled, na který se váže metoda</param>
            /// <param name="handlerChanged">Reakční metoda</param>
            public void AddShowOrderChanged(IViewContent content, EventHandler handlerChanged)
            {
                //if (content == null) return;
                //CommonService.AddShowOrderChanged(content, handlerChanged);
            }
            /// <summary>
            /// Odstranění metody reakce na změnu zobrazení mřížky
            /// </summary>
            /// <param name="content">Pohled, na který se váže metoda</param>
            /// <param name="handlerChanged">Reakční metoda</param>
            public void RemoveShowOrderChanged(IViewContent content, EventHandler handlerChanged)
            {
                //if (content == null) return;
                //CommonService.RemoveShowOrderChanged(content, handlerChanged);
            }

            /// <summary>
            /// Získání hodnoty podbarvení z nastavení pro daný pohled
            /// </summary>
            /// <param name="content">Pohled pro získání podbarvení</param>
            /// <returns>TRUE  pokud v aktuálním pohledu se má zobrazit podbarvení jinak FALSE</returns>
            public bool GetShowColorOf(IViewContent content)
            {
                //if (content == null) return DefaultShowColorOf;
                //return CommonService.GetShowColorOf(content, DefaultShowColorOf);
                return DefaultShowColorOf;
            }
            /// <summary>
            /// Nastavení indikátoru podbarvení
            /// </summary>
            /// <param name="content">Pohled, pro který se hodnota nastavuje.
            /// Použij NULL pro aktuální pohled</param>
            /// <param name="value">Nastavovaná hodnota</param>
            public void SetShowColorOf(IViewContent content, bool value)
            {
                //if (content == null) return;
                //CommonService.SetShowColorOf(content, value);
            }
            /// <summary>
            /// Nastavení metody reakce na změnu zobrazení mřížky
            /// </summary>
            /// <param name="content">Pohled, na který se váže metoda</param>
            /// <param name="handlerChanged">Reakční metoda</param>
            public void AddShowColorOfChanged(IViewContent content, EventHandler handlerChanged)
            {
                //if (content == null) return;
                //CommonService.AddShowColorOfChanged(content, handlerChanged);
            }
            /// <summary>
            /// Odstranění metody reakce na změnu zobrazení mřížky
            /// </summary>
            /// <param name="content">Pohled, na který se váže metoda</param>
            /// <param name="handlerChanged">Reakční metoda</param>
            public void RemoveShowColorOfChanged(IViewContent content, EventHandler handlerChanged)
            {
                //if (content == null) return;
                //CommonService.RemoveShowColorOfChanged(content, handlerChanged);
            }

            /// <summary>
            /// Získání hodnoty Zoom z nastavení pro daný pohled
            /// </summary>
            /// <param name="content">Pohled pro získání hodnoty</param>
            /// <returns>Hodnota faktoru zvětšení</returns>
            public Utils.SizeValue GetResolution(IViewContent content)
            {
                //if (content == null) return new Utils.SizeValue(DefaultResolution);
                //return CommonService.GetResolution(content, DefaultResolution);
                return new Utils.SizeValue(DefaultResolution);
            }
            /// <summary>
            /// Nastavení faktoru zvětšení
            /// </summary>
            /// <param name="content">Pohled, pro který se hodnota nastavuje.
            /// Použij NULL pro aktuální pohled</param>
            /// <param name="value">Nastavovaná hodnota</param>
            public void SetResolution(IViewContent content, Utils.SizeValue value)
            {
                //if (content == null) return;
                //CommonService.SetResolution(content, value);
            }
            /// <summary>
            /// Nastavení metody reakce na změnu rozlišení
            /// </summary>
            /// <param name="content">Pohled, na který se váže metoda</param>
            /// <param name="handlerChanged">Reakční metoda</param>
            public void AddResolutionChanged(IViewContent content, EventHandler handlerChanged)
            {
                //if (content == null) return;
                //CommonService.AddResolutionChanged(content, handlerChanged);
            }
            /// <summary>
            /// Odstranění metody reakce na změnu rozlišení
            /// </summary>
            /// <param name="content">Pohled, na který se váže metoda</param>
            /// <param name="handlerChanged">Reakční metoda</param>
            public void RemoveResolutionChanged(IViewContent content, EventHandler handlerChanged)
            {
                //if (content == null) return;
                //CommonService.RemoveResolutionChanged(content, handlerChanged);
            }

            float? m_zoom = null;

            /// <summary>
            /// Získání hodnoty Zoom z nastavení pro daný pohled
            /// </summary>
            /// <param name="content">Pohled pro získání hodnoty</param>
            /// <returns>Hodnota faktoru zvětšení</returns>
            public float GetZoom(IViewContent content)
            {
                return m_zoom ?? DefaultZoom;
            }
            /// <summary>
            /// Nastavení faktoru zvětšení
            /// </summary>
            /// <param name="content">Pohled, pro který se hodnota nastavuje.
            /// Použij NULL pro aktuální pohled</param>
            /// <param name="value">Nastavovaná hodnota</param>
            public void SetZoom(IViewContent content, float value)
            {
                if (m_zoom != value)
                {
                    m_zoom = value;
                    (content.Control as LightFillerControl).Zoom = value;
                    //ZoomChanged?.Invoke(this, EventArgs.Empty);
                }
            }

            ///// <summary>
            ///// Volá se po změně faktoru zvětšení
            ///// </summary>
            //public event EventHandler ZoomChanged;

            /// <summary>
            /// Nastavení metody reakce na změnu zobrazení mřížky
            /// </summary>
            /// <param name="content">Pohled, na který se váže metoda</param>
            /// <param name="handlerChanged">Reakční metoda</param>
            public void AddZoomChanged(IViewContent content, EventHandler handlerChanged)
            {
                //if (content == null) return;
                //CommonService.AddZoomChanged(content, handlerChanged);
                //ZoomChanged += handlerChanged;
            }
            /// <summary>
            /// Odstranění metody reakce na změnu faktoru zvětšení
            /// </summary>
            /// <param name="content">Pohled, na který se váže metoda</param>
            /// <param name="handlerChanged">Reakční metoda</param>
            public void RemoveZoomChanged(IViewContent content, EventHandler handlerChanged)
            {
                //if (content == null) return;
                //CommonService.RemoveZoomChanged(content, handlerChanged);
                //ZoomChanged -= handlerChanged;
            }

            /// <summary>
            /// Uvolnění cach pro daný pohled
            /// </summary>
            /// <param name="content">Pohled</param>
            public void RemoveItem(IViewContent content)
            {
                //if (content == null) return;
                //CommonService.RemoveItem(content);
            }

            Dictionary<string, string> userdefinecolors = new Dictionary<string, string>();
            /// <summary>
            /// Seznam uživatelem definovaných barev
            /// </summary>
            public Dictionary<string, string> GetUserDefineColors() { return userdefinecolors; }

            /// <summary>
            /// Přidání záznamu do seznamu uživatelských barev
            /// </summary>
            /// <param name="key">Český název barvy</param>
            /// <param name="value">Anglický název - dle tohoto názvu se bude volat parser</param>
            public void AddUserDefineColors(string key, string value)
            {
                if (!userdefinecolors.ContainsKey(key))
                    userdefinecolors.Add(key, value);
            }

            int pageSpacing = 10;
            /// <summary>
            /// Rozestup mezí stránkami
            /// </summary>
            public int PageSpacing
            {
                get { return pageSpacing; }
                set { pageSpacing = value; }
            }

            int pageLeft = 0;
            /// <summary>
            /// Odstup stránky zlevá
            /// </summary>
            public int PageLeft
            {
                get { return pageLeft; }
                set { pageLeft = value; }
            }

            int firstPageTop = 0;
            /// <summary>
            /// Odstup stránky zlevá
            /// </summary>
            public int FirstPageTop
            {
                get { return firstPageTop; }
                set { firstPageTop = value; }
            }
        }
        //------------------------------------------------------------------
        #region Animations

        //------------------------------------------------------------------
        ///<summary> </summary>
        public bool Animated
        {
            get { return m_anims != null; }
        }

        public struct Animation : IDisposable
        {
            public DefaultAbstractContent c;
            public Gordic.Report.Implementation.BitmapWrap[] sprites;

            public void PaintFrame(Graphics graphics, int frame)
            {
                var bmp = sprites[frame];
                RectangleF rect = c.ContentBounds;
                graphics.DrawImageUnscaled(bmp, (int)Math.Ceiling(rect.Left), (int)Math.Ceiling(rect.Top));
            }

            public void Dispose()
            {
                foreach (Gordic.Report.Implementation.BitmapWrap sprite in sprites)
                    sprite.Dispose();
            }

        }

        Dictionary<ITagComponent, Animation> m_anims;
        public IEnumerable<Animation> Animations
        {
            get { return m_anims.Values; }
        }

        public Animation GetAnimation(ITagComponent c)
        {
            return m_anims[c];
        }
        public void StartAnimations(int spritesCount)
        {
            m_anims = new Dictionary<ITagComponent, Animation>();
            StartAnimations(spritesCount, Page as AbstractPage);
            Invalidate();
        }
        private void StartAnimations(int spritesCount, IEnumerable<ITagComponent> p)
        {
            foreach (ITagComponent c in p)
            {
                if (c is URAbstractContainer)
                {
                    StartAnimations(spritesCount, (URAbstractContainer)c);
                    continue;
                }

                if (c is DefaultContentChart)
                {
                    var sprites = ((DefaultContentChart)c).CreateAnimation(spritesCount);
                    m_anims.Add(c, new Animation() { c = (DefaultAbstractContent)c, sprites = sprites });
                }
            }
        }
        public void StopAnimations()
        {
            //StopAnimations(p);
            m_anims = null;
            Invalidate();
        }

        //private void StopAnimations(IEnumerable<ITagComponent> p)
        //{
        //    m_anims.Clear();
        //    foreach (ITagComponent c in p)
        //    {
        //        if (c is AbstractContainer)
        //        {
        //            StopAnimations((AbstractContainer)c);
        //            continue;
        //        }

        //        if (c is DefaultContentChart)
        //        {
        //            var sprites = ((DefaultContentChart)c).CreateAnimation(spritesCount);
        //            m_anims.Add(c, new Animation() { sprites = sprites });
        //        }
        //    }
        //}

        #endregion

        //------------------------------------------------------------------
        #region Edits & Contents
        public IEnumerable<ITagComponent> Contents
        {
            get
            {
                switch (CurrentMedia)
                {
                    case Media.screen:
                    case Media.window:
                        return ContentsOnAllPages;
                    default:
                        return (m_p as AbstractPage).All;
                }
            }
        }
        public IEnumerable<ITagComponent> ContentsOnAllPages
        {
            get
            {
                foreach (AbstractPage p in m_fc.Pages)
                    foreach (ITagComponent c in p.All)
                        yield return c;
            }
        }
        public IEnumerable<IEditableContent> Edits
        {
            get { return EditsOn(Contents); }
        }
        public IEnumerable<IEditableContent> EditsOnAllPages
        {
            get { return EditsOn(ContentsOnAllPages); }
        }
        private IEnumerable<IEditableContent> EditsOn(IEnumerable<ITagComponent> tags)
        {
            foreach (ITagComponent c in tags)
            {
                if (c is DefaultContentAttachment) continue; //vyloucim z Edits
                if (c is IEditableContent v)
                    if (v.DataItem.Edit && v.Visible) //volani Edit muze znovunacist data a vyvolat onData, coz muze zmenit Visible -> musi byt v tomto poradi
                        yield return v;
            }
        }

        private IEnumerable<T> VisiblesOn<T>(IEnumerable<T> tags)
        {
            foreach (T c in tags)
            {
                if (c is IVisibleComponent v)
                {
                    if (c is IDefaultDataItemHandler ih) ih.DataItem?.SetDisplayValue(); //muze znovunacist data a vyvolat onData, coz muze zmenit Visible -> musi byt v tomto poradi
                    if (v.Visible)
                        yield return c;
                }
                else
                    yield return c;
            }
        }
        //------------------------------------------------------------------
        public IEnumerable<DefaultContentText> Texts { get { return VisiblesOn(Contents.OfType<DefaultContentText>()); } }
        public IEnumerable<DefaultContentText> TextsOnAllPages { get { return VisiblesOn(ContentsOnAllPages.OfType<DefaultContentText>()); } }

        public IEnumerable<DefaultContentButton> Buttons { get { return VisiblesOn(Contents.OfType<DefaultContentButton>()); } }
        public IEnumerable<DefaultContentButton> ButtonsOnAllPages { get { return VisiblesOn(ContentsOnAllPages.OfType<DefaultContentButton>()); } }

        public IEnumerable<DefaultContentAttachment> Attachments { get { return VisiblesOn(Contents.OfType<DefaultContentAttachment>()); } }
        public IEnumerable<DefaultContentAttachment> AttachmentsOnAllPages { get { return VisiblesOn(ContentsOnAllPages.OfType<DefaultContentAttachment>()); } }

        //------------------------------------------------------------------

        public RectangleF GetInputInnerRectangleF(ITagComponent input, float x, float y, float w, float h)
        {
            var r = new RectangleF(x, y, w, h);
            r.Offset(input.Left, input.Top);
            r.Offset(m_offsetX, m_offsetY);
            return r;
        }

        public RectangleF GetInputRectangleF(ITagComponent input, RectangleF r)
        {
            r.Offset(m_offsetX, m_offsetY);
            return r;
        }
        public System.Drawing.Rectangle GetInputRectangle(ITagComponent input)
        {
            var cb = input.ContentBounds;
            cb.Offset(m_offsetX, m_offsetY);
            return Rectangle.Ceiling(cb);
        }
        public RectangleF GetInputRectangleF(ITagComponent input)
        {
            var cb = input.ContentBounds;
            cb.Offset(m_offsetX, m_offsetY);
            return cb;
        }
        public Rectangle GetInputRectangle(IEditableContent input)
        {
            var cb = input.ContentBounds;
            cb.Offset(m_offsetX, m_offsetY);
            return System.Drawing.Rectangle.Ceiling(cb);
        }

        public RectangleF GetCellRectangleF(ITagComponent input)
        {
            if (input == null) return RectangleF.Empty;
            RectangleF cb = new RectangleF(input.LeftZoom, input.TopZoom, input.WidthZoom, input.HeightZoom);
            cb.Offset(m_offsetX, m_offsetY);
            return cb;
        }
        public Rectangle GetCellRectangle(ITagComponent input)
        {
            return Rectangle.Ceiling(GetCellRectangleF(input));
        }
        public Rectangle GetCellRectangle(IEditableContent input)
        {
            return GetCellRectangle(input as ITagComponent);
        }
        #endregion
    }
}
