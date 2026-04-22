//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ContentRegion.cs                         </Name>
//    <Description> region GRF sestav                                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.Design;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Linq;
using System.Xml;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.WinClient.Editor;
using Gordic.General;
using Gordic.WinForms.Controls;
using Gordic.GFE.Parsers.Editor;

namespace Gordic.GFE.WinClient.GrfEditor
{
    /// <summary>
    /// region GRF sestav
    /// </summary>
    class GrfRegion : AreaContent, IDataItem, IRDArgumentHandler, IRegion
    {
        #region AbstractContainer
        string GetRegionFullName(GFERegion region)
        {
            if (region == null)
                return null;

            if (!string.IsNullOrEmpty(region.FullName))
                return region.FullName;

            List<string> names = new List<string>();
            GFERegion current = region;
            while (current != null && !string.IsNullOrEmpty(current.Name))
            {
                names.Add(current.Name);
                current = current.Parent;
            }

            names.Reverse();
            return names.Count == 0 ? null : string.Join(".", names);
        }

        string NormalizeRegionFullName(string regionFullName)
        {
            if (string.IsNullOrEmpty(regionFullName))
                return regionFullName;

            return regionFullName.StartsWith("ROOT.", StringComparison.OrdinalIgnoreCase)
                ? regionFullName.Substring(5)
                : regionFullName;
        }

        bool CanInsertDataItem(dynamic info, ComponentType type)
        {
            if (type == ComponentType.region || !(info is StructExtNode node) || node.DataItem?.Region == null)
                return true;

            string sourceRegionFullName = NormalizeRegionFullName(GetRegionFullName(node.DataItem.Region));
            string targetRegionFullName = NormalizeRegionFullName(DataFullName);
            if (string.Equals(sourceRegionFullName, targetRegionFullName, StringComparison.OrdinalIgnoreCase))
                return true;

            MessageService.ShowWarning(
                string.Format(
                    "Položku '{0}' nelze vytvořit v regionu '{1}'.\n\n" +
                    "Datová položka patří regionu '{2}'.\n" +
                    "Lze ji vložit pouze do tohoto regionu.",
                    node.FullName ?? node.Name ?? "neznámá položka",
                    targetRegionFullName ?? "neznámý region",
                    sourceRegionFullName ?? "neznámý region"));
            return false;
        }

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
        public override IComponent CreateObject(PointF insertPoint, Gordic.GFE.Parsers.IPage page, dynamic info, ComponentType type, GFEFormat format = null) =>
            CanInsertDataItem(info, type)
                ? LocalCommonService.CreateObject(this, insertPoint, page, info, type, format)
                : null;

        /// <summary>
        /// Indikuje mo6nost daný objekt optimalizovat při převodu do ALF formátu
        /// </summary>
        public override bool CanBeOptimized => AttrList == null || AttrList.Count == 0;
        #endregion

        #region ITagComponent
        List<string> knownTags = null;
        /// <summary>
        /// Známě značky regionu
        /// </summary>
        [Browsable(false)]
        public override List<string> KnownTags
        {
            get
            {
                if (knownTags == null)
                    knownTags = AddInTree.BuildItem("/ReportDesigner/GrfList/RegionTags", null) as List<string>;
                return knownTags;
            }
        }

        /// <summary>
        /// Načtení informaci o objektu z formátu objektu
        /// </summary>
        override public void LoadInformation()
        {
            //Pokud položka není regionem, pak není co řešit
            if (!(FormatTag is GFEFormatRegion))
                return;

            //pozice řádku, ve kterém začíná Tag
            StartPosition = FormatTag.LinePosition - 1;

            if (AttrList.ContainsKey("row"))
            {
                if (int.TryParse(AttrList["row"], out int row))
                    Row = row == 0 ? 1 : row;
            }
            else
                Row = 1;

            if (formatTag is GFEFormatRegion reg)
            {
                dataName = reg.Name;

                SetFullName(reg.DataFullName);
                if (FormatTag.Attributes.ContainsKey("rect"))
                    TagService.SetRectByAttribute(this, FormatTag.Attributes["rect"]);

                Text.TextFont = new URTagTextFont().Initialize(FontFamily.GenericSerif.Name);
                Text.TextFont.Size.Value = "1";

                if (FormatTag.Attributes.ContainsKey("labeltext"))
                    LabelText = FormatTag.Attributes["labeltext"];

                if (reg.Attributes.ContainsKey("background-image"))
                    TagService.SetImageByAttribute(this, reg.Attributes["background-image"]);

                OnlyIf = reg.Attributes.ExistsByKey(key => key.Equals("only-if")) ? reg.Attributes["only-if"] : string.Empty;
                OrderBy = reg.Attributes.ExistsByKey(key => key.Equals("order-by")) ? reg.Attributes["order-by"] : string.Empty;
                FilterOut = reg.Attributes.ExistsByKey(key => key.Equals("filter-out")) ? reg.Attributes["filter-out"] : string.Empty;
                FilterIn = reg.Attributes.ExistsByKey(key => key.Equals("filter-in")) ? reg.Attributes["filter-in"] : string.Empty;
            }

            SetScripts();
        }

