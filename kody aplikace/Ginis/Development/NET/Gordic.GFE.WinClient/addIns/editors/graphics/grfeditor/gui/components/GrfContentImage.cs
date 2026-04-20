//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ContentImage.cs                          </Name>
//    <Description> Obrázek sestavy GRF                                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using Gordic.GFE.Parsers.Services;
using System.Drawing;
using System.Xml;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.Parsers;
using Gordic.Report.Implementation;
using System.ComponentModel;
using System.Drawing.Design;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Editor;
using Gordic.GFE.WinClient.Designer.Gui;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.WinClient.Utils;

namespace Gordic.GFE.WinClient.GrfEditor
{
    /// <summary>
    /// Obrázek sestavy GRF
    /// </summary>
    class GrfContentImage : AbstractContent, IImage, IBackground
    {
        #region AbstractContent
        /// <summary>
        /// Načtení informaci o objektu z formátu daného objektu
        /// </summary>
        public override void LoadInformation()
        {
            isLoadInformation = true;

            SetFormFile();

            //Pokud položka není obrázkem, pak není co řešit
            if (FormatTag is GFEFormatContentImage)
            {
                base.LoadInformation();
                ContentImageWidth = new SizeValue(0);
                ContentImageHeight = new SizeValue(0);

                // zafixujeme objekt
                GFEFormatContentImage _formatTag = (GFEFormatContentImage)FormatTag;
                switch (_formatTag.ImageWidth.mtr)
                {
                    case Grr06Metrics.MMeters:
                        ContentImageWidth = new SizeValue(Math.Round(_formatTag.ImageWidth.met, 2) + "mm");
                        WidthSizeType = ImageSizeValueType.spec;
                        break;
                    case Grr06Metrics.Percent:
                        ContentImageWidth = new SizeValue(Math.Round(_formatTag.ImageWidth.met, 2) + "%");
                        WidthSizeType = ImageSizeValueType.spec;
                        break;
                    case Grr06Metrics.Points:
                        ContentImageWidth = new SizeValue(Math.Round(_formatTag.ImageWidth.met, 2) + "pt");
                        WidthSizeType = ImageSizeValueType.spec;
                        break;
                    case Grr06Metrics.Twip:
                        ContentImageWidth = new SizeValue(Math.Round(_formatTag.ImageWidth.met) + "tw");
                        WidthSizeType = ImageSizeValueType.spec;
                        break;
                    default:
                        if (_formatTag.ImageWidth.met == 0)
                            WidthSizeType = ImageSizeValueType.image;
                        else
                            WidthSizeType = ImageSizeValueType.cell;
                        break;
                }

                switch (_formatTag.ImageHeight.mtr)
                {
                    case Grr06Metrics.MMeters:
                        ContentImageHeight = new SizeValue(Math.Round(_formatTag.ImageHeight.met, 2) + "mm");
                        HeightSizeType = ImageSizeValueType.spec;
                        break;
                    case Grr06Metrics.Points:
                        ContentImageHeight = new SizeValue(Math.Round(_formatTag.ImageHeight.met, 2) + "pt");
                        HeightSizeType = ImageSizeValueType.spec;
                        break;
                    case Grr06Metrics.Twip:
                        ContentImageHeight = new SizeValue(Math.Round(_formatTag.ImageHeight.met) + "tw");
                        HeightSizeType = ImageSizeValueType.spec;
                        break;
                    default:
                        if (_formatTag.ImageHeight.met == 0)
                            HeightSizeType = ImageSizeValueType.image;
                        else
                            HeightSizeType = ImageSizeValueType.cell;
                        break;
                }
            }
            else if (FormatTag != null && FormatTag.TagName.Equals("image", StringComparison.InvariantCultureIgnoreCase))
            {
                CommonService.ApplayStyle(this, this.AttrList);

                ContentImageWidth = new SizeValue(0);
                ContentImageHeight = new SizeValue(0);

                if (!AttrList.ContainsKey("image-width"))
                    WidthSizeType = ImageSizeValueType.image;
                else
                    switch (AttrList["image-width"].ToLowerInvariant())
                    {
                        case "auto":
                            WidthSizeType = ImageSizeValueType.cell;
                            break;
                        default:
                            ContentImageWidth = new SizeValue(AttrList["image-width"]);
                            WidthSizeType = ImageSizeValueType.spec;
                            break;
                    }

                if (!AttrList.ContainsKey("image-height"))
                    HeightSizeType = ImageSizeValueType.image;
                else
                    switch (AttrList["image-height"].ToLowerInvariant())
                    {
                        case "auto":
                            HeightSizeType = ImageSizeValueType.cell;
                            break;
                        default:
                            ContentImageHeight = new SizeValue(AttrList["image-height"]);
                            HeightSizeType = ImageSizeValueType.spec;
                            break;
                    }
            }
            else return;

            // musí být před Image, kvůli kontrole na existencí obrázku
            if (AttrList.ContainsKey("file"))
                ImageFileName = AttrList["file"];

            if (AttrList.ContainsKey("global"))
                Global = Convert.ToBoolean(AttrList["global"]);

            Image = ImageService.GetImage(ImageFileName, formFile, false);

            isLoadInformation = false;
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
            graphics.Clip = new Region(RectangleF.Intersect(new RectangleF(LeftZoom - 1, TopZoom - 1, WidthZoom + 2, HeightZoom + 2), graphics.VisibleClipBounds));

            DrawClear(graphics);

            float zoom = GraphicSettingService.Zoom, w;
            switch (WidthSizeType)
            {
                case ImageSizeValueType.cell:
                    w = WidthZoom;
                    break;
                case ImageSizeValueType.image:
                    w = Image != null ? Image.Size.Width * zoom : WidthZoom;
                    break;
                default:
                    w = !ContentImageWidth.IsEmpty ? ContentImageWidth * zoom : WidthZoom;
                    break;
            }

            float h;
            switch (HeightSizeType)
            {
                case ImageSizeValueType.cell:
                    h = HeightZoom;
                    break;
                case ImageSizeValueType.image:
                    h = Image != null ? Image.Size.Height * zoom : HeightZoom;
                    break;
                default:
                    h = !ContentImageHeight.IsEmpty ? ContentImageHeight * zoom : HeightZoom;
                    break;
            }

            RectangleF rect = new RectangleF(LeftZoom, TopZoom, w, h);

            if (Image != null)
                graphics.DrawImage(Image, rect);
            else
                DrawNoImage(graphics, rect);

            if (Anchor)
                TagService.DrawTagAnchor(graphics, BoundsInPixels);

            List<int> order = Order;
            if (order.Count > 0 && GraphicSettingService.ShowOrder)
                // do pravého horního rohu
                TagService.DrawTagOrder(graphics, new PointF(LeftZoom, TopZoom), Order.Last().ToString(), Zoom);

            if (Page != null)
                Page.DelayPaintList.Add(new DelayPaintItem(this, IsSelected, reg));

            graphics.Clip = reg;
        }
        /// <summary>
        /// Kreslení defaultního obrázku
        /// </summary>
        /// <param name="graphics">Ovladač grafiky</param>
        /// <param name="rect">Místo na vykreslení</param>
        void DrawNoImage(Graphics graphics, RectangleF rect)
        {
            graphics.DrawLine(new Pen(Color.Red) { Width = 3 }, rect.Left, rect.Top, rect.Left + rect.Width, rect.Top + rect.Height);
            graphics.DrawLine(new Pen(Color.Red) { Width = 3 }, rect.Left, rect.Top + rect.Height, rect.Left + rect.Width, rect.Top);
        }
        /// <summary>
        /// Vymazání rámečku indikujícího, že daný objekt je aktivní
        /// </summary>
        /// <param name="graphics">Kreslící nástroj</param>
        protected override void DrawClear(System.Drawing.Graphics graphics)
        {
            // v případě, že typ řádku není COLUMNS, pak kreslíme pozadí
            if (!(Parent is ICell && (Parent as ICell).Line.Type == LineType.columns))
                if (BackColor.Color != Color.Transparent && ShowBackground)
                    // uživatelsky daná barva stránky
                    graphics.FillRectangle(new SolidBrush(BackColor.Color), BoundsInPixels);
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
            XmlElement xmlNode = xmlDoc.CreateElement("image", string.IsNullOrEmpty(namespaceUri) ? ReportDesignerProperties.Instance.AlfReportXmlns : namespaceUri);
            if (formFile == null)
                SetFormFile();

            ImageService.SetSaved(ImageFileName, formFile);

            if (Global)
                xmlNode.SetAttribute("global", "true");

            xmlNode.SetAttribute("file", ImageFileName != null ? Convert.ToString(ImageFileName).Trim('\\') : String.Empty);

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

            if (Parent is ICell)
            {
                if (!IsWidthByContent)
                    xmlNode.SetAttribute("width", Width.MathRoundValue(2));
                if (!IsHeightByContent)
                    xmlNode.SetAttribute("height", Height.MathRoundValue(2));
            }
            else
            {
                if (withRect)
                {
                    // uložení informaci o rámečku pro daný objekt
                    string value = TagService.GetRect(this);
                    if (!string.IsNullOrEmpty(value))
                        xmlNode.SetAttribute("rect", value);
                }

                if (Page.Order != 1)
                    //Uložení informaci o stránce, na které se nachází daný objekt
                    xmlNode.SetAttribute("page", Convert.ToString(Page.Order));
            }

            if (!string.IsNullOrEmpty(LabelText))
                xmlNode.SetAttribute("labeltext", CharacterEncodings.GetHexCodeText(LabelText));

            //uložení skriptů
            XmlDocumentService.SetListOfDictionaryItems(xmlNode, Scripts, styles);
            // uložíme neznámé značky
            XmlDocumentService.SetListOfDictionaryItems(xmlNode, Unknowns, styles);

            return xmlNode;
        }

