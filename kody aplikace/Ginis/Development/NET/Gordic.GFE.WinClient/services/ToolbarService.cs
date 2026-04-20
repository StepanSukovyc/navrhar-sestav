//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ToolbarService.cs                        </Name>
//    <Description> Služba pro práci s Nástrojovou lištou                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Core.WinForm;
using Gordic.GFE.Parsers.Gui;
using Gordic.General;

namespace Gordic.GFE.WinClient.Services
{
    /// <summary>
    /// Služba pro práci s Nástrojovou lištou
    /// </summary>
    static class ToolbarService
    {
        /// <summary>
        /// Podpora třídění informačních jednotek s použitím InsertBefore/InsertAfter
        /// </summary>
        sealed class TopologicalSort
        {
            List<KeyValuePair<string, AddInTreeNode>> nodes;
            bool[] visited;
            List<KeyValuePair<string, AddInTreeNode>> sortedEntities;
            Dictionary<string, int> indexOfName;
            
            /// <summary>
            /// vytvoření nové instance třídys
            /// </summary>
            /// <param name="nodes"></param>
            public TopologicalSort(List<KeyValuePair<string, AddInTreeNode>> nodes)
            {
                this.nodes = nodes;
                visited = new bool[nodes.Count];
                sortedEntities = new List<KeyValuePair<string, AddInTreeNode>>(nodes.Count);
                indexOfName = new Dictionary<string, int>(nodes.Count);

                for (int i = 0; i < nodes.Count; ++i)
                {
                    visited[i] = false;
                    indexOfName[nodes[i].Value.Name] = i;
                }
            }
            /// <summary>
            /// Spuštění třídění
            /// </summary>
            /// <returns></returns>
            public List<KeyValuePair<string, AddInTreeNode>> Execute()
            {
                // spuštění všech informačních jednotek
                for (int i = 0; i < nodes.Count; ++i)
                    visit(i);

                return sortedEntities;
            }

            void visit(int entityIndex)
            {
                if (visited[entityIndex])
                    return;

                string[] after = !string.IsNullOrEmpty(nodes[entityIndex].Value.InsertAfter) ?
                    nodes[entityIndex].Value.InsertAfter.Split(new char[] { ',' }) : null;

                if (after != null)
                    foreach (string s in after)
                    {
                        if (string.IsNullOrEmpty(s))
                            continue;

                        if (indexOfName.ContainsKey(s))
                            visit(indexOfName[s]);
                    }

                sortedEntities.Add(nodes[entityIndex]);
                visited[entityIndex] = true;
            }
        }

        /// <summary>
        /// Vytvoření položek ToolBar
        /// </summary>
        /// <param name="path">Cesta k popisu položek</param>
        /// <param name="owner">Vlastník</param>
        /// <param name="throwOnNotFound">Indikuje, že je zapotřebí vyhodit chybu v případě nenalezení položky</param>
        /// <returns></returns>
        public static ToolStripItem[] CreateToolStripItems(string path, object owner, bool throwOnNotFound)
        {
            return CreateToolStripItems(owner, AddInTree.GetTreeNode(path, throwOnNotFound));
        }

        /// <summary>
        /// Vytvoření položek ToolBar
        /// </summary>
        /// <param name="owner">Vlastník</param>
        /// <param name="treeNode">Větev konfiguračního stromu</param>
        /// <returns></returns>
        public static ToolStripItem[] CreateToolStripItems(object owner, AddInTreeNode treeNode)
        {
            if (treeNode == null)
                return new ToolStripItem[0];
            List<ToolStripItem> collection = new List<ToolStripItem>();
            foreach (ToolbarItemDescriptor descriptor in treeNode.BuildChildItems<ToolbarItemDescriptor>(owner))
            {
                object item = CreateToolbarItemFromDescriptor(descriptor);
                if (item is ToolStripItem)
                    collection.Add((ToolStripItem)item);
                else
                {
                    ISubmenuBuilder submenuBuilder = (ISubmenuBuilder)item;
                    collection.AddRange(submenuBuilder.BuildSubmenu(null, owner));
                }
            }

            return collection.ToArray();
        }

        static object CreateToolbarItemFromDescriptor(ToolbarItemDescriptor descriptor)
        {
            Entity entity = descriptor.Entity;
            object caller = descriptor.Caller;
            string type = entity.Properties.Contains("type") ? entity.Properties["type"] : "Item";

            bool createCommand = entity.Properties["loadclasslazy"] == "false";

