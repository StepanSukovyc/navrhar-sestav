//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.WordWrap.cs                              </Name>
//    <Description> Wrapování řetězce                                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-03-15                                                  </Created>
//  </FileHeader>

using System;
using System.Text;
using System.Drawing;

namespace Gordic.GFE.Parsers.Utils
{
    /// <summary>
    /// Wrapování řetězce
    /// </summary>
    public class WordWrap
    {
        private class Wrapper //: Gordic.WinForms.Controls.GTextWrapperGdiPlus
        {
            readonly Graphics graphics;
            public Wrapper(Graphics graphics) //: base(null)
            {
                this.graphics = graphics;
            }

            public Font Font { get; internal set; }
            public SizeF SizeF { get; internal set; }
            ///<summary>Velikost oblasti</summary>
            public float WidthF
            {
                //get { return WordWrap ? m_SizeF.Width : float.MaxValue; } //pokud neni WordWrap, sirka je nekonecna
                get { return SizeF.Width; }
            }
            internal StringFormat Format = new StringFormat(StringFormatFlags.MeasureTrailingSpaces | StringFormatFlags.NoWrap | StringFormatFlags.LineLimit);
            //protected override Graphics CreateGraphics()
            //{
            //    return graphics;
            //}
            //protected override void ReleaseGraphics(Graphics g)
            //{
            //}
            public SizeF MeasureString(string s, out int chars)
            {
                return Measure(graphics, s, out chars, new SizeF(WidthF /*+ 2 * m_xcomp*/, Int32.MaxValue/*Font.Height*/));
            }
            private SizeF Measure(Graphics graphics, string s, out int chars, SizeF size)
            {
                var size2 = size; // new SizeF(size.Width /*+ 2 * m_xcomp*/, Int32.MaxValue);
                var r = s.IndexOf('\n');
                if (r >= 0) s = s.Substring(0, r);

                //if (m_xcomp == 0)
                //{
                //    characterRanges = new CharacterRange[] { new CharacterRange(0, 1) };
                //    Format.SetMeasurableCharacterRanges(characterRanges);
                //    stringRegions = graphics.MeasureCharacterRanges("Wg", Font, Rect, Format);
                //    m_xcomp = stringRegions[0].GetBounds(graphics).Left - Location.X;
                //}
                bool empty = string.IsNullOrEmpty(s);
                if (empty) s = "x";
                var sz = graphics.MeasureString(s, Font, size2, Format, out chars, out int lines);
                if (chars == 0) return SizeF.Empty; //co jineho?
                if (empty) { chars = 0; sz = new SizeF(0, sz.Height); }
                System.Diagnostics.Debug.Assert(lines == 1);
                //var c = chars;
                if (chars == r) chars++;
                return sz;

                //string t = s.Substring(0, c);

                //System.Drawing.Region[] stringRegions;
                //CharacterRange[] characterRanges;
                //characterRanges = new CharacterRange[] { new CharacterRange(0, c) };
                //Format.SetMeasurableCharacterRanges(characterRanges);
                //stringRegions = graphics.MeasureCharacterRanges(t, Font, new RectangleF(LocationF, size2), Format);
                //var r0 = stringRegions[0].GetBounds(graphics);
                //m_xcomp = r0.Left - LocationF.X;
                //return r0.Size;
            }
        }

