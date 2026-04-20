//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SolutionFolderNode.cs                  </Name>
//    <Description> Větev složky řešení                                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using System.Diagnostics;
using System.Windows.Forms;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.AddIns.Project;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.WinForm;
using Gordic.GFE.WinClient.Project;
using Gordic.General;
using Gordic.GFE.WinClient.AddIns;

namespace Gordic.GFE.WinClient.ProjectBrowser
{
    /// <summary>
    /// Větev složky řešení
    /// </summary>
    class SolutionFolderNode : CustomFolderNode, ISolutionFolderNode
    {
        #region AbstractExtTreeNode
        /// <summary>
        /// Inicializace větve
        /// </summary>
        protected override void Initialize()
        {
            base.Initialize();

            ContextmenuAddinTreePath = "/ReportDesigner/Pads/ProjectBrowser/ContextMenu/SolutionFolderNode";
            Nodes.Clear();

            foreach (object treeObject in folder.Folders)
            {
                if (treeObject is IProject)
                    NodeBuilders.AddProjectNode(this, (IProject)treeObject);
                else if (treeObject is SolutionFolder)
                {
                    SolutionFolderNode folderNode = new SolutionFolderNode(solution, (SolutionFolder)treeObject);
                    folderNode.InsertSorted(this);
                }
                else
                    MessageService.ShowWarning(string.Join(" ", "SolutionFolderNode.Initialize():", GResources.GetResourceText(29450372) + ':', treeObject)); //RC 29450372 : neznámý objekt stromu
            }

            foreach (SolutionItem item in folder.SolutionItems.Items)
                new SolutionItemNode(Solution, item).InsertSorted(this);
        }
        #endregion

        Solution solution;
        SolutionFolder folder;

        public override Solution Solution
        {
            get
            {
                Debug.Assert(solution != null);
                return solution;
            }
        }

        public ISolutionFolder Folder
        {
            get
            {
                Debug.Assert(folder != null);
                return folder;
            }
        }

        public ISolutionFolderContainer Container { get { return folder; } }

        public SolutionFolderNode(Solution solution, SolutionFolder folder)
        {
            sortOrder = 0;
            canLabelEdit = true;

            this.solution = solution;
            this.folder = folder;
            this.Tag = folder;
            Text = folder.Name;
            autoClearNodes = false;

            OpenedImage = "ProjectBrowser.SolutionFolder.Open";
            ClosedImage = "ProjectBrowser.SolutionFolder.Closed";
        }

        public override void AfterLabelEdit(string newName)
        {
            if (!Gordic.GFE.Parsers.Services.FileService.CheckFileName(newName))
                return;
            Text = folder.Location = folder.Name = newName;
            ProjectService.SaveSolution();
        }

        public void AddItem(string fileName)
        {
            string relativeFileName = FileUtility.GetRelativePath(solution.Directory, fileName);
            SolutionItem newItem = new SolutionItem(relativeFileName, relativeFileName);
            folder.SolutionItems.Items.Add(newItem);
            new SolutionItemNode(solution, newItem).InsertSorted(this);
        }

        #region Cut & Paste
        public override bool EnableDelete { get { return true; } }

        public override void Delete()
        {
            ProjectService.RemoveSolutionFolder(folder.IdGuid);
            ProjectService.SaveSolution();
        }

        public override bool EnableCopy { get { return false; } }
        public override void Copy()
        {
            throw new System.NotSupportedException();
        }

        public override bool EnableCut { get { return true; } }

        public override void Cut()
        {
            DoPerformCut = true;
            ClipboardWrapper.SetDataObject(new DataObject(typeof(ISolutionFolder).ToString(), folder.IdGuid));
        }

        public static bool DoEnablePaste(ISolutionFolderNode container)
        {
            return DoEnablePaste(container, ClipboardWrapper.GetDataObject());
        }

        static bool DoEnablePaste(ISolutionFolderNode container, IDataObject dataObject)
        {
            if (dataObject == null)
                return false;
            if (dataObject.GetDataPresent(typeof(ISolutionFolder).ToString()))
            {
                string guid = dataObject.GetData(typeof(ISolutionFolder).ToString()).ToString();
                ISolutionFolder solutionFolder = container.Solution.GetSolutionFolder(guid);
                if (solutionFolder == null || solutionFolder == container)
                    return false;
                if (solutionFolder is ISolutionFolderContainer)
                    return solutionFolder.Parent != container
                        && !((ISolutionFolderContainer)solutionFolder).IsAncestorOf(container.Folder);
                else
                    return solutionFolder.Parent != container;
            }
            return false;
        }

