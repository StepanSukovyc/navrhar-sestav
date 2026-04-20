//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DockPanel.DragHandler.cs               </Name>
//    <Description> Doplnìní dokovacího panelu                                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-04                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using System.Drawing;


namespace Gordic.GFE.Parsers.Docking
{
    /// <summary>
    /// Doplnìní dokovacího panelu
    /// </summary>
    partial class DockPanel
    {
        /// <summary>
        /// DragHandlerBase je základní tøída pro rutiny tažení. Odvozená tøída by mìla:
        ///   1. Definovat svou veøejnou metodu BeginDrag. 
        ///   2. Pøepsat OnDragging a OnEndDrag metody.
        /// </summary>
        abstract class DragHandlerBase : NativeWindow, IMessageFilter
        {
            protected abstract Control DragControl { get; }

            private Point m_startMousePosition = Point.Empty;
            protected Point StartMousePosition
            {
                get { return m_startMousePosition; }
                private set { m_startMousePosition = value; }
            }

            /// <summary>
            /// vytvoøení nové instance tøídy
            /// </summary>
            protected DragHandlerBase() { }
            readonly object syncLock = new object();
            protected bool BeginDrag()
            {
                // snaha se vyhnout dvojímu vstupu
                lock (syncLock)
                {
                    if (DragControl == null)
                        return false;

                    StartMousePosition = Control.MousePosition;

                    if (!Gordic.GFE.Parsers.Utils.NativeMethods.DragDetect(DragControl.Handle, StartMousePosition))
                        return false;

                    DragControl.FindForm().Capture = true;
                    AssignHandle(DragControl.FindForm().Handle);
                    Application.AddMessageFilter(this);
                    return true;
                }
            }

            protected abstract void OnDragging();
            protected abstract void OnEndDrag(bool abort);

            void EndDrag(bool abort)
            {
                ReleaseHandle();
                Application.RemoveMessageFilter(this);
                DragControl.FindForm().Capture = false;

                OnEndDrag(abort);
            }

            bool IMessageFilter.PreFilterMessage(ref Message m)
            {
                if (m.Msg == (int)Msgs.WM_MOUSEMOVE)
                    OnDragging();
                else if (m.Msg == (int)Msgs.WM_LBUTTONUP)
                    EndDrag(false);
                else if (m.Msg == (int)Msgs.WM_CAPTURECHANGED)
                    EndDrag(true);
                else if (m.Msg == (int)Msgs.WM_KEYDOWN && (int)m.WParam == (int)Keys.Escape)
                    EndDrag(true);

                return OnPreFilterMessage(ref m);
            }

            protected virtual bool OnPreFilterMessage(ref Message m)
            {
                return false;
            }

            protected sealed override void WndProc(ref Message m)
            {
                if (m.Msg == (int)Msgs.WM_CANCELMODE || m.Msg == (int)Msgs.WM_CAPTURECHANGED)
                    EndDrag(true);

                base.WndProc(ref m);
            }
        }

        abstract class DragHandler : DragHandlerBase
        {
            private readonly DockPanel m_dockPanel;
            public DockPanel DockPanel { get { return m_dockPanel; } }

            private IDragSource m_dragSource;
            protected IDragSource DragSource
            {
                get { return m_dragSource; }
                set { m_dragSource = value; }
            }

            protected sealed override Control DragControl
            {
                get { return DragSource?.DragControl; }
            }

            protected DragHandler(DockPanel dockPanel)
            {
                m_dockPanel = dockPanel;
            }

            protected sealed override bool OnPreFilterMessage(ref Message m)
            {
                if ((m.Msg == (int)Msgs.WM_KEYDOWN || m.Msg == (int)Msgs.WM_KEYUP) &&
                    ((int)m.WParam == (int)Keys.ControlKey || (int)m.WParam == (int)Keys.ShiftKey))
                    OnDragging();

                return base.OnPreFilterMessage(ref m);
            }
        }
    }
}
