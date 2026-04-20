//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.TagService.cs                            </Name>
//    <Description> Služba pro práci s objekty                                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-26                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Linq;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Utils;
using Gordic.General;

namespace Gordic.GFE.Parsers.Services
{
    /// <summary>
    /// Služba pro práci s objekty
    /// </summary>
    public static class TagService
    {
        /// <summary>
        /// Získání reálných hodnot na kreslení objektu
        /// </summary>
        /// <param name="zoom">Zoomovácí faktor</param>
        /// <param name="frame">šířka rámečku objektu</param>
        /// <param name="bounds">meze objektu</param>
        /// <returns>Oblast, potřebná pro kreslení objektu</returns>
        public static RectangleF GetRealDrawRectangle(float zoom, URComplexSurroundWidth frame, RectangleF bounds)
        {
            double lbw = frame.LeftPixels * zoom / 2,
                rbw = frame.RightPixels * zoom / 2,
                tbw = frame.TopPixels * zoom / 2,
                bbw = frame.BottomPixels * zoom / 2;

            return new RectangleF((float)(bounds.X - 1 + lbw)
                , (float)(bounds.Y - 1 + tbw)
                , (float)(bounds.Width + 2 - rbw)
                , (float)(bounds.Height + 2 - bbw));
        }

        /// <summary>
        /// Nalezení seznamu nadřazených regionů pro vytvoření obalu
        /// </summary>
        /// <param name="fullnames">Seznam všech úplných názvů objektů položených na stránky sestavy. Tento seznam se nahradí jiným!!!</param>
        public static void TruncNames(ref List<string> fullnames)
        {
            if (fullnames == null || fullnames.Count == 0)
                return;

            IEnumerable<string> names = fullnames.First(itm => !string.IsNullOrEmpty(itm)).Split('.');
            foreach (string item in fullnames)
                if (!string.IsNullOrEmpty(item))
                    names = names.Intersect(item.Split('.'));

            string joj = string.Join(".", names);
            while (fullnames.Count != 1 && fullnames.Exists(itm => itm == joj))
            {
                fullnames = fullnames.FindAll(itm => itm != joj);
                names = fullnames.First(itm => !string.IsNullOrEmpty(itm)).Split('.');
                foreach (string item in fullnames)
                    if (!string.IsNullOrEmpty(item))
                        names = names.Intersect(item.Split('.'));
                joj = string.Join(".", names);
            }

            fullnames = names.ToList();
        }

        /// <summary>
        /// Kreslení objektu
        /// </summary>
        /// <param name="obj">Objekt pro kreslení</param>
        /// <param name="parameters">Parametry potřebné ke kreslení objektu</param>
        public static void PaintTag(IPaintable obj, params object[] parameters)
        {
            // pokud je nedostatek argumentů, pak není co řešit
            if (parameters.Length < 2 || obj == null)
                return;

            var g = (Graphics)parameters[0];
            var pa = (PaintArgs)parameters[1];
            obj.OnPaint(g, pa.OnChildPaint(obj));
        }

        /// <summary>
        /// Kreslení objektu
        /// </summary>
        /// <param name="obj">Objekt pro kreslení</param>
        /// <param name="parameters">Parametry potřebné ke kreslení objektu</param>
        public static void PaintTag(object obj, params object[] parameters)
        {
            PaintTag(obj as IPaintable, parameters);
        }

        /// <summary>
        /// Nastavení velikosti objektu dle atributu RECT 
        /// </summary>
        /// <param name="sizeable">objekt, implementujíc rozhraní ISizeable</param>
        /// <param name="item">formátovácí objekt, dle kterého se nastavuje velikost objektu <paramref name="sizeable"/>.</param>
        public static void SetRectByTag(ISizable sizeable, GFEFormatTag item)
        {
            var rect = item.GrfRect;
            if (rect.IsEmpty == false)
            {
                sizeable.Left = UnitConverter.ConvertFromTwips((float)rect.Left);
                sizeable.Top = UnitConverter.ConvertFromTwips((float)rect.Top);
                sizeable.Height = UnitConverter.ConvertFromTwips((float)rect.Height);
                sizeable.Width = UnitConverter.ConvertFromTwips((float)rect.Width);
            }
            else if (item.Attributes.ContainsKey("rect"))
                SetRectByAttribute(sizeable, item.Attributes["rect"]);
            else if (item.Attributes.ContainsKey("width"))
                sizeable.Width = new SizeValue(item.Attributes["width"]);
            else if (item.Attributes.ContainsKey("height"))
                sizeable.Height = new SizeValue(item.Attributes["height"]);
        }

