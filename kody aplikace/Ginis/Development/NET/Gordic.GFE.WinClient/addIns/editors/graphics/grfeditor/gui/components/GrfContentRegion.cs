//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ContentRegion.cs                         </Name>
//    <Description> region GRF sestav                                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2013                            </Copyright>
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

namespace Gordic.GFE.WinClient.GrfEditor
{
    /// <summary>
    /// region GRF sestav
    /// </summary>
    class GrfContentRegion : AreaContent, IDataItem, IRDArgumentHandler
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
        public override IComponent CreateItem(dynamic info, MouseEventArgs e, ComponentType type)
        {
            return CreateObject(Page.GetInsertPoint(e.X, e.Y), Page, info, type);
        }
        /// <summary>
        /// Vytvoření nového objektu 'region' na zadaném umístění
        /// </summary>
        /// <param name="insertPoint">Levý-horní roh nového regionu - zkorigovaný dle ZOOM hodnoty</param>
        /// <param name="page">Stránka, do které se objekt vkládá</param>
        /// <param name="info">Položka bočního panelu s informaci o vkládaném objektu</param>
        /// <param name="type">Typ přidávané položky</param>
        public override IComponent CreateObject(PointF insertPoint, Gordic.GFE.Parsers.IPage page, dynamic info, ComponentType type)
        {
            return CanInsertDataItem(info, type)
                ? LocalCommonService.CreateObject(this, insertPoint, page, info, type)
                : null;
        }

