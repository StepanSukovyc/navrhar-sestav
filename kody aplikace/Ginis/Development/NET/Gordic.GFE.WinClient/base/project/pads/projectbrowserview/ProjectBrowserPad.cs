//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ProjectBrowserPad.cs                   </Name>
//    <Description> Prohlížeč projektu                                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Project;
using Gordic.General;
using Gordic.GFE.WinClient.AddIns;

namespace Gordic.GFE.WinClient.ProjectBrowser
{
    /// <summary>
    /// Prohlížeč projektu
    /// </summary>
    class ProjectBrowserPad : AbstractPadContent, IClipboardHandler
    {
        static ProjectBrowserPad instance;
        /// <summary>
        /// Instance podložky
        /// </summary>
        public static ProjectBrowserPad Instance
        {
            get
            {
                if (instance == null)
                {
                    PadDescriptor pad = SimpleDesktop.Desktop.GetPad(typeof(ProjectBrowserPad));
                    if (pad != null)
                        pad.CreatePad();
                    else
                        instance = new ProjectBrowserPad();
                }
                return instance;
            }
        }
        ProjectBrowserPanel projectBrowserPanel = new ProjectBrowserPanel();
        /// <summary>
        /// Vybraná větev
        /// </summary>
        public AbstractFileTreeNode SelectedNode
        {
            get { return projectBrowserPanel.SelectedNode; }
        }
        /// <summary>
        /// Aktuální projekt
        /// </summary>
        public ProjectNode CurrentProject
        {
            get
            {
                AbstractFileTreeNode node = SelectedNode;
                while (node != null && !(node is ProjectNode))
                    node = (AbstractFileTreeNode)node.Parent;
                return (ProjectNode)node;
            }
        }
        /// <summary>
        /// Hlavní větev stromu řešení.
        /// </summary>
        public AbstractFileTreeNode SolutionNode { get => projectBrowserPanel.RootNode; }
        /// <summary>
        /// Ovladač prohlížeče
        /// </summary>
        public ProjectBrowserControl ProjectBrowserControl
        {
            get => projectBrowserPanel.ProjectBrowserControl;
        }

        /// <exclude/>
        public override Control Control { get => projectBrowserPanel; }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public ProjectBrowserPad()
        {
            instance = this;
            ProjectService.SolutionLoaded += ProjectServiceSolutionLoaded;
            ProjectService.SolutionClosed += ProjectServiceSolutionClosed;
            ProjectService.SolutionPreferencesSaving += ProjectServiceSolutionPreferencesSaving;

            SimpleDesktop.Desktop.ActiveContentChanged += ActiveContentChanged;
            if (ProjectService.OpenSolution != null)
                this.LoadSolution(ProjectService.OpenSolution);

            ActiveContentChanged(null, null);
        }
        /// <exclude/>
        public void StartLabelEdit(ExtTreeNode node)
        {
            ProjectBrowserControl.TreeView.StartLabelEdit(node);
        }

        void ProjectServiceSolutionPreferencesSaving(object sender, SolutionEventArgs e)
        {
            projectBrowserPanel.StoreViewState(e.Solution.Preferences.Properties);
        }

        void ProjectServiceSolutionLoaded(object sender, SolutionEventArgs e)
        {
            this.LoadSolution(e.Solution);
        }

        void LoadSolution(Solution solution)
        {
            if (!ProjectBrowserControl.TreeView.IsHandleCreated)
            {
                LoggingService.DebugFormatted(string.Join(" ", GResources.GetResourceText(29450379), "'{0}'", GResources.GetResourceText(29450380) + "..."), solution.ToString()); //RC 29450380 : před vytvořením stromu projektu
                this.solutionToLoadWhenHandleIsCreated = solution;
                if (!this.treeViewHandleCreatedAttached)
                {
                    LoggingService.Debug("-> " + GResources.GetResourceText(29450381) + "..."); //RC 29450381 : přidání události 'strom vytvořen
                    this.treeViewHandleCreatedAttached = true;
                    ProjectBrowserControl.TreeView.HandleCreated += this.ProjectBrowserTreeViewHandleCreated;
                }
            }
            else
            {
                LoggingService.DebugFormatted(GResources.GetResourceText(29450383) + " '{0}' " + GResources.GetResourceText(29450382) + "...", solution.ToString()); //RC 29450383 : načtení sestavení
                this.solutionToLoadWhenHandleIsCreated = null;
                projectBrowserPanel.ViewSolution(solution);
                projectBrowserPanel.ReadViewState(solution.Preferences.Properties);
            }
        }

