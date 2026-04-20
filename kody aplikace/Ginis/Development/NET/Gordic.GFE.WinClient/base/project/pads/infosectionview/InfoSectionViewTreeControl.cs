//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.InfoSectionViewTreeControl.cs          </Name>
//    <Description> Výplň dokovatelného okna sekce INFO                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-07                                                  </Created>
//  </FileHeader>

using System.ComponentModel;
using System.Linq;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.Gui;
using Gordic.General;

namespace Gordic.GFE.WinClient.InfoSectionView
{
    /// <summary>Výplň dokovatelného okna sekce INFO</summary>
    class InfoSectionViewTreeControl : UserControl, IHasPropertyContainer
    {
        #region IHasPropertyContainer
        PropertyContainer propertyContainer = new PropertyContainer();
        /// <summary>
        /// kontainer s vlastnosti vybraných objektů
        /// </summary>
        public PropertyContainer PropertyContainer { get { return propertyContainer; } }
        #endregion

        private InfoSectionViewTree treeView;
        private IContainer components;

        /// <summary>
        /// Struktura dat
        /// </summary>
        public InfoSectionViewEntry InfoSection { get; set; }

        /// <exclude/>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                PropertyPad.PropertyValueChanged -= propertyValueChanged;
                if (components != null)
                {
                    components.Dispose();
                    components = null;
                }
            }
            base.Dispose(disposing);
        }
        /// <summary>
        /// Nastavení stromu info sekce
        /// </summary>
        /// <param name="infoSection">Sekce, dle které se vytváří strom</param>
        internal void SetSection(InfoSectionViewEntry infoSection)
        {
            PropertyPad.PropertyValueChanged -= propertyValueChanged;
            this.Controls.Clear();
            InfoSection = infoSection;

            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(InfoSectionViewTreeControl));
            this.treeView = new InfoSectionViewTree(infoSection);
            // 
            // tvTree
            // 
            this.treeView.AllowDrop = true;
            resources.ApplyResources(this.treeView, "treeView");
            this.treeView.Name = "treeView";
            this.treeView.ShowNodeToolTips = true;
            this.treeView.BeforeSelect += TreeViewBeforeSelect;
            this.Controls.Add(this.treeView);
            PropertyPad.PropertyValueChanged += propertyValueChanged;
        }

        void propertyValueChanged(object s, PropertyValueChangedEventArgs e)
        {
            if (treeView != null)
            {
                var davc = SimpleDesktop.Desktop.ActiveViewContent as IInfoSectionHost;
                if (davc != null)
                    davc.OnInfoPropertyChanged(this, AddingNewEventArgs.Empty);
            }
        }

        void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(InfoSectionViewTreeControl));
            Gordic.GFE.Parsers.AddIns.ExtTreeViewComparer extTreeViewComparer1 = new Gordic.GFE.Parsers.AddIns.ExtTreeViewComparer();
            this.SuspendLayout();
            treeView = new InfoSectionViewTree(null);
            // 
            // treeView
            // 
            this.treeView.AllowDrop = true;
            this.treeView.CanClearSelection = true;
            resources.ApplyResources(this.treeView, "treeView");
            this.treeView.DrawMode = System.Windows.Forms.TreeViewDrawMode.OwnerDrawText;
            this.treeView.HideSelection = false;
            this.treeView.InfoSection = null;
            this.treeView.IsSorted = false;
            this.treeView.Name = "treeView";
            this.treeView.NodeSorter = extTreeViewComparer1;
            this.treeView.ShowNodeToolTips = true;
            // 
            // InfoSectionViewTreeControl
            // 
            resources.ApplyResources(this, "$this");
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.treeView);
            this.Name = "InfoSectionViewTreeControl";
            this.ResumeLayout(false);

        }
        void TreeViewBeforeSelect(object sender, TreeViewCancelEventArgs e)
        {
            if (e.Node is ISExtNode)
                propertyContainer.SelectedObject = (e.Node as ISExtNode).Parametr;
        }

        /// <summary>
        /// odstranění aktuálního atributu
        /// </summary>
        /// <returns>TRUE - byly provedeny změny v seznamu atributů</returns>
        internal bool RemoveActiveAttribute()
        {
            bool result = false;
            if (!treeView.Enabled)
                MessageService.ShowInformation(GResources.GetResourceText(29450342)); //RC 29450342 : Příkaz odstranění atributu není dostupný!
            else if (treeView != null && treeView.SelectedNode != null)
            {
                if (treeView.SelectedNode is ISExtNode && InfoSection != null)
                    result = InfoSection.AttrList.Remove((treeView.SelectedNode as ISExtNode).Parametr.Key);

                treeView.Nodes.Remove(treeView.SelectedNode);
            }
            return result;
        }

        /// <summary>
        /// vytvoření nového atributu
        /// </summary>
        /// <returns>TRUE - změny v seznamu byly provedené</returns>
        internal bool AddAttribute()
        {
            if (!treeView.Enabled)
                MessageService.ShowInformation(GResources.GetResourceText(29450344)); //RC 29450344 : Příkaz vytvoření atributu není dostupný!
            else if (treeView != null)
            {
                string name = NamedService.CreateUniqueName(InfoSection.AttrList);
                if (InfoSection != null)
                    InfoSection.AttrList.Add(name, string.Empty);

                SetSection(InfoSection);

                TreeNode[] nodes = treeView.Nodes.Find(name, true);
                if (nodes != null && nodes.Length != 0)
                    treeView.SelectedNode = nodes.Last();
                return true;
            }
            return false;
        }
    }
}
