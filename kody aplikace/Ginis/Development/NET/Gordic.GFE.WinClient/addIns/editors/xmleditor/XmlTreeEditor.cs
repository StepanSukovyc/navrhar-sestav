//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.XmlTreeEditor.cs                       </Name>
//    <Description> Třída zodpovědná za editací XML stromového pohledu          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-09                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Net;
using System.Xml;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.XmlEditor;
using Gordic.TextEditor.Gui.CompletionWindow;

namespace Gordic.GFE.WinClient.XmlEditor
{
    /// <summary>
    /// Třída zodpovědná za editací XML stromového pohledu
    /// </summary>
    public class XmlTreeEditor
    {
        IXmlTreeView view;
        XmlDocument document;
        XmlCompletionDataProvider completionDataProvider;
        XmlNode copiedNode;
        XmlNode cutNode;

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="view">Stromový pohled</param>
        /// <param name="completionDataProvider">Poskytovatel dat</param>
        public XmlTreeEditor(IXmlTreeView view, XmlCompletionDataProvider completionDataProvider)
        {
            this.view = view;
            this.completionDataProvider = completionDataProvider;
        }

        /// <summary>
        /// Načtení XML.
        /// </summary>
        /// <param name="xml">XML obsah</param>
        public void LoadXml(string xml)
        {
            try
            {
                document = new XmlDocument
                {
                    XmlResolver = null
                };
                document.LoadXml(xml);
                view.Document = document;
            }
            catch (XmlException ex)
            {
                view.ShowXmlIsNotWellFormedMessage(ex);
            }
            catch (WebException ex)
            {
                LoggingService.Debug(ex.ToString());
                view.ShowErrorMessage(ex.Message);
            }
        }

        /// <summary>
        /// XML dokumet pro editací.
        /// </summary>
        public XmlDocument Document
        {
            get
            {
                return document;
            }
        }

        /// <summary>
        /// Reakce na změnu výběru větve stromu.
        /// </summary>
        public void SelectedNodeChanged()
        {
            XmlElement selectedElement = view.SelectedElement;
            XmlText selectedTextNode = view.SelectedTextNode;
            XmlComment selectedComment = view.SelectedComment;
            if (selectedTextNode != null)
            {
                view.ClearAttributes();
                view.ShowTextContent(selectedTextNode.InnerText);
            }
            else if (selectedElement != null)
            {
                view.TextContent = String.Empty;
                view.ShowAttributes(selectedElement.Attributes);
            }
            else if (selectedComment != null)
            {
                view.ClearAttributes();
                view.ShowTextContent(selectedComment.InnerText);
            }
            else
            {
                view.ClearAttributes();
                view.TextContent = String.Empty;
            }
        }

        /// <summary>
        /// Reakce na změnu hodnoty atributu
        /// </summary>
        public void AttributeValueChanged()
        {
            view.IsDirty = true;
        }

        /// <summary>
        /// Přidánní jednoho nebo více atributů do aktuálně výbraného elementu.
        /// </summary>
        public void AddAttribute()
        {
            XmlElement selectedElement = view.SelectedElement;
            if (selectedElement != null)
            {
                string[] attributesNames = GetMissingAttributes(selectedElement);
                string[] selectedAttributeNames = view.SelectNewAttributes(attributesNames);
                if (selectedAttributeNames.Length > 0)
                {
                    foreach (string attributeName in selectedAttributeNames)
                        selectedElement.SetAttribute(attributeName, String.Empty);
                    view.IsDirty = true;
                    view.ShowAttributes(selectedElement.Attributes);
                }
            }
        }

        /// <summary>
        /// odstranění atributu z XML dokumentu.
        /// </summary>
        public void RemoveAttribute()
        {
            XmlElement selectedElement = view.SelectedElement;
            if (selectedElement != null)
            {
                string attribute = view.SelectedAttribute;
                if (attribute != null)
                {
                    selectedElement.RemoveAttribute(attribute);
                    view.IsDirty = true;
                    view.ShowAttributes(selectedElement.Attributes);
                }
            }
        }

        /// <summary>
        /// Reakce na změnu obsahu
        /// </summary>
        public void TextContentChanged()
        {
            XmlText textNode = view.SelectedTextNode;
            XmlComment comment = view.SelectedComment;
            if (textNode != null)
            {
                view.IsDirty = true;
                textNode.InnerText = view.TextContent;
                view.UpdateTextNode(textNode);
            }
            else if (comment != null)
            {
                view.IsDirty = true;
                comment.InnerText = view.TextContent;
                view.UpdateComment(comment);
            }
        }

