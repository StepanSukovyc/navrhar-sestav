//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.PFrame.cs                              </Name>
//    <Description>                                                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                             </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025                  </Copyright>
//    <Created>     2010-07-22                                                  </Created>
//  </FileHeader>

using System.Drawing;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Gui;
using System.Linq;

namespace Gordic.GFE.WinClient.Gui.PropertyPanels
{
    /// <summary>
    /// 
    /// </summary>
    partial class PFrame : Panel
    {
        /// <summary>
        /// 
        /// </summary>
        public URComplexSurround Border { get; set; }

        /// <summary>
        /// Buffer pro kreslení komponenty
        /// </summary>
        private Bitmap _backBuffer;

        /// <exclude/>
        protected override void OnPaint(PaintEventArgs e)
        {
            if (!DesignMode && Border != null)
            {
                if (_backBuffer == null)
                {
                    //kreslení komponenty
                    _backBuffer = new Bitmap(this.Width, this.Height);
                    Graphics graphics = Graphics.FromImage(_backBuffer);
                    graphics.Clear(Color.Transparent);

                    DrawGray(graphics);

                    if (Border.Width.LeftPixels != 0)
                        using (Pen pen = new Pen(Border.FrameColor.LeftValue.Color, (float)Border.Width.LeftPixels))
                        {
                            pen.DashPattern = ComplexDashStyle.GetDashPattern(Border.DashStyle.LeftValue);
                            // prázdné pole je hodnota "nespecifikováno"
                            if (pen.DashPattern.Length > 0
                                // záporná hodnota v poli nesmí být - jinak se jedná o "nespecifikováno"
                                && pen.DashPattern.Min() >= 0)
                            {
                                // hodnota 0 znamená že se jedná o dvojitou čáru
                                if (pen.DashPattern.Min() > 0)
                                    graphics.DrawLine(pen, new PointF(15, 15), new PointF(15, Height - 20));
                                else
                                // kreslíme dvojitou čáru
                                {
                                    pen.DashStyle = System.Drawing.Drawing2D.DashStyle.Custom;
                                    double w = Border.Width.RightPixels;
                                    using (Pen subPen = new Pen(Border.FrameColor.RightValue.Color, (float)w / 4))
                                    {
                                        graphics.DrawLine(subPen, new PointF(Width - 20 - (float)w / 2, 15), new PointF(Width - 20 - (float)w / 2, Height - 20));
                                        graphics.DrawLine(subPen, new PointF(Width - 20 + (float)w / 4, 15), new PointF(Width - 20 + (float)w / 4, Height - 20));
                                    }
                                }
                            }
                        }

                    if (Border.Width.RightPixels != 0)
                        using (Pen pen = new Pen(Border.FrameColor.RightValue.Color, (float)Border.Width.RightPixels))
                        {
                            pen.DashPattern = ComplexDashStyle.GetDashPattern(Border.DashStyle.RightValue);
                            // prázdné pole je hodnota "nespecifikováno"
                            if (pen.DashPattern.Length > 0
                                // záporná hodnota v poli nesmí být - jinak se jedná o "nespecifikováno"
                                && pen.DashPattern.Min() >= 0)
                            {
                                // hodnota 0 znamená že se jedná o dvojitou čáru
                                if (pen.DashPattern.Min() > 0)
                                    graphics.DrawLine(pen, new PointF(Width - 20, 15), new PointF(Width - 20, Height - 20));
                                else
                                // kreslíme dvojitou čáru
                                {
                                    pen.DashStyle = System.Drawing.Drawing2D.DashStyle.Custom;
                                    double w = Border.Width.RightPixels;
                                    using (Pen subPen = new Pen(Border.FrameColor.RightValue.Color, (float)w / 4))
                                    {
                                        graphics.DrawLine(subPen, new PointF(Width - 20 - (float)w / 2, 15), new PointF(Width - 20 - (float)w / 2, Height - 20));
                                        graphics.DrawLine(subPen, new PointF(Width - 20 + (float)w / 4, 15), new PointF(Width - 20 + (float)w / 4, Height - 20));
                                    }
                                }
                            }
                        }

                    if (Border.Width.TopPixels != 0)
                        using (Pen pen = new Pen(Border.FrameColor.TopValue.Color, (float)Border.Width.TopPixels))
                        {
                            pen.DashPattern = ComplexDashStyle.GetDashPattern(Border.DashStyle.TopValue);
                            // prázdné pole je hodnota "nespecifikováno"
                            if (pen.DashPattern.Length > 0
                                // záporná hodnota v poli nesmí být - jinak se jedná o "nespecifikováno"
                                && pen.DashPattern.Min() >= 0)
                            {
                                // hodnota 0 znamená že se jedná o dvojitou čáru
                                if (pen.DashPattern.Min() > 0)
                                    graphics.DrawLine(pen, new PointF(15, 15), new PointF(Width - 20, 15));
                                else
                                // kreslíme dvojitou čáru
                                {
                                    pen.DashStyle = System.Drawing.Drawing2D.DashStyle.Custom;
                                    double w = Border.Width.TopPixels;
                                    using (Pen subPen = new Pen(Border.FrameColor.TopValue.Color, (float)w / 4))
                                    {
                                        graphics.DrawLine(subPen, new PointF(15, 15 - (float)w / 2), new PointF(Width - 20, 15 - (float)w / 2));
                                        graphics.DrawLine(subPen, new PointF(15, 15 + (float)w / 4), new PointF(Width - 20, 15 + (float)w / 4));
                                    }
                                }
                            }
                        }

                    if (Border.Width.BottomPixels != 0)
                        using (Pen pen = new Pen(Border.FrameColor.BottomValue.Color, (float)Border.Width.BottomPixels))
                        {
                            pen.DashPattern = ComplexDashStyle.GetDashPattern(Border.DashStyle.BottomValue);
                            // prázdné pole je hodnota "nespecifikováno"
                            if (pen.DashPattern.Length > 0
                                // záporná hodnota v poli nesmí být - jinak se jedná o "nespecifikováno"
                                && pen.DashPattern.Min() >= 0)
                            {
                                // hodnota 0 znamená že se jedná o dvojitou čáru
                                if (pen.DashPattern.Min() > 0)
                                    graphics.DrawLine(pen, new PointF(15, Height - 20), new PointF(Width - 20, Height - 20));
                                else
                                // kreslíme dvojitou čáru
                                {
                                    pen.DashStyle = System.Drawing.Drawing2D.DashStyle.Custom;
                                    double w = Border.Width.BottomPixels;
                                    using (Pen subPen = new Pen(Border.FrameColor.BottomValue.Color, (float)w / 4))
                                    {
                                        graphics.DrawLine(subPen, new PointF(15, Height - 20 - (float)w / 2), new PointF(Width - 20, Height - 20 - (float)w / 2));
                                        graphics.DrawLine(subPen, new PointF(15, Height - 20 + (float)w / 4), new PointF(Width - 20, Height - 20 + (float)w / 4));
                                    }
                                }
                            }
                        }
                }

                //Copy the back buffer to the screen
                e.Graphics.DrawImageUnscaled(_backBuffer, 0, 0);
            }
            else base.OnPaint(e);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="e"></param>
        protected override void OnInvalidated(InvalidateEventArgs e)
        {
            if (_backBuffer != null)
            {
                _backBuffer.Dispose();
                _backBuffer = null;
            }

            base.OnInvalidated(e);
        }

        void DrawGray(Graphics graphics)
        {
            using (SolidBrush brush = new SolidBrush(Color.Gray))
            using (Pen pen = new Pen(brush))
            {
                graphics.DrawLines(pen, new Point[3] { new Point(15, 5), new Point(15, 15), new Point(5, 15) });
                graphics.DrawLines(pen, new Point[3] { new Point(Width - 20, 5), new Point(Width - 20, 15), new Point(Width - 10, 15) });
                graphics.DrawLines(pen, new Point[3] { new Point(5, Height - 20), new Point(15, Height - 20), new Point(15, Height - 10) });
                graphics.DrawLines(pen, new Point[3] { new Point(Width - 10, Height - 20), new Point(Width - 20, Height - 20), new Point(Width - 20, Height - 10) });
            }
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            this.ResumeLayout(false);

        }
    }
}
