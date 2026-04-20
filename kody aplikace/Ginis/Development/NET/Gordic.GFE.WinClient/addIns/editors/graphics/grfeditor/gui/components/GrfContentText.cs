//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ContentText.cs                           </Name>
//    <Description> Textová položka GRF sestavy                                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Windows.Forms;
using System.Xml;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.Editor;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;
using Gordic.General;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.Parsers.Utils;
using Gordic.WinForms.Controls;
using Gordic.GFE.WinClient.Utils;

namespace Gordic.GFE.WinClient.GrfEditor
{
    /// <summary>
    /// Textová položka GRF sestavy
    /// </summary>
    class GrfContentText : AbstractTextContent, IEditControlHandler, IPageBackground
    {
        #region AbstractTextContent
        /// <summary>
        /// Načtení informaci o objektu z formátu daného objektu
        /// </summary>
        public override void LoadInformation()
        {
            if (FormatTag is GFEFormatContentText)
            {
                base.LoadInformation();
                if (string.IsNullOrEmpty(Text.Text))
                    Text.Text = (FormatTag as GFEFormatContentText).Text;
            }
            else if (FormatTag != null
                &&
                FormatTag.TagName.Equals("text", StringComparison.InvariantCultureIgnoreCase))
            {
                // pokud se text nachází ve větví <text>Něco</text>
                // pak se to musí načíst zvlášť
                Text.Text = AttrList.ContainsKey("value") ? AttrList["value"] : FormatTag.GetInnerXml();
                CommonService.ApplayStyle(this, this.AttrList);
            }
            if (AttrList.ContainsKey("back-type"))
                BackType = true;
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
            XmlElement xmlNode = xmlDoc.CreateElement("text", string.IsNullOrEmpty(namespaceUri) ? ReportDesignerProperties.Instance.AlfReportXmlns : namespaceUri);
            xmlNode.SetAttribute("value", CharacterEncodings.GetHexCodeText(Text.Text));
            if (Parent is ICell)
            {
                if (!IsWidthByContent)
                    xmlNode.SetAttribute("width", Width.MathRoundValue(2));
                if (!IsHeightByContent)
                    xmlNode.SetAttribute("height", Height.MathRoundValue(2));
            }
            else
            {
                //Uložení informaci o rámečku pro daný objekt
                if (withRect)
                {
                    string value = TagService.GetRect(this);
                    if (!string.IsNullOrEmpty(value))
                        xmlNode.SetAttribute("rect", value);
                }
                if (Page.Order != 1)
                    //Uložení informaci o stránce, na které se nachází daný objekt
                    xmlNode.SetAttribute("page", Convert.ToString(Page.Order));
            }

            if (!string.IsNullOrEmpty(LabelText))
                xmlNode.SetAttribute("labeltext", LabelText);

            if (BackType)
                xmlNode.SetAttribute("back-type", "true");

            // uložení skriptů
            XmlDocumentService.SetListOfDictionaryItems(xmlNode, Scripts, styles);
            // uložíme neznámé značky
            XmlDocumentService.SetListOfDictionaryItems(xmlNode, Unknowns, styles);

            return xmlNode;
        }
        #endregion

        #region IEditControlHandler
        /// <summary>
        /// Aktivace ovladacího prvku
        /// </summary>
        public void ActivateEditControl()
        {
            if (!this.ReadOnly)
            {
                //jenom pro případ neotočeného objektu
                if (Text.Orientation == RotateType.RotateNoneFlipNone)
                    EditControl = new LtbControl()
                    {
                        Multiline = Text.MultiLine,
                        Text = Text.Text,
                        Font = new Font(Text.TextFont.FontFamily.Name, Text.TextFont.Size.Point, (FontStyle)Text.TextFont.Style),
                        ForeColor = Text.TextFont.ForeColor.Color,
                        BackColor = Text.TextFont.BackColor.Color != Color.Transparent ? Text.TextFont.BackColor.Color : Color.White,
                        TextAlign = Halign(Text.Align.Horizontal),
                        ZoomFactor = GraphicSettingService.Zoom,
                        BorderStyle = BorderStyle.None,
                        WordWrap = GTextWordWrap.Parse("chars")
                    };

                if (EditControl != null)
                    // nastavíme reakci na ukončení editace
                    EditControl.TextRefreshed += ValueChange;
            }
        }

