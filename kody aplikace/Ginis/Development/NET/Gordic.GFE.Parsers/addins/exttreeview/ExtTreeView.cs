//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ExtTreeView.cs                         </Name>
//    <Description> Vlastní strom.                                              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-09                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Windows.Forms;
using System.Drawing;
using System.Diagnostics;
using System.Drawing.Imaging;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Core.WinForm;

namespace Gordic.GFE.Parsers.AddIns
{
    /// <summary>
    /// Porovnání
    /// </summary>
    public class ExtTreeViewComparer : IComparer<TreeNode>
    {
        /// <summary>
        /// Porovnání dvou větví stromu
        /// </summary>
        /// <param name="x">První větev</param>
        /// <param name="y">Druhá větev</param>
        /// <returns></returns>
        public int Compare(TreeNode x, TreeNode y)
        {
            Debug.Assert(x != null);
            Debug.Assert(y != null);
            ExtTreeNode node1 = x as ExtTreeNode;
            ExtTreeNode node2 = y as ExtTreeNode;

            if (node1 == null || node2 == null)
                return x.Text.CompareTo(y.Text);

            if (node1.SortOrder != node2.SortOrder)
                return Math.Sign(node1.SortOrder - node2.SortOrder);

            return node1.CompareString.CompareTo(node2.CompareString);
        }
    }

    /// <summary>
    /// Vlastní strom.
    /// </summary>
    public class ExtTreeView : TreeView
    {
        /// <summary>
        /// cesta k vázanému souboru stromového pohledu
        /// </summary>
        public virtual string LinkedFileName { get => null; }

        readonly Dictionary<string, int> imageIndexTable = new Dictionary<string, int>();
        readonly List<ExtTreeNode> cutNodes = new List<ExtTreeNode>();

        /// <summary>
        /// Indikuje řazení.
        /// </summary>
        public bool IsSorted { get; set; }

        /// <summary>
        /// Vyjmuté větve
        /// </summary>
        public List<ExtTreeNode> CutNodes { get { return cutNodes; } }

        /// <summary>
        /// Nástroj na seřazení větví
        /// </summary>
        public IComparer<TreeNode> NodeSorter { get; set; }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public ExtTreeView()
        {
            NodeSorter = new ExtTreeViewComparer();
            DrawMode = TreeViewDrawMode.OwnerDrawText;
            IsSorted = true;
            HideSelection = false;
            AllowDrop = true;
            ImageList newImageList = new ImageList
            {
                ImageSize = new Size(16, 16),
                ColorDepth = ColorDepth.Depth32Bit
            };
            this.ImageList = newImageList;
            CanClearSelection = true;
        }

        /// <summary>
        /// řazení
        /// </summary>
        public new void Sort() { SortNodes(Nodes, true); }

        /// <summary>
        /// řazení větví
        /// </summary>
        /// <param name="nodes"></param>
        /// <param name="recursive"></param>
        public void SortNodes(TreeNodeCollection nodes, bool recursive)
        {
            if (!IsSorted)
                return;

            TreeNode[] nodeArray = new TreeNode[nodes.Count];
            nodes.CopyTo(nodeArray, 0);
            Array.Sort(nodeArray, NodeSorter);
            nodes.Clear();
            nodes.AddRange(nodeArray);

            if (recursive)
                foreach (TreeNode childNode in nodeArray)
                    SortNodes(childNode.Nodes, true);
        }

        /// <exclude/>
        public void ClearCutNodes()
        {
            foreach (ExtTreeNode node in CutNodes)
                node.DoPerformCut = false;
            CutNodes.Clear();
        }

        /// <summary>
        /// Odstranění všech větví
        /// </summary>
        public void Clear()
        {
            if (this.IsDisposed)
                return;
            TreeNode[] nodeArray = new TreeNode[Nodes.Count];
            Nodes.CopyTo(nodeArray, 0);
            Nodes.Clear();
            foreach (TreeNode node in nodeArray)
                if (node is IDisposable)
                    ((IDisposable)node).Dispose();
        }

