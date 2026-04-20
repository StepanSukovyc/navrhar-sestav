//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DockHelper.cs                          </Name>
//    <Description> Pomocná tøída dokování podoken.                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-04                                                  </Created>
//  </FileHeader>

using System.Drawing;
using System.Windows.Forms;

namespace Gordic.GFE.Parsers.Docking
{
    /// <summary>
    /// Pomocná tøída dokování podoken.
    /// </summary>
	static class DockHelper
	{
        /// <summary>
        /// Indikuje, zda status ukotvení je stejný jako daný
        /// </summary>
        /// <param name="dockState">Daný status ukotvení</param>
        /// <returns></returns>
		public static bool IsDockStateAutoHide(DockState dockState)
		{
            return (dockState == DockState.DockLeftAutoHide ||
                dockState == DockState.DockRightAutoHide ||
                dockState == DockState.DockTopAutoHide ||
                dockState == DockState.DockBottomAutoHide);
		}

        /// <summary>
        /// Zjištìní platností statusu ukotvení
        /// </summary>
        /// <param name="dockState">Status dokování</param>
        /// <param name="dockableAreas">Plocha dokování</param>
        /// <returns></returns>
		public static bool IsDockStateValid(DockState dockState, DockAreas dockableAreas)
		{
			if (((dockableAreas & DockAreas.Float) == 0) &&
				(dockState == DockState.Float))
				return false;
			else if (((dockableAreas & DockAreas.Document) == 0) &&
				(dockState == DockState.Document))
				return false;
			else if (((dockableAreas & DockAreas.DockLeft) == 0) &&
				(dockState == DockState.DockLeft || dockState == DockState.DockLeftAutoHide))
				return false;
			else if (((dockableAreas & DockAreas.DockRight) == 0) &&
				(dockState == DockState.DockRight || dockState == DockState.DockRightAutoHide))
				return false;
			else if (((dockableAreas & DockAreas.DockTop) == 0) &&
				(dockState == DockState.DockTop || dockState == DockState.DockTopAutoHide))
				return false;
			else if (((dockableAreas & DockAreas.DockBottom) == 0) &&
				(dockState == DockState.DockBottom || dockState == DockState.DockBottomAutoHide))
				return false;
			else
				return true;
		}

        /// <summary>
        /// Zjištìní, zda daný status dokování statusem dokování okna
        /// </summary>
        /// <param name="state">Daný status</param>
        /// <returns></returns>
		public static bool IsDockWindowState(DockState state)
		{
            return (state == DockState.DockTop || state == DockState.DockBottom || state == DockState.DockLeft ||
                state == DockState.DockRight || state == DockState.Document);
		}

        /// <summary>
        /// Pøepnutí statusu automatického skrývání
        /// </summary>
        /// <param name="state">Status dokování</param>
        /// <returns></returns>
		public static DockState ToggleAutoHideState(DockState state)
		{
			if (state == DockState.DockLeft)
				return DockState.DockLeftAutoHide;
			else if (state == DockState.DockRight)
				return DockState.DockRightAutoHide;
			else if (state == DockState.DockTop)
				return DockState.DockTopAutoHide;
			else if (state == DockState.DockBottom)
				return DockState.DockBottomAutoHide;
			else if (state == DockState.DockLeftAutoHide)
				return DockState.DockLeft;
			else if (state == DockState.DockRightAutoHide)
				return DockState.DockRight;
			else if (state == DockState.DockTopAutoHide)
				return DockState.DockTop;
			else if (state == DockState.DockBottomAutoHide)
				return DockState.DockBottom;
			else
				return state;
		}

        /// <summary>
        /// Zjiìtení podokna dle pozice
        /// </summary>
        /// <param name="pt">Pozice pøemístìní</param>
        /// <param name="dockPanel">Podokno</param>
        /// <returns></returns>
		public static DockPane PaneAtPoint(Point pt, DockPanel dockPanel)
		{
			for (Control control = Win32.ControlAtPoint(pt); control != null; control = control.Parent)
			{
                if (control is IDockContent content && content.DockHandler.DockPanel == dockPanel)
                    return content.DockHandler.Pane;

                if (control is DockPane pane && pane.DockPanel == dockPanel)
                    return pane;
            }

			return null;
		}

        /// <summary>
        /// Zjištìní plovoucího okna dle pozice
        /// </summary>
        /// <param name="pt">Daná pozice</param>
        /// <param name="dockPanel">Plovoucí okno</param>
        /// <returns></returns>
		public static FloatWindow FloatWindowAtPoint(Point pt, DockPanel dockPanel)
		{
			for (Control control = Win32.ControlAtPoint(pt); control != null; control = control.Parent)
                if (control is FloatWindow floatWindow && floatWindow.DockPanel == dockPanel)
                    return floatWindow;

			return null;
		}
	}
}
