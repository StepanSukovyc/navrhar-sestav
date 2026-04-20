//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GFEZarovnani.cs                        </Name>
//    <Description>                                                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                             </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025                  </Copyright>
//    <Created>     2010-07-22                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using System.Drawing;

namespace Gordic.GFE.WinClient
{
    /// <summary>
    /// Stav tlačítka
    /// </summary>
    public enum BtnState
    {
        /// <summary>
        /// žádný
        /// </summary>
        none,
        /// <summary>
        /// stisknuté
        /// </summary>
        pressed
    }

    /// <summary>
    /// 
    /// </summary>
    public class GFEHZarovnani : Panel
    {
        Gordic.Report.Implementation.Grr06HAlign type = Gordic.Report.Implementation.Grr06HAlign.Left;
        /// <summary>
        /// 
        /// </summary>
        public Gordic.Report.Implementation.Grr06HAlign B_type { get { return type; } set { type = value; } }

        BtnState state = BtnState.none;
        /// <summary>
        /// 
        /// </summary>
        public BtnState B_state { get { return state; } set { state = value; } }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="e"></param>
        protected override void OnPaint(PaintEventArgs e)
        {
            Graphics panelGraphics = this.CreateGraphics();

            switch (state)
            {
                case BtnState.none:
                    DrawStateNone(panelGraphics);
                    break;
                case BtnState.pressed:
                    DrawStatePressed(panelGraphics);
                    break;
            }

            Draw135Lines(panelGraphics);
            switch (type)
            {
                case Gordic.Report.Implementation.Grr06HAlign.Left:
                    DrawLeft(panelGraphics);
                    break;
                case Gordic.Report.Implementation.Grr06HAlign.Center:
                    DrawCenter(panelGraphics);
                    break;
                case Gordic.Report.Implementation.Grr06HAlign.Right:
                    DrawRight(panelGraphics);
                    break;
            }
            base.OnPaint(e);
        }

        private void DrawRight(Graphics panelGraphics)
        {
            using (Pen pen = new Pen(Color.Black))
            {
                panelGraphics.DrawLine(pen, new Point(4 * Width / 8, 3 * (Height / 8)), new Point(6 * (Width / 8), 3 * (Height / 8)));
                panelGraphics.DrawLine(pen, new Point(4 * Width / 8, 5 * (Height / 8)), new Point(6 * (Width / 8), 5 * (Height / 8)));
            }
        }

        private void DrawCenter(Graphics panelGraphics)
        {
            using (Pen pen = new Pen(Color.Black))
            {
                panelGraphics.DrawLine(pen, new Point(3 * Width / 8, 3 * (Height / 8)), new Point(5 * (Width / 8), 3 * (Height / 8)));
                panelGraphics.DrawLine(pen, new Point(3 * Width / 8, 5 * (Height / 8)), new Point(5 * (Width / 8), 5 * (Height / 8)));
            }
        }

        private void DrawLeft(Graphics panelGraphics)
        {
            using (Pen pen = new Pen(Color.Black))
            {
                panelGraphics.DrawLine(pen, new Point(Width / 4, 3 * (Height / 8)), new Point(4 * (Width / 8), 3 * (Height / 8)));
                panelGraphics.DrawLine(pen, new Point(Width / 4, 5 * (Height / 8)), new Point(4 * (Width / 8), 5 * (Height / 8)));
            }
        }

        private void Draw135Lines(Graphics panelGraphics)
        {
            using (Pen pen = new Pen(Color.Black))
            {
                panelGraphics.DrawLine(pen, new Point(Width / 4, Height / 4), new Point(6 * Width / 8, Height / 4));
                panelGraphics.DrawLine(pen, new Point(Width / 4, Height / 2), new Point(6 * Width / 8, Height / 2));
                panelGraphics.DrawLine(pen, new Point(Width / 4, 6 * Height / 8), new Point(6 * Width / 8, 6 * Height / 8));
            }
        }

        private void DrawStatePressed(Graphics panelGraphics)
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

        private void DrawStateNone(Graphics panelGraphics)
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

