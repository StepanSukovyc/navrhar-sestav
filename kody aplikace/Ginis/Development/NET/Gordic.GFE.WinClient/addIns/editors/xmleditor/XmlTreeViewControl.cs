//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.XmlTreeViewControl.cs                  </Name>
//    <Description> Zobrazení stromu XML elementů.                              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.ComponentModel;
using System.Windows.Forms;
using System.Xml;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Core.WinForm;

namespace Gordic.GFE.WinClient.XmlEditor
{
    /// <summary>
    /// Zobrazení stromu XML elementů.
    /// </summary>
    class XmlTreeViewControl : ExtTreeView
    {
        const string ViewStatePropertyName = "XmlTreeViewControl.ViewState";

        XmlDocument document;

        enum InsertionMode
        {
            Before = 0,
            After = 1
        }

        /// <summary>
        /// Volá se po stisknutí Delete klávesy.
        /// </summary>
        public event EventHandler DeleteKeyPressed;

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public XmlTreeViewControl()
        {
        }

        /// <summary>
        /// Aktuálně zobrazený XML dokumet.
        /// </summary>
        [Browsable(false)]
        public XmlDocument Document
        {
            get
            {
                return document;
            }
            set
            {
                document = value;

                BeginUpdate();
                try
                {
                    ShowDocument();
                }
                finally
                {
                    EndUpdate();
                }
            }
        }

        /// <summary>
        /// Vybraný element stromu.
        /// </summary>
        public XmlElement SelectedElement
        {
            get
            {
                XmlElementTreeNode xmlElementTreeNode = SelectedElementNode;
                if (xmlElementTreeNode != null)
                    return xmlElementTreeNode.XmlElement;
                return null;
            }
        }

        /// <summary>
        /// Indikuje, kdy element je vybraný.
        /// </summary>
        public bool IsElementSelected
        {
            get
            {
                return SelectedElement != null;
            }
        }

        /// <summary>
        /// Získání textové větve.
        /// </summary>
        public XmlText SelectedTextNode
        {
            get
            {
                if (SelectedNode is XmlTextTreeNode xmlTextTreeNode)
                    return xmlTextTreeNode.XmlText;
                return null;
            }
        }

        /// <summary>
        /// Získání větve komentáře ve stromu.
        /// </summary>
        public XmlComment SelectedComment
        {
            get
            {
                if (SelectedNode is XmlCommentTreeNode commentTreeNode)
                    return commentTreeNode.XmlComment;
                return null;
            }
        }

        /// <summary>
        /// Indikuje kdy textvá větev je vybraná ve stromu
        /// </summary>
        public bool IsTextNodeSelected
        {
            get
            {
                return SelectedTextNode != null;
            }
        }

        /// <summary>
        /// Uložení aktuálního stavu strommu.
        /// </summary>
        /// <param name="properties">Vlastnosti do kterých se vkládá stav</param>
        public void SaveViewState(Property properties)
        {
            properties.Set(ViewStatePropertyName, TreeViewHelper.GetViewStateString(this));
        }

        /// <summary>
        /// Obnovení stavu úzlů stromu.
        /// </summary>
        /// <param name="properties">Vlastností ze kterých probíhá obnova</param>
        public void RestoreViewState(Property properties)
        {
            TreeViewHelper.ApplyViewStateString(properties.Get(ViewStatePropertyName, String.Empty), this);
        }

        /// <summary>
        /// Přidání vnořeného elementu.
        /// </summary>
        /// <param name="element">Přidávaný element</param>
        public void AppendChildElement(XmlElement element)
        {
            XmlElementTreeNode selectedNode = SelectedElementNode;
            if (selectedNode != null)
            {
                XmlElementTreeNode newNode = new XmlElementTreeNode(element);
                newNode.AddTo(selectedNode);
                selectedNode.Expand();
            }
        }

        /// <exclude/>
        public void AppendChildTextNode(XmlText textNode)
        {
            XmlElementTreeNode selectedNode = SelectedElementNode;
            if (selectedNode != null)
            {
                XmlTextTreeNode newNode = new XmlTextTreeNode(textNode);
                newNode.AddTo(selectedNode);
                selectedNode.Expand();
            }
        }

        /// <exclude/>
        public void InsertElementBefore(XmlElement element)
        {
            InsertElement(element, InsertionMode.Before);
        }

        /// <exclude/>
        public void InsertElementAfter(XmlElement element)
        {
            InsertElement(element, InsertionMode.After);
        }

