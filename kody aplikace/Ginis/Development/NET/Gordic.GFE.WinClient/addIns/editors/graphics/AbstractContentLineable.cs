//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.AbstractContentLineable.cs             </Name>
//    <Description> třída GRR sestav                                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-05-16                                                  </Created>
//  </FileHeader>

using System;
using System.ComponentModel;
using System.Drawing;
using System.Drawing.Design;
using System.Xml;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.Designer.Gui;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// třída GRR sestav
    /// </summary>
    abstract class AbstractContentLineable : AbstractContent, ISizeHandler, IGRR, ITowedHandler, IKeyActionHandler
    {
        #region AbstractContent
        /// <summary>
        /// Pozice zleva - včetně Zoom hodnoty
        /// Je to vůči panelu
        /// </summary>
        [Browsable(false)]
        public override float LeftZoom { get => Left * Zoom + (Page != null ? Page.GraphDiffLeft : 0); }
        /// <summary>
        /// Pozice shora - včetně Zoom hodnoty
        /// </summary>
        [Browsable(false)]
        public override float TopZoom { get => (Parent is IGRRCell ? (Parent as IGRRCell).TopZoom : 0); }

        /// <summary>
        /// Stránka objektu
        /// </summary>
        [Browsable(false)]
        public override IPage Page { get => m_page.Value; set => m_page.Value = value; }
        #endregion

        #region ISizeHandler
        /// <summary>
        /// šířka obsahu
        /// </summary>
        [Browsable(false)]
        public virtual float ContentWidth { get => Width; }
        /// <summary>
        /// pozice LEFT obsahu
        /// </summary>
        [Browsable(false)]
        public virtual float ContentLeft { get => Left; }

        /// <summary>
        /// nastavení šířky objektů
        /// </summary>
        /// <param name="value">nová šířka</param>
        public virtual void ChangeWidth(float value)
        {
            this.Width = new SizeValue(value, Width.Metrics);
        }
        /// <summary>
        /// Změna pozice zleva objektu
        /// </summary>
        /// <param name="value">Nová pozice zleva</param>
        public virtual void ChangeLeft(float value)
        {
            this.Left = new SizeValue(value);
        }
        /// <summary>
        /// Změna výšky vybraných objektů
        /// </summary>
        public virtual void SetHeight()
        {
            SetHeightByContent();
        }
        /// <summary>
        /// nastavení TOP pozice objektů
        /// </summary>
        /// <param name="value">nová pozice</param>
        public virtual void ChangeTop(float value) { }
        #endregion

        #region IGRR
        /// <summary>
        /// řádek objektu
        /// </summary>
        [DisplayName("řádek")] //RC 29450636 : řádek
        [Description("řádek, kterému patří buňka obsahující daný objekt")] //RC 29450637 : řádek, kterému patří buňka obsahující daný objekt
        [EditorAttribute(typeof(LineEditor), typeof(UITypeEditor))]
        public GrrLine PropertyLine { get => Line as GrrLine; }
        /// <summary>
        /// řádek objektu
        /// </summary>
        [Browsable(false)]
        public IGRRLine Line { get => Parent is IGRRCell ? (Parent as IGRRCell).Line as GrrLine : null; }
        #endregion

        #region ITowedHandler
        /// <summary>
        /// získání objektu pod kurzorem
        /// </summary>
        /// <param name="point">pozice kurzoru vůči stránce</param>
        /// <returns>Objekt, který se nachází bezprostředně pod kurzorem</returns>
        public virtual object GetTowedObject(PointF point)
        {
            return this.BoundsInPixels.Contains(point) ? this : null;
        }
        /// <summary>
        /// pozice objektu <paramref name="item"/> v seznamu
        /// </summary>
        /// <param name="item">objekt, pozice kterého se hledá</param>
        /// <returns>číslo, prezentující pozici objektu <paramref name="item"/> v seznamu daného objektu.</returns>
        public int IndexOf(object item) => -1;
        #endregion

        #region IKeyActionHandler
        /// <exclude/>
        public virtual IComponent GetLeftObject() => Parent != null ? (Parent as IKeyActionHandler).GetLeftObject() : null;
        /// <exclude/>
        public virtual IComponent GetLeftObject(object obj) => Parent != null ? (Parent as IKeyActionHandler).GetLeftObject(obj) : null;
        /// <exclude/>
        public virtual IComponent GetRightObject() => Parent != null ? (Parent as IKeyActionHandler).GetRightObject() : null;
        /// <exclude/>
        public virtual IComponent GetRightObject(object obj) => Parent != null ? (Parent as IKeyActionHandler).GetRightObject(obj) : null;
        /// <exclude/>
        public virtual IComponent GetTopObject() => Parent != null ? (Parent as IKeyActionHandler).GetTopObject() : null;
        /// <exclude/>
        public virtual IComponent GetTopObject(object obj, ISizable sizable) => Parent != null ? (Parent as IKeyActionHandler).GetTopObject(obj, sizable) : null;
        /// <exclude/>
        public virtual IComponent GetBottomObject() => Parent != null ? (Parent as IKeyActionHandler).GetBottomObject() : null;
        /// <exclude/>
        public virtual IComponent GetBottomObject(object obj, ISizable sizable) => Parent != null ? (Parent as IKeyActionHandler).GetBottomObject(obj, sizable) : null;
        #endregion

        /// <summary>
        /// přetížení kvůli zjištění dodatečných nastavení
        /// </summary>
        public override void LoadInformation()
        {
            base.LoadInformation();

            if (FormatTag != null)
                TagService.SetHeightByAttribute(this, FormatTag.Attributes);
            if (Height.Value == null && FormatTag is GFEFormatContent && (FormatTag as GFEFormatContent).Style != null)
                TagService.SetHeightByAttribute(this, (FormatTag as GFEFormatContent).Style.Attributes);
            IsHeightByContent = Height.Value == null;

            if (FormatTag != null)
                TagService.SetWidthByAttribute(this, FormatTag.Attributes);
            if (Width.Value == null && FormatTag is GFEFormatContent && (FormatTag as GFEFormatContent).Style != null)
                TagService.SetWidthByAttribute(this, (FormatTag as GFEFormatContent).Style.Attributes);
            IsWidthByContent = Width.Value == null;
        }

        /// <summary>
        /// se volá v průběhu získávání dat
        /// </summary>
        /// <param name="xmlStyle">Element dokumentu, do kterého se objekt vkládá</param>
        /// <param name="_actualXmlStyle">aktuální styl ze seznamu stylů</param>
        /// <param name="_newXmlStyle">nový styl do seznamu stylů</param>
        protected override void OnSettingData(XmlElement xmlStyle, ref GFEList _actualXmlStyle, ref GFEList _newXmlStyle)
        {
            OnSettingSizeData(xmlStyle);
            base.OnSettingData(xmlStyle, ref _actualXmlStyle, ref _newXmlStyle);
        }
    }

    /// <summary>
    /// rozšíření o další rozhraní
    /// </summary>
    abstract class AbstractTextContentLineable : AbstractContentLineable, ITextHandler, IPropertyGridValue
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
        public URTagTextFont PropertyTextFont
        {
            get => Text != null ? Text.TextFont as URTagTextFont : null;
            set
            {
                Text.TextFont = value;
                if (Line.IsHeightByContent)
                    Line.IsHeightByContent = true;
            }
        }
        /// <summary>
        /// Velikost písma
        /// </summary>
        [Category("Písmo")] //RC 29450612 : Písmo
        [Description("Velikost písma textu")] //RC 29450614 : Velikost písma textu
        [DisplayName("velikost")] //RC 29450615 : velikost
        public string PropertySize
        {
            get => PropertyTextFont != null ? Convert.ToString(PropertyTextFont.Size) : string.Empty;
            set
            {
                PropertyTextFont.Size = new FontSizeValue(value);
                if (Line.IsHeightByContent)
                    Line.IsHeightByContent = true;
            }
        }
        /// <summary>
        /// Řez písma
        /// </summary>
        [Category("Písmo")] //RC 29450612 : Písmo
        [Description("styl (řez) písma")]
        [DisplayName("styl (řez)")]
        public FontStyleEnum PropertyStyle { get => PropertyTextFont != null ? PropertyTextFont.Style : FontStyleEnum.Regular; set => PropertyTextFont.Style = value; }
        /// <summary>
        /// Název písma
        /// </summary>
        [Category("Písmo")] //RC 29450612 : Písmo
        [Description("Název písma")] //RC 29450618 : Název písma
        [DisplayName("název")] //RC 29450467 : název
        [TypeConverter(typeof(ComplexFontFamilyConverter))]
        public IComplexFontFamily PropertyFontFamily
        {
            get => PropertyTextFont?.FontFamily;
            set
            {
                PropertyTextFont.FontFamily = value;
                if (Line.IsHeightByContent)
                    Line.IsHeightByContent = true;
            }
        }
        /// <summary>
        /// Barva písma
        /// </summary>
        [Category("Písmo")] //RC 29450612 : Písmo
        [Description("Barva textu písma")] //RC 29450619 : Barva textu písma
        [DisplayName("barva písma")] //RC 29450620 : barva písma
        [TypeConverter(typeof(ComplexColorConverter))]
        public IComplexColor PropertyForeColor { get => PropertyTextFont?.ForeColor; set => PropertyTextFont.ForeColor = value; }
        /// <summary>
        /// Barva pozadí
        /// </summary>
        [Category("Písmo")] //RC 29450612 : Písmo
        [Description("Barva pozadí textu písma")] //RC 29450621 : Barva pozadí textu písma
        [DisplayName("barva pozadí")] //RC  : barva pozadí
        [TypeConverter(typeof(ComplexColorConverter))]
        public IComplexColor PropertyBackColor { get => PropertyTextFont?.BackColor; set => PropertyTextFont.BackColor = value; }

        /// <summary>
        /// Formátování textu
        /// </summary>
        [Category("Text")] //RC 29450623 : Text
        [DisplayName("formátování")] //RC 29450624 : formátování
        [Description("Vlastní formát textu")] //RC 29450625 : Vlastní formát textu
        [EditorAttribute(typeof(TextFormattingEditor), typeof(UITypeEditor))]
        public string PropertyFormatting
        {
            get => Text?.Format;
            set
            {
                Text.Format = value;
                if (Line.IsHeightByContent)
                    Line.IsHeightByContent = true;
            }
        }
        /// <summary>
        /// Pokud text má být víceřádkový pak TRUE
        /// </summary>
        [Category("Text")] //RC 29450623 : Text
        [DisplayName("víceřádkový")] //RC 29450626 : víceřádkový
        [Description("Indikuje víceřádkovost textu")] //RC 29450627 : Indikuje víceřádkovost textu
        [TypeConverter(typeof(BooleanTypeConverter))]
        public bool PropertyMultiLine
        {
            get => Text != null && Text.MultiLine;
            set
            {
                Text.MultiLine = value;
                if (Line.IsHeightByContent)
                    Line.IsHeightByContent = true;
            }
        }

        /// <summary>
        /// Text objektu
        /// </summary>
        [Category("Text")]
        [DisplayName("detail")]
        [Description("Textový obsah objektu")]
        [EditorAttribute(typeof(TagTextEditor), typeof(UITypeEditor))]
        public string PropertyText
        {
            get => Text != null ? Text.Text : string.Empty;
            set
            {
                Text.Text = value;
                if (Line.IsHeightByContent)
                    Line.IsHeightByContent = true;
            }
        }

        /// <summary>
        /// Zarovnání obsahu
        /// </summary>
        [DisplayName("zarovnání horizontální")] //RC 29450629 : zarovnání horizontální
        [Category("Text")] //RC 29450623 : Text
        [Description("Horizontální zarovnání obsahu")] //RC 29450630 : Horizontální zarovnání obsahu
        public HAlign PropertyHAlign { get => Text != null ? Text.Align.Horizontal : HAlign.left; set => Text.Align.Horizontal = value; }

        /// <summary>
        /// Zarovnání obsahu
        /// </summary>
        [DisplayName("zarovnání vertikální")] //RC 29450631 : zarovnání vertikální
        [Category("Text")] //RC 29450623 : Text
        [Description("Vertikální zarovnání obsahu")] //RC 29450632 : Vertikální zarovnání obsahu
        public VAlign PropertyVAlign { get => Text != null ? Text.Align.Vertical : VAlign.top; set => Text.Align.Vertical = value; }

        /// <summary>
        /// Směr textu
        /// </summary>
        [Category("Text")] //RC 29450623 : Text
        [Description("Orientace obsahu (směr textu)")] //RC 29450633 : Orientace obsahu (směr textu)
        [DisplayName("orientace")] //RC 29450634 : orientace
        public RotateType PropertyOrientation { get => Text != null ? Text.Orientation : RotateType.RotateNoneFlipNone; set => Text.Orientation = value; }

        /// <summary>
        /// Odsazení textu
        /// </summary>
        [Category("Text")] //RC 29450623 : Text
        [DisplayName("odsazení")] //RC 29450601 : odsazení
        [Description("Odsazení textu uvnitř objektu. Je to hodnota pro všechny strany. Pro jednotlivá odsazení použijte 'detail'")] //RC 29450635 : Odsazení textu uvnítř objektu. Je to hodnota pro všechny strány. Pro jednotlivá odsazení použijte 'detail
        public string PropertyPadding { get => Padding != null ? Padding.AllValue : string.Empty; set => Padding.AllValue = value; }
        #endregion

        #region ITextHandler
        readonly UndoRedo<ITagText> text = new UndoRedo<ITagText>();
        /// <summary>
        /// Text objektu
        /// </summary>
        [Browsable(false)]
        public ITagText Text { get => text.Value; set => text.Value = value; }
        /// <summary>
        /// Nastavení výšky dle obsahu
        /// </summary>
        /// <param name="graphics">ovladač grafiky</param>
        public virtual void SetHeightByContent(Graphics graphics)
        {
            if (Text != null
                && Width.Value != null
                && Padding != null
                && Surround != null)
                Height = TagService.GetHeightByContent(graphics
                    , Text.TextFont.Font
                    , (int)(Width - Padding.LeftPixels - Padding.RightPixels - Surround.Width.LeftPixels - Surround.Width.RightPixels)
                    , Text.MultiLine
                    , Text.Text
                    , Padding.TopPixels + Padding.BottomPixels);
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
        /// přetížení kvůli zjištění dodatečných nastavení
        /// </summary>
        public override void LoadInformation()
        {
            //Pokud se nejedná o datovou položku pak není co řešit 
            if (FormatTag is GFEFormatContent content)
            {
                base.LoadInformation();

                Text.TextFont = new URTagTextFont().Initialize(content.Style);
                if (content.Style != null)
                {
                    Text.Align.Horizontal = (HAlign)content.Style.HorizontalAlign;
                    Text.Align.Vertical = (VAlign)content.Style.VerticalAlign;
                    Text.Ellipsis.Style = (ElStyle)content.Style.Ellipsis.Style;
                    Text.Ellipsis.Char = content.Style.Ellipsis.EllipsisCharacter;
                    Text.MultiLine = content.Style.Ellipsis.MultiLine;
                }

                if (content.Attributes.ContainsKey("name"))
                    Text.Text = content.Attributes["name"];
                else if (content.Attributes.ContainsKey("value"))
                    Text.Text = content.Attributes["value"];

                if (content.Style != null)
                {
                    if (content.Style.Attributes.ContainsKey("fit-text"))
                        Text.Fittext = (FitText)new FitTextConverter(typeof(FitText)).ConvertFrom(content.Style.Attributes["fit-text"]);
                    if (content.Style.Attributes.ContainsKey("text-leading") && float.TryParse(content.Style.Attributes["text-leading"], out float tl))
                        Text.Textleading = tl;
                    if (content.Style.Attributes.ContainsKey("paragraph-gap") && float.TryParse(content.Style.Attributes["paragraph-gap"], out float pg))
                        Text.Paragraphgap = pg;

                    if (content.Style.Attributes.ContainsKey("text-orientation"))
                    {
                        if (int.TryParse(content.Style.Attributes["text-orientation"], out int to))
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

                if (content.Attributes.ContainsKey("format"))
                    Text.Format = content.Attributes["format"];
            }

            if (FormatTag != null)
            {
                TagService.SetHeightByAttribute(this, FormatTag.Attributes);
                TagService.SetWidthByAttribute(this, FormatTag.Attributes);
            }
            if (Height.Value == null && FormatTag is GFEFormatContent && (FormatTag as GFEFormatContent).Style != null)
                TagService.SetHeightByAttribute(this, (FormatTag as GFEFormatContent).Style.Attributes);
            IsHeightByContent = Height.Value == null;

            if (Width.Value == null && FormatTag is GFEFormatContent && (FormatTag as GFEFormatContent).Style != null)
                TagService.SetWidthByAttribute(this, (FormatTag as GFEFormatContent).Style.Attributes);
            IsWidthByContent = Width.Value == null;
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

        /// <summary>
        /// inicializace objektu dle dostupn7ch informaci
        /// </summary>
        /// <param name="value">objekt ke kopírování</param>
        public virtual AbstractContent Initialize(AbstractTextContentLineable value)
        {
            Initialize(value.FormatTag);
            ComponentType = value.ComponentType;
            Anchor = value.Anchor;
            AttrList = new GFEAttrList(value.AttrList);
            Height = new SizeValue(value.Height);
            Left = new SizeValue(value.Left);
            StartPosition = value.StartPosition;
            EndPosition = value.EndPosition;
            Padding = new URComplexPadding().Initialize(value.Padding);
            Scripts = new GFEScriptList(value.Scripts);
            Spacing = new URComplexSpacing().Initialize(value.Spacing);
            Surround = new URComplexSurround().Initialize(value.Surround);
            InnerSurround = new URInnerSurround().Initialize(value.InnerSurround);
            Text = (new URTagText()).Initialize(value.Text, true);
            Top = new SizeValue(value.Top);
            Width = new SizeValue(value.Width);
            IsWidthByContent = value.IsWidthByContent;
            Page = value.Page;
            return this;
        }
    }
}