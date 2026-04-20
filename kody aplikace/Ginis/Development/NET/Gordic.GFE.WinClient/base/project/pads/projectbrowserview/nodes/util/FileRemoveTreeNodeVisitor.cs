//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.FileRemoveTreeNodeVisitor.cs           </Name>
//    <Description> Odstranění větve souboru                                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.AddIns;

namespace Gordic.GFE.WinClient.ProjectBrowser
{
    /// <summary>
    /// Odstranění větve souboru
    /// </summary>
    class FileRemoveTreeNodeVisitor : FileTreeNodeVisitor
    {
        string fileName;

        public FileRemoveTreeNodeVisitor(string fileName)
        {
            this.fileName = fileName;
        }

        public override object Visit(SolutionItemNode solutionItemNode, object data)
        {
            if (FileUtility.IsBaseDirectory(fileName, solutionItemNode.FileName))
                solutionItemNode.Remove();
            else
                solutionItemNode.AcceptChildren(this, data);
            return data;
        }

        public override object Visit(ProjectNode projectNode, object data)
        {
            if (FileUtility.IsBaseDirectory(projectNode.Directory, fileName))
                projectNode.AcceptChildren(this, data);
            return data;
        }

        public override object Visit(DirectoryNode directoryNode, object data)
        {
            if (FileUtility.IsBaseDirectory(fileName, directoryNode.Directory))
            {
                ExtTreeNode parent = directoryNode.Parent as ExtTreeNode;
                directoryNode.Remove();
                if (parent != null)
                    parent.Refresh();
            }
            else
                if (FileUtility.IsBaseDirectory(directoryNode.Directory, fileName))
                    directoryNode.AcceptChildren(this, data);
            return data;
        }

        public override object Visit(FileNode fileNode, object data)
        {
            if (FileUtility.IsBaseDirectory(fileName, fileNode.FileName))
            {
                ExtTreeNode parent = fileNode.Parent as ExtTreeNode;
                fileNode.Remove();
                if (parent != null)
                    parent.Refresh();
            }
            else
                fileNode.AcceptChildren(this, data);
            return data;
        }
    }
}
