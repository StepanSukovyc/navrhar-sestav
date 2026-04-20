//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.NodeBuilders.cs                        </Name>
//    <Description> Nástroj na vytvoření větví                                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Project;
using Gordic.General;

namespace Gordic.GFE.WinClient.ProjectBrowser
{
    /// <summary>
    /// Nástroj na vytvoření větví
    /// </summary>
    static class NodeBuilders
    {
        /// <summary>
        /// Vytvoření větví projektu.
        /// </summary>
        public static TreeNode AddProjectNode(TreeNode motherNode, IProject project)
        {
            IProjectNodeBuilder projectNodeBuilder = null;
            foreach (IProjectNodeBuilder nodeBuilder in AddInTree.BuildItems<IProjectNodeBuilder>("/ReportDesigner/Views/ProjectBrowser/NodeBuilders", null, true))
                if (nodeBuilder.CanBuildProjectTree(project))
                {
                    projectNodeBuilder = nodeBuilder;
                    break;
                }
            if (projectNodeBuilder != null)
                return projectNodeBuilder.AddProjectNode(motherNode, project);

            throw new NotImplementedException(string.Join(" ", GResources.GetResourceText(29450377), project.ProjectType + '!')); //RC 29450377 : nelze vytvořit vytvářeč větví pro typ projektu
        }
    }
}