        /// <summary>
        /// Přidání nového vnořeného elementu.
        /// </summary>
        public void AppendChildElement()
        {
            XmlElement selectedElement = view.SelectedElement;
            if (selectedElement != null)
            {
                string[] elementNames = GetChildElements(selectedElement);
                string[] selectedElementNames = view.SelectNewElements(elementNames);
                if (selectedElementNames.Length > 0)
                {
                    view.IsDirty = true;
                    foreach (string elementName in selectedElementNames)
                    {
                        XmlElement newElement = document.CreateElement(elementName, selectedElement.NamespaceURI);
                        AppendChildElement(selectedElement, newElement);
                    }
                }
            }
        }

        /// <summary>
        /// Vložení elementu před aktuálně vybraný
        /// </summary>
        public void InsertElementBefore()
        {
            XmlElement parentElement = null;
            XmlNode selectedNode = view.SelectedElement;
            if (selectedNode == null)
                selectedNode = view.SelectedComment;
            if (selectedNode != null)
                parentElement = selectedNode.ParentNode as XmlElement;

            if (parentElement != null)
            {
                string[] elementNames = GetChildElements(parentElement);
                string[] selectedElementNames = view.SelectNewElements(elementNames);
                if (selectedElementNames.Length > 0)
                {
                    view.IsDirty = true;
                    foreach (string elementName in selectedElementNames)
                    {
                        XmlElement newElement = document.CreateElement(elementName, parentElement.NamespaceURI);
                        parentElement.InsertBefore(newElement, selectedNode);
                        view.InsertElementBefore(newElement);
                    }
                }
            }
        }

        /// <summary>
        /// Vložení elementu za aktuálně vybraný.
        /// </summary>
        public void InsertElementAfter()
        {
            XmlElement parentElement = null;
            XmlNode selectedNode = view.SelectedElement;
            if (selectedNode == null)
                selectedNode = view.SelectedComment;
            if (selectedNode != null)
                parentElement = selectedNode.ParentNode as XmlElement;

            if (parentElement != null)
            {
                string[] elementNames = GetChildElements(parentElement);
                string[] selectedElementNames = view.SelectNewElements(elementNames);
                if (selectedElementNames.Length > 0)
                {
                    view.IsDirty = true;
                    foreach (string elementName in selectedElementNames)
                    {
                        XmlElement newElement = document.CreateElement(elementName, parentElement.NamespaceURI);
                        parentElement.InsertAfter(newElement, selectedNode);
                        view.InsertElementAfter(newElement);
                    }
                }
            }
        }

        /// <summary>
        /// Přidání vnořeného textového elementu do aktuálně vybraného.
        /// </summary>
        public void AppendChildTextNode()
        {
            AppendChildTextNode(document.CreateTextNode(String.Empty));
        }

        /// <summary>
        /// Přidání textového elementu před aktuálně vybraný.
        /// </summary>
        public void InsertTextNodeBefore()
        {
            XmlNode selectedNode = GetSelectedCommentOrElementOrTextNode();

            if (selectedNode != null)
            {
                if (selectedNode.ParentNode is XmlElement parentElement)
                {
                    XmlText textNode = document.CreateTextNode(String.Empty);
                    parentElement.InsertBefore(textNode, selectedNode);
                    view.IsDirty = true;
                    view.InsertTextNodeBefore(textNode);
                }
            }
        }

        /// <summary>
        /// Přidání textového elementu za aktuálně vybraný.
        /// </summary>
        public void InsertTextNodeAfter()
        {
            XmlNode selectedNode = GetSelectedCommentOrElementOrTextNode();

            if (selectedNode != null)
                if (selectedNode.ParentNode is XmlElement parentElement)
                {
                    XmlText textNode = document.CreateTextNode(String.Empty);
                    parentElement.InsertAfter(textNode, selectedNode);
                    view.IsDirty = true;
                    view.InsertTextNodeAfter(textNode);
                }
        }

        /// <summary>
        /// Přidání vnořeného komentáře.
        /// </summary>
        public void AppendChildComment()
        {
            XmlComment comment = document.CreateComment(String.Empty);
            AppendChildComment(comment);
        }

