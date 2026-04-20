//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.SelectedObjectConditionEvaluator.cs    </Name>
//    <Description> Vyhodnocení podmínky vybraností objektů                     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-09-19                                                  </Created>
//  </FileHeader>

using System;
using System.Collections;
using System.ComponentModel.Design;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Hosting;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.ProjectBrowser;
using Gordic.GFE.WinClient.Services;

namespace Gordic.GFE.WinClient.Core
{
    /// <summary>
    /// Vyhodnocení podmínky vybraností objektů
    /// </summary>
    public class SelectedObjectConditionEvaluator : IConditionEvaluator
    {
        /// <summary>
        /// Kontrola platností podmínky
        /// </summary>
        /// <param name="caller">volající</param>
        /// <param name="condition">podmínka</param>
        /// <returns></returns>
        public bool IsValid(object caller, Condition condition)
        {
            if (SimpleDesktop.Desktop.ActiveContent is ProjectBrowserPad)
            {
                string interf = condition.Properties["implementinterface"];
                if (!string.IsNullOrEmpty(interf) && LocalCommonService.SelectedObject != null)
                    if (LocalCommonService.SelectedObject.GetType().GetInterface(interf) != null)
                        return true;
            }
            else
            {
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return false;

                if (!(SimpleDesktop.Desktop.ActiveViewContent is IHost content) || content.ServiceSelection == null)
                    return false;

                ISelectionService service = (ISelectionService)content.ServiceSelection;
                if (service == null)
                    return false;

                string selectedobject = condition.Properties["implementinterface"];

                ICollection objects = service.GetSelectedComponents();
                foreach (object item in objects)
                {
                    Type currentType = item.GetType();
                    if (currentType.GetInterface(selectedobject) != null)
                        return true;
                }

                if (condition.Properties.Contains("istype"))
                {
                    selectedobject = condition.Properties["istype"];
                    foreach (object item in objects)
                    {
                        Type currentType = item.GetType();
                        if (currentType.FullName.Equals(selectedobject, StringComparison.InvariantCultureIgnoreCase)
                            || currentType.Name.Equals(selectedobject, StringComparison.InvariantCultureIgnoreCase))
                            return true;
                    }
                }
            }
            return false;
        }
    }
}
