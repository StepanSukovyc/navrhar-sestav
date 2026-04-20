//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.FileExplorer.cs                        </Name>
//    <Description> Prohlížeč souborů                                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2012-03-28                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.Windows.Forms;
using Gordic.General;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.Core.WinForm;

namespace Gordic.GFE.WinClient.Pads
{
    /// <summary>
    /// Prohlížeč souborového systému
    /// </summary>
    public class FETreeView : ExtTreeView
    {
        /// <summary>
        /// Konstruktor třídy s inicializaci
        /// </summary>
        public FETreeView()
        {
            Initialize();
        }

        private void Initialize()
        {
            AllowDrop = true;
            // Vytvoříme hlavní větev
            FileExplorerNode tvwRoot = new FileExplorerNode(this);
            List<FileExplorerNode> exploreItems = tvwRoot.GetExplorerItems(true);

            foreach (FileExplorerNode shChild in exploreItems)
            {
                if (shChild.IsFolder && shChild.HasSubFolder)
                    shChild.Nodes.Add(GResources.GetResourceText(29450486));  //RC 29450486 : Seznam - se aktivuje po výběru.
                shChild.AddTo(tvwRoot);
            }

            // přidáme hlavní větev do stromu
            Nodes.Clear();
            Nodes.Add(tvwRoot);
            tvwRoot.Expand();

            BeforeExpand += new TreeViewCancelEventHandler(FileExplorerTreeView_BeforeExpand);
        }

        void FileExplorerTreeView_BeforeExpand(object sender, TreeViewCancelEventArgs e)
        {
            if (e.Node == null)
                return;

            if (e.Node.Nodes.Count == 0 || !(e.Node.Nodes[0] is FileExplorerNode))
            {
                // odstraníme všechny staré položky
                e.Node.Nodes.Clear();
                FileExplorerNode shNode = (FileExplorerNode)e.Node;
                List<FileExplorerNode> exploreItems = shNode.GetExplorerItems(true);
                foreach (FileExplorerNode shChild in exploreItems)
                {
                    if (shChild.IsFolder && shChild.HasSubFolder)
                        shChild.Nodes.Add(GResources.GetResourceText(29450486));  //RC 29450486 : Seznam - se aktivuje po výběru.
                    shChild.AddTo(e.Node);
                }
            }
            SortNodes(e.Node.Nodes, true);
        }
        /// <summary>
        /// Spouští se před výběrem větve
        /// </summary>
        /// <param name="e">Parametry výběru</param>
        protected override void OnBeforeSelect(TreeViewCancelEventArgs e)
        {
            if (e.Node is ExtTreeNode node)
            {
                ContextMenuStrip strip = MenuService.CreateContextMenu(e.Node, new Parsers.EventArgsContextMenu(node.ContextmenuAddinTreePath));
                if (strip != null)
                    node.ContextMenuStrip = strip;
            }
        }

    }

}
