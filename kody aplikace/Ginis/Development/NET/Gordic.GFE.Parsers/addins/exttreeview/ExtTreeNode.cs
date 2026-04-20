//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ExtTreeNode.cs                         </Name>
//    <Description> Vlastní větev                                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-09                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Windows.Forms;
using System.Drawing;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Core;
using System.Runtime.InteropServices;
using System.Runtime.Serialization;

namespace Gordic.GFE.Parsers.AddIns
{
    /// <summary>
    /// Vlastní větev stromu <see cref="ExtTreeView"/>
    /// </summary>
    [ComVisible(false)]
    [Serializable]
    public class ExtTreeNode : TreeNode, IDisposable, IClipboardHandler
    {
        #region IDispose
        /// <summary>
        /// Uvolnění větve
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        /// <summary>
        /// uvolnění objektu
        /// </summary>
        /// <param name="disposing">indikátor uvolnění</param>
        protected virtual void Dispose(bool disposing)
        {
            foreach (TreeNode node in Nodes)
                if (node is IDisposable)
                    ((ExtTreeNode)node).Dispose();

        }
        /// <summary>
        /// finalízer objektu
        /// </summary>
        ~ExtTreeNode() { Dispose(false); }
        #endregion

        #region ISerializable
        /// <summary>
        /// Initializes a new instance of the ExtTreeNode class using the
        /// specified serialization information and context.
        /// </summary>
        /// <param name="serializationInfo"></param>
        /// <param name="context"></param>
        protected ExtTreeNode(SerializationInfo serializationInfo, StreamingContext context) : base(serializationInfo, context) { }
        /// <summary>
        /// prázdný konstruktor třídy
        /// </summary>
        public ExtTreeNode() { }
        #endregion

        /// <summary>
        /// cesta k vázanému souboru větve
        /// </summary>
        public virtual string LinkedFileName { get { return this.TreeView is ExtTreeView ? (TreeView as ExtTreeView).LinkedFileName : null; } }

        /// <summary>
        /// Větev je inicializovaná
        /// </summary>
        protected bool isInitialized;
        string image;

        /// <summary>
        /// Indikuje dokončenou inicializací větve
        /// </summary>
        internal bool IsInitialized { get { return isInitialized; } }

        /// <summary>
        /// Cesta k popisu kontextového menu pro danou větev
        /// </summary>
        public virtual string ContextmenuAddinTreePath { get; set; }

        /// <summary>
        /// Ikonka větve
        /// </summary>
        /// <param name="iconName">Název ikonky</param>
        public void SetIcon(string iconName)
        {
            if (string.IsNullOrEmpty(iconName))
                return;
            this.image = iconName;

            if (TreeView is ExtTreeView tree)
            {
                int index = tree.GetImageIndexForImage(iconName, DoPerformCut);
                if (ImageIndex != index)
                    ImageIndex = SelectedImageIndex = index;
            }
        }

        TreeNode internalParent;
        /// <summary>
        /// Nadřazená větev
        /// </summary>
        public new TreeNode Parent { get { return internalParent; } }
        /// <summary>
        /// Přidání dané větve do uvedené
        /// </summary>
        /// <param name="node">Větev, do které se přidává</param>
        public void AddTo(TreeNode node)
        {
            internalParent = node;
            AddTo(node.Nodes);
            PerformInitialization();
        }
        /// <summary>
        /// Přidání do nového pohledu
        /// </summary>
        /// <param name="view">pohled, do kterého se přidává</param>
        public void AddTo(TreeView view)
        {
            internalParent = null;
            AddTo(view.Nodes);
            PerformInitialization();
        }
        /// <summary>
        /// Vložení větve do jiné na uvedenou pozici
        /// </summary>
        /// <param name="index">Pozice</param>
        /// <param name="parentNode">Větev do které se přidává</param>
        public void Insert(int index, TreeNode parentNode)
        {
            internalParent = parentNode;
            parentNode.Nodes.Insert(index, this);
            PerformInitialization();
            Refresh();
        }

