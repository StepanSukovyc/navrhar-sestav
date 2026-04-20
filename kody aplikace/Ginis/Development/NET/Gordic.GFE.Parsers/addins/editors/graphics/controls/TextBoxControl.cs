//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.TextBoxControl.cs                        </Name>
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
using Gordic.GFE.Parsers.Utils;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// Vlastní TextBox používaný na stránkách
    /// </summary>
    public class TextBoxControl : TextBox, IEditControl
    {
        /// <summary>
        /// Volá se po aktualizací textu
        /// </summary>
        public event EventHandler TextRefreshed;

        private PictureBoxControl m_pictureBox;
        private bool m_upToDate, m_caretUpToDate, m_caretState = true, m_paintedFirstTime, m_firstFocus = true;
        private Bitmap m_bitmap, m_mainBitmap;

        private int m_fontHeight = 10;
        private readonly Color m_borderColor = Color.Black;
        private Color m_backColor = Color.White;
        private Timer m_timer;

        /// <summary> 
        /// Povinná designérská proměnna
        /// </summary>
        private System.ComponentModel.Container components = null;

        /// <summary>
        /// Konstruktor objektu
        /// </summary>
        public TextBoxControl()
        {
            InitializeComponent();

            this.BackColor = m_backColor;

            this.SetStyle(ControlStyles.UserPaint, false);
            this.SetStyle(ControlStyles.AllPaintingInWmPaint, true);
            this.SetStyle(ControlStyles.DoubleBuffer, true);

            m_pictureBox = new PictureBoxControl();
            this.Controls.Add(m_pictureBox);
            m_pictureBox.Dock = DockStyle.Fill;
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
        /// Změna velikosti
        /// </summary>
        /// <param name="e">Parametr změny</param>
        protected override void OnResize(EventArgs e)
        {
            base.OnResize(e);
            if (this.ClientRectangle.Width >= 0 && this.ClientRectangle.Height >= 0)
            {
                try
                {
                    this.m_bitmap = new Bitmap((int)(this.ClientRectangle.Width * ZoomFactor), (int)(this.ClientRectangle.Height * ZoomFactor));//(this.Width,this.Height);
                    this.m_mainBitmap = new Bitmap((int)(this.ClientRectangle.Width * ZoomFactor), (int)(this.ClientRectangle.Height * ZoomFactor));//(this.Width,this.Height);
                }
                catch { }
            }
            m_upToDate = false;
            this.Invalidate();
        }

        /// <exclude/>
        protected override void OnKeyDown(KeyEventArgs e)
        {
            base.OnKeyDown(e);
            m_upToDate = false;
            this.Invalidate();
        }

        /// <exclude/>
        protected override void OnKeyUp(KeyEventArgs e)
        {
            base.OnKeyUp(e);
            m_upToDate = false;
            this.Invalidate();
        }

        /// <exclude/>
        protected override void OnKeyPress(KeyPressEventArgs e)
        {
            base.OnKeyPress(e);
            m_upToDate = false;
            this.Invalidate();
        }

        /// <exclude/>
        protected override void OnMouseUp(MouseEventArgs e)
        {
            base.OnMouseUp(e);
            this.Invalidate();
        }

        /// <exclude/>
        protected override void OnGiveFeedback(GiveFeedbackEventArgs gfbevent)
        {
            base.OnGiveFeedback(gfbevent);
            m_upToDate = false;
            this.Invalidate();
        }

        /// <exclude/>
        protected override void OnMouseLeave(EventArgs e)
        {
            //získáme pozici kurzoru
            Point _cursor = GetCursorPosition();

            if (!this.Bounds.Contains(_cursor))
                base.OnMouseLeave(e);
        }

        private Point GetCursorPosition()
        {
            //http://www.syncfusion.com/FAQ/WinForms/FAQ_c50c.asp#q597q
            Point _cursor = Cursor.Position;

            Form _form = this.FindForm();
            if (_form != null)
                _cursor = _form.PointToClient(_cursor);

            return _cursor;
        }

        /// <exclude/>
        protected override void OnChangeUICues(UICuesEventArgs e)
        {
            base.OnChangeUICues(e);
            m_upToDate = false;
            this.Invalidate();
        }

        /// <exclude/>
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
                    //if (_start + 1 != this.Text.Length)
                    //    _start--;

                    if (_start > 0)
                        this.SelectionStart = _start;
                }
            }
            base.OnGotFocus(e);
            m_caretUpToDate = false;
            m_upToDate = false;
            this.Invalidate();
            if (this.components != null)
            {
                m_timer = new Timer(this.components)
                {
                    Interval = (int)NativeMethods.GetCaretBlinkTime() //obvykle kolem 500;
                };

                m_timer.Tick += new EventHandler(Timer_Tick);
                m_timer.Enabled = true;
            }
        }

        /// <exclude/>
        protected override void OnLostFocus(EventArgs e)
        {
            base.OnLostFocus(e);
            m_caretUpToDate = false;
            m_upToDate = false;
            this.Invalidate();

            if (m_timer != null)
                m_timer.Dispose();

            this.Dispose();
        }

        /// <exclude/>
        protected override void OnFontChanged(EventArgs e)
        {
            if (this.m_paintedFirstTime)
                this.SetStyle(ControlStyles.UserPaint, false);

            base.OnFontChanged(e);

            if (this.m_paintedFirstTime)
                this.SetStyle(ControlStyles.UserPaint, true);

            m_fontHeight = GetFontHeight();

            m_upToDate = false;
            this.Invalidate();
        }

        /// <exclude/>
        protected override void OnTextChanged(EventArgs e)
        {
            base.OnTextChanged(e);
            m_upToDate = false;
            this.Invalidate();
        }

        /// <exclude/>
        protected override void WndProc(ref Message m)
        {
            base.WndProc(ref m);

            switch (m.Msg)
            {
                case Win32.WM_PAINT:
                    m_paintedFirstTime = true;

                    if (!m_upToDate || !m_caretUpToDate)
                        GetBitmaps();

                    m_upToDate = true;
                    m_caretUpToDate = true;

                    if (m_pictureBox.Image != null) m_pictureBox.Image.Dispose();
                    m_pictureBox.Image = (Image)m_mainBitmap.Clone();
                    break;
                case Win32.WM_HSCROLL:
                    m_upToDate = false;
                    this.Invalidate();
                    break;
                case Win32.WM_VSCROLL:
                    m_upToDate = false;
                    this.Invalidate();
                    break;
                case Win32.WM_LBUTTONDOWN:
                    m_upToDate = false;
                    this.Invalidate();
                    break;
                case Win32.WM_RBUTTONDOWN:
                    m_upToDate = false;
                    this.Invalidate();
                    break;
                case Win32.WM_LBUTTONDBLCLK:
                    m_upToDate = false;
                    this.Invalidate();
                    break;
                case Win32.WM_MOUSEMOVE:
                    if (m.WParam.ToInt32() != 0)  //tlačítko Shift nebo jiné
                    {
                        m_upToDate = false;
                        this.Invalidate();
                    }
                    break;
                default:
                    break;
            }
        }

        /// <summary> 
        /// Vyčištění všech používaných objektů
        /// </summary>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (components != null)
                {
                    components.Dispose();
                    components = null;
                }
                if (m_bitmap != null)
                {
                    m_bitmap.Dispose();
                    m_bitmap = null;
                }
                if (m_mainBitmap != null)
                {
                    m_mainBitmap.Dispose();
                    m_mainBitmap = null;
                }
            }
            base.Dispose(disposing);
        }

        /// <summary>
        /// Styl ohraničení
        /// </summary>
        public new BorderStyle BorderStyle
        {
            get { return base.BorderStyle; }
            set
            {
                if (this.m_paintedFirstTime)
                    this.SetStyle(ControlStyles.UserPaint, false);

                base.BorderStyle = value;

                if (this.m_paintedFirstTime)
                    this.SetStyle(ControlStyles.UserPaint, true);

                this.m_bitmap = null;
                this.m_mainBitmap = null;
                m_upToDate = false;
                this.Invalidate();
            }
        }
        /// <summary>
        /// Barva pozadí
        /// </summary>
        public new Color BackColor
        {
            get { return m_backColor; }
            set
            {
                m_backColor = value;
                base.BackColor = value;
                m_upToDate = false;
            }
        }
        /// <summary>
        /// Indikátor více řádkovosti 
        /// </summary>
        public override bool Multiline
        {
            get { return base.Multiline; }
            set
            {
                if (this.m_paintedFirstTime)
                    this.SetStyle(ControlStyles.UserPaint, false);

                base.Multiline = value;

                if (this.m_paintedFirstTime)
                    this.SetStyle(ControlStyles.UserPaint, true);

                this.m_bitmap = null;
                this.m_mainBitmap = null;
                m_upToDate = false;
                this.Invalidate();
            }
        }

        private int GetFontHeight()
        {
            Graphics g = this.CreateGraphics();
            SizeF sf_font = g.MeasureString("X", this.Font);
            g.Dispose();
            return (int)(sf_font.Height * ZoomFactor);
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
                    Point caret = this.FindCaret();
                    Pen p = new Pen(this.ForeColor, 3);
                    tempGraphics2.DrawLine(p, caret.X, caret.Y + 0, caret.X, caret.Y + m_fontHeight);
                    tempGraphics2.Dispose();
                }
            }
        }

        private Point FindCaret()
        {
            /*  Find the caret translated from code at 
             * http://www.vb-helper.com/howto_track_textbox_caret.html
             * 
             * and 
             * 
             * http://www.microbion.co.uk/developers/csharp/textpos2.htm
             * 
             * Changed to EM_POSFROMCHAR
             * 
             * This code still needs to be cleaned up and debugged
             * */

            Point pointCaret = new Point(0);
            int i_char_loc = this.SelectionStart;
            IntPtr pi_char_loc = new IntPtr(i_char_loc);

            int i_point = NativeMethods.SendMessage(Handle, NativeMethods.EM_POSFROMCHAR, pi_char_loc, IntPtr.Zero);
            pointCaret = new Point(i_point);

            if (i_char_loc == 0 && this.Text.Length == 0)
                pointCaret = new Point(0);
            else if (i_char_loc >= this.Text.Length)
            {
                pi_char_loc = new IntPtr(i_char_loc - 1);
                i_point = NativeMethods.SendMessage(this.Handle, NativeMethods.EM_POSFROMCHAR, pi_char_loc, IntPtr.Zero);
                pointCaret = new Point(i_point);

                Graphics g = this.CreateGraphics();
                String t1 = this.Text.Substring(this.Text.Length - 1, 1) + "X";
                SizeF sizet1 = g.MeasureString(t1, this.Font);
                SizeF sizex = g.MeasureString("X", this.Font);
                g.Dispose();
                int xoffset = (int)(sizet1.Width - sizex.Width);
                pointCaret.X = pointCaret.X + xoffset;

                if (i_char_loc == this.Text.Length)
                {
                    String slast = this.Text.Substring(Text.Length - 1, 1);
                    if (slast == "\n")
                    {
                        pointCaret.X = 1;
                        pointCaret.Y = pointCaret.Y + m_fontHeight;
                    }
                }

            }

            return pointCaret;
        }

        private void Timer_Tick(object sender, EventArgs e)
        {
            //časovač slouží k vypnutí a zapnutí pozici kurzoru ve vybraném objektu
            m_caretState = !m_caretState;
            m_caretUpToDate = false;
            this.Invalidate();
        }

        /// <exclude/>
        private void InitializeComponent()
        {
            this.SuspendLayout();
            this.ResumeLayout(false);
        }

        /// <summary>
        /// Fokusace objektu
        /// </summary>
        void IEditControl.Focus() { this.Focus(); }
        /// <summary>
        /// Datum a čas
        /// </summary>
        public DateTime Value { get; set; }

        /// <summary>
        /// Lupa
        /// </summary>
        public float ZoomFactor { get; set; }
        public bool IsDirty { get; set; }

        /// <summary>
        /// "Vlastník" ovládacího prvku - objekt, který nahrazuje daný ovladací prvek
        /// </summary>
        public object Owner
        {
            get { return (DataItem == null || DataItem.DataItem == null || DataItem.DataItem.Owner == null) ? null : DataItem.DataItem.Owner; }
        }
        public bool RefreshText()
        {
            OnTextRefreshed();
            return true;
        }

        private void OnTextRefreshed()
        {
            TextRefreshed?.Invoke(this, EventArgs.Empty);
        }
    }
}
