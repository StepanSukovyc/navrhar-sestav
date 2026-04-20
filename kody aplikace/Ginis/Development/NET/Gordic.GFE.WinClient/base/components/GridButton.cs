//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GrrButtons.cs                          </Name>
//    <Description>                                                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                             </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025                  </Copyright>
//    <Created>     2010-07-22                                                  </Created>
//  </FileHeader>

using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Windows.Forms;

namespace Gordic.GFE.WinClient
{
    /// <summary>
    /// Tlačítko zviditelnění mřížky
    /// </summary>
    public class GridButton : Panel
    {
        bool isShow;
        /// <summary>
        /// Indikuje stav, kdy se objekt kresli nebo ne.
        /// </summary>
        public bool IsShow { get { return isShow; } set { isShow = value; Invalidate(); } }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="e"></param>
        protected override void OnPaint(PaintEventArgs e)
        {
            Graphics panelGraphics = this.CreateGraphics();

            if (!isShow)
            {
                using (SolidBrush brash = new SolidBrush(Color.White))
                {
                    using (Pen pen = new Pen(brash, 1))
                    {
                        panelGraphics.DrawLine(pen, new PointF(0, 0), new PointF(0, Height));
                        panelGraphics.DrawLine(pen, new PointF(0, 0), new PointF(Width, 0));
                    }
                }
                using (SolidBrush brash = new SolidBrush(Color.Gray))
                {
                    using (Pen pen = new Pen(brash, 1))
                    {
                        panelGraphics.DrawLine(pen, new PointF(Width - 1, 1), new PointF(Width - 1, Height));
                        panelGraphics.DrawLine(pen, new PointF(1, Height - 1), new PointF(Width, Height - 1));
                    }
                }

                using (SolidBrush brash = new SolidBrush(Color.LightGray))
                {
                    using (Pen pen = new Pen(brash, 1))
                    {
                        panelGraphics.DrawLine(pen, new PointF(Width - 2, 2), new PointF(Width - 2, Height - 2));
                        panelGraphics.DrawLine(pen, new PointF(2, Height - 2), new PointF(Width - 2, Height - 2));
                    }
                }
            }
            else
            {
                using (SolidBrush brash = new SolidBrush(Color.White))
                {
                    using (Pen pen = new Pen(brash, 1))
                    {
                        panelGraphics.DrawLine(pen, new PointF(Width - 1, 1), new PointF(Width - 1, Height));
                        panelGraphics.DrawLine(pen, new PointF(1, Height - 1), new PointF(Width, Height - 1));
                    }
                }
                using (SolidBrush brash = new SolidBrush(Color.Gray))
                {
                    using (Pen pen = new Pen(brash, 1))
                    {
                        panelGraphics.DrawLine(pen, new PointF(0, 0), new PointF(0, Height));
                        panelGraphics.DrawLine(pen, new PointF(0, 0), new PointF(Width, 0));
                    }
                }

                using (SolidBrush brash = new SolidBrush(Color.LightGray))
                {
                    using (Pen pen = new Pen(brash, 1))
                    {
                        panelGraphics.DrawLine(pen, new PointF(1, 1), new PointF(1, Height - 2));
                        panelGraphics.DrawLine(pen, new PointF(1, 1), new PointF(Width - 2, 1));
                    }
                }
                using (SolidBrush brash = new SolidBrush(Color.WhiteSmoke))
                    panelGraphics.FillRectangle(brash, new Rectangle(2, 2, Width - 3, Height - 3));
            }

            DrawBackground(panelGraphics);
            base.OnPaint(e);
        }

        /// <exclude/>
        protected override void OnClick(EventArgs e)
        {
            IsShow = !IsShow;
            base.OnClick(e);
        }

        /// <exclude/>
        protected override void OnMouseDown(MouseEventArgs e)
        {
            Graphics panelGraphics = this.CreateGraphics();

            using (SolidBrush brash = new SolidBrush(Color.White))
            {
                using (Pen pen = new Pen(brash, 1))
                {
                    panelGraphics.DrawLine(pen, new PointF(Width - 1, 1), new PointF(Width - 1, Height));
                    panelGraphics.DrawLine(pen, new PointF(1, Height - 1), new PointF(Width, Height - 1));

                }
            }
            using (SolidBrush brash = new SolidBrush(Color.Gray))
            {
                using (Pen pen = new Pen(brash, 1))
                {
                    panelGraphics.DrawLine(pen, new PointF(0, 0), new PointF(0, Height));
                    panelGraphics.DrawLine(pen, new PointF(0, 0), new PointF(Width, 0));
                }
            }

            using (SolidBrush brash = new SolidBrush(Color.LightGray))
            {
                using (Pen pen = new Pen(brash, 1))
                {
                    panelGraphics.DrawLine(pen, new PointF(1, 1), new PointF(1, Height - 2));
                    panelGraphics.DrawLine(pen, new PointF(1, 1), new PointF(Width - 2, 1));
                }
            }

            base.OnMouseDown(e);
        }

