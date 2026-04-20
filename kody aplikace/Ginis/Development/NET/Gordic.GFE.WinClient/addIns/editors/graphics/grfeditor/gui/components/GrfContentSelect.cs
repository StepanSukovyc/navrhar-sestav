//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GrfContentSelect.cs                    </Name>
//    <Description>                                                             </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2016-09-14                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.WinClient.Editor;
using System.Linq;
using System.ComponentModel;
using System.Drawing;
using System.Windows.Forms;
using System.Xml;
using System;
using System.Collections.Generic;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;
using System.Drawing.Design;
using Gordic.GFE.WinClient.Utils;

namespace Gordic.GFE.WinClient.GrfEditor
{

    /// <summary>
    /// objekt SELECT sestav typu GRF
    /// </summary>
    class GrfContentSelect : AbstractContent, IRDArgumentHandler, IDataItem, IItemContainer
    {
        #region AbstractContent
        /// <summary>
        /// Načtení informaci o objektu z formátu daného objektu
        /// </summary>
        public override void LoadInformation()
        {
            // pokud položka není obrázkem, pak není co řešit
            if (FormatTag is GFEFormatContentSelect)
            {
                base.LoadInformation();

                int index = 1;
                foreach (var item in FormatTag.Children)
                {
                    if (index == 1)
                        Option_1.Initialize(item, Page);
                    else
                        Option_2.Initialize(item, Page);
                    index++;
                }

                if (AttrList.ContainsKey("name"))
                    dataName = AttrList["name"];

                if (AttrList.ContainsKey("type"))
                {
                    SelectionType st = SelectionType.radio;
                    Enum.TryParse(Convert.ToString(AttrList["type"]), out st);
                    SelectType = st;
                }

                ComponentType = ComponentType.select;
            }
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
                    knownTags = AddInTree.BuildItem("/ReportDesigner/GrfList/SelectTags", null) as List<string>;
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
            XmlElement xmlNode = xmlDoc.CreateElement("select", string.IsNullOrEmpty(namespaceUri) ? ReportDesignerProperties.Instance.AlfReportXmlns : namespaceUri);
            //Protože zde může být proměnna, pak zavoláme metodu, 
            //která by nám podle názvu zjistila co vlastně tato komponenta je
            xmlNode.SetAttribute("name", DataName);

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

            xmlNode.SetAttribute("type", Convert.ToString(SelectType));

            if (Option_1 != null && !Option_1.IsEmpty())
                xmlNode.AppendChild(Option_1.GetDataComponent(xmlDoc));
            if (Option_2 != null && !Option_2.IsEmpty())
                xmlNode.AppendChild(Option_2.GetDataComponent(xmlDoc));

            if (!string.IsNullOrEmpty(LabelText))
                xmlNode.SetAttribute("labeltext", CharacterEncodings.GetHexCodeText(LabelText));

            //uložení skriptů
            XmlDocumentService.SetListOfDictionaryItems(xmlNode, Scripts, styles);
            // uložíme neznámé značky
            // TODO: po aktualizací objektu dodělat pouze neznáme značky
            XmlDocumentService.SetListOfDictionaryItems(xmlNode, Unknowns, styles);

            return xmlNode;
        }

        /// <summary>
        /// Vymazání rámečku indikujícího, že daný objekt je aktivní
        /// </summary>
        /// <param name="graphics">Kreslící nástroj</param>
        protected override void DrawClear(Graphics graphics)
        {
            base.DrawClear(graphics);
            dynamic bmp;
            switch (SelectType)
            {
                case SelectionType.radio:
                    // image paint
                    bmp = ImageService.ResizeImage(Properties.Resources.radiobutton_icon, (float)Math.Round(WidthZoom) - 5, (float)Math.Round(HeightZoom) - 5);
                    if (bmp != null)
                        graphics.DrawImage(bmp, (float)Math.Round(LeftZoom), (float)Math.Round(TopZoom));
                    break;
                default:
                    // image paint
                    bmp = ImageService.ResizeImage(Properties.Resources.check_box_icon, (float)Math.Round(WidthZoom) - 5, (float)Math.Round(HeightZoom) - 5);
                    if (bmp != null)
                        graphics.DrawImage(bmp, (float)Math.Round(LeftZoom), (float)Math.Round(TopZoom));
                    break;
            }
        }
        #endregion

