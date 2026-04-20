//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DefaultContentGrid.cs                    </Name>
//    <Description> Graf pro formuláře                                          </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-14                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.Linq;
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
    public class DefaultContentGrid : DefaultAbstractContent, ITowedHandler, IDisposable, IDefaultDataBound, IContainerComponent, IScriptable
    {
        #region DefaultAbstractContent
        /// <summary>
        /// Načtení informaci o objektu z formátu daného objektu
        /// </summary>
        public override void LoadInformation()
        {
            //Pokud to není textové pole pak není co řešit
            if (!(FormatTag is GFEFormatUnknownContent
                && (FormatTag as GFEFormatUnknownContent).TagName.Equals("grid", StringComparison.InvariantCultureIgnoreCase)))
                return;

            if (isLoaded)
                return;

            base.LoadInformation();

            if (AttrList.ContainsKey("alt-color"))
            {
                altColor = new ComplexColor();
                altColor.Initialize(AttrList["alt-color"]);
            }

            if (AttrList.ContainsKey("head-color"))
            {
                headColor = new ComplexColor();
                headColor.Initialize(AttrList["head-color"]);
            }

            ComponentType = ComponentType.grid;
        }
        /// <summary>
        /// kreslení objektu
        /// </summary>
        /// <param name="graphics">ovladač grafiky</param>
        /// <param name="args">Upřesnení co a jak vykreslovat</param>
        public override void OnPaint(Graphics graphics, PaintArgs args)
        {
            ReloadIfNeeded();
            if (Visible == false) return;
#if DEBUG
            //graphics.DrawRectangle(Pens.Red, LeftZoom, TopZoom, WidthZoom, HeightZoom);
#endif
            if (m_lines != null)
                // projdeme všechny řádky a nakreslíme je
                foreach (var item in m_lines)
                    item.OnPaint(graphics, args);
        }

        /// <summary>
        /// napojení dat k objektu
        /// </summary>
        /// <param name="dataRegion">region s daty</param>
        protected override void AttachData(IDataRegion dataRegion)
        {
            if (dataRegion != null && FormatTag != null)
            {
                var row = dataRegion.GetDataRow(AttrList, out _);
                m_parser = dataRegion.Manager.CreateParser(row, FormatTag.Region);
            }
        }

        //------------------------------------------------------------------
        /// <summary>
        /// Spuštění skriptu OnData
        /// </summary>
        public void RunOnData()
        {
            if (ScriptManager == null) return;

            var l_script = this.Scripts.GetValueDefault("onData", string.Empty);
            if (l_script.Length == 0) return;

            using (var s = ScriptManager.PrepareScript(this.FormatTag, "onData", l_script, this))
            {
                ScriptManager.RunScript(s);
            }
        }
        protected internal override void AfterLoad()
        {
            ComputeData();
        }
        bool m_needReload = false;
        public bool IsReloadNeeded() => m_needReload;
        internal void ReloadDelayed() { m_needReload = true; }
        internal void ReloadIfNeeded()
        {
            if (m_needReload) ReloadNow();
        }
        internal void ReloadNow()
        {
            m_needReload = false;
            //zjisteni aktualne oznaceneho contentu
            int l = -1, c = -1, t = -1;
            bool b = false;

            if (PagePanel != null)
                try
                {
                    var sel = PagePanel.ServiceSelection.PrimarySelection;
                    b = FindGrid(sel, out l, out c, out t);
                    if (b)
                    {
                        if (l < 0) { l = 0; c = 0; t = 0; }
                        else if (c < 0) { c = 0; t = 0; }
                        else if (t < 0) t = 0;
                        //System.Diagnostics.Debug.Assert(l >= 0);
                        //System.Diagnostics.Debug.Assert(c >= 0);
                        //System.Diagnostics.Debug.Assert(t >= 0);
                    }
                }
                catch { b = false; }

            //prepocet radku gridu
            m_parser.Reset();
            ComputeData();
            m_needReload = false; //jeste jednou zhodim load. kdyby nahodou se to nahodilo behem prepoctu (třeba skriptem)

            //opetovne oznaceni jiz noveho contentu na stejne pozici
            if (b)
                try
                {
                    PagePanel.ServiceSelection.SetSelectedComponents(this.Lines[l][c][t], System.ComponentModel.Design.SelectionTypes.Replace);
                }
                catch { }
        }

        private bool FindGrid(object c, out int line, out int cell, out int cont)
        {
            line = -1;
            cell = -1;
            cont = 0;
            while (true)
            {
                if (c is DefaultContentGrid g) return g == this;
                if (c is IContainerComponent cc)
                {
                    if (cc is GridLine cl) line = cc.Parent.IndexOf(cc);
                    if (cc is GridCell ce) cell = cc.Parent.IndexOf(cc);
                    c = cc.Parent;
                }
                else
                {
                    if (c is DefaultAbstractContent a)
                    {
                        c = a.Parent;
                        if (c is IContainerComponent cc2)
                            cont = cc2.IndexOf(a);
                    }
                    else
                        return false;
                }
            }
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
            if (Lines != null)
            {
                foreach (var item in Lines)
                    if (item is ITowedHandler)
                        if (item.BoundsInPixels.Contains(point))
                        {
                            object obj = (item as ITowedHandler).GetTowedObject(point);
                            if (obj != null)
                                res.Add(obj);
                        }

                if (res.Count != 0)
                    return res;
            }

            if (this is IZoomSizable)
                return (this as IZoomSizable).BoundsInPixels.Contains(point) ? this : null;
            else
                return null;
        }

        /// <summary>
        /// pozice objektu <paramref name="item"/> v seznamu
        /// </summary>
        /// <param name="item">objekt, pozice kterého se hledá</param>
        /// <returns>číslo, prezentující pozici objektu <paramref name="item"/> v seznamu daného objektu.</returns>
        public int IndexOf(object item)
        {
            if (Lines != null)
            {
                if (item is GridLine)
                    return Lines.IndexOf(item as GridLine);

                foreach (var line in Lines)
                    if (line is ITowedHandler)
                    {
                        int index = (line as ITowedHandler).IndexOf(item);
                        if (index != -1)
                            return index;
                    }
            }
            return -1;
        }
        #endregion

        ComplexColor altColor = null;
        /// <summary>
        /// barva každého druhého řádku
        /// </summary>
        public IComplexColor AltColor { get { return altColor; } }

        ComplexColor headColor = null;
        /// <summary>
        /// barva každého druhého řádku
        /// </summary>
        public IComplexColor HeadColor { get { return headColor ?? BackColor; } }

        /// <summary>Správce skriptů</summary>
        public ScriptManager ScriptManager { get { return m_parser.Manager.ScriptManager; } }

        /// <summary>Správce dat</summary>
        public DefaultDataManager DataManager { get { return m_parser.Manager; } }
        System.Data.DataRow IDefaultDataBound.DataRow { get { return m_parser.CurrentRow; } }

        /// <summary>
        /// seznam řádků objektu GRID
        /// </summary>
        public IList<GridLine> Lines { get { if (m_lines == null) return new List<GridLine>(); return m_lines.AsReadOnly(); } }

        List<GridLine> m_lines;
        DataManagerNativeParser m_parser;

        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <param name="item">položka s informaci o objektu</param>
        /// <param name="view">pohled objektu</param>
        public override void Initialize(GFEFormatTag item, IViewContent view)
        {
            base.Initialize(item, view);
            ComponentType = ComponentType.grid;
            LoadInformation();
        }
        protected override void Dispose(bool disposing)
        {
            if (disposing)
                if (m_lines != null)
                {
                    foreach (var item in m_lines)
                        item.Dispose();
                    m_lines = null;
                }

            base.Dispose(disposing);
        }

        void ComputeData()
        {
            if (m_lines != null)
                foreach (GridLine line in m_lines)
                    line.Dispose();
            m_lines = new List<GridLine>();
            if (!(FormatTag.NativeContent is IGFormatContentGrid g)) return;

            RunOnData();
            if (this.Visible == false) return;

            var s = (FormatTag.Region.StructureItem as GFERegion).Structure;
            s.CompareToFormat(FormatTag.Region.Format.Native);

            using (var it = new GridIterator(this))
            {
                Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(g.computeValue(null, m_parser, it));
                it.Finish();
                GrowBy(it.growBy);
            }
        }

        void GrowBy(float growBy)
        {
            if (growBy > 0F) //roztahnuti stranky?!
            {
                var t = Top;
                var b = t + Height;

                Page.Height += growBy;  //stranka samotná
                IEnumerable<ITagComponent> cmps = ((DefaultPage)Page)
                    //.All
                    //.Where(itm => !(itm.Parent is GridLine) || !this.Lines.Contains(itm.Parent as GridLine))
                    .AllBut(this)
                    ;

                foreach (var c in cmps) //posunuti vsech objektu na strance pode mnou
                {
                    //if (c.Top >= t)
                    //{
                    //    if (c.Top >= b) //pod
                    //        c.Top += growBy;
                    //    else
                    //        c.Height += growBy;
                    //}
                    if (c.Top >= b) //pod
                        c.Top += growBy;
                }
                this.Height += growBy; //roztahnu jen sam sebe
            }
        }

        internal bool InteractiveOverflow
        {
            get { return AttrList.GetValueDefault("interactive-overflow", string.Empty) == "grow"; }
        }

        bool m_inUpdate = false;
        public override void BeginUpdate() { m_inUpdate = true; }
        public override void EndUpdate()
        {
            RealLineChanged();
            m_inUpdate = false;
        }

        int m_lineChanged = int.MaxValue;
        internal void LineChanged(GridLine l)
        {
            int i = m_lines.IndexOf(l);
            if (i < 0) return; //kde se vzala?

            m_lineChanged = Math.Min(m_lineChanged, i);
            if (m_inUpdate == false) RealLineChanged();
        }
        private void RealLineChanged()
        {
            if (m_lineChanged == int.MaxValue) return;
            var i = m_lineChanged;
            m_lineChanged = int.MaxValue;
            GridLine l = m_lines[i];

            var top = l.Top;
            var bottom = Top + Height;
            float growBy = 0F;

            while (true)
            {
                l.Top = new SizeValue(top);
                top += l.Height;
                if (top >= bottom && InteractiveOverflow)
                    growBy = top - bottom;

                i++;
                if (m_lines.Count <= i) break;
                l = m_lines[i];
            }

            GrowBy(growBy);
        }

        private class GridIterator : IGFormatGridFillCallback, IGFormatGridFillCallback2, IDisposable
        {
            DefaultContentGrid g;
            IGFormatContentGrid nativeGrid;
            //IGFormatContentGridLine header;

            int m_index = 0;
            float top;
            readonly float bottom;

            public float growBy = 0F;

            GFEFormat Format;
            readonly IGFormatDevTools dev;
            GFEFormatRegion Region;
            GFEStructure Structure;
            Dictionary<IntPtr, GFEFormatRegion> m_regions;

            public GridIterator(DefaultContentGrid g)
            {
                this.g = g;

                nativeGrid = g.FormatTag.NativeContent as IGFormatContentGrid;
                //nativeGrid.getHeader(out header);
                //if (header != null)
                //{
                //    Marshal.ReleaseComObject(header);
                //    //borrowed ref
                //}

                top = g.Top;
                bottom = g.Top + g.Height;

                Structure = g.Page.PagePanel.Structure;
                Region = g.FormatTag.Region;
                Format = Region.Format;
                dev = Format.Native as IGFormatDevTools;

                m_regions = new Dictionary<IntPtr, GFEFormatRegion>();
                var ptr = Marshal.GetIUnknownForObject(Region.NativeContent);
                m_regions.Add(ptr, Region);
                Marshal.Release(ptr);
            }
            public void Dispose()
            {
                foreach (KeyValuePair<IntPtr, GFEFormatRegion> f in m_regions)
                {
                    if (f.Value == Region) continue;
                    //Marshal.ReleaseComObject(f.Key);
                    f.Value.Dispose();
                }
                m_regions.Clear();
                //if (header != null)
                //{
                //    Marshal.ReleaseComObject(header);
                //    header = null;
                //}
            }

            public bool RunOnlyIf(string condscript, IScriptOwner owner, DataRegionGrr dr, IPage page)
            {
                if (dr.ScriptManager == null) throw new ArgumentOutOfRangeException();

                using (var s = dr.ScriptManager.PrepareExpression(owner, "only-if", condscript, dr.Row, dr.Manager, page))
                {
                    using (var ret = dr.ScriptManager.RunExpression(s))
                    {
                        return ret != null && ret.ToInt() != 0;
                    }
                }
            }
            (DataRegionGrr, GFEFormatRegion, int, IntPtr) m_lastRegion = default; //optimalizace pro víceřádkové gridy. Navíc po prvním řádku se spustí skripty, které mohou data měnit a druhý řádek pak měl jiný Row než první!
            GFEFormatRegion m_lastAddingRegion = null;
            public int fillRow(IGDataParser dr, IGFormatTag t, IGDataCacheFillerRow2 r)
            {
                DataRegionGrr row = null;
                IGFormatRegion reg; r.getRegion(out reg);
                GFEFormatRegion region;
                try
                {
#if DEBUG
                    //if(g.m_lines.Count>200) return 1;
#endif
                    if (!(t is IGFormatContentGridLine line)) return 0; //tento nechci. ale treba budou dalsi lepsi (kdybych vratil FALSE, tak se prerusi cely region)

                    var ptr = Marshal.GetIUnknownForObject(reg); Marshal.Release(ptr);
                    if (m_lastRegion.Item3 == g.m_parser.CurrentRowIndex && m_lastRegion.Item4 == ptr) { (row, region, _, _) = m_lastRegion; row.Attach(dr, r); }
                    else
                    {
                        row = new DataRegionGrr(g.m_parser.Manager, g.m_parser, dr, r); //CurrentRow muze byt neco uplne jineho, pokud jde o seskupeni atp.
                        region = GetRegion(reg);
                        m_lastRegion = (row, region, g.m_parser.CurrentRowIndex, ptr);
                    }

#if DEBUG
                    reg.getName(out var regname);
                    System.Diagnostics.Debug.Assert(regname == row.Row.Table.TableName);
#endif

                    //zpracovani znacky only-if="..."
                    line.getAttribute("only-if", out var l_condscript);
                    if (l_condscript != null)
                        using (var u = GFEFormatTag.CreateBorrowed(region, t, dev))
                            if (RunOnlyIf(l_condscript, u, row, g.Page) == false) return 0;
                    //dcr2->getDataScript(&script); -> Native vraci S_FALSE

                    int index;
                    //if (header == t) index = -1;
                    //else 
                    index = m_index++;

                    var l = new GridLine(g);
                    l.Load(line, row, index, region, dev);
                    //l.Load(line, row, index, region, dev, tryDelayed: top > 2000);

                    if (region.Attributes.ContainsKey("interactive-remove")
                        && g.CanAddLines
                        && region.LastLine()?.NativeContent == line //poslední řádek
                        )
                    {
                        g.AddInteractiveRemove(row, region, l);
                    }

                    l.Top = new SizeValue(top);
                    top += l.Height;
                    if (top < bottom)
                        g.m_lines.Add(l);
                    else
                    {
                        if (g.InteractiveOverflow)
                        {
                            growBy = top - bottom;
                            g.m_lines.Add(l);
                        }
                    }

                    if (m_lastAddingRegion == null && region.Attributes.ContainsKey("interactive-add") && g.CanAddLines)
                        m_lastAddingRegion = region;
                    else if (m_lastAddingRegion != null && region != m_lastAddingRegion)
                        _AddInteractive(m_lastAddingRegion);
                }
                finally //nutne uvolnit jeste v teto metode!
                {
                    if (row != null) row.Release();
                    Marshal.ReleaseComObject(reg);
                    Marshal.ReleaseComObject(r);
                    Marshal.ReleaseComObject(t);
                }
                return 0;
            }
            //nova metoda endregion z c++ za poslednim radkem dane oblasti a osetrit ze neprisel zadny radek -> AddInteractiveAdd 
            public int endregion(IGDataParser dr, IGFormatRegion r)
            {
                try
                {
                    GFEFormatRegion region = GetRegion(r);
                    System.Diagnostics.Debug.Assert(m_lastAddingRegion == null || m_lastAddingRegion == region);
                    if (region.Attributes.ContainsKey("interactive-add") && g.CanAddLines)
                    {
                        _AddInteractive(region);
                    }
                }
                finally
                {
                    Marshal.ReleaseComObject(r);
                }
                return 0;
            }
            public void Finish()
            {
                if (m_lastAddingRegion != null) _AddInteractive(m_lastAddingRegion);
            }
            private void _AddInteractive(GFEFormatRegion r)
            {
                var l = g.AddInteractiveAdd(r);
                l.Top = new SizeValue(top);
                top += l.Height;
                if (top < bottom)
                    g.m_lines.Add(l);
                else
                {
                    if (g.InteractiveOverflow)
                    {
                        growBy = top - bottom;
                        g.m_lines.Add(l);
                    }
                }
                m_lastAddingRegion = null;
            }

            private GFEFormatRegion GetRegion(IGFormatRegion reg)
            {
                //string rname;
                //reg.getName(out rname);

                //if (Region.Name == rname)
                //    region = Region;
                //else
                //{
                //    //TODO: regiony by se mohli predpripravit jiz pri Init celeho gridu. Obvykle bude jen 1...
                //    region = new GFEFormatRegion(Format, reg, dev);
                //    region.SetStructureItem(CommonService.GetRegionFromStructure(Structure, region.DataFullName));
                //}
                var ptr = Marshal.GetIUnknownForObject(reg);Marshal.Release(ptr);
                if (m_regions.TryGetValue(ptr, out GFEFormatRegion region) == false)
                {
                    reg.getParent(out IGFormatRegion p);
                    try
                    {
                        region = new GFEFormatRegion(Format, GetRegion(p), reg, dev);
                    }
                    finally
                    {
                        Marshal.ReleaseComObject(p);
                    }
                    //var s = CommonService.GetRegionFromStructure(Structure, region.DataFullName);
                    var s = Structure.GetRegion(region.Name, (GFERegion)Region.StructureItem);
                    region.SetStructureItem(s);
                    m_regions.Add(ptr, region);
                }
                return region;
            }
        }

        #region IContainerComponent Members

        int IContainerComponent.Count
        {
            get { return m_lines == null ? 0 : m_lines.Count; }
        }

        object IContainerComponent.this[int index]
        {
            get => m_lines.Count > index ? m_lines[index] : null;
        }

        int IContainerComponent.IndexOf(object item) => m_lines.IndexOf((GridLine)item);

        IContainerComponent IContainerComponent.Parent { get => this.FindContainer(); }

        #endregion

        #region IScriptable Members

        int IScriptable.getProperty(string name, out IDataScriptable value)
        {
            switch (name)
            {
                case "addRow":
                    value = ScriptManager.Engine.GetScriptableMethod(name, args =>
                    {
                        using (var a0 = new GDataScriptable(ScriptManager.Engine, args[0]))
                        {
                            var regionName = a0.ToString();
                            ScriptManager.RunWhenDone(() => AddRow(regionName));
                        }
                        return null;
                    });
                    return 0;
                case "refresh":
                    value = ScriptManager.Engine.GetScriptableMethod(name, args =>
                    {
                        ScriptManager.RunWhenDone(() => ReloadNow());
                        return null;
                    });
                    return 0;
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
            switch (name)
            {
                default:
                    return base.SetProperty(ScriptManager, name, value);
            }
        }

        #endregion

        /// <summary>Je grid přidávatelný?</summary>
        public bool CanAddLines
        {
            get => _View.IsReadOnly == false;
        }

        public bool HasRegion(string regionName) =>
            this.FormatTag.Children?.Find(t => (t is GFEFormatRegion r) && r.HasChildRecursive(regionName)) != null;

        private void AddRow(string regionName)
        {
            //uvedeny region musi byt v Children
            var reg = (this.FormatTag.Children?.Find(t => (t is GFEFormatRegion region) && region.Name == regionName)) ?? throw new General.GArgumentException(21000025, 21000026, regionName);
            AddRow((GFEFormatRegion)reg);
        }
        private void AddRow(GFEFormatRegion reg)
        {
            //reg muze byt region, ktery neni v Children (treba je az v Children nektereho Childu)
            string regionName = reg.Name;

            //taky musi byt jako tabulka v DataSetu
            //var tbl = m_parser.CurrentRow.Table.DataSet.Tables[regionName];
            var tbl = DataManager.Data.Tables[regionName] ?? throw new General.GArgumentException(21000026, 21000026, regionName);
            //pridani radku
            var l_row = tbl.Rows.Add();
            //vyplneni Parent-Id
            try
            {
                var id = m_parser.CurrentRow["_Id"];
                l_row["_Pid"] = id;
            }
            catch { }
            l_row.AcceptChanges();

            //vyvolani onNewRow skriptu, je-li pritomen
            var l_script = reg.Attributes.GetValueDefault("onNewRow", string.Empty);
            if (l_script.Length > 0)
                using (var l_newRow = ScriptManager.PrepareScript(FormatTag, "onNewRow", l_script, this, addItems: false))
                {
                    ScriptManager.AddRegions(l_script, l_row, this.DataManager, l_newRow.Items, this.Page);
                    l_newRow.Run();
                }

            DataManager.RefreshRegisteredData(tbl.Rows[0], "*");
        }
        private void RemoveRow(DataRegionGrr row)
        {
            RemoveRow(DataManager, row.Row);
        }
        static internal void RemoveRow(DefaultDataManager dm, DataRow row)
        {
            if (row.RowState == DataRowState.Deleted || row.RowState == DataRowState.Detached)
                return; //japato?
            row.Delete();
            row.AcceptChanges();
            dm.RefreshRegisteredData(row, "*");
        }

        private GridLine AddInteractiveAdd(GFEFormatRegion region)
        {
            //if (m_lines.Find(el => el.Name == "interactive") == null)
            {
                var l = new GridLine(this);

                //var txt = new DefaultContentButton();
                //l.Load(txt);
                //txt.Text.Text = region.Attributes["interactive-add"];
                //txt.Text.Underline();
                //txt.Text.AlignMiddle();
                //txt.BackColor.Initialize(SystemColors.ButtonShadow);
                //txt.Height = new SizeValue("8mm");
                //txt.Width = new SizeValue("20mm");
                //txt.ClickEvent += delegate { AddRow(region); };

                var dr = new DefaultContentDrawing();
                dr.Initialize(null, this._View, null, this.Page, null);
                dr.AttrList = new GFEAttrList()
                {
                    ["shape"] = "gi-plus_bold",
                    ["aspect"] = "keep",
                    ["edge-width"] = "0",
                    ["gap"] = "0",
                    ["fill"] = "#29a4e7",
                    ["height"] = "10pt",
                };
                var txt = new DefaultContentText();
                txt.Initialize(null, this._View, null, this.Page, null);
                txt.Text.Text = region.Attributes["interactive-add"];
                txt.Text.TextFont.ForeColor.Initialize("#29a4e7");
                txt.Text.TextFont.Size.Value = "10pt";
                txt.Text.TextFont.Style = FontStyleEnum.Bold;
                txt.Text.TextFont.FontFamily.Initialize("arial");
                var par = new DefaultContentPar();
                par.Initialize(null, this._View, null, this.Page, null);
                par.AttachData(DataManager);
                par.Gap = new SizeValue("4");
                par.AttrList = new GFEAttrList()
                {
                    ["visible"] = "fill",
                    ["height"] = "5mm",
                };
                par.AddChild(dr);
                par.AddChild(txt);

                var nc = l.Load(par);
                par.Text.AlignRight();
                par.ClickEvent += delegate { AddRow(region); };
                return l;
            }
        }
        private GridCell AddInteractiveRemove(DataRegionGrr row, GFEFormatRegion region, GridLine l)
        {
            ITagComponent lc = null;
            float RightBorder = 0;
            if (l.Count > 0)
            {
                lc = l[l.Count - 1][0];
                var s = lc.Width - new SizeValue("5mm");
                lc.Width = s;
                lc.AttrList["width"] = s.Value;
                RightBorder = lc.Surround.Width.RightPixels;
                lc.Surround.Width.RightPixels = 0;
            }
            var dr = new DefaultContentDrawing();
            dr.Initialize(null, this._View, row, this.Page, null);
            dr.AttrList = new GFEAttrList()
            {
                ["shape"] = "gi-minus_bold",
                ["aspect"] = "keep",
                ["edge-width"] = "0",
                ["gap"] = "0",
                ["fill"] = "#c63c3c",
                ["width"] = "5mm",
            };
            dr.Height = l.Height;
            var par = new DefaultContentPar();
            par.Initialize(null, this._View, row, this.Page, null);
            par.AttrList = new GFEAttrList()
            {
                ["visible"] = "fill",
            };
            par.AddChild(dr);

            par.Width = new SizeValue("5mm");
            var nc = l.Load(par);
            if (lc != null)
            {
                par.Surround.Initialize(lc.Surround);
                par.Surround.Width.LeftPixels = 0;
            }
            par.Surround.Width.RightPixels = RightBorder;
            par.Text.AlignCenter();
            par.Text.AlignMiddle();
            par.ClickEvent += delegate { RemoveRow(row); };
            return nc;
        }
    }
}
