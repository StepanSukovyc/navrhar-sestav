//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GrrContentBarcode.cs                   </Name>
//    <Description> objekt preyentující větev BARCODE                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-07-15                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Linq;
using System.Xml;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.WinClient.Designer.Gui;
using Gordic.GFE.WinClient.Utils;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// objekt prezentující větev BARCODE
    /// </summary>
    class GrrContentBarcode : GrrContentImage, IBarcode
    {
        #region IBarcode
        List<ITagComponent> m_children = new List<ITagComponent>();
        public IEnumerable<ITagComponent> Children { get => m_children; }

        protected internal void SetChildren(IEnumerable<ITagComponent> components)
        {
            m_children.Clear();
            foreach (var c in components) AddChild(c);
        }
        protected internal void AddChild(ITagComponent c)
        {
            //měl by být vždy právě jeden child!
            m_children.Add(c);
        }

        UndoRedo<ITextHandler> textable;
        /// <summary>
        /// vnitřní objekt
        /// </summary>
        [Browsable(false)]
        public ITextHandler Textable
        {
            get => textable?.Value;
            set
            {
                textable.Value = value;
                if (textable.Value?.Text != null)
                    _heightChanged(this, EventArgs.Empty);
            }
        }

        /// <summary>
        /// typ objektu BARCODE
        /// </summary>
        [Category("Čárový kód")]
        [DisplayName("typ (řetězec)")]
        [Description("Typ objektu (řetězcová prezentace)")]
        public string TypeRaw
        {
            get
            {
                string typeRaw = CommonService.ParseStringBarcode(propertyType.Value);
                if (propertyO1.Value > 0)
                {
                    typeRaw += "," + propertyO1.Value;
                    if (propertyO2.Value > 0)
                    {
                        typeRaw += "," + propertyO2.Value;
                        if (propertyO3.Value > 0)
                            typeRaw += "," + propertyO3.Value;
                    }
                }
                return typeRaw;
            }
            set
            {
                CommonService.SetBarcodeValues(value, out BarcodeTypeEnum type, out int o1, out int o2, out int o3);
                this.propertyType.Value = type;
                this.propertyO1.Value = o1;
                this.propertyO2.Value = o2;
                this.propertyO3.Value = o3;
            }
        }

        UndoRedo<BarcodeTypeEnum> propertyType;
        /// <summary>
        /// typ objektu BARCODE
        /// </summary>
        [Category("Čárový kód")]
        [DisplayName("typ (výčet)")]
        [Description("Typ objektu (výčtová hodnota)")]
        [TypeConverter(typeof(BarcodeTypeConverter))]
        public BarcodeTypeEnum Type
        {
            get => propertyType.Value; set => propertyType.Value = value;
        }

        UndoRedo<int> propertyO1;
        /// <summary>
        /// typ objektu BARCODE
        /// </summary>
        [Category("Čárový kód")]
        [DisplayName("typ - upřesňující volba 1")]
        [Description("První hodnota kódu")]
        public int O1 { get => propertyO1.Value; set => propertyO1.Value = value; }

        UndoRedo<int> propertyO2;
        /// <summary>
        /// typ objektu BARCODE
        /// </summary>
        [Category("Čárový kód")]
        [DisplayName("typ - upřesňující volba 2")]
        [Description("Druhá hodnota kódu")]
        public int O2 { get => propertyO2.Value; set => propertyO2.Value = value; }

        UndoRedo<int> propertyO3;
        /// <summary>
        /// typ objektu BARCODE
        /// </summary>
        [Category("Čárový kód")]
        [DisplayName("typ - upřesňující volba 3")]
        [Description("Třetí hodnota kódu")]
        public int O3 { get => propertyO3.Value; set => propertyO3.Value = value; }

        /// <summary>
        /// indikuje, že text lze změnít bez přetažení datové položky
        /// </summary>
        [ReadOnly(false)]
        [Category("Čárový kód")]
        [DisplayName("lze editovat")]
        [Description("Pokud tato hodnota je nastavená na TRUE, pak nejde editovat text, protože obsahem je datová položka")] //RC 29450561 : Pokud tato hodnota je nastavená na TRUE, pak nejde editovat text, protože obsahem je datová položka
        [TypeConverter(typeof(BooleanTypeConverter))]
        public bool Editable { get => Textable == null || !(Textable is IDataItem); }
        /// <summary>
        /// vnitřní text pro případ, že objekt neobsahuje vůbec nic
        /// </summary>
        protected string innerText;
        /// <summary>
        /// typ objektu BARCODE
        /// </summary>
        [Category("Čárový kód")]
        [DisplayName("text")]
        [Description("textový obsah objektu")]
        public string Text
        {
            get => Textable?.Text != null ? Textable.Text.Text : innerText;
            set
            {
                if (Editable)
                {
                    if (Textable == null)
                        innerText = value;
                    else if (Textable.Text == null)
                    {
                        Textable.Text = new URTagText();
                        Textable.Text.Initialize("value");
                    }
                    else
                        Textable.Text.Text = value;
                }
            }
        }
        #endregion

        #region IImage
        /// <summary>
        /// Výška obrázku
        /// </summary>
        [Browsable(false)]
        public override SizeValue ContentImageHeight { get => base.ContentImageHeight; set => base.ContentImageHeight = value; }

        /// <summary>
        /// Výška obrázku
        /// </summary>
        [Browsable(false)]
        public override SizeValue ContentImageWidth { get => base.ContentImageWidth; set => base.ContentImageWidth = value; }

        /// <summary>
        /// Vlastnost, indikující globálnost obrázku
        /// </summary>
        [Browsable(false)]
        public override bool Global { get => base.Global; set => base.Global = value; }

        /// <summary>
        /// Obrázek pozadí
        /// </summary>
        [Browsable(false)]
        public override Image Image { get => base.Image; set => base.Image = value; }

        /// <summary>
        /// Obrázek pozadí
        /// </summary>
        [Browsable(false)]
        public override string ImageFileName { get => base.ImageFileName; set => base.ImageFileName = value; }

        ///// <summary>
        ///// Obrázek pozadí
        ///// </summary>
        //[Browsable(false)]
        //public override ImageSizeValueType WidthSizeType { get => base.WidthSizeType; set => base.WidthSizeType = value; }
        #endregion

        #region AbstractContent
        public override GFEScriptList Scripts { get => ((AbstractContent)Textable)?.Scripts; }
        #endregion

        /// <summary>
        /// Načtení informaci o objektu z formátu daného objektu
        /// </summary>
        public override void LoadInformation()
        {
            base.LoadInformation();
            if (FormatTag != null)
                if (FormatTag.Children.Count > 0)
                {
                    dynamic component = null;
                    GFEFormatTag content = FormatTag.Children.First();
                    if (content is GFEFormatContentValue)
                        component = new GrrContentValue();
                    else if (content is GFEFormatContentText)
                        component = new GrrContentText();
                    if (component != null)
                    {
                        component.Initialize(content);
                        component.Load(Page, this);
                        Textable = component;
                    }
                    if (component != null)
                        AddChild(component);
                }
                else Text = FormatTag.GetInnerXml();

            if (AttrList.ContainsKey("type"))
                TypeRaw = AttrList["type"];
        }
        /// <summary>
        /// Kreslení objektu
        /// </summary>
        /// <param name="graphics">Ovladač grafiky</param>
        /// <param name="args">args</param>
        public override void OnPaint(Graphics graphics, PaintArgs args)
        {
            if (!graphics.VisibleClipBounds.IntersectsWith(BoundsInPixels)
                && WidthSizeType == ImageSizeValueType.cell
                && HeightSizeType == ImageSizeValueType.cell)
                return;

            Region reg = graphics.Clip;
            graphics.Clip = new Region(RectangleF.Intersect(BoundsInPixels, graphics.VisibleClipBounds));

            DrawClear(graphics);

            if (Anchor)
                TagService.DrawTagAnchor(graphics, BoundsInPixels);

            if (Textable?.Text != null)
                Textable.Text.Paint(graphics, BoundsInPixels, Padding, Zoom);

            if (args.DrawContent)
            {
                float h = 0, w = 0;
                switch (WidthSizeType)
                {
                    case ImageSizeValueType.cell:
                        w = ContentBounds.Width;
                        break;
                    case ImageSizeValueType.image:
                        w = Image != null ? Image.Size.Width * Zoom : ContentBounds.Width;
                        break;
                    default:
                        w = !ContentImageWidth.IsEmpty ? ContentImageWidth * Zoom : ContentBounds.Width;
                        break;
                }
                switch (HeightSizeType)
                {
                    case ImageSizeValueType.cell:
                        h = ContentBounds.Height;
                        break;
                    case ImageSizeValueType.image:
                        h = Image != null ? Image.Size.Height * Zoom : ContentBounds.Height;
                        break;
                    default:
                        h = !ContentImageHeight.IsEmpty ? ContentImageHeight * Zoom : ContentBounds.Height;
                        break;
                }
                try
                {
                    CommonService.DrawBarcode(this, Children, TypeRaw, AttrList, graphics, new RectangleF(ContentBounds.Left, ContentBounds.Top, w, h));
                }
                catch (Exception ex)
                {
                    LoggingService.Error(ex);
                }
            }

            graphics.Clip = reg;
            Page?.DelayPaintList.Add(new DelayPaintItem(this, IsSelected, reg));
        }
        /// <summary>
        /// Vymazání rámečku indikujícího, že daný objekt je aktivní
        /// </summary>
        /// <param name="graphics">Kreslící nástroj</param>
        protected override void DrawClear(System.Drawing.Graphics graphics)
        {
            if (BackColor.Color != Color.Transparent && ShowBackground)
                // uživatelsky daná barva stránky
                graphics.FillRectangle(new SolidBrush(BackColor.Color), BoundsInPixels);
            else if (Textable is IDataItem && ReportDesignerDesignerProperties.Instance.ShowColorOfObjects)
            {
                Color col = ColorService.GetColor(ReportDesignerProperties.Instance.ValueOfColor, Color.FromArgb(255, 255, 225));
                if (col != Color.Transparent)
                    // pokud uživatel si přeje zviditelnění položky, pak ji zviditelníme
                    graphics.FillRectangle(new SolidBrush(col), BoundsInPixels);
                // pokud uživatel si přeje zviditelnění položky, pak ji zviditelníme
                //graphics.FillRectangle(new SolidBrush(Color.FromArgb(255, 255, 225)), BoundsInPixels);
            }
        }
        /// <summary>
        /// Metoda vracení XML struktury samotného elementu (bez STYLE)
        /// </summary>
        /// <param name="xmlDoc">Dokument, do kterého se struktura vkládá</param>
        /// <param name="withRect"></param>
        /// <param name="namespaceUri">jmenný prostor <paramref name="xmlDoc"/></param>
        /// <param name="styles">seznam již dostupných stylů</param>
        /// <param name="regionFullName">Úplný název aktuálního regionu</param>
        /// <returns>Element popisující samotný objekt bez stylů</returns>
        public override XmlLinkedNode GetDataComponent(XmlDocumentPosition xmlDoc, bool withRect = true, string namespaceUri = null, List<GFEList> styles = null, string regionFullName = null)
        {
            XmlElement xmlNode = xmlDoc.CreateElement("barcode", string.IsNullOrEmpty(namespaceUri) ? ReportDesignerProperties.Instance.AlfReportXmlns : namespaceUri);

            if (!string.IsNullOrEmpty(TypeRaw))
                xmlNode.SetAttribute("type", TypeRaw);

            switch (WidthSizeType)
            {
                case ImageSizeValueType.cell:
                    xmlNode.SetAttribute("image-width", "auto");
                    break;
                case ImageSizeValueType.spec:
                    xmlNode.SetAttribute("image-width", ContentImageWidth.Value.Replace(',', '.'));
                    break;
                default:
                    break;
            }
            switch (HeightSizeType)
            {
                case ImageSizeValueType.cell:
                    xmlNode.SetAttribute("image-height", "auto");
                    break;
                case ImageSizeValueType.spec:
                    xmlNode.SetAttribute("image-height", ContentImageHeight.Value.Replace(',', '.'));
                    break;
                default:
                    break;
            }

            //uložení skriptů - Script objektu BARCODE je brán jako Script vnořeného objektu
            //XmlDocumentService.SetListOfDictionaryItems(xmlNode, Scripts, styles);
            // uložíme neznámé značky
            XmlDocumentService.SetListOfDictionaryItems(xmlNode, Unknowns, styles);
            XmlElement textableElement;

            if (Textable is AbstractContent && (Textable as AbstractContent).ComponentType == ComponentType.valueof)
                xmlNode.AppendChild((Textable as AbstractContent).GetDataComponent(xmlDoc, withRect, namespaceUri));
            else
            {
                textableElement = xmlNode.AppendChild(xmlDoc.CreateElement("text", string.IsNullOrEmpty(namespaceUri) ? ReportDesignerProperties.Instance.AlfReportXmlns : namespaceUri)) as XmlElement;
                textableElement.SetAttribute("value", CharacterEncodings.GetHexCodeText(Text));
            }

            return xmlNode;
        }

        List<string> knownTags;
        /// <summary>
        /// Známě značky regionu
        /// </summary>
        public override List<string> KnownTags
        {
            get
            {
                if (knownTags == null)
                    knownTags = AddInTree.BuildItem("/ReportDesigner/GrrList/BarcodeTags", null) as List<string>;
                return knownTags;
            }
        }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        public override AbstractContent Initialize()
        {
            base.Initialize();
            knownTags = null;
            innerText = string.Empty;
            propertyType = new UndoRedo<BarcodeTypeEnum>();
            propertyO1 = new UndoRedo<int>();
            propertyO2 = new UndoRedo<int>();
            propertyO3 = new UndoRedo<int>();
            textable = new UndoRedo<ITextHandler>();
            ComponentType = ComponentType.barcode;
            return this;
        }

        /// <summary>
        /// inicializace objektu dle dostupných informaci
        /// </summary>
        /// <param name="clone">objekt ke kopírování</param>
        public override void Initialize(object clone)
        {
            base.Initialize(clone);
            if (clone is IBarcode)
            {
                Type = (clone as IBarcode).Type;
                Textable = ((clone as IBarcode).Textable as ICloneable).Clone() as ITextHandler;
                if (Textable == null)
                    Text = (clone as IBarcode).Text;
            }
            HeightChanged += _heightChanged;
        }

        /// <summary>
        /// inicializace objektu dle dostupných informaci
        /// </summary>
        /// <param name="item">Informace o formátu objektu.</param>
        public override AbstractContent Initialize(GFEFormatTag item)
        {
            base.Initialize(item);
            TypeRaw = "code39";
            HeightChanged += _heightChanged;
            return this;
        }

        /// <summary>
        /// inicializace objektu dle dostupných informaci
        /// </summary>
        /// <param name="node">Položka bočního panelu s informaci o vkládaném objektu</param>
        public override AbstractContent Initialize(SideTabItem node)
        {
            base.Initialize(node);
            TypeRaw = "code39";
            Textable = new GrrContentText();
            Textable.Text.Text = "text"; //RC 29450480 : text
            HeightChanged += _heightChanged;
            return this;
        }

        void _heightChanged(object sender, EventArgs e)
        {
            try
            {
                if (textable.Value != null)
                {
                    textable.Value.Text.TextFont = new URTagTextFont().Initialize("CKGinis");
                    float fHeight = (Height - (Padding.TopPixels + Padding.BottomPixels)) * 17 / 20;
                    if (fHeight < 0)
                        fHeight = 10;
                    textable.Value.Text.TextFont.Size = new FontSizeValue(!Height.IsEmpty ? UnitConverter.ConvertTo(fHeight, "pt") : "8");
                }
            }
            catch { }
        }
    }
}
