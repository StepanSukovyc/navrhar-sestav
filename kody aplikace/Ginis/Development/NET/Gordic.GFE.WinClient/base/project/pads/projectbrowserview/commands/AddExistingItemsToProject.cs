//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.AddExistingItemsToProject.cs           </Name>
//    <Description> Přidání existujícího souboru do projektu                    </Description>
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
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Project;
using Gordic.General;
using Gordic.GFE.WinClient.AddIns;

namespace Gordic.GFE.WinClient.ProjectBrowser
{
    /// <summary>
    /// Přidání existujícího souboru do projektu
    /// </summary>
    class AddExistingItemsToProject : AbstractMenuCommand
    {
        public enum ReplaceExistingFile
        {
            Yes = 0,
            YesToAll = 1,
            No = 2,
            Cancel = 3
        }

        public static ReplaceExistingFile ShowReplaceExistingFileDialog(string caption, string fileName, bool replacingMultiple)
        {
            if (caption == null)
                caption = GResources.GetResourceText(29450351); //RC 29450351 : Nahradit existující soubor.
            string text = StringParser.Parse(string.Join(" ", GResources.GetResourceText(29450217), "'${FileName}'", GResources.GetResourceText(29450212), GResources.GetResourceText(29450327)), new string[,] { { "FileName", fileName } }); //RC 29450217 : Soubor s názvem
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
                SolutionBindingDescriptor languageEntity = SolutionBindingService.GetEntityPerLanguageName(project.ProjectType);
                if (languageEntity != null)
                    for (int i = 0; i < fileFilters.Length; ++i)
                        for (int j = 0; j < languageEntity.CodeFileExtensions.Length; ++j)
                            if (fileFilters[i].ToUpperInvariant().IndexOf(languageEntity.CodeFileExtensions[j].ToUpperInvariant()) >= 0)
                                return i + 1;
            }
            return 0;
        }

        public static void CopyDirectory(string directoryName, DirectoryNode node, bool includeInProject)
        {
            directoryName = FileUtility.NormalizePath(directoryName);
            string copiedFileName = Path.Combine(node.Directory, Path.GetFileName(directoryName));
            LoggingService.Debug(string.Join(" ", GResources.GetResourceText(29450352), directoryName, GResources.GetResourceText(29450332), copiedFileName)); //RC 29450332 : do
            if (!FileUtility.IsEqualFileName(directoryName, copiedFileName))
            {
                if (includeInProject && ProjectService.OpenSolution != null)
                {
                    foreach (IProject project in ProjectService.OpenSolution.Projects)
                    {
                        if (!FileUtility.IsBaseDirectory(project.Directory, directoryName))
                            continue;
                        LoggingService.Debug(string.Join(" ", GResources.GetResourceText(29450353), project.Name)); //RC 29450353 : Nalezení vnitřních položek
                        foreach (ProjectItem item in project.Items)
                        {
                            if (!(item is FileProjectItem fileItem))
                                continue;
                            string virtualFullName = Path.Combine(project.Directory, fileItem.VirtualName);
                            if (FileUtility.IsBaseDirectory(directoryName, virtualFullName))
                            {
                                if (item.ItemType == ItemType.Folder && FileUtility.IsEqualFileName(directoryName, virtualFullName))
                                    continue;
                                LoggingService.Debug(string.Join(" ", GResources.GetResourceText(29450354), virtualFullName)); //RC 29450354 : Soubor nalezen
                                FileProjectItem newItem = new FileProjectItem(node.Project, fileItem.ItemType);
                                if (FileUtility.IsBaseDirectory(directoryName, fileItem.FileName))
                                    newItem.FileName = FileUtility.RenameBaseDirectory(fileItem.FileName, directoryName, copiedFileName);
                                else
                                    newItem.FileName = fileItem.FileName;
                                ProjectService.AddProjectItem(node.Project, newItem, node);
                            }
                        }
                    }
                }

                Gordic.GFE.Parsers.Services.FileService.CopyFile(directoryName, copiedFileName, true, false);
                DirectoryNode newNode = new DirectoryNode(copiedFileName);
                newNode.InsertSorted(node);
                if (includeInProject)
                    IncludeFileInProject.IncludeDirectoryNode(newNode, false);
                newNode.Expanding();
            }
            else if (includeInProject)
                foreach (TreeNode childNode in node.Nodes)
                    if (childNode is DirectoryNode directoryNode)
                        if (FileUtility.IsEqualFileName(directoryNode.Directory, copiedFileName))
                            IncludeFileInProject.IncludeDirectoryNode(directoryNode, true);
        }

        public static FileProjectItem CopyFile(string fileName, DirectoryNode node, bool includeInProject, string copiedFileName = "")
        {
            if (string.IsNullOrEmpty(copiedFileName))
                copiedFileName = Path.Combine(node.Directory, Path.GetFileName(fileName));

            if (!FileUtility.IsEqualFileName(fileName, copiedFileName))
                node.CopyTypedFile(fileName, copiedFileName);

            if (includeInProject)
            {
                FileNode fileNode;
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
                fileNode = node.CreateFileNode(copiedFileName);//new FileNode(copiedFileName);
                fileNode.InsertSorted(node);
                return IncludeFileInProject.IncludeFileNode(fileNode);
            }
            return null;
        }

        public static IEnumerable<string> FindAdditionalFiles(string fileName)
        {
            List<string> list = new List<string>();
            StringParser.Properties["Extension"] = Path.GetExtension(fileName);
            string prefix = Path.Combine(Path.GetDirectoryName(fileName), Path.GetFileNameWithoutExtension(fileName));
            foreach (string ext in AddInTree.BuildItems<string>("/ReportDesigner/Desktop/DependentFileExtensions", null, false))
                if (File.Exists(prefix + ext))
                    list.Add(prefix + ext);
            return list;
        }

        public override void Run()
        {
            ProjectBrowserPad.Instance.BringToFront(SimpleDesktop.Desktop.DesktopLayout);
            this.AddExistingItems();
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

                fdiag.InitialDirectory = node.Directory;
                fdiag.FilterIndex = GetFileFilterIndex(node.Project, fileFilters);
                fdiag.Filter = String.Join("|", fileFilters);
                fdiag.Multiselect = true;
                fdiag.CheckFileExists = true;
                fdiag.Title = GResources.GetResourceText(29450355); //RC 29450355 : Přidat existující soubor

                if (fdiag.ShowDialog(SimpleDesktop.MainForm) == DialogResult.OK)
                {
                    List<KeyValuePair<string, string>> fileNames = new List<KeyValuePair<string, string>>(fdiag.FileNames.Length);
                    foreach (string fileName in fdiag.FileNames)
                        fileNames.Add(new KeyValuePair<string, string>(fileName, ""));
                    bool addedDependentFiles = false;
                    foreach (string fileName in fdiag.FileNames)
                        foreach (string additionalFile in FindAdditionalFiles(fileName))
                            if (!fileNames.Exists(delegate(KeyValuePair<string, string> pair)
                            {
                                return FileUtility.IsEqualFileName(pair.Key, additionalFile);
                            }))
                            {
                                addedDependentFiles = true;
                                fileNames.Add(new KeyValuePair<string, string>(additionalFile, Path.GetFileName(fileName)));
                            }

                    string copiedFileName = Path.Combine(node.Directory, Path.GetFileName(fileNames[0].Key));
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
}
