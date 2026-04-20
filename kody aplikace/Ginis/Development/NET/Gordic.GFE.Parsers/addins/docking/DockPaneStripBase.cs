//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DockPaneStripBase.cs                   </Name>
//    <Description> Základní dokovací pruh                                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-04                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Collections;
using System.Collections.Generic;
using System.Security.Permissions;
using System.Diagnostics.CodeAnalysis;
using Gordic.General;

namespace Gordic.GFE.Parsers.Docking
{
    /// <summary>
    /// Základní dokovací pruh
    /// </summary>
	abstract public class DockPaneStripBase : Control
	{
        /// <summary>
        /// Záložka pruhu
        /// </summary>
        [SuppressMessage("Microsoft.Design", "CA1034:NestedTypesShouldNotBeVisible")]        
        protected internal class Tab : IDisposable
        {
            #region IDisposable
            /// <summary>
            /// uvolnìní objektu
            /// </summary>
            public void Dispose()
            {
                Dispose(true);
                GC.SuppressFinalize(this);
            }
            /// <summary>
            /// uvolnìní objektu
            /// </summary>
            /// <param name="disposing"></param>
            protected virtual void Dispose(bool disposing){ }
            /// <summary>
            /// finalizer objektu
            /// </summary>
            ~Tab() { Dispose(false); }
            #endregion

            private readonly IDockContent m_content;
            /// <summary>
            /// vytvoøení nové instance tøídy
            /// </summary>
            /// <param name="content">Obsah</param>
            public Tab(IDockContent content)
            {
                m_content = content;
            }

            /// <summary>
            /// Obsah záložky
            /// </summary>
            public IDockContent Content { get { return m_content; } }

            /// <summary>
            /// Form obsahu
            /// </summary>
            public Form ContentForm { get { return m_content as Form; } }
        }

        /// <summary>
        /// KOlekce záložek
        /// </summary>
        [SuppressMessage("Microsoft.Design", "CA1034:NestedTypesShouldNotBeVisible")]        
        protected sealed class TabCollection : IEnumerable<Tab>
        {
            #region IEnumerable Members
            IEnumerator<Tab> IEnumerable<Tab>.GetEnumerator()
            {
                for (int i = 0; i < Count; i++)
                    yield return this[i];
            }

            IEnumerator IEnumerable.GetEnumerator()
            {
                for (int i = 0; i < Count; i++)
                    yield return this[i];
            }
            #endregion

            internal TabCollection(DockPane pane)
            {
                m_dockPane = pane;
            }

            private readonly DockPane m_dockPane;
            /// <summary>
            /// Dokovací podokno kolekce
            /// </summary>
            public DockPane DockPane { get { return m_dockPane; } }
            /// <summary>
            /// Poèet záložek v kolekci
            /// </summary>
            public int Count { get { return DockPane.DisplayingContents.Count; } }
            /// <summary>
            /// Získání záložky dle pozice
            /// </summary>
            /// <param name="index"></param>
            /// <returns></returns>
            public Tab this[int index]
            {
                get
                {
                    IDockContent content = DockPane.DisplayingContents[index];
                    if (content == null)
                        throw (new ArgumentOutOfRangeException(GResources.GetResourceText(29450038) + Convert.ToString(index) + GResources.GetResourceText(29450036))); //RC 29450036 :  je mimo rozsah!
                    return content.DockHandler.GetTab(DockPane.TabStripControl);
                }
            }
            /// <summary>
            /// Zjištìní, zda záložka je v kolekci
            /// </summary>
            /// <param name="tab">Záložka pro zjištìní</param>
            /// <returns></returns>
            public bool Contains(Tab tab) { return (IndexOf(tab) != -1); }
            /// <summary>
            /// Zjištìní, zda kolekce obsahuje dokovatelný obsah
            /// </summary>
            /// <param name="content">Obsah pro zjištìní</param>
            /// <returns></returns>
            public bool Contains(IDockContent content) { return (IndexOf(content) != -1); }
            /// <summary>
            /// Pozice záložky v seznamu
            /// </summary>
            /// <param name="tab">Záložka</param>
            /// <returns></returns>
            public int IndexOf(Tab tab)
            {
                if (tab == null)
                    return -1;

                return DockPane.DisplayingContents.IndexOf(tab.Content);
            }
            /// <summary>
            /// Pozice obsahu v seznamu
            /// </summary>
            /// <param name="content">Obsah</param>
            /// <returns></returns>
            public int IndexOf(IDockContent content)
            {
                return DockPane.DisplayingContents.IndexOf(content);
            }
        }
        /// <summary>
        /// Vytvoøení nové instance tøídy
        /// </summary>
        /// <param name="pane">Dokovatelné podokno</param>
		protected DockPaneStripBase(DockPane pane)
		{
			m_dockPane = pane;

			SetStyle(ControlStyles.OptimizedDoubleBuffer, true);
			SetStyle(ControlStyles.Selectable, false);
            AllowDrop = true;
		}

