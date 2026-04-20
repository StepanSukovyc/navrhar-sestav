//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.PropertyOptions.cs                       </Name>
//    <Description> Hlavní formulář dialogového okna vlastnosti objektu/ů       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-03-07                                                  </Created>
//  </FileHeader>

using System;
using System.Collections;
using System.Collections.Generic;
using System.Drawing;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.XmlForms;
using Gordic.General;
using Gordic.GFE.Parsers.AddIns;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Hlavní formulář dialogového okna vlastnosti objektu/ů
    /// </summary>
    public class PropertyOptions : BaseXmlForm
    {
        /// <summary>
        /// Položka stromu vlastnosti
        /// </summary>
        sealed class NodeItem
        {
            /// <summary>
            /// Panel ovladače
            /// </summary>
            public IDialogPanelDescriptor Descriptor { get; set; }

            /// <summary>
            /// Uživatelský ovladač
            /// </summary>
            public Control UserControl { get => Descriptor == null || Descriptor.DialogPanel == null ? null : Descriptor.DialogPanel.Control; }

            /// <summary>
            /// Ikonka větve
            /// </summary>
            public Icon Icon { get => Descriptor != null && Descriptor.DialogPanel != null ? Descriptor.DialogPanel.Icon : null; }

            /// <summary>
            /// Titulek položky
            /// </summary>
            public string Title { get => Descriptor == null ? string.Empty : Descriptor.Label; }

            /// <summary>
            /// Řetězcová prezentace obsahu položky
            /// </summary>
            /// <returns></returns>
            public override string ToString() => string.IsNullOrEmpty(Title) ? base.ToString() : Title;

            /// <summary>
            /// Kvůli ToString()
            /// </summary>
            /// <returns></returns>
            public override int GetHashCode() => base.GetHashCode();
        }

        ArrayList panels = new ArrayList();
        TreeView treeView;
        SplitContainer splitContainerPanel;
        Panel pnlValue;

        /// <summary>
        /// Indikuje, že dialogové okno je vyvoláno z tabulky vlastnosti
        /// </summary>
        public bool ByPropertyGrid { get; set; }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="dialogName">název dialogu</param>
        public PropertyOptions(string dialogName)
            : this(dialogName, null)
        {
            if (Owner == null)
                return;

            AddInTreeNode node = AddInTree.GetTreeNode("/PropertyDialog");
            Icon = WinFormsResourceService.GetIcon(node.Icon);
            AddOptionPanels(node.BuildChildItems<IDialogPanelDescriptor>(this));
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="dialogName">název dialogu</param>
        /// <param name="node">větev konfiguračníh ostromu</param>
        /// <param name="view">Aktuální pohled na obsah</param>
        public PropertyOptions(string dialogName, AddInTreeNode node, IViewContent view)
            : this(dialogName, node)
        {
            if (Owner == null)
                return;

            if (node == null)
            {
                node = AddInTree.GetTreeNode("/PropertyDialog");
                Icon = WinFormsResourceService.GetIcon(node.Icon);
            }

            AddOptionPanels(node.BuildChildItems<IDialogPanelDescriptor>(this), view);
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="dialogName">název dialogu</param>
        /// <param name="node">větev konfiguračníh ostromu</param>
        /// <param name="view">Aktuální pohled na obsah</param>
        /// <param name="context">kontext</param>
        public PropertyOptions(string dialogName, AddInTreeNode node, IViewContent view, System.ComponentModel.ITypeDescriptorContext context)
            : this(dialogName, node)
        {
            if (Owner == null)
                return;

            if (node == null)
                node = AddInTree.GetTreeNode("/PropertyDialog");

            Icon = WinFormsResourceService.GetIcon(node.Icon);
            AddOptionPanels(node.BuildChildItems<IDialogPanelDescriptor>(this), view, context);
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="dialogName">název dialogu</param>
        /// <param name="node">větev konfiguračníh ostromu</param>
        /// <param name="context"></param>
        public PropertyOptions(string dialogName, AddInTreeNode node, System.ComponentModel.ITypeDescriptorContext context)
            : this(dialogName, node)
        {
            if (Owner == null || node == null)
                return;

            Icon = WinFormsResourceService.GetIcon(node.Icon);
            AddOptionPanels(node.BuildChildItems<IDialogPanelDescriptor>(this), context);
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="dialogName">název dialogu</param>
        /// <param name="node">větev konfiguračníh ostromu</param>
        private PropertyOptions(string dialogName, AddInTreeNode node)
        {
            System.Reflection.Assembly asm = Assembly;
            if (asm == null)
            {
                MessageService.ShowErrorFormatted(string.Join(" ", GResources.GetResourceText(29450406), GResources.GetResourceText(29450407))); //RC 29450407 : Modul není dostupný!
                return;
            }

            SetupLocalizedXFRM(asm.GetName().Name + ".Resources.forms.property.PropertyOptionsDialog.xfrm", asm);

            this.Text = dialogName;
            treeView = ((TreeView)ControlDictionary["treeView"]);
            treeView.BeforeSelect += new TreeViewCancelEventHandler(BeforeSelectNode);
            treeView.Click += new System.EventHandler(HandleClick);

            ImageList list = new ImageList
            {
                ColorDepth = ColorDepth.Depth32Bit
            };
            list.Images.Add(new Bitmap(1, 1));
            list.Images.Add(Properties.Resources.Icons__Gin__sipka_doprava);
            treeView.ImageList = list;

            splitContainerPanel = ((SplitContainer)ControlDictionary["splitContainerPanel"]);
            pnlValue = ((Panel)ControlDictionary["pnlValue"]);
            ControlDictionary["okButton"].Click += new EventHandler(AcceptEvent);
            ControlDictionary["defaultButton"].Click += new EventHandler(DefaultEvent);
            ControlDictionary["cancelButton"].Click += new EventHandler(CancelEvent);
            Owner = ProcessService.Desktop.MainForm;
        }

        /// <summary>
        /// Získání nové hodnoty - PropertyGrid
        /// </summary>
        /// <returns>Nová hodnota</returns>
        public object GetPropertyValue()
        {
            if (treeView.SelectedNode != null && treeView.SelectedNode.Tag is NodeItem)
                if ((treeView.SelectedNode.Tag as NodeItem).Descriptor.DialogPanel is AbstractPropertyPanel)
                    return ((treeView.SelectedNode.Tag as NodeItem).Descriptor.DialogPanel as AbstractPropertyPanel).PropertyValue;

            if (treeView.Nodes.Count == 1 && treeView.Nodes[0] != null && treeView.Nodes[0].Tag is NodeItem)
                if ((treeView.Nodes[0].Tag as NodeItem).Descriptor != null && (treeView.Nodes[0].Tag as NodeItem).Descriptor.DialogPanel is AbstractPropertyPanel)
                    return ((treeView.Nodes[0].Tag as NodeItem).Descriptor.DialogPanel as AbstractPropertyPanel).PropertyValue;

            return null;
        }

        /// <exclude/>
        protected override void OnLoad(EventArgs e)
        {
            base.OnLoad(e);
            treeView.SelectedNode = TreeViewHelper.GetNodeByPath(treeView, PropertyService.Get("Dialogs.PropertyOptions.LastSelectedCategory", "text"));
            AfterSelect(treeView, null);
            treeView.AfterSelect += new System.Windows.Forms.TreeViewEventHandler(AfterSelect);
        }
        /// <exclude/>
        protected override void OnClosing(System.ComponentModel.CancelEventArgs e)
        {
            if (treeView.SelectedNode != null)
                PropertyService.Set("Dialogs.PropertyOptions.LastSelectedCategory", TreeViewHelper.GetPath(treeView.SelectedNode));

            base.OnClosing(e);
        }

        void AddOptionPanels(List<IDialogPanelDescriptor> list, System.ComponentModel.ITypeDescriptorContext context)
        {
            foreach (IDialogPanelDescriptor descriptor in list)
                if (descriptor != null && descriptor.DialogPanel != null && descriptor.DialogPanel.Control != null)
                {
                    if (descriptor.DialogPanel is AbstractPropertyPanel)
                        (descriptor.DialogPanel as AbstractPropertyPanel).Context = context;

                    AddNode(new NodeItem() { Descriptor = descriptor });
                    descriptor.DialogPanel.ReceiveDialogMessage(DialogMessage.activated);
                    panels.Add(descriptor.DialogPanel);
                    if (descriptor.ChildDialogPanelDescriptors != null)
                        AddOptionPanels(descriptor.ChildDialogPanelDescriptors);
                }
        }
        void DefaultEvent(object sender, EventArgs e)
        {
            if (treeView.SelectedNode != null && treeView.SelectedNode.Index != -1)
                (panels[treeView.SelectedNode.Index] as AbstractPropertyPanel).ReceiveDialogMessage(DialogMessage.def);
        }
        void AddOptionPanels(IEnumerable<IDialogPanelDescriptor> list)
        {
            AddOptionPanels(list, null);
        }
        void AddOptionPanels(IEnumerable<IDialogPanelDescriptor> list, IViewContent view)
        {
            foreach (IDialogPanelDescriptor descriptor in list)
                if (descriptor != null && descriptor.DialogPanel != null && descriptor.DialogPanel.Control != null)
                {
                    if (descriptor.DialogPanel is AbstractPropertyPanel && view != null)
                    {
                        (descriptor.DialogPanel as AbstractPropertyPanel).View = view;
                        (descriptor.DialogPanel as AbstractPropertyPanel).AcceptEvent += view.ShowPropertyDialogAccepted;
                        if (!(descriptor.DialogPanel as AbstractPropertyPanel).VisibleCondition())
                            continue;
                    }

                    AddNode(new NodeItem() { Descriptor = descriptor });
                    descriptor.DialogPanel.ReceiveDialogMessage(DialogMessage.activated);
                    panels.Add(descriptor.DialogPanel);
                    if (descriptor.ChildDialogPanelDescriptors != null)
                        AddOptionPanels(descriptor.ChildDialogPanelDescriptors);
                }
        }
        void AddOptionPanels(IEnumerable<IDialogPanelDescriptor> list, IViewContent view, System.ComponentModel.ITypeDescriptorContext context)
        {
            foreach (IDialogPanelDescriptor descriptor in list)
                if (descriptor != null && descriptor.DialogPanel != null && descriptor.DialogPanel.Control != null)
                {
                    if (descriptor.DialogPanel is AbstractPropertyPanel)
                        (descriptor.DialogPanel as AbstractPropertyPanel).Context = context;

                    if (descriptor.DialogPanel is AbstractPropertyPanel && view != null)
                    {
                        (descriptor.DialogPanel as AbstractPropertyPanel).View = view;
                        (descriptor.DialogPanel as AbstractPropertyPanel).AcceptEvent += view.ShowPropertyDialogAccepted;
                        if (context == null && !(descriptor.DialogPanel as AbstractPropertyPanel).VisibleCondition())
                            continue;
                    }

                    AddNode(new NodeItem() { Descriptor = descriptor });
                    descriptor.DialogPanel.ReceiveDialogMessage(DialogMessage.activated);
                    panels.Add(descriptor.DialogPanel);
                    if (descriptor.ChildDialogPanelDescriptors != null)
                        AddOptionPanels(descriptor.ChildDialogPanelDescriptors);
                }
        }
        void AddNode(NodeItem item)
        {
            //TODO: domyslet lepší načtení stromu - nezávislé na okně nastavení NastaveniForm
            treeView.BeginUpdate();
            treeView.Nodes.Add(new TreeNode(item.Title) { Tag = item });
            treeView.EndUpdate();
        }
        void BeforeSelectNode(object sender, TreeViewCancelEventArgs e)
        {
            ResetImageIndex(treeView.Nodes);
            CollapseOrExpandNode(e.Node);
        }
        void ResetImageIndex(TreeNodeCollection nodes)
        {
            foreach (TreeNode node in nodes)
                if (node.Nodes.Count > 0)
                    ResetImageIndex(node.Nodes);
                else
                {
                    node.ImageIndex = 0;
                    node.SelectedImageIndex = 1;
                }
        }
        void HandleClick(object sender, EventArgs e)
        {
            if (treeView.GetNodeAt(treeView.PointToClient(MousePosition)) == treeView.SelectedNode)
                CollapseOrExpandNode(treeView.SelectedNode);
        }
        void CollapseOrExpandNode(TreeNode node)
        {
            if (node != null)
            {
                if (node.Nodes.Count <= 0)
                    return;
                if (node.IsExpanded)
                    node.Collapse();
                else
                    node.Expand();
            }
        }
        void AfterSelect(object sender, TreeViewEventArgs e)
        {
            SetOptionPanelTo(treeView.SelectedNode);
            // pokud v sekce Kategorie obsahuje pouze jednu položku (nebo žádnou)
            // pak jí nezbrazíme
            if (treeView.Nodes.Count <= 1)
                splitContainerPanel.Panel1Collapsed = true;
            else if (splitContainerPanel.Panel1Collapsed)
                splitContainerPanel.Panel1Collapsed = false;
        }
        void SetOptionPanelTo(TreeNode node)
        {
            try
            {
                if (node == null && treeView.Nodes.Count != 0)
                    node = treeView.Nodes[0];

                if (node != null)
                    if (node.Tag != null)
                    {
                        pnlValue.Controls.Clear();
                        NodeItem item = (NodeItem)node.Tag;
                        if (item.Icon != null)
                            Icon = item.Icon;
                        if (!string.IsNullOrEmpty(item.Title))
                            this.Text = item.Title;
                        item.UserControl.Dock = DockStyle.Fill;
                        pnlValue.Controls.Add(item.UserControl);
                    }
                    else if (node.Nodes.Count != 0)
                        SetOptionPanelTo(node.Nodes[0]);
            }
            catch (Exception ex) { LoggingService.Error(ex); }
        }
        void AcceptEvent(object sender, EventArgs e)
        {
            foreach (AbstractOptionPanel pane in panels)
                if (!pane.ReceiveDialogMessage(DialogMessage.ok))
                    return;

            if (!ByPropertyGrid && UndoRedoService.IsTransactionStarted)
                UndoRedoService.Commit();

            DialogResult = DialogResult.OK;
            this.Close();
        }
        void CancelEvent(object sender, EventArgs e)
        {
            foreach (AbstractOptionPanel pane in panels)
                if (!pane.ReceiveDialogMessage(DialogMessage.cancel))
                    return;

            DialogResult = DialogResult.Cancel;
            Close();
        }

    }
}
