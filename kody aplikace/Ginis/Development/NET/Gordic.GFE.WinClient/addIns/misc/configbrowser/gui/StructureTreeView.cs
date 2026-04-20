//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.StructureTreeView.cs                      </Name>
//    <Description> Strom struktury aplikace                                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-08                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.WinClient.ConfigBrowser
{
    /// <summary>
    /// Strom struktury aplikace
    /// </summary>
    class StructureTreeView : Panel
    {
        /// <summary>
        /// Strom konfigurace
        /// </summary>
        public TreeView treeView = new TreeView();
        /// <summary>
        /// Konstruktor tøídy
        /// </summary>
        public StructureTreeView()
        {
            PopulateTreeView();

            treeView.ImageList = new ImageList
            {
                ColorDepth = ColorDepth.Depth32Bit
            };
            treeView.ImageList.Images.Add(IconService.GetBitmap("Icons.16x16.Class"));
            treeView.ImageList.Images.Add(IconService.GetBitmap("Icons.16x16.Assembly"));
            treeView.ImageList.Images.Add(IconService.GetBitmap("Icons.16x16.OpenAssembly"));
            treeView.ImageList.Images.Add(IconService.GetBitmap("Icons.16x16.ClosedFolderBitmap"));
            treeView.ImageList.Images.Add(IconService.GetBitmap("Icons.16x16.OpenFolderBitmap"));

            treeView.Dock = DockStyle.Fill;
            Controls.Add(treeView);
        }

        void PopulateTreeView()
        {
            TreeNode rootNode = new TreeNode(Gordic.General.GResources.GetResourceText(29450246)); //RC 29450246 : Struktura
            rootNode.ImageIndex = rootNode.SelectedImageIndex = 0;
            rootNode.Expand();

            treeView.Nodes.Add(rootNode);

            for (int i = 0; i < AddInTree.AddIns.Count; i++)
                GetExtensions(AddInTree.AddIns[i], rootNode);
        }

        void GetExtensions(AddIn ai, TreeNode treeNode)
        {
            foreach (ExtensionPath ext in ai.Paths.Values)
            {
                string[] name = ext.Name.Split('/');
                TreeNode currentNode = treeNode;
                if (name.Length < 1)
                    continue;
                for (int i = 1; i < name.Length; ++i)
                {
                    bool found = false;
                    foreach (TreeNode n in currentNode.Nodes)
                        if (n.Text == name[i])
                        {
                            currentNode = n;
                            found = true;
                            break;
                        }
                    if (found)
                    {
                        if (i == name.Length - 1 && currentNode.Tag == null)
                            currentNode.Tag = ext;
                    }
                    else
                    {
                        TreeNode newNode = new TreeNode(name[i])
                        {
                            ImageIndex = 3,
                            SelectedImageIndex = 4
                        };
                        if (i == name.Length - 1)
                            newNode.Tag = ext;
                        currentNode.Nodes.Add(newNode);
                        currentNode = newNode;
                    }
                }
            }
        }
    }
}
