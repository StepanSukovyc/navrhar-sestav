//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.OpenWindowStateConditionEvaluator.cs   </Name>
//    <Description> Zkouší, zda okno má určitý stav.                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-17                                                  </Created>
//  </FileHeader>


using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers;

namespace Gordic.GFE.WinClient.Core
{
    /// <summary>
    /// Zkouší, zda okno má určitý stav.
    /// </summary>
    public class OpenWindowStateConditionEvaluator : IConditionEvaluator
    {
        WindowState windowState = WindowState.None;
        WindowState nowindowState = WindowState.None;

        bool IsStateOk(IViewContent viewContent)
        {
            if (viewContent == null)
                return false;
            
            bool isWindowStateOk = false;
            if (windowState != WindowState.None)
            {
                if ((windowState & WindowState.Dirty) > 0)
                    isWindowStateOk |= viewContent.IsDirty;
                if ((windowState & WindowState.Untitled) > 0)
                    isWindowStateOk |= IsUntitled(viewContent);
            }
            else
                isWindowStateOk = true;

            if (nowindowState != WindowState.None)
            {
                if ((nowindowState & WindowState.Dirty) > 0)
                    isWindowStateOk &= !viewContent.IsDirty;

                if ((nowindowState & WindowState.Untitled) > 0)
                    isWindowStateOk &= !IsUntitled(viewContent);
            }
            return isWindowStateOk;
        }

        static bool IsUntitled(IViewContent viewContent)
        {
            OpenedFile file = viewContent.PrimaryFile;
            if (file == null)
                return false;
            else
                return file.IsUntitled;
        }

        /// <summary>
        /// Kontrola platností podmínky
        /// </summary>
        /// <param name="caller">volající</param>
        /// <param name="condition">podmínka</param>
        /// <returns></returns>
        public bool IsValid(object caller, Condition condition)
        {
            if (SimpleDesktop.Desktop == null)
                return false;

            windowState = condition.Properties.Get("openwindowstate", WindowState.None);
            nowindowState = condition.Properties.Get("noopenwindowstate", WindowState.None);

            foreach (IViewContent view in SimpleDesktop.Desktop.ViewContentCollection)
                if (IsStateOk(view))
                    return true;

            return false;
        }
    }
}
