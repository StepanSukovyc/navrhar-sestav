//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.IProjectNodeBuilder.cs                 </Name>
//    <Description> Rozhrání vytvářeče větví projektu                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using Gordic.GFE.WinClient.Project;

namespace Gordic.GFE.WinClient.ProjectBrowser
{
    /// <summary>
    /// Rozhrání vytvářeče větví projektu
    /// </summary>
    interface IProjectNodeBuilder
    {
        /// <summary>
        /// Lze vytvořit větev
        /// </summary>
        /// <param name="project">projekt</param>
        /// <returns></returns>
        bool CanBuildProjectTree(IProject project);
        /// <summary>
        /// Přidání projektové větve
        /// </summary>
        /// <param name="motherNode"></param>
        /// <param name="project"></param>
        /// <returns>Přidaná větev stromu</returns>
        TreeNode AddProjectNode(TreeNode motherNode, IProject project);
    }
}
