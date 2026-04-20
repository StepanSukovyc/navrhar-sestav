//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DockPaneCaptionBase.cs                 </Name>
//    <Description> Základní dokovací podokno titulku                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-04                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using System.Drawing;
using System.Security.Permissions;

namespace Gordic.GFE.Parsers.Docking
{
    /// <summary>
    /// Základní dokovací podokno titulku
    /// </summary>
	abstract public class DockPaneCaptionBase : Control
	{
        private readonly DockPane m_dockPane;
        /// <summary>
        /// Dokovatelné podokno
        /// </summary>
        protected DockPane DockPane { get { return m_dockPane; } }
        /// <summary>
        /// Vzhled podokna
        /// </summary>
        protected DockPane.AppearanceStyle Appearance { get { return DockPane.Appearance; } }
        /// <summary>
        /// Indikuje existencí kontextového menu
        /// </summary>
        protected bool HasTabPageContextMenu { get { return DockPane.HasTabPageContextMenu; } }

        /// <exclude/>
        protected internal abstract int MeasureHeight();

        /// <summary>
        /// Vytvoøení nové instance tøídy
        /// </summary>
        /// <param name="pane">Podokno pro dokování</param>
		protected internal DockPaneCaptionBase(DockPane pane)
		{
			m_dockPane = pane;

			SetStyle(ControlStyles.OptimizedDoubleBuffer |
                ControlStyles.ResizeRedraw |
                ControlStyles.UserPaint |
                ControlStyles.AllPaintingInWmPaint, true);
			SetStyle(ControlStyles.Selectable, false);
		}

        /// <summary>
        /// Zobrazení kontextového menu
        /// </summary>
        /// <param name="position"></param>
        protected void ShowTabPageContextMenu(Point position)
        {
            DockPane.ShowTabPageContextMenu(this, position);
        }
        
        /// <exclude/>
        protected override void OnMouseUp(MouseEventArgs e)
        {
            base.OnMouseUp(e);

            if (e.Button == MouseButtons.Right)
                ShowTabPageContextMenu(new Point(e.X, e.Y));
        }
        /// <exclude/>
        protected override void OnMouseDown(MouseEventArgs e)
        {
            base.OnMouseDown(e);

            if (e.Button == MouseButtons.Left &&
			    DockPane.DockPanel.AllowEndUserDocking &&
                DockPane.AllowDockDragAndDrop &&
				!DockHelper.IsDockStateAutoHide(DockPane.DockState) &&
                DockPane.ActiveContent != null)
				DockPane.DockPanel.BeginDrag(DockPane);
        }
        /// <exclude/>
        [SecurityPermission(SecurityAction.LinkDemand, Flags = SecurityPermissionFlag.UnmanagedCode)]         
        protected override void WndProc(ref Message m)
        {
            if (m.Msg == (int)Msgs.WM_LBUTTONDBLCLK)
            {
                if (DockHelper.IsDockStateAutoHide(DockPane.DockState))
                {
                    DockPane.DockPanel.ActiveAutoHideContent = null;
                    return;
                }

                if (DockPane.IsFloat)
                    DockPane.RestoreToPanel();
                else
                    DockPane.Float();
            }
            base.WndProc(ref m);
        }

		internal void RefreshChanges()
		{
            if (IsDisposed)
                return;

			OnRefreshChanges();
		}

        /// <exclude/>
        protected virtual void OnRightToLeftLayoutChanged() { }
        /// <exclude/>
        protected virtual void OnRefreshChanges() { }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            this.ResumeLayout(false);

        }
	}
}