        /// <summary>
        /// Kreslení pozadí
        /// </summary>
        /// <param name="graphics">Ovladač grafiky</param>
        void DrawBackground(Graphics graphics)
        {
            using (Pen pen = new Pen(Color.Gray, 1))
            {
                pen.DashStyle = DashStyle.Dot;
                if (IsShow)
                {
                        graphics.DrawRectangle(pen, new Rectangle(new Point(Width / 7 + 1, Width / 7 + 1), new Size(5 * Width / 7, 5 * Height / 7)));

                        graphics.DrawLine(pen, new Point(4 * Width / 7 + 1, Height / 7 + 1), new Point(4 * Width / 7 + 1, 2 * Height / 7 + 1));
                        graphics.DrawLine(pen, new Point(2 * Width / 7 + 1, 2 * Height / 7 + 1), new Point(2 * Width / 7 + 1, 3 * Height / 7 + 1));
                        graphics.DrawLine(pen, new Point(5 * Width / 7 + 1, 2 * Height / 7 + 1), new Point(5 * Width / 7 + 1, 3 * Height / 7 + 1));
                        graphics.DrawLine(pen, new Point(3 * Width / 7 + 1, 3 * Height / 7 + 1), new Point(3 * Width / 7 + 1, 4 * Height / 7 + 1));
                        graphics.DrawLine(pen, new Point(4 * Width / 7 + 1, 4 * Height / 7 + 1), new Point(4 * Width / 7 + 1, 5 * Height / 7 + 1));
                        graphics.DrawLine(pen, new Point(2 * Width / 7 + 1, 5 * Height / 7 + 1), new Point(2 * Width / 7 + 1, 6 * Height / 7 + 1));
                        graphics.DrawLine(pen, new Point(5 * Width / 7 + 1, 5 * Height / 7 + 1), new Point(5 * Width / 7 + 1, 6 * Height / 7 + 1));

                        graphics.DrawLine(pen, new Point(1 * Width / 7 + 1, 2 * Height / 7 + 1), new Point(6 * Width / 7 + 1, 2 * Height / 7 + 1));
                        graphics.DrawLine(pen, new Point(1 * Width / 7 + 1, 3 * Height / 7 + 1), new Point(6 * Width / 7 + 1, 3 * Height / 7 + 1));
                        graphics.DrawLine(pen, new Point(1 * Width / 7 + 1, 4 * Height / 7 + 1), new Point(6 * Width / 7 + 1, 4 * Height / 7 + 1));
                        graphics.DrawLine(pen, new Point(1 * Width / 7 + 1, 5 * Height / 7 + 1), new Point(6 * Width / 7 + 1, 5 * Height / 7 + 1));
                }
                else
                {
                        graphics.DrawRectangle(pen, new Rectangle(new Point(Width / 7, Width / 7), new Size(5 * Width / 7, 5 * Height / 7)));
                        graphics.DrawLine(pen, new Point(4 * Width / 7, Height / 7), new Point(4 * Width / 7, 2 * Height / 7));
                        graphics.DrawLine(pen, new Point(2 * Width / 7, 2 * Height / 7), new Point(2 * Width / 7, 3 * Height / 7));
                        graphics.DrawLine(pen, new Point(5 * Width / 7, 2 * Height / 7), new Point(5 * Width / 7, 3 * Height / 7));
                        graphics.DrawLine(pen, new Point(3 * Width / 7, 3 * Height / 7), new Point(3 * Width / 7, 4 * Height / 7));
                        graphics.DrawLine(pen, new Point(4 * Width / 7, 4 * Height / 7), new Point(4 * Width / 7, 5 * Height / 7));
                        graphics.DrawLine(pen, new Point(2 * Width / 7, 5 * Height / 7), new Point(2 * Width / 7, 6 * Height / 7));
                        graphics.DrawLine(pen, new Point(5 * Width / 7, 5 * Height / 7), new Point(5 * Width / 7, 6 * Height / 7));

                        graphics.DrawLine(pen, new Point(1 * Width / 7, 2 * Height / 7), new Point(6 * Width / 7, 2 * Height / 7));
                        graphics.DrawLine(pen, new Point(1 * Width / 7, 3 * Height / 7), new Point(6 * Width / 7, 3 * Height / 7));
                        graphics.DrawLine(pen, new Point(1 * Width / 7, 4 * Height / 7), new Point(6 * Width / 7, 4 * Height / 7));
                        graphics.DrawLine(pen, new Point(1 * Width / 7, 5 * Height / 7), new Point(6 * Width / 7, 5 * Height / 7));
                }
            }
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            this.ResumeLayout(false);

        }
    }

}
