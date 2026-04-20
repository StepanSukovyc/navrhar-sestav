//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.AlfFileNode.cs                         </Name>
//    <Description> větev prezentující ALF soubor                               </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-06-10                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.AddIns.Project;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.WinForm;
using Gordic.GFE.WinClient.AddIns;
using Gordic.GFE.WinClient.Project;
using Gordic.GFE.WinClient.Services;
using System;
using System.IO;
using System.Linq;
using System.Windows.Forms;

namespace Gordic.GFE.WinClient.ProjectBrowser
{
    /// <summary>
    /// větev prezentující ALF soubor
    /// </summary>
    class AlfFileNode : DirectoryNode, IFileProjectItemHandler
    {
        #region IFileProjectItemHandler
        /// <exclude/>
        public bool CanBeDefault { get => item != null && (item.ItemType == ItemType.Data || item.ItemType == ItemType.Content); }
        bool isDefault = false;
        /// <exclude/>
        public bool IsDefault { get => isDefault; }
        /// <exclude/>
        public virtual void SetDefault(bool value, bool withoutSave = false)
        {
            isDefault = value && Project.SetDefault(item, withoutSave);
            drawDefault = !isDefault;
        }

        dynamic item;
        /// <summary>
        /// položka projektu
        /// </summary>
        public dynamic Item { get => item; set { item = value; ProjectItem = value; } }
        #endregion

        #region IDisposable
        /// <summary>
        /// uvolnění objektu
        /// </summary>
        /// <param name="disposing">indikátor uvolnění</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
                FileUtility.ArchiveCopied -= Fu_ArchiveCopied;

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

            ContextmenuAddinTreePath = "/ReportDesigner/Pads/ProjectBrowser/ContextMenu/FileNode";
            ToolbarAddinTreePath = "/ReportDesigner/Pads/ProjectBrowser/ToolBar/File";

            try
            {
                string archName = Path.Combine(Path.GetDirectoryName(Directory), Path.GetFileNameWithoutExtension(Directory) + ".zip");
                if (File.Exists(archName))
                    (new ZipFileNode(archName, FileNodeStatus.InProject)).AddTo(this);

            }
            catch (Exception ex) { LoggingService.Error(ex); }
        }
        #endregion

        /// <exclude/>
        public override string LinkedFileName { get => Directory; }

        /// <summary>
        /// nastavení cesty ke složce
        /// </summary>
        public override string Directory { set { base.Directory = value; Text = Path.GetFileNameWithoutExtension(value); } }

        /// <exclude/>
        public override bool EnableCut { get => false; }

        /// <summary>
        /// indikátor povolení vložení větve
        /// </summary>
        public override bool EnablePaste
        {
            get
            {
                if (IsEditing) return false;
                IDataObject dataObject = ClipboardWrapper.GetDataObject();
                if (dataObject.GetDataPresent(typeof(AlfFileNode)))
                    return true;

                return ((ExtTreeNode)Parent).EnablePaste;
            }
        }

        /// <summary>
        /// aktivace souboru
        /// </summary>
        public override void ActivateItem() { FileAgent.OpenFile(Directory, true, false); }

        /// <exclude/>
        public AlfFileNode(ProjectItem item, FileNodeStatus fileNodeStatus)
            : base(item.FileName, false)
        {
            // TODO: Complete member initialization
            Item = item;
            // kvůli nastavení ikonek
            FileNodeStatus = fileNodeStatus;

            FileUtility.ArchiveCopied += Fu_ArchiveCopied;
        }

        /// <exclude/>
        protected override void SetIcon()
        {
            if (item != null && FileNodeStatus == AddIns.FileNodeStatus.InProject)
            {
                OpenedImage = IconService.GetImageForFile(Directory);
                ClosedImage = IconService.GetImageForFile(Directory);
            }
            else
                base.SetIcon();
        }

        /// <exclude/>
        public override object AcceptVisitor(FileTreeNodeVisitor visitor, object data)
        {
            if (visitor is FileRenameTreeNodeVisitor vis)
            {
                if (FileUtility.IsBaseDirectory(vis.OldName, Directory))
                {
                    Directory = FileUtility.RenameBaseDirectory(Directory, vis.OldName, vis.NewName) + Path.GetExtension(Directory);
                    AcceptChildren(visitor, data);
                }
                else if (FileUtility.IsBaseDirectory(Directory, vis.OldName))
                    AcceptChildren(visitor, data);

                return data;
            }

            return visitor.Visit(this, data);
        }

