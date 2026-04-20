//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.IncludeFileInProject.cs                </Name>
//    <Description> Začlenění souboru do projektu                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.AddIns.Project;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Project;
using Gordic.GFE.WinClient.AddIns;

namespace Gordic.GFE.WinClient.ProjectBrowser
{
    /// <summary>
    /// Začlenění souboru do projektu
    /// </summary>
    class IncludeFileInProject : AbstractMenuCommand
    {
        /// <summary>
        /// začlenění větve do projektu
        /// </summary>
        /// <param name="fileNode"></param>
        /// <returns></returns>
        public static FileProjectItem IncludeFileNode(FileNode fileNode)
        {
            if (fileNode.Parent is FileNode)
                if (((FileNode)fileNode.Parent).FileNodeStatus != FileNodeStatus.InProject)
                    IncludeFileNode((FileNode)fileNode.Parent);

            if (fileNode.Parent is DirectoryNode && !(fileNode.Parent is ProjectNode))
                if (((DirectoryNode)fileNode.Parent).FileNodeStatus != FileNodeStatus.InProject)
                    IncludeDirectoryNode((DirectoryNode)fileNode.Parent, false);

            ItemType type = fileNode.Project.GetDefaultItemType(fileNode.FileName);

            FileProjectItem newItem = new FileProjectItem(fileNode.Project, type)
            {
                Include = FileUtility.GetRelativePath(fileNode.Project.Directory, fileNode.FileName)
            };

            ProjectService.AddProjectItem(fileNode.Project, newItem, fileNode);

            //SS není zapotřebí
            //fileNode.ProjectItem = newItem;

            fileNode.FileNodeStatus = FileNodeStatus.InProject;

            if (fileNode.Parent is ExtTreeNode)
                ((ExtTreeNode)fileNode.Parent).UpdateVisibility();
            fileNode.Project.Save();
            return newItem;
        }

        public static void IncludeDirectoryNode(DirectoryNode directoryNode, bool includeSubNodes)
        {
            if (directoryNode.Parent is DirectoryNode && !(directoryNode.Parent is ProjectNode))
                if (((DirectoryNode)directoryNode.Parent).FileNodeStatus != FileNodeStatus.InProject)
                    IncludeDirectoryNode((DirectoryNode)directoryNode.Parent, false);
            FileProjectItem newItem = new FileProjectItem(
                directoryNode.Project, ItemType.Folder,
                FileUtility.GetRelativePath(directoryNode.Project.Directory, directoryNode.Directory)
            );
            ProjectService.AddProjectItem(directoryNode.Project, newItem, directoryNode);
            directoryNode.ProjectItem = newItem;
            directoryNode.FileNodeStatus = FileNodeStatus.InProject;

            if (includeSubNodes)
                foreach (TreeNode childNode in directoryNode.Nodes)
                {
                    if (childNode is ExtTreeNode)
                        ((ExtTreeNode)childNode).Expanding();
                    if (childNode is FileNode)
                        IncludeFileNode((FileNode)childNode);
                    else if (childNode is DirectoryNode)
                        IncludeDirectoryNode((DirectoryNode)childNode, includeSubNodes);
                }
            directoryNode.Project.Save();
        }

        public override void Run()
        {
            AbstractFileTreeNode node = ProjectBrowserPad.Instance.SelectedNode;
            if (node == null)
                return;
            node.Expanding();

            if (node is FileNode)
                IncludeFileNode((FileNode)node);
            else if (node is DirectoryNode)
                IncludeDirectoryNode((DirectoryNode)node, true);
            ProjectService.SaveSolution();
            ((AbstractFileTreeNode)node.Parent).Refresh();
        }
    }
}
