//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.DirectoryNodeFactory.cs                </Name>
//    <Description> Fabrika na vytváření větví složek                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using Gordic.GFE.WinClient.Project;
using Gordic.GFE.WinClient.AddIns;

namespace Gordic.GFE.WinClient.ProjectBrowser
{
    /// <summary>
    /// Fabrika na vytváření větví složek
    /// </summary>
    static class DirectoryNodeFactory
    {
        public static DirectoryNode CreateDirectoryNode(TreeNode parent, IProject project, string directory)
        {
            return new DirectoryNode(directory);
        }

        public static DirectoryNode CreateDirectoryNode(ProjectItem item, FileNodeStatus status)
        {
            DirectoryNode node;
                node = new DirectoryNode(item.FileName.Trim('\\', '/'), status);
                node.ProjectItem = item;
            return node;
        }
    }
}
