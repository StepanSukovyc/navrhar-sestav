//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ContentPArea.cs                        </Name>
//    <Description> odstavec                                                    </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2019-08-10                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.Design;
using System.Drawing;
using System.Drawing.Design;
using System.Xml;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// odstavec - P
    /// </summary>
    class ContentPArea : AreaContent, ITextHandler, ISurroundable, ISizeByContent
    {
        #region ICloneable
        /// <summary>
        /// Creates a new object that is a copy of the current instance
        /// </summary>
        /// <returns>A new object that is a copy of this instance.</returns>
        public override object Clone() => new ContentPArea().Initialize(this);
        #endregion

        #region AbstractTextContent
        /// <summary>
        /// Načtení informaci o objektu z formátu daného objektu
        /// </summary>
        public override void LoadInformation()
        {
            // pokud to není textové pole pak není co řešit
            if (FormatTag is GFEFormatContent content && (FormatTag is GFEFormatContentPar || FormatTag is GFEFormatUnknownContent unk && unk.TagName.Equals("p")))
            {
                base.LoadInformation();

                if (FormatTag.Attributes.ContainsKey("rect"))
                    TagService.SetRectByAttribute(this, FormatTag.Attributes["rect"]);

                Guid = FormatTag.Attributes.ContainsKey("guid") ? FormatTag.Attributes["guid"] : System.Guid.NewGuid().ToString().Replace("-", "");

                Text.TextFont = new URTagTextFont().Initialize(content.Style);
                // aplikujeme styly
                if (content.Style != null)
                {
                    Text.Align.Horizontal = (HAlign)content.Style.HorizontalAlign;
                    Text.Align.Vertical = (VAlign)content.Style.VerticalAlign;
                    Text.Ellipsis.Style = (ElStyle)content.Style.Ellipsis.Style;
                    Text.Ellipsis.Char = content.Style.Ellipsis.EllipsisCharacter;

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

                // výchozí hodnoty
                BackColor.Initialize(FormatTag.Attributes.ContainsKey("background-color") ? FormatTag.Attributes["background-color"] : "#fafafa");
                ShowBackground = BackColor.Color != Color.Transparent;
            }
            else
#pragma warning disable CS0618 // Typ nebo člen je zastaralý.
                CommonService.ApplayStyleSizable(this, AttrList);
#pragma warning restore CS0618 // Typ nebo člen je zastaralý.
            FormatTag?.Children.ForEach((item) => LocalCommonService.ParseContent(this, item, Page));
        }
        #endregion

        #region AreaContent

        /// <summary>
        /// uložení obsahu řádku do <paramref name="xmlElement"/>
        /// </summary>
        /// <param name="xmlElement">daný XML element, do kterého se vkládá obsah</param>
        /// <param name="xmlDoc">výsledný dokument</param>
        /// <param name="styles">seznam již dostupných stylů</param>
        /// <param name="withRect"></param>
        public override void SetXmlData(XmlElement xmlElement, XmlDocumentPosition xmlDoc, List<GFEList> styles, bool withRect = true)
        {
            XmlElement xmlStyle = GetXmlData(xmlDoc, styles, withRect);
            if (xmlStyle != null)
                xmlElement.AppendChild(xmlStyle);
        }
        /// <summary>
        /// Metoda vracení XML struktury samotného elementu (bez STYLE)
        /// </summary>
        /// <param name="xmlDoc">Dokument, do kterého se struktura vkládá</param>
        /// <param name="xmlStyles">Seznam nadřazených stylů</param>
        /// <param name="withRect"></param>
        /// <param name="regionFullName">Úplný název aktuálního regionu</param>
        /// <returns>Element prezentující daný objekt</returns>
        override public XmlElement GetXmlData(XmlDocumentPosition xmlDoc, List<GFEList> xmlStyles, bool withRect = true, string regionFullName = null)
        {
            // potřebné pro pamatování pozici řádku
            // pokud region je vybrán, pak, protože je pouze kontejner, 
            // nastavíme výběr všem vnitřním objektům 
            if (IsSelected)
                ForEach((_item) => ServiceSelection.SetSelectedComponents(_item, SelectionTypes.Add));

            // STYL
            XmlElement xmlStyle = xmlDoc.CreateElement("style", ReportDesignerProperties.Instance.AlfReportXmlns);
            GFEList actualXmlStyle = FormatTag is GFEFormatContent content && content.Style != null ? content.Style.Attributes : null;
            string serializedFontName = LocalCommonService.GetSerializedFontFamilyName(this, actualXmlStyle);
            if (Text != null && Text.TextFont != null)
                if (!"times".Equals(serializedFontName))
                    if (!"arial".Equals(serializedFontName) && !"courier".Equals(serializedFontName))
                    {
                        xmlStyle.SetAttribute("font-face", "custom");
                        xmlStyle.SetAttribute("font-name", serializedFontName);
                    }
                    else
                        xmlStyle.SetAttribute("font-face", serializedFontName);

            string gcs = Convert.ToString(Text.TextFont.GdiCharSet).Replace("_CHARSET", "").ToLower();
            if (Text.TextFont.GdiCharSet != ECharSet.EASTEUROPE_CHARSET)
                xmlStyle.SetAttribute("font-charset", gcs);
            // výchozí hodnota
            if (Text.TextFont.Size.Value != "2")
                xmlStyle.SetAttribute("font-size", Text.TextFont.Size.Value.Replace(",", "."));
            if (((FontStyle)Text.TextFont.Style & FontStyle.Bold) > 0)
                xmlStyle.SetAttribute("font-bold", "true");
            if (((FontStyle)Text.TextFont.Style & FontStyle.Italic) > 0)
                xmlStyle.SetAttribute("font-italic", "true");
            if (((FontStyle)Text.TextFont.Style & FontStyle.Strikeout) > 0)
                xmlStyle.SetAttribute("font-strikeout", "true");
            if (((FontStyle)Text.TextFont.Style & FontStyle.Underline) > 0)
                xmlStyle.SetAttribute("font-underline", "true");
            if (Text.TextFont.ForeColor.Color != Color.Black)
                xmlStyle.SetAttribute("font-color", Text.TextFont.ForeColor.Name);
            if (Text.Align.Horizontal != HAlign.left)
                xmlStyle.SetAttribute("horizontal-align", Convert.ToString(Text.Align.Horizontal).ToLower());

            #region diagonal...-border-width
            if (!string.IsNullOrEmpty(InnerSurround.UpWidth.Value))
                xmlStyle.SetAttribute("diagonalup-border-width", InnerSurround.UpWidth.Value.Replace(",", "."));
            if (!string.IsNullOrEmpty(InnerSurround.DownWidth.Value))
                xmlStyle.SetAttribute("diagonaldown-border-width", InnerSurround.DownWidth.Value.Replace(",", "."));
            #endregion

            #region diagonal...-border-color
            if (!string.IsNullOrEmpty(InnerSurround.UpFrameColor.Name))
                xmlStyle.SetAttribute("diagonalup-border-color", InnerSurround.UpFrameColor.Name);
            if (!string.IsNullOrEmpty(InnerSurround.DownFrameColor.Name))
                xmlStyle.SetAttribute("diagonaldown-border-color", InnerSurround.DownFrameColor.Name);
            #endregion

            #region diagonal...-border-style
            if (InnerSurround.UpDashStyle.Value != ComplexDashStyle.Unspec)
                xmlStyle.SetAttribute("diagonalup-border-style", ComplexDashStyle.ToEngName(InnerSurround.UpDashStyle.Value));
            if (InnerSurround.DownDashStyle.Value != ComplexDashStyle.Unspec)
                xmlStyle.SetAttribute("diagonaldown-border-style", ComplexDashStyle.ToEngName(InnerSurround.DownDashStyle.Value));
            #endregion

            #region border-width
            if (string.IsNullOrEmpty(Surround.Width.AllValue))
            {
                xmlStyle.SetAttribute("left-border-width", Surround.Width.LeftValue.Replace(",", "."));
                xmlStyle.SetAttribute("right-border-width", Surround.Width.RightValue.Replace(",", "."));
                xmlStyle.SetAttribute("top-border-width", Surround.Width.TopValue.Replace(",", "."));
                xmlStyle.SetAttribute("bottom-border-width", Surround.Width.BottomValue.Replace(",", "."));
            }
            else
                xmlStyle.SetAttribute("border-width", Surround.Width.AllValue.Replace(",", "."));
            #endregion

            #region border-color
            if (string.IsNullOrEmpty(Surround.FrameColor.AllValue.Name))
            {
                xmlStyle.SetAttribute("left-border-color", Surround.FrameColor.LeftValue.Name);
                xmlStyle.SetAttribute("right-border-color", Surround.FrameColor.RightValue.Name);
                xmlStyle.SetAttribute("top-border-color", Surround.FrameColor.TopValue.Name);
                xmlStyle.SetAttribute("bottom-border-color", Surround.FrameColor.BottomValue.Name);
            }
            else
                xmlStyle.SetAttribute("border-color", Surround.FrameColor.AllValue.Name);
            #endregion

            #region border-style
            if (Surround.DashStyle.AllValue == ComplexDashStyle.Unspec)
            {
                if (Surround.DashStyle.LeftValue != ComplexDashStyle.Unspec)
                    xmlStyle.SetAttribute("left-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.LeftValue));
                if (Surround.DashStyle.RightValue != ComplexDashStyle.Unspec)
                    xmlStyle.SetAttribute("right-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.RightValue));
                if (Surround.DashStyle.TopValue != ComplexDashStyle.Unspec)
                    xmlStyle.SetAttribute("top-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.TopValue));
                if (Surround.DashStyle.BottomValue != ComplexDashStyle.Unspec)
                    xmlStyle.SetAttribute("bottom-border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.BottomValue));
            }
            else if (Surround.DashStyle.AllValue != ComplexDashStyle.Unspec)
                xmlStyle.SetAttribute("border-style", ComplexDashStyle.ToEngName(Surround.DashStyle.AllValue));
            #endregion
            // STYL ^^^

            XmlElement xmlNode = xmlDoc.CreateElement("p", ReportDesignerProperties.Instance.AlfReportXmlns);
            if (withRect)
            {
                // uložení informaci o rámečku pro daný objekt
                string value = TagService.GetRect(this);
                if (!string.IsNullOrEmpty(value))
                    xmlNode.SetAttribute("rect", value);
            }

            if (Page.Order != 1)
                // uložení informaci o stránce, na které se nachází daný objekt
                xmlNode.SetAttribute("page", Convert.ToString(Page.Order));

            // prvně se uloží všechny políčka co nejsou regiony
            // a zároveň nejsou prvním objektem regionu
            ForEach((item) => { if (!(item is AreaContent)) SetChildXmlData(item, xmlNode, xmlStyles); });
            // teď se uloží všechny vnitřní regiony
            ForEach((item) => { if (item is AreaContent) xmlNode.AppendChild(item.GetXmlData(xmlDoc, xmlStyles)); });

            if (BackColor != null && BackColor.Color != Color.Transparent)
                xmlNode.SetAttribute("background-color", Convert.ToString(BackColor.Name).ToLower());

            xmlNode.SetAttribute("guid", !string.IsNullOrEmpty(Guid) ? Guid : System.Guid.NewGuid().ToString().Replace("-", ""));

            // uložíme neznámé značky
            XmlDocumentService.SetListOfDictionaryItems(xmlNode, Unknowns, xmlStyles);

            // vrátíme region
            if (xmlStyle.Attributes.Count != 0)
            {
                xmlStyle.AppendChild(xmlNode);
                return xmlStyle;
            }
            else
                return xmlNode;
        }
        void SetChildXmlData(ITagComponent item, XmlElement _xmlBody, List<GFEList> xmlStyles)
        {
            XmlElement xmlElement = item.GetXmlData(_xmlBody.OwnerDocument as XmlDocumentPosition, xmlStyles, false);

            //pokud větev STYLE, neobsahuje žádné atributy, pak je zbytečná 
            if (string.Equals(xmlElement.Name, "style", StringComparison.InvariantCultureIgnoreCase)
                && xmlElement.Attributes.Count == 0)
                // v tomto případě přepíšeme všechny vnořené větve větvi STYLE do nadřazené větvi
                foreach (XmlNode subItem in xmlElement.ChildNodes)
                    _xmlBody.AppendChild(subItem);
            else _xmlBody.AppendChild(xmlElement);
        }
        #endregion

        #region IPropertyGrid
        // zde jsou vlastnosti pro tabulku vlastnosti a ne pro zjednodušení kódu :-)
        /// <summary>
        /// Písmo
        /// </summary>
        [Category("Písmo")]
        [DisplayName("detail")]
        [Description("Detail písma textu")]
        [EditorAttribute(typeof(TextFontEditor), typeof(UITypeEditor))]
        public URTagTextFont PropertyTextFont { get => Text != null ? Text.TextFont as URTagTextFont : null; set => Text.TextFont = value; }
        /// <summary>
        /// Velikost písma
        /// </summary>
        [Category("Písmo")] //RC 29450612 : Písmo
        [Description("Velikost písma textu")] //RC 29450614 : Velikost písma textu
        [DisplayName("velikost")] //RC 29450615 : velikost
        public string PropertySize { get => PropertyTextFont != null ? Convert.ToString(PropertyTextFont.Size) : string.Empty; set => PropertyTextFont.Size = new FontSizeValue(value); }
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
        public IComplexFontFamily PropertyFontFamily { get => PropertyTextFont?.FontFamily; set => PropertyTextFont.FontFamily = value; }
        /// <summary>
        /// Barva písma
        /// </summary>
        [Category("Písmo")]
        [Description("Barva textu písma")]
        [DisplayName("barva písma")]
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
        public string PropertyFormatting { get => Text?.Format; set => Text.Format = value; }
        /// <summary>
        /// Pokud text má být víceřádkový pak TRUE
        /// </summary>
        [Category("Text")] //RC 29450623 : Text
        [DisplayName("víceřádkový")] //RC 29450626 : víceřádkový
        [Description("Indikuje víceřádkovost textu")] //RC 29450627 : Indikuje víceřádkovost textu
        [TypeConverter(typeof(BooleanTypeConverter))]
        public bool PropertyMultiLine { get => Text != null && Text.MultiLine; set => Text.MultiLine = value; }

        /// <summary>
        /// Text objektu
        /// </summary>
        [Category("Text")]
        [DisplayName("detail")]
        [Description("Textový obsah objektu")]
        [EditorAttribute(typeof(TagTextEditor), typeof(UITypeEditor))]
        public string PropertyText { get => Text != null ? Text.Text : string.Empty; set => Text.Text = value; }

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

        #region ISizeByContent
        UndoRedo<bool> isheightbycontent = new UndoRedo<bool>();
        /// <summary>
        /// indikuje, že výška je dle obsahu
        /// </summary>
        [Browsable(false)]
        public bool IsHeightByContent
        {
            get => isheightbycontent.Value;
            set
            {
                isheightbycontent.Value = value;
                if (!(Parent as ICell).Line.IsLoading && value)
                {
                    (Parent as ICell).Line.IsHeightChanging = true;
                    SetHeightByContent();
                    (Parent as ICell).Line.IsHeightChanging = false;
                }
            }
        }
        UndoRedo<bool> iswidthbycontent = new UndoRedo<bool>();
        /// <summary>
        /// indikuje, že šířka je dle pozůstalé velikosti řádku
        /// </summary>
        [Browsable(false)]
        public bool IsWidthByContent { get => iswidthbycontent.Value; set => iswidthbycontent.Value = value; }
        /// <summary>
        /// nastavení výšky dle obsahu
        /// </summary>
        public void SetHeightByContent()
        {
            if (Parent is ICell)
                Height = new SizeValue(ReportDesignerProperties.Instance.GrrDefaultTextHeight);
        }
        #endregion


        List<string> knownTags;
        /// <summary>
        /// Známě značky oblasti
        /// </summary>
        [Browsable(false)]
        public override List<string> KnownTags
        {
            get
            {
                if (knownTags == null)
                    knownTags = AddInTree.BuildItem("/ReportDesigner/GrfList/ContentPAreaTags", null) as List<string>;
                return knownTags;
            }
        }

        UndoRedo<string> guid = new UndoRedo<string>();
        /// <summary>
        /// Jednoznačný identifikátor složky příloh
        /// </summary>
        [Category("Oblast P")]
        [DisplayName("jednoznačný identifikátor")]
        [ReadOnly(true)]
        [Description("jednoznačný identifikátor oblasti (bez mezer)")]
        public string Guid { get => guid.Value; set => guid.Value = value.Replace(" ", ""); }

        #region ITextHandler
        ITagText ITextHandler.Text { get => this.Text; set => this.Text = (URTagText)value; }
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
            set
            {
                if (Surround != null)
                {
                    Surround.FrameColor.SetAllValue(value);
                    InnerSurround.UpFrameColor = value;
                    InnerSurround.DownFrameColor = value;
                }
            }
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
                    InnerSurround.UpDashStyle.Value = value;
                    InnerSurround.DownDashStyle.Value = value;
                }
            }
        }

        /// <summary>
        /// Rameček (detail)
        /// </summary>
        [DisplayName("detail")] //RC 29450594 : detail
        [Category("Rámeček")] //RC 29450589 : Rámeček
        [Description("Nastavení jednotlivých stran")] //RC 29450595 : Nastavení jednotlivých strán
        public URComplexSurround PropertySurround { get => Surround as URComplexSurround; set => Surround = value; }

        /// <summary>
        /// Rameček (detail)
        /// </summary>
        [DisplayName("detail")] //RC 29450594 : detail
        [Category("Rámeček")] //RC 29450589 : Rámeček
        [Description("Nastavení jednotlivých stran")] //RC 29450595 : Nastavení jednotlivých strán
        public URInnerSurround PropertyInnerSurround { get => InnerSurround as URInnerSurround; set => InnerSurround = value; }

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
        #endregion

        /// <exclude/>
        public override AreaContent Initialize(object clone)
        {
            Initialize();
            base.Initialize(clone);

            ComponentType = ComponentType.contentp;

            AttrList.Remove("row");
            Guid = System.Guid.NewGuid().ToString().Replace("-", "");

            return this;
        }
        /// <exclude/>
        public override void Initialize(GFEFormatTag item)
        {
            base.Initialize(item);
            ComponentType = ComponentType.contentp;
        }
        /// <exclude/>
        public override void Initialize(SideTabItem node)
        {
            base.Initialize(node);
            ComponentType = ComponentType.contentp;
        }
        /// <exclude/>
        public virtual void Initialize(ReportDesignerSideTabItem node) => Initialize(node as SideTabItem);

    }
}