        /// <summary>
        /// Nastavení hodnot objektu dle atributu
        /// </summary>
        /// <param name="sizeable">Objekt implementující rozhraní ISizable</param>
        /// <param name="attribute">Atribut RECT</param>
        public static void SetRectByAttribute(ISizable sizeable, string attribute)
        {
            string[] rect = string.IsNullOrEmpty(attribute) ? new string[] { } : attribute.Split(',');

            if (rect.Length != 4)
                rect = CommonService.DefaultRectValue.Split(',');

            SizeValue left = new SizeValue(rect[0]),
                top = new SizeValue(rect[1]),
                right = new SizeValue(rect[2]),
                bottom = new SizeValue(rect[3]);

            sizeable.Left = left;
            sizeable.Top = top;
            sizeable.Height = new SizeValue(bottom - top, string.Equals(bottom.Metrics, top.Metrics, StringComparison.InvariantCultureIgnoreCase) ? bottom.Metrics : "mm");
            sizeable.Width = new SizeValue(right - left, string.Equals(right.Metrics, left.Metrics, StringComparison.InvariantCultureIgnoreCase) ? right.Metrics : "mm");
        }

        /// <summary>
        /// Vykreslení řazení
        /// </summary>
        /// <param name="graphics">Kreslící nástroj</param>
        /// <param name="point">Pozice levého horního rohu</param>
        /// <param name="order">řazení</param>
        /// <param name="zoom">Koeficient zvětšení</param>
        /// <param name="col">barva kreslení</param>
        public static void DrawTagOrder(Graphics graphics, PointF point, string order, float zoom, string col = "green")
        {
            float _w = zoom > 1 ? (zoom * 20) : 20, _h = _w, _padding = zoom > 1 ? (zoom * 3) : 3, _fontsize = zoom > 1 ? (zoom * 8f) : 8f;
            using (SolidBrush drawBrush = new SolidBrush(ColorService.GetColor(col, Color.Green)))
            {
                graphics.FillEllipse(drawBrush, point.X, point.Y, _w, _h);
                graphics.DrawString(order, new Font(SystemFonts.CaptionFont.FontFamily, _fontsize), Brushes.White, new RectangleF(point.X + _padding, point.Y + _padding, _w, _h));
            }
        }

        /// <summary>
        /// Parsování rect dle atributu
        /// </summary>
        public static GrfRect RectByAttribute(string rectAttr, string pageAttr)
        {
            string[] rect = string.IsNullOrEmpty(rectAttr) ? new string[] { } : rectAttr.Split(',');

            if (rect.Length != 4)
                rect = CommonService.DefaultRectValue.Split(',');

            SizeValue left = new SizeValue(rect[0]),
                top = new SizeValue(rect[1]),
                right = new SizeValue(rect[2]),
                bottom = new SizeValue(rect[3]);

            var r = new GrfRect
            {
                rect = new Gordic.Report.Implementation.GrrRect()
                {
                    left = left.Twips,
                    top = top.Twips,
                    bottom = bottom.Twips,
                    right = right.Twips
                }
            };

            string[] page = pageAttr.Split('-');
            if (Int32.TryParse(page[0], out r.page1) == false)
                r.page1 = 1;

            if (!(page.Length > 1 && Int32.TryParse(page[1], out r.page2)))
                r.page2 = r.page1;

            return r;
        }

