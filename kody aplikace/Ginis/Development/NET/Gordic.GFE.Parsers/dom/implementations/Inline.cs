//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.Inline.cs                                </Name>
//    <Description> Inline flow                                                 </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2019-04-05                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Utils;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;

namespace Gordic.GFE.Parsers.Dom
{

    public interface IBlockContent
    {
        void ComputeBounds(ref SizeValue w, ref SizeValue h);
    }

    public interface IInlineContent : ITextHandler
    {
        InlineText InlineText { get; }
    }

    internal class InlineTextRecord
    {
        public PointF p;
        public int pos;
        public int len;
        public SizeF sz;
    }
    public class InlineText
    {
        public string s;
        internal List<InlineTextRecord> recs = new List<InlineTextRecord>();

        internal void Paint(Graphics graphics, Font drawFont, SolidBrush drawBrush, RectangleF layoutRectangle, StringFormat textFormat, float zoom = 1)
        {
            var f = StringFormat.GenericTypographic;
            //var f = new StringFormat(StringFormat.GenericTypographic);
            //f.FormatFlags |= StringFormatFlags.NoClip | StringFormatFlags.NoWrap;
            foreach (var ip in recs)
            {
                graphics.DrawString(s.Substring(ip.pos, ip.len), drawFont, drawBrush, zoom * ip.p.X + layoutRectangle.X, zoom*ip.p.Y + layoutRectangle.Y, f);
#if DEBUG
                //graphics.DrawLine(Pens.BlueViolet, zoom * ip.p.X + layoutRectangle.X, zoom * ip.p.Y + layoutRectangle.Y, zoom * ip.p.X + layoutRectangle.X, zoom * ip.p.Y + layoutRectangle.Y + 22);
#endif
            }
        }

        internal void Add(PointF p, int pos, int len, SizeF sz)
        {
            Add(new InlineTextRecord() { p = p, pos = pos, len = len, sz = sz });
        }
        internal void Add(InlineTextRecord r) { recs.Add(r); }
        internal void Remove(InlineTextRecord r) { recs.Remove(r); }

        internal bool IsInPos(float x, float y, float zoom = 1)
        {
            foreach (var ip in recs)
            {
                if (x >= zoom * ip.p.X && y >= zoom * ip.p.Y
                    && x <= zoom * (ip.p.X + ip.sz.Width) && y <= zoom * (ip.p.Y + ip.sz.Height))
                    return true;
            }
            return false;
        }
    }

    /// <summary>
    /// Inline flow
    /// </summary>
    public static class InlineService
    {

        public static float ComputeInlineFlow(DefaultAbstractContent content, Graphics computeGraphics, IEnumerable<ITagComponent> children, SizeValue gap = default)
        {
            var l = content.Left + content.Padding.LeftPixels;
            var t = content.Top + content.Padding.TopPixels;
            var w = content.Width - content.Padding.LeftPixels - content.Padding.RightPixels;
            if (w <= 0) w = SizeValue.Empty;
            var h = content.Height - content.Padding.TopPixels - content.Padding.BottomPixels;
            if (h <= 0) h = SizeValue.Empty;
            return ComputeInlineFlow(content, l, t, w, h, computeGraphics, children, gap) + content.Padding.TopPixels + content.Padding.BottomPixels;
        }

