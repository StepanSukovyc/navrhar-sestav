//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GrfContentDrawing.cs                   </Name>
//    <Description> objekt prezentující vektorovou grafiku                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-05-23                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Xml;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.Editor;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.WinClient.Utils;
using Gordic.Report.Implementation;

namespace Gordic.GFE.WinClient.GrfEditor
{
    /// <summary>
    /// objekt prezentující vektorovou grafiku
    /// </summary>
    class GrfContentDrawing : AbstractContent, IDrawing
    {
        /// <summary>
        /// uvolnění objektu
        /// </summary>
        /// <param name="disposing">indikuje uvolnění objektu</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
                C_clear();

            base.Dispose(disposing);
        }

        #region AbstractContent
        /// <summary>
        /// Načtení informaci o objektu z formátu daného objektu
        /// </summary>
        public override void LoadInformation()
        {
            ComponentType = Gordic.GFE.Parsers.ComponentType.drawing;
            // pokud položka není obrázkem, pak není co řešit
            if (FormatTag is GFEFormatContentImage
                || FormatTag is GFEFormatContentDrawing)
            {
                base.LoadInformation();
                CommonService.ApplayStyle(this, this.AttrList);
            }
            else if (FormatTag != null && FormatTag.TagName.Equals("drawing", StringComparison.InvariantCultureIgnoreCase))
                CommonService.ApplayStyle(this, this.AttrList);
            else return;
        }

        BitmapWrap _cache;
        private void C_clear() { if (_cache != null) { _cache.Dispose(); _cache = null; } }

        /// <eclude/>
        public override void OnPaint(Graphics graphics, PaintArgs args)
        {
            if (!graphics.VisibleClipBounds.IntersectsWith(BoundsInPixels))
                return;

            base.OnPaint(graphics, args);

            Region reg = graphics.Clip;
            graphics.Clip = new Region(RectangleF.Intersect(new RectangleF(LeftZoom - 1, TopZoom - 1, WidthZoom + 2, HeightZoom + 2), graphics.VisibleClipBounds));
            DrawClear(graphics);

            RectangleF rect = ContentBounds;

            try
            {
                int w = (int)(rect.Width + 0.5F), h = (int)(rect.Height + 0.5F);
                if (_cache != null)
                    if (_cache.Bitmap.Width != w || _cache.Bitmap.Height != h) C_clear();
                if (_cache == null)
                    using (var help = new NativePaintHelper(this, (XmlElement)GetDataComponent(new XmlDocumentPosition())))
                    {
                        _cache = Gordic.Report.Implementation.Charting.CreateDrawing(w, h, help.Attributes, help);
                        //using (var i = Gordic.Report.Implementation.Charting.CreateDrawing(w, h, help.Attributes, help))
                        //    graphics.DrawImageUnscaled(i, Rectangle.Truncate(rect));
                    }
                //graphics.DrawImageUnscaled(_cache, Rectangle.Truncate(rect));
                graphics.DrawImage(_cache, rect.Location); //subpixel pozice -> jinak je to nekdy o 1px posunute a vypada to spatne

            }
            catch (Exception ex) { LoggingService.Error(ex.Message, ex); }
            graphics.Clip = reg;

            if (Page != null)
                Page.DelayPaintList.Add(new DelayPaintItem(this, IsSelected, reg));
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
            XmlElement xmlNode = xmlDoc.CreateElement("drawing", string.IsNullOrEmpty(namespaceUri) ? ReportDesignerProperties.Instance.AlfReportXmlns : namespaceUri);

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
                    // uložení informaci o stránce, na které se nachází daný objekt
                    xmlNode.SetAttribute("page", Convert.ToString(Page.Order));
            }

            if (Fill != null)
                xmlNode.SetAttribute("fill", Fill.Name);
            if (!string.IsNullOrEmpty(Shape))
                xmlNode.SetAttribute("shape", Shape);
            else
                xmlNode.SetAttribute("shape", "square");
            if (Gap != -1)
                xmlNode.SetAttribute("gap", Convert.ToString(Gap));

