//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.GfrmProjectNode.cs                     </Name>
//    <Description> Větev projektu GFRM                                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-25                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Gordic.GFE.Parsers.AddIns.Project;
using Gordic.GFE.WinClient.Project;
using Gordic.GFE.WinClient.ProjectBrowser;
using Gordic.GFE.WinClient.AddIns;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.Parsers.AddIns;
using System.Windows.Forms;

namespace Gordic.GFE.WinClient.GfrmBinding
{
    /// <summary>
    /// Větev projektu GFRM
    /// </summary>
    class GfrmProjectNode : ProjectNode
    {
        /// <summary>
        /// konstruktor ptojektové větve
        /// </summary>
        /// <param name="project">projekt větve</param>
        public GfrmProjectNode(IProject project)
            : base(project)
        {
            foreach (ProjectItem item in project.Items)
                if (item is FileProjectItem)
                {
                    CustomNode node = new CustomNode
                    {
                        Name = Path.GetFileNameWithoutExtension(item.FileName)
                    };
                    node.AddTo(this);
                    break;
                }
        }
        /// <summary>
        /// přidání složky
        /// </summary>
        /// <param name="virtualName">virtuální název složky</param>
        /// <param name="relativeDirectoryPath">relativní cesta ke složce</param>
        /// <param name="directoryNodeList">seznam větví</param>
        public void AddParentFolder(string virtualName, string relativeDirectoryPath, Dictionary<string, DirectoryNode> directoryNodeList)
        {
            if ((relativeDirectoryPath.Length == 0)
                || (string.Compare(virtualName, 0, relativeDirectoryPath, 0, relativeDirectoryPath.Length, StringComparison.InvariantCultureIgnoreCase) == 0))
            {
                int pos = virtualName.IndexOf('/', relativeDirectoryPath.Length + 1);
                if (pos > 0)
                {
                    string subFolderName = virtualName.Substring(relativeDirectoryPath.Length, pos - relativeDirectoryPath.Length);
                    if (directoryNodeList.TryGetValue(subFolderName, out DirectoryNode node))
                    {
                        if (node.FileNodeStatus == FileNodeStatus.None)
                            node.FileNodeStatus = FileNodeStatus.InProject;
                    }
                    else
                    {
                        node = new DirectoryNode(Path.Combine(this.Directory, subFolderName), FileNodeStatus.Missing);
                        node.AddTo(this);
                        directoryNodeList[subFolderName] = node;
                    }
                }
            }
        }

        /// <summary>
        /// inicializace větve
        /// </summary>
        protected override void Initialize()
        {
            SetContext();
            TreeView.AfterSelect -= Tv_AfterSelect;

            this.Nodes.Clear();
            Dictionary<string, FileNode> fileNodeDictionary = new Dictionary<string, FileNode>((IEqualityComparer<string>)StringComparer.InvariantCultureIgnoreCase);
            Dictionary<string, DirectoryNode> directoryNodeList = new Dictionary<string, DirectoryNode>((IEqualityComparer<string>)StringComparer.InvariantCultureIgnoreCase);

            foreach (FileProjectItem item in this.Project.Items.OfType<FileProjectItem>())
            {
                string fName = item.FileName.Replace('\\', '/');

                if (fName.EndsWith("/", StringComparison.Ordinal))
                    fName = fName.Substring(0, fName.Length - 1);

                string fileName = Path.GetFileName(fName);

                if (item.ItemType == ItemType.Folder)
                {
                    DirectoryNode newDirectoryNode = DirectoryNodeFactory.CreateDirectoryNode(this, this.Project, fileName);
                    if (!System.IO.Directory.Exists(item.FileName))
                        newDirectoryNode.FileNodeStatus = FileNodeStatus.Missing;
                    newDirectoryNode.ProjectItem = item;
                    newDirectoryNode.AddTo(this);
                    directoryNodeList[fileName] = newDirectoryNode;
                }
                else if (item.ItemType == ItemType.Content && Path.GetExtension(item.FileName).Equals(".alf", StringComparison.OrdinalIgnoreCase))
                {
                    AlfFileNode fileNode = new AlfFileNode(item, AddIns.FileNodeStatus.InProject);
                    
                    if (!File.Exists(item.FileName))
                        fileNode.FileNodeStatus = FileNodeStatus.Missing;
                    fileNode.AddTo(this);
                    directoryNodeList[fileName] = fileNode;
                }
                else
                {
                    FileNode fileNode = new FileNode();
                    fileNode.Initialize(item.FileName);

                    if (!File.Exists(item.FileName))
                        fileNode.FileNodeStatus = FileNodeStatus.Missing;
                    fileNode.ProjectItem = item;
                    fileNodeDictionary[fileName] = fileNode;
                    fileNode.AddTo(this);
                }
            }

            // přidání souboru nalezeného v systému
            if (System.IO.Directory.Exists(this.Directory))
            {
                foreach (string subDirectory in System.IO.Directory.GetDirectories(this.Directory))
                {
                    string filename = Path.GetFileName(subDirectory);
                    if (filename != ".gfrm")
                    {
                        if (directoryNodeList.TryGetValue(filename, out DirectoryNode node))
                        {
                            if (node.FileNodeStatus == FileNodeStatus.None)
                                node.FileNodeStatus = FileNodeStatus.InProject;
                        }
                        else
                        {
                            node = DirectoryNodeFactory.CreateDirectoryNode(this, this.Project, subDirectory);
                            node.AddTo(this);
                        }
                    }
                }

                foreach (string fullpath in System.IO.Directory.GetFiles(this.Directory))
                {
                    string file = Path.GetFileName(fullpath);
                    if (fileNodeDictionary.TryGetValue(file, out FileNode node))
                    {
                        if (node.FileNodeStatus == FileNodeStatus.None)
                            node.FileNodeStatus = FileNodeStatus.InProject;
                    }
                    else
                    {
                        if (directoryNodeList.TryGetValue(file, out DirectoryNode dirNode))
                        {
                            if (dirNode.FileNodeStatus == FileNodeStatus.None)
                                dirNode.FileNodeStatus = FileNodeStatus.InProject;
                        }
                    }
                }
            }
            TreeView.AfterSelect += Tv_AfterSelect;
            TreeView.ExpandAll();
        }

        /// <summary>
        /// kopírování typového souboru
        /// </summary>
        /// <param name="fileName">název zdroje</param>
        /// <param name="copiedFileName">cílový název</param>
        internal override void CopyTypedFile(string fileName, string copiedFileName)
        {
            base.CopyTypedFile(fileName, copiedFileName);
            string ext = Path.GetExtension(fileName);
            if (ext.Equals(".alf", StringComparison.OrdinalIgnoreCase))
            {
                string oldArchName = Path.Combine(Path.GetDirectoryName(fileName), Path.GetFileNameWithoutExtension(fileName) + ".zip");
                if (File.Exists(oldArchName))
                {
                    string newArchName = Path.Combine(Path.GetDirectoryName(copiedFileName), Path.GetFileNameWithoutExtension(copiedFileName) + ".zip");
                    FileService.CopyFile(oldArchName, newArchName, false, true);
                }
            }
        }

        void Tv_AfterSelect(object sender, TreeViewEventArgs e)
        {
            LocalCommonService.SelectedObject = (sender as ExtTreeView).SelectedNode;
        }
    }
}