        /// <summary>
        /// Přidání komentáře před aktuálně vybraný element.
        /// </summary>
        public void InsertCommentBefore()
        {
            XmlNode node = GetSelectedCommentOrElementOrTextNode();
            if (node != null)
            {
                XmlNode parentNode = node.ParentNode;
                XmlComment comment = document.CreateComment(String.Empty);
                parentNode.InsertBefore(comment, node);
                view.IsDirty = true;
                view.InsertCommentBefore(comment);
            }
        }

        /// <summary>
        /// Přidání komentáře za aktuálně vybraný element.
        /// </summary>
        public void InsertCommentAfter()
        {
            XmlNode node = GetSelectedCommentOrElementOrTextNode();
            if (node != null)
            {
                XmlNode parentNode = node.ParentNode;
                XmlComment comment = document.CreateComment(String.Empty);
                parentNode.InsertAfter(comment, node);
                view.IsDirty = true;
                view.InsertCommentAfter(comment);
            }
        }

        /// <summary>
        /// Odstranění větve ze stromu.
        /// </summary>
        public void Delete()
        {
            XmlNode selectedNode = view.SelectedNode;
            XmlComment selectedComment = selectedNode as XmlComment;
            XmlText selectedText = selectedNode as XmlText;
            if (selectedNode is XmlElement selectedElement)
                RemoveElement(selectedElement);
            else if (selectedComment != null)
                RemoveComment(selectedComment);
            else if (selectedText != null)
                RemoveTextNode(selectedText);
        }

        /// <summary>
        /// Kopírování vybraného elemetu.
        /// </summary>
        public void Copy()
        {
            copiedNode = view.SelectedNode;
            if (cutNode != null)
                view.HideCut(cutNode);
        }

        /// <summary>
        /// Vložení kopírováné nebo výbrané větve.
        /// </summary>
        public void Paste()
        {
            if (IsPasteEnabled)
                if (copiedNode != null)
                    AppendChildCopy(copiedNode);
                else
                    CutAndPasteNode(cutNode);
        }

        /// <summary>
        /// Výjmutí vybrané větve.
        /// </summary>
        public void Cut()
        {
            cutNode = view.SelectedNode;
            if (cutNode != null)
                view.ShowCut(cutNode);
            copiedNode = null;
        }

        /// <summary>
        /// Indikuje, zda lze větev výjmout.
        /// </summary>
        public bool IsCutEnabled
        {
            get
            {
                XmlNode selectedNode = view.SelectedNode;
                return selectedNode != null && document.DocumentElement != selectedNode;
            }
        }

        /// <summary>
        /// Indikuje, zda lze větev zkopírovat.
        /// </summary>
        public bool IsCopyEnabled
        {
            get
            {
                return view.SelectedNode != null;
            }
        }

        /// <summary>
        /// Indikuje, zda lze vkládat.
        /// </summary>
        public bool IsPasteEnabled
        {
            get
            {
                XmlNode destinationNode = view.SelectedNode;
                if (destinationNode != null)
                {
                    XmlNode sourceNode = copiedNode ?? cutNode;
                    if (sourceNode != null)
                        return GetPasteEnabled(sourceNode, destinationNode);
                }
                return false;
            }
        }

        /// <summary>
        /// Indikuje povolení odstranění větve.
        /// </summary>
        public bool IsDeleteEnabled
        {
            get
            {
                return view.SelectedNode != null;
            }
        }

        string[] GetMissingAttributes(XmlElement element)
        {
            XmlElementPath elementPath = GetElementPath(element);

            List<string> attributes = new List<string>();
            if (completionDataProvider != null)
            {
                XmlSchemaCompletionData schemaCompletionData = completionDataProvider.FindSchema(elementPath);
                if (schemaCompletionData != null)
                {
                    ICompletionData[] completionData = schemaCompletionData.GetAttributeCompletionData(elementPath);
                    foreach (ICompletionData attributeCompletionData in completionData)
                    {
                        string attributeName = attributeCompletionData.Text;
                        if (!element.HasAttribute(attributeName))
                            attributes.Add(attributeName);
                    }
                }
            }
            return attributes.ToArray();
        }

        XmlElementPath GetElementPath(XmlElement element)
        {
            XmlElementPath path = new XmlElementPath();
            XmlElement parentElement = element;
            while (parentElement != null)
            {
                QualifiedName name = new QualifiedName(parentElement.LocalName, parentElement.NamespaceURI, parentElement.Prefix);
                path.Elements.Insert(0, name);
                parentElement = parentElement.ParentNode as XmlElement;
            }
            return path;
        }

