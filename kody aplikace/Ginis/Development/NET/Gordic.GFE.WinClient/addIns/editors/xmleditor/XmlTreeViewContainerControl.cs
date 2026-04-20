//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.XmlTreeViewContainerControl.cs         </Name>
//    <Description> Pomocná třída pro zobrazení vlastnosti XML položek stromu   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-09                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Linq;
using System.Windows.Forms;
using System.Xml;
using Gordic.General;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.InfoSectionView;

namespace Gordic.GFE.WinClient.XmlEditor
{
    /// <summary>
    /// Pomocná třída pro zobrazení vlastnosti XML položek stromu
    /// </summary>
    class XmlTreeViewContainerControl : System.Windows.Forms.UserControl, IXmlTreeView, 
        IOwnerState, IClipboardHandler
    {
        #region IXmlTreeView
        /// <summary>
        /// XML dokument stromu.
        /// </summary>
        public XmlDocument Document
        {
            get { return editor.Document; }
            set { xmlElementTreeView.Document = value; }
        }
        /// <summary>
        /// Zobrazení chybové hlášky
        /// </summary>
        /// <param name="ex">Chybová hláška</param>
        public void ShowXmlIsNotWellFormedMessage(XmlException ex)
        {
            ShowErrorMessage(ex.Message);
        }
        /// <summary>
        /// Zobrazení chybové hlášky
        /// </summary>
        /// <param name="message">Text chyby</param>
        public void ShowErrorMessage(string message)
        {
            xmlElementTreeView.Clear();
            ErrorMessage = message;
            IsErrorMessageTextBoxVisible = true;
        }

        #endregion

        XmlTreeEditor editor;
        bool dirty;
        bool errorMessageTextBoxVisible;
        bool attributesGridVisible = true;
        bool textBoxVisible;

        /// <summary>
        /// Výčet stavu daného ovladače
        /// </summary>
        [Flags]
        public enum XmlTreeViewContainerControlState
        {
            /// <summary>
            /// prázdný stav
            /// </summary>
            Nothing = 0,
            /// <summary>
            /// vybraný element
            /// </summary>
            ElementSelected = 1,
            /// <summary>
            /// vybraný element je kořenový
            /// </summary>
            RootElementSelected = 2,
            /// <summary>
            /// vybraný atribut
            /// </summary>
            AttributeSelected = 4,
            /// <summary>
            /// vybraný element je textová větev
            /// </summary>
            TextNodeSelected = 8,
            /// <summary>
            /// vybraný element je komentář
            /// </summary>
            CommentSelected = 16
        }

        /// <summary>
        /// obsah byl pozměněn
        /// </summary>
        public event EventHandler DirtyChanged;

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public XmlTreeViewContainerControl()
        {
            InitializeComponent();
            InitImages();
        }

        /// <summary>
        /// Aktuální stav ovladače.
        /// </summary>
        public Enum InternalState
        {
            get
            {
                XmlTreeViewContainerControlState state = XmlTreeViewContainerControlState.Nothing;
                if (SelectedElement != null)
                {
                    state |= XmlTreeViewContainerControlState.ElementSelected;
                    if (SelectedElement == Document.DocumentElement)
                        state |= XmlTreeViewContainerControlState.RootElementSelected;
                }

                if (SelectedAttribute != null)
                    state |= XmlTreeViewContainerControlState.AttributeSelected;
                if (SelectedTextNode != null)
                    state = XmlTreeViewContainerControlState.TextNodeSelected;
                if (SelectedComment != null)
                    state = XmlTreeViewContainerControlState.CommentSelected;
                return state;
            }
        }

        /// <summary>
        /// Tabulka vlastností, která zobrazuje vlastnosti vybraného objektu stromu.
        /// </summary>
        public PropertyGrid AttributesGrid
        {
            get
            {
                return attributesGrid;
            }
        }

        /// <summary>
        /// Indikuje nutnost uložení dokumentu
        /// </summary>
        public bool IsDirty
        {
            get { return dirty; }
            set
            {
                bool previousDirty = dirty;
                dirty = value;
                OnXmlChanged(previousDirty);
            }
        }

        /// <summary>
        /// Text chybové hlášky
        /// </summary>
        public string ErrorMessage
        {
            get { return errMessTextBox.Text; }
            set { errMessTextBox.Text = value; }
        }

        /// <summary>
        /// Indikuje, že je zobrazeá chybová hláška.
        /// </summary>
        public bool IsErrorMessageTextBoxVisible
        {
            get { return errorMessageTextBoxVisible; }
            set
            {
                errorMessageTextBoxVisible = value;
                if (value)
                {
                    errMessTextBox.BringToFront();
                    errMessTextBox.TabStop = true; ;
                    IsAttributesGridVisible = false;
                    IsTextBoxVisible = false;
                }
                else
                {
                    errMessTextBox.SendToBack();
                    errMessTextBox.TabStop = false;
                }
            }
        }

        /// <summary>
        /// XmlTreeView v kontaineru.
        /// </summary>
        public XmlTreeViewControl TreeView
        {
            get
            {
                return xmlElementTreeView;
            }
        }

        /// <summary>
        /// Zobrazí zadaný XML jako strom.
        /// </summary>
        /// <param name="xml">XML obsah</param>
        /// <param name="completionDataProvider">Poskztovatel dat pro doplnění</param>
        public void LoadXml(string xml, XmlCompletionDataProvider completionDataProvider)
        {
            textBox.Clear();
            IsAttributesGridVisible = true;
            ClearAttributes();

            editor = new XmlTreeEditor(this, completionDataProvider);
            editor.LoadXml(xml);

            // rozbalí document element větev.
            if (xmlElementTreeView.Nodes.Count > 0)
                xmlElementTreeView.Nodes[0].Expand();
        }

        /// <summary>
        /// Zobrazení atributů
        /// </summary>
        /// <param name="attributes">Kolekce atributů k zobrazení</param>
        public void ShowAttributes(XmlAttributeCollection attributes)
        {
            IsAttributesGridVisible = true;
            attributesGrid.SelectedObject = new XmlAttributeTypeDescriptor(attributes);
        }

        /// <summary>
        /// Vyčištění všech momentálně zobrazených atributů.
        /// </summary>
        public void ClearAttributes()
        {
            attributesGrid.SelectedObject = null;
        }

        /// <summary>
        /// Po výběru větve daná metoda zobrazí odpovídající elemntu text
        /// </summary>
        /// <param name="text">Text k zobrazení</param>
        public void ShowTextContent(string text)
        {
            IsTextBoxVisible = true;
            textBox.Text = text;
        }

        /// <summary>
        /// Obsah aktuálně vybraného elementu
        /// </summary>
        public string TextContent
        {
            get { return textBox.Text; }
            set { textBox.Text = value; }
        }

        /// <summary>
        /// Výbraná větev stromu
        /// </summary>
        public XmlNode SelectedNode
        {
            get
            {
                XmlElement selectedElement = SelectedElement;
                if (selectedElement != null)
                    return selectedElement;

                XmlText selectedTextNode = SelectedTextNode;
                if (selectedTextNode != null)
                    return selectedTextNode;

                return SelectedComment;
            }
        }

        /// <summary>
        /// Vybraný element stromu
        /// </summary>
        public XmlElement SelectedElement
        {
            get
            {
                return xmlElementTreeView.SelectedElement;
            }
        }

        /// <summary>
        /// Větev textu aktuálně vybraného elementu.
        /// </summary>
        public XmlText SelectedTextNode
        {
            get
            {
                return xmlElementTreeView.SelectedTextNode;
            }
        }

        /// <summary>
        /// Aktuálně vybraný koměntář.
        /// </summary>
        public XmlComment SelectedComment
        {
            get
            {
                return xmlElementTreeView.SelectedComment;
            }
        }

        /// <summary>
        /// Název aktuálně vybraného atributu
        /// </summary>
        public string SelectedAttribute
        {
            get
            {
                GridItem gridItem = attributesGrid.SelectedGridItem;
                if (IsAttributesGridVisible && gridItem != null && gridItem.PropertyDescriptor != null)
                    return gridItem.PropertyDescriptor.Name;
                return null;
            }
        }

        /// <summary>
        /// Zobrazení dialogového okna na přidání atributu
        /// </summary>
        public void AddAttribute()
        {
            editor.AddAttribute();
        }

        /// <summary>
        /// Zobrazení dialogu na přidání atributu.
        /// </summary>
        /// <param name="attributes">Seznam dostupných atributů</param>
        /// <returns></returns>
        public string[] SelectNewAttributes(string[] attributes)
        {
            using (IAddXmlNodeDialog addAttributeDialog = CreateAddAttributeDialog(attributes))
            {
                if (addAttributeDialog.ShowDialog() == DialogResult.OK)
                    return addAttributeDialog.GetNames();
                return new string[0];
            }
        }

        /// <summary>
        /// Odstranění aktuálně vybraného atributu.
        /// </summary>
        public void RemoveAttribute()
        {
            editor.RemoveAttribute();
        }

        /// <summary>
        /// Zobrazení dialogového okna na přidání elementu stromu
        /// </summary>
        /// <param name="elements">Seznam dostupných elementů.</param>
        /// <returns></returns>
        public string[] SelectNewElements(string[] elements)
        {
            using (IAddXmlNodeDialog addElementDialog = CreateAddElementDialog(elements))
            {
                if (addElementDialog.ShowDialog() == DialogResult.OK)
                    return addElementDialog.GetNames();
                return new string[0];
            }
        }

        /// <summary>
        /// Přidání vnitřního elementu do aktuálně vybrného
        /// </summary>
        /// <param name="element">Přidávaný element</param>
        public void AppendChildElement(XmlElement element)
        {
            xmlElementTreeView.AppendChildElement(element);
        }

        /// <summary>
        /// Přidání nového vnitřního elementu do aktuálního.
        /// </summary>
        public void AddChildElement()
        {
            editor.AppendChildElement();
        }

        /// <summary>
        /// Vnoležní elementu před aktuálně vybraný.
        /// </summary>
        public void InsertElementBefore()
        {
            editor.InsertElementBefore();
        }

        /// <summary>
        /// Vložení specifického elementu před aktuílně vybraný
        /// </summary>
        /// <param name="element">Přidávaná element</param>
        public void InsertElementBefore(XmlElement element)
        {
            xmlElementTreeView.InsertElementBefore(element);
        }

        /// <summary>
        /// Vložení elementu za aktuálně vybraný
        /// </summary>
        public void InsertElementAfter()
        {
            editor.InsertElementAfter();
        }

        /// <summary>
        /// Vložení specifického elementu za aktuálně vybraný
        /// </summary>
        /// <param name="element">Vkládaný element</param>
        public void InsertElementAfter(XmlElement element)
        {
            xmlElementTreeView.InsertElementAfter(element);
        }

        /// <summary>
        /// Odstranění specifického elementu ze stromu.
        /// </summary>
        /// <param name="element">Element k odstranění</param>
        public void RemoveElement(XmlElement element)
        {
            xmlElementTreeView.RemoveElement(element);
        }

        /// <summary>
        /// Přidání nové textové větve do aktuálně vybrané
        /// </summary>
        /// <param name="textNode">Přidávaná větev</param>
        public void AppendChildTextNode(XmlText textNode)
        {
            xmlElementTreeView.AppendChildTextNode(textNode);
        }

        /// <summary>
        /// Přidání nové textové větve do aktuálně vybrané
        /// </summary>		
        public void AppendChildTextNode()
        {
            editor.AppendChildTextNode();
        }

        /// <summary>
        /// Vložení textové větve před aktuálně vybranou
        /// </summary>
        public void InsertTextNodeBefore()
        {
            editor.InsertTextNodeBefore();
        }

        /// <summary>
        /// Vložení specifické textové větve před aktuálně vybranou
        /// </summary>
        /// <param name="textNode">Vkládaná větev</param>
        public void InsertTextNodeBefore(XmlText textNode)
        {
            xmlElementTreeView.InsertTextNodeBefore(textNode);
        }

        /// <summary>
        /// Vložení textové větve za aktuálně vybranou
        /// </summary>
        public void InsertTextNodeAfter()
        {
            editor.InsertTextNodeAfter();
        }

        /// <summary>
        /// Vložení specifické textové větve za aktuálně vybranou
        /// </summary>
        /// <param name="textNode">Vkládaná větev</param>
        public void InsertTextNodeAfter(XmlText textNode)
        {
            xmlElementTreeView.InsertTextNodeAfter(textNode);
        }

        /// <summary>
        /// Odstranění specifické textové větve.
        /// </summary>
        /// <param name="textNode">větev k odstranění</param>
        public void RemoveTextNode(XmlText textNode)
        {
            xmlElementTreeView.RemoveTextNode(textNode);
        }

        /// <summary>
        /// Aktualizace textu odpovídajícího uzlu stromu.
        /// </summary>
        /// <param name="textNode">Textový úzel</param>
        public void UpdateTextNode(XmlText textNode)
        {
            xmlElementTreeView.UpdateTextNode(textNode);
        }

        /// <summary>
        /// Aktualizace textu odpovídajícího uzlu stromu
        /// </summary>
        /// <param name="comment">úzel komentáře</param>
        public void UpdateComment(XmlComment comment)
        {
            xmlElementTreeView.UpdateComment(comment);
        }

        /// <summary>
        /// Přidání nového úzlu komentáře do aktuálně vybrané větve
        /// </summary>
        /// <param name="comment">Přidávaný komentář</param>
        public void AppendChildComment(XmlComment comment)
        {
            xmlElementTreeView.AppendChildComment(comment);
        }

        /// <summary>
        /// Přidání nového komentáře do akltuálně vybrané větve
        /// </summary>
        public void AppendChildComment()
        {
            editor.AppendChildComment();
        }

        /// <summary>
        /// Odstranění specifického XML komentáře ze stromu.
        /// </summary>
        /// <param name="comment">Komentář k odstranění</param>
        public void RemoveComment(XmlComment comment)
        {
            xmlElementTreeView.RemoveComment(comment);
        }

        /// <summary>
        /// Vložení specifického komentáře před aktuálně výbranou větev.
        /// </summary>
        /// <param name="comment">Vkládaný komentář</param>
        public void InsertCommentBefore(XmlComment comment)
        {
            xmlElementTreeView.InsertCommentBefore(comment);
        }

        /// <summary>
        /// Vložení komentáře před aktuálně výbranou větev.
        /// </summary>
        public void InsertCommentBefore()
        {
            editor.InsertCommentBefore();
        }

        /// <summary>
        /// Vložení specifického komentáře za aktuálně výbranou větev
        /// </summary>
        /// <param name="comment">vkládaný komentář</param>
        public void InsertCommentAfter(XmlComment comment)
        {
            xmlElementTreeView.InsertCommentAfter(comment);
        }

        /// <summary>
        /// Vložení specifického komentáře za aktuálně výbranou větev
        /// </summary>
        public void InsertCommentAfter()
        {
            editor.InsertCommentAfter();
        }

        /// <summary>
        /// Zobrazení úzlu před výjmutím
        /// </summary>
        /// <param name="node">Zobrazovaný úzel</param>
        public void ShowCut(XmlNode node)
        {
            xmlElementTreeView.ShowCut(node);
        }

        /// <summary>
        /// Skrýtí úzlu k vyjmutí
        /// </summary>
        /// <param name="node">Daný úzel</param>
        public void HideCut(XmlNode node)
        {
            xmlElementTreeView.HideCut(node);
        }

        #region IClipboardHandler

        /// <exclude/>
        public bool EnableCut
        {
            get
            {
                return editor != null && editor.IsCutEnabled;
            }
        }

        /// <exclude/>
        public bool EnableCopy
        {
            get
            {
                return editor != null && editor.IsCopyEnabled;
            }
        }

        /// <exclude/>
        public bool EnablePaste
        {
            get
            {
                return editor != null && editor.IsPasteEnabled;
            }
        }

        /// <exclude/>
        public bool EnableDelete
        {
            get
            {
                return editor != null && editor.IsDeleteEnabled;
            }
        }

        /// <exclude/>
        public bool EnableSelectAll
        {
            get
            {
                return false;
            }
        }

        /// <exclude/>
        public void Cut()
        {
            editor.Cut();
        }

        /// <exclude/>
        public void Copy()
        {
            editor.Copy();
        }

        /// <exclude/>
        public void Paste()
        {
            editor.Paste();
        }

        /// <exclude/>
        public void Delete()
        {
            editor.Delete();
        }

        /// <exclude/>
        public void SelectAll()
        {
        }

        #endregion

        /// <summary>
        /// Uvolnění objaktu
        /// </summary>
        /// <param name="disposing"></param>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
                if (components != null)
                    components.Dispose();
            base.Dispose(disposing);
        }