        List<string> knownTags;
        /// <summary>
        /// Známě značky obrázku
        /// </summary>
        public override List<string> KnownTags
        {
            get
            {
                if (knownTags == null)
                    knownTags = AddInTree.BuildItem("/ReportDesigner/GrfList/ImageTags", null) as List<string>;
                return knownTags;
            }
        }
        #endregion

        #region IImage
        UndoRedo<SizeValue> contentimageheight;
        /// <summary>
        /// Výška obrázku
        /// </summary>
        [Category("Obrázek")]
        [DisplayName("výška obrázku")]
        [Description("Výška obrázku objektu")]
        public virtual SizeValue ContentImageHeight { get { return contentimageheight.Value; } set { contentimageheight.Value = value; } }

        UndoRedo<SizeValue> contentimagewidth;
        /// <summary>
        /// Výška obrázku
        /// </summary>
        [Category("Obrázek")]
        [DisplayName("šířka obrázku")]
        [Description("Šířka obrázku objektu")]
        public virtual SizeValue ContentImageWidth { get { return contentimagewidth.Value; } set { contentimagewidth.Value = value; } }

        UndoRedo<bool> global;
        /// <summary>
        /// Vlastnost, indikující globálnost obrázku
        /// </summary>
        [Category("Obrázek")]
        [DisplayName("globální")]
        [Description("Indikuje, že obrázek je globální")]
        [TypeConverter(typeof(BooleanTypeConverter))]
        public virtual bool Global { get { return global.Value; } set { global.Value = value; if (value) Image = null; } }