        string labelEditOldLabel;
        /// <summary>
        /// Editace štítků
        /// </summary>
        /// <param name="node">editovaná větev</param>
        public void StartLabelEdit(ExtTreeNode node)
        {
            if (node == null)
                return;

            if (node.CanLabelEdit)
            {
                node.EnsureVisible();
                SelectedNode = node;
                LabelEdit = true;
                node.BeforeLabelEdit();
                node.BeginEdit();
                labelEditOldLabel = node.Text;
                node.Text = string.Empty;
            }
        }

        /// <summary>
        /// Zachycení stisknutí kláves
        /// </summary>
        /// <param name="msg">zprava</param>
        /// <param name="keyData">informace o klávesich</param>
        /// <returns></returns>
        protected override bool ProcessCmdKey(ref Message msg, Keys keyData)
        {
            if (SelectedNode == null || !SelectedNode.IsEditing)
                switch (keyData)
                {
                    case Keys.F2:
                        StartLabelEdit(SelectedNode as ExtTreeNode);
                        break;
                    case Keys.Delete:
                        DeleteNode(SelectedNode as ExtTreeNode);
                        break;
                }
            return base.ProcessCmdKey(ref msg, keyData);
        }

        /// <summary>
        /// Provede se po ukončení editací štítku
        /// </summary>
        /// <param name="e">Parametr metody</param>
        protected override void OnAfterLabelEdit(NodeLabelEditEventArgs e)
        {
            base.OnAfterLabelEdit(e);
            LabelEdit = false;
            e.CancelEdit = true;

            if (e.Node is ExtTreeNode node)
            {
                node.Text = labelEditOldLabel;
                labelEditOldLabel = null;
                if (e.Label != null)
                    node.AfterLabelEdit(e.Label);
            }
            SortParentNodes(e.Node);
            SelectedNode = e.Node;
        }

        /// <summary>
        /// Filtr položek
        /// </summary>
        /// <param name="filtertext"></param>
        public void Filter(string filtertext)
        {
            this.filtertext = filtertext;
            if (!string.IsNullOrEmpty(filtertext))
                ExpandAll();
            UpdateVisibility();
        }

        void UpdateVisibility()
        {
            foreach (TreeNode node in Nodes)
                if (node is ExtTreeNode extTreeNode)
                    extTreeNode.UpdateVisibility();
        }

        private void SortParentNodes(TreeNode treeNode)
        {
            TreeNode parent = treeNode.Parent;
            SortNodes((parent == null) ? Nodes : parent.Nodes, false);
        }

        bool inRefresh;
        /// <summary>
        /// Před rozšířením
        /// </summary>
        /// <param name="e"></param>
        protected override void OnBeforeExpand(TreeViewCancelEventArgs e)
        {
            if (mouseClickNum == 2)
            {
                mouseClickNum = 0; // zachytí první výskyt, nebrání rozšíření dvojklikem
                e.Cancel = true;
                return;
            }
            base.OnBeforeExpand(e);

            if (e.Node == null)
                return;
            try
            {
                if (e.Node is ExtTreeNode)
                {
                    if (!((ExtTreeNode)e.Node).IsInitialized && !inRefresh)
                    {
                        inRefresh = true;
                        BeginUpdate();
                    }

                    ((ExtTreeNode)e.Node).Expanding();
                }
                if (inRefresh)
                    SortNodes(e.Node.Nodes, false);
            }
            catch (Exception ex) { MessageService.ShowError(ex); }

            if (e.Node.Nodes.Count == 0
                && inRefresh)
            {
                inRefresh = false;
                EndUpdate();
            }
        }

        internal bool IsNodeVisible(ExtTreeNode extTreeNode)
        {
            return string.IsNullOrEmpty(filtertext)
                || (extTreeNode.Name != null && extTreeNode.Name.ToLowerInvariant().Contains(filtertext.ToLowerInvariant()))
                || extTreeNode.Nodes.Count > 0
                || (extTreeNode.ToolTipText != null && extTreeNode.ToolTipText.ToLowerInvariant().Contains(filtertext.ToLowerInvariant()));
        }

        /// <summary>
        /// Po rozšíření
        /// </summary>
        /// <param name="e"></param>
        protected override void OnAfterExpand(TreeViewEventArgs e)
        {
            base.OnAfterExpand(e);
            if (inRefresh)
            {
                inRefresh = false;
                EndUpdate();
            }
        }

