//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GrrLabelZone.cs                        </Name>
//    <Description> štitková zóna                                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-25                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Linq;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Core.Services;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.Gui;
using Gordic.General;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.WinClient.Box;

namespace Gordic.GFE.WinClient.Labels
{
    /// <summary>
    /// štitková zóna
    /// </summary>
    class GrrLabelZone : UndoRedoList<IGRRLabel>, ISizable, IPaintable, IDisposable, IComponent, IOrder
    {
        #region ISizable
        /// <summary>
        /// Velikost objektu v pixelech - se Zoom faktorem
        /// </summary>
        [Browsable(false)]
        public RectangleF BoundsInPixels { get { return new RectangleF(LeftZoom, TopZoom, WidthZoom, HeightZoom); } }

        readonly UndoRedo<SizeValue> height = new UndoRedo<SizeValue>();
        /// <summary>
        /// výška
        /// </summary>
        [Browsable(false)]
        public SizeValue Height { get { return height.Value; } set { height.Value = value; } }
        /// <summary>
        /// výška - včetně Zoom
        /// </summary>
        [Browsable(false)]
        public float HeightZoom { get { return Height * localZoom + ((LObject is IPage) ? 2 * ReportDesignerProperties.Instance.PageSpacing/*vrch + spodek*/ : 0); } }

        readonly UndoRedo<SizeValue> left = new UndoRedo<SizeValue>();
        /// <summary>
        /// Pozice zleva objektu
        /// </summary>
        [Browsable(false)]
        public SizeValue Left { get { return left.Value; } set { left.Value = value; } }
        /// <summary>
        /// Pozice zleva objektu - včetně Zoom hodnoty
        /// </summary>
        [Browsable(false)]
        public float LeftZoom { get { return 0; } }

        readonly UndoRedo<SizeValue> top = new UndoRedo<SizeValue>();
        /// <summary>
        /// Pozice shora objektu
        /// </summary>
        [Browsable(false)]
        public SizeValue Top { get { return top.Value; } set { top.Value = value; } }
        /// <summary>
        /// Pozice shora objektu - včetně Zoom hodnoty
        /// </summary>
        [Browsable(false)]
        public float TopZoom
        {
            get
            {
                if (Top.IsEmpty)
                    return 0;

                if (LObject is IPage)
                    return (Top - ReportDesignerProperties.Instance.StepBetween) * localZoom + ReportDesignerProperties.Instance.PageSpacing;
                else
                    return Top * localZoom + LObject.Page.GraphDiffTop;
            }
        }

        readonly UndoRedo<SizeValue> width = new UndoRedo<SizeValue>();
        /// <summary>
        /// šířka
        /// </summary>
        [Browsable(false)]
        public SizeValue Width
        {
            get { return width.Value; }
            set { width.Value = value; }
        }
        /// <summary>
        /// šířka - včetně Zoom hodnoty
        /// </summary>
        [Browsable(false)]
        public float WidthZoom { get { return Width * localZoom + ReportDesignerProperties.Instance.StepBetween; } }

        /// <summary>
        /// indikuje změnu výšky
        /// </summary>
        [Browsable(false)]
        public virtual bool IsHeightChanged { get { return false; } }
        #endregion

