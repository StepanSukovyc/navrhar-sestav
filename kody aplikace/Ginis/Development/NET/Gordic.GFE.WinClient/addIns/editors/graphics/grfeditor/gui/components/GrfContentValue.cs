//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ContentValue.cs                          </Name>
//    <Description> Datová položka GRF sestavy                                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Linq;
using System.Xml;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.WinClient.Editor;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.WinClient.Designer.Gui;
using System.Windows.Forms;
using System.Drawing.Drawing2D;
using Gordic.General;
using Gordic.GFE.WinClient.Utils;
using Gordic.WinForms.Controls;

namespace Gordic.GFE.WinClient.GrfEditor
{
    /// <summary>
    /// Datová položka GRF sestavy
    /// </summary>
    public class GrfContentValue : AbstractTextContent, IRDArgumentHandler, IDataItem
    {
        #region AbstractContent
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
                    if (Parent is ICell cell && cell.Line.Parent is AbstractContent)
                        return list.FindAllByKey(attr => !(cell.Line.Parent as AbstractContent).KnownTags.Contains(attr));
                return list;
            }
        }

        /// <summary>
        /// Skripty
        /// </summary>
        protected override void SetScripts()
        {
            base.SetScripts();

            if (string.IsNullOrEmpty(DataName))
                Text.Text = GetTextFromScript();
        }
        /// <summary>
        /// Text ze skriptů
        /// </summary>
        /// <returns></returns>
        string GetTextFromScript()
        {
            foreach (var item in Scripts)
                if (!string.IsNullOrEmpty(item.Value))
                    return item.Value;

            return string.Empty;
        }

        List<string> knownTags;
        /// <summary>
        /// Známě značky datové položky
        /// </summary>
        public override List<string> KnownTags
        {
            get
            {
                if (knownTags == null)
                    knownTags = AddInTree.BuildItem("/ReportDesigner/GrfList/ValueOfTags", null) as List<string>;
                return knownTags;
            }
        }

        /// <summary>
        /// Načtení informaci o objektu z formátu daného objektu
        /// </summary>
        public override void LoadInformation()
        {
            //Pokud se nejedná o datovou položku pak není co řešit 
            if (FormatTag is GFEFormatContentValue)
                base.LoadInformation();
            else if (FormatTag != null && FormatTag.TagName.Equals("value-of", StringComparison.InvariantCultureIgnoreCase))
            {
                if (AttrList.ContainsKey("name"))
                    Text.Text = AttrList["name"];

                CommonService.ApplayStyle(this, this.AttrList);
            }
            else return;

            if (AttrList.ContainsKey("name"))
                dataName = AttrList["name"];

            if (AttrList.ContainsKey("edit"))
                if (Boolean.TryParse(AttrList["edit"], out bool edit))
                    Edit = edit;

            if (AttrList.ContainsKey("row"))
            {
                if (int.TryParse(AttrList["row"], out int row))
                    Row = row == 0 ? 1 : row;
            }
            else Row = 1;

            if (AttrList.ContainsKey("type"))
                TypeRow = AttrList["type"];
            else if (!string.IsNullOrEmpty(DataFullName))
                TypeRow = CommonService.GetTypeFromStructure(LocalCommonService.GetActualStructure(), DataFullName);
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

            //zjistíme, který text máme vykreslit
            //pokud to není ze skriptů pak vykreslíme zobrazovací název komponenty
            if (!string.IsNullOrEmpty(DataName))
                Text.Text = DataTitle;
            else if (string.IsNullOrEmpty(Text.Text))
                Text.Text = GetTextFromScript();

            DrawClear(graphics);

            if (Anchor)
                TagService.DrawTagAnchor(graphics, BoundsInPixels);

            if (!Scripts.IsEmpty)
                TagService.DrawTagTriangle(graphics, new PointF(LeftZoom, TopZoom));

            Text.Paint(graphics, BoundsInPixels, Padding, Zoom);

            if ("list".Equals(TypeRow))
                DrawArrow(graphics);

            List<int> order = Order;
            if (GraphicSettingService.ShowOrder && order.Count > 0)
                // do pravého horního rohu
                TagService.DrawTagOrder(graphics, new PointF(LeftZoom, TopZoom), Order.Last().ToString(), Zoom);

            graphics.Clip = reg;
            Page?.DelayPaintList.Add(new DelayPaintItem(this, IsSelected, reg));
        }

        private void DrawArrow(Graphics graphics)
        {
            int buttonWidth = SystemInformation.VerticalScrollBarWidth;
            Color highColor = SystemColors.ControlLightLight;
            Color lowColor = SystemColors.ControlDark;
            Rectangle itemRect = new Rectangle((int)(this.LeftZoom + this.WidthZoom) - buttonWidth, (int)this.TopZoom, buttonWidth + 1, (int)this.HeightZoom + 1);

            //Create the brushes.            
            LinearGradientBrush gradientBrush = new LinearGradientBrush(itemRect, highColor, lowColor, LinearGradientMode.Vertical);

            //Fill the rectangle background.
            graphics.SmoothingMode = SmoothingMode.AntiAlias;
            graphics.FillRectangle(gradientBrush, itemRect);
            gradientBrush.Dispose();

            //Draw the button outline.
            Pen outlinePen = new Pen(SystemColors.ButtonShadow, 2.0f);
            graphics.DrawRectangle(outlinePen, itemRect.X, itemRect.Y, itemRect.Width - 2, itemRect.Height - 2);
            outlinePen.Dispose();

            //Draw the arrow.
            SolidBrush arrowBrush = new SolidBrush(Color.DarkGray);
            Point[] points = new Point[3];
            points[0] = new Point((int)(this.LeftZoom + this.WidthZoom) - (int)((double)itemRect.Width * .125) - 2, (int)(this.TopZoom + (double)itemRect.Height * .333));
            points[1] = new Point((int)(this.LeftZoom + this.WidthZoom) - (int)((double)itemRect.Width * .875) - 2, (int)(this.TopZoom + (double)itemRect.Height * .333));
            points[2] = new Point((int)(this.LeftZoom + this.WidthZoom) - (int)((double)itemRect.Width * .5) - 2, (int)(this.TopZoom + (double)itemRect.Height * .666));

            graphics.FillPolygon(arrowBrush, points);
            arrowBrush.Dispose();
        }

        /// <summary>
        /// Vymazání rámečku indikujícího, že daný objekt je aktivní
        /// </summary>
        /// <param name="graphics">Kreslící nástroj</param>
        protected override void DrawClear(Graphics graphics)
        {
            base.DrawClear(graphics);
            if (Text.FontBackColor == Color.Transparent)
            {
                if (Edit)
                    // pokud uživatel si přeje zviditelnění položky, pak ji zviditelníme
                    graphics.FillRectangle(
                        ReportDesignerProperties.Instance.ShowColorOf
                        ? new SolidBrush(Color.FromArgb(204, 255, 204))
                        : new SolidBrush(Color.FromArgb(255, 255, 225)),
                        BoundsInPixels);
                else if (ReportDesignerDesignerProperties.Instance.ShowColorOfObjects)
                {
                    Color col = ColorService.GetColor(ReportDesignerProperties.Instance.ValueOfColor, Color.FromArgb(255, 255, 225));
                    if (col != Color.Transparent)
                        // pokud uživatel si přeje zviditelnění položky, pak ji zviditelníme
                        graphics.FillRectangle(new SolidBrush(col), BoundsInPixels);
                    //// pokud uživatel si přeje zviditelnění položky, pak ji zviditelníme
                    //graphics.FillRectangle(new SolidBrush(Color.FromArgb(255, 255, 225)), BoundsInPixels);
                }
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
            if (!CommonService.IsValidateByStructure(DataFullName, regionFullName, false))
            {
                LoggingService.Info(string.Format(GResources.GetResourceText(29451457), DataFullName));
                GMessageBox.ShowError(string.Format(GResources.GetResourceText(29451457), DataFullName));
                //throw new GrfValidateException(string.Format(GResources.GetResourceText(29451457), DataFullName), this);
            }

            XmlElement xmlNode = xmlDoc.CreateElement("value-of", string.IsNullOrEmpty(namespaceUri) ? ReportDesignerProperties.Instance.AlfReportXmlns : namespaceUri);
            //Protože zde může být proměnna, pak zavoláme metodu, 
            //která by nám podle názvu zjistila co vlastně tato komponenta je
            xmlNode.SetAttribute("name", CommonService.GetNameForAttribute(DataFullName, regionFullName));

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

            if (Text.Format != null && !string.IsNullOrEmpty(Text.Format))
                xmlNode.SetAttribute("format", Text.Format);

            if (Edit)
                xmlNode.SetAttribute("edit", "true");

            if (Row > 1)
                xmlNode.SetAttribute("row", Convert.ToString(Row));

            if (!string.IsNullOrEmpty(TypeRow) && !string.Equals(TypeRow, "string", StringComparison.InvariantCultureIgnoreCase))
                xmlNode.SetAttribute("type", TypeRow);

            if (!string.IsNullOrEmpty(LabelText))
                xmlNode.SetAttribute("labeltext", CharacterEncodings.GetHexCodeText(LabelText));

            foreach (var item in Validates)
                xmlNode.AppendChild(item.GetDataContent(xmlDoc, namespaceUri));

            //uložení skriptů
            XmlDocumentService.SetListOfDictionaryItems(xmlNode, Scripts, styles);
            // uložíme neznámé značky
            XmlDocumentService.SetListOfDictionaryItems(xmlNode, Unknowns, styles);

            return xmlNode;
        }
        #endregion

        #region IRDArgumentHandler
        readonly UndoRedo<bool> edit = new UndoRedo<bool>();
        /// <summary>
        /// Argument 'edit' položky
        /// </summary>
        [Category("Argumenty")]
        [DisplayName("edit")]
        [Description("Argument 'edit' položky")]
        [TypeConverter(typeof(BooleanTypeConverter))]
        public bool Edit { get => edit.Value; set { if (isLoading || EnableEdit) edit.Value = value; } }
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

        readonly UndoRedo<int> row = new UndoRedo<int>();
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
        public string TypeRow { get => typeRow.Value; set { typeRow.Value = string.IsNullOrEmpty(value) ? "string" : value; } }
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

        bool isRecall = false;

        /// <summary>
        /// inicializace objektu
        /// </summary>
        public override AbstractContent Initialize()
        {
            base.Initialize();
            ComponentType = ComponentType.valueof;
            return this;
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
        /// <param name="clone">objekt ke kopírování</param>
        public override void Initialize(object clone)
        {
            base.Initialize(clone);
            if (clone is GrfContentValue)
            {
                ComponentType = (clone as GrfContentValue).ComponentType;
                dataFullName = (clone as GrfContentValue).DataFullName;
                dataName = (clone as GrfContentValue).DataName;
                TypeRow = (clone as GrfContentValue).TypeRow;
            }

            AttrList.Remove("row");
        }

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
