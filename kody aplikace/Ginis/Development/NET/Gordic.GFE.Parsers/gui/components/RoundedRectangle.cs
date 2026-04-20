//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.RoundedRectangle.cs                      </Name>
//    <Description> zaoblený čtyřhrán                                           </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-06-24                                                  </Created>
//  </FileHeader>

using System.Drawing;
using System.Drawing.Drawing2D;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// zaoblený čtyřhrán
    /// </summary>
    public abstract class RoundedRectangle
    {
        /// <summary>
        /// seznam stran ke kreslení
        /// </summary>
        public enum RectangleSides
        {
            None = 0, Left = 1, Top = 2, Bottom = 4, Right = 8,
            All = Left | Top | Bottom | Right
        }


        /// <summary>
        /// Kreslení objektu
        /// </summary>
        /// <param name="graphics"></param>
        /// <param name="pen"></param>
        /// <param name="x">pozice X</param>
        /// <param name="y">pozice y</param>
        /// <param name="width">šířka</param>
        /// <param name="height">výška</param>
        /// <param name="radius">poloměr zaoblení</param>
        /// <param name="corners">úhly</param>
        /// <param name="sides"></param>
        public static void DrawRectangle(Graphics graphics, Pen pen, float x, float y, float width, float height,
                                          int radius, ComplexSurroundCorners corners, RectangleSides sides)
        {
            float xw = x + width;
            float yh = y + height;
            float xwr = xw - radius;
            float yhr = yh - radius;
            float xr = x + radius;
            float yr = y + radius;
            int r2 = radius * 2;
            float xwr2 = xw - r2;
            float yhr2 = yh - r2;

            //levý horní roh
            if (radius != 0
                && ((RectangleSides.Top & sides) == RectangleSides.Top
                    || (RectangleSides.Left & sides) == RectangleSides.Left))
                if ((ComplexSurroundCorners.TopLeft & corners) == ComplexSurroundCorners.TopLeft)
                    graphics.DrawArc(pen, x, y, r2, r2, 180, 90);

            //horní okraj
            if ((RectangleSides.Top & sides) == RectangleSides.Top)
                graphics.DrawLine(pen, xr, y, xwr, y);

            //pravý horní roh
            if (radius != 0
                && ((RectangleSides.Top & sides) == RectangleSides.Top
                || (RectangleSides.Right & sides) == RectangleSides.Right))
                if ((ComplexSurroundCorners.TopRight & corners) == ComplexSurroundCorners.TopRight)
                    graphics.DrawArc(pen, xwr2, y, r2, r2, 270, 90);

            //pravý okraj
            if ((RectangleSides.Right & sides) == RectangleSides.Right)
                graphics.DrawLine(pen, xw, yr, xw, yhr);

            //pravý dolní roh
            if (radius != 0
                && ((RectangleSides.Right & sides) == RectangleSides.Right
                || (RectangleSides.Bottom & sides) == RectangleSides.Bottom))
                if ((ComplexSurroundCorners.BottomRight & corners) == ComplexSurroundCorners.BottomRight)
                    graphics.DrawArc(pen, xwr2, yhr2, r2, r2, 0, 90);

            //dolní okraj
            if ((RectangleSides.Bottom & sides) == RectangleSides.Bottom)
                graphics.DrawLine(pen, xwr, yh, xr, yh);

            //levý dolní roh
            if (radius != 0
                && ((RectangleSides.Bottom & sides) == RectangleSides.Bottom
                || (RectangleSides.Left & sides) == RectangleSides.Left))
                if ((ComplexSurroundCorners.BottomLeft & corners) == ComplexSurroundCorners.BottomLeft)
                    graphics.DrawArc(pen, x, yhr2, r2, r2, 90, 90);

            //levý okraj
            if ((RectangleSides.Left & sides) == RectangleSides.Left)
                graphics.DrawLine(pen, x, yhr, x, yr);
        }

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        /// <param name="x">pozice X</param>
        /// <param name="y">pozice y</param>
        /// <param name="width">šířka</param>
        /// <param name="height">výška</param>
        /// <param name="radius">poloměr zaoblení</param>
        /// <param name="corners">úhly</param>
        /// <returns></returns>
        public static GraphicsPath Create(float x, float y, float width, float height,
                                          int radius, ComplexSurroundCorners corners)
        {
            float xw = x + width;
            float yh = y + height;
            float xwr = xw - radius;
            float yhr = yh - radius;
            float xr = x + radius;
            float yr = y + radius;
            int r2 = radius * 2;
            float xwr2 = xw - r2;
            float yhr2 = yh - r2;

            GraphicsPath p = new GraphicsPath();
            p.StartFigure();

            //levý horní roh
            if ((ComplexSurroundCorners.TopLeft & corners) == ComplexSurroundCorners.TopLeft)
                p.AddArc(x, y, r2, r2, 180, 90);
            else
            {
                p.AddLine(x, yr, x, y);
                p.AddLine(x, y, xr, y);
            }

            //horní okraj
            p.AddLine(xr, y, xwr, y);

            //pravý horní roh
            if ((ComplexSurroundCorners.TopRight & corners) == ComplexSurroundCorners.TopRight)
                p.AddArc(xwr2, y, r2, r2, 270, 90);
            else
            {
                p.AddLine(xwr, y, xw, y);
                p.AddLine(xw, y, xw, yr);
            }

            //pravý okraj
            p.AddLine(xw, yr, xw, yhr);

            //pravý dolní roh
            if ((ComplexSurroundCorners.BottomRight & corners) == ComplexSurroundCorners.BottomRight)
                p.AddArc(xwr2, yhr2, r2, r2, 0, 90);
            else
            {
                p.AddLine(xw, yhr, xw, yh);
                p.AddLine(xw, yh, xwr, yh);
            }

            //dolní okraj
            p.AddLine(xwr, yh, xr, yh);

            //levý dolní roh
            if ((ComplexSurroundCorners.BottomLeft & corners) == ComplexSurroundCorners.BottomLeft)
                p.AddArc(x, yhr2, r2, r2, 90, 90);
            else
            {
                p.AddLine(xr, yh, x, yh);
                p.AddLine(x, yh, x, yhr);
            }

            //levý okraj
            p.AddLine(x, yhr, x, yr);

            p.CloseFigure();
            return p;
        }

        /// <exclude/>
        public static GraphicsPath Create(Rectangle rect, int radius, ComplexSurroundCorners c)
        { return Create(rect.X, rect.Y, rect.Width, rect.Height, radius, c); }

        /// <exclude/>
        public static GraphicsPath Create(int x, int y, int width, int height, int radius)
        { return Create(x, y, width, height, radius, ComplexSurroundCorners.All); }

        /// <exclude/>
        public static GraphicsPath Create(float x, float y, float width, float height, int radius)
        { return Create(x, y, width, height, radius, ComplexSurroundCorners.All); }

        /// <exclude/>
        public static GraphicsPath Create(Rectangle rect, int radius)
        { return Create(rect.X, rect.Y, rect.Width, rect.Height, radius); }

        /// <exclude/>
        public static GraphicsPath Create(int x, int y, int width, int height)
        { return Create(x, y, width, height, 5); }

        /// <exclude/>
        public static GraphicsPath Create(float x, float y, float width, float height)
        { return Create(x, y, width, height, 5); }

        /// <exclude/>
        public static GraphicsPath Create(Rectangle rect)
        { return Create(rect.X, rect.Y, rect.Width, rect.Height); }
    }
}