        /// <summary>
        /// Vytvoření nového AddElementDialog.
        /// </summary>
        /// <param name="elementNames">Názvy alementů, které budou zobrazeny v dialogovém okně</param>
        protected virtual IAddXmlNodeDialog CreateAddElementDialog(string[] elementNames)
        {
            AddXmlNodeDialog dialog = new AddXmlNodeDialog(elementNames)
            {
                Text = GResources.GetResourceText(29450225), //RC 29450225 : Přidání elementu
                CustomNameLabelText = GResources.GetResourceText(29450226) + ':' //RC 29450226 : Vlastní
            };
            return dialog;
        }

        /// <summary>
        /// Vytvoření nového AddAttributeDialog.
        /// </summary>
        /// <param name="attributeNames">Názvy atributů, které budou zobrazené v dialogovém okně.</param>
        protected virtual IAddXmlNodeDialog CreateAddAttributeDialog(string[] attributeNames)
        {
            AddXmlNodeDialog dialog = new AddXmlNodeDialog(attributeNames)
            {
                Text = GResources.GetResourceText(29450225), //RC 29450225 : Přidání elementu
                CustomNameLabelText = GResources.GetResourceText(29450226) + ':' //RC 29450226 : Vlastní
            };
            return dialog;
        }

        /// <summary>
        /// Odstranění vybrané větve.
        /// </summary>
        protected void XmlElementTreeViewDeleteKeyPressed(object source, EventArgs e)
        {
            Delete();
        }

