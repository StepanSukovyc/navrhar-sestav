//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.StylesheetAssignedCondition.cs         </Name>
//    <Description> Určuje, zda aktivnímu XML dokumentu byla přiřazená šablona stylů XSLT.</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-10                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.XmlEditor.Gui.Editor;

namespace Gordic.GFE.WinClient.XmlEditor
{
    /// <summary>
    /// Určuje, zda aktivnímu XML dokumentu byla přiřazená šablona stylů XSLT.
    /// </summary>
    public class StylesheetAssignedCondition : IConditionEvaluator
    {
        /// <summary>
        /// Kontrola platností podmínky
        /// </summary>
        /// <param name="caller"></param>
        /// <param name="condition">podmínka</param>
        /// <returns></returns>
        public bool IsValid(object caller, Condition condition)
        {
            IDesktopWindow window = SimpleDesktop.Desktop.ActiveDesktopWindow;
            if (window != null)
            {
                if (window.ActiveViewContent is XmlView view)
                    return view.StylesheetFileName != null;
            }
            return false;
        }
    }
}
