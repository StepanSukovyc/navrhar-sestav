//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ContentImage.cs                       </Name>
//    <Description> Obrázek sestavy GRF                                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.ComponentModel;
using System.Drawing;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Utils;
using Gordic.Report.Implementation;
using Gordic.General;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Obrázek sestavy GRF
    /// </summary>
    public class DefaultContentImage : DefaultAbstractContent, IImage, IMouseComponent, IScriptable, IDefaultDataBound
    {
        #region AbstractContent
        /// <summary>
        /// Tento soubor pro případ IFormFormation sestav se může líšit od ActiveViewContent.PrimaryFile
        /// </summary>
        OpenedFile formFile = null;
        bool isLoadInformation = true;

        /// <summary>
        /// Načtení informaci o objektu z formátu daného objektu
        /// </summary>
        public override void LoadInformation()
        {
            isLoadInformation = true;

            //Pokud položka není obrázkem, pak není co řešit
            if (!(FormatTag is GFEFormatContentImage))
                return;

            if (isLoaded)
                return;

            if (_View is IFormFormation)
                formFile = (_View as IFormFormation).FormFile;

            base.LoadInformation();

            ComponentType = Gordic.GFE.Parsers.ComponentType.image;
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

            // musí být před Image, kvůli kontrole na existencí obrázku
            ImageFileName = _formatTag.ImageFileName;

            if (_formatTag.Attributes.ContainsKey("global"))
                Global = Convert.ToBoolean(_formatTag.Attributes["global"]);

            isLoadInformation = false;
            isLoaded = true;
        }
        /// <summary>
        /// Kreslení objektu
        /// </summary>
        /// <param name="graphics">Ovladač grafiky</param>
        /// <param name="args">Upřesnení co a jak vykreslovat</param>
        public override void OnPaint(Graphics graphics, PaintArgs args)
        {
            if (!graphics.VisibleClipBounds.IntersectsWith(BoundsInPixels))
                return;

            Region reg = graphics.Clip;
            graphics.Clip = new Region(RectangleF.Intersect(BoundsInPixels, graphics.VisibleClipBounds));
            if (args.DrawBackground)
                DrawClear(graphics, null);

            if (args.DrawContent)
            {
                float zoom = GraphicSettingService.GetZoom(_View);
                float h = 0, w = 0;
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

                RectangleF rect = new RectangleF(ContentBounds.Left, ContentBounds.Top, w, h);
                if (Image != null)
                    graphics.DrawImage(Image, rect);
                else
                {
                    if (FormatTag.NativeContent is IGImageGenerator gen)
                    {
                        Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(gen.getHandleSize(out IntPtr dib, Width.IntValue, Height.IntValue, (int)(rect.Width + 0.5F), (int)(rect.Height + 0.5F)));
                        using (var i = Image.FromHbitmap(dib))
                            graphics.DrawImageUnscaled(i, Rectangle.Truncate(rect));
                        gen = null;
                    }
                    else
                        CommonService.DrawNoImage(graphics, rect);
                }
            }
            graphics.Clip = reg;
            if (args.DrawBorder && Page != null)
                Page.DelayPaintList.Add(new DelayPaintItem(this, IsSelected, reg));
        }
        #endregion

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

        bool global;
        /// <summary>
        /// Vlastnost, indikující globálnost obrázku
        /// </summary>
        public bool Global { get { return global; } set { global = value; if (value) Image = null; } }

        Image image;
        /// <summary>
        /// Obrázek pozadí
        /// </summary>
        public Image Image { get { return image; } set { image = value; if (image != null) Global = false; } }

        string imagefilename;
        /// <summary>
        /// Obrázek pozadí
        /// </summary>
        public string ImageFileName
        {
            get { return imagefilename; }
            set
            {
                if (!isLoadInformation)
                {
                    if (ImageService.CopyImage(imagefilename, value, formFile))
                    {
                        imagefilename = value;
                        Image = ImageService.GetImage(ImageFileName, formFile, false);
                    }
                    // eliminuje stav načtení objektu
                    else if (Image != null)
                        MessageService.ShowErrorFormatted(string.Join(" ", GResources.GetResourceText(29450280), "'{0}'", GResources.GetResourceText(29450279)), value); //RC 29450280 : Obrázek s názvem
                    else imagefilename = value;
                }
                else imagefilename = value;
            }
        }

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
        /// inicializace objektu
        /// </summary>
        /// <param name="item">položka s informaci o objektu</param>
        /// <param name="view">pohled objektu</param>
        public override void Initialize(GFEFormatTag item, IViewContent view)
        {
            base.Initialize(item, view);
            ComponentType = ComponentType.imageof;
            LoadInformation();
        }
        DefaultDataManager m_manager;
        System.Data.DataRow m_datarow;
        /// <summary>Správce skriptů</summary>
        public ScriptManager ScriptManager { get { return m_manager.ScriptManager; } }

        /// <summary>
        /// napojení dat k objektu
        /// </summary>
        /// <param name="dataRegion">region s daty</param>
        protected override void AttachData(IDataRegion dataRegion)
        {
            if (dataRegion != null)
            {
                m_manager = dataRegion.Manager;
                m_datarow = dataRegion.GetDataRow(AttrList, out _);
            }

            if (Global)
            {
                var shortName = System.IO.Path.GetFileName(ImageFileName);
                var globalName = dataRegion.Manager.Data.ExtendedProperties["Image_Reloc_" + shortName];
                if (globalName != null)
                    Image = ImageService.GetImageByPath(globalName.ToString(), ignoreExt: true);
            }
            if (Image == null)
                Image = ImageService.GetImage(ImageFileName, formFile, false);

        }

        #region IMouseComponent Members

        string OnClick
        {
            get { return Scripts.GetValueDefault("onClick"); }
        }

        void IMouseComponent.Click(float x, float y)
        {
            GScript s;
            var l_script = OnClick;
            if (l_script.Length == 0) return;
            s = ScriptManager.PrepareScript(FormatTag, "onClick", l_script, this);
            if (s == null) return;
            try { ScriptManager.RunScript(s); }
            finally { s.Dispose(); }
        }
        void IMouseComponent.HoverEnd()
        {
            (PagePanel as FillerPagePanel).TkHoverEnd(this);
        }
        void IMouseComponent.Hover(float x, float y)
        {
            (PagePanel as FillerPagePanel).TkHover(this, x, y, OnClick.Length > 0);
        }

        #endregion
        #region IScriptable Members

        int IScriptable.getProperty(string name, out IDataScriptable value)
        {
            return base.GetProperty(ScriptManager, name, out value);
        }

        int IScriptable.setProperty(string name, IDataScriptable value)
        {
            return base.SetProperty(ScriptManager, name, value);
        }
        #endregion
        #region IDefaultDataBound Members
        System.Data.DataRow IDefaultDataBound.DataRow
        {
            get { return m_datarow; }
        }
        DefaultDataManager IDefaultDataBound.DataManager
        {
            get { return m_manager; }
        }
        #endregion
    }
}