        /// <summary>
        /// Nastavení hodnot objektu dle atributu
        /// </summary>
        /// <param name="background">Objekt implementující rozhraní pozadí</param>
        /// <param name="attribute">Atribut s informací o pozadí objektu</param>
        public static void SetImageByAttribute(IBackground background, string attribute)
        {
            string[] args = attribute.Split(',');

            // pokud není uvedená cesta k obrázku v dočasné složce, pak není co řešit
            if (!string.IsNullOrEmpty(args[0]))
            {
                bool.TryParse(args[2], out bool stretch);
                bool.TryParse(args[3], out bool coated);

                background.BackImage = new BackgroundImage(ImageService.GetImage(args[0], false), (RotateType)Enum.Parse(typeof(RotateType), args[1])
                    , stretch, coated);
            }
        }
        /// <summary>
        /// Pokud objekt je ukotven, pak se celý zašrafuje
        /// </summary>
        /// <param name="graphics">Ovladač grafiky</param>
        /// <param name="rectangleF">velikost objektu</param>
        public static void DrawTagAnchor(Graphics graphics, RectangleF rectangleF)
        {
            using (HatchBrush hBrush = new HatchBrush(HatchStyle.ZigZag, Color.Silver, Color.Transparent))
                graphics.FillRectangle(hBrush, rectangleF);
        }

        /// <summary>
        /// Kreslení rámečku
        /// </summary>
        /// <param name="frame">rámeček</param>
        /// <param name="graphics">ovladač grafiky</param>
        /// <param name="pointF">pozice levého horního rohu</param>
        /// <param name="sizeF">velikost</param>
        /// <param name="zoom">faktor zvětšení</param>
        /// <param name="spacing">Odsazení rámečku</param>
        public static void DrawTagFrame(IComplexSurround frame, Graphics graphics, PointF pointF, SizeF sizeF, float zoom, IComplexFive spacing)
        {
            if (frame != null)
                frame.Paint(graphics, pointF, sizeF, zoom, spacing);
        }

        /// <summary>
        /// Vykreslení trojúhelníčku, indikujícího fakt, že daný objekt má skripty
        /// </summary>
        /// <param name="graphics">Kreslící nástroj</param>
        /// <param name="point">Pozice levého horního rohu</param>
        /// <param name="col">barva kreslení</param>
        public static void DrawTagTriangle(Graphics graphics, PointF point, string col = "red")
        {
            using (SolidBrush drawBrush = new SolidBrush(ColorService.GetColor(col, Color.Red)))
            {
                PointF[] pointF = new PointF[3];
                pointF[0] = new PointF(point.X, point.Y);
                pointF[1] = new PointF(point.X + 5, point.Y);
                pointF[2] = new PointF(point.X, point.Y + 5);
                graphics.FillPolygon(drawBrush, pointF);
            }
        }

        /// <summary>
        /// Vykreslení kruhu
        /// </summary>
        /// <param name="graphics">Kreslící nástroj</param>
        /// <param name="point">Pozice levého horního rohu</param>
        /// <param name="col">barva kreslení</param>
        /// <param name="width">šířka čtvrce</param>
        /// <param name="zoom">faktor zvětšení</param>
        public static void FillTagCube(Graphics graphics, PointF point, string col = "red", float width = 4.0f, float zoom = 1.0f)
        {
            using (SolidBrush drawBrush = new SolidBrush(ColorService.GetColor(col, Color.Red)))
            {
                PointF[] pointF = new PointF[4];
                pointF[0] = new PointF(point.X, point.Y);
                pointF[1] = new PointF(point.X + width * zoom, point.Y);
                pointF[2] = new PointF(point.X + width * zoom, point.Y + width * zoom);
                pointF[3] = new PointF(point.X, point.Y + width * zoom);
                graphics.FillPolygon(drawBrush, pointF);
            }
        }