        /// <summary>
        /// Pokud objekt je ukotven, pak se celý zašrafuje
        /// </summary>
        /// <param name="graphics">Kreslící nástroj</param>
        void DrawAnchor(Graphics graphics)
        {
            HatchBrush hBrush = new HatchBrush(HatchStyle.ZigZag, Color.Silver, Color.Transparent);
            graphics.FillRectangle(hBrush, BoundsInPixels);
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
            if (!CommonService.IsValidateByStructure(DataFullName, regionFullName, true))
            {
                LoggingService.Info(string.Format(GResources.GetResourceText(29451457), DataFullName));
                GMessageBox.ShowError(string.Format(GResources.GetResourceText(29451457), DataFullName));
                //throw new GrfValidateException(string.Format(GResources.GetResourceText(29451457), DataFullName), this);
            }

            // potřebné pro pamatování pozici řádku
            // pokud region je vybrán, pak, protože je pouze kontejner, 
            // nastavíme výběr všem vnitřním objektům 
            if (IsSelected)
                foreach (ITagComponent _item in this)
                    ServiceSelection.SetSelectedComponents(_item, SelectionTypes.Add);

            XmlElement xmlNode = xmlDoc.CreateElement("region", ReportDesignerProperties.Instance.AlfReportXmlns);
            // uložíme název regionu, kterým je poslední část úplného názvu regionu
            xmlNode.SetAttribute("name", CommonService.GetNameForAttribute(DataFullName, regionFullName));

            if (withRect)
            {
                // uložení informaci o rámečku pro daný objekt
                string value = TagService.GetRect(this);
                if (!string.IsNullOrEmpty(value))
                    xmlNode.SetAttribute("rect", value);
            }
            if (Row > 1)
                xmlNode.SetAttribute("row", Convert.ToString(Row));

            if (Page.Order != 1)
                // uložení informaci o stránce, na které se nachází daný objekt
                xmlNode.SetAttribute("page", Convert.ToString(Page.Order));

            // vytvoříme větev BODY
            XmlElement _xmlBody = xmlDoc.CreateElement("body", ReportDesignerProperties.Instance.AlfReportXmlns);

            // pokud existuje, pak prvně uližíme "pozadí" regionu
            if (_BackObject != null)
                SetChildXmlData(_BackObject, _xmlBody, xmlStyles);
            // prvně se uloží všechny políčka co nejsou regiony
            // a zároveň nejsou prvním objektem regionu
            foreach (ITagComponent item in this)
                if (!(item is AreaContent) && !item.Equals(_BackObject))
                    SetChildXmlData(item, _xmlBody, xmlStyles, DataFullName);

            // teď se uloží všechny vnitřní regiony
            foreach (ITagComponent item in this)
                if (item is AreaContent)
                    _xmlBody.AppendChild(item.GetXmlData(xmlDoc, xmlStyles, regionFullName: DataFullName));

            // přidáme tělo do regionu
            xmlNode.AppendChild(_xmlBody);

            if (!string.IsNullOrEmpty(LabelText))
                xmlNode.SetAttribute("labeltext", LabelText);

            // pořadí objektu
            xmlNode.SetAttribute("order", PropertyOrder.ToString());
            if (!string.IsNullOrEmpty(OrderBy) && string.IsNullOrEmpty(xmlNode.GetAttribute("order-by")))
                xmlNode.SetAttribute("order-by", OrderBy);
            if (!string.IsNullOrEmpty(OnlyIf) && string.IsNullOrEmpty(xmlNode.GetAttribute("only-if")))
                xmlNode.SetAttribute("only-if", OnlyIf);
            if (!string.IsNullOrEmpty(FilterIn) && string.IsNullOrEmpty(xmlNode.GetAttribute("filter-in")))
                xmlNode.SetAttribute("filter-in", FilterIn);
            if (!string.IsNullOrEmpty(FilterOut) && string.IsNullOrEmpty(xmlNode.GetAttribute("filter-out")))
                xmlNode.SetAttribute("filter-out", FilterOut);

            // uložíme neznámé značky
            XmlDocumentService.SetListOfDictionaryItems(xmlNode, Unknowns, xmlStyles);

            // vrátíme region
            return xmlNode;
        }

