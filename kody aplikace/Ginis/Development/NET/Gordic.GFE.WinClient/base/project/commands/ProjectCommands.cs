//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ClipboardHandlerNodeCommands.cs        </Name>
//    <Description> Odstranění větve projektu                                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-25                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Windows.Forms;
using Gordic.GFE.Parsers.AddIns.Project;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Internal.Templates;
using Gordic.GFE.WinClient.ProjectBrowser;
using Gordic.WinForms.Controls;
using Gordic.General;
using Gordic.GFE.WinClient.AddIns;

namespace Gordic.GFE.WinClient.Project.Commands
{
    /// <summary>
    /// Otevření složky projektu
    /// </summary>
    class OpenProjectFolder : AbstractMenuCommand
    {
        /// <summary>
        /// spuštění příkazu
        /// </summary>
        public override void Run()
        {
            IProject project = ProjectService.CurrentProject;
            if (project == null)
                return;

            //OpenFolder.OpenFolderInExplorer(project.Directory);
            OpenFolder.OpenFolderInExplorer(project.Parent.ParentSolution.Directory);
        }
    }

    /// <summary>
    /// Načtení sestavení
    /// </summary>
    class LoadSolution : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (Owner is GLinkLabel label && label.Tag != null)
                ProjectService.LoadSolutionOrProject(label.Tag as RecentOpenFile);
            else OpenNew(Owner);
        }

        /// <summary>
        /// Otevření souboru
        /// </summary>
        /// <param name="sender">vlastník příkazu</param>
        /// <param name="args">argumenty příkazu</param>
        public static void OnOpen(object sender, EventArgs args)
        {
            if (sender is GLinkLabel label && label.Tag != null)
                ProjectService.LoadSolutionOrProject(label.Tag as RecentOpenFile);
            else OpenNew(sender);
        }

        static void OpenNew(object caller)
        {
            using (OpenFileDialog fdiag = new OpenFileDialog())
            {
                fdiag.AddExtension = true;
                fdiag.Filter = ProjectService.GetAllProjectsFilter(caller);
                fdiag.Multiselect = false;
                fdiag.CheckFileExists = true;
                if (fdiag.ShowDialog(SimpleDesktop.MainForm) == DialogResult.OK)
                    ProjectService.LoadSolutionOrProject(fdiag.FileName);
            }
        }
    }

    /// <summary>
    /// Otevření konfiguračního souboru sestavení
    /// </summary>
    class OpenConfigFile : AbstractMenuCommand
    {
        /// <exclude/>
        public override bool IsEnabled
        {
            get => ProjectBrowserPad.Instance.SelectedNode is ProjectNode node && File.Exists(node.LinkedFileName);
        }
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (ProjectBrowserPad.Instance.SelectedNode is ProjectNode node)
                Services.FileAgent.OpenFile(node.LinkedFileName, true, false);
        }
    }

    /// <summary>
    /// Příkaz na uložení projektu
    /// </summary>
    class SaveProject : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            ProjectBrowserPad.Instance.SelectedNode?.Project.Save();
        }
    }

    /// <summary>
    /// Položka menu, která zobrazí dialog NewFileDialog a přidá vybraný soubor do sestavení.
    /// </summary>
    class AddNewItemsToProject : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            ProjectBrowserPad.Instance.BringToFront(SimpleDesktop.Desktop.DesktopLayout);
            this.AddNewItems();
            ProjectService.SaveSolution();
        }

        protected IEnumerable<FileProjectItem> AddNewItems()
        {
            DirectoryNode node = ProjectBrowserPad.Instance.ProjectBrowserControl.SelectedDirectoryNode;
            if (node == null)
                return null;
            node.Expand();
            node.Expanding();

            List<FileProjectItem> addedItems = new List<FileProjectItem>();

            using (NewFileDialog nfd = new NewFileDialog(node.Directory))
                if (nfd.ShowDialog(SimpleDesktop.MainForm) == DialogResult.OK)
                    foreach (KeyValuePair<string, FileDescriptionTemplate> createdFile in nfd.CreatedFiles)
                        addedItems.Add(node.AddNewFile(createdFile.Key));

            return addedItems.AsReadOnly();
        }
    }

    /// <summary>
    /// přejmenování položky stromu projektu
    /// </summary>
    class RenameEntryEvent : AbstractMenuCommand
    {
        /// <summary>
        /// spuštění příkazu
        /// </summary>
        public override void Run()
        {
            AbstractFileTreeNode node = ProjectBrowserPad.Instance.SelectedNode;
            if (node == null)
                return;

            ProjectBrowserPad.Instance.ProjectBrowserControl.Select();
            ProjectBrowserPad.Instance.ProjectBrowserControl.Focus();
            ProjectBrowserPad.Instance.StartLabelEdit(node);
        }
    }

    /// <summary>
    /// přidání existující položky do projektu
    /// </summary>
    class AddExistingItemsToProject : AbstractMenuCommand
    {
        /// <summary>
        /// seznam možných změn existujícího souboru v sestavení
        /// </summary>
        public enum ReplaceExistingFile
        {
            /// <summary>
            /// přepsat existující soubor
            /// </summary>
            Yes = 0,
            /// <summary>
            /// přepsat vše
            /// </summary>
            YesToAll = 1,
            /// <summary>
            /// nepřepisovat
            /// </summary>
            No = 2,
            /// <summary>
            /// zrušit operaci
            /// </summary>
            Cancel = 3
        }

        /// <summary>
        /// zobrazení dialogu nahrazení existujícího souboru
        /// </summary>
        /// <param name="caption"></param>
        /// <param name="fileName"></param>
        /// <param name="replacingMultiple"></param>
        /// <returns></returns>
        public static ReplaceExistingFile ShowReplaceExistingFileDialog(string caption, string fileName, bool replacingMultiple)
        {
            if (caption == null)
                caption = GResources.GetResourceText(29450326); //RC 29450326 : Nahradit existující soubor
            string text = StringParser.Parse(string.Join(" ", GResources.GetResourceText(29450217), "'${FileName}'", GResources.GetResourceText(29450212), GResources.GetResourceText(29450327)), new string[,] { { "FileName", fileName } }); //RC 29450327 : Chcete jej nahradit?
            if (replacingMultiple)
                return (ReplaceExistingFile)
                    MessageService.ShowCustomDialog(caption, text,
                                                    0, 3,
                                                    GResources.GetResourceText(29450328), //RC 29450328 : Ano
                                                    GResources.GetResourceText(29450329), //RC 29450329 : Ano vše
                                                    GResources.GetResourceText(29450330), //RC 29450330 : Ne
                                                    GResources.GetResourceText(29450224)); //RC 29450224 : Zrušit
            else
                return MessageService.AskQuestion(text, caption)
                    ? ReplaceExistingFile.Yes : ReplaceExistingFile.No;
        }

        int GetFileFilterIndex(IProject project, string[] fileFilters)
        {
            if (project != null)
            {
                //SolutionBindingDescriptor languageEntity = SolutionBindingService.GetEntityPerProjectFile(project.ProjectType);
                SolutionBindingDescriptor languageEntity = SolutionBindingService.GetEntityPerProjectFile('.' + project.ProjectType);
                if (languageEntity != null)
                    for (int i = 0; i < fileFilters.Length; ++i)
                        for (int j = 0; j < languageEntity.CodeFileExtensions.Length; ++j)
                            if (fileFilters[i].ToUpperInvariant().IndexOf(languageEntity.CodeFileExtensions[j].ToUpperInvariant()) >= 0)
                                return i + 1;
            }
            return 0;
        }

        /// <summary>
        /// kopírování složky
        /// </summary>
        /// <param name="directoryName">název složky</param>
        /// <param name="node">větev</param>
        /// <param name="includeInProject">indikuje začlenění do projektu</param>
        public static void CopyDirectory(string directoryName, DirectoryNode node, bool includeInProject)
        {
            directoryName = FileUtility.NormalizePath(directoryName);
            string copiedFileName = Path.Combine(node.Directory, Path.GetFileName(directoryName));
            LoggingService.DebugFormatted(GResources.GetResourceText(29450331) + " '{0}' " + GResources.GetResourceText(29450332) + " '{1}'...", directoryName, copiedFileName); //RC 29450332 : do
            if (!FileUtility.IsEqualFileName(directoryName, copiedFileName))
            {
                if (includeInProject && ProjectService.OpenSolution != null)
                    // získání ProjectItems ve složce
                    foreach (IProject project in ProjectService.OpenSolution.Projects)
                    {
                        if (!FileUtility.IsBaseDirectory(project.Directory, directoryName))
                            continue;

                        LoggingService.Debug(string.Join(" ", GResources.GetResourceText(29450333), project.Name)); //RC 29450333 : hledání dílčích položek v
                        foreach (ProjectItem item in project.Items)
                        {
                            if (!(item is FileProjectItem fileItem))
                                continue;
                            string virtualFullName = Path.Combine(project.Directory, fileItem.VirtualName);
                            if (FileUtility.IsBaseDirectory(directoryName, virtualFullName))
                            {
                                if (item.ItemType == ItemType.Folder && FileUtility.IsEqualFileName(directoryName, virtualFullName))
                                    continue;
                                LoggingService.Debug(string.Join(" ", GResources.GetResourceText(29450334), virtualFullName)); //RC 29450334 : nalezen soubor
                                FileProjectItem newItem = new FileProjectItem(node.Project, fileItem.ItemType);
                                if (FileUtility.IsBaseDirectory(directoryName, fileItem.FileName))
                                    newItem.FileName = FileUtility.RenameBaseDirectory(fileItem.FileName, directoryName, copiedFileName);
                                else
                                    newItem.FileName = fileItem.FileName;

                                fileItem.CopyMetadataTo(newItem);
                                ProjectService.AddProjectItem(node.Project, newItem, node);
                            }
                        }
                    }

                FileService.CopyFile(directoryName, copiedFileName, true, false);
                DirectoryNode newNode = new DirectoryNode(copiedFileName);
                newNode.InsertSorted(node);
                if (includeInProject)
                    IncludeFileInProject.IncludeDirectoryNode(newNode, false);
                newNode.Expanding();
            }
            else if (includeInProject)
                foreach (TreeNode childNode in node.Nodes)
                    if (childNode is DirectoryNode directoryNode)
                    {
                        if (FileUtility.IsEqualFileName(directoryNode.Directory, copiedFileName))
                            IncludeFileInProject.IncludeDirectoryNode(directoryNode, true);
                    }
        }

        /// <summary>
        /// kopírování souboru
        /// </summary>
        /// <param name="fileName">název souboru</param>
        /// <param name="node">větev</param>
        /// <param name="includeInProject">indikuje nutnost začlenit do projektu</param>
        /// <returns></returns>
        public static FileProjectItem CopyFile(string fileName, DirectoryNode node, bool includeInProject)
        {
            string copiedFileName = Path.Combine(node.Directory, Path.GetFileName(fileName));
            if (!FileUtility.IsEqualFileName(fileName, copiedFileName))
                FileService.CopyFile(fileName, copiedFileName, false, true);
            if (includeInProject)
            {
                FileNode fileNode;
                AlfFileNode alfFileNode;
                foreach (TreeNode childNode in node.AllNodes)
                    if (childNode is FileNode)
                    {
                        fileNode = (FileNode)childNode;
                        if (FileUtility.IsEqualFileName(fileNode.FileName, copiedFileName))
                        {
                            if (fileNode.FileNodeStatus == FileNodeStatus.Missing)
                                fileNode.FileNodeStatus = FileNodeStatus.InProject;
                            else if (fileNode.FileNodeStatus == FileNodeStatus.None)
                                return IncludeFileInProject.IncludeFileNode(fileNode);
                            return fileNode.ProjectItem as FileProjectItem;
                        }
                    }
                    else if (childNode is AlfFileNode && (childNode as AlfFileNode).Item.ItemType == ItemType.Content)
                    {
                        alfFileNode = (AlfFileNode)childNode;
                        if (FileUtility.IsEqualFileName(alfFileNode.LinkedFileName, copiedFileName))
                        {
                            if (alfFileNode.FileNodeStatus == FileNodeStatus.Missing)
                                alfFileNode.FileNodeStatus = FileNodeStatus.InProject;
                            else if (alfFileNode.FileNodeStatus == FileNodeStatus.None)
                            {
                                IncludeFileInProject.IncludeDirectoryNode(alfFileNode, true);
                                return alfFileNode.ProjectItem as FileProjectItem;
                            }
                            return alfFileNode.ProjectItem as FileProjectItem;
                        }
                    }
                fileNode = node.CreateFileNode(copiedFileName);//new FileNode(copiedFileName);
                fileNode.InsertSorted(node);
                return IncludeFileInProject.IncludeFileNode(fileNode);
            }
            return null;
        }
        /// <summary>
        /// nalezení všech závislých souborů
        /// </summary>
        /// <param name="fileName">název hlavního souboru</param>
        /// <returns>Seznam závislých souborů (archiv, atp.)</returns>
        public static IEnumerable<string> FindAdditionalFiles(string fileName)
        {
            List<string> list = new List<string>();
            string prefix = Path.Combine(Path.GetDirectoryName(fileName), Path.GetFileNameWithoutExtension(fileName));
            foreach (string ext in AddInTree.BuildItems<string>("/Desktop/DependentFileExtensions", null, false))
                if (File.Exists(prefix + ext))
                    list.Add(prefix + ext);
            return list;
        }

        /// <summary>
        /// spuštění příkazu
        /// </summary>
        public override void Run()
        {
            ProjectBrowserPad.Instance.BringToFront(SimpleDesktop.Desktop.DesktopLayout);
            var list = this.AddExistingItems();
            if (list.Count() != 0)
                ProjectService.SaveSolution();
        }

        protected IEnumerable<FileProjectItem> AddExistingItems()
        {
            DirectoryNode node = ProjectBrowserPad.Instance.ProjectBrowserControl.SelectedDirectoryNode;
            if (node == null)
                return null;
            node.Expanding();
            node.Expand();

            List<FileProjectItem> addedItems = new List<FileProjectItem>();

            using (OpenFileDialog fdiag = new OpenFileDialog())
            {
                fdiag.AddExtension = true;
                string[] fileFilters = (string[])(AddInTree.GetTreeNode("/Desktop/FileFilter").BuildChildItems(this)).ToArray(typeof(string));

                fdiag.InitialDirectory = node.Solution.Directory;
                fdiag.FilterIndex = GetFileFilterIndex(node.Project, fileFilters);
                fdiag.Filter = String.Join("|", fileFilters);
                fdiag.Multiselect = true;
                fdiag.CheckFileExists = true;
                fdiag.Title = GResources.GetResourceText(29450335); //RC 29450335 : Přidat existující soubory

                if (fdiag.ShowDialog(SimpleDesktop.Desktop.MainForm) == DialogResult.OK)
                {
                    List<KeyValuePair<string, string>> fileNames = new List<KeyValuePair<string, string>>(fdiag.FileNames.Length);
                    foreach (string fileName in fdiag.FileNames)
                        fileNames.Add(new KeyValuePair<string, string>(fileName, ""));

                    bool addedDependentFiles = false;
                    foreach (string fileName in fdiag.FileNames)
                        foreach (string additionalFile in FindAdditionalFiles(fileName))
                            if (!fileNames.Exists
                                (delegate (KeyValuePair<string, string> pair) { return FileUtility.IsEqualFileName(pair.Key, additionalFile); })
                                )
                            {
                                addedDependentFiles = true;
                                fileNames.Add(new KeyValuePair<string, string>(additionalFile, Path.GetFileName(fileName)));
                            }

                    string copiedFileName = Path.Combine(node.Directory, Path.GetFileName(fileNames[0].Key));
                    if (!FileUtility.IsEqualFileName(fileNames[0].Key, copiedFileName))
                    {
                        int res = MessageService.ShowCustomDialog(
                            fdiag.Title, GResources.GetResourceText(29450336), //RC 29450336 : Chcete zkopírovat soubor(y) do cílového adresáře?
                            0, 1,
                            GResources.GetResourceText(29450337), //RC 29450337 : Kopírovat
                            GResources.GetResourceText(29450224)); //RC 29450224 : Zrušit
                        if (res == 2)
                            // Zrušit
                            return addedItems.AsReadOnly();
                        // pokračujeme pouze u kopírování res==0 (Kopírovat)
                    }
                    bool replaceAll = false;
                    foreach (KeyValuePair<string, string> pair in fileNames)
                    {
                        copiedFileName = Path.Combine(node.Directory, Path.GetFileName(pair.Key));
                        if (!replaceAll && File.Exists(copiedFileName) && !FileUtility.IsEqualFileName(pair.Key, copiedFileName))
                        {
                            ReplaceExistingFile res = ShowReplaceExistingFileDialog(fdiag.Title, Path.GetFileName(pair.Key), true);
                            if (res == ReplaceExistingFile.YesToAll)
                                replaceAll = true;
                            else if (res == ReplaceExistingFile.No)
                                continue;
                            else if (res == ReplaceExistingFile.Cancel)
                                break;
                        }
                        FileProjectItem item = CopyFile(pair.Key, node, true);
                        if (item != null)
                            addedItems.Add(item);
                    }
                    node.Project.Save();
                    if (addedDependentFiles)
                        node.RecreateSubNodes();
                }
            }

            return addedItems.AsReadOnly();
        }
    }

    /// <summary>
    /// vyjmutí větve projektu
    /// </summary>
    class CutProjectBrowserNode : AbstractMenuCommand
    {
        /// <summary>
        /// indikuje dostupnost příkazu
        /// </summary>
        public override bool IsEnabled { get { return ProjectBrowserPad.Instance != null && ProjectBrowserPad.Instance.EnableCut; } }
        /// <summary>
        /// spuštění příkazu
        /// </summary>
        public override void Run() { ProjectBrowserPad.Instance.Cut(); }
    }

    /// <summary>
    /// kopírování větve projektu
    /// </summary>
    class CopyProjectBrowserNode : AbstractMenuCommand
    {
        /// <summary>
        /// indikuje dostupnost příkazu
        /// </summary>
        public override bool IsEnabled { get { return ProjectBrowserPad.Instance != null && ProjectBrowserPad.Instance.EnableCopy; } }
        /// <summary>
        /// spuštění příkazu
        /// </summary>
        public override void Run() { ProjectBrowserPad.Instance.Copy(); }
    }

    /// <summary>
    /// vložení větve projektu
    /// </summary>
    class PasteProjectBrowserNode : AbstractMenuCommand
    {
        /// <summary>
        /// indikuje dostupnost příkazu
        /// </summary>
        public override bool IsEnabled { get { return ProjectBrowserPad.Instance != null && ProjectBrowserPad.Instance.EnablePaste; } }
        /// <summary>
        /// spuštění příkazu
        /// </summary>
        public override void Run() { ProjectBrowserPad.Instance.Paste(); }
    }

    /// <summary>
    /// odstranění větve projektu
    /// </summary>
    class DeleteProjectBrowserNode : AbstractMenuCommand
    {
        /// <summary>
        /// indikuje dostupnost příkazu
        /// </summary>
        public override bool IsEnabled { get { return ProjectBrowserPad.Instance != null && ProjectBrowserPad.Instance.EnableDelete; } }
        /// <summary>
        /// spuštění příkazu
        /// </summary>
        public override void Run() { ProjectBrowserPad.Instance.Delete(); }
    }

    /// <summary>
    /// zobrazení vlastnosti projektové větve
    /// </summary>
    class ShowProperty : AbstractMenuCommand
    {
        /// <summary>
        /// Je operace dostupná?
        /// </summary>
        public override bool IsEnabled
        {
            get
            {
                if (ProjectBrowserPad.Instance == null)
                    return false;

                return ((ProjectBrowserPad.Instance.SelectedNode is ProjectNode)
                    && (ProjectBrowserPad.Instance.SelectedNode as ProjectNode).EnableProperty)
                    || ProjectBrowserPad.Instance.SelectedNode is IFileProjectItemHandler;
            }
        }

        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            PropertyCommand.ShowPropertyOptions(GResources.GetResourceText(29451481), AddInTree.GetTreeNode("/ProjectPropertyDialog"));
        }
    }

    /// <summary>
    /// zobrazení vlastnosti projektové větve
    /// </summary>
    class SetDefault : AbstractMenuCommand
    {
        /// <summary>
        /// Je operace dostupná?
        /// </summary>
        public override bool IsEnabled
        {
            get
            {
                if (ProjectBrowserPad.Instance == null)
                    return false;

                return ProjectBrowserPad.Instance.SelectedNode is IFileProjectItemHandler
                    && (ProjectBrowserPad.Instance.SelectedNode as IFileProjectItemHandler).CanBeDefault;
            }
        }

        /// <exclude/>
        public override void Run()
        {
            (ProjectBrowserPad.Instance.SelectedNode as IFileProjectItemHandler).SetDefault(true);
        }
    }
}
