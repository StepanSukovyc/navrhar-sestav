//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DefaultContentPar.cs                     </Name>
//    <Description> PAR (odstavec)                                              </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2015-05-27                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Drawing;
using System.Xml;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Utils;
using Gordic.Report.Implementation;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// PAR (odstavec)
    /// </summary>
    public class DefaultContentPar : DefaultAbstractContent, IDefaultDataBound, IMouseComponent, IScriptable, IContainerComponent
    {
        #region AbstractContent
        /// <summary>
        /// Načtení informaci o objektu z formátu daného objektu
        /// </summary>
        public override void LoadInformation()
        {
            // pokud to není textové pole pak není co řešit
            if (!(FormatTag is GFEFormatContentPar))
                return;

            if (isLoaded)
                return;

            base.LoadInformation();

            ComponentType = ComponentType.none;//TODO

            // zafixujeme objekt
            //var _formatTag = (GFEFormatContentPar)FormatTag;
            //BackColor = new ComplexColor();
            //BackColor.Initialize(_formatTag.Style.BackgroundColor);
            //ShowBackground = BackColor.Color != Color.Transparent;
        }
        /// <summary>
        /// napojení dat k objektu
        /// </summary>
        /// <param name="dataRegion">region s daty</param>
        protected override void AttachData(IDataRegion dataRegion)
        {
            if (dataRegion != null)
            {
                m_manager = dataRegion.Manager;
                m_datarow = dataRegion.GetDataRow(this.AttrList, out _);
                if (FormatTag != null)
                    foreach (var ch in FormatTag.Children)
                    {
                        var c = FillerService.CreateAndInitContent(null, this.Page, ch, dataRegion, this._View);
                        if (c != null)
                            AddChild(c);
                    }
            }
        }
        internal void AttachData(DefaultDataManager dataManager)
        {
            m_manager = dataManager;
            m_datarow = null;
        }
        private DefaultDataManager m_manager = null;
        private System.Data.DataRow m_datarow = null;
        /// <summary>Správce dat</summary>
        public DefaultDataManager DataManager { get => m_manager; }
        /// <summary>Správce skriptů</summary>
        public IFFScriptManager ScriptManager { get => m_manager.ScriptManager; }
        /// <summary>příslušný řádek dat</summary>
        public System.Data.DataRow DataRow => m_datarow;

        protected internal override void DrawPrepare(Graphics graphics, ref IDefaultDataItem item)
        {
            base.DrawPrepare(graphics, ref item);
            Layout(graphics);
        }
        protected override void DrawContent(Graphics graphics)
        {
            //graphics.FillRectangle(Brushes.DarkKhaki, ContentBounds);
            foreach (var c in Children)
            {
                c.OnPaint(graphics, new PaintArgs() { Parts = PaintArgs.PartsEnum.Content });
#if DEBUG
                //graphics.DrawRectangle(Pens.Silver, Rectangle.Truncate(c.ContentBounds));
#endif
            }
        }

        #endregion


        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <param name="item">položka s informaci o objektu</param>
        /// <param name="view">pohled objektu</param>
        public override void Initialize(GFEFormatTag item, IViewContent view)
        {
            base.Initialize(item, view);
            ComponentType = ComponentType.none;//TODO
            LoadInformation();
        }
        /// <summary>Dispose</summary>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                m_OnClick?.Dispose();
                while (m_children.Count != 0)
                    if (m_children[0] is IDisposable d)
                    {
                        d.Dispose();
                        m_children.RemoveAt(0);
                    }
            }

            base.Dispose(disposing);
        }

        #region Container
        List<ITagComponent> m_children = new List<ITagComponent>();
        public IEnumerable<ITagComponent> Children { get => m_children; }

        protected internal void SetChildren(IEnumerable<ITagComponent> components)
        {
            m_children.Clear();
            foreach (var c in components) AddChild(c);
        }
        protected internal void AddChild(ITagComponent c)
        {
            if (c.Width.IsEmpty && c.AttrList.ContainsKey("width"))
                c.Width = new SizeValue(c.AttrList["width"]);

            if (c.Height.IsEmpty && c.AttrList.ContainsKey("height"))
                c.Height = new SizeValue(c.AttrList["height"]);

            //c.Spacing.SetValue(0, Grr06Metrics.Unspec, 1);
            //c.Spacing.SetValue(0, Grr06Metrics.Unspec, 2);
            //c.Spacing.SetValue(0, Grr06Metrics.Unspec, 3);
            //c.Spacing.SetValue(0, Grr06Metrics.Unspec, 4);
            //c.Padding.SetValue(0, Grr06Metrics.Unspec, 1);
            //c.Padding.SetValue(0, Grr06Metrics.Unspec, 2);
            //c.Padding.SetValue(0, Grr06Metrics.Unspec, 3);
            //c.Padding.SetValue(0, Grr06Metrics.Unspec, 4);

            m_children.Add(c);
            c.Parent = this;
            m_needlayout = true;
        }
        int IContainerComponent.Count => m_children.Count;

        IContainerComponent IContainerComponent.Parent => Parent as IContainerComponent;

        object IContainerComponent.this[int index] => m_children[index];

        int IContainerComponent.IndexOf(object item) => m_children.IndexOf(item as ITagComponent);
        #endregion


        protected override void OnBoundsChanged()
        {
            base.OnBoundsChanged();
            m_needlayout = true;
        }

        SizeValue m_Gap;
        public SizeValue Gap
        {
            set => m_Gap = value;
            get => GetGap();
        }
        private SizeValue GetGap(Graphics graphics = null)
        {
            if (m_Gap.IsEmpty == false) return m_Gap;
            graphics = graphics ?? computeGraphics;
            if (graphics == null) return m_Gap;
            if (FormatTag is GFEFormatContent _content)
            {
                if (_content.Style.Attributes.ContainsKey("paragraph-gap"))
                    m_Gap = new SizeValue(_content.Style.Attributes["paragraph-gap"]);
                if (m_Gap.IsEmpty)
                    using (Font drawFont = TagText.DrawFontFromTextFont(Text.TextFont))
                    {
                        var f = new StringFormat(StringFormat.GenericTypographic);
                        f.FormatFlags |= StringFormatFlags.MeasureTrailingSpaces;
                        m_Gap = graphics.MeasureString(" ", drawFont, Int32.MaxValue, f).Width;
                    }
            }
            return m_Gap;
        }

        float ContentHeight;
        bool m_needlayout = false;
        protected void Layout(Graphics graphics = null)
        {
            if (graphics == null) return; // nelze spočítat?
            if (m_needlayout == false) return;
            m_needlayout = false;
            ContentHeight = InlineService.ComputeInlineFlow(this, graphics, Children, GetGap(graphics));
        }

        protected ITagComponent ChildFromPosition(float x, float y)
        {
            if (m_needlayout) Layout(ComputeGraphics);
            foreach (var c in Children) {
                if (c is IInlineContent ic)
                {
                    var i = ic.InlineText;
                    if (i != null)
                    {
                        var b = c.ContentBounds;
                        if (i.IsInPos(x - b.Left, y - b.Top, c.Zoom))
                            return c;
                    }
                }
                else
                {
                    var b = c.BoundsInPixels;
                    if (b.Left <= x && b.Right >= x
                        && b.Top <= y && b.Bottom >= y)
                        return c;
                }
            }
            return null;
        }

        /// <summary>
        /// Nastavení výšky dle obsahu
        /// </summary>
        public override void SetHeightByContent()
        {
            if (m_needlayout) Layout(ComputeGraphics);
            Height = ContentHeight;
        }


        #region IMouseComponent Members
        public event EventHandler ClickEvent;
        public bool HasClickEvent => ClickEvent != null;
        /// <exclude/>
        protected virtual void OnClickEvent(EventArgs e)
        {
            ClickEvent?.Invoke(this, e);
        }
        private GScript m_OnClick;
        /// <summary>
        /// skript pri Click
        /// </summary>
        public GScript OnClick
        {
            get
            {
                if (m_OnClick == null && ScriptManager != null)
                {
                    var l_script = Scripts.GetValueDefault("onClick", string.Empty);
                    if (l_script.Length == 0) return null;
                    m_OnClick = ScriptManager.PrepareScript(FormatTag, "onClick", l_script, this);
                }
                return m_OnClick;
            }
        }

        /// <summary>
        /// Spuštění skriptu OnClick
        /// </summary>
        public void RunOnClick()
        {
            OnClickEvent(EventArgs.Empty);
            var s = OnClick;
            if (s != null) ScriptManager.RunScript(s);
        }

        void IMouseComponent.Click(float x, float y)
        {
            RunOnClick();
            if (ChildFromPosition(x, y) is IMouseComponent mc) mc.Click(x, y);
        }

        private IMouseComponent m_hoverChild = null;
        void IMouseComponent.HoverEnd()
        {
            (PagePanel as FillerPagePanel).TkHoverEnd(this);
            if (m_hoverChild != null) { m_hoverChild.HoverEnd(); m_hoverChild = null; }
        }
        void IMouseComponent.Hover(float x, float y)
        {
            (PagePanel as FillerPagePanel).TkHover(this, x, y, HasClickEvent || OnClick != null);
            if (ChildFromPosition(x, y) is IMouseComponent mc)
            {
                if (m_hoverChild != null && mc != m_hoverChild) m_hoverChild.HoverEnd();
                mc.Hover(x, y); m_hoverChild = mc;
            }
            else if (m_hoverChild != null) { m_hoverChild.HoverEnd(); m_hoverChild = null; }
        }
        #endregion
        #region IScriptable Members

        int IScriptable.getProperty(string name, out IDataScriptable value)
        {
            switch (name)
            {
                default:
                    if (AttrList.ContainsKey(name))
                    {
                        value = ScriptManager.Engine.GetScriptableString(name, AttrList[name]);
                        return 0;
                    }
                    return base.GetProperty(ScriptManager, name, out value);
            }
        }

        int IScriptable.setProperty(string name, IDataScriptable value)
        {
            if (AttrList.ContainsKey(name))
                using (var v = new GDataScriptable(ScriptManager.Engine, value))
                {
                    AttrList[name] = v.ToString();
                    return 0;
                }
            return base.SetProperty(ScriptManager, name, value);
        }

        #endregion


    }
}
