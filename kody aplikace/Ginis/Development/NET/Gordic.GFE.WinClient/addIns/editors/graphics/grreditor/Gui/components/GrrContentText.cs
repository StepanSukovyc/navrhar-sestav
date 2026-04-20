//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GrrContentText.cs                      </Name>
//    <Description> textová položka grr sestav                                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-24                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Windows.Forms;
using System.Xml;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;
using Gordic.General;
using System;
using Gordic.GFE.Parsers.Editor;
using System.Net;
using Gordic.GFE.WinClient.Utils;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// textová položka grr sestav
    /// </summary>
    class GrrContentText : AbstractTextContentLineable, IEditControlHandler
    {
        #region AbstractTextContentLineable
        /// <summary>
        /// Načtení informaci o objektu z formátu daného objektu
        /// </summary>
        public override void LoadInformation()
        {
            base.LoadInformation();
            //Pokud to není textové pole pak není co řešit
            if (!(FormatTag is GFEFormatContentText))
                return;

            // pokud se text nachází ve větví <text>Něco</text>
            // pak se to musí načíst zvlášť
            if (string.IsNullOrEmpty(Text.Text))
                Text.Text = (FormatTag as GFEFormatContentText).Text;
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

            //uložení skriptů
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
            //jenom pro případ neotočeného objektu
            if (Text.Orientation == RotateType.RotateNoneFlipNone)
                EditControl = new LtbControl()
                {
                    ZoomScalable = true,
                    ZoomFactor = GraphicSettingService.Zoom,
                    Multiline = Text.MultiLine,
                    Text = Text.Text,
                    Font = new Font(Text.TextFont.FontFamily.Name, Text.TextFont.Size.Point, (FontStyle)Text.TextFont.Style),
                    ForeColor = Text.TextFont.ForeColor.Color,
                    BackColor = Text.TextFont.BackColor.Color != Color.Transparent ? Text.TextFont.BackColor.Color : Color.White,
                    TextAlign = Halign(Text.Align.Horizontal),
                    BorderStyle = BorderStyle.None
                };

            if (EditControl != null)
                // nastavíme reakci na ukončení editace
                EditControl.TextRefreshed += ValueChange;
        }

        void ValueChange(object sender, EventArgs e)
        {
            if (Text != null)
                if (Text.Text == null || !Text.Text.Equals((EditControl as LtbControl).Text))
                {
                    if (!UndoRedoService.IsTransactionStarted)
                        UndoRedoService.StartTransaction(GResources.GetResourceText(29450048)); //RC 29450048 : změna textu
                    Text.Text = (EditControl as LtbControl).Text;
                    //SetHeightByContent();
                    Line.RecalcHeight(Parent as IGRRCell);
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
        public bool RemoveEditControl(bool validate) { return false; }
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
                    knownTags = AddInTree.BuildItem("/ReportDesigner/GrrList/TextTags", null) as List<string>;
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