        void SetChildXmlData(ITagComponent item, XmlElement _xmlBody, List<GFEList> xmlStyles, string regionFullName = null)
        {
            XmlElement xmlElement = item.GetXmlData(_xmlBody.OwnerDocument as XmlDocumentPosition, xmlStyles, regionFullName: regionFullName);

            //pokud větev STYLE, neobsahuje žádné atributy, pak je zbytečná 
            if (string.Equals(xmlElement.Name, "style", StringComparison.InvariantCultureIgnoreCase)
                && xmlElement.Attributes.Count == 0)
                //V tomto případě přepíšeme všechny vnořené větve větvi STYLE do nadřazené větvi
                foreach (XmlNode subItem in xmlElement.ChildNodes)
                    _xmlBody.AppendChild(subItem);
            else _xmlBody.AppendChild(xmlElement);
        }
        #endregion

        #region IDataItem
        /// <summary>
        /// indikuje, že položka je přímo ze sekce ROOT
        /// </summary>
        [Browsable(false)]
        public bool IsRootElement { get => false; }
        /// <summary>
        /// úplný název datové položky
        /// </summary>
        [Category("Datová položka"), ReadOnly(true)]
        [DisplayName("titulek")]
        [Description("Titulek datové položky")]
        [Browsable(false)]
        public string DataTitle { get; set; }

        protected string dataName;
        /// <summary>
        /// Datový název pložky
        /// </summary>
        [Category("Datová položka"), ReadOnly(true)]
        [DisplayName("název")]
        [Description("Název datové položky")]
        public string DataName
        {
            get
            {
                if (string.IsNullOrEmpty(dataName))
                    dataName = !string.IsNullOrEmpty(DataFullName) ? DataFullName.Split('.').Last() : null;
                else if (dataName.Contains('.'))
                    dataName = dataName.Split('.').Last();

                return dataName;
            }
        }

        protected string dataDescription;
        /// <summary>
        /// popis datové položky
        /// </summary>
        [Category("Datová položka"), ReadOnly(true)]
        [DisplayName("popis")]
        [Description("Popis datové položky")]
        public string DataDescription
        {
            get
            {
                if (string.IsNullOrEmpty(dataDescription) && StructureItem != null)
                    dataDescription = structItem.Description;
                return dataDescription;
            }
            set { dataDescription = value; }
        }

        protected string dataFullName;
        /// <summary>
        /// úplný název položky 
        /// </summary>
        [Category("Datová položka"), ReadOnly(true)]
        [DisplayName("úplný název")]
        [Description("Úplný název datové položky")]
        public string DataFullName
        {
            get
            {
                SetFullName();
                return dataFullName;
            }
        }

        GFERegion structItem;
        bool isItemReload = false;
        /// <summary>
        /// Položka struktury
        /// </summary>
        [Browsable(false)]
        public object StructureItem
        {
            get
            {
                if (structItem == null && !isItemReload && Page != null && !string.IsNullOrEmpty(DataFullName))
                {
                    structItem = (GFERegion)CommonService.GetItemFromStructure(PagePanel.Structure, DataFullName, 2);
                    isItemReload = true;
                }
                return structItem;
            }
            set { isItemReload = false; structItem = null; }
        }
        #endregion

        #region IArgumentHandler
        readonly UndoRedo<bool> edit = new UndoRedo<bool>();
        /// <summary>
        /// Argument 'edit' položky
        /// </summary>
        [Category("Argumenty")] //RC 29450495 : Argumenty
        [DisplayName("edit")]
        [Description("Argument 'edit' položky")] //RC 29450497 : Argument 'edit' položky
        [TypeConverter(typeof(BooleanTypeConverter))]
        [Browsable(false)]
        public bool Edit { get; set; }
        /// <summary>
        /// Indikuje, že změna argumentu 'edit' je povolená
        /// </summary>
        [Browsable(false)]
        public bool EnableEdit { get => false; }

