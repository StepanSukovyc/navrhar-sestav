//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.AbstractContent.cs                    </Name>
//    <Description> Site kontejneru                                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Linq;
using System.Xml;
using Gordic.General;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Hosting;
using Gordic.GFE.Parsers.Light;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Utils;
using Gordic.Report.Implementation;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Abstractní třída obsahového objektu GRF sestavy
    /// </summary>
    public abstract class DefaultAbstractContent : LAbstractContent, ITagComponent, IDisposable, ITextHandler, ISizeByContent, INamedComponent, IVisibleComponent
    {
        #region IZoomSizable
        /// <summary>
        /// veličina zvětšení
        /// </summary>
        public override float Zoom { get => Page.Zoom; }
        /// <summary>
        /// Pozice zleva - včetně Zoom hodnoty
        /// Je to vůči panelu
        /// </summary>
        public override float LeftZoom { get => (Left + Page.MarginLeft) * Zoom + Page.PagePanel.GSS.PageLeft; }
        /// <summary>
        /// Pozice shora - včetně Zoom hodnoty
        /// </summary>
        public override float TopZoom { get => (Top + Page.MarginTop) * Zoom + Page.TopZoom; }
        #endregion

        #region IPositionHandler
        /// <summary>
        /// Začátek pozice
        /// </summary>
        public int StartPosition { get; set; }
        /// <summary>
        /// Konec pozice
        /// </summary>
        public int EndPosition { get; set; }

        /// <summary>
        /// Typ objektu
        /// </summary>
        public string PSType { get; }

        /// <summary>
        /// typ objektu
        /// </summary>
        public bool IsInStyle { get; }
        /// <summary>
        /// 
        /// </summary>
        [Browsable(false)]
        public bool CanBeSameANested { get; }

        #endregion

        #region IScriptHandler
        /// <summary>
        /// Dostupné skripty objektu
        /// </summary>
        public GFEScriptList Scripts { get; set; }
        #endregion

        #region ITagComponent
        /// <summary>
        /// indikuje možnost manipulace s objektem
        /// </summary>
        public bool ReadOnly => false;

        /// <summary>
        /// Pozice objektu v seznamu nadřazeného objketu
        /// </summary>
        public List<int> Order
        {
            get
            {
                List<int> ordering = new List<int>();
                if (Parent is ITagComponent t1)
                {
                    ordering.AddRange(t1.Order);
                    if (Parent is IContainerComponent component) //to by melo byt vzdy
                        ordering.Add(component.IndexOf(this));
                }
                else if (Parent is IContainerComponent component) //gridcell?
                {
                    object c = this;
                    var p = component;
                    while (p != null)
                    {
                        ordering.Insert(0, p.IndexOf(c));
                        c = p;
                        p = p.Parent;
                    }
                    if (c is ITagComponent t2)
                        ordering.InsertRange(0, t2.Order);
                }
                return ordering;
            }
        }

        /// <summary>
        /// Stránka objektu
        /// </summary>
        public virtual IPage Page { get; set; }

        /// <summary>
        /// Pozicování objektu
        /// </summary>
        public virtual int PropertyOrder { get; set; }

        /// <summary>
        /// Nastavení skriptů
        /// </summary>
        internal virtual void SetScripts()
        {
            Dictionary<string, string> scripts = AttrList != null
            ? AttrList.FindAllByKey(key =>
                key.StartsWith("on", StringComparison.InvariantCulture)
                && key.Length > 2
                && char.IsUpper(key[2]))
            : new Dictionary<string, string>();
            Scripts.AddRange(scripts);
        }

        /// <summary>
        /// Metoda po uvolnění objektu
        /// </summary>
        public event EventHandler Disposed;

        /// <summary>
        /// ISite komponenty
        /// </summary>
        public ISite Site { get; set; }

        /// <summary>
        /// Uvolnění objektu
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (FormatTag != null && FormatTag.Region != null) FormatTag.Region.UnregisterNamedComponent(this);
            if (disposing)
            {
                if (this is IDefaultDataItemHandler data && data.DataItem is IDisposable disitem)
                    disitem.Dispose();

                if (formatTag != null)
                {
                    //nesmi se disposenout - pouze pujcena reference.
                    //dispose probehne z GFEFormat.Dispose
                    formatTag = null;
                }

                if (Disposed != null)
                {
                    Disposed(this, EventArgs.Empty);
                    Disposed = null;
                }
            }
        }
        ~DefaultAbstractContent() => Dispose(false);

        /// <summary>
        /// Všechny atributy regionu
        /// </summary>
        public GFEAttrList AttrList { get; set; }

        readonly Dictionary<string, string> unknowns = new Dictionary<string, string>();
        /// <summary>
        /// Všechny atributy regionu
        /// </summary>
        public Dictionary<string, string> Unknowns { get => unknowns; }

        /// <summary>
        /// úplný název datové položky
        /// </summary>
        public string DataTitle { get; set; }

        string dataName;
        /// <summary>
        /// Datový název pložky
        /// </summary>
        public string DataName
        {
            get
            {
                if (string.IsNullOrEmpty(dataName))
                    dataName = (FormatTag as GFEFormatContent).DataShortName;
                return dataName;
            }
        }

        string dataFullName;
        /// <summary>
        /// úplný název položky 
        /// </summary>
        public string DataFullName
        {
            get
            {
                if (string.IsNullOrEmpty(dataFullName))
                    dataFullName = (FormatTag as GFEFormatContent).DataFullName;
                return dataFullName;
            }
        }
        public string DataFullPath => (FormatTag as GFEFormatContent).DataFullPath;

        /// <summary>
        /// popis datové položky
        /// </summary>
        public string DataDescription { get; set; }

        /// <summary>
        /// Oblast obsahu - je to BoundsInPixels bez odsazení
        /// </summary>
        public RectangleF ContentBounds
        {
            get => new RectangleF(
                    LeftZoom + Padding.LeftPixels * Zoom,
                    TopZoom + Padding.TopPixels * Zoom,
                    WidthZoom - (Padding.LeftPixels + Padding.RightPixels) * Zoom,
                    HeightZoom - (Padding.TopPixels + Padding.BottomPixels) * Zoom);
        }

        /// <summary>
        /// cach obrázku komponenty
        /// </summary>
        protected Bitmap cachBitmap, cachFrameBitmap;

        /// <summary>
        /// Kreslení objektu
        /// </summary>
        public virtual void OnPaint(Graphics graphics, PaintArgs args)
        {
            if (!graphics.VisibleClipBounds.IntersectsWith(BoundsInPixels))
                return;

            //zjistíme, který text máme vykreslit
            IDefaultDataItem item = null;
            DrawPrepare(graphics, ref item);
            if (Visible == false) return; //tato podminka az za SetDisplayValue - coz muze vyvolat skript menici Visible

            Region reg = graphics.Clip;
            graphics.Clip = new Region(RectangleF.Intersect(BoundsInPixels, graphics.VisibleClipBounds));
            //graphics.DrawRectangle(Pens.DarkRed, Rectangle.Round(BoundsInPixels));
            try
            {
                if (args.DrawBackground)
                    DrawClear(graphics, item);
                if (args.DrawContent)
                    DrawContent(graphics);
            }
            finally
            {
                graphics.Clip = reg;
            }
            if (args.DrawBorder && Page != null)
                Page.DelayPaintList.Add(new DelayPaintItem(this, IsSelected, reg));
        }

        protected internal virtual void DrawPrepare(Graphics graphics, ref IDefaultDataItem item)
        {
            var data = this as IDefaultDataItemHandler;
            item = data?.DataItem;
            if (item != null)
                item.SetDisplayValue();
        }

        protected virtual void DrawContent(Graphics graphics) => Text?.Paint(graphics, BoundsInPixels, Padding, Zoom);

        /// <summary>
        /// Vymazání rámečku indikujícího, že daný objekt je aktivní
        /// </summary>
        protected virtual void DrawClear(Graphics graphics, IDefaultDataItem item)
        {
            if (BackColor != null
                && BackColor.Color != Color.Transparent
                && ShowBackground)
                using (SolidBrush drawBrush = new SolidBrush(BackColor.Color))
                    graphics.FillRectangle(drawBrush, BoundsInPixels);

            if (item != null)
            {
                var bc = GetDrawItemBackColor(item);
                if (bc.IsEmpty == false)
                    using (var b = new SolidBrush(bc))
                        graphics.FillRectangle(b, BoundsInPixels);
            }
        }
        protected virtual Color GetDrawItemBackColor(IDefaultDataItem item)
        {
            // pokud uživatel si přeje zviditelnění položky, pak ji zviditelníme
            if (item.IsError/* || item.EmptyRequired*/)
                return Color.LightPink;

            if (BackColor.Color == Color.Transparent && item.Edit && GraphicSettingService.ShowColorOf)
                return Color.FromArgb(204, 255, 204);

            return Color.Empty;
        }

        /// <summary>
        /// Kreslení objektu
        /// </summary>
        /// <param name="graphics">Ovladač grafiky</param>
        /// <param name="isSelected">indikátor vybranosti objektu</param>
        public void OnPaintBorder(Graphics graphics, bool isSelected) => TagService.DrawTagFrame(Surround, graphics, new PointF(LeftZoom, TopZoom), new SizeF(WidthZoom, HeightZoom), Zoom, Spacing);

        /// <summary>
        /// Kotva objektu
        /// </summary>
        public bool Anchor { get; set; }

        /// <summary>
        /// Vnitřní orámování (detail)
        /// </summary>
        public IInnerSurround InnerSurround { get; set; }

        /// <summary>
        /// Rameček (detail)
        /// </summary>
        public IComplexSurround Surround { get; set; }

        /// <summary>
        /// šířka rámečku
        /// </summary>
        public string SurroundWidth
        {
            get => Surround.Width.AllValue;
            set
            {
                if (Surround != null)
                    Surround.Width.AllValue = value;
            }
        }

        /// <summary>
        /// Barva rámečku
        /// </summary>
        public IComplexColor SurroundColor
        {
            get => Surround.FrameColor.AllValue;
            set => Surround?.FrameColor.SetAllValue(value);
        }

        /// <summary>
        /// Odsazení textu
        /// </summary>
        [DisplayName("odsazení textu")]
        [Description("Odsazení textu uvnítř objektu")]
        public IComplexFive Padding { get; set; }

        /// <summary>
        /// Odsazení rámečku
        /// </summary>
        [DisplayName("odsazení rámečku")]
        [Description("Odsazení rámečku uvnítř objektu")]
        public IComplexFive Spacing { get; set; }

        /// <summary>
        /// Styl rámečku
        /// </summary>
        public string SurroundDashStyle
        {
            get => Surround.DashStyle.AllValue;
            set
            {
                if (Surround != null)
                    Surround.DashStyle.AllValue = value;
            }
        }
        /// <summary>
        /// Metoda vracení XML struktury samotného elementu (bez STYLE)
        /// V DOCFRM není zapotřebí implikovat danou metodu.
        /// </summary>
        /// <param name="xmlDoc">Dokument, do kterého se struktura vkládá</param>
        /// <param name="xmlStyles">Seznamm nadřazených stylů</param>
        /// <param name="withRect"></param>
        /// <param name="regionFullName">Úplný název aktuálního regionu</param>
        /// <returns>Element prezentující daný objekt</returns>
        public XmlElement GetXmlData(XmlDocumentPosition xmlDoc, List<GFEList> xmlStyles, bool withRect = true, string regionFullName = null) => throw new Exception(GResources.GetResourceText(29450718));
        /// <summary>
        /// uložení obsahu řádku do <paramref name="xmlElement"/>
        /// </summary>
        /// <param name="xmlElement">daný XML element, do kterého se vkládá obsah</param>
        /// <param name="xmlDoc">výsledný dokument</param>
        /// <param name="styles">seznam již dostupných stylů</param>
        /// <param name="withRect"></param>
        public void SetXmlData(XmlElement xmlElement, XmlDocumentPosition xmlDoc, List<GFEList> styles, bool withRect = true) => throw new NotImplementedException(GResources.GetResourceText(29450718));
        /// <summary>
        /// Aktualizace objektu
        /// </summary>
        public void RefreshByStructure() { }
        #endregion

        #region ITextHandler
        /// <summary>
        /// je nutné přepočítát výšku
        /// </summary>
        bool NeedRecount
        {
            get
            {
                if (string.IsNullOrEmpty(Height.Value))
                    return true;

                if (Text == null || !Text.Changed)
                    return false;

                return Width.Value != null && Padding != null && Surround != null;
            }
        }

        /// <summary>
        /// Text objektu
        /// </summary>
        public virtual ITagText Text { get; set; }
        /// <summary>
        /// Nastavení výšky dle obsahu
        /// </summary>
        public override void SetHeightByContent()
        {
            if (NeedRecount)
            {
                Height = TagService.GetHeightByContent(ComputeGraphics
                    , Text.TextFont.Font
                    , (int)(Width - Padding.LeftPixels - Padding.RightPixels - Surround.Width.LeftPixels - Surround.Width.RightPixels)
                    , Text.MultiLine
                    , Text.Text
                    , Padding.TopPixels + Padding.BottomPixels
                    , !string.IsNullOrEmpty(Height.Metrics) ? Height.Metrics : "mm");

                Text.Changed = false;
            }
        }
        #endregion

        #region IBackground
        /// <summary>
        /// Barva pozadí
        /// </summary>
        [Browsable(false)]
        public IComplexColor BackColor
        {
            get => (Text != null && Text.TextFont != null) ? Text.TextFont.BackColor : null;
            set
            {
                if (Text != null && Text.TextFont != null)
                    Text.TextFont.BackColor = value;
            }
        }
        /// <summary>
        /// obrázek pozadí
        /// </summary>
        [Browsable(false)]
        public BackgroundImage BackImage { get; set; }
        /// <summary>
        /// chování se obrázku pozadí
        /// </summary>
        [Browsable(false)]
        public ImageStretch BackImageStretch { get; set; }

        /// <summary>
        /// Indikuje zobrazení pozadí
        /// </summary>
        [Browsable(false)]
        public bool ShowBackground { get; set; }
        #endregion

        #region IGRRSize
        bool isheightbycontent;
        /// <summary>
        /// indikuje, že výška je dle obsahu
        /// </summary>
        [Browsable(false)]
        public override bool IsHeightByContent
        {
            get => isheightbycontent;
            set
            {
                isheightbycontent = value;
                if (!isLoading && value)
                {
                    isHeightChanging = true;
                    SetHeightByContent();
                    isHeightChanging = false;
                }
            }
        }
        /// <summary>
        /// indikuje, že šířka je dle pozůstalé velikosti řádku
        /// </summary>
        [Browsable(false)]
        public override bool IsWidthByContent { get; set; }
        #endregion

        /// <summary>
        /// ovladač stránky
        /// </summary>
        protected internal IPageControl PageControl { get => Page?.PagePanel; }
        /// <summary>
        /// panel stránky
        /// </summary>
        protected internal IPagePanel PagePanel { get => PageControl as IPagePanel; }

        /// <summary>
        /// indikuje změnu výšky
        /// </summary>
        [Browsable(false)]
        public override bool IsHeightChanged { get => NeedRecount; }

        /// <exclude/>
        protected override Graphics ComputeGraphics
        {
            get
            {
                if (computeGraphics == null && PageControl != null)
                    computeGraphics = PageControl.ComputeGraphics;
                return computeGraphics;
            }
        }

        /// <summary>
        /// Indikuje vybranost objektu
        /// </summary>
        protected virtual bool IsSelected { get => LServiceSelection != null && LServiceSelection.GetComponentSelected(this); }

        SelectionService LServiceSelection { get => _View is IHost ? (_View as IHost).ServiceSelection : null; }
        /// <summary>
        /// Pohled na obsah
        /// </summary>
        public IViewContent _View { get; set; }

        /// <summary>
        /// Typ vybraného objektu
        /// </summary>
        public ComponentType ComponentType { get; protected set; }

        #region INamedComponent Members

        string INamedComponent.Name
        {
            get
            {
                var name = AttrList.GetValueDefault("name", null);
                if (string.IsNullOrEmpty(name)) return null;

                var l_Name = new NamedHandler(name, this as IDefaultDataBound);
                return l_Name.Name;
            }
        }
        string INamedComponent.Class
        {
            get
            {
                var name = AttrList.GetValueDefault("class", null);
                if (string.IsNullOrEmpty(name)) return null;
                return name;
            }
        }
        #endregion

        GFEFormatTag formatTag;
        /// <summary>
        /// Informace o formátu objektu
        /// </summary>
        public GFEFormatTag FormatTag
        {
            get => formatTag;
            set
            {
                formatTag = value;
                dataFullName = null;
                dataName = null;
            }
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public DefaultAbstractContent() { }

        /// <summary>
        /// indikuje stav, kdy objekt je již načten
        /// </summary>
        protected bool isLoaded;

        /// <summary>
        /// Načtení informaci o objektu z formátu daného objektu
        /// </summary>
        public override void LoadInformation()
        {
            if (isLoaded)
                return;

            bool changeIsLoading = false;
            if (!isLoading)
            {
                isLoading = true;
                changeIsLoading = true;
            }

            //Pokud se nejedná o datovou položku pak není co řešit 
            if (FormatTag is GFEFormatContent content)
            {
                //pozice řádku, ve kterém začíná Tag
                StartPosition = FormatTag.LinePosition;

                //Zafixujeme datovou položku
                GFEFormatContent _content = content;

                /*hodnoty nebyly inicializovány*/
                if (this.Width.Value == null && this.Height.Value == null && FormatTag.Attributes.ContainsKey("rect"))
                {
                    //pokud je content nekde vnoreny do GridLine (ILineLite) nenacitam
                    var p = Parent;
                    var b = p is ILineLite;
                    while (b == false)
                    {
                        if (!(p is IParentable p2)) break;
                        p = p2.Parent;
                        if (p == null || object.ReferenceEquals(p, p2)) break;
                        b = p is ILineLite;
                    }
                    if (b == false)
                        TagService.SetRectByTag(this, FormatTag);
                }

                if (FormatTag.Attributes.ContainsKey("order"))
                {
                    if (int.TryParse(FormatTag.Attributes["order"], out int value))
                        PropertyOrder = value;
                    else PropertyOrder = -1;
                }
                else
                    PropertyOrder = -1;

                if (Text.TextFont == null)
                    Text.TextFont = new TagTextFont();
                Text.TextFont.Initialize(_content.Style);

                //odsazení
                if (_content.Style != null)
                {
                    Padding.SetValue(_content.Style.Padding.left, _content.Style.Padding.leftMet, 1);
                    Padding.SetValue(_content.Style.Padding.right, _content.Style.Padding.rightMet, 2);
                    Padding.SetValue(_content.Style.Padding.top, _content.Style.Padding.topMet, 3);
                    Padding.SetValue(_content.Style.Padding.bottom, _content.Style.Padding.bottomMet, 4);

                    Text.Align.Horizontal = (HAlign)_content.Style.HorizontalAlign;
                    Text.Align.Vertical = (VAlign)_content.Style.VerticalAlign;
                    Text.Ellipsis.Style = (ElStyle)_content.Style.Ellipsis.Style;
                    Text.Ellipsis.Char = _content.Style.Ellipsis.EllipsisCharacter;
                    Text.MultiLine = _content.Style.Ellipsis.MultiLine;
                }

                Text.Changed = false;

                if (Surround == null)
                    Surround = new ComplexSurround();

                Surround.Initialize(_content.Style);

                if (InnerSurround == null)
                    InnerSurround = new InnerSurround();

                InnerSurround.Initialize(_content.Style);
                if (_content.Style != null)
                {
                    Spacing.SetValue(_content.Style.Spacing.left, _content.Style.Spacing.leftMet, 1);
                    Spacing.SetValue(_content.Style.Spacing.right, _content.Style.Spacing.rightMet, 2);
                    Spacing.SetValue(_content.Style.Spacing.top, _content.Style.Spacing.topMet, 3);
                    Spacing.SetValue(_content.Style.Spacing.bottom, _content.Style.Spacing.bottomMet, 4);

                    if (_content.Style.Attributes.ContainsKey("inside-border"))
                        Surround.InsideBorder = _content.Style.Attributes["inside-border"].ToLower() == "true" ? true : false;

                    if (_content.Style.Attributes.ContainsKey("radius-border"))
                    {
                        int.TryParse(_content.Style.Attributes["radius-border"], out int radius);
                        Surround.Radius = radius;
                    }

                    if (_content.Style.Attributes.ContainsKey("corners-border"))
                    {
                        int.TryParse(_content.Style.Attributes["corners-border"], out int corners);
                        Surround.Corners = (ComplexSurroundCorners)corners;
                    }

                    if (_content.Style.Attributes.ContainsKey("text-orientation"))
                    {
                        if (int.TryParse(_content.Style.Attributes["text-orientation"], out int to))
                        {
                            if ((to >= 0 && to <= 90) || (to <= -180 && to >= -270))
                                Text.Orientation = RotateType.Rotate270FlipXY;
                            else if ((to >= 90 && to <= 180) || (to <= -90 && to >= -180))
                                Text.Orientation = RotateType.Rotate180FlipXY;
                            else if ((to >= 180 && to <= 270) || (to <= 0 && to >= -90))
                                Text.Orientation = RotateType.Rotate90FlipXY;
                            else
                                Text.Orientation = RotateType.RotateNoneFlipNone;
                        }
                    }
                }

                SetScripts();
                /*hodnoty nebyly inicializovány*/
                if (_content.Attributes.TryGetValue("visible", out string tn))
                    m_Visible = tn.Equals("true", StringComparison.OrdinalIgnoreCase) || tn.Equals("fill", StringComparison.OrdinalIgnoreCase);
            }

            isLoaded = true;

            if (changeIsLoading)
                isLoading = false;
        }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <param name="item">položka s informaci o objektu</param>
        /// <param name="view">pohled objektu</param>
        /// <param name="dataRegion">data objektu</param>
        /// <param name="page">stránka, které patří objekt</param>
        /// <param name="parent">případný vlastník objektu</param>
        public void Initialize(GFEFormatTag item, IViewContent view, IDataRegion dataRegion, IPage page, ISizable parent)
        {
            isLoading = true;
            if (page != null) Page = page;
            if (parent != null) Parent = parent;
            if (view != null) this._View = view;
            if (item != null) FormatTag = item;
            if (isLoaded == false)
            {
                Initialize();

                if (FormatTag != null)
                    AttrList.AddRange(FormatTag.Attributes);

                LoadInformation();
            }
            AttachData(dataRegion);
            if (FormatTag != null && FormatTag.Region != null) FormatTag.Region.RegisterNamedComponent(this);
            isLoading = false;
        }
        /// <summary>
        /// Inicializace objektu s informací o formátu objektu
        /// </summary>
        public void Initialize()
        {
            ShowBackground = true;
            Text = new TagText().Initialize();
            Scripts = new GFEScriptList();
            AttrList = new GFEAttrList();

            if (FormatTag != null && FormatTag.Attributes != null)
                AttrList.AddRange(FormatTag.Attributes);

            Spacing = new ComplexSpacing();
            Spacing.SetValue(0, Grr06Metrics.Unspec, 1);
            Spacing.SetValue(0, Grr06Metrics.Unspec, 2);
            Spacing.SetValue(0, Grr06Metrics.Unspec, 3);
            Spacing.SetValue(0, Grr06Metrics.Unspec, 4);

            Padding = new ComplexPadding();
            Padding.SetValue(5, Grr06Metrics.Unspec, 1);
            Padding.SetValue(5, Grr06Metrics.Unspec, 2);
            Padding.SetValue(5, Grr06Metrics.Unspec, 3);
            Padding.SetValue(5, Grr06Metrics.Unspec, 4);

            Anchor = false;
            Surround = new ComplexSurround().Initialize();
            SurroundWidth = Surround.Width.AllValue;
            SurroundColor = Surround.FrameColor.AllValue;
            SurroundDashStyle = Surround.DashStyle.AllValue;

            InnerSurround = new InnerSurround().Initialize();
        }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <param name="item">položka s informaci o objektu</param>
        /// <param name="view">pohled objektu</param>
        public override void Initialize(GFEFormatTag item, IViewContent view)
        {
            this._View = view;
            FormatTag = item;
            Initialize();
        }

        /// <summary>
        /// napojení dat k objektu
        /// </summary>
        /// <param name="dataRegion">region s daty</param>
        protected virtual void AttachData(IDataRegion dataRegion) { }

        protected internal virtual void AfterLoad() { }


        #region IScriptable Members
        internal int GetProperty(IFFScriptManager scriptManager, string name, out IDataScriptable value)
        {
            switch (name)
            {
                case "visible":
                    //var vc = this as IVisibleComponent;
                    //if (vc == null) { value = null; return 1; }
                    value = scriptManager.Engine.GetScriptableNumber(name, /*vc.*/Visible ? 1 : 0);
                    return 0;
                case "select":
                    value = new GScriptableMethod(scriptManager.Engine, name, Select);
                    return 0;
                default:
                    value = null;
                    return 1;
            }
        }
        public IDataScriptable Select(IDataScriptable[] args)
        {
            if (!(_View is DefaultViewContent vw)) return null;
            if (!(this is IDefaultDataItemHandler v)) return null;

            if (v is IVisibleComponent vc && vc.Visible == false) return null;

            var di = v.DataItem;
            if (di == null || di.Edit == false) return null;

            vw.ServiceSelection.SetSelectedComponents(this, System.ComponentModel.Design.SelectionTypes.Replace);
            return null;
        }
        internal int SetProperty(IFFScriptManager scriptManager, string name, IDataScriptable value)
        {
            switch (name)
            {
                case "visible":
                    using (var v = new GDataScriptable(scriptManager.Engine, value))
                    {
                        /*vc.*/
                        Visible = v.ToInt() > 0;
                        return 0;
                    }
                default:
                    return 1;
            }
        }
        #endregion
        #region IVisibleComponent Members
        public virtual void BeginUpdate()
        {
        }
        public virtual void EndUpdate()
        {
        }
        bool m_Visible = true;
        /// <summary>Visible</summary>
        public bool Visible
        {
            get => m_Visible;
            set { m_Visible = value; }
        }
        #endregion

        protected IContainerComponent FindContainer()
        {
            var p = Parent;
            while (p != null)
            {
                if (p is IContainerComponent c) return c;
                if (p is IParentable pp) p = pp.Parent;
                else break;
            }
            return null;
        }

        /// <exclude/>
        public void SetXmlAttribute(XmlElement xmlElement) => throw new NotImplementedException();

        List<GValidationAttribute> m_Validators = null;
        public List<GValidationAttribute> Validators
        {
            get
            {
                if (m_Validators == null) m_Validators = CreateValidators();
                return m_Validators;
            }
        }
        protected virtual List<GValidationAttribute> CreateValidators()
        {
            var l_Validators = new List<GValidationAttribute>();
            foreach (var t in FormatTag.Children)
            {
                if (!"validate".Equals(t.TagName)) continue;
                try
                {
                    GValidationAttribute a = CreateValidator(t);
                    if (a != null)
                    {
                        if (t.Attributes.TryGetValue("message", out string v))
                            a.Message = v;
                        l_Validators.Add(a);
                    }
                }
                catch { }
            }
            return l_Validators;
        }
        protected virtual GValidationAttribute CreateValidator(GFEFormatTag t)
        {
            string v;
            switch (t.Attributes.GetValueDefault("type"))
            {
                case "required":
                    return new GRequiredAttribute();
                case "length":
                    {
                        var m = new GLengthAttribute();
                        bool b1, b2;
                        if (b1 = t.Attributes.TryGetValue("min", out v))
                            m.Minimum = Int32.Parse(v);
                        if (b2 = t.Attributes.TryGetValue("max", out v))
                            m.Maximum = Int32.Parse(v);
                        if (b1 || b2) return m; //alespon jedna mez, jinak to zahodim
                    }
                    break;
                //<validate type="characters" message="divne psc" allowed="0123456789" />
                //<validate type="characters" message="divne psc" disallowed="?#%" />
                case "characters":
                    {
                        var pattern = "";
                        if (t.Attributes.TryGetValue("allowed", out v))
                            pattern = $"^[{v.Replace("\\", "\\\\").Replace("-", "\\-").Replace("^", "\\^").Replace("]", "\\]")}]*$";
                        else if (t.Attributes.TryGetValue("disallowed", out v))
                            pattern = $"^[^{v.Replace("\\", "\\\\").Replace("-", "\\-").Replace("^", "\\^").Replace("]", "\\]")}]*$";
                        var m = new GRegExpAttribute(pattern);
                        return m;
                    }
                case "range":
                    {
                        if (!(this is IDefaultDataItemHandler data)) break;
                        t.Attributes.TryGetValue("min", out string min);
                        t.Attributes.TryGetValue("max", out string max);
                        if (min == null && max == null) break;
                        switch (data.DataItem?.Type)
                        {
                            case ControlType.NumberType:
                                return new GRangeAttribute(typeof(decimal), min, max);
                            case ControlType.DatetimeType:
                                return new GRangeAttribute(typeof(DateTime), min, max);
                            case ControlType.StringType:
                                return new GRangeAttribute(typeof(string), min, max);
                        }
                        break;
                    }
            }
            return null;
        }

        #region priprava pro potomky ktere dedi IMouseComponent
        private string m_tooltip = null;
        /// <summary>Text nad objektem</summary>
        public string Tooltip
        {
            get
            {
                if (m_tooltip == null)
                    m_tooltip = AttrList.GetValueDefault("tooltip");
                return m_tooltip;
            }
            set { m_tooltip = value; }
        }
        #endregion
        /// <summary>
        /// Získání textu ze skripta objektu
        /// </summary>
        /// <returns></returns>
        public string GetTextFromScript()
        {
            string str = "self.value=";

            foreach (var item in Scripts)
                if (!string.IsNullOrEmpty(item.Value) && item.Value.Contains(str))
                    return item.Value.Remove(0, item.Value.IndexOf(str) + str.Length).Trim(' ');

            if (Scripts.ExistsByValue(it => !string.IsNullOrEmpty(it)))
                return Scripts.FirstOrDefault(it => !string.IsNullOrEmpty(it.Value)).Value;

            return string.Empty;
        }
    }
}