        public static float ComputeInlineFlow(DefaultAbstractContent content, SizeValue pLeft, SizeValue pTop, SizeValue pWidth, SizeValue pHeight, Graphics computeGraphics, IEnumerable<ITagComponent> children, SizeValue gap = default)
        {
            SizeValue x = pLeft;
            SizeValue y = pTop;
            SizeValue w = pWidth;
            SizeValue h = pHeight;
            SizeValue rh = 0;
            foreach (var c in children)
            {
                IDefaultDataItem item = null;
                (c as DefaultAbstractContent)?.DrawPrepare(computeGraphics, ref item);

                var cw = w;
                var ch = h;

                if (c is IInlineContent ic)
                {
                    //pres cely container
                    c.Left = pLeft;
                    c.Top = pTop;
                    c.Width = pWidth;
                    c.Height = pHeight;
                    //uvnitr si spocitam inlines
                    ComputeInlineBounds(ic, computeGraphics, ref x, ref y, ref rh, pLeft, pWidth, pTop, pHeight);
                }
                else
                {
                    c.Left = x;
                    c.Top = y;
                    ComputeBounds(c, computeGraphics, ref cw, ref ch);
                    if (cw > w)
                    {
                        x = pLeft + cw;
                        w = pWidth - cw;
                        y += rh;
                        rh = ch;
                    }
                    else
                    {
                        w -= cw;
                        x += cw;
                        rh = Math.Max(rh, ch);
                    }
                    c.Width = cw;
                    c.Height = ch;
                }
                c.Padding.AllValue = "0";
                c.Surround.Initialize();
                if (gap.IsEmpty  == false)
                {
                    x += gap;
                    w -= gap;
                }

            }
            var l_ContentHeight = (float)y + (float)rh - (float)pTop;
            VerticalAlign(content, children, l_ContentHeight);
            HorizontalAlign(computeGraphics, content, children);
            return l_ContentHeight;
        }

        public static void VerticalAlign(DefaultAbstractContent content, IEnumerable<ITagComponent> children, float contentHeight)
        {
            float oy = 0;
            switch (content.Text.Align.Vertical)
            {
                case VAlign.center: oy = (content.Height - contentHeight - content.Padding.TopPixels - content.Padding.BottomPixels) / 2; break;
                case VAlign.bottom: oy = (content.Height - contentHeight - content.Padding.TopPixels - content.Padding.BottomPixels); break;
            }
            //if (oy < 0) oy = 0;
            foreach (var c in children)
            {
                c.Top += oy;
                c.Height = contentHeight;
                if (c is ITextHandler t) t.Text.Align.Vertical = VAlign.top;
            }
        }

        public static void HorizontalAlign(Graphics computeGraphics, DefaultAbstractContent content, IEnumerable<ITagComponent> children)
        {
            List<(InlineText t, InlineTextRecord i)> rems = null;
            List<(InlineText t, InlineTextRecord i)> adds = null;

            float y = 0;
            var l_ips = new List<(ITagComponent,InlineTextRecord)>();
            foreach (var ch in children)
            {
                var i = (ch as ITextHandler)?.Text?.Inline;
                if (i == null)
                    l_ips.Add((ch, null));
                else
                    foreach (var ip in i.recs)
                    {
                        if (ip.p.Y != y) { HorizontalAlign(computeGraphics, content, l_ips, false, ref rems, ref adds); l_ips.Clear(); y = ip.p.Y; }
                        l_ips.Add((ch, ip));
                    }
            }
            HorizontalAlign(computeGraphics, content, l_ips, true, ref rems, ref adds);

            if (rems != null)
                foreach (var r in rems)
                    r.t.Remove(r.i);
            if (adds != null)
                foreach (var a in adds)
                    a.t.Add(a.i);
        }

