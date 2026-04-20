//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SsrProjectNodeBuilder.cs               </Name>
//    <Description> nástroj na vytvoření položek stromu sestavení/projektu      </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-05-27                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using Gordic.GFE.WinClient.Project;
using Gordic.GFE.WinClient.ProjectBrowser;
using Gordic.General;

namespace Gordic.GFE.WinClient.SsrBinding
{
    /// <summary>
    /// nástroj na vytvoření položek stromu sestavení/projektu
    /// </summary>
    class SsrProjectNodeBuilder : IProjectNodeBuilder
    {
        /// <summary>
        /// indikuje, jestli nástroj je schopen vytvořit položky stromu projektu
        /// </summary>
        /// <param name="project">aktuální projekt</param>
        /// <returns></returns>
        public bool CanBuildProjectTree(IProject project) => project is SsrProject;
        /// <summary>
        /// přídání větve projektu
        /// </summary>
        /// <param name="parentNode">nadřazená větev</param>
        /// <param name="project">aktuální projekt větve</param>
        /// <returns></returns>
        public TreeNode AddProjectNode(TreeNode parentNode, IProject project)
        {
            if (project is SsrProject)
            {
                SsrProjectNode prjNode = new SsrProjectNode(project);
                prjNode.AddTo(parentNode);
                return prjNode;
            }
            else
            {
                ProjectNode projectNode = new ProjectNode(project);
                projectNode.AddTo(parentNode);
                if (project is MissingProject)
                {
                    projectNode.InsertSorted(parentNode);
                    CustomNode missingNode = new CustomNode();
                    missingNode.SetIcon("Icons.16x16.Warning");
                    missingNode.Text = GResources.GetResourceText(29450232); //RC 29450232 : Soubor projektu nelze nalézt.
                    missingNode.AddTo(projectNode);
                }
                else if (project is UnknownProject prj)
                {
                    projectNode.InsertSorted(parentNode);
                    CustomNode unknownNode = new CustomNode();
                    unknownNode.SetIcon("Icons.16x16.Warning");
                    unknownNode.Text = prj.WarningText;
                    unknownNode.AddTo(projectNode);
                }
                return projectNode;
            }
        }

    }
}
