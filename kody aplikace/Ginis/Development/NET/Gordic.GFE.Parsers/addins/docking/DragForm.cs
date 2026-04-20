//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DragForm.cs                            </Name>
//    <Description> Vytvoøení nové instance tøídy                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-04                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;

namespace Gordic.GFE.Parsers.Docking
{
    // Inspired by Chris Sano's article:
    // http://msdn.microsoft.com/smartclient/default.aspx?pull=/library/en-us/dnwinforms/html/colorpicker.asp
    // In Sano's article, the DragForm needs to meet the following criteria:
    // (1) it was not to show up in the task bar;
    //     ShowInTaskBar = false
    // (2) it needed to be the top-most window;
    //     TopMost = true (not necessary here)
    // (3) its icon could not show up in the ALT+TAB window if the user pressed ALT+TAB during a drag-and-drop;
    //     FormBorderStyle = FormBorderStyle.None;
    //     Create with WS_EX_TOOLWINDOW window style.
    //     Compares with the solution in the artile by setting FormBorderStyle as FixedToolWindow,
    //     and then clip the window caption and border, this way is much simplier.
    // (4) it was not to steal focus from the application when displayed.
    //     User Win32 ShowWindow API with SW_SHOWNOACTIVATE
    // In addition, this form should only for display and therefore should act as transparent, otherwise
    // WindowFromPoint will return this form, instead of the control beneath. Need BOTH of the following to
    // achieve this (don't know why, spent hours to try it out :( ):
    //  1. Enabled = false;
    //  2. WM_NCHITTEST returns HTTRANSPARENT
    /// <summary>
    /// Tažený formuláø
    /// </summary>
    class DragForm : Form
	{
        /// <summary>
        /// Vytvoøení nové instance tøídy
        /// </summary>
		public DragForm()
		{
			FormBorderStyle = FormBorderStyle.None;
			ShowInTaskbar = false;
			SetStyle(ControlStyles.Selectable, false);
			Enabled = false;
		}

		protected override CreateParams CreateParams
		{
			get
			{
				CreateParams createParams = base.CreateParams;
				createParams.ExStyle |= (int)WindowExStyles.WS_EX_TOOLWINDOW;
				return createParams;
			}
		}

		protected override void WndProc(ref Message m)
		{
			if (m.Msg == (int)Msgs.WM_NCHITTEST)
			{
				m.Result = (IntPtr)HitTest.HTTRANSPARENT;
				return;
			}

			base.WndProc (ref m);
		}

        /// <summary>
        /// Zobrazení 
        /// </summary>
        /// <param name="bActivate">Indikuje aktivací okna</param>
		public virtual void Show(bool bActivate)
		{
			if (bActivate)
				Show();
			else
                Gordic.GFE.Parsers.Utils.NativeMethods.ShowWindow(Handle, (int)ShowWindowStyles.SW_SHOWNOACTIVATE);
		}

        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(DragForm));
            this.SuspendLayout();
            // 
            // DragForm
            // 
            resources.ApplyResources(this, "$this");
            this.Name = "DragForm";
            this.ResumeLayout(false);

        }
	}
}
