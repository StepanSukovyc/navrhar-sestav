//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ContentChart.cs                       </Name>
//    <Description> Graf pro formuláře                                          </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-14                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Runtime.InteropServices;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Utils;
using Gordic.Report.Implementation;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Graf pro formuláře
    /// </summary>
    public class DefaultContentChart : DefaultAbstractContent, IMouseComponent, IScriptable
    {
        #region AbstractContent
        /// <summary>
        /// Načtení informaci o objektu z formátu daného objektu
        /// </summary>
        public override void LoadInformation()
        {
            //Pokud položka není obrázkem, pak není co řešit
            if (!(FormatTag is GFEFormatContentChart || FormatTag.TagName.Equals("chart")))
                return;

            if (isLoaded)
                return;

            base.LoadInformation();

            ComponentType = ComponentType.chart;
            ContentChartWidth = new SizeValue(0);
            ContentChartHeight = new SizeValue(0);

            // zafixujeme objekt
            var _formatTag = (GFEFormatContentChart)FormatTag;
            switch (_formatTag.ImageWidth.mtr)
            {
                case Grr06Metrics.MMeters:
                    ContentChartWidth = new SizeValue(Math.Round(_formatTag.ImageWidth.met, 2) + "mm");
                    WidthSizeType = ImageSizeValueType.spec;
                    break;
                case Grr06Metrics.Percent:
                    ContentChartWidth = new SizeValue(Math.Round(_formatTag.ImageWidth.met, 2) + "%");
                    WidthSizeType = ImageSizeValueType.spec;
                    break;
                case Grr06Metrics.Points:
                    ContentChartWidth = new SizeValue(Math.Round(_formatTag.ImageWidth.met, 2) + "pt");
                    WidthSizeType = ImageSizeValueType.spec;
                    break;
                case Grr06Metrics.Twip:
                    ContentChartWidth = new SizeValue(Math.Round(_formatTag.ImageWidth.met) + "tw");
                    WidthSizeType = ImageSizeValueType.spec;
                    break;
                default:
                    if (_formatTag.ImageWidth.met == 0)
                        WidthSizeType = ImageSizeValueType.image;
                    else
                        WidthSizeType = ImageSizeValueType.cell;
                    break;
            }

            switch (_formatTag.ImageHeight.mtr)
            {
                case Grr06Metrics.MMeters:
                    ContentChartHeight = new SizeValue(Math.Round(_formatTag.ImageHeight.met, 2) + "mm");
                    HeightSizeType = ImageSizeValueType.spec;
                    break;
                case Grr06Metrics.Points:
                    ContentChartHeight = new SizeValue(Math.Round(_formatTag.ImageHeight.met, 2) + "pt");
                    HeightSizeType = ImageSizeValueType.spec;
                    break;
                case Grr06Metrics.Twip:
                    ContentChartHeight = new SizeValue(Math.Round(_formatTag.ImageHeight.met) + "tw");
                    HeightSizeType = ImageSizeValueType.spec;
                    break;
                default:
                    if (_formatTag.ImageHeight.met == 0)
                        HeightSizeType = ImageSizeValueType.image;
                    else
                        HeightSizeType = ImageSizeValueType.cell;
                    break;
            }
            isLoaded = true;
            //m_config = new Gordic.Report.Implementation.Charting.ChartConfig(Attributes);
        }
        /// <summary>
        /// vytvoření animace
        /// </summary>
        /// <param name="spritesCount"></param>
        /// <returns>obrázek animace</returns>
        public Gordic.Report.Implementation.BitmapWrap[] CreateAnimation(int spritesCount)
        {
            RectangleF rect = ContentBounds;
            float zoom = GraphicSettingService.Zoom;
            var chart = (GFEFormatContentChart)this.FormatTag;
            return chart.CreateChartAndMap(Data, (int)rect.Width, (int)rect.Height, zoom, spritesCount, out m_map, UrlBase ?? "chart");
        }
        /// <summary>
        /// kreslení prázdného objektu
        /// </summary>
        /// <param name="graphics">ovladač grafiky</param>
        public void PaintEmpty(Graphics graphics)
        {
            if (!graphics.VisibleClipBounds.IntersectsWith(BoundsInPixels))
                return;

            DrawClear(graphics, null);
        }
        Gordic.Report.Implementation.BitmapWrap m_bmp = null;
        protected override void DrawContent(Graphics graphics)
        {
            float zoom = GraphicSettingService.Zoom;
            float h = 0, w = 0;
            switch (WidthSizeType)
            {
                case ImageSizeValueType.cell:
                case ImageSizeValueType.image:
                    w = ContentBounds.Width;
                    break;
                default:
                    w = !ContentChartWidth.IsEmpty ? ContentChartWidth * zoom : ContentBounds.Width;
                    break;
            }
            switch (HeightSizeType)
            {
                case ImageSizeValueType.image:
                case ImageSizeValueType.cell:
                    h = ContentBounds.Height;
                    break;
                default:
                    h = !ContentChartHeight.IsEmpty ? ContentChartHeight * zoom : ContentBounds.Height;
                    break;
            }

            RectangleF rect = new RectangleF(ContentBounds.Left, ContentBounds.Top, w, h);

            var chart = (GFEFormatContentChart)this.FormatTag;
            if (m_bmp == null)
                m_bmp = chart.CreateChartAndMap(Data, (int)rect.Width, (int)rect.Height, Zoom, out m_map, UrlBase ?? "chart"
                    , backColor: BackColor.Color == Color.Transparent ? Color.Empty : BackColor.Color);
            if (m_bmp != null)
                graphics.DrawImageUnscaled(m_bmp, (int)Math.Ceiling(rect.Left), (int)Math.Ceiling(rect.Top));
            //graphics.FillRectangle(Brushes.Aqua, rect);
        }

        /// <summary>
        /// napojení dat k objektu
        /// </summary>
        /// <param name="data">region s daty</param>
        protected override void AttachData(IDataRegion data)
        {
            if (data != null && FormatTag != null)
            {
                m_manager = data.Manager; //potrebuji primo manager (kvuli .ScriptManager) i v pripade, ze mam data jiz predpocitana.
                string fmt = data.GetFormattedValue(this);
                if (fmt != null)
                {
                    m_data = fmt;
                }
                else
                {
                    var row = data.GetDataRow(AttrList, out _);
                    m_parser = m_manager.CreateParser(row, FormatTag.Region);
                }
            }
        }

        #endregion

        #region IChart
        /// <summary>
        /// Výška obrázku
        /// </summary>
        [Category("Graf")]
        [DisplayName("výška grafu")]
        [Description("Výška grafu")]
        public SizeValue ContentChartHeight { get; set; }

        /// <summary>
        /// Výška obrázku
        /// </summary>
        [Category("Graf")]
        [DisplayName("šířka grafu")] 
        [Description("Šířka grafu")]
        public SizeValue ContentChartWidth { get; set; }

        /// <summary>
        /// typ šířky
        /// </summary>
        [Browsable(false)]
        public ImageSizeValueType WidthSizeType { get; set; }

        /// <summary>
        /// typ výšky
        /// </summary>
        [Browsable(false)]
        public ImageSizeValueType HeightSizeType { get; set; }

        /// <summary>
        /// Výška obrázku
        /// </summary>
        [Category("Graf")]
        [DisplayName("typ grafu")]
        [Description("Typ grafu")]
        public Charting.ChartType ChartType { get; set; }
        #endregion

        IGraphicSettingService GSS = null;

        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <param name="item">položka s informaci o objektu</param>
        /// <param name="view">pohled objektu</param>
        public override void Initialize(GFEFormatTag item, IViewContent view)
        {
            base.Initialize(item, view);
            ComponentType = ComponentType.chart;
            if (GSS == null)
                GSS = GraphicSettingService.Instance;
            if (GSS != null)
                GSS.AddZoomChanged(view, ZoomChanged);

            LoadInformation();
        }
        /// <summary>Typ grafu</summary>
        public Gordic.Report.Implementation.Charting.ChartType Type
        {
            get { return (FormatTag as GFEFormatContentChart).Type; }
        }

        DataManagerNativeParser m_parser;
        DefaultDataManager m_manager;

        /// <summary>Správce skriptů</summary>
        public IFFScriptManager ScriptManager { get { return m_manager.ScriptManager; } }

        string m_data = null;
        /// <summary>
        /// data objektu
        /// </summary>
        public string Data
        {
            get { if (m_data == null) ComputeData(); return m_data; }
            set { m_data = value; if (m_bmp != null) { m_bmp.Dispose(); m_bmp = null; m_mp = null; m_map = ""; } }
        }

        void ComputeData()
        {
            if (m_parser != null)
            {
                if (!(FormatTag.NativeContent is IGDataCacheItem3 dci3)) return;

                var s = (FormatTag.Region.StructureItem as GFERegion).Structure;
                s.CompareToFormat(FormatTag.Region.Format.Native);

                dci3.computeValue(null, m_parser, out IDataData value);
                if (value != null)
                {
                    value.getString(out m_data);
                    Marshal.ReleaseComObject(value);
                }
                RunOnData();
            }
        }

        //------------------------------------------------------------------
        private GScript m_OnData;
        /// <summary>
        /// skript pri nactení hodnoty datového pole (vždy vyhodnoceno pouze jednou)
        /// vhodné pro zmenu dat (self.value)
        /// </summary>
        public GScript OnData
        {
            get
            {
                if (m_OnData == null && ScriptManager != null)
                {
                    var l_script = Scripts.GetValueDefault("onData", string.Empty);
                    if (l_script.Length == 0) return null;
                    m_OnData = ScriptManager.PrepareScript(FormatTag, "onData", l_script, this);
                }
                return m_OnData;
            }
        }
        //private bool m_inFormatting = false;
        /// <summary>
        /// Spuštění skriptu OnData
        /// </summary>
        public void RunOnData()
        {
            var s = OnData;
            if (s != null)
            {
                ScriptManager.RunScript(s);
            }
        }

        //------------------------------------------------------------------
        string m_map = "";
        GImageMap m_mp = null;
        /// <summary>
        /// obrázkivá mapa
        /// </summary>
        public GImageMap ImageMap
        {
            get
            {
                if (m_mp == null) m_mp = new GImageMap(m_map);
                return m_mp;
            }
        }

        /// <summary>
        /// Kliknutí na objekt
        /// </summary>
        /// <param name="x">Pozice X kliknutí</param>
        /// <param name="y">Pozice Y kliknutí</param>
        public void Click(float x, float y)
        {
            string rowHref = CheckMap(x - ContentBounds.Left, y - ContentBounds.Top);
            if (rowHref != null) Click(rowHref);
        }

        Dictionary<string, string> m_clickHRef;
        /// <summary>
        /// reakce na kliknutí
        /// </summary>
        /// <param name="rowHref">odkaz</param>
        public void Click(string rowHref)
        {
            GScript s;
            var l_script = Scripts.GetValueDefault("onClick", string.Empty);
            if (l_script.Length == 0) return;
            if (ScriptManager == null) return;
            s = ScriptManager.PrepareScript(FormatTag, "onClick", l_script, this);
            if (s == null) return;
            try
            {
                m_clickHRef = new Dictionary<string, string>();
                foreach (string p in Uri.UnescapeDataString(rowHref).Split(new char[] { '&', '?' }))
                {
                    var v = p.Split(new char[] { '=' }, 2);
                    if (v.Length < 2) continue;
                    m_clickHRef.Add(v[0], v[1]);
                }
                ScriptManager.RunScript(s);
            }
            finally
            {
                m_clickHRef = null;
                s.Dispose();
            }
        }

        string CheckMap(float x, float y)
        {
            var s = ImageMap.HitTest(x, y);
            if (s == null) return null;
            return s.Href;
        }

        #region IScriptable Members

        int IScriptable.getProperty(string name, out IDataScriptable value)
        {
            switch (name)
            {
                case "value":
                    var l_data = new GFormatChartScriptData(this);
                    value = ScriptManager.Engine.GetScriptableObject(name, l_data);
                    return 0;
                case "sector":
                    if (m_clickHRef != null)
                    {
                        value = ScriptManager.Engine.GetScriptableString(name, m_clickHRef["sector"]);
                        return 0;
                    }
                    break;
                case "X":
                    if (m_clickHRef != null)
                    {
                        value = ScriptManager.Engine.GetScriptableString(name, m_clickHRef["label"]);
                        return 0;
                    }
                    break;
                case "Y":
                    if (m_clickHRef != null)
                    {
                        value = ScriptManager.Engine.GetScriptableString(name, m_clickHRef["value"]);
                        return 0;
                    }
                    break;
            }

            var at = AttrList.GetValueDefault(name, null);
            if (at != null)
            {
                value = ScriptManager.Engine.GetScriptableString(name, at);
                return 0;
            }
            return base.GetProperty(ScriptManager, name, out value);
        }

        int IScriptable.setProperty(string name, IDataScriptable value)
        {
            string n = name.Replace('_', '-');
            switch (n)
            {
                case "explode":
                case "group-small":
                case "group-limit":
                    using (var v = new GDataScriptable(ScriptManager.Engine, value))
                    {
                        var val = v.ToString();
                        AttrList[n] = val;
                        ((GFEFormatContentChart)this.FormatTag).SetConfigAttribute(n, val);
                        return 0;
                    }
                default:
                    return base.SetProperty(ScriptManager, name, value);
            }
        }

        #endregion

        /// <summary>
        /// základní URL
        /// </summary>
        public string UrlBase { get; set; }
        /// <summary>
        /// uvolnění objektu
        /// </summary>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (m_OnData != null)
                    m_OnData.Dispose();
                if (m_bmp != null)
                    m_bmp.Dispose();
                if (GSS != null)
                    GSS.RemoveZoomChanged(_View, ZoomChanged);
            }

            base.Dispose(disposing);
        }

        /// <summary>Myš již není nad objektem</summary>
        public void HoverEnd()
        {
            (PagePanel as FillerPagePanel).TkHoverEnd(this);
        }
        /// <summary>Myš nad objektem</summary>
        /// <param name="x">X pozice myši</param>
        /// <param name="y">Y pozice myši</param>
        public void Hover(float x, float y)
        {
            var p = (PagePanel as FillerPagePanel).TkPoint(this, x, y);
            if (p.IsEmpty) return;
            string rowHref = CheckMap(x - ContentBounds.Left, y - ContentBounds.Top);
            if (rowHref != null)
            {
                var tooltip = SliceTooltip(rowHref) ?? Tooltip;
                if (tooltip != null)
                {
                    tooltip = tooltip.Replace("<b>", "").Replace("</b>", "").Replace("<br/>", "\n");
                    (PagePanel as FillerPagePanel).TkHover(this, x, y, Scripts.ContainsKey("onClick"), p, tooltip);
                    return;
                }
            }
            HoverEnd();
        }

        //pretizeni - tooltip neni (LK stejne resi Chart explicitne, TK jde pres Hover)
        string IMouseComponent.Tooltip
        {
            get => null;
        }

        /// <summary>Myš nad objektem</summary>
        /// <param name="rowHref">odkaz řádku</param>
        public string SliceTooltip(string rowHref)
        {
            if (rowHref == null) return null;

            var l_clickHRef = new Dictionary<string, string>();
            foreach (string p in Uri.UnescapeDataString(rowHref).Split(new char[] { '&', '?' }))
            {
                var v = p.Split(new char[] { '=' }, 2);
                if (v.Length < 2) continue;
                l_clickHRef.Add(v[0], v[1]);
            }
            return _Tooltip(l_clickHRef);
        }
        string _Tooltip(Dictionary<string, string> href)
        {
            try
            {
                var s = AttrList["tooltip"];
                if (s == null) return null;
                switch (s)
                {
                    //case "none":
                    //    return null;
                    case "label":
                        return Ttp_get(href, "label", "xLabel");
                    case "value":
                        return Ttp_get(href, "value");
                    case "percent":
                        return Ttp_get(href, "percent") + " %";
                    case "label-value":
                        return string.Format("{0} ({1})", Ttp_get(href, "label", "xLabel"), Ttp_get(href, "value"));
                    case "label-percent":
                        return string.Format("{0}{1}", Ttp_get(href, "label", "xLabel"), Ttp_perc(Ttp_get(href, "percent")));
                    case "true":
                    case "yes":
                    case "all":
                    case "label-value-percent":
                        return string.Format("<b>{0}</b><br/>{1}{2}", Ttp_get(href, "label", "xLabel"), Ttp_get(href, "value"), Ttp_perc(Ttp_get(href, "percent")));
                }
                return null;
            }
            catch { return null; }
        }

        string Ttp_perc(string p)
        {
            if (string.IsNullOrWhiteSpace(p)) return "";
            return " (" + p + " %)";
        }

        static string Ttp_get(Dictionary<string, string> href, params string[] names)
        {
            foreach (string n in names)
                if (href.TryGetValue(n, out string v))
                    return v;
            return "";
        }

        void ZoomChanged(object sender, EventArgs e)
        {
            if (m_bmp != null)
            {
                m_bmp.Dispose();
                m_bmp = null;
                m_mp = null;
                m_map = "";
            }
        }
    }

    internal class GFormatChartScriptData : IScriptableContainer2, IScriptableContainer, IScriptable
    {
        private List<string> data;
        private DefaultContentChart c;

        public GFormatChartScriptData(DefaultContentChart c)
        {
            this.c = c;
            this.data = new List<string>(c.Data.TrimEnd('|').Split('|'));
        }
        private string K(string d)
        {
            var i = d.IndexOf('=');
            return d.Substring(0, i);
        }
        private string V(string d)
        {
            var i = d.IndexOf('=');
            return d.Substring(i + 1);
        }
        private string Find(string key)
        {
            foreach (var d in data)
                if (K(d) == key) return V(d);
            return null;
        }
        private void Refresh()
        {
            c.Data = string.Join("|", data) + "|";
        }

        public int getProperty([MarshalAs(UnmanagedType.LPStr)] string name, out IDataScriptable value)
        {
            value = null;
            return 1;
        }
        public int setProperty([MarshalAs(UnmanagedType.LPStr)] string name, IDataScriptable value)
        {
            return 1;
        }

        public int getContainerLength(out int len)
        {
            len = data.Count;
            return 0;
        }
        public int getContainerKey(int index, out IDataScriptable key)
        {
            key = c.ScriptManager.Engine.GetScriptableString("", K(data[index]));
            return 0;
        }
        public int getContainerItem(IDataScriptable index, out IDataScriptable value)
        {
            string d;
            using (var i = new GDataScriptable(c.ScriptManager.Engine, index))
            {
                switch (i.Type)
                {
                    case GScriptableType.Scriptable_type_number:
                        d = data[i.ToInt()];
                        if (d != null)
                        {
                            value = c.ScriptManager.Engine.GetScriptableString("", V(d));
                            return 0;
                        }
                        break;
                    case GScriptableType.Scriptable_type_string:
                        d = Find(i.ToString());
                        if (d != null)
                        {
                            value = c.ScriptManager.Engine.GetScriptableString("", V(d));
                            return 0;
                        }
                        break;
                }
            }
            value = null;
            return 1;
        }

        public int addContainerItem(IDataScriptable key, IDataScriptable value)
        {
            using (var k = new GDataScriptable(c.ScriptManager.Engine, key))
            using (var v = new GDataScriptable(c.ScriptManager.Engine, value))
                data.Add(k.ToString() + "=" + v.ToString());
            Refresh();
            return 0;
        }

        public int setContainerItem(IDataScriptable index, IDataScriptable value)
        {
            string key;
            using (var kk = new GDataScriptable(c.ScriptManager.Engine, index))
                key = kk.ToString();

            for (int i = 0; i < data.Count; i++)
            {
                var d = data[i];
                if (K(d) == key)
                {
                    using (var v = new GDataScriptable(c.ScriptManager.Engine, value))
                        data[i] = key + "=" + v.ToString();
                    Refresh();
                    return 0;
                }
            }
            return 1;
        }

        public int deleteContainerItem(IDataScriptable index)
        {
            string key;
            using (var kk = new GDataScriptable(c.ScriptManager.Engine, index))
                key = kk.ToString();

            for (int i = 0; i < data.Count; i++)
            {
                var d = data[i];
                if (K(d) == key) { data.RemoveAt(i); Refresh(); return 0; }
            }
            return 1;
        }
    }

}
