//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        GFEFormatStyle.cs                           </Name>
//    <Description> Parser formatu (ALF) - Styl GRR             </Description>
//    <Author>      Ing. Martin Aliger                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025  </Copyright>
//    <Created>     2006-10-05                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Drawing;
using Gordic.Report.Implementation;
using System.ComponentModel;
using Gordic.General;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Utils;

namespace Gordic.GFE.Parsers.Core
{
    #region GFEColor
    /// <summary>Barva pro GFE</summary>
    public struct GFEColor
    {
        Color m_c;
        string m_name;

        /// <summary>barva</summary>
        [DisplayName("barva")]
        public Color Color { get => m_c; }
        /// <summary>jméno</summary>
        [DisplayName("název")]
        public string Name { get => m_name; }

        /// <summary>Kontruktor</summary>
        public GFEColor(Color c)
        {
            m_c = c;
            if (!_colors.TryGetValue(c, out m_name))
                m_name = String.Format("#{0:x2}{1:x2}{2:x2}", c.R, c.G, c.B);
            else if (_colors.ContainsKey(c))
                m_name = _colors[c];
        }

        /// <summary>Kontruktor</summary>
        public GFEColor(Color c, string name)
        {
            m_name = name;

            //Zjistíme pøítomnost barvy v seznamu standardních barev
            Color _col = Color.Black;
            if (_ncolors.TryGetValue(m_name.ToLower(), out _col))
                m_c = _col;
            else m_c = c;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="name">Název barvy ze seznámu barev</param>
        public GFEColor(string name)
        {
            m_name = name;
            if (string.IsNullOrEmpty(name) || !_ncolors.TryGetValue(m_name.ToLower(), out m_c))
            {
                m_c = Color.Transparent;
                m_name = "transparent";
            }
        }

        /// <summary>Kontruktor</summary>
        public GFEColor(GFEColor c)
        {
            m_c = c.m_c;
            m_name = c.m_name;
        }

        /// <summary>
        /// Konstructor dle komplexní barvy
        /// </summary>
        /// <param name="color">Barva, dle které se vytváøí GFEColor</param>
        public GFEColor(IComplexColor color)
        {
            if (color == null)
            {
                m_c = Color.Transparent;
                m_name = "transparent";
            }
            else
            {
                m_c = color.Color;
                if (!_colors.TryGetValue(color.Color, out m_name))
                    m_name = String.Format("#{0:x2}{1:x2}{2:x2}", color.Color.R, color.Color.G, color.Color.B);
            }
        }
        /// <summary>Kontruktor</summary>
        internal GFEColor(Gordic.Report.Implementation.IGFormatGRRColor color)
        {
            m_c = GetColor(color);

            Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(color.getName(out m_name));

            //Zjistíme pøítomnost barvy v seznamu standardních barev
            Color _col = Color.Black;
            if (_ncolors.TryGetValue(m_name.ToLower(), out _col))
                m_c = _col;
        }

        internal static Color GetColor(Gordic.Report.Implementation.IGFormatGRRColor color)
        {
            color.getRGB(out int rgb);
            if (rgb == 0)
            {
                Report.Interface.GUnsafeRepWrapper.Throw06Error(color.isTransparent(out bool ct));
                if (ct) return Color.Transparent;
            }
            return ColorTranslator.FromWin32(rgb);
            //return Color.FromArgb(255, rgb&0xff, (rgb>>8)&0xff, (rgb>>16)&0xff);
        }

        /// <summary>èerná barva</summary>
        public static GFEColor Black { get => new GFEColor(Color.Black, "black"); }

        /// <summary>prùhledná</summary>
        public static GFEColor Transparent { get => new GFEColor(Color.Transparent, "transparent"); }

        static Dictionary<Color, string> _colors = new Dictionary<Color, string>()
            {
                {Color.Aqua, "aqua"},       //const int htmlAqua    = 0x00FFFF00; // aqua
                {Color.Black, "black"},     //const int htmlBlack   = 0x00000000; // black                
                {Color.Blue, "blue"},       //const int htmlBlue    = 0x00FF0000; // blue
                {Color.Fuchsia, "fuchsia"}, //const int htmlFuchsia = 0x00FF00FF; // fuchsia
                {Color.Gray, "gray"},       //const int htmlGray	  = 0x00808080; // gray
                {Color.Green, "green"},     //const int htmlGreen	  = 0x00008000; // green
                {Color.LightGreen, "#90ee90"}, // #90ee90   
                {Color.Lime, "lime"},       //const int htmlLime	  = 0x0000FF00; // lime
                {Color.Maroon, "maroon"},   //const int htmlMaroon  = 0x00000080; // maroon
                {Color.Navy, "navy"},       //const int htmlNavy	  = 0x00800000; // navy
                {Color.Olive, "olive"},     //const int htmlOlive	  = 0x00008080; // olive
                {Color.Purple, "purple"},   //const int htmlPurple  = 0x00800080; // purple
                {Color.Red, "red"},         //const int htmlRed     = 0x000000FF; // red
                {Color.Silver, "silver"},   //const int htmlSilver  = 0x00C0C0C0; // silver     //gray 25%
                {Color.Teal, "teal"},       //const int htmlTeal	  = 0x00808000; // teal
                {Color.White, "white"},     //const int htmlWhite	  = 0x00FFFFFF; // white
                {Color.Yellow, "yellow"},   //const int htmlYellow  = 0x0000FFFF; // yellow
                {Color.Transparent, "transparent"},   //const int htmlNone    = 0xFF000000; // transparent
                /* jen pripravene - symbolicka jmena pro takove barvy neexistuji
                const htmlGray40  = 0x00999999; // gray 40%
                const htmlGray35  = 0x00a6a6a6; // gray 35%
                const htmlGray30  = 0x00b3b3b3; // gray 30%
                const htmlGray20  = 0x00cccccc; // gray 20%
                const htmlGray15  = 0x00d9d9d9; // gray 15%
                const htmlGray10  = 0x00e6e6e6; // gray 10%
                const htmlGray05  = 0x00f3f3f3; // gray 5%
                */                
            };

        static Dictionary<string, Color> _ncolors = new Dictionary<string, Color>()
            {
                {"aqua", Color.Aqua},       //const int htmlAqua    = 0x00FFFF00; // aqua
                {"black", Color.Black},     //const int htmlBlack   = 0x00000000; // black                
                {"blue", Color.Blue},       //const int htmlBlue    = 0x00FF0000; // blue
                {"fuchsia", Color.Fuchsia}, //const int htmlFuchsia = 0x00FF00FF; // fuchsia
                {"gray", Color.Gray},       //const int htmlGray	  = 0x00808080; // gray
                {"green", Color.Green},     //const int htmlGreen	  = 0x00008000; // green
                {"#90ee90", Color.LightGreen},       //const int htmlLime	  = 0x0000FF00; #90ee90 // lime
                {"lime", Color.Lime},       //const int htmlLime	  = 0x0000FF00; // lime
                {"maroon", Color.Maroon},   //const int htmlMaroon  = 0x00000080; // maroon
                {"navy", Color.Navy},       //const int htmlNavy	  = 0x00800000; // navy
                {"olive", Color.Olive},     //const int htmlOlive	  = 0x00008080; // olive
                {"purple", Color.Purple},   //const int htmlPurple  = 0x00800080; // purple
                {"red", Color.Red},         //const int htmlRed     = 0x000000FF; // red
                {"silver", Color.Silver},   //const int htmlSilver  = 0x00C0C0C0; // silver     //gray 25%
                {"teal", Color.Teal},       //const int htmlTeal	  = 0x00808000; // teal
                {"white", Color.White},     //const int htmlWhite	  = 0x00FFFFFF; // white
                {"yellow", Color.Yellow},   //const int htmlYellow  = 0x0000FFFF; // yellow
                {"transparent", Color.Transparent}   //const int htmlNone    = 0xFF000000; // transparent
            };

        static int FromHex(char b)
        {
            if (b >= '0' && b <= '9') return b - '0';
            if (b >= 'A' && b <= 'F') return b + 10 - 'A';
            if (b >= 'a' && b <= 'f') return b + 10 - 'a';
            return 0;
        }

        static int FromHex(string s, int from, int len)
        {
            int r = 0;
            for (int i = from; i < from + len; i++)
            {
                r *= 16;
                r += FromHex(s[i]);
            }
            return r;
        }

        /// <summary>vrací barvu dle jména</summary>
        public static GFEColor Parse(string color)
        {
            if (color.Length > 1 && color[0] == '#')
            {
                int r = 0, g = 0, b = 0;
                if (color.Length == 7) { r = FromHex(color, 1, 2); g = FromHex(color, 3, 2); b = FromHex(color, 5, 2); }
                else if (color.Length == 4) { r = FromHex(color[1]); g = FromHex(color[2]); b = FromHex(color[3]); r = (r << 4) + r; g = (g << 4) + g; b = (b << 4) + b; }
                else throw new GException(29400001, 29450001, color); //RC-EX 29450001 : neznámá barva \"{0}\"
                return new GFEColor(Color.FromArgb(r, g, b), color);
            }

            foreach (var c in _colors)
                if (c.Value.Equals(color, StringComparison.InvariantCultureIgnoreCase)) return new GFEColor(c.Key, c.Value);
            throw new GException(29400002, 29450001, color); //RC-EX 29450001 : neznámá barva \"{0}\"
        }

        /// <exclude/>
        public override string ToString() => Name;

        /// <exclude/>
        public override bool Equals(object obj) => obj != null && this == (GFEColor)obj;

        /// <exclude/>
        public override int GetHashCode() => m_c.GetHashCode();

        /// <exclude/>
        public static bool operator ==(GFEColor c1, GFEColor c2) => c1.Color == c2.Color;

        /// <exclude/>
        public static bool operator !=(GFEColor c1, GFEColor c2) => c1.Color != c2.Color;
    }
    #endregion

