//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ComplexSurround.cs                          </Name>
//    <Description> Třída popisující rámeček komponent                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Drawing.Design;
using System.Linq;
using System.Xml.Serialization;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.General;
using System.Drawing.Drawing2D;


namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// seznam úhlů ke kreslení
    /// </summary>
    [TypeConverter(typeof(ComplexSurroundCornersConverter))]
    public enum ComplexSurroundCorners
    {
        /// <summary>
        /// žádný
        /// </summary>
        None = 0,
        /// <summary>
        /// levý horní
        /// </summary>
        TopLeft = 1,
        /// <summary>
        /// pravý horní
        /// </summary>
        TopRight = 2,
        /// <summary>
        /// levý dolní
        /// </summary>
        BottomLeft = 4,
        /// <summary>
        /// pravý dolní
        /// </summary>
        BottomRight = 8,
        /// <summary>
        /// všechny
        /// </summary>
        All = TopLeft | TopRight | BottomLeft | BottomRight
    }

    /// <summary>
    /// rozhraní rámečku
    /// </summary>
    public interface IComplexSurround
    {
        /// <summary>
        /// Indikuje, že rámeček se kreslí uvnitř objektu
        /// </summary>
        bool InsideBorder { get; set; }
        /// <summary>
        /// Poloměr zaoblení
        /// </summary>
        int Radius { get; set; }
        /// <summary>
        /// indikuje, které rohy sa mají dle radiusu vykreslovat
        /// </summary>
        ComplexSurroundCorners Corners { get; set; }

        /// <summary>
        /// Barvy
        /// </summary>
        IComplexFiveColor FrameColor { get; set; }
        /// <summary>
        /// styl všech rámečků
        /// </summary>
        IComplexFiveDashStyle DashStyle { get; set; }
        /// <summary>
        /// Šířka
        /// </summary>
        IComplexFive Width { get; set; }
        /// <summary>
        /// Hodnota zvětšení
        /// </summary>
        float Zoom { get; set; }
        /// <summary>
        /// Zobrazí i když není žádná šířka
        /// </summary>
        bool VisibleAlways { get; set; }
        /// <summary>
        /// kreslení
        /// </summary>
        /// <param name="graphics"></param>
        /// <param name="location"></param>
        /// <param name="size"></param>
        /// <param name="spacing"></param>
        void Paint(Graphics graphics, PointF location, SizeF size, IComplexFive spacing);
        /// <summary>
        /// kreslení
        /// </summary>
        /// <param name="graphics"></param>
        /// <param name="location"></param>
        /// <param name="size"></param>
        /// <param name="zoomFactor"></param>
        /// <param name="spacing"></param>
        void Paint(Graphics graphics, PointF location, SizeF size, float zoomFactor, IComplexFive spacing);
        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <returns></returns>
        IComplexSurround Initialize();
        /// <summary>
        /// Inicializace objektu dle parametru
        /// </summary>
        /// <param name="dashStyle"></param>
        /// <param name="sizeValue"></param>
        /// <param name="insideBorder"></param>
        /// <param name="color"></param>
        /// <returns></returns>
        IComplexSurround Initialize(string dashStyle, string sizeValue, bool insideBorder, Color color);
        /// <summary>
        /// inicializace objketu
        /// </summary>
        /// <param name="surround"></param>
        /// <returns></returns>
        IComplexSurround Initialize(IComplexSurround surround);
        /// <summary>
        /// inicializace objketu
        /// </summary>
        /// <param name="style"></param>
        /// <returns></returns>
        IComplexSurround Initialize(GFEFormatStyle style);
        /// <summary>
        /// Inicializace objektu
        /// </summary>
        /// <param name="left"></param>
        /// <param name="top"></param>
        /// <param name="right"></param>
        /// <param name="bottom"></param>
        /// <param name="corners"></param>
        /// <param name="radius"></param>
        /// <param name="insideBorder"></param>
        /// <returns></returns>
        IComplexSurround Initialize(GFEBorder left, GFEBorder top, GFEBorder right, GFEBorder bottom, ComplexSurroundCorners corners, int radius, bool insideBorder);
    }

    /// <summary>
    /// Třída popisující rámeček komponent
    /// </summary>
    [Serializable]
    [XmlRoot("Frame")]
    public class ComplexSurround : IComplexSurround
    {
        /// <summary>
        /// způsob umístění rámečků v buňce
        /// </summary>
        [XmlAttribute("InsideBorder")]
        [DisplayName("uvnitř")]
        [Description("Indikuje, že rámeček se kreslí uvnitř objektu")]
        public virtual bool InsideBorder { get; set; }
        /// <summary>
        /// poloměr zaoblení
        /// </summary>
        [XmlAttribute("Radius")]
        [DisplayName("poloměr zaoblení")]
        [Description("Poloměr zaoblení rohů rámečku")]
        public virtual int Radius { get; set; }
        /// <summary>
        /// indikuje, které rohy sa mají dle poloměru vykreslovat
        /// </summary>
        [XmlAttribute("Corners")]
        [DisplayName("rohy")]
        [Description("Indikuje, které rohy rámečku sa mají dle poloměru vykreslovat")]
        public virtual ComplexSurroundCorners Corners { get; set; }

        /// <summary>
        /// Barvy
        /// </summary>
        [XmlElement("Colors")]
        [DisplayName("barvy")]
        public virtual IComplexFiveColor FrameColor { get; set; }

        /// <summary>
        /// styl všech rámečků
        /// </summary>
        [XmlElement("DashStyle")]
        [DisplayName("styly")]
        public virtual IComplexFiveDashStyle DashStyle { get; set; }

        /// <summary>
        /// Šířka
        /// </summary>
        [XmlElement("Width")]
        [DisplayName("šířky")]
        public virtual IComplexFive Width { get; set; }

        /// <summary>
        /// Hodnota zvětšení
        /// </summary>
        [Browsable(false)]
        public float Zoom { get; set; }

        /// <summary>
        /// Zobrazí i když není žádná šířka
        /// </summary>
        [Browsable(false)]
        public bool VisibleAlways { get; set; }

        /// <summary>
        /// Prázdný konstruktér třídy
        /// </summary>
        public ComplexSurround() { }

        /// <summary>
        /// indikuje vytvoření konstrukteru všech objektů
        /// </summary>
        protected bool isConstruct;
        /// <summary>
        /// volání konstruktorů všech objektů
        /// </summary>
        protected virtual void Construct()
        {
            if (!isConstruct)
            {
                Width = new ComplexSurroundWidth();
                FrameColor = new ComplexFiveColor();
                DashStyle = new ComplexFiveDashStyle();
                Radius = 0;
                InsideBorder = false;
                Corners = ComplexSurroundCorners.None;
            }
            isConstruct = true;
        }

        /// <summary>
        /// inicializace objketu
        /// </summary>
        /// <param name="style"></param>
        /// <returns></returns>
        public virtual IComplexSurround Initialize(GFEFormatStyle style)
        {
            Construct();

            if (style != null)
            {
                // nastav přes SetValue
                Width.Initialize(string.Empty);
                Width.LeftValue = style.LeftBorder.Width == 0 ? string.Empty : (style.LeftBorder.Width + Convert.ToString(style.LeftBorder.WidthMetrics));
                Width.RightValue = style.RightBorder.Width == 0 ? string.Empty : (style.RightBorder.Width + Convert.ToString(style.RightBorder.WidthMetrics));
                Width.TopValue = style.TopBorder.Width == 0 ? string.Empty : (style.TopBorder.Width + Convert.ToString(style.TopBorder.WidthMetrics));
                Width.BottomValue = style.BottomBorder.Width == 0 ? string.Empty : (style.BottomBorder.Width + Convert.ToString(style.BottomBorder.WidthMetrics));

                FrameColor.Initialize();
                if (style.LeftBorder.Color.Color.Name == "0")
                    FrameColor.LeftValue.Initialize(ColorService.ComplexBlack);
                else
                    FrameColor.LeftValue.Initialize(style.LeftBorder.Color.Color);
                if (style.RightBorder.Color.Color.Name == "0")
                    FrameColor.RightValue.Initialize(ColorService.ComplexBlack);
                else
                    FrameColor.RightValue.Initialize(style.RightBorder.Color.Color);
                if (style.TopBorder.Color.Color.Name == "0")
                    FrameColor.TopValue.Initialize(ColorService.ComplexBlack);
                else
                    FrameColor.TopValue.Initialize(style.TopBorder.Color.Color);
                if (style.BottomBorder.Color.Color.Name == "0")
                    FrameColor.BottomValue.Initialize(ColorService.ComplexBlack);
                else
                    FrameColor.BottomValue.Initialize(style.BottomBorder.Color.Color);

                DashStyle.Initialize(ComplexDashStyle.Solid);
                DashStyle.LeftValue = ComplexDashStyle.Parse(style.LeftBorder.Style);
                DashStyle.TopValue = ComplexDashStyle.Parse(style.TopBorder.Style);
                DashStyle.RightValue = ComplexDashStyle.Parse(style.RightBorder.Style);
                DashStyle.BottomValue = ComplexDashStyle.Parse(style.BottomBorder.Style);
            }
            else
                Initialize();
            return this;
        }

        public virtual IComplexSurround Initialize()
        {
            Construct();

            DashStyle.Initialize(ComplexDashStyle.Solid);
            Width.Initialize(string.Empty);
            Width.SetValue(0, Report.Implementation.Grr06Metrics.Unspec, 1);
            Width.SetValue(0, Report.Implementation.Grr06Metrics.Unspec, 2);
            Width.SetValue(0, Report.Implementation.Grr06Metrics.Unspec, 3);
            Width.SetValue(0, Report.Implementation.Grr06Metrics.Unspec, 4);

            FrameColor.Initialize();

            return this;
        }

        /// <summary>
        /// Inicializace objektu dle parametru
        /// </summary>
        /// <param name="dashStyle"></param>
        /// <param name="sizeValue"></param>
        /// <param name="insideBorder"></param>
        /// <param name="color"></param>
        /// <returns></returns>
        public virtual IComplexSurround Initialize(string dashStyle, string sizeValue, bool insideBorder, Color color)
        {
            Construct();
            DashStyle.Initialize(dashStyle);
            Width.Initialize(sizeValue);
            InsideBorder = insideBorder;
            FrameColor.Initialize(color);
            return this;
        }

        /// <exclude/>
        public virtual IComplexSurround Initialize(IComplexSurround surround)
        {
            Construct();

            if (surround != null)
            {
                Width.Initialize(surround.Width);
                FrameColor.Initialize(surround.FrameColor);
                DashStyle.Initialize(surround.DashStyle);
                InsideBorder = surround.InsideBorder;
                Radius = surround.Radius;
                Corners = surround.Corners;
            }
            else
                Initialize();

            return this;
        }

        /// <summary>
        /// Inicializace objektu
        /// </summary>
        /// <param name="left"></param>
        /// <param name="top"></param>
        /// <param name="right"></param>
        /// <param name="bottom"></param>
        /// <param name="corners"></param>
        /// <param name="radius"></param>
        /// <param name="insideBorder"></param>
        /// <returns></returns>
        public virtual IComplexSurround Initialize(GFEBorder left, GFEBorder top, GFEBorder right, GFEBorder bottom, ComplexSurroundCorners corners, int radius, bool insideBorder)
        {
            Construct();

            Width.Initialize(string.Empty);
            Width.LeftValue = left.Width == 0 ? string.Empty : (left.Width + Convert.ToString(left.WidthMetrics));
            Width.RightValue = right.Width == 0 ? string.Empty : (right.Width + Convert.ToString(right.WidthMetrics));
            Width.TopValue = top.Width == 0 ? string.Empty : (top.Width + Convert.ToString(top.WidthMetrics));
            Width.BottomValue = bottom.Width == 0 ? string.Empty : (bottom.Width + Convert.ToString(bottom.WidthMetrics));

            FrameColor.Initialize();
            if (left.Color.Color.Name == "0")
                FrameColor.LeftValue.Initialize(ColorService.ComplexBlack);
            else
                FrameColor.LeftValue.Initialize(left.Color.Color);
            if (right.Color.Color.Name == "0")
                FrameColor.RightValue.Initialize(ColorService.ComplexBlack);
            else
                FrameColor.RightValue.Initialize(right.Color.Color);
            if (top.Color.Color.Name == "0")
                FrameColor.TopValue.Initialize(ColorService.ComplexBlack);
            else
                FrameColor.TopValue.Initialize(top.Color.Color);
            if (bottom.Color.Color.Name == "0")
                FrameColor.BottomValue.Initialize(ColorService.ComplexBlack);
            else
                FrameColor.BottomValue.Initialize(bottom.Color.Color);

            DashStyle.Initialize(ComplexDashStyle.Solid);
            DashStyle.LeftValue = ComplexDashStyle.Parse(left.Style);
            DashStyle.TopValue = ComplexDashStyle.Parse(top.Style);
            DashStyle.RightValue = ComplexDashStyle.Parse(right.Style);
            DashStyle.BottomValue = ComplexDashStyle.Parse(bottom.Style);

            Radius = radius;
            InsideBorder = insideBorder;
            Corners = corners;

            return this;
        }

        /// <summary>
        /// Přetížení porovnaní dvou komponent 
        /// </summary>
        /// <param name="obj">Komponenta, s kterou se porovnává daná</param>
        /// <returns>Pokud jsou stejné pak se vrací TRUE jinak FALSE</returns>
        public override bool Equals(object obj)
        {
            if (!(obj is IComplexSurround))
                return base.Equals(obj);

            return Equals(obj as IComplexSurround);
        }

        /// <summary>
        /// Přetížení
        /// </summary>
        /// <returns></returns>
        public override int GetHashCode() { return base.GetHashCode(); }

        /// <exclude/>
        public override string ToString() => string.Format(GResources.GetResourceText(29450366) + ":{0};" + GResources.GetResourceText(29450367) + ":{1};" + GResources.GetResourceText(29450368) + ":{2};" + GResources.GetResourceText(29450369) + ":{3}", InsideBorder, FrameColor.AllValue, DashStyle.AllValue, Width.AllValue); //RC 29450369 : šířka        

        /// <summary>
        /// Kreslení ohraničení se zoom faktorem
        /// </summary>
        /// <param name="graphics">Ovladač grafiky</param>
        /// <param name="zoomFactor">Zoom faktor</param>
        /// <param name="location">Pozice levého horního rohu</param>
        /// <param name="size">Velikost objektu</param>
        /// <param name="spacing">Odsazení rámečku</param>
        public void Paint(Graphics graphics, PointF location, SizeF size, float zoomFactor, IComplexFive spacing)
        {
            Zoom = zoomFactor;
            Paint(graphics, location, size, spacing);
        }

        /// <summary>
        /// Kreslení ohraničení
        /// </summary>
        /// <param name="graphics">Ovladac grafiky</param>
        /// <param name="location">Levy horni roh kde se ma zacit vykreslova text</param>
        /// <param name="size">Velikost mista do ktereho se ma nakreslit objekt</param>
        /// <param name="spacing">Odsazení rámečku</param>
        public void Paint(Graphics graphics, PointF location, SizeF size, IComplexFive spacing)
        {
            DrawLeftSide(graphics, Width.LeftPixels * Zoom, spacing.LeftPixels * Zoom, spacing.TopPixels * Zoom, spacing.BottomPixels * Zoom, location, size);
            DrawTopSide(graphics, Width.TopPixels * Zoom, spacing.LeftPixels * Zoom, spacing.TopPixels * Zoom, spacing.RightPixels * Zoom, location, size);
            DrawRightSide(graphics, Width.RightPixels * Zoom, spacing.TopPixels * Zoom, spacing.RightPixels * Zoom, spacing.BottomPixels * Zoom, location, size);
            DrawBottomSide(graphics, Width.BottomPixels * Zoom, spacing.LeftPixels * Zoom, spacing.RightPixels * Zoom, spacing.BottomPixels * Zoom, location, size);
        }

        /// <summary>
        /// Kreslení ohraničení
        /// </summary>
        /// <param name="graphics">Ovladac grafiky</param>
        /// <param name="location">Levy horni roh kde se ma zacit vykreslova text</param>
        /// <param name="size">Velikost mista do ktereho se ma nakreslit objekt</param>
        /// <param name="spacing">Odsazení rámečku</param>
        public void PaintOld(Graphics graphics, PointF location, SizeF size, IComplexFive spacing)
        {
            float wTopPixels = Width.TopPixels * Zoom,
                wLeftPixels = Width.LeftPixels * Zoom,
                wRightPixels = Width.RightPixels * Zoom,
                wBottomPixels = Width.BottomPixels * Zoom,
                sTopPixels = spacing.TopPixels * Zoom,
                sLeftPixels = spacing.LeftPixels * Zoom,
                sRightPixels = spacing.RightPixels * Zoom,
                sBottomPixels = spacing.BottomPixels * Zoom;
            GraphicsPath path = null;
            if (wTopPixels != 0 && wTopPixels == wLeftPixels && wTopPixels == wBottomPixels && wTopPixels == wRightPixels
                && ComplexDashStyle.Parse(DashStyle.AllValue) != ComplexDashStyle.Unspec)
            {
                using (SolidBrush drawBrush = new SolidBrush(System.Drawing.Color.FromArgb(FrameColor.TopValue.Color.A, FrameColor.TopValue.Color.R, FrameColor.TopValue.Color.G, FrameColor.TopValue.Color.B)))
                using (Pen pen = new Pen(drawBrush, wTopPixels))
                {
                    float[] pattern = ComplexDashStyle.GetDashPattern(DashStyle.TopValue);
                    // prázdné pole je hodnota "nespecifikováno"
                    if (pattern.Length > 0
                        // záporná hodnota v poli nesmí být - jinak se jedná o "nespecifikováno"
                        && pattern.Min() >= 0)
                    {
                        // hodnota 0 znamená že se jedná o dvojitou čáru
                        if (pattern.Min() > 0)
                        {
                            pen.DashPattern = pattern;
                            if (InsideBorder)
                                path = RoundedRectangle.Create(location.X + sLeftPixels + wLeftPixels / 2
                                    , location.Y + wTopPixels / 2 + sTopPixels
                                    , size.Width - sRightPixels - sLeftPixels - wRightPixels
                                    , size.Height - wTopPixels - sTopPixels - sBottomPixels
                                    , Radius);
                            else
                                path = RoundedRectangle.Create(location.X + sLeftPixels
                                    , location.Y + sTopPixels
                                    , size.Width - sRightPixels - sLeftPixels
                                    , size.Height - sTopPixels - sBottomPixels
                                    , Radius);
                            graphics.DrawPath(pen, path);
                        }
                        else
                        // kreslení dvojité čáry
                        {
                            float w = wTopPixels;
                            using (Pen subPen = new Pen(drawBrush, w / 4))
                            {
                                GraphicsPath path1 = null;
                                GraphicsPath path2 = null;
                                if (InsideBorder)
                                {
                                    path1 = RoundedRectangle.Create(location.X + sLeftPixels + w / 8
                                        , location.Y + sTopPixels + w / 8
                                        , size.Width - sRightPixels - sLeftPixels - w / 4
                                        , size.Height - sTopPixels - sBottomPixels - w / 4
                                        , Radius);
                                    path2 = RoundedRectangle.Create(location.X + w * 3 / 4 + sLeftPixels + 3
                                        , location.Y + w * 3 / 4 + sTopPixels + 3
                                        , size.Width - sRightPixels - sLeftPixels - (w * 3 / 2) - 6
                                        , size.Height - (w * 3 / 2) - sTopPixels - sBottomPixels - 6
                                        , Radius);
                                }
                                else
                                {
                                    path1 = RoundedRectangle.Create(location.X + sLeftPixels
                                        , location.Y + sTopPixels
                                        , size.Width - sRightPixels - sLeftPixels
                                        , size.Height - sTopPixels - sBottomPixels
                                        , Radius);
                                    path2 = RoundedRectangle.Create(location.X + w / 2 + sLeftPixels + 3
                                        , location.Y + w / 2 + sTopPixels + 3
                                        , size.Width - sRightPixels - sLeftPixels - w - 6
                                        , size.Height - sTopPixels - sBottomPixels - w - 6
                                        , Radius);
                                }
                                graphics.DrawPath(subPen, path1);
                                graphics.DrawPath(subPen, path2);
                            }
                        }
                    }
                }
            }
            else
            {
                DrawTopSide(graphics, wTopPixels, sLeftPixels, sTopPixels, sRightPixels, location, size);
                DrawBottomSide(graphics, wBottomPixels, sLeftPixels, sBottomPixels, sRightPixels, location, size);
                DrawLeftSide(graphics, wLeftPixels, sLeftPixels, sTopPixels, sBottomPixels, location, size);
                DrawRightSide(graphics, wRightPixels, sBottomPixels, sTopPixels, sRightPixels, location, size);
            }
        }

        void DrawLeftSide(Graphics graphics, float penWidth, float sLeftPixels, float sTopPixels, float sBottomPixels, PointF location, SizeF size)
        {
            if (penWidth != 0)
                using (SolidBrush drawBrush = new SolidBrush(FrameColor.LeftValue.Color))
                using (Pen pen = new Pen(drawBrush, penWidth))
                {
                    float[] pattern = ComplexDashStyle.GetDashPattern(DashStyle.LeftValue);
                    // prázdné pole je hodnota "nespecifikováno"
                    if (pattern.Length > 0
                        // záporná hodnota v poli nesmí být - jinak se jedná o "nespecifikováno"
                        && pattern.Min() >= 0)
                    {
                        // hodnota 0 znamená že se jedná o dvojitou čáru
                        if (pattern.Min() > 0)
                        {
                            pen.DashPattern = pattern;
                            DrawLeft(graphics, pen, location, size, sTopPixels, sLeftPixels, sBottomPixels, penWidth);
                        }
                        else
                        // kreslíme dvojitou čáru
                        // jedná se o kreslení 2xčáry vedle sebe s mezerou rovnou velikosti šířky péra
                        {
                            pen.DashStyle = System.Drawing.Drawing2D.DashStyle.Custom;
                            PointF _locOut = new PointF(location.X - penWidth * 3 / 2, location.Y - penWidth * 3 / 2),
                                _locInt = new PointF(location.X + penWidth / 2, location.Y + penWidth / 2);
                            SizeF _sizeOut = new SizeF(size.Width + penWidth * 5 / 2, size.Height + 3 * penWidth),
                                _sizeInt = new SizeF(size.Width - penWidth * 3 / 2, size.Height - penWidth);

                            DrawLeft(graphics, pen, _locOut, _sizeOut, sTopPixels, sLeftPixels, sBottomPixels, penWidth);
                            DrawLeft(graphics, pen, _locInt, _sizeInt, sTopPixels, sLeftPixels, sBottomPixels, penWidth);
                        }
                    }
                }
            else if (VisibleAlways)
                //Zviditelnění objektu
                using (SolidBrush drawBrush = new SolidBrush(Color.Gray))
                using (Pen pen = new Pen(drawBrush, 1) { DashStyle = System.Drawing.Drawing2D.DashStyle.Dash })
                    graphics.DrawLine(pen
                        , new PointF(location.X, location.Y)
                        , new PointF(location.X, location.Y + size.Height));
        }
        void DrawLeft(Graphics graphics, Pen pen, PointF location, SizeF size, float sTopPixels, float sLeftPixels, float sBottomPixels, float penWidth)
        {
            if (Radius != 0)
                if (InsideBorder)
                    RoundedRectangle.DrawRectangle(graphics, pen
                        , location.X + sLeftPixels + penWidth / 2
                        , location.Y + sTopPixels + penWidth / 2
                        , 0
                        , size.Height - sTopPixels - sBottomPixels - penWidth
                        , Radius
                        , Corners
                        , RoundedRectangle.RectangleSides.Left);
                else
                    RoundedRectangle.DrawRectangle(graphics, pen
                        , location.X + sLeftPixels
                        , location.Y + sTopPixels
                        , 0
                        , size.Height - sTopPixels - sBottomPixels
                        , Radius
                        , Corners
                        , RoundedRectangle.RectangleSides.Left);
            else
                if (InsideBorder)
                RoundedRectangle.DrawRectangle(graphics, pen
                    , location.X + sLeftPixels + penWidth / 2
                    , location.Y + sTopPixels
                    , 0
                    , size.Height - sTopPixels - sBottomPixels
                    , Radius
                    , Corners
                    , RoundedRectangle.RectangleSides.Left);
            else
                RoundedRectangle.DrawRectangle(graphics, pen
                    , location.X + sLeftPixels
                    , location.Y + sTopPixels - penWidth / 2
                    , 0
                    , size.Height - sTopPixels - sBottomPixels + penWidth
                    , Radius
                    , Corners
                    , RoundedRectangle.RectangleSides.Left);
        }

        void DrawTopSide(Graphics graphics, float penWidth, float sLeftPixels, float sTopPixels, float sRightPixels, PointF location, SizeF size)
        {
            if (penWidth != 0)
                using (SolidBrush drawBrush = new SolidBrush(System.Drawing.Color.FromArgb(FrameColor.TopValue.Color.A, FrameColor.TopValue.Color.R, FrameColor.TopValue.Color.G, FrameColor.TopValue.Color.B)))
                using (Pen pen = new Pen(drawBrush, penWidth))
                {
                    float[] pattern = ComplexDashStyle.GetDashPattern(DashStyle.TopValue);
                    // prázdné pole je hodnota "nespecifikováno"
                    if (pattern.Length > 0
                        // záporná hodnota v poli nesmí být - jinak se jedná o "nespecifikováno"
                        && pattern.Min() >= 0)
                    {
                        // hodnota 0 znamená že se jedná o dvojitou čáru
                        if (pattern.Min() > 0)
                        {
                            pen.DashPattern = pattern;
                            DrawTop(graphics, pen, location, size, sLeftPixels, sTopPixels, sRightPixels, penWidth);
                        }
                        else
                        // kreslíme dvojitou čáru
                        {
                            pen.DashStyle = System.Drawing.Drawing2D.DashStyle.Custom;

                            PointF _locOut = new PointF(location.X - penWidth * 3 / 2, location.Y - penWidth * 3 / 2),
                                _locInt = new PointF(location.X + penWidth / 2, location.Y + penWidth / 2);
                            SizeF _sizeOut = new SizeF(size.Width + penWidth * 5 / 2, size.Height + 3 * penWidth),
                                _sizeInt = new SizeF(size.Width - penWidth * 3 / 2, size.Height - penWidth);

                            DrawTop(graphics, pen, _locOut, _sizeOut, sLeftPixels, sTopPixels, sRightPixels, penWidth);
                            DrawTop(graphics, pen, _locInt, _sizeInt, sLeftPixels, sTopPixels, sRightPixels, penWidth);
                        }
                    }
                }
            else if (VisibleAlways)
                //Zviditelnění objektu
                using (SolidBrush drawBrush = new SolidBrush(Color.Gray))
                using (Pen pen = new Pen(drawBrush, 1) { DashStyle = System.Drawing.Drawing2D.DashStyle.Dash })
                    graphics.DrawLine(pen
                        , new PointF(location.X, location.Y)
                        , new PointF(location.X + size.Width, location.Y));
        }
        void DrawTop(Graphics graphics, Pen pen, PointF location, SizeF size, float sLeftPixels, float sTopPixels, float sRightPixels, float penWidth)
        {
            if (Radius != 0)
                if (InsideBorder)
                    RoundedRectangle.DrawRectangle(graphics, pen
                        , location.X + sLeftPixels + penWidth / 2
                        , location.Y + sTopPixels + penWidth / 2
                        , size.Width - sRightPixels - sLeftPixels - penWidth
                        , 0
                        , Radius
                        , Corners
                        //, ComplexSurroundCorners.TopLeft | ComplexSurroundCorners.TopRight
                        , RoundedRectangle.RectangleSides.Top);
                else
                    RoundedRectangle.DrawRectangle(graphics, pen
                        , location.X + sLeftPixels
                        , location.Y + sTopPixels
                        , size.Width - sRightPixels - sLeftPixels
                        , 0
                        , Radius
                        , Corners
                        //, ComplexSurroundCorners.TopLeft | ComplexSurroundCorners.TopRight
                        , RoundedRectangle.RectangleSides.Top);
            else
                if (InsideBorder)
                RoundedRectangle.DrawRectangle(graphics, pen
                    , location.X + sLeftPixels
                    , location.Y + sTopPixels + penWidth / 2
                    , size.Width - sRightPixels - sLeftPixels
                    , 0
                    , Radius
                    , Corners
                    //, ComplexSurroundCorners.TopLeft | ComplexSurroundCorners.TopRight
                    , RoundedRectangle.RectangleSides.Top);
            else
                RoundedRectangle.DrawRectangle(graphics, pen
                    , location.X + sLeftPixels - penWidth / 2
                    , location.Y + sTopPixels
                    , size.Width - sRightPixels - sLeftPixels + penWidth
                    , 0
                    , Radius
                    , Corners
                    //, ComplexSurroundCorners.TopLeft | ComplexSurroundCorners.TopRight
                    , RoundedRectangle.RectangleSides.Top);
        }

        void DrawRightSide(Graphics graphics, float penWidth, float sTopPixels, float sRightPixels, float sBottomPixels, PointF location, SizeF size)
        {
            if (penWidth != 0)
                using (SolidBrush drawBrush = new SolidBrush(FrameColor.RightValue.Color))
                using (Pen pen = new Pen(drawBrush, penWidth))
                {
                    float[] pattern = ComplexDashStyle.GetDashPattern(DashStyle.RightValue);
                    // prázdné pole je hodnota "nespecifikováno"
                    if (pattern.Length > 0
                        // záporná hodnota v poli nesmí být - jinak se jedná o "nespecifikováno"
                        && pattern.Min() >= 0)
                    {
                        // hodnota 0 znamená že se jedná o dvojitou čáru
                        if (pattern.Min() > 0)
                        {
                            pen.DashPattern = pattern;
                            DrawRight(graphics, pen, location, size, sRightPixels, sTopPixels, sBottomPixels, penWidth);
                        }
                        else
                        // kreslíme dvojitou čáru
                        {
                            pen.DashStyle = System.Drawing.Drawing2D.DashStyle.Custom;
                            PointF _locOut = new PointF(location.X - penWidth, location.Y - penWidth * 3 / 2),
                                _locInt = new PointF(location.X + penWidth, location.Y + penWidth / 2);
                            //SizeF _sizeOut = new SizeF(size.Width + penWidth * 5 / 2, size.Height + penWidth * 5 / 2),
                            //    _sizeInt = new SizeF(size.Width - penWidth * 3 / 2, size.Height - penWidth * 3 / 2);
                            SizeF _sizeOut = new SizeF(size.Width + penWidth * 5 / 2, size.Height + 3 * penWidth),
                                _sizeInt = new SizeF(size.Width - penWidth * 3 / 2, size.Height - penWidth);

                            DrawRight(graphics, pen, _locOut, _sizeOut, sRightPixels, sTopPixels, sBottomPixels, penWidth);
                            DrawRight(graphics, pen, _locInt, _sizeInt, sRightPixels, sTopPixels, sBottomPixels, penWidth);
                        }
                    }
                }
            else if (VisibleAlways)
                //Zviditelnění objektu
                using (SolidBrush drawBrush = new SolidBrush(Color.Gray))
                using (Pen pen = new Pen(drawBrush, 1) { DashStyle = System.Drawing.Drawing2D.DashStyle.Dash })
                    graphics.DrawLine(pen
                        , new PointF(location.X + size.Width, location.Y)
                        , new PointF(location.X + size.Width, location.Y + size.Height));
        }
        void DrawRight(Graphics graphics, Pen pen, PointF location, SizeF size, float sRightPixels, float sTopPixels, float sBottomPixels, float penWidth)
        {
            if (Radius != 0)
                if (InsideBorder)
                    RoundedRectangle.DrawRectangle(graphics, pen
                        , location.X + size.Width - sRightPixels - penWidth / 2
                        , location.Y + sTopPixels + penWidth / 2
                        , 0
                        , size.Height - sTopPixels - sBottomPixels - penWidth
                        , Radius
                        , Corners
                        //, ComplexSurroundCorners.TopRight | ComplexSurroundCorners.BottomRight
                        , RoundedRectangle.RectangleSides.Right);
                else
                    RoundedRectangle.DrawRectangle(graphics, pen
                        , location.X + size.Width - sRightPixels
                        , location.Y + sTopPixels
                        , 0
                        , size.Height - sTopPixels - sBottomPixels
                        , Radius
                        , Corners
                        //, ComplexSurroundCorners.TopRight | ComplexSurroundCorners.BottomRight
                        , RoundedRectangle.RectangleSides.Right);
            else
                if (InsideBorder)
                RoundedRectangle.DrawRectangle(graphics, pen
                    , location.X + size.Width - sRightPixels - penWidth / 2
                    , location.Y + sTopPixels
                    , 0
                    , size.Height - sTopPixels - sBottomPixels
                    , Radius
                    , Corners
                    //, ComplexSurroundCorners.TopRight | ComplexSurroundCorners.BottomRight
                    , RoundedRectangle.RectangleSides.Right);
            else
                RoundedRectangle.DrawRectangle(graphics, pen
                    , location.X + size.Width - sRightPixels
                    , location.Y + sTopPixels - penWidth / 2
                    , 0
                    , size.Height - sTopPixels - sBottomPixels + penWidth
                    , Radius
                    , Corners
                    //, ComplexSurroundCorners.TopRight | ComplexSurroundCorners.BottomRight
                    , RoundedRectangle.RectangleSides.Right);
        }

        void DrawBottomSide(Graphics graphics, float penWidth, float sLeftPixels, float sRightPixels, float sBottomPixels, PointF location, SizeF size)
        {
            if (penWidth != 0)
                using (SolidBrush drawBrush = new SolidBrush(FrameColor.BottomValue.Color))
                using (Pen pen = new Pen(drawBrush, penWidth))
                {
                    float[] pattern = ComplexDashStyle.GetDashPattern(DashStyle.BottomValue);
                    // prázdné pole je hodnota "nespecifikováno"
                    if (pattern.Length > 0
                        // záporná hodnota v poli nesmí být - jinak se jedná o "nespecifikováno"
                        && pattern.Min() >= 0)
                    {
                        // hodnota 0 znamená že se jedná o dvojitou čáru
                        if (pattern.Min() > 0)
                        {
                            pen.DashPattern = pattern;
                            DrawBottom(graphics, pen, location, size, sLeftPixels, sBottomPixels, sRightPixels, penWidth);
                        }
                        else
                        // kreslíme dvojitou čáru
                        {
                            pen.DashStyle = System.Drawing.Drawing2D.DashStyle.Custom;
                            PointF _locOut = new PointF(location.X - penWidth * 3 / 2, location.Y - penWidth * 3 / 2),
                                    _locInt = new PointF(location.X + penWidth / 2, location.Y + penWidth / 2);
                            SizeF _sizeOut = new SizeF(size.Width + penWidth * 5 / 2, size.Height + 3 * penWidth),
                                _sizeInt = new SizeF(size.Width - penWidth * 3 / 2, size.Height - penWidth);

                            DrawBottom(graphics, pen, _locOut, _sizeOut, sLeftPixels, sBottomPixels, sRightPixels, penWidth);
                            DrawBottom(graphics, pen, _locInt, _sizeInt, sLeftPixels, sBottomPixels, sRightPixels, penWidth);
                        }
                    }
                }
            else if (VisibleAlways)
                //Zviditelnění objektu
                using (SolidBrush drawBrush = new SolidBrush(Color.Gray))
                using (Pen pen = new Pen(drawBrush, 1) { DashStyle = System.Drawing.Drawing2D.DashStyle.Dash })
                    graphics.DrawLine(pen
                        , new PointF(location.X, location.Y + size.Height)
                        , new PointF(location.X + size.Width, location.Y + size.Height));
        }
        void DrawBottom(Graphics graphics, Pen pen, PointF location, SizeF size, float sLeftPixels, float sBottomPixels, float sRightPixels, float penWidth)
        {
            if (Radius != 0)
                if (InsideBorder)
                    RoundedRectangle.DrawRectangle(graphics, pen
                        , location.X + sLeftPixels + penWidth / 2
                        , location.Y + size.Height - sBottomPixels - penWidth / 2
                        , size.Width - sRightPixels - sLeftPixels - penWidth
                        , 0
                        , Radius
                        , Corners
                        //, ComplexSurroundCorners.BottomLeft | ComplexSurroundCorners.BottomRight
                        , RoundedRectangle.RectangleSides.Bottom);
                else
                    RoundedRectangle.DrawRectangle(graphics, pen
                        , location.X + sLeftPixels
                        , location.Y + size.Height - sBottomPixels
                        , size.Width - sRightPixels - sLeftPixels
                        , 0
                        , Radius
                        , Corners
                        //, ComplexSurroundCorners.BottomLeft | ComplexSurroundCorners.BottomRight
                        , RoundedRectangle.RectangleSides.Bottom);
            else
                if (InsideBorder)
                RoundedRectangle.DrawRectangle(graphics, pen
                    , location.X + sLeftPixels
                    , location.Y + size.Height - sBottomPixels - penWidth / 2
                    , size.Width - sRightPixels - sLeftPixels
                    , 0
                    , Radius
                    , Corners
                    //, ComplexSurroundCorners.BottomLeft | ComplexSurroundCorners.BottomRight
                    , RoundedRectangle.RectangleSides.Bottom);
            else
                RoundedRectangle.DrawRectangle(graphics, pen
                    , location.X + sLeftPixels - penWidth / 2
                    , location.Y + size.Height - sBottomPixels
                    , size.Width - sRightPixels - sLeftPixels + penWidth
                    , 0
                    , Radius
                    , Corners
                    //, ComplexSurroundCorners.BottomLeft | ComplexSurroundCorners.BottomRight
                    , RoundedRectangle.RectangleSides.Bottom);
        }

        bool Equals(IComplexSurround other)
        {
            return Width.Equals(other.Width)
                && DashStyle.Equals(other.DashStyle)
                && FrameColor.Equals(other.FrameColor)
                && (InsideBorder == other.InsideBorder)
                && (Radius == other.Radius);
        }

        /// <summary>
        /// seznam rohů
        /// </summary>
        /// <returns></returns>
        public static List<string> ListCorners
        {
            get
            {
                return new List<string>() {
                    GResources.GetResourceText(29450725)
                    , GResources.GetResourceText(29450726)
                    , GResources.GetResourceText(29450727)
                    , GResources.GetResourceText(29450728)
                    , GResources.GetResourceText(29450729)
                    , GResources.GetResourceText(29450730)
                    , GResources.GetResourceText(29450731)
                    , GResources.GetResourceText(29450732)
                    , GResources.GetResourceText(29450733)
                    , GResources.GetResourceText(29450734)
                    , GResources.GetResourceText(29450735)
                    , GResources.GetResourceText(29450736)
                    , GResources.GetResourceText(29450737)
                    , GResources.GetResourceText(29450738)
                    , GResources.GetResourceText(29450739)
                    , GResources.GetResourceText(29450703) };
            }
        }
    }

    /// <summary>
    /// Třída popisující rámeček komponent
    /// </summary>
    [Serializable]
    [XmlRoot("Frame")]
    [EditorAttribute(typeof(ComplexSurroundEditor), typeof(UITypeEditor))]
    public class URComplexSurround : ComplexSurround
    {
        [NonSerialized]
        readonly UndoRedo<bool> insideborder = new UndoRedo<bool>();
        /// <summary>
        /// způsob umístění rámečků v buňce
        /// </summary>
        [XmlAttribute("InsideBorder")]
        [DisplayName("uvnitř")]
        [Description("Indikuje, že rámeček se kreslí uvnitř objektu")]
        public override bool InsideBorder { get { return insideborder.Value; } set { insideborder.Value = value; } }

        [NonSerialized]
        readonly UndoRedo<int> radius = new UndoRedo<int>();
        /// <summary>
        /// Poloměr zaoblení rohů rámečku
        /// </summary>
        [XmlAttribute("Radius")]
        [DisplayName("poloměr zaoblení")]
        [Description("Poloměr zaoblení rohů rámečku")]
        public override int Radius { get { return radius.Value; } set { radius.Value = value; } }

        [NonSerialized]
        readonly UndoRedo<ComplexSurroundCorners> corners = new UndoRedo<ComplexSurroundCorners>();
        /// <summary>
        /// indikuje, které rohy sa mají dle poloměru vykreslovat
        /// </summary>
        [XmlAttribute("Corners")]
        [DisplayName("rohy")]
        [Description("Indikuje, které rohy rámečku sa mají dle poloměru vykreslovat")]
        public override ComplexSurroundCorners Corners { get { return corners.Value; } set { corners.Value = value; } }

        [NonSerialized]
        readonly UndoRedo<IComplexFiveColor> framecolor = new UndoRedo<IComplexFiveColor>();
        /// <summary>
        /// Barvy
        /// </summary>
        [XmlElement("Colors")]
        [DisplayName("barvy")]
        public override IComplexFiveColor FrameColor { get { return framecolor.Value; } set { framecolor.Value = value; } }

        [NonSerialized]
        readonly UndoRedo<IComplexFiveDashStyle> dashstyle = new UndoRedo<IComplexFiveDashStyle>();
        /// <summary>
        /// styl všech rámečků
        /// </summary>
        [XmlElement("DashStyle")]
        [DisplayName("styly")]
        public override IComplexFiveDashStyle DashStyle { get { return dashstyle.Value; } set { dashstyle.Value = value; } }

        [NonSerialized]
        readonly UndoRedo<IComplexFive> width = new UndoRedo<IComplexFive>();
        /// <summary>
        /// Šířka
        /// </summary>
        [XmlElement("Width")]
        [DisplayName("šířky")]
        public override IComplexFive Width { get { return width.Value; } set { width.Value = value; } }

        /// <summary>
        /// Prázdný konstruktér třídy
        /// </summary>
        public URComplexSurround() { }

        /// <summary>
        /// volání konstruktorů všech objektů
        /// </summary>
        protected override void Construct()
        {
            if (!isConstruct)
            {
                Width = new URComplexSurroundWidth();
                FrameColor = new URComplexFiveColor();
                DashStyle = new URComplexFiveDashStyle();
                Radius = 0;
                InsideBorder = false;
                Corners = ComplexSurroundCorners.None;
            }
            isConstruct = true;
        }

        /// <summary>
        /// Inicializace objektu
        /// </summary>
        /// <returns></returns>
        public override IComplexSurround Initialize()
        {
            Construct();

            DashStyle.Initialize(ComplexDashStyle.Unspec);
            Width.Initialize(string.Empty);
            FrameColor.Initialize();

            return this;
        }

        /// <summary>
        /// Inicializace objektu dle parametru
        /// </summary>
        /// <param name="dashStyle"></param>
        /// <param name="sizeValue"></param>
        /// <param name="insideBorder"></param>
        /// <param name="color"></param>
        /// <returns></returns>
        public override IComplexSurround Initialize(string dashStyle, string sizeValue, bool insideBorder, Color color)
        {
            Construct();
            DashStyle.Initialize(dashStyle);
            Width.Initialize(sizeValue);
            FrameColor.Initialize(color);
            InsideBorder = insideBorder;
            return this;
        }

        /// <exclude/>
        public override IComplexSurround Initialize(GFEBorder left, GFEBorder top, GFEBorder right, GFEBorder bottom, ComplexSurroundCorners corners = ComplexSurroundCorners.None, int radius = 0, bool insideBorder = false)
        {
            Initialize();

            Width.LeftValue = left.Width == 0 ? string.Empty : (left.Width + Convert.ToString(left.WidthMetrics));
            Width.RightValue = right.Width == 0 ? string.Empty : (right.Width + Convert.ToString(right.WidthMetrics));
            Width.TopValue = top.Width == 0 ? string.Empty : (top.Width + Convert.ToString(top.WidthMetrics));
            Width.BottomValue = bottom.Width == 0 ? string.Empty : (bottom.Width + Convert.ToString(bottom.WidthMetrics));

            if (left.Color.Color.Name == "0")
                FrameColor.LeftValue.Initialize(ColorService.ComplexBlack);
            else
                FrameColor.LeftValue.Initialize(left.Color.Color);
            if (right.Color.Color.Name == "0")
                FrameColor.RightValue.Initialize(ColorService.ComplexBlack);
            else
                FrameColor.RightValue.Initialize(right.Color.Color);
            if (top.Color.Color.Name == "0")
                FrameColor.TopValue.Initialize(ColorService.ComplexBlack);
            else
                FrameColor.TopValue.Initialize(top.Color.Color);
            if (bottom.Color.Color.Name == "0")
                FrameColor.BottomValue.Initialize(ColorService.ComplexBlack);
            else
                FrameColor.BottomValue.Initialize(bottom.Color.Color);

            DashStyle.LeftValue = ComplexDashStyle.Parse(left.Style);
            DashStyle.TopValue = ComplexDashStyle.Parse(top.Style);
            DashStyle.RightValue = ComplexDashStyle.Parse(right.Style);
            DashStyle.BottomValue = ComplexDashStyle.Parse(bottom.Style);

            Radius = radius;
            InsideBorder = insideBorder;
            Corners = corners;
            return this;
        }

        /// <exclude/>
        public override IComplexSurround Initialize(IComplexSurround surround)
        {
            Construct();
            if (surround != null)
            {
                Width.Initialize(surround.Width);
                FrameColor.Initialize(surround.FrameColor);
                DashStyle.Initialize(surround.DashStyle);
                InsideBorder = surround.InsideBorder;
                Radius = surround.Radius;
                Corners = surround.Corners;
            }
            else
                Initialize();

            return this;
        }
        /// <summary>
        /// inicializace objketu
        /// </summary>
        /// <param name="style"></param>
        /// <returns></returns>
        public override IComplexSurround Initialize(GFEFormatStyle style)
        {
            Initialize();
            if (style != null)
            {
                // nastav přes SetValue
                Width.LeftValue = style.LeftBorder.Width == 0 ? string.Empty : (style.LeftBorder.Width + Convert.ToString(style.LeftBorder.WidthMetrics));
                Width.RightValue = style.RightBorder.Width == 0 ? string.Empty : (style.RightBorder.Width + Convert.ToString(style.RightBorder.WidthMetrics));
                Width.TopValue = style.TopBorder.Width == 0 ? string.Empty : (style.TopBorder.Width + Convert.ToString(style.TopBorder.WidthMetrics));
                Width.BottomValue = style.BottomBorder.Width == 0 ? string.Empty : (style.BottomBorder.Width + Convert.ToString(style.BottomBorder.WidthMetrics));

                if (style.LeftBorder.Color.Color.Name == "0")
                    FrameColor.LeftValue.Initialize(ColorService.ComplexBlack);
                else
                    FrameColor.LeftValue.Initialize(style.LeftBorder.Color.Color);
                if (style.RightBorder.Color.Color.Name == "0")
                    FrameColor.RightValue.Initialize(ColorService.ComplexBlack);
                else
                    FrameColor.RightValue.Initialize(style.RightBorder.Color.Color);
                if (style.TopBorder.Color.Color.Name == "0")
                    FrameColor.TopValue.Initialize(ColorService.ComplexBlack);
                else
                    FrameColor.TopValue.Initialize(style.TopBorder.Color.Color);
                if (style.BottomBorder.Color.Color.Name == "0")
                    FrameColor.BottomValue.Initialize(ColorService.ComplexBlack);
                else
                    FrameColor.BottomValue.Initialize(style.BottomBorder.Color.Color);

                DashStyle.LeftValue = ComplexDashStyle.Parse(style.LeftBorder.Style);
                DashStyle.TopValue = ComplexDashStyle.Parse(style.TopBorder.Style);
                DashStyle.RightValue = ComplexDashStyle.Parse(style.RightBorder.Style);
                DashStyle.BottomValue = ComplexDashStyle.Parse(style.BottomBorder.Style);

                Radius = 0;
                InsideBorder = false;
                Corners = ComplexSurroundCorners.None;
            }
            else
                Initialize();
            return this;
        }
    }
}
