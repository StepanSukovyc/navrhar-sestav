//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.WriteableProjectConditionEvaluator.cs  </Name>
//    <Description> Indikuje, zda volající projekt je zapisovatelný             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-25                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Project;

namespace Gordic.GFE.WinClient.Core
{
    /// <summary>
    /// Indikuje, zda volající projekt je zapisovatelný
    /// </summary>
    class WriteableProjectConditionEvaluator : IConditionEvaluator
    {
        public bool IsValid(object caller, Condition condition)
        {
            IProject project = (caller as IProject) ?? ProjectService.CurrentProject;
            return project != null && !project.ReadOnly;
        }
    }
}
