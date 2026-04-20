//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SsrProjectNode.cs                     </Name>
//    <Description> Větev projektu SSR                                          </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-05-27                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.AddIns.Project;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.WinForm;
using Gordic.GFE.WinClient.AddIns;
using Gordic.GFE.WinClient.Project;
using Gordic.GFE.WinClient.ProjectBrowser;
using Gordic.GFE.WinClient.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Windows.Forms;

namespace Gordic.GFE.WinClient.SsrBinding
{
    /// <summary>
    /// Větev projektu SSR
    /// </summary>
    class SsrProjectNode : ProjectNode, IFileProjectItemHandler
    {
        #region IFileProjectItemHandler
        /// <exclude/>
        public bool CanBeDefault { get { return false; } }
        /// <exclude/>
        public bool IsDefault { get { return false; } }
        /// <exclude/>
        public dynamic Item { get { return project; } }
        /// <exclude/>
        public void SetDefault(bool value, bool withoutSave = false)
        {
            throw new NotImplementedException();
        }
        #endregion

        /// <summary>
        /// indikuje existencí vlastnosti projektu
        /// </summary>
        public override bool EnableProperty { get { return true; } }
        /// <exclude/>
        public override bool EnableCut { get { return false; } }
        /// <exclude/>
        public override bool EnableDelete { get { return !IsEditing; } }
        /// <summary>
        /// indikátor povolení vložení větve
        /// </summary>
        public override bool EnablePaste
        {
            get
            {
                IDataObject dataObject = ClipboardWrapper.GetDataObject();
                if (dataObject.GetDataPresent(typeof(AlfFileNode)))
                    return true;

                return base.EnablePaste;
            }
        }

        SsrProject project;

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        /// <param name="project">aktuální projekt</param>
        public SsrProjectNode(IProject project)
            : base(project)
        {
            this.project = project as SsrProject;
            (new CustomNode()).AddTo(this);
            this.project.Node = this;
        }

        /// <summary>
        /// pozměnit titulek reportu
        /// </summary>
        /// <param name="newFileName">nový název reportu</param>
        public override void AfterLabelEdit(string newFileName)
        {
            if (project.Title == newFileName)
                return;

            Text = newFileName;
            project.Title = newFileName;
            ProjectService.SaveSolution();
        }
        /// <summary>
        /// inicializace třídy
        /// </summary>
        protected override void Initialize()
        {
            SetContext();
            TreeView.AfterSelect -= Tv_AfterSelect;

            Nodes.Clear();
            Dictionary<string, SsrFileNode> fileNodeDictionary = new Dictionary<string, SsrFileNode>((IEqualityComparer<string>)StringComparer.InvariantCultureIgnoreCase);
            Dictionary<string, DirectoryNode> directoryNodeList = new Dictionary<string, DirectoryNode>((IEqualityComparer<string>)StringComparer.InvariantCultureIgnoreCase);

            foreach (SsrFileProjectItem item in this.Project.Items.OfType<SsrFileProjectItem>())
            {
                string fName = item.FileName.Replace('\\', '/');

                if (item.ItemType != ItemType.Data
                    || !fName.EndsWith(":generate:", StringComparison.OrdinalIgnoreCase))
                {
                    if (fName.EndsWith("/", StringComparison.Ordinal))
                        fName = fName.Substring(0, fName.Length - 1);

                    string fileName = Path.GetFileName(fName);
                    
                    if (item.ItemType == ItemType.Folder)
                    {
                        SsrDirectoryNode newDirectoryNode = new SsrDirectoryNode(item);

                        if (!System.IO.Directory.Exists(item.FileName))
                            newDirectoryNode.FileNodeStatus = FileNodeStatus.Missing;
                        newDirectoryNode.ProjectItem = item;
                        newDirectoryNode.AddTo(this);
                        directoryNodeList[fileName] = newDirectoryNode;
                    }
                    else if (item.ItemType == ItemType.Content && Path.GetExtension(item.FileName).Equals(".alf", StringComparison.OrdinalIgnoreCase))
                    {
                        AlfFileNode fileNode = new AlfFileNode(item, FileNodeStatus.InProject);

                        if (!File.Exists(item.Section.FileName))
                            fileNode.FileNodeStatus = FileNodeStatus.Missing;
                        fileNode.AddTo(this);
                        directoryNodeList[fileName] = fileNode;
                    }
                    else
                    {
                        SsrFileNode fileNode = new SsrFileNode();
                        fileNode.Initialize(item);
                        
                        if (!File.Exists(item.Section.FileName))
                            fileNode.FileNodeStatus = FileNodeStatus.Missing;
                        else fileNode.FileNodeStatus = FileNodeStatus.InProject;

                        fileNodeDictionary[fileName] = fileNode;
                        fileNode.AddTo(this);
                    }
                }
            }

            // přidání souboru nalezeného v systému
            if (System.IO.Directory.Exists(this.Directory))
            {
                foreach (string subDirectory in System.IO.Directory.GetDirectories(this.Directory))
                {
                    string filename = Path.GetFileName(subDirectory);
                    if (filename != ".ssr")
                    {
                        if (directoryNodeList.TryGetValue(filename, out DirectoryNode node))
                            if (node.FileNodeStatus == FileNodeStatus.None)
                                node.FileNodeStatus = FileNodeStatus.InProject;
                    }
                }

                foreach (string fullpath in System.IO.Directory.GetFiles(this.Directory))
                {
                    string file = Path.GetFileName(fullpath);
                    if (fileNodeDictionary.TryGetValue(file, out SsrFileNode node))
                    {
                        if (node.FileNodeStatus == FileNodeStatus.None)
                            node.FileNodeStatus = FileNodeStatus.InProject;
                    }
                }
            }
            TreeView.AfterSelect += Tv_AfterSelect;
            TreeView.ExpandAll();
            project._SetDefault();
        }