        private class Wrapper2
        {
            readonly Graphics graphics;
            public Wrapper2(Graphics graphics)
            {
                this.graphics = graphics;
            }
            public Font Font { get; internal set; }
            public SizeF SizeF { get; internal set; }
            ///<summary>Velikost oblasti</summary>
            public float WidthF => SizeF.Width;
            internal StringFormat Format = new StringFormat(StringFormatFlags.MeasureTrailingSpaces | StringFormatFlags.NoWrap | StringFormatFlags.LineLimit);
            public SizeF MeasureString(string s, out int chars, bool exact = false)
            {
                return Measure(graphics, s, out chars, new SizeF(WidthF /*+ 2 * m_xcomp*/, Int32.MaxValue/*Font.Height*/), exact);
            }
            private SizeF Measure(Graphics graphics, string s, out int chars, SizeF size, bool exact = false)
            {
                var size2 = size;
                var r = s.IndexOf('\n');
                var s0 = (r >= 0) ? s.Substring(0, r) : s;

                bool empty = string.IsNullOrEmpty(s0);
                if (empty) s0 = "x";
                var sz = graphics.MeasureString(s0, Font, size2, Format, out chars, out int lines);
                if (chars == 0) return SizeF.Empty; //co jineho?
                if (empty) { chars = 0; return new SizeF(0, sz.Height); }
                System.Diagnostics.Debug.Assert(lines == 1);
                if (chars == r) chars++;

                //novy vypocet
                string t = s.Substring(0, chars);
                var sz2 = graphics.MeasureString(t, Font, size2, StringFormat.GenericTypographic, out _, out _);

                if (exact == false)
                {
                    //pri vykreslení se to do vrácené velikosti nevejde!
                    sz2.Width += 3;  //korekce
                }

                return sz2;
            }
        }

        //private class Wrapper1 : Gordic.WinForms.Controls.GTextWrapperGdiPlus
        //{
        //    readonly Graphics graphics;
        //    public Wrapper1(Graphics graphics) : base(null)
        //    {
        //        this.graphics = graphics;
        //    }
        //    new public SizeF MeasureString(string s, out int chars)
        //    {
        //        return base.MeasureString(graphics, s, out chars);
        //    }

        //}


        public static SizeF Wrap1(Graphics graphics, string text, ref int pos, Font font, SizeF layoutArea, out int chars, bool exact = false)
        {
            var l_wrap = new Wrapper2(graphics)
            {
                SizeF = layoutArea,
                Font = font,
                //WordWrap = false,
            };

            int len = text.Length;
            var sz = l_wrap.MeasureString(text.Substring(pos), out chars, exact);
            if (pos + chars == len) { pos += chars; return sz; }

            int v = BreakLine(text, pos, chars);
            System.Diagnostics.Debug.Assert(v <= chars);
            if (v > 0)
            {
                sz = l_wrap.MeasureString(text.Substring(pos, v), out chars, exact);
            }
            pos += v;
            len -= v;
            while (len > 0 && text[pos] != '\n' && Char.IsWhiteSpace(text, pos)) { pos++; len--; }
            if (len > 0 && text[pos] == '\n') { pos++; len--; } //sezeru prave jeden newline

            return sz;
        }

