//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DockWindow.SplitterControl.cs          </Name>
//    <Description> Dokovací okno                                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-04                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Docking
{
    /// <summary>
    /// Dokovací okno
    /// </summary>
    public partial class DockWindow
    {
        private class SplitterControl : SplitterBase
        {
            protected override int SplitterSize
            {
                get { return Measures.SplitterSize; }
            }

            protected override void StartDrag()
            {
                if (!(Parent is DockWindow window))
                    return;

                window.DockPanel.BeginDrag(window, window.RectangleToScreen(Bounds));
            }
        }
    }
}
