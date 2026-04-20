//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.Page.cs                                  </Name>
//    <Description> Stránka grf formuláře                                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Xml;
using Gordic.GFE.Parsers;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Core;
using System.Windows.Forms;
using System.ComponentModel;
using Gordic.GFE.Parsers.Core.Services;
using Gordic.GFE.Parsers.Dom;
using Gordic.General;
using Gordic.GFE.WinClient.Labels;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.WinClient.Editor;

namespace Gordic.GFE.WinClient.GrfEditor
{
    /// <summary>
    /// Stránka grf formuláře
    /// </summary>
    class GrfPage : URAbstractPage
    {
        #region AbstractPage
        /// <summary>
        /// posun pro kreslení
        /// </summary>
        public override float GraphDiffLeft { get => Left; }
        /// <summary>
        /// posun pro kreslení
        /// </summary>
        public override float GraphDiffTop { get => TopZoom; }

        readonly List<PointF> posVerticalCach = new List<PointF>(), posHorisontalCach = new List<PointF>();
        /// <summary>
        /// Kreslení stránky
        /// </summary>
        /// <param name="clipRectangle">Kreslená oblast ovladače, na kterém se nachází stránka</param>
        /// <param name="graphics">Ovladač grafiky</param>
        /// <param name="args">args</param>
        public override void Paint(Rectangle clipRectangle, Graphics graphics, PaintArgs args)
        {
            if (!clipRectangle.IntersectsWith(
                new Rectangle(ServiceManager.GraphicSettingService.PageLeft - _PagePanel.HorizontalScroll.Value
                    , (int)TopZoom - _PagePanel.VerticalScroll.Value
                    , (int)WidthZoom + 5
                    , (int)HeightZoom + 3)))
            {
                IsActive = false;
                return;
            }

            IsActive = true;
            if (IsTowed())
                ThreadService.SafeThreadAsyncCall(delegate
                {
                    if (TowedService.TowedComponent == null || (TowedService.TowedComponent is IPage && TowedService.TowedComponent != this))
                        TowedService.TowedComponent = this;
                });

            var transform = graphics.Transform;
            // zjistíme aktuální pozici levého horního rohu stránky
            // tato pozice je závislá na hodnotě přetáčení (Scroll)
            graphics.TranslateTransform(ServiceManager.GraphicSettingService.PageLeft - _PagePanel.HorizontalScroll.Value,
                (int)TopZoom - _PagePanel.VerticalScroll.Value);


            // vyčistíme stránku definovanou barvou
            // a nakreslímě pozadí stránky definovanou barvou
            DrawClear(graphics);
            // kreslení ohraničení stránky (stíny)
            DrawFrame(graphics);
            // mřížku kreslíme také jen na obsahovou zónu
            // a až na obrázek pozadí
            if (GraphicSettingService.ShowGrid)
                DrawGrid(graphics);

            graphics.ResetTransform();
            graphics.Transform = transform;

            graphics.TranslateTransform(-_PagePanel.HorizontalScroll.Value, -_PagePanel.VerticalScroll.Value);
            // kreslení obsahu
            OnPaintContent(graphics, args);
            graphics.ResetTransform();
            graphics.Transform = transform;
        }

        readonly UndoRedo<IPageBackground> backobject = new UndoRedo<IPageBackground>();
        /// <summary>
        /// Text objektu
        /// </summary>
        [Browsable(false)]
        public override IPageBackground BackObject
        {
            get => backobject.Value;
            set
            {
                if (value == null && backobject.Value != null)
                    Remove(backobject.Value);
                backobject.Value = value;
            }
        }

        /// <summary>
        /// Barva pozadí
        /// </summary>
        [Category("Pozadí")]
        [DisplayName("barva pozadí")]
        [Description("Barva pozadí. Designérský prvek, který se nikam neukládá. Spiš pro vizuální představu sestavy.")]
        [TypeConverter(typeof(ComplexColorConverter))]
        public override IComplexColor BackColor
        {
            get => BackObject != null ? BackObject.BackColor : base.BackColor;
            set
            {
                // pokud objekt pozadí neexistuje, pak ho vytvoříme a vložíme na stránku
                if (BackObject == null)
                {
                    dynamic com = new GrfContentText();
                    com.Initialize();
                    com.Parent = (ISizable)this;
                    Add(com);
                    com.BackType = true;
                }
                if (BackObject != null) BackObject.BackColor = value;
            }
        }