        /// <summary>
        /// Rozčlenění textu na řádky dle písma
        /// </summary>
        /// <param name="graphics"></param>
        /// <param name="text">Originální text</param>
        /// <param name="font">Písmo</param>
        /// <param name="layoutArea">Maximální šířka oblasti</param>
        /// <param name="format">formát řetězce</param>
        /// <param name="longestLine">out delka nejdelsiho radku v px</param>
        /// <returns></returns>
        public static string Wrap(Graphics graphics, string text, Font font, SizeF layoutArea, StringFormat format, out float longestLine)
        {            
            text = text.TrimEnd();
            if (text.Length <= 0) { longestLine = 0; return text; }

            var l_wrap = new Wrapper(graphics)
            {
                //l_wrap.Text = text;
                SizeF = layoutArea,
                Font = font
            };
            //l_wrap.WordWrap = Gordic.WinForms.Controls.GTextWordWrap.words;
            ////m_wrap.TextAlign = TextAlign;

            int len = text.Length;
            var sz = l_wrap.MeasureString(text, out int c);
            longestLine = sz.Width;
            System.Diagnostics.Debug.Assert(c > 0);
            if (c == len) return text;

            //int c = l_wrap.Count - 1;
            //if (c <= 0) return text;
            StringBuilder sb = new StringBuilder();
            int pos = 0;
            //for (int i = 0; i < c; i++)
            //{
            //    sb.Append(l_wrap[i].Text);
            //    sb.Append(Environment.NewLine);
            //}
            //sb.Append(l_wrap[c].Text);
            while (true)
            {
                int v = BreakLine(text, pos, c);
                System.Diagnostics.Debug.Assert(v <= c);
                if (v <= 0)
                {
                    sb.Append(Environment.NewLine);
                    if (c == 0) break; //nemelo by nastat
                }
                else
                {
                    sb.Append(text, pos, v);
                    sb.Append(Environment.NewLine);
                }
                pos += v;
                len -= v;
                while (len > 0 && text[pos]!='\n' && Char.IsWhiteSpace(text, pos)) { pos++; len--; }
                if (len > 0 && text[pos] == '\n') { pos++; len--; } //sezeru prave jeden newline

                sz = l_wrap.MeasureString(text.Substring(pos), out c);
                longestLine = Math.Max(longestLine, sz.Width);
                System.Diagnostics.Debug.Assert(c > 0);
                if (c == len) break;
            }
            sb.Append(text, pos, len);

            //int pos, next;
            //// analýza každého řádku textu
            //for (pos = 0; pos < text.Length; pos = next)
            //{
            //    // najdeme konec řádku
            //    int eol = text.IndexOf(Environment.NewLine, pos);
            //    if (eol == -1)
            //        next = eol = text.Length;
            //    else
            //        next = eol + Environment.NewLine.Length;

            //    // kopírování tohoto řádku textu, dle potřeby rozdělíme na menší řádky
            //    if (eol > pos)
            //    {
            //        do
            //        {
            //            int len = eol - pos;
            //            // zjistíme novou velikost
            //            SizeF actualSize = graphics.MeasureString(text.Substring(pos, len), font);
            //            while (actualSize.Width > layoutArea.Width && len > 1)
            //            {
            //                len = BreakLine(text, pos, len - 1);
            //                if (len != -1)
            //                    actualSize = graphics.MeasureString(text.Substring(pos, len), font);
            //            }
            //            if (len <= 0)
            //                len = 1;

            //            sb.Append(text, pos, len);

            //            if (pos + len != text.Length)
            //                sb.Append(Environment.NewLine);

            //            // zkrácení mezer na koncí a začátku
            //            pos += len;
            //            while (pos < eol && Char.IsWhiteSpace(text[pos]))
            //                pos++;
            //        } while (eol > pos);
            //    }
            //    else sb.Append(Environment.NewLine); // prázdný řádek
            //}
            return sb.ToString();
        }

        ///// <summary>
        ///// Změna textu aby se vešel do zadané šířky
        ///// </summary>
        ///// <param name="text">Text pro modifikací</param>
        ///// <param name="width">Šířka, v symboléch, do které by se text měl modifikovat</param>
        ///// <returns>Modifikovaný text</returns>
        //public static string Wrap(string text, int width)
        //{
        //    int pos, next;
        //    StringBuilder sb = new StringBuilder();

        //    if (width < 1)
        //        return text;

        //    // analýza každého řádku textu
        //    for (pos = 0; pos < text.Length; pos = next)
        //    {
        //        // najdeme konec řádku
        //        int eol = text.IndexOf(Environment.NewLine, pos);
        //        if (eol == -1)
        //            next = eol = text.Length;
        //        else
        //            next = eol + Environment.NewLine.Length;

        //        // kopírování tohoto řádku textu, dle potřeby rozdělíme na menší řádky
        //        if (eol > pos)
        //        {
        //            do
        //            {
        //                int len = eol - pos;
        //                if (len > width)
        //                    len = BreakLine(text, pos, width);
        //                sb.Append(text, pos, len);
        //                sb.Append(Environment.NewLine);

