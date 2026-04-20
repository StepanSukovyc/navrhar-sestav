//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ContentRegion.cs                      </Name>
//    <Description> region GRF sestav                                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Linq;
using System.Xml;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Core.Services;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Hosting;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Utils;
using Gordic.General;
using Gordic.Report.Implementation;
using System.Runtime.InteropServices;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// region GRF sestav (ktery ma zadany rect)
    /// </summary>
    [ComVisible(false)]
    public class DefaultContentRegion : URAbstractContainer, ITagComponent, IBackground
    {
        #region ITagComponent
        /// <summary>
        /// indikuje možnost manipulace s objektem
        /// </summary>
        public bool ReadOnly => false;
        GFEFormatTag formatTag;
        /// <summary>
        /// Informace o formátu objektu
        /// </summary>
        public GFEFormatTag FormatTag
        {
            get => formatTag;
            protected set
            {
                formatTag = value;
                dataFullName = null;
                dataName = null;
            }
        }

        /// <summary>
        /// Pozice objektu v seznamu nadřazeného objketu
        /// </summary>
        public List<int> Order
        {
            get
            {
                List<int> ordering = new List<int>();
                if (Parent is ITagComponent)
                    ordering.AddRange((Parent as ITagComponent).Order);

                if (Parent is URAbstractContainer)
                    ordering.Add((Parent as URAbstractContainer).IndexOf(this));

                return ordering;
            }
        }

        /// <summary>
        /// veličina zvětšení
        /// </summary>
        [Browsable(false)]
        public float Zoom { get => Page != null ? Page.Zoom : 1f; }

        /// <summary>
        /// Stránka objektu
        /// </summary>
        public IPage Page { get; set; }

        /// <summary>
        /// Pozicování objektu
        /// </summary>
        public int PropertyOrder { get; set; }

        /// <summary>
        /// Vlastník daného objektu
        /// </summary>
        public ISizable Parent { get; set; }

        /// <summary>
        /// Šířka objektu
        /// </summary>
        public SizeValue Width { get; set; }

        /// <summary>
        /// Výška objektu
        /// </summary>
        public SizeValue Height { get; set; }

        /// <summary>
        /// Pozice zleva objektu
        /// </summary>
        public SizeValue Left { get; set; }

        /// <summary>
        /// Pozice shora objektu
        /// </summary>
        public SizeValue Top { get; set; }
        /// <summary>
        /// indikuje změnu výšky
        /// </summary>
        [Browsable(false)]
        public virtual bool IsHeightChanged { get => false; }

        /// <summary>
        /// Šířka včetně zoom hodnoty
        /// </summary>
        [Browsable(false)]
        public float WidthZoom { get => Width * Zoom; }
        /// <summary>
        /// Výška včetně zoom hodnoty
        /// </summary>
        [Browsable(false)]
        public float HeightZoom { get => Height * Zoom; }
        /// <summary>
        /// Pozice zleva - včetně Zoom hodnoty
        /// Je to vůči panelu
        /// </summary>
        [Browsable(false)]
        public float LeftZoom { get => (Left + Page.MarginLeft) * Zoom + ServiceManager.GraphicSettingService.PageLeft; }
        /// <summary>
        /// Pozice shora - včetně Zoom hodnoty
        /// </summary>
        [Browsable(false)]
        public float TopZoom { get => (Top + Page.MarginTop) * Zoom + Page.TopZoom; }

        /// <summary>
        /// Ohraničení elementu
        /// </summary>
        public RectangleF BoundsInPixels { get => new RectangleF(new PointF(LeftZoom, TopZoom), new SizeF(WidthZoom, HeightZoom)); }

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
                    dataName = !string.IsNullOrEmpty(DataFullName) ? DataFullName.Split('.').Last() : null;
                return dataName;
            }
        }

        /// <summary>
        /// popis datové položky
        /// </summary>
        public string DataDescription { get; set; }

        string dataFullName;
        /// <summary>
        /// úplný název položky 
        /// </summary>
        public string DataFullName
        {
            get
            {
                if (string.IsNullOrEmpty(dataFullName))
                    dataFullName = FormatTag != null ? (FormatTag as GFEFormatRegion).DataFullName : null;

                return dataFullName;
            }
        }

        readonly Dictionary<string, string> unknowns = new Dictionary<string, string>();
        /// <summary>
        /// Všechny atributy regionu
        /// </summary>
        public Dictionary<string, string> Unknowns { get => unknowns; }
        /// <summary>
        /// Všechny atributy regionu
        /// </summary>
        public GFEAttrList AttrList { get; set; }

        /// <summary>
        /// Začátek pozice
        /// </summary>
        public int StartPosition { get; set; }
        /// <summary>
        /// Konec pozice
        /// </summary>
        public int EndPosition { get; set; }

        /// <summary>
        /// typ objektu
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

        /// <summary>
        /// Textový objekt regionu
        /// </summary>
        [DisplayName("text")]
        virtual public ITagText Text { get; set; }

        /// <summary>
        /// Dostupné skripty objektu
        /// </summary>
        public GFEScriptList Scripts { get; set; }

        /// <summary>
        /// Kotva objektu
        /// </summary>
        public bool Anchor { get; set; }

        /// <summary>
        /// Rameček (detail)
        /// </summary>
        public IComplexSurround Surround { get; set; }

        /// <summary>
        /// Vnitřní orámování (detail)
        /// </summary>
        public IInnerSurround InnerSurround { get; set; }

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
        /// Indikuje, že objekt je vybrán
        /// </summary>
        protected bool IsSelected { get => ServiceSelection != null && ServiceSelection.GetComponentSelected(this); }

        SelectionService ServiceSelection { get => view is IHost ? (view as IHost).ServiceSelection : null; }

        /// <summary>
        /// Načtení informaci o objektu z formátu objektu
        /// </summary>
        virtual public void LoadInformation()
        {
            //Pokud položka není regionem, pak není co řešit
            if (!(FormatTag is GFEFormatRegion))
                return;

            if (FormatTag.Attributes.ContainsKey("order"))
            {
                int value;
                PropertyOrder = int.TryParse(FormatTag.Attributes["order"], out value) ? value : -1;
            }
            else PropertyOrder = -1;


            //pozice řádku, ve kterém začíná Tag
            StartPosition = FormatTag.LinePosition;

            GFEFormatRegion _region = FormatTag as GFEFormatRegion;

            TagService.SetRectByTag(this, FormatTag);

            Text.TextFont = new URTagTextFont().Initialize(FontFamily.GenericSerif.Name);
            Text.TextFont.Size.Value = "1";

            if (_region.Attributes.ContainsKey("background-image"))
                TagService.SetImageByAttribute(this, _region.Attributes["background-image"]);

            SetScripts();
        }

        void SetScripts()
        {
            Dictionary<string, string> scripts = AttrList != null
                ? AttrList.FindAllByKey(key =>
                key.StartsWith("on", StringComparison.InvariantCulture)
                && key.Length > 2
                && char.IsUpper(key[2]))
                : new Dictionary<string, string>();
            Scripts.AddRange(scripts);
        }

        public bool RunOnlyIf(DataRegion dr)
        {
            if (dr.ScriptManager == null) throw new ArgumentOutOfRangeException();
            var l_script = AttrList.GetValueDefault("only-if", "");
            if (l_script.Length == 0) return true;

            using (var s = dr.ScriptManager.PrepareExpression(FormatTag, "only-if", l_script, dr.GetDataRow(0), dr.Manager, Page))
            using (var ret = dr.ScriptManager.RunExpression(s))
                return ret != null && ret.ToInt() != 0;
        }

        /// <summary>
        /// Kreslení objektu
        /// </summary>
        virtual public void OnPaint(Graphics graphics, PaintArgs args)
        {
            // pokud region není ani z části ve viditelné oblasti, pak není co řešit
            if (!graphics.VisibleClipBounds.IntersectsWith(BoundsInPixels))
                return;

            Region reg = graphics.Clip;
            graphics.Clip = new Region(RectangleF.Intersect(BoundsInPixels, graphics.VisibleClipBounds));
            if (args.DrawBackground)
                DrawClear(graphics);

            //RectangleF rectF = TagService.GetRealDrawRectangle(GraphicSettingService.Zoom, Surround.Width, BoundsInPixels);

            if (args.DrawContent)
                this.ForEach(tag => tag != null, TagService.PaintTag, graphics, args);

            graphics.Clip = reg;
            if (args.DrawBorder && Page != null)
                Page.DelayPaintList.Add(new DelayPaintItem(this, IsSelected, reg));
        }

        /// <summary>
        /// Kreslení objektu
        /// </summary>
        /// <param name="graphics">Ovladač grafiky</param>
        /// <param name="isSelected">indikátor vybranosti objektu</param>
        public void OnPaintBorder(Graphics graphics, bool isSelected)
        {
            Color _color = GraphicSettingService.ShowGrid ? CommonService.BorderColorNonactive : Color.Transparent;

            graphics.DrawRectangle(new Pen(new SolidBrush(_color), 1), LeftZoom, TopZoom, BoundsInPixels.Width, BoundsInPixels.Height);
            TagService.DrawTagFrame(Surround, graphics, new PointF(LeftZoom, TopZoom), new SizeF(WidthZoom, HeightZoom), GraphicSettingService.Zoom, Spacing);
        }

        /// <summary>
        /// Vymazání rámečku indikujícího, že daný objekt je aktivní
        /// </summary>
        /// <param name="graphics">Kreslící nástroj</param>
        void DrawClear(Graphics graphics)
        {
            float zoom = GraphicSettingService.Zoom;

            PointF pF = new PointF((float)(LeftZoom + (Surround.Width.LeftPixels == 0 ? Surround.Width.AllPixels : Surround.Width.LeftPixels) * zoom)
                , (float)(TopZoom + (Surround.Width.TopPixels == 0 ? Surround.Width.AllPixels : Surround.Width.TopPixels) * zoom));

            double sX = BoundsInPixels.Width - ((Surround.Width.LeftPixels == 0 ? Surround.Width.AllPixels : Surround.Width.LeftPixels) + (Surround.Width.RightPixels == 0 ? Surround.Width.AllPixels : Surround.Width.RightPixels)) * zoom,
                sY = BoundsInPixels.Height - ((Surround.Width.TopPixels == 0 ? Surround.Width.AllPixels : Surround.Width.TopPixels) + (Surround.Width.BottomPixels == 0 ? Surround.Width.AllPixels : Surround.Width.BottomPixels)) * zoom;

            SizeF sF = new SizeF((float)sX, (float)sY);
            RectangleF recF = new RectangleF(pF, sF);

            if (BackColor.Color != Color.Transparent && ShowBackground)
                // uživatelsky daná barva stránky
                graphics.FillRectangle(new SolidBrush(BackColor.Color), (int)recF.X, (int)recF.Y, (int)WidthZoom, (int)HeightZoom);

            //Pokud obrázek pozadí není dán, pak není co řešit
            if (BackImage == null || BackImage.Image == null)
                return;

            Image _backImg = new Bitmap(BackImage.Image);
            _backImg.RotateFlip((RotateFlipType)BackImage.Rotate);

            if (ShowBackground)
                if (BackImage.Stretch)
                    graphics.DrawImage(_backImg, recF);
                else
                    graphics.DrawImage(_backImg, new Rectangle(new Point((int)recF.X, (int)recF.Y), new Size((int)recF.Width, (int)recF.Height)), 0, 0, WidthZoom, HeightZoom, GraphicsUnit.Pixel);
        }

        /// <summary>
        /// Metoda vracení XML struktury samotného elementu (bez STYLE)
        /// </summary>
        /// <param name="xmlDoc">Dokument, do kterého se struktura vkládá</param>
        /// <param name="xmlStyles">Seznam nadřazených stylů</param>
        /// <param name="withRect"></param>
        /// <param name="regionFullName">Úplný název aktuálního regionu</param>
        /// <returns>Element prezentující daný objekt</returns>
        public XmlElement GetXmlData(XmlDocumentPosition xmlDoc, List<GFEList> xmlStyles, bool withRect = true, string regionFullName = null) => throw new Exception(GResources.GetResourceText(29450281)); //RC 29450281 : V kontextu Prohlížeče sestav by se sem nemělo dostat!

        /// <summary>
        /// uložení obsahu řádku do <paramref name="xmlElement"/>
        /// </summary>
        /// <param name="xmlElement">daný XML element, do kterého se vkládá obsah</param>
        /// <param name="xmlDoc">výsledný dokument</param>
        /// <param name="styles">seznam již dostupných stylů</param>
        /// <param name="withRect">seznam již dostupných stylů</param>
        public void SetXmlData(XmlElement xmlElement, XmlDocumentPosition xmlDoc, List<GFEList> styles, bool withRect = true) => throw new NotImplementedException(GResources.GetResourceText(29450281)); //RC 29450281 : V kontextu Prohlížeče sestav by se sem nemělo dostat!        

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

        #endregion

        #region IBackground
        /// <summary>
        /// Barva pozadí
        /// </summary>
        [DisplayName("barva")]
        [Description("Barva pozadí.")]
        [TypeConverter(typeof(ComplexColorConverter))]
        public IComplexColor BackColor { get; set; }

        /// <summary>
        /// Obrázek pozadí
        /// </summary>
        [DisplayName("obrázek")]
        [Description("Obrázek pozadí, který může sloužít jako podklad (šablona)")]
        public BackgroundImage BackImage { get; set; }
        /// <summary>
        /// chování se obrázku pozadí
        /// </summary>
        [Category("Pozadí")]
        [DisplayName("roztažení")]
        [Description("Chování se obrázku pozadí")]
        public ImageStretch BackImageStretch { get; set; }

        /// <summary>
        /// Indikuje zobrazení pozadí
        /// </summary>
        [DisplayName("zobrazit")]
        [Description("Indikuje zobarzení pozadí")]
        [TypeConverter(typeof(BooleanTypeConverter))]
        public bool ShowBackground { get; set; }
        #endregion

        /// <summary>
        /// Typ vybraného objektu
        /// </summary>
        [Category("Datová položka"), DisplayName("typ")]
        public ComponentType ComponentType { get; protected set; }

        /// <summary>
        /// Položka struktury
        /// </summary>
        public GFERegion StructureItem { get => (GFERegion)FormatTag.StructureItem; }

        /// <summary>
        /// Konstruktor třídy se základní inicializací
        /// </summary>
        public DefaultContentRegion() { }

        IViewContent view;

        /// <summary>
        /// inicializace třídy
        /// </summary>
        public override void Initialize()
        {
            base.Initialize();
            ComponentType = ComponentType.region;
            Text = new TagText();
            Text.Initialize();
            BackColor = ColorService.ComplexTransparent;

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
            Parent = this;
            AttrList = new GFEAttrList();
            Scripts = new GFEScriptList();
        }

        /// <summary>
        /// Inicializace objektu z informací o formátu objektu
        /// </summary>
        /// <param name="item">položka objektu</param>
        /// <param name="view">pohled</param>
        public void Initialize(GFEFormatTag item, IViewContent view)
        {
            Initialize();

            this.view = view;
            FormatTag = item;

            if (FormatTag != null)
                AttrList.AddRange(FormatTag.Attributes);
            LoadInformation();
        }

        /// <summary>
        /// Uvolnění objektu
        /// </summary>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
                if (formatTag != null)
                    //nesmi se disposenout - pouze pujcena reference.
                    //dispose probehne z GFEFormat.Dispose
                    formatTag = null;
            base.Dispose(disposing);
        }

        /// <exclude/>
        public void SetXmlAttribute(XmlElement xmlElement) => throw new NotImplementedException();
    }
}
