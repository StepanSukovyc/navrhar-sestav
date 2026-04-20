//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.FileExplorerPanel.cs                   </Name>
//    <Description> Panel pro prohížeč souborů                                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2012-10-22                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Services;

namespace Gordic.GFE.WinClient.Pads
{
    /// <summary>
    /// Panel pro prohížeč souborů
    /// </summary>
    class FileExplorerPanel : UserControl
    {
        ToolStrip toolStrip;
        FileExplorerControl fileExplorerControl;
        ToolStripItem[] standardItems;

        /// <summary>
        /// Ovladač prohlížeče
        /// </summary>
        public FileExplorerControl FileExplorerControl { get { return fileExplorerControl; } }

        /// <summary>
        /// Aktuálně vybraný uzel
        /// </summary>
        public AbstractExtTreeNode SelectedNode { get { return fileExplorerControl.SelectedNode; } }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public FileExplorerPanel()
        {
            fileExplorerControl = new FileExplorerControl();
            fileExplorerControl.Dock = DockStyle.Fill;
            Controls.Add(fileExplorerControl);

            if (AddInTree.ExistsTreeNode("/ReportDesigner/Pads/FileExplorer/ToolBar/Standard"))
            {
                toolStrip = ToolbarService.CreateToolStrip(this, "/ReportDesigner/Pads/FileExplorer/ToolBar/Standard");
                toolStrip.ShowItemToolTips = true;
                toolStrip.Dock = DockStyle.Top;
                toolStrip.GripStyle = System.Windows.Forms.ToolStripGripStyle.Hidden;
                toolStrip.Stretch = true;
                standardItems = new ToolStripItem[toolStrip.Items.Count];
                toolStrip.Items.CopyTo(standardItems, 0);
                Controls.Add(toolStrip);
            }
            fileExplorerControl.TreeView.BeforeSelect += TreeViewBeforeSelect;
            fileExplorerControl.TreeView.AfterSelect += new TreeViewEventHandler(TreeViewAfterSelect);
        }

        void TreeViewAfterSelect(object sender, TreeViewEventArgs e)
        {
            ToolbarService.UpdateToolbar(toolStrip);
            toolStrip.Refresh();
        }

        void TreeViewBeforeSelect(object sender, TreeViewCancelEventArgs e)
        {
            UpdateToolStrip(e.Node.Tag as FileExplorerNode);
        }

        void UpdateToolStrip(FileExplorerNode node)
        {
            if (toolStrip == null) return;
            toolStrip.Items.Clear();
            toolStrip.Items.AddRange(standardItems);
            //ToolbarService.UpdateToolbar(toolStrip);
            if (node != null && node.ToolbarAddinTreePath != null)
            {
                toolStrip.Items.Add(new ToolStripSeparator());
                toolStrip.Items.AddRange(ToolbarService.CreateToolStripItems(node.ToolbarAddinTreePath, node, false));
            }
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // FileExplorerPanel
            // 
            this.Name = "FileExplorerPanel";
            this.ResumeLayout(false);

        }
    }

}