        UndoRedo<Image> image;
        /// <summary>
        /// Obrázek pozadí
        /// </summary>
        [Category("Obrázek")]
        [DisplayName("obrázek")]
        [Description("Obrázek objektu")]
        [Browsable(false)]
        public virtual Image Image { get { return image.Value; } set { image.Value = value; if (image.Value != null) Global = false; } }

        UndoRedo<string> imagefilename;
        /// <summary>
        /// Obrázek pozadí
        /// </summary>
        [Category("Obrázek")]
        [DisplayName("název obrázku")]
        [Description("Název obrázku objektu v seznamu všech obrázků dané sestavy")]
        [EditorAttribute(typeof(ImageFileNameTypeEditor), typeof(UITypeEditor))]
        [TypeConverter(typeof(ImageFileNameConverter))]
        public virtual string ImageFileName
        {
            get { return imagefilename.Value; }
            set
            {
                if (!isLoadInformation)
                {
                    if (formFile == null)
                        SetFormFile();

                    if (!string.IsNullOrEmpty(value)
                        && !string.IsNullOrEmpty(imagefilename.Value))
                    {
                        // pokud obrázek s daným názvem existuje, pak ho načteme
                        // tato odbočka je pro případ, že chceme načíst obrázek zadaním názvu
                        if (!imagefilename.Value.Equals(value, StringComparison.InvariantCultureIgnoreCase))
                        {
                            Image bmp = ImageService.GetImage(value, formFile, false);
                            if (bmp != Image && ImageService.CopyImage(imagefilename.Value, value, formFile))
                                Image = ImageService.GetImage(value, formFile, false);
                        }
                    }
                    else
                        if (!string.IsNullOrEmpty(value) && Image == null)
                        Image = ImageService.GetImage(value, formFile, false);
                }

                imagefilename.Value = value;
            }
        }

