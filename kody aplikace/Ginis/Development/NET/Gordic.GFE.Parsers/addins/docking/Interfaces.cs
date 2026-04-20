//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.Interfaces.cs                          </Name>
//    <Description> Rozhraní dokovatelných obsahu                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-04                                                  </Created>
//  </FileHeader>

using System.Drawing;
using System.Windows.Forms;

namespace Gordic.GFE.Parsers.Docking
{
    /// <summary>
    /// Rozhraní dokovatelných obsahu
    /// </summary>
    public interface IDockContent
    {
        /// <summary>
        /// ovladaè dokovatelného obsahu
        /// </summary>
        DockContentHandler DockHandler { get; }
        /// <summary>
        /// indikuje uvolnìnost objektu
        /// </summary>
        bool IsDisposed { get; }
    }

    /// <summary>
    /// KOntainer sousedních podoken
    /// </summary>
    public interface INestedPanesContainer
    {
        /// <summary>
        /// Stav dokování
        /// </summary>
        DockState DockState { get; }
        /// <summary>
        /// Zobrazený rámec
        /// </summary>
        Rectangle DisplayingRectangle { get; }
        /// <summary>
        /// Sousední podokna
        /// </summary>
        NestedPaneCollection NestedPanes { get; }
        /// <summary>
        /// Viditelné sousední podokna
        /// </summary>
        VisibleNestedPaneCollection VisibleNestedPanes { get; }
        /// <summary>
        /// Je plovoucí
        /// </summary>
        bool IsFloat { get; }
    }
    /// <summary>
    /// Tažený zdroj
    /// </summary>
    interface IDragSource
    {
        /// <summary>
        /// Tažený ovladaè
        /// </summary>
        Control DragControl { get; }
    }

    interface IDockDragSource : IDragSource
    {
        Rectangle BeginDrag(Point ptMouse);
        bool IsDockStateValid(DockState dockState);
        bool CanDockTo(DockPane pane);
        void FloatAt(Rectangle floatWindowBounds);
        void DockTo(DockPane pane, DockStyle dockStyle, int contentIndex);
        void DockTo(DockPanel panel, DockStyle dockStyle);
    }

    interface ISplitterDragSource : IDragSource
    {
        void BeginDrag(Rectangle rectSplitter);
        void EndDrag();
        bool IsVertical { get; }
        Rectangle DragLimitBounds { get; }
        void MoveSplitter(int offset);
    }
}
