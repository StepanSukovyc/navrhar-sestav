//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SolutionEventArgs.cs                   </Name>
//    <Description> Argumenty metod obsahující informace o řešení               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.GFE.WinClient.Project
{
    /// <summary>
    /// Argumenty metod obsahující informace o řešení
    /// </summary>
    class SolutionEventArgs : EventArgs
    {
        readonly Solution solution;

        /// <summary>
        /// řešení
        /// </summary>
        public Solution Solution { get { return solution; } }
        /// <summary>
        /// Vytvoření argumentu
        /// </summary>
        /// <param name="solution">řešení</param>
        public SolutionEventArgs(Solution solution)
        {
            this.solution = solution;
        }
    }
}