        /// <summary>
        /// Nalezení nejvnořenějšího regionu v dokumentu
        /// </summary>
        /// <param name="document">Analyzovaný dokument</param>
        /// <param name="names">Nalezené názvy</param>
        public static void SetNamesByObjects(IFormationDocument document, ref List<string> names)
        {
            foreach (IPage page in document.Pages)
                foreach (ITagComponent item in page as URAbstractPage)
                    if (item is IDataItem subItem)
                    {
                        string dataFullName = string.Empty;

                        if (item is URAbstractContainer)
                        {
                            if ((item as URAbstractContainer).CanBeOptimized)
                                dataFullName = subItem.DataFullName;
                        }
                        else if (!string.IsNullOrEmpty(subItem.DataFullName)
                            /*&& !subItem.IsRootElement*/)
                            dataFullName = subItem.DataFullName.Contains('.')
                                ? subItem.DataFullName.Substring(0, subItem.DataFullName.LastIndexOf('.'))
                                : subItem.DataFullName;
                        // musí být za subItem.DataFullName jelikož se v této vlastnosti aktualizuje stav IsRootElement
                        else if (subItem.IsRootElement)
                            dataFullName = string.Empty;
                        if (!string.IsNullOrEmpty(dataFullName) && !names.Contains(dataFullName))
                            names.Add(dataFullName);
                    }
        }

        /// <summary>
        /// Získání rámečku pro daný objekt
        /// </summary>
        /// <param name="component">Daný objekt, pro který se získává rámeček</param>
        /// <returns>řetězec popisující pozici a velikost objektu</returns>
        public static string GetRect(ITagComponent component)
        {
            SizeValue l = new SizeValue(component.Left, component.Left.Metrics),
                t = new SizeValue(component.Top, component.Top.Metrics),
                w = new SizeValue(l + component.Width, component.Width.Metrics),
                h = new SizeValue(t + component.Height, component.Height.Metrics);

            if (l != 0 || t != 0 || w != 0 || h != 0)
                return string.Format("{0},{1},{2},{3}", l.MathRoundValue(2), t.MathRoundValue(2),
                    w.MathRoundValue(2), h.MathRoundValue(2));

            return string.Empty;
        }

        /// <summary>
        /// nastavení velikosti dle atributů
        /// </summary>
        /// <param name="content">objekt pro nastavení velikosti</param>
        /// <param name="attributes">list atributů</param>
        public static void SetHeightByAttribute(ISizable content, object attributes)
        {
            if (content == null || attributes == null)
            {
                LoggingService.Error(GResources.GetResourceText(29450452)); //RC 29450452 : velikost nelze nastavit - chybí potřebné informace!
                return;
            }

            if (attributes is GFEList list)
            {
                if (list.ContainsKey("height"))
                {
                    content.Height = new SizeValue(list["height"]);
                    if (string.IsNullOrEmpty(content.Height.Metrics))
                        content.Height = new SizeValue(content.Height, "mm");
                }
                return;
            }
            if (attributes is System.Xml.XmlAttributeCollection collection)
            {
                if (collection.GetNamedItem("height") != null)
                {
                    content.Height = new SizeValue(collection["height"]);
                    if (string.IsNullOrEmpty(content.Height.Metrics))
                        content.Height = new SizeValue(content.Height, "mm");
                }
                return;
            }
        }

        /// <summary>
        /// Nastavení názvu dle regionu
        /// </summary>
        /// <param name="rootRegion">Hlavní region sestavy</param>
        /// <param name="document">Analyzovaný dokument sestavy</param>
        /// <param name="names">Nalezené názvy</param>
        public static void SetNamesByRegion(string rootRegion, IFormationDocument document, ref List<string> names)
        {
            if (!string.IsNullOrEmpty(rootRegion))
                names.Add(rootRegion);
            else
                foreach (IPage page in document.Pages)
                {
                    foreach (ITagComponent item in page as URAbstractPage)
                        if (item is IDataItem)
                        {
                            string dataFullName = string.Empty;
                            if (item is URAbstractContainer)
                                dataFullName = (item as IDataItem).DataName;
                            if (!string.IsNullOrEmpty(dataFullName))
                            {
                                names.Add(dataFullName);
                                break;
                            }
                        }
                    if (names.Count != 0)
                        break;
                }
        }