        public static void DoPaste(ISolutionFolderNode folderNode)
        {
            IDataObject dataObject = ClipboardWrapper.GetDataObject();
            if (!DoEnablePaste(folderNode, dataObject))
            {
                LoggingService.Warning(string.Join(" ", "SolutionFolderNode.DoPaste:", GResources.GetResourceText(29450373))); //RC 29450373 : Vložení není povoleno!
                return;
            }

            ExtTreeNode folderTreeNode = (ExtTreeNode)folderNode;

            if (dataObject.GetDataPresent(typeof(ISolutionFolder).ToString()))
            {
                string guid = dataObject.GetData(typeof(ISolutionFolder).ToString()).ToString();
                ISolutionFolder solutionFolder = folderNode.Solution.GetSolutionFolder(guid);
                if (solutionFolder != null)
                {
                    folderNode.Container.AddFolder(solutionFolder);
                    ExtTreeView treeView = (ExtTreeView)folderTreeNode.TreeView;
                    foreach (ExtTreeNode node in treeView.CutNodes)
                    {
                        node.Remove();
                        node.InsertSorted(folderTreeNode);
                        if (node.Parent is ExtTreeNode oldParent)
                            oldParent.Refresh();
                    }
                    ProjectService.SaveSolution();
                }
            }
            folderTreeNode.Expand();
        }

        public override bool EnablePaste { get { return DoEnablePaste(this); } }

        public override void Paste() { DoPaste(this); }
        #endregion

        #region Drag & Drop
        public override DataObject DragDropDataObject { get { return new DataObject(this); } }

        public override DragDropEffects GetDragDropEffect(IDataObject dataObject, DragDropEffects proposedEffect)
        {
            if (dataObject.GetDataPresent(typeof(SolutionFolderNode)))
            {
                SolutionFolderNode folderNode = (SolutionFolderNode)dataObject.GetData(typeof(SolutionFolderNode));

                if (folderNode.Folder.Parent != this.folder && !folderNode.Container.IsAncestorOf(Folder))
                    return DragDropEffects.Move;
            }

            if (dataObject.GetDataPresent(typeof(SolutionItemNode)))
            {
                SolutionItemNode solutionItemNode = (SolutionItemNode)dataObject.GetData(typeof(SolutionItemNode));

                if (solutionItemNode.Parent != this)
                    return DragDropEffects.Move;
            }

            if (dataObject.GetDataPresent(typeof(ProjectNode)))
            {
                ProjectNode projectNode = (ProjectNode)dataObject.GetData(typeof(ProjectNode));

                if (projectNode.Parent != this)
                    return DragDropEffects.Move;
            }

            return DragDropEffects.None;
        }

        public override void DoDragDrop(IDataObject dataObject, DragDropEffects effect)
        {
            if (!isInitialized)
            {
                Initialize();
                isInitialized = true;
            }

            if (dataObject.GetDataPresent(typeof(SolutionFolderNode)))
            {
                SolutionFolderNode folderNode = (SolutionFolderNode)dataObject.GetData(typeof(SolutionFolderNode));
                folderNode.Remove();
                folderNode.InsertSorted(this);
                folderNode.EnsureVisible();
                this.folder.AddFolder(folderNode.Folder);
                if (folderNode.Parent is AbstractFileTreeNode parentNode)
                    parentNode.Refresh();
            }

            if (dataObject.GetDataPresent(typeof(SolutionItemNode)))
            {
                SolutionItemNode solutionItemNode = (SolutionItemNode)dataObject.GetData(typeof(SolutionItemNode));

                ISolutionFolderNode folderNode = (ISolutionFolderNode)solutionItemNode.Parent;
                folderNode.Container.SolutionItems.Items.Remove(solutionItemNode.SolutionItem);
                Container.SolutionItems.Items.Add(solutionItemNode.SolutionItem);

                solutionItemNode.Remove();
                solutionItemNode.InsertSorted(this);
                solutionItemNode.EnsureVisible();
                if (solutionItemNode.Parent != null)
                    ((ExtTreeNode)solutionItemNode.Parent).Refresh();
            }

            if (dataObject.GetDataPresent(typeof(ProjectNode)))
            {
                ProjectNode projectNode = (ProjectNode)dataObject.GetData(typeof(ProjectNode));

                projectNode.Remove();
                projectNode.InsertSorted(this);
                projectNode.EnsureVisible();
                this.folder.AddFolder(projectNode.Project);

                if (projectNode.Parent != null)
                    ((ExtTreeNode)projectNode.Parent).Refresh();
            }
            ProjectService.SaveSolution();
        }
        #endregion
        public override object AcceptVisitor(FileTreeNodeVisitor visitor, object data)
        {
            return visitor.Visit(this, data);
        }
    }
}