    #region GFEEllipsis
    /// <summary>
    /// 
    /// </summary>
    public struct GFEEllipsis
    {
        private readonly bool m_multiLine;
        private readonly Grr06ElStyle m_style;
        private readonly char m_elChar;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="multiLine"></param>
        /// <param name="style"></param>
        /// <param name="elChar"></param>
        public GFEEllipsis(bool multiLine, Gordic.Report.Implementation.Grr06ElStyle style, char elChar)
        {
            m_multiLine = multiLine;
            m_style = style;
            m_elChar = elChar;
        }

        /// <summary>
        /// 
        /// </summary>
        public bool MultiLine { get => m_multiLine; }

        /// <summary>
        /// 
        /// </summary>
        public Gordic.Report.Implementation.Grr06ElStyle Style { get => m_style; }
        /// <summary>
        /// 
        /// </summary>
        public char EllipsisCharacter { get => ElChar; }

        public char ElChar => m_elChar;
    } // end struct
    #endregion

    #region GFEBorder
    /// <summary>
    /// Border
    /// </summary>
    public struct GFEBorder
    {
        readonly double m_width;
        /// <summary>Šíøka</summary>
        public double Width { get => m_width; }

        readonly Gordic.Report.Implementation.Grr06Metrics m_met;
        /// <summary>Metrika šíøky rámeèku</summary>
        public Gordic.Report.Implementation.Grr06Metrics WidthMetrics { get => m_met; }