        /// <exclude/>
        public void RemoveElement(XmlElement element)
        {
            XmlElementTreeNode node = FindElement(element);
            if (node != null)
                node.Remove();
        }

        /// <exclude/>
        public void RemoveTextNode(XmlText textNode)
        {
            XmlTextTreeNode node = FindTextNode(textNode);
            if (node != null)
                node.Remove();
        }

        /// <exclude/>
        public void InsertTextNodeBefore(XmlText textNode)
        {
            InsertTextNode(textNode, InsertionMode.Before);
        }

        /// <exclude/>
        public void InsertTextNodeAfter(XmlText textNode)
        {
            InsertTextNode(textNode, InsertionMode.After);
        }

        /// <exclude/>
        public void UpdateTextNode(XmlText textNode)
        {
            XmlTextTreeNode node = FindTextNode(textNode);
            if (node != null)
                node.Update();
        }

        /// <exclude/>
        public void UpdateComment(XmlComment comment)
        {
            XmlCommentTreeNode node = FindComment(comment);
            if (node != null)
                node.Update();
        }

        /// <exclude/>
        public void AppendChildComment(XmlComment comment)
        {
            XmlElementTreeNode selectedNode = SelectedElementNode;
            if (selectedNode != null)
            {
                XmlCommentTreeNode newNode = new XmlCommentTreeNode(comment);
                newNode.AddTo(selectedNode);
                selectedNode.Expand();
            }
        }

        /// <exclude/>
        public void RemoveComment(XmlComment comment)
        {
            XmlCommentTreeNode node = FindComment(comment);
            if (node != null)
                node.Remove();
        }

        /// <exclude/>
        public void InsertCommentBefore(XmlComment comment)
        {
            InsertComment(comment, InsertionMode.Before);
        }

        /// <exclude/>
        public void InsertCommentAfter(XmlComment comment)
        {
            InsertComment(comment, InsertionMode.After);
        }

        /// <exclude/>
        public void ShowCut(XmlNode node)
        {
            ShowCut(node, true);
        }

        /// <exclude/>
        public void HideCut(XmlNode node)
        {
            ShowCut(node, false);
        }

        /// <exclude/>
        protected override void OnMouseDown(MouseEventArgs e)
        {
            base.OnMouseDown(e);
            if (SelectedNode == null)
                this.OnAfterSelect(new TreeViewEventArgs(null, TreeViewAction.ByMouse));
        }

        /// <exclude/>
        protected override bool ProcessCmdKey(ref Message msg, Keys keyData)
        {
            if (keyData == Keys.Delete && DeleteKeyPressed != null)
                DeleteKeyPressed(this, new EventArgs());
            return base.ProcessCmdKey(ref msg, keyData);
        }

        void ShowDocument()
        {
            Nodes.Clear();
            if (document != null)
                foreach (XmlNode node in document.ChildNodes)
                    switch (node.NodeType)
                    {
                        case XmlNodeType.Element:
                            XmlElementTreeNode elementNode = new XmlElementTreeNode((XmlElement)node);
                            elementNode.AddTo(this);
                            break;
                        case XmlNodeType.Comment:
                            XmlCommentTreeNode commentNode = new XmlCommentTreeNode((XmlComment)node);
                            commentNode.AddTo(this);
                            break;
                    }
        }

        XmlElementTreeNode SelectedElementNode
        {
            get
            {
                return SelectedNode as XmlElementTreeNode;
            }
        }

        void InsertElement(XmlElement element, InsertionMode insertionMode)
        {
            ExtTreeNode selectedNode = (ExtTreeNode)SelectedNode;
            if (selectedNode != null)
            {
                XmlElementTreeNode parentNode = (XmlElementTreeNode)selectedNode.Parent;
                XmlElementTreeNode newNode = new XmlElementTreeNode(element);
                int index = parentNode.Nodes.IndexOf(selectedNode);
                if (insertionMode == InsertionMode.After)
                    index++;
                newNode.Insert(index, parentNode);
            }
        }

        void InsertTextNode(XmlText textNode, InsertionMode insertionMode)
        {
            ExtTreeNode selectedNode = (ExtTreeNode)SelectedNode;
            if (selectedNode != null)
            {
                XmlElementTreeNode parentNode = (XmlElementTreeNode)selectedNode.Parent;
                XmlTextTreeNode newNode = new XmlTextTreeNode(textNode);
                int index = parentNode.Nodes.IndexOf(selectedNode);
                if (insertionMode == InsertionMode.After)
                    index++;
                newNode.Insert(index, parentNode);
            }
        }