        /// <summary>
        /// nastavení velikosti dle atributů
        /// </summary>
        /// <param name="content">objekt pro nastavení velikosti</param>
        /// <param name="attributes">list atributů</param>
        public static void SetWidthByAttribute(ISizable content, object attributes)
        {
            if (content == null || attributes == null)
            {
                LoggingService.Error(GResources.GetResourceText(29450452)); //RC 29450452 : velikost nelze nastavit - chybí potřebné informace!
                return;
            }

            if (attributes is GFEList list)
            {
                if (list.ContainsKey("width"))
                    content.Width = new SizeValue(list["width"]);
                return;
            }
            if (attributes is System.Xml.XmlAttributeCollection collection)
            {
                if (collection.GetNamedItem("width") != null)
                    content.Width = new SizeValue(collection["width"].Value);

                return;
            }
        }

        /// <summary>
        /// Získání výšky dle obsahu
        /// </summary>
        /// <returns>Výška dle obsahu</returns>
        public static SizeValue GetHeightByContent(Graphics graphics, Font font, int width, bool multiline, string text, float diffHeight = 0, string metrics = null)
        {
            SizeF textSize = new SizeF();

            if (font != null && graphics != null)
            {
                if (multiline)
                {
                    if (string.IsNullOrEmpty(text))
                        textSize = graphics.MeasureString("t", font);
                    else if (width != 0)
                        textSize = graphics.MeasureString(text, font, width);
                    else
                        textSize = graphics.MeasureString("I", font);
                }
                else
                    textSize = graphics.MeasureString("I", font);
            }

            //MAL testovani vysek radku/fontu
            //var height1 = font.SizeInPoints * (font.FontFamily.GetCellAscent(font.Style) + font.FontFamily.GetCellDescent(font.Style)) / font.FontFamily.GetEmHeight(font.Style) * graphics.DpiY / 72;
            //var height2 = font.SizeInPoints * font.FontFamily.GetLineSpacing(font.Style) / font.FontFamily.GetEmHeight(font.Style) * graphics.DpiY / 72;
            //var height3 = font.GetHeight(graphics.DpiY);
            //var textSize2 = graphics.MeasureString("t", font, 999, StringFormat.GenericTypographic);

            return !string.IsNullOrEmpty(metrics) ? new SizeValue(textSize.Height + diffHeight, metrics) : new SizeValue(textSize.Height + diffHeight, "mm");
        }
        /// <summary>
        /// Získání výšky dle obsahu
        /// </summary>
        /// <returns>Výška dle obsahu</returns>
        public static SizeValue GetHeightByContent(Graphics graphics, Font font, string text, float diffHeight = 0, string metrics = null)
        {
            SizeF textSize = new SizeF();

            if (font != null && graphics != null)
                textSize = graphics.MeasureString(text, font);

            return !string.IsNullOrEmpty(metrics) ? new SizeValue(textSize.Height + diffHeight, metrics) : new SizeValue(textSize.Height + diffHeight, "mm");
        }
        /// <summary>
        /// načtení atributu z <paramref name="newAttributes"/> a <paramref name="actualAttributes"/> do seznamu <paramref name="attributes"/>
        /// </summary>
        /// <param name="attributes">výstupní seznam atributů</param>
        /// <param name="newAttributes">attributy větve</param>
        /// <param name="actualAttributes">aktuální atributy</param>
        public static void LoadAttributes(GFEAttrList attributes, GFEList newAttributes, object actualAttributes)
        {
            if (actualAttributes is GFEList)
                foreach (var item in (actualAttributes as GFEList))
                    if (attributes.ContainsKey(item.Key))
                    {
                        attributes.Remove(item.Key);
                        attributes.Add(item.Key, item.Value);
                    }
                    else attributes.Add(item.Key, item.Value);
            else if (actualAttributes is GFEList)
                foreach (var item in (actualAttributes as GFEList))
                    if (attributes.ContainsKey(item.Key))
                    {
                        attributes.Remove(item.Key);
                        attributes.Add(item.Key, item.Value);
                    }
                    else attributes.Add(item.Key, item.Value);

            foreach (var item in newAttributes)
                if (attributes.ContainsKey(item.Key))
                {
                    attributes.Remove(item.Key);
                    attributes.Add(item.Key, item.Value);
                }
                else attributes.Add(item.Key, item.Value);
        }
    }
}
