//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ActiveWindowStateConditionEvaluator.cs </Name>
//    <Description> zjištění, v jakém režímu je aktivní okno pracovní plochy    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-25                                                  </Created>
//  </FileHeader>

using System.Linq;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers;

namespace Gordic.GFE.WinClient.Core
{
    /// <summary>
    /// zjištění, v jakém režímu je aktivní okno pracovní plochy
    /// </summary>
    class ActiveWindowStateConditionEvaluator : IConditionEvaluator
    {
        /// <summary>
        /// Je platná podmína?
        /// </summary>
        /// <param name="caller">Volající</param>
        /// <param name="condition">Podmínka</param>
        /// <returns></returns>
        public bool IsValid(object caller, Condition condition)
        {
            if (SimpleDesktop.Desktop.ActiveViewContent == null || SimpleDesktop.Desktop.ActiveViewContent == null)
                return false;

            WindowState windowState = condition.Properties.Get("windowstate", WindowState.None);
            WindowState nowindowState = condition.Properties.Get("nowindowstate", WindowState.None);

            bool isWindowStateOk = false;
            if (windowState != WindowState.None)
            {
                if ((windowState & WindowState.Dirty) > 0)
                    isWindowStateOk |= SimpleDesktop.Desktop.ActiveDesktopWindow.ViewContents.Any(vc => vc.IsDirty);
                if ((windowState & WindowState.Untitled) > 0)
                    isWindowStateOk |= IsUntitled(SimpleDesktop.Desktop.ActiveViewContent);
            }
            else
                isWindowStateOk = true;

            if (nowindowState != WindowState.None)
            {
                if ((nowindowState & WindowState.Dirty) > 0)
                    isWindowStateOk &= !SimpleDesktop.Desktop.ActiveDesktopWindow.ViewContents.Any(vc => vc.IsDirty);

                if ((nowindowState & WindowState.Untitled) > 0)
                    isWindowStateOk &= !IsUntitled(SimpleDesktop.Desktop.ActiveViewContent);
            }
            return isWindowStateOk;
        }

        static bool IsUntitled(IViewContent viewContent)
        {
            OpenedFile file = viewContent.PrimaryFile;
            return file == null ? false : file.IsUntitled;
        }
    }
}