        /// <summary>
        /// změna názvu souboru ALF
        /// </summary>
        /// <param name="newName"></param>
        public override void AfterLabelEdit(string newName)
        {
            if (string.IsNullOrEmpty(newName))
                return;

            if (!FileService.CheckDirectoryEntryName(newName))
                return;
            if (String.Compare(Text, newName, true) == 0)
                return;

            string oldText = Text;
            string oldPath = Directory;
            Text = newName;
            if (Directory != null)
            {
                bool extension = Path.GetExtension(newName) != Path.GetExtension(Directory);
                string newPath = Path.Combine(Path.GetDirectoryName(Directory), newName) + (extension ? Path.GetExtension(Directory) : "");
                if (System.IO.Directory.Exists(newPath))
                {
                    if (System.IO.Directory.GetFileSystemEntries(newPath).Length == 0)
                        System.IO.Directory.Delete(newPath);
                    else
                    {
                        MessageService.ShowError(GResources.GetResourceText(29450357)); //RC 29450357 : Složka již existuje a obsahu soubory!
                        Text = oldText;
                        return;
                    }
                }
                if (!FileAgent.RenameFile(Directory, newPath, true))
                {
                    Text = oldText;
                    return;
                }

                this.Directory = newPath;
            }

            if (Nodes.Count != 0)
                foreach (var item in Nodes)
                    if (item is ZipFileNode zip)
                        zip.AfterLabelEdit(newName);

            Project.AfterLabelEdit(new AfterFileNodeEditEventArgs(this, oldPath));
            ProjectService.SaveSolution();
        }

        /// <summary>
        /// odstranění větve
        /// </summary>
        public override void Delete()
        {
            if (Nodes.Count > 0)
            {
                if (MessageService.AskQuestion(GetQuestionText(string.Join(" ", GResources.GetResourceText(29450359), "'${FileName}'", GResources.GetResourceText(29450367))))) //RC 29450359 : Odstranit
                {
                    DeleteChildNodes();
                    OnDeleted();
                }
            }
            else
                OnDeleted();
        }

        /// <exclude/>
        public override void Paste() { ((DirectoryNode)Parent).Paste(); }

        /// <summary>
        /// reakce na odstranění větve
        /// </summary>
        void OnDeleted()
        {
            ExcludeFileFromProject.ExcludeDirectoryNode(this);
            this.Remove();
        }

        /// <summary>
        /// odstranění vnitřních větví
        /// </summary>
        void DeleteChildNodes()
        {
            foreach (FileNode fileNode in Nodes.OfType<FileNode>().ToList())
            {
                fileNode.DeleteChildNodes();
                FileAgent.RemoveFile(fileNode.LinkedFileName, false);
            }
        }

        void Fu_ArchiveCopied(object sender, FileNameEventArgs e)
        {
            if (e.FileName.Equals(Directory, StringComparison.OrdinalIgnoreCase))
                ThreadService.SafeThreadAsyncCall(RecreateSubNodes);
        }
    }

    /// <summary>
    /// větev ZIP souboru
    /// </summary>
    class ZipFileNode : DirectoryNode
    {
        #region AbstractExtTreeNode
        /// <summary>
        /// Inicializace větve
        /// </summary>
        protected override void Initialize()
        {
            base.Initialize();
            ContextmenuAddinTreePath = "";
            ToolbarAddinTreePath = "";
        }
        #endregion

        /// <exclude/>
        public override string LinkedFileName { get => Directory; }
        /// <summary>
        /// nastavení cesty ke složce
        /// </summary>
        public override string Directory { set { base.Directory = value; Text = Path.GetFileNameWithoutExtension(value); } }

        /// <exclude/>
        public override bool CanLabelEdit { get => false; }

        /// <summary>
        /// změna názvu souboru ALF
        /// </summary>
        /// <param name="newName"></param>
        public override void AfterLabelEdit(string newName)
        {
            if (string.IsNullOrEmpty(newName))
                return;

            if (!FileService.CheckDirectoryEntryName(newName))
                return;
            if (String.Compare(Text, newName, true) == 0)
                return;

            string oldText = Text;
            Text = newName;
            if (Directory != null)
            {
                string newPath = Path.Combine(Path.GetDirectoryName(Directory), newName) + Path.GetExtension(Directory);
                if (System.IO.Directory.Exists(newPath))
                {
                    if (System.IO.Directory.GetFileSystemEntries(newPath).Length == 0)
                        System.IO.Directory.Delete(newPath);
                    else
                    {
                        MessageService.ShowError(GResources.GetResourceText(29450357)); //RC 29450357 : Složka již existuje a obsahu soubory!
                        Text = oldText;
                        return;
                    }
                }
                if (!Gordic.GFE.WinClient.Services.FileAgent.RenameFile(Directory, newPath, true))
                {
                    Text = oldText;
                    return;
                }

                this.Directory = newPath;
            }
        }

        /// <exclude/>
        public ZipFileNode(string archName, FileNodeStatus nodeStatus)
            : base(archName, nodeStatus, false)
        {
        }

        /// <exclude/>
        protected override void SetIcon()
        {
            if (FileNodeStatus == FileNodeStatus.InProject)
            {
                OpenedImage = IconService.GetImageForFile(Directory);
                ClosedImage = IconService.GetImageForFile(Directory);
            }
            else
                base.SetIcon();
        }
    }
}
