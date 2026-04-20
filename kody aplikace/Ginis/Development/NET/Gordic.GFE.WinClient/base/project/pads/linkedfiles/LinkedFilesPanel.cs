//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.LinkedFilesPanel.cs                    </Name>
//    <Description> panel prohlížeče vázaných souborů                           </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-02-20                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.Windows.Forms;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.AddIns;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.Parsers.Services;

namespace Gordic.GFE.WinClient.LinkedFiles
{
    /// <summary>
    /// panel prohlížeče vázaných souborů
    /// </summary>
    class LinkedFilesPanel : UserControl
    {
        ToolStrip toolStrip;
        ToolStripItem[] standardItems;
        LFControl lfControl;
        /// <summary>
        /// Vybraná větev
        /// </summary>
        public AbstractFileTreeNode SelectedNode => lfControl.SelectedNode;
        /// <summary>
        /// Ovladač prohlížeče
        /// </summary>
        public LFControl LFControl => lfControl;

        /// <summary>
        /// seznam vázaných souborů
        /// </summary>
        public List<string> Files => (lfControl != null) ? lfControl.Files : new List<string>();

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        public LinkedFilesPanel()
        {
            lfControl = new LFControl
            {
                Dock = DockStyle.Fill
            };
            Controls.Add(lfControl);

            if (AddInTree.ExistsTreeNode("/ReportDesigner/Pads/LinkedFiles/ToolBar/Standard"))
            {
                toolStrip = ToolbarService.CreateToolStrip(this, "/ReportDesigner/Pads/LinkedFiles/ToolBar/Standard");
                toolStrip.ShowItemToolTips = true;
                toolStrip.Dock = DockStyle.Top;
                toolStrip.GripStyle = ToolStripGripStyle.Hidden;
                toolStrip.Stretch = true;
                standardItems = new ToolStripItem[toolStrip.Items.Count];
                toolStrip.Items.CopyTo(standardItems, 0);
                Controls.Add(toolStrip);
            }
            lfControl.TreeView.BeforeSelect += TreeViewBeforeSelect;
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
        /// výběr souboru
        /// </summary>
        public void SelectFile()
        {
            SelectFile(SimpleDesktop.Desktop.ActiveViewContent, null);
        }
        /// <summary>
        /// Výběr souboru
        /// </summary>
        /// <param name="view">pohled, pro který se hladá seznam vázaných souborů</param>
        /// <param name="fileName">název souboru</param>
        public void SelectFile(IViewContent view, string fileName) { lfControl.SelectFile(view.PrimaryFile, fileName); }

        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this method with the code editor.
        /// </summary>
        void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(LinkedFilesPanel));
            this.SuspendLayout();
            // 
            // LinkedFilesPanel
            // 
            resources.ApplyResources(this, "$this");
            this.AutoScaleMode = AutoScaleMode.Font;
            this.Name = "LinkedFilesPanel";
            this.ResumeLayout(false);
        }

        /// <summary>
        /// aktualizace stromu vázaných souborů
        /// </summary>
        /// <param name="primaryFile">otevřený soubor sestavy</param>
        internal void Refresh(OpenedFile primaryFile)
        {
            lfControl.Refresh(primaryFile);
        }
        /// <summary>
        /// odstranění vybrané položky
        /// </summary>
        /// <param name="openedFile">otevřený soubor sestavy</param>
        internal void DeleteSelectedItem(OpenedFile openedFile)
        {
            lfControl.DeleteSelectedItem(openedFile);
        }
        /// <summary>
        /// vložení nové položky
        /// </summary>
        /// <param name="openedFile">otevřený soubor sestavy</param>
        /// <param name="type">typ vkládaného souboru</param>
        internal void AddItem(OpenedFile openedFile, LFNodeType type = LFNodeType.file)
        {
            lfControl.AddItem(openedFile, type);
        }
        /// <summary>
        /// stažení vybrané položky
        /// </summary>
        /// <param name="openedFile">otevřený soubor sestavy</param>
        internal void DownloadSelectedItem(OpenedFile openedFile)
        {
            lfControl.DownloadSelectedItem(openedFile);
        }
    }
}