		private readonly DockPane m_dockPane;
        /// <summary>
        /// Dokovatelné podokno daného pruhu
        /// </summary>
        protected DockPane DockPane { get { return m_dockPane; } }
        /// <summary>
        /// Vzhled podokna
        /// </summary>
        protected DockPane.AppearanceStyle Appearance { get { return DockPane.Appearance; } }

        private TabCollection m_tabs = null;
        /// <summary>
        /// Záložky
        /// </summary>
		protected TabCollection Tabs
		{
			get
            {
                if (m_tabs == null)
                    m_tabs = new TabCollection(DockPane);

                return m_tabs;
            }
		}

		internal void RefreshChanges()
		{
            if (IsDisposed)
                return;

			OnRefreshChanges();
		}
        /// <exclude/>
        protected virtual void OnRefreshChanges()
		{
		}
        /// <exclude/>
		protected internal abstract int MeasureHeight();

        /// <exclude/>
        protected internal abstract void EnsureTabVisible(IDockContent content);

        /// <exclude/>
        protected int HitTest()
		{
			return HitTest(PointToClient(Control.MousePosition));
		}

        /// <exclude/>
        protected internal abstract int HitTest(Point point);

        /// <exclude/>
        protected internal abstract GraphicsPath GetOutline(int index);

        /// <summary>
        /// Vytvoøení záložky s obsahem
        /// </summary>
        /// <param name="content">Obsah záložky</param>
        /// <returns></returns>
        protected internal virtual Tab CreateTab(IDockContent content)
        {
            return new Tab(content);
        }
        /// <exclude/>
        protected override void OnMouseDown(MouseEventArgs e)
        {
            base.OnMouseDown(e);

            int index = HitTest();
            if (index != -1)
            {
                IDockContent content = Tabs[index].Content;
                if (DockPane.ActiveContent != content)
                    DockPane.ActiveContent = content;
            }

            if (e.Button == MouseButtons.Left)
            {
                if (DockPane.DockPanel.AllowEndUserDocking && DockPane.AllowDockDragAndDrop && DockPane.ActiveContent.DockHandler.AllowEndUserDocking)
                    DockPane.DockPanel.BeginDrag(DockPane.ActiveContent.DockHandler);
            }
        }

        /// <summary>
        /// Indikuje existencí kontextového menu záložky
        /// </summary>
        protected bool HasTabPageContextMenu
        {
            get { return DockPane.HasTabPageContextMenu; }
        }

        /// <summary>
        /// Zobrazení kontextového menu záložky
        /// </summary>
        /// <param name="position">Pozice pro zobrazení</param>
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
        [SecurityPermission(SecurityAction.LinkDemand, Flags = SecurityPermissionFlag.UnmanagedCode)]
        protected override void WndProc(ref Message m)
        {
            if (m.Msg == (int)Msgs.WM_LBUTTONDBLCLK)
            {
                base.WndProc(ref m);

                int index = HitTest();
                if (DockPane.DockPanel.AllowEndUserDocking && index != -1)
                {
                    IDockContent content = Tabs[index].Content;
                    if (content.DockHandler.CheckDockState(!content.DockHandler.IsFloat) != DockState.Unknown)
                        content.DockHandler.IsFloat = !content.DockHandler.IsFloat;
                }

                return;
            }
            else if (m.Msg == (int)Msgs.WM_MBUTTONUP)
            {
                base.WndProc(ref m);
                int index = HitTest();
                if (index != -1)
                    DockPane.CloseContent(Tabs[index].Content);
                return;
            }

            base.WndProc(ref m);
            return;
        }

        /// <exclude/>
        protected override void OnDragOver(DragEventArgs drgevent)
        {
            base.OnDragOver(drgevent);

            int index = HitTest();
            if (index != -1)
            {
                IDockContent content = Tabs[index].Content;
                if (DockPane.ActiveContent != content)
                    DockPane.ActiveContent = content;
            }
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            this.ResumeLayout(false);

        }
	}
}
