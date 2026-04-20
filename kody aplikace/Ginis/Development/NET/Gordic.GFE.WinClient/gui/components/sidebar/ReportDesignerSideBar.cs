//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ReportDesignerSideBar.cs                 </Name>
//    <Description> Boční lišta návrháře sestav                                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-08                                                  </Created>
//  </FileHeader>

using System;
using System.Drawing;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Core.WinForm;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Base.Gui;

namespace Gordic.GFE.WinClient.Gui
{
    /// <summary>
    /// Delegát události s argumentem obsahujícím informaci o záložce
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    public delegate void SideTabEventHandler(object sender, SideTabEventArgs e);

    /// <summary>
    /// Argument obsahující informaci o záložce
    /// </summary>
    public class SideTabEventArgs : EventArgs
    {
        SideTab tab;
        /// <summary>
        /// Vytvoření nové instance třídy argumentu
        /// </summary>
        /// <param name="tab">Záložka</param>
        public SideTabEventArgs(SideTab tab)
        {
            this.tab = tab;
        }
        /// <summary>
        /// Informace o záložce
        /// </summary>
        public SideTab SideTab { get { return tab; } }
    }

    /// <summary>
    /// Boční lišta návrháře sestav
    /// </summary>
    public class ReportDesignerSideBar : SideBarControl, IOwnerState
    {
        /// <summary>
        /// Cesta ke konfigurací kontextového menu postranní lišty
        /// </summary>
        protected string contextMenuPath = "/ReportDesigner/Desktop/ReportDesignerSideBar/ContextMenu";
        /// <summary>
        /// Cesta ke konfiguraci kontextového menu postranní záložky
        /// </summary>
        protected string sideTabContextMenuPath = "/ReportDesigner/Desktop/ReportDesignerSideBar/SideTab/ContextMenu";

        /// <summary>
        /// Výčet stavů postranní lišty
        /// </summary>
        [Flags]
        public enum SidebarState
        {
            /// <summary>
            /// žádný
            /// </summary>
            Nothing = 0,
            /// <summary>
            /// lze posouvát nahoru
            /// </summary>
            CanMoveUp = 1,
            /// <summary>
            /// lze posouvát dolu
            /// </summary>
            CanMoveDown = 2,
            /// <summary>
            /// záložku lze odstranit
            /// </summary>
            TabCanBeDeleted = 4,
            /// <summary>
            /// položku lze posunout nahoru
            /// </summary>
            CanMoveItemUp = 8,
            /// <summary>
            /// položku lze posunout dolu
            /// </summary>
            CanMoveItemDown = 16,
            /// <summary>
            /// lze přejmenovat
            /// </summary>
            CanBeRenamed = 32
        }

        /// <summary>
        /// Interní stav postranní lišty
        /// </summary>
        protected SidebarState internalState = SidebarState.TabCanBeDeleted;
        /// <summary>
        /// Interní stav postranní lišty
        /// </summary>
        public Enum InternalState { get => internalState; }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public ReportDesignerSideBar()
        {
            SideTabItemFactory = new ReportDesignerSideTabItemFactory();

            MouseUp += new MouseEventHandler(SetContextMenu);
            sideTabContent.MouseUp += new MouseEventHandler(SetItemContextMenu);
        }
        /// <summary>
        /// Odstranění postranní záložky
        /// </summary>
        /// <param name="tab">Záložka k odstranění</param>
        public void DeleteSideTab(SideTab tab)
        {
            if (tab == null)
                return;

            Tabs.Remove(tab);
            OnSideTabDeleted(tab);
        }

        // Tab Context Menu
        void SetDeletedState(SideTabItem item)
        {
            SetDeletedState(item != null && item.CanBeDeleted);
        }
        void SetDeletedState(bool canBeDeleted)
        {
            if (canBeDeleted)
                internalState |= SidebarState.TabCanBeDeleted;
            else
                internalState = internalState & ~SidebarState.TabCanBeDeleted;
        }
        void SetRenameState(SideTabItem item)
        {
            SetRenameState(item != null && item.CanBeRenamed);

        }
        void SetRenameState(bool canBeRenamed)
        {
            if (canBeRenamed)
                internalState |= SidebarState.CanBeRenamed;
            else
                internalState = internalState & ~SidebarState.CanBeRenamed;
        }
        void SetContextMenu(object sender, MouseEventArgs e)
        {
            ExitRenameMode();

            int index = GetTabIndexAt(e.X, e.Y);
            if (index >= 0)
            {
                SideTab tab = Tabs[index];

                SetDeletedState(tab.CanBeDeleted);
                SetRenameState(tab.CanBeRenamed);

                if (index > 0)
                    internalState |= SidebarState.CanMoveUp;
                else
                    internalState = internalState & ~SidebarState.CanMoveUp;

                if (index < Tabs.Count - 1)
                    internalState |= SidebarState.CanMoveDown;
                else
                    internalState = internalState & ~(SidebarState.CanMoveDown);
                Tabs.DragOverTab = tab;
                Refresh();
                Tabs.DragOverTab = null;
            }

            if (e.Button == MouseButtons.Right)
                MenuService.ShowContextMenu(this, contextMenuPath, this, e.X, e.Y);
        }
        void SetItemContextMenu(object sender, MouseEventArgs e)
        {
            ExitRenameMode();
            if (e.Button == MouseButtons.Right)
            {
                int index = Tabs.IndexOf(ActiveTab);

                if (index > 0)
                    internalState |= SidebarState.CanMoveUp;
                else
                    internalState = internalState & ~SidebarState.CanMoveUp;

                if (index < Tabs.Count - 1)
                    internalState |= SidebarState.CanMoveDown;
                else
                    internalState = internalState & ~(SidebarState.CanMoveDown);

                Tabs.DragOverTab = ActiveTab;
                Refresh();
                Tabs.DragOverTab = null;
            }

            if (e.Button == MouseButtons.Right)
            {
                // nastavení korektního stavu moveup/down
                SetDeletedState(ActiveTab.SelectedItem);
                SetRenameState(ActiveTab.SelectedItem);

                int index = ActiveTab.Items.IndexOf(ActiveTab.SelectedItem);
                if (index > 0)
                    internalState |= SidebarState.CanMoveItemUp;
                else
                    internalState = internalState & ~(SidebarState.CanMoveItemUp);

                if (index < ActiveTab.Items.Count - 1)
                    internalState |= SidebarState.CanMoveItemDown;
                else
                    internalState = internalState & ~(SidebarState.CanMoveItemDown);

                MenuService.ShowContextMenu(this, sideTabContextMenuPath, sideTabContent, e.X, e.Y);
            }
        }
        void OnSideTabDeleted(SideTab tab)
        {
            SideTabDeleted?.Invoke(this, new SideTabEventArgs(tab));
        }

        /// <summary>
        /// Událost, která se volá po odstranění postranní záložky
        /// </summary>
        public event SideTabEventHandler SideTabDeleted;
        /// <summary>
        /// Pozice myši nad postranní lištou
        /// </summary>
        public Point SideBarMousePosition { get; private set; }
        /// <exclude/>
        protected override void OnMouseMove(MouseEventArgs e)
        {
            base.OnMouseMove(e);
            this.SideBarMousePosition = new Point(e.X, e.Y);
        }
    }
}
