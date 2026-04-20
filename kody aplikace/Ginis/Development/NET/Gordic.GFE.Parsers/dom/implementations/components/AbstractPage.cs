//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AbstractPage.cs                          </Name>
//    <Description> Abstractní implementace třídy IPage                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-03-01                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Hosting;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.Parsers.Utils;
using System.Runtime.InteropServices;
using System;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// abstraktní třída stránek
    /// </summary>
    [ComVisible(false)]
    public abstract class AbstractPage : URAbstractContainer, IPage
    {
        #region IPage
        /// <summary>
        /// indikuje, možnost manipulace s objektem
        /// </summary>
        public bool ReadOnly => PagePanel?.Structure == null;

        /// <summary>
        /// posun pro kreslení
        /// </summary>
        [Browsable(false)]
        public virtual float GraphDiffLeft { get { return 0; } }
        /// <summary>
        /// posun pro kreslení
        /// </summary>
        [Browsable(false)]
        public virtual float GraphDiffTop { get { return 0; } }

        List<DelayPaintItem> delayPaintList = new List<DelayPaintItem>();
        /// <summary>
        /// seznam zpožděného kreslení ohraničení
        /// </summary>
        [Browsable(false)]
        public List<DelayPaintItem> DelayPaintList { get { return delayPaintList; } }

        //float zoom;
        /// <summary>
        /// aktuální zvětšení stránky
        /// </summary>
        [DisplayName("zvětšění")]
        public float Zoom { get { return PagePanel.Zoom; } }

        /// <summary>
        /// Indikuje, že stránka je aktivní
        /// </summary>
        [Browsable(false)]
        public bool IsActive { get; set; }

        /// <summary>
        /// objekt pozadí
        /// </summary>
        [Browsable(false)]
        public virtual IPageBackground BackObject { get; set; }

        /// <summary>
        /// Velikost objektu v pixelech - s faktorem zvětšení
        /// </summary>
        [Browsable(false)]
        public RectangleF BoundsInPixels { get { return new RectangleF(Left, TopZoom, WidthZoom, HeightZoom); } }

        /// <summary>
        /// šířka stránky
        /// </summary>
        [Browsable(false)]
        public SizeValue Width { get { return pages.PageWidth; } set { pages.PageWidth = value; } }

        private SizeValue m_PageHeight = SizeValue.Empty;
        /// <summary>
        /// výška stránky
        /// </summary>
        [Browsable(false)]
        public virtual SizeValue Height
        {
            get { return m_PageHeight.IsEmpty ? pages.PageHeight : m_PageHeight; }
            set
            {
                if (pages.PageHeight == value) m_PageHeight = SizeValue.Empty;
                else
                {
                    m_PageHeight = value;
                    if (pages is Pages ps)
                    {
                        ps.PageHeightSameOnAllPages = false;
                        ps.OnPageHeightChanged(EventArgs.Empty);
                    }
                }
            }
        }

        SizeValue left;
        /// <summary>
        /// Pozice zlevá stránky
        /// </summary>
        [Browsable(false)]
        public virtual SizeValue Left
        {
            get
            {
                if (string.IsNullOrEmpty(left.Value))
                    left = new SizeValue(PagePanel.GSS.PageLeft);
                return left;
            }
            set { }
        }

        int firstTopPage = -1;
        int pageSpacing = -1;
        /// <summary>
        /// Pozice Top stránky vůči ovladači - bez hodnoty Zoom
        /// </summary>
        [Browsable(false)]
        public SizeValue Top
        {
            get
            {
                if (firstTopPage == -1)
                    firstTopPage = PagePanel.GSS.FirstPageTop;
                if (pageSpacing == -1)
                    pageSpacing = PagePanel.GSS.PageSpacing;

                return new SizeValue(firstTopPage + pageSpacing * (Order - 1) + pages.PageHeightSumUpTo(Order - 1));
            }
            set { }
        }

        /// <summary>
        /// Šířka stránky - včetně hodnoty Zoom
        /// </summary>
        [Browsable(false)]
        public float WidthZoom { get { return pages.PageWidth * Zoom; } }

        /// <summary>
        /// Výška stránky - včetně hodnoty Zoom
        /// </summary>
        [Browsable(false)]
        public virtual float HeightZoom { get { return this.Height * Zoom; } }

        /// <summary>
        /// Levá hodnota pozměněná o zvětšovací faktor
        /// </summary>
        [Browsable(false)]
        public float LeftZoom { get { return Left; } }

        /// <summary>
        /// Pozice Top stránky vůči ovladači - včetně hodnoty Zoom
        /// Nefunguje přímé násobení - protože odstup od vrchu je vždy konstantní.
        /// Rozestup mezí stránky je také konstantní.
        /// Takže PageTopZoom se musí přepočítávat.
        /// Stejně jako PageTop
        /// </summary>
        [Browsable(false)]
        public float TopZoom
        {
            get
            {
                if (firstTopPage == -1)
                    firstTopPage = PagePanel.GSS.FirstPageTop;
                if (pageSpacing == -1)
                    pageSpacing = PagePanel.GSS.PageSpacing;

                return firstTopPage + pageSpacing * (Order - 1) + pages.PageHeightZoomSumUpTo(Order - 1);
            }
        }

        /// <summary>
        /// Pozice objektu v seznamu
        /// </summary>
        [DisplayName("pozice")]
        [Description("Pozice stránky v seznamu, resp. číslo stránky. Změnou thoto čísla se mění pořadí vykreslování.")]
        public virtual int Order
        {
            // je to kvůli tomu, že pozice je od 0, ale číslování stránek je od 1
            get { return pages.IndexOf(this) + 1; }
            set { OnChangePosition(Order - 1, value - 1); }
        }

        /// <summary>
        /// Reakce na změnu čísla stránky
        /// </summary>
        public event EventHandlerChangePosition ChangePosition;

        /// <summary>
        /// Formát stránky
        /// </summary>        
        [DisplayName("formát")]
        [Description("Seznam dostupných formátů stránky")]
        [TypeConverter(typeof(PageFormatConverter))]
        public string Format { get { return pages.Format; } set { pages.Format = value; } }

        /// <summary>
        /// Odsazení zlevá
        /// </summary>  
        [Category("Odsazení")]
        [DisplayName("zleva")]
        [Description("Odsazení vnitřního obsahu od levého okraju stránky")]
        public SizeValue MarginLeft { get { return pages.MarginLeft; } set { pages.MarginLeft = value; OnMarginLeftChanged(); } }

        /// <summary>
        /// volá se po změně odsazení zleva stránky
        /// </summary>
        public event EventHandler MarginLeftChanged;
        void OnMarginLeftChanged()
        {
            if (PagePanel != null)
                _PagePanel.PositionCachNeedRefresh = true;
            MarginLeftChanged?.Invoke(this, EventArgs.Empty);
        }

        /// <summary>
        /// Odsazení zprava
        /// </summary>
        [Category("Odsazení")]
        [DisplayName("zprava")]
        [Description("Odsazení vnitřního obsahu od pravého okraju stránky")]
        public SizeValue MarginRight { get { return pages.MarginRight; } set { pages.MarginRight = value; OnMarginRightChanged(); } }

        /// <summary>
        /// volá se po změně odsazení zprava stránky
        /// </summary>
        public event EventHandler MarginRightChanged;
        void OnMarginRightChanged()
        {
            if (PagePanel != null)
                _PagePanel.PositionCachNeedRefresh = true;
            MarginRightChanged?.Invoke(this, EventArgs.Empty);
        }

        /// <summary>
        /// Odsazení shora
        /// </summary>
        [Category("Odsazení")]
        [DisplayName("shora")]
        [Description("Odsazení vnitřního obsahu od horního okraju stránky")]
        public SizeValue MarginTop { get { return pages.MarginTop; } set { pages.MarginTop = value; OnMarginTopChanged(); } }

        /// <summary>
        /// volá se po změně odsazení shora stránky
        /// </summary>
        public event EventHandler MarginTopChanged;
        void OnMarginTopChanged()
        {
            if (PagePanel != null)
                _PagePanel.PositionCachNeedRefresh = true;
            MarginTopChanged?.Invoke(this, EventArgs.Empty);
        }

        /// <summary>
        /// Odsazení zdola
        /// </summary>
        [Category("Odsazení")]
        [DisplayName("zdola")]
        [Description("Odsazení vnitřního obsahu od dolního okraju stránky")]
        public SizeValue MarginBottom { get { return pages.MarginBottom; } set { pages.MarginBottom = value; _PagePanel.PositionCachNeedRefresh = true; } }

        /// <summary>
        /// Posun
        /// </summary>
        [Category("Posun")]
        [DisplayName("shora")]
        [Description("Pousun shora pozadí objektu dle paramatru")]
        public SizeValue BackTop
        {
            get { if (BackObject != null) return BackObject.BackTop; return SizeValue.Empty; }
            set { if (BackObject != null) BackObject.BackTop = value; }
        }

        /// <summary>
        /// Posun
        /// </summary>
        [Category("Posun")]
        [DisplayName("zleva")]
        [Description("Pousun zleva pozadí objektu dle paramatru")]
        public SizeValue BackLeft
        {
            get { if (BackObject != null) return BackObject.BackLeft; return SizeValue.Empty; }
            set { if (BackObject != null) BackObject.BackLeft = value; }
        }

        /// <summary>
        /// Posun
        /// </summary>
        [Category("Posun")]
        [DisplayName("výška")]
        [Description("Výška pozadí objektu dle paramatru")]
        public SizeValue BackWidth
        {
            get { if (BackObject != null) return BackObject.BackWidth; return SizeValue.Empty; }
            set { if (BackObject != null) BackObject.BackWidth = value; }
        }

        /// <summary>
        /// Posun
        /// </summary>
        [Category("Posun")]
        [DisplayName("šířka")]
        [Description("Šířka pozadí objektu dle paramatru")]
        public SizeValue BackHeight
        {
            get { if (BackObject != null) return BackObject.BackHeight; return SizeValue.Empty; }
            set { if (BackObject != null) BackObject.BackHeight = value; }
        }

        /// <summary>
        /// Rozlišení stránky
        /// </summary>
        [DisplayName("rozlišení")]
        [Description("Rozlišení stránky. Pozor: hodnota se změni pro všechny stránky")]
        virtual public SizeValue Resolution { get { return GraphicSettingService.Resolution; } set { GraphicSettingService.Resolution = value; _PagePanel.PositionCachNeedRefresh = true; } }

        /// <summary>
        /// Kreslení stránky
        /// </summary>
        /// <param name="clipRectangle">kreslená oblast</param>
        /// <param name="graphics">Ovladač grafiky</param>
        /// <param name="args">Upřesnení co a jak vykreslovat</param>
        public abstract void Paint(Rectangle clipRectangle, Graphics graphics, PaintArgs args);

        /// <summary>
        /// Barva pozadí
        /// </summary>
        [Category("Pozadí")]
        [DisplayName("barva pozadí")]
        [Description("Barva pozadí. Designérský prvek, který se nikam neukládá. Spiš pro vizuální představu sestavy.")]
        [TypeConverter(typeof(ComplexColorConverter))]
        public virtual IComplexColor BackColor { get; set; }

        /// <summary>
        /// Obrázek pozadí
        /// </summary>
        [Browsable(false)]
        public virtual BackgroundImage BackImage { get; set; }

        /// <summary>
        /// chování se obrázku pozadí
        /// </summary>
        [Category("Pozadí")]
        [DisplayName("roztažení")]
        [Description("Chování se obrázku pozadí")]
        public virtual ImageStretch BackImageStretch { get; set; }

        /// <summary>
        /// Indikuje zobrazení pozadí stránky
        /// </summary>
        [Category("Pozadí")]
        [DisplayName("zobrazit obrázek pozadí")]
        [Description("Indikuje zobrazení obrázku pozadí stránky")]
        [TypeConverter(typeof(BooleanTypeConverter))]
        public virtual bool ShowBackground { get; set; }

        /// <exclude/>
        protected virtual void OnChangePosition(int oldPosition, int newPosition)
        {
            ChangePosition?.Invoke(this, new EventArgsChangePosition(oldPosition, newPosition));
        }

        /// <summary>
        /// indikuje změnu výšky
        /// </summary>
        [Browsable(false)]
        public virtual bool IsHeightChanged { get { return false; } }
        #endregion

        /// <summary>
        /// Vlastník stránky
        /// </summary>
        [Browsable(false)]
        public IPageControl PagePanel { get { return pages.Parent; } }

        /// <summary>
        /// jiný tzp objektu
        /// </summary>
        [Browsable(false)]
        protected IPagePanel _PagePanel { get { return PagePanel as IPagePanel; } }

        /// <summary>
        /// Služba výběru objektů
        /// </summary>
        [Browsable(false)]
        public SelectionService ServiceSelection { get { return _PagePanel?.ServiceSelection; } }

        /// <summary>
        /// Výpočet pozice nezávislé na ZOOM hodnotě do které se vkládá objekt 
        /// </summary>
        /// <param name="x">X</param>
        /// <param name="y">Y</param>
        /// <returns>Bod nezávislý na ZOOM hodnotě</returns>
        public virtual PointF GetInsertPoint(int x, int y) { return new PointF(x, y); }

        protected IPages pages;
        /// <summary>
        /// Vytvoření stránky v kolekcí <paramref name="pages"/>.
        /// </summary>
        /// <param name="pages">Kolekce - vlastník vytvářené stránky</param>
        /// <param name="manager">správce UNDO/REDO operace</param>
        public AbstractPage(IPages pages, IUndoRedoManager manager)
            : base(manager)
        {
            this.pages = pages;
            if (_PagePanel != null)
                _PagePanel.PositionCachNeedRefresh = true;
            if (pages.Unknowns.ContainsKey("paper-resolution"))
                Resolution = new SizeValue(pages.Unknowns["paper-resolution"]);
        }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        public override void Initialize()
        {
            base.Initialize();
            BackColor = ColorService.ComplexTransparent;
        }
        /// <exclude/>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
                if (pages != null)
                {
                    if (delayPaintList != null)
                    {
                        delayPaintList.Clear();
                        delayPaintList = null;
                    }

                    while (this.Count != 0)
                        if (this[0] is IDisposable)
                        {
                            this[0].Dispose();
                            this.RemoveAt(0);
                        }                        
                }

            base.Dispose(disposing);
        }
    }

    /// <summary>
    /// Abstractní implementace třídy IPage
    /// </summary>
    [ComVisible(false)]
    public abstract class URAbstractPage : AbstractPage
    {
        #region IPage
        readonly UndoRedo<BackgroundImage> backimage = new UndoRedo<BackgroundImage>();
        /// <summary>
        /// Obrázek pozadí
        /// </summary>
        [Browsable(false)]
        public override BackgroundImage BackImage { get { return backimage.Value; } set { backimage.Value = value; } }

        readonly UndoRedo<bool> showbackground = new UndoRedo<bool>();
        /// <summary>
        /// Indikuje zobrazení pozadí stránky
        /// </summary>
        [Category("Pozadí")]
        [DisplayName("zobrazit obrázek pozadí")]
        [Description("Indikuje zobrazení obrázku pozadí stránky")]
        [TypeConverter(typeof(BooleanTypeConverter))]
        public override bool ShowBackground { get { return showbackground.Value; } set { showbackground.Value = value; } }
        /// <exclude/>
        protected override void OnChangePosition(int oldPosition, int newPosition)
        {
            if (!UndoRedoService.IsTransactionStarted)
                UndoRedoService.StartTransaction(General.GResources.GetResourceText(29450278)); //RC 29450278 : změna pozice stránky

            base.OnChangePosition(oldPosition, newPosition);
        }
        #endregion

        /// <summary>
        /// Vytvoření stránky v kolekcí <paramref name="pages"/>.
        /// </summary>
        /// <param name="pages">Kolekce - vlastník vytvářené stránky</param>
        public URAbstractPage(IPages pages)
            : base(pages, UndoRedoService.Manager)
        {
        }

        /// <summary>
        /// Inicializace objektu
        /// </summary>
        public override void Initialize()
        {
            BackColor = new URComplexColor().Initialize(ColorService.ComplexTransparent);
        }
        /// <summary>
        /// indikace pohybu taženého objektu bezprostředně nad stránkou
        /// </summary>
        /// <returns>TRUE - stránka je bezprostředně POD objektem</returns>
        protected bool IsTowed()
        {
            return _PagePanel.IsDragOver && BoundsInPixels.Contains(_PagePanel.DragPoint);
        }
    }
}