        #region IPaintable
        /// <summary>
        /// Kreslení objektu
        /// </summary>
        /// <param name="graphics">Ovladač grafiky</param>
        /// <param name="args">args</param>
        public void OnPaint(Graphics graphics, PaintArgs args)
        {
            //if (!GraphicSettingService.ShowGrid)
            //    return;

            lock (syncRoot)
            {
                var transform = graphics.Transform;
                if (LObject is IPage)
                {
                    // zjistíme aktuální pozici levého horního rohu stránky
                    // tato pozice je závislá na hodnotě přetáčení (Scroll)
                    graphics.TranslateTransform(ReportDesignerProperties.Instance.StepBetween - ScrollControl.HorizontalScroll.Value,
                        (int)(LObject.MarginTop * localZoom - ScrollControl.VerticalScroll.Value));

                    // vyčistíme stránku definovanou barvou
                    // a nakreslímě pozadí stránky definovanou barvou
                    DrawClear(graphics);
                    // kreslení ohraničení stránky (stíny)
                    DrawFrame(graphics);
                }

                if (this.Count != 0)
                {
                    this[0].PaintLabel(graphics);
                    float left, top;
                    if (LObject is IPage)
                    {
                        // vyprázdníme předchozí objekty
                        LObject.DelayPaintList.Clear();

                        left = LObject.MarginLeft * localZoom + LObject.LeftZoom - ReportDesignerProperties.Instance.StepBetween;
                        top = LObject.TopZoom;
                        // Transformace souřadnic
                        graphics.TranslateTransform(left, top);
                        // kreslení obsahu
                        this[0].OnPaint(graphics, args);

                        // vykreslíme rámečky všech objektů, které jsou v seznamu zpožděného kreslení a...
                        // nemaji rámeček ani nejsou vybrané
                        LObject.DelayPaintList.ForEach(item => !item.ExistsSurround && !item.IsSelected, PaintDelay, graphics);
                        // mají rámeček ale nejsou vybrané
                        LObject.DelayPaintList.ForEach(item => item.ExistsSurround && !item.IsSelected, PaintDelay, graphics);
                        // jsou vybrané
                        LObject.DelayPaintList.ForEach(item => item.IsSelected, PaintDelay, graphics);
                    }
                    else
                        // kreslení obsahu
                        this[0].OnPaint(graphics, args);
                }

                //graphics.Transform = transform;
                if (LObject is IPage)
                    graphics.ResetTransform();
                graphics.Transform = transform;
            }
        }
        void PaintDelay(DelayPaintItem item, params object[] graphics)
        {
            item.Paint(graphics[0] as Graphics);
        }
        void DrawClear(Graphics graphics)
        {
            if (BoundsInPixels.Size.Width != 0 && BoundsInPixels.Size.Height != 0)
                // gradientní kreslení štítkové zóny
                using (System.Drawing.Drawing2D.LinearGradientBrush gradBrush = new System.Drawing.Drawing2D.LinearGradientBrush(new RectangleF(new PointF(0, 0), BoundsInPixels.Size), Color.LightSlateGray, Color.White, 0, true))
                    graphics.FillRectangle(gradBrush, 0, 0, WidthZoom, HeightZoom);
        }
        void DrawFrame(Graphics graphics)
        {
            int w = (int)WidthZoom,
                h = (int)HeightZoom;

            // dolní stín
            graphics.FillRectangle(SystemBrushes.ControlText,
                ReportDesignerProperties.Instance.RightDark,
                h,
                w - ReportDesignerProperties.Instance.RightDark,
                ReportDesignerProperties.Instance.BottomDark);

            // černý rámeček stránky
            graphics.DrawRectangle(SystemPens.ControlText, 0, 0, w, h);
        }

        /// <summary>
        /// Kreslení objektu
        /// </summary>
        /// <param name="graphics">Ovladač grafiky</param>
        /// <param name="isSelected">indikátor vybranosti objektu</param>
        public void OnPaintBorder(Graphics graphics, bool isSelected) { }
        #endregion

        #region IDisposable
        /// <summary>
        /// Uvolnění objektu
        /// </summary>
        public void Dispose()
        {
            ListChanged -= LabelZoneListChanged;
            if (view != null)
                ServiceManager.GraphicSettingService.RemoveZoomChanged(view, SettingServiceChanged);

            foreach (var item in this)
                item.Dispose();
            this.Clear();

            Disposed?.Invoke(this, EventArgs.Empty);
        }
        #endregion

