//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SideBarControl.cs                      </Name>
//    <Description> Ovladač boční lišty                                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Drawing;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Utils;
using Gordic.General;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.FormatOffice;

namespace Gordic.GFE.WinClient.Base.Gui
{
    /// <summary>
    /// Rozhraní pro fabriky vytvářené postranních lišt
    /// </summary>
    public interface ISideTabFactory
    {
        /// <summary>
        /// Vytvoření postranní záložky
        /// </summary>
        /// <param name="sideBar">Postranní lišta</param>
        /// <param name="name">Název vytvářené záložky</param>
        /// <returns></returns>
        SideTab CreateSideTab(SideBarControl sideBar, string name);
    }

    /// <summary>
    /// Výchozí fabrika pro vytváření záložek
    /// </summary>
    public class DefaultSideTabFactory : ISideTabFactory
    {
        /// <summary>
        /// Vytvoření postranní záložky
        /// </summary>
        /// <param name="sideBar">Postranní lišta</param>
        /// <param name="name">Název vytvářené záložky</param>
        /// <returns></returns>
        public SideTab CreateSideTab(SideBarControl sideBar, string name) => new SideTab(sideBar, name);
    }

    /// <summary>
    /// Ovladač boční lišty
    /// </summary>
    public class SideBarControl : UserControl
    {
        /// <summary>
        /// Obsah záložky postranní lišty
        /// </summary>
        protected SideTabContent sideTabContent = new SideTabContent();

        SideTab renameTab = null;
        SideTab activeTab = null;
        SideTabItem renameTabItem = null;
        TextBox renameTextBox = new TextBox();
        ScrollBar scrollBar = new VScrollBar();
        bool dropEscapePressed = false;
        Point mousePosition;

        /// <summary>
        /// Přidání záložky
        /// </summary>
        public bool DoAddTab { get; set; } = false;

        /// <summary>
        /// Fabrika na vytváření postranních položek
        /// </summary>
        public ISideTabItemFactory SideTabItemFactory { get; set; } = new DefaultSideTabItemFactory();
        /// <summary>
        /// Fabrika na vytvářeni postranních záložek
        /// </summary>
        public ISideTabFactory SideTabFactory { get; set; } = new DefaultSideTabFactory();
        /// <summary>
        /// KOlekce záložek
        /// </summary>
        public SideTabCollection Tabs { get; }
        /// <summary>
        /// Aktivní záložka
        /// </summary>
        public SideTab ActiveTab
        {
            get => activeTab;
            set
            {
                if (activeTab != value)
                {
                    if (activeTab != null)
                        activeTab.ScrollIndex = scrollBar.Value;
                    activeTab = value;
                    if (activeTab != null)
                    {
                        scrollBar.SmallChange = 1;
                        scrollBar.LargeChange = sideTabContent.Height / activeTab.ItemHeight;
                        scrollBar.Maximum = activeTab.Items.Count;
                        scrollBar.Value = activeTab.ScrollIndex;
                    }
                }
                Refresh();
            }
        }

