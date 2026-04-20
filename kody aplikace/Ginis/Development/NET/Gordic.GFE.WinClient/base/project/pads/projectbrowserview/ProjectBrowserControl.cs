//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ProjectBrowserControl.cs               </Name>
//    <Description> Ovladač prohlížeče projektu                                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.Drawing;
using System.IO;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.Project;
using Gordic.General;
using Gordic.GFE.WinClient.AddIns;

namespace Gordic.GFE.WinClient.ProjectBrowser
{
    /// <summary>
    /// Ovladač prohlížeče projektu
    /// </summary>
    class ProjectBrowserControl : UserControl
    {
        sealed class ProjectBrowserTreeView : ExtTreeView
        {
            /// <exclude/>
            protected override void DeleteNode(ExtTreeNode node) { }
        }
        ProjectBrowserTreeView treeView;
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

        /// <summary>
        /// Vybraná větev složky
        /// </summary>
        public DirectoryNode SelectedDirectoryNode
        {
            get
            {
                TreeNode selectedNode =
                    treeView.SelectedNode as AbstractFileTreeNode;
                DirectoryNode node = null;
                while (selectedNode != null && node == null)
                {
                    node = selectedNode as DirectoryNode;
                    selectedNode = selectedNode.Parent;
                }
                return node;
            }
        }
        /// <summary>
        /// Vybraná větev
        /// </summary>
        public AbstractFileTreeNode SelectedNode => treeView.SelectedNode as AbstractFileTreeNode;

        /// <summary>
        /// Kořenová větev
        /// </summary>
        public AbstractFileTreeNode RootNode => (treeView.Nodes.Count > 0) ? treeView.Nodes[0] as AbstractFileTreeNode : null;
        /// <summary>
        /// Strom
        /// </summary>
        public ExtTreeView TreeView => treeView;
        /// <summary>
        /// Vytvoření nové isnatce třídy
        /// </summary>
        public ProjectBrowserControl()
        {
            InitializeComponent();
            treeView.CanClearSelection = false;
            treeView.BeforeSelect += TreeViewBeforeSelect;
            treeView.AfterExpand += TreeViewAfterExpand;
            Services.FileAgent.FileRenamed += FileServiceFileRenamed;
            Services.FileAgent.FileRemoved += FileServiceFileRemoved;

            ProjectService.SolutionFolderRemoved += ProjectServiceSolutionFolderRemoved;
            treeView.DrawNode += TreeViewDrawNode;
            treeView.DragDrop += TreeViewDragDrop;
        }

        void TreeViewDragDrop(object sender, DragEventArgs e)
        {
            Point clientcoordinate = PointToClient(new Point(e.X, e.Y));
            if (!(treeView.GetNodeAt(clientcoordinate) is ExtTreeNode node))
            {
                if (e.Data.GetDataPresent(DataFormats.FileDrop))
                {
                    string[] files = (string[])e.Data.GetData(DataFormats.FileDrop);
                    foreach (string file in files)
                        try
                        {
                            IProjectLoader loader = ProjectService.GetProjectLoader(file);
                            if (loader != null)
                                FileUtility.ObservedLoad(new NamedFileOperationDelegate(loader.Load), file);
                            else
                                Gordic.GFE.WinClient.Services.FileAgent.OpenFile(file);
                        }
                        catch (Exception ex)
                        {
                            MessageService.ShowError(ex, string.Join(" ", GResources.GetResourceText(29450378), file + '!')); //RC 29450378 : soubor nelze otevřít
                        }
                }
            }
        }

