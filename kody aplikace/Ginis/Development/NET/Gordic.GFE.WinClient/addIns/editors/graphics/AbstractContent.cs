//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AbstractContent.cs                       </Name>
//    <Description> Site kontejneru                                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Hosting;
using Gordic.GFE.Parsers.Light;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.Designer.Gui;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.WinClient.VariablesView;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Drawing.Design;
using System.Linq;
using System.Windows.Forms;
using System.Xml;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Site kontejneru
    /// </summary>
    class ComponentSite : ISite
    {
        readonly IComponent component;
        /// <summary>
        /// Komponenta asociovaná s daným ISite
        /// </summary>
        public IComponent Component { get => component; }

        readonly IContainer container;
        /// <summary>
        /// Kontejner asociovaný s danou ISite
        /// </summary>
        public IContainer Container { get => container; }

        readonly bool designMode;
        /// <summary>
        /// Určuje, zda komponenta je v návrhovém režimu
        /// </summary>
        public bool DesignMode { get => designMode; }

        string name;
        /// <summary>
        /// Název komponenty
        /// </summary>
        public string Name { get => name; set => name = value; }

        /// <summary>
        /// Získání služby (IServiceProvider)
        /// </summary>
        /// <param name="serviceType">Typ hledané služby</param>
        /// <returns>Služba dle typu</returns>
        public object GetService(Type serviceType) => null;

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="pContainer">Kontejner vytvářeného objektu</param>
        /// <param name="pComponent">Komponenta objektu</param>
        public ComponentSite(IContainer pContainer, IComponent pComponent)
        {
            this.container = pContainer;
            this.component = pComponent;
            designMode = false;
            name = NamedService.CreateUniqueName(pContainer.Components, pComponent.GetType());
        }
    }

    /// <summary>
    /// Abstractní třída obsahového objektu GRF sestavy
    /// </summary>
    abstract public class AbstractContent : LAbstractContent, ITagComponent, IChangeable, ICursorHandler, ISurroundable,
        IFormatHandler, ISelectable, IValidateHandler, IToolTip
    {
        #region ISizeable
        /// <summary>
        /// indikuje, že právě probíhá změna velikosti daného objektu
        /// </summary>
        bool isWidthChanging;

        UndoRedo<SizeValue> width = new UndoRedo<SizeValue>();
        /// <summary>
        /// Šířka objektu
        /// </summary>
        [Browsable(false)]
        public override SizeValue Width
        {
            get => width.Value;
            set { width.Value = value; OnWidthChanged(); }
        }
        void OnWidthChanged()
        {
            if (!isWidthChanging)
            {
                isWidthChanging = true;
                widthChanged?.Invoke(this, EventArgs.Empty);
                isWidthChanging = false;
            }
        }

        UndoRedo<SizeValue> height = new UndoRedo<SizeValue>();
        /// <summary>
        /// Výška objektu
        /// </summary>
        public override SizeValue Height
        {
            get => height.Value;
            set { height.Value = value; OnHeightChanged(); }
        }

        /// <summary>
        /// volá se po změně výšky objektu
        /// </summary>
        void OnHeightChanged()
        {
            if (!isHeightChanging)
            {
                isHeightChanging = true;
                heightChanged?.Invoke(this, EventArgs.Empty);
                isHeightChanging = false;
            }
        }

        /// <summary>
        /// indikuje, že právě probíhá změna LEFT pozice daného objektu
        /// </summary>
        bool isLeftChanging;
        UndoRedo<SizeValue> left = new UndoRedo<SizeValue>();
        /// <summary>
        /// Pozice zleva objektu
        /// </summary>
        public override SizeValue Left
        {
            get => left.Value; set
            {
                left.Value = value;
                OnLeftChanged();
            }
        }
        void OnLeftChanged()
        {
            if (!isLeftChanging)
            {
                isLeftChanging = true;
                leftChanged?.Invoke(this, EventArgs.Empty);
                isLeftChanging = false;
            }
        }

        /// <summary>
        /// indikuje, že právě probíhá změna TOP pozice daného objektu
        /// </summary>
        bool isTopChanging;
        UndoRedo<SizeValue> top = new UndoRedo<SizeValue>();
        /// <summary>
        /// Pozice shora objektu
        /// </summary>
        public override SizeValue Top
        {
            get => top.Value;
            set { top.Value = value; OnTopChanged(); }
        }
        void OnTopChanged()
        {
            if (!isTopChanging)
            {
                isTopChanging = true;
                topChanged?.Invoke(this, EventArgs.Empty);
                isTopChanging = false;
            }
        }
        #endregion

        #region IZoomSizeable
        /// <summary>
        /// veličina zvětšení
        /// </summary>
        public override float Zoom => Page != null ? Page.Zoom : 1f;
        /// <summary>
        /// Pozice zleva - včetně Zoom hodnoty
        /// Je to vůči panelu
        /// </summary>
        [Browsable(false)]
        public override float LeftZoom => Page == null ? 0 : (Left + Page.MarginLeft) * Zoom + ReportDesignerProperties.Instance.PageLeft;
        /// <summary>
        /// Pozice shora - včetně Zoom hodnoty
        /// </summary>
        [Browsable(false)]
        public override float TopZoom => Page == null ? 0 : ((Top + Page.MarginTop) * Zoom + Page.TopZoom);
        #endregion

        #region ISurroundable
        /// <summary>
        /// Barva rámečku
        /// </summary>
        [DisplayName("barva")]
        [Category("Rámeček")]
        [TypeConverter(typeof(ComplexColorConverter))]
        [Description("Barva rámečku. Je to hodnota všech stran")]
        public IComplexColor PropertySurroundColor
        {
            get => Surround == null ? ColorService.ComplexTransparent : Surround.FrameColor.AllValue;
            set => Surround?.FrameColor.SetAllValue(value);
        }

        /// <summary>
        /// Styl rámečku
        /// </summary>
        [DisplayName("styl")]
        [Category("Rámeček")]
        [Description("Styl rámečku. Je to hodnota všech stran")]
        [TypeConverter(typeof(ComplexDashStyleConverter))]
        public string PropertySurroundDashStyle
        {
            get => Surround == null ? ComplexDashStyle.Unspec : Surround.DashStyle.AllValue;
            set
            {
                if (Surround != null)
                {
                    if (!UndoRedoService.IsTransactionStarted)
                        UndoRedoService.StartTransaction(GResources.GetResourceText(29450066)); //RC 29450066 : změna stylu rámečku

                    Surround.DashStyle.AllValue = value;
                }
            }
        }

        UndoRedo<IComplexSurround> surround = new UndoRedo<IComplexSurround>();
        /// <summary>
        /// Rameček (detail)
        /// </summary>
        [Browsable(false)]
        public IComplexSurround Surround { get => surround.Value; set => surround.Value = value; }
        /// <summary>
        /// Rameček (detail)
        /// </summary>
        [DisplayName("detail")] //RC 29450594 : detail
        [Category("Rámeček")] //RC 29450589 : Rámeček
        [Description("Nastavení jednotlivých stran")] //RC 29450595 : Nastavení jednotlivých strán
        public URComplexSurround PropertySurround { get => Surround as URComplexSurround; set => Surround = value; }

        /// <summary>
        /// šířka rámečku
        /// </summary>
        [DisplayName("šířka všech stran")] //RC 29450502 : šířka
        [Category("Rámeček")] //RC 29450589 : Rámeček
        [Description("Šířka rámečku. Je to hodnota všech stran")] //RC 29450596 : Šířka rámečku. Je to hodnota všech strán
        public string PropertySurroundWidth
        {
            get => Surround == null ? string.Empty : Surround.Width.AllValue;
            set
            {
                if (Surround != null)
                {
                    if (!UndoRedoService.IsTransactionStarted)
                        UndoRedoService.StartTransaction(GResources.GetResourceText(29450067)); //RC 29450067 : změna šířky rámečku
                    Surround.Width.AllValue = value;
                }
            }
        }

        UndoRedo<IInnerSurround> innersurround = new UndoRedo<IInnerSurround>();
        /// <summary>
        /// Vnitřní orámování (detail)
        /// </summary>
        [Browsable(false)]
        public IInnerSurround InnerSurround { get => innersurround.Value; set => innersurround.Value = value; }

        /// <summary>
        /// šířka vnitřního orámování
        /// </summary>
        [DisplayName("šířka nahoru")]
        [Category("Vnitřní orámování")]
        [Description("Šířka vnitřního orámování nahoru")]
        public string PropertySurroundUpWidth
        {
            get => InnerSurround?.UpWidth.Value;
            set
            {
                if (InnerSurround != null)
                {
                    if (!UndoRedoService.IsTransactionStarted)
                        UndoRedoService.StartTransaction(GResources.GetResourceText(2945184)); //RC 2945184 : Změna šířky vnitřního orámování nahoru

                    InnerSurround.UpWidth.Value = value;
                }
            }
        }

        /// <summary>
        /// šířka vnitřního orámování
        /// </summary>
        [DisplayName("šířka dolů")]
        [Category("Vnitřní orámování")]
        [Description("Šířka vnitřního orámování dolů")]
        public string PropertySurroundDownWidth
        {
            get => InnerSurround?.DownWidth.Value;
            set
            {
                if (InnerSurround != null)
                {
                    if (!UndoRedoService.IsTransactionStarted)
                        UndoRedoService.StartTransaction(GResources.GetResourceText(2945185));  //RC 2945185 : Změna šířky vnitřního orámování dolů

                    InnerSurround.DownWidth.Value = value;
                }
            }
        }

        /// <summary>
        /// Styl rámečku
        /// </summary>
        [DisplayName("styl nahoru")]
        [Category("Vnitřní orámování")]
        [Description("Styl orámování nahoru")]
        [TypeConverter(typeof(ComplexDashStyleConverter))]
        public string PropertySurroundUpDashStyle
        {
            get => InnerSurround?.UpDashStyle.Value;
            set
            {
                if (InnerSurround != null)
                {
                    if (!UndoRedoService.IsTransactionStarted)
                        UndoRedoService.StartTransaction(GResources.GetResourceText(2945186)); //RC 2945186 : Změna stylu vnitřního orámování nahoru

                    InnerSurround.UpDashStyle.Value = value;
                }
            }
        }
        /// <summary>
        /// Styl rámečku
        /// </summary>
        [DisplayName("styl dolů")]
        [Category("Vnitřní orámování")]
        [Description("Styl orámování dolů")]
        [TypeConverter(typeof(ComplexDashStyleConverter))]
        public string PropertySurroundDownDashStyle
        {
            get => InnerSurround?.DownDashStyle.Value;
            set
            {
                if (InnerSurround != null)
                {
                    if (!UndoRedoService.IsTransactionStarted)
                        UndoRedoService.StartTransaction(GResources.GetResourceText(2945187)); //RC 2945187 : Změna stylu vnitřního orámování dolů

                    InnerSurround.DownDashStyle.Value = value;
                }
            }
        }

        /// <summary>
        /// Barva orámování nahoru
        /// </summary>
        [DisplayName("barva nahoru")]
        [Category("Vnitřní orámování")]
        [TypeConverter(typeof(ComplexColorConverter))]
        [Description("Barva orámování nahoru")]
        public IComplexColor PropertySurroundUpColor
        {
            get => InnerSurround == null ? ColorService.ComplexTransparent : InnerSurround.UpFrameColor;
            set
            {
                if (InnerSurround != null)
                    InnerSurround.UpFrameColor = value;
            }
        }
        /// <summary>
        /// Barva orámování dolů
        /// </summary>
        [DisplayName("barva dolů")]
        [Category("Vnitřní orámování")]
        [TypeConverter(typeof(ComplexColorConverter))]
        [Description("Barva orámování dolů")]
        public IComplexColor PropertySurroundDownColor
        {
            get => InnerSurround == null ? ColorService.ComplexTransparent : InnerSurround.DownFrameColor;
            set
            {
                if (InnerSurround != null)
                    InnerSurround.DownFrameColor = value;
            }

        }
        #endregion

        #region IPaintable
        /// <summary>
        /// Kreslení objektu
        /// </summary>
        /// <param name="graphics">Ovladač grafiky</param>
        /// <param name="args">args</param>
        public virtual void OnPaint(Graphics graphics, PaintArgs args)
        {
            if (!graphics.VisibleClipBounds.IntersectsWith(BoundsInPixels))
                return;

            Region reg = graphics.Clip;
            graphics.Clip = new Region(RectangleF.Intersect(BoundsInPixels, graphics.VisibleClipBounds));

            DrawClear(graphics);

            if (!(this is IPageBackground) || !(this as IPageBackground).BackType)
            {
                if (Anchor)
                    TagService.DrawTagAnchor(graphics, BoundsInPixels);

                if (Scripts != null && !Scripts.IsEmpty)
                    TagService.DrawTagTriangle(graphics, new PointF(LeftZoom, TopZoom));

                if (this is ITextHandler && (this as ITextHandler).Text != null)
                    (this as ITextHandler).Text.Paint(graphics, BoundsInPixels, Padding, Zoom);

                List<int> order = Order;
                if (GraphicSettingService.ShowOrder && order.Count > 0)
                    // do pravého horního rohu
                    TagService.DrawTagOrder(graphics, new PointF(LeftZoom, TopZoom), Order.Last().ToString(), Zoom);
            }

            graphics.Clip = reg;
            Page?.DelayPaintList.Add(new DelayPaintItem(this, IsSelected, reg));
        }

        /// <summary>
        /// Kreslení objektu
        /// </summary>
        /// <param name="graphics">Ovladač grafiky</param>
        /// <param name="isSelected">indikátor vybranosti objektu</param>
        public virtual void OnPaintBorder(Graphics graphics, bool isSelected)
        {
            Color _color = isSelected ? CommonService.BorderColorActive : (GraphicSettingService.ShowGrid ? CommonService.BorderColorNonactive : Color.Transparent);

            if (!isSelected)
                graphics.DrawRectangle(new Pen(new SolidBrush(_color), 1), LeftZoom, TopZoom, BoundsInPixels.Width, BoundsInPixels.Height);
            //GraphicsPath path = RoundedRectangle.Create(LeftZoom, TopZoom, BoundsInPixels.Width, BoundsInPixels.Height);
            //graphics.DrawPath(Pens.Black, path);

            TagService.DrawTagFrame(Surround, graphics, new PointF(LeftZoom, TopZoom), new SizeF(WidthZoom, HeightZoom), Zoom, Spacing);

            if (isSelected)
                using (SolidBrush drawBrush = new SolidBrush(_color))
                {
                    using (Pen pen = new Pen(drawBrush, 3))
                    {
                        pen.DashStyle = System.Drawing.Drawing2D.DashStyle.Dash;
                        graphics.DrawRectangle(pen, BoundsInPixels.X, BoundsInPixels.Y, BoundsInPixels.Width, BoundsInPixels.Height);
                        //graphics.DrawRectangle(pen, graphicRectangleComponent.X, graphicRectangleComponent.Y, graphicRectangleComponent.Width, graphicRectangleComponent.Height);

                        //PoradiCtvrcu.a
                        graphics.FillRectangle(new SolidBrush(Color.White), new RectangleF(new PointF(LeftZoom - 3, TopZoom - 3), new SizeF(6F, 6F)));
                        PointF pf = new PointF(LeftZoom - 3, TopZoom - 3);
                        graphics.DrawRectangle(new Pen(new SolidBrush(Color.Black), 1), pf.X, pf.Y, 6F, 6F);

                        //PoradiCtvrcu.c
                        graphics.FillRectangle(new SolidBrush(Color.White), new RectangleF(new PointF(LeftZoom + BoundsInPixels.Width - 3, TopZoom - 3), new Size(6, 6)));
                        PointF pf1 = new PointF(LeftZoom + BoundsInPixels.Width - 3, TopZoom - 3);
                        graphics.DrawRectangle(new Pen(new SolidBrush(Color.Black), 1), pf1.X, pf1.Y, 6F, 6F);

                        //PoradiCtvrcu.f
                        graphics.FillRectangle(new SolidBrush(Color.White), new RectangleF(new PointF(LeftZoom - 3, TopZoom + BoundsInPixels.Height - 3), new Size(6, 6)));
                        PointF pf2 = new PointF(LeftZoom - 3, TopZoom + BoundsInPixels.Height - 3);
                        graphics.DrawRectangle(new Pen(new SolidBrush(Color.Black), 1), pf2.X, pf2.Y, 6F, 6F);

                        //PoradiCtvrcu.h
                        graphics.FillRectangle(new SolidBrush(Color.White), new RectangleF(new PointF(LeftZoom + BoundsInPixels.Width - 3, TopZoom + BoundsInPixels.Height - 3), new Size(6, 6)));
                        PointF pf3 = new PointF(LeftZoom + BoundsInPixels.Width - 3, TopZoom + BoundsInPixels.Height - 3);
                        graphics.DrawRectangle(new Pen(new SolidBrush(Color.Black), 1), pf3.X, pf3.Y, 6F, 6F);
                    }
                }
        }
        #endregion

        #region ITagComponent
        /// <summary>
        /// indikuje možnost manipulace s objektem
        /// </summary>
        [Browsable(false)]
        public virtual bool ReadOnly => (this.Page as IReadOnly).ReadOnly;

        /// <summary>
        /// Informace o formátu objektu
        /// </summary>
        [Browsable(false)]
        public GFEFormatTag FormatTag { get; protected set; }

        /// <summary>
        /// Pozice objektu v seznamu nadřazeného objketu
        /// </summary>
        [DisplayName("pozice")] //RC 29450514 : pozice
        [Description("Pozice objektu v seznamu vlastníka")] //RC 29450515 : Pozice objektu v seznamu vlastníka
        public int PropertyOrder { get => Order.Count == 0 ? -1 : Order.Last(); set => OnChangeOrder(Order.Last(), value); }

        /// <summary>
        /// Pozice objektu v seznamu nadřazeného objektu
        /// </summary>
        [Browsable(false)]
        public List<int> Order
        {
            get
            {
                List<int> ordering = new List<int>();
                if (Parent is IOrder)
                    ordering.AddRange((Parent as IOrder).Order);

                if (Parent is ITowedHandler)
                    ordering.Add((Parent as ITowedHandler).IndexOf(this));

                return ordering;
            }
        }

        /// <summary>
        /// Indikace viditelností
        /// </summary>
        [Browsable(false)]
        public bool IsVisible { get => Parent != null; }

        int positionStart = -1;
        /// <summary>
        /// Začátek pozice
        /// </summary>
        [Browsable(false)]
        public int StartPosition { get => positionStart; set => positionStart = value; }
        int positionEnd = -1;
        /// <summary>
        /// Konec pozice
        /// </summary>
        [Browsable(false)]
        public int EndPosition { get => positionEnd; set => positionEnd = value; }

        /// <summary>
        /// typ objektu
        /// </summary>
        [Browsable(false)]
        public bool IsInStyle { get => true; }

        /// <summary>
        /// 
        /// </summary>
        [Browsable(false)]
        public bool CanBeSameANested { get => false; }

        /// <summary>
        /// typ vybraného objektu
        /// </summary>
        [Browsable(false)]
        public string PSType
        {
            get
            {
                switch (this.ComponentType)
                {
                    case ComponentType.region:
                        return "region";
                    case ComponentType.valueof:
                        return "value-of";
                    case ComponentType.text:
                        return "text";
                    case ComponentType.image:
                        return "image";
                    case ComponentType.imageof:
                        return "image-of";
                    case ComponentType.table:
                        return "table";
                    case ComponentType.chart:
                        return "chart";
                    case ComponentType.barcode:
                        return "barcode";
                    case ComponentType.drawing:
                        return "drawing";
                    case ComponentType.button:
                        return "button";
                    case ComponentType.grid:
                        return "grid";
                    case ComponentType.group:
                        return "group";
                    case ComponentType.attachment:
                        return "attachment";
                    case ComponentType.signature:
                        return "signature";
                    case ComponentType.select:
                        return "select";
                    default:
                        return null;
                };
            }
        }
        /// <summary>
        /// stránka objektu
        /// </summary>
        protected UndoRedo<IPage> m_page = new UndoRedo<IPage>();
        /// <summary>
        /// Stránka objektu
        /// </summary>
        [Browsable(false)]
        public virtual IPage Page
        {
            get => Parent != null && (Parent is ITagComponent) ? (Parent as ITagComponent).Page : m_page.Value;
            set
            {
                m_page.Value = value;
                if (this is IPageBackground back && back.BackType) m_page.Value.BackObject = back;
            }
        }

        UndoRedo<ISizable> parent = new UndoRedo<ISizable>();
        /// <summary>
        /// Vlastník daného objektu
        /// </summary>
        [Browsable(false)]
        public override ISizable Parent
        {
            get => parent.Value;
            set
            {
                parent.Value = value;
                if (value is IPage) m_page.Value = value as IPage;
            }
        }

        /// <summary>
        /// Načtení informaci o objektu z formátu daného objektu
        /// </summary>
        override public void LoadInformation()
        {
            //Pokud se nejedná o datovou položku pak není co řešit 
            if (FormatTag is GFEFormatContent content)
            {
                //pozice řádku, ve kterém začíná Tag
                StartPosition = FormatTag.LinePosition - 1;

                //Zafixujeme datovou položku
                if (FormatTag.Attributes.ContainsKey("rect") && !Unknowns.ContainsKey("rect"))
                    TagService.SetRectByAttribute(this, FormatTag.Attributes["rect"]);

                if (FormatTag.Attributes.ContainsKey("labeltext"))
                    LabelText = FormatTag.Attributes["labeltext"];

                if (content.Style != null)
                {
                    //odsazení
                    Padding.LeftValue = content.Style.Padding.left + Convert.ToString(content.Style.Padding.leftMet);
                    Padding.RightValue = content.Style.Padding.right + Convert.ToString(content.Style.Padding.rightMet);
                    Padding.TopValue = content.Style.Padding.top + Convert.ToString(content.Style.Padding.topMet);
                    Padding.BottomValue = content.Style.Padding.bottom + Convert.ToString(content.Style.Padding.bottomMet);

                    Surround = new URComplexSurround().Initialize(content.Style);
                    InnerSurround = new URInnerSurround().Initialize(content.Style);

                    Spacing.LeftValue = content.Style.Spacing.left == 0 ? "0" : content.Style.Spacing.left + Convert.ToString(content.Style.Spacing.leftMet);
                    Spacing.RightValue = content.Style.Spacing.right == 0 ? "0" : content.Style.Spacing.right + Convert.ToString(content.Style.Spacing.rightMet);
                    Spacing.TopValue = content.Style.Spacing.top == 0 ? "0" : content.Style.Spacing.top + Convert.ToString(content.Style.Spacing.topMet);
                    Spacing.BottomValue = content.Style.Spacing.bottom == 0 ? "0" : content.Style.Spacing.bottom + Convert.ToString(content.Style.Spacing.bottomMet);

                    if (content.Style.Attributes.ContainsKey("inside-border"))
                        Surround.InsideBorder = content.Style.Attributes["inside-border"].ToLower() == "true" ? true : false;

                    if (content.Style.Attributes.ContainsKey("radius-border"))
                    {
                        int.TryParse(content.Style.Attributes["radius-border"], out int radius);
                        Surround.Radius = radius;
                    }

                    if (content.Style.Attributes.ContainsKey("corners-border"))
                    {
                        int.TryParse(content.Style.Attributes["corners-border"], out int corners);
                        Surround.Corners = (ComplexSurroundCorners)corners;
                    }
                }

                BackColor = new URComplexColor();

                if (AttrList.ContainsKey("background-color"))
                    BackColor.Initialize(AttrList["background-color"]);
                else if (content.Style != null && content.Style.Attributes.ContainsKey("background-color"))
                    BackColor.Initialize(content.Style.Attributes["background-color"]);
                else
                    BackColor.Initialize(Color.Transparent);

                ShowBackground = BackColor.Color != Color.Transparent;

                SetScripts();

                SetChildren();
            }

#pragma warning disable CS0618 // Typ nebo člen je zastaralý.
            CommonService.ApplayStyleSizable(this, AttrList);
#pragma warning restore CS0618 // Typ nebo člen je zastaralý.
        }

        /// <summary>
        /// Nastavení skriptů
        /// </summary>
        protected virtual void SetScripts()
        {
            Dictionary<string, string> scripts = AttrList.FindAllByKey(key =>
                key.StartsWith("on", StringComparison.InvariantCulture)
                && key.Length > 2
                && char.IsUpper(key[2]));
            if (Scripts != null)
            {
                Scripts.AddRange(scripts);
                Scripts.SynchronizeByOrigin();
            }
        }

        /// <summary>
        /// čtení vnořených objektů
        /// </summary>
        protected virtual void SetChildren()
        {
            foreach (var item in FormatTag.Children)
                if (item.TagName.Equals("validate"))
                    Validates.Add(new Validate(item));
        }

        /// <summary>
        /// ISite komponenty
        /// </summary>
        [Browsable(false)]
        public ISite Site { get; set; }

        UndoRedo<GFEAttrList> attrlist = new UndoRedo<GFEAttrList>();
        /// <summary>
        /// Všechny atributy objektu
        /// </summary>
        [DisplayName("atributy")]
        [Description("Všechny atributy objektu")]
        [EditorAttribute(typeof(AttributeListEditor), typeof(UITypeEditor))]
        public GFEAttrList AttrList { get => attrlist.Value; set => attrlist.Value = value; }

        readonly List<string> knownTags = new List<string>();
        /// <summary>
        /// Seznam znamých atributů
        /// </summary>
        [Browsable(false)]
        public virtual List<string> KnownTags { get => knownTags; }

        /// <summary>
        /// Neznámé značky buňky
        /// </summary>
        [Browsable(false)]
        public virtual Dictionary<string, string> Unknowns
        {
            get
            {
                Dictionary<string, string> list = AttrList.FindAllByKey(attr => !KnownTags.Contains(attr) && !Scripts.ContainsKey(attr));
                if (list.Count != 0)
                    if (Parent is ICell cell && cell.Line.Parent is AbstractContent)
                        return list.FindAllByKey(attr => !(cell.Line.Parent as AbstractContent).KnownTags.Contains(attr));
                return list;
            }
        }

        /// <summary>
        /// Oblast obsahu - je to BoundsInPixels bez odsazení
        /// </summary>
        [Browsable(false)]
        public RectangleF ContentBounds
        {
            get => new RectangleF(
                    LeftZoom + Padding.LeftPixels * Zoom,
                    TopZoom + Padding.TopPixels * Zoom,
                    WidthZoom - (Padding.LeftPixels + Padding.RightPixels) * Zoom,
                    HeightZoom - (Padding.TopPixels + Padding.BottomPixels) * Zoom);
        }

        UndoRedo<GFEScriptList> scripts = new UndoRedo<GFEScriptList>();
        /// <summary>
        /// Dostupné skripty objektu
        /// </summary>
        [DisplayName("skripty")]
        [Description("Dostupné skripty objektu")]
        [EditorAttribute(typeof(ScriptListEditor), typeof(UITypeEditor))]
        [Browsable(false)]
        public virtual GFEScriptList Scripts { get => scripts.Value; set => scripts.Value = value; }

        UndoRedo<bool> anchor = new UndoRedo<bool>();
        /// <summary>
        /// Kotva objektu
        /// </summary>
        [DisplayName("kotva")] //RC 29450531 : kotva
        [Description("Indikuje, zda objekt je ukotven nebo není. V případě ukotvení objekt nelze měnit")] //RC 29450532 : Indikuje, zda objekt je ukotven nebo není. V případě ukotvení objekt nelze měnít
        [TypeConverter(typeof(BooleanTypeConverter))]
        public bool Anchor { get => anchor.Value; set => anchor.Value = value; }

        /// <summary>
        /// způsob umístění rámečků v buňce
        /// </summary>
        [Category("Rámeček")]
        [Description("Indikuje, že rámeček se kreslí uvnitř objektu")]
        [DisplayName("uvnitř")]
        [TypeConverter(typeof(BooleanTypeConverter))]
        public bool PropertyInsideBorder { get => Surround != null && Surround.InsideBorder; set => Surround.InsideBorder = value; }

        /// <summary>
        /// způsob umístění rámečků v buňce
        /// </summary>
        [Category("Rámeček")]
        [Description("Poloměr zaoblení rohů rámečku. Je to celé číslo větší 0.")]
        [DisplayName("zaoblení")]
        public int PropertyRadiusBorder { get => Surround != null ? Surround.Radius : 1; set => Surround.Radius = value > 1 ? value : 1; }

        /// <summary>
        /// způsob umístění rámečků v buňce
        /// </summary>
        [Category("Rámeček")]
        [Description("Výčet rohů zaoblení.")]
        [DisplayName("rohy")]
        public ComplexSurroundCorners PropertyCornersBorder { get => Surround != null ? Surround.Corners : ComplexSurroundCorners.None; set => Surround.Corners = value; }

        UndoRedo<IComplexFive> spacing = new UndoRedo<IComplexFive>();
        /// <summary>
        /// Odsazení rámečku
        /// </summary>
        [Browsable(false)]
        public IComplexFive Spacing { get => spacing.Value; set => spacing.Value = value; }

        /// <summary>
        /// Odsazení rámečku
        /// </summary>
        [Category("Rámeček")] //RC 29450589 : Rámeček
        [DisplayName("odsazení")] //RC 29450601 : odsazení
        [Description("Odsazení rámečku uvnitř objektu. Je to hodnota všech stran")] //RC 29450602 : Odsazení rámečku uvnítř objektu. Je to hodnota všech strán
        public string PropertySpacing { get => Spacing != null ? Spacing.AllValue : string.Empty; set => Spacing.AllValue = value; }

        /// <summary>
        /// Metoda vracení XML struktury elementu. Defaultně je to STYLE
        /// </summary>
        /// <param name="xmlDoc">Dokument, do kterého se struktura vkládá</param>
        /// <param name="xmlStyles">Seznam již existujících nadřazených stylů</param>
        /// <param name="withRect">Seznam již existujících nadřazených stylů</param>
        /// <param name="regionFullName">Úplný název aktuálního regionu</param>
        /// <returns>Element popisující daný objekt</returns>
        virtual public XmlElement GetXmlData(XmlDocumentPosition xmlDoc, List<GFEList> xmlStyles, bool withRect = true, string regionFullName = null)
        {
            GFEList _actualXmlStyle = new GFEList(), _newXmlStyle = new GFEList();

            //Pokud v zásobníku existuje styl, pak zafixujeme poslední
            if (xmlStyles.Count != 0)
                _actualXmlStyle = xmlStyles[xmlStyles.Count - 1];

            XmlElement xmlStyle = xmlDoc.CreateElement("style", ReportDesignerProperties.Instance.AlfReportXmlns);

            dynamic _actualValue = null;

            if (this is ITextHandler)
            {
                var text = (this as ITextHandler).Text;
                if (text != null)
                {
                    if (text.TextFont != null)
                    {
                        string serializedFontName = LocalCommonService.GetSerializedFontFamilyName(this as ITextHandler, _actualXmlStyle);

                        #region font-name, font-face
                        if (_actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("font-name"))
                            _actualValue = _actualXmlStyle["font-name"];

                        if (string.IsNullOrEmpty(_actualValue))
                        {
                            if (_actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("font-face"))
                                _actualValue = _actualXmlStyle["font-face"];

                            if (!"times".Equals(serializedFontName))
                                if (!"arial".Equals(serializedFontName) && !"courier".Equals(serializedFontName))
                                {
                                    if (_actualValue != serializedFontName)
                                    {
                                        xmlStyle.SetAttribute("font-face", "custom");
                                        xmlStyle.SetAttribute("font-name", serializedFontName);
                                    }

                                    _newXmlStyle.Add("font-face", "custom");
                                }
                                else
                                {
                                    if (_actualValue != serializedFontName)
                                        xmlStyle.SetAttribute("font-face", serializedFontName);

                                    _newXmlStyle.Add("font-face", serializedFontName);
                                }
                        }
                        else if (_actualValue != serializedFontName)
                        {
                            if (_actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("font-face"))
                                _actualValue = _actualXmlStyle["font-face"];

                            if (!"arial".Equals(serializedFontName) && !"courier".Equals(serializedFontName))
                            {
                                if (string.IsNullOrEmpty(_actualValue) || !"custom".Equals(_actualValue))
                                {
                                    xmlStyle.SetAttribute("font-face", "custom");
                                    xmlStyle.SetAttribute("font-name", serializedFontName);
                                }

                                _newXmlStyle.Add("font-face", "custom");
                            }
                            else
                            {
                                if (_actualValue != serializedFontName)
                                    xmlStyle.SetAttribute("font-face", serializedFontName);

                                _newXmlStyle.Add("font-face", serializedFontName);
                            }

                        }

                        _newXmlStyle.Add("font-name", serializedFontName);
                        #endregion

                        #region font-charset
                        _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("font-charset")
                            ? _actualXmlStyle["font-charset"]
                            : string.Empty;

                        string gcs = Convert.ToString(text.TextFont.GdiCharSet).Replace("_CHARSET", "").ToLower();
                        if (string.IsNullOrEmpty(_actualValue))
                        {
                            if (text.TextFont.GdiCharSet != ECharSet.EASTEUROPE_CHARSET)
                                xmlStyle.SetAttribute("font-charset", gcs);
                        }
                        else if (_actualValue != gcs)
                            xmlStyle.SetAttribute("font-charset", gcs);

                        _newXmlStyle.Add("font-charset", gcs);
                        #endregion

                        #region font-size
                        _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("font-size")
                            ? _actualXmlStyle["font-size"]
                            : string.Empty;

                        if (string.IsNullOrEmpty(_actualValue))
                        {
                            // výchozí hodnota
                            if (!"2".Equals(text.TextFont.Size.Value))
                                xmlStyle.SetAttribute("font-size", text.TextFont.Size.Value.Replace(",", "."));
                        }
                        else
                            if (_actualValue != text.TextFont.Size.Value)
                            xmlStyle.SetAttribute("font-size", text.TextFont.Size.Value.Replace(",", "."));

                        _newXmlStyle.Add("font-size", text.TextFont.Size.Value.Replace(",", "."));
                        #endregion

                        #region font-bold
                        _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("font-bold")
                            ? _actualXmlStyle["font-bold"]
                            : string.Empty;

                        if (string.IsNullOrEmpty(_actualValue))
                        {
                            if (((FontStyle)text.TextFont.Style & FontStyle.Bold) > 0)
                                xmlStyle.SetAttribute("font-bold", "true");
                        }
                        else if (_actualValue != Convert.ToString(((FontStyle)text.TextFont.Style & FontStyle.Bold) > 0))
                            xmlStyle.SetAttribute("font-bold", Convert.ToString(((FontStyle)text.TextFont.Style & FontStyle.Bold) > 0));

                        _newXmlStyle.Add("font-bold", Convert.ToString(((FontStyle)text.TextFont.Style & FontStyle.Bold) > 0));
                        #endregion

                        #region font-italic
                        _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("font-italic")
                            ? _actualXmlStyle["font-italic"]
                            : string.Empty;

                        if (string.IsNullOrEmpty(_actualValue))
                        {
                            if (((FontStyle)text.TextFont.Style & FontStyle.Italic) > 0)
                                xmlStyle.SetAttribute("font-italic", "true");
                        }
                        else if (_actualValue != Convert.ToString(((FontStyle)text.TextFont.Style & FontStyle.Italic) > 0))
                            xmlStyle.SetAttribute("font-italic", Convert.ToString(((FontStyle)text.TextFont.Style & FontStyle.Italic) > 0));

                        _newXmlStyle.Add("font-italic", Convert.ToString(((FontStyle)text.TextFont.Style & FontStyle.Italic) > 0));
                        #endregion

                        #region font-strikeout
                        _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("font-strikeout")
                            ? _actualXmlStyle["font-strikeout"]
                            : string.Empty;

                        if (string.IsNullOrEmpty(_actualValue))
                        {
                            if (((FontStyle)text.TextFont.Style & FontStyle.Strikeout) > 0)
                                xmlStyle.SetAttribute("font-strikeout", "true");
                        }
                        else if (_actualValue != Convert.ToString(((FontStyle)text.TextFont.Style & FontStyle.Strikeout) > 0))
                            xmlStyle.SetAttribute("font-strikeout", Convert.ToString(((FontStyle)text.TextFont.Style & FontStyle.Strikeout) > 0));

                        _newXmlStyle.Add("font-strikeout", Convert.ToString(((FontStyle)text.TextFont.Style & FontStyle.Strikeout) > 0));
                        #endregion

                        #region font-underline
                        _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("font-underline")
                            ? _actualXmlStyle["font-underline"]
                            : string.Empty;

                        if (string.IsNullOrEmpty(_actualValue))
                        {
                            if (((FontStyle)text.TextFont.Style & FontStyle.Underline) > 0)
                                xmlStyle.SetAttribute("font-underline", "true");
                        }
                        else if (_actualValue != Convert.ToString(((FontStyle)text.TextFont.Style & FontStyle.Underline) > 0))
                            xmlStyle.SetAttribute("font-underline", Convert.ToString(((FontStyle)text.TextFont.Style & FontStyle.Underline) > 0));

                        _newXmlStyle.Add("font-underline", Convert.ToString(((FontStyle)text.TextFont.Style & FontStyle.Underline) > 0));
                        #endregion

                        #region font-color
                        _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("font-color")
                            ? _actualXmlStyle["font-color"]
                            : string.Empty;

                        if (string.IsNullOrEmpty(_actualValue))
                        {
                            if (text.TextFont.ForeColor.Color != Color.Black)
                                xmlStyle.SetAttribute("font-color", text.TextFont.ForeColor.Name);
                        }
                        else if (_actualValue != text.TextFont.ForeColor.Name)
                            xmlStyle.SetAttribute("font-color", text.TextFont.ForeColor.Name);

                        _newXmlStyle.Add("font-color", text.TextFont.ForeColor.Name);
                        #endregion

                        #region background-color
                        if (_actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("background-color"))
                            _actualValue = !_actualXmlStyle["background-color"].Equals("transparent", StringComparison.InvariantCultureIgnoreCase)
                                ? _actualXmlStyle["background-color"]
                                : null;
                        else _actualValue = string.Empty;

                        if (string.IsNullOrEmpty(_actualValue))
                        {
                            if (text.FontBackColor != Color.Transparent)
                                xmlStyle.SetAttribute("background-color", Convert.ToString(text.TextFont.BackColor.Name).ToLower());
                        }
                        else if (!_actualValue.Equals(text.TextFont.BackColor.Name, StringComparison.InvariantCultureIgnoreCase))
                            xmlStyle.SetAttribute("background-color", text.TextFont.BackColor.Name.ToLower());

                        _newXmlStyle.Add("background-color", Convert.ToString(text.TextFont.BackColor.Name).ToLower());
                        #endregion
                    }

                    #region horizontal-align
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("horizontal-align")
                        ? _actualXmlStyle["horizontal-align"]
                        : string.Empty;

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        if (text.Align.Horizontal != HAlign.left)
                            xmlStyle.SetAttribute("horizontal-align", Convert.ToString(text.Align.Horizontal).ToLower());
                    }
                    else if (_actualValue != Convert.ToString(text.Align.Horizontal).ToLower())
                        xmlStyle.SetAttribute("horizontal-align", Convert.ToString(text.Align.Horizontal).ToLower());

                    _newXmlStyle.Add("horizontal-align", Convert.ToString(text.Align.Horizontal).ToLower());
                    #endregion

                    #region vertical-align
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("vertical-align")
                        ? _actualXmlStyle["vertical-align"]
                        : string.Empty;

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        if (text.Align.Vertical != VAlign.top)
                            xmlStyle.SetAttribute("vertical-align", Convert.ToString(text.Align.Vertical).ToLower());
                    }
                    else if (_actualValue != Convert.ToString(text.Align.Vertical).ToLower())
                        xmlStyle.SetAttribute("vertical-align", Convert.ToString(text.Align.Vertical).ToLower());

                    _newXmlStyle.Add("vertical-align", Convert.ToString(text.Align.Vertical).ToLower());
                    #endregion

                    #region ellipsis-style
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("ellipsis-style")
                        ? _actualXmlStyle["ellipsis-style"]
                        : string.Empty;

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        if (text.Ellipsis.Style != ElStyle.dots)
                            xmlStyle.SetAttribute("ellipsis-style", Convert.ToString(text.Ellipsis.Style).ToLower());
                    }
                    else if (_actualValue != Convert.ToString(text.Ellipsis.Style).ToLower())
                        xmlStyle.SetAttribute("ellipsis-style", Convert.ToString(text.Ellipsis.Style).ToLower());

                    _newXmlStyle.Add("ellipsis-style", Convert.ToString(text.Ellipsis.Style).ToLower());
                    #endregion

                    #region ellipsis-char
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("ellipsis-char")
                        ? _actualXmlStyle["ellipsis-char"]
                        : string.Empty;

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        if (!'*'.Equals(text.Ellipsis.Char))
                            xmlStyle.SetAttribute("ellipsis-char", Convert.ToString(text.Ellipsis.Char));
                    }
                    else if (_actualValue != Convert.ToString(text.Ellipsis.Char))
                        xmlStyle.SetAttribute("ellipsis-char", Convert.ToString(text.Ellipsis.Char));

                    _newXmlStyle.Add("ellipsis-char", Convert.ToString(text.Ellipsis.Char));
                    #endregion

                    #region multiline
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("multiline")
                        ? _actualXmlStyle["multiline"]
                        : string.Empty;

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        if (!text.MultiLine)
                            xmlStyle.SetAttribute("multiline", "false");
                    }
                    else if (_actualValue != (text.MultiLine ? "true" : "false"))
                        xmlStyle.SetAttribute("multiline", (text.MultiLine ? "true" : "false"));

                    _newXmlStyle.Add("multiline", (text.MultiLine ? "true" : "false"));
                    #endregion

                    #region text-orientation
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("text-orientation")
                        ? _actualXmlStyle["text-orientation"]
                        : string.Empty;

                    string _contentValue = "0";
                    switch (text.Orientation)
                    {
                        case RotateType.Rotate90FlipXY:
                            _contentValue = "270";
                            break;
                        case RotateType.Rotate180FlipXY:
                            _contentValue = "180";
                            break;
                        case RotateType.Rotate270FlipXY:
                            _contentValue = "90";
                            break;
                        default:
                            break;
                    }

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        switch (text.Orientation)
                        {
                            case RotateType.Rotate90FlipXY:
                                xmlStyle.SetAttribute("text-orientation", "270");
                                break;
                            case RotateType.Rotate180FlipXY:
                                xmlStyle.SetAttribute("text-orientation", "180");
                                break;
                            case RotateType.Rotate270FlipXY:
                                xmlStyle.SetAttribute("text-orientation", "90");
                                break;
                            default:
                                break;
                        }
                    }
                    else if (_actualValue != _contentValue)
                        xmlStyle.SetAttribute("text-orientation", _contentValue);

                    _newXmlStyle.Add("text-orientation", _contentValue);
                    #endregion

                    #region fit-text
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("fit-text") ? _actualXmlStyle["fit-text"] : string.Empty;
                    _contentValue = new FitTextConverter(typeof(FitText)).ConvertToInvariantString(text.Fittext);

                    if ((string.IsNullOrEmpty(_actualValue) || _actualValue != _contentValue) && !FitTextConverter.IsDefault(_contentValue))
                        xmlStyle.SetAttribute("fit-text", _contentValue);

                    _newXmlStyle.Add("fit-text", _contentValue);
                    #endregion

                    #region text-leading
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("text-leading") ? _actualXmlStyle["text-leading"] : string.Empty;
                    _contentValue = text.Textleading.ToString();

                    if ((string.IsNullOrEmpty(_actualValue) || _actualValue != _contentValue) && _contentValue != "1")
                        xmlStyle.SetAttribute("text-leading", _contentValue);

                    _newXmlStyle.Add("text-leading", _contentValue);
                    #endregion

                    #region paragraph-gap
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("paragraph-gap") ? _actualXmlStyle["paragraph-gap"] : string.Empty;
                    _contentValue = text.Paragraphgap.ToString();

                    if ((string.IsNullOrEmpty(_actualValue) || _actualValue != _contentValue) && _contentValue != "1")
                        xmlStyle.SetAttribute("paragraph-gap", _contentValue);

                    _newXmlStyle.Add("paragraph-gap", _contentValue);
                    #endregion
                }
            }
            else
            {
                #region background-color
                if (_actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("background-color"))
                    _actualValue = !_actualXmlStyle["background-color"].Equals("transparent", StringComparison.InvariantCultureIgnoreCase)
                        ? _actualXmlStyle["background-color"]
                        : null;
                else _actualValue = string.Empty;

                if (string.IsNullOrEmpty(_actualValue))
                {
                    if (BackColor != null && BackColor.Color != Color.Transparent)
                        xmlStyle.SetAttribute("background-color", Convert.ToString(BackColor.Name).ToLower());
                }
                else if (BackColor != null
                        && _actualValue.Equals(BackColor.Name, StringComparison.InvariantCultureIgnoreCase))
                    xmlStyle.SetAttribute("background-color", Convert.ToString(BackColor.Name).ToLower());

                if (BackColor != null)
                    _newXmlStyle.Add("background-color", Convert.ToString(BackColor.Name).ToLower());
                #endregion
            }

            #region diagonalup-border-width
            _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("diagonalup-border-width")
                ? _actualXmlStyle["diagonalup-border-width"]
                : string.Empty;

            if (string.IsNullOrEmpty(_actualValue))
            {
                if (!string.IsNullOrEmpty(InnerSurround.UpWidth.Value) && !"0".Equals(InnerSurround.UpWidth.Value))// výchozí hodnota
                {
                    xmlStyle.SetAttribute("diagonalup-border-width", InnerSurround.UpWidth.Value.Replace(",", "."));
                    _newXmlStyle.Add("diagonalup-border-width", InnerSurround.UpWidth.Value.Replace(",", "."));
                }
            }
            else if (!_actualValue.Equals(InnerSurround.UpWidth.Value.Replace(",", ".")))
            {
                xmlStyle.SetAttribute("diagonalup-border-width", InnerSurround.UpWidth.Value.Replace(",", "."));
                _newXmlStyle.Add("diagonalup-border-width", InnerSurround.UpWidth.Value.Replace(",", "."));
            }
            else
                _newXmlStyle.Add("diagonalup-border-width", InnerSurround.UpWidth.Value.Replace(",", "."));
            #endregion

            #region diagonalup-border-color
            _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("diagonalup-border-color")
                ? _actualXmlStyle["diagonalup-border-color"]
                : string.Empty;

            if (string.IsNullOrEmpty(_actualValue))
            {
                if (InnerSurround.UpFrameColor != null
                    && !InnerSurround.UpFrameColor.Equals(ColorService.ComplexBlack)
                    && !InnerSurround.UpFrameColor.Equals(ColorService.ComplexTransparent))
                {
                    xmlStyle.SetAttribute("diagonalup-border-color", InnerSurround.UpFrameColor.Name);
                    _newXmlStyle.Add("diagonalup-border-color", InnerSurround.UpFrameColor.Name);
                }
            }
            else if (!_actualValue.Equals(InnerSurround.UpFrameColor.Name))
            {
                xmlStyle.SetAttribute("diagonalup-border-color", InnerSurround.UpFrameColor.Name);
                _newXmlStyle.Add("diagonalup-border-color", InnerSurround.UpFrameColor.Name);
            }
            else
                _newXmlStyle.Add("diagonalup-border-color", InnerSurround.UpFrameColor.Name);
            #endregion

            #region diagonalup-border-style
            _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("diagonalup-border-style")
                ? _actualXmlStyle["diagonalup-border-style"]
                : string.Empty;

            if (string.IsNullOrEmpty(_actualValue))
            {
                if (InnerSurround.UpDashStyle.Value != ComplexDashStyle.Unspec && InnerSurround.UpDashStyle.Value != ComplexDashStyle.Solid)
                {
                    xmlStyle.SetAttribute("diagonalup-border-style", ComplexDashStyle.ToEngName(InnerSurround.UpDashStyle.Value));
                    _newXmlStyle.Add("diagonalup-border-style", ComplexDashStyle.ToEngName(InnerSurround.UpDashStyle.Value));
                }
            }
            else if (InnerSurround.UpDashStyle.Value != ComplexDashStyle.Unspec && !ComplexDashStyle.ToEngName(InnerSurround.UpDashStyle.Value).Equals(_actualValue))
            {
                xmlStyle.SetAttribute("diagonalup-border-style", ComplexDashStyle.ToEngName(InnerSurround.UpDashStyle.Value));
                _newXmlStyle.Add("diagonalup-border-style", ComplexDashStyle.ToEngName(InnerSurround.UpDashStyle.Value));
            }
            else
                _newXmlStyle.Add("diagonalup-border-style", ComplexDashStyle.ToEngName(InnerSurround.UpDashStyle.Value));
            #endregion

            #region diagonaldown-border-width
            _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("diagonaldown-border-width")
                ? _actualXmlStyle["diagonaldown-border-width"]
                : string.Empty;

            if (string.IsNullOrEmpty(_actualValue))
            {
                if (!string.IsNullOrEmpty(InnerSurround.DownWidth.Value) && !"0".Equals(InnerSurround.DownWidth.Value))// výchozí hodnota
                {
                    xmlStyle.SetAttribute("diagonaldown-border-width", InnerSurround.DownWidth.Value.Replace(",", "."));
                    _newXmlStyle.Add("diagonaldown-border-width", InnerSurround.DownWidth.Value.Replace(",", "."));
                }
            }
            else if (!_actualValue.Equals(InnerSurround.DownWidth.Value.Replace(",", ".")))
            {
                xmlStyle.SetAttribute("diagonaldown-border-width", InnerSurround.DownWidth.Value.Replace(",", "."));
                _newXmlStyle.Add("diagonaldown-border-width", InnerSurround.DownWidth.Value.Replace(",", "."));
            }
            else
                _newXmlStyle.Add("diagonaldown-border-width", InnerSurround.DownWidth.Value.Replace(",", "."));
            #endregion

            #region diagonaldown-border-color
            _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("diagonaldown-border-color")
                ? _actualXmlStyle["diagonaldown-border-color"]
                : string.Empty;

            if (string.IsNullOrEmpty(_actualValue))
            {
                if (InnerSurround.DownFrameColor != null
                    && !InnerSurround.DownFrameColor.Equals(ColorService.ComplexBlack)
                    && !InnerSurround.DownFrameColor.Equals(ColorService.ComplexTransparent))
                {
                    xmlStyle.SetAttribute("diagonaldown-border-color", InnerSurround.DownFrameColor.Name);
                    _newXmlStyle.Add("diagonaldown-border-color", InnerSurround.DownFrameColor.Name);
                }
            }
            else if (!_actualValue.Equals(InnerSurround.DownFrameColor.Name))
            {
                xmlStyle.SetAttribute("diagonaldown-border-color", InnerSurround.DownFrameColor.Name);
                _newXmlStyle.Add("diagonaldown-border-color", InnerSurround.DownFrameColor.Name);
            }
            else
                _newXmlStyle.Add("diagonaldown-border-color", InnerSurround.DownFrameColor.Name);
            #endregion

            #region diagonaldown-border-style
            _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("diagonaldown-border-style")
                ? _actualXmlStyle["diagonaldown-border-style"]
                : string.Empty;

            if (string.IsNullOrEmpty(_actualValue))
            {
                if (InnerSurround.DownDashStyle.Value != ComplexDashStyle.Unspec && InnerSurround.DownDashStyle.Value != ComplexDashStyle.Solid)
                {
                    xmlStyle.SetAttribute("diagonaldown-border-style", ComplexDashStyle.ToEngName(InnerSurround.DownDashStyle.Value));
                    _newXmlStyle.Add("diagonaldown-border-style", ComplexDashStyle.ToEngName(InnerSurround.DownDashStyle.Value));
                }
            }
            else if (InnerSurround.DownDashStyle.Value != ComplexDashStyle.Unspec && !ComplexDashStyle.ToEngName(InnerSurround.DownDashStyle.Value).Equals(_actualValue))
            {
                xmlStyle.SetAttribute("diagonaldown-border-style", ComplexDashStyle.ToEngName(InnerSurround.DownDashStyle.Value));
                _newXmlStyle.Add("diagonaldown-border-style", ComplexDashStyle.ToEngName(InnerSurround.DownDashStyle.Value));
            }
            else
                _newXmlStyle.Add("diagonaldown-border-style", ComplexDashStyle.ToEngName(InnerSurround.DownDashStyle.Value));
            #endregion

            #region border-width
            _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("border-width")
                ? _actualXmlStyle["border-width"]
                : string.Empty;

            if (string.IsNullOrEmpty(_actualValue))
            {
                if (!string.IsNullOrEmpty(Surround.Width.AllValue) && !"0".Equals(Surround.Width.AllValue))// výchozí hodnota
                {
                    xmlStyle.SetAttribute("border-width", Surround.Width.AllValue.Replace(",", "."));
                    _newXmlStyle.Add("border-width", Surround.Width.AllValue.Replace(",", "."));
                }
                else
                {
                    #region left-border-width
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("left-border-width")
                        ? _actualXmlStyle["left-border-width"]
                        : string.Empty;

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        if (!string.IsNullOrEmpty(Surround.Width.LeftValue) && !"0".Equals(Surround.Width.LeftValue))//defaultní hodnota
                            xmlStyle.SetAttribute("left-border-width", Surround.Width.LeftValue.Replace(",", "."));
                    }
                    else if (_actualValue != Surround.Width.LeftValue.Replace(",", "."))
                        xmlStyle.SetAttribute("left-border-width", Surround.Width.LeftValue.Replace(",", "."));

                    _newXmlStyle.Add("left-border-width", Surround.Width.LeftValue.Replace(",", "."));
                    #endregion

                    #region right-border-width
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("right-border-width")
                        ? _actualXmlStyle["right-border-width"]
                        : string.Empty;

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        if (!string.IsNullOrEmpty(Surround.Width.RightValue) && !"0".Equals(Surround.Width.RightValue))//defaultní hodnota
                            xmlStyle.SetAttribute("right-border-width", Surround.Width.RightValue.Replace(",", "."));
                    }
                    else if (_actualValue != Surround.Width.RightValue.Replace(",", "."))
                        xmlStyle.SetAttribute("right-border-width", Surround.Width.RightValue.Replace(",", "."));

                    _newXmlStyle.Add("right-border-width", Surround.Width.RightValue.Replace(",", "."));
                    #endregion

                    #region top-border-width
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("top-border-width")
                        ? _actualXmlStyle["top-border-width"]
                        : string.Empty;

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        if (!string.IsNullOrEmpty(Surround.Width.TopValue) && !"0".Equals(Surround.Width.TopValue))//defaultní hodnota
                            xmlStyle.SetAttribute("top-border-width", Surround.Width.TopValue.Replace(",", "."));
                    }
                    else if (_actualValue != Surround.Width.TopValue.Replace(",", "."))
                        xmlStyle.SetAttribute("top-border-width", Surround.Width.TopValue.Replace(",", "."));

                    _newXmlStyle.Add("top-border-width", Surround.Width.TopValue.Replace(",", "."));
                    #endregion

                    #region bottom-border-width
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("bottom-border-width")
                        ? _actualXmlStyle["bottom-border-width"]
                        : string.Empty;

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        if (!string.IsNullOrEmpty(Surround.Width.BottomValue) && !"0".Equals(Surround.Width.BottomValue))//defaultní hodnota
                            xmlStyle.SetAttribute("bottom-border-width", Surround.Width.BottomValue.Replace(",", "."));
                    }
                    else if (_actualValue != Surround.Width.BottomValue.Replace(",", "."))
                        xmlStyle.SetAttribute("bottom-border-width", Surround.Width.BottomValue.Replace(",", "."));

                    _newXmlStyle.Add("bottom-border-width", Surround.Width.BottomValue.Replace(",", "."));
                    #endregion
                }
            }
            else if (string.IsNullOrEmpty(Surround.Width.AllValue))
            {
                #region left-border-width
                if (_actualValue != Surround.Width.LeftValue.Replace(",", "."))
                    xmlStyle.SetAttribute("left-border-width", Surround.Width.LeftValue.Replace(",", "."));

                _newXmlStyle.Add("left-border-width", Surround.Width.LeftValue.Replace(",", "."));
                #endregion

                #region right-border-width
                if (_actualValue != Surround.Width.RightValue.Replace(",", "."))
                    xmlStyle.SetAttribute("right-border-width", Surround.Width.RightValue.Replace(",", "."));

                _newXmlStyle.Add("right-border-width", Surround.Width.RightValue.Replace(",", "."));
                #endregion

                #region top-border-width
                if (_actualValue != Surround.Width.TopValue.Replace(",", "."))
                    xmlStyle.SetAttribute("top-border-width", Surround.Width.TopValue.Replace(",", "."));

                _newXmlStyle.Add("top-border-width", Surround.Width.TopValue.Replace(",", "."));
                #endregion

                #region bottom-border-width
                if (_actualValue != Surround.Width.BottomValue.Replace(",", "."))
                    xmlStyle.SetAttribute("bottom-border-width", Surround.Width.BottomValue.Replace(",", "."));

                _newXmlStyle.Add("bottom-border-width", Surround.Width.BottomValue.Replace(",", "."));
                #endregion
            }
            else if (Surround.Width.AllValue.Replace(",", ".") != _actualValue)
            {
                xmlStyle.SetAttribute("border-width", Surround.Width.AllValue.Replace(",", "."));
                _newXmlStyle.Add("border-width", Surround.Width.AllValue.Replace(",", "."));
            }
            else
                _newXmlStyle.Add("border-width", Surround.Width.AllValue.Replace(",", "."));
            #endregion

            #region border-color
            _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("border-color")
                ? _actualXmlStyle["border-color"]
                : string.Empty;

            if (string.IsNullOrEmpty(_actualValue))
            {
                if (Surround.FrameColor.AllValue != null
                    && !Surround.FrameColor.AllValue.Equals(ColorService.ComplexBlack)
                    && !Surround.FrameColor.AllValue.Equals(ColorService.ComplexTransparent))
                {
                    xmlStyle.SetAttribute("border-color", Surround.FrameColor.AllValue.Name);
                    _newXmlStyle.Add("border-color", Surround.FrameColor.AllValue.Name);
                }
                else
                {
                    //Všechny barvy zvlášť
                    #region left-border-color
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("left-border-color")
                        ? _actualXmlStyle["left-border-color"]
                        : string.Empty;

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        if (!Surround.FrameColor.LeftValue.Equals(ColorService.ComplexBlack)
                            && !Surround.FrameColor.LeftValue.Equals(ColorService.ComplexTransparent))
                            xmlStyle.SetAttribute("left-border-color", Surround.FrameColor.LeftValue.Name);
                    }
                    else if (_actualValue != Surround.FrameColor.LeftValue.Name)
                        xmlStyle.SetAttribute("left-border-color", Surround.FrameColor.LeftValue.Name);

                    _newXmlStyle.Add("left-border-color", Surround.FrameColor.LeftValue.Name);
                    #endregion

                    #region right-border-color
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("left-border-color")
                        ? _actualXmlStyle["left-border-color"]
                        : string.Empty;

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        if (!Surround.FrameColor.RightValue.Equals(ColorService.ComplexBlack)
                            && !Surround.FrameColor.RightValue.Equals(ColorService.ComplexTransparent))
                            xmlStyle.SetAttribute("right-border-color", Surround.FrameColor.RightValue.Name);
                    }
                    else if (_actualValue != Surround.FrameColor.RightValue.Name)
                        xmlStyle.SetAttribute("right-border-color", Surround.FrameColor.RightValue.Name);

                    _newXmlStyle.Add("right-border-color", Surround.FrameColor.RightValue.Name);
                    #endregion

                    #region top-border-color
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("top-border-color")
                        ? _actualXmlStyle["top-border-color"]
                        : string.Empty;

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        if (!Surround.FrameColor.TopValue.Equals(ColorService.ComplexBlack)
                            && !Surround.FrameColor.TopValue.Equals(ColorService.ComplexTransparent))
                            xmlStyle.SetAttribute("top-border-color", Surround.FrameColor.TopValue.Name);
                    }
                    else if (_actualValue != Surround.FrameColor.TopValue.Name)
                        xmlStyle.SetAttribute("top-border-color", Surround.FrameColor.TopValue.Name);

                    _newXmlStyle.Add("top-border-color", Surround.FrameColor.TopValue.Name);
                    #endregion

                    #region bottom-border-color
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("bottom-border-color")
                        ? _actualXmlStyle["bottom-border-color"]
                        : string.Empty;

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        if (!Surround.FrameColor.BottomValue.Equals(ColorService.ComplexBlack)
                            && !Surround.FrameColor.BottomValue.Equals(ColorService.ComplexTransparent))
                            xmlStyle.SetAttribute("bottom-border-color", Surround.FrameColor.BottomValue.Name);
                    }
                    else if (_actualValue != Surround.FrameColor.BottomValue.Name)
                        xmlStyle.SetAttribute("bottom-border-color", Surround.FrameColor.BottomValue.Name);

                    _newXmlStyle.Add("bottom-border-color", Surround.FrameColor.BottomValue.Name);
                    #endregion
                }
            }
            else if (string.IsNullOrEmpty(Surround.FrameColor.AllValue.Name))
            {
                #region left-border-color
                if (_actualValue != Surround.FrameColor.LeftValue.Name)
                    xmlStyle.SetAttribute("left-border-color", Surround.FrameColor.LeftValue.Name);

                _newXmlStyle.Add("left-border-color", Surround.FrameColor.LeftValue.Name);
                #endregion

                #region right-border-color
                if (_actualValue != Surround.FrameColor.RightValue.Name)
                    xmlStyle.SetAttribute("right-border-color", Surround.FrameColor.RightValue.Name);

                _newXmlStyle.Add("right-border-color", Surround.FrameColor.RightValue.Name);
                #endregion

                #region top-border-color
                if (_actualValue != Surround.FrameColor.TopValue.Name)
                    xmlStyle.SetAttribute("top-border-color", Surround.FrameColor.TopValue.Name);

                _newXmlStyle.Add("top-border-color", Surround.FrameColor.TopValue.Name);
                #endregion

                #region bottom-border-color
                if (_actualValue != Surround.FrameColor.BottomValue.Name)
                    xmlStyle.SetAttribute("bottom-border-color", Surround.FrameColor.BottomValue.Name);

                _newXmlStyle.Add("bottom-border-color", Surround.FrameColor.BottomValue.Name);
                #endregion
            }
            else if (Surround.FrameColor.AllValue.Name != _actualValue)
            {
                xmlStyle.SetAttribute("border-color", Surround.FrameColor.AllValue.Name);
                _newXmlStyle.Add("border-color", Surround.FrameColor.AllValue.Name);
            }
            else
                _newXmlStyle.Add("border-color", Surround.FrameColor.AllValue.Name);
            #endregion

            #region border-style
            _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("border-style")
                ? _actualXmlStyle["border-style"]
                : string.Empty;

            if (string.IsNullOrEmpty(_actualValue))
            {
                if (Surround.DashStyle.AllValue != ComplexDashStyle.Unspec && Surround.DashStyle.AllValue != ComplexDashStyle.Solid)
                {
                    xmlStyle.SetAttribute("border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.AllValue));
                    _newXmlStyle.Add("border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.AllValue));
                }
                else
                {
                    //Všechny styly jsou různé
                    #region left-border-style
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("left-border-style")
                        ? _actualXmlStyle["left-border-style"]
                        : string.Empty;

                    if (Surround.DashStyle.LeftValue != ComplexDashStyle.Unspec)
                    {
                        if (string.IsNullOrEmpty(_actualValue))
                        {
                            if (Surround.DashStyle.LeftValue != ComplexDashStyle.Solid)
                                xmlStyle.SetAttribute("left-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.LeftValue));
                        }
                        else if (_actualValue != ComplexDashStyle.ToEngName(Surround.DashStyle.LeftValue))
                            xmlStyle.SetAttribute("left-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.LeftValue));
                    }
                    _newXmlStyle.Add("left-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.LeftValue));
                    #endregion

                    #region right-border-style
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("right-border-style")
                        ? _actualXmlStyle["right-border-style"]
                        : string.Empty;

                    if (Surround.DashStyle.RightValue != ComplexDashStyle.Unspec)
                    {
                        if (string.IsNullOrEmpty(_actualValue))
                        {
                            if (Surround.DashStyle.RightValue != ComplexDashStyle.Solid)
                                xmlStyle.SetAttribute("right-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.RightValue));
                        }
                        else if (_actualValue != ComplexDashStyle.ToEngName(Surround.DashStyle.RightValue))
                            xmlStyle.SetAttribute("right-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.RightValue));
                    }

                    _newXmlStyle.Add("right-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.RightValue));
                    #endregion

                    #region top-border-style
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("top-border-style")
                        ? _actualXmlStyle["top-border-style"]
                        : string.Empty;

                    if (Surround.DashStyle.TopValue != ComplexDashStyle.Unspec)
                    {
                        if (string.IsNullOrEmpty(_actualValue))
                        {
                            if (Surround.DashStyle.TopValue != ComplexDashStyle.Solid)
                                xmlStyle.SetAttribute("top-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.TopValue));
                        }
                        else if (_actualValue != ComplexDashStyle.ToEngName(Surround.DashStyle.TopValue))
                            xmlStyle.SetAttribute("top-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.TopValue));
                    }

                    _newXmlStyle.Add("top-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.TopValue));
                    #endregion

                    #region bottom-border-style
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("bottom-border-style")
                        ? _actualXmlStyle["bottom-border-style"]
                        : string.Empty;

                    if (Surround.DashStyle.BottomValue != ComplexDashStyle.Unspec)
                    {
                        if (string.IsNullOrEmpty(_actualValue))
                        {
                            if (Surround.DashStyle.BottomValue != ComplexDashStyle.Solid)
                                xmlStyle.SetAttribute("bottom-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.BottomValue));
                        }
                        else if (_actualValue != ComplexDashStyle.ToEngName(Surround.DashStyle.BottomValue))
                            xmlStyle.SetAttribute("bottom-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.BottomValue));
                    }

                    _newXmlStyle.Add("bottom-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.BottomValue));
                    #endregion
                }
            }
            else if (Surround.DashStyle.AllValue == ComplexDashStyle.Unspec)
            {
                #region left-border-style
                if (_actualValue != ComplexDashStyle.ToEngName(Surround.DashStyle.LeftValue)
                    && Surround.DashStyle.LeftValue != ComplexDashStyle.Unspec)
                    xmlStyle.SetAttribute("left-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.LeftValue));

                _newXmlStyle.Add("left-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.LeftValue));
                #endregion

                #region right-border-style
                if (_actualValue != ComplexDashStyle.ToEngName(Surround.DashStyle.RightValue)
                    && Surround.DashStyle.RightValue != ComplexDashStyle.Unspec)
                    xmlStyle.SetAttribute("right-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.RightValue));

                _newXmlStyle.Add("right-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.RightValue));
                #endregion

                #region top-border-style
                if (_actualValue != ComplexDashStyle.ToEngName(Surround.DashStyle.TopValue)
                    && Surround.DashStyle.TopValue != ComplexDashStyle.Unspec)
                    xmlStyle.SetAttribute("top-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.TopValue));

                _newXmlStyle.Add("top-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.TopValue));
                #endregion

                #region bottom-border-style
                if (_actualValue != ComplexDashStyle.ToEngName(Surround.DashStyle.BottomValue)
                    && Surround.DashStyle.BottomValue != ComplexDashStyle.Unspec)
                    xmlStyle.SetAttribute("bottom-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.BottomValue));

                _newXmlStyle.Add("bottom-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.BottomValue));
                #endregion
            }
            else if (Surround.DashStyle.AllValue != ComplexDashStyle.Unspec && !ComplexDashStyle.ToEngName(Surround.DashStyle.AllValue).Equals(_actualValue))
            {
                xmlStyle.SetAttribute("border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.AllValue));
                _newXmlStyle.Add("border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.AllValue));
            }
            else
                _newXmlStyle.Add("border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.AllValue));
            #endregion

            #region spacing
            _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("spacing")
                ? _actualXmlStyle["spacing"]
                : string.Empty;

            if (string.IsNullOrEmpty(_actualValue))
            {
                if (!string.IsNullOrEmpty(Spacing.AllValue) && !"0".Equals(Spacing.AllValue))
                {
                    xmlStyle.SetAttribute("spacing", Spacing.AllValue);
                    _newXmlStyle.Add("spacing", Spacing.AllValue);
                }
                else
                {
                    #region left-spacing
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("left-spacing")
                        ? _actualXmlStyle["left-spacing"]
                        : string.Empty;

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        if (!string.IsNullOrEmpty(Spacing.LeftValue) && !"0".Equals(Spacing.LeftValue))
                            xmlStyle.SetAttribute("left-spacing", Spacing.LeftValue);
                    }
                    else if (_actualValue != Spacing.LeftValue)
                        xmlStyle.SetAttribute("left-spacing", Spacing.LeftValue);

                    _newXmlStyle.Add("left-spacing", Spacing.LeftValue);
                    #endregion

                    #region right-spacing
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("right-spacing")
                        ? _actualXmlStyle["right-spacing"]
                        : string.Empty;

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        if (!string.IsNullOrEmpty(Spacing.RightValue) && !"0".Equals(Spacing.RightValue))
                            xmlStyle.SetAttribute("right-spacing", Spacing.RightValue);
                    }
                    else if (_actualValue != Spacing.RightValue)
                        xmlStyle.SetAttribute("right-spacing", Spacing.RightValue);

                    _newXmlStyle.Add("right-spacing", Spacing.RightValue);
                    #endregion

                    #region top-spacing
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("top-spacing")
                        ? _actualXmlStyle["top-spacing"]
                        : string.Empty;

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        if (!string.IsNullOrEmpty(Spacing.TopValue) && !"0".Equals(Spacing.TopValue))
                            xmlStyle.SetAttribute("top-spacing", Spacing.TopValue);
                    }
                    else if (_actualValue != Spacing.TopValue)
                        xmlStyle.SetAttribute("top-spacing", Spacing.TopValue);

                    _newXmlStyle.Add("top-spacing", Spacing.TopValue);
                    #endregion

                    #region bottom-spacing
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("bottom-spacing")
                        ? _actualXmlStyle["bottom-spacing"]
                        : string.Empty;

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        if (!string.IsNullOrEmpty(Spacing.BottomValue) && !"0".Equals(Spacing.BottomValue))
                            xmlStyle.SetAttribute("bottom-spacing", Spacing.BottomValue);
                    }
                    else if (_actualValue != Spacing.BottomValue)
                        xmlStyle.SetAttribute("bottom-spacing", Spacing.BottomValue);

                    _newXmlStyle.Add("bottom-spacing", Spacing.BottomValue);
                    #endregion
                }
            }
            else if (string.IsNullOrEmpty(Spacing.AllValue))
            {
                #region left-spacing
                if (_actualValue != Spacing.LeftValue)
                    xmlStyle.SetAttribute("left-spacing", Spacing.LeftValue);

                _newXmlStyle.Add("left-spacing", Spacing.LeftValue);
                #endregion

                #region right-spacing
                if (_actualValue != Spacing.RightValue)
                    xmlStyle.SetAttribute("right-spacing", Spacing.RightValue);

                _newXmlStyle.Add("right-spacing", Spacing.RightValue);
                #endregion

                #region top-spacing
                if (_actualValue != Spacing.TopValue)
                    xmlStyle.SetAttribute("top-spacing", Spacing.TopValue);

                _newXmlStyle.Add("top-spacing", Spacing.TopValue);
                #endregion

                #region bottom-spacing
                if (_actualValue != Spacing.BottomValue)
                    xmlStyle.SetAttribute("bottom-spacing", Spacing.BottomValue);

                _newXmlStyle.Add("bottom-spacing", Spacing.BottomValue);
                #endregion
            }
            else if (Spacing.AllValue != _actualValue)
            {
                xmlStyle.SetAttribute("spacing", Spacing.AllValue);
                _newXmlStyle.Add("spacing", Spacing.AllValue);
            }
            else
                _newXmlStyle.Add("spacing", Spacing.AllValue);
            #endregion

            #region padding
            _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("padding")
                ? _actualXmlStyle["padding"]
                : string.Empty;

            if (string.IsNullOrEmpty(_actualValue))
            {
                if (!string.IsNullOrEmpty(Padding.AllValue) && !"5".Equals(Padding.AllValue))
                {
                    xmlStyle.SetAttribute("padding", Padding.AllValue);
                    _newXmlStyle.Add("padding", Padding.AllValue);
                }
                else
                {
                    #region left-padding
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("left-padding")
                        ? _actualXmlStyle["left-padding"]
                        : string.Empty;

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        if (!string.IsNullOrEmpty(Padding.LeftValue) && !"5".Equals(Padding.LeftValue))
                            xmlStyle.SetAttribute("left-padding", Padding.LeftValue);
                    }
                    else if (_actualValue != Padding.LeftValue)
                        xmlStyle.SetAttribute("left-padding", Padding.LeftValue);

                    _newXmlStyle.Add("left-padding", Padding.LeftValue);
                    #endregion

                    #region right-padding
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("right-padding")
                        ? _actualXmlStyle["right-padding"]
                        : string.Empty;

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        if (!string.IsNullOrEmpty(Padding.RightValue) && !"5".Equals(Padding.RightValue))
                            xmlStyle.SetAttribute("right-padding", Padding.RightValue);
                    }
                    else if (_actualValue != Padding.RightValue)
                        xmlStyle.SetAttribute("right-padding", Padding.RightValue);

                    _newXmlStyle.Add("right-padding", Padding.RightValue);
                    #endregion

                    #region top-padding
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("top-padding")
                        ? _actualXmlStyle["top-padding"]
                        : string.Empty;

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        if (!string.IsNullOrEmpty(Padding.TopValue) && !"5".Equals(Padding.TopValue))
                            xmlStyle.SetAttribute("top-padding", Padding.TopValue);
                    }
                    else if (_actualValue != Padding.TopValue)
                        xmlStyle.SetAttribute("top-padding", Padding.TopValue);

                    _newXmlStyle.Add("top-padding", Padding.TopValue);
                    #endregion

                    #region bottom-padding
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("bottom-padding")
                        ? _actualXmlStyle["bottom-padding"]
                        : string.Empty;

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        if (!string.IsNullOrEmpty(Padding.BottomValue) && !"5".Equals(Padding.BottomValue))
                            xmlStyle.SetAttribute("bottom-padding", Padding.BottomValue);
                    }
                    else if (_actualValue != Padding.BottomValue)
                        xmlStyle.SetAttribute("bottom-padding", Padding.BottomValue);

                    _newXmlStyle.Add("bottom-padding", Padding.BottomValue);
                    #endregion
                }
            }
            else if (string.IsNullOrEmpty(Padding.AllValue))
            {
                #region left-padding
                if (_actualValue != Padding.LeftValue)
                    xmlStyle.SetAttribute("left-padding", Padding.LeftValue);

                _newXmlStyle.Add("left-padding", Padding.LeftValue);
                #endregion

                #region right-padding
                if (_actualValue != Padding.RightValue)
                    xmlStyle.SetAttribute("right-padding", Padding.RightValue);

                _newXmlStyle.Add("right-padding", Padding.RightValue);
                #endregion

                #region top-padding
                if (_actualValue != Padding.TopValue)
                    xmlStyle.SetAttribute("top-padding", Padding.TopValue);

                _newXmlStyle.Add("top-padding", Padding.TopValue);
                #endregion

                #region bottom-padding
                if (_actualValue != Padding.BottomValue)
                    xmlStyle.SetAttribute("bottom-padding", Padding.BottomValue);

                _newXmlStyle.Add("bottom-padding", Padding.BottomValue);
                #endregion
            }
            else if (Padding.AllValue != _actualValue)
            {
                xmlStyle.SetAttribute("padding", Padding.AllValue);
                _newXmlStyle.Add("padding", Padding.AllValue);
            }
            else
                _newXmlStyle.Add("padding", Padding.AllValue);
            #endregion

            #region inside-border
            _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("inside-border")
                ? _actualXmlStyle["inside-border"]
                : string.Empty;

            if (string.IsNullOrEmpty(_actualValue))
            {
                if (Surround.InsideBorder)
                    xmlStyle.SetAttribute("inside-border", "true");
            }
            else if (_actualValue != (Surround.InsideBorder ? "true" : "false"))
                xmlStyle.SetAttribute("inside-border", (Surround.InsideBorder ? "true" : "false"));

            _newXmlStyle.Add("inside-border", (Surround.InsideBorder ? "true" : "false"));
            #endregion

            #region radius-border
            _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("radius-border")
                ? _actualXmlStyle["radius-border"]
                : string.Empty;

            if (string.IsNullOrEmpty(_actualValue))
            {
                if (Surround.Radius != 0)
                    xmlStyle.SetAttribute("radius-border", Surround.Radius.ToString());
            }
            else if (_actualValue != Surround.Radius.ToString())
                xmlStyle.SetAttribute("radius-border", Surround.Radius.ToString());

            _newXmlStyle.Add("radius-border", Surround.Radius.ToString());
            #endregion

            #region corners-border
            _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("corners-border")
                ? _actualXmlStyle["corners-border"]
                : string.Empty;

            if (string.IsNullOrEmpty(_actualValue))
            {
                if (Surround.Corners != ComplexSurroundCorners.None)
                    xmlStyle.SetAttribute("corners-border", ((int)Surround.Corners).ToString());
            }
            else if (_actualValue != ((int)Surround.Corners).ToString())
                xmlStyle.SetAttribute("corners-border", ((int)Surround.Corners).ToString());

            _newXmlStyle.Add("corners-border", ((int)Surround.Corners).ToString());
            #endregion

            // přidáme do zásobníku nový styl
            xmlStyles.Add(_newXmlStyle);

            // uložení samotné komponenty
            XmlLinkedNode xmlComponent = GetDataComponent(xmlDoc, withRect: withRect, styles: xmlStyles, regionFullName: regionFullName);

            if (xmlComponent != null)
            {
                if (xmlComponent is XmlElement element)
                {
                    SetXmlAttribute(element);
                    if (IsSelected)
                        xmlComponent = new XmlElementSelected(element).Initialize(this);
                }
                xmlStyle.AppendChild(xmlComponent);
            }
            //Vymažeme ze zásobníku poslední styl
            xmlStyles.Remove(_newXmlStyle);

            return xmlStyle;
        }

        /// <exclude/>
        public void SetXmlAttribute(XmlElement xmlElement)
        {
            if (xmlElement != null && PropertyOrder > 0)
                xmlElement.SetAttribute("order", PropertyOrder.ToString());
        }

        /// <summary>
        /// uložení obsahu řádku do <paramref name="xmlElement"/>
        /// </summary>
        /// <param name="xmlElement">daný XML element, do kterého se vkládá obsah</param>
        /// <param name="xmlDoc">výsledný dokument</param>
        /// <param name="xmlStyles">seznam již dostupných stylů</param>
        /// <param name="withRect"></param>
        public void SetXmlData(XmlElement xmlElement, XmlDocumentPosition xmlDoc, List<GFEList> xmlStyles, bool withRect = true)
        {
            GFEList _actualXmlStyle = new GFEList(), _newXmlStyle = new GFEList();
            //Pokud v zásobníku existuje styl, pak zafixujeme poslední
            if (xmlStyles.Count != 0)
                _actualXmlStyle = xmlStyles.Last();

            XmlElement xmlStyle = xmlDoc.CreateElement("style", xmlElement.NamespaceURI);

            if (FormatTag is GFEFormatContent content && content.Style != null)
                content.Style.Attributes.ForEach(attr => xmlStyle.SetAttribute(attr.Key, attr.Value));

            OnSettingData(xmlStyle, ref _actualXmlStyle, ref _newXmlStyle);

            dynamic _actualValue;
            #region diagonalup-border-width
            _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("diagonalup-border-width")
                ? _actualXmlStyle["diagonalup-border-width"]
                : string.Empty;

            if (string.IsNullOrEmpty(_actualValue))
            {
                if (!string.IsNullOrEmpty(InnerSurround.UpWidth.Value) && !"0".Equals(InnerSurround.UpWidth.Value))// výchozí hodnota
                {
                    xmlStyle.SetAttribute("diagonalup-border-width", InnerSurround.UpWidth.Value.Replace(",", "."));
                    _newXmlStyle.Add("diagonalup-border-width", InnerSurround.UpWidth.Value.Replace(",", "."));
                }
            }
            else if (InnerSurround.UpWidth.Value.Replace(",", ".") != _actualValue)
            {
                xmlStyle.SetAttribute("diagonalup-border-width", InnerSurround.UpWidth.Value.Replace(",", "."));
                _newXmlStyle.Add("diagonalup-border-width", InnerSurround.UpWidth.Value.Replace(",", "."));
            }
            else
                _newXmlStyle.Add("diagonalup-border-width", InnerSurround.UpWidth.Value.Replace(",", "."));
            #endregion

            #region diagonaldown-border-width
            _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("diagonaldown-border-width")
                ? _actualXmlStyle["diagonaldown-border-width"]
                : string.Empty;

            if (string.IsNullOrEmpty(_actualValue))
            {
                if (!string.IsNullOrEmpty(InnerSurround.DownWidth.Value) && !"0".Equals(InnerSurround.DownWidth.Value))// výchozí hodnota
                {
                    xmlStyle.SetAttribute("diagonaldown-border-width", InnerSurround.DownWidth.Value.Replace(",", "."));
                    _newXmlStyle.Add("diagonaldown-border-width", InnerSurround.DownWidth.Value.Replace(",", "."));
                }
            }
            else if (InnerSurround.DownWidth.Value.Replace(",", ".") != _actualValue)
            {
                xmlStyle.SetAttribute("diagonaldown-border-width", InnerSurround.DownWidth.Value.Replace(",", "."));
                _newXmlStyle.Add("diagonaldown-border-width", InnerSurround.DownWidth.Value.Replace(",", "."));
            }
            else
                _newXmlStyle.Add("diagonaldown-border-width", InnerSurround.DownWidth.Value.Replace(",", "."));
            #endregion

            #region border-width
            _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("border-width")
                ? _actualXmlStyle["border-width"]
                : string.Empty;

            if (string.IsNullOrEmpty(_actualValue))
            {
                if (!string.IsNullOrEmpty(Surround.Width.AllValue) && !"0".Equals(Surround.Width.AllValue))//defaultní hodnota
                {
                    xmlStyle.SetAttribute("border-width", Surround.Width.AllValue.Replace(",", "."));
                    _newXmlStyle.Add("border-width", Surround.Width.AllValue.Replace(",", "."));
                }
                else
                {
                    #region left-border-width
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("left-border-width")
                        ? _actualXmlStyle["left-border-width"]
                        : string.Empty;

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        if (!string.IsNullOrEmpty(Surround.Width.LeftValue) && !"0".Equals(Surround.Width.LeftValue))//defaultní hodnota
                            xmlStyle.SetAttribute("left-border-width", Surround.Width.LeftValue.Replace(",", "."));
                    }
                    else if (_actualValue != Surround.Width.LeftValue.Replace(",", "."))
                        xmlStyle.SetAttribute("left-border-width", Surround.Width.LeftValue.Replace(",", "."));

                    _newXmlStyle.Add("left-border-width", Surround.Width.LeftValue.Replace(",", "."));
                    #endregion

                    #region right-border-width
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("right-border-width")
                        ? _actualXmlStyle["right-border-width"]
                        : string.Empty;

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        if (!string.IsNullOrEmpty(Surround.Width.RightValue) && !"0".Equals(Surround.Width.RightValue))//defaultní hodnota
                            xmlStyle.SetAttribute("right-border-width", Surround.Width.RightValue.Replace(",", "."));
                    }
                    else if (_actualValue != Surround.Width.RightValue.Replace(",", "."))
                        xmlStyle.SetAttribute("right-border-width", Surround.Width.RightValue.Replace(",", "."));

                    _newXmlStyle.Add("right-border-width", Surround.Width.RightValue.Replace(",", "."));
                    #endregion

                    #region top-border-width
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("top-border-width")
                        ? _actualXmlStyle["top-border-width"]
                        : string.Empty;

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        if (!string.IsNullOrEmpty(Surround.Width.TopValue) && !"0".Equals(Surround.Width.TopValue))//defaultní hodnota
                            xmlStyle.SetAttribute("top-border-width", Surround.Width.TopValue.Replace(",", "."));
                    }
                    else if (_actualValue != Surround.Width.TopValue.Replace(",", "."))
                        xmlStyle.SetAttribute("top-border-width", Surround.Width.TopValue.Replace(",", "."));

                    _newXmlStyle.Add("top-border-width", Surround.Width.TopValue.Replace(",", "."));
                    #endregion

                    #region bottom-border-width
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("bottom-border-width")
                        ? _actualXmlStyle["bottom-border-width"]
                        : string.Empty;

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        if (!string.IsNullOrEmpty(Surround.Width.BottomValue) && !"0".Equals(Surround.Width.BottomValue))//defaultní hodnota
                            xmlStyle.SetAttribute("bottom-border-width", Surround.Width.BottomValue.Replace(",", "."));
                    }
                    else if (_actualValue != Surround.Width.BottomValue.Replace(",", "."))
                        xmlStyle.SetAttribute("bottom-border-width", Surround.Width.BottomValue.Replace(",", "."));

                    _newXmlStyle.Add("bottom-border-width", Surround.Width.BottomValue.Replace(",", "."));
                    #endregion
                }
            }
            else if (string.IsNullOrEmpty(Surround.Width.AllValue))
            {
                #region left-border-width
                if (_actualValue != Surround.Width.LeftValue.Replace(",", "."))
                    xmlStyle.SetAttribute("left-border-width", Surround.Width.LeftValue.Replace(",", "."));

                _newXmlStyle.Add("left-border-width", Surround.Width.LeftValue.Replace(",", "."));
                #endregion

                #region right-border-width
                if (_actualValue != Surround.Width.RightValue.Replace(",", "."))
                    xmlStyle.SetAttribute("right-border-width", Surround.Width.RightValue.Replace(",", "."));

                _newXmlStyle.Add("right-border-width", Surround.Width.RightValue.Replace(",", "."));
                #endregion

                #region top-border-width
                if (_actualValue != Surround.Width.TopValue.Replace(",", "."))
                    xmlStyle.SetAttribute("top-border-width", Surround.Width.TopValue.Replace(",", "."));

                _newXmlStyle.Add("top-border-width", Surround.Width.TopValue.Replace(",", "."));
                #endregion

                #region bottom-border-width
                if (_actualValue != Surround.Width.BottomValue.Replace(",", "."))
                    xmlStyle.SetAttribute("bottom-border-width", Surround.Width.BottomValue.Replace(",", "."));

                _newXmlStyle.Add("bottom-border-width", Surround.Width.BottomValue.Replace(",", "."));
                #endregion
            }
            else if (Surround.Width.AllValue.Replace(",", ".") != _actualValue)
            {
                xmlStyle.SetAttribute("border-width", Surround.Width.AllValue.Replace(",", "."));
                _newXmlStyle.Add("border-width", Surround.Width.AllValue.Replace(",", "."));
            }
            else
                _newXmlStyle.Add("border-width", Surround.Width.AllValue.Replace(",", "."));

            #endregion

            #region border-color
            _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("border-color")
                ? _actualXmlStyle["border-color"]
                : string.Empty;

            if (string.IsNullOrEmpty(_actualValue))
            {
                if (Surround.FrameColor.AllValue != null
                    && !Surround.FrameColor.AllValue.Equals(ColorService.ComplexBlack)
                    && !Surround.FrameColor.AllValue.Equals(ColorService.ComplexTransparent))
                {
                    xmlStyle.SetAttribute("border-color", Surround.FrameColor.AllValue.Name);
                    _newXmlStyle.Add("border-color", Surround.FrameColor.AllValue.Name);
                }
                else
                {
                    //Všechny barvy zvlášť
                    #region left-border-color
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("left-border-color")
                        ? _actualXmlStyle["left-border-color"]
                        : string.Empty;

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        if (!Surround.FrameColor.LeftValue.Equals(ColorService.ComplexBlack)
                            && !Surround.FrameColor.LeftValue.Equals(ColorService.ComplexTransparent))
                            xmlStyle.SetAttribute("left-border-color", Surround.FrameColor.LeftValue.Name);
                    }
                    else if (_actualValue != Surround.FrameColor.LeftValue.Name)
                        xmlStyle.SetAttribute("left-border-color", Surround.FrameColor.LeftValue.Name);

                    _newXmlStyle.Add("left-border-color", Surround.FrameColor.LeftValue.Name);
                    #endregion

                    #region right-border-color
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("right-border-color")
                        ? _actualXmlStyle["right-border-color"]
                        : string.Empty;

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        if (!Surround.FrameColor.RightValue.Equals(ColorService.ComplexBlack)
                            && !Surround.FrameColor.RightValue.Equals(ColorService.ComplexTransparent))
                            xmlStyle.SetAttribute("right-border-color", Surround.FrameColor.RightValue.Name);
                    }
                    else if (_actualValue != Surround.FrameColor.RightValue.Name)
                        xmlStyle.SetAttribute("right-border-color", Surround.FrameColor.RightValue.Name);

                    _newXmlStyle.Add("right-border-color", Surround.FrameColor.RightValue.Name);
                    #endregion

                    #region top-border-color
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("top-border-color")
                        ? _actualXmlStyle["top-border-color"]
                        : string.Empty;

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        if (!Surround.FrameColor.TopValue.Equals(ColorService.ComplexBlack)
                            && !Surround.FrameColor.TopValue.Equals(ColorService.ComplexTransparent))
                            xmlStyle.SetAttribute("top-border-color", Surround.FrameColor.TopValue.Name);
                    }
                    else if (_actualValue != Surround.FrameColor.TopValue.Name)
                        xmlStyle.SetAttribute("top-border-color", Surround.FrameColor.TopValue.Name);

                    _newXmlStyle.Add("top-border-color", Surround.FrameColor.TopValue.Name);
                    #endregion

                    #region bottom-border-color
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("bottom-border-color")
                        ? _actualXmlStyle["bottom-border-color"]
                        : string.Empty;

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        if (!Surround.FrameColor.BottomValue.Equals(ColorService.ComplexBlack)
                            && !Surround.FrameColor.BottomValue.Equals(ColorService.ComplexTransparent))
                            xmlStyle.SetAttribute("bottom-border-color", Surround.FrameColor.BottomValue.Name);
                    }
                    else if (_actualValue != Surround.FrameColor.BottomValue.Name)
                        xmlStyle.SetAttribute("bottom-border-color", Surround.FrameColor.BottomValue.Name);

                    _newXmlStyle.Add("bottom-border-color", Surround.FrameColor.BottomValue.Name);
                    #endregion
                }
            }
            else if (string.IsNullOrEmpty(Surround.FrameColor.AllValue.Name))
            {
                #region left-border-color
                if (_actualValue != Surround.FrameColor.LeftValue.Name)
                    xmlStyle.SetAttribute("left-border-color", Surround.FrameColor.LeftValue.Name);

                _newXmlStyle.Add("left-border-color", Surround.FrameColor.LeftValue.Name);
                #endregion

                #region right-border-color
                if (_actualValue != Surround.FrameColor.RightValue.Name)
                    xmlStyle.SetAttribute("right-border-color", Surround.FrameColor.RightValue.Name);

                _newXmlStyle.Add("right-border-color", Surround.FrameColor.RightValue.Name);
                #endregion

                #region top-border-color
                if (_actualValue != Surround.FrameColor.TopValue.Name)
                    xmlStyle.SetAttribute("top-border-color", Surround.FrameColor.TopValue.Name);

                _newXmlStyle.Add("top-border-color", Surround.FrameColor.TopValue.Name);
                #endregion

                #region bottom-border-color
                if (_actualValue != Surround.FrameColor.BottomValue.Name)
                    xmlStyle.SetAttribute("bottom-border-color", Surround.FrameColor.BottomValue.Name);

                _newXmlStyle.Add("bottom-border-color", Surround.FrameColor.BottomValue.Name);
                #endregion
            }
            else if (Surround.FrameColor.AllValue.Name != _actualValue)
            {
                xmlStyle.SetAttribute("border-color", Surround.FrameColor.AllValue.Name);
                _newXmlStyle.Add("border-color", Surround.FrameColor.AllValue.Name);
            }
            else
                _newXmlStyle.Add("border-color", Surround.FrameColor.AllValue.Name);

            #endregion

            #region border-style
            _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("border-style")
                ? _actualXmlStyle["border-style"]
                : string.Empty;

            if (string.IsNullOrEmpty(_actualValue))
            {
                if (Surround.DashStyle.AllValue != ComplexDashStyle.Unspec
                    && Surround.DashStyle.AllValue != ComplexDashStyle.Solid)
                {
                    xmlStyle.SetAttribute("border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.AllValue));
                    _newXmlStyle.Add("border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.AllValue));
                }
                else
                {
                    //Všechny styly jsou různé
                    #region left-border-style
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("left-border-style")
                        ? _actualXmlStyle["left-border-style"]
                        : string.Empty;

                    if (Surround.DashStyle.LeftValue != ComplexDashStyle.Unspec)
                    {
                        if (string.IsNullOrEmpty(_actualValue))
                        {
                            if (Surround.DashStyle.LeftValue != ComplexDashStyle.Solid)
                                xmlStyle.SetAttribute("left-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.LeftValue));
                        }
                        else if (_actualValue != ComplexDashStyle.ToEngName(Surround.DashStyle.LeftValue))
                            xmlStyle.SetAttribute("left-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.LeftValue));
                    }
                    _newXmlStyle.Add("left-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.LeftValue));
                    #endregion

                    #region right-border-style
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("right-border-style")
                        ? _actualXmlStyle["right-border-style"]
                        : string.Empty;

                    if (Surround.DashStyle.RightValue != ComplexDashStyle.Unspec)
                    {
                        if (string.IsNullOrEmpty(_actualValue))
                        {
                            if (Surround.DashStyle.RightValue != ComplexDashStyle.Solid)
                                xmlStyle.SetAttribute("right-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.RightValue));
                        }
                        else if (_actualValue != ComplexDashStyle.ToEngName(Surround.DashStyle.RightValue))
                            xmlStyle.SetAttribute("right-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.RightValue));
                    }
                    _newXmlStyle.Add("right-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.RightValue));
                    #endregion

                    #region top-border-style
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("top-border-style")
                        ? _actualXmlStyle["top-border-style"]
                        : string.Empty;

                    if (Surround.DashStyle.TopValue != ComplexDashStyle.Unspec)
                    {
                        if (string.IsNullOrEmpty(_actualValue))
                        {
                            if (Surround.DashStyle.TopValue != ComplexDashStyle.Solid)
                                xmlStyle.SetAttribute("top-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.TopValue));
                        }
                        else if (_actualValue != ComplexDashStyle.ToEngName(Surround.DashStyle.TopValue))
                            xmlStyle.SetAttribute("top-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.TopValue));
                    }

                    _newXmlStyle.Add("top-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.TopValue));
                    #endregion

                    #region bottom-border-style
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("bottom-border-style")
                        ? _actualXmlStyle["bottom-border-style"]
                        : string.Empty;

                    if (Surround.DashStyle.BottomValue != ComplexDashStyle.Unspec)
                    {
                        if (string.IsNullOrEmpty(_actualValue))
                        {
                            if (Surround.DashStyle.BottomValue != ComplexDashStyle.Solid)
                                xmlStyle.SetAttribute("bottom-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.BottomValue));
                        }
                        else if (_actualValue != ComplexDashStyle.ToEngName(Surround.DashStyle.BottomValue))
                            xmlStyle.SetAttribute("bottom-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.BottomValue));
                    }

                    _newXmlStyle.Add("bottom-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.BottomValue));
                    #endregion
                }
            }
            else if (Surround.DashStyle.AllValue == ComplexDashStyle.Unspec)
            {
                #region left-border-style
                if (_actualValue != ComplexDashStyle.ToEngName(Surround.DashStyle.LeftValue)
                    && Surround.DashStyle.LeftValue != ComplexDashStyle.Unspec)
                    xmlStyle.SetAttribute("left-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.LeftValue));

                _newXmlStyle.Add("left-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.LeftValue));
                #endregion

                #region right-border-style
                if (_actualValue != ComplexDashStyle.ToEngName(Surround.DashStyle.RightValue)
                    && Surround.DashStyle.RightValue != ComplexDashStyle.Unspec)
                    xmlStyle.SetAttribute("right-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.RightValue));

                _newXmlStyle.Add("right-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.RightValue));
                #endregion

                #region top-border-style
                if (_actualValue != ComplexDashStyle.ToEngName(Surround.DashStyle.TopValue)
                    && Surround.DashStyle.TopValue != ComplexDashStyle.Unspec)
                    xmlStyle.SetAttribute("top-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.TopValue));

                _newXmlStyle.Add("top-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.TopValue));
                #endregion

                #region bottom-border-style
                if (_actualValue != ComplexDashStyle.ToEngName(Surround.DashStyle.BottomValue)
                    && Surround.DashStyle.BottomValue != ComplexDashStyle.Unspec)
                    xmlStyle.SetAttribute("bottom-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.BottomValue));

                _newXmlStyle.Add("bottom-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.BottomValue));
                #endregion
            }
            else if (ComplexDashStyle.ToEngName(Surround.DashStyle.AllValue) != _actualValue && Surround.DashStyle.AllValue != ComplexDashStyle.Unspec)
            {
                xmlStyle.SetAttribute("border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.AllValue));
                _newXmlStyle.Add("border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.AllValue));
            }
            else
                _newXmlStyle.Add("border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.AllValue));
            #endregion

            #region spacing
            _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("spacing")
                ? _actualXmlStyle["spacing"]
                : string.Empty;

            if (string.IsNullOrEmpty(_actualValue))
            {
                if (!string.IsNullOrEmpty(Spacing.AllValue) && !"0".Equals(Spacing.AllValue))
                {
                    xmlStyle.SetAttribute("spacing", Spacing.AllValue);
                    _newXmlStyle.Add("spacing", Spacing.AllValue);
                }
                else
                {
                    #region left-spacing
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("left-spacing")
                        ? _actualXmlStyle["left-spacing"]
                        : string.Empty;

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        if (!string.IsNullOrEmpty(Spacing.LeftValue) && !"0".Equals(Spacing.LeftValue))
                            xmlStyle.SetAttribute("left-spacing", Spacing.LeftValue);
                    }
                    else if (_actualValue != Spacing.LeftValue)
                        xmlStyle.SetAttribute("left-spacing", Spacing.LeftValue);

                    _newXmlStyle.Add("left-spacing", Spacing.LeftValue);
                    #endregion

                    #region right-spacing
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("right-spacing")
                        ? _actualXmlStyle["right-spacing"]
                        : string.Empty;

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        if (!string.IsNullOrEmpty(Spacing.RightValue) && !"0".Equals(Spacing.RightValue))
                            xmlStyle.SetAttribute("right-spacing", Spacing.RightValue);
                    }
                    else if (_actualValue != Spacing.RightValue)
                        xmlStyle.SetAttribute("right-spacing", Spacing.RightValue);

                    _newXmlStyle.Add("right-spacing", Spacing.RightValue);
                    #endregion

                    #region top-spacing
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("top-spacing")
                        ? _actualXmlStyle["top-spacing"]
                        : string.Empty;

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        if (!string.IsNullOrEmpty(Spacing.TopValue) && !"0".Equals(Spacing.TopValue))
                            xmlStyle.SetAttribute("top-spacing", Spacing.TopValue);
                    }
                    else if (_actualValue != Spacing.TopValue)
                        xmlStyle.SetAttribute("top-spacing", Spacing.TopValue);

                    _newXmlStyle.Add("top-spacing", Spacing.TopValue);
                    #endregion

                    #region bottom-spacing
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("bottom-spacing")
                        ? _actualXmlStyle["bottom-spacing"]
                        : string.Empty;

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        if (!string.IsNullOrEmpty(Spacing.BottomValue) && !"0".Equals(Spacing.BottomValue))
                            xmlStyle.SetAttribute("bottom-spacing", Spacing.BottomValue);
                    }
                    else if (_actualValue != Spacing.BottomValue)
                        xmlStyle.SetAttribute("bottom-spacing", Spacing.BottomValue);

                    _newXmlStyle.Add("bottom-spacing", Spacing.BottomValue);
                    #endregion
                }
            }
            else if (string.IsNullOrEmpty(Spacing.AllValue))
            {
                #region left-spacing
                if (_actualValue != Spacing.LeftValue)
                    xmlStyle.SetAttribute("left-spacing", Spacing.LeftValue);

                _newXmlStyle.Add("left-spacing", Spacing.LeftValue);
                #endregion

                #region right-spacing
                if (_actualValue != Spacing.RightValue)
                    xmlStyle.SetAttribute("right-spacing", Spacing.RightValue);

                _newXmlStyle.Add("right-spacing", Spacing.RightValue);
                #endregion

                #region top-spacing
                if (_actualValue != Spacing.TopValue)
                    xmlStyle.SetAttribute("top-spacing", Spacing.TopValue);

                _newXmlStyle.Add("top-spacing", Spacing.TopValue);
                #endregion

                #region bottom-spacing
                if (_actualValue != Spacing.BottomValue)
                    xmlStyle.SetAttribute("bottom-spacing", Spacing.BottomValue);

                _newXmlStyle.Add("bottom-spacing", Spacing.BottomValue);
                #endregion
            }
            else if (Spacing.AllValue != _actualValue)
            {
                xmlStyle.SetAttribute("spacing", Spacing.AllValue);
                _newXmlStyle.Add("spacing", Spacing.AllValue);
            }
            else
                _newXmlStyle.Add("spacing", Spacing.AllValue);
            #endregion

            #region padding
            _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("padding")
                ? _actualXmlStyle["padding"]
                : string.Empty;

            if (string.IsNullOrEmpty(_actualValue))
            {
                if (!string.IsNullOrEmpty(Padding.AllValue) && !"5".Equals(Padding.AllValue))
                {
                    xmlStyle.SetAttribute("padding", Padding.AllValue);
                    _newXmlStyle.Add("padding", Padding.AllValue);
                }
                else
                {
                    #region left-padding
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("left-padding")
                        ? _actualXmlStyle["left-padding"]
                        : string.Empty;

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        if (!string.IsNullOrEmpty(Padding.LeftValue) && !"5".Equals(Padding.LeftValue))
                            xmlStyle.SetAttribute("left-padding", Padding.LeftValue);
                    }
                    else if (_actualValue != Padding.LeftValue)
                        xmlStyle.SetAttribute("left-padding", Padding.LeftValue);

                    _newXmlStyle.Add("left-padding", Padding.LeftValue);
                    #endregion

                    #region right-padding
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("right-padding")
                        ? _actualXmlStyle["right-padding"]
                        : string.Empty;

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        if (!string.IsNullOrEmpty(Padding.RightValue) && !"5".Equals(Padding.RightValue))
                            xmlStyle.SetAttribute("right-padding", Padding.RightValue);
                    }
                    else if (_actualValue != Padding.RightValue)
                        xmlStyle.SetAttribute("right-padding", Padding.RightValue);

                    _newXmlStyle.Add("right-padding", Padding.RightValue);
                    #endregion

                    #region top-padding
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("top-padding")
                        ? _actualXmlStyle["top-padding"]
                        : string.Empty;

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        if (!string.IsNullOrEmpty(Padding.TopValue) && !"5".Equals(Padding.TopValue))
                            xmlStyle.SetAttribute("top-padding", Padding.TopValue);
                    }
                    else if (_actualValue != Padding.TopValue)
                        xmlStyle.SetAttribute("top-padding", Padding.TopValue);

                    _newXmlStyle.Add("top-padding", Padding.TopValue);
                    #endregion

                    #region bottom-padding
                    _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("bottom-padding")
                        ? _actualXmlStyle["bottom-padding"]
                        : string.Empty;

                    if (string.IsNullOrEmpty(_actualValue))
                    {
                        if (!string.IsNullOrEmpty(Padding.BottomValue) && !"5".Equals(Padding.BottomValue))
                            xmlStyle.SetAttribute("bottom-padding", Padding.BottomValue);
                    }
                    else if (_actualValue != Padding.BottomValue)
                        xmlStyle.SetAttribute("bottom-padding", Padding.BottomValue);

                    _newXmlStyle.Add("bottom-padding", Padding.BottomValue);
                    #endregion
                }
            }
            else if (string.IsNullOrEmpty(Padding.AllValue))
            {
                #region left-padding
                if (_actualValue != Padding.LeftValue)
                    xmlStyle.SetAttribute("left-padding", Padding.LeftValue);

                _newXmlStyle.Add("left-padding", Padding.LeftValue);
                #endregion

                #region right-padding
                if (_actualValue != Padding.RightValue)
                    xmlStyle.SetAttribute("right-padding", Padding.RightValue);

                _newXmlStyle.Add("right-padding", Padding.RightValue);
                #endregion

                #region top-padding
                if (_actualValue != Padding.TopValue)
                    xmlStyle.SetAttribute("top-padding", Padding.TopValue);

                _newXmlStyle.Add("top-padding", Padding.TopValue);
                #endregion

                #region bottom-padding
                if (_actualValue != Padding.BottomValue)
                    xmlStyle.SetAttribute("bottom-padding", Padding.BottomValue);

                _newXmlStyle.Add("bottom-padding", Padding.BottomValue);
                #endregion
            }
            else if (Padding.AllValue != _actualValue)
            {
                xmlStyle.SetAttribute("padding", Padding.AllValue);
                _newXmlStyle.Add("padding", Padding.AllValue);
            }
            else
                _newXmlStyle.Add("padding", Padding.AllValue);
            #endregion

            #region background-color
            if (_actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("background-color"))
                _actualValue = !_actualXmlStyle["background-color"].Equals("transparent", StringComparison.InvariantCultureIgnoreCase)
                    ? _actualXmlStyle["background-color"]
                    : null;
            else _actualValue = string.Empty;

            if (string.IsNullOrEmpty(_actualValue))
            {
                if (BackColor.Color != Color.Transparent)
                    xmlStyle.SetAttribute("background-color", BackColor.Name.ToLower());
            }
            else if (!_actualValue.Equals(BackColor.Name, StringComparison.InvariantCultureIgnoreCase))
                xmlStyle.SetAttribute("background-color", BackColor.Name.ToLower());
            else if (!_newXmlStyle.ContainsKey("background-color"))
                _newXmlStyle.Add("background-color", BackColor.Name.ToLower());
            #endregion

            #region inside-border
            _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("inside-border")
                ? _actualXmlStyle["inside-border"]
                : string.Empty;

            if (string.IsNullOrEmpty(_actualValue))
            {
                if (Surround.InsideBorder)
                    xmlStyle.SetAttribute("inside-border", "true");
            }
            else if (_actualValue != (Surround.InsideBorder ? "true" : "false"))
                xmlStyle.SetAttribute("inside-border", (Surround.InsideBorder ? "true" : "false"));

            _newXmlStyle.Add("inside-border", (Surround.InsideBorder ? "true" : "false"));
            #endregion

            #region radius-border
            _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("radius-border")
                ? _actualXmlStyle["radius-border"]
                : string.Empty;

            if (string.IsNullOrEmpty(_actualValue))
            {
                if (Surround.Radius != 0)
                    xmlStyle.SetAttribute("radius-border", Surround.Radius.ToString());
            }
            else if (_actualValue != Surround.Radius.ToString())
                xmlStyle.SetAttribute("radius-border", Surround.Radius.ToString());

            _newXmlStyle.Add("radius-border", Surround.Radius.ToString());
            #endregion

            #region corners-border
            _actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("corners-border")
                ? _actualXmlStyle["corners-border"]
                : string.Empty;

            if (string.IsNullOrEmpty(_actualValue))
            {
                if (Surround.Corners != ComplexSurroundCorners.None)
                    xmlStyle.SetAttribute("corners-border", ((int)Surround.Corners).ToString());
            }
            else if (_actualValue != ((int)Surround.Corners).ToString())
                xmlStyle.SetAttribute("corners-border", ((int)Surround.Corners).ToString());

            _newXmlStyle.Add("corners-border", ((int)Surround.Corners).ToString());
            #endregion

            // přidáme do zásobníku nový styl
            xmlStyles.Add(_newXmlStyle);
            XmlLinkedNode xmlComponent = GetDataComponent(xmlDoc, withRect, xmlElement.NamespaceURI, xmlStyles);

            if (xmlComponent != null)
            {
                SetXmlAttribute((XmlElement)xmlComponent);

                if (IsSelected)
                    xmlComponent = new XmlElementSelected((XmlElement)xmlComponent).Initialize(this);

                xmlStyle.AppendChild(xmlComponent);
            }

            // vymažeme ze zásobníku poslední styl
            xmlStyles.Remove(_newXmlStyle);

            /*nově kvůli pozici*/
            if (xmlStyle != null)
            {
                //pokud větev STYLE, neobsahuje žádné atributy, pak je zbytečná 
                if ("style".Equals(xmlStyle.Name) && xmlStyle.Attributes.Count == 0)
                    // v tomto případě přepíšeme všechny vnořené větve větvi STYLE do nadřazené větvi
                    foreach (XmlNode subItem in xmlStyle.ChildNodes)
                        xmlElement.AppendChild(subItem);
                else xmlElement.AppendChild(xmlStyle);
            }
            /*nově^^^*/
        }

        /// <summary>
        /// se volá v průběhu získávání dat
        /// </summary>
        /// <param name="xmlStyle">Element dokumentu, do kterého se objekt vkládá</param>
        /// <param name="_actualXmlStyle">aktuální styl ze seznamu stylů</param>
        /// <param name="_newXmlStyle">nový styl do seznamu stylů</param>
        protected virtual void OnSettingData(XmlElement xmlStyle, ref GFEList _actualXmlStyle, ref GFEList _newXmlStyle)
        {
            if (this is ITextHandler)
            {
                dynamic actualValue = null;
                var text = (this as ITextHandler).Text;
                if (text != null)
                {
                    string serializedFontName = LocalCommonService.GetSerializedFontFamilyName(this as ITextHandler, _actualXmlStyle);

                    #region font-name, font-face
                    if (_actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("font-name"))
                        actualValue = _actualXmlStyle["font-name"];

                    if (string.IsNullOrEmpty(actualValue))
                    {
                        if (_actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("font-face"))
                            actualValue = _actualXmlStyle["font-face"];

                        if (serializedFontName != "times")
                            if (serializedFontName != "arial" && serializedFontName != "courier")
                            {
                                if (actualValue != serializedFontName)
                                {
                                    if (!string.IsNullOrEmpty(actualValue))
                                        xmlStyle.SetAttribute("font-face", "custom");
                                    xmlStyle.SetAttribute("font-name", serializedFontName);
                                }

                                _newXmlStyle.Add("font-face", "custom");
                            }
                            else
                            {
                                if (string.IsNullOrEmpty(actualValue)
                                    || (!string.IsNullOrEmpty(actualValue) && actualValue != serializedFontName))
                                    xmlStyle.SetAttribute("font-face", serializedFontName);

                                _newXmlStyle.Add("font-face", serializedFontName);
                            }

                    }
                    else if (actualValue != serializedFontName)
                    {
                        if (_actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("font-face"))
                            actualValue = _actualXmlStyle["font-face"];

                        if (serializedFontName != "arial" && serializedFontName != "courier")
                        {
                            if (string.IsNullOrEmpty(actualValue) || (actualValue != "custom"))
                            {
                                xmlStyle.SetAttribute("font-face", "custom");
                                xmlStyle.SetAttribute("font-name", serializedFontName);
                            }

                            _newXmlStyle.Add("font-face", "custom");
                        }
                        else
                        {
                            if (actualValue != serializedFontName)
                                xmlStyle.SetAttribute("font-face", serializedFontName);

                            _newXmlStyle.Add("font-face", serializedFontName);
                        }
                    }

                    _newXmlStyle.Add("font-name", serializedFontName);
                    #endregion

                    #region font-charset
                    if (_actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("font-charset"))
                        actualValue = _actualXmlStyle["font-charset"];
                    else actualValue = string.Empty;

                    string gcs = Convert.ToString(text.TextFont.GdiCharSet).Replace("_CHARSET", "").ToLower();
                    if (string.IsNullOrEmpty(actualValue))
                    {
                        // výchozí styl odstraňujeme
                        if (text.TextFont.GdiCharSet != ECharSet.EASTEUROPE_CHARSET)
                            xmlStyle.SetAttribute("font-charset", gcs);
                        else
                            xmlStyle.RemoveAttribute("font-charset");
                    }
                    else if (actualValue != gcs)
                        xmlStyle.SetAttribute("font-charset", gcs);

                    _newXmlStyle.Add("font-charset", gcs);
                    #endregion

                    #region font-size
                    if (_actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("font-size"))
                        actualValue = _actualXmlStyle["font-size"];
                    else actualValue = string.Empty;

                    if (string.IsNullOrEmpty(actualValue))
                    {
                        // výchozí styl odstraňujeme
                        if (text.TextFont.Size.Value != "2")
                            xmlStyle.SetAttribute("font-size", text.TextFont.Size.Value.Replace(",", "."));
                        else
                            xmlStyle.RemoveAttribute("font-size");
                    }
                    else
                        if (actualValue != text.TextFont.Size.Value)
                        xmlStyle.SetAttribute("font-size", text.TextFont.Size.Value.Replace(",", "."));

                    _newXmlStyle.Add("font-size", text.TextFont.Size.Value.Replace(",", "."));
                    #endregion

                    #region font-bold
                    if (_actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("font-bold"))
                        actualValue = _actualXmlStyle["font-bold"];
                    else actualValue = string.Empty;

                    if (string.IsNullOrEmpty(actualValue))
                    {
                        // výchozí styl odstraňujeme
                        if (((FontStyle)text.TextFont.Style & FontStyle.Bold) > 0)
                            xmlStyle.SetAttribute("font-bold", "true");
                        else
                            xmlStyle.RemoveAttribute("font-bold");
                    }
                    else if (actualValue != Convert.ToString(((FontStyle)text.TextFont.Style & FontStyle.Bold) > 0))
                        xmlStyle.SetAttribute("font-bold", Convert.ToString(((FontStyle)text.TextFont.Style & FontStyle.Bold) > 0));

                    _newXmlStyle.Add("font-bold", Convert.ToString(((FontStyle)text.TextFont.Style & FontStyle.Bold) > 0));
                    #endregion

                    #region font-italic
                    if (_actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("font-italic"))
                        actualValue = _actualXmlStyle["font-italic"];
                    else actualValue = string.Empty;

                    if (string.IsNullOrEmpty(actualValue))
                    {
                        // výchozí styl odstraňujeme
                        if (((FontStyle)text.TextFont.Style & FontStyle.Italic) > 0)
                            xmlStyle.SetAttribute("font-italic", "true");
                        else
                            xmlStyle.RemoveAttribute("font-italic");
                    }
                    else if (actualValue != Convert.ToString(((FontStyle)text.TextFont.Style & FontStyle.Italic) > 0))
                        xmlStyle.SetAttribute("font-italic", Convert.ToString(((FontStyle)text.TextFont.Style & FontStyle.Italic) > 0));

                    _newXmlStyle.Add("font-italic", Convert.ToString(((FontStyle)text.TextFont.Style & FontStyle.Italic) > 0));
                    #endregion

                    #region font-strikeout
                    if (_actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("font-strikeout"))
                        actualValue = _actualXmlStyle["font-strikeout"];
                    else actualValue = string.Empty;

                    if (string.IsNullOrEmpty(actualValue))
                    {
                        // výchozí styl odstraňujeme
                        if (((FontStyle)text.TextFont.Style & FontStyle.Strikeout) > 0)
                            xmlStyle.SetAttribute("font-strikeout", "true");
                        else
                            xmlStyle.RemoveAttribute("font-strikeout");
                    }
                    else if (actualValue != Convert.ToString(((FontStyle)text.TextFont.Style & FontStyle.Strikeout) > 0))
                        xmlStyle.SetAttribute("font-strikeout", Convert.ToString(((FontStyle)text.TextFont.Style & FontStyle.Strikeout) > 0));

                    _newXmlStyle.Add("font-strikeout", Convert.ToString(((FontStyle)text.TextFont.Style & FontStyle.Strikeout) > 0));
                    #endregion

                    #region font-underline
                    if (_actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("font-underline"))
                        actualValue = _actualXmlStyle["font-underline"];
                    else actualValue = string.Empty;

                    if (string.IsNullOrEmpty(actualValue))
                    {
                        // výchozí hodnotu odstraňujeme
                        if (((FontStyle)text.TextFont.Style & FontStyle.Underline) > 0)
                            xmlStyle.SetAttribute("font-underline", "true");
                        else
                            xmlStyle.RemoveAttribute("font-underline");
                    }
                    else if (actualValue != Convert.ToString(((FontStyle)text.TextFont.Style & FontStyle.Underline) > 0))
                        xmlStyle.SetAttribute("font-underline", Convert.ToString(((FontStyle)text.TextFont.Style & FontStyle.Underline) > 0));

                    _newXmlStyle.Add("font-underline", Convert.ToString(((FontStyle)text.TextFont.Style & FontStyle.Underline) > 0));
                    #endregion

                    #region font-color
                    if (_actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("font-color"))
                        actualValue = _actualXmlStyle["font-color"];
                    else actualValue = string.Empty;

                    if (string.IsNullOrEmpty(actualValue))
                    {
                        // výchozí hodnotu odstraňujeme
                        if (text.TextFont.ForeColor.Color != Color.Black)
                            xmlStyle.SetAttribute("font-color", text.TextFont.ForeColor.Name);
                        else
                            xmlStyle.RemoveAttribute("font-color");
                    }
                    else if (actualValue != text.TextFont.ForeColor.Name)
                        xmlStyle.SetAttribute("font-color", text.TextFont.ForeColor.Name);

                    _newXmlStyle.Add("font-color", text.TextFont.ForeColor.Name);
                    #endregion

                    #region horizontal-align
                    if (_actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("horizontal-align"))
                        actualValue = _actualXmlStyle["horizontal-align"];
                    else actualValue = string.Empty;

                    if (string.IsNullOrEmpty(actualValue))
                    {
                        // výchozí styl odstraňujeme
                        if (text.Align.Horizontal != HAlign.left)
                            xmlStyle.SetAttribute("horizontal-align", Convert.ToString(text.Align.Horizontal).ToLower());
                        else
                            xmlStyle.RemoveAttribute("horizontal-align");
                    }
                    else if (actualValue != Convert.ToString(text.Align.Horizontal).ToLower())
                        xmlStyle.SetAttribute("horizontal-align", Convert.ToString(text.Align.Horizontal).ToLower());

                    _newXmlStyle.Add("horizontal-align", Convert.ToString(text.Align.Horizontal).ToLower());
                    #endregion

                    #region vertical-align
                    if (_actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("vertical-align"))
                        actualValue = _actualXmlStyle["vertical-align"];
                    else actualValue = string.Empty;

                    if (string.IsNullOrEmpty(actualValue))
                    {
                        // výchozí styl odstraňujeme
                        if (text.Align.Vertical != VAlign.top)
                            xmlStyle.SetAttribute("vertical-align", Convert.ToString(text.Align.Vertical).ToLower());
                        else
                            xmlStyle.RemoveAttribute("vertical-align");
                    }
                    else if (actualValue != Convert.ToString(text.Align.Vertical).ToLower())
                        xmlStyle.SetAttribute("vertical-align", Convert.ToString(text.Align.Vertical).ToLower());

                    _newXmlStyle.Add("vertical-align", Convert.ToString(text.Align.Vertical).ToLower());
                    #endregion

                    #region ellipsis-style
                    if (_actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("ellipsis-style"))
                        actualValue = _actualXmlStyle["ellipsis-style"];
                    else actualValue = string.Empty;

                    if (string.IsNullOrEmpty(actualValue))
                    {
                        // výchozí hodnotu odstraňujeme
                        if (text.Ellipsis.Style != ElStyle.dots)
                            xmlStyle.SetAttribute("ellipsis-style", Convert.ToString(text.Ellipsis.Style).ToLower());
                        else
                            xmlStyle.RemoveAttribute("ellipsis-style");
                    }
                    else if (actualValue != Convert.ToString(text.Ellipsis.Style).ToLower())
                        xmlStyle.SetAttribute("ellipsis-style", Convert.ToString(text.Ellipsis.Style).ToLower());

                    _newXmlStyle.Add("ellipsis-style", Convert.ToString(text.Ellipsis.Style).ToLower());
                    #endregion

                    #region ellipsis-char
                    if (_actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("ellipsis-char"))
                        actualValue = _actualXmlStyle["ellipsis-char"];
                    else actualValue = string.Empty;

                    if (string.IsNullOrEmpty(actualValue))
                    {
                        if (text.Ellipsis.Char != '*')
                            xmlStyle.SetAttribute("ellipsis-char", Convert.ToString(text.Ellipsis.Char));
                        else
                            xmlStyle.RemoveAttribute("ellipsis-char");
                    }
                    else if (actualValue != Convert.ToString(text.Ellipsis.Char))
                        xmlStyle.SetAttribute("ellipsis-char", Convert.ToString(text.Ellipsis.Char));

                    _newXmlStyle.Add("ellipsis-char", Convert.ToString(text.Ellipsis.Char));
                    #endregion

                    #region multiline
                    if (_actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("multiline"))
                        actualValue = _actualXmlStyle["multiline"];
                    else actualValue = string.Empty;

                    if (string.IsNullOrEmpty(actualValue))
                    {
                        if (!text.MultiLine)
                            xmlStyle.SetAttribute("multiline", "false");
                        else
                            xmlStyle.RemoveAttribute("multiline");
                    }
                    else if (actualValue != (text.MultiLine ? "true" : "false"))
                        xmlStyle.SetAttribute("multiline", (text.MultiLine ? "true" : "false"));

                    _newXmlStyle.Add("multiline", (text.MultiLine ? "true" : "false"));
                    #endregion

                    #region text-orientation
                    if (_actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("text-orientation"))
                        actualValue = _actualXmlStyle["text-orientation"];
                    else actualValue = string.Empty;

                    string contentValue = "0";
                    switch (text.Orientation)
                    {
                        case RotateType.Rotate90FlipXY:
                            contentValue = "270";
                            break;
                        case RotateType.Rotate180FlipXY:
                            contentValue = "180";
                            break;
                        case RotateType.Rotate270FlipXY:
                            contentValue = "90";
                            break;
                        default:
                            break;
                    }

                    if (string.IsNullOrEmpty(actualValue))
                    {
                        switch (text.Orientation)
                        {
                            case RotateType.Rotate90FlipXY:
                                xmlStyle.SetAttribute("text-orientation", "270");
                                break;
                            case RotateType.Rotate180FlipXY:
                                xmlStyle.SetAttribute("text-orientation", "180");
                                break;
                            case RotateType.Rotate270FlipXY:
                                xmlStyle.SetAttribute("text-orientation", "90");
                                break;
                            default:
                                xmlStyle.RemoveAttribute("text-orientation");
                                break;
                        }
                    }
                    else if (actualValue != contentValue)
                        xmlStyle.SetAttribute("text-orientation", contentValue);

                    _newXmlStyle.Add("text-orientation", contentValue);
                    #endregion

                    #region fit-text
                    actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("fit-text") ? _actualXmlStyle["fit-text"] : string.Empty;
                    contentValue = new FitTextConverter(typeof(FitText)).ConvertToInvariantString(text.Fittext);

                    if ((string.IsNullOrEmpty(actualValue) || actualValue != contentValue) && !FitTextConverter.IsDefault(contentValue))
                        xmlStyle.SetAttribute("fit-text", contentValue);
                    else
                        xmlStyle.RemoveAttribute("fit-text");

                    _newXmlStyle.Add("fit-text", contentValue);
                    #endregion

                    #region text-leading
                    actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("text-leading") ? _actualXmlStyle["text-leading"] : string.Empty;
                    contentValue = text.Textleading.ToString();

                    if ((string.IsNullOrEmpty(actualValue) || actualValue != contentValue) && contentValue != "1")
                        xmlStyle.SetAttribute("text-leading", contentValue);
                    else
                        xmlStyle.RemoveAttribute("text-leading");

                    _newXmlStyle.Add("text-leading", contentValue);
                    #endregion

                    #region paragraph-gap
                    actualValue = _actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("paragraph-gap") ? _actualXmlStyle["paragraph-gap"] : string.Empty;
                    contentValue = text.Paragraphgap.ToString();

                    if ((string.IsNullOrEmpty(actualValue) || actualValue != contentValue) && contentValue != "1")
                        xmlStyle.SetAttribute("paragraph-gap", contentValue);
                    else
                        xmlStyle.RemoveAttribute("paragraph-gap");

                    _newXmlStyle.Add("paragraph-gap", contentValue);
                    #endregion

                    #region background-color
                    if (_actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("background-color"))
                        actualValue = !_actualXmlStyle["background-color"].Equals("transparent", StringComparison.InvariantCultureIgnoreCase)
                            ? _actualXmlStyle["background-color"]
                            : null;
                    else actualValue = string.Empty;

                    if (string.IsNullOrEmpty(actualValue))
                    {
                        if (text.TextFont.BackColor.Color != System.Drawing.Color.Transparent)
                            xmlStyle.SetAttribute("background-color", text.TextFont.BackColor.Name.ToLower());
                        else
                            xmlStyle.RemoveAttribute("background-color");
                    }
                    else if (!actualValue.Equals(text.TextFont.BackColor.Name, StringComparison.InvariantCultureIgnoreCase))
                        xmlStyle.SetAttribute("background-color", text.TextFont.BackColor.Name.ToLower());

                    _newXmlStyle.Add("background-color", text.TextFont.BackColor.Name.ToLower());
                    #endregion

                    #region Format
                    if (_actualXmlStyle.Count != 0 && _actualXmlStyle.ContainsKey("format"))
                        actualValue = !string.IsNullOrEmpty(_actualXmlStyle["format"])
                            ? _actualXmlStyle["format"]
                            : null;
                    else actualValue = string.Empty;

                    if (string.IsNullOrEmpty(actualValue))
                    {
                        if (!string.IsNullOrEmpty(text.Format))
                            xmlStyle.SetAttribute("format", text.Format);
                        else
                            xmlStyle.RemoveAttribute("format");
                    }
                    else if (!actualValue.Equals(text.Format, StringComparison.CurrentCulture))
                        xmlStyle.SetAttribute("format", text.Format);

                    _newXmlStyle.Add("format", text.Format);
                    #endregion

                }
            }
        }

        /// <summary>
        /// Metoda vracení XML struktury samotného elementu (bez STYLE)
        /// </summary>
        /// <param name="xmlDoc">Dokument, do kterého se struktura vkládá</param>
        /// <param name="withRect">TRUE - vloží i informaci o RECT hodnotě</param>
        /// <param name="namespaceUri">jmenný prostor <paramref name="xmlDoc"/></param>
        /// <param name="styles">seznam již dostupných stylů</param>
        /// <param name="regionFullName">Úplný název aktuálního regionu</param>
        /// <returns>Element popisující samotný objekt bez stylů</returns>
        public virtual XmlLinkedNode GetDataComponent(XmlDocumentPosition xmlDoc, bool withRect = true, string namespaceUri = null, List<GFEList> styles = null, string regionFullName = null) { return xmlDoc.CreateElement("NULL", string.IsNullOrEmpty(namespaceUri) ? ReportDesignerProperties.Instance.AlfReportXmlns : namespaceUri); }

        UndoRedo<IComplexFive> padding = new UndoRedo<IComplexFive>();
        /// <summary>
        /// Odsazení textu
        /// </summary>
        [Browsable(false)]
        public IComplexFive Padding { get => padding.Value; set { padding.Value = value; } }

        /// <summary>
        /// Aktualizace objektu
        /// </summary>
        public virtual void RefreshByStructure()
        {
            if (this is IDataItem)
            {
                (this as IDataItem).DataTitle = null;
                (this as IDataItem).StructureItem = null;
            }
        }

        /// <summary>
        /// uložení velikosti objektu
        /// </summary>
        /// <param name="xmlStyle">větev, do které se velikost vkládá</param>
        protected void OnSettingSizeData(XmlElement xmlStyle)
        {
            if (!string.IsNullOrEmpty(Width.Value))
                if (!string.IsNullOrEmpty(Width.Metrics))
                    // pokud objekt nemá šířku dle zbytku velikosti
                    if (!IsWidthByContent)
                    {
                        if (Width.Metrics.Equals("px", StringComparison.InvariantCultureIgnoreCase))
                            xmlStyle.SetAttribute("width", Convert.ToString(CommonService.GetMilimeters(Width, 2)).Replace(',', '.') + "mm");
                        else
                            xmlStyle.SetAttribute("width", Width.MathRoundValue(2));
                    }

            if (!(Parent is ICell && (Parent as ICell).Line != null && ((Parent as ICell).Line as IGRRLine).IsNULLHeight))
            {
                if (!string.IsNullOrEmpty(Height.Metrics) && !IsHeightByContent)
                    {
                        if (string.IsNullOrEmpty(Height.Metrics) || Height.Metrics.Equals("px", StringComparison.InvariantCultureIgnoreCase))
                            xmlStyle.SetAttribute("height", Convert.ToString(CommonService.GetMilimeters(Height, 2)).Replace(',', '.') + "mm");
                        else
                            xmlStyle.SetAttribute("height", Height.MathRoundValue(2));
                    }
            }
            else
                // je to NULLový řádek
                xmlStyle.SetAttribute("height", "0mm");
        }
        #endregion

        #region IDisposable
        /// <summary>
        /// Metoda po uvolnění objektu
        /// </summary>
        public event EventHandler Disposed;

        /// <summary>
        /// Uvolnění objektu
        /// </summary>
        public void Dispose()
        {
            Dispose(true);

            // odstraníme ze seznamu objektů pro uvolnění
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// uvolnění objektu
        /// </summary>
        /// <param name="disposing">indikuje uvolnění objektu</param>
        protected virtual void Dispose(bool disposing)
        {
            if (disposing && Disposed != null)
                Disposed(this, EventArgs.Empty);
        }

        /// <summary>
        /// realizace finalizeru jednorazového typu
        /// </summary>
        ~AbstractContent() { Dispose(false); }
        #endregion

        #region IChangeable
        /// <summary>
        /// Posunutí objektu
        /// </summary>
        /// <param name="xdiff">Změna dle X</param>
        /// <param name="ydiff">Změna dle Y</param>
        public void ChangeLocation(float xdiff, float ydiff)
        {
            // ukotvené objekty posouvat nelze
            if (Anchor)
                return;

            if (!UndoRedoService.IsTransactionStarted)
                UndoRedoService.StartTransaction(GResources.GetResourceText(29450043)); //RC 29450043 : tažení objektů

            //Zafixujeme stav kotvení daného objektu
            bool _anchor = Anchor;

            //Povolíme kotvu pro manipulaci s objektem
            Anchor = false;

            //Zjistíme nové hodnoty Left a Top v závislosti na rozlišení
            Left += xdiff;
            Top += ydiff;

            //Vrátíme stav ukotveni na původní
            Anchor = _anchor;
        }

        /// <summary>
        /// Změna šířky objektu
        /// </summary>
        /// <param name="diff">velikost potřebné změny</param>
        public virtual void SetWidthByLeftSide(float diff)
        {
            if (diff != 0)
            {
                this.Left += diff;
                this.Width -= diff;

                if (this.Width < 0)
                    this.Width = new SizeValue(0, this.Width.Metrics, this.Width.PC100);

                if (Parent is ICell && (Parent as ICell).Line != null)
                    ((Parent as ICell).Line as ILine).ItemLeftChanged(Parent as ICell, diff);
            }
        }
        /// <summary>
        /// Změna šířky objektu
        /// </summary>
        /// <param name="diff">velikost potřebné změny</param>
        public virtual void SetWidthByRightSide(float diff)
        {
            if (diff != 0)
            {
                ILine line = Parent is ICell ? (Parent as ICell).Line : null;
                if (line == null)
                    line = Parent is ILine ? Parent as ILine : null;

                if (line != null)
                {
                    ICell icell = line?.FirstOrDefault(cl => !cl.IsComment && cl.Index > (Parent as ICell).Index && (cl as UndoRedoList<ITagComponent>).Exists(itm => itm is IChangeable));
                    IChangeable changeable = icell != null ? (icell as IList<ITagComponent>).First(itm => itm is IChangeable) as IChangeable : null;
                    if (changeable != null)
                        changeable.SetWidthByLeftSide(diff);
                }
                else
                    Width += diff;
            }
        }

        /// <summary>
        /// Změna výšky objektu
        /// </summary>
        /// <param name="diff">velikost potřebné změny</param>
        public virtual void SetHeightByTopSide(float diff)
        {
            if (diff != 0)
                if (!(Parent is ICell))
                {
                    Top += diff;
                    Height -= diff;
                }
        }
        /// <summary>
        /// Změna výšky objektu
        /// </summary>
        /// <param name="diff">velikost potřebné změny</param>
        public virtual void SetHeightByBottomSide(float diff)
        {
            if (diff != 0)
                Height += diff;
        }

        /// <summary>
        /// Změna výšky shora
        /// </summary>
        /// <param name="e">údaje o myši</param>
        /// <param name="zoom">Hodnota ZOOM</param>
        /// <returns></returns>
        public void SetHeightByTopSide(MouseEventArgs e, float zoom)
        {
            float Y = e.Y + PagePanel.VerticalScroll.Value;

            // v případě, že pozice kurzoru je po pravé straně
            // pak objekt má šířku 0
            if (Y > (TopZoom + HeightZoom))
            {
                if (HeightZoom != 0)
                {
                    Top += Height;
                    Height = SizeValue.Empty;
                }
                return;
            }
            // pokud objekt je po levé straně,
            // pak ho rozatáhneme
            if (Y < TopZoom || Y < (TopZoom + HeightZoom))
            {
                float newHeight = (TopZoom + HeightZoom - Y) / zoom;
                Top = new SizeValue((Y - Page.TopZoom) / zoom - Page.MarginTop, !string.IsNullOrEmpty(Top.Metrics) ? Top.Metrics : "mm");
                Height = new SizeValue(newHeight, !string.IsNullOrEmpty(Height.Metrics) ? Height.Metrics : "mm");
            }
        }
        #endregion

        #region ICursorHandler
        /// <summary>
        /// Povolená změna vzhledu kurzóru
        /// </summary>
        [Browsable(false)]
        public bool EnableCursor { get => !Anchor && !ReadOnly; }
        /// <summary>
        /// Získání vzhledu kurzóru dle jeho umístění
        /// </summary>
        /// <param name="pointF">Umístění kurzóru</param>
        /// <param name="direction">Směr pohybu</param>
        /// <returns>Vzhled kurzoru</returns>
        public Cursor GetCursor(PointF pointF, ref int direction)
        {
            if (!EnableCursor)
                return Cursors.Default;

            if (Parent is ICell)
                return (Parent as ICell).GetCursor(pointF, ref direction);

            return CommonService.GetCursor(pointF, BoundsInPixels, ref direction);
        }
        #endregion

        #region IFormatHandler
        /// <summary>
        /// Aplikovat formát
        /// </summary>
        /// <param name="copiedFormat">kopírovaný formát</param>
        public virtual bool ApplyFormat(object copiedFormat = null)
        {
            object cf = copiedFormat ?? ClipboardService.CopiedFormat;
            if (cf == null)
                return false;

            bool isApplied = false;
            if (ReportDesignerProperties.Instance.ApplyFormatSurround
                && this is ISurroundable
                && cf is ISurroundable)
            {
                isApplied = true;
                (this as ISurroundable).Surround = new URComplexSurround().Initialize((cf as ISurroundable).Surround);
                (this as ISurroundable).InnerSurround = new URInnerSurround().Initialize((cf as ISurroundable).InnerSurround);
            }

            if (ReportDesignerProperties.Instance.ApplyFormatSurround
                && this is ITagComponent
                && cf is ITagComponent)
            {
                isApplied = true;
                (this as ITagComponent).Spacing = new URComplexSpacing();
                (this as ITagComponent).Spacing.Initialize((cf as ITagComponent).Spacing);
            }

            if (ReportDesignerProperties.Instance.ApplyFormatSize
                && this is ISizable
                && cf is ISizable)
            {
                isApplied = true;
                (this as ISizable).Width = new SizeValue((cf as ISizable).Width);
                (this as ISizable).Height = new SizeValue((cf as ISizable).Height);
            }

            if (ReportDesignerProperties.Instance.ApplyFormatText
                && this is ITextHandler
                && cf is ITextHandler)
            {
                isApplied = true;
                (this as ITextHandler).Text.Orientation = (cf as ITextHandler).Text.Orientation;
                (this as ITextHandler).Text.Ellipsis.Char = (cf as ITextHandler).Text.Ellipsis.Char;
                (this as ITextHandler).Text.Ellipsis.Style = (cf as ITextHandler).Text.Ellipsis.Style;
                (this as ITextHandler).Text.MultiLine = (cf as ITextHandler).Text.MultiLine;
                (this as ITextHandler).Text.Align.Vertical = (cf as ITextHandler).Text.Align.Vertical;
                (this as ITextHandler).Text.Align.Horizontal = (cf as ITextHandler).Text.Align.Horizontal;
                (this as ITextHandler).Text.ResourceID = (cf as ITextHandler).Text.ResourceID;
                (this as ITextHandler).Text.ResourceIDValue = (cf as ITextHandler).Text.ResourceIDValue;
                (this as ITextHandler).Text.Format = (cf as ITextHandler).Text.Format;
                (this as ITextHandler).Text.TextFont = new URTagTextFont().Initialize((cf as ITextHandler).Text.TextFont);
            }
            return isApplied;
        }
        /// <summary>
        /// Kopírovat formát
        /// </summary>
        public void CopyFormat() { ClipboardService.CopyFormat(this as ICloneable); }
        /// <summary>
        /// Formát lze aplikovat
        /// </summary>
        [Browsable(false)]
        public virtual bool EnableApplyFormat { get => ClipboardService.CopiedFormat != null; }

        /// <summary>
        /// Formát lze kopírovat
        /// </summary>
        [Browsable(false)]
        public virtual bool EnableCopyFormat { get => true; }
        #endregion

        #region IBackground
        UndoRedo<IComplexColor> backcolor = new UndoRedo<IComplexColor>();
        /// <summary>
        /// Barva pozadí
        /// </summary>
        [Category("Pozadí")]
        [DisplayName("barva")]
        [Description("Barva pozadí")]
        [TypeConverter(typeof(ComplexColorConverter))]
        public virtual IComplexColor BackColor { get => backcolor.Value; set { backcolor.Value = value; } }

        UndoRedo<BackgroundImage> backimage = new UndoRedo<BackgroundImage>();
        /// <summary>
        /// Obrázek pozadí
        /// </summary>
        [Category("Pozadí")]
        [DisplayName("obrázek")]
        [Description("Obrázek pozadí, který může sloužit jako podklad (šablona)")]
        [Browsable(false)]
        public BackgroundImage BackImage { get => backimage.Value; set { backimage.Value = value; } }

        UndoRedo<ImageStretch> backimagestretch = new UndoRedo<ImageStretch>();
        /// <summary>
        /// chování se obrázku pozadí
        /// </summary>
        [Category("Pozadí")]
        [DisplayName("roztažení")]
        [Description("Chování se obrázku pozadí")]
        [Browsable(false)]
        public virtual ImageStretch BackImageStretch { get => backimagestretch.Value; set { backimagestretch.Value = value; } }

        UndoRedo<bool> coated = new UndoRedo<bool>();
        /// <summary>
        /// Indikuje, zda komponenta mění svou velikost dle obrázku, nebo ne
        /// </summary>
        [Category("Pozadí")]
        [Description("Indikuje roztažení regionu na velikost obrázku")]
        [TypeConverter(typeof(BooleanTypeConverter))]
        [DisplayName("region dle obrázku")]
        [Browsable(false)]
        public bool Coated
        {
            get
            {
                if (BackImage != null)
                    coated.Value = BackImage.Coated;

                return coated.Value;
            }
            set { coated.Value = value; BackImage.Coated = value; }
        }

        UndoRedo<bool> stretch = new UndoRedo<bool>();
        /// <summary>
        /// Indikuje, zda obrázek vyplní celou plochu nebo zda zachová původní velikost
        /// </summary>
        [Category("Pozadí")]
        [DisplayName("obrázek dle regionu")]
        [Description("Indikuje roztažení obrázku na celou plochu regionu")]
        [TypeConverter(typeof(BooleanTypeConverter))]
        [Browsable(false)]
        public bool Stretch { get { if (BackImage != null) stretch.Value = BackImage.Stretch; return stretch.Value; } set { stretch.Value = value; BackImage.Stretch = value; } }

        UndoRedo<RotateType> rotate = new UndoRedo<RotateType>();
        /// <summary>
        /// Rotace obrázku
        /// </summary>
        [Category("Pozadí")]
        [DisplayName("rotace")]
        [Description("Rotace obrázku komponenty")]
        [Browsable(false)]
        public RotateType Rotate { get { if (BackImage != null) rotate.Value = BackImage.Rotate; return rotate.Value; } set { rotate.Value = value; BackImage.Rotate = value; } }

        UndoRedo<string> backimagefile = new UndoRedo<string>();
        /// <summary>
        /// Úplná cesta k dočasnému souboru obrázku
        /// </summary>
        [Browsable(false)]
        public string BackImageFile { get { if (BackImage != null) backimagefile.Value = BackImage.ImageFile; return backimagefile.Value; } set { backimagefile.Value = value; BackImage.ImageFile = value; } }

        UndoRedo<bool> showbackground = new UndoRedo<bool>();
        /// <summary>
        /// Indikuje zobrazení pozadí
        /// </summary>
        [Category("Pozadí")]
        [DisplayName("zobrazit")]
        [Description("Indikuje zobrazení pozadí")]
        [TypeConverter(typeof(BooleanTypeConverter))]
        public bool ShowBackground { get => showbackground.Value; set { showbackground.Value = value; } }
        #endregion

        #region ISizeByContent
        UndoRedo<bool> isheightbycontent = new UndoRedo<bool>();
        /// <summary>
        /// indikuje, že výška je dle obsahu
        /// </summary>
        [Browsable(false)]
        public override bool IsHeightByContent
        {
            get { return isheightbycontent.Value; }
            set
            {
                isheightbycontent.Value = value;
                if (!isLoading && value)
                {
                    isHeightChanging = true;
                    SetHeightByContent();
                    isHeightChanging = false;
                }
            }
        }
        UndoRedo<bool> iswidthbycontent = new UndoRedo<bool>();
        /// <summary>
        /// indikuje, že šířka je dle pozůstalé velikosti řádku
        /// </summary>
        [Browsable(false)]
        public override bool IsWidthByContent { get { return iswidthbycontent.Value; } set { iswidthbycontent.Value = value; } }
        /// <summary>
        /// nastavení výšky dle obsahu
        /// </summary>
        public override void SetHeightByContent()
        {
            Height = new SizeValue(ReportDesignerProperties.Instance.GrrDefaultTextHeight);
        }
        #endregion

        /// <summary>
        /// kvůli typu
        /// </summary>
        [Browsable(false)]
        public IPagePanel PagePanel { get => Page?.PagePanel as IPagePanel; }

        /// <exclude/>
        protected override Graphics ComputeGraphics
        {
            get
            {
                if (computeGraphics == null)
                    computeGraphics = Page.PagePanel.ComputeGraphics;
                return computeGraphics;
            }
        }

        /// <summary>
        /// Vymazání rámečku indikujícího, že daný objekt je aktivní
        /// </summary>
        /// <param name="graphics">Kreslící nástroj</param>
        protected virtual void DrawClear(Graphics graphics)
        {
            // v případě, že typ řádku není COLUMNS, pak kreslíme pozadí
            if (!(Parent is ICell && (Parent as ICell).Line.Type == LineType.columns))
                if (BackColor != null && BackColor.Color != Color.Transparent && ShowBackground)
                    using (SolidBrush drawBrush = new SolidBrush(BackColor.Color))
                        graphics.FillRectangle(drawBrush, BoundsInPixels);
        }

        /// <summary>
        /// Služba výběru objektů
        /// </summary>
        [Browsable(false)]
        public SelectionService ServiceSelection { get => Page is URAbstractPage ? (Page as URAbstractPage).ServiceSelection : null; }

        #region ISelectable
        /// <summary>
        /// Indikuje vybranost objektu
        /// </summary>
        [Browsable(false)]
        public bool IsSelected { get => ServiceSelection == null ? false : ServiceSelection.GetComponentSelected(this); }
        #endregion

        /// <summary>
        /// Typ vybraného objektu
        /// </summary>
        [DisplayName("typ")]
        [Description("Typ obsahu položky")]
        [ReadOnly(true)]
        public ComponentType ComponentType { get; protected set; }

        readonly UndoRedo<string> labeltext = new UndoRedo<string>();
        /// <summary>
        /// štítek symbolů
        /// </summary>
        [Category("Text")]
        [DisplayName("štítek")]
        [Description("Štítek objektu")]
        public string LabelText { get => labeltext.Value; set { labeltext.Value = value; } }

        #region IValidateHandler
        readonly UndoRedoList<IValidate> validates = new UndoRedoList<IValidate>(UndoRedoService.Manager);
        /// <summary>
        /// Validace objektu
        /// </summary>
        [DisplayName("validace")]
        [Description("Seznam validaci objektu")]
        //[EditorAttribute(typeof(), typeof(UITypeEditor))]
        [Browsable(false)]
        public IListComponent<IValidate> Validates { get => validates; }
        #endregion

        #region IToolTip
        /// <summary>
        /// Nápovědný text objektu (se skládá RUN-TIME)
        /// </summary>
        [Browsable(false)]
        public virtual HintText ToolTipText
        {
            get
            {
                string result = string.Empty;
                if (ReportDesignerProperties.Instance.ShowSize)
                {
                    if (PWidth != null)
                        result += (string.IsNullOrEmpty(result) ? "" : "\n") + GResources.GetResourceText(29451092) + ": " + PWidth;
                    if (PHeight != null)
                        result += (string.IsNullOrEmpty(result) ? "" : "; ") + GResources.GetResourceText(29451093) + ": " + PHeight;
                }
                return new HintText(result);
            }
        }

        /// <summary>
        /// Ovladač zobrazení
        /// </summary>
        [Browsable(false)]
        public ScrollableControl Control { get; set; }
        #endregion

        /// <summary>
        /// Inicializace objektu z informací o formátu objektu
        /// </summary>
        /// <param name="page">Stránka, které patří komponenta</param>
        /// <param name="parent">Vlastnik objektu</param>
        internal void Load(IPage page, ISizable parent)
        {
            isLoading = true;
            Initialize();
            if (page != null) Page = page;
            if (parent != null) Parent = parent;

            if (FormatTag != null)
            {
                AttrList.AddRange(FormatTag.Attributes);
                AttrList.SynchronizeByOrigin();
            }
            LoadInformation();
            isLoading = false;
        }

        #region Inicializační metody
        /// <summary>
        /// indikuje stav, kdy objekt je inicializován
        /// </summary>
        bool baseInitialized;
        /// <summary>
        /// inicializace objektu
        /// </summary>
        public virtual AbstractContent Initialize()
        {
            if (!baseInitialized)
            {
                isLoading = true;
                ShowBackground = true;
                Scripts = new GFEScriptList(UndoRedoService.Manager);
                if (Scripts != null)
                {
                    Scripts.AddRange(CommonService.Scripts);
                    Scripts.SynchronizeByOrigin();
                }

                Spacing = new URComplexSpacing().Initialize(ReportDesignerDesignerProperties.Instance);
                Padding = new URComplexPadding().Initialize(ReportDesignerDesignerProperties.Instance);
                AttrList = new GFEAttrList(UndoRedoService.Manager);
                Anchor = false;
                backcolor.Value = new URComplexColor().Initialize("transparent");
                Surround = new URComplexSurround().Initialize();
                InnerSurround = new URInnerSurround().Initialize();
                IsWidthByContent = true;
                IsHeightByContent = true;
                isLoading = false;
                baseInitialized = true;
            }
            return this;
        }

        /// <summary>
        /// inicializace objektu dle dostupných informaci
        /// </summary>
        /// <param name="item">Informace o formátu objektu.</param>
        public virtual AbstractContent Initialize(GFEFormatTag item)
        {
            Initialize();
            FormatTag = item;
            return this;
        }
        /// <summary>
        /// inicializace objektu dle dostupných informaci
        /// </summary>
        /// <param name="node">Položka bočního panelu s informaci o vkládaném objektu</param>
        public virtual AbstractContent Initialize(SideTabItem node)
        {
            Initialize();
            return this;
        }
        /// <summary>
        /// inicializace objektu dle dostupných informaci
        /// </summary>
        /// <param name="fragment">obsah s částečným popisem objektu</param>
        public virtual AbstractContent Initialize(XmlElement fragment)
        {
            Initialize();
            return this;
        }
        /// <summary>
        /// inicializace objektu dle dostupných informaci
        /// </summary>
        /// <param name="node">Položka bočního panelu s informaci o vkládaném objektu</param>
        public virtual AbstractContent Initialize(AbstractExtTreeNode node)
        {
            Initialize();
            return this;
        }
        /// <summary>
        /// inicializace objektu dle dostupných informaci
        /// </summary>
        /// <param name="sen">Položka struktury</param>
        public virtual AbstractContent Initialize(StructExtNode sen)
        {
            Initialize();
            return this;
        }
        /// <summary>
        /// inicializace objektu dle dostupných informaci
        /// </summary>
        /// <param name="variable">Položka proměnných</param>
        public virtual AbstractContent Initialize(VarExtNode variable)
        {
            Initialize();
            return this;
        }
        /// <summary>
        /// inicializace objektu dle dostupných informaci
        /// </summary>
        /// <param name="clone">objekt ke kopírování</param>
        public override void Initialize(object clone)
        {
            Initialize();
            base.Initialize(clone);
        }
        #endregion

        /// <summary>
        /// Vytvoření nové instance třídy a načtení onformaci.
        /// Informace existuje, pak se objekt zároveň inicializuje.
        /// </summary>
        public AbstractContent() { }

        void OnChangeOrder(int oldOrder, int newOrder)
        {
            if (newOrder >= (Parent as URAbstractContainer).Count)
            {
                MessageService.ShowWarningFormatted(string.Join(" ", GResources.GetResourceText(29450044), "'{0}'", GResources.GetResourceText(29450068))  //RC 29450068 : je mimo rozsah!
                    + '\n' + GResources.GetResourceText(29450046) + " '{1}'.", newOrder, (Parent as URAbstractContainer).Count - 1); //RC 29450046 : Maximální hodnota může být
                return;
            }

            if (!UndoRedoService.IsTransactionStarted)
                UndoRedoService.StartTransaction(GResources.GetResourceText(29450047)); //RC 29450047 : změna pořadí
            (Parent as URAbstractContainer).MoveFromTo(oldOrder, newOrder);
            UndoRedoService.Commit();
        }
    }

    /// <summary>
    /// Abstractní třída,
    /// vytvořená kvůli zobrazení specifických vlastnosti v tabulce vlastnosti
    /// </summary>
    abstract public class AbstractTextContent : AbstractContent, ITextHandler, IPropertyGridValue
    {
        #region IPropertyGrid
        // zde jsou vlastnosti pro tabulku vlastnosti a ne pro zjednodušení kódu :-)
        /// <summary>
        /// Písmo
        /// </summary>
        [Category("Písmo")]
        [DisplayName("detail")]
        [Description("Detail písma textu")]
        [EditorAttribute(typeof(TextFontEditor), typeof(UITypeEditor))]
        public URTagTextFont PropertyTextFont { get => Text != null ? Text.TextFont as URTagTextFont : null; set { Text.TextFont = value; } }
        /// <summary>
        /// Velikost písma
        /// </summary>
        [Category("Písmo")] //RC 29450612 : Písmo
        [Description("Velikost písma textu")] //RC 29450614 : Velikost písma textu
        [DisplayName("velikost")] //RC 29450615 : velikost
        public string PropertySize { get => PropertyTextFont != null ? Convert.ToString(PropertyTextFont.Size) : string.Empty; set { PropertyTextFont.Size = new FontSizeValue(value); } }
        /// <summary>
        /// Řez písma
        /// </summary>
        [Category("Písmo")] //RC 29450612 : Písmo
        [Description("styl (řez) písma")]
        [DisplayName("styl (řez)")]
        public FontStyleEnum PropertyStyle { get => PropertyTextFont != null ? PropertyTextFont.Style : FontStyleEnum.Regular; set { PropertyTextFont.Style = value; } }
        /// <summary>
        /// Název písma
        /// </summary>
        [Category("Písmo")] //RC 29450612 : Písmo
        [Description("Název písma")] //RC 29450618 : Název písma
        [DisplayName("název")] //RC 29450467 : název
        [TypeConverter(typeof(ComplexFontFamilyConverter))]
        public IComplexFontFamily PropertyFontFamily { get => PropertyTextFont?.FontFamily; set { PropertyTextFont.FontFamily = value; } }
        /// <summary>
        /// Barva písma
        /// </summary>
        [Category("Písmo")]
        [Description("Barva textu písma")]
        [DisplayName("barva písma")]
        [TypeConverter(typeof(ComplexColorConverter))]
        public IComplexColor PropertyForeColor { get => PropertyTextFont?.ForeColor; set { PropertyTextFont.ForeColor = value; } }
        /// <summary>
        /// Barva pozadí
        /// </summary>
        [Category("Písmo")] //RC 29450612 : Písmo
        [Description("Barva pozadí textu písma")] //RC 29450621 : Barva pozadí textu písma
        [DisplayName("barva pozadí")] //RC  : barva pozadí
        [TypeConverter(typeof(ComplexColorConverter))]
        public IComplexColor PropertyBackColor { get => PropertyTextFont?.BackColor; set { PropertyTextFont.BackColor = value; } }

        /// <summary>
        /// Formátování textu
        /// </summary>
        [Category("Text")] //RC 29450623 : Text
        [DisplayName("formátování")] //RC 29450624 : formátování
        [Description("Vlastní formát textu")] //RC 29450625 : Vlastní formát textu
        [EditorAttribute(typeof(TextFormattingEditor), typeof(UITypeEditor))]
        public string PropertyFormatting { get => Text?.Format; set { Text.Format = value; } }
        /// <summary>
        /// Pokud text má být víceřádkový pak TRUE
        /// </summary>
        [Category("Text")] //RC 29450623 : Text
        [DisplayName("víceřádkový")] //RC 29450626 : víceřádkový
        [Description("Indikuje víceřádkovost textu")] //RC 29450627 : Indikuje víceřádkovost textu
        [TypeConverter(typeof(BooleanTypeConverter))]
        public bool PropertyMultiLine { get => Text != null && Text.MultiLine; set { Text.MultiLine = value; } }

        /// <summary>
        /// Text objektu
        /// </summary>
        [Category("Text")]
        [DisplayName("detail")]
        [Description("Textový obsah objektu")]
        [EditorAttribute(typeof(TagTextEditor), typeof(UITypeEditor))]
        public string PropertyText { get => Text != null ? Text.Text : string.Empty; set { Text.Text = value; } }

        /// <summary>
        /// Zarovnání obsahu
        /// </summary>
        [DisplayName("zarovnání horizontální")] //RC 29450629 : zarovnání horizontální
        [Category("Text")] //RC 29450623 : Text
        [Description("Horizontální zarovnání obsahu")] //RC 29450630 : Horizontální zarovnání obsahu
        public HAlign PropertyHAlign { get => Text != null ? Text.Align.Horizontal : HAlign.left; set { Text.Align.Horizontal = value; } }

        /// <summary>
        /// Zarovnání obsahu
        /// </summary>
        [DisplayName("zarovnání vertikální")] //RC 29450631 : zarovnání vertikální
        [Category("Text")] //RC 29450623 : Text
        [Description("Vertikální zarovnání obsahu")] //RC 29450632 : Vertikální zarovnání obsahu
        public VAlign PropertyVAlign { get => Text != null ? Text.Align.Vertical : VAlign.top; set { Text.Align.Vertical = value; } }

        /// <summary>
        /// Směr textu
        /// </summary>
        [Category("Text")] //RC 29450623 : Text
        [Description("Orientace obsahu (směr textu)")] //RC 29450633 : Orientace obsahu (směr textu)
        [DisplayName("orientace")] //RC 29450634 : orientace
        public RotateType PropertyOrientation { get => Text != null ? Text.Orientation : RotateType.RotateNoneFlipNone; set { Text.Orientation = value; } }

        /// <summary>
        /// Odsazení textu
        /// </summary>
        [Category("Text")] //RC 29450623 : Text
        [DisplayName("odsazení")] //RC 29450601 : odsazení
        [Description("Odsazení textu uvnitř objektu. Je to hodnota pro všechny strany. Pro jednotlivá odsazení použijte 'detail'")] //RC 29450635 : Odsazení textu uvnítř objektu. Je to hodnota pro všechny strány. Pro jednotlivá odsazení použijte 'detail
        public string PropertyPadding { get => Padding != null ? Padding.AllValue : string.Empty; set { Padding.AllValue = value; } }


        /// <summary>
        /// Zarovnání obsahu
        /// </summary>
        [DisplayName("přizpůsobení")]
        [Category("Text")]
        [Description("Přizpůsobení textu")]
        public FitText PropertyFitText { get => Text != null ? Text.Fittext : FitText.none; set { Text.Fittext = value; } }

        /// <summary>
        /// Zarovnání obsahu
        /// </summary>
        [DisplayName("řádkování")]
        [Category("Text")]
        [Description("Řádkování textu")]
        public float PropertyTextLeading { get => Text != null ? Text.Textleading : 1; set { Text.Textleading = value; } }

        /// <summary>
        /// Mezera mezí odstavci
        /// </summary>
        [DisplayName("vzdálenost odstavců")]
        [Category("Text")]
        [Description("Velikost mezery mezí odstavce")]
        public float PropertyParagraphGap { get => Text != null ? Text.Paragraphgap : 1; set => Text.Paragraphgap = value; }
        #endregion

        #region ITextHandler
        readonly UndoRedo<ITagText> text = new UndoRedo<ITagText>();
        /// <summary>
        /// Text objektu
        /// </summary>
        [Browsable(false)]
        public ITagText Text { get => text.Value; set { text.Value = value; } }
        /// <summary>
        /// Nastavení výšky dle obsahu
        /// </summary>
        /// <param name="graphics">ovladač grafiky</param>
        public virtual void SetHeightByContent(Graphics graphics)
        {
            if (Text != null
                && !Width.IsEmpty
                && Padding != null
                && Surround != null)
                Height = TagService.GetHeightByContent(graphics
                    , Text.TextFont.Font
                    , (int)(Width - Padding.LeftPixels - Padding.RightPixels - Surround.Width.LeftPixels - Surround.Width.RightPixels)
                    , Text.MultiLine
                    , Text.Text
                    , Padding.TopPixels + Padding.BottomPixels
                    , !string.IsNullOrEmpty(Height.Metrics) ? Height.Metrics : "mm");
        }
        #endregion

        #region IBackground
        /// <summary>
        /// Barva pozadí
        /// </summary>
        [Browsable(false)]
        public override IComplexColor BackColor { get => Text?.TextFont.BackColor; set { if (Text != null) Text.TextFont.BackColor = value; } }
        #endregion

        #region IGRRSize
        /// <summary>
        /// nastavení výšky dle obsahu
        /// </summary>
        public override void SetHeightByContent()
        {
            if (Page != null)
                SetHeightByContent(ComputeGraphics);
        }
        #endregion

        /// <summary>
        /// Načtení informaci o objektu z formátu daného objektu
        /// </summary>
        override public void LoadInformation()
        {
            //Pokud se nejedná o datovou položku pak není co řešit 
            if (!(FormatTag is GFEFormatContent))
                return;

            base.LoadInformation();

            GFEFormatContent lContent = (GFEFormatContent)FormatTag;
            Text.TextFont = new URTagTextFont().Initialize(lContent.Style);
            if (lContent.Style != null)
            {
                Text.Align.Horizontal = (HAlign)lContent.Style.HorizontalAlign;
                Text.Align.Vertical = (VAlign)lContent.Style.VerticalAlign;
                Text.Ellipsis.Style = (ElStyle)lContent.Style.Ellipsis.Style;
                Text.Ellipsis.Char = lContent.Style.Ellipsis.EllipsisCharacter;
                Text.MultiLine = lContent.Style.Ellipsis.MultiLine;

                if (lContent.Style.Attributes.ContainsKey("text-orientation"))
                {
                    if (int.TryParse(lContent.Style.Attributes["text-orientation"], out int to))
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

                if (lContent.Style.Attributes.ContainsKey("fit-text"))
                    Text.Fittext = (FitText)(new FitTextConverter(typeof(FitText))).ConvertFromString(lContent.Style.Attributes["fit-text"]);
                if (lContent.Style.Attributes.ContainsKey("text-leading") && float.TryParse(lContent.Style.Attributes["text-leading"], out float tl))
                    Text.Textleading = tl;
                if (lContent.Style.Attributes.ContainsKey("paragraph-gap") && float.TryParse(lContent.Style.Attributes["paragraph-gap"], out float pg))
                    Text.Paragraphgap = pg;
            }

            if (lContent.Attributes.ContainsKey("name"))
                Text.Text = lContent.Attributes["name"];
            else if (lContent.Attributes.ContainsKey("value"))
                Text.Text = lContent.Attributes["value"];

            if (lContent.Attributes.ContainsKey("format"))
                Text.Format = lContent.Attributes["format"];
        }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        public override AbstractContent Initialize()
        {
            base.Initialize();
            Text = (new URTagText()).Initialize(ReportDesignerDesignerProperties.Instance);
            return this;
        }
    }
}
