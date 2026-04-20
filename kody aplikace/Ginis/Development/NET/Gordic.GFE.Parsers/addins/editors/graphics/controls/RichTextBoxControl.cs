//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.RichTextBoxControl.cs                    </Name>
//    <Description> Vlastní TextBox používaný na stránkách                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-03-15                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using System.Drawing;
using System.Drawing.Imaging;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Dom;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// Vlastní TextBox používaný na stránkách
    /// </summary>
    public class RichTextBoxControl : RichTextBox, IEditControl
    {
        /// <summary>
        /// Volá se po aktualizací textu
        /// </summary>
        public event EventHandler TextRefreshed;

        private Bitmap m_bitmap, m_mainBitmap;
        private bool m_upToDate;
        private readonly bool m_caretState = true;
        private bool m_firstFocus = true;
        private readonly Color m_borderColor = Color.Black;
        private Color m_backColor = Color.White;

        /// <summary>
        /// Konstruktor objektu
        /// </summary>
        public RichTextBoxControl()
        {
            InitializeComponent();

            //this.SetStyle(ControlStyles.UserPaint, false);
            //this.SetStyle(ControlStyles.AllPaintingInWmPaint, true);
            //this.SetStyle(ControlStyles.DoubleBuffer, true);

            //m_pictureBox = new PictureBoxControl();
            //this.Controls.Add(m_pictureBox);
            //m_pictureBox.Dock = DockStyle.Fill;
        }

        /// <summary>
        /// Pozice obsahu uvnitř ovladače
        /// </summary>
        public RectangleF ContentBounds { get; set; }

        /// <summary>
        /// Obsah, kterému patří daný objekt
        /// </summary>
        public IDefaultDataItemHandler DataItem { get; set; }
        /// <summary>
        /// "Vlastník" ovládacího prvku - objekt, který nahrazuje daný ovladací prvek
        /// </summary>
        public object Owner
        {
            get { return (DataItem == null || DataItem.DataItem == null || DataItem.DataItem.Owner == null) ? null : DataItem.DataItem.Owner; }
        }

        /// <summary>
        /// Fokusace objektu
        /// </summary>
        void IEditControl.Focus() { this.Focus(); }

        /// <summary>
        /// Datum a čas
        /// </summary>
        public DateTime Value { get; set; }

        HorizontalAlignment textalign;
        /// <summary>
        /// 
        /// </summary>
        public HorizontalAlignment TextAlign
        {
            get { return textalign; }
            set { textalign = value; }
        }

        /// <summary>
        /// Získání fokusu objektu
        /// </summary>
        /// <param name="e">Argument</param>
        protected override void OnGotFocus(EventArgs e)
        {
            if (m_firstFocus)
            {
                m_firstFocus = false;
                Point _cursor = Cursor.Position;
                _cursor = this.PointToClient(_cursor);
                if (_cursor.X > 0 && _cursor.Y > 0)
                {
                    //Přesuneme kurzor na pozici opuštěni myši 
                    int _start = this.GetCharIndexFromPosition(_cursor);

                    if (_start > 0)
                        this.SelectionStart = _start;
                }
            }
            base.OnGotFocus(e);
            this.Invalidate();
        }

        /// <summary>
        /// Zachycení procesů
        /// </summary>
        /// <param name="m">Argument</param>
        protected override void WndProc(ref Message m)
        {
            base.WndProc(ref m);
            switch (m.Msg)
            {
                case Win32.WM_PAINT:
                    //m_paintedFirstTime = true;

                    //if (!m_upToDate || !m_caretUpToDate)
                    //    GetBitmaps();

                    //m_upToDate = true;
                    //m_caretUpToDate = true;

                    //if (m_pictureBox.Image != null) m_pictureBox.Image.Dispose();
                    //m_pictureBox.Image = (Image)m_mainBitmap.Clone();

                    Graphics tempGraphics1 = this.CreateGraphics();
                    tempGraphics1.DrawRectangle(new Pen(new SolidBrush(Color.Red), 2f), this.ClientRectangle.Location.X, this.ClientRectangle.Location.Y, this.ClientRectangle.Width, this.ClientRectangle.Height);
                    break;
                default:
                    break;
            }
        }

        private void GetBitmaps()
        {
            if (m_bitmap == null
                || m_mainBitmap == null
                || m_bitmap.Width != Width
                || m_bitmap.Height != Height
                || m_mainBitmap.Width != Width
                || m_mainBitmap.Height != Height)
            {
                m_bitmap = null;
                m_mainBitmap = null;
            }


            if (m_bitmap == null)
            {
                m_bitmap = new Bitmap((int)(this.ClientRectangle.Width * ZoomFactor), (int)(this.ClientRectangle.Height * ZoomFactor));//(Width,Height);
                m_upToDate = false;
            }

            if (!m_upToDate)
            {
                //získáni okna ovladače TextBoxu
                this.SetStyle(ControlStyles.UserPaint, false);

                Win32.CaptureWindow(this, ref m_bitmap);

                this.SetStyle(ControlStyles.UserPaint, true);
                this.SetStyle(ControlStyles.SupportsTransparentBackColor, true);
                this.BackColor = m_backColor;
            }

            Rectangle r2 = new Rectangle(0, 0, (int)(this.ClientRectangle.Width * ZoomFactor), (int)(this.ClientRectangle.Height * ZoomFactor));
            ImageAttributes tempImageAttr = new ImageAttributes();

            //z MS Help
            ColorMap[] tempColorMap = new ColorMap[1];
            tempColorMap[0] = new ColorMap
            {
                OldColor = Color.FromArgb(255, m_backColor),
                NewColor = m_backColor
            };

            tempImageAttr.SetRemapTable(tempColorMap);

            if (m_mainBitmap != null)
                m_mainBitmap.Dispose();

            m_mainBitmap = new Bitmap((int)(this.ClientRectangle.Width * ZoomFactor), (int)(this.ClientRectangle.Height * ZoomFactor));

            Graphics tempGraphics1 = Graphics.FromImage(m_mainBitmap);

            tempGraphics1.DrawImage(m_bitmap, r2, 0, 0, this.ClientRectangle.Width, this.ClientRectangle.Height, GraphicsUnit.Pixel, tempImageAttr);
            tempGraphics1.DrawRectangle(new Pen(new SolidBrush(m_borderColor), 2f), this.ClientRectangle.Location.X, this.ClientRectangle.Location.Y, this.ClientRectangle.Width, this.ClientRectangle.Height);

            tempGraphics1.Dispose();

            if (this.Focused && (this.SelectionLength == 0))
            {
                Graphics tempGraphics2 = Graphics.FromImage(m_mainBitmap);
                if (m_caretState)
                {
                    //kreslení kurzoru
                    this.ScrollToCaret();
                    //Point caret = this.FindCaret();
                    //Pen p = new Pen(this.ForeColor, 3);
                    //tempGraphics2.DrawLine(p, caret.X, caret.Y + 0, caret.X, caret.Y + this.FontHeight);
                    tempGraphics2.Dispose();
                }
            }
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            this.ResumeLayout(false);
        }
        public bool IsDirty { get; set; }

        public bool RefreshText()
        {
            if (IsDirty && DataItem != null)
                DataItem.UpdateContent(Text);
            OnTextRefreshed();
            return true;
        }

        void OnTextRefreshed()
        {
            TextRefreshed?.Invoke(this, EventArgs.Empty);
        }
    }
}