        /// <summary>
        /// collaps větví
        /// </summary>
        /// <param name="e"></param>
        protected override void OnBeforeCollapse(TreeViewCancelEventArgs e)
        {
            if (mouseClickNum == 2)
            {
                mouseClickNum = 0; // zachytí první výskyt, nebrání rozšíření dvojklikem
                e.Cancel = true;
                return;
            }
            base.OnBeforeCollapse(e);
            if (e.Node is ExtTreeNode)
                ((ExtTreeNode)e.Node).Collapsing();
        }

        /// <summary>
        /// Stisknutí tlačítka
        /// </summary>
        /// <param name="e"></param>
        protected override void OnKeyPress(KeyPressEventArgs e)
        {
            base.OnKeyPress(e);
            if (e.KeyChar == '\r')
            {
                if (SelectedNode is ExtTreeNode node)
                    node.ActivateItem();
                e.Handled = true;
            }
        }

        /// <summary>
        /// Dvojklik myši
        /// </summary>
        /// <param name="e"></param>
        protected override void OnMouseDoubleClick(MouseEventArgs e)
        {
            base.OnMouseDoubleClick(e);
            if (GetNodeAt(e.Location) is ExtTreeNode node)
                node.ActivateItem();
        }

        bool canClearSelection = true;

        /// <summary>
        /// Indikuje, zda uživatel může zrušit výběr kliknutím na ploše.
        /// </summary>
        public bool CanClearSelection { get; set; }

        int mouseClickNum; // 0 pokud tlačítko myši není stisknuté, jinak (1=normal, 2=doubleClick)
        string filtertext;// filtrovan7 text

        /// <exclude/>
        protected override void OnMouseDown(MouseEventArgs e)
        {
            mouseClickNum = e.Clicks;
            base.OnMouseDown(e);
            TreeNode node = GetNodeAt(e.X, e.Y);
            if (node != null)
            {
                if (SelectedNode != node)
                    SelectedNode = node;
            }
            else
                if (canClearSelection)
                SelectedNode = null;
        }

        /// <exclude/>
        protected override void OnMouseUp(MouseEventArgs e)
        {
            mouseClickNum = 0;
            base.OnMouseUp(e);
        }

        /// <exclude/>
        protected override void OnBeforeSelect(TreeViewCancelEventArgs e)
        {
            base.OnBeforeSelect(e);
            if (e.Node is ExtTreeNode node)
            {
                ContextMenuStrip strip = MenuService.CreateContextMenu(e.Node, new EventArgsContextMenu(node.ContextmenuAddinTreePath));
                if (strip != null)
                    node.ContextMenuStrip = strip;
            }
        }

        /// <exclude/>
        protected override void OnAfterCheck(TreeViewEventArgs e)
        {
            base.OnAfterCheck(e);
            if (e.Node is ExtTreeNode node)
                node.CheckedChanged();
        }

        /// <exclude/>
        protected override void OnDrawNode(DrawTreeNodeEventArgs e)
        {
            if (!inRefresh)
            {
                if (e.Node is ExtTreeNode node && !node.DrawDefault)
                {
                    node.Draw(e);
                    e.DrawDefault = false;
                }
                else
                {
                    if ((e.State & (TreeNodeStates.Selected | TreeNodeStates.Focused)) == TreeNodeStates.Selected)
                    {
                        // větev je vybraná ale namá focus
                        e.Graphics.FillRectangle(SystemBrushes.Control, e.Bounds);
                        e.Graphics.DrawString(e.Node.Text, this.Font, SystemBrushes.ControlText, e.Bounds.Location);
                        e.DrawDefault = false;
                    }
                    else
                        e.DrawDefault = true;
                }
            }
            else
                e.DrawDefault = false;
            base.OnDrawNode(e);
        }

        /// <exclude/>
        protected override void OnItemDrag(ItemDragEventArgs e)
        {
            base.OnItemDrag(e);
            if (e.Item is ExtTreeNode node)
            {
                DataObject dataObject = node.DragDropDataObject;
                if (dataObject != null)
                {
                    DoDragDrop(dataObject, DragDropEffects.All);
                    SortParentNodes(node);
                }
            }
        }

        /// <exclude/>
        protected override void OnDragEnter(DragEventArgs e)
        {
            base.OnDragEnter(e);
            e.Effect = DragDropEffects.Move | DragDropEffects.Copy | DragDropEffects.None;
        }

