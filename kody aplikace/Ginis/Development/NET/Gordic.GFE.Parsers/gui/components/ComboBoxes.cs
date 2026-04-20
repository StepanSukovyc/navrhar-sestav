//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ComboBoxes.cs                            </Name>
//    <Description> Rozvírací seznamy                                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-03-08                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.Drawing;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.General;
using System;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// Rozvírací seznam písma
    /// </summary>
    public class FontComboBox : ComboBox
    {
        /// <summary>
        /// Položka písma
        /// </summary>
        public sealed class FontDescriptor : IDisposable
        {
            #region IDisposable
            public void Dispose()
            {
                Dispose(true);
                GC.SuppressFinalize(this);
            }
            void Dispose(bool disposing)
            {
                if (disposing)
                    if (fontFamily != null)
                    {
                        fontFamily.Dispose();
                        fontFamily = null;
                    }
            }
            ~FontDescriptor() { Dispose(false); }
            #endregion

            readonly string name;
            /// <summary>
            /// Název písma
            /// </summary>
            public string Name { get { return name; } }

            bool isMonospaced;
            /// <summary>
            /// Indikuje strojopys
            /// </summary>
            public bool IsMonospaced { get { return isMonospaced; } }

            FontStyle fontStyle = FontStyle.Regular;
            /// <summary>
            /// Řez písma
            /// </summary>
            public FontStyle FontStyle { get { return fontStyle; } }

            FontFamily fontFamily;

            /// <summary>
            /// Položka písma
            /// </summary>
            private FontDescriptor() { }

            /// <summary>
            /// Vytvoření nové instance třídy
            /// </summary>
            /// <param name="fontFamily">písmo</param>
            public FontDescriptor(FontFamily fontFamily)
            {
                this.fontFamily = fontFamily;
                name = fontFamily.Name;
            }
            /// <summary>
            /// Název písma
            /// </summary>
            /// <param name="item">Název písma</param>
            public FontDescriptor(string item)
            {
                name = item;
                try { fontFamily = new FontFamily(item); }
                catch { }
                DetectStyle();
            }

            void DetectStyle()
            {
                if (fontFamily == null)
                    fontStyle = System.Drawing.FontStyle.Bold | System.Drawing.FontStyle.Regular;
                else
                {
                    if (fontFamily.IsStyleAvailable(FontStyle.Bold))
                        fontStyle |= System.Drawing.FontStyle.Bold;

                    if (fontFamily.IsStyleAvailable(FontStyle.Regular))
                        fontStyle |= System.Drawing.FontStyle.Regular;

                    if (fontFamily.IsStyleAvailable(FontStyle.Italic))
                        fontStyle |= System.Drawing.FontStyle.Italic;
                }

            }

            /// <summary>
            /// Indikace strojového písma
            /// </summary>
            /// <param name="g">Ovladač grafiky</param>
            public void DetectMonospaced(Graphics g)
            {
                isMonospaced = fontFamily == null ? false : DetectMonospaced(g, fontFamily);
            }

            static bool DetectMonospaced(Graphics g, FontFamily fontFamily)
            {
                using (Font f = new Font(fontFamily, 10))
                {
                    int w1 = TextRenderer.MeasureText("i.", f).Width;
                    int w2 = TextRenderer.MeasureText("mw", f).Width;
                    return w1 == w2;
                }
            }

            /// <summary>
            /// Řetězcová prezentace položky
            /// </summary>
            /// <returns></returns>
            public override string ToString() { return Name; }
        }

        /// <summary>
        /// Kreslení položky
        /// </summary>
        /// <param name="e">Argument kreslení</param>
        public void ComboBoxDrawItem(DrawItemEventArgs e)
        {
            FontDescriptor fontDescriptor = (FontDescriptor)Items[e.Index];
            e.Graphics.DrawString(fontDescriptor.Name,
                new Font(
                    fontDescriptor.Name,
                    e.Font.SizeInPoints,
                    fontDescriptor.FontStyle,
                    GraphicsUnit.Point),
                    new SolidBrush(Color.Black),
                    new Point(3, e.Bounds.Top));

            if (e.Index == 2)
                e.Graphics.DrawLine(SystemPens.ControlDark, new Point(2, e.Bounds.Bottom - 1), new Point(Width - 6, e.Bounds.Bottom - 1));
        }
    }

    /// <summary>
    /// Rozvírací seznam dostupných stylů písma
    /// </summary>
    public class FontStyleComboBox : ComboBox
    {
        /// <summary>
        /// Položka seznamu dostupných stylů
        /// </summary>
        public sealed class FontStyleDescription
        {
            readonly string description;
            /// <summary>
            /// Popis položky
            /// </summary>
            public string Description { get { return description; } }

            readonly FontStyle fontStyle;
            /// <summary>
            /// Styl položky
            /// </summary>
            public FontStyle FontStyle { get { return fontStyle; } }

            /// <summary>
            /// Prázdný konstruktor třídy
            /// </summary>
            public FontStyleDescription()
            {
                fontStyle = System.Drawing.FontStyle.Regular;
            }
            /// <summary>
            /// Konstruktor třídy
            /// </summary>
            /// <param name="item">Položka, dle které se třída vytváří</param>
            public FontStyleDescription(KeyValuePair<FontStyle, string> item)
            {
                description = item.Value;
                fontStyle = item.Key;
            }

            /// <summary>
            /// Převod na řetězec
            /// </summary>
            /// <returns>řetězec, prezentující danou položku</returns>
            public override string ToString() { return description; }
        }

        /// <summary>
        /// Kreslení položky
        /// </summary>
        /// <param name="e">Argument kreslení</param>
        public void ComboBoxDrawItem(DrawItemEventArgs e)
        {
            FontStyleDescription fi = (FontStyleDescription)Items[e.Index];
            e.Graphics.DrawString(fi.Description, new Font(this.Font, fi.FontStyle), new SolidBrush(Color.Black), new Point(3, e.Bounds.Top));
        }

        ///// <summary>
        ///// Aktualizace položek
        ///// </summary>
        //public void RefreshItemsThread()
        //{
        //    DebugTimer.Start();
        //    Items.Clear();
        //    List<FontStyleDescription> styles = new List<FontStyleDescription>();

        //    foreach (var item in ListOfFontStyles.Styles)
        //        styles.Add(new FontStyleDescription(item));

        //    DebugTimer.Stop("Získání konfigurovaných stylů písem");
        //    Items.AddRange(styles.ToArray());
        //}
        ///// <summary>
        ///// Reakce na změnu vybrané položky
        ///// </summary>
        ///// <param name="e">Argument metody</param>
        //protected override void OnSelectedIndexChanged(EventArgs e)
        //{
        //    if (SelectedIndex == -1)
        //        return;

        //    FontStyleDescription item = (FontStyleDescription)Items[SelectedIndex];
        //    Font = new Font(Font, item.FontStyle);
        //    base.OnSelectedIndexChanged(e);
        //}
    }

    /// <summary>
    /// Rozevírací seznam barev
    /// </summary>
    public class ColorComboBox : ComboBox
    {
        /// <summary>
        /// Typ barvy
        /// </summary>
        public enum ColorLocation
        {
            /// <summary>
            /// barva písma
            /// </summary>
            forecolor,
            /// <summary>
            /// barva pozadí
            /// </summary>
            backcolor,
            /// <summary>
            /// regulérní barva
            /// </summary>
            regular
        }

        /// <summary>
        /// Položka seznamu barev
        /// </summary>
        public sealed class ColorDescriptor
        {
            readonly Color color = Color.Transparent;
            /// <summary>
            /// Barva položky
            /// </summary>
            public Color Color { get { return color; } }

            readonly string description = GResources.GetResourceText(29450372); //RC 29450372 : průhledná
            /// <summary>
            /// Text popisu barvy položky.
            /// </summary>
            public string Description { get { return description; } }

            /// <summary>
            /// Prázdný konstruktor třídy
            /// </summary>
            public ColorDescriptor() { }

            /// <summary>
            /// Vytvoření nové instance třídy dle názvu barvy
            /// </summary>
            /// <param name="item">Název barvy</param>
            public ColorDescriptor(string item)
            {
                description = item;
                color = ColorService.GetGFEColor(item).Color;
            }

            /// <summary>
            /// Vytvoření nové instance třídy
            /// </summary>
            /// <param name="item">Key - český název barvy, Value - anglický název</param>
            public ColorDescriptor(KeyValuePair<string, string> item)
            {
                description = item.Key;
                if (ColorService.ColorNameColorEn.ContainsKey(item.Value))
                    color = ColorService.ColorNameColorEn[item.Value];
                else color = ColorService.HexToColor(item.Value);
            }

            /// <summary>
            /// Vytvoření nové instance třídy dle specifické barvy
            /// </summary>
            /// <param name="color">daná specifická barva</param>
            public ColorDescriptor(GFEColor color)
            {
                description = color.Name;
                this.color = color.Color;
            }

            /// <summary>
            /// Získání řetězcové prezentace barvy
            /// </summary>
            /// <returns>Řetězec, prezentuící vybranou barvu</returns>
            public override string ToString()
            {
                return description;
            }
        }

        ColorLocation locationcolor = ColorLocation.regular;
        /// <summary>
        /// Typ barvy
        /// </summary>
        public ColorLocation LocationColor { get { return locationcolor; } set { locationcolor = value; } }
        ///// <summary>
        ///// Aktualizace položek
        ///// </summary>
        //public void RefreshItemsThread()
        //{
        //    DebugTimer.Start();
        //    Items.Clear();
        //    List<ColorDescriptor> colors = new List<ColorDescriptor>();

        //    foreach (var item in ListOfColors.ColorsDictionary)
        //        colors.Add(new ColorDescriptor(item));

        //    DebugTimer.Stop("Získání konfigurovaných barev");
        //    Items.AddRange(colors.ToArray());
        //}

        /// <summary>
        /// Kreslení položky
        /// </summary>
        /// <param name="e">Argument kreslení</param>
        public void ComboBoxDrawItem(DrawItemEventArgs e)
        {
            ColorDescriptor item = (ColorDescriptor)Items[e.Index];

            Rectangle b = e.Bounds, c = e.Bounds;
            e.DrawBackground();
            SolidBrush foreBrush = (SolidBrush)SystemBrushes.ControlText;
            c.Width = e.Bounds.Height - 2;
            c.Height = e.Bounds.Height - 2;
            c.Y = e.Bounds.Top + 1;
            c.X = 1;
            e.Graphics.FillRectangle(new SolidBrush(item.Color), c);
            e.Graphics.DrawRectangle(SystemPens.Control, c);
            b.X += e.Bounds.Height;
            e.Graphics.DrawString(item.Description, SystemFonts.DefaultFont, foreBrush, b);
            e.DrawFocusRectangle();
        }
    }
}