            Draw135Lines(panelGraphics);
            switch (type)
            {
                case Gordic.Report.Implementation.Grr06HAlign.Center:
                    DrawCenter(panelGraphics);
                    break;
                case Gordic.Report.Implementation.Grr06HAlign.Justify:
                    DrawLeft(panelGraphics);
                    break;
                case Gordic.Report.Implementation.Grr06HAlign.Left:
                    DrawLeft(panelGraphics);
                    break;
                case Gordic.Report.Implementation.Grr06HAlign.Right:
                    DrawRight(panelGraphics);
                    break;
                default:
                    DrawLeft(panelGraphics);
                    break;
            }
            base.OnMouseDown(e);
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            this.ResumeLayout(false);

        }
    }

    /// <summary>
    /// 
    /// </summary>
    public class GFEVZarovnani : Panel
    {
        Gordic.Report.Implementation.Grr06VAlign type = Gordic.Report.Implementation.Grr06VAlign.Top;
        /// <summary>
        /// 
        /// </summary>
        public Gordic.Report.Implementation.Grr06VAlign B_type { get { return type; } set { type = value; } }

        BtnState state = BtnState.none;
        /// <summary>
        /// 
        /// </summary>
        public BtnState B_state { get { return state; } set { state = value; } }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="e"></param>
        protected override void OnPaint(PaintEventArgs e)
        {
            Graphics panelGraphics = this.CreateGraphics();

            switch (state)
            {
                case BtnState.none:
                    DrawStateNone(panelGraphics);
                    break;
                case BtnState.pressed:
                    DrawStatePressed(panelGraphics);
                    break;
            }

            DrawBack(panelGraphics);
            switch (type)
            {
                case Gordic.Report.Implementation.Grr06VAlign.Top:
                    DrawTop(panelGraphics);
                    break;
                case Gordic.Report.Implementation.Grr06VAlign.Center:
                    DrawCenter(panelGraphics);
                    break;
                case Gordic.Report.Implementation.Grr06VAlign.Bottom:
                    DrawBottom(panelGraphics);
                    break;
            }
            base.OnPaint(e);
        }

        private void DrawBottom(Graphics panelGraphics)
        {
            using (Pen pen = new Pen(Color.Black))
            {
                panelGraphics.DrawLine(pen, new Point(3 * Width / 9, 5 * Height / 9), new Point(6 * Width / 9, 5 * Height / 9));
                panelGraphics.DrawLine(pen, new Point(3 * Width / 9, 6 * Height / 9), new Point(6 * Width / 9, 6 * Height / 9));
            }
        }

        private void DrawCenter(Graphics panelGraphics)
        {
            using (Pen pen = new Pen(Color.Black))
            {
                panelGraphics.DrawLine(pen, new Point(3 * Width / 9, 4 * Height / 9), new Point(6 * Width / 9, 4 * Height / 9));
                panelGraphics.DrawLine(pen, new Point(3 * Width / 9, 5 * Height / 9), new Point(6 * Width / 9, 5 * Height / 9));
            }
        }

        private void DrawTop(Graphics panelGraphics)
        {
            using (Pen pen = new Pen(Color.Black))
            {
                panelGraphics.DrawLine(pen, new Point(3 * Width / 9, 3 * Height / 9), new Point(6 * Width / 9, 3 * Height / 9));
                panelGraphics.DrawLine(pen, new Point(3 * Width / 9, 4 * Height / 9), new Point(6 * Width / 9, 4 * Height / 9));
            }
        }

        private void DrawBack(Graphics panelGraphics)
        {
            using (SolidBrush brush = new SolidBrush(Color.White))
            {

                using (Pen pen = new Pen(Color.Black))
                {
                    panelGraphics.DrawLine(pen, new Point(2 * Width / 9, Height / 9), new Point(2 * Width / 9, 8 * Height / 9));

                    panelGraphics.DrawLine(pen, new Point(Width / 9, 2 * Height / 9), new Point(8 * Width / 9, 2 * Height / 9));
                    panelGraphics.DrawLine(pen, new Point(7 * Width / 9, Height / 9), new Point(7 * Width / 9, 8 * Height / 9));
                    panelGraphics.DrawLine(pen, new Point(Width / 9, 7 * Height / 9), new Point(8 * Width / 9, 7 * Height / 9));

                }
                panelGraphics.FillRectangle(brush, 2 * Width / 9 + 1, 2 * Height / 9 + 1, 5 * Width / 9 - 1, 5 * Height / 9 - 1);
            }
        }

        private void DrawStatePressed(Graphics panelGraphics)
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

        private void DrawStateNone(Graphics panelGraphics)
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="e"></param>
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

            DrawBack(panelGraphics);
            switch (type)
            {
                case Gordic.Report.Implementation.Grr06VAlign.Top:
                    DrawTop(panelGraphics);
                    break;
                case Gordic.Report.Implementation.Grr06VAlign.Center:
                    DrawCenter(panelGraphics);
                    break;
                case Gordic.Report.Implementation.Grr06VAlign.Bottom:
                    DrawBottom(panelGraphics);
                    break;
            }

            base.OnMouseDown(e);
        }
    }
}
