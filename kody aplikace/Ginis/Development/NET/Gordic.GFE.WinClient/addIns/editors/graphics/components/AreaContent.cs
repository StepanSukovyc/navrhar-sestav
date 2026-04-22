//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.AreaContent.cs                </Name>
//    <Description> příloha sestav                                              </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2026                            </Copyright>
//    <Created>     2014-03-10                                                  </Created>
//  </FileHeader>
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Drawing.Design;
using System.Drawing.Drawing2D;
using System.Linq;
using System.Xml;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.Parsers.Hosting;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.Parsers.Editor;
using Gordic.General;
using Gordic.Report.Implementation;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// příloha sestav
    /// </summary>
    abstract class AreaContent : URAbstractContainer, ITagComponent, IChangeable, IBackground, ICloneable, ISelectable, ICursorHandler
    {
        #region ITagComponent
        /// <summary>
        /// indikuje možnost manipulace s objektem
        /// </summary>
        public bool ReadOnly => false;

        /// <summary>
        /// Pozice objektu v seznamu nadřazeného objketu
        /// </summary>
        [DisplayName("pozice")]
        [Description("Pozice objektu v seznamu vlastníka")]
        public int PropertyOrder { get => Order.Count != 0 ? Order.Last() : 0; set => OnChangeOrdering(Order.Last(), value); }

        /// <summary>
        /// Pozice objektu v seznamu nadřazeného objketu
        /// </summary>
        [Browsable(false)]
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
        /// Typ vybraného objektu
        /// </summary>
        [DisplayName("typ")]
        [Description("Typ obsahu položky")]
        [ReadOnly(true)]
        public ComponentType ComponentType { get; protected set; }

        /// <summary>
        /// Indikace viditelností
        /// </summary>
        [Browsable(false)]
        public bool IsVisible { get => Parent != null; }

        UndoRedo<Parsers.IPage> m_page = new UndoRedo<Parsers.IPage>();
        /// <summary>
        /// Stránka objektu
        /// </summary>
        [Browsable(false)]
        public Parsers.IPage Page
        {
            get
            {
                if (Parent is Parsers.IPage && Parent != m_page.Value)
                    m_page.Value = Parent as Parsers.IPage;

                return Parent != null && (Parent is ITagComponent) ? (Parent as ITagComponent).Page : m_page.Value;
            }
            set { m_page.Value = value; }
        }

        UndoRedo<ISizable> parent = new UndoRedo<ISizable>();
        /// <summary>
        /// Vlastník daného objektu
        /// </summary>
        [Browsable(false)]
        public ISizable Parent { get => parent.Value; set => parent.Value = value; }

        UndoRedo<SizeValue> width = new UndoRedo<SizeValue>();
        /// <summary>
        /// Šířka objektu
        /// </summary>
        [Browsable(false)]
        public SizeValue Width { get => width.Value; set => width.Value = value; }

        UndoRedo<SizeValue> height = new UndoRedo<SizeValue>();
        /// <summary>
        /// Výška objektu
        /// </summary>
        [Browsable(false)]
        public SizeValue Height { get => height.Value; set => height.Value = value; }

        UndoRedo<SizeValue> left = new UndoRedo<SizeValue>();
        /// <summary>
        /// Pozice zleva objektu
        /// </summary>
        [Browsable(false)]
        public SizeValue Left { get => left.Value; set => left.Value = value; }
        void OnLeftChanged(int diff)
        {
            if (isChanging)
                foreach (var item in this)
                    if (item is IChangeable changeable)
                        changeable.ChangeLocation(diff, 0);
        }

        UndoRedo<SizeValue> top = new UndoRedo<SizeValue>();
        /// <summary>
        /// Pozice shora objektu
        /// </summary>
        [Browsable(false)]
        public SizeValue Top { get => top.Value; set => top.Value = value; }

        /// <summary>
        /// indikuje změnu výšky
        /// </summary>
        [Browsable(false)]
        public virtual bool IsHeightChanged => false;

        /// <summary>
        /// veličina zvětšení
        /// </summary>
        [Browsable(false)]
        public float Zoom => Page?.Zoom ?? 1f;

        /// <summary>
        /// Šířka včetně zoom hodnoty
        /// </summary>
        [Browsable(false)]
        public float WidthZoom => Width * Zoom;
        /// <summary>
        /// Výška včetně zoom hodnoty
        /// </summary>
        [Browsable(false)]
        public float HeightZoom => Height * Zoom;
        /// <summary>
        /// Pozice zleva - včetně Zoom hodnoty
        /// Je to vůči panelu
        /// </summary>
        [Browsable(false)]
        public float LeftZoom
        {
            get => Parent is ICell
                ? Left * Zoom
                : ((Page != null ? (Left + Page.MarginLeft) : Left) * Zoom + ReportDesignerProperties.Instance.PageLeft);
        }
        /// <summary>
        /// Pozice shora - včetně Zoom hodnoty
        /// </summary>
        [Browsable(false)]
        public float TopZoom { get => Parent is ICell ? Top * Zoom : (Top + Page.MarginTop) * Zoom + Page.TopZoom; }

        /// <summary>
        /// Ohraničení elementu
        /// </summary>
        [Browsable(false)]
        public RectangleF BoundsInPixels => new RectangleF(LeftZoom, TopZoom, WidthZoom, HeightZoom);
        /// <summary>
        /// Oblast obsahu - je to BoundsInPixels bez odsazení
        /// </summary>
        [Browsable(false)]
        public RectangleF ContentBounds
        {
            get
            {
                float zoom = GraphicSettingService.Zoom;
                return new RectangleF(
                    LeftZoom + Padding.LeftPixels * zoom,
                    TopZoom + Padding.TopPixels * zoom,
                    WidthZoom - (Padding.LeftPixels + Padding.RightPixels) * zoom,
                    HeightZoom - (Padding.TopPixels + Padding.BottomPixels) * zoom);
            }
        }

        UndoRedo<GFEAttrList> attrlist = new UndoRedo<GFEAttrList>();
        /// <summary>
        /// Všechny atributy objektu
        /// </summary>
        [DisplayName("atributy")]
        [Description("Všechny atributy objektu")]
        [EditorAttribute(typeof(AttributeListEditor), typeof(UITypeEditor))]
        public GFEAttrList AttrList { get => attrlist.Value; set => attrlist.Value = value; }

        /// <summary>
        /// Známě značky regionu
        /// </summary>
        [Browsable(false)]
        public virtual List<string> KnownTags { get => null; }

        /// <summary>
        /// Neznámé značky buňky
        /// </summary>
        [Browsable(false)]
        public Dictionary<string, string> Unknowns { get => AttrList?.FindAllByKey(attr => !KnownTags.Contains(attr)); }

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
        /// 
        /// </summary>
        [Browsable(false)]
        public string PSType => null;

        /// <summary>
        /// 
        /// </summary>
        [Browsable(false)]
        public bool CanBeSameANested => false;

        /// <summary>
        /// typ objektu
        /// </summary>
        [Browsable(false)]
        public bool IsInStyle => false;

        UndoRedo<URTagText> text = new UndoRedo<URTagText>();
        /// <summary>
        /// Textový objekt regionu
        /// </summary>
        [DisplayName("text")]
        [Browsable(false)]
        virtual public URTagText Text { get => text.Value; set => text.Value = value; }

        UndoRedo<IComplexSurround> surround = new UndoRedo<IComplexSurround>();
        /// <summary>
        /// Rámeček
        /// </summary>
        [Browsable(false)]
        public IComplexSurround Surround { get => surround.Value; set => surround.Value = value; }

        UndoRedo<IInnerSurround> innersurround = new UndoRedo<IInnerSurround>();
        /// <summary>
        /// Rámeček
        /// </summary>
        [Browsable(false)]
        public IInnerSurround InnerSurround { get => innersurround.Value; set => innersurround.Value = value; }

        UndoRedo<IComplexFive> padding = new UndoRedo<IComplexFive>();
        /// <summary>
        /// Odsazení textu
        /// </summary>
        [DisplayName("odsazení textu")]
        [Description("Odsazení textu uvnitř objektu")]
        [Browsable(false)]
        public IComplexFive Padding { get => padding.Value; set => padding.Value = value; }

        UndoRedo<IComplexFive> spacing = new UndoRedo<IComplexFive>();
        /// <summary>
        /// Odsazení rámečku
        /// </summary>
        [DisplayName("odsazení rámečku")]
        [Description("Odsazení rámečku uvnitř objektu")]
        [Browsable(false)]
        public IComplexFive Spacing { get => spacing.Value; set => spacing.Value = value; }

        UndoRedo<GFEScriptList> scripts = new UndoRedo<GFEScriptList>();
        /// <summary>
        /// Dostupné skripty objektu
        /// </summary>
        [DisplayName("skripty")]
        [Description("Dostupné skripty objektu")]
        [EditorAttribute(typeof(ScriptListEditor), typeof(UITypeEditor))]
        [Browsable(false)]
        public GFEScriptList Scripts { get => scripts.Value; set => scripts.Value = value; }

        UndoRedo<bool> anchor = new UndoRedo<bool>();
        /// <summary>
        /// Kotva objektu
        /// </summary>
        [DisplayName("kotva")]
        [Description("Indikuje, zda objekt je ukotven nebo není. V případě ukotvení objekt nelze měnit")]
        [TypeConverter(typeof(BooleanTypeConverter))]
        public bool Anchor { get => anchor.Value; set => anchor.Value = value; }

        /// <summary>
        /// Služba výběru objektů
        /// </summary>
        [Browsable(false)]
        public SelectionService ServiceSelection => (Page as URAbstractPage)?.ServiceSelection;

        /// <summary>
        /// Načtení informaci o objektu z formátu objektu
        /// </summary>
        virtual public void LoadInformation() { }

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

            if (Anchor)
                TagService.DrawTagAnchor(graphics, BoundsInPixels);

            if (_BackObject != null)
                TagService.PaintTag(_BackObject, graphics, args);

            this.ForEach(tag => tag != null && tag != _BackObject, TagService.PaintTag, graphics, args);

            if (IsTowed)
                using (HatchBrush hBrush = new HatchBrush(HatchStyle.DiagonalBrick, Color.LightBlue, Color.Transparent))
                    graphics.FillRectangle(hBrush, BoundsInPixels);

            graphics.Clip = reg;

            List<int> order = Order;
            if (GraphicSettingService.ShowOrder && order.Count > 0)
                // do pravého horního rohu
                TagService.DrawTagOrder(graphics, new PointF(LeftZoom, TopZoom), Order.Last().ToString(), Zoom);

            if (Page != null)
            {
                if (_BackObject != null)
                {
                    DelayPaintItem itm = Page.DelayPaintList.FirstOrNull(item => item.Equals(_BackObject));
                    if (itm != null)
                        Page.DelayPaintList.Remove(itm);
                }
                Page.DelayPaintList.Add(new DelayPaintItem(this, IsSelected, reg));
            }
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

            _BackObject?.OnPaintBorder(graphics, _BackObject is ISelectable && (_BackObject as ISelectable).IsSelected);

            if (this is ISurroundable)
                TagService.DrawTagFrame(Surround, graphics, new PointF(LeftZoom, TopZoom), new SizeF(WidthZoom, HeightZoom), Zoom, Spacing);

            DrawCorners(graphics, isSelected, _color);
        }

        /// <summary>
        /// Kreslění rohů objektu
        /// </summary>
        /// <param name="graphics">Ovladač kreselní</param>
        /// <param name="isSelected">Indfikator vybranosti objěktu</param>
        /// <param name="color">Barva pro případ vybraného objektu</param>
        protected virtual void DrawCorners(Graphics graphics, bool isSelected, Color color)
        {
            if (isSelected)
                using (SolidBrush drawBrush = new SolidBrush(color))
                {
                    using (Pen pen = new Pen(drawBrush, 3))
                    {
                        pen.DashStyle = DashStyle.Dash;
                        graphics.DrawRectangle(pen, BoundsInPixels.X, BoundsInPixels.Y, BoundsInPixels.Width, BoundsInPixels.Height);

                        Pen cPen = new Pen(new SolidBrush(Color.Black), 1);
                        SolidBrush solidBrush = new SolidBrush(Color.White);
                        //PoradiCtvrcu.a
                        graphics.FillRectangle(solidBrush, new RectangleF(new PointF(LeftZoom - 3, TopZoom - 3), new SizeF(6F, 6F)));
                        PointF pf = new PointF(LeftZoom - 3, TopZoom - 3);
                        graphics.DrawRectangle(cPen, pf.X, pf.Y, 6F, 6F);

                        //PoradiCtvrcu.c
                        graphics.FillRectangle(solidBrush, new RectangleF(new PointF(LeftZoom + BoundsInPixels.Width - 3, TopZoom - 3), new Size(6, 6)));
                        PointF pf1 = new PointF(LeftZoom + BoundsInPixels.Width - 3, TopZoom - 3);
                        graphics.DrawRectangle(cPen, pf1.X, pf1.Y, 6F, 6F);

                        //PoradiCtvrcu.f
                        graphics.FillRectangle(solidBrush, new RectangleF(new PointF(LeftZoom - 3, TopZoom + BoundsInPixels.Height - 3), new Size(6, 6)));
                        PointF pf2 = new PointF(LeftZoom - 3, TopZoom + BoundsInPixels.Height - 3);
                        graphics.DrawRectangle(cPen, pf2.X, pf2.Y, 6F, 6F);

                        //PoradiCtvrcu.h
                        graphics.FillRectangle(solidBrush, new RectangleF(new PointF(LeftZoom + BoundsInPixels.Width - 3, TopZoom + BoundsInPixels.Height - 3), new Size(6, 6)));
                        PointF pf3 = new PointF(LeftZoom + BoundsInPixels.Width - 3, TopZoom + BoundsInPixels.Height - 3);
                        graphics.DrawRectangle(cPen, pf3.X, pf3.Y, 6F, 6F);
                    }
                }
        }

        /// <summary>
        /// uložení obsahu řádku do <paramref name="xmlElement"/>
        /// </summary>
        /// <param name="xmlElement">daný XML element, do kterého se vkládá obsah</param>
        /// <param name="xmlDoc">výsledný dokument</param>
        /// <param name="styles">seznam již dostupných stylů</param>
        /// <param name="withRect"></param>
        virtual public void SetXmlData(XmlElement xmlElement, XmlDocumentPosition xmlDoc, List<GFEList> styles, bool withRect = true)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Metoda vracení XML struktury samotného elementu (bez STYLE)
        /// </summary>
        /// <param name="xmlDoc">Dokument, do kterého se struktura vkládá</param>
        /// <param name="xmlStyles">Seznam nadřazených stylů</param>
        /// <param name="withRect"></param>
        /// <param name="regionFullName">Úplný název aktuálního regionu</param>
        /// <returns>Element prezentující daný objekt</returns>
        virtual public XmlElement GetXmlData(XmlDocumentPosition xmlDoc, List<GFEList> xmlStyles, bool withRect = true, string regionFullName = null)
        {
            // vrátíme region
            return null;
        }

        protected GFEFormatTag formatTag;
        /// <summary>
        /// Informace o formátu objektu
        /// </summary>
        [Browsable(false)]
        public virtual GFEFormatTag FormatTag { get => formatTag; set => formatTag = value; }
        #endregion

        #region IChangeable
        bool isChanging;
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
            isChanging = true;
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
            isChanging = false;
            // projdeme všechny vnořené objekty a posuneme je o dané hodnoty
            foreach (var item in this)
                if (item is IChangeable changeable)
                    if ((item is ISelectable selectable && !selectable.IsSelected)
                        || !(item is ISelectable))
                        changeable.ChangeLocation(xdiff, ydiff);
        }
        /// <summary>
        /// Změna šířky objektu
        /// </summary>
        /// <param name="diff">velikost potřebné změny</param>
        public void SetWidthByLeftSide(float diff)
        {
            if (diff != 0)
            {
                Left += diff;
                Width -= diff;

                if (Width < 0)
                    Width = new SizeValue(0, this.Width.Metrics, this.Width.PC100);

                if (Parent is ICell && (Parent as ICell).Line != null)
                    ((Parent as ICell).Line as ILine).ItemLeftChanged(Parent as ICell, diff);
            }
        }
        /// <summary>
        /// Změna šířky objektu
        /// </summary>
        /// <param name="diff">velikost potřebné změny</param>
        public void SetWidthByRightSide(float diff)
        {
            if (diff != 0)
            {
                ILine line = Parent is ICell cell ? cell.Line : (Parent as ILine);

                if (line != null)
                {
                    ICell icell = line?.FirstOrDefault(cl => !cl.IsComment && cl.Index > (Parent as ICell).Index && (cl as UndoRedoList<ITagComponent>).Exists(itm => itm is IChangeable));
                    IChangeable changeable = icell != null ? (icell as IList<ITagComponent>).First(itm => itm is IChangeable) as IChangeable : null;
                    changeable?.SetWidthByLeftSide(diff);
                }
                else
                    Width += diff;
            }
        }
        /// <summary>
        /// změna pozice a velikosti řádku tažením za horní okraj 
        /// </summary>
        /// <param name="diff">hodnota změny velikosti</param>
        public void SetHeightByTopSide(float diff)
        {
            if (diff != 0 && !(Parent is ICell))
            {
                Top += diff;
                Height -= diff;
            }
        }
        /// <summary>
        /// změna pozice a velikosti řádku tažením za horní okraj 
        /// </summary>
        /// <param name="diff">hodnota změny velikosti</param>
        public void SetHeightByBottomSide(float diff)
        {
            if (diff != 0)
                Height += diff;
        }
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
        public IComplexColor BackColor { get => backcolor.Value; set => backcolor.Value = value; }

        UndoRedo<BackgroundImage> backimage = new UndoRedo<BackgroundImage>();
        /// <summary>
        /// Obrázek pozadí
        /// </summary>
        [Category("Pozadí")]
        [DisplayName("obrázek")]
        [Description("Obrázek pozadí, který může sloužit jako podklad (šablona)")]
        public BackgroundImage BackImage { get => backimage.Value; set => backimage.Value = value; }

        UndoRedo<ImageStretch> backimagestretch = new UndoRedo<ImageStretch>();
        /// <summary>
        /// chování se obrázku pozadí
        /// </summary>
        [Category("Pozadí")]
        [DisplayName("roztažení")]
        [Description("Chování se obrázku pozadí")]
        public virtual ImageStretch BackImageStretch { get => backimagestretch.Value; set => backimagestretch.Value = value; }

        UndoRedo<bool> showbackground = new UndoRedo<bool>();
        /// <summary>
        /// Indikuje zobrazení pozadí
        /// </summary>
        [Category("Pozadí")]
        [DisplayName("zobrazit")]
        [Description("Indikuje zobrazení pozadí")]
        [TypeConverter(typeof(BooleanTypeConverter))]
        public bool ShowBackground { get => showbackground.Value; set => showbackground.Value = value; }
        #endregion

        #region ICursorHandler
        /// <summary>
        /// Povolená změna vzhledu kurzóru
        /// </summary>
        [Browsable(false)]
        public bool EnableCursor { get => !Anchor; }
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

        #region ISelectable
        /// <summary>
        /// Indikuje, že objekt je vybrán
        /// </summary>
        [Browsable(false)]
        public bool IsSelected { get => ServiceSelection == null ? false : ServiceSelection.GetComponentSelected(this); }
        #endregion

        #region ICloneable
        /// <summary>
        /// Creates a new object that is a copy of the current instance
        /// </summary>
        /// <returns>A new object that is a copy of this instance.</returns>
        abstract public object Clone();
        #endregion

        #region AbstractContainer
        /// <summary>
        /// Přidání položky bočního panelu
        /// </summary>
        /// <param name="info">Přidávaná položka</param>
        /// <param name="e">data o myší</param>
        /// <param name="type">Typ vkládané komponenty</param>
        /// <param name="format">Formát sestavy</param>
        public override IComponent CreateItem(dynamic info, MouseEventArgs e, ComponentType type, GFEFormat format = null) =>
            CreateObject(Page.GetInsertPoint(e.X, e.Y), Page, info, type, format);

        /// <summary>
        /// Vytvoření nového objektu 'region' na zadaném umístění
        /// </summary>
        /// <param name="insertPoint">Levý-horní roh nového regionu - zkorigovaný dle ZOOM hodnoty</param>
        /// <param name="page">Stránka, do které se objekt vkládá</param>
        /// <param name="info">Položka bočního panelu s informaci o vkládaném objektu</param>
        /// <param name="type">Typ přidávané položky</param>
        /// <param name="format">Formát sestavy</param>
        public override IComponent CreateObject(PointF insertPoint, Parsers.IPage page, dynamic info, ComponentType type, GFEFormat format = null) =>
             LocalCommonService.CreateObject(this, insertPoint, page, info, type);

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
                PointF pt = Page.GetInsertPoint((int)e.X, (int)e.Y);
                (obj as ITagComponent).Left = new SizeValue(pt.X, (obj as ITagComponent).Left.Metrics);
                (obj as ITagComponent).Top = new SizeValue(pt.Y, (obj as ITagComponent).Top.Metrics);
            }
            else
            {
                (obj as ITagComponent).Left += e.X;
                (obj as ITagComponent).Top += e.Y;
            }

            (obj as ITagComponent).Page = Page;
            Add(obj as ITagComponent);
        }
        /// <summary>
        /// Metoda Pře indexace vnořených objektů 
        /// </summary>
        public override void Reindex()
        {
            int index = 0, old;
            bool moveTo;
            while (index < this.Count)
            {
                moveTo = false;
                for (int i = index + 1; i < this.Count; i++)
                {
                    if (this[i] is AbstractContent || this[i] is AreaContent)
                        if (this[i].Top < this[index].Top || (this[i].Top == this[index].Top && this[i].Left < this[index].Left))
                            if (this[i] is AbstractContent)
                            {
                                old = (this[i] as AbstractContent).PropertyOrder;
                                (this[i] as AbstractContent).PropertyOrder = index;
                                // posun pouze v případě, že indexy jsou různé
                                moveTo = old != (this[i] as AbstractContent).PropertyOrder;
                            }
                            else
                            {
                                old = (this[i] as AreaContent).PropertyOrder;
                                (this[i] as AreaContent).PropertyOrder = index;
                                // posun pouze v případě, že indexy jsou různé
                                moveTo = old != (this[i] as AreaContent).PropertyOrder;
                            }
                    // fixace řazení 
                    if (this[i] is IItemContainer)
                        (this[i] as IItemContainer).Reindex();
                }
                if (!moveTo)
                    index++;
            }
        }
        #endregion

        #region PropertyISizable Helpers
        /// <summary>
        /// Helper metoda pro nastavení SizeValue z textové hodnoty s validací
        /// </summary>
        /// <param name="currentValue">Aktuální hodnota</param>
        /// <param name="newValue">Nová textová hodnota</param>
        /// <param name="validatorFunc">Validační funkce (IsWidthValidFormat nebo IsHeightValidFormat)</param>
        /// <param name="errorResourceId">ID resource pro chybovou hlášku</param>
        /// <param name="pc100">PC100 hodnota (pouze pro Width)</param>
        /// <returns>Nová SizeValue nebo null pokud validace selhala</returns>
        SizeValue SetSizeValueFromString(SizeValue currentValue, string newValue, Func<string, bool> validatorFunc, int errorResourceId, float? pc100 = null)
        {
            if (string.IsNullOrEmpty(newValue))
            {
                MessageService.ShowErrorFormatted(GResources.GetResourceText(errorResourceId), newValue);
                return currentValue;
            }

            if (newValue.StartsWith("-"))
                newValue = "0mm";

            if (currentValue.IsEmpty && validatorFunc(newValue))
                return new SizeValue(newValue);

            switch (newValue.ToLowerInvariant())
            {
                case "pc":
                case "%":
                    MessageService.ShowMessage(GResources.GetResourceText(29451437));
                    return currentValue;

                case "mm":
                case "tw":
                    return pc100.HasValue 
                        ? new SizeValue(UnitConverter.ConvertTo(currentValue, newValue), pc100.Value)
                        : new SizeValue(UnitConverter.ConvertTo(currentValue, newValue));

                default:
                    if (validatorFunc(newValue))
                        return pc100.HasValue 
                            ? new SizeValue(newValue, pc100.Value)
                            : new SizeValue(newValue);

                    MessageService.ShowErrorFormatted(GResources.GetResourceText(errorResourceId), newValue);
                    return currentValue;
            }
        }
        #endregion

        #region PropertyISizable
        /// <summary>
        /// Šířka objektu
        /// </summary>
        [Category("Pozice a velikost")]
        [DisplayName("šířka")]
        [Description("Šířka objektu")]
        [TypeConverter(typeof(_StringSizeValueConverter))]
        public string PWidth
        {
            get => !Width.IsEmpty ? Width.MathRoundValue(2) : null;
            set => Width = SetSizeValueFromString(Width, value, UnitConverter.IsWidthValidFormat, 29451436, Width.PC100);
        }
        /// <summary>
        /// Výška objektu
        /// </summary>
        [Category("Pozice a velikost")]
        [DisplayName("výška")]
        [Description("Výška objektu")]
        [TypeConverter(typeof(_StringSizeValueConverter))]
        public string PHeight
        {
            get => Height.MathRoundValue(2);
            set => Height = SetSizeValueFromString(Height, value, UnitConverter.IsHeightValidFormat, 29451438);
        }
        /// <summary>
        /// Šířka objektu
        /// </summary>
        [Category("Pozice a velikost")]
        [DisplayName("zleva")]
        [Description("Pozice zleva objektu")]
        [TypeConverter(typeof(_StringSizeValueConverter))]
        public string PLeft
        {
            get => !Left.IsEmpty ? Left.MathRoundValue(2) : null;
            set => Left = SetSizeValueFromString(Left, value, UnitConverter.IsHeightValidFormat, 29451439);
        }
        /// <summary>
        /// Šířka objektu
        /// </summary>
        [Category("Pozice a velikost")]
        [DisplayName("shora")]
        [Description("Pozice shora objektu")]
        [TypeConverter(typeof(_StringSizeValueConverter))]
        public string PTop
        {
            get => !Top.IsEmpty ? Top.MathRoundValue(2) : null;
            set => Top = SetSizeValueFromString(Top, value, UnitConverter.IsHeightValidFormat, 29451440);
        }
        #endregion

        #region Společné metody a vlastnosti
        /// <summary>
        /// kvůli typu
        /// </summary>
        [Browsable(false)]
        public IPagePanel PagePanel => Page?.PagePanel as IPagePanel;

        /// <summary>
        /// indikace pohybu myši nad objektem
        /// </summary>
        [Browsable(false)]
        protected virtual bool IsTowed
        {
            get
            {
                bool towed = false;
                if (PagePanel.IsDragOver
                    && BoundsInPixels.Contains(PagePanel.DragPoint))
                {
                    List<IComponent> comps = SearchComponent(PagePanel.DragPoint);
                    IComponent closestComponent = comps
                        .Where(itm => itm.GetType() == GetType() && !ServiceSelection.SelectedComponents.Contains(itm))
                        .OrderByDescending(itm => itm is IOrder order ? order.Order.Count : 0)
                        .FirstOrDefault();

                    towed = closestComponent == this;
                }

                ThreadService.SafeThreadAsyncCall(delegate
                {
                    if (towed)
                        TowedService.TowedComponent = this;
                    else if (TowedService.TowedComponent == this)
                        TowedService.TowedComponent = this.Parent as URAbstractContainer;
                });

                return towed;
            }
        }

        /// <summary>
        /// objekt pozadí.
        /// je kvůli tomu, aby se kreslil jinák a hlavně aby byl pořád "na pozadí".
        /// je užitečný při nastavení barvy pozadí a ohraničení.
        /// je navržen tak, aby "nevadil" návrhu.
        /// </summary>
        [Browsable(false)]
        protected ITagComponent _BackObject
        {
            get
            {
                if (Count != 0)
                {
                    ITagComponent comp = this.First();
                    if (comp is ISurroundable && comp is ITextHandler && ((comp as ITextHandler).Text == null || string.IsNullOrEmpty((comp as ITextHandler).Text.Text)))
                        return comp;
                }
                return null;
            }
        }

        /// <summary>
        /// Vymazání rámečku indikujícího, že daný objekt je aktivní
        /// </summary>
        /// <param name="graphics">Kreslící nástroj</param>
        protected void DrawClear(Graphics graphics)
        {
            if (BackColor.Color != Color.Transparent && ShowBackground)
                // uživatelsky daná barva stránky
                graphics.FillRectangle(new SolidBrush(BackColor.Color), BoundsInPixels);

            //Pokud obrázek pozadí není dán, pak není co řešit
            if (BackImage == null || BackImage.Image == null)
                return;

            Image _backImg = new Bitmap(BackImage.Image);
            _backImg.RotateFlip((RotateFlipType)BackImage.Rotate);

            if (BackImage.Stretch)
                graphics.DrawImage(_backImg, BoundsInPixels);
            else
                graphics.DrawImage(_backImg, new Rectangle(new Point((int)BoundsInPixels.X, (int)BoundsInPixels.Y), new Size((int)BoundsInPixels.Width, (int)BoundsInPixels.Height)), 0, 0, WidthZoom, HeightZoom, GraphicsUnit.Pixel);
        }
        #endregion

        UndoRedo<string> labeltext = new UndoRedo<string>();
        /// <summary>
        /// štítek symbolů
        /// </summary>
        [Category("Text")]
        [DisplayName("štítek")]
        [Description("Štítek objektu")]
        public string LabelText { get => labeltext.Value; set => labeltext.Value = value; }

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        public AreaContent() { }

        void OnChangeOrdering(int oldOrder, int newOrder)
        {
            if (newOrder >= (Parent as URAbstractContainer).Count)
            {
                int maxValue = (Parent as URAbstractContainer).Count - 1;
                MessageService.ShowWarningFormatted($"{GResources.GetResourceText(29450044)} '{{0}}' {GResources.GetResourceText(29450045)}\n{GResources.GetResourceText(29450046)} '{{1}}'!", newOrder, maxValue); //RC 29450046 : Maximální hodnota může být
                return;
            }

            if (!UndoRedoService.IsTransactionStarted)
                UndoRedoService.StartTransaction(GResources.GetResourceText(29450047)); //RC 29450047 : změna pořadí
            (Parent as URAbstractContainer).MoveFromTo(oldOrder, newOrder);
            UndoRedoService.Commit();
        }

        /// <summary>
        /// inicializace třídy
        /// </summary>
        public override void Initialize()
        {
            base.Initialize();

            Text = new URTagText();
            Text.Initialize();
            BackColor = new URComplexColor().Initialize(ColorService.ComplexTransparent);
            AttrList = new GFEAttrList(UndoRedoService.Manager);
            Scripts = new GFEScriptList(UndoRedoService.Manager);

            Spacing = new URComplexSpacing();
            Spacing.SetValue(0, Grr06Metrics.Unspec, 1);
            Spacing.SetValue(0, Grr06Metrics.Unspec, 2);
            Spacing.SetValue(0, Grr06Metrics.Unspec, 3);
            Spacing.SetValue(0, Grr06Metrics.Unspec, 4);

            Padding = new URComplexPadding();
            Padding.SetValue(5, Grr06Metrics.Unspec, 1);
            Padding.SetValue(5, Grr06Metrics.Unspec, 2);
            Padding.SetValue(5, Grr06Metrics.Unspec, 3);
            Padding.SetValue(5, Grr06Metrics.Unspec, 4);
            Surround = new URComplexSurround().Initialize();
            InnerSurround = new URInnerSurround().Initialize();

            Anchor = false;
        }

        /// <summary>
        /// inicializace objektu dle položky
        /// </summary>
        /// <param name="item">položka analýzeru</param>
        public virtual void Initialize(GFEFormatTag item)
        {
            Initialize();
            formatTag = item;
        }

        /// <summary>
        /// inicializace objektu dle položky
        /// </summary>
        /// <param name="sen">položka struktury</param>
        public virtual void Initialize(StructExtNode sen) { Initialize(); }

        /// <summary>
        /// indikuje, že objekt je v režimu načtení
        /// </summary>
        protected bool isLoading;

        #region Initialize Helpers
        /// <summary>
        /// Inicializace základních vlastností z klonu
        /// </summary>
        void InitializeSizable(object clone)
        {
            if (!(clone is ISizable sizable))
                return;

            Left = sizable.Left;
            Top = sizable.Top;
            Width = sizable.Width;
            Height = sizable.Height;
        }

        /// <summary>
        /// Inicializace atributů z klonu
        /// </summary>
        void InitializeAttributes(object clone)
        {
            if (clone is IAttributeHandler attributeHandler && this is IAttributeHandler thisHandler)
                thisHandler.AttrList = (GFEAttrList)attributeHandler.AttrList.Clone();
        }

        /// <summary>
        /// Inicializace rámečků (Surround) z klonu
        /// </summary>
        void InitializeSurround(object clone)
        {
            if (!(clone is ISurroundable surroundable) || !(this is ISurroundable thisSurroundable))
                return;

            var constructorTypes = new[] { surroundable.Surround.GetType() };
            var constructor = surroundable.Surround.GetType().GetConstructor(constructorTypes);

            if (constructor != null)
            {
                thisSurroundable.Surround = constructor.Invoke(new object[] { surroundable.Surround }) as IComplexSurround;
                thisSurroundable.InnerSurround = constructor.Invoke(new object[] { surroundable.InnerSurround }) as IInnerSurround;
            }
        }

        /// <summary>
        /// Inicializace kotvy z klonu
        /// </summary>
        void InitializeAnchor(object clone)
        {
            if (clone is IAnchored anchored && this is IAnchored thisAnchored)
                thisAnchored.Anchor = anchored.Anchor;
        }

        /// <summary>
        /// Inicializace pozice z klonu
        /// </summary>
        void InitializePosition(object clone)
        {
            if (clone is IPositionHandler positionHandler && this is IPositionHandler thisHandler)
            {
                thisHandler.StartPosition = positionHandler.StartPosition;
                thisHandler.EndPosition = positionHandler.EndPosition;
            }
        }

        /// <summary>
        /// Inicializace skriptů z klonu
        /// </summary>
        void InitializeScripts(object clone)
        {
            if (clone is IScriptHandler scriptHandler && this is IScriptHandler thisHandler)
                thisHandler.Scripts = (GFEScriptList)scriptHandler.Scripts.Clone();
        }

        /// <summary>
        /// Inicializace Padding a Spacing z klonu
        /// </summary>
        void InitializePaddingSpacing(object clone)
        {
            if (!(clone is ITagComponent tagComponent) || !(this is ITagComponent thisTag))
                return;

            thisTag.Padding = (IComplexFive)Activator.CreateInstance(tagComponent.Padding.GetType());
            thisTag.Padding.Initialize(tagComponent.Padding);

            thisTag.Spacing = (IComplexFive)Activator.CreateInstance(tagComponent.Spacing.GetType());
            thisTag.Spacing.Initialize(tagComponent.Spacing);

            thisTag.Page = tagComponent.Page;
        }

        /// <summary>
        /// Inicializace textu z klonu
        /// </summary>
        void InitializeText(object clone)
        {
            if (!(this is ITextHandler thisTextHandler) || !(clone is ITextHandler textHandler))
                return;

            thisTextHandler.Text = (ITagText)Activator.CreateInstance(textHandler.Text.GetType());
            thisTextHandler.Text.Initialize(textHandler.Text, true, true);
        }

        /// <summary>
        /// Inicializace pozadí z klonu
        /// </summary>
        void InitializeBackground(object clone)
        {
            if (!(clone is IBackground background) || !(this is IBackground thisBackground))
                return;

            thisBackground.BackColor = ((IComplexColor)Activator.CreateInstance(background.BackColor.GetType())).Initialize(background.BackColor);
            thisBackground.ShowBackground = background.ShowBackground;

            if (background.BackImage != null)
                thisBackground.BackImage = new BackgroundImage(background.BackImage);
        }

        /// <summary>
        /// Inicializace kreslení (Drawing) z klonu
        /// </summary>
        void InitializeDrawing(object clone)
        {
            if (!(clone is IDrawing drawing) || !(this is IDrawing thisDrawing))
                return;

            thisDrawing.Edge = drawing.Edge;
            thisDrawing.Fill = drawing.Fill;
            thisDrawing.Gap = drawing.Gap;
            thisDrawing.Angle = drawing.Angle;
            thisDrawing.Shape = drawing.Shape;
        }

        /// <summary>
        /// Inicializace XML obsahu z klonu
        /// </summary>
        void InitializeXmlContent(object clone)
        {
            if (clone is IXMLContent xmlContent && this is IXMLContent thisXml)
                thisXml.InnerText = xmlContent.InnerText;
        }

        /// <summary>
        /// Inicializace obrázku z klonu
        /// </summary>
        void InitializeImage(object clone)
        {
            if (!(clone is IImage image) || !(this is IImage thisImage))
                return;

            thisImage.ContentImageHeight = new SizeValue(image.ContentImageHeight);
            thisImage.ContentImageWidth = new SizeValue(image.ContentImageWidth);
            thisImage.Global = image.Global;
            thisImage.WidthSizeType = image.WidthSizeType;
            thisImage.HeightSizeType = image.HeightSizeType;
            thisImage.ImageFileName = image.ImageFileName;
        }

        /// <summary>
        /// Inicializace datové položky z klonu
        /// </summary>
        void InitializeDataItem(object clone)
        {
            if (!(clone is IDataItem dataItem) || !(this is IDataItem thisDataItem))
                return;

            thisDataItem.DataDescription = dataItem.DataDescription;
            thisDataItem.DataTitle = dataItem.DataTitle;
        }

        /// <summary>
        /// Inicializace RD argumentů z klonu
        /// </summary>
        void InitializeRDArgument(object clone)
        {
            if (clone is IRDArgumentHandler rdArgument && this is IRDArgumentHandler thisRD)
                thisRD.Edit = rdArgument.Edit;
        }

        /// <summary>
        /// Inicializace komentáře z klonu
        /// </summary>
        void InitializeComment(object clone)
        {
            if (!(clone is IComment comment) || !(this is IComment thisComment))
                return;

            thisComment.CommentText = comment.CommentText;
            thisComment.TagName = comment.TagName;
        }
        #endregion

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clone"></param>
        /// <returns></returns>
        public virtual AreaContent Initialize(object clone)
        {
            // Volání všech helper metod
            InitializeSizable(clone);
            InitializeAttributes(clone);
            InitializeSurround(clone);
            InitializeAnchor(clone);
            InitializePosition(clone);
            InitializeScripts(clone);
            InitializePaddingSpacing(clone);
            InitializeText(clone);
            InitializeBackground(clone);
            InitializeDrawing(clone);
            InitializeXmlContent(clone);
            InitializeImage(clone);
            InitializeDataItem(clone);
            InitializeRDArgument(clone);
            InitializeComment(clone);

            return this;
        }
        /// <summary>
        /// Inicializace objektu z informací o formátu objektu
        /// </summary>
        /// <param name="page">stránka regionu</param>
        /// <param name="pParent">Vlastnik objektu</param>
        public virtual void Load(Parsers.IPage page, ISizable pParent = null)
        {
            isLoading = true;
            Initialize();

            if (page != null) Page = page;
            if (pParent != null) Parent = pParent;

            if (FormatTag != null)
            {
                AttrList.AddRange(FormatTag.Attributes);
                AttrList.SynchronizeByOrigin();
            }
            LoadInformation();
            isLoading = false;
        }

        /// <exclude/>
        public void SetXmlAttribute(XmlElement xmlElement)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Změna pozici kontajneru
        /// </summary>
        /// <param name="oldPosition">Stará pozice</param>
        /// <param name="newPosition">Nová pozice</param>
        /// <param name="zoom">Faktor zvětšení</param>
        public virtual void ChangeLocation(RectangleF oldPosition, RectangleF newPosition, float zoom)
        {
            //Projdeme všechny vnitřní objekty a změníme jim pozice
            foreach (ITagComponent c in this)
            {
                //Fixace stavu ukotvení
                bool _kotva = c.Anchor;

                //Odemknuti ukotveni pro možnost modifikace pozic
                c.Anchor = false;

                //Fixace starých pozic (pro případ, že daný objekt je regionem)
                RectangleF _oldValue = c.BoundsInPixels;

                //Změna pozic na nové
                c.Left += (newPosition.Left - oldPosition.Left) / zoom;
                c.Top += (newPosition.Top - oldPosition.Top) / zoom;

                //Je-li daný objekt kontejner, pak je zapotřebí poměnit pozice všech vnitřních objektů
                if (c is AreaContent)
                    (c as AreaContent).ChangeLocation(_oldValue, c.BoundsInPixels, zoom);

                //Vrácení ukotvení do původního stavu
                c.Anchor = _kotva;
            }
        }

        /// <summary>
        /// Vložení objektu do oblasti
        /// </summary>
        /// <param name="obj"></param>
        internal void InsertTagComponent(object obj)
        {
            (obj as ITagComponent).Page = Page;
            Add(obj as ITagComponent);
        }
    }
}
