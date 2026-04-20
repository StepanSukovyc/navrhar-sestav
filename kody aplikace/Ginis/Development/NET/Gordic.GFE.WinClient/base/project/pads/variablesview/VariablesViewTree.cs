//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.VariablesViewTree.cs                   </Name>
//    <Description> třída zobrazení proměnných GRR regionu                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-05-03                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Core.WinForm;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.Editor;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;
using Gordic.General;

namespace Gordic.GFE.WinClient.VariablesView
{
    /// <summary>
    /// třída zobrazení proměnných GRR regionu
    /// </summary>
    class VariablesViewTree : ExtTreeView
    {
        /// <summary>
        /// volá se po výběru položky
        /// </summary>
        public event TreeViewEventHandler ItemSelected;

        readonly string contextmenuAddinTreePath = "/Pad/VariablesView/ContextMenu";
        /// <summary>
        /// region objektu
        /// </summary>
        public IGRRLabel Label { get; set; }

        /// <summary>
        /// Prázdný konstruktor třídy
        /// </summary>
        private VariablesViewTree()
        {
            Label = null;
            IsSorted = false;
            Initialize();
        }

        /// <summary>
        /// Vytvoření nové instance třídy dle datové struktury
        /// </summary>
        /// <param name="region">Datová struktura</param>
        public VariablesViewTree(IGRRLabel region)
            : this()
        {
            Label = region;
            Initialize(region);
        }

        VarExtNode rootItem;
        void Initialize(IGRRLabel label)
        {
            // Vytvoříme hlavní větev
            if (label == null)
                rootItem = new VarExtNode(null);
            else 
                rootItem = new VarExtNode(label is GrrRegion ? label as GrrRegion : label.ParentLabel as GrrRegion, null);

            rootItem.ExpandAll();
            // přidáme hlavní větev do stromu
            Nodes.Clear();
            Nodes.Add(rootItem);
            rootItem.Expand();
        }
        void Initialize()
        {
            AllowDrop = true;
            ImageService.SetStructureExplorerImageList(this);

            ContextMenuStrip strip = MenuService.CreateContextMenu(this, new EventArgsContextMenu(contextmenuAddinTreePath));
            if (strip != null)
                ContextMenuStrip = strip;
            ShowNodeToolTips = true;
            this.ItemDrag += StructureViewTreeItemDrag;
        }
        void StructureViewTreeItemDrag(object sender, ItemDragEventArgs e)
        {
            LocalCommonService.DropInitialized = true;
            LocalCommonService.DraggedObject = e.Item;
            DoDragDrop(e.Item, DragDropEffects.Copy);
        }

        /// <summary>
        /// před tím, než se položka označí jako vybraná
        /// </summary>
        /// <param name="e">parametry výběru</param>
        protected override void OnBeforeSelect(TreeViewCancelEventArgs e)
        {
            if (e.Node is ExtTreeNode node)
            {
                ContextMenuStrip strip = MenuService.CreateContextMenu(e.Node, new EventArgsContextMenu(node.ContextmenuAddinTreePath));
                if (strip != null)
                    node.ContextMenuStrip = strip;
            }
        }
        /// <summary>
        /// zobrazíme obsah položky
        /// </summary>
        /// <param name="e"></param>
        protected override void OnAfterSelect(TreeViewEventArgs e)
        {
            base.OnAfterSelect(e);
            ItemSelected?.Invoke(this, e);
        }
        /// <summary>
        /// zobarazení editačního okna
        /// </summary>
        /// <param name="e"></param>
        protected override void OnDoubleClick(EventArgs e)
        {
            base.OnDoubleClick(e);
            if (SelectedNode is VarExtNode)
            {
                if (!(SelectedNode as VarExtNode).IsRoot)
                {
                    CustomDialog cd = new CustomDialog(AddInTree.GetTreeNode("/Pad/VariablesView/Dialogs"));
                    cd.SetTag((SelectedNode as VarExtNode).Variable);
                    if (cd.ShowDialog() == DialogResult.OK)
                        if (cd.Tag != null && cd.Tag is IVariable)
                            if (string.IsNullOrEmpty((cd.Tag as IVariable).Name))
                                MessageService.ShowWarning(GResources.GetResourceText(29450396)); //RC 29450396 : Název proměnné musí být daný!
                            else
                                using (UndoRedoService.StartTransaction(GResources.GetResourceText(29450398))) //RC 29450398 : úprava proměnné
                                {
                                    (SelectedNode as VarExtNode).Variable.Name = (cd.Tag as IVariable).Name;
                                    (SelectedNode as VarExtNode).Variable.ValueScript = (cd.Tag as IVariable).ValueScript;
                                    UndoRedoService.Commit();
                                }
                }
            }
        }

        /// <summary>
        /// aktualizace položek
        /// </summary>
        internal void RefreshItems()
        {
            if (Label != null)
            {
                int index = SelectedNode != null ? SelectedNode.Index : -1;
                Initialize(Label);
                if (Nodes.Count != 0 && index != -1)
                    if (index < Nodes[0].Nodes.Count)
                        SelectedNode = Nodes[0].Nodes[index];
                    else
                        SelectedNode = Nodes[0];
            }
        }
    }
}
