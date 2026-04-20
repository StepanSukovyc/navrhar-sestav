//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.DirectoryNode.cs                       </Name>
//    <Description> Větev složky                                                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Windows.Forms;
using Gordic.GFE.Parsers.AddIns.Project;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.WinForm;
using Gordic.GFE.WinClient.Project;
using Gordic.General;
using Gordic.GFE.WinClient.AddIns;

namespace Gordic.GFE.WinClient.ProjectBrowser
{
    /// <summary>
    /// Speciální složky
    /// </summary>
    enum SpecialFolder
    {
        None,
        AppDesigner,
        WebReference,
        WebReferencesFolder
    }

    /// <summary>
    /// Větev složky
    /// </summary>
    class DirectoryNode : AbstractFileTreeNode, IOwnerState
    {
        #region AbstractExtTreeNode
        protected virtual void SetContext()
        {
            ContextmenuAddinTreePath = "/ReportDesigner/Pads/ProjectBrowser/ContextMenu/FolderNode";
        }

        /// <summary>
        /// Inicializace větve
        /// </summary>
        protected override void Initialize()
        {
            base.Initialize();
            SetContext();
            SetIcon();

            if (removeMe != null)
            {
                Nodes.Remove(removeMe);
                removeMe = null;
            }

            LoggingService.Info(string.Join(" ", GResources.GetResourceText(29450356), "DirectoryNode", Directory)); //RC 29450356 : Inicializace

            Dictionary<string, FileNode> fileNodeDictionary
                = new Dictionary<string, FileNode>(StringComparer.OrdinalIgnoreCase);
            Dictionary<string, DirectoryNode> directoryNodeList = new Dictionary<string, DirectoryNode>(StringComparer.OrdinalIgnoreCase);

            if (System.IO.Directory.Exists(Directory))
            {
                foreach (string subDirectory in System.IO.Directory.GetDirectories(Directory))
                    if (Path.GetFileName(subDirectory) != ".gfrm")
                    {
                        DirectoryNode newDirectoryNode = DirectoryNodeFactory.CreateDirectoryNode(this, Project, subDirectory);
                        newDirectoryNode.InsertSorted(this);
                        directoryNodeList[Path.GetFileName(subDirectory)] = newDirectoryNode;
                    }

                foreach (string file in System.IO.Directory.GetFiles(Directory))
                {
                    FileNode fileNode = new FileNode();
                    fileNode.Initialize(file);
                    fileNodeDictionary[Path.GetFileName(file)] = fileNode;
                    fileNode.InsertSorted(this);
                }
            }
            if (Nodes.Count == 0)
                SetClosedImage();

            string relativeDirectoryPath = this.RelativePath;
            if (relativeDirectoryPath.Length > 0)
                relativeDirectoryPath = relativeDirectoryPath.Replace('\\', '/') + '/';

            foreach (ProjectItem item in Project.Items)
            {
                if (!(item is FileProjectItem fileItem))
                    continue;
                string virtualName = fileItem.VirtualName.Replace('\\', '/');
                if (virtualName.EndsWith("/"))
                    virtualName = virtualName.Substring(0, virtualName.Length - 1);
                string fileName = Path.GetFileName(virtualName);
                if (!string.Equals(virtualName, relativeDirectoryPath + fileName, StringComparison.OrdinalIgnoreCase))
                {
                    AddParentFolder(virtualName, relativeDirectoryPath, directoryNodeList);
                    continue;
                }

                if (item.ItemType == ItemType.Folder)
                {
                    if (directoryNodeList.TryGetValue(fileName, out DirectoryNode node))
                    {
                        if (node.FileNodeStatus == FileNodeStatus.None)
                            node.FileNodeStatus = FileNodeStatus.InProject;
                        node.ProjectItem = item;
                    }
                    else
                    {
                        node = DirectoryNodeFactory.CreateDirectoryNode(item, FileNodeStatus.Missing);
                        node.InsertSorted(this);
                        directoryNodeList[fileName] = node;
                    }
                }
                else
                {
                    if (fileNodeDictionary.TryGetValue(fileName, out FileNode node))
                    {
                        if (node.FileNodeStatus == FileNodeStatus.None)
                            node.FileNodeStatus = FileNodeStatus.InProject;
                    }
                    else
                    {
                        node = new FileNode();
                        node.Initialize(fileItem.FileName, FileNodeStatus.Missing);
                        node.InsertSorted(this);
                        fileNodeDictionary[fileName] = node;
                    }

                    node.ProjectItem = fileItem;
                }
            }

            Text = Path.GetFileName(directory);
        }
        #endregion

