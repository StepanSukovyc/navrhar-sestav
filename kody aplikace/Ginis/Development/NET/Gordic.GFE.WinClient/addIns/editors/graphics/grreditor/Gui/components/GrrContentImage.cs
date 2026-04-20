//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GrrContentImage.cs                     </Name>
//    <Description> objekt, prezentující obrázek                                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-05-17                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Drawing.Design;
using System.Xml;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.Designer.Gui;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;
using Gordic.Report.Implementation;
using Gordic.GFE.Parsers.AddIns;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// objekt, prezentující obrázek
    /// </summary>
    class GrrContentImage : AbstractContentLineable, IImage, IBackground
    {
        #region AbstractContentLineable
        /// <summary>
        /// nastavení výšky dle obsahu
        /// </summary>
        public override void SetHeightByContent()
        {
            Height = new SizeValue(ReportDesignerDesignerProperties.Instance.DefaultSizeHeight);
        }
        /// <summary>
        /// Načtení informaci o objektu z formátu daného objektu
        /// </summary>
        public override void LoadInformation()
        {
            SetFormFile();

            base.LoadInformation();

            ContentImageWidth = new SizeValue(0);
            ContentImageHeight = new SizeValue(0);

            // zafixujeme objekt
            GFEFormatContentImage _formatTag = (GFEFormatContentImage)FormatTag;

            //pokud položka není obrázkem, pak není co řešit
            if (_formatTag == null)
                return;

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

            // musí být před Image, kvůli kontrole na existencí obrázku
            ImageFileName = _formatTag.ImageFileName;
            Image = ImageService.GetImage(ImageFileName, formFile, false);

            if (_formatTag.Attributes.ContainsKey("global"))
                Global = Convert.ToBoolean(_formatTag.Attributes["global"]);
        }

        void SetFormFile()
        {
            formFile = SimpleDesktop.Desktop.ActiveViewContent is IFormFormation
                ? (SimpleDesktop.Desktop.ActiveViewContent as IFormFormation).FormFile
                : SimpleDesktop.Desktop.ActiveViewContent.PrimaryFile;
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

            float zoom = Zoom;
            float w;
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
            graphics.Clip = new Region(rect);
            if (Image != null)
                graphics.DrawImage(Image, rect);
            else
                DrawNoImage(graphics, rect);

            if (Anchor)
                TagService.DrawTagAnchor(graphics, BoundsInPixels);

            graphics.Clip = reg;
            if (Page != null)
                Page.DelayPaintList.Add(new DelayPaintItem(this, IsSelected, reg));
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
            if (BackColor.Color != Color.Transparent && ShowBackground)
                // uživatelsky daná barva stránky
                graphics.FillRectangle(new SolidBrush(BackColor.Color), BoundsInPixels);
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
                    knownTags = AddInTree.BuildItem("/ReportDesigner/GrrList/ImageTags", null) as List<string>;
                return knownTags;
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
            XmlElement xmlNode = xmlDoc.CreateElement("image", string.IsNullOrEmpty(namespaceUri) ? ReportDesignerProperties.Instance.AlfReportXmlns : namespaceUri);

            if (formFile == null)
                SetFormFile();
            ImageService.SetSaved(ImageFileName, formFile);

            if (Global)
                xmlNode.SetAttribute("global", "true");

            xmlNode.SetAttribute("file", Convert.ToString(ImageFileName).Trim('\\'));

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

            //uložení skriptů
            XmlDocumentService.SetListOfDictionaryItems(xmlNode, Scripts, styles);
            // uložíme neznámé značky
            XmlDocumentService.SetListOfDictionaryItems(xmlNode, Unknowns, styles);

            return xmlNode;
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
        public virtual SizeValue ContentImageHeight { get => contentimageheight.Value; set => contentimageheight.Value = value; }

        UndoRedo<SizeValue> contentimagewidth;
        /// <summary>
        /// Výška obrázku
        /// </summary>
        [Category("Obrázek")]
        [DisplayName("šířka obrázku")]
        [Description("Šířka obrázku objektu")]
        public virtual SizeValue ContentImageWidth { get => contentimagewidth.Value; set { contentimagewidth.Value = value; } }

        UndoRedo<bool> global;
        /// <summary>
        /// Vlastnost, indikující globálnost obrázku
        /// </summary>
        [Category("Obrázek")]
        [DisplayName("globální")]
        [Description("Indikuje, že obrázek je globální")]
        [TypeConverter(typeof(BooleanTypeConverter))]
        public virtual bool Global { get => global.Value; set { global.Value = value; if (value) Image = null; } }

        UndoRedo<Image> image;
        /// <summary>
        /// Obrázek pozadí
        /// </summary>
        [Category("Obrázek")]
        [DisplayName("obrázek")]
        [Description("Obrázek objektu")]
        [Browsable(false)]
        public virtual Image Image { get => image.Value; set { image.Value = value; if (image.Value != null) Global = false; } }

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
            get => imagefilename.Value;
            set
            {
                if (!isLoading)
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
        public virtual ImageSizeValueType WidthSizeType { get => widthsizetype.Value; set => widthsizetype.Value = value; }

        UndoRedo<ImageSizeValueType> heightsizetype;
        /// <summary>
        /// Obrázek pozadí
        /// </summary>
        [Category("Obrázek")]
        [DisplayName("typ výšky")]
        [Description("Typ velikosti výšky obrázku")]
        public virtual ImageSizeValueType HeightSizeType { get => heightsizetype.Value; set => heightsizetype.Value = value; }
        #endregion

        /// <summary>
        /// Tento soubor pro případ IFormFormation sestav se může líšit od ActiveViewContent.PrimaryFile
        /// </summary>
        OpenedFile formFile;

        /// <summary>
        /// inicializace objektu
        /// </summary>
        public override AbstractContent Initialize()
        {
            base.Initialize();
            heightsizetype = new UndoRedo<ImageSizeValueType>();
            widthsizetype = new UndoRedo<ImageSizeValueType>();
            imagefilename = new UndoRedo<string>();
            image = new UndoRedo<Image>();
            global = new UndoRedo<bool>();
            contentimagewidth = new UndoRedo<SizeValue>();
            contentimageheight = new UndoRedo<SizeValue>();
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
            // zobrazení dialogového okna na výběr obrázku
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
    }
}