            switch (type)
            {
                case "Separator":
                    var tbs = new ToolBarSeparator(entity, caller);
                    tbs.Initialize();
                    return tbs;
                case "CheckBox":
                    var tbcb = new ToolBarCheckBox(entity, caller);
                    tbcb.Initialize();
                    return tbcb;
                case "Item":
                    var tbc_0 = new ToolBarCommand(entity, caller);
                    tbc_0.Initialize(createCommand);
                    return tbc_0;
                case "DragDropButton":
                    var tbddb_0 = new ToolBarDragDropButton(entity, caller, ConvertToCustomItem(descriptor.SubItems));
                    tbddb_0.Initialize();
                    return tbddb_0;
                case "ComboBox":
                    var tbc = new ToolBarComboBox(entity, caller);
                    tbc.Initialize(ConvertToCustomItem(descriptor.SubItems));
                    return tbc;
                case "TextBox":
                    var tbtb = new ToolBarTextBox(entity, caller);
                    tbtb.Initialize();
                    return tbtb;
                case "Label":
                    var tbl = new ToolBarLabel(entity, caller);
                    tbl.Initialize();
                    return tbl;
                case "DropDownButton":
                    var tbddb = new ToolBarDropDownButton(entity, caller, MenuService.ConvertSubItems(descriptor.SubItems));
                    tbddb.Initialize();
                    return tbddb;
                case "SplitButton":
                    var tbsb = new ToolBarSplitButton(entity, caller, MenuService.ConvertSubItems(descriptor.SubItems));
                    tbsb.Initialize();
                    return tbsb;
                case "Builder":
                    return entity.AddIn.CreateObject(entity.Properties["class"]);
                default:
                    throw new System.NotSupportedException(string.Format(GResources.GetResourceText(29450587) + ": '{0}'", type)); //RC 29450587 : Nepodporovaná položka menu typu
            }
        }
        static object ConvertToCustomItem(IList items)
        {
            return items != null && items.Count > 0 ? items[0] : null;
        }

        /// <summary>
        /// Vytvoření ToolStripu
        /// </summary>
        /// <param name="owner">Vlastník</param>
        /// <param name="treeNode">Větev konfiguračního stromu</param>
        /// <returns></returns>
        public static ToolStrip CreateToolStrip(object owner, AddInTreeNode treeNode)
        {
            ToolStrip toolStrip = new ToolStrip();
            toolStrip.Name = treeNode.Name;
            toolStrip.Items.AddRange(CreateToolStripItems(owner, treeNode));
            UpdateToolbar(toolStrip);
            return toolStrip;
        }

        /// <summary>
        /// Vytvoření ToolStripu
        /// </summary>
        /// <param name="owner">Vlastník</param>
        /// <param name="addInTreePath">Cesta k popisu</param>
        /// <returns></returns>
        public static ToolStrip CreateToolStrip(object owner, string addInTreePath)
        {
            return CreateToolStrip(owner, AddInTree.GetTreeNode(addInTreePath));
        }

        /// <summary>
        /// Vytvoření nástrojové lišty
        /// </summary>
        /// <param name="owner">Vlastník</param>
        /// <param name="addInTreePath">Cesta</param>
        /// <returns></returns>
        public static ToolStrip[] CreateToolbars(object owner, string addInTreePath)
        {
            AddInTreeNode treeNode;
            try { treeNode = AddInTree.GetTreeNode(addInTreePath); }
            catch (TreePathNotFoundException) { return null; }

            List<KeyValuePair<string, AddInTreeNode>> nodes = (new TopologicalSort(treeNode.ChildNodes.ToList())).Execute();

            List<ToolStrip> toolBars = new List<ToolStrip>();
            foreach (KeyValuePair<string, AddInTreeNode> item in nodes)
                toolBars.Add(CreateToolStrip(owner, item.Value));

            return toolBars.ToArray();
        }

        /// <summary>
        /// Vytvoření nástrojové lišty
        /// </summary>
        /// <param name="owner">Vlastník</param>
        /// <param name="addInTreePath">Cesta</param>
        /// <returns></returns>
        public static ToolStripItem[] CreateToolbarItems(object owner, string addInTreePath)
        {
            AddInTreeNode treeNode;
            try { treeNode = AddInTree.GetTreeNode(addInTreePath); }
            catch (TreePathNotFoundException) { return null; }

            return (CreateToolStripItems(owner, treeNode)).ToArray();
        }
        /// <summary>
        /// Aktualizace toolbaru
        /// </summary>
        /// <param name="toolStrip">Pruh menu</param>
        public static void UpdateToolbar(ToolStrip toolStrip)
        {
            bool visible = false;
            toolStrip.SuspendLayout();
            foreach (ToolStripItem item in toolStrip.Items)
                if (item is IStatusUpdate)
                {
                    ((IStatusUpdate)item).UpdateStatus();
                    if (((IStatusUpdate)item).InternVisible)
                        visible = true;
                }

            if (!visible && toolStrip.Visible)
                toolStrip.Hide();
            else if (visible && !toolStrip.Visible)
                toolStrip.Show();

            toolStrip.ResumeLayout();
        }
        /// <summary>
        /// Aktualizace textu nástrojové lišty
        /// </summary>
        /// <param name="toolStrip">Pruh menu</param>
        public static void UpdateToolbarText(ToolStrip toolStrip)
        {
            toolStrip.SuspendLayout();
            foreach (ToolStripItem item in toolStrip.Items)
                if (item is IStatusUpdate)
                    ((IStatusUpdate)item).UpdateText();

            toolStrip.ResumeLayout();
        }

        /// <summary>
        /// Vložení položek konfiguračního stromu do dané kolekce
        /// </summary>
        /// <param name="toolStripItemCollection">Daná kolekce</param>
        /// <param name="owner">Vlastnik položek</param>
        /// <param name="path">Cesta v konfiguračním stromě</param>
        internal static void AddItemsToBar(ToolStripItemCollection toolStripItemCollection, object owner, string path)
        {
            toolStripItemCollection.AddRange(ToolbarService.CreateToolbarItems(owner, path));
        }
    }
}
