//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SolutionNode.cs                        </Name>
//    <Description> Větev řešení                                                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using System.IO;
using System.Linq;
using System.Windows.Forms;
using Gordic.GFE.WinClient.Project;
using Gordic.GFE.WinClient.Services;
using Gordic.General;
using Gordic.GFE.WinClient.AddIns;

namespace Gordic.GFE.WinClient.ProjectBrowser
{
    /// <summary>
    /// Větev řešení
    /// </summary>
    class SolutionNode : AbstractFileTreeNode, ISolutionFolderNode
    {
        #region IDisposable
        /// <summary>
        /// uvolnění objektu
        /// </summary>
        /// <param name="disposing">indikátor uvolnění</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
                ProjectService.SolutionSaved -= ps_SolutionSaved;

            base.Dispose(disposing);
        }
        #endregion

        #region AbstractExtTreeNode
        /// <summary>
        /// Inicializace větve
        /// </summary>
        protected override void Initialize()
        {
            base.Initialize();
            ContextmenuAddinTreePath = "/ReportDesigner/Pads/ProjectBrowser/ContextMenu/SolutionNode";
            ToolbarAddinTreePath = "/ReportDesigner/Pads/ProjectBrowser/ToolBar/SolutionNode";
            SetIcon("ProjectBrowser.Solution");
            UpdateText();
        }
        #endregion

        /// <summary>
        /// projekt sestavení - první projekt
        /// </summary>
        public override IProject Project
        {
            get { return Solution != null && Solution.Projects.Count(pr => pr != null) != 0 ? Solution.Projects.First() : base.Project; }
        }
        Solution solution;
        public ISolutionFolder Folder { get { return solution; } }
        /// <summary>
        /// sestavení větve
        /// </summary>
        public override Solution Solution { get { return solution; } }
        /// <exclude/>
        public ISolutionFolderContainer Container { get { return solution; } }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="solution">sestavení větve</param>
        public SolutionNode(Solution solution)
        {
            sortOrder = -1;
            this.solution = solution;
            autoClearNodes = false;
            canLabelEdit = true;

            Tag = solution;
            ProjectService.SolutionSaved += ps_SolutionSaved;
        }

        /// <summary>
        /// přidání položky dle názvu souboru
        /// </summary>
        /// <param name="fileName">název souboru položky</param>
        public void AddItem(string fileName)
        {
            string folderName = GResources.GetResourceText(29450376); //RC 29450376 : položka sestavení
            SolutionFolderNode node = null;
            foreach (TreeNode n in Nodes)
            {
                node = n as SolutionFolderNode;
                if (node != null && node.Folder.Name == folderName)
                    break;
                node = null;
            }
            if (node == null)
            {
                SolutionFolder newSolutionFolder = solution.CreateFolder(folderName);
                solution.AddFolder(newSolutionFolder);
                solution.Save();

                node = new SolutionFolderNode(solution, newSolutionFolder);
                node.InsertSorted(this);
            }
            node.AddItem(fileName);
        }

        #region Drag & Drop
        public override DragDropEffects GetDragDropEffect(IDataObject dataObject, DragDropEffects proposedEffect)
        {
            if (dataObject.GetDataPresent(typeof(SolutionFolderNode)))
            {
                SolutionFolderNode folderNode = (SolutionFolderNode)dataObject.GetData(typeof(SolutionFolderNode));

                if (folderNode.Folder.Parent != solution)
                    return DragDropEffects.All;
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
            AbstractFileTreeNode parentNode = null;

            if (dataObject.GetDataPresent(typeof(SolutionFolderNode)))
            {
                SolutionFolderNode folderNode = (SolutionFolderNode)dataObject.GetData(typeof(SolutionFolderNode));
                parentNode = folderNode.Parent as AbstractFileTreeNode;

                folderNode.Remove();
                folderNode.InsertSorted(this);

                this.solution.AddFolder(folderNode.Folder);
            }
            if (dataObject.GetDataPresent(typeof(ProjectNode)))
            {
                ProjectNode projectNode = (ProjectNode)dataObject.GetData(typeof(ProjectNode));
                parentNode = projectNode.Parent as AbstractFileTreeNode;

                projectNode.Remove();
                projectNode.InsertSorted(this);
                projectNode.EnsureVisible();
                this.solution.AddFolder(projectNode.Project);
            }

            if (parentNode != null)
                parentNode.Refresh();

            solution.Save();
        }
        #endregion

        #region Cut&Paste
        public override bool EnablePaste { get { return SolutionFolderNode.DoEnablePaste(this); } }

        public override void Paste() { SolutionFolderNode.DoPaste(this); }
        #endregion

        /// <exclude/>
        public override object AcceptVisitor(FileTreeNodeVisitor visitor, object data)
        {
            return visitor.Visit(this, data);
        }
        /// <exclude/>
        public override void BeforeLabelEdit() { Text = solution.Name; }
        /// <exclude/>
        public override void AfterLabelEdit(string newName)
        {
            try
            {
                if (solution.Name == newName)
                    return;
                if (!Gordic.GFE.Parsers.Services.FileService.CheckFileName(newName))
                    return;
                string newFileName = Path.Combine(solution.Directory, newName + Path.GetExtension(solution.FileName));
                if (!FileAgent.RenameFile(solution.FileName, newFileName, false))
                    return;
                solution.FileName = newFileName;
                solution.Name = newName;
            }
            finally { UpdateText(); }
        }

        void ps_SolutionSaved(object sender, SolutionEventArgs e) { UpdateText(); }
        void UpdateText()
        {
            Text = string.Format(GResources.GetResourceText(29450374) + " '{0}'", solution.Name); //RC 29450374 : Sestavení
            if (Solution.ReadOnly)
                Text += " (" + GResources.GetResourceText(29450375) + ")"; //RC 29450375 : jen pro čtení
        }
    }
}
