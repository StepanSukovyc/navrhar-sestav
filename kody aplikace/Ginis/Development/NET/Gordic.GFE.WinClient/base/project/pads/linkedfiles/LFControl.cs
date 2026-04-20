//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.LFControl.cs                           </Name>
//    <Description> ovladač zobrazení vázanýh souborů                           </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-02-20                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.WinClient.AddIns;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.Gui;
using Gordic.General;
using System.IO;
using Gordic.GFE.WinClient.FileCommands;
using System;
using Microsoft.Office.Interop.Excel;
using Gordic.GFE.WinClient.Project;

namespace Gordic.GFE.WinClient.LinkedFiles
{
    /// <summary>
    /// ovladač zobrazení vázanýh souborů
    /// </summary>
    class LFControl : UserControl
    {
        LFExtTreeView treeView;
        /// <summary>
        /// Strom
        /// </summary>
        public LFExtTreeView TreeView { get { return treeView; } }

        Dictionary<OpenedFile, LFExtNode> cach = new Dictionary<OpenedFile, LFExtNode>();

        /// <summary>
        /// seznam vázaných souborů
        /// </summary>
        public List<string> Files
        {
            get
            {
                List<string> result = new List<string>();

                if (!cach.ContainsKey(SimpleDesktop.Desktop.ActiveViewContent.PrimaryFile))
                    Refresh(SimpleDesktop.Desktop.ActiveViewContent.PrimaryFile);

                if (cach.ContainsKey(SimpleDesktop.Desktop.ActiveViewContent.PrimaryFile))
                    foreach (var item in cach[SimpleDesktop.Desktop.ActiveViewContent.PrimaryFile].AllNodes.ToList())
                        result.Add(item.Text);

                return result;
            }
        }

        /// <summary>
        /// Vybraná větev
        /// </summary>
        public AbstractFileTreeNode SelectedNode { get { return treeView.SelectedNode as AbstractFileTreeNode; } }

        /// <summary>
        /// Zobrazít vše
        /// </summary>
        public bool ShowAll
        {
            get { return AbstractFileTreeNode.ShowAll; }
            set
            {
                if (AbstractFileTreeNode.ShowAll != value)
                {
                    treeView.BeginUpdate();
                    AbstractFileTreeNode.ShowAll = value;
                    foreach (AbstractFileTreeNode node in treeView.Nodes)
                        node.UpdateVisibility();
                    treeView.Sort();
                    treeView.EndUpdate();
                }
            }
        }