            if (Angle != -1)
                if (Angle <= 360)
                    xmlNode.SetAttribute("angle", Convert.ToString(Angle));
                else
                    xmlNode.SetAttribute("angle", Convert.ToString(360));
            if (Edge != null && Edge.Color != Color.Transparent)
                xmlNode.SetAttribute("edge", Edge.Name);

            if (!string.IsNullOrEmpty(LabelText))
                xmlNode.SetAttribute("labeltext", CharacterEncodings.GetHexCodeText(LabelText));

            //uložení skriptů
            XmlDocumentService.SetListOfDictionaryItems(xmlNode, Scripts, styles);
            // uložíme neznámé značky
            XmlDocumentService.SetListOfDictionaryItems(xmlNode, Unknowns, styles);

            return xmlNode;
        }
        #endregion

        #region IDrawing
        UndoRedo<int> angle;
        /// <summary>
        /// TODO
        /// </summary>
        [Category("Vektorová grafika")]
        [DisplayName("úhel")]
        [Description("TODO")]
        public int Angle { get { return angle.Value; } set { angle.Value = value; C_clear(); } }

        UndoRedo<IComplexColor> edge;
        /// <summary>
        /// TODO
        /// </summary>
        [Category("Vektorová grafika")]
        [DisplayName("barva okrajů")]
        [Description("TODO")]
        [TypeConverter(typeof(ComplexColorConverter))]
        public IComplexColor Edge { get { return edge.Value; } set { edge.Value = value; C_clear(); } }

        UndoRedo<string> shape;
        /// <summary>
        /// TODO
        /// </summary>
        [Category("Vektorová grafika")]
        [DisplayName("tvar")]
        [Description("TODO")]
        public string Shape { get { return shape.Value; } set { shape.Value = value; C_clear(); } }
        UndoRedo<IComplexColor> fill;
        /// <summary>
        /// TODO
        /// </summary>
        [Category("Vektorová grafika")]
        [DisplayName("barva výplně")]
        [Description("Barva výplně objektu")]
        [TypeConverter(typeof(ComplexColorConverter))]
        public IComplexColor Fill { get { return fill.Value; } set { fill.Value = value; C_clear(); } }

        UndoRedo<SizeValue> gapSize;
        UndoRedo<int> gap;
        /// <summary>
        /// TODO
        /// </summary>
        [Category("Vektorová grafika")]
        [DisplayName("velikost mezery")]
        [Description("TODO")]
        public int Gap { get { return gap.Value; } set { gap.Value = value; gapSize.Value = new SizeValue(Convert.ToString(gap.Value) + "tw"); C_clear(); } }
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
                    knownTags = AddInTree.BuildItem("/ReportDesigner/GrfList/DrawingTags", null) as List<string>;
                return knownTags;
            }
        }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        public override AbstractContent Initialize()
        {
            base.Initialize();
            _cache = null;
            knownTags = null;
            gap = new UndoRedo<int>();
            gapSize = new UndoRedo<SizeValue>();
            fill = new UndoRedo<IComplexColor>();
            shape = new UndoRedo<string>();
            edge = new UndoRedo<IComplexColor>();
            angle = new UndoRedo<int>();
            ComponentType = ComponentType.drawing;
            return this;
        }

        /// <summary>
        /// inicializace objektu dle dostupných informaci
        /// </summary>
        /// <param name="node">Položka bočního panelu s informaci o vkládaném objektu</param>
        public override AbstractContent Initialize(SideTabItem node)
        {
            base.Initialize(node);
            BackColor = new URComplexColor().Initialize(Color.Transparent);
            Gap = 0;
            Angle = 0;
            Edge = new URComplexColor().Initialize();
            Fill = new URComplexColor().Initialize();
            return this;
        }

    }
}