        /// <exclude/>
        protected override void OnResize(System.EventArgs e)
        {
            base.OnResize(e);
            if (activeTab != null)
                scrollBar.LargeChange = sideTabContent.Height / activeTab.ItemHeight;
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public SideBarControl()
        {
            ResizeRedraw = true;
            AllowDrop = true;

            Tabs = new SideTabCollection(this);
            SetStyle(ControlStyles.UserPaint, true);
            SetStyle(ControlStyles.OptimizedDoubleBuffer, true);
            SetStyle(ControlStyles.AllPaintingInWmPaint, true);
            SetStyle(ControlStyles.CacheText, true);

            renameTextBox.Visible = false;
            renameTextBox.BorderStyle = BorderStyle.None;

            Controls.Add(renameTextBox);

            scrollBar.Scroll += new ScrollEventHandler(ScrollBarScrolled);
            Controls.Add(scrollBar);

            sideTabContent.SideBar = this;
            Controls.Add(sideTabContent);
        }

        /// <summary>
        /// Zpracování události vystupu z přejmenovacího režimu
        /// </summary>
        protected void ExitRenameMode()
        {
            if (renameTab != null)
            {
                renameTextBox.Visible = false;
                renameTab = null;
                DoAddTab = false;
            }
            else if (renameTabItem != null)
            {
                renameTextBox.Visible = false;
                renameTabItem = null;
            }
        }

        /// <summary>
        /// Zajištění viditelnosti položky postranní záložky
        /// </summary>
        /// <param name="item">Daná položka</param>
        public void EnsureVisible(SideTabItem item)
        {
            int index = activeTab.Items.IndexOf(item);
            if (index != -1)
            {
                if (index < scrollBar.Value)
                {
                    scrollBar.Value = Math.Max(scrollBar.Minimum, Math.Min(scrollBar.Maximum, index));
                    ScrollBarScrolled(null, null);
                }
                else if (index > scrollBar.Value + (sideTabContent.Height - 15) / 20)
                {
                    scrollBar.Value = Math.Max(scrollBar.Minimum, Math.Min(scrollBar.Maximum, index - (sideTabContent.Height - 15) / 20));
                    ScrollBarScrolled(null, null);
                }
            }
        }

        /// <exclude/>
        protected override bool ProcessCmdKey(ref Message msg, Keys keyData)
        {
            int index;
            if (base.ProcessCmdKey(ref msg, keyData))
                return true;
            bool isInRenameMode = renameTab != null || renameTabItem != null;

            switch (keyData)
            {
                case Keys.Home:
                    if (activeTab.Items.Count > 0 && !isInRenameMode)
                    {
                        activeTab.ChoosedItem = activeTab.Items[0];
                        EnsureVisible(activeTab.ChoosedItem);
                        Refresh();
                    }
                    break;
                case Keys.End:
                    if (activeTab.Items.Count > 0 && !isInRenameMode)
                    {
                        activeTab.ChoosedItem = activeTab.Items[activeTab.Items.Count - 1];
                        EnsureVisible(activeTab.ChoosedItem);
                        Refresh();
                    }
                    break;
                case Keys.PageUp:
                    if (activeTab.Items.Count > 0 && !isInRenameMode)
                    {
                        index = Math.Max(0, activeTab.Items.IndexOf(activeTab.ChoosedItem) - scrollBar.LargeChange);
                        activeTab.ChoosedItem = activeTab.Items[index];
                        EnsureVisible(activeTab.ChoosedItem);
                        Refresh();
                    }
                    break;
                case Keys.PageDown:
                    if (activeTab.Items.Count > 0 && !isInRenameMode)
                    {
                        index = Math.Min(activeTab.Items.Count - 1, activeTab.Items.IndexOf(activeTab.ChoosedItem) + scrollBar.LargeChange);
                        activeTab.ChoosedItem = activeTab.Items[index];
                        EnsureVisible(activeTab.ChoosedItem);
                        Refresh();
                    }
                    break;
                case Keys.Down:
                    if (activeTab.Items.Count > 0 && !isInRenameMode)
                    {
                        if (activeTab.ChoosedItem != null)
                            activeTab.ChoosedItem = activeTab.Items[Math.Min(activeTab.Items.Count - 1, activeTab.Items.IndexOf(activeTab.ChoosedItem) + 1)];
                        else
                            activeTab.ChoosedItem = activeTab.Items[0];
                        activeTab.SelectedItem = null;
                        EnsureVisible(activeTab.ChoosedItem);
                        Refresh();
                    }
                    return true;
                case Keys.Up:
                    if (activeTab.Items.Count > 0 && !isInRenameMode)
                    {
                        if (activeTab.ChoosedItem != null)
                            activeTab.ChoosedItem = activeTab.Items[Math.Max(0, activeTab.Items.IndexOf(activeTab.ChoosedItem) - 1)];
                        else
                            activeTab.ChoosedItem = activeTab.Items[0];
                        activeTab.SelectedItem = null;
                        EnsureVisible(activeTab.ChoosedItem);
                        Refresh();
                    }
                    return true;
                case Keys.Control | Keys.Up:
                    ActiveTab = Tabs[Math.Max(0, Tabs.IndexOf(ActiveTab) - 1)];
                    Refresh();
                    return true;
                case Keys.Control | Keys.Down:
                    ActiveTab = Tabs[Math.Min(Tabs.Count - 1, Tabs.IndexOf(ActiveTab) + 1)];
                    Refresh();
                    return true;
                case Keys.Return:
                    if (renameTab != null)
                    {
                        renameTab.Name = renameTextBox.Text;
                        ExitRenameMode();
                    }
                    else if (renameTabItem != null)
                    {
                        renameTabItem.Name = renameTextBox.Text;
                        ExitRenameMode();
                    }
                    return true;
                case Keys.Escape:
                    if (renameTab != null)
                    {
                        if (DoAddTab)
                        {
                            Tabs.RemoveAt(Tabs.Count - 1);
                            renameTab = null;
                            renameTextBox.Visible = false;
                            DoAddTab = false;
                            Refresh();
                        }
                        else
                            ExitRenameMode();
                    }
                    else if (renameTabItem != null)
                        ExitRenameMode();
                    return true;
            }
            return false;
        }
        /// <summary>
        /// Začátek přejmenování položky postranní záložky
        /// </summary>
        /// <param name="item">Položka postranní záložky</param>
        public void StartRenamingOf(SideTabItem item)
        {
            EnsureVisible(item);
            renameTabItem = item;

            Point location = activeTab.GetLocation(item);
            location.X += Bounds.X + 5 + sideTabContent.Location.X + 16;
            location.Y += Bounds.Y + 3 + sideTabContent.Location.Y - scrollBar.Value * 20;
            renameTextBox.Location = location;

            renameTextBox.Width = Width - 10;
            renameTextBox.Height = Font.Height - 2;
            renameTextBox.Text = item.Name;
            renameTextBox.Visible = true;
            renameTextBox.Focus();
        }

        /// <summary>
        /// Začátek přejmenování záložky
        /// </summary>
        /// <param name="tab">POstranní záložka</param>
        public void StartRenamingOf(SideTab tab)
        {
            int index = Tabs.IndexOf(tab);
            renameTab = Tabs[index];
            Point location = GetLocation(renameTab);
            location.X += 3;
            location.Y += 1;
            renameTextBox.Location = location;
            renameTextBox.Width = Width - 10;
            renameTextBox.Height = Font.Height - 2;
            renameTextBox.Text = renameTab.Name;
            renameTextBox.Visible = true;
            renameTextBox.Focus();
        }

        void ItemContextMenuPopup(object sender, EventArgs e)
        {
            activeTab.ChoosedItem = activeTab.SelectedItem;
            Refresh();
        }

        /// <summary>
        /// Získání umístění záložky
        /// </summary>
        /// <param name="whichTab">Postranní záložka</param>
        /// <returns></returns>
        public Point GetLocation(SideTab whichTab)
        {
            int i = 0;

            int lastUpperY = 0;

            for (; i < Tabs.Count; ++i)
            {
                SideTab tab = Tabs[i];

                int yPos = i * (Font.Height + 4 + 1);
                if (tab == whichTab)
                    return new Point(0, yPos);
                lastUpperY = yPos + Font.Height + 4;
                if (tab == activeTab)
                    break;
            }

            int bottom = Height;

            for (int j = Tabs.Count - 1; j > i; --j)
            {
                SideTab tab = Tabs[j];

                int yPos = Height - (-j + Tabs.Count) * (Font.Height + 4 + 1);

                if (yPos < lastUpperY + (Font.Height + 4 + 1))
                    break;

                bottom = yPos;
                if (tab == whichTab)
                    return new Point(0, yPos);
            }

            return new Point(-1, -1);
        }
        /// <summary>
        /// Získání záložky dle umístění
        /// </summary>
        /// <param name="x">Pozice X umístění</param>
        /// <param name="y">Pozice Y umístění</param>
        /// <returns></returns>
        public SideTab GetTabAt(int x, int y)
        {
            int lastUpperY = 0;
            int i = 0;
            for (; i < Tabs.Count; ++i)
            {
                SideTab tab = Tabs[i];

                int yPos = i * (Font.Height + 4 + 1);

                lastUpperY = yPos + Font.Height + 4;

                if (y >= yPos && y <= lastUpperY)
                    return tab;
                if (tab == activeTab)
                    break;
            }

            for (int j = Tabs.Count - 1; j > i; --j)
            {
                SideTab tab = Tabs[j];

                int yPos = Height - (-j + Tabs.Count) * (Font.Height + 4 + 1);

                if (yPos < lastUpperY)
                    break;
                if (y >= yPos && y <= yPos + Font.Height + 4)
                    return tab;
            }
            return null;
        }

        /// <summary>
        /// Získání indexu záložky dle pozice
        /// </summary>
        /// <param name="x">POzice X záložky</param>
        /// <param name="y">POzice Y záložky</param>
        /// <returns></returns>
        public int GetTabIndexAt(int x, int y)
        {
            int lastUpperY = 0;
            int i = 0;
            for (; i < Tabs.Count; ++i)
            {
                SideTab tab = Tabs[i];

                int yPos = i * (Font.Height + 4 + 1);

                lastUpperY = yPos + Font.Height + 4;

                if (y >= yPos && y <= lastUpperY)
                    return i;
                if (tab == activeTab)
                    break;
            }

            for (int j = Tabs.Count - 1; j > i; --j)
            {
                SideTab tab = Tabs[j];

                int yPos = Height - (-j + Tabs.Count) * (Font.Height + 4 + 1);

                if (yPos < lastUpperY + (Font.Height + 4 + 1))
                    break;
                if (y >= yPos && y <= yPos + Font.Height + 4)
                    return j;
            }
            return -1;
        }

        static DragDropEffects GetDragDropEffect(DragEventArgs e)
        {
            if ((e.AllowedEffect & DragDropEffects.Move) > 0 &&
                (e.AllowedEffect & DragDropEffects.Copy) > 0)
                return (e.KeyState & 8) > 0 ? DragDropEffects.Copy : DragDropEffects.Move;
            else if ((e.AllowedEffect & DragDropEffects.Move) > 0)
                return DragDropEffects.Move;
            else if ((e.AllowedEffect & DragDropEffects.Copy) > 0)
                return DragDropEffects.Copy;
            return DragDropEffects.None;
        }

        /// <exclude/>
        protected override void OnDragEnter(DragEventArgs e)
        {
            ExitRenameMode();

            base.OnDragEnter(e);

            if (e.Data.GetDataPresent(typeof(SideTabItem)))
                e.Effect = (e.KeyState & 8) > 0 ? DragDropEffects.Copy : DragDropEffects.Move;
            else if (e.Data.GetDataPresent(typeof(SideTab)))
            {
                SideTab tab = (SideTab)e.Data.GetData(typeof(SideTab));
                if (Tabs.Contains(tab))
                {
                    Tabs.DragOverTab = tab;
                    e.Effect = GetDragDropEffect(e);
                }
                else
                    e.Effect = DragDropEffects.None;
            }
            else if (e.Data.GetDataPresent(typeof(string)))
                e.Effect = GetDragDropEffect(e);
            else
                e.Effect = DragDropEffects.None;
        }

        /// <exclude/>
        protected override void OnDragLeave(EventArgs e)
        {
            base.OnDragLeave(e);
            Tabs.DragOverTab = null;
            ClearDraggings(activeTab);
            Refresh();
        }

        /// <exclude/>
        protected override void OnDragDrop(DragEventArgs e)
        {
            base.OnDragDrop(e);

            Point p = PointToClient(new Point(e.X, e.Y));
            if (e.Data.GetDataPresent(typeof(SideTabItem)))
            {
                SideTabItem draggedItem = (SideTabItem)e.Data.GetData(typeof(SideTabItem));
                // tažení tabitem na jiný sideTab
                SideTab tab = GetTabAt(p.X, p.Y);
                if (tab != null)
                {
                    if (tab == Tabs.DragOverTab && tab.CanDragDrop)
                    {
                        Tabs.DragOverTab.SideTabStatus = SideTabStatus.Normal;
                        draggedItem.SideTabItemStatus = SideTabItemStatus.Normal;
                        switch (e.Effect)
                        {
                            case DragDropEffects.Move:
                                if (Tabs.DragOverTab != activeTab)
                                {
                                    activeTab.Items.Remove(draggedItem);
                                    Tabs.DragOverTab.Items.Add(draggedItem);
                                }
                                break;
                            case DragDropEffects.Copy:
                                SideTabItem newItem = draggedItem.Clone();
                                Tabs.DragOverTab.Items.Add(newItem);
                                break;
                        }
                        Tabs.DragOverTab = null;
                        Refresh();
                    }
                }
            }
            else if (e.Data.GetDataPresent(typeof(string)))
            {
                if (Tabs.DragOverTab != null)
                {
                    string str = (string)e.Data.GetData(typeof(string));
                    Tabs.DragOverTab.Items.Add(GResources.GetResourceText(29450370) + ':' + str.Trim(), str); //RC 29450370 : Text
                }
                Tabs.DragOverTab = null;
                Refresh();
            }
            else
            {
                Tabs.DragOverTab = null;
                Refresh();
            }
        }

        void ClearDraggings(SideTab tab)
        {
            foreach (SideTabItem item in tab.Items)
                if (item.SideTabItemStatus == SideTabItemStatus.Drag)
                    item.SideTabItemStatus = SideTabItemStatus.Normal;
        }

        /// <exclude/>
        protected override void OnDragOver(DragEventArgs e)
        {
            ExitRenameMode();
            base.OnDragOver(e);

            dropEscapePressed = false;
            if (SimpleDesktop.Desktop.ActiveViewContent is IOfficeControl)
            {
                var draggedItem = e.Data.GetData(typeof(SideTabItem)) ?? (ReportDesignerSideTabItem)e.Data.GetData(typeof(ReportDesignerSideTabItem));
                if (draggedItem != null && (draggedItem as SideTabItem).SideTabItemStatus != SideTabItemStatus.Draging)
                {
                    (draggedItem as SideTabItem).SideTabItemStatus = SideTabItemStatus.Draging;
                    DoDragDrop(string.Empty, DragDropEffects.Copy);

                    if (!dropEscapePressed && draggedItem != null)
                    {
                        ItemDragEventArgs idea = new ItemDragEventArgs(MouseButtons.Right, draggedItem);
                        (SimpleDesktop.Desktop.ActiveViewContent as IOfficeControl).ItemDrag(this, idea);
                        (draggedItem as SideTabItem).SideTabItemStatus = SideTabItemStatus.Normal;
                    }
                }
            }
            else
            {
                Point p = PointToClient(new Point(e.X, e.Y));
                if (e.Data.GetDataPresent(typeof(SideTabItem)))
                {
                    ClearDraggings(activeTab);
                    SideTab tab = GetTabAt(p.X, p.Y);
                    if (tab != null && tab != Tabs.DragOverTab)
                    {
                        if (tab.CanDragDrop)
                            Tabs.DragOverTab = tab;
                        else
                            Tabs.DragOverTab = null;
                        Refresh();
                    }
                    if (Tabs.DragOverTab != null && Tabs.DragOverTab.CanDragDrop)
                        e.Effect = GetDragDropEffect(e);
                    else
                        e.Effect = DragDropEffects.None;
                }
                else if (e.Data.GetDataPresent(typeof(string)))
                {
                    SideTab oldTab = Tabs.DragOverTab;
                    if (activeTabMemberArea.Contains(p.X, p.Y))
                        Tabs.DragOverTab = activeTab;
                    else
                        Tabs.DragOverTab = GetTabAt(p.X, p.Y);
                    if (oldTab != Tabs.DragOverTab)
                        Refresh();
                }
                else if (e.Data.GetDataPresent(typeof(SideTab)))
                {
                    int tabIndex = GetTabIndexAt(p.X, p.Y);
                    if (tabIndex != -1)
                    {
                        SideTab tab = Tabs.DragOverTab;
                        Tabs.Remove(tab);
                        Tabs.Insert(tabIndex, tab);
                        Refresh();
                    }
                    e.Effect = DragDropEffects.Move;
                }
            }
        }

        /// <exclude/>
        protected override void OnMouseMove(MouseEventArgs e)
        {
            base.OnMouseMove(e);
            mousePosition = new Point(e.X, e.Y);
            if (e.Button == MouseButtons.Left)
            {
                int tab = -1;
                for (int i = 0; i < Tabs.Count; ++i)
                    if (Tabs[i].SideTabStatus == SideTabStatus.Selected)
                    {
                        tab = i;
                        break;
                    }

                if (tab != -1)
                {
                    if (IsDragStarted(mouseDownPosition, e.Location))
                    {
                        Tabs.DragOverTab = Tabs[tab];
                        DoDragDrop(Tabs.DragOverTab, DragDropEffects.All);
                    }
                    Refresh();
                }
            }
        }
        /// <summary>
        /// Začátek tažení
        /// </summary>
        /// <param name="mouseDownPos">Pozice ipuštní myši</param>
        /// <param name="mouseMovePos">Pozice tažení myši</param>
        /// <returns></returns>
        internal static bool IsDragStarted(Point mouseDownPos, Point mouseMovePos)
        {
            Size dragSize = SystemInformation.DragSize;
            if (dragSize.Width < 3) dragSize.Width = 3;
            if (dragSize.Height < 3) dragSize.Height = 3;
            mouseDownPos.Offset(-dragSize.Width / 2, -dragSize.Width / 2);
            Rectangle r = new Rectangle(mouseDownPos, dragSize);
            return !r.Contains(mouseMovePos);
        }

        MouseWheelHandler mouseWheelHandler = new MouseWheelHandler();

        /// <exclude/>
        protected override void OnMouseWheel(MouseEventArgs e)
        {
            base.OnMouseWheel(e);
            if (scrollBar.Visible)
            {
                mouseWheelHandler.Scroll(scrollBar, e);
                ScrollBarScrolled(null, null);
            }
        }

        Point mouseDownPosition;

        /// <exclude/>
        protected override void OnMouseDown(MouseEventArgs e)
        {
            base.OnMouseDown(e);
            if (e.Button == MouseButtons.Left)
            {
                mouseDownPosition = e.Location;

                SideTab tab = GetTabAt(e.X, e.Y);
                if (tab != null)
                {
                    mouseDownTab = tab;
                    tab.SideTabStatus = SideTabStatus.Selected;
                    Refresh();
                }
            }
        }
        SideTab mouseDownTab = null;

        /// <exclude/>
        protected override void OnMouseUp(MouseEventArgs e)
        {
            if (mouseDownTab != null)
            {
                ActiveTab = mouseDownTab;
                mouseDownTab.SideTabStatus = SideTabStatus.Normal;
                mouseDownTab = null;
            }

            ExitRenameMode();
            Refresh();
            base.OnMouseUp(e);
        }

        Rectangle activeTabMemberArea;

        /// <exclude/>
        protected override void OnPaint(PaintEventArgs e)
        {
            Graphics g = e.Graphics;
            int i = 0;

            int lastUpperY = 0;

            for (; i < Tabs.Count; ++i)
            {
                SideTab tab = Tabs[i];

                int yPos = i * (Font.Height + 4 + 1);
                tab.DrawTabHeader(g, Font, new Point(0, yPos), Width);
                lastUpperY = yPos + Font.Height + 4;

                if (tab == activeTab)
                    break;
            }

            int bottom = Height;

            for (int j = Tabs.Count - 1; j > i; --j)
            {
                SideTab tab = Tabs[j];

                int yPos = Height - (-j + Tabs.Count) * (Font.Height + 4 + 1);

                if (yPos < lastUpperY + (Font.Height + 4 + 1))
                    break;

                bottom = yPos;
                tab.DrawTabHeader(g, Font, new Point(0, yPos), Width);
            }

            if (activeTab != null)
            {
                bool b = scrollBar.Maximum > (bottom - lastUpperY) / 20 || scrollBar.Value != 0;
                scrollBar.Visible = b;
                activeTabMemberArea = new Rectangle(0, lastUpperY,
                                                    Width - (scrollBar.Visible ? (SystemInformation.VerticalScrollBarWidth) : 0) - 4, bottom - lastUpperY);
                sideTabContent.Bounds = activeTabMemberArea;
                scrollBar.Location = new Point(Width - SystemInformation.VerticalScrollBarWidth - 4,
                                                   lastUpperY);
                scrollBar.Width = SystemInformation.VerticalScrollBarWidth;
                scrollBar.Height = activeTabMemberArea.Height;
            }
        }


        void ScrollBarScrolled(object sender, ScrollEventArgs e)
        {
            activeTab.ScrollIndex = scrollBar.Value;
            sideTabContent.Refresh();
        }

        /// <exclude/>
        protected virtual object StartItemDrag(SideTabItem draggedItem)
        {
            SpecialDataObject dataObject = new SpecialDataObject();
            dataObject.SetData(draggedItem.Tag);
            dataObject.SetData(draggedItem);
            return dataObject;
        }

        /// <summary>
        /// Obsah postranní záložky
        /// </summary>
        protected class SideTabContent : UserControl
        {
            Point mousePosition;
            /// <summary>
            /// Postranní lišta, které patří záložka
            /// </summary>
            public SideBarControl SideBar { get; set; } = null;

            /// <summary>
            /// Vytvoření nové instance třídy
            /// </summary>
            public SideTabContent()
            {
                ResizeRedraw = true;
                AllowDrop = true;

                SetStyle(ControlStyles.UserPaint, true);
                SetStyle(ControlStyles.OptimizedDoubleBuffer, true);
                SetStyle(ControlStyles.AllPaintingInWmPaint, true);
                SetStyle(ControlStyles.CacheText, true);
                this.QueryContinueDrag += SvtQueryContinueDrag;
            }

            void SvtQueryContinueDrag(object sender, QueryContinueDragEventArgs e)
            {
                if (e.EscapePressed)
                    dropEscapePressed = true;
            }

            /// <exclude/>
            protected override void OnPaint(PaintEventArgs e)
            {
                if (SideBar != null && SideBar.activeTab != null)
                    SideBar.activeTab.DrawTabContent(e.Graphics, Font, new Rectangle(0, 0, Width, Height));
            }

            // Drag and Drop
            /// <exclude/>
            protected override void OnDragEnter(DragEventArgs e)
            {
                base.OnDragEnter(e);
                SideBar.ExitRenameMode();
                if (SideBar.activeTab != null && SideBar.activeTab.CanDragDrop)
                {
                    if (e.Data.GetDataPresent(typeof(string)) || e.Data.GetDataPresent(typeof(SideTabItem)))
                        e.Effect = GetDragDropEffect(e);
                    else
                        e.Effect = DragDropEffects.None;
                }
                else if (!(SimpleDesktop.Desktop.ActiveViewContent is IOfficeControl))
                    e.Effect = DragDropEffects.None;
            }
            /// <exclude/>
            protected override void OnDragLeave(EventArgs e)
            {
                base.OnDragLeave(e);
                if (SideBar.activeTab != null)
                {
                    SideBar.Tabs.DragOverTab = null;
                    SideBar.ClearDraggings(SideBar.activeTab);
                    Refresh();
                }
            }
            /// <exclude/>
            protected override void OnDragDrop(DragEventArgs e)
            {
                base.OnDragDrop(e);

                Point p = PointToClient(new Point(e.X, e.Y));
                if (e.Data.GetDataPresent(typeof(SideTabItem)))
                {
                    SideTabItem draggedItem = (SideTabItem)e.Data.GetData(typeof(SideTabItem));
                    switch (e.Effect)
                    {
                        case DragDropEffects.Move:
                            SideTabItem item = SideBar.activeTab.GetItemAt(p.X, p.Y);

                            if (item != SideBar.activeTab.ChoosedItem)
                            {
                                int idx = SideBar.activeTab.Items.DraggedIndex;
                                if (idx != -1)
                                {
                                    SideBar.activeTab.Items.Remove(draggedItem);
                                    SideBar.activeTab.Items.Insert(idx, draggedItem);
                                }
                            }
                            break;
                        case DragDropEffects.Copy:
                            SideTabItem newItem = draggedItem.Clone();
                            newItem.SideTabItemStatus = SideTabItemStatus.Normal;
                            SideBar.activeTab.Items.Add(newItem);
                            break;
                    }
                    SideBar.ClearDraggings(SideBar.activeTab);
                    SideBar.Tabs.DragOverTab = null;
                    SideBar.Refresh();
                }
                else if (e.Data.GetDataPresent(typeof(string)))
                {
                    if (SideBar.Tabs.DragOverTab != null)
                    {
                        string str = (string)e.Data.GetData(typeof(string));
                        SideBar.Tabs.DragOverTab.Items.Add(GResources.GetResourceText(29450370) + ":" + str.Trim(), str);
                    }
                    SideBar.Tabs.DragOverTab = null;
                    Refresh();
                }
                else
                {
                    SideBar.Tabs.DragOverTab = null;
                    SideBar.Refresh();
                }
            }

            /// <exclude/>
            protected override void OnDragOver(DragEventArgs e)
            {
                base.OnDragOver(e);
                SideBar.ExitRenameMode();
                Point p = PointToClient(new Point(e.X, e.Y));

                if (e.Data.GetDataPresent(typeof(SideTabItem)))
                {
                    // přetažení položyk uvnitř activeTabMembarArea
                    if (SideBar.activeTab.CanDragDrop)
                    {
                        SideTabItem item = SideBar.activeTab.GetItemAt(p.X, p.Y);
                        if (item == null)
                        {
                            SideBar.ClearDraggings(SideBar.activeTab);
                            SideBar.Refresh();
                        }
                        else if (item != SideBar.activeTab.ChoosedItem)
                        {
                            if (item.SideTabItemStatus != SideTabItemStatus.Drag)
                            {
                                SideBar.ClearDraggings(SideBar.activeTab);
                                item.SideTabItemStatus = SideTabItemStatus.Drag;
                                SideBar.Tabs.DragOverTab = SideBar.activeTab;
                                SideBar.Refresh();
                            }
                        }
                        else
                        {
                            SideBar.ClearDraggings(SideBar.activeTab);
                            SideBar.activeTab.SideTabStatus = SideTabStatus.Dragged;
                            SideBar.Refresh();
                        }

                        e.Effect = GetDragDropEffect(e);
                    }
                    else
                        e.Effect = DragDropEffects.None;
                }
                else if (e.Data.GetDataPresent(typeof(string)))
                    if (SideBar.activeTab != SideBar.Tabs.DragOverTab)
                    {
                        SideBar.Tabs.DragOverTab = SideBar.activeTab;
                        SideBar.Refresh();
                    }
            }

            // Mouse Handling
            /// <exclude/>
            protected override void OnMouseLeave(EventArgs e)
            {
                base.OnMouseLeave(e);
                if (SideBar.activeTab != null)
                    SideBar.activeTab.SelectedItem = null;
                Refresh();
            }

            Point mouseDownPos;
            bool dropEscapePressed = false;
            /// <exclude/>
            protected override void OnMouseMove(MouseEventArgs e)
            {
                base.OnMouseMove(e);
                if (SideBar.activeTab == null) return;
                if (e.Button == MouseButtons.Left)
                {
                    SideTabItem item = SideBar.activeTab.GetItemAt(e.X, e.Y);

                    if (item != null)
                    {
                        if (IsDragStarted(mouseDownPos, e.Location))
                        {
                            SideBar.Tabs.DragOverTab = SideBar.activeTab;
                            if (SimpleDesktop.Desktop.ActiveViewContent is IOfficeControl)
                            {
                                DoDragDrop(item.Name ?? string.Empty, DragDropEffects.Copy);

                                if (!dropEscapePressed)
                                    (SimpleDesktop.Desktop.ActiveViewContent as IOfficeControl).ItemDrag(this, new ItemDragEventArgs(MouseButtons.Right, item));
                            }
                            else
                                DoDragDrop(item, SideBar.activeTab.CanDragDrop ? DragDropEffects.All : (DragDropEffects.Copy | DragDropEffects.None));
                        }
                        Refresh();
                    }
                }
                else
                {
                    SideTabItem oldItem = SideBar.activeTab.SelectedItem;
                    SideBar.activeTab.SelectedItem = null;
                    mousePosition = new Point(e.X, e.Y);
                    SideTabItem item = SideBar.activeTab.GetItemAt(e.X, e.Y);

                    if (item != null)
                        SideBar.activeTab.SelectedItem = item;

                    if (oldItem != SideBar.activeTab.SelectedItem)
                        SideBar.Refresh();
                }
            }
            /// <exclude/>
            protected override void OnMouseDown(MouseEventArgs e)
            {
                base.OnMouseDown(e);
                if (e.Button == MouseButtons.Left && SideBar.activeTab != null)
                {
                    mouseDownPos = e.Location;
                    SideBar.activeTab.ChoosedItem = SideBar.activeTab.SelectedItem;
                }
                Refresh();
            }
            /// <exclude/>
            protected override void OnMouseUp(MouseEventArgs e)
            {
                if (SideBar != null)
                {
                    SideBar.ExitRenameMode();
                    Refresh();
                }
                base.OnMouseUp(e);
            }
        }

        /// <summary>
        /// Kolekce záložek
        /// </summary>
        public class SideTabCollection : ICollection<SideTab>, IEnumerable<SideTab>
        {
            List<SideTab> list = new List<SideTab>();
            SideTab dragOverTab;
            SideBarControl sideBar;

            /// <summary>
            /// Získání záložky dle indexu
            /// </summary>
            /// <param name="index">Index hledáné záložky</param>
            /// <returns></returns>
            public SideTab this[int index]
            {
                get => list[index];
                set => list[index] = value;
            }

            /// <summary>
            /// Položka, nad kterou se táhné objekt
            /// </summary>
            public SideTab DragOverTab
            {
                get => dragOverTab;
                set
                {
                    if (dragOverTab != null)
                        dragOverTab.SideTabStatus = SideTabStatus.Normal;
                    dragOverTab = value;
                    if (dragOverTab != null)
                        dragOverTab.SideTabStatus = SideTabStatus.Dragged;
                }
            }
            /// <summary>
            /// Vytvoření nové instance třídy
            /// </summary>
            /// <param name="sideBar">Postranní lišta</param>
            public SideTabCollection(SideBarControl sideBar)
            {
                this.sideBar = sideBar;
            }
            /// <summary>
            /// Počet objektů v kolekci
            /// </summary>
            public int Count { get => list.Count; }

            /// <summary>
            /// Kolekce je synchronizovaná?
            /// </summary>
            public virtual bool IsSynchronized { get => false; }

            /// <summary>
            /// Hlavní synchronizace
            /// </summary>
            public virtual object SyncRoot { get => this; }

            /// <exclude/>
            public virtual void Add(SideTab item)
            {
                list.Add(item);
            }

            /// <exclude/>
            public virtual SideTab Add(string name)
            {
                SideTab tab = sideBar.SideTabFactory.CreateSideTab(sideBar, name);
                Add(tab);
                return tab;
            }

            /// <exclude/>
            public virtual void Clear()
            {
                list.Clear();
            }

            /// <exclude/>
            public bool Contains(SideTab item) => list.Contains(item);

            /// <exclude/>
            public IEnumerator<SideTab> GetEnumerator() => list.GetEnumerator();

            /// <exclude/>
            System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator() => list.GetEnumerator();

            /// <exclude/>
            public int IndexOf(SideTab item) => list.IndexOf(item);

            /// <exclude/>
            public void CopyTo(Array dest, int index)
            {
                list.CopyTo((SideTab[])dest, index);
            }

            /// <exclude/>
            public virtual SideTab Insert(int index, SideTab item)
            {
                list.Insert(index, item);
                return item;
            }

            /// <exclude/>
            public virtual SideTab Insert(int index, string name) => Insert(index, sideBar.SideTabFactory.CreateSideTab(sideBar, name));

            /// <exclude/>
            public bool Remove(SideTab item)
            {
                if (item == sideBar.ActiveTab)
                {
                    int index = IndexOf(item);
                    if (index > 0)
                        sideBar.ActiveTab = this[index - 1];
                    else if (index < Count - 1)
                        sideBar.ActiveTab = this[index + 1];
                    else
                        sideBar.ActiveTab = null;
                }
                return list.Remove(item);
            }

            /// <exclude/>
            public virtual void RemoveAt(int index)
            {
                list.RemoveAt(index);
            }

            /// <summary>
            /// Indikuje, že kolekce je pouze pro čtení
            /// </summary>
            public bool IsReadOnly { get => false; }

            /// <exclude/>
            public void CopyTo(SideTab[] array, int arrayIndex)
            {
                list.CopyTo(array, arrayIndex);
            }
        }
    }
}
