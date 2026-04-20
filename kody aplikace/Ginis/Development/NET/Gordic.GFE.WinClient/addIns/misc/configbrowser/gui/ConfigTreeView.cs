//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ConfigTreeView.cs                      </Name>
//    <Description> Strom konfiguračních souborů aplikace                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-08                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.General;

namespace Gordic.GFE.WinClient.ConfigBrowser
{
    /// <summary>
    /// Strom konfiguračních souborů aplikace.
    /// </summary>
    public class ConfigTreeView : Panel
	{
        /// <summary>
        /// konfigurační strom
        /// </summary>
		public TreeView treeView = new TreeView();
		/// <summary>
		/// Konstruktor třídy
		/// </summary>
		public ConfigTreeView()
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
			TreeNode rootNode = new TreeNode(GResources.GetResourceText(29450239)); //RC 29450239 : Konfigurace
			rootNode.ImageIndex = rootNode.SelectedImageIndex = 0;
			rootNode.Expand();
			
			treeView.Nodes.Add(rootNode);
			
			for (int i = 0; i < AddInTree.AddIns.Count; i++) {
                TreeNode newNode = new TreeNode(AddInTree.AddIns[i].Properties["name"])
                {
                    ImageIndex = 1,
                    SelectedImageIndex = 2,
                    Tag = AddInTree.AddIns[i]
                };
                GetExtensions(AddInTree.AddIns[i], newNode);
				rootNode.Nodes.Add(newNode);
			}
		}

        void GetExtensions(AddIn ai, TreeNode treeNode)
        {
            if (!ai.Enabled) return;

            foreach (ExtensionPath ext in ai.Paths.Values)
            {
                TreeNode newNode = new TreeNode(ext.Name)
                {
                    ImageIndex = 3,
                    SelectedImageIndex = 4,
                    Tag = ext
                };
                treeNode.Nodes.Add(newNode);
            }
        }
	}
}