        private static void HorizontalAlign(Graphics computeGraphics, DefaultAbstractContent content, List<(ITagComponent c, InlineTextRecord i)> ips, bool last, ref List<(InlineText t, InlineTextRecord i)> rems, ref List<(InlineText t, InlineTextRecord i)> adds)
        {
            if (ips.Count == 0) return;

            switch (content.Text.Align.Horizontal)
            {
                case HAlign.justify:
                    if (!last) JustifyInline(computeGraphics, content, ips, ref rems, ref adds); //posledni radek nezarovnavam do bloku
                    return;
            }

            var fip = ips.First();
            var lip = ips.Last();
            var left = (float)fip.c.Left + (fip.i == null ? 0 : fip.i.p.X);
            var right = (float)lip.c.Left + (lip.i == null ? (float)lip.c.Width : lip.i.p.X + lip.i.sz.Width);
            var w = right - left;
            float ox = 0;
            switch (content.Text.Align.Horizontal)
            {
                case HAlign.center: ox = (content.Width - w - content.Padding.LeftPixels - content.Padding.RightPixels) / 2; break;
                case HAlign.right: ox = (content.Width - w - content.Padding.LeftPixels - content.Padding.RightPixels); break;
            }
            //if (ox > 0)
            {
                foreach (var ip in ips)
                {
                    if (ip.i != null)
                        ip.i.p = new PointF(ip.i.p.X + ox, ip.i.p.Y);
                    else
                        ip.c.Left += ox;
                    if (ip.c is ITextHandler t) t.Text.Align.Horizontal= HAlign.left;
                }
            }
        }

        private static void JustifyInline(Graphics computeGraphics, DefaultAbstractContent content, List<(ITagComponent c, InlineTextRecord i)> ips, ref List<(InlineText t, InlineTextRecord i)> rems, ref List<(InlineText t, InlineTextRecord i)> adds)
        {
            //uprava vsech radek na vypusteni pocatecnich a koncovych mezer
            foreach (var ip in ips)
            {
                var text = (ip.c as ITextHandler)?.Text;
                var i = text?.Inline;
                var b = ip.i.pos;
                var e = ip.i.pos + ip.i.len;
                bool mod = false;
                while (b < e && i.s[b] == ' ') { b++; mod = true; }
                while (e > b && i.s[e - 1] == ' ') { e--; mod = true; }
                if (mod)
                {
                    ip.i.pos = b;
                    ip.i.len = e - b;
                    using (Font drawFont = TagText.DrawFontFromTextFont(text.TextFont))
                    {
                        int pos = 0;
                        ip.i.sz = WordWrap.Wrap1(computeGraphics, i.s.Substring(b, e - b), ref pos, drawFont, new SizeF(float.MaxValue, float.MaxValue), out _);
                    }
                }
            }

            var lip = ips.LastOrDefault(i => i.i != null);
            if (lip.c == null) return;

            var ltext = (lip.c as ITextHandler)?.Text.Text;
            System.Diagnostics.Debug.Assert(ltext.Length >= lip.i.pos + lip.i.len); if (ltext.Length < lip.i.pos + lip.i.len) return; //nemel by tam byt konec retezce
            if (ltext[lip.i.pos + lip.i.len] == '\n') //radek konci tvrdym enterem
                return; //nebudu upravovat (necham zarovnani doleva)

            float ox = content.Width - lip.i.p.X - lip.i.sz.Width - content.Padding.LeftPixels - content.Padding.RightPixels;
            if (ox < 1 /*tolerance*/) return;

            int c = -1; //odectu mezeru za poslednim contentem
            foreach (var ip in ips)
            {
                var i = (ip.c as ITextHandler)?.Text?.Inline;
                var s = i.s.Substring(ip.i.pos, ip.i.len);
                c += s.Count(ch => ch == ' ');
                c++; //inter-content space
            }
            if (c < 1) return;

            var aox = ox / c;

            var x = ips.First().i.p.X;
            var oldx = x;
            foreach (var ip in ips)
            {
                JustifyInline(computeGraphics, ip.c, ip.i, aox, ref oldx, ref x, ref rems, ref adds);
            }
        }