        bool treeViewHandleCreatedAttached;
        Solution solutionToLoadWhenHandleIsCreated;

        void ProjectBrowserTreeViewHandleCreated(object sender, EventArgs e)
        {
            TreeView treeView = (TreeView)sender;
            this.treeViewHandleCreatedAttached = false;
            treeView.HandleCreated -= this.ProjectBrowserTreeViewHandleCreated;
            if (this.solutionToLoadWhenHandleIsCreated != null)
            {
                treeView.BeginInvoke(new Action<Solution>(this.LoadSolution), this.solutionToLoadWhenHandleIsCreated);
                this.solutionToLoadWhenHandleIsCreated = null;
            }
            else
                LoggingService.Debug(GResources.GetResourceText(29450384) + "..."); //RC 29450384 : pohled vytvořen - žádné sestavení není načteno
        }

        void ProjectServiceSolutionClosed(object sender, EventArgs e)
        {
            this.solutionToLoadWhenHandleIsCreated = null;
            projectBrowserPanel.Clear();
        }

        string lastFileName;

        void ActiveContentChanged(object sender, EventArgs e)
        {
            ThreadService.SafeThreadAsyncCall(delegate
            {
                if (SimpleDesktop.Desktop.ActiveContent == this)
                    projectBrowserPanel.ProjectBrowserControl.PadActivated();
                else
                {
                    IViewContent content = SimpleDesktop.Desktop.ActiveViewContent;
                    if (content == null)
                        return;
                    string fileName = content.PrimaryFileName;
                    if (string.IsNullOrEmpty(fileName) ||
                        (!string.IsNullOrEmpty(lastFileName) && lastFileName.Equals(fileName, StringComparison.InvariantCultureIgnoreCase)))
                        return;

                    if (!FileUtility.IsValidPath(fileName))
                        return;
                    lastFileName = fileName;
                    projectBrowserPanel.SelectFile(fileName);
                }
            });
        }

        public void RefreshView() { ProjectBrowserControl.RefreshView(); }

        #region IClipboardHandler
        /// <exclude/>
        public bool EnableCut => ProjectBrowserControl.TreeView.SelectedNode is ExtTreeNode node && node.EnableCut;

        /// <exclude/>
        public bool EnableCopy => ProjectBrowserControl.TreeView.SelectedNode is ExtTreeNode node && node.EnableCopy;

        /// <exclude/>
        public bool EnablePaste => ProjectBrowserControl.TreeView.SelectedNode is ExtTreeNode node && node.EnablePaste;

        /// <exclude/>
        public bool EnableDelete => ProjectBrowserControl.TreeView.SelectedNode is ExtTreeNode node && node.EnableDelete;

        /// <exclude/>
        public bool EnableSelectAll => ProjectBrowserControl.TreeView.SelectedNode is ExtTreeNode node && node.EnableSelectAll;

        /// <exclude/>
        public void Cut()
        {
            ProjectBrowserControl.TreeView.ClearCutNodes();
            if (ProjectBrowserControl.TreeView.SelectedNode is ExtTreeNode node)
                node.Cut();
        }

        /// <exclude/>
        public void Copy()
        {
            ProjectBrowserControl.TreeView.ClearCutNodes();
            if (ProjectBrowserControl.TreeView.SelectedNode is ExtTreeNode node)
                node.Copy();
        }

        /// <exclude/>
        public void Paste()
        {
            if (ProjectBrowserControl.TreeView.SelectedNode is ExtTreeNode node)
                node.Paste();
            ProjectBrowserControl.TreeView.ClearCutNodes();
        }

        /// <exclude/>
        public void Delete()
        {
            if (ProjectBrowserControl.TreeView.SelectedNode is ExtTreeNode node)
                node.Delete();
            ProjectBrowserControl.TreeView.ClearCutNodes();
        }

        /// <exclude/>
        public void SelectAll()
        {
            if (ProjectBrowserControl.TreeView.SelectedNode is ExtTreeNode node)
                node.SelectAll();
        }
        #endregion
    }

}