        string[] GetChildElements(XmlElement element)
        {
            XmlElementPath elementPath = GetElementPath(element);

            List<string> elements = new List<string>();
            if (completionDataProvider != null)
            {
                XmlSchemaCompletionData schemaCompletionData = completionDataProvider.FindSchema(elementPath);
                if (schemaCompletionData != null)
                {
                    ICompletionData[] completionData = schemaCompletionData.GetChildElementCompletionData(elementPath);
                    foreach (ICompletionData elementCompletionData in completionData)
                        elements.Add(elementCompletionData.Text);
                }
            }
            return elements.ToArray();
        }

        XmlNode GetSelectedCommentOrElementOrTextNode()
        {
            XmlNode node = view.SelectedComment;
            if (node != null)
                return node;
            return GetSelectedElementOrTextNode();
        }

        XmlNode GetSelectedElementOrTextNode()
        {
            XmlNode node = view.SelectedTextNode;
            if (node != null)
                return node;
            return view.SelectedElement;
        }

        void AppendChildElement(XmlElement element)
        {
            AppendChildElement(view.SelectedElement, element);
        }

        void AppendChildElement(XmlElement selectedElement, XmlElement element)
        {
            selectedElement.AppendChild(element);
            view.AppendChildElement(element);
            view.IsDirty = true;
        }

        void RemoveElement(XmlElement element)
        {
            XmlNode parentNode = element.ParentNode;
            parentNode.RemoveChild(element);
            view.IsDirty = true;
            view.RemoveElement(element);
        }

        void RemoveComment(XmlComment comment)
        {
            XmlNode parentNode = comment.ParentNode;
            parentNode.RemoveChild(comment);
            view.IsDirty = true;
            view.RemoveComment(comment);
        }

        void RemoveTextNode(XmlText textNode)
        {
            XmlNode parentNode = textNode.ParentNode;
            parentNode.RemoveChild(textNode);
            view.IsDirty = true;
            view.RemoveTextNode(textNode);
        }

        static bool GetPasteEnabled(XmlNode source, XmlNode destination)
        {
            if (source is XmlElement || source is XmlText || source is XmlComment)
                return destination is XmlElement;
            return false;
        }

        void AppendChildCopy(XmlNode nodeToCopy)
        {
            if (nodeToCopy is XmlElement)
            {
                XmlElement copy = (XmlElement)nodeToCopy.CloneNode(true);
                AppendChildElement(copy);
            }
            else if (nodeToCopy is XmlText)
            {
                XmlText copy = (XmlText)nodeToCopy.CloneNode(true);
                AppendChildTextNode(copy);
            }
            else if (nodeToCopy is XmlComment)
            {
                XmlComment copy = (XmlComment)nodeToCopy.CloneNode(true);
                AppendChildComment(copy);
            }
        }

        void AppendChildTextNode(XmlText textNode)
        {
            XmlElement selectedElement = view.SelectedElement;
            if (selectedElement != null)
            {
                selectedElement.AppendChild(textNode);
                view.IsDirty = true;
                view.AppendChildTextNode(textNode);
            }
        }

        void CutAndPasteNode(XmlNode node)
        {
            XmlText cutTextNode = node as XmlText;
            XmlComment cutCommentNode = node as XmlComment;
            if (node is XmlElement cutElement)
                CutAndPasteElement(cutElement);
            else if (cutTextNode != null)
                CutAndPasteTextNode(cutTextNode);
            else if (cutCommentNode != null)
                CutAndPasteComment(cutCommentNode);
            cutNode = null;
        }

        void CutAndPasteElement(XmlElement element)
        {
            if (element != view.SelectedElement)
            {
                view.RemoveElement(element);
                AppendChildElement(element);
            }
            else
                view.HideCut(element);
        }

        void CutAndPasteTextNode(XmlText text)
        {
            view.RemoveTextNode(text);
            AppendChildTextNode(text);
        }

        void AppendChildComment(XmlComment comment)
        {
            XmlElement selectedElement = view.SelectedElement;
            if (selectedElement != null)
            {
                selectedElement.AppendChild(comment);
                view.IsDirty = true;
                view.AppendChildComment(comment);
            }
        }

        void CutAndPasteComment(XmlComment comment)
        {
            view.RemoveComment(comment);
            AppendChildComment(comment);
        }
    }
}