        /// <summary>
        /// Metoda Pře indexace vnořených objektů 
        /// </summary>
        public override void Reindex()
        {
            int index = BackObject != null ? 1 : 0;
            bool moveTo;
            while (index < Count)
            {
                moveTo = false;
                for (int i = index + 1; i < Count; i++)
                {
                    if (this[i] is AbstractContent || this[i] is AreaContent)
                        if (this[i].Top < this[index].Top || (this[i].Top == this[index].Top && this[i].Left < this[index].Left))
                        {
                            if (this[i] is AbstractContent content)
                                content.PropertyOrder = index;
                            else ((AreaContent)this[i]).PropertyOrder = index;
                            moveTo = true;
                        }
                    if (this[i] is IItemContainer _content)
                        _content.Reindex();
                }
                if (!moveTo)
                    index++;
            }
        }
        #endregion

        #region ITowedHandler
        /// <summary>
        /// získání objektu pod kurzorem
        /// </summary>
        /// <param name="point">pozice kurzoru vůči stránce</param>
        /// <returns>Objekt, který se nachází bezprostředně pod kurzorem</returns>
        public override object GetTowedObject(PointF point)
        {
            List<object> result = new List<object>();
            object baseTowed = base.GetTowedObject(point);
            if (baseTowed != null)
            {
                if (baseTowed is IComponent component)
                    result.Add(component);
                else if (baseTowed is IList<object> towed)
                    result.AddRange(CommonService.GetComponents(towed));
            }

            if (_Zones.Count != 0)
            {
                Point pt = new Point((int)point.X, (int)point.Y);
                foreach (var item in _Zones)
                {
                    object towedObject = item.GetTowedObject(pt, false);
                    if (towedObject != null)
                        result.Add(towedObject);
                }
            }
            return result;
        }
        #endregion

        /// <summary>
        /// Obrázek pozadí
        /// </summary>
        [Category("Pozadí")]
        [DisplayName("obrázek pozadí")]
        [Description("Obrázek pozadí, který může sloužít jako podklad (šablona)")]
        public Image _BackImage
        {
            get => BackImage?.Image;
            set
            {
                if (BackImage == null) BackImage = new BackgroundImage(value, null);
                else BackImage.Image = value;
            }
        }

        /// <summary>
        /// všechny zóny stránky
        /// </summary>
        internal List<GrrLabelZone> _Zones = new List<GrrLabelZone>();

        /// <summary>
        /// Rozlišení stránky
        /// </summary>
        [DisplayName("rozlišení")]
        [Description("Rozlišení stránky. Pozor: hodnota se změní pro všechny stránky")]
        override public SizeValue Resolution
        {
            get
            {
                if (!pages.AttrList.ContainsKey("paper-resolution"))
                    pages.AttrList.Add("paper-resolution", ReportDesignerProperties.Instance.Resolution.ToString());

                return new SizeValue(pages.AttrList["paper-resolution"]);
            }
            set
            {
                if (!pages.AttrList.ContainsKey("paper-resolution"))
                    pages.AttrList.Add("paper-resolution", value.ToString());
                else
                    pages.AttrList["paper-resolution"] = value.ToString();

                _PagePanel.PositionCachNeedRefresh = true;
            }
        }

        /// <summary>
        /// Přidání položky bočního panelu
        /// </summary>
        /// <param name="info">Přidávaná položka</param>
        /// <param name="e">data o myší</param>
        /// <param name="type">Typ vkládané komponenty</param>
        /// <param name="format">Formát sestavy</param>
        public override IComponent CreateItem(dynamic info, MouseEventArgs e, ComponentType type, GFEFormat format = null) =>
            CreateObject(GetInsertPoint(e.X, e.Y), this, info, type, format);

        /// <summary>
        /// Vytvoření nového objektu 'region' na zadaném umístění
        /// </summary>
        /// <param name="insertPoint">Levý-horní roh nového regionu - zkorigovaný dle ZOOM hodnoty</param>
        /// <param name="page">Stránka, do které se objekt vkládá</param>
        /// <param name="info">Položka bočního panelu s informaci o vkládaném objektu</param>
        /// <param name="type">Typ přidávané položky</param>
        /// <param name="format">Formát sestavy</param>
        public override IComponent CreateObject(PointF insertPoint, IPage page, dynamic info, ComponentType type, GFEFormat format = null) =>
            LocalCommonService.CreateObject(this, insertPoint, page, info, type, format);

