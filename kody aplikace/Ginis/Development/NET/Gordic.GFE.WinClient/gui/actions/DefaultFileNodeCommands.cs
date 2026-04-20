//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.DefaultFileNodeCommands.cs             </Name>
//    <Description> Zahrnout soubor do projektu                                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-10                                                  </Created>
//  </FileHeader>

using System.IO;
using System.Diagnostics;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.ProjectBrowser;

namespace Gordic.GFE.WinClient
{
    /// <summary>
    /// Otevřít složku souboru v průzkumníku
    /// </summary>
    class OpenFolderContainingFile : AbstractMenuCommand
    {
        /// <summary>
        /// spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (Owner is ExtTreeNode)
                FileCommands.OpenFolderContainingFile.OpenContainingFolderInExplorer((Owner as ExtTreeNode).LinkedFileName);
            else if (Owner is ExtTreeView)
                FileCommands.OpenFolderContainingFile.OpenContainingFolderInExplorer((Owner as ExtTreeView).LinkedFileName);
        }
    }

    /// <summary>
    /// Otevření vybrané položky
    /// </summary>
    class OpenFolder : AbstractMenuCommand
    {
        public override void Run()
        {
            DirectoryNode directoryNode = ProjectBrowserPad.Instance.SelectedNode as DirectoryNode;
            if (directoryNode != null)
            {
                OpenFolderInExplorer(directoryNode.Directory);
                return;
            }
        }

        public static void OpenFolderInExplorer(string directory)
        {
            if (directory != null && Directory.Exists(directory))
                Process.Start(directory);
        }
    }

    /// <summary>
    /// Otevření souboru z FileExplorer
    /// </summary>
    public class OpenFileFromFileExplorer : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            //DockableControl dc = DefaultDesktop.Instance.GetControl(typeof(FileExplorerControl));
            //if (dc != null && dc.ContentControl is FileExplorerControl)
            //{
            //    AbstractExtTreeNode node = (dc.ContentControl as FileExplorerControl).SelectedNode;
            //    if (node == null)
            //        return;

            //    node.ActivateItem();
            //}
        }
    }

}