        readonly string m_style;
        /// <summary>
        /// styl rámeèku
        /// </summary>
        public string Style { get => m_style; }

        GFEColor m_color;
        /// <summary>
        /// barva rámeèku
        /// </summary>
        public GFEColor Color { get => m_color; }

        /// <summary>
        /// Rameèek
        /// </summary>
        public GFEBorder(double width, Gordic.Report.Implementation.Grr06Metrics mtr, Gordic.Report.Implementation.Grr06BorderStyle style, GFEColor color)
            : this(width, mtr, ComplexDashStyle.Parse(style), color)
        {
        }
        /// <summary>
        /// vytvoøení tøídy dle parametrù
        /// </summary>
        /// <param name="width">šíøka rámeèku</param>
        /// <param name="mtr">metrika šíøky rámeèku</param>
        /// <param name="style">styl šíøky rámeèku</param>
        /// <param name="color">barva rámeèku</param>
        public GFEBorder(double width, Gordic.Report.Implementation.Grr06Metrics mtr, string style, GFEColor color)
        {
            m_width = width;
            m_met = mtr;
            m_style = style;
            m_color = color;
        }
        internal GFEBorder(Gordic.Report.Implementation.IGFormatGRRBorder border, double met, Gordic.Report.Implementation.Grr06Metrics mtr)
        {
            if (met > 0)
            { m_width = met; m_met = mtr; }
            else
            {
                border.getWidth(out int l_w);
                m_width = l_w;
                m_met = Gordic.Report.Implementation.Grr06Metrics.Twip;
            }

            if (m_width > 0)
            {
                Grr06BorderStyle style = Grr06BorderStyle.Solid;
                border.getStyle(out style);
                m_style = ComplexDashStyle.Parse(style);

                border.getColor(out IGFormatGRRColor l_color);
                try
                {
                    m_color = new GFEColor(l_color);
                } // end try
                finally
                {
                    Marshal.ReleaseComObject(l_color);
                } // end finally
            } // end if
            else
            {
                m_style = ComplexDashStyle.Solid;
                m_color = GFEColor.Black;
            }
        }
    } // end struct
    #endregion