        /// <summary>
        /// Metoda Pře indexace vnořených objektů 
        /// </summary>
        public override void Reindex()
        {
            int index = 0;

            using (AsynchronousWaitDialog monitor = AsynchronousWaitDialog.ShowWaitDialog(GResources.GetResourceText(29450697))) //RC 29450697 : probíhá pře indexace...
            {
                monitor.Start();
                bool moveTo;
                while (index < this.Count)
                {
                    moveTo = false;
                    for (int i = index + 1; i < this.Count; i++)
                        if (this[i] is AbstractContent || this[i] is AreaContent)
                            if (this[i].Top < this[index].Top || (this[i].Top == this[index].Top && this[i].Left < this[index].Left))
                            {
                                if (this[i] is AbstractContent)
                                    (this[i] as AbstractContent).PropertyOrder = index;
                                else (this[i] as AreaContent).PropertyOrder = index;

                                moveTo = true;
                            }
                    if (!moveTo)
                        index++;
                }
                monitor.Stop();
            }
        }
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
                int row = 1;
                if (int.TryParse(AttrList["row"], out row))
                    Row = row == 0 ? 1 : row;
            }
            else 
                Row = 1;

            GFEFormatRegion _region = formatTag as GFEFormatRegion;
            dataName = _region.Name;
            dataFullName = _region.DataFullName;
            if (FormatTag.Attributes.ContainsKey("rect"))
                TagService.SetRectByAttribute(this, FormatTag.Attributes["rect"]);

            Text.TextFont = new URTagTextFont().Initialize(FontFamily.GenericSerif.Name);
            Text.TextFont.Size.Value = "1";

            if (FormatTag.Attributes.ContainsKey("labeltext"))
                LabelText = FormatTag.Attributes["labeltext"];

            if (_region.Attributes.ContainsKey("background-image"))
                TagService.SetImageByAttribute(this, _region.Attributes["background-image"]);

            setScripts();
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
        /// <returns>Element prezentující daný objekt</returns>
        override public XmlElement GetXmlData(XmlDocumentPosition xmlDoc, List<GFEList> xmlStyles)
        {
            // potřebné pro pamatování pozici řádku
            // pokud region je vybrán, pak, protože je pouze kontejner, 
            // nastavíme výběr všem vnitřním objektům 
            if (IsSelected)
                foreach (ITagComponent _item in this)
                    ServiceSelection.SetSelectedComponents(_item, SelectionTypes.Add);

            XmlElement xmlNode = xmlDoc.CreateElement("region", ReportDesignerProperties.Instance.AlfReportXmlns);
            // uložíme název regionu, kterým je poslední část úplného názvu regionu
            xmlNode.SetAttribute("name", DataName);

            // uložení informaci o rámečku pro daný objekt
            string value = TagService.GetRect(this);
            if (!string.IsNullOrEmpty(value))
                xmlNode.SetAttribute("rect", value);

            if (Row > 1)
                xmlNode.SetAttribute("row", Convert.ToString(Row));

            if (Page.Order != 1)
                // uložení informaci o stránce, na které se nachází daný objekt
                xmlNode.SetAttribute("page", Convert.ToString(Page.Order));

            // vytvoříme větev BODY
            XmlElement _xmlBody = xmlDoc.CreateElement("body", ReportDesignerProperties.Instance.AlfReportXmlns);

            // pokud existuje, pak prvně uližíme "pozadí" regionu
            if (backObject != null)
                setChildXmlData(backObject, _xmlBody, xmlStyles);
            // prvně se uloží všechny políčka co nejsou regiony
            // a zároveň nejsou prvním objektem regionu
            foreach (ITagComponent item in this)
                if (!(item is AreaContent) && !item.Equals(backObject))
                    setChildXmlData(item, _xmlBody, xmlStyles);

            // teď se uloží všechny vnitřní regiony
            foreach (ITagComponent item in this)
                if (item is AreaContent)
                    _xmlBody.AppendChild(item.GetXmlData(xmlDoc, xmlStyles));

            // přidáme tělo do regionu
            xmlNode.AppendChild(_xmlBody);

            if (!string.IsNullOrEmpty(LabelText))
                xmlNode.SetAttribute("labeltext", LabelText);

            // pořadí objektu
            xmlNode.SetAttribute("order", PropertyOrder.ToString());

            // uložíme neznámé značky
            XmlDocumentService.SetListOfDictionaryItems(xmlNode, Unknowns, xmlStyles);

            // vrátíme region
            return xmlNode;
        }

        void setChildXmlData(ITagComponent item, XmlElement _xmlBody, List<GFEList> xmlStyles)
        {
            XmlElement xmlElement = item.GetXmlData(_xmlBody.OwnerDocument as XmlDocumentPosition, xmlStyles);

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
        public bool IsRootElement { get { return false; } }
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
                bool isRootElement = false;
                if (string.IsNullOrEmpty(dataFullName) && !string.IsNullOrEmpty(dataName))
                {
                    GFEStructure structure = PagePanel == null ?
                        LocalCommonService.GetActualStructure() : PagePanel.Structure;
                    if (structure != null)
                        dataFullName = CommonService.GetFullName(structure.Root, dataName, false, ref isRootElement);
                }
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
                if (structItem == null && !isItemReload && Page != null)
                    if (!string.IsNullOrEmpty(DataFullName))
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
        public bool EnableEdit { get { return false; } }

        readonly UndoRedo<int> row = new UndoRedo<int>();
        /// <summary>
        /// Argument 'row' položky
        /// </summary>
        [Category("Argumenty")] //RC 29450495 : Argumenty
        [DisplayName("row")]
        [Description("Argument 'row' položky")] //RC 29450498 : Argument 'row' položky
        public int Row { get { return row.Value; } set { row.Value = value; } }
        #endregion

        #region ICloneable
        /// <summary>
        /// Creates a new object that is a copy of the current instance
        /// </summary>
        /// <returns>A new object that is a copy of this instance.</returns>
        public override object Clone()
        {
            var clone = new GrfContentRegion();
            clone.Initialize(this);
            return clone;
        }
        #endregion

        /// <summary>
        /// Informace o formátu objektu
        /// </summary>
        [Browsable(false)]
        public override GFEFormatTag FormatTag
        {
            get { return formatTag; }
            set
            {
                formatTag = value;
                dataFullName = null;
                dataName = null;
            }
        }
        
        /// <summary>
        /// Konstruktor třídy se základní inicializací
        /// </summary>
        public GrfContentRegion()
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
        }

        /// <summary>
        /// inicilializace objektu dle instance stejného objektu
        /// </summary>
        /// <param name="value">instance stejného objektu</param>
        public virtual void Initialize(GrfContentRegion value)
        {
            Initialize(value.FormatTag);
            dataDescription = value.DataDescription;
            dataFullName = value.DataFullName;
            dataName = value.DataName;
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
                    this.insertTagComponent((item as ICloneable).Clone());
        }

        /// <summary>
        /// Změna pozici kontajneru
        /// </summary>
        /// <param name="oldPosition">Stará pozice</param>
        /// <param name="newPosition">Nová pozice</param>
        /// <param name="zoom">Faktor zvětšení</param>
        internal void ChangeLocation(RectangleF oldPosition, RectangleF newPosition, float zoom)
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
                if (c is GrfContentRegion)
                    (c as GrfContentRegion).ChangeLocation(_oldValue, c.BoundsInPixels, zoom);

                //Vrácení ukotvení do původního stavu
                c.Anchor = _kotva;
            }
        }
        void insertTagComponent(object obj)
        {
            (obj as ITagComponent).Page = Page;
            Add(obj as ITagComponent);
        }
        void setScripts()
        {
            Dictionary<string, string> scripts = AttrList.FindAllByKey(key =>
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
    }
}