        void InsertComment(XmlComment comment, InsertionMode insertionMode)
        {
            ExtTreeNode selectedNode = (ExtTreeNode)SelectedNode;
            if (selectedNode != null)
            {
                ExtTreeNode parentNode = (ExtTreeNode)selectedNode.Parent;
                XmlCommentTreeNode newNode = new XmlCommentTreeNode(comment);
                int index = 0;
                if (parentNode != null)
                    index = parentNode.Nodes.IndexOf(selectedNode);
                else
                    index = Nodes.IndexOf(selectedNode);
                if (insertionMode == InsertionMode.After)
                    index++;
                if (parentNode != null)
                    newNode.Insert(index, parentNode);
                else
                    newNode.Insert(index, this);
            }
        }

        XmlElementTreeNode FindElement(XmlElement element, TreeNodeCollection nodes)
        {
            foreach (ExtTreeNode node in nodes)
            {
                if (node is XmlElementTreeNode elementTreeNode)
                {
                    if (elementTreeNode.XmlElement == element)
                        return elementTreeNode;

                    XmlElementTreeNode childElementTreeNode = FindElement(element, elementTreeNode.Nodes);
                    if (childElementTreeNode != null)
                        return childElementTreeNode;
                }
            }
            return null;
        }

        XmlElementTreeNode FindElement(XmlElement element)
        {
            return SelectedNode is XmlElementTreeNode selectedElementTreeNode && selectedElementTreeNode.XmlElement == element
                ? selectedElementTreeNode
                : FindElement(element, Nodes);
        }

        XmlTextTreeNode FindTextNode(XmlText textNode, TreeNodeCollection nodes)
        {
            foreach (ExtTreeNode node in nodes)
            {
                if (node is XmlTextTreeNode textTreeNode)
                {
                    if (textTreeNode.XmlText == textNode)
                        return textTreeNode;
                }
                else
                {
                    XmlTextTreeNode childTextTreeNode = FindTextNode(textNode, node.Nodes);
                    if (childTextTreeNode != null)
                        return childTextTreeNode;
                }
            }
            return null;
        }

        XmlTextTreeNode FindTextNode(XmlText textNode)
        {
            if (SelectedNode is XmlTextTreeNode selectedTextTreeNode && selectedTextTreeNode.XmlText == textNode)
                return selectedTextTreeNode;
            else
                return FindTextNode(textNode, Nodes);
        }

        XmlCommentTreeNode FindComment(XmlComment comment, TreeNodeCollection nodes)
        {
            foreach (ExtTreeNode node in nodes)
            {
                if (node is XmlCommentTreeNode commentTreeNode)
                {
                    if (commentTreeNode.XmlComment == comment)
                        return commentTreeNode;
                }
                else
                {
                    XmlCommentTreeNode childCommentTreeNode = FindComment(comment, node.Nodes);
                    if (childCommentTreeNode != null)
                        return childCommentTreeNode;
                }
            }
            return null;
        }

        XmlCommentTreeNode FindComment(XmlComment comment)
        {
            if (SelectedNode is XmlCommentTreeNode selectedCommentTreeNode && selectedCommentTreeNode.XmlComment == comment)
                return selectedCommentTreeNode;
            else
                return FindComment(comment, Nodes);
        }

        void ShowCutElement(XmlElement element, bool showGhostImage)
        {
            XmlElementTreeNode node = FindElement(element);
            node.ShowGhostImage = showGhostImage;
        }

        void ShowCutTextNode(XmlText textNode, bool showGhostImage)
        {
            XmlTextTreeNode node = FindTextNode(textNode);
            node.ShowGhostImage = showGhostImage;
        }

        void ShowCutComment(XmlComment comment, bool showGhostImage)
        {
            XmlCommentTreeNode node = FindComment(comment);
            node.ShowGhostImage = showGhostImage;
        }

        void ShowCut(XmlNode node, bool showGhostImage)
        {
            if (node is XmlElement)
                ShowCutElement((XmlElement)node, showGhostImage);
            else if (node is XmlText)
                ShowCutTextNode((XmlText)node, showGhostImage);
            else if (node is XmlComment)
                ShowCutComment((XmlComment)node, showGhostImage);
        }

        protected override void OnBeforeSelect(TreeViewCancelEventArgs e)
        {
            if (e.Node is ExtTreeNode node)
            {
                ContextMenuStrip strip = MenuService.CreateContextMenu(e.Node, new Parsers.EventArgsContextMenu(node.ContextmenuAddinTreePath));
                if (strip != null)
                    node.ContextMenuStrip = strip;
            }
        }
    }
}
