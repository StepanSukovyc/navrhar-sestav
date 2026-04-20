//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.FileRenameTreeNodeVisitor.cs           </Name>
//    <Description> Přejmenování větve souboru                                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using System.IO;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.AddIns;

namespace Gordic.GFE.WinClient.ProjectBrowser
{
    /// <summary>
    /// Přejmenování větve souboru
    /// </summary>
    class FileRenameTreeNodeVisitor : FileTreeNodeVisitor
    {
        string oldName;
        /// <summary>
        /// starý název souboru/složky
        /// </summary>
        public string OldName { get { return oldName; } }
        string newName;
        /// <summary>
        /// nový název souboru/složky
        /// </summary>
        public string NewName { get { return newName; } }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="oldName"></param>
        /// <param name="newName"></param>
        public FileRenameTreeNodeVisitor(string oldName, string newName)
        {
            this.oldName = oldName;
            this.newName = newName;
        }

        /// <summary>
        /// navštivení větve
        /// </summary>
        /// <param name="solutionItemNode"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        public override object Visit(SolutionItemNode solutionItemNode, object data)
        {
            if (FileUtility.IsEqualFileName(oldName, solutionItemNode.FileName))
                solutionItemNode.Text = Path.GetFileName(newName);
            solutionItemNode.AcceptChildren(this, data);
            return data;
        }


        public override object Visit(ProjectNode projectNode, object data)
        {
            if (FileUtility.IsBaseDirectory(oldName, projectNode.Directory) ||
                FileUtility.IsBaseDirectory(projectNode.Directory, oldName))
                projectNode.AcceptChildren(this, data);
            return data;
        }

        public override object Visit(DirectoryNode directoryNode, object data)
        {
            if (FileUtility.IsBaseDirectory(oldName, directoryNode.Directory))
            {
                directoryNode.Directory = FileUtility.RenameBaseDirectory(directoryNode.Directory, oldName, newName);
                directoryNode.AcceptChildren(this, data);
            }
            else if (FileUtility.IsBaseDirectory(directoryNode.Directory, oldName))
                directoryNode.AcceptChildren(this, data);
            return data;
        }

        public override object Visit(FileNode fileNode, object data)
        {
            if (FileUtility.IsEqualFileName(oldName, fileNode.FileName))
                fileNode.FileName = newName;
            else if (FileUtility.IsBaseDirectory(oldName, fileNode.FileName))
                fileNode.FileName = FileUtility.RenameBaseDirectory(fileNode.FileName, oldName, newName);
            fileNode.AcceptChildren(this, data);
            return data;
        }
    }
}