        UndoRedo<ImageSizeValueType> widthsizetype;
        /// <summary>
        /// Obrázek pozadí
        /// </summary>
        [Category("Obrázek")]
        [DisplayName("typ šířky")]
        [Description("Typ velikosti šířky obrázku")]
        public virtual ImageSizeValueType WidthSizeType { get { return widthsizetype.Value; } set { widthsizetype.Value = value; } }

        UndoRedo<ImageSizeValueType> heightsizetype;
        /// <summary>
        /// Obrázek pozadí
        /// </summary>
        [Category("Obrázek")]
        [DisplayName("typ výšky")]
        [Description("Typ velikosti výšky obrázku")]
        public virtual ImageSizeValueType HeightSizeType { get { return heightsizetype.Value; } set { heightsizetype.Value = value; } }
        #endregion

        /// <summary>
        /// Tento soubor pro případ IFormFormation sestav se může líšit od ActiveViewContent.PrimaryFile
        /// </summary>
        OpenedFile formFile;
        bool isLoadInformation;

        /// <summary>
        /// inicializace objektu
        /// </summary>
        public override AbstractContent Initialize()
        {
            base.Initialize();
            contentimageheight = new UndoRedo<SizeValue>();
            contentimagewidth = new UndoRedo<SizeValue>();
            global = new UndoRedo<bool>();
            image = new UndoRedo<Image>();
            imagefilename = new UndoRedo<string>();
            widthsizetype = new UndoRedo<ImageSizeValueType>();
            heightsizetype = new UndoRedo<ImageSizeValueType>();
            formFile = null;
            ComponentType = ComponentType.image;
            return this;
        }

        /// <summary>
        /// inicializace objektu dle dostupných informaci
        /// </summary>
        /// <param name="node">Položka bočního panelu s informaci o vkládaném objektu</param>
        public override AbstractContent Initialize(SideTabItem node)
        {
            base.Initialize(node);
            ContentImageWidth = new SizeValue(0);
            ContentImageHeight = new SizeValue(0);
            BackColor = new URComplexColor().Initialize(Color.Transparent);

            if (ReportDesignerDesignerProperties.Instance.ImageShowDialog)
            {
                string imageName = string.Empty;
                Image = CommonService.GetNewImageByDialog(ref imageName);
                ImageFileName = imageName;
            }
            return this;
        }

        /// <summary>
        /// inicializace objektu dle dostupných informaci
        /// </summary>
        /// <param name="node">Položka bočního panelu s informaci o vkládaném objektu</param>
        public override AbstractContent Initialize(AbstractExtTreeNode node)
        {
            base.Initialize(node);
            BackColor = new URComplexColor().Initialize(Color.Transparent);
            ImageFileName = LocalCommonService.GetText(node.FullName, System.IO.Path.DirectorySeparatorChar);
            return this;
        }
        void SetFormFile()
        {
            if (SimpleDesktop.Desktop.ActiveViewContent is IFormFormation)
                formFile = (SimpleDesktop.Desktop.ActiveViewContent as IFormFormation).FormFile;
            else
                formFile = SimpleDesktop.Desktop.ActiveViewContent.PrimaryFile;
        }
    }
}