        /// <summary>
        /// Vložení větve do jiného pohledu na uvedenou pozici
        /// </summary>
        /// <param name="index">Pozice na kterou se vkládá</param>
        /// <param name="view">Pohled do kterého se vkládá</param>
        public void Insert(int index, TreeView view)
        {
            internalParent = null;
            view.Nodes.Insert(index, this);
            PerformInitialization();
            Refresh();
        }

        void AddTo(TreeNodeCollection nodes)
        {
            nodes.Add(this);
            PerformInitialization();
            Refresh();
        }

        /// <summary>
        /// Inicializace větve
        /// </summary>
        protected virtual void Initialize() { }

        /// <summary>
        /// Inicializace větve
        /// </summary>
        public TreeNode PerformInitialization()
        {
            if (!isInitialized)
            {
                Initialize();
                isInitialized = true;
            }
            return this;
        }

        /// <summary>
        /// Expandování větve
        /// </summary>
        public virtual void Expanding()
        {
            PerformInitialization();
        }

        /// <summary>
        /// Skrytí větve
        /// </summary>
        public virtual void Collapsing() { }

        /// <summary>
        /// Aktivace větve
        /// </summary>
        public virtual void ActivateItem()
        {
            this.Toggle();
        }

        /// <summary>
        /// Změna vybraností větve
        /// </summary>
        public virtual void CheckedChanged() { }

        /// <summary>
        /// Aktualizace větve
        /// </summary>
        public virtual void Refresh()
        {
            SetIcon(image);
            foreach (TreeNode node in Nodes)
                if (node is ExtTreeNode)
                    ((ExtTreeNode)node).Refresh();
        }

        /// <summary>
        /// štítek lze modifikovat
        /// </summary>
        protected bool canLabelEdit = false;
        /// <summary>
        /// Indikuje, zda lze modifikovat štítek větve
        /// </summary>
        public virtual bool CanLabelEdit { get { return canLabelEdit; } }

        /// <summary>
        /// Metoda, ktera se provede před modifikací štítku.
        /// </summary>
        public virtual void BeforeLabelEdit() { }

        /// <summary>
        /// Po dokončení modifikaci štítku
        /// </summary>
        /// <param name="newName">Nový název štítku</param>
        public virtual void AfterLabelEdit(string newName)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Indikuje viditelnost větve
        /// </summary>
        public virtual bool Visible
        {
            get
            {
                if (TreeView is ExtTreeView)
                    return (TreeView as ExtTreeView).IsNodeVisible(this);
                return true;
            }
        }

        /// <summary>
        /// Seznam všech větví
        /// </summary>
        public IEnumerable<ExtTreeNode> AllNodes
        {
            get
            {
                foreach (ExtTreeNode n in Nodes)
                    yield return n;

                foreach (ExtTreeNode n in invisibleNodes)
                    yield return n;
            }
        }

        /// <summary>
        /// Neviditelné větve
        /// </summary>
        protected List<ExtTreeNode> invisibleNodes = new List<ExtTreeNode>();
        /// <summary>
        /// Aktualizace viditelnosti
        /// </summary>
        public virtual void UpdateVisibility()
        {
            for (int i = 0; i < invisibleNodes.Count;)
            {
                if (invisibleNodes[i].Visible)
                {
                    invisibleNodes[i].AddTo(this);
                    invisibleNodes.RemoveAt(i);
                    continue;
                }
                ++i;
            }

            foreach (TreeNode node in Nodes)
                if (node is ExtTreeNode extTreeNode)
                    if (!extTreeNode.Visible)
                        invisibleNodes.Add(extTreeNode);

            foreach (TreeNode node in invisibleNodes)
                Nodes.Remove(node);

            foreach (TreeNode node in Nodes)
                if (node is ExtTreeNode)
                    ((ExtTreeNode)node).UpdateVisibility();
        }

