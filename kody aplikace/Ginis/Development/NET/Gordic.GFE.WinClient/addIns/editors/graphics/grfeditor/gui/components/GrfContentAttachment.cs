//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GrfContentAttachment.cs                </Name>
//    <Description> příloha sestav                                              </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-03-10                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.WinClient.Editor;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.WinClient.Utils;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Xml;

namespace Gordic.GFE.WinClient.GrfEditor
{
    /// <summary>
    /// příloha sestav
    /// </summary>
    class GrfContentAttachment : AbstractTextContent
    {
        #region AbstractTextContent
        /// <summary>
        /// Načtení informaci o objektu z formátu daného objektu
        /// </summary>
        public override void LoadInformation()
        {
            // pokud to není textové pole pak není co řešit
            if (FormatTag is GFEFormatUnknownContent)
            {
                base.LoadInformation();
                if (FormatTag.Attributes.ContainsKey("guid"))
                    Guid = FormatTag.Attributes["guid"];
                else
                    Guid = System.Guid.NewGuid().ToString().Replace("-", "");

                if (FormatTag.Attributes.ContainsKey("text"))
                    Text.Text = FormatTag.Attributes["text"];

                if (FormatTag.Attributes.ContainsKey("filter"))
                    Filter = FormatTag.Attributes["filter"];
            }
            else
#pragma warning disable CS0618 // Typ nebo člen je zastaralý.
                CommonService.ApplayStyleSizable(this, AttrList);
#pragma warning restore CS0618 // Typ nebo člen je zastaralý.
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
            XmlElement xmlNode = xmlDoc.CreateElement("attachment", string.IsNullOrEmpty(namespaceUri) ? ReportDesignerProperties.Instance.AlfReportXmlns : namespaceUri);

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

            if (!string.IsNullOrEmpty(Text.Text))
                xmlNode.SetAttribute("text", CharacterEncodings.GetHexCodeText(Text.Text));
            if (!string.IsNullOrEmpty(Filter))
                xmlNode.SetAttribute("filter", Filter);
            if (!string.IsNullOrEmpty(Guid))
                xmlNode.SetAttribute("guid", Guid);
            else
                xmlNode.SetAttribute("guid", System.Guid.NewGuid().ToString().Replace("-", ""));

            if (!string.IsNullOrEmpty(LabelText))
                xmlNode.SetAttribute("labeltext", CharacterEncodings.GetHexCodeText(LabelText));

            //uložení skriptů
            XmlDocumentService.SetListOfDictionaryItems(xmlNode, Scripts, styles);
            // uložíme neznámé značky
            XmlDocumentService.SetListOfDictionaryItems(xmlNode, Unknowns, styles);

            // uložení sekce VALIDATE
            foreach (var item in Validates)
                xmlNode.AppendChild(item.GetDataContent(xmlDoc, namespaceUri));

            return xmlNode;
        }

        RectangleF ButtonBoundsInPixels { get { return new RectangleF(LeftZoom + WidthZoom - HeightZoom, TopZoom, HeightZoom, HeightZoom); } }
        /// <summary>
        /// Vymazání rámečku indikujícího, že daný objekt je aktivní
        /// </summary>
        /// <param name="graphics">Kreslící nástroj</param>
        protected override void DrawClear(Graphics graphics)
        {
            // v případě, že typ řádku není COLUMNS, pak kreslíme pozadí
            if (!(Parent is ICell && (Parent as ICell).Line.Type == LineType.columns))
                // gradientní kreslení tlačítka objektu
                using (System.Drawing.Drawing2D.LinearGradientBrush gradBrush = new System.Drawing.Drawing2D.LinearGradientBrush(ButtonBoundsInPixels, Color.LightSlateGray, Color.White, 0, true))
                {
                    graphics.FillRectangle(gradBrush, (float)Math.Ceiling(LeftZoom + WidthZoom - HeightZoom), (float)Math.Ceiling(TopZoom), (float)Math.Ceiling(HeightZoom), (float)Math.Ceiling(HeightZoom));
                    graphics.DrawRectangle(new Pen(SystemBrushes.ActiveBorder), (float)Math.Ceiling(LeftZoom + WidthZoom - HeightZoom), (float)Math.Ceiling(TopZoom), (float)Math.Ceiling(HeightZoom), (float)Math.Ceiling(HeightZoom));
                    var bmp = ImageService.ResizeImage(Properties.Resources.priloha, (float)Math.Round(HeightZoom) - 5, (float)Math.Round(HeightZoom) - 5);
                    if (bmp != null)
                        graphics.DrawImage(bmp, (float)Math.Ceiling(LeftZoom + WidthZoom - HeightZoom), (float)Math.Round(TopZoom));
                }
        }
        #endregion

        UndoRedo<string> filter = new UndoRedo<string>();
        /// <summary>
        /// Filter typů souborů příloh
        /// </summary>
        [DisplayName("filter")]
        [Category("Přílohy")]
        [Description("Filter typů souborů příloh")]
        public string Filter { get { return filter.Value; } set { filter.Value = value; } }

        UndoRedo<string> guid = new UndoRedo<string>();
        /// <summary>
        /// Jednoznačný identifikátor složky příloh
        /// </summary>
        [Category("Přílohy")]
        [DisplayName("jednoznačný identifikátor")]
        [Description("jednoznačný identifikátor složky příloh (bez mezer)")]
        public string Guid { get { return guid.Value; } set { guid.Value = value.Replace(" ", ""); } }

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
                    knownTags = AddInTree.BuildItem("/ReportDesigner/GrfList/AttachmentTags", null) as List<string>;
                return knownTags;
            }
        }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        public override AbstractContent Initialize()
        {
            base.Initialize();
            ComponentType = ComponentType.attachment;
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
        }

        /// <summary>
        /// inicializace objektu dle dostupných informaci
        /// </summary>
        /// <param name="item">Informace o formátu objektu.</param>
        public override AbstractContent Initialize(GFEFormatTag item)
        {
            base.Initialize(item);
            Text = new URAttachmentText(this);
            return this;
        }
    }
}
