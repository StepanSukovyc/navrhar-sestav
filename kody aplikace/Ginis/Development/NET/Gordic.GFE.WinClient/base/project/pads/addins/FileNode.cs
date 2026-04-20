//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.FileNode.cs                            </Name>
//    <Description> Větev souboru                                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using System;
using System.IO;
using System.Linq;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.WinForm;
using Gordic.GFE.WinClient.Project;
using Gordic.General;
using Gordic.GFE.WinClient.ProjectBrowser;

namespace Gordic.GFE.WinClient.AddIns
{
    /// <summary>
    /// Popis FileEventHandler.
    /// </summary>
    class AfterFileNodeEditEventArgs : System.EventArgs
    {
        FileNode filenode;
        /// <summary>
        /// Větve změny
        /// </summary>
        public FileNode FileNode { get { return filenode; } }

        DirectoryNode dirnode;
        /// <summary>
        /// Větve změny
        /// </summary>
        public DirectoryNode DirNode { get { return dirnode; } }

        string oldName;
        /// <summary>
        /// Starý úplný název souboru větve
        /// </summary>
        public string OldName { get { return oldName; } }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="node">větev změny</param>
        /// <param name="oldName">starý název větve</param>
        public AfterFileNodeEditEventArgs(FileNode node, string oldName)
        {
            this.filenode = node;
            this.oldName = oldName;
        }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="node">větev změny</param>
        /// <param name="oldName">starý název větve</param>
        public AfterFileNodeEditEventArgs(DirectoryNode node, string oldName)
        {
            this.dirnode = node;
            this.oldName = oldName;
        }
    }

    /// <summary>
    /// Větev souboru
    /// </summary>
    class FileNode : AbstractFileTreeNode, IOwnerState
    {
        /// <summary>
        /// cesta k vázanému souboru větve
        /// </summary>
        public override string LinkedFileName { get { return FileName; } }

        string fileName;
        FileNodeStatus fileNodeStatus;
        ProjectItem projectItem;

        public override bool Visible { get { return ShowAll || fileNodeStatus != FileNodeStatus.None; } }

        public virtual string FileName
        {
            get { return fileName; }
            set
            {
                fileName = value;
                Text = Path.GetFileName(fileName);
            }
        }

        /// <summary>
        /// položka projektu
        /// </summary>
        public virtual ProjectItem ProjectItem
        {
            get { return projectItem; }
            set
            {
                if (projectItem != value)
                {
                    projectItem = value;
                    Tag = projectItem;
                    SetIcon();
                }
            }
        }

        public System.Enum InternalState { get { return fileNodeStatus; } }

        public FileNodeStatus FileNodeStatus
        {
            get { return fileNodeStatus; }
            set
            {
                if (fileNodeStatus != value)
                {
                    fileNodeStatus = value;
                    SetIcon();
                }
            }
        }
        void SetIcon()
        {
            switch (fileNodeStatus)
            {
                case FileNodeStatus.None:
                    SetIcon("ProjectBrowser.GhostFile");
                    break;
                case FileNodeStatus.InProject:
                    SetIcon(IconService.GetImageForFile(FileName));
                    break;
                case FileNodeStatus.Missing:
                    SetIcon("ProjectBrowser.MissingFile");
                    break;
                case FileNodeStatus.BehindFile:
                    SetIcon("ProjectBrowser.CodeBehind");
                    break;
            }
        }

