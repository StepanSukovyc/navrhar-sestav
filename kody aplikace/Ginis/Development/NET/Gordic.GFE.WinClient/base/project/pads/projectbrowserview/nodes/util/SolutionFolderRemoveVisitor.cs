//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SolutionFolderRemoveVisitor.cs         </Name>
//    <Description> Odstranění složky řešení                                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.WinClient.Project;
using Gordic.GFE.WinClient.AddIns;

namespace Gordic.GFE.WinClient.ProjectBrowser
{
    /// <summary>
    /// Odstranění složky řešení
    /// </summary>
    class SolutionFolderRemoveVisitor : FileTreeNodeVisitor
    {
        ISolutionFolder folder;

        public SolutionFolderRemoveVisitor(ISolutionFolder folder)
        {
            this.folder = folder;
        }

        public override object Visit(SolutionFolderNode solutionFolderNode, object data)
        {
            if (folder == solutionFolderNode.Folder)
            {
                ExtTreeNode parent = solutionFolderNode.Parent as ExtTreeNode;
                solutionFolderNode.Remove();
                if (parent != null)
                    parent.Refresh();
            }
            else
                solutionFolderNode.AcceptChildren(this, data);
            return data;
        }

        public override object Visit(ProjectNode projectNode, object data)
        {
            if (folder == projectNode.Project)
            {
                ExtTreeNode parent = projectNode.Parent as ExtTreeNode;
                projectNode.Remove();
                if (parent != null)
                    parent.Refresh();
            }
            return data;
        }


    }
}
