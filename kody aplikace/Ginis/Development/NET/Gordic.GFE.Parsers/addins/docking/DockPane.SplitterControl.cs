//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DockPane.SplitterControl.cs            </Name>
//    <Description> Dokovací podokno                                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-04                                                  </Created>
//  </FileHeader>

using System.Drawing;
using System.Windows.Forms;

namespace Gordic.GFE.Parsers.Docking
{
    /// <summary>
    /// Dokovací podokno
    /// </summary>
    public partial class DockPane
    {
        class SplitterControl : Control, ISplitterDragSource
        {
            readonly DockPane m_pane;
            /// <summary>
            /// dokovatelné podokno
            /// </summary>
            public DockPane DockPane { get { return m_pane; } }

            private DockAlignment m_alignment;
            /// <summary>
            /// zarovnání
            /// </summary>
            public DockAlignment Alignment
            {
                get { return m_alignment; }
                set
                {
                    m_alignment = value;
                    if (m_alignment == DockAlignment.Left || m_alignment == DockAlignment.Right)
                        Cursor = Cursors.VSplit;
                    else if (m_alignment == DockAlignment.Top || m_alignment == DockAlignment.Bottom)
                        Cursor = Cursors.HSplit;
                    else
                        Cursor = Cursors.Default;

                    if (DockPane.DockState == DockState.Document)
                        Invalidate();
                }
            }

            Control IDragSource.DragControl { get { return this; } }

            bool ISplitterDragSource.IsVertical
            {
                get
                {
                    NestedDockingStatus status = DockPane.NestedDockingStatus;
                    return (status.DisplayingAlignment == DockAlignment.Left ||
                        status.DisplayingAlignment == DockAlignment.Right);
                }
            }

            Rectangle ISplitterDragSource.DragLimitBounds
            {
                get
                {
                    NestedDockingStatus status = DockPane.NestedDockingStatus;
                    Rectangle rectLimit = Parent.RectangleToScreen(status.LogicalBounds);
                    if (((ISplitterDragSource)this).IsVertical)
                    {
                        rectLimit.X += MeasurePane.MinSize;
                        rectLimit.Width -= 2 * MeasurePane.MinSize;
                    }
                    else
                    {
                        rectLimit.Y += MeasurePane.MinSize;
                        rectLimit.Height -= 2 * MeasurePane.MinSize;
                    }

                    return rectLimit;
                }
            }

            /// <summary>
            /// Vytvoøení nové instance tøídy
            /// </summary>
            /// <param name="pane"></param>
            public SplitterControl(DockPane pane)
            {
                SetStyle(ControlStyles.Selectable, false);
                m_pane = pane;
            }

            /// <exclude/>
            protected override void OnPaint(PaintEventArgs e)
            {
                base.OnPaint(e);

                if (DockPane.DockState != DockState.Document)
                    return;

                Graphics g = e.Graphics;
                Rectangle rect = ClientRectangle;
                if (Alignment == DockAlignment.Top || Alignment == DockAlignment.Bottom)
                    g.DrawLine(SystemPens.ControlDark, rect.Left, rect.Bottom - 1, rect.Right, rect.Bottom - 1);
                else if (Alignment == DockAlignment.Left || Alignment == DockAlignment.Right)
                    g.DrawLine(SystemPens.ControlDarkDark, rect.Right - 1, rect.Top, rect.Right - 1, rect.Bottom);
            }
            /// <exclude/>
            protected override void OnMouseDown(MouseEventArgs e)
            {
                base.OnMouseDown(e);

                if (e.Button != MouseButtons.Left)
                    return;

                DockPane.DockPanel.BeginDrag(this, Parent.RectangleToScreen(Bounds));
            }

            void ISplitterDragSource.BeginDrag(Rectangle rectSplitter) { }
            void ISplitterDragSource.EndDrag() { }
            void ISplitterDragSource.MoveSplitter(int offset)
            {
                NestedDockingStatus status = DockPane.NestedDockingStatus;
                double proportion = status.Proportion;
                if (status.LogicalBounds.Width <= 0 || status.LogicalBounds.Height <= 0)
                    return;
                else if (status.DisplayingAlignment == DockAlignment.Left)
                    proportion += ((double)offset) / (double)status.LogicalBounds.Width;
                else if (status.DisplayingAlignment == DockAlignment.Right)
                    proportion -= ((double)offset) / (double)status.LogicalBounds.Width;
                else if (status.DisplayingAlignment == DockAlignment.Top)
                    proportion += ((double)offset) / (double)status.LogicalBounds.Height;
                else
                    proportion -= ((double)offset) / (double)status.LogicalBounds.Height;

                DockPane.SetNestedDockingProportion(proportion);
            }
        }

        SplitterControl m_splitter;
        SplitterControl Splitter { get { return m_splitter; } }

        internal Rectangle SplitterBounds { set { Splitter.Bounds = value; } }

        internal DockAlignment SplitterAlignment { set { Splitter.Alignment = value; } }
    }
}