        string closedImage = null;
        string openedImage = null;
        FileNodeStatus fileNodeStatus = FileNodeStatus.None;
        SpecialFolder specialFolder = SpecialFolder.None;
        ProjectItem projectItem = null;

        public override bool Visible { get { return ShowAll || fileNodeStatus != FileNodeStatus.None; } }

        public SpecialFolder SpecialFolder
        {
            get { return specialFolder; }
            set
            {
                if (specialFolder != value)
                {
                    specialFolder = value;
                    SetIcon();
                }
            }
        }

        public string ClosedImage
        {
            get { return closedImage; }
            set
            {
                closedImage = value;
                if (!IsExpanded)
                    SetIcon(closedImage);
            }
        }

        public ProjectItem ProjectItem
        {
            get { return projectItem; }
            set { projectItem = value; }
        }

        public string OpenedImage
        {
            get { return openedImage; }
            set
            {
                openedImage = value;
                if (IsExpanded)
                    SetIcon(openedImage);
            }
        }

        public System.Enum InternalState { get { return fileNodeStatus; } }
        /// <summary>
        /// status složky - buď se nachází v projektu nebo chybí
        /// </summary>
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
        public override void Refresh()
        {
            base.Refresh();
            if (Nodes.Count == 0)
                SetIcon(ClosedImage);
            else if (IsExpanded)
                SetIcon(openedImage);
        }

        protected virtual void SetIcon()
        {
            switch (fileNodeStatus)
            {
                case FileNodeStatus.None:
                    OpenedImage = "ProjectBrowser.GhostFolder.Open";
                    ClosedImage = "ProjectBrowser.GhostFolder.Closed";
                    break;
                case FileNodeStatus.Missing:
                    OpenedImage = "ProjectBrowser.Folder.Missing";
                    ClosedImage = "ProjectBrowser.Folder.Missing";
                    break;
                default:
                    switch (SpecialFolder)
                    {
                        case SpecialFolder.None:
                            OpenedImage = "ProjectBrowser.Folder.Open";
                            ClosedImage = "ProjectBrowser.Folder.Closed";
                            break;
                        case SpecialFolder.AppDesigner:
                            OpenedImage = "ProjectBrowser.PropertyFolder.Open";
                            ClosedImage = "ProjectBrowser.PropertyFolder.Closed";
                            break;
                        case SpecialFolder.WebReferencesFolder:
                            OpenedImage = "ProjectBrowser.WebReferenceFolder.Open";
                            ClosedImage = "ProjectBrowser.WebReferenceFolder.Closed";
                            break;
                        case SpecialFolder.WebReference:
                            OpenedImage = "ProjectBrowser.WebReference";
                            ClosedImage = "ProjectBrowser.WebReference";
                            break;
                    }
                    break;
            }
        }

        string directory;
        /// <summary>
        /// cesta ke složce
        /// </summary>
        public virtual string Directory
        {
            get { return directory; }
            set
            {
                directory = value;
                Text = Path.GetFileName(directory);
            }
        }
        /// <summary>
        /// relativní cesta
        /// </summary>
        public virtual string RelativePath
        {
            get
            {
                if (Parent is DirectoryNode)
                    return Path.Combine(((DirectoryNode)Parent).RelativePath, Text);
                return Text;
            }
        }

        protected DirectoryNode()
        {
            sortOrder = 1;
            canLabelEdit = true;
        }

        public DirectoryNode(string directory)
            : this(directory, FileNodeStatus.None)
        {
            sortOrder = 1;
            canLabelEdit = true;
        }

