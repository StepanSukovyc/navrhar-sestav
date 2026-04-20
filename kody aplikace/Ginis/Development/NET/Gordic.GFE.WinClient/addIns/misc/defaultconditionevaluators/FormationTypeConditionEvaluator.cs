//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.FormationTypeConditionEvaluator.cs     </Name>
//    <Description> zjištění formátu aktivního okna                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-10-22                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Gui;

namespace Gordic.GFE.WinClient.Core
{
    /// <summary>
    /// zjištění formátu aktivního okna
    /// </summary>
    class FormationTypeConditionEvaluator : IConditionEvaluator
    {
        /// <summary>
        /// Je platná podmína?
        /// </summary>
        /// <param name="caller">Volající</param>
        /// <param name="condition">Podmínka</param>
        /// <returns></returns>
        public bool IsValid(object caller, Condition condition)
        {
            if (SimpleDesktop.Desktop.ActiveViewContent == null)
                return false;

            string formationType = condition.Properties.Get("type", string.Empty);

            return !string.IsNullOrEmpty(formationType) ?
                formationType.Equals(GetType(SimpleDesktop.Desktop.ActiveViewContent as IViewContent), StringComparison.InvariantCultureIgnoreCase)
                : true;
        }

        static string GetType(IViewContent viewContent)
        {
            if (viewContent == null)
                return null;

            return /*viewContent.ViewControl.FormationFormat != null ? 
                viewContent.ViewControl.FormationFormat.FormattingGroup
                : */null;
        }
    }

    ///// <summary>
    ///// zjištění formátu aktivního okna
    ///// </summary>
    //class ImplementInterfaceConditionEvaluator : IConditionEvaluator
    //{
    //    /// <summary>
    //    /// Je platná podmína?
    //    /// </summary>
    //    /// <param name="caller">Volající</param>
    //    /// <param name="condition">Podmínka</param>
    //    /// <returns></returns>
    //    public bool IsValid(object caller, Condition condition)
    //    {
    //        if (SimpleDesktop.Desktop.ActiveContent == null)
    //            return false;

    //        string implementation = condition.Properties.Get("type", string.Empty);

    //        return !string.IsNullOrEmpty(implementation) 
    //            ? SimpleDesktop.Desktop.ActiveContent.GetType().GetInterface(implementation) != null 
    //            : false;
    //    }
    //}

}