        /// <summary>
        /// Výchozí kreslení
        /// </summary>
        protected bool drawDefault = true;
        /// <summary>
        /// Výchozí kreslení objektu
        /// </summary>
        public bool DrawDefault { get { return drawDefault; } }

        /// <summary>
        /// Kreslení pozadí větve
        /// </summary>
        /// <param name="e">Parametry kreslení</param>
        protected virtual void DrawBackground(DrawTreeNodeEventArgs e)
        {
            Graphics g = e.Graphics;
            int width = MeasureItemWidth(e) + 2;
            Rectangle backRect = new Rectangle(e.Bounds.X, e.Bounds.Y, width, e.Bounds.Height);

            if ((e.State & (TreeNodeStates.Selected | TreeNodeStates.Focused)) == TreeNodeStates.Selected)
                g.FillRectangle(SystemBrushes.Control, backRect);
            else if ((e.State & TreeNodeStates.Selected) == TreeNodeStates.Selected)
                g.FillRectangle(SystemBrushes.Highlight, backRect);
            else
                g.FillRectangle(SystemBrushes.Window, backRect);

            if ((e.State & TreeNodeStates.Focused) == TreeNodeStates.Focused)
            {
                backRect.Width--;
                backRect.Height--;
                using (Pen dottedPen = new Pen(SystemColors.WindowText))
                {
                    dottedPen.DashStyle = System.Drawing.Drawing2D.DashStyle.Dot;
                    g.DrawRectangle(dottedPen, backRect);
                    Color h = SystemColors.Highlight;
                    dottedPen.Color = Color.FromArgb(255 - h.R, 255 - h.G, 255 - h.B);
                    dottedPen.DashOffset = 1;
                    g.DrawRectangle(dottedPen, backRect);
                }
                g.DrawLine(SystemPens.WindowText, backRect.Right + 1, backRect.Y, backRect.Right + 1, backRect.Bottom);
            }
        }

        /// <summary>
        /// Výpočet šířky položky
        /// </summary>
        /// <param name="e">Parameter výpočtu</param>
        /// <returns></returns>
        protected virtual int MeasureItemWidth(DrawTreeNodeEventArgs e)
        {
            return MeasureTextWidth(e.Graphics, Text, TreeView.Font);
        }

        /// <summary>
        /// Kreslení popředí
        /// </summary>
        /// <param name="e">Parametr kreslení</param>
        protected virtual void DrawForeground(DrawTreeNodeEventArgs e) { }

        /// <summary>
        /// Samotné kreslení větve
        /// </summary>
        /// <param name="e">Parametr kreslení</param>
        public void Draw(DrawTreeNodeEventArgs e)
        {
            DrawBackground(e);
            DrawForeground(e);
        }

        /// <summary>
        /// Výpočet šířky textu ve větvi
        /// </summary>
        /// <param name="g">Grafika</param>
        /// <param name="text">Text</param>
        /// <param name="font">Písmo</param>
        /// <returns></returns>
        protected int MeasureTextWidth(Graphics g, string text, Font font)
        {
            SizeF size = g.MeasureString(text, font);
            return (int)size.Width;
        }

        /// <summary>
        /// Generuje Drag &amp; Drop dativý objekt.
        /// pokud je NULL pak objekt nemůže být tažen
        /// </summary>
        public virtual DataObject DragDropDataObject { get => null; }

        /// <summary>
        /// drag &amp; drop efekt, když DataObject je tažen nad větvi.
        /// </summary>
        /// <param name="dataObject">tažený objekt</param>
        /// <param name="proposedEffect">
        /// výchozí efekt je DragDropEffects.Copy a DragDropEffects.Move
        /// </param>
        /// <returns>
        /// </returns>
        public virtual DragDropEffects GetDragDropEffect(IDataObject dataObject, DragDropEffects proposedEffect)
        {
            return DragDropEffects.None;
        }