        #region Forms Designer generated code

        System.ComponentModel.IContainer components = null;

        /// <summary>
        /// This method is required for Windows Forms designer support.
        /// Do not change the method contents inside the source code editor. The Forms designer might
        /// not be able to load this method if it was changed manually.
        /// </summary>
        void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(XmlTreeViewContainerControl));
            Gordic.GFE.Parsers.AddIns.ExtTreeViewComparer extTreeViewComparer1 = new Gordic.GFE.Parsers.AddIns.ExtTreeViewComparer();
            this.splitContainer = new System.Windows.Forms.SplitContainer();
            this.xmlElementTreeView = new Gordic.GFE.WinClient.XmlEditor.XmlTreeViewControl();
            this.attributesGrid = new System.Windows.Forms.PropertyGrid();
            this.errMessTextBox = new System.Windows.Forms.RichTextBox();
            this.textBox = new System.Windows.Forms.RichTextBox();
            ((System.ComponentModel.ISupportInitialize)(this.splitContainer)).BeginInit();
            this.splitContainer.Panel1.SuspendLayout();
            this.splitContainer.Panel2.SuspendLayout();
            this.splitContainer.SuspendLayout();
            this.SuspendLayout();
            // 
            // splitContainer
            // 
            resources.ApplyResources(this.splitContainer, "splitContainer");
            this.splitContainer.Name = "splitContainer";
            // 
            // splitContainer.Panel1
            // 
            this.splitContainer.Panel1.Controls.Add(this.xmlElementTreeView);
            // 
            // splitContainer.Panel2
            // 
            this.splitContainer.Panel2.Controls.Add(this.attributesGrid);
            this.splitContainer.Panel2.Controls.Add(this.errMessTextBox);
            this.splitContainer.Panel2.Controls.Add(this.textBox);
            this.splitContainer.TabStop = false;
            // 
            // xmlElementTreeView
            // 
            this.xmlElementTreeView.AllowDrop = true;
            this.xmlElementTreeView.CanClearSelection = true;
            resources.ApplyResources(this.xmlElementTreeView, "xmlElementTreeView");
            this.xmlElementTreeView.Document = null;
            this.xmlElementTreeView.DrawMode = System.Windows.Forms.TreeViewDrawMode.OwnerDrawText;
            this.xmlElementTreeView.HideSelection = false;
            this.xmlElementTreeView.IsSorted = false;
            this.xmlElementTreeView.Name = "xmlElementTreeView";
            this.xmlElementTreeView.NodeSorter = extTreeViewComparer1;
            this.xmlElementTreeView.DeleteKeyPressed += new System.EventHandler(this.XmlElementTreeViewDeleteKeyPressed);
            this.xmlElementTreeView.AfterSelect += new System.Windows.Forms.TreeViewEventHandler(this.XmlElementTreeViewAfterSelect);
            // 
            // attributesGrid
            // 
            resources.ApplyResources(this.attributesGrid, "attributesGrid");
            this.attributesGrid.Name = "attributesGrid";
            this.attributesGrid.PropertySort = System.Windows.Forms.PropertySort.Alphabetical;
            this.attributesGrid.ToolbarVisible = false;
            this.attributesGrid.PropertyValueChanged += new System.Windows.Forms.PropertyValueChangedEventHandler(this.AttributesGridPropertyValueChanged);
            // 
            // errMessTextBox
            // 
            resources.ApplyResources(this.errMessTextBox, "errMessTextBox");
            this.errMessTextBox.Name = "errMessTextBox";
            this.errMessTextBox.TabStop = false;
            // 
            // textBox
            // 
            resources.ApplyResources(this.textBox, "textBox");
            this.textBox.Name = "textBox";
            this.textBox.TabStop = false;
            this.textBox.TextChanged += new System.EventHandler(this.TextBoxTextChanged);
            // 
            // XmlTreeViewContainerControl
            // 
            this.Controls.Add(this.splitContainer);
            this.Name = "XmlTreeViewContainerControl";
            resources.ApplyResources(this, "$this");
            this.splitContainer.Panel1.ResumeLayout(false);
            this.splitContainer.Panel2.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.splitContainer)).EndInit();
            this.splitContainer.ResumeLayout(false);
            this.ResumeLayout(false);

        }
        private System.Windows.Forms.RichTextBox textBox;
        private System.Windows.Forms.PropertyGrid attributesGrid;
        private System.Windows.Forms.RichTextBox errMessTextBox;
        private XmlTreeViewControl xmlElementTreeView;
        private System.Windows.Forms.SplitContainer splitContainer;

        #endregion

        /// <exclude/>
        protected void TextBoxTextChanged(object sender, EventArgs e)
        {
            if (editor != null && !isIgnoreDirty)
            {
                bool previousIsDirty = dirty;
                editor.TextContentChanged();
                OnXmlChanged(previousIsDirty);
            }
        }
        bool isIgnoreDirty;
        /// <exclude/>
        protected void XmlElementTreeViewAfterSelect(object sender, TreeViewEventArgs e)
        {
            isIgnoreDirty = true;
            editor.SelectedNodeChanged();
            isIgnoreDirty = false;
        }

        /// <exclude/>
        protected void AttributesGridPropertyValueChanged(object s, PropertyValueChangedEventArgs e)
        {
            bool previousIsDirty = dirty;
            editor.AttributeValueChanged();
            OnXmlChanged(previousIsDirty);
        }

        void InitImages()
        {
            if (components == null)
                components = new Container();
            ImageList images = new ImageList(components);

            System.Drawing.Image xmlElementImage = System.Drawing.Image.FromStream(typeof(XmlTreeViewContainerControl).Assembly.GetManifestResourceStream("Gordic.GFE.WinClient.Resources.xmleditor.XmlElementTreeNodeIcon.png"));
            images.Images.Add(XmlElementTreeNode.XmlElementTreeNodeImageKey, xmlElementImage);
            images.Images.Add(XmlElementTreeNode.XmlElementTreeNodeGhostImageKey, IconService.GetGhostBitmap(new Bitmap(xmlElementImage)));

            System.Drawing.Image xmlTextImage = System.Drawing.Image.FromStream(typeof(XmlTreeViewContainerControl).Assembly.GetManifestResourceStream("Gordic.GFE.WinClient.Resources.xmleditor.XmlTextTreeNodeIcon.png"));
            images.Images.Add(XmlTextTreeNode.XmlTextTreeNodeImageKey, xmlTextImage);
            images.Images.Add(XmlTextTreeNode.XmlTextTreeNodeGhostImageKey, IconService.GetGhostBitmap(new Bitmap(xmlTextImage)));

            System.Drawing.Image xmlCommentImage = System.Drawing.Image.FromStream(typeof(XmlTreeViewContainerControl).Assembly.GetManifestResourceStream("Gordic.GFE.WinClient.Resources.xmleditor.XmlCommentTreeNodeIcon.png"));
            images.Images.Add(XmlCommentTreeNode.XmlCommentTreeNodeImageKey, xmlCommentImage);
            images.Images.Add(XmlCommentTreeNode.XmlCommentTreeNodeGhostImageKey, IconService.GetGhostBitmap(new Bitmap(xmlCommentImage)));

            xmlElementTreeView.ImageList = images;
        }

        void OnXmlChanged(bool previousIsDirty)
        {
            if (previousIsDirty != dirty)
                OnDirtyChanged();
        }

        void OnDirtyChanged()
        {
            DirtyChanged?.Invoke(this, new EventArgs());
        }

        bool IsAttributesGridVisible
        {
            get
            {
                return attributesGridVisible;
            }
            set
            {
                attributesGridVisible = value;
                if (value)
                {
                    attributesGrid.BringToFront();
                    attributesGrid.TabStop = true;
                    IsTextBoxVisible = false;
                    IsErrorMessageTextBoxVisible = false;
                }
                else
                {
                    attributesGrid.SendToBack();
                    attributesGrid.TabStop = false;
                }
            }
        }

        bool IsTextBoxVisible
        {
            set
            {
                textBoxVisible = value;
                if (value)
                {
                    textBox.BringToFront();
                    textBox.TabStop = true;
                    IsAttributesGridVisible = false;
                    IsErrorMessageTextBoxVisible = false;
                }
                else
                {
                    textBox.SendToBack();
                    textBox.TabStop = false;
                }
            }
        }
        /// <summary>
        /// Slovnik sekce INFO
        /// </summary>
        /// <returns></returns>
        internal Dictionary<string, string> GetInfo()
        {
            Dictionary<string, string> result = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
            if (Document == null)
                return result;

            XmlNodeList list = Document.GetElementsByTagName("info");

            if (list.Count != 0)
                foreach (XmlNode item in list)
                    foreach (XmlAttribute atribute in item.Attributes)
                        if (!string.IsNullOrEmpty(atribute.Name)
                            && !result.ContainsKey(atribute.Name))
                            result.Add(atribute.Name, atribute.Value);
            return result;
        }

        /// <summary>
        /// Typ sestavy
        /// </summary>
        /// <returns></returns>
        internal GString GetFormatType()
        {
            if (Document == null)
                throw new Exception(GResources.GetResourceText(29450227)); //RC 29450227 : Nelze zjistit formát sestavy!

            return new GString(Document.DocumentElement.GetAttribute("type"));
        }

        /// <summary>
        /// aktualizace sekce INFO
        /// </summary>
        /// <param name="dictionary">aktuální hodnoty sekce</param>
        /// <param name="file">otevřený soubor sestavení</param>
        internal void AppendInfo(Dictionary<string, string> dictionary, OpenedFile file)
        {
            // případ uložení do DB
            InfoSectionViewEntry entry = InfoSectionViewPad.Instance.Entries.FirstOrDefault(entr => entr.File == file);
            if (entry != null)
            {
                int index = 0;
                while (index < entry.AttrList.Count)
                {
                    if (dictionary.ContainsKey(entry.AttrList[index]))
                        entry.AttrList[entry.AttrList[index]] = dictionary[entry.AttrList[index]];
                    index++;
                }
                foreach (var item in dictionary)
                    if (!entry.AttrList.ExistsByKey(k => k.Equals(item.Key)))
                        entry.AttrList.Add(item.Key, item.Value);
            }

            XmlNodeList list = Document.GetElementsByTagName("info");

            if (list.Count != 0)
                foreach (XmlNode item in list)
                    foreach (XmlAttribute atribute in item.Attributes)
                        if (!string.IsNullOrEmpty(atribute.Name)
                            && dictionary.ContainsKey(atribute.Name))
                        {
                            atribute.Value = dictionary[atribute.Name];
                            dictionary.Remove(atribute.Name);
                        }

            if (list.Count != 0)
            {
                XmlElement element = list.Item(list.Count - 1) as XmlElement;
                foreach (KeyValuePair<string, string> item in dictionary)
                {
                    XmlAttribute attribut = Document.CreateAttribute(item.Key);
                    attribut.Value = item.Value;
                    element.Attributes.Append(attribut);
                }
            }
            dirty = true;
        }
    }
}
