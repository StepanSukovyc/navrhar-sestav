//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ProjectNode.cs                         </Name>
//    <Description> Větev projektu                                              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using System.IO;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.WinForm;
using Gordic.GFE.WinClient.Project;
using Gordic.GFE.WinClient.Services;
using Gordic.General;
using Gordic.GFE.WinClient.AddIns;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.WinClient.ProjectBrowser
{
    /// <summary>
    /// Větev projektu
    /// </summary>
    class ProjectNode : DirectoryNode
    {
        #region AbstractExtTreeNode
        protected override void SetContext()
        {
            if (project is MissingProject)
            {
                OpenedImage = ClosedImage = "ProjectBrowser.MissingProject";
                ContextmenuAddinTreePath = "/ReportDesigner/Pads/ProjectBrowser/ContextMenu/MissingProjectNode";
            }
            else if (project is UnknownProject)
            {
                OpenedImage = ClosedImage = "ProjectBrowser.ProjectWarning";
                ContextmenuAddinTreePath = "/ReportDesigner/Pads/ProjectBrowser/ContextMenu/UnknownProjectNode";
            }
            else
            {
                OpenedImage = ClosedImage = IconService.GetImageForProjectType(project.ProjectType);
                ContextmenuAddinTreePath = "/ReportDesigner/Pads/ProjectBrowser/ContextMenu/ProjectNode";
            }

            ToolbarAddinTreePath = "/ReportDesigner/Pads/ProjectBrowser/ToolBar/ProjectNode";
        }
        #endregion

        /// <summary>
        /// indikuje existencí vlastnosti projektu
        /// </summary>
        public virtual bool EnableProperty { get { return false; } }

        /// <summary>
        /// cesta k vázanému souboru větve
        /// </summary>
        public override string LinkedFileName { get { return Project != null ? Project.FileName : base.LinkedFileName; } }
        
        IProject project;
        /// <summary>
        /// viditelnost větve
        /// </summary>
        public override bool Visible { get { return true; } }
        /// <summary>
        /// projekt
        /// </summary>
        public override IProject Project { get { return project; } }
        /// <summary>
        /// relativní cesta
        /// </summary>
        public override string RelativePath { get { return string.Empty; } }
        /// <summary>
        /// složka projektu
        /// </summary>
        public override string Directory
        {
            get { return project.Directory; }
            set { }
        }

        /// <summary>
        /// vytvoření větve projektu
        /// </summary>
        /// <param name="project">projekt</param>
        public ProjectNode(IProject project)
        {
            sortOrder = 1;
            this.project = project;

            Text = project.Name;
            if (project.ReadOnly)
                Text += " (" + GResources.GetResourceText(29450371) + ")"; //RC 29450371 : pouze pro čtení

            autoClearNodes = false;
            Tag = project;
        }

        #region Drag & Drop
        public override DataObject DragDropDataObject { get { return new DataObject(this); } }
        #endregion

        #region Cut & Paste
        /// <exclude/>
        public override bool EnableDelete { get { return true; } }
        /// <exclude/>
        public override bool EnableCopy { get { return false; } }
        /// <exclude/>
        public override bool EnableCut { get { return !IsEditing; } }

        /// <exclude/>
        public override void Delete()
        {
            if (MessageService.AskQuestion(string.Format(GResources.GetResourceText(29451484), Project.Name)))
            {
                ProjectService.RemoveSolutionFolder(Project.IdGuid);
                ProjectService.SaveSolution();
            }
        }
        /// <exclude/>
        public override void Copy()
        {
            throw new System.NotSupportedException();
        }
        /// <exclude/>
        public override void Cut()
        {
            DoPerformCut = true;
            ClipboardWrapper.SetDataObject(new DataObject(typeof(ISolutionFolder).ToString(), project.IdGuid));
        }
        #endregion

        /// <summary>
        /// volá se po editaci názvu větve
        /// </summary>
        /// <param name="newName">nový název větve</param>
        public override void AfterLabelEdit(string newName)
        {
            RenameProject(project, newName);
            Text = project.Name;
        }
        /// <summary>
        /// přejmenování projektu
        /// </summary>
        /// <param name="project">projekt</param>
        /// <param name="newName">nový název</param>
        public static void RenameProject(IProject project, string newName)
        {
            if (project.Name == newName)
                return;

            if (!Gordic.GFE.Parsers.Services.FileService.CheckFileName(newName))
                return;
            //string newFileName = Path.Combine(project.Directory, newName + Path.GetExtension(project.FileName));
            string newFileName = Path.Combine(Path.GetDirectoryName(project.FileName), newName + Path.GetExtension(project.FileName));

            if (!FileAgent.RenameFile(project.FileName, newFileName, false))
                return;
            
            project.FileName = newFileName;
            project.Name = newName;

            (project.Parent as Solution).RenameProject(project);
            ProjectService.SaveSolution();
        }

        public override object AcceptVisitor(FileTreeNodeVisitor visitor, object data)
        {
            return visitor.Visit(this, data);
        }
        /// <summary>
        /// přidání nových položek do projektu
        /// </summary>
        public virtual void AddNewItemsToProject()
        {
            new AddNewItemsToProject().Run();
            return;
        }
    }
}