        /// <exclude/>
        protected override void OnDragOver(DragEventArgs e)
        {
            base.OnDragOver(e);
            Point clientcoordinate = PointToClient(new Point(e.X, e.Y));

            if (GetNodeAt(clientcoordinate) is ExtTreeNode node)
            {
                HandleDragOver(e, node);

                if (e.Effect != DragDropEffects.None)
                    SelectedNode = node;
            }
        }

        /// <exclude/>
        void HandleDragOver(DragEventArgs e, ExtTreeNode node)
        {
            // CTRL stisknuto.
            e.Effect = node.GetDragDropEffect(e.Data, (e.KeyState & 8) > 0 ? DragDropEffects.Copy : DragDropEffects.Move);
        }

        /// <exclude/>
        protected override void OnDragDrop(DragEventArgs e)
        {
            base.OnDragDrop(e);
            Point clientcoordinate = PointToClient(new Point(e.X, e.Y));

            if (GetNodeAt(clientcoordinate) is ExtTreeNode node)
            {
                // se stane při velmi rychlém přetahování
                HandleDragOver(e, node);
                if (e.Effect != DragDropEffects.None)
                {
                    node.DoDragDrop(e.Data, e.Effect);
                    SortParentNodes(node);
                }
            }
        }

        /// <summary>
        /// Získání indexu brázku
        /// </summary>
        /// <param name="image">Obrázek</param>
        /// <param name="performCutBitmap"></param>
        /// <returns></returns>
        public int GetImageIndexForImage(string image, bool performCutBitmap)
        {
            string imageKey = performCutBitmap ? (image + "_ghost") : image;
            if (!imageIndexTable.ContainsKey(imageKey))
            {
                ImageList.Images.Add(performCutBitmap ? GetGhostBitmap(GetBitmap(image)) : GetBitmap(image));
                imageIndexTable[imageKey] = ImageList.Images.Count - 1;
                return ImageList.Images.Count - 1;
            }
            return imageIndexTable[imageKey];
        }

        /// <summary>
        /// Získání obrázku dle názvu
        /// </summary>
        /// <param name="name">název obrázku</param>
        /// <returns></returns>
        Bitmap GetBitmap(string name)
        {
            Bitmap bmp;
            try { bmp = WinFormsResourceService.GetBitmap(name); }
            catch (ResourceNotFoundException) { bmp = null; }

            if (bmp != null)
                return bmp;

            return WinFormsResourceService.GetBitmap("Icons.16x16.MiscFiles");
        }

        /// <summary>
        /// Získání obrázku dle originálu
        /// </summary>
        /// <param name="bitmap">originál</param>
        /// <returns></returns>
        Bitmap GetGhostBitmap(Bitmap bitmap)
        {
            ColorMatrix clrMatrix = new ColorMatrix(new float[][] {
                                                        new float[] {1, 0, 0, 0, 0},
                                                        new float[] {0, 1, 0, 0, 0},
                                                        new float[] {0, 0, 1, 0, 0},
                                                        new float[] {0, 0, 0, 0.5f, 0},
                                                        new float[] {0, 0, 0, 0, 1}
                                                    });

            ImageAttributes imgAttributes = new ImageAttributes();
            imgAttributes.SetColorMatrix(clrMatrix,
                                         ColorMatrixFlag.Default,
                                         ColorAdjustType.Bitmap);

            Bitmap ghostBitmap = new Bitmap(bitmap.Width, bitmap.Height, PixelFormat.Format32bppArgb);

            using (Graphics g = Graphics.FromImage(ghostBitmap))
            {
                g.FillRectangle(SystemBrushes.Window, new Rectangle(0, 0, bitmap.Width, bitmap.Height));
                g.DrawImage(bitmap, new Rectangle(0, 0, bitmap.Width, bitmap.Height), 0, 0, bitmap.Width, bitmap.Height, GraphicsUnit.Pixel, imgAttributes);
            }

            return ghostBitmap;
        }

        /// <exclude/>
        protected virtual void DeleteNode(ExtTreeNode node)
        {
            if (node == null)
                return;

            if (node.EnableDelete)
            {
                node.EnsureVisible();
                SelectedNode = node;
                node.Delete();
            }
        }
    }
}