        CustomNode removeMe;
        /// <summary>
        /// konstruktor třídy
        /// </summary>
        /// <param name="directory">cesta ke složce</param>
        /// <param name="fileNodeStatus">status větve</param>
        public DirectoryNode(string directory, FileNodeStatus fileNodeStatus)
            : this()
        {
            sortOrder = 1;
            this.directory = directory;
            Text = Path.GetFileName(directory);
            this.fileNodeStatus = fileNodeStatus;

            removeMe = new CustomNode();
            removeMe.AddTo(this);
            canLabelEdit = true;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="directory"></param>
        /// <param name="canCreateRemoveMe">indikátor vytvoření prázdné větve kvůli zobrazení křížku rozklikávání</param>
        public DirectoryNode(string directory, bool canCreateRemoveMe)
            : this(directory, FileNodeStatus.None, canCreateRemoveMe)
        {
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="directory"></param>
        /// <param name="canCreateRemoveMe">indikátor vytvoření prázdné větve kvůli zobrazení křížku rozklikávání</param>
        /// <param name="fileNodeStatus"></param>
        public DirectoryNode(string directory, FileNodeStatus fileNodeStatus, bool canCreateRemoveMe)
            : this(directory, fileNodeStatus)
        {
            if (!canCreateRemoveMe && removeMe != null)
            {
                Nodes.Remove(removeMe);
                removeMe = null;
            }
        }

        public void RecreateSubNodes()
        {
            invisibleNodes.Clear();
            if (autoClearNodes)
                Nodes.Clear();
            else
            {
                List<TreeNode> removedNodes = new List<TreeNode>();
                foreach (TreeNode node in Nodes)
                    if (node is FileNode || node is DirectoryNode)
                        removedNodes.Add(node);
                foreach (TreeNode node in removedNodes)
                    Nodes.Remove(node);
            }
            Initialize();
            UpdateVisibility();
        }

        /// <summary>
        /// Vytvoření nové položky ve složce.
        /// </summary>
        /// <param name="fileName">Název souboru, který se přidá do projektu</param>
        public FileProjectItem AddNewFile(string fileName)
        {
            this.Expanding();

            FileNode fileNode = CreateFileNode(fileName);
            fileNode.InsertSorted(this);
            fileNode.EnsureVisible();
            return IncludeFileInProject.IncludeFileNode(fileNode);
        }

        /// <summary>
        /// vytvoření souboruvé větve
        /// </summary>
        /// <param name="fileName">název souboru</param>
        /// <returns></returns>
        internal virtual FileNode CreateFileNode(string fileName)
        {
            var fn = new FileNode();
            fn.Initialize(fileName, FileNodeStatus.InProject);

            return fn;
        }

        void AddParentFolder(string virtualName, string relativeDirectoryPath, Dictionary<string, DirectoryNode> directoryNodeList)
        {
            if (relativeDirectoryPath.Length == 0
                || string.Compare(virtualName, 0, relativeDirectoryPath, 0, relativeDirectoryPath.Length, StringComparison.OrdinalIgnoreCase) == 0)
            {
                int pos = virtualName.IndexOf('/', relativeDirectoryPath.Length + 1);
                if (pos < 0)
                    return;
                string subFolderName = virtualName.Substring(relativeDirectoryPath.Length, pos - relativeDirectoryPath.Length);
                if (directoryNodeList.TryGetValue(subFolderName, out DirectoryNode node))
                {
                    if (node.FileNodeStatus == FileNodeStatus.None)
                        node.FileNodeStatus = FileNodeStatus.InProject;
                }
                else
                {
                    node = new DirectoryNode(Path.Combine(Directory, subFolderName), FileNodeStatus.Missing);
                    node.InsertSorted(this);
                    directoryNodeList[subFolderName] = node;
                }
            }
        }
        void SetOpenedImage()
        {
            if (openedImage != null)
                SetIcon(openedImage);
        }
        /// <exclude/>
        void SetClosedImage()
        {
            if (closedImage != null)
                SetIcon(closedImage);
        }
        
        public override void Expanding()
        {
            SetOpenedImage();
            base.Expanding();
        }
        public override void Collapsing()
        {
            SetClosedImage();
            base.Collapsing();
        }
        public override void AfterLabelEdit(string newName)
        {
            if (string.IsNullOrEmpty(newName))
                return;
            if (!Gordic.GFE.Parsers.Services.FileService.CheckDirectoryEntryName(newName))
                return;
            if (String.Compare(Text, newName, true) == 0)
                return;
            string oldText = Text;
            Text = newName;
            if (Directory != null)
            {
                string newPath = Path.Combine(Path.GetDirectoryName(Directory), newName);
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

                this.directory = newPath;
                Project.Save();
            }
        }
        
        public override object AcceptVisitor(FileTreeNodeVisitor visitor, object data)
        {
            return visitor.Visit(this, data);
        }

        #region Cut & Paste
        public override bool EnableDelete { get { return true; } }

        public override void Delete()
        {
            if (FileNodeStatus == FileNodeStatus.Missing)
            {
                Services.FileAgent.RemoveFile(Directory, true);
                Project.Save();
            }
            else
                if (MessageService.AskQuestion(GetQuestionText(string.Join(" ", GResources.GetResourceText(29450359), "'${FileName}'", GResources.GetResourceText(29450358))))) //RC 29450359 : Odstranit
                {
                    Services.FileAgent.RemoveFile(Directory, true);
                    Project.Save();
                }
        }

        public override bool EnablePaste
        {
            get
            {
                IDataObject dataObject = ClipboardWrapper.GetDataObject();
                if (dataObject == null)
                    return false;
                if (dataObject.GetDataPresent(DataFormats.FileDrop))
                    return true;
                if (dataObject.GetDataPresent(typeof(FileNode)))
                {
                    return dataObject.GetData(typeof(FileNode).ToString()) is FileOperationClipboardObject clipboardObject && File.Exists(clipboardObject.FileName);
                }
                if (dataObject.GetDataPresent(typeof(DirectoryNode)))
                {
                    if (!(dataObject.GetData(typeof(DirectoryNode).ToString()) is FileOperationClipboardObject clipboardObject))
                        return false;
                    if (FileUtility.IsBaseDirectory(clipboardObject.FileName, Directory))
                        return false;
                    return System.IO.Directory.Exists(clipboardObject.FileName);
                }
                return false;
            }
        }

        public override void Paste()
        {
            IDataObject dataObject = ClipboardWrapper.GetDataObject();
            if (dataObject == null)
                return;

            if (dataObject.GetDataPresent(DataFormats.FileDrop))
            {
                string[] files = (string[])dataObject.GetData(DataFormats.FileDrop);
                foreach (string fileName in files)
                    if (System.IO.Directory.Exists(fileName))
                    {
                        if (!FileUtility.IsBaseDirectory(fileName, Directory))
                            CopyDirectoryHere(fileName, false);
                    }
                    else
                        CopyFileHere(fileName, false);
            }
            else if (dataObject.GetDataPresent(typeof(FileNode)))
            {
                FileOperationClipboardObject clipboardObject = (FileOperationClipboardObject)dataObject.GetData(typeof(FileNode).ToString());

                if (File.Exists(clipboardObject.FileName))
                {
                    CopyFileHere(clipboardObject.FileName, clipboardObject.PerformMove);
                    if (clipboardObject.PerformMove)
                        Clipboard.Clear();
                }
            }
            else if (dataObject.GetDataPresent(typeof(DirectoryNode)))
            {
                FileOperationClipboardObject clipboardObject = (FileOperationClipboardObject)dataObject.GetData(typeof(DirectoryNode).ToString());

                if (System.IO.Directory.Exists(clipboardObject.FileName))
                {
                    CopyDirectoryHere(clipboardObject.FileName, clipboardObject.PerformMove);
                    if (clipboardObject.PerformMove)
                        Clipboard.Clear();
                }
            }
            ProjectService.SaveSolution();
        }

        public void CopyDirectoryHere(string directoryName, bool performMove)
        {
            string copiedName = Path.Combine(Directory, Path.GetFileName(directoryName));
            if (FileUtility.IsEqualFileName(directoryName, copiedName))
                return;
            if (performMove)
            {
                Gordic.GFE.WinClient.Services.FileAgent.RenameFile(directoryName, copiedName, true);
                RecreateSubNodes();
                Expand();
            }
            else
                AddExistingItemsToProject.CopyDirectory(directoryName, this, true);
        }

        public void CopyDirectoryHere(DirectoryNode node, bool performMove)
        {
            CopyDirectoryHere(node.Directory, performMove);
        }

        /// <summary>
        /// kopírování souboru do dané větve
        /// </summary>
        /// <param name="fileName">název souboru</param>
        /// <param name="performMove">přemístění</param>
        /// <param name="recurse">indikuje rekurzivní volání</param>
        internal virtual void CopyFileHere(string fileName, bool performMove, bool recurse = false)
        {
            string shortFileName = Path.GetFileName(fileName);
            string copiedFileName = Path.Combine(Directory, shortFileName);
            if (FileUtility.IsEqualFileName(fileName, copiedFileName))
                if (!recurse)
                {
                    copiedFileName = Path.Combine(Directory, Path.GetFileNameWithoutExtension(fileName) + "_copy" + Path.GetExtension(fileName));
                    copiedFileName = FileUtility.GetUniqueName(copiedFileName);
                }
                else return;

            bool wasFileReplacement = false;
            if (File.Exists(copiedFileName))
            {
                if (!Gordic.GFE.Parsers.Services.FileService.FireFileReplacing(copiedFileName, false))
                    return;
                if (AddExistingItemsToProject.ShowReplaceExistingFileDialog(null, copiedFileName, false) == AddExistingItemsToProject.ReplaceExistingFile.Yes)
                {
                    wasFileReplacement = true;
                    IViewContent viewContent = Gordic.GFE.WinClient.Services.FileAgent.GetViewForFile(copiedFileName);
                    if (viewContent != null)
                        viewContent.DesktopWindow.CloseWindow(true);
                }
                else
                    return;
            }

            FileProjectItem newItem = AddExistingItemsToProject.CopyFile(fileName, this, true, copiedFileName);
            IProject sourceProject = Solution.FindProjectContainingFile(fileName);
            if (sourceProject != null)
            {
                string sourceDirectory = Path.GetDirectoryName(fileName);
                foreach (ProjectItem item in sourceProject.Items)
                {
                    if (!(item is FileProjectItem fileItem))
                        continue;
                    string itemPath = Path.Combine(sourceProject.Directory, fileItem.VirtualName);
                    if (!FileUtility.IsEqualFileName(sourceDirectory, Path.GetDirectoryName(itemPath)))
                        continue;
                    CopyFileHere(itemPath, performMove, true);
                }
            }
            if (performMove)
            {
                foreach (OpenedFile file in Gordic.GFE.WinClient.Services.FileAgent.OpenedFiles)
                    if (file.FileName != null &&
                        FileUtility.IsEqualFileName(file.FileName, fileName))
                        file.FileName = copiedFileName;
                Gordic.GFE.WinClient.Services.FileAgent.RemoveFile(fileName, false);
            }
            if (wasFileReplacement)
                Gordic.GFE.Parsers.Services.FileService.FireFileReplaced(copiedFileName, false);
        }

        /// <exclude/>
        public void CopyFileHere(FileNode node, bool performMove)
        {
            if (node.FileNodeStatus == FileNodeStatus.None)
            {
                AddExistingItemsToProject.CopyFile(node.FileName, this, false);
                if (performMove)
                    Gordic.GFE.WinClient.Services.FileAgent.RemoveFile(node.FileName, false);
            }
            else
                CopyFileHere(node.FileName, performMove);
        }

        public override bool EnableCopy { get { return !IsEditing; } }
        public override void Copy()
        {
            ClipboardWrapper.SetDataObject(FileOperationClipboardObject.CreateDataObject(this, false));
        }

        public override bool EnableCut { get { return !IsEditing; } }

        public override void Cut()
        {
            DoPerformCut = true;
            ClipboardWrapper.SetDataObject(FileOperationClipboardObject.CreateDataObject(this, true));
        }
        #endregion

        #region Drag & Drop
        public override DataObject DragDropDataObject { get { return new DataObject(this); } }

        public override DragDropEffects GetDragDropEffect(IDataObject dataObject, DragDropEffects proposedEffect)
        {
            if (dataObject.GetDataPresent(typeof(FileNode)))
            {
                FileNode fileNode = (FileNode)dataObject.GetData(typeof(FileNode));

                if (!FileUtility.IsEqualFileName(Directory, fileNode.FileName) && !FileUtility.IsEqualFileName(Directory, Path.GetDirectoryName(fileNode.FileName)))
                {
                    if (Project != fileNode.Project)
                        return DragDropEffects.Copy;
                    return proposedEffect;
                }
                else
                    if (fileNode.ProjectItem is FileProjectItem fpi)
                        return DragDropEffects.Move;
            }

            if (dataObject.GetDataPresent(typeof(DirectoryNode)))
            {
                DirectoryNode directoryNode = (DirectoryNode)dataObject.GetData(typeof(DirectoryNode));
                if (FileUtility.IsBaseDirectory(directoryNode.Directory, Directory))
                    return DragDropEffects.None;
                if (!FileUtility.IsEqualFileName(Directory, directoryNode.Directory) && !FileUtility.IsEqualFileName(Directory, Path.GetDirectoryName(directoryNode.Directory)))
                {
                    if (Project != directoryNode.Project)
                        return DragDropEffects.Copy;
                    return proposedEffect;
                }
            }
            if (dataObject.GetDataPresent(DataFormats.FileDrop))
                return DragDropEffects.Copy;
            return DragDropEffects.None;
        }

        public override void DoDragDrop(IDataObject dataObject, DragDropEffects effect)
        {
            PerformInitialization();
            Expand();
            try
            {
                if (dataObject.GetDataPresent(typeof(FileNode)))
                {
                    FileNode fileNode = (FileNode)dataObject.GetData(typeof(FileNode));
                    LoggingService.Debug(string.Join(" ", "ProjectBrowser:", GResources.GetResourceText(29450360), "'" + fileNode.FileName + "'", GResources.GetResourceText(29450361), "'" + this.Directory + "'")); //RC 29450361 : do složky
                    if (!FileUtility.IsEqualFileName(Directory, fileNode.FileName) && !FileUtility.IsEqualFileName(Directory, Path.GetDirectoryName(fileNode.FileName))
                        && !(fileNode.ProjectItem is FileProjectItem && FileUtility.IsEqualFileName(Directory, Path.GetDirectoryName(GetFullVirtualName((FileProjectItem)fileNode.ProjectItem)))))
                        CopyFileHere(fileNode, effect == DragDropEffects.Move);
                    else
                    {
                        fileNode.Remove();
                        if (!File.Exists(fileNode.FileName))
                            fileNode.FileNodeStatus = FileNodeStatus.Missing;
                        else
                            fileNode.FileNodeStatus = FileNodeStatus.InProject;
                        fileNode.InsertSorted(this);
                    }
                }
                else if (dataObject.GetDataPresent(typeof(DirectoryNode)))
                {
                    DirectoryNode directoryNode = (DirectoryNode)dataObject.GetData(typeof(DirectoryNode));
                    CopyDirectoryHere(directoryNode, effect == DragDropEffects.Move);
                }
                else if (dataObject.GetDataPresent(DataFormats.FileDrop))
                {
                    string[] files = (string[])dataObject.GetData(DataFormats.FileDrop);
                    foreach (string fileName in files)
                        if (System.IO.Directory.Exists(fileName))
                        {
                            if (!FileUtility.IsBaseDirectory(fileName, Directory))
                                CopyDirectoryHere(fileName, false);
                        }
                        else
                            CopyFileHere(fileName, false);
                }

                ProjectService.SaveSolution();
            }
            catch (Exception e) { MessageService.ShowError(e); }
        }

        static string GetFullVirtualName(FileProjectItem item)
        {
            if (Path.IsPathRooted(item.VirtualName))
                return item.VirtualName;
            else if (item.Project != null)
                return Path.Combine(item.Project.Directory, item.VirtualName);
            return item.VirtualName;
        }
        #endregion

        /// <summary>
        /// kopírování typového souboru
        /// </summary>
        /// <param name="fileName">název zdroje</param>
        /// <param name="copiedFileName">cílový název</param>
        internal virtual void CopyTypedFile(string fileName, string copiedFileName)
        {
            FileService.CopyFile(fileName, copiedFileName, false, true);
        }
    }
}