        /// <summary>
        /// Pokud GetDragDropEffect vrácí něco != DragDropEffects.None tato metoda je vázaná na
        /// DoDragDrop(obj, GetDragDropEffect(obj, proposedEffect)).
        /// </summary>
        public virtual void DoDragDrop(IDataObject dataObject, DragDropEffects effect)
        {
            throw new System.NotImplementedException();
        }

        bool doPerformCut;
        /// <summary>
        /// Provedení vyjmout
        /// </summary>
        public virtual bool DoPerformCut
        {
            get
            {
                return !(Parent is ExtTreeNode parent) ? doPerformCut : doPerformCut | parent.DoPerformCut;
            }
            set
            {
                this.doPerformCut = value;
                if (this.doPerformCut)
                    ((ExtTreeView)TreeView).CutNodes.Add(this);
                Refresh();
            }
        }

        #region IClipboardHandler
        /// <summary>
        /// Povoleno výjmout
        /// </summary>
        public virtual bool EnableCut { get { return false; } }

        /// <summary>
        /// Lze kopírovat
        /// </summary>
        public virtual bool EnableCopy { get { return false; } }
        /// <summary>
        /// Lze vkládat
        /// </summary>
        public virtual bool EnablePaste { get { return false; } }
        /// <summary>
        /// Lze odstranit
        /// </summary>
        public virtual bool EnableDelete { get { return false; } }
        /// <summary>
        /// Lze vybrat vše
        /// </summary>
        public virtual bool EnableSelectAll { get { return false; } }
        /// <summary>
        /// Získání polička nad kterým se provedou operace 
        /// </summary>
        public virtual Control TextBoxControl { get => null; }
        /// <summary>
        /// výjmout
        /// </summary>
        public virtual void Cut()
        {
            throw new System.NotImplementedException();
        }
        /// <summary>
        /// Kopírovat
        /// </summary>
        public virtual void Copy()
        {
            throw new System.NotImplementedException();
        }
        /// <summary>
        /// Vložit
        /// </summary>
        public virtual void Paste()
        {
            throw new System.NotImplementedException();
        }
        /// <summary>
        /// Odstranit
        /// </summary>
        public virtual void Delete()
        {
            this.Remove();
        }
        /// <summary>
        /// Vybrat vše
        /// </summary>
        public virtual void SelectAll()
        {
            throw new System.NotImplementedException();
        }
        #endregion

        /// <summary>
        /// pořadí řazení
        /// </summary>
        protected int sortOrder = 0;
        /// <summary>
        /// pořadí řazení
        /// </summary>
        public virtual int SortOrder { get { return sortOrder; } }
        /// <summary>
        /// Slučený text
        /// </summary>
        public virtual string CompareString { get { return Text; } }

        /// <summary>
        /// Index vložení
        /// </summary>
        /// <param name="nodes">Větve</param>
        /// <param name="treeView">Pohled</param>
        /// <returns></returns>
        int GetInsertionIndex(TreeNodeCollection nodes, TreeView treeView)
        {
            if (treeView == null)
                return nodes.Count;

            Comparison<TreeNode> comparison = null;

            if (!(treeView is ExtTreeView etv))
            {
                if (!treeView.Sorted)
                    return nodes.Count;
                if (treeView.TreeViewNodeSorter != null)
                    comparison = treeView.TreeViewNodeSorter.Compare;
            }
            else
            {
                if (!etv.IsSorted)
                    return nodes.Count;
                if (etv.NodeSorter != null)
                    comparison = etv.NodeSorter.Compare;
            }

            if (comparison == null)
                return nodes.Count;

            for (int i = 0; i < nodes.Count; ++i)
                if (comparison(this, nodes[i]) < 0)
                    return i;

            return nodes.Count;
        }

        /// <summary>
        /// Vložení větve do specifické větve <paramref name="parentNode"/>
        /// </summary>
        /// <param name="parentNode">Větev do které se vkládá</param>
        public void InsertSorted(TreeNode parentNode)
        {
            this.Insert(this.GetInsertionIndex(parentNode.Nodes, parentNode.TreeView), parentNode);
        }
    }
}
