//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.SplitterBase.cs                        </Name>
//    <Description> Základní splitter                                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-04                                                  </Created>
//  </FileHeader>

using System.Drawing;
using System.Windows.Forms;

namespace Gordic.GFE.Parsers.Docking
{
    /// <summary>
    /// Základní splitter
    /// </summary>
    internal class SplitterBase : Control
    {
        public SplitterBase()
        {
            SetStyle(ControlStyles.Selectable, false);
        }

        public override DockStyle Dock
        {
            get { return base.Dock; }
            set
            {
                SuspendLayout();
                base.Dock = value;

                if (Dock == DockStyle.Left || Dock == DockStyle.Right)
                    Width = SplitterSize;
                else if (Dock == DockStyle.Top || Dock == DockStyle.Bottom)
                    Height = SplitterSize;
                else
                    Bounds = Rectangle.Empty;

                if (Dock == DockStyle.Left || Dock == DockStyle.Right)
                    Cursor = Cursors.VSplit;
                else if (Dock == DockStyle.Top || Dock == DockStyle.Bottom)
                    Cursor = Cursors.HSplit;
                else
                    Cursor = Cursors.Default;

                ResumeLayout();
            }
        }

        protected virtual int SplitterSize
        {
            get { return 0; }
        }

        protected override void OnMouseDown(MouseEventArgs e)
        {
            base.OnMouseDown(e);

            if (e.Button != MouseButtons.Left)
                return;

            StartDrag();
        }

        protected virtual void StartDrag()
        {
        }

        protected override void WndProc(ref Message m)
        {
            // ignorace WM_MOUSEACTIVATE zprávy
            if (m.Msg == (int)Msgs.WM_MOUSEACTIVATE)
                return;

            base.WndProc(ref m);
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            this.ResumeLayout(false);

        }
    }
}