        readonly UndoRedo<int> row = new UndoRedo<int>();
        /// <summary>
        /// Argument 'row' položky
        /// </summary>
        [Category("Argumenty")] //RC 29450495 : Argumenty
        [DisplayName("row")]
        [Description("Argument 'row' položky")] //RC 29450498 : Argument 'row' položky
        public int Row { get => row.Value; set => row.Value = value; }
        #endregion

        #region ICloneable
        /// <summary>
        /// Creates a new object that is a copy of the current instance
        /// </summary>
        /// <returns>A new object that is a copy of this instance.</returns>
        public override object Clone()
        {
            var clone = new GrfRegion();
            clone.Initialize(this);
            return clone;
        }
        #endregion

        #region AreaContent
        /// <summary>
        /// Kreslění rohů objektu
        /// </summary>
        /// <param name="graphics">Ovladač kreselní</param>
        /// <param name="isSelected">Indfikator vybranosti objěktu</param>
        /// <param name="color">Barva pro případ vybraného objektu</param>
        protected override void DrawCorners(Graphics graphics, bool isSelected, Color color)
        {
            if (isSelected)
                base.DrawCorners(graphics, isSelected, color);
            else
            {
                using (SolidBrush drawBrush = new SolidBrush(Color.Red))
                {
                    using (Pen pen = new Pen(drawBrush, 1))
                    {
                        SolidBrush solidBrush = new SolidBrush(Color.White);

                        //PoradiCtvrcu.a
                        graphics.FillRectangle(solidBrush, new RectangleF(new PointF(LeftZoom - 3, TopZoom - 3), new SizeF(6F, 6F)));
                        PointF pf = new PointF(LeftZoom - 3, TopZoom - 3);
                        graphics.DrawEllipse(pen, pf.X, pf.Y, 6F, 6F);

                        //PoradiCtvrcu.c
                        graphics.FillRectangle(solidBrush, new RectangleF(new PointF(LeftZoom + BoundsInPixels.Width - 3, TopZoom - 3), new Size(6, 6)));
                        PointF pf1 = new PointF(LeftZoom + BoundsInPixels.Width - 3, TopZoom - 3);
                        graphics.DrawEllipse(pen, pf1.X, pf1.Y, 6F, 6F);

                        //PoradiCtvrcu.f
                        graphics.FillRectangle(solidBrush, new RectangleF(new PointF(LeftZoom - 3, TopZoom + BoundsInPixels.Height - 3), new Size(6, 6)));
                        PointF pf2 = new PointF(LeftZoom - 3, TopZoom + BoundsInPixels.Height - 3);
                        graphics.DrawEllipse(pen, pf2.X, pf2.Y, 6F, 6F);

                        //PoradiCtvrcu.h
                        graphics.FillRectangle(solidBrush, new RectangleF(new PointF(LeftZoom + BoundsInPixels.Width - 3, TopZoom + BoundsInPixels.Height - 3), new Size(6, 6)));
                        PointF pf3 = new PointF(LeftZoom + BoundsInPixels.Width - 3, TopZoom + BoundsInPixels.Height - 3);
                        graphics.DrawEllipse(pen, pf3.X, pf3.Y, 6F, 6F);
                    }
                }
            }
            //zjistíme, který text máme vykreslit
            //pokud to není ze skriptů pak vykreslíme zobrazovací název komponenty
            if (!string.IsNullOrEmpty(DataName))
                Text.Text = DataName;

            Text.Paint(graphics, BoundsInPixels, Padding, 0.8f);
        }


        #endregion

        /// <summary>
        /// Informace o formátu objektu
        /// </summary>
        [Browsable(false)]
        public override GFEFormatTag FormatTag
        {
            get => formatTag;
            set
            {
                formatTag = value;
                dataFullName = null;
                dataName = null;
            }
        }

        #region IRegion
        /// <summary>
        /// případná skupina těla štítku
        /// </summary>
        [Browsable(false)]
        public GroupList Group { get => null; }