        void TreeViewDrawNode(object sender, DrawTreeNodeEventArgs e)
        {
            dynamic node = e.Node as AbstractFileTreeNode;
            if (node != null)
            {
                Image img = node.Overlay;
                if (img != null)
                {
                    Graphics g = e.Graphics;
                    g.DrawImageUnscaled(img, e.Bounds.X - img.Width, e.Bounds.Bottom - img.Height);
                }
            }
            node = e.Node as IFileProjectItemHandler;
            if (node != null && node.IsDefault)
                e.Graphics.DrawString(
                    e.Node.Text
                    , new Font(this.Font.FontFamily, this.Font.Size, FontStyle.Bold, this.Font.Unit, this.Font.GdiCharSet, this.Font.GdiVerticalFont)
                    , new SolidBrush(e.Node.IsSelected ? ColorService.InvertColor(Color.DarkBlue) : Color.DarkBlue)
                    , e.Bounds.Location);
        }

        void ProjectServiceSolutionFolderRemoved(object sender, SolutionFolderEventArgs e)
        {
            CallVisitor(new SolutionFolderRemoveVisitor(e.SolutionFolder));
        }

        void CallVisitor(FileTreeNodeVisitor visitor)
        {
            foreach (AbstractFileTreeNode treeNode in treeView.Nodes)
                treeNode.AcceptVisitor(visitor, null);
        }

        void FileServiceFileRemoved(object sender, FileEventArgs e)
        {
            CallVisitor(new FileRemoveTreeNodeVisitor(e.FileName));
        }

