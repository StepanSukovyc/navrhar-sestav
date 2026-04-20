//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GfrmProjectNodeBuilder.cs              </Name>
//    <Description> nástroj na vytvoření položek stromu                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using Gordic.GFE.WinClient.Project;
using Gordic.GFE.WinClient.ProjectBrowser;
using Gordic.General;

namespace Gordic.GFE.WinClient.GfrmBinding
{
    /// <summary>
    /// nástroj na vytvoření položek stromu
    /// </summary>
    class GfrmProjectNodeBuilder : IProjectNodeBuilder
    {
        /// <summary>
        /// Lze vytvořit větev
        /// </summary>
        /// <param name="project">projekt</param>
        /// <returns></returns>
        public bool CanBuildProjectTree(IProject project) { return project is GfrmProject; }

        /// <summary>
        /// Přidání projektové větve
        /// </summary>
        /// <param name="motherNode"></param>
        /// <param name="project"></param>
        /// <returns>Přidaná větev stromu</returns>
        public TreeNode AddProjectNode(TreeNode motherNode, IProject project)
        {
            if (project is GfrmProject)
            {
                GfrmProjectNode prjNode = new GfrmProjectNode(project);
                prjNode.AddTo(motherNode);
                return prjNode;
            }
            else
            {
                ProjectNode projectNode = new ProjectNode(project);
                projectNode.AddTo(motherNode);
                if (project is MissingProject)
                {
                    projectNode.InsertSorted(motherNode);
                    CustomNode missingNode = new CustomNode();
                    missingNode.SetIcon("Icons.16x16.Warning");
                    missingNode.Text = GResources.GetResourceText(29450232); //RC 29450232 : Soubor projektu nelze nalézt.
                    missingNode.AddTo(projectNode);
                }
                else if (project is UnknownProject)
                {
                    projectNode.InsertSorted(motherNode);
                    CustomNode unknownNode = new CustomNode();
                    unknownNode.SetIcon("Icons.16x16.Warning");
                    unknownNode.Text = ((UnknownProject)project).WarningText;
                    unknownNode.AddTo(projectNode);
                }
                return projectNode;
            }
        }

    }
}