        #region IComponent
        /// <summary>
        /// volá se po uvolnění objektu
        /// </summary>
        public event EventHandler Disposed;
        /// <summary>
        /// Site daného objektu
        /// </summary>
        public ISite Site { get; set; }
        #endregion

        #region IOrder
        /// <summary>
        /// Pozice objektu v seznamu vlastníka
        /// </summary>
        [Browsable(false)]
        public List<int> Order
        {
            get
            {
                List<int> ordering = new List<int>();
                if (LObject is IOrder)
                    ordering.AddRange((LObject as IOrder).Order);

                return ordering;
            }
        }
        #endregion

        /// <summary>
        /// objekt, na který je vázaná štitková zóna
        /// </summary>
        [Browsable(false)]
        public ILabledObject LObject { get; set; }

        ScrollableControl ScrollControl { get { return LObject != null ? (ScrollableControl)LObject.PagePanel : null; } }
        readonly object syncRoot = new object();
        float localZoom = 1;
        readonly IViewContent view;

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="lObject">stránka zóny</param>
        public GrrLabelZone(ILabledObject lObject)
            : base(UndoRedoService.Manager)
        {
            LObject = lObject;
            view = SimpleDesktop.Desktop.ActiveViewContent;
        }

        /// <summary>
        /// vytvoření nové instance dle stávající
        /// </summary>
        /// <param name="origin"></param>
        /// <param name="lObject"></param>
        public GrrLabelZone(IComponent origin, ILabledObject lObject)
            : base(UndoRedoService.Manager)
        {
            LObject = lObject;
        }

        /// <summary>
        /// reakce na změnu seznamu
        /// </summary>
        public void LabelZoneListChanged(object sender, EventArgs e)
        {
            bool isStarting = false;
            if (!UndoRedoService.IsTransactionStarted)
            {
                UndoRedoService.StartTransaction(GResources.GetResourceText(29450057)); //RC 29450057 : změna pozice zleva
                isStarting = true;
            }

            ActualizeZone();

            // pokud transakce byla započata danou metodou, pak jí také ukončíme v dané metodě
            if (isStarting)
                UndoRedoService.Commit();
        }

        void ActualizeZone()
        {
            // aktuallizujeme šířku štítkové zóny
            UpdateLabelZoneSize();

            if (!(LObject is IPage))
            {
                this.Left = LObject.ContentLeft + (LObject.Page != null ? LObject.Page.GraphDiffLeft : 0) - this.Width;
                this.Top = LObject.Top + (LObject.Page != null ? LObject.Page.MarginTop + LObject.Page.GraphDiffTop : 0);
            }
            // nastavíme pozice zleva
            SetLeft();
            // aktualizujeme výšku
            SetHeight();
            // aktualizujeme pozici TOP
            SetTop();
            // musí být mimo Thread, protože jinak nezafunguje správně UNDO/REDO
            OnActualizeLeft();
            OnActualizeTop();
            //ThreadService.SafeThreadAsyncCall(onActualizeLeft);
            //ThreadService.SafeThreadAsyncCall(onActualizeTop);
        }

        void OnActualizeTop()
        {
            ActualizeTop?.Invoke(this, EventArgs.Empty);
        }
        void OnActualizeLeft()
        {
            ActualizeLeft?.Invoke(this, EventArgs.Empty);
        }
        /// <summary>
        /// aktualizace výšek všem vnitřním objketům
        /// </summary>
        public void SetHeight()
        {
            lock (syncRoot)
            {
                foreach (var item in this)
                    item.SetHeight();

                Height = new SizeValue(Count != 0 ? this[0].Height : 0);

                if (this.Height > (LObject.Height - (LObject.MarginTop + LObject.MarginBottom)))
                    (LObject as ISizeHandler).SetHeight();
            }
        }
        /// <summary>
        /// aktualizace pozic ZLEVÁ všem vnitřním objektům
        /// </summary>
        public void SetLeft()
        {
            lock (syncRoot)
            {
                foreach (var item in this)
                    item.ChangeLeft();

                LObject.ChangeLeft(ReportDesignerProperties.Instance.StepBetween + this.WidthZoom);
            }
        }
        /// <summary>
        /// nastavení pozice TOP všem vnitřním objektům
        /// </summary>
        public void SetTop()
        {
            lock (syncRoot)
            {
                foreach (var item in this)
                    item.ChangeTop(this.Top);
            }
        }

