//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DrawHelper.cs                          </Name>
//    <Description> Pomocná tøída kreslení dokovaných oken a podoken            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-04                                                  </Created>
//  </FileHeader>

using System.Drawing;
using System.Drawing.Drawing2D;
using System.Windows.Forms;

namespace Gordic.GFE.Parsers.Docking
{
    /// <summary>
    /// Pomocná tøída kreslení dokovaných oken a podoken
    /// </summary>
	static class DrawHelper
	{
        /// <summary>
        /// Transformace ovladaèe dle zpùsobu kreslení: zlevá doprava, nebo obrácenì
        /// </summary>
        /// <param name="control">Ovladaè ke kreslení</param>
        /// <param name="point">Bod otoèení</param>
        /// <returns></returns>
        public static Point RtlTransform(Control control, Point point)
        {
            if (control.RightToLeft != RightToLeft.Yes)
                return point;
            else
                return new Point(control.Right - point.X, point.Y);
        }
        /// <summary>
        /// Transformace ovladaèe dle zpùsobu kreslení: zlevá doprava, nebo obrácenì
        /// </summary>
        /// <param name="control">Ovladaè ke kreslení</param>
        /// <param name="rectangle">Obdélník otoèení</param>
        /// <returns></returns>
        public static Rectangle RtlTransform(Control control, Rectangle rectangle)
        {
            if (control.RightToLeft != RightToLeft.Yes)
                return rectangle;
            else
                return new Rectangle(control.ClientRectangle.Right - rectangle.Right, rectangle.Y, rectangle.Width, rectangle.Height);
        }

        /// <summary>
        /// Kreslení záložky
        /// </summary>
        /// <param name="graphicsPath">Nástroje ke kreslení</param>
        /// <param name="rect">Obdélník kreslení</param>
        /// <param name="upCorner">Horní roh</param>
        /// <returns></returns>
        public static GraphicsPath GetRoundedCornerTab(GraphicsPath graphicsPath, Rectangle rect, bool upCorner)
        {
            if (graphicsPath == null)
                graphicsPath = new GraphicsPath();
            else
                graphicsPath.Reset();

            int curveSize = 6;
            if (upCorner)
            {
                graphicsPath.AddLine(rect.Left, rect.Bottom, rect.Left, rect.Top + curveSize / 2);
                graphicsPath.AddArc(new Rectangle(rect.Left, rect.Top, curveSize, curveSize), 180, 90);
                graphicsPath.AddLine(rect.Left + curveSize / 2, rect.Top, rect.Right - curveSize / 2, rect.Top);
                graphicsPath.AddArc(new Rectangle(rect.Right - curveSize, rect.Top, curveSize, curveSize), -90, 90);
                graphicsPath.AddLine(rect.Right, rect.Top + curveSize / 2, rect.Right, rect.Bottom);
            }
            else
            {
                graphicsPath.AddLine(rect.Right, rect.Top, rect.Right, rect.Bottom - curveSize / 2);
                graphicsPath.AddArc(new Rectangle(rect.Right - curveSize, rect.Bottom - curveSize, curveSize, curveSize), 0, 90);
                graphicsPath.AddLine(rect.Right - curveSize / 2, rect.Bottom, rect.Left + curveSize / 2, rect.Bottom);
                graphicsPath.AddArc(new Rectangle(rect.Left, rect.Bottom - curveSize, curveSize, curveSize), 90, 90);
                graphicsPath.AddLine(rect.Left, rect.Bottom - curveSize / 2, rect.Left, rect.Top);
            }

            return graphicsPath;
        }
        /// <summary>
        /// Získání nástrojù ke kreslení z obrázku
        /// </summary>
        /// <param name="bitmap">Obrázek</param>
        /// <returns></returns>
		public static GraphicsPath CalculateGraphicsPathFromBitmap(Bitmap bitmap)
		{
			return CalculateGraphicsPathFromBitmap(bitmap, Color.Empty);
		}
		/// <summary>
        /// Získání nástrojù ke kreslení z obrázku
		/// </summary>
		/// <param name="bitmap">Obrázek</param>
		/// <param name="colorTransparent">Barva prùhledností</param>
		/// <returns></returns>
		public static GraphicsPath CalculateGraphicsPathFromBitmap(Bitmap bitmap, Color colorTransparent) 
		{ 
			GraphicsPath graphicsPath = new GraphicsPath(); 
			if (colorTransparent == Color.Empty)
				colorTransparent = bitmap.GetPixel(0, 0);

            for (int row = 0; row < bitmap.Height; row++)
            {
                int colOpaquePixel = 0;
                for (int col = 0; col < bitmap.Width; col++)
                    if (bitmap.GetPixel(col, row) != colorTransparent)
                    {
                        colOpaquePixel = col;
                        int colNext = col;
                        for (colNext = colOpaquePixel; colNext < bitmap.Width; colNext++)
                            if (bitmap.GetPixel(colNext, row) == colorTransparent)
                                break;

                        graphicsPath.AddRectangle(new Rectangle(colOpaquePixel, row, colNext - colOpaquePixel, 1));
                        col = colNext;
                    }
            }
			return graphicsPath; 
		} 
	}
}
