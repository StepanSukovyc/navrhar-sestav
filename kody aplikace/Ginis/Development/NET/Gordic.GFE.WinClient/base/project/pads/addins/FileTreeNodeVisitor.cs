//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ProjectBrowserTreeNodeVisitor.cs       </Name>
//    <Description> Visitor větví prohlížeče projektu                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;
using Gordic.General;
using Gordic.GFE.WinClient.ProjectBrowser;

namespace Gordic.GFE.WinClient.AddIns
{
    /// <summary>
    /// Visitor větví prohlížeče projektu
    /// </summary>
    class FileTreeNodeVisitor
    {
        public object Visit(AbstractFileTreeNode abstractProjectBrowserTreeNode, object data)
        {
            LoggingService.Warning(string.Join(" ", GResources.GetResourceText(29450370), "Visit()", GResources.GetResourceText(29450369) + ':', abstractProjectBrowserTreeNode)); //RC 29450370 : Upozornění na výchozí metodu
            abstractProjectBrowserTreeNode.AcceptChildren(this, data);
            return data;
        }

        public virtual object Visit(SolutionNode solutionNode, object data)
        {
            solutionNode.AcceptChildren(this, data);
            return data;
        }

        public virtual object Visit(SolutionFolderNode solutionFolderNode, object data)
        {
            solutionFolderNode.AcceptChildren(this, data);
            return data;
        }

        public virtual object Visit(SolutionItemNode solutionItemNode, object data)
        {
            solutionItemNode.AcceptChildren(this, data);
            return data;
        }

        public virtual object Visit(ProjectNode projectNode, object data)
        {
            projectNode.AcceptChildren(this, data);
            return data;
        }

        public virtual object Visit(DirectoryNode directoryNode, object data)
        {
            directoryNode.AcceptChildren(this, data);
            return data;
        }

        public virtual object Visit(FileNode fileNode, object data)
        {
            fileNode.AcceptChildren(this, data);
            return data;
        }

        public virtual object Visit(CustomFolderNode customFolderNode, object data)
        {
            customFolderNode.AcceptChildren(this, data);
            return data;
        }

        public virtual object Visit(CustomNode customNode, object data)
        {
            customNode.AcceptChildren(this, data);
            return data;
        }
    }
}
