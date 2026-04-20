//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GTreeControl.cs                        </Name>
//    <Description> Výplò dokovatelného okna                                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                             </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025                  </Copyright>
//    <Created>     2009-06-15                                                  </Created>
//  </FileHeader>


using System;
using System.Linq;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.AddIns;

namespace Gordic.GFE.WinClient.StructureView
{
    /// <summary>Výplò dokovatelného okna</summary>
    class StructureViewTreeControl : UserControl, IHasPropertyContainer
    {
        #region IHasPropertyContainer
        PropertyContainer propertyContainer = new PropertyContainer();
        /// <summary>
        /// kontainer s vlastnosti vybraných objektù
        /// </summary>
        public PropertyContainer PropertyContainer { get { return propertyContainer; } }
        #endregion

        /// <summary>Kontejner pro komponenty</summary>
        /// <summary>
        /// Strom položek
        /// </summary>
        TreeView treeView;
        /// <summary>
        /// Volá se po zmìnì struktury
        /// </summary>
        public event EventHandler StructureChange;

        GFEStructure structure;
        /// <summary>
        /// Struktura dat
        /// </summary>
        public GFEStructure Structure
        {
            get { return structure; }
            set
            {
                structure = value;
                OnStructureChange();
            }
        }

        OpenedFile fileStructure;
        /// <summary>
        /// Soubor struktury dat
        /// </summary>
        public OpenedFile FileStructure
        {
            get { return fileStructure; }
            set
            {
                if (fileStructure != value)
                {
                    fileStructure = value;
                    try { SetStructure(GFEStructure.LoadFromFile(fileStructure.FileName)); }
                    catch { SetStructure(null); }
                }
            }
        }

        /// <summary>Konstruktor tøídy</summary>
        public StructureViewTreeControl()
        {
            InitializeComponent();
        }

        /// <summary>
        /// Nastavení strimu struktury dat
        /// </summary>
        /// <param name="structure">Struktura, dle které se vytváøí strom</param>
        internal void SetStructure(GFEStructure structure)
        {
            this.Controls.Clear();
            Structure = structure;
            if (structure != null)
            {
                GFERegion reg = structure.Root.Children.FirstOrNull(itm => itm is GFERegion);
                if (reg != null)
                    StringParser.Properties["Struct_RootRegName"] = reg.Name;
                else
                    StringParser.Properties.Remove("Struct_RootRegName");
            }
            else
                StringParser.Properties.Remove("Struct_RootRegName");

            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(StructureViewTreeControl));
            this.treeView = new StructureViewTree(structure)
            {
                // 
                // tvTree
                // 
                AllowDrop = true
            };
            resources.ApplyResources(this.treeView, "tvTree");
            this.treeView.Name = "tvTree";
            this.treeView.ShowNodeToolTips = true;
            this.treeView.BeforeSelect += TreeViewBeforeSelect;
            this.Controls.Add(this.treeView);
        }

        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this method with the code editor.
        /// </summary>
        void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(StructureViewTreeControl));
            this.SuspendLayout();
            this.treeView = new StructureViewTree(null);
            // 
            // tvTree
            // 
            resources.ApplyResources(this.treeView, "tvTree");
            this.treeView.Name = "tvTree";
            this.Controls.Add(this.treeView);
            // 
            // StructureView
            // 
            resources.ApplyResources(this, "$this");
            //this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Name = "StructureView";
            this.ResumeLayout(false);

        }
        void TreeViewBeforeSelect(object sender, TreeViewCancelEventArgs e)
        {
            if (e.Node is StructExtNode)
                propertyContainer.SelectedObject = (e.Node as StructExtNode).Tag;
        }
        void OnStructureChange()
        {
            StructureChange?.Invoke(this, EventArgs.Empty);
        }

        /// <summary>
        /// získání vìtve vnoøeného objektu
        /// </summary>
        /// <param name="regName">název hledaného objektu</param>
        /// <returns></returns>
        internal System.Windows.Forms.TreeNode[] GetNode(string regName)
        {
            return treeView.Nodes.Find(regName, true);
        }

        /// <summary>
        /// nastavení vybrané vìtve
        /// </summary>
        /// <param name="fullPath">úplná cesta k vìtve</param>
        /// <param name="position">pozice pøípadné podvìtve</param>
        internal void SelectNode(string fullPath, int position)
        {
            try
            {
                TreeNode[] nodes = treeView.Nodes.Find(fullPath.Split('.').Last(), true);
                if (nodes.Length != 0)
                    treeView.SelectedNode = position < 0 ? nodes.First() : nodes.First().Nodes[position];
            }
            catch (Exception ex) { LoggingService.Error(ex); }
        }

        internal void FilterStructure(string filtertext)
        {
            if (this.treeView != null)
                (this.treeView as ExtTreeView).Filter(filtertext);
        }
    }
}