        readonly UndoRedo<string> onlyif = new UndoRedo<string>();
        /// <summary>
        /// jenom když
        /// </summary>
        [DisplayName("jenom když")]
        [Description("Atribut jenom když")]
        public string OnlyIf { get => onlyif.Value; set => onlyif.Value = value; }
        readonly UndoRedo<string> filterout = new UndoRedo<string>();
        /// <summary>
        /// filter
        /// </summary>
        [DisplayName("filter OUT")]
        [Description("Atribut FilterOut")]
        public string FilterOut { get => filterout.Value; set => filterout.Value = value; }
        readonly UndoRedo<string> filterin = new UndoRedo<string>();
        /// <summary>
        /// filter
        /// </summary>
        [DisplayName("filter IN")]
        [Description("Atribut FilterIn")]
        public string FilterIn { get => filterin.Value; set => filterin.Value = value; }
        readonly UndoRedo<string> orderby = new UndoRedo<string>();
        /// <summary>
        /// řazení
        /// </summary>
        [DisplayName("řazení")]
        [Description("Atribut OrderBy")]
        public string OrderBy { get => orderby.Value; set => orderby.Value = value; }
        #endregion

        /// <summary>
        /// Konstruktor třídy se základní inicializací
        /// </summary>
        public GrfRegion()
            : base()
        {
        }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        public override void Initialize()
        {
            base.Initialize();
            ComponentType = ComponentType.region;
        }

        /// <summary>
        /// inicializace objektu dle položky
        /// </summary>
        /// <param name="sen">položka struktury</param>
        public override void Initialize(StructExtNode sen)
        {
            base.Initialize(sen);
            AttrList = new GFEAttrList(UndoRedoService.Manager);
            DataDescription = sen.DataRegion.Description;

            dataFullName = sen.FullName;
            dataName = sen.Name;
            AttrList.Add("name", dataName);
        }

        /// <summary>
        /// inicilializace objektu dle instance stejného objektu
        /// </summary>
        /// <param name="value">instance stejného objektu</param>
        public virtual void Initialize(GrfRegion value)
        {
            Initialize(value.FormatTag);
            dataDescription = value.DataDescription;
            dataName = value.DataName;
            SetFullName(value.DataFullName);
            DataTitle = value.DataTitle;

            Anchor = value.Anchor;
            AttrList = new GFEAttrList(value.AttrList);
            AttrList.Remove("row");

            BackColor = new URComplexColor().Initialize(value.BackColor);
            BackImage = new BackgroundImage(value.BackImage);
            ComponentType = value.ComponentType;
            DataDescription = value.DataDescription;
            DataTitle = value.DataTitle;
            Height = new SizeValue(value.Height);
            Left = new SizeValue(value.Left);
            Padding = new URComplexPadding();
            Padding.Initialize(value.Padding);
            Scripts = new GFEScriptList(value.Scripts);
            ShowBackground = value.ShowBackground;
            Spacing = new URComplexSpacing();
            Spacing.Initialize(value.Spacing);
            Text = new URTagText();
            Text.Initialize(value.Text, true);
            Top = new SizeValue(value.Top);
            Width = new SizeValue(value.Width);

            foreach (var item in value)
                if (item is ICloneable)
                    InsertTagComponent((item as ICloneable).Clone());
        }

        void SetScripts()
        {
            Dictionary<string, string> scripts = AttrList?.FindAllByKey(key =>
                key.StartsWith("on", StringComparison.InvariantCulture)
                && key.Length > 2
                && char.IsUpper(key[2]));
            Scripts.AddRange(scripts);

            if (!Scripts.ContainsKey("onLoad"))
                Scripts.Add("onLoad", string.Empty);

            if (!Scripts.ContainsKey("onEnter"))
                Scripts.Add("onEnter", string.Empty);

            if (!Scripts.ContainsKey("onData"))
                Scripts.Add("onData", string.Empty);

            if (!Scripts.ContainsKey("onPrint"))
                Scripts.Add("onPrint", string.Empty);

            Scripts.SynchronizeByOrigin();
        }
        void SetFullName(string defaultname = null)
        {
            bool isRootElement = false;
            if (string.IsNullOrEmpty(dataFullName) && !string.IsNullOrEmpty(dataName))
            {
                GFEStructure structure = PagePanel == null ? LocalCommonService.GetActualStructure() : PagePanel.Structure;
                if (structure != null)
                    dataFullName = CommonService.GetFullName(structure.Root, FormatTag.Region != null ? FormatTag.Region.DataFullName : "", dataName, true, ref isRootElement);
                else if (defaultname != null)
                    dataFullName = defaultname;
            }
            else if (defaultname != null)
                dataFullName = defaultname;
        }
    }
}