        /// <exclude/>
        public override void Paste()
        {
            IDataObject dataObject = ClipboardWrapper.GetDataObject();
            if (dataObject == null)
                return;
            if (dataObject.GetDataPresent(typeof(AlfFileNode)))
            {
                FileOperationClipboardObject clipboardObject = (FileOperationClipboardObject)dataObject.GetData(typeof(AlfFileNode).ToString());

                if (File.Exists(clipboardObject.FileName))
                {
                    CopyFileHere(clipboardObject.FileName, clipboardObject.PerformMove);
                    if (clipboardObject.PerformMove)
                        Clipboard.Clear();

                    ProjectService.SaveSolution();
                }
            }
            else 
                base.Paste();
        }
        /// <exclude/>
        internal override void CopyFileHere(string fileName, bool performMove, bool recurse = false)
        {
            string shortFileName = Path.GetFileName(fileName);
            string copiedFileName = Path.Combine(Directory, shortFileName);
            if (FileUtility.IsEqualFileName(fileName, copiedFileName))
            {
                copiedFileName = Path.Combine(Directory, Path.GetFileNameWithoutExtension(fileName) + "_copy" + Path.GetExtension(fileName));
                copiedFileName = FileUtility.GetUniqueName(copiedFileName);
            }
            FileService.CopyFile(fileName, copiedFileName, false, true);

            ProjectItem itm = project.AddProjectItem(copiedFileName);

            if (itm.ItemType == ItemType.Content)
            {
                string oldArchName = Path.Combine(Path.GetDirectoryName(fileName), Path.GetFileNameWithoutExtension(fileName) + ".zip");
                if (File.Exists(oldArchName))
                {
                    string newArchName = Path.Combine(Path.GetDirectoryName(copiedFileName), Path.GetFileNameWithoutExtension(copiedFileName) + ".zip");
                    FileService.CopyFile(oldArchName, newArchName, false, true);
                }
            }

            if (itm.ItemType == ItemType.Content && Path.GetExtension(copiedFileName).Equals(".alf", StringComparison.OrdinalIgnoreCase))
                (new AlfFileNode(itm, AddIns.FileNodeStatus.InProject)).AddTo(this);
            else
            {
                SsrFileNode node = new SsrFileNode();
                node.Initialize(itm);

                node.FileNodeStatus = AddIns.FileNodeStatus.InProject;
                node.AddTo(this);
                node.SetIcon(IconService.GetImageForFile(copiedFileName));
            }
        }
        /// <exclude/>
        internal override FileNode CreateFileNode(string fileName)
        {
            SsrFileNode fileNode = new SsrFileNode();
            fileNode.Initialize(fileName);

            if (!File.Exists(fileName))
                fileNode.FileNodeStatus = FileNodeStatus.Missing;
            else 
                fileNode.FileNodeStatus = FileNodeStatus.InProject;

            return fileNode;
        }

        void Tv_AfterSelect(object sender, System.Windows.Forms.TreeViewEventArgs e)
        {
            LocalCommonService.SelectedObject = (sender as ExtTreeView).SelectedNode;
        }
    }
}
