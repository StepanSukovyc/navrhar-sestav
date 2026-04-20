//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        GFEFormat.cs                                </Name>
//    <Description> Parser formatu (ALF)                        </Description>
//    <Author>      Ing. Martin Aliger                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025  </Copyright>
//    <Created>     2006-10-05                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Parser formatu GRF
    /// </summary>
    public class GFEFormatGRF : GFEFormat
    {

        internal GFEFormatGRF(Gordic.Report.Implementation.IGFormatGRF fmt, GFETempDir temp)
            : base((Gordic.Report.Implementation.IGFormat)fmt, temp)
        {
            fmt.getPageCount(out m_pageCount);
        }

        readonly int m_pageCount;
        /// <summary>Poèet stran GRF formuláøe</summary>
        public int PageCount
        {
            get { return m_pageCount; }
        }

        /// <summary>
        /// Získá Rect pro element v GRF sestavì
        /// </summary>
        public GrfRect GetRect(Gordic.Report.Implementation.IGFormatTag t)
        {
            GrfRect rect;
            (m_fmt as Gordic.Report.Implementation.IGFormatGRF).getRect(t, out rect.rect, out rect.page1, out rect.page2);
            return rect;
        }

        /// <summary>
        /// Získá Row index pro element v GRF sestavì
        /// </summary>
        public int GetRowIndex(Gordic.Report.Implementation.IGFormatTag t)
        {
            (m_fmt as Gordic.Report.Implementation.IGFormatGRF).getRowIndex(t, out int res);
            return res;
        }

        public GFEFormatRegion FindMainRegion() => FindMainRegion(Root);
        private static GFEFormatRegion FindMainRegion(GFEFormatRegion reg)
        {
            foreach (var item in reg.Body)
            {
                if (item is GFEFormatRegion re)
                {
                    if (!re.GrfRect.IsEmpty) return reg;
                    var r = FindMainRegion(re);
                    if (r != null) return r;
                }
                else if (item is GFEFormatGRFBlock) return reg;
            }
            return null;
        }

    }

    /// <summary>Pomocná struktura pro uložení RECT+PAGE v GRF sestavách</summary>
    public struct GrfRect
    {
        /// <summary>RECT</summary>
        public Gordic.Report.Implementation.GrrRect rect;
        /// <summary>PAGE</summary>
        public int page1;
        /// <summary>PAGE</summary>
        public int page2;

        /// <summary>left</summary>
        public double Left { get { return rect.left; } }
        /// <summary>top</summary>
        public double Top { get { return rect.top; } }
        /// <summary>right</summary>
        public double Right { get { return rect.right; } }
        /// <summary>bottom</summary>
        public double Bottom { get { return rect.bottom; } }
        /// <summary>width</summary>
        public double Width { get { return rect.right-rect.left; } }
        /// <summary>height</summary>
        public double Height { get { return rect.bottom-rect.top; } }
        /// <summary>neco</summary>
        public bool IsEmpty { get { return rect.left == rect.right; } }
    }

}
