//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ProjectBrowserPanel.cs                 </Name>
//    <Description> Panel prohlížeče projektu                                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Project;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.WinClient.AddIns;

namespace Gordic.GFE.WinClient.ProjectBrowser
{
    /// <summary>
    /// Panel prohlížeče projektu
    /// </summary>
    class ProjectBrowserPanel : UserControl
    {
        ToolStrip toolStrip;
        ProjectBrowserControl projectBrowserControl;
        readonly ToolStripItem[] standardItems;
        /// <summary>
        /// Vybraná větev
        /// </summary>
        public AbstractFileTreeNode SelectedNode
        {
            get { return projectBrowserControl.SelectedNode; }
        }
        /// <summary>
        /// Kořenová větev
        /// </summary>
        public AbstractFileTreeNode RootNode
        {
            get { return projectBrowserControl.RootNode; }
        }
        /// <summary>
        /// Ovladač prohlížeče
        /// </summary>
        public ProjectBrowserControl ProjectBrowserControl
        {
            get { return projectBrowserControl; }
        }
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public ProjectBrowserPanel()
        {
            projectBrowserControl = new ProjectBrowserControl
            {
                Dock = DockStyle.Fill
            };
            Controls.Add(projectBrowserControl);

            if (AddInTree.ExistsTreeNode("/ReportDesigner/Pads/ProjectBrowser/ToolBar/Standard"))
            {
                toolStrip = ToolbarService.CreateToolStrip(this, "/ReportDesigner/Pads/ProjectBrowser/ToolBar/Standard");
                toolStrip.ShowItemToolTips = true;
                toolStrip.Dock = DockStyle.Top;
                toolStrip.GripStyle = System.Windows.Forms.ToolStripGripStyle.Hidden;
                toolStrip.Stretch = true;
                standardItems = new ToolStripItem[toolStrip.Items.Count];
                toolStrip.Items.CopyTo(standardItems, 0);
                Controls.Add(toolStrip);
            }
            //projectBrowserControl.TreeView.BeforeSelect += TreeViewBeforeSelect;
            projectBrowserControl.TreeView.AfterSelect += TreeView_AfterSelect;
        }

        void TreeView_AfterSelect(object sender, TreeViewEventArgs e)
        {
            UpdateToolStrip(e.Node as AbstractFileTreeNode);            
        }

        void TreeViewBeforeSelect(object sender, TreeViewCancelEventArgs e)
        {
            UpdateToolStrip(e.Node as AbstractFileTreeNode);
        }

        void UpdateToolStrip(AbstractFileTreeNode node)
        {
            if (toolStrip == null) return;
            toolStrip.Items.Clear();
            toolStrip.Items.AddRange(standardItems);
            ToolbarService.UpdateToolbar(toolStrip);
            if (node != null && node.ToolbarAddinTreePath != null)
            {
                toolStrip.Items.Add(new ToolStripSeparator());
                toolStrip.Items.AddRange(ToolbarService.CreateToolStripItems(node.ToolbarAddinTreePath, node, false));
            }
        }
        /// <summary>
        /// Zobrazení řešení
        /// </summary>
        /// <param name="solution"></param>
        public void ViewSolution(Solution solution)
        {
            UpdateToolStrip(null);
            projectBrowserControl.ViewSolution(solution);
        }

        /// <summary>
        /// Uložení stavu do vlastnosti
        /// </summary>
        /// <param name="memento">Vlastnosti do kterých se stav ukládá</param>
        public void StoreViewState(Property memento)
        {
            projectBrowserControl.StoreViewState(memento);
        }

        /// <summary>
        /// Načtení vlastnosti.
        /// </summary>
        /// <param name="memento">Vlastnosti k načtení</param>
        public void ReadViewState(Property memento)
        {
            projectBrowserControl.ReadViewState(memento);
        }
        /// <summary>
        /// Vyprázdnění
        /// </summary>
        public void Clear()
        {
            projectBrowserControl.Clear();
            UpdateToolStrip(null);
        }
        /// <summary>
        /// Výběr souboru
        /// </summary>
        /// <param name="fileName">název souboru</param>
        public void SelectFile(string fileName)
        {
            projectBrowserControl.SelectFile(fileName);
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // ProjectBrowserPanel
            // 
            this.Name = "ProjectBrowserPanel";
            this.ResumeLayout(false);

        }
    }
}
