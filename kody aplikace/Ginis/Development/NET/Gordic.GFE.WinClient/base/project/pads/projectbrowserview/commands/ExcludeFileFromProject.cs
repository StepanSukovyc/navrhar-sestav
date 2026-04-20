//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ExcludeFileFromProject.cs              </Name>
//    <Description> Vyloučení souboru z projektu                                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.Windows.Forms;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Project;
using Gordic.GFE.WinClient.AddIns;

namespace Gordic.GFE.WinClient.ProjectBrowser
{
    /// <summary>
    /// Vyloučení souboru z projektu
    /// </summary>
    class ExcludeFileFromProject : AbstractMenuCommand
    {
        public static void ExcludeFileNode(FileNode fileNode)
        {
            List<FileNode> dependentNodes = new List<FileNode>();
            foreach (TreeNode subNode in fileNode.Nodes)
                if (subNode is FileNode)
                    dependentNodes.Add((FileNode)subNode);
            dependentNodes.ForEach(ExcludeFileNode);

            if (fileNode.ProjectItem != null)
                ProjectService.RemoveProjectItem(fileNode.Project, fileNode.ProjectItem);
            else
            {
                fileNode.ProjectItem = null;
                fileNode.FileNodeStatus = FileNodeStatus.None;
                if (fileNode.Parent is ExtTreeNode)
                    ((ExtTreeNode)fileNode.Parent).UpdateVisibility();
            }
        }

        internal static void ExcludeDirectoryNode(DirectoryNode directoryNode)
        {
            if (directoryNode.ProjectItem != null)
            {
                ProjectService.RemoveProjectItem(directoryNode.Project, directoryNode.ProjectItem);
                directoryNode.ProjectItem = null;
            }
            directoryNode.FileNodeStatus = FileNodeStatus.None;
            if (directoryNode.Parent is ExtTreeNode)
                ((ExtTreeNode)directoryNode.Parent).UpdateVisibility();
        }

        public override void Run()
        {
            AbstractFileTreeNode node = ProjectBrowserPad.Instance.SelectedNode;
            if (node == null)
                return;

            if (node is FileNode)
                ExcludeFileNode((FileNode)node);
            else if (node is DirectoryNode)
            {
                node.Expanding();
                Stack<TreeNode> nodeStack = new Stack<TreeNode>();
                nodeStack.Push(node);
                while (nodeStack.Count > 0)
                {
                    TreeNode cur = nodeStack.Pop();

                    if (cur is FileNode)
                        ExcludeFileNode((FileNode)cur);
                    else if (cur is DirectoryNode)
                        ExcludeDirectoryNode((DirectoryNode)cur);

                    foreach (TreeNode childNode in cur.Nodes)
                    {
                        if (childNode is ExtTreeNode)
                            ((ExtTreeNode)childNode).Expanding();
                        nodeStack.Push(childNode);
                    }
                }
            }

            ProjectService.SaveSolution();
            ((AbstractFileTreeNode)node.Parent).Refresh();
        }
    }
}