        void FileServiceFileRenamed(object sender, FileRenameEventArgs e)
        {
            if (FileUtility.IsEqualFileName(Path.GetDirectoryName(e.SourceFile),
                                            Path.GetDirectoryName(e.TargetFile)))
                CallVisitor(new FileRenameTreeNodeVisitor(e.SourceFile, e.TargetFile));
            else
                CallVisitor(new FileRemoveTreeNodeVisitor(e.SourceFile));
        }
        /// <summary>
        /// Aktualizace zobrazení
        /// </summary>
        public void RefreshView()
        {
            if (treeView.Nodes.Count > 0)
            {
                Property memento = new Property();
                StoreViewState(memento);
                ViewSolution(((AbstractFileTreeNode)treeView.Nodes[0]).Solution);
                ReadViewState(memento);
            }
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

        /// <summary>
        /// Nalezení větev souboru
        /// </summary>
        /// <param name="fileName">Název hledaného souboru</param>
        public FileNode FindFileNode(string fileName)
        {
            ThreadService.AssertMainThread();
            return FindFileNode(treeView.Nodes, fileName);
        }

        string lastSelectionTarget;
        private System.ComponentModel.IContainer components;

        bool inSelectFile;

        /// <exclude/>
        public void SelectFile(string fileName)
        {
            try
            {
                inSelectFile = true;
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
            finally
            {
                inSelectFile = false;
            }
        }

        #region SelectDeepestOpenNode
        void SelectDeepestOpenNodeForPath(string fileName)
        {
            TreeNode node = FindDeepestOpenNodeForPath(fileName);
            if (node != null)
                treeView.SelectedNode = node;
        }

        TreeNode FindDeepestOpenNodeForPath(string fileName)
        {
            Solution solution = ProjectService.OpenSolution;
            if (solution == null)
                return null;

            IProject project = solution.FindProjectContainingFile(fileName);
            if (project == null)
                return null;

            string relativePath = String.Empty;
            TreeNode targetNode = FindProjectNode(project);

            if (targetNode == null)
            {
                if (treeView.Nodes == null || treeView.Nodes.Count < 1)
                    return null;
                else
                {
                    targetNode = treeView.Nodes[0];
                    if (fileName.StartsWith(solution.Directory))
                        relativePath = fileName.Replace(solution.Directory, "");
                }
            }
            else
            {
                TreeNode t = targetNode;
                TreeNode p = targetNode.Parent;
                while (p != null)
                {
                    if (!p.IsExpanded)
                        t = p;
                    p = p.Parent;
                }

                if (t != targetNode)
                    return t;
                else
                    if (fileName.StartsWith((targetNode as ProjectNode).Directory))
                    relativePath = fileName.Replace((targetNode as ProjectNode).Directory, "");
            }

            if (!targetNode.IsExpanded)
                return targetNode;

            string[] targets = relativePath.Trim('/', '\\').Split('/', '\\');
            TreeNode nextNode = null;
            foreach (string target in targets)
            {
                nextNode = null;
                foreach (TreeNode node in targetNode.Nodes)
                {
                    if (node == null)
                        continue;
                    if (node.Text == target)
                    {
                        nextNode = node;
                        break;
                    }
                }
                if (nextNode == null)
                    break;
                else
                    targetNode = nextNode;
            }
            return targetNode;
        }

        ProjectNode FindProjectNode(IProject project)
        {
            if (project == null)
                return null;
            return FindProjectNodeByName(treeView.Nodes, project.Name);
        }

        ProjectNode FindProjectNodeByName(TreeNodeCollection nodes, string projectName)
        {
            if (nodes == null)
                return null;
            ProjectNode pn;
            foreach (TreeNode node in nodes)
            {
                if (node == null)
                    continue;
                pn = node as ProjectNode;
                if (pn != null)
                    if (pn.Text == projectName)
                        return pn;
                pn = FindProjectNodeByName(node.Nodes, projectName);
                if (pn != null)
                    return pn;
            }
            return null;
        }
        #endregion

        public void ViewSolution(Solution solution)
        {
            AbstractFileTreeNode solutionNode = new SolutionNode(solution);
            treeView.Clear();
            solutionNode.AddTo(treeView);

            foreach (object treeObject in solution.Folders)
                if (treeObject is IProject)
                    NodeBuilders.AddProjectNode(solutionNode, (IProject)treeObject);
                else
                {
                    SolutionFolderNode folderNode = new SolutionFolderNode(solution, (SolutionFolder)treeObject);
                    folderNode.InsertSorted(solutionNode);
                }

            solutionNode.Expand();
        }
        /// <summary>
        /// Vyprázdnění
        /// </summary>
        public void Clear() { treeView.Clear(); }
        /// <summary>
        /// Aktivace podložky
        /// </summary>
        public void PadActivated()
        {
            TreeViewBeforeSelect(null, new TreeViewCancelEventArgs(treeView.SelectedNode, false, TreeViewAction.Unknown));
        }

        void TreeViewAfterExpand(object sender, TreeViewEventArgs e)
        {
            if (lastSelectionTarget != null)
            {
                TreeNode node = FindDeepestOpenNodeForPath(lastSelectionTarget);
                while (node != null)
                    if (node.Parent == e.Node)
                    {
                        treeView.SelectedNode = node;
                        break;
                    }
                    else
                        node = node.Parent;
            }
        }

        void TreeViewBeforeSelect(object sender, TreeViewCancelEventArgs e)
        {
            if (!(e.Node is AbstractFileTreeNode node))
                return;
            if (!inSelectFile)
                ProjectService.CurrentProject = node.Project;
        }

        /// <exclude/>
        public void StoreViewState(Property memento)
        {
            memento.Set("ProjectBrowserState", TreeViewHelper.GetViewStateString(treeView));
        }

        /// <exclude/>
        public void ReadViewState(Property memento)
        {
            TreeViewHelper.ApplyViewStateString(memento.Get("ProjectBrowserState", ""), treeView);
        }

        #region Windows Forms Designer generated code
        /// <exclude/>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(ProjectBrowserControl));
            Gordic.GFE.Parsers.AddIns.ExtTreeViewComparer extTreeViewComparer1 = new Gordic.GFE.Parsers.AddIns.ExtTreeViewComparer();
            this.treeView = new ProjectBrowserTreeView();
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
            // ProjectBrowserControl
            // 
            this.Controls.Add(this.treeView);
            this.Name = "ProjectBrowserControl";
            resources.ApplyResources(this, "$this");
            this.ResumeLayout(false);
        }
        #endregion
    }
}
