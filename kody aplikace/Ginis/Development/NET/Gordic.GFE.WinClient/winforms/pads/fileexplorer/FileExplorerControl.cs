//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.FileExplorerControl.cs                 </Name>
//    <Description> Samotný ovladač prohlížeče souborů                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-10-22                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using System.IO;
using Gordic.General.WinApplication;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.WinClient.Pads
{
    /// <summary>
    /// Samotný ovladač prohlížeče souborů
    /// </summary>
    class FileExplorerControl : GWinUserControl, IMementoCapable, IClipboardHandler
    {
        /// <summary>
        /// Seznam obrázků
        /// </summary>
        public ImageList imageList1;

        /// <summary>
        /// Prohlížeč
        /// </summary>
        public FETreeView TreeView { get; set; }

        /// <summary>
        /// Získání všech větví stromu
        /// </summary>
        public TreeNodeCollection Nodes { get { return TreeView.Nodes; } }

        /// <summary>
        /// Aktuálně vybraný uzel
        /// </summary>
        public AbstractExtTreeNode SelectedNode { get { return TreeView.SelectedNode as AbstractExtTreeNode; } }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public FileExplorerControl()
        {
            Name = "Explorer";
            InitializeComponent();
            ImageService.SetTVImageList(TreeView.Handle);
            TreeView.DoubleClick += delegate
            {
                if (TreeView.SelectedNode != null && TreeView.SelectedNode.Tag != null)
                    if (File.Exists((TreeView.SelectedNode as FileExplorerNode).FileName))
                        Gordic.GFE.WinClient.Services.FileAgent.OpenFile((TreeView.SelectedNode as FileExplorerNode).FileName);
            };
            this.TreeView.KeyPress += new KeyPressEventHandler(FileExplorerKeyPress);
            this.TreeView.AllowDrop = true;
        }

        private void InitializeComponent()
        {
            this.TreeView = new FETreeView();
            this.imageList1 = new System.Windows.Forms.ImageList();
            this.SuspendLayout();
            // 
            // trwFileExplorer
            // 
            this.TreeView.ImageIndex = 0;
            this.TreeView.ImageList = this.imageList1;
            this.TreeView.Location = new System.Drawing.Point(40, 31);
            this.TreeView.Name = "FileExplorerView";
            this.TreeView.SelectedImageIndex = 0;
            this.TreeView.Size = new System.Drawing.Size(236, 341);
            this.TreeView.TabIndex = 0;
            this.TreeView.Dock = DockStyle.Fill;
            // 
            // imageList1
            // 
            this.imageList1.TransparentColor = System.Drawing.Color.Transparent;
            // 
            // DockControl
            // 
            this.Name = "FileExplorerView";
            this.Controls.Add(this.TreeView);
            this.ResumeLayout(false);
        }

        void FileExplorerKeyPress(object sender, KeyPressEventArgs e)
        {
            if (e.KeyChar != 13)
                return;

            if (TreeView.SelectedNode != null && TreeView.SelectedNode.Tag != null)
            {
                if (File.Exists((TreeView.SelectedNode as FileExplorerNode).FileName))
                    Gordic.GFE.WinClient.Services.FileAgent.OpenFile((TreeView.SelectedNode as FileExplorerNode).FileName);
            }
        }

        /// <summary>
        /// Aktualizace pohledu
        /// </summary>
        public void RefreshView()
        {
            if (TreeView.Nodes.Count > 0)
            {
                Property memento = new Property();
                StoreViewState(memento);
                ReadViewState(memento);
            }
        }

        /// <summary>
        /// Uložení stávajícího stavu zobrazení.
        /// </summary>
        /// <param name="memento">Vlastnosti</param>
        public void StoreViewState(Property memento)
        {
            memento.Set("FileExplorerState", TreeViewHelper.GetViewStateString(TreeView));
        }

        /// <summary>
        /// Čtení stavu zobrazení.
        /// </summary>
        /// <param name="memento">Vlastnosti</param>
        public void ReadViewState(Property memento)
        {
            TreeViewHelper.ApplyViewStateString(memento.Get("FileExplorerState", string.Empty), TreeView);
        }
        #region IMementoCapable
        /// <summary>
        /// Vytvoří novou vlastnost ze stavu.
        /// </summary>
        public Property CreateMemento()
        {
            Property properties = new Property();
            properties["SelectedItem"] = TreeView.SelectedNode.FullPath;//GetPathForNode(TreeView.SelectedNode);
            return properties;
        }

        private string GetPathForNode(TreeNode node)
        {
            return node.Parent == null ? (node.Tag as FileExplorerNode).Name/*.DisplayName*/ : string.Format(@"{0}\{1}", GetPathForNode(node.Parent), (node.Tag as FileExplorerNode).Name/*.DisplayName*/);
        }


        /// <summary>
        /// Uložení stavu do vlastnosti.
        /// </summary>
        public void SetMemento(Property properties)
        {
            if (properties != null && !properties.IsEmpty)
            {
                string selectednode = properties.Get("SelectedItem", string.Empty);
                if (!string.IsNullOrEmpty(selectednode))
                    TreeView.SelectedNode = GetNodeForPath(selectednode);
            }
        }
        #endregion

        #region IClipboardHandler
        /// <summary>
        /// Lze vyjmout
        /// </summary>
        public bool EnableCut
        {
            get { return SelectedNode != null; }
        }

        /// <summary>
        /// Lze kopírovat
        /// </summary>
        public bool EnableCopy
        {
            get { return SelectedNode != null; }
        }

        /// <summary>
        /// Lze vkládat
        /// </summary>
        public bool EnablePaste
        {
            get { return SelectedNode != null && (SelectedNode as FileExplorerNode).EnablePaste; }
        }

        /// <summary>
        /// Lze odstranit
        /// </summary>
        public bool EnableDelete
        {
            get { return SelectedNode != null; }
        }

        /// <summary>
        /// Získání polička nad kterým se provedou operace 
        /// </summary>
        public virtual Control TextBoxControl { get => null; }

        /// <summary>
        /// Akce na odstranění výběru
        /// </summary>
        public void Delete()
        {
            if (SelectedNode is FileExplorerNode node)
                node.Delete();
        }

        /// <summary>
        /// Akce na vyjmutí objektu
        /// </summary>
        public void Cut()
        {
            TreeView.ClearCutNodes();
            if (TreeView.SelectedNode is ExtTreeNode node)
                node.Cut();
        }

        /// <summary>
        /// Akce na kopírování objektu
        /// </summary>
        public void Copy()
        {
            if (SelectedNode is FileExplorerNode node)
                node.Copy();
        }

        /// <summary>
        /// Akce na vložení objektu
        /// </summary>
        public void Paste()
        {
            if (SelectedNode is FileExplorerNode node)
                node.Paste();
        }

        /// <summary>
        /// Indikuje povolení vybrat vše
        /// </summary>
        public bool EnableSelectAll
        {
            get { return false; }
        }

        /// <summary>
        /// Vybrat vše
        /// </summary>
        public void SelectAll()
        {
            throw new NotImplementedException();
        }
        #endregion

        /// <summary>
        /// Získání větve dle cesty
        /// </summary>
        /// <param name="path">Cesta </param>
        /// <returns></returns>
        public TreeNode GetNodeForPath(string path)
        {
            string[] selectedItemPath = path.Split('\\');
            string[] selectedItemPathEnd = new string[selectedItemPath.Length - 1];

            for (int i = 1; i < selectedItemPath.Length; i++)
                selectedItemPathEnd[i - 1] = selectedItemPath[i];

            foreach (TreeNode item in Nodes)
                if (string.Equals(item.Text, selectedItemPath[0], StringComparison.InvariantCultureIgnoreCase))
                    return GetSelectedNode(item, selectedItemPathEnd);

            return null;
        }

        private TreeNode GetSelectedNode(TreeNode node, string[] selectedItemPath)
        {
            if (selectedItemPath.Length == 0)
                return node;

            node.Expand();

            string[] selectedItemPathEnd = new string[selectedItemPath.Length - 1];
            for (int i = 1; i < selectedItemPath.Length; i++)
                selectedItemPathEnd[i - 1] = selectedItemPath[i];

            foreach (TreeNode item in node.Nodes)
                if (string.Equals(item.Text, selectedItemPath[0], StringComparison.InvariantCultureIgnoreCase))
                    return GetSelectedNode(item, selectedItemPathEnd);

            return node;
        }

    }
}
