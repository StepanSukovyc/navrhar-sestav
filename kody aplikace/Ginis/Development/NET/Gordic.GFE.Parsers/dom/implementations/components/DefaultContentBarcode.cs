//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DefaultContentBarcode.cs                 </Name>
//    <Description> Čárový kód                                                  </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2016-10-19                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Drawing.Imaging;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Utils;
using Gordic.Report.Implementation;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Čárový kód
    /// </summary>
    public class DefaultContentBarcode : DefaultAbstractContent, IImage
    {
        #region AbstractContent
        /// <summary>
        /// Načtení informaci o objektu z formátu daného objektu
        /// </summary>
        public override void LoadInformation()
        {
            //Pokud položka není obrázkem, pak není co řešit
            if (!(FormatTag is GFEFormatContentBarcode))
                return;

            base.LoadInformation();

            ComponentType = ComponentType.barcode;
            TypeRaw = FormatTag.Attributes["type"];

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

            isLoaded = true;
        }
        #endregion

        //type="qrcode,2,7" 
        public string TypeRaw { get; private set; }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <param name="item">položka s informaci o objektu</param>
        /// <param name="view">pohled objektu</param>
        public override void Initialize(GFEFormatTag item, IViewContent view)
        {
            base.Initialize(item, view);
            ComponentType = ComponentType.barcode;
            LoadInformation();
        }

        private DefaultDataManager m_manager = null;
        private System.Data.DataRow m_datarow = null;

        /// <summary>
        /// napojení dat k objektu
        /// </summary>
        /// <param name="dataRegion">region s daty</param>
        protected override void AttachData(IDataRegion dataRegion)
        {
            if (dataRegion != null)
            {
                m_manager = dataRegion.Manager;
                m_datarow = dataRegion.GetDataRow(this.AttrList, out _);
                if (FormatTag != null)
                    foreach (var ch in FormatTag.Children)
                    {
                        var c = FillerService.CreateAndInitContent(null, this.Page, ch, dataRegion, this._View);
                        if (c != null)
                            AddChild(c);
                    }
            }
        }

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

        #region IImage
        /// <summary>
        /// Výška obrázku
        /// </summary>
        public SizeValue ContentImageHeight { get; set; }

        /// <summary>
        /// Výška obrázku
        /// </summary>
        [Category("Obrázek")]
        [DisplayName("šířka obrázku")]
        [Description("Šířka obrázku objektu")]
        public SizeValue ContentImageWidth { get; set; }

        /// <summary>
        /// Vlastnost, indikující globálnost obrázku
        /// </summary>
        public bool Global { get { return false; } set { } }

        /// <summary>
        /// Obrázek pozadí
        /// </summary>
        public Image Image { get { return null; } set { } }

        /// <summary>
        /// Obrázek pozadí
        /// </summary>
        public string ImageFileName { get { return null; } set { } }

        /// <summary>
        /// Obrázek pozadí
        /// </summary>
        public ImageSizeValueType WidthSizeType { get; set; }
        /// <summary>
        /// Obrázek pozadí
        /// </summary>
        public ImageSizeValueType HeightSizeType { get; set; }
        #endregion



        /// <summary>
        /// Kreslení obsahu BARCODE
        /// </summary>
        /// <param name="graphics">Ovladač grafiky</param>
        /// <param name="args">Upřesnění co a jak vykreslovat</param>
        public override void OnPaint(Graphics graphics, PaintArgs args)
        {
            if (!graphics.VisibleClipBounds.IntersectsWith(BoundsInPixels))
                return;

            Region reg = graphics.Clip;
            //graphics.Clip = new Region(RectangleF.Intersect(BoundsInPixels, graphics.VisibleClipBounds));
            if (args.DrawBackground)
                DrawClear(graphics, null);

            if (args.DrawContent)
            {
                float zoom = GraphicSettingService.GetZoom(_View);
                float w;
                switch (WidthSizeType)
                {
                    case ImageSizeValueType.cell:
                        w = ContentBounds.Width;
                        break;
                    case ImageSizeValueType.image:
                        w = Image != null ? Image.Size.Width * zoom : ContentBounds.Width;
                        break;
                    default:
                        w = !ContentImageWidth.IsEmpty ? ContentImageWidth * zoom : ContentBounds.Width;
                        break;
                }

                float h;
                switch (HeightSizeType)
                {
                    case ImageSizeValueType.cell:
                        h = ContentBounds.Height;
                        break;
                    case ImageSizeValueType.image:
                        h = Image != null ? Image.Size.Height * zoom : ContentBounds.Height;
                        break;
                    default:
                        h = !ContentImageHeight.IsEmpty ? ContentImageHeight * zoom : ContentBounds.Height;
                        break;
                }

                CommonService.DrawBarcode(this, Children, TypeRaw, AttrList, graphics, new RectangleF(ContentBounds.Left, ContentBounds.Top, w, h));
            }
            graphics.Clip = reg;
            if (args.DrawBorder && Page != null)
                Page.DelayPaintList.Add(new DelayPaintItem(this, IsSelected, reg));
        }
    }
}
