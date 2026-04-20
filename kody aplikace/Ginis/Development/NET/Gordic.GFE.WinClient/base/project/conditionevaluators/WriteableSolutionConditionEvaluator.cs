//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.WriteableSolutionConditionEvaluator.cs </Name>
//    <Description> Indikuje zapisovatelnost projektu                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-25                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.WinClient.Project
{
    /// <summary>
    /// Indikuje zapisovatelnost projektu
    /// </summary>
    class WriteableSolutionConditionEvaluator : IConditionEvaluator
    {
        public bool IsValid(object caller, Condition condition)
        {
            Solution solution = ProjectService.OpenSolution;
            return (solution != null && !solution.ReadOnly);
        }
    }
}
