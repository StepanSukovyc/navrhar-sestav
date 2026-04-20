//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.InnerSurround.cs                         </Name>
//    <Description> rozhraní vnitřního orámování rámečku                        </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2022-11-16                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;
using System.ComponentModel;
using Gordic.General;
using Gordic.GFE.Parsers.UndoRedoFramework;
using System.Drawing.Design;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// rozhraní vnitřního orámování rámečku
    /// </summary>
    public interface IInnerSurround
    {
        /// <summary>
        /// Barva
        /// </summary>
        IComplexColor UpFrameColor { get; set; }
        /// <summary>
        /// styl všech rámečků
        /// </summary>
        IInnerDashStyle UpDashStyle { get; set; }
        /// <summary>
        /// Šířka
        /// </summary>
        IInnerWidth UpWidth { get; set; }
        /// <summary>
        /// Barva
        /// </summary>
        IComplexColor DownFrameColor { get; set; }
        /// <summary>
        /// styl všech rámečků
        /// </summary>
        IInnerDashStyle DownDashStyle { get; set; }
        /// <summary>
        /// Šířka
        /// </summary>
        IInnerWidth DownWidth { get; set; }
        /// <summary>
        /// Hodnota zvětšení
        /// </summary>
        float Zoom { get; set; }

        /// <summary>
        /// kreslení
        /// </summary>
        /// <param name="graphics"></param>
        /// <param name="location"></param>
        /// <param name="size"></param>
        void Paint(Graphics graphics, PointF location, SizeF size);
        /// <summary>
        /// kreslení
        /// </summary>
        /// <param name="graphics"></param>
        /// <param name="location"></param>
        /// <param name="size"></param>
        /// <param name="zoomFactor"></param>
        void Paint(Graphics graphics, PointF location, SizeF size, float zoomFactor);
        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <returns></returns>
        IInnerSurround Initialize();
        /// <summary>
        /// Inicializace objektu dle parametru
        /// </summary>
        /// <param name="dashStyle"></param>
        /// <param name="sizeValue"></param>
        /// <param name="color"></param>
        /// <returns></returns>
        IInnerSurround Initialize(string dashStyle, string sizeValue, Color color);
        /// <summary>
        /// inicializace objketu
        /// </summary>
        /// <param name="surround"></param>
        /// <returns></returns>
        IInnerSurround Initialize(IInnerSurround surround);
        /// <summary>
        /// inicializace objketu
        /// </summary>
        /// <param name="style"></param>
        /// <returns></returns>
        IInnerSurround Initialize(GFEFormatStyle style);
        /// <summary>
        /// Inicializace objektu
        /// </summary>
        /// <param name="up"></param>
        /// <param name="down"></param>
        /// <returns></returns>
        IInnerSurround Initialize(GFEBorder up, GFEBorder down);
    }

    /// <summary>
    /// Třída popisující rámeček komponent
    /// </summary>
    [Serializable]
    [XmlRoot("Frame")]
    public class InnerSurround : IInnerSurround
    {
        /// <summary>
        /// barva nahoru
        /// </summary>
        [XmlElement("UpColor")]
        [DisplayName("barva nahoru")]
        public virtual IComplexColor UpFrameColor { get; set; }

        /// <summary>
        /// styl nahoru
        /// </summary>
        [XmlElement("UpDashStyle")]
        [DisplayName("styl nahoru")]
        public virtual IInnerDashStyle UpDashStyle { get; set; }

        /// <summary>
        /// šířka nahoru
        /// </summary>
        [XmlElement("UpWidth")]
        [DisplayName("šířka nahoru")]
        public virtual IInnerWidth UpWidth { get; set; }

        /// <summary>
        /// barva dolů
        /// </summary>
        [XmlElement("DownColor")]
        [DisplayName("barva dolů")]
        public virtual IComplexColor DownFrameColor { get; set; }

        /// <summary>
        /// styl dolů
        /// </summary>
        [XmlElement("DownDashStyle")]
        [DisplayName("styl dolů")]
        public virtual IInnerDashStyle DownDashStyle { get; set; }

        /// <summary>
        /// šířka dolů
        /// </summary>
        [XmlElement("DownWidth")]
        [DisplayName("šířka dolů")]
        public virtual IInnerWidth DownWidth { get; set; }

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
        public InnerSurround() { }

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
                UpWidth = new InnerSurroundWidth();
                DownWidth = new InnerSurroundWidth();
                UpFrameColor = new ComplexColor();
                DownFrameColor = new ComplexColor();
                UpDashStyle = new InnerDashStyle();
                DownDashStyle = new InnerDashStyle();
            }
            isConstruct = true;
        }

        /// <summary>
        /// inicializace objketu
        /// </summary>
        /// <param name="style"></param>
        /// <returns></returns>
        public virtual IInnerSurround Initialize(GFEFormatStyle style)
        {
            Construct();

            if (style != null)
            {
                string sUpBorderWidth = style.Attributes.GetValueDefault("diagonalup-border-width", "0")
                    , sDownBorderWidth = style.Attributes.GetValueDefault("diagonaldown-border-width", "0")
                    , sUpBorderColor = style.Attributes.GetValueDefault("diagonalup-border-color", "transparent")
                    , sDownBorderColor = style.Attributes.GetValueDefault("diagonaldown-border-color", "transparent")
                    , sUpBorderStyle = style.Attributes.GetValueDefault("diagonalup-border-style", "solid")
                    , sDownBorderStyle = style.Attributes.GetValueDefault("diagonaldown-border-style", "solid");
                // nastav přes SetValue
                UpWidth.Initialize(string.Empty);
                UpWidth.Value = sUpBorderWidth;

                DownWidth.Initialize(string.Empty);
                DownWidth.Value = sDownBorderWidth;

                UpFrameColor.Initialize();
                if ("0".Equals(sUpBorderColor))
                    UpFrameColor.Initialize(ColorService.ComplexBlack);
                else
                    UpFrameColor.Initialize(sUpBorderColor);

                DownFrameColor.Initialize();
                if ("0".Equals(sDownBorderColor))
                    DownFrameColor.Initialize(ColorService.ComplexBlack);
                else
                    DownFrameColor.Initialize(sDownBorderColor);


                UpDashStyle.Value = ComplexDashStyle.Parse(sUpBorderStyle);
                DownDashStyle.Value = ComplexDashStyle.Parse(sDownBorderStyle);
            }
            else
                Initialize();
            return this;
        }

        /// <exclude/>
        public virtual IInnerSurround Initialize()
        {
            Construct();

            UpDashStyle.Initialize(ComplexDashStyle.Solid);
            DownDashStyle.Initialize(ComplexDashStyle.Solid);
            UpWidth.Initialize(string.Empty);
            DownWidth.Initialize(string.Empty);
            UpWidth.SetValue(0, Report.Implementation.Grr06Metrics.Unspec);
            DownWidth.SetValue(0, Report.Implementation.Grr06Metrics.Unspec);
            UpFrameColor.Initialize();
            DownFrameColor.Initialize();

            return this;
        }

        /// <summary>
        /// Inicializace objektu dle parametru
        /// </summary>
        /// <param name="dashStyle"></param>
        /// <param name="sizeValue"></param>
        /// <param name="color"></param>
        /// <returns></returns>
        public virtual IInnerSurround Initialize(string dashStyle, string sizeValue, Color color)
        {
            Construct();
            UpDashStyle.Initialize(dashStyle);
            UpWidth.Initialize(sizeValue);
            UpFrameColor.Initialize(color);
            DownDashStyle.Initialize(dashStyle);
            DownWidth.Initialize(sizeValue);
            DownFrameColor.Initialize(color);
            return this;
        }

        /// <exclude/>
        public virtual IInnerSurround Initialize(IInnerSurround surround)
        {
            Construct();

            if (surround != null)
            {
                UpWidth.Initialize(surround.UpWidth);
                UpFrameColor.Initialize(surround.UpFrameColor);
                UpDashStyle.Initialize(surround.UpDashStyle);
                DownWidth.Initialize(surround.DownWidth);
                DownFrameColor.Initialize(surround.DownFrameColor);
                DownDashStyle.Initialize(surround.DownDashStyle);
            }
            else
                Initialize();

            return this;
        }

        /// <summary>
        /// Inicializace objektu
        /// </summary>
        /// <param name="up"></param>
        /// <param name="down"></param>
        /// <returns></returns>
        public virtual IInnerSurround Initialize(GFEBorder up, GFEBorder down)
        {
            Construct();

            UpWidth.Initialize(string.Empty);
            UpWidth.Value = up.Width == 0 ? string.Empty : (up.Width + Convert.ToString(up.WidthMetrics));
            DownWidth.Initialize(string.Empty);
            DownWidth.Value = down.Width == 0 ? string.Empty : (down.Width + Convert.ToString(down.WidthMetrics));

            UpFrameColor.Initialize();
            if ("0".Equals(up.Color.Color.Name))
                UpFrameColor.Initialize(ColorService.ComplexBlack);
            else
                UpFrameColor.Initialize(up.Color.Color);
            DownFrameColor.Initialize();
            if ("0".Equals(down.Color.Color.Name))
                DownFrameColor.Initialize(ColorService.ComplexBlack);
            else
                DownFrameColor.Initialize(down.Color.Color);

            UpDashStyle.Initialize(ComplexDashStyle.Solid);
            UpDashStyle.Value = ComplexDashStyle.Parse(up.Style);
            DownDashStyle.Initialize(ComplexDashStyle.Solid);
            DownDashStyle.Value = ComplexDashStyle.Parse(down.Style);
            return this;
        }

        /// <summary>
        /// Přetížení porovnaní dvou komponent 
        /// </summary>
        /// <param name="obj">Komponenta, s kterou se porovnává daná</param>
        /// <returns>Pokud jsou stejné pak se vrací TRUE jinak FALSE</returns>
        public override bool Equals(object obj) => !(obj is IComplexSurround) ? base.Equals(obj) : Equals(obj as IComplexSurround);

        /// <summary>
        /// Přetížení
        /// </summary>
        /// <returns></returns>
        public override int GetHashCode() => base.GetHashCode();

        /// <exclude/>
        public override string ToString()
        => string.Format("šikmo nahoru barva:{0};"
            + "šikmo nahoru styl:{1};"
            + "šikmo nahoru šířka:{2};"
            + "šikmo dolů barva:{3}"
            + "šikmo dolů styl:{4}"
            + "šikmo dolů šířka:{5}", UpFrameColor, UpDashStyle.Value, UpWidth.Value, DownFrameColor, DownDashStyle.Value, DownWidth.Value);

        /// <summary>
        /// Kreslení ohraničení se zoom faktorem
        /// </summary>
        /// <param name="graphics">Ovladač grafiky</param>
        /// <param name="zoomFactor">Zoom faktor</param>
        /// <param name="location">Pozice levého horního rohu</param>
        /// <param name="size">Velikost objektu</param>
        public void Paint(Graphics graphics, PointF location, SizeF size, float zoomFactor)
        {
            Zoom = zoomFactor;
            //Paint(graphics, location, size);
        }

        /// <summary>
        /// Kreslení ohraničení
        /// </summary>
        /// <param name="graphics">Ovladac grafiky</param>
        /// <param name="location">Levy horni roh kde se ma zacit vykreslova text</param>
        /// <param name="size">Velikost mista do ktereho se ma nakreslit objekt</param>
        public void Paint(Graphics graphics, PointF location, SizeF size)
        {
        }

        ///// <summary>
        ///// Kreslení ohraničení
        ///// </summary>
        ///// <param name="graphics">Ovladac grafiky</param>
        ///// <param name="location">Levy horni roh kde se ma zacit vykreslova text</param>
        ///// <param name="size">Velikost mista do ktereho se ma nakreslit objekt</param>
        ///// <param name="spacing">Odsazení rámečku</param>
        //public void PaintOld(Graphics graphics, PointF location, SizeF size, IComplexFive spacing)
        //{
        //    float wTopPixels = Width.TopPixels * Zoom,
        //        wLeftPixels = Width.LeftPixels * Zoom,
        //        wRightPixels = Width.RightPixels * Zoom,
        //        wBottomPixels = Width.BottomPixels * Zoom,
        //        sTopPixels = spacing.TopPixels * Zoom,
        //        sLeftPixels = spacing.LeftPixels * Zoom,
        //        sRightPixels = spacing.RightPixels * Zoom,
        //        sBottomPixels = spacing.BottomPixels * Zoom;
        //    GraphicsPath path = null;
        //    if (wTopPixels != 0 && wTopPixels == wLeftPixels && wTopPixels == wBottomPixels && wTopPixels == wRightPixels
        //        && ComplexDashStyle.Parse(DashStyle.AllValue) != ComplexDashStyle.Unspec)
        //    {
        //        using (SolidBrush drawBrush = new SolidBrush(System.Drawing.Color.FromArgb(FrameColor.TopValue.Color.A, FrameColor.TopValue.Color.R, FrameColor.TopValue.Color.G, FrameColor.TopValue.Color.B)))
        //        using (Pen pen = new Pen(drawBrush, wTopPixels))
        //        {
        //            float[] pattern = ComplexDashStyle.GetDashPattern(DashStyle.TopValue);
        //            // prázdné pole je hodnota "nespecifikováno"
        //            if (pattern.Length > 0
        //                // záporná hodnota v poli nesmí být - jinak se jedná o "nespecifikováno"
        //                && pattern.Min() >= 0)
        //            {
        //                // hodnota 0 znamená že se jedná o dvojitou čáru
        //                if (pattern.Min() > 0)
        //                {
        //                    pen.DashPattern = pattern;
        //                    if (InsideBorder)
        //                        path = RoundedRectangle.Create(location.X + sLeftPixels + wLeftPixels / 2
        //                            , location.Y + wTopPixels / 2 + sTopPixels
        //                            , size.Width - sRightPixels - sLeftPixels - wRightPixels
        //                            , size.Height - wTopPixels - sTopPixels - sBottomPixels
        //                            , Radius);
        //                    else
        //                        path = RoundedRectangle.Create(location.X + sLeftPixels
        //                            , location.Y + sTopPixels
        //                            , size.Width - sRightPixels - sLeftPixels
        //                            , size.Height - sTopPixels - sBottomPixels
        //                            , Radius);
        //                    graphics.DrawPath(pen, path);
        //                }
        //                else
        //                // kreslení dvojité čáry
        //                {
        //                    float w = wTopPixels;
        //                    using (Pen subPen = new Pen(drawBrush, w / 4))
        //                    {
        //                        GraphicsPath path1 = null;
        //                        GraphicsPath path2 = null;
        //                        if (InsideBorder)
        //                        {
        //                            path1 = RoundedRectangle.Create(location.X + sLeftPixels + w / 8
        //                                , location.Y + sTopPixels + w / 8
        //                                , size.Width - sRightPixels - sLeftPixels - w / 4
        //                                , size.Height - sTopPixels - sBottomPixels - w / 4
        //                                , Radius);
        //                            path2 = RoundedRectangle.Create(location.X + w * 3 / 4 + sLeftPixels + 3
        //                                , location.Y + w * 3 / 4 + sTopPixels + 3
        //                                , size.Width - sRightPixels - sLeftPixels - (w * 3 / 2) - 6
        //                                , size.Height - (w * 3 / 2) - sTopPixels - sBottomPixels - 6
        //                                , Radius);
        //                        }
        //                        else
        //                        {
        //                            path1 = RoundedRectangle.Create(location.X + sLeftPixels
        //                                , location.Y + sTopPixels
        //                                , size.Width - sRightPixels - sLeftPixels
        //                                , size.Height - sTopPixels - sBottomPixels
        //                                , Radius);
        //                            path2 = RoundedRectangle.Create(location.X + w / 2 + sLeftPixels + 3
        //                                , location.Y + w / 2 + sTopPixels + 3
        //                                , size.Width - sRightPixels - sLeftPixels - w - 6
        //                                , size.Height - sTopPixels - sBottomPixels - w - 6
        //                                , Radius);
        //                        }
        //                        graphics.DrawPath(subPen, path1);
        //                        graphics.DrawPath(subPen, path2);
        //                    }
        //                }
        //            }
        //        }
        //    }
        //    else
        //    {
        //        DrawTopSide(graphics, wTopPixels, sLeftPixels, sTopPixels, sRightPixels, location, size);
        //        DrawBottomSide(graphics, wBottomPixels, sLeftPixels, sBottomPixels, sRightPixels, location, size);
        //        DrawLeftSide(graphics, wLeftPixels, sLeftPixels, sTopPixels, sBottomPixels, location, size);
        //        DrawRightSide(graphics, wRightPixels, sBottomPixels, sTopPixels, sRightPixels, location, size);
        //    }
        //}

        bool Equals(IInnerSurround other) => UpWidth.Equals(other.UpWidth)
                && UpDashStyle.Equals(other.UpDashStyle)
                && UpFrameColor.Equals(other.UpFrameColor)
                && DownWidth.Equals(other.DownWidth)
                && DownDashStyle.Equals(other.DownDashStyle)
                && DownFrameColor.Equals(other.DownFrameColor);
    }

    /// <summary>
    /// Třída popisující vnitřní komponent
    /// </summary>
    [Serializable]
    [XmlRoot("InnerFrame")]
    [EditorAttribute(typeof(InnerSurroundEditor), typeof(UITypeEditor))]
    public class URInnerSurround : InnerSurround
    {
        [NonSerialized]
        readonly UndoRedo<IComplexColor> upframecolor = new UndoRedo<IComplexColor>();
        /// <summary>
        /// Barva vnitřního rámečku nahoru
        /// </summary>
        [XmlElement("UpColor")]
        [DisplayName("barva nahoru")]
        public override IComplexColor UpFrameColor { get => upframecolor.Value; set => upframecolor.Value = value; }

        [NonSerialized]
        readonly UndoRedo<IComplexColor> downframecolor = new UndoRedo<IComplexColor>();
        /// <summary>
        /// Barva vnitřního rámečku dolů
        /// </summary>
        [XmlElement("DownColor")]
        [DisplayName("barva dolů")]
        public override IComplexColor DownFrameColor { get => downframecolor.Value; set => downframecolor.Value = value; }

        [NonSerialized]
        readonly UndoRedo<IInnerDashStyle> updashstyle = new UndoRedo<IInnerDashStyle>();
        /// <summary>
        /// styl vnitřního rámečku nahoru
        /// </summary>
        [XmlElement("UpDashStyle")]
        [DisplayName("styl nahoru")]
        public override IInnerDashStyle UpDashStyle { get => updashstyle.Value; set => updashstyle.Value = value; }

        [NonSerialized]
        readonly UndoRedo<IInnerDashStyle> downdashstyle = new UndoRedo<IInnerDashStyle>();
        /// <summary>
        /// styl vnitřního rámečku dolů
        /// </summary>
        [XmlElement("DownDashStyle")]
        [DisplayName("styl dolů")]
        public override IInnerDashStyle DownDashStyle { get => downdashstyle.Value; set => downdashstyle.Value = value; }

        [NonSerialized]
        readonly UndoRedo<IInnerWidth> upwidth = new UndoRedo<IInnerWidth>();
        /// <summary>
        /// Šířka vnitřního rámečku nahoru
        /// </summary>
        [XmlElement("UpWidth")]
        [DisplayName("šířka nahoru")]
        public override IInnerWidth UpWidth { get => upwidth.Value; set => upwidth.Value = value; }

        [NonSerialized]
        readonly UndoRedo<IInnerWidth> downwidth = new UndoRedo<IInnerWidth>();
        /// <summary>
        /// Šířka vnitřního rámečku dolů
        /// </summary>
        [XmlElement("DownWidth")]
        [DisplayName("šířka dolů")]
        public override IInnerWidth DownWidth { get => downwidth.Value; set => downwidth.Value = value; }

        /// <summary>
        /// Prázdný konstruktér třídy
        /// </summary>
        public URInnerSurround() { }

        /// <summary>
        /// volání konstruktorů všech objektů
        /// </summary>
        protected override void Construct()
        {
            if (!isConstruct)
            {
                UpWidth = new URInnerWidth();
                UpFrameColor = new URComplexColor();
                UpDashStyle = new URInnerDashStyle();
                DownWidth = new URInnerWidth();
                DownFrameColor = new URComplexColor();
                DownDashStyle = new URInnerDashStyle();
            }
            isConstruct = true;
        }

        /// <summary>
        /// Inicializace objektu
        /// </summary>
        /// <returns></returns>
        public override IInnerSurround Initialize()
        {
            Construct();

            UpDashStyle.Initialize(ComplexDashStyle.Unspec);
            UpWidth.Initialize(string.Empty);
            UpFrameColor.Initialize();

            DownDashStyle.Initialize(ComplexDashStyle.Unspec);
            DownWidth.Initialize(string.Empty);
            DownFrameColor.Initialize();

            return this;
        }

        /// <summary>
        /// Inicializace objektu dle parametru
        /// </summary>
        /// <param name="dashStyle"></param>
        /// <param name="sizeValue"></param>
        /// <param name="color"></param>
        /// <returns></returns>
        public override IInnerSurround Initialize(string dashStyle, string sizeValue, Color color)
        {
            Construct();
            UpDashStyle.Initialize(dashStyle);
            UpWidth.Initialize(sizeValue);
            UpFrameColor.Initialize(color);

            DownDashStyle.Initialize(dashStyle);
            DownWidth.Initialize(sizeValue);
            DownFrameColor.Initialize(color);
            return this;
        }

        /// <exclude/>
        public override IInnerSurround Initialize(GFEBorder up, GFEBorder down)
        {
            Initialize();

            UpWidth.Value = up.Width == 0 ? string.Empty : (up.Width + Convert.ToString(up.WidthMetrics));
            DownWidth.Value = down.Width == 0 ? string.Empty : (down.Width + Convert.ToString(down.WidthMetrics));

            if ("0".Equals(up.Color.Color.Name))
                UpFrameColor.Initialize(ColorService.ComplexBlack);
            else
                UpFrameColor.Initialize(up.Color.Color);
            if ("0".Equals(down.Color.Color.Name))
                DownFrameColor.Initialize(ColorService.ComplexBlack);
            else
                DownFrameColor.Initialize(down.Color.Color);

            UpDashStyle.Value = ComplexDashStyle.Parse(up.Style);
            DownDashStyle.Value = ComplexDashStyle.Parse(down.Style);
            return this;
        }

        /// <exclude/>
        public override IInnerSurround Initialize(IInnerSurround surround)
        {
            Construct();
            if (surround != null)
            {
                UpWidth.Initialize(surround.UpWidth);
                DownWidth.Initialize(surround.DownWidth);
                UpFrameColor.Initialize(surround.UpFrameColor);
                DownFrameColor.Initialize(surround.DownFrameColor);
                UpDashStyle.Initialize(surround.UpDashStyle);
                DownDashStyle.Initialize(surround.DownDashStyle);
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
        public override IInnerSurround Initialize(GFEFormatStyle style)
        {
            Initialize();
            if (style != null)
            {
                // up
                if (style.Attributes.ContainsKey("diagonalup-border-width"))
                    UpWidth.Value = style.Attributes["diagonalup-border-width"];
                if (style.Attributes.ContainsKey("diagonalup-border-color"))
                    UpFrameColor.Initialize(style.Attributes["diagonalup-border-color"]);
                if (style.Attributes.ContainsKey("diagonalup-border-style"))
                    UpDashStyle.Value = ComplexDashStyle.Parse(style.Attributes["diagonalup-border-style"]);

                // down
                if (style.Attributes.ContainsKey("diagonaldown-border-width"))
                    DownWidth.Value = style.Attributes["diagonaldown-border-width"];
                if (style.Attributes.ContainsKey("diagonaldown-border-color"))
                    DownFrameColor.Initialize(style.Attributes["diagonaldown-border-color"]);
                if (style.Attributes.ContainsKey("diagonaldown-border-style"))
                    DownDashStyle.Value = ComplexDashStyle.Parse(style.Attributes["diagonaldown-border-style"]);
            }
            else
                Initialize();
            return this;
        }
    }
}
