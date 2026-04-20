//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GrrPage.cs                             </Name>
//    <Description> Stránka GRR                                                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-22                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Linq;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Core.Services;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;
using Gordic.TextEditor.Document;
using Gordic.GFE.Parsers;
using Gordic.GFE.WinClient.Labels;
using System.Collections;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Stránka GRR
    /// </summary>
    class GrrPage : URAbstractPage, ISizeHandler, ILabledObject
    {
        #region AbstractPage
        readonly UndoRedo<SizeValue> height = new UndoRedo<SizeValue>();
        /// <summary>
        /// výška stránky
        /// </summary>
        [Browsable(false)]
        public override SizeValue Height
        {
            get { return height.Value; }
            set { height.Value = value; }
        }

        /// <summary>
        /// Výška stránky - včetně hodnoty Zoom
        /// </summary>
        [Browsable(false)]
        public override float HeightZoom { get { return Height * Zoom; } }

        readonly UndoRedo<bool> showbackground = new UndoRedo<bool>();
        /// <summary>
        /// Indikuje zobrazení pozadí stránky
        /// </summary>
        [Category("Pozadí")]
        [DisplayName("zobrazit")]
        [Description("Indikuje zobrazení pozadí stránky")]
        [TypeConverter(typeof(BooleanTypeConverter))]
        public override bool ShowBackground { get { return showbackground.Value; } set { showbackground.Value = value; } }
        /// <summary>
        /// Obrázek pozadí
        /// </summary>
        [Browsable(false)]
        public override BackgroundImage BackImage { get; set; }
        /// <summary>
        /// Barva pozadí
        /// </summary>
        [Browsable(false)]
        public override IComplexColor BackColor { get; set; }
        /// <summary>
        /// Pozice objektu v seznamu
        /// </summary>
        [Browsable(false)]
        public override int Order { get { return 1; } set { } }

        readonly UndoRedo<SizeValue> left = new UndoRedo<SizeValue>();
        /// <summary>
        /// pozice zleva
        /// </summary>
        [Browsable(false)]
        public override SizeValue Left { get { return left.Value; } set { left.Value = value; } }

        /// <summary>
        /// Kreslení stránky
        /// </summary>
        /// <param name="clipRectangle">Kreslená oblast ovladače, na kterém se nachází stránka</param>
        /// <param name="graphics">Ovladač grafiky</param>
        /// <param name="args">Upřesnení co a jak vykreslovat</param>
        public override void Paint(Rectangle clipRectangle, Graphics graphics, PaintArgs args)
        {
            if (!clipRectangle.IntersectsWith(
                new Rectangle(ServiceManager.GraphicSettingService.PageLeft - PagePanel.HorizontalScroll.Value
                    , (int)TopZoom - PagePanel.VerticalScroll.Value
                    , (int)WidthZoom + 5
                    , (int)HeightZoom + 3)))
            {
                IsActive = false;
                return;
            }

            IsActive = true;

            var transform = graphics.Transform;
            // zjistíme aktuální pozici levého horního rohu stránky
            // tato pozice je závislá na hodnotě přetáčení (Scroll)
            graphics.TranslateTransform((int)LeftZoom - PagePanel.HorizontalScroll.Value,
                (int)TopZoom - PagePanel.VerticalScroll.Value);

            // vyčistíme stránku definovanou barvou
            // a nakreslímě pozadí stránky definovanou barvou
            DrawClear(graphics);
            // kreslení ohraničení stránky (stíny)
            DrawFrame(graphics);

            graphics.ResetTransform();
            graphics.Transform = transform;

            // mřížku kreslíme také jen na obsahovou zónu
            // a až na obrázek pozadí
            //if (GraphicSettingService.ShowGrid)
            // kreslíme obsah regionů
            (LabelZone as IPaintable).OnPaint(graphics, args);
        }

        /// <summary>
        /// získání objektu pod kurzorem
        /// </summary>
        /// <param name="point">pozice kurzoru vůči stránce</param>
        /// <returns>Objekt, který se nachází bezprostředně pod kurzorem</returns>
        public override object GetTowedObject(PointF point)
        {
            Point pt = new Point((int)point.X, (int)(point.Y - MarginTop * Zoom));

            try
            {
                if (TowedService.TowedObject is AbstractLabel)
                {
                    if ((TowedService.TowedObject as AbstractLabel).BoundsInPixels.Contains(pt))
                        return TowedService.TowedObject;
                }
                else if (TowedService.TowedObject is ITagComponent)
                    if ((TowedService.TowedObject as ITagComponent).BoundsInPixels.Contains(GetContentBegin(point.X, point.Y)))
                        return TowedService.TowedObject;
            }
            catch (Exception ex) { LoggingService.Error(ex); }

            if (labelZ.BoundsInPixels.Contains(pt))
                return labelZ.GetTowedObject(pt, false);
            else if (BoundsInPixels.Contains(point))
            {
                object result = labelZ.GetTowedObject(GetContentBegin(point.X, point.Y), true);
                return result ?? (this);
            }
            else
                return base.GetTowedObject(point);
        }

        /// <summary>
        /// získání začátku obsahu stránky
        /// </summary>
        /// <param name="x">X - dle panelu</param>
        /// <param name="y">Y - dle panelu</param>
        /// <returns>Levý horní roh stránky</returns>
        public Point GetContentBegin(float x, float y) =>
            new Point((int)(x - MarginLeft * Zoom - this.LeftZoom + ReportDesignerProperties.Instance.StepBetween), (int)(y - MarginTop * Zoom - this.TopZoom));

        /// <summary>
        /// Aktualizace kontaineru
        /// </summary>
        public override void RefreshByStructure()
        {
            if (labelZ != null)
                labelZ.First().RefreshByStructure();
        }

        /// <summary>
        /// Získání objektu, co se nachází ve výběru
        /// </summary>
        /// <param name="selection">Informace o výběru, dle které určíme, na řádky výběru</param>
        /// <returns>Seznam objektů, které se nachází ve výbrané části.</returns>
        public override List<IComponent> SearchComponentText(ISelection selection)
        {
            List<IComponent> result = new List<IComponent>();
            foreach (var item in (LabelZone as IList))
                result.AddRange((item as IDesignSearchHandler).SearchComponentText(selection));
            return result.Distinct().ToList();
        }
        #endregion

        #region ISizeHandler
        /// <summary>
        /// šířka obsahu
        /// </summary>
        [Browsable(false)]
        public float ContentWidth { get { return Width - (MarginLeft + MarginRight); } }
        /// <summary>
        /// pozice LEFT obsahu
        /// </summary>
        [Browsable(false)]
        public float ContentLeft { get { return 0; } }

        /// <summary>
        /// Změna pozice zleva objektu
        /// </summary>
        /// <param name="value">Nová pozice zleva</param>
        public void ChangeLeft(float value)
        {
            this.Left = new SizeValue(value);
        }
        /// <summary>
        /// Změna výšky vybraných objektů
        /// </summary>
        public void SetHeight()
        {
            Height = (LabelZone as ISizable).Height
                + this.MarginTop
                + this.MarginBottom;

            PagePanel.ActualizeScrollScope(this, EventArgs.Empty);
        }
        /// <summary>
        /// nastavení šířky objektů
        /// </summary>
        /// <param name="value">nová šířka</param>
        public void ChangeWidth(float value)
        {
            Width = new SizeValue(value, Width.Metrics);
            WidthChanged?.Invoke(this, EventArgs.Empty);
        }
        /// <summary>
        /// volá se po změně šířky stránky
        /// </summary>
        public event EventHandler WidthChanged;

        /// <summary>
        /// nastavení TOP pozice objektů
        /// </summary>
        /// <param name="value">nová pozice</param>
        public void ChangeTop(float value)
        {
            this.Top = new SizeValue(value, Top.Metrics);
        }
        #endregion

        #region ILabledObject
        /// <summary>
        /// rozhraní ILabledObject
        /// </summary>
        [Browsable(false)]
        public new IPagePanel PagePanel
        {
            get { return base.PagePanel as IPagePanel; }
        }

        GrrLabelZone labelZ;
        /// <summary>
        /// štítková zóna daného objektu
        /// </summary>
        [Browsable(false)]
        public IComponent LabelZone { get { return labelZ; } set { labelZ = value as GrrLabelZone; } }
        /// <summary>
        /// stránka objektu
        /// </summary>
        [Browsable(false)]
        public IPage Page { get { return this; } }

        /// <summary>
        /// změna nastavení služby
        /// </summary>
        /// <param name="sender">objekt, který spustil událost</param>
        /// <param name="e">Jedná se o data, která jsou spojena s událostí.</param>
        public void SettingServiceChanged(object sender, EventArgs e)
        {
            PagePanel.PositionCachNeedRefresh = true;
            PagePanel.Invalidate();
        }
        #endregion

        /// <summary>
        /// Rozlišení stránky
        /// </summary>
        [DisplayName("rozlišení")] //RC 29450543 : rozlišení
        [Description("Rozlišení stránky")] //RC 29450574 : Rozlišení stránky
        override public SizeValue Resolution
        {
            get => ReportDesignerProperties.Instance.Resolution;
            set
            {
                ReportDesignerProperties.Instance.Resolution = value;
                PagePanel.PositionCachNeedRefresh = true;
            }
        }

        /// <summary>
        /// Vytvoření stránky v kolekcí <paramref name="pages"/>.
        /// </summary>
        /// <param name="pages">Kolekcé stránek - vlastník vytvářené stránky</param>
        public GrrPage(IPages pages)
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
            LabelZone = new GrrLabelZone(this);
            ServiceManager.GraphicSettingService.AddResolutionChanged(SimpleDesktop.Desktop.ActiveViewContent, SettingServiceChanged);
        }

        /// <summary>
        /// Načtení hlavního regionu
        /// </summary>
        /// <param name="reg">Formát s informaci o hlavním regionu</param>
        internal void LoadRegions(GFEFormatRegion reg)
        {
            // není co přidávat
            if (reg == null)
                return;

            //vytvoříme hlavní region
            labelZ.Initialize((new GrrRegion(reg)).Initialize(this));
        }
        /// <summary>
        /// generování ALF dat vnitřku do větve <paramref name="xmlFormat"/>
        /// </summary>
        /// <param name="xmlFormat">větev, do které se generuji data</param>
        /// <param name="xmlStyles">aktuální seznam stylů</param>
        internal void SetAlfData(System.Xml.XmlElement xmlFormat, List<GFEList> xmlStyles)
        {
            if (labelZ != null)
                labelZ.SetAlfData(xmlFormat, xmlStyles);
        }

        void PageDisposed(object sender, EventArgs e)
        {
            ServiceManager.GraphicSettingService.RemoveResolutionChanged(SimpleDesktop.Desktop.ActiveViewContent, SettingServiceChanged);
            LabelZone.Dispose();
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

            if (BackColor.Color == Color.Transparent || !ShowBackground)
                // výchozí barva stránky
                graphics.FillRectangle(SystemBrushes.ControlLightLight, 0, 0, (int)WidthZoom, (int)HeightZoom);
            else
                // uživatelsky daná barva stránky
                graphics.FillRectangle(new SolidBrush(BackColor.Color), 0, 0, (int)WidthZoom, (int)HeightZoom);

            if (BackImage != null && BackImage.Image != null && ShowBackground)
                using (Image img = new Bitmap(BackImage.Image, new Size((int)(BackImage.Image.Width * Zoom), (int)(BackImage.Image.Height * Zoom))))
                    graphics.DrawImageUnscaledAndClipped(img, new Rectangle(0, 0, (int)WidthZoom, (int)HeightZoom));
        }

    }
}
