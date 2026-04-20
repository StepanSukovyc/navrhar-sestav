//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.WindowActiveConditionEvaluator.cs      </Name>
//    <Description> Zjištění, zda aktuální okno je určitého typu nebo implementuje rozhraní.</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-17                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Gui;

namespace Gordic.GFE.WinClient.Core
{
    /// <summary>
    /// Zjištění, zda aktuální okno je určitého typu nebo implementuje rozhraní.
    /// </summary>
    class WindowActiveConditionEvaluator : IConditionEvaluator
    {
        /// <summary>
        /// Kontrola platností
        /// </summary>
        /// <param name="caller">volající</param>
        /// <param name="condition">větev konfiguračního stromu</param>
        /// <returns></returns>
        public bool IsValid(object caller, Condition condition)
        {
            if (SimpleDesktop.Desktop == null)
                return false;

            string activewindow = condition.Properties["activewindow"];

            if (activewindow == "*")
                return SimpleDesktop.Desktop.ActiveDesktopWindow != null;

            if (SimpleDesktop.Desktop.ActiveDesktopWindow == null || SimpleDesktop.Desktop.ActiveDesktopWindow.ActiveViewContent == null)
                return false;

            Type currentType = SimpleDesktop.Desktop.ActiveDesktopWindow.ActiveViewContent.GetType();
            if (currentType.FullName.Equals(activewindow, StringComparison.InvariantCultureIgnoreCase)
                || currentType.Name.Equals(activewindow, StringComparison.InvariantCultureIgnoreCase))
                return true;

            if (currentType.GetInterface(activewindow) != null)
                return true;

            foreach (Type interf in currentType.GetInterfaces())
                if (interf.FullName.Equals(activewindow, StringComparison.InvariantCultureIgnoreCase))
                    return true;

            while ((currentType = currentType.BaseType) != null)
                if (currentType.FullName.Equals(activewindow, StringComparison.InvariantCultureIgnoreCase))
                    return true;
            return false;
        }
    }
}