    #region GFEFont
    /// <summary>
    /// 
    /// </summary>
    public class GFEFont : IDisposable
    {
        #region IDisposable
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
                if (FontFamily != null)
                {
                    FontFamily.Dispose();
                    FontFamily = null;
                }
        }
        ~GFEFont() { Dispose(false); }
        #endregion

        string m_fontname;
        GFEColor m_foreColor = GFEColor.Black, m_backColor = GFEColor.Transparent;

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            string m_fontfamilyName;
            if (FontFamily.FontFamily.Name == CommonService.Serif.Name)
                m_fontfamilyName = "times";
            else if (FontFamily.FontFamily.Name == CommonService.SansSerif.Name)
                m_fontfamilyName = "arial";
            else if (FontFamily.FontFamily.Name == CommonService.Monospace.Name)
                m_fontfamilyName = "courier";
            else
                m_fontfamilyName = FontFamily.FontFamily.Name;

            return string.Format('[' + GResources.GetResourceText(29450002) + ":{0}; " + GResources.GetResourceText(29450160) + ":{1}; " + GResources.GetResourceText(29450161) + ":{2}; " + GResources.GetResourceText(29450162) + ":{3}; " + GResources.GetResourceText(29450163) + ":{4}]", //RC 29450163 : øez písma
                m_fontfamilyName, Size.Value, m_foreColor.Color.Name, m_backColor.Color.Name, Convert.ToString(Style));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="fontfam"></param>
        /// <param name="size"></param>
        /// <param name="smet"></param>
        /// <param name="style"></param>
        /// <param name="un"></param>
        /// <param name="charset"></param>
        public GFEFont(FontFamily fontfam, double size, Grr06Metrics smet, FontStyle style, GraphicsUnit un, byte charset)
        {
            FontFamily = new GFEFontFamily(fontfam);
            Style = new GFEFontStyle(style);
            GdiCharSet = charset;
            switch (smet)
            {
                case Grr06Metrics.MMeters:
                    Size.Value = size + "mm";
                    break;
                case Grr06Metrics.Points:
                    Size.Value = size + "pt";
                    break;
                case Grr06Metrics.Twip:
                    Size.Value = size + "tw";
                    break;
                default:
                    Size.Value = Convert.ToString(size);
                    break;
            }
        }