        public virtual string RelativePath
        {
            get
            {
                if (Parent is DirectoryNode)
                    return Path.Combine(((DirectoryNode)Parent).RelativePath, Text);
                return Text;
            }
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public FileNode() { }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <param name="fileName">název souboru prezentovaného větvi</param>
        /// <param name="fileNodeStatus">stav větve</param>
        public virtual void Initialize(string fileName, FileNodeStatus fileNodeStatus)
        {
            sortOrder = 5;

            ContextmenuAddinTreePath = "/ReportDesigner/Pads/ProjectBrowser/ContextMenu/FileNode";
            ToolbarAddinTreePath = "/ReportDesigner/Pads/ProjectBrowser/ToolBar/File";
            this.fileNodeStatus = fileNodeStatus;
            FileName = fileName;

            autoClearNodes = false;
            SetIcon();
            canLabelEdit = true;
        }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <param name="fileName">název souboru prezentovaného větvi</param>
        public virtual void Initialize(string fileName)
        {
            Initialize(fileName, FileNodeStatus.None);
        }

        /// <summary>
        /// aktivace souboru
        /// </summary>
        public override void ActivateItem()
        {
            Gordic.GFE.WinClient.Services.FileAgent.OpenFile(FileName, true, projectItem == null);
        }

        public override void AfterLabelEdit(string newName)
        {
            if (newName == null)
                return;
            if (!Gordic.GFE.Parsers.Services.FileService.CheckDirectoryEntryName(newName))
                return;
            string oldFileName = FileName;
            if (oldFileName != null)
            {
                string newFileName = Path.Combine(Path.GetDirectoryName(oldFileName), newName);
                if (Gordic.GFE.WinClient.Services.FileAgent.RenameFile(oldFileName, newFileName, false))
                {
                    Text = newName;
                    this.fileName = newFileName;

                    string oldPrefix = Path.GetFileNameWithoutExtension(oldFileName) + ".";
                    string newPrefix = Path.GetFileNameWithoutExtension(newFileName) + ".";
                    foreach (TreeNode node in Nodes)
                    {
                        FileNode fileNode = node as FileNode;
                        if (fileNode != null)
                        {
                            FileProjectItem fileItem = fileNode.ProjectItem as FileProjectItem;
                            if (fileNode.Text.StartsWith(oldPrefix))
                                fileNode.AfterLabelEdit(newPrefix + fileNode.Text.Substring(oldPrefix.Length));
                        }
                        else
                            LoggingService.Warning("FileNode.AfterLabelEdit: " + GResources.GetResourceText(29450362) + " FileNode!"); //RC 29450362 : Podpoožka není
                    }

                    Project.AfterLabelEdit(new AfterFileNodeEditEventArgs(this, oldFileName));
                }
            }
        }

        public override object AcceptVisitor(FileTreeNodeVisitor visitor, object data)
        {
            return visitor.Visit(this, data);
        }

        #region Drag & Drop
        public override DataObject DragDropDataObject { get { return new DataObject(this); } }

        public override DragDropEffects GetDragDropEffect(IDataObject dataObject, DragDropEffects proposedEffect)
        {
            if (dataObject.GetDataPresent(typeof(FileNode)))
            {
                if (this.Project.ReadOnly)
                    return DragDropEffects.None;
                FileNode other = (FileNode)dataObject.GetData(typeof(FileNode));
                if (other == this || !(other.ProjectItem is FileProjectItem) || !(this.ProjectItem is FileProjectItem))
                    return DragDropEffects.None;
                if (FileUtility.IsEqualFileName(Path.GetDirectoryName(this.FileName), Path.GetDirectoryName(other.FileName)))
                    return DragDropEffects.Move;
                else
                    return proposedEffect;
            }
            return ((ExtTreeNode)Parent).GetDragDropEffect(dataObject, proposedEffect);
        }

        public override void DoDragDrop(IDataObject dataObject, DragDropEffects effect)
        {
            if (dataObject.GetDataPresent(typeof(FileNode)))
            {

                FileNode other = (FileNode)dataObject.GetData(typeof(FileNode));
                LoggingService.Debug(string.Join(" ", "ProjectBrowser:", GResources.GetResourceText(29450360), "'" + other.FileName + "'", GResources.GetResourceText(29450363), "'" + this.FileName + "'")); //RC 29450363 : na soubor

                // Kopírování / přesunutí souboru do správné složky
                // v případě, že cíl je v jiném adresáři než zdroje.
                if (!FileUtility.IsEqualFileName(Path.GetDirectoryName(this.FileName), Path.GetDirectoryName(other.FileName)))
                {
                    ExtTreeNode p = this;
                    DirectoryNode parentDirectory;
                    do
                    {
                        p = (ExtTreeNode)p.Parent;
                        parentDirectory = p as DirectoryNode;
                    } while (parentDirectory == null && p != null);
                    if (parentDirectory == null)
                        throw new InvalidOperationException(string.Join(" ", GResources.GetResourceText(29450220), "'" + this.FileName + "'", GResources.GetResourceText(29450364))); //RC 29450220 : Soubor
                    string otherFileName = Path.GetFileName(other.FileName);
                    parentDirectory.CopyFileHere(other, effect == DragDropEffects.Move);
                    other = parentDirectory.AllNodes.OfType<FileNode>().SingleOrDefault(n => FileUtility.IsEqualFileName(Path.GetFileName(n.FileName), otherFileName));
                }

                if (other != null)
                {
                    other.Remove();
                    other.FileNodeStatus = FileNodeStatus.BehindFile;
                    other.InsertSorted(this);
                    LoggingService.Debug("-> " + GResources.GetResourceText(29450365)); //RC 29450365 : Vytvoření nové závislostí, uložení řešení
                    ProjectService.SaveSolution();
                }
                else
                    LoggingService.Debug("-> " + GResources.GetResourceText(29450366)); //RC 29450366 : Nelze přesunout nebo zkopírovat soubor do nové složky.

                return;

            }

            ((ExtTreeNode)Parent).DoDragDrop(dataObject, effect);
        }
        #endregion

        #region Cut & Paste
        public override bool EnableDelete { get { return true; } }

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
                    Gordic.GFE.WinClient.Services.FileAgent.RemoveFile(FileName, false);
                    OnDeleted();
                }
            }
            else if (!File.Exists(FileName))
            {
                ExcludeFileFromProject.ExcludeFileNode(this);
                this.Remove();
                OnDeleted();
            }
            else if (MessageService.AskQuestion(GetQuestionText(string.Join(" ", GResources.GetResourceText(29450359), "'${FileName}'", GResources.GetResourceText(29450368))))) //RC 29450359 : Odstranit
            {
                Gordic.GFE.WinClient.Services.FileAgent.RemoveFile(FileName, false);
                OnDeleted();
            }
        }

        /// <summary>
        /// reakce na odstranění větve
        /// </summary>
        protected virtual void OnDeleted() { Project.Save(); }

        /// <summary>
        /// indikátor povolení kopírování větve
        /// </summary>
        public override bool EnableCopy { get { return !IsEditing; } }
        /// <summary>
        /// operace kopírování
        /// </summary>
        public override void Copy()
        {
            ClipboardWrapper.SetDataObject(FileOperationClipboardObject.CreateDataObject(this, false));
        }
        /// <summary>
        /// indikátor povolení vyjmutí větve
        /// </summary>
        public override bool EnableCut { get { return !IsEditing; } }
        /// <summary>
        /// operace vyjmutí větve
        /// </summary>
        public override void Cut()
        {
            DoPerformCut = true;
            ClipboardWrapper.SetDataObject(FileOperationClipboardObject.CreateDataObject(this, true));
        }

        /// <summary>
        /// indikátor povolení vložení větve
        /// </summary>
        public override bool EnablePaste
        {
            get
            {
                if (IsEditing)
                    return false;
                return ((ExtTreeNode)Parent).EnablePaste;
            }
        }
        /// <summary>
        /// operace vložení větve
        /// </summary>
        public override void Paste()
        {
            ((ExtTreeNode)Parent).Paste();
        }
        #endregion

        /// <summary>
        /// odstranění vnitřních větví
        /// </summary>
        internal void DeleteChildNodes()
        {
            foreach (FileNode fileNode in Nodes.OfType<FileNode>().ToList())
            {
                fileNode.DeleteChildNodes();
                Gordic.GFE.WinClient.Services.FileAgent.RemoveFile(fileNode.FileName, false);
            }
        }
    }

}