        /// <summary>
        /// získání objektu pod kurzorem
        /// </summary>
        /// <param name="point">pozice kurzoru vůči stránce</param>
        /// <param name="content">určuje, že hledání probíhá v obsahu štitku</param>
        /// <returns>Objekt, který se nachází bezprostředně pod kurzorem</returns>
        internal object GetTowedObject(Point point, bool content)
        {
            foreach (var item in this)
                if (item is AbstractLabel)
                {
                    object result = (item as AbstractLabel).GetTowedObject(new PointF(point.X, point.Y), content);
                    if (result != null)
                        return result;
                }
            return null;
        }

        void PageMarginTopChanged(object sender, EventArgs e) { SetTop(); }
        void SettingServiceChanged(object sender, EventArgs e)
        {
            localZoom = GraphicSettingService.Zoom;
            // odstup zóny od kraje panelu na kterém je + šířka
            LObject.ChangeLeft(ReportDesignerProperties.Instance.StepBetween + this.WidthZoom);
            LObject.SettingServiceChanged(this, EventArgs.Empty);
            LObject.PagePanel.ActualizeScrollScope(sender, e);
        }
        void UpdateLabelZoneSize()
        {
            if (Count == 0)
                return;

            this[0].UpdateLabelZoneSize();
            this.Width = new SizeValue(this[0].LabelZoneSize);
        }
        /// <summary>
        /// změna hodnoty zleva
        /// </summary>
        public void OnLeftValueChanged(object sender, EventArgs e)
        {
            lock (syncRoot)
            {
                float width = LObject.Width - (LObject.MarginLeft + LObject.MarginRight);
                foreach (var item in this)
                    item.ChangeWidth(width);
            }
            SetLeft();
        }

        /// <summary>
        /// inicializace štítkové zóny
        /// </summary>
        /// <param name="rootLabel">hlavní region zóny</param>
        internal void Initialize(IGRRLabel rootLabel)
        {
            if (rootLabel != null)
                this.Add(rootLabel);
            LObject.WidthChanged += OnLeftValueChanged;
            LObject.MarginTopChanged += PageMarginTopChanged;
            LObject.MarginLeftChanged += OnLeftValueChanged;
            LObject.MarginRightChanged += OnLeftValueChanged;
            ListChanged += LabelZoneListChanged;
            ServiceManager.GraphicSettingService.AddZoomChanged(view, SettingServiceChanged);
            ServiceManager.GraphicSettingService.AddShowGridChanged(view, SettingServiceChanged);
            localZoom = GraphicSettingService.Zoom;

            ActualizeZone();
        }

        /// <summary>
        /// generování ALF dat vnitřku do větve <paramref name="currEl"/>
        /// </summary>
        /// <param name="currEl">větev, do které se generuji data</param>
        /// <param name="xmlStyles">aktuální seznam stylů</param>
        internal void SetAlfData(System.Xml.XmlElement currEl, List<GFEList> xmlStyles)
        {
            if (Count > 0)
            {
                XmlDocumentPosition xmlDoc = (XmlDocumentPosition)currEl.OwnerDocument;
                var label = this.First();
                if (label != null)
                    label.SetXmlData(currEl, xmlDoc, xmlStyles);
            }
        }

        /// <summary>
        /// aktualizace pozice LEFT
        /// </summary>
        public EventHandler ActualizeLeft;
        /// <summary>
        /// aktualizace pozice TOP
        /// </summary>
        public EventHandler ActualizeTop;
    }
}