        /// <summary>
        /// Přidání položek ze seznamu do sestavy
        /// </summary>
        /// <param name="obj">Přidávaná položka</param>
        /// <param name="e">Pozice, na kterou se vkládá</param>
        /// <param name="isDiff">Indikuje, že e obsahuje diference</param>
        public override void InsertTagComponent(object obj, PointF e, bool isDiff)
        {
            if (!isDiff)
            {
                PointF pt = GetInsertPoint((int)e.X, (int)e.Y);
                (obj as ITagComponent).Left = new SizeValue(pt.X, (obj as ITagComponent).Left.Metrics);
                (obj as ITagComponent).Top = new SizeValue(pt.Y, (obj as ITagComponent).Top.Metrics);
            }
            else
            {
                (obj as ITagComponent).Left += e.X;
                (obj as ITagComponent).Top += e.Y;
            }

            (obj as ITagComponent).Page = this;
            Add(obj as ITagComponent);
        }

        /// <summary>
        /// Výpočet pozice nezávislé na ZOOM hodnotě do které se vkládá objekt 
        /// </summary>
        /// <param name="x">X</param>
        /// <param name="y">Y</param>
        /// <returns>Bod nezávislý na ZOOM hodnotě</returns>
        public override PointF GetInsertPoint(int x, int y)
        {
            return new PointF
                ((x + _PagePanel.HorizontalScroll.Value - ReportDesignerProperties.Instance.PageLeft) / Zoom - MarginLeft,
                (y + _PagePanel.VerticalScroll.Value - TopZoom) / Zoom - MarginTop);
        }

        /// <summary>
        /// Vytvoření stránky v kolekcí <paramref name="pages"/>.
        /// </summary>
        /// <param name="pages">Kolekcé stránek - vlastník vytvářené stránky</param>
        public GrfPage(IPages pages)
            : base(pages)
        {
            Disposed += PageDisposed;
        }

        /// <summary>
        /// Inicializace objektu
        /// </summary>
        public override void Initialize()
        {
            base.Initialize();
            ServiceManager.GraphicSettingService.AddZoomChanged(SimpleDesktop.Desktop.ActiveViewContent, SettingServiceChanged);
            ServiceManager.GraphicSettingService.AddResolutionChanged(SimpleDesktop.Desktop.ActiveViewContent, SettingServiceChanged);
            ServiceManager.GraphicSettingService.AddShowGridChanged(SimpleDesktop.Desktop.ActiveViewContent, SettingServiceChanged);
            ServiceManager.GraphicSettingService.AddShowOrderChanged(SimpleDesktop.Desktop.ActiveViewContent, SettingServiceChanged);
        }

        void SettingServiceChanged(object sender, EventArgs e)
        {
            _PagePanel.PositionCachNeedRefresh = true;
            _PagePanel.Invalidate();
        }
        void PageDisposed(object sender, EventArgs e)
        {
            ServiceManager.GraphicSettingService.RemoveZoomChanged(SimpleDesktop.Desktop.ActiveViewContent, SettingServiceChanged);
            ServiceManager.GraphicSettingService.RemoveResolutionChanged(SimpleDesktop.Desktop.ActiveViewContent, SettingServiceChanged);
            ServiceManager.GraphicSettingService.RemoveShowGridChanged(SimpleDesktop.Desktop.ActiveViewContent, SettingServiceChanged);
            ServiceManager.GraphicSettingService.RemoveShowOrderChanged(SimpleDesktop.Desktop.ActiveViewContent, SettingServiceChanged);
        }

