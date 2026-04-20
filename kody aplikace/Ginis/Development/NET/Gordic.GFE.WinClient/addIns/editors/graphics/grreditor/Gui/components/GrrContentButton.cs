//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GrrContentButton.cs                    </Name>
//    <Description> Načtení informaci o objektu z formátu daného objektu        </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2021-11-15                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.WinClient.Utils;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Xml;

namespace Gordic.GFE.WinClient.Editor
{
    internal class GrrContentButton : AbstractTextContentLineable
    {
        #region AbstractTextContent
        /// <summary>
        /// Načtení informaci o objektu z formátu daného objektu
        /// </summary>
        public override void LoadInformation()
        {
            base.LoadInformation();
            //Pokud to není textové pole pak není co řešit
            if (!(FormatTag is GFEFormatUnknownContent))
                return;

            // pokud se text nachází ve větví <text>Něco</text>
            // pak se to musí načíst zvlášť
            if (string.IsNullOrEmpty(Text.Text))
                Text.Text = (FormatTag as GFEFormatUnknownContent).InnerText;
            if (string.IsNullOrEmpty(Text.Text) && FormatTag.Attributes.ContainsKey("value"))
                Text.Text = FormatTag.Attributes["value"];
        }

        /// <summary>
        /// Vymazání rámečku indikujícího, že daný objekt je aktivní
        /// </summary>
        /// <param name="graphics">Kreslící nástroj</param>
        protected override void DrawClear(System.Drawing.Graphics graphics)
        {
            // gradientní kreslení štítkové zóny
            if (WidthZoom != 0 && HeightZoom != 0)
                System.Windows.Forms.ButtonRenderer.DrawButton(
                graphics,
                Rectangle.Round(BoundsInPixels),
                System.Windows.Forms.VisualStyles.PushButtonState.Normal);
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
            XmlElement xmlNode = xmlDoc.CreateElement("button", string.IsNullOrEmpty(namespaceUri) ? ReportDesignerProperties.Instance.AlfReportXmlns : namespaceUri);
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
                if (withRect)
                {
                    //Uložení informaci o rámečku pro daný objekt
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

            //uložení skriptů
            XmlDocumentService.SetListOfDictionaryItems(xmlNode, Scripts, styles);
            // uložíme neznámé značky
            XmlDocumentService.SetListOfDictionaryItems(xmlNode, Unknowns, styles);

            return xmlNode;
        }
        #endregion

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
                    knownTags = AddInTree.BuildItem("/ReportDesigner/GrrList/ButtonTags", null) as List<string>;
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
            ComponentType = ComponentType.button;
            return this;
        }
    }
}
