//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GrrContentValue.cs                     </Name>
//    <Description> datová položka GRR sestavy                                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-05-16                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Linq;
using System.Xml;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.WinClient.VariablesView;
using Gordic.GFE.WinClient.Designer.Gui;
using Gordic.GFE.Parsers.Editor;
using System.Windows.Forms;
using Gordic.General;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// datová položka GRR sestavy
    /// </summary>
    class GrrContentValue : AbstractTextContentLineable, IRDArgumentHandler, IDataItem
    {
        #region AbstractTextContentLineable
        /// <summary>
        /// Neznámé značky buňky
        /// </summary>
        [Browsable(false)]
        public override Dictionary<string, string> Unknowns
        {
            get
            {
                Dictionary<string, string> list = AttrList?.FindAllByKey(attr => !KnownTags.Contains(attr) && !Scripts.ContainsKey(attr)
                    && !attr.Equals("edit", StringComparison.InvariantCultureIgnoreCase)
                    && !attr.Equals("type", StringComparison.InvariantCultureIgnoreCase));
                if (list.Count != 0)
                {
                    if (Parent is ICell cell && cell.Line.Parent is AbstractContent)
                        return list.FindAllByKey(attr => !(cell.Line.Parent as AbstractContent).KnownTags.Contains(attr));
                }
                return list;
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
            XmlElement xmlNode = xmlDoc.CreateElement("value-of", string.IsNullOrEmpty(namespaceUri) ? ReportDesignerProperties.Instance.AlfReportXmlns : namespaceUri);
            //Protože zde může být proměnna, pak zavoláme metodu, 
            //která by nám podle názvu zjistila co vlastně tato komponenta je
            xmlNode.SetAttribute("name", DataName);

            if (Text.Format != null && !string.IsNullOrEmpty(Text.Format))
                xmlNode.SetAttribute("format", Text.Format);

            foreach (var item in Validates)
                xmlNode.AppendChild(item.GetDataContent(xmlDoc, namespaceUri));

            if (Edit)
                xmlNode.SetAttribute("edit", "true");

            if (Row > 1)
                xmlNode.SetAttribute("row", Convert.ToString(Row));

            if (!string.IsNullOrEmpty(TypeRow) && !string.Equals(TypeRow, "string", StringComparison.InvariantCultureIgnoreCase))
                xmlNode.SetAttribute("type", TypeRow);

            //uložení skriptů
            XmlDocumentService.SetListOfDictionaryItems(xmlNode, Scripts, styles);
            // uložíme neznámé značky
            XmlDocumentService.SetListOfDictionaryItems(xmlNode, Unknowns, styles);

            return xmlNode;
        }

        /// <summary>
        /// Kreslení objektu
        /// </summary>
        /// <param name="graphics">Ovladač grafiky</param>
        /// <param name="args">args</param>
        public override void OnPaint(Graphics graphics, PaintArgs args)
        {
            if (!graphics.VisibleClipBounds.IntersectsWith(BoundsInPixels))
                return;

            Region reg = graphics.Clip;
            graphics.Clip = new Region(RectangleF.Intersect(BoundsInPixels, graphics.VisibleClipBounds));

            if (Text != null)
            {
                if (Variable != null)
                    Text.Text = Variable.Name;
                //zjistíme, který text máme vykreslit
                //pokud to není ze skriptů pak vykreslíme zobrazovací název komponenty
                else if (!string.IsNullOrEmpty(DataName))
                    Text.Text = DataTitle;

                // v případě, že barva bude Průhledná (Transparent), 
                //pak při použití FillRectangle se daný objekt může zabarvit do bílé barvy 
                //proto se tomu vyhneme
                DrawClear(graphics);

                if (Text.FontBackColor == Color.Transparent
                    && ReportDesignerDesignerProperties.Instance.ShowColorOfObjects)
                {
                    Color col = ColorService.GetColor(ReportDesignerProperties.Instance.ValueOfColor, Color.FromArgb(255, 255, 225));
                    if (col != Color.Transparent)
                        // pokud uživatel si přeje zviditelnění položky, pak ji zviditelníme
                        graphics.FillRectangle(new SolidBrush(col), BoundsInPixels);
                }

                Text.Paint(graphics, BoundsInPixels, Padding, Zoom);
            }

            if (Anchor)
                TagService.DrawTagAnchor(graphics, BoundsInPixels);

            if (Scripts != null && !Scripts.IsEmpty)
                TagService.DrawTagTriangle(graphics, new PointF(LeftZoom, TopZoom));

            graphics.Clip = reg;
            if (Page != null)
                Page.DelayPaintList.Add(new DelayPaintItem(this, IsSelected, reg));
        }

        /// <summary>
        /// Načtení informaci o objektu z formátu daného objektu
        /// </summary>
        public override void LoadInformation()
        {
            //Pokud se nejedná o datovou položku pak není co řešit 
            if (!(FormatTag is GFEFormatContentValue))
                return;

            base.LoadInformation();

            //Zafixujeme objekt
            GFEFormatContentValue _value = (GFEFormatContentValue)FormatTag;
            dataName = _value.DataName;
            if (string.IsNullOrEmpty(dataName))
                fromScript = true;

            this.Scripts.ScriptChanged += ScriptsScriptChanged;
            ScriptsScriptChanged(this, EventArgs.Empty);

            if (AttrList.ContainsKey("edit"))
            {
                if (Boolean.TryParse(AttrList["edit"], out bool edit))
                    Edit = edit;
            }

            if (AttrList.ContainsKey("row"))
            {
                if (int.TryParse(AttrList["row"], out int row))
                    Row = row == 0 ? 1 : row;
            }
            else Row = 1;

            if (AttrList.ContainsKey("type"))
                TypeRow = AttrList["type"];
            else if (!string.IsNullOrEmpty(DataFullName))
                TypeRow = CommonService.GetTypeFromStructure(LocalCommonService.GetActualStructure(), DataFullName, 1);
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
        public bool Edit { get { return edit.Value; } set { if (isLoading || EnableEdit) edit.Value = value; } }
        /// <summary>
        /// Indikuje, že změna argumentu 'edit' je povolená
        /// </summary>
        [Browsable(false)]
        public bool EnableEdit
        {
            get
            {
                if (StructureItem != null)
                {
                    var defaultEdit = structItem.Attributes.GetWithDefault("edit", string.Empty);
                    if (defaultEdit == "false")
                        return false; //nelze změnít
                }
                return true;
            }
        }

        UndoRedo<int> row = new UndoRedo<int>();
        /// <summary>
        /// Argument 'row' položky
        /// </summary>
        [Category("Argumenty")]
        [DisplayName("row")]
        [Description("Argument 'row' položky")]
        public int Row { get { return row.Value; } set { row.Value = value; } }

        UndoRedo<string> typeRow = new UndoRedo<string>();
        /// <summary>
        /// Argument 'type' položky
        /// </summary>
        [Category("Argumenty")]
        [DisplayName("type")]
        [Description("Argument 'type' položky")]
        //public string TypeRow { get { return typeRow.Value; } set { typeRow.Value = value; } }
        public string TypeRow { get { return typeRow.Value; } set { typeRow.Value = string.IsNullOrEmpty(value) ? "string" : value; } }
        #endregion

        #region IDataItem
        bool isRootElement;
        /// <summary>
        /// indikuje, že položka je přímo ze sekce ROOT
        /// </summary>
        [Browsable(false)]
        public bool IsRootElement { get { return isRootElement; } }

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

                if (string.IsNullOrEmpty(dataTitle))
                    return DataName;

                return dataTitle;
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
                if (string.IsNullOrEmpty(dataName) && !fromScript)
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
                    GFEStructure structure = Page == null || Page.PagePanel == null ?
                        LocalCommonService.GetActualStructure() : PagePanel.Structure;
                    if (structure != null)
                        dataFullName = CommonService.GetFullName(structure.Root, (FormatTag.Region != null ? FormatTag.Region.DataFullName + "." : "") + dataName, true, ref isRootElement);
                }
                return dataFullName;
            }
        }

        GFEDataItem structItem;
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
            set { isFirst = true; structItem = null; SetStructureItem(); }
        }
        #endregion

        #region IToolTip
        /// <summary>
        /// Nápovědný text objektu (se skládá RUN-TIME)
        /// </summary>
        public override HintText ToolTipText
        {
            get
            {
                string result = base.ToolTipText.ToolTipText;
                if (ReportDesignerProperties.Instance.ShowNazev)
                    result += (string.IsNullOrEmpty(result) ? "" : "\n") + GResources.GetResourceText(29451442) + " " + DataTitle;
                if (ReportDesignerProperties.Instance.ShowDatovyTyp)
                    result += (string.IsNullOrEmpty(result) ? "" : "\n") + GResources.GetResourceText(29451443) + " " + DataFullName;
                if (ReportDesignerProperties.Instance.ShowDatovyTyp)
                    result += (string.IsNullOrEmpty(result) ? "" : "\n") + GResources.GetResourceText(29451444) + " " + ComponentType;
                if (ReportDesignerProperties.Instance.ShowTextFont)
                    result += (string.IsNullOrEmpty(result) ? "" : "\n") + PropertyTextFont;
                if (ReportDesignerProperties.Instance.ShowTextAlign)
                    result += (string.IsNullOrEmpty(result) ? "" : "\n") + GResources.GetResourceText(29451445) + " " + PropertyHAlign + GResources.GetResourceText(29451446) + " " + PropertyVAlign;
                if (ReportDesignerProperties.Instance.ShowScripts)
                {
                    var scripta = string.Empty;
                    foreach (var item in Scripts)
                        if (!string.IsNullOrEmpty(item.Value))
                            scripta += (string.IsNullOrEmpty(result) ? "" : "\n") + item.Key + ": " + item.Value;

                    if (!string.IsNullOrEmpty(scripta))
                    {
                        result += (string.IsNullOrEmpty(result) ? "" : "\n") + GResources.GetResourceText(29451447) + " ";
                        result += scripta;
                    }
                }
                return new HintText(result);
            }
        }
        #endregion

        #region ITextHandler
        public override void SetHeightByContent(Graphics graphics)
        {
            if (Text != null && Width.Value != null && Padding != null && Surround != null)
                Height = TagService.GetHeightByContent(graphics
                    , Text.TextFont.Font
                    , (int)(Width - Padding.LeftPixels - Padding.RightPixels - Surround.Width.LeftPixels - Surround.Width.RightPixels)
                    , false
                    , Text.Text
                    , Padding.TopPixels + Padding.BottomPixels);
        }
        #endregion
        List<string> knownTags;
        /// <summary>
        /// Známě značky regionu
        /// </summary>
        public override List<string> KnownTags
        {
            get
            {
                if (knownTags == null)
                    knownTags = AddInTree.BuildItem("/ReportDesigner/GrrList/ValueOfTags", null) as List<string>;
                return knownTags;
            }
        }

        UndoRedo<VariableNode> variableNode;
        /// <summary>
        /// proměnná
        /// </summary>
        [Browsable(false)]
        public VariableNode Variable { get => variableNode.Value; set { variableNode.Value = value; ComponentType = ComponentType.variable; } }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        public override AbstractContent Initialize()
        {
            base.Initialize();
            variableNode = new UndoRedo<VariableNode>();
            isRecall = false;
            knownTags = null;
            fromScript = false;
            isFirst = true;
            ComponentType = ComponentType.valueof;
            return this;
        }

        /// <summary>
        /// inicializace objektu dle dostupných informaci
        /// </summary>
        /// <param name="clone">objekt ke kopírování</param>
        public override void Initialize(object clone)
        {
            base.Initialize(clone);
            if (clone is GrrContentValue cln)
            {
                dataFullName = cln.DataFullName;
                dataName = cln.DataName;
                TypeRow = cln.TypeRow;
            }

            this.Scripts.ScriptChanged += ScriptsScriptChanged;
        }

        /// <summary>
        /// inicializace objektu dle dostupných informaci
        /// </summary>
        /// <param name="item">Informace o formátu objektu.</param>
        public override AbstractContent Initialize(GFEFormatTag item)
        {
            base.Initialize(item);
            if (item.Attributes.ContainsKey("type"))
                TypeRow = item.Attributes["type"];

            Text.EnableChangeText = false;
            return this;
        }

        /// <summary>
        /// inicializace objektu dle dostupných informaci
        /// </summary>
        /// <param name="sen">Položka struktury</param>
        public override AbstractContent Initialize(StructExtNode sen)
        {
            base.Initialize(sen);
            Text.Text = sen.FullName;
            dataFullName = sen.FullName;
            dataName = sen.Name;
            dataDescription = sen.DataItem.Description;

            if (sen.Parent.Name.Equals("root", StringComparison.InvariantCultureIgnoreCase))
                isRootElement = true;

            var defaultFormat = sen.DataItem.Attributes.GetWithDefault("default-format", "");
            if (!string.IsNullOrEmpty(defaultFormat))
                Text.Format = defaultFormat;

            var defaultEdit = sen.DataItem.Attributes.GetWithDefault("edit", "");
            if (defaultEdit == "true")
                Edit = true;

            TypeRow = CommonService.GetTypeFromStructure(sen.DataItem);
            if (TypeRow.Equals("list", StringComparison.InvariantCultureIgnoreCase)
                && sen.DataItem.Attributes.ContainsKey("items"))
                if (!AttrList.ContainsKey("items"))
                    AttrList.Add("items", sen.DataItem.Attributes["items"]);
                else
                    AttrList["items"] = sen.DataItem.Attributes["items"];

            Text.EnableChangeText = false;
            return this;
        }

        /// <summary>
        /// inicializace objektu dle dostupných informaci
        /// </summary>
        /// <param name="variable">Položka proměnných</param>
        public override AbstractContent Initialize(VarExtNode variable)
        {
            base.Initialize(variable);
            Variable = variable.Variable;
            isRootElement = false;

            Text.EnableChangeText = false;
            return this;
        }

        bool isFirst, isRecall, fromScript;
        void ScriptsScriptChanged(object sender, EventArgs e)
        {
            if (Text != null && fromScript)
                Text.Text = GetTextFromScript();
        }
        void SetStructureItem()
        {
            if (!isRecall)
            {
                isRecall = true;
                if (!string.IsNullOrEmpty(DataFullName) && PagePanel != null)
                    structItem = (GFEDataItem)CommonService.GetItemFromStructure(PagePanel.Structure, DataFullName, 1);
                isRecall = false;
            }
        }
        string GetTextFromScript()
        {
            string str = "self.value=";

            foreach (var item in Scripts)
                if (!string.IsNullOrEmpty(item.Value) && item.Value.Contains(str))
                    return item.Value.Remove(0, item.Value.IndexOf(str) + str.Length).Trim(' ');

            if (Scripts.ExistsByValue(it => !string.IsNullOrEmpty(it)))
                return Scripts.FirstOrDefault(it => !string.IsNullOrEmpty(it.Value)).Value;

            return string.Empty;
        }
    }
}
