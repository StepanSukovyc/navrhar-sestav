//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GrrContentChart.cs                     </Name>
//    <Description> objekt pro práci s grafem                                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-05-17                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Windows.Forms;
using System.Xml;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;
using Gordic.Report.Implementation;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Services;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// objekt pro práci s grafem
    /// </summary>
    class GrrContentChart : AbstractContentLineable, IBackground, IChart
    {
        #region AbstractContentLineable
        /// <summary>
        /// nastavení výšky dle obsahu
        /// </summary>
        public override void SetHeightByContent()
        {
            Height = new SizeValue("5mm");
        }
        /// <summary>
        /// Načtení informaci o objektu z formátu daného objektu
        /// </summary>
        public override void LoadInformation()
        {
            // pokud položka není obrázkem, pak není co řešit
            if (FormatTag is GFEFormatContentChart)
            {
                base.LoadInformation();

                ContentChartWidth = new SizeValue(0);
                ContentChartHeight = new SizeValue(0);

                // zafixujeme objekt
                var _formatTag = (GFEFormatContentChart)FormatTag;
                switch (_formatTag.ImageWidth.mtr)
                {
                    case Grr06Metrics.MMeters:
                        ContentChartWidth = new SizeValue(Math.Round(_formatTag.ImageWidth.met, 2) + "mm");
                        WidthSizeType = ImageSizeValueType.spec;
                        break;
                    case Grr06Metrics.Percent:
                        ContentChartWidth = new SizeValue(Math.Round(_formatTag.ImageWidth.met, 2) + "%");
                        WidthSizeType = ImageSizeValueType.spec;
                        break;
                    case Grr06Metrics.Points:
                        ContentChartWidth = new SizeValue(Math.Round(_formatTag.ImageWidth.met, 2) + "pt");
                        WidthSizeType = ImageSizeValueType.spec;
                        break;
                    case Grr06Metrics.Twip:
                        ContentChartWidth = new SizeValue(Math.Round(_formatTag.ImageWidth.met) + "tw");
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
                        ContentChartHeight = new SizeValue(Math.Round(_formatTag.ImageHeight.met, 2) + "mm");
                        HeightSizeType = ImageSizeValueType.spec;
                        break;
                    case Grr06Metrics.Points:
                        ContentChartHeight = new SizeValue(Math.Round(_formatTag.ImageHeight.met, 2) + "pt");
                        HeightSizeType = ImageSizeValueType.spec;
                        break;
                    case Grr06Metrics.Twip:
                        ContentChartHeight = new SizeValue(Math.Round(_formatTag.ImageHeight.met) + "tw");
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
            else if (FormatTag != null && FormatTag.TagName.Equals("chart", StringComparison.InvariantCultureIgnoreCase))
            {
                CommonService.ApplayStyle(this, this.AttrList);
                ContentChartWidth = new SizeValue(0);
                ContentChartHeight = new SizeValue(0);

                if (AttrList.ContainsKey("image-width"))
                    switch (AttrList["image-width"].ToLowerInvariant())
                    {
                        case "auto":
                            WidthSizeType = ImageSizeValueType.cell;
                            break;
                        default:
                            ContentChartWidth = new SizeValue(AttrList["image-width"]);
                            WidthSizeType = ImageSizeValueType.spec;
                            break;
                    }

                if (AttrList.ContainsKey("image-height"))
                    switch (AttrList["image-height"].ToLowerInvariant())
                    {
                        case "auto":
                            HeightSizeType = ImageSizeValueType.cell;
                            break;
                        default:
                            ContentChartHeight = new SizeValue(AttrList["image-height"]);
                            HeightSizeType = ImageSizeValueType.spec;
                            break;
                    }
            }
            else return;

            // musí být před Image, kvůli kontrole na existencí obrázku
            if (AttrList.ContainsKey("type"))
            {
                Charting.ChartType ct = Charting.ChartType.line;
                Enum.TryParse(Convert.ToString(AttrList["type"]), out ct);
                ChartType = ct;
            }

            // 3d kreslení
            bool draw3D = true;
            if (AttrList.ContainsKey("draw3d"))
                bool.TryParse(AttrList["draw3d"], out draw3D);
            Draw3D = draw3D;

            // množina dat
            if (AttrList.ContainsKey("name"))
                DataSetName = AttrList["name"];
            if (AttrList.ContainsKey("color"))
                DataSetColor = new URComplexColor().Initialize(AttrList["color"]);

            // skupina
            if (AttrList.ContainsKey("group-small"))
                GroupSmall = AttrList["group-small"];
            if (AttrList.ContainsKey("group-limit"))
                GroupLimit = new SizeValue(AttrList["group-limit"]);
            else GroupLimit = new SizeValue("5%");

            float aff = 0.8f;
            if (AttrList.ContainsKey("zero-affinity"))
                float.TryParse(AttrList["zero-affinity"], out aff);
            ZeroAffinity = aff;

            // kroky
            int step = 1;
            if (AttrList.ContainsKey("label-minor-step"))
                int.TryParse(AttrList["label-minor-step"], out step);
            StepMinor = step;

            step = 1;
            if (AttrList.ContainsKey("label-major-step"))
                int.TryParse(AttrList["label-major-step"], out step);
            StepMajor = step;

            //paleta barev            
            SetColorPalette(AttrList.ContainsKey("color-palette") ? AttrList["color-palette"] : null);

            ComponentType = Gordic.GFE.Parsers.ComponentType.chart;

            if (FormatTag != null)
            {
                foreach (var item in FormatTag.Children)
                    if (item.TagName.Equals("layer", StringComparison.OrdinalIgnoreCase))
                        LoadInternalLayer(item);
                    else if (item.TagName.Equals("data", StringComparison.OrdinalIgnoreCase)
                        || item.TagName.Equals("region", StringComparison.OrdinalIgnoreCase))
                        LoadInternalData(item);
            }
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
            else
            {
                ButtonRenderer.DrawButton(graphics, Rectangle.Truncate(BoundsInPixels), System.Windows.Forms.VisualStyles.PushButtonState.Normal);

                Image img = null;
                switch (Convert.ToString(ChartType).ToLowerInvariant())
                {
                    case "area":
                        img = WinFormsResourceService.GetBitmap("Icons__Gin__graf_rozpadovy");
                        break;
                    case "bar":
                        img = WinFormsResourceService.GetBitmap("Icons__Gin__graf_sloupcovy");
                        break;
                    case "line":
                        img = WinFormsResourceService.GetBitmap("Icons__Gin__graf_spojnicovy");
                        break;
                    default:
                        img = WinFormsResourceService.GetBitmap("Icons__Gin__graf_kolacovy");
                        break;
                }
                graphics.DrawImageUnscaledAndClipped(img, new Rectangle((int)LeftZoom, (int)TopZoom, (int)WidthZoom, (int)HeightZoom));
            }
        }
        /// <eclude/>
        public override void OnPaint(Graphics graphics, PaintArgs args)
        {
            if (!graphics.VisibleClipBounds.IntersectsWith(BoundsInPixels))
                return;

            base.OnPaint(graphics, args);

            Region reg = graphics.Clip;
            graphics.Clip = new Region(RectangleF.Intersect(BoundsInPixels, graphics.VisibleClipBounds));

            if (DisplayText != null)
                DisplayText.Paint(graphics, BoundsInPixels, Padding, GraphicSettingService.Zoom);

            graphics.Clip = reg;
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
            XmlElement xmlNode = xmlDoc.CreateElement("chart", string.IsNullOrEmpty(namespaceUri) ? ReportDesignerProperties.Instance.AlfReportXmlns : namespaceUri);

            xmlNode.SetAttribute("type", Convert.ToString(ChartType));
            switch (WidthSizeType)
            {
                case ImageSizeValueType.cell:
                    xmlNode.SetAttribute("image-width", "auto");
                    break;
                case ImageSizeValueType.spec:
                    xmlNode.SetAttribute("image-width", ContentChartWidth.Value.Replace(',', '.'));
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
                    xmlNode.SetAttribute("image-height", ContentChartHeight.Value.Replace(',', '.'));
                    break;
                default:
                    break;
            }
            // 3d kreslení
            if (!Draw3D)
                xmlNode.SetAttribute("draw3d", "false");

            // množina dat
            if (!string.IsNullOrEmpty(this.DataSetName))
                xmlNode.SetAttribute("name", DataSetName);

            if (DataSetColor != null && DataSetColor.Color != Color.Transparent)
                xmlNode.SetAttribute("color", DataSetColor.Name);

            // skupina
            if (!string.IsNullOrEmpty(GroupSmall))
                xmlNode.SetAttribute("group-small", GroupSmall);
            if (GroupLimit.Value != "5%")
                xmlNode.SetAttribute("group-limit", GroupLimit.Value);

            if (ZeroAffinity != 0.8f)
                xmlNode.SetAttribute("zero-affinity", ZeroAffinity.ToString());

            // kroky
            if (StepMinor != 1)
                xmlNode.SetAttribute("label-minor-step", StepMinor.ToString());
            if (StepMajor != 1)
                xmlNode.SetAttribute("label-major-step", StepMajor.ToString());

            //paleta barev
            if (ColorPalette != null)
            {
                string cP = string.Empty;
                foreach (var item in ColorPalette)
                    cP += item.Name + ",";
                cP = cP.TrimEnd(',');

                if (!string.IsNullOrEmpty(cP))
                    xmlNode.SetAttribute("color-palette", cP);
            }

            //uložení skriptů
            XmlDocumentService.SetListOfDictionaryItems(xmlNode, Scripts, styles);
            // uložíme neznámé značky
            // TODO: po aktualizací objektu dodělat pouze neznáme značky
            XmlDocumentService.SetListOfDictionaryItems(xmlNode, Unknowns, styles);
            //// uložení vnitřního obsahu
            //XmlDocumentService.SetInnerText(xmlDoc, xmlNode, InnerText);

            foreach (var item in Layers)
                xmlNode.AppendChild(item.GetDataComponent(xmlDoc, namespaceUri));

            try
            {
                foreach (var item in Data)
                    // uložení vnitřního obsahu
                    XmlDocumentService.SetInnerText(xmlDoc, xmlNode, item.InnerText);
            }
            catch (Exception ex) { MessageService.ShowError(ex); }

            return xmlNode;
        }
        #endregion

        #region IChart
        UndoRedo<Charting.ChartType> charttype;
        /// <summary>
        /// Výška obrázku
        /// </summary>
        [Category("Graf")]
        [DisplayName("typ grafu")]
        [Description("Typ grafu")]
        public Charting.ChartType ChartType { get { return charttype.Value; } set { charttype.Value = value; } }

        UndoRedo<bool> draw3D;
        /// <summary>
        /// kreslení 3D
        /// </summary>
        [Category("Graf")]
        [DisplayName("3D")]
        [Description("Indikátor kreslení 3D")]
        [TypeConverter(typeof(BooleanTypeConverter))]
        public bool Draw3D { get { return draw3D.Value; } set { draw3D.Value = value; } }

        UndoRedo<string> dataSetName;
        /// <summary>
        /// jméno množiny dat (pro legendu)
        /// </summary>
        [Category("Graf")]
        [DisplayName("název dat")]
        [Description("Název množiny dat")]
        public string DataSetName { get { return dataSetName.Value; } set { dataSetName.Value = value; } }

        UndoRedo<IComplexColor> dataSetColor;
        /// <summary>
        /// Barva množiny dat
        /// </summary>
        [Category("Graf")]
        [DisplayName("barva dat")]
        [Description("Barva množiny dat")]
        [TypeConverter(typeof(ComplexColorConverter))]
        public IComplexColor DataSetColor { get { return dataSetColor.Value; } set { dataSetColor.Value = value; } }

        UndoRedo<string> groupSmall;
        /// <summary>
        /// Text, např. "Ostatní", který bude zobrazen pro součet všech hodnot, které jsou menší než limit
        /// </summary>
        [Category("Graf")]
        [DisplayName("název skupiny")]
        [Description("Název skupiny, který bude zobrazen pro součet všech hodnot, které jsou menší než limit")]
        public string GroupSmall { get { return groupSmall.Value; } set { groupSmall.Value = value; } }

        UndoRedo<SizeValue> groupLimit;
        /// <summary>
        /// Limit pro skupinování.
        /// Lze zadat v % nebo absolutním číslem
        /// </summary>
        [Category("Graf")]
        [DisplayName("limit skupinování")]
        [Description("Limit pro skupinování. Lze zadat v % nebo absolutním číslem.")]
        public SizeValue GroupLimit { get { return groupLimit.Value; } set { groupLimit.Value = value; } }

        UndoRedo<float> zeroAffinity;
        /// <summary>
        /// Číslo určující zda se má zobrazovat Y osa od nuly.
        /// 1 = ano, 0 = ne
        /// </summary>
        [Category("Graf")]
        [DisplayName("Y osa")]
        [Description("Číslo určující zda se má zobrazovat Y osa od nuly 1 = ano, 0 = ne")]
        public float ZeroAffinity { get { return zeroAffinity.Value; } set { zeroAffinity.Value = value; } }

        UndoRedo<int> stepMinor;
        /// <summary>
        /// Nejmenší možný krok zobrazení položky na X ose
        /// </summary>
        [Category("Graf")]
        [DisplayName("min krok")]
        [Description("Nejmenší možný krok zobrazení položky na X ose")]
        public int StepMinor { get { return stepMinor.Value; } set { stepMinor.Value = value; } }

        UndoRedo<int> stepMajor;
        /// <summary>
        /// Nejmenší možný krok zobrazení položky na X ose
        /// </summary>
        [Category("Graf")]
        [DisplayName("max krok")]
        [Description("Zobrazí každou n-tou položky na X ose")]
        public int StepMajor { get { return stepMajor.Value; } set { stepMajor.Value = value; } }

        /// <summary>
        /// Seznam barev
        /// </summary>
        [Category("Graf")]
        [DisplayName("paleta")]
        [Description("Paleta dostupných barev")]
        public ChartColorPalette ColorPalette { get; set; }

        UndoRedo<SizeValue> contentchartheight;
        /// <summary>
        /// Výška obrázku
        /// </summary>
        [Category("Graf")]
        [DisplayName("výška grafu")]
        [Description("Výška grafu")]
        public SizeValue ContentChartHeight { get { return contentchartheight.Value; } set { contentchartheight.Value = value; } }

        UndoRedo<SizeValue> contentchartwidth;
        /// <summary>
        /// Výška obrázku
        /// </summary>
        [Category("Graf")]
        [DisplayName("šířka grafu")]
        [Description("Šířka grafu")]
        public SizeValue ContentChartWidth { get { return contentchartwidth.Value; } set { contentchartwidth.Value = value; } }

        UndoRedo<ImageSizeValueType> widthsizetype;
        /// <summary>
        /// typ šířky
        /// </summary>
        [Browsable(false)]
        public ImageSizeValueType WidthSizeType { get { return widthsizetype.Value; } set { widthsizetype.Value = value; } }

        UndoRedo<ImageSizeValueType> heightsizetype;
        /// <summary>
        /// typ výšky
        /// </summary>
        [Browsable(false)]
        public ImageSizeValueType HeightSizeType { get { return heightsizetype.Value; } set { heightsizetype.Value = value; } }

        /// <summary>
        /// vrstvy grafu (objektu CHART)
        /// </summary>
        [Category("Graf")]
        [DisplayName("vrstvy")]
        [Description("Vrstvy grafu")]
        [Browsable(false)]
        public ChartLayers Layers { get; protected set; }

        /// <summary>
        /// Seznam dat objektu GRAF
        /// </summary>
        [Category("Graf")]
        [DisplayName("data")]
        [Description("Seznam dat objektu GRAF")]
        [Browsable(false)]
        public ChartData Data { get; protected set; }
        #endregion

        UndoRedo<URTagText> text;
        URTagText DisplayText { get { return text.Value; } set { text.Value = value; } }

        List<string> knownTags;
        /// <summary>
        /// Známě značky regionu
        /// </summary>
        [Browsable(false)]
        public override List<string> KnownTags
        {
            get
            {
                if (knownTags == null)
                    knownTags = AddInTree.BuildItem("/ReportDesigner/GrrList/ChartTags", null) as List<string>;
                return knownTags;
            }
        }

        public override AbstractContent Initialize()
        {
            base.Initialize();
            knownTags = null;
            text = new UndoRedo<URTagText>();
            heightsizetype = new UndoRedo<ImageSizeValueType>();
            widthsizetype = new UndoRedo<ImageSizeValueType>();
            contentchartwidth = new UndoRedo<SizeValue>();
            contentchartheight = new UndoRedo<SizeValue>();
            stepMajor = new UndoRedo<int>();
            stepMinor = new UndoRedo<int>();
            zeroAffinity = new UndoRedo<float>();
            groupLimit = new UndoRedo<SizeValue>();
            groupSmall = new UndoRedo<string>();
            dataSetColor = new UndoRedo<IComplexColor>();
            dataSetName = new UndoRedo<string>();
            draw3D = new UndoRedo<bool>();
            charttype = new UndoRedo<Charting.ChartType>();
            ComponentType = ComponentType.chart;
            return this;
        }

        /// <summary>
        /// inicializace objektu dle dostupných informaci
        /// </summary>
        /// <param name="clone">objekt ke kopírování</param>
        public override void Initialize(object clone)
        {
            base.Initialize(clone);
            AttrList.Remove("row");

            if (clone is GrrContentChart gCC)
            {
                ChartType = gCC.ChartType;
                ContentChartWidth = new SizeValue(gCC.ContentChartWidth);
                ContentChartHeight = new SizeValue(gCC.ContentChartHeight);
                Draw3D = gCC.Draw3D;
                DataSetName = gCC.DataSetName;
                StepMajor = gCC.StepMajor;
                StepMinor = gCC.StepMinor;
                ZeroAffinity = gCC.ZeroAffinity;
                GroupLimit = gCC.GroupLimit;
                GroupSmall = gCC.GroupSmall;

                ColorPalette = new ChartColorPalette(UndoRedoService.Manager);
                ColorPalette.Initialize();
                ColorPalette.AddRange(gCC.ColorPalette);

                DataSetColor = new URComplexColor().Initialize(gCC.DataSetColor);
                Layers = new ChartLayers(UndoRedoService.Manager);
                Layers.AddRange(gCC.Layers);

                Data = new ChartData(UndoRedoService.Manager);
                Data.AddRange(gCC.Data);
            }
        }

        /// <summary>
        /// inicializace objektu dle dostupných informaci
        /// </summary>
        /// <param name="item">Informace o formátu objektu.</param>
        public override AbstractContent Initialize(GFEFormatTag item)
        {
            base.Initialize(item);
            BackColor = new URComplexColor().Initialize(Color.Transparent);
            Layers = new ChartLayers(UndoRedoService.Manager);
            Data = new ChartData(UndoRedoService.Manager);
            return this;
        }

        /// <summary>
        /// inicializace objektu dle dostupných informaci
        /// </summary>
        /// <param name="node">Položka bočního panelu s informaci o vkládaném objektu</param>
        public override AbstractContent Initialize(SideTabItem node)
        {
            base.Initialize(node);
            BackColor = new URComplexColor().Initialize(Color.Transparent);
            Layers = new ChartLayers(UndoRedoService.Manager);
            Data = new ChartData(UndoRedoService.Manager);
            return this;
        }

        void SetColorPalette(string palette)
        {
            this.ColorPalette = new ChartColorPalette(UndoRedoService.Manager);

            if (!string.IsNullOrEmpty(palette))
            {
                string[] _colors = palette.Split(',');
                if (_colors.Length == 0)
                    return;

                foreach (string _color in _colors)
                {
                    IComplexColor color = new URComplexColor().Initialize(_color);
                    if (!ColorPalette.Contains(color))
                        ColorPalette.Add(color);
                }
            }
        }
        void LoadInternalData(GFEFormatTag item)
        {
            if (item != null)
                Data.Add(new ChartXmlData(item));
        }
        void LoadInternalLayer(GFEFormatTag item)
        {
            if (item != null)
                Layers.Add(new ChartLayer(item));
        }

    }
}
