//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GrrContentUnknown.cs                   </Name>
//    <Description> objekt prezentující neznámý TAG                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-05-17                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Drawing.Design;
using System.Xml;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.WinClient.Utils;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// objekt prezentující neznámý TAG
    /// </summary>
    class GrrContentUnknown : AbstractContentLineable, IXMLContent
    {
        #region AbstractTextContentLineable
        /// <summary>
        /// nastavení výšky dle obsahu
        /// </summary>
        public override void SetHeightByContent()
        {
            SizeF textSize = new SizeF();
            if (DisplayText != null && DisplayText.TextFont != null && DisplayText.TextFont.Font != null && ComputeGraphics != null)
                textSize = ComputeGraphics.MeasureString("W", DisplayText.TextFont.Font, (int)(Width - Padding.LeftPixels - Padding.RightPixels - Surround.Width.LeftPixels - Surround.Width.RightPixels));

            Height = new Parsers.Utils.SizeValue(textSize.Height + Padding.TopPixels + Padding.BottomPixels, Height.Metrics);
            //Height = new Parsers.Utils.SizeValue(textSize.Height + Padding.TopPixels + Padding.BottomPixels);
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

            if (Scripts != null && !Scripts.IsEmpty)
                TagService.DrawTagTriangle(graphics, new PointF(LeftZoom, TopZoom));

            if (DisplayText != null)
            {
                DrawClear(graphics);
                DisplayText.Paint(graphics, BoundsInPixels, Padding, GraphicSettingService.Zoom);
            }

            graphics.Clip = reg;
            if (Page != null)
                Page.DelayPaintList.Add(new DelayPaintItem(this, IsSelected, reg));
        }

        /// <exclude/>
        protected override void DrawClear(Graphics graphics)
        {
            // gradientní kreslení štítkové zóny
            if (WidthZoom != 0 && HeightZoom != 0)
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
        /// Načtení informaci o objektu z formátu objektu
        /// </summary>
        public override void LoadInformation()
        {
            base.LoadInformation();

            TagName = FormatTag.TagName;

            //Pokud se nejedná o datovou položku pak není co řešit 
            if (!(FormatTag is GFEFormatUnknown) && !(FormatTag is GFEFormatUnknownContent))
                return;

            InnerText = FormatTag.GetInnerXml().Trim('\r', '\n', '\t');
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
            XmlElement xmlContent = xmlDoc.CreateElement(TagName, string.IsNullOrEmpty(namespaceUri) ? ReportDesignerProperties.Instance.AlfReportXmlns : namespaceUri);
            foreach (var item in AttrList)
                if (!string.IsNullOrEmpty(item.Key))
                    xmlContent.SetAttribute(item.Key, item.Value);

            if (!string.IsNullOrEmpty(InnerText))
                XmlDocumentService.SetInnerText(xmlDoc, xmlContent, CharacterEncodings.GetHexCodeText(InnerText));

            return xmlContent;
        }
        #endregion

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

        UndoRedo<URTagText> text;
        URTagText DisplayText { get => text.Value; set => text.Value = value; }

        UndoRedo<string> tagname;
        /// <summary>
        /// Název větve
        /// </summary>
        [Category("Datová položka"), ReadOnly(true)]
        [DisplayName("název větve")]
        [Description("Název větve v souboru sestavy")]
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
            tagname = new UndoRedo<string>();
            text = new UndoRedo<URTagText>();
            knownTags = null;
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

            if (clone is GrrContentUnknown)
                this.TagName = (clone as GrrContentUnknown).TagName;
        }
    }
}