//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ContentUnknown.cs                        </Name>
//    <Description> Obsah neznámých větví GRF sestav                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Drawing.Design;
using System.Xml;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.WinClient.Editor;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.WinClient.Utils;

namespace Gordic.GFE.WinClient.GrfEditor
{
    /// <summary>
    /// Obsah neznámých větví GRF sestav
    /// </summary>
    class GrfContentUnknown : AbstractContent, IXMLContent
    {
        #region IXMLContent
        string innerText;
        /// <summary>
        /// obsah chartu
        /// </summary>
        [DisplayName("obsah")]
        [Description("XML obsah neznámé větve")]
        [EditorAttribute(typeof(XMLTextEditor), typeof(UITypeEditor))]
        public string InnerText { get => innerText; set { innerText = value; DisplayText = new URTagText(); DisplayText.Initialize(innerText); } }
        #endregion

        /// <summary>
        /// Neznámé značky buňky
        /// </summary>
        [Browsable(false)]
        public override Dictionary<string, string> Unknowns
        {
            get
            {
                Dictionary<string, string> list = AttrList?.FindAllByKey(attr => !KnownTags.Contains(attr) && !Scripts.ContainsKey(attr)
                    && !attr.Equals("rect", StringComparison.InvariantCultureIgnoreCase));

                if (list.Count != 0)
                    if (Parent is ICell cell && cell.Line.Parent is AbstractContent)
                        return list.FindAllByKey(attr => !(cell.Line.Parent as AbstractContent).KnownTags.Contains(attr));
                return list;
            }
        }

        /// <summary>
        /// Načtení informaci o objektu z formátu objektu
        /// </summary>
        public override void LoadInformation()
        {
            // pokud se nejedná o datovou položku pak není co řešit 
            if (FormatTag is GFEFormatUnknown || FormatTag is GFEFormatUnknownContent)
                base.LoadInformation();
            else
                CommonService.ApplayStyle(this, AttrList);

            if (FormatTag != null)
            {
                //pozice řádku, ve kterém začíná Tag
                StartPosition = FormatTag.LinePosition - 1;

                TagName = FormatTag.TagName;
                InnerText = FormatTag.GetInnerXml();
            }

            if (AttrList.ContainsKey("rect"))
                TagService.SetRectByAttribute(this, AttrList["rect"]);
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
            graphics.Clip = new Region(RectangleF.Intersect(new RectangleF(LeftZoom - 1, TopZoom - 1, WidthZoom + 2, HeightZoom + 2), graphics.VisibleClipBounds));

            if (!Scripts.IsEmpty)
                TagService.DrawTagTriangle(graphics, new PointF(LeftZoom, TopZoom));

            DrawClear(graphics);

            DisplayText.Paint(graphics, BoundsInPixels, Padding, GraphicSettingService.Zoom);

            if (Page != null)
                Page.DelayPaintList.Add(new DelayPaintItem(this, IsSelected, reg));

            graphics.Clip = reg;
        }

        /// <summary>
        /// Vymazání rámečku indikujícího, že daný objekt je aktivní
        /// </summary>
        /// <param name="graphics">Kreslící nástroj</param>
        protected override void DrawClear(Graphics graphics)
        {
            // v případě, že typ řádku není COLUMNS, pak kreslíme pozadí
            if (!(Parent is ICell && (Parent as ICell).Line.Type == LineType.columns))
                // gradientní kreslení štítkové zóny
                using (System.Drawing.Drawing2D.LinearGradientBrush gradBrush = new System.Drawing.Drawing2D.LinearGradientBrush(BoundsInPixels, Color.LightSlateGray, Color.White, 0, true))
                    graphics.FillRectangle(gradBrush, LeftZoom, TopZoom, WidthZoom, HeightZoom);
        }

        /// <summary>
        /// Kreslení ohraniční objektu
        /// </summary>
        /// <param name="graphics">Ovladač grafiky</param>
        /// <param name="isSelected">indikátor vybranosti objektu</param>
        public override void OnPaintBorder(Graphics graphics, bool isSelected)
        {
            base.OnPaintBorder(graphics, isSelected);
            if (!isSelected)
                graphics.DrawRectangle(new Pen(new SolidBrush(Color.Red), 1), LeftZoom, TopZoom, BoundsInPixels.Width, BoundsInPixels.Height);
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
            XmlElement xmlNode;
            try
            {
                xmlNode = xmlDoc.CreateElement(TagName, string.IsNullOrEmpty(namespaceUri) ? ReportDesignerProperties.Instance.AlfReportXmlns : namespaceUri);

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

                if (!string.IsNullOrEmpty(LabelText))
                    xmlNode.SetAttribute("labeltext", CharacterEncodings.GetHexCodeText(LabelText));

                // uložíme neznámé značky
                XmlDocumentService.SetListOfDictionaryItems(xmlNode, Unknowns, styles);
                XmlDocumentService.SetInnerText(xmlDoc, xmlNode, CharacterEncodings.GetHexCodeText(InnerText));
            }
            catch (Exception ex)
            {
                LoggingService.Error(ex);
                xmlNode = xmlDoc.CreateElement("unknown", string.IsNullOrEmpty(namespaceUri) ? ReportDesignerProperties.Instance.AlfReportXmlns : namespaceUri);
                xmlNode.AppendChild(xmlDoc.CreateComment(InnerText));
            }
            return xmlNode;
        }

        UndoRedo<URTagText> text;
        URTagText DisplayText { get => text.Value; set => text.Value = value; }

        UndoRedo<string> tagname;
        /// <summary>
        /// Název větve
        /// </summary>
        [Category("Datová položka"), ReadOnly(true)] //RC 29450464 : Datová položka
        [DisplayName("název větve")] //RC  : název větve
        [Description("Název větve v souboru sestavy")] //RC 29450542 : Název větve v souboru sestavy
        public string TagName { get => tagname.Value; set => tagname.Value = value; }

        List<string> knownTags;
        /// <summary>
        /// Známě značky regionu
        /// </summary>
        public override List<string> KnownTags
        {
            get
            {
                if (knownTags == null)
                    knownTags = new List<string>();
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
            text = new UndoRedo<URTagText>();
            tagname = new UndoRedo<string>();
            innerText = string.Empty;
            ComponentType = ComponentType.none;
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
            if (clone is GrfContentUnknown)
                this.TagName = (clone as GrfContentUnknown).TagName;
        }
    }
}