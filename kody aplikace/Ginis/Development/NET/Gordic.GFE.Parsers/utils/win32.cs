//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.win32.cs                                 </Name>
//    <Description> Pomocná třída volání API knihoven                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-03-15                                                  </Created>
//  </FileHeader>

using System;
using System.Text;
using System.Drawing;
using System.Runtime.InteropServices;
using System.Runtime.InteropServices.ComTypes;
using Gordic.GFE.Parsers.Gui;
using Microsoft.Win32.SafeHandles;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Utils;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// Pomocná třída volání API knihoven
    /// </summary>
    public class Win32
    {

        const int WM_SETTEXT = 12;
        const int WM_GETTEXT = 13;

        /// <exclude/>
        public const int WM_MOUSEMOVE = 0x0200;
        /// <exclude/>
        public const int WM_LBUTTONDOWN = 0x0201;
        /// <exclude/>
        public const int WM_LBUTTONUP = 0x0202;
        /// <exclude/>
        public const int WM_RBUTTONDOWN = 0x0204;
        /// <exclude/>
        public const int WM_LBUTTONDBLCLK = 0x0203;
        /// <exclude/>
        public const int WM_SETFOCUS = 0x0007;
        /// <exclude/>
        public const int WM_KILLFOCUS = 0x0008;
        /// <exclude/>
        public const int WM_MOUSELEAVE = 0x02A3;

        /// <exclude/>
        public const int WM_PAINT = 0x000F;
        /// <exclude/>
        public const int WM_ERASEBKGND = 0x0014;
        /// <exclude/>
        public const int VK_TAB = 0x09;
        /// <exclude/>
        public const int WM_KEYDOWN = 0x0100;
        /// <exclude/>
        public const int WM_KEYUP = 0x0101;

        /// <exclude/>
        public const int WM_PRINT = 0x0317;

        //const int EN_HSCROLL       =   0x0601;
        //const int EN_VSCROLL       =   0x0602;

        /// <exclude/>
        public const int WM_HSCROLL = 0x0114;
        /// <exclude/>
        public const int WM_VSCROLL = 0x0115;



        /*
            BOOL PostMessage(          HWND hWnd,
                UINT Msg,
                WPARAM wParam,
                LPARAM lParam
                );
        */



        /// <exclude/>
        public const int LR_SHARED = 0x8000;
        /// <exclude/>
        public const int LR_LOADFROMFILE = 0x0010;
        /// <exclude/>
        public const int LR_CREATEDIBSECTION = 0x2000;

        const int WM_PRINTCLIENT = 0x0318;

        const long PRF_CHECKVISIBLE = 0x00000001L;
        const long PRF_NONCLIENT = 0x00000002L;
        const long PRF_CLIENT = 0x00000004L;
        const long PRF_ERASEBKGND = 0x00000008L;
        const long PRF_CHILDREN = 0x00000010L;
        const long PRF_OWNED = 0x00000020L;


        public const int SW_SHOWNORMAL = 1;
        public const int SW_SHOWMINIMIZED = 2;
        public const int SW_SHOWMAXIMIZED = 3;
        public const int SW_SHOWNOACTIVATE = 4;
        public const int SW_SHOW = 5;
        public const int SW_SHOWMINNOACTIVE = 7;
        public const int SW_SHOWNA = 8;
        public const int SW_SHOWDEFAULT = 10;

        /// <summary>
        /// Je to systémový příkaz
        /// </summary>
        public const int WM_SYSCOMMAND = 274;
        /// <summary>
        /// Nastavit oknu styl na MAXIMALIZOVANé
        /// </summary>
        public const int SC_MAXIMIZE = 61488;

        /*
        enum  CaptureOptions : long
        {
            PRF_CHECKVISIBLE= 0x00000001L,
            PRF_NONCLIENT	= 0x00000002L,
            PRF_CLIENT		= 0x00000004L,
            PRF_ERASEBKGND	= 0x00000008L,
            PRF_CHILDREN	= 0x00000010L,
            PRF_OWNED		= 0x00000020L
        }
        */

        /// <summary>
        /// Získání obsahu okna
        /// </summary>
        /// <param name="control">Ovladač okna</param>
        /// <param name="bitmap">Bitmapa obsahu</param>
        /// <returns></returns>
        public static bool CaptureWindow(System.Windows.Forms.Control control,
                                ref System.Drawing.Bitmap bitmap)
        {
            //Tato funkce zachycuje obsah okna

            Graphics g2 = Graphics.FromImage(bitmap);
            g2.Transform = new System.Drawing.Drawing2D.Matrix((control as IEditControl).ZoomFactor, 0, 0, (control as IEditControl).ZoomFactor, 0, 0);
            //PRF_CHILDREN // PRF_NONCLIENT
            int meint = (int)(PRF_CLIENT | PRF_ERASEBKGND); //| PRF_OWNED ); //  );
            System.IntPtr meptr = new System.IntPtr(meint);

            System.IntPtr hdc = g2.GetHdc();
            NativeMethods.SendMessage(control.Handle, Win32.WM_PRINT, hdc, meptr);

            g2.ReleaseHdc(hdc);
            g2.Dispose();

            return true;

        }

        /// <summary>
        /// Získání ovladače dle pozice
        /// </summary>
        /// <param name="pt">Pozice, na které se hledá ovladač</param>
        /// <returns></returns>
        public static Control ControlAtPoint(Point pt)
        {
            return Control.FromChildHandle(Utils.NativeMethods.WindowFromPoint(pt));
        }

        /// <exclude/>
        public static IntPtr MakeLong(int low, int high)
        {            
            return new IntPtr(((high << 16) + low));
        }
    }
}