        #region GetXML
        /// <summary>
        /// Získání XML struktury vnitřku stránky 
        /// </summary>
        /// <param name="xmlDoc">Dokument, do kterého se „obal“ vloží</param>
        /// <param name="regions">Indikátor uložení pouze regionů</param>
        /// <param name="xmlStyles">Seznam nadřazených stylů daného objektu</param>
        /// <param name="regionFullName">Úplný název aktuálního regionu</param>
        /// <returns>Elemengt popisující daný objekt</returns>
        internal XmlElement GetData(XmlDocumentPosition xmlDoc, List<GFEList> xmlStyles, bool regions, string regionFullName)
        {
            //Zabalíme všechny položky do větvi ITEMS
            XmlElement xmlItems = xmlDoc.CreateElement("ITEMS", ReportDesignerProperties.Instance.AlfReportXmlns);

            // průhlednou barvu není třeba ukládat
            if (BackObject != null && BackObject.BackColor.Color == Color.Transparent)
                BackObject = null;

            //V závislosti na tom, co teď ukládáme rozlišíme různé případy
            if (regions)
                //se uloží všechny kontainery
                foreach (ITagComponent item in FindAll(itm => itm is GrfRegion))
                {
                    XmlElement el = item.GetXmlData(xmlDoc, xmlStyles, regionFullName: regionFullName);
                    if (el != null)
                    {
                        // pokud se jedná o region obálky...
                        if ((item as GrfRegion).DataFullName.Equals(regionFullName))
                            foreach (XmlNode body in el)
                            {
                                if (body.Name.Equals("body"))
                                    foreach (XmlNode child in body)
                                        xmlItems.AppendChild(child);
                            }
                        else
                            xmlItems.AppendChild(el);
                    }
                }
            //Ukládáme pouze položky
            else
                //se uloží všechny políčka co nejsou regiony
                foreach (ITagComponent item in FindAll(itm => !(itm is GrfRegion)))
                {
                    // pokud položka je region, pak není co řešit
                    if (item is GrfRegion)
                        continue;

                    if (item is GrfContentComment comment)
                        comment.SetXmlData(xmlDoc, xmlItems);
                    else
                    {
                        XmlElement xmlElement = item.GetXmlData(xmlDoc, xmlStyles, regionFullName: regionFullName);
                        if (xmlElement != null)
                        {
                            //pokud větev STYLE, neobsahuje žádné atributy, pak je zbytečná 
                            if (xmlElement.Name == "style" && xmlElement.Attributes.Count == 0)
                                //V tomto případě přepíšeme všechny vnořené větve větvi STYLE do nadřazené větvi
                                foreach (XmlNode subItem in xmlElement.ChildNodes)
                                    xmlItems.AppendChild(subItem);
                            else xmlItems.AppendChild(xmlElement);
                        }
                    }
                }

            return xmlItems;
        }
        #endregion

