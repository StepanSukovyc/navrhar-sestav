//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.VariablesViewTreeControl.cs            </Name>
//    <Description> Výplň dokovatelného okna vlastnosti                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-05-03                                                  </Created>
//  </FileHeader>

using System.ComponentModel;
using System.Drawing;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.WinClient.Editor;
using System;

namespace Gordic.GFE.WinClient.VariablesView
{
    /// <summary>
    /// Výplň dokovatelného okna vlastnosti 
    /// </summary>
    class VariablesViewTreeControl : UserControl, IHasPropertyContainer
    {
        #region IHasPropertyContainer
        PropertyContainer propertyContainer = new PropertyContainer();
        /// <summary>
        /// kontainer s vlastnosti vybraných objektů
        /// </summary>
        public PropertyContainer PropertyContainer { get { return propertyContainer; } }
        #endregion

        /// <summary>
        /// volá se po výběru položky
        /// </summary>
        public event TreeViewEventHandler ItemSelected;
        /// <summary>
        /// strom ovladače
        /// </summary>
        public VariablesViewTree Tree { get { return treeView; } }

        /// <summary>Kontejner pro komponenty</summary>
        IContainer components = null;
        VariablesViewTree treeView;

        /// <summary>Konstruktor třídy</summary>
        public VariablesViewTreeControl()
        {
            InitializeComponent();
        }

        /// <summary>uvolnění zdrojů</summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
                components.Dispose();
            base.Dispose(disposing);
        }

        GrrRegion region { get; set;}

        /// <summary>
        /// Nastavení strimu struktury dat
        /// </summary>
        /// <param name="label">Struktura, dle které se vytváří strom</param>
        internal void SetVariables(IGRRLabel label)
        {
            if (region == null
                || ((label is GrrRegion) && label != region)
                || ((label is GrrGroup) && (label as GrrGroup).ParentLabel != region)
                )
            {
                if (label is GrrRegion)
                    region = label as GrrRegion;
                else if (label is GrrGroup)
                    region = (label as GrrGroup).ParentLabel as GrrRegion;

                this.Controls.Clear();

                System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(VariablesViewTreeControl));
                this.treeView = new VariablesViewTree(label);
                // 
                // tvTree
                // 
                this.treeView.AllowDrop = true;
                resources.ApplyResources(this.treeView, "treeView");
                this.treeView.Name = "treeView";
                this.treeView.ShowNodeToolTips = true;
                this.treeView.BeforeSelect += TreeViewBeforeSelect;
                this.treeView.ItemSelected += treeViewItemSelected;
                this.treeView.MouseDown += new System.Windows.Forms.MouseEventHandler(this.TreeMouseDown);
                this.Controls.Add(this.treeView);
                OnNodesChanged();
            }
        }

        /// <summary>
        /// po změně větví
        /// </summary>
        public event EventHandler NodesChanged;

        void treeViewItemSelected(object sender, TreeViewEventArgs e)
        {
            if (ItemSelected != null)
                ItemSelected(sender, e);
        }
        void TreeMouseDown(object sender, MouseEventArgs e)
        {
            treeView.SelectedNode = treeView.GetNodeAt(new Point(e.X, e.Y));
        }
        void OnNodesChanged()
        {
            if (NodesChanged != null)
                NodesChanged(this, EventArgs.Empty);
        }
        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this method with the code editor.
        /// </summary>
        void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(VariablesViewTreeControl));
            this.SuspendLayout();
            this.treeView = new VariablesViewTree(null);
            // 
            // treeView
            // 
            resources.ApplyResources(this.treeView, "treeView");
            this.treeView.Name = "treeView";
            this.Controls.Add(this.treeView);
            // 
            // VariablesViewTreeControl
            // 
            resources.ApplyResources(this, "$this");
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Name = "VariablesViewTreeControl";
            this.ResumeLayout(false);
        }
        void TreeViewBeforeSelect(object sender, TreeViewCancelEventArgs e)
        {
            VarExtNode node = e.Node as VarExtNode;
            if (node == null)
                return;
            propertyContainer.SelectedObject = node.Tag;
        }
        /// <summary>
        /// aktualizace položek seznamu stromu
        /// </summary>
        internal void RefreshItems()
        {
            if (treeView != null)
                treeView.RefreshItems();
        }
    }
}