        /// <exclude/>
        public GFEFont(string fontname, double size, Gordic.Report.Implementation.Grr06Metrics smet, FontStyle style, GraphicsUnit un, byte charset)
        {
            m_fontname = fontname;

            if (m_fontname.ToUpper() == "TIMES")
                m_fontname = System.Drawing.FontFamily.GenericSerif.Name;
            else if (m_fontname.ToUpper() == "ARIAL")
                m_fontname = System.Drawing.FontFamily.GenericSansSerif.Name;
            else if (m_fontname.ToUpper() == "COURIER")
                m_fontname = System.Drawing.FontFamily.GenericMonospace.Name;

            FontFamily = new GFEFontFamily(m_fontname);
            Style = new GFEFontStyle(style);
            GdiCharSet = charset;
            switch (smet)
            {
                case Grr06Metrics.MMeters:
                    Size.Value = size + "mm";
                    break;
                case Grr06Metrics.Points:
                    Size.Value = size + "pt";
                    break;
                case Grr06Metrics.Twip:
                    Size.Value = size + "tw";
                    break;
                default:
                    Size.Value = Convert.ToString(size);
                    break;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="fontname"></param>
        public GFEFont(string fontname)
        {
            m_fontname = fontname;

            if (m_fontname.ToUpper() == "TIMES")
                m_fontname = System.Drawing.FontFamily.GenericSerif.Name;
            else if (m_fontname.ToUpper() == "ARIAL")
                m_fontname = System.Drawing.FontFamily.GenericSansSerif.Name;
            else if (m_fontname.ToUpper() == "COURIER")
                m_fontname = System.Drawing.FontFamily.GenericMonospace.Name;

            FontFamily = new GFEFontFamily(m_fontname);
            Style = new GFEFontStyle(FontStyle.Regular);
            GdiCharSet = 0;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="copy"></param>
        public GFEFont(GFEFont copy)
        {
            if (copy == null)
            {
                FontFamily = new GFEFontFamily("arial");
                m_fontname = "arial";
                Size.Value = "2";
                Style = new GFEFontStyle(FontStyle.Regular);
                m_foreColor = new GFEColor(Color.Black, "Black");
                m_backColor = new GFEColor(Color.Transparent, "Transparent");
            }
            else
            {
                FontFamily = copy.FontFamily;
                m_fontname = copy.m_fontname;
                Style = new GFEFontStyle(copy.Style);
                GdiCharSet = copy.GdiCharSet;
                m_foreColor = new GFEColor(copy.m_foreColor);
                m_backColor = new GFEColor(copy.m_backColor);
                Size.Value = copy.Size.Value;
                Size.Point = copy.Size.Point;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public Font GetFont() => new Font(FontFamily.FontFamily.Name, Size.Point, Style.Style, Unit, GdiCharSet, GdiVerticalFont);

        /// <summary>
        /// 
        /// </summary>
        public GFEFontFamily FontFamily { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public GFEFontStyle Style { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public GFEColor ForeColor { get => m_foreColor; set { m_foreColor = value; } }

        /// <summary>
        /// 
        /// </summary>
        public GFEColor BackColor { get => m_backColor; set { m_backColor = value; } }

        /// <summary>
        /// Velikost písma
        /// </summary>
        public GFEFontSize Size { get; set; } = new GFEFontSize() { Value = "2" };

        /// <summary>
        /// 
        /// </summary>
        public GraphicsUnit Unit { get => GraphicsUnit.Point; }
        /// <summary>
        /// 
        /// </summary>
        public byte GdiCharSet { get; }
        /// <summary>
        /// 
        /// </summary>
        public bool GdiVerticalFont { get => false; }

        /// <summary>
        /// Pøetížení porovnání objektu s komponentou dané tøídy
        /// </summary>
        /// <param name="obj">Objekt, který se porovnává s daným</param>
        /// <returns>Pokud jsou stejné pak se vrací TRUE jinak FALSE</returns>
        public override bool Equals(object obj) => obj is GFEFont ffont && this == ffont;

        /// <summary>
        /// Pøetížení dané metody
        /// </summary>
        /// <returns></returns>
        public override int GetHashCode() => base.GetHashCode();
    }
    #endregion

    /// <summary>
    /// 
    /// </summary>
    public class GFEFontFamily : IDisposable
    {
        #region IDisposable
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
                if (FontFamily != null)
                {
                    FontFamily.Dispose();
                    FontFamily = null;
                }
        }
        ~GFEFontFamily() { Dispose(false); }
        #endregion

        /// <summary>
        /// 
        /// </summary>
        [Browsable(false)]
        public FontFamily FontFamily { get; set; } = FontFamily.GenericSansSerif;

        /// <summary>
        /// Název
        /// </summary>
        [Browsable(false), RefreshProperties(RefreshProperties.All)]
        public string Name { get => GetName(); set { FontFamily = new FontFamily(value); } }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="fontfam"></param>
        public GFEFontFamily(FontFamily fontfam)
        {
            FontFamily = fontfam;
        }

        /// <summary>
        /// Pøetížení konstruktéru
        /// </summary>
        /// <param name="orig">Originál stejné tøídy, dle hodnot kterého se vytváøí hodnoty pro danou tøídu</param>
        public GFEFontFamily(GFEFontFamily orig)
        {
            FontFamily = new FontFamily(orig.FontFamily.Name);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="fontname"></param>
        public GFEFontFamily(string fontname)
        {
            if (fontname == null || fontname.ToUpper() == "TIMES")
                FontFamily = new FontFamily(System.Drawing.Text.GenericFontFamilies.Serif);
            else if (fontname.ToUpper() == "ARIAL")
                FontFamily = new FontFamily(System.Drawing.Text.GenericFontFamilies.SansSerif);
            else if (fontname.ToUpper() == "COURIER")
                FontFamily = new FontFamily(System.Drawing.Text.GenericFontFamilies.Monospace);
            else if (ListOfFonts.Fonts.FirstOrNull(ft => ft.Equals(fontname)) != null)
                FontFamily = new FontFamily(fontname);
            else
                FontFamily = new FontFamily(System.Drawing.Text.GenericFontFamilies.Serif);
        }

        /// <exclude/>
        public override string ToString() => GetName();

        /// <summary>
        /// Název dle FontFamily
        /// </summary>
        /// <returns></returns>
        string GetName()
        {
            if (FontFamily.Name == CommonService.Serif.Name)
                return "times";
            else if (FontFamily.Name == CommonService.SansSerif.Name)
                return "arial";
            else if (FontFamily.Name == CommonService.Monospace.Name)
                return "courier";
            else
                return FontFamily.Name;
        }


        /// <summary>
        /// Pøetížení porovnání objektu s komponentou dané tøídy
        /// </summary>
        /// <param name="obj">Objekt, který se porovnává s daným</param>
        /// <returns>Pokud jsou stejné pak se vrací TRUE jinak FALSE</returns>
        public override bool Equals(object obj) => obj is GFEFontFamily family && this == family;

        /// <summary>
        /// Pøetížení dané metody
        /// </summary>
        /// <returns></returns>
        public override int GetHashCode() => base.GetHashCode();
    }

    /// <summary>
    /// 
    /// </summary>
    public class GFEFontStyle
    {
        /// <summary>
        /// 
        /// </summary>
        public FontStyle Style { get; set; } = FontStyle.Regular;
        /// <summary>
        /// 
        /// </summary>
        public bool Bold { get => (Style & FontStyle.Bold) > 0; }
        /// <summary>
        /// 
        /// </summary>
        public bool Italic { get => (Style & FontStyle.Italic) > 0; }
        /// <summary>
        /// 
        /// </summary>
        public bool Underline { get => (Style & FontStyle.Underline) > 0; }
        /// <summary>
        /// 
        /// </summary>
        public bool Strikeout { get => (Style & FontStyle.Strikeout) > 0; }
        /// <summary>
        /// 
        /// </summary>
        public bool Regular { get => (Style & FontStyle.Regular) > 0; }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="fontstyle"></param>
        public GFEFontStyle(FontStyle fontstyle)
        {
            Style = fontstyle;
        }

        /// <summary>
        /// Pøetížení konstruktéru
        /// </summary>
        /// <param name="orig">Originál stejné tøídy, dle hodnot kterého se vytváøí hodnoty pro danou tøídu</param>
        public GFEFontStyle(GFEFontStyle orig)
        {
            Style = orig.Style;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public override string ToString() => Style.ToString();

        /// <summary>
        /// Pøetížení porovnání objektu s komponentou dané tøídy
        /// </summary>
        /// <param name="obj">Objekt, který se porovnává s daným</param>
        /// <returns>Pokud jsou stejné pak se vrací TRUE jinak FALSE</returns>
        public override bool Equals(object obj) => obj is GFEFontStyle fstyle && this == fstyle;

        /// <summary>
        /// Pøetížení dané metody
        /// </summary>
        /// <returns></returns>
        public override int GetHashCode() => base.GetHashCode();
    }

    /// <summary>
    /// 
    /// </summary>
    [Serializable]
    public class GFEFormatStyle : IDisposable
    {
        #region IDisposable
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
                if (m_font != null)
                {
                    m_font.Dispose();
                    m_font = null;
                }
        }
        ~GFEFormatStyle() { Dispose(false); }
        #endregion

        [NonSerialized]
        readonly GFEAttrList m_atrs;
        [NonSerialized]
        GFEFont m_font;
        [NonSerialized]
        GFEColor m_fontcolor;
        [NonSerialized]
        GFEColor m_backcolor;
        readonly Gordic.Report.Implementation.Grr06HAlign m_halign;
        readonly Gordic.Report.Implementation.Grr06VAlign m_valign;
        [NonSerialized]
        Gordic.Report.Implementation.Grr06WidthsWithMet m_spacing;
        [NonSerialized]
        Gordic.Report.Implementation.Grr06WidthsWithMet m_padding;
        [NonSerialized]
        readonly GFEEllipsis m_ellipsis;
        [NonSerialized]
        GFEBorder m_lborder;
        [NonSerialized]
        GFEBorder m_rborder;
        [NonSerialized]
        GFEBorder m_tborder;
        [NonSerialized]
        GFEBorder m_bborder;

        /// <summary>
        /// 
        /// </summary>
        public GFEList Attributes { get => m_atrs; }

        /// <summary>
        /// 
        /// </summary>
        public GFEFont Font { get => m_font; }

        /// <summary>
        /// 
        /// </summary>
        public GFEColor FontColor { get => m_fontcolor; }

        /// <summary>
        /// 
        /// </summary>
        public GFEColor BackgroundColor { get => m_backcolor; }

        /// <summary>
        /// 
        /// </summary>
        public Gordic.Report.Implementation.Grr06VAlign VerticalAlign { get => m_valign; }

        /// <summary>
        /// 
        /// </summary>
        public Gordic.Report.Implementation.Grr06HAlign HorizontalAlign { get => m_halign; }

        /// <summary>
        /// 
        /// </summary>
        public Gordic.Report.Implementation.Grr06WidthsWithMet Spacing { get => m_spacing; }

        /// <summary>
        /// 
        /// </summary>
        public Gordic.Report.Implementation.Grr06WidthsWithMet Padding { get => m_padding; }

        /// <summary>
        /// 
        /// </summary>
        public GFEEllipsis Ellipsis { get => m_ellipsis; }

        /// <summary>
        /// 
        /// </summary>
        public GFEBorder LeftBorder { get => m_lborder; }

        /// <summary>
        /// 
        /// </summary>
        public GFEBorder RightBorder { get => m_rborder; }

        /// <summary>
        /// 
        /// </summary>
        public GFEBorder TopBorder { get => m_tborder; }

        /// <summary>
        /// 
        /// </summary>
        public GFEBorder BottomBorder { get => m_bborder; }

        internal GFEFormatStyle(Gordic.Report.Implementation.IGFormatGRRCellStyle style)
        {
            Report.Interface.GUnsafeRepWrapper.Throw06Error(style.getStyleAttributes(out IGAttrList list));
            try
            {
                m_atrs = new GFEAttrList(list);
            } // end try
            finally
            {
                Marshal.ReleaseComObject(list);
            } // end finally

            double l_fsize = 0;
            Gordic.Report.Implementation.Grr06Metrics l_fsizeMet = Gordic.Report.Implementation.Grr06Metrics.Unspec;
            Gordic.Report.Implementation.Grr06WidthsWithMet l_borderWidths;
            l_borderWidths.left = 0; l_borderWidths.right = 0; l_borderWidths.top = 0; l_borderWidths.bottom = 0;
            l_borderWidths.leftMet = 0; l_borderWidths.rightMet = 0; l_borderWidths.topMet = 0; l_borderWidths.bottomMet = 0;
            if (style is IGFormatGRRCellStyle14 st14)
            {
                Report.Interface.GUnsafeRepWrapper.Throw06Error(st14.getSpacing(out m_spacing));
                Report.Interface.GUnsafeRepWrapper.Throw06Error(st14.getPadding(out m_padding));
                Report.Interface.GUnsafeRepWrapper.Throw06Error(st14.getBorderWidths(out l_borderWidths));
                Report.Interface.GUnsafeRepWrapper.Throw06Error(st14.getFontSize(out l_fsize, out l_fsizeMet));
            }
            else
            {
                Report.Interface.GUnsafeRepWrapper.Throw06Error(style.getSpacing(out Grr06Widths spa));
                m_spacing.left = spa.left; m_spacing.leftMet = Grr06Metrics.Twip;
                m_spacing.top = spa.top; m_spacing.topMet = Grr06Metrics.Twip;
                m_spacing.right = spa.right; m_spacing.rightMet = Gordic.Report.Implementation.Grr06Metrics.Twip;
                m_spacing.bottom = spa.bottom; m_spacing.bottomMet = Gordic.Report.Implementation.Grr06Metrics.Twip;

                Report.Interface.GUnsafeRepWrapper.Throw06Error(style.getPadding(out Grr06Widths pad));
                m_padding.left = pad.left; m_padding.leftMet = Gordic.Report.Implementation.Grr06Metrics.Twip;
                m_padding.top = pad.top; m_padding.topMet = Gordic.Report.Implementation.Grr06Metrics.Twip;
                m_padding.right = pad.right; m_padding.rightMet = Gordic.Report.Implementation.Grr06Metrics.Twip;
                m_padding.bottom = pad.bottom; m_padding.bottomMet = Gordic.Report.Implementation.Grr06Metrics.Twip;
            }

            style.getFontSize(out int l_twsize);
            if (l_fsize == 0)
            {
                l_fsize = (float)(l_twsize / 20.0);
                l_fsizeMet = Gordic.Report.Implementation.Grr06Metrics.Points;
            }

            Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(style.getFontBold(out bool l_bold));
            Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(style.getFontItalic(out bool l_ital));
            Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(style.getFontUnderlined(out bool l_under));
            Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(style.getFontStrokeOut(out bool l_stroke));
            FontStyle l_style = FontStyle.Regular;
            if (l_bold) l_style |= FontStyle.Bold; // end if
            if (l_ital) l_style |= FontStyle.Italic; // end if
            if (l_under) l_style |= FontStyle.Underline; // end if
            if (l_stroke) l_style |= FontStyle.Strikeout; // end if

            Report.Interface.GUnsafeRepWrapper.Throw06Error(style.getFontCharset(out int l_charset));
            Report.Interface.GUnsafeRepWrapper.Throw06Error(style.getFontFaceIndex(out Grr06FontFace l_ffidx));
            switch (l_ffidx)
            {
                case Gordic.Report.Implementation.Grr06FontFace.Arial:
                    m_font = new GFEFont(FontFamily.GenericSansSerif, l_fsize, l_fsizeMet, l_style, GraphicsUnit.Point, (byte)l_charset);
                    break;
                case Gordic.Report.Implementation.Grr06FontFace.Times:
                    m_font = new GFEFont(FontFamily.GenericSerif, l_fsize, l_fsizeMet, l_style, GraphicsUnit.Point, (byte)l_charset);
                    break;
                case Gordic.Report.Implementation.Grr06FontFace.Courier:
                    m_font = new GFEFont(FontFamily.GenericMonospace, l_fsize, l_fsizeMet, l_style, GraphicsUnit.Point, (byte)l_charset);
                    break;
                default:
                    string l_ptr;
                    Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(style.getFontFace(out l_ptr));
                    m_font = new GFEFont(l_ptr, l_fsize, l_fsizeMet, l_style, GraphicsUnit.Point, (byte)l_charset);
                    break;
            } // end switch

            style.getFontColor(out IGFormatGRRColor l_color);
            try
            {
                m_fontcolor = new GFEColor(l_color);
            } // end try
            finally
            {
                Marshal.ReleaseComObject(l_color);
            } // end finally
            style.getBackColor(out l_color);
            try
            {
                m_backcolor = new GFEColor(l_color);
            } // end try
            finally
            {
                Marshal.ReleaseComObject(l_color);
            } // end finally

            Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(style.getHorzAlign(out m_halign));
            Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(style.getVertAlign(out m_valign));

            Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(style.getEllipsisStyle(out Grr06ElStyle l_els));
            Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(style.getEllipsisChar(out char l_char));
            Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(style.getMultiline(out bool l_multi));
            m_ellipsis = new GFEEllipsis(l_multi, l_els, l_char);
            Gordic.Report.Implementation.IGFormatGRRBorder l_b;
            Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(style.getBorderWidths(out Grr06Widths l_bs));
            if (l_bs.left > 0)
            {
                Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(style.getLeftBorder(out l_b));
                try
                {
                    m_lborder = new GFEBorder(l_b, l_borderWidths.left, l_borderWidths.leftMet);
                } // end try
                finally
                {
                    Marshal.ReleaseComObject(l_b);
                } // end finally
            } // end if
            if (l_bs.right > 0)
            {
                Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(style.getRightBorder(out l_b));
                try
                {
                    m_rborder = new GFEBorder(l_b, l_borderWidths.right, l_borderWidths.rightMet);
                } // end try
                finally
                {
                    Marshal.ReleaseComObject(l_b);
                } // end finally
            } // end if
            if (l_bs.top > 0)
            {
                Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(style.getTopBorder(out l_b));
                try
                {
                    m_tborder = new GFEBorder(l_b, l_borderWidths.top, l_borderWidths.topMet);
                } // end try
                finally
                {
                    Marshal.ReleaseComObject(l_b);
                } // end finally
            } // end if
            if (l_bs.bottom > 0)
            {
                Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(style.getBottomBorder(out l_b));
                try
                {
                    m_bborder = new GFEBorder(l_b, l_borderWidths.bottom, l_borderWidths.bottomMet);
                } // end try
                finally
                {
                    Marshal.ReleaseComObject(l_b);
                } // end finally
            } // end if

            //int getTextOrientation(out int orient); //(0-360)
        }
    }
}