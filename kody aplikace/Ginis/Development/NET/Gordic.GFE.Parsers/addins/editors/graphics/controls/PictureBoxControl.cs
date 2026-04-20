//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.PictureBoxControl.cs                     </Name>
//    <Description> Obrázkový kontainer                                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-04-24                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Utils;
using System.Windows.Forms;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// Obrázkový kontainer
    /// </summary>
    class PictureBoxControl : PictureBox
    {
        public PictureBoxControl()
        {
            this.SetStyle(ControlStyles.Selectable, false);
            this.SetStyle(ControlStyles.UserPaint, true);
            this.SetStyle(ControlStyles.AllPaintingInWmPaint, true);
            this.SetStyle(ControlStyles.DoubleBuffer, true);

            this.Cursor = null;
            this.Enabled = true;
            this.SizeMode = PictureBoxSizeMode.Normal;
        }

        protected override void WndProc(ref Message m)
        {
            if (m.Msg == Win32.WM_LBUTTONDOWN
                || m.Msg == Win32.WM_RBUTTONDOWN
                || m.Msg == Win32.WM_LBUTTONDBLCLK
                || m.Msg == Win32.WM_MOUSELEAVE
                || m.Msg == Win32.WM_MOUSEMOVE)
                //pošleme výše uvedenou zprávu zpět rodičovskému ovladači
                NativeMethods.PostMessage(this.Parent.Handle, (uint)m.Msg, m.WParam, m.LParam);
            else if (m.Msg == Win32.WM_LBUTTONUP)
                this.Parent.Invalidate();

            base.WndProc(ref m);
        }

    }
}
