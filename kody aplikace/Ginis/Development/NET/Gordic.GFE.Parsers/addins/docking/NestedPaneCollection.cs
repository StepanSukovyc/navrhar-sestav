//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.NestedPaneCollection.cs                </Name>
//    <Description> Klekce vnoøených podoken                                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-04                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Drawing;
using System.Runtime.InteropServices;

namespace Gordic.GFE.Parsers.Docking
{
    /// <summary>
    /// Klekce vnoøených podoken
    /// </summary>
    [ComVisible(false)]
    public sealed class NestedPaneCollection : ReadOnlyCollection<DockPane>
    {
        private readonly INestedPanesContainer m_container;
        private readonly VisibleNestedPaneCollection m_visibleNestedPanes;

        internal NestedPaneCollection(INestedPanesContainer container)
            : base(new List<DockPane>())
        {
            m_container = container;
            m_visibleNestedPanes = new VisibleNestedPaneCollection(this);
        }

        /// <summary>
        /// Kontainer vnoøených objektù
        /// </summary>
        public INestedPanesContainer Container
        {
            get { return m_container; }
        }

        /// <summary>
        /// Kolekce viditelných vnoøených podoken
        /// </summary>
        public VisibleNestedPaneCollection VisibleNestedPanes
        {
            get { return m_visibleNestedPanes; }
        }

        /// <summary>
        /// Dokovací status
        /// </summary>
        public DockState DockState
        {
            get { return Container.DockState; }
        }

        /// <summary>
        /// Je plovoucí
        /// </summary>
        public bool IsFloat
        {
            get { return DockState == DockState.Float; }
        }

        internal void Add(DockPane pane)
        {
            if (pane == null)
                return;

            NestedPaneCollection oldNestedPanes = pane.NestedPanesContainer?.NestedPanes;
            if (oldNestedPanes != null)
                oldNestedPanes.InternalRemove(pane);
            Items.Add(pane);
            if (oldNestedPanes != null)
                oldNestedPanes.CheckFloatWindowDispose();
        }

        private void CheckFloatWindowDispose()
        {
            if (Count == 0 && Container.DockState == DockState.Float)
            {
                FloatWindow floatWindow = (FloatWindow)Container;
                if (!floatWindow.Disposing && !floatWindow.IsDisposed)
                    Gordic.GFE.Parsers.Utils.NativeMethods.PostMessage(((FloatWindow)Container).Handle, FloatWindow.WM_CHECKDISPOSE, 0, 0);
            }
        }

        internal void Remove(DockPane pane)
        {
            InternalRemove(pane);
            CheckFloatWindowDispose();
        }

        private void InternalRemove(DockPane pane)
        {
            if (!Contains(pane))
                return;

            NestedDockingStatus statusPane = pane.NestedDockingStatus;
            DockPane lastNestedPane = null;
            for (int i = Count - 1; i > IndexOf(pane); i--)
            {
                if (this[i].NestedDockingStatus.PreviousPane == pane)
                {
                    lastNestedPane = this[i];
                    break;
                }
            }

            if (lastNestedPane != null)
            {
                int indexLastNestedPane = IndexOf(lastNestedPane);
                Items.Remove(lastNestedPane);
                Items[IndexOf(pane)] = lastNestedPane;
                NestedDockingStatus lastNestedDock = lastNestedPane.NestedDockingStatus;
                lastNestedDock.SetStatus(this, statusPane.PreviousPane, statusPane.Alignment, statusPane.Proportion);
                for (int i = indexLastNestedPane - 1; i > IndexOf(lastNestedPane); i--)
                {
                    NestedDockingStatus status = this[i].NestedDockingStatus;
                    if (status.PreviousPane == pane)
                        status.SetStatus(this, lastNestedPane, status.Alignment, status.Proportion);
                }
            }
            else
                Items.Remove(pane);

            statusPane.SetStatus(null, null, DockAlignment.Left, 0.5);
            statusPane.SetDisplayingStatus(false, null, DockAlignment.Left, 0.5);
            statusPane.SetDisplayingBounds(Rectangle.Empty, Rectangle.Empty, Rectangle.Empty);
        }

        /// <summary>
        /// Získání výchozího podokna
        /// </summary>
        /// <param name="pane">Podokno</param>
        /// <returns></returns>
        public DockPane GetDefaultPreviousPane(DockPane pane)
        {
            for (int i = Count - 1; i >= 0; i--)
                if (this[i] != pane)
                    return this[i];

            return null;
        }
    }
}