        void ValueChange(object sender, EventArgs e)
        {
            if (!Text.Text.Equals((EditControl as LtbControl).Text))
            {
                if (!UndoRedoService.IsTransactionStarted)
                    UndoRedoService.StartTransaction(GResources.GetResourceText(29450048)); //RC 29450048 : změna textu
                Text.Text = (EditControl as LtbControl).Text;
                UndoRedoService.Commit();
            }
        }

        HorizontalAlignment Halign(HAlign align)
        {
            switch (align)
            {
                case HAlign.right: return HorizontalAlignment.Right;
                case HAlign.center: return HorizontalAlignment.Center;
                default: return HorizontalAlignment.Left;
            }
        }
        /// <summary>
        /// Ovládací prvek objektu
        /// </summary>
        [Browsable(false)]
        public IEditControl EditControl { get; protected set; }

        /// <summary>
        /// Odstranění ovladače
        /// </summary>
        /// <param name="validate">validace - pro filler</param>
        /// <returns></returns>
        public bool RemoveEditControl(bool validate) => false;
        #endregion

        #region IPageBackground
        readonly UndoRedo<bool> backtype = new UndoRedo<bool>();
        /// <summary>
        /// Text objektu
        /// </summary>
        [Category("Pozadí")]
        [DisplayName("pozadí stránky")]
        [Description("Indikuje, že objekt prezentuje pozadí stránky")]
        [TypeConverter(typeof(BooleanTypeConverter))]
        public bool BackType
        {
            get => backtype.Value;
            set
            {
                backtype.Value = value;
                if (Page != null)
                    if (value)
                    {
                        if (Page.BackObject != null)
                            Page.BackObject.BackType = false;

                        Page.BackObject = this;
                        this.Left = new SizeValue("-" + Page.MarginLeft.Value);
                        this.Top = new SizeValue("-" + Page.MarginTop.Value);
                        this.Height = Page.Height;
                        this.Width = Page.Width;
                        Text.Text = string.Empty;
                        if (Order.Count > 0 && Order[0] > 0)
                            this.PropertyOrder = 0;
                    }
                    else
                    {
                        if (Page.BackObject is AbstractContent && (Page.BackObject as AbstractContent).Order.Count > 1 && (Page.BackObject as AbstractContent).Order[0] > 0)
                            (Page.BackObject as AbstractContent).PropertyOrder = (Page.BackObject as AbstractContent).Order.Count - 1;
                        Page.BackObject = null;
                    }
            }
        }

        /// <summary>
        /// Posun
        /// </summary>
        [Browsable(false)]
        public SizeValue BackTop
        {
            get => Top;
            set { Top = value; }
        }

        /// <summary>
        /// Posun
        /// </summary>
        [Browsable(false)]
        public SizeValue BackLeft
        {
            get => Left;
            set { Left = value; }
        }

        /// <summary>
        /// Posun
        /// </summary>
        [Browsable(false)]
        public SizeValue BackWidth
        {
            get => Width;
            set { Width = value; }
        }

        /// <summary>
        /// Posun
        /// </summary>
        [Browsable(false)]
        public SizeValue BackHeight
        {
            get => Height;
            set { Height = value; }
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
                    knownTags = AddInTree.BuildItem("/ReportDesigner/GrfList/TextTags", null) as List<string>;
                return knownTags;
            }
        }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        public override AbstractContent Initialize()
        {
            base.Initialize();
            knownTags = null;
            ComponentType = ComponentType.text;
            return this;
        }

        /// <summary>
        /// inicializace objektu dle dostupných informaci
        /// </summary>
        /// <param name="node">Položka bočního panelu s informaci o vkládaném objektu</param>
        public override AbstractContent Initialize(SideTabItem node)
        {
            base.Initialize(node);
            Text.Text = node.Name;
            return this;
        }
    }
}