        #region IDataItem
        bool isRootElement;
        /// <summary>
        /// indikuje, že položka je přímo ze sekce ROOT
        /// </summary>
        [Browsable(false)]
        public bool IsRootElement { get => isRootElement; }

        string dataDescription;
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

        string dataTitle;
        /// <summary>
        /// úplný název datové položky
        /// </summary>
        [Category("Datová položka")]
        [ReadOnly(true)]
        [DisplayName("titulek")]
        [Description("Titulek datové položky")]
        public string DataTitle
        {
            get
            {
                if (string.IsNullOrEmpty(dataTitle))
                    dataTitle = StructureItem != null ? structItem.FullName : null;

                return string.IsNullOrEmpty(dataTitle) ? DataName : dataTitle;
            }
            set { dataTitle = value; }
        }

        string dataName;
        /// <summary>
        /// Datový název pložky
        /// </summary>
        [Category("Datová položka")]
        [ReadOnly(true)]
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

        string dataFullName;
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
                if (string.IsNullOrEmpty(dataFullName) && !string.IsNullOrEmpty(dataName))
                {
                    GFEStructure structure = PagePanel == null ?
                        LocalCommonService.GetActualStructure() : PagePanel.Structure;
                    if (structure != null)
                        dataFullName = CommonService.GetFullName(structure.Root, FormatTag.Region != null ? FormatTag.Region.DataFullName : "", dataName, true, ref isRootElement);
                }
                return dataFullName;
            }
        }

        GFEDataItem structItem;
        bool isFirst = true;
        /// <summary>
        /// Položka struktury
        /// </summary>
        [Browsable(false)]
        public object StructureItem
        {
            get
            {
                if (structItem == null)
                    if (isFirst)
                    {
                        SetStructureItem();
                        isFirst = false;
                    }
                    else
                        ThreadService.SafeThreadAsyncCall(SetStructureItem);
                return structItem;
            }
            set { isFirst = true; structItem = null; }
        }

        #endregion

        #region IRDArgumentHandler
        UndoRedo<bool> edit = new UndoRedo<bool>();
        /// <summary>
        /// Argument 'edit' položky
        /// </summary>
        [Category("Argumenty")]
        [DisplayName("edit")]
        [Description("Argument 'edit' položky")]
        [TypeConverter(typeof(BooleanTypeConverter))]
        [Browsable(false)]
        public bool Edit { get => edit.Value; set { if (isLoading) edit.Value = value; } }
        /// <summary>
        /// Indikuje, že změna argumentu 'edit' je povolená
        /// </summary>
        [Browsable(false)]
        public bool EnableEdit { get => true; }

        UndoRedo<int> row = new UndoRedo<int>();
        /// <summary>
        /// Argument 'row' položky
        /// </summary>
        [Category("Argumenty")]
        [DisplayName("row")]
        [Description("Argument 'row' položky")]
        public int Row { get => row.Value; set { row.Value = value; } }

        UndoRedo<string> typeRow = new UndoRedo<string>();
        /// <summary>
        /// Argument 'type' položky
        /// </summary>
        [Category("Argumenty")]
        [DisplayName("type")]
        [Description("Argument 'type' položky")]
        [Browsable(false)]
        public string TypeRow { get => typeRow.Value; set { typeRow.Value = string.IsNullOrEmpty(value) ? "string" : value; } }
        #endregion

        #region IItemContainer
        /// <summary>
        /// Přidání položky bočního panelu
        /// </summary>
        /// <param name="info">Přidávaná položka</param>
        /// <param name="e">data o myší</param>
        /// <param name="type">Typ vkládané komponenty</param>
        /// <param name="format">Formát sestavy</param>
        public IComponent CreateItem(dynamic info, MouseEventArgs e, ComponentType type, GFEFormat format = null)
        {
            dynamic com = null;
            switch (type)
            {
                case ComponentType.valueof:
                    com = new GrfContentValue();
                    break;
                default:
                    com = new GrfContentText();
                    break;
            }

            com.Initialize(info);
            com.Parent = this as ISizable;
            com.Page = Page;

            dataName = com.DataName;
            isFirst = true;

            return this;
        }
        /// <summary>
        /// Metoda Pře indexace vnořených objektů 
        /// </summary>
        public virtual void Reindex() { }
        #endregion

        /// <summary>
        /// inicializace objektu dle dostupných informaci
        /// </summary>
        /// <param name="clone">objekt ke kopírování</param>
        public override void Initialize(object clone)
        {
            base.Initialize(clone);

            if (clone is GrfContentSelect cln)
            {
                this.ComponentType = cln.ComponentType;
                this.dataFullName = cln.DataFullName;
                this.dataName = cln.DataName;
                this.TypeRow = cln.TypeRow;
                this.SelectType = cln.SelectType;
                this.Value = cln.Value;
                Options = new ListSelectOption(UndoRedoService.Manager);

                Options.AddRange(cln.Options);

                this.Option_1.Initialize(cln.Option_1, Page);
                this.Option_2.Initialize(cln.Option_2, Page);
            }

            AttrList.Remove("row");
        }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        public override AbstractContent Initialize()
        {
            base.Initialize();
            isLoading = true;
            knownTags = null;
            Options = new ListSelectOption(UndoRedoService.Manager);

            Option_1 = new SelectOption();
            Option_2 = new SelectOption();
            ComponentType = ComponentType.select;
            isLoading = false;
            return this;
        }

        readonly UndoRedo<SelectionType> selecttype = new UndoRedo<SelectionType>();
        /// <summary>
        /// Výška obrázku
        /// </summary>
        [Category("Objekt")]
        [DisplayName("typ výběru")]
        [Description("Typ výběru")]
        public SelectionType SelectType { get => selecttype.Value; set { selecttype.Value = value; } }

        readonly UndoRedo<String> value = new UndoRedo<String>();
        /// <summary>
        /// Výška obrázku
        /// </summary>
        [Category("Objekt")]
        [DisplayName("hodnota")]
        [Description("hodnota")]
        public string Value { get => this.value.Value; set { this.value.Value = value; } }
        bool isRecall = false;

        /// <summary>
        /// seznam řádku záhlavi
        /// </summary>
        [Browsable(false)]
        public ListSelectOption Options { get; protected set; }


        UndoRedo<SelectOption> option_1 = new UndoRedo<SelectOption>();
        /// <summary>
        /// Výběr položky
        /// </summary>
        [Category("Výběr")]
        [DisplayName("první")]
        [Description("První výběr")]
        [Browsable(false)]
        public SelectOption Option_1 { get => option_1.Value; set { if (isLoading) option_1.Value = value; } }

        /// <summary>
        /// Volba první - hodnota
        /// </summary>
        [Category("Volba 1")]
        [DisplayName("hodnota")]
        [Description("Hodnota volby výběru")]
        public string SO1Value { get => Option_1.Value; set { Option_1.Value = value; } }

        /// <summary>
        /// TODO
        /// </summary>
        [Category("Volba 1")]
        [DisplayName("tvar")]
        [Description("TODO")]
        public string SO1Shape { get => Option_1.Shape; set { Option_1.Shape = value; } }

        /// <summary>
        /// Obrázek pozadí
        /// </summary>
        [Category("Volba 1")]
        [DisplayName("název obrázku")]
        [Description("Název obrázku objektu v seznamu všech obrázků dané sestavy")]
        [EditorAttribute(typeof(ImageFileNameTypeEditor), typeof(UITypeEditor))]
        [TypeConverter(typeof(ImageFileNameConverter))]
        public string SO1ImageFileName { get => Option_1.ImageFileName; set { Option_1.ImageFileName = value; } }

        /// <summary>
        /// Indikátor zobrazení štítku na webu
        /// </summary>
        [Category("Volba 1")]
        [DisplayName("zobrazit štítek (web)")]
        [Description("Indikuej zobarzení štítku webového rozhraní")]
        [TypeConverter(typeof(BooleanTypeConverter))]
        public bool SO1WebViewLabel { get => Option_1.WebViewLabel; set { Option_1.WebViewLabel = value; } }

        /// <summary>
        /// Všechny atributy objektu
        /// </summary>
        [Category("Volba 1")]
        [DisplayName("atributy")]
        [Description("Všechny atributy")]
        [EditorAttribute(typeof(AttributeListEditor), typeof(UITypeEditor))]
        public GFEAttrList SO1AttrList { get => Option_1.AttrList; set { Option_1.AttrList = value; } }

        UndoRedo<SelectOption> option_2 = new UndoRedo<SelectOption>();
        /// <summary>
        /// Argument 'edit' položky
        /// </summary>
        [Category("Výběr")]
        [DisplayName("druhý")]
        [Description("Druhý výběr")]
        [Browsable(false)]
        public SelectOption Option_2 { get => option_2.Value; set { if (isLoading) option_2.Value = value; } }

        /// <summary>
        /// Volba první - hodnota
        /// </summary>
        [Category("Volba 2")]
        [DisplayName("hodnota")]
        [Description("Hodnota volby výběru")]
        public string SO2Value { get => Option_2.Value; set { Option_2.Value = value; } }

        /// <summary>
        /// TODO
        /// </summary>
        [Category("Volba 2")]
        [DisplayName("tvar")]
        [Description("TODO")]
        public string SO2Shape { get => Option_2.Shape; set { Option_2.Shape = value; } }

        /// <summary>
        /// Obrázek pozadí
        /// </summary>
        [Category("Volba 2")]
        [DisplayName("název obrázku")]
        [Description("Název obrázku objektu v seznamu všech obrázků dané sestavy")]
        [EditorAttribute(typeof(ImageFileNameTypeEditor), typeof(UITypeEditor))]
        [TypeConverter(typeof(ImageFileNameConverter))]
        public string SO2ImageFileName { get => Option_2.ImageFileName; set { Option_2.ImageFileName = value; } }

        /// <summary>
        /// Indikátor zobrazení štítku na webu
        /// </summary>
        [Category("Volba 2")]
        [DisplayName("zobrazit štítek (web)")]
        [Description("Indikuej zobarzení štítku webového rozhraní")]
        [TypeConverter(typeof(BooleanTypeConverter))]
        public bool SO2WebViewLabel { get => Option_2.WebViewLabel; set { Option_2.WebViewLabel = value; } }

        /// <summary>
        /// Všechny atributy objektu
        /// </summary>
        [Category("Volba 2")]
        [DisplayName("atributy")]
        [Description("Všechny atributy")]
        [EditorAttribute(typeof(AttributeListEditor), typeof(UITypeEditor))]
        public GFEAttrList SO2AttrList { get => Option_2.AttrList; set { Option_2.AttrList = value; } }

        void SetStructureItem()
        {
            if (!isRecall)
            {
                isRecall = true;
                if (!string.IsNullOrEmpty(DataFullName) && PagePanel != null)
                    structItem = (GFEDataItem)CommonService.GetItemFromStructure(PagePanel.Structure, DataFullName, 1);

                if (structItem != null && string.IsNullOrEmpty(TypeRow))
                    TypeRow = CommonService.GetTypeFromStructure(structItem);

                isRecall = false;
            }
        }
    }
}