        //                // zkrácení mezer na koncí a začátku
        //                pos += len;
        //                while (pos < eol && Char.IsWhiteSpace(text[pos]))
        //                    pos++;
        //            } while (eol > pos);
        //        }
        //        else sb.Append(Environment.NewLine); // prázdný řádek
        //    }
        //    return sb.ToString();
        //}
        /// <summary>
        /// Nalezení pozice pro zalomení textu.
        /// </summary>
        /// <param name="text">Řetězec obsahující řádek textu</param>
        /// <param name="pos">Index, kde řádek textu začíná</param>
        /// <param name="max">Maximální velikost řádku</param>
        /// <returns>Upravená delka řádku (bez mezer)</returns>
        static int BreakLine(string text, int pos, int max)
        {
            // najdeme poslední mezeru na řádku
            int i = max;
            while (i >= 0 && !Char.IsWhiteSpace(text[pos + i]))
                i--;

            // pokud mezera není nalezená, vrátíme maximální velikost
            if (i < 0)
                return max;

            // najdeme začátek mezery
            while (i >= 0 && Char.IsWhiteSpace(text[pos + i]))
                i--;

            // vrátíme délku textu před mezerou
            return i + 1;
        }

        /// <summary>
        /// Nalezení pozice pro zalomení textu.
        /// </summary>
        /// <param name="text">Řetězec, obsahující řádek textu</param>
        /// <param name="max">Maximální velikost řádku</param>
        /// <returns>Upravená delka řádku (bez mezer)</returns>
        public static int BreakLine(string text, int max)
        {
            // najdeme poslední mezeru na řádku
            int i = max;
            if (text.Length > i && !Char.IsWhiteSpace(text[i]))
                return max;

            while (i >= 0 && !Char.IsWhiteSpace(text[i]))
                i--;

            // pokud mezera není nalezená, vrátíme maximální velikost
            if (i < 0)
                return max;

            // najdeme začátek mezery
            while (i >= 0 && Char.IsWhiteSpace(text[i]))
                i--;

            // vrátíme délku textu před mezerou
            return i + 1;
        }


        //private static bool IsSeperator1(string text, int index)
        //{
        //    //return Char.IsWhiteSpace(text, index) || Char.IsPunctuation(text, index);
        //    var c = text[index];
        //    return (c == ' ' || c == '\n' || c == '-');
        //}
        //private static bool IsSeperator2(string text, int index)
        //{
        //    //return Char.IsWhiteSpace(text, index) || Char.IsPunctuation(text, index);
        //    var c = text[index];
        //    return
        //        (c < '0') //zahrnuje mezeru !"#$%&'()*+,-./
        //        || (c > '9' && c < 'A') // : ; < = > ? @
        //        ;
        //}
        //public static int WordWrapText(string text, int length)
        //{
        //    if (length == 0) return 0; //pro sychr
        //    var tl = text.Length;
        //    if (length >= tl) return length;
        //    var inplen = length;
        //    length--;
        //    if (Char.IsWhiteSpace(text, length)) //konci mezerou (nebo linebreak)
        //    {                                    //pripojim vsechny nasledne mezery
        //        length++;
        //        while (true)
        //        {
        //            if (text[length] == '\n' || Char.IsWhiteSpace(text, length) == false) break;
        //            length++;
        //            if (length >= tl) break;
        //        }
        //    }
        //    else                                 //nekonci mezerou
        //    {                                    //najdu posledni neberu nebo oddelovac
        //        while (true)
        //        {
        //            if (IsSeperator1(text, length)) break;
        //            length--;
        //            if (length < 0) //rozdeleni po slovech neproslo - neni zadny oddelovac!
        //            {
        //                length = inplen - 1;   //zkusim jeste druhy pruchod s jinymi oddelovaci
        //                while (true)
        //                {
        //                    if (IsSeperator2(text, length)) break;
        //                    length--;
        //                    if (length < 0) return inplen; //ani druhy pruchod - neni zadny oddelovac!
        //                }
        //                break;
        //            }
        //        }
        //        length++;
        //    }
        //    return length;
        //}

    }
}
