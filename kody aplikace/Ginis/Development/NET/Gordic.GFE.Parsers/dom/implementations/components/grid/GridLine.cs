//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.GridLine.cs                              </Name>
//    <Description> třída řádku tabulky                                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-27                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.Linq;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Utils;
using Gordic.Report.Implementation;
using System.ComponentModel;
using System.Runtime.InteropServices;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// třída řádku tabulky
    /// </summary>
    [ComVisible(false)]
    public sealed class GridLine : List<GridCell>, IContainerComponent, IParentable, ILineLite, ISizable, ITowedHandler, INamedComponent, IVisibleComponent, IScriptable, IDisposable
    {
        #region
        /// <summary>
        /// přidavatelný
        /// </summary>
        public bool Adding { get; set; }

        #endregion

        #region ILineLite
        public SizeValue Width
        {
            get => parent != null ? parent.Width : SizeValue.Empty;
            set { }
        }
        SizeValue height;
        /// <summary>
        /// výška řádku
        /// </summary>
        public SizeValue Height
        {
            get => Visible ? height : 0;
            set { height = value; }
        }

        /// <summary>
        /// indikuje změnu výšky
        /// </summary>
        [Browsable(false)]
        public bool IsHeightChanged { get => Exists(itm => itm.IsHeightChanged); }
        /// <summary>
        /// pozice zleva
        /// </summary>
        public SizeValue Left
        {
            get => parent != null ? parent.Left : SizeValue.Empty;
            set { }
        }
        SizeValue top;
        /// <summary>
        /// pozice TOP objektu
        /// </summary>
        public SizeValue Top
        {
            get => top;
            set
            {
                top = value;
                foreach (var item in this)
                    item.Top = value;
            }
        }
        /// <summary>
        /// šířka - včetně Zoom hodnoty
        /// </summary>
        public float WidthZoom { get => Width * Zoom; }
        /// <summary>
        /// výška - včetně Zoom
        /// </summary>
        public float HeightZoom { get => Height * Zoom; }
        /// <summary>
        /// Pozice zleva objektu - včetně Zoom hodnoty
        /// </summary>
        public float LeftZoom
        {
            get
            {
                if (Page != null)
                    return (Left + Page.MarginLeft) * Zoom
                        + Page.PagePanel.GSS.PageLeft;
                else
                    return Left * Zoom + Page.PagePanel.GSS.PageLeft;
            }
        }
        /// <summary>
        /// Pozice shora objektu - včetně Zoom hodnoty
        /// </summary>
        public float TopZoom
        {
            get
            {
                if (Page != null)
                    return (Top + Page.MarginTop) * Zoom + Page.TopZoom;
                else
                    return Top * Zoom;
            }
        }
        /// <summary>
        /// Velikost objektu v pixelech - se Zoom faktorem
        /// </summary>
        public RectangleF BoundsInPixels
        {
            get => new RectangleF(LeftZoom, TopZoom, WidthZoom, HeightZoom);
        }
        #endregion

        #region ITowedHandler
        /// <summary>
        /// získání objektu pod kurzorem
        /// </summary>
        /// <param name="point">pozice kurzoru vůči stránce</param>
        /// <returns>Objekt, který se nachází bezprostředně pod kurzorem</returns>
        public object GetTowedObject(PointF point)
        {
            List<object> res = new List<object>();
            foreach (var item in this)
            {
                object obj = item.GetTowedObject(point);
                if (obj != null)
                    res.Add(obj);
            }

            if (res.Count != 0)
                return res;

            return null;
        }
        /// <summary>
        /// pozice objektu <paramref name="item"/> v seznamu
        /// </summary>
        /// <param name="item">objekt, pozice kterého se hledá</param>
        /// <returns>číslo, prezentující pozici objektu <paramref name="item"/> v seznamu daného objektu.</returns>
        public int IndexOf(object item)
        {
            if (item is GridCell)
            {
                for (int index = 0; index < this.Count; index++)
                    if ((this[index] as GridCell) == item)
                        return index;
            }
            else
            {
                for (int index = 0; index < this.Count; index++)
                    if ((this[index] as GridCell).IndexOf(item) != -1)
                        return index;
            }
            return -1;
        }
        #endregion

        Color backColor;
        /// <summary>
        /// barva pozadí
        /// </summary>
        public Color BackColor { get => backColor; }

        /// <summary>
        /// veličina zvětšení
        /// </summary>
        public float Zoom { get => Page != null ? Page.Zoom : 1f; }

        /// <summary>
        /// nativní řádek
        /// </summary>
        public IGFormatContentGridLine NativeLine;

        DefaultContentGrid parent;
        /// <summary>
        /// vlastník řádku
        /// </summary>
        public DefaultContentGrid Parent { get => parent; }
        ISizable IParentable.Parent { get => parent; set { throw new NotSupportedException(); } }
        /// <summary>
        /// indikuje možnost manipulace s objektem
        /// </summary>
        public bool ReadOnly => false;

        readonly IPage page;
        /// <summary>
        /// stánka,které patří objekt
        /// </summary>
        public IPage Page { get => page; }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="parent">vlastník objektu</param>
        public GridLine(DefaultContentGrid parent)
        {
            this.parent = parent;
            this.page = parent.Page;
        }

        internal GridCell Load(DefaultAbstractContent cnt)
        {
            m_Name = "interactive";
            var nc = new GridCell(this);
            this.Add(nc);
            nc.Load(cnt);
            Relayout();
            return nc;
        }
        internal void Relayout()
        {
            SetInternalWidth();
            SetInternalLeft();
            SetInternalHeight(false);
        }

        /// <summary>
        /// načtení řádku
        /// </summary>
        internal void Load(IGFormatContentGridLine t, DataRegionGrr r, int index, GFEFormatRegion reg, Gordic.Report.Implementation.IGFormatDevTools dev, bool tryDelayed = false)
        {
            NativeLine = t;

            NativeLine.getAttribute("visible", out string tn);
            if (tn != null)
            {
                if (tn.Equals("false", StringComparison.OrdinalIgnoreCase))
                    m_Visible = false;
            }
#if DEBUG
            //if (m_Visible == false) return this;
#endif

            if (m_Visible == false || tryDelayed) { DelayLoad(r, index, reg, dev); return; }
            Load1(r, index, reg, dev);
        }
        static Guid cell_guid = typeof(IGFormatGRRCell).GUID;
        void Load1(IDataRegion r, int index, GFEFormatRegion reg, Gordic.Report.Implementation.IGFormatDevTools dev)
        {
            bool alt = false;
            if (index % 2 == 1)
            {
                var l_backColor = Parent.AltColor;
                if (l_backColor != null && l_backColor.Color != Color.Transparent)
                {
                    backColor = l_backColor.Color;
                    alt = true;
                }
            }
            if (alt == false)
            {
                NativeLine.getStyle(out IGFormatGRRCellStyle l_style);
                try
                {
                    l_style.getBackColor(out IGFormatGRRColor l_bkColor);
                    try
                    {
                        backColor = GFEColor.GetColor(l_bkColor);
                    }
                    finally
                    {
                        Marshal.ReleaseComObject(l_bkColor);
                        l_bkColor = null;
                    }
                }
                finally
                {
                    Marshal.ReleaseComObject(l_style);
                    l_style = null;
                }
            }

            NativeLine.getContentCount(out int cnt);
            for (int i = 0; i < cnt; i++)
            {
                NativeLine.getContent2(i, ref cell_guid, out object cell);
                if (cell != null) //muze to byt treba COMMENT
                {
                    try
                    {
                        var nc = new GridCell(this);
                        this.Add(nc); //kvuli Delayed potrebuju mit jiz pridano dobe cell.load
                        nc.Load(r, cell, reg, dev);
                        if (alt) nc.SetBackground(backColor);
                        if (nc.Count == 0) this.Remove(nc);
                    }
                    finally
                    {
                        Marshal.ReleaseComObject(cell);
                    }
                }
            }

            NativeLine.getAttribute("name", out string l_nam);
            if (string.IsNullOrEmpty(l_nam) == false)
            {
                var l_Name = new NamedHandler(l_nam, parent as IDefaultDataBound);
                foreach (var ni in l_Name)
                {
                    if (Int32.TryParse(ni.Name, out int i) == false) continue;
                    ni.Resolve(this[i - 1].TextContent);
                }
                m_Name = l_Name.Name;
                reg.RegisterNamedComponent(this);
            }

            SetInternalWidth();
            SetInternalLeft();
            SetInternalHeight(false);
        }

        #region Delay load pro neviditelné řádky
        private class DataRegionDelayed : IDataRegion, IDisposable
        {
            GridLine m_line;
            public int index;
            public GFEFormatRegion reg;
            public Gordic.Report.Implementation.IGFormatDevTools dev;

            public DataRegionDelayed(DataRegionGrr r, GridLine line, int index, GFEFormatRegion reg, Gordic.Report.Implementation.IGFormatDevTools dev)
            {
                m_line = line;
                this.index = index;
                this.reg = reg;
                this.dev = dev;

                m_Manager = r.Manager;
                m_Row = r.Row;
                m_RowIndex = r.RowIndex;

                line.NativeLine.getContentCount(out int cnt);
                m_strings = new string[cnt];
                for (int i = 0; i < cnt; i++)
                {
                    line.NativeLine.getContent(i, out IGFormatContent cc);
                    if (cc is IGFormatGRRCell)
                        (cc as IGFormatGRRCell).getContent(0, out cc);

                    var tx = r.GetFormattedValue(cc as IGDataCacheItem);
                    m_strings[i] = tx;
                }
            }
            public void Dispose()
            {
                dev = null;
                reg = null;
                m_line = null;
            }
            //------------------------------------------------------------------
            private DefaultDataManager m_Manager;
            ///<summary>Manager</summary>
            public DefaultDataManager Manager
            {
                get => m_Manager;
            }
            ///<summary>Skript Manager</summary>
            public ScriptManager ScriptManager
            {
                get => m_Manager.ScriptManager;
            }

            //------------------------------------------------------------------
            private readonly DataRow m_Row;
            private readonly int m_RowIndex;
            ///<summary>Manager</summary>
            public DataRow Row
            {
                get => m_Row;
            }

            #region IGDataRegionRow Members
            DataRow IDataRegion.GetDataRow(GFEList attributes, out int index) { index = m_RowIndex; return Row; }
            DataRow IDataRegion.GetDataRow(GFEList attributes, string componentName, bool throwOnNotFound, out int index) { index = m_RowIndex; return Row; }
            #endregion

            readonly string[] m_strings;

            string IDataRegion.GetFormattedValue(Gordic.Report.Implementation.IGFormatTag tag) { return null; }//TODO
            public string GetFormattedValue(DefaultAbstractContent component)
            {
                for (int i = m_line.Count - 1; i >= 0; i--)
                {
                    var cell = m_line[i];
                    var c = cell[0] as DefaultAbstractContent;
                    if (c == component) return GetFormattedValue(i);
                }
                return null;
            }
            public string GetFormattedValue(int i)
            {
                return m_strings[i];
            }
        }

        DataRegionDelayed m_delayed = null;
        internal void DelayLoad(DataRegionGrr r, int index, GFEFormatRegion reg, Gordic.Report.Implementation.IGFormatDevTools dev)
        {
            m_delayed = new DataRegionDelayed(r, this, index, reg, dev);

            NativeLine.getAttribute("name", out string l_nam);
            if (string.IsNullOrEmpty(l_nam) == false)
            {
                var l_Name = new NamedHandler(l_nam, parent as IDefaultDataBound);
                foreach (var ni in l_Name)
                {
                    if (Int32.TryParse(ni.Name, out int i) == false) continue;
                    var tx = m_delayed.GetFormattedValue(i - 1);
                    ni.Resolve(tx);
                }
                m_Name = l_Name.Name;
            }
            reg.RegisterNamedComponent(this);
        }
        internal void LoadFromDelayed()
        {
            Load1(m_delayed, m_delayed.index, m_delayed.reg, m_delayed.dev);
            m_delayed.Dispose();
            m_delayed = null;
        }
        #endregion

        string m_Name;
        /// <summary>Jméno, pokud řádek nějaké má</summary>
        public string Name
        {
            get => m_Name;
        }
        string INamedComponent.Class
        {
            get => null;
        }
        //------------------------------------------------------------------
        bool m_Visible = true;
        ///<summary>Viditelnost řádku</summary>
        public bool Visible
        {
            get => m_Visible;
            set
            {
                m_Visible = value;
                if (value && m_delayed != null)
                    LoadFromDelayed();
                parent.LineChanged(this);
            }
        }
        void IVisibleComponent.BeginUpdate() { parent.BeginUpdate(); }
        void IVisibleComponent.EndUpdate() { parent.EndUpdate(); }

        readonly object syncRoot = new object();
        /// <summary>
        /// kreslení řádku
        /// </summary>
        internal void OnPaint(Graphics graphics, PaintArgs args)
        {
            if (!Visible) return;

            //if (!graphics.VisibleClipBounds.IntersectsWith(BoundsInPixelsDeff))
            //{
            //    ThreadService.SafeThreadAsyncCall(loadFromDelayed);
            //    return;
            //}
            //else
            //    loadFromDelayed();

            // prvně je zapotřebí přepočítát obsah
            this.ForEach(cell => cell != null, cell => cell.SetDisplayData());

            //if (!isHActuall)
            SetInternalHeight(true);

            if (!graphics.VisibleClipBounds.IntersectsWith(BoundsInPixels))
                return;

            DrawClear(graphics);
            this.ForEach(TagService.PaintTag, graphics, args);
        }

        readonly object syncDelay = new object();
        void _LoadFromDelayed()
        {
            lock (syncDelay)
            {
                if (m_delayed != null)
                {
                    LoadFromDelayed();
                    parent.LineChanged(this);
                }
            }
        }

        void DrawClear(Graphics graphics)
        {
            if (backColor != Color.Transparent)
                using (SolidBrush drawBrush = new SolidBrush(backColor))
                    graphics.FillRectangle(drawBrush, BoundsInPixels);
        }

        /// <summary>
        /// načtení interní velikosti řádku
        /// </summary>
        /// <param name="byContent">v tomto případě se ignoruje již načtená velikost</param>
        void SetInternalHeight(bool byContent)
        {
            if (string.IsNullOrEmpty(Height.Value) || IsHeightChanged)
                lock (syncRoot)
                {
                    float max = 0;
                    bool first = true,
                        change = false;

                    // nastavení výšky vnitřním objektům
                    foreach (var item in this)
                    {
                        item.LoadHeight(byContent);
                        if (max < item.Height)
                        {
                            max = item.Height;
                            if (!first)
                                change = true;
                            if (first)
                                first = false;
                        }
                        // případ, kdy výška následujících objektů je menší než prvního
                        else if (change == false && Math.Round(max - item.Height, 2) != 0)
                            change = true;
                    }

                    if (change)
                        foreach (var item in this)
                            if (!item.Height.Equals(max))
                                item.Height = new SizeValue(max, !string.IsNullOrEmpty(item.Height.Metrics) ? item.Height.Metrics : "mm");

                    this.Height = new SizeValue(max);
                }
        }
        /// <summary>
        /// načtení interní vnitřních objektů řádku
        /// </summary>  
        void SetInternalWidth()
        {
            if (Width.Value != null)
                lock (syncRoot)
                {
                    // nastavení šířky vnitřním objektům
                    float counted = 0;
                    List<GridCell> cells = new List<GridCell>();
                    foreach (var item in this)
                    {
                        item.LoadWidth(this.Width);

                        if (!item.Width.IsEmpty && !item.IsWidthByRemainedPlace)
                        {
                            //MAL - snad ani neni potreba.    if (item.Width.Metrics == "%")
                            //    item.Width = new SizeValue(item.Width, "%", this.Width);
                            counted += item.Width;
                        }
                        else
                            cells.Add(item);
                    }
                    float rest = Width - counted;
                    GridCell cell;
                    if (rest != 0)
                    {
                        if (rest > 0)
                        {
                            if (cells.Count > 0)
                            {
                                float residue = rest / cells.Count;
                                foreach (var item in cells)
                                    item.Width = new SizeValue(residue, "%", Width);
                            }
                            else
                            {
                                cell = this.LastOrDefault(cl => cl.Width.Metrics.Equals("%"));

                                if (cell != null)
                                    cell.Width += rest;
                            }
                        }
                        else
                            while (rest < 0)
                            {
                                cell = this.LastOrDefault(cl => cl.Width.Value != null && cl.Width.Metrics.Equals("%") && (float)cl.Width != 0);
                                if (cell != null)
                                {
                                    float width = cell.Width;
                                    if (width + rest > 0)
                                    {
                                        cell.Width += rest;
                                        rest = 0;
                                    }
                                    else
                                    {
                                        cell.Width -= width;
                                        rest -= width;
                                    }
                                }
                                else break;
                            }
                    }
                }
        }
        /// <summary>
        /// aktualizace pozic LEFT všech vnitřních objektů řádku
        /// </summary>
        void SetInternalLeft()
        {
            lock (syncRoot)
            {
                float left = this.Left;
                foreach (var item in this)
                {
                    item.Left = new SizeValue(left);
                    left += item.Width;
                }
            }
        }

        #region IScriptable Members

        int IScriptable.getProperty(string name, out IDataScriptable value)
        {
            var ScriptManager = parent.ScriptManager;
            switch (name)
            {
                case "visible":
                    value = ScriptManager.Engine.GetScriptableNumber(name, Visible ? 1 : 0);
                    return 0;
                default:
                    value = null;
                    return 1;
            }
        }

        int IScriptable.setProperty(string name, IDataScriptable value)
        {
            var ScriptManager = parent.ScriptManager;
            switch (name)
            {
                case "visible":
                    using (var v = new GDataScriptable(ScriptManager.Engine, value))
                    {
                        Visible = v.ToInt() > 0;
                        return 0;
                    }
                default:
                    return 1;
            }
        }

        #endregion

        #region IDisposable Members

        /// <summary>
        /// Uvolněné objektu
        /// </summary>
        public void Dispose()
        {
            if (m_delayed != null)
            {
                m_delayed.Dispose();
                m_delayed = null;
            }

            foreach (var item in this)
                item.Dispose();

            NativeLine = null;
        }

        #endregion

        #region IContainerComponent Members
        object IContainerComponent.this[int index]
        {
            get => this[index];
        }
        IContainerComponent IContainerComponent.Parent { get => Parent; }
        #endregion
    }
}