        #region Drawing
        /// <summary>
        /// Kresení mřížky
        /// </summary>
        /// <param name="graphics">Ovladač grafiky</param>
        void DrawGrid(Graphics graphics)
        {
            float res = Resolution;
            if (res <= 0)
                return;

            int width = (int)WidthZoom,
                height = (int)HeightZoom;

            float marginLeft = MarginLeft * Zoom,
                marginRight = MarginRight * Zoom,
                marginTop = MarginTop * Zoom,
                marginBottom = MarginBottom * Zoom,
                resZoom = res * Zoom;

            using (SolidBrush drawBrash = new SolidBrush(CommonService.BorderColorNonactive))
            using (Pen pen = new Pen(drawBrash, 1F))
            {
                float right = width - marginRight,
                    down = height - marginBottom;

                if (_PagePanel.PositionCachNeedRefresh)
                {
                    posVerticalCach.Clear();
                    posHorisontalCach.Clear();

                    float x = marginLeft,
                        y = marginTop;

                    while (x < 0)
                        x += resZoom;

                    while (y < 0)
                        y += resZoom;

                    bool next = true;
                    while (x <= width - marginRight)
                    {
                        if (next)
                        {
                            posVerticalCach.Add(new PointF(x, marginTop));
                            posVerticalCach.Add(new PointF(x, height - marginBottom));
                            next = !next;
                        }
                        else
                        {
                            posVerticalCach.Add(new PointF(x, height - marginBottom));
                            posVerticalCach.Add(new PointF(x, marginTop));
                            next = !next;
                        }
                        x += resZoom;
                    }

                    next = true;
                    while (y <= height - marginBottom)
                    {
                        if (next)
                        {
                            posHorisontalCach.Add(new PointF(marginLeft, y));
                            posHorisontalCach.Add(new PointF(width - marginRight, y));
                            next = !next;
                        }
                        else
                        {
                            posHorisontalCach.Add(new PointF(width - marginRight, y));
                            posHorisontalCach.Add(new PointF(marginLeft, y));
                            next = !next;
                        }
                        y += resZoom;
                    }
                }

                if ((_PagePanel as GrfPagePanel).Document.Pages.Count == Order)
                    _PagePanel.PositionCachNeedRefresh = false;

                PointF[] pointsVertical = new PointF[posVerticalCach.Count],
                    pointsHorizontal = new PointF[posHorisontalCach.Count];

                posVerticalCach.CopyTo(pointsVertical);
                posHorisontalCach.CopyTo(pointsHorizontal);
                if (pointsVertical.Length > 0)
                    graphics.DrawLines(pen, pointsVertical);
                if (pointsHorizontal.Length > 0)
                    graphics.DrawLines(pen, pointsHorizontal);

                if ((float)MarginRight != 0)
                    graphics.DrawLine(pen, new PointF(right, marginTop), new PointF(right, down));

                if ((float)MarginBottom != 0)
                    graphics.DrawLine(pen, new PointF(marginLeft, down), new PointF(right, down));
            }
        }
        void DrawFrame(Graphics graphics)
        {
            int w = (int)WidthZoom,
                h = (int)HeightZoom;

            // pravý stín
            graphics.FillRectangle(SystemBrushes.ControlText,
                w, ReportDesignerProperties.Instance.BottomDark,
                ReportDesignerProperties.Instance.RightDark, h);
            // dolní stín
            graphics.FillRectangle(SystemBrushes.ControlText,
                ReportDesignerProperties.Instance.RightDark,
                h,
                w - ReportDesignerProperties.Instance.RightDark,
                ReportDesignerProperties.Instance.BottomDark);

            // černý rámeček stránky
            graphics.DrawRectangle(SystemPens.ControlText, 0, 0, w, h);
        }
        void DrawClear(Graphics graphics)
        {
            // stránku vyčistíme bílou barvou
            graphics.FillRectangle(new SolidBrush(Color.White), new Rectangle(0, 0, (int)WidthZoom, (int)HeightZoom));

            if (BackColor == null || BackColor.Color == Color.Transparent || !ShowBackground)
                // výchozí barva stránky
                graphics.FillRectangle(SystemBrushes.ControlLightLight, 0, 0, (int)WidthZoom, (int)HeightZoom);
            else
                // uživatelsky daná barva stránky
                graphics.FillRectangle(new SolidBrush(BackColor.Color), 0, 0, (int)WidthZoom, (int)HeightZoom);

            if (BackImage != null && BackImage.Image != null && ShowBackground)
            {
                switch (BackImageStretch)
                {
                    case ImageStretch.ByImage:
                        using (Image img = new Bitmap(BackImage.Image, new Size((int)(BackImage.Image.Width * Zoom), (int)(BackImage.Image.Height * Zoom))))
                            graphics.DrawImageUnscaledAndClipped(img, new Rectangle(0, 0, (int)WidthZoom, (int)HeightZoom));
                        break;
                    case ImageStretch.ByObject:
                        using (Image img = new Bitmap(BackImage.Image, new Size((int)(BackImage.Image.Width * Zoom), (int)(BackImage.Image.Height * Zoom))))
                            graphics.DrawImage(img, new Rectangle(0, 0, (int)WidthZoom, (int)HeightZoom));
                        break;
                    default:
                        using (Image img = new Bitmap(BackImage.Image, new Size((int)(BackImage.Image.Width * Zoom), (int)(BackImage.Image.Height * Zoom))))
                            graphics.DrawImage(img, new Point(0, 0));
                        break;
                }
            }
        }
        void OnPaintContent(Graphics graphics, PaintArgs args)
        {
            // při absenci ovladače grafiky nelze objekt vykreslit
            if (graphics == null)
                throw new GException(GResources.GetResourceText(29450049)); //RC 29450049 : Komponenty nelze kreslit - nelze použít ovladač grafiky!

            if (!graphics.VisibleClipBounds.IntersectsWith(BoundsInPixels))
                return;

            // vyprázdníme předchozí objekty
            DelayPaintList.Clear();

            Region reg = graphics.Clip;
            graphics.Clip = new Region(RectangleF.Intersect(BoundsInPixels, graphics.VisibleClipBounds));

            // vykreslíme vnitřní vybrané komponenty 
            this.ForEach(tag => tag != null, TagService.PaintTag, graphics, args);

            IEnumerable<DelayPaintItem> enumer = DelayPaintList.Distinct(new DelayPaintItemComparer());
            // vykreslíme rámečky všech objektů, které jsou v seznamu zpožděného kreslení a...
            // nemaji rámeček ani nejsou vybrané
            enumer.ForEach(item => !item.ExistsSurround && !item.IsSelected, PaintDelay, graphics);
            // mají rámeček ale nejsou vybrané
            enumer.ForEach(item => item.ExistsSurround && !item.IsSelected, PaintDelay, graphics);
            // jsou vybrané
            enumer.ForEach(item => item.IsSelected, PaintDelay, graphics);

            graphics.Clip = reg;
        }
        void PaintDelay(DelayPaintItem item, params object[] graphics)
        {
            item.Paint(graphics[0] as Graphics);
        }
        #endregion
    }
}