        private static void JustifyInline(Graphics computeGraphics, ITagComponent c, InlineTextRecord ip, float aox, ref float oldx, ref float x, ref List<(InlineText t, InlineTextRecord i)> rems, ref List<(InlineText t, InlineTextRecord i)> adds)
        {
            var text = (c as ITextHandler)?.Text;
            var i = text.Inline;
            var s = i.s.Substring(ip.pos, ip.len);
            x += ip.p.X - oldx; //posun puvodnich rec od sebe
            oldx = ip.p.X;

            int bj = 0;
            using (Font drawFont = TagText.DrawFontFromTextFont(text.TextFont))
            {
                for (int j = 0; j < s.Length; j++)
                {
                    var ch = s[j];
                    if (ch == ' ')
                    {
                        int pos = 0;
                        var sz = WordWrap.Wrap1(computeGraphics, s.Substring(bj, j - bj), ref pos, drawFont, new SizeF(float.MaxValue, float.MaxValue), out _, exact: true);

                        if (adds == null) adds = new List<(InlineText t, InlineTextRecord i)>();
                        adds.Add((i, new InlineTextRecord() { p = new PointF(x, ip.p.Y), pos = ip.pos + bj, len = j - bj, sz = sz }));

                        x += sz.Width + aox; //here is the shift
                        bj = j;
                    }
                }

                {
                    int pos = 0;
                    var sz = WordWrap.Wrap1(computeGraphics, s.Substring(bj), ref pos, drawFont, new SizeF(float.MaxValue, float.MaxValue), out _, exact: true);

                    if (adds == null) adds = new List<(InlineText t, InlineTextRecord i)>();
                    adds.Add((i, new InlineTextRecord() { p = new PointF(x, ip.p.Y), pos = ip.pos + bj, len = ip.len - bj, sz = sz }));

                    x += sz.Width + aox;
                }
            }

            oldx += ip.sz.Width;
            if (rems == null) rems = new List<(InlineText t, InlineTextRecord i)>();
            rems.Add((i, ip));
        }


        public static void ComputeInlineBounds(IInlineContent content, Graphics computeGraphics, ref SizeValue x, ref SizeValue y, ref SizeValue h, SizeValue parentLeft, SizeValue parentWidth, SizeValue parentTop, SizeValue parentHeight)
        {
            var rect = new SizeF(parentWidth - x + parentLeft, parentHeight - y + parentTop);
            using (Font drawFont = TagText.DrawFontFromTextFont(content.Text.TextFont))
            {
                var s = content.Text.Text;
                var i = new InlineText() { s = s };
                int pos = 0;
                if (!content.Text.MultiLine)
                {
                    var r = s.IndexOf('\n');
                    if (r < 0) r = s.Length - 1;
                    s = s.Substring(0, WordWrap.BreakLine(s, r) + 1);
                    if (s.EndsWith("\n"))
                    {
                        switch (content.Text.Ellipsis.Style)
                        {
                            case ElStyle.dots:
                                i.s = s.Replace("\n", "\u2026");
                                break;
                            case ElStyle.fill:
                                i.s = new string(content.Text.Ellipsis.Char, 1000);
                                break;
                        }
                    }
                    var sz = WordWrap.Wrap1(computeGraphics, s, ref pos, drawFont, rect, out _);
                    x += sz.Width;
                    h = Math.Max(h, sz.Height);
                }
                else
                {
                    while (true)
                    {
                        var opos = pos;
                        var sz = WordWrap.Wrap1(computeGraphics, s, ref pos, drawFont, rect, out var chars);
                        i.Add(new PointF(x - parentLeft, y - parentTop), opos, chars, sz);
                        x += sz.Width;
                        h = Math.Max(h, sz.Height);
                        if (pos >= s.Length) break;

                        x = parentLeft;
                        y += h;
                        h = 0;
                        rect = new SizeF(parentWidth - x + parentLeft, parentHeight - y + parentTop);
                    }
                }
                content.Text.Inline = i;
            }
        }

        public static void ComputeBounds(ITagComponent content, Graphics computeGraphics, ref SizeValue w, ref SizeValue h)
        {
            if (content is IBlockContent bc)
                bc.ComputeBounds(ref w, ref h);
            else
            {
                var cw = content.Width;
                if (!cw.IsEmpty) w = cw;

                var ch = content.Height;
                if (!ch.IsEmpty) h = ch;
            }
        }
    }
}