        string lastSelectionTarget;

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        public LFControl()
        {
            InitializeComponent();
        }

        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(LFControl));
            Gordic.GFE.Parsers.AddIns.ExtTreeViewComparer extTreeViewComparer1 = new Gordic.GFE.Parsers.AddIns.ExtTreeViewComparer();
            this.treeView = new LFExtTreeView();
            this.SuspendLayout();
            // 
            // treeView
            // 
            this.treeView.AllowDrop = true;
            this.treeView.CanClearSelection = true;
            resources.ApplyResources(this.treeView, "treeView");
            this.treeView.DrawMode = System.Windows.Forms.TreeViewDrawMode.OwnerDrawText;
            this.treeView.HideSelection = false;
            this.treeView.IsSorted = true;
            this.treeView.Name = "treeView";
            this.treeView.NodeSorter = extTreeViewComparer1;
            // 
            // LFControl
            // 
            resources.ApplyResources(this, "$this");
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.treeView);
            this.Name = "LFControl";
            this.ResumeLayout(false);

        }

        /// <summary>
        /// Nalezení větev souboru
        /// </summary>
        /// <param name="fileName">Název hledaného souboru</param>
        public FileNode FindFileNode(string fileName)
        {
            ThreadService.AssertMainThread();
            return FindFileNode(treeView.Nodes, fileName);
        }
        FileNode FindFileNode(TreeNodeCollection nodes, string fileName)
        {
            FileNode fn;
            foreach (TreeNode node in nodes)
            {
                fn = node as FileNode;
                if (fn != null)
                    if (FileUtility.IsEqualFileName(fn.FileName, fileName))
                        return fn;
                if (node != null)
                {
                    fn = FindFileNode(node.Nodes, fileName);
                    if (fn != null)
                        return fn;
                }
            }
            return null;
        }

        /// <exclude/>
        public void SelectFile(OpenedFile primaryFile, string fileName)
        {
            if (primaryFile == null)
            {
                treeView.Clear();
                return;
            }

            if (!cach.ContainsKey(primaryFile))
                cach.Add(primaryFile, new LFExtNode(primaryFile));

            if (cach.ContainsKey(primaryFile))
                treeView.Initialize(cach[primaryFile]);
        }

        private void selectFile(LFExtNode lFNode, string fileName)
        {
            try
            {
                //inSelectFile = true;
                lastSelectionTarget = fileName;
                TreeNode node = FindFileNode(fileName);

                if (node != null)
                {
                    // první vlastník
                    TreeNode nodeToSelect = node;
                    TreeNode p = node.Parent;
                    while (p != null)
                    {
                        if (!p.IsExpanded)
                            nodeToSelect = p;
                        p = p.Parent;
                    }
                    if (nodeToSelect != null)
                        treeView.SelectedNode = nodeToSelect;
                }
                else
                    SelectDeepestOpenNodeForPath(fileName);
            }
            finally { /*inSelectFile = false;*/ }
        }
        void SelectDeepestOpenNodeForPath(string fileName)
        {
            TreeNode node = FindDeepestOpenNodeForPath(fileName);
            if (node != null)
                treeView.SelectedNode = node;
        }

        TreeNode FindDeepestOpenNodeForPath(string fileName)
        {
            return null;
            //Solution solution = ProjectService.OpenSolution;
            //if (solution == null)
            //    return null;

            //IProject project = solution.FindProjectContainingFile(fileName);
            //if (project == null)
            //    return null;

            //string relativePath = String.Empty;
            //TreeNode targetNode = FindProjectNode(project);

            //if (targetNode == null)
            //{
            //    if (treeView.Nodes == null || treeView.Nodes.Count < 1)
            //        return null;
            //    else
            //    {
            //        targetNode = treeView.Nodes[0];
            //        if (fileName.StartsWith(solution.Directory))
            //            relativePath = fileName.Replace(solution.Directory, "");
            //    }
            //}
            //else
            //{
            //    TreeNode t = targetNode;
            //    TreeNode p = targetNode.Parent;
            //    while (p != null)
            //    {
            //        if (!p.IsExpanded)
            //            t = p;
            //        p = p.Parent;
            //    }

            //    if (t != targetNode)
            //        return t;
            //    else
            //        if (fileName.StartsWith((targetNode as ProjectNode).Directory))
            //            relativePath = fileName.Replace((targetNode as ProjectNode).Directory, "");
            //}

            //if (!targetNode.IsExpanded)
            //    return targetNode;

            //string[] targets = relativePath.Trim('/', '\\').Split('/', '\\');
            //TreeNode nextNode = null;
            //foreach (string target in targets)
            //{
            //    nextNode = null;
            //    foreach (TreeNode node in targetNode.Nodes)
            //    {
            //        if (node == null)
            //            continue;
            //        if (node.Text == target)
            //        {
            //            nextNode = node;
            //            break;
            //        }
            //    }
            //    if (nextNode == null)
            //        break;
            //    else
            //        targetNode = nextNode;
            //}
            //return targetNode;
        }

        /// <summary>
        /// aktualizace cach tabulky
        /// </summary>
        /// <param name="primaryFile">otevřený soubor aktualizace</param>
        internal void Refresh(OpenedFile primaryFile)
        {
            treeView.Clear();

            if (cach.ContainsKey(primaryFile))
                cach.Remove(primaryFile);

            if (!cach.ContainsKey(primaryFile))
                cach.Add(primaryFile, new LFExtNode(primaryFile));
        }

        /// <summary>
        /// odstranění vybrané položky
        /// </summary>
        /// <param name="openedFile">otevřený soubor sestavy</param>
        internal void DeleteSelectedItem(OpenedFile openedFile)
        {
            if (!(treeView.SelectedNode is LFExtNode node))
                return;

            // odstraníme soubor ze seznamu obrázku
            ImageService.RemoveImages(openedFile);
            // odstraníme soubor z dočasné složky vázaných souborů
            FileUtility.ObservedDelete(new List<string>() { FileUtility.Combine(openedFile.TemporaryDirectory.Path, node.FullName) });
            UpdateZip(openedFile);
            ImageService.GetImages(openedFile);
        }

        /// <summary>
        /// vložení nové položky
        /// </summary>
        /// <param name="openedFile">otevřený soubor sestavy</param>
        /// <param name="type">typ vkládaného souboru</param>
        internal void AddItem(OpenedFile openedFile, LFNodeType type = LFNodeType.file)
        {
            switch (type)
            {
                case LFNodeType.file:
                    break;
                case LFNodeType.image:
                    string imageName = string.Empty;
                    CommonService.GetNewImageByDialog(ref imageName);
                    UpdateZip(openedFile);
                    break;
                case LFNodeType.template:
                    break;
                case LFNodeType.directory:
                    break;
                default:
                    break;
            }
        }

        /// <summary>
        /// stažení vybrané položky
        /// </summary>
        /// <param name="openedFile">otevřený soubor sestavy</param>
        internal void DownloadSelectedItem(OpenedFile openedFile)
        {
            if (!(treeView.SelectedNode is LFExtNode node))
                return;

            DialogResult result = FileService.GetNewName((string[])(AddInTree.GetTreeNode("/ReportDesigner/Desktop/NewImageFilter").BuildChildItems(this)).ToArray(typeof(string))
                , out string newFileName, SimpleDesktop.MainForm, node.FullName);

            if (result == DialogResult.OK)
            {
                string source = FileUtility.Combine(openedFile.TemporaryDirectory.Path, node.FullName);
                FileService.CopyFile(source, newFileName, false, true);
            }
        }

        void UpdateZip(OpenedFile openedFile)
        {
            // provedeme záměnu <alf>.zip novým obsahem
            string dir = Path.GetDirectoryName(openedFile.ContentFileName);
            string name = Path.GetFileNameWithoutExtension(openedFile.ContentFileName);
            string zipSource = FileUtility.Combine(dir, string.Format("{0}.zip", name));

            if (File.Exists(zipSource))
                FileUtility.ObservedDelete(new List<string>() { zipSource });

            if (Directory.GetFiles(openedFile.TemporaryDirectory.Path).Length > 0)
                GZip.ZipDirectoryContent(openedFile.TemporaryDirectory.Path, zipSource);
            // provedeme záměnu <alf>.zip novým obsahem ^^^
        }

    }
}
