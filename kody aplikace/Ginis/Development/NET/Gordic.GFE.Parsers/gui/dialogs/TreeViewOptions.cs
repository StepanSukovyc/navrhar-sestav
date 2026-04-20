//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.TreeViewOptions.cs                       </Name>
//    <Description> Pomocný štítek                                              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Drawing;
using System.Windows.Forms;
using System.Drawing.Drawing2D;
using System.Collections.Generic;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.XmlForms;
using Gordic.GFE.Parsers.Services;
using Gordic.General;
using Gordic.GFE.Parsers.AddIns;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Pomocný štítek
    /// </summary>
    public class GradientHeaderPanel : Label
    {
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="fontSize">velikost písma</param>
        public GradientHeaderPanel(int fontSize)
            : this()
        {
            Font = WinFormsResourceService.LoadFont("Tahoma", fontSize);
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public GradientHeaderPanel()
            : base()
        {
            ResizeRedraw = true;
            Text = String.Empty;
        }
        /// <summary>
        /// Kreslení pozadí
        /// </summary>
        /// <param name="pe">argument kreslení</param>
        protected override void OnPaintBackground(PaintEventArgs pe)
        {
            base.OnPaintBackground(pe);
            Graphics g = pe.Graphics;

            using (Brush brush = new LinearGradientBrush(new Point(0, 0), new Point(Width, Height),
                                                         SystemColors.Window, SystemColors.Control))
                g.FillRectangle(brush, new Rectangle(0, 0, Width, Height));
        }
    }

    /// <summary>
    /// Se používá, když je zapotřebí upravovat více možností
    /// </summary>
    public class TreeViewOptions : BaseXmlForm
    {
        /// <summary>
        /// štítek panelu
        /// </summary>
        protected GradientHeaderPanel optionsPanelLabel;
        /// <summary>
        /// seznam všech panelů
        /// </summary>
        protected List<IDialogPanel> OptionPanels = new List<IDialogPanel>();
        /// <summary>
        /// písmo
        /// </summary>
        protected Font plainFont = null;
        /// <summary>
        /// tučné písmo
        /// </summary>
        protected Font boldFont = null;
        TreeView optionsTreeView;
        /// <exclude/>
        protected void AcceptEvent(object sender, EventArgs e)
        {
            foreach (IDialogPanel pane in OptionPanels)
                if (!pane.ReceiveDialogMessage(DialogMessage.ok))
                    return;
            DialogResult = DialogResult.OK;
        }
        /// <summary>
        /// Obnovení indexů obrázků
        /// </summary>
        /// <param name="nodes">Větve pro obnoveníý</param>
        protected void ResetImageIndex(TreeNodeCollection nodes)
        {
            foreach (TreeNode node in nodes)
                if (node.Nodes.Count > 0)
                    ResetImageIndex(node.Nodes);
                else
                {
                    node.ImageIndex = 2;
                    node.SelectedImageIndex = 3;
                }
        }

        /// <summary>
        /// Indikuje otevření větve (když je FALSE, pak větev se právě otevírá - expanduje)
        /// </summary>
        protected bool b = true;

        /// <summary>
        /// Se provede před otevřením větvís
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void BeforeExpandNode(object sender, TreeViewCancelEventArgs e)
        {
            if (!b)
                return;

            b = false;
            optionsTreeView.BeginUpdate();
            // hledat první koncový uzel (koncové uzly nemají žádné děti)
            TreeNode node = e.Node.FirstNode;
            while (node.Nodes.Count > 0) { node = node.FirstNode; }

            optionsTreeView.CollapseAll();
            node.EnsureVisible();
            node.ImageIndex = 3;
            optionsTreeView.EndUpdate();
            SetOptionPanelTo(node);
            b = true;
        }
        /// <summary>
        /// Se provede před výběrem větve
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void BeforeSelectNode(object sender, TreeViewCancelEventArgs e)
        {
            ResetImageIndex(optionsTreeView.Nodes);
            if (b) CollapseOrExpandNode(e.Node);
        }
        /// <summary>
        /// Kliknutí
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void HandleClick(object sender, EventArgs e)
        {
            if (optionsTreeView.GetNodeAt(optionsTreeView.PointToClient(Control.MousePosition)) == optionsTreeView.SelectedNode && b)
                CollapseOrExpandNode(optionsTreeView.SelectedNode);
        }

        void CollapseOrExpandNode(TreeNode node)
        {
            if (node.Nodes.Count > 0)
            {
                // pouze složky
                if (node.IsExpanded)
                    node.Collapse();
                else
                    node.Expand();
            }
        }
        /// <summary>
        /// Nastavení panelů
        /// </summary>
        /// <param name="node">Větev pro nastavení</param>
        protected void SetOptionPanelTo(TreeNode node)
        {
            if (node != null)
                try
                {
                    if (node.Tag is IDialogPanelDescriptor descriptor && descriptor.DialogPanel != null && descriptor.DialogPanel.Control != null)
                    {
                        if (!OptionPanels.Contains(descriptor.DialogPanel))
                        {
                            descriptor.DialogPanel.Control.Dock = DockStyle.Fill;
                            OptionPanels.Add(descriptor.DialogPanel);
                        }

                        descriptor.DialogPanel.ReceiveDialogMessage(DialogMessage.activated);
                        ControlDictionary["optionControlPanel"].Controls.Clear();
                        ControlDictionary["optionControlPanel"].Controls.Add(descriptor.DialogPanel.Control);
                        optionsPanelLabel.Text = descriptor.Label;
                    }
                }
                catch (Exception ex) { LoggingService.Error(ex); }
        }

        void TreeMouseDown(object sender, MouseEventArgs e)
        {
            TreeNode node = optionsTreeView.GetNodeAt(optionsTreeView.PointToClient(Control.MousePosition));
            if (node != null)
                if (node.Nodes.Count == 0) optionsTreeView.SelectedNode = node;
        }
        /// <summary>
        /// Přidání větví
        /// </summary>
        /// <param name="nodes">Přidávané větve</param>
        /// <param name="dialogPanelDescriptors"></param>
        protected void AddNodes(TreeNodeCollection nodes, IEnumerable<IDialogPanelDescriptor> dialogPanelDescriptors)
        {
            nodes.Clear();
            foreach (IDialogPanelDescriptor descriptor in dialogPanelDescriptors)
            {
                TreeNode newNode = new TreeNode(descriptor.Label)
                {
                    Tag = descriptor,
                    NodeFont = plainFont
                };
                nodes.Add(newNode);
                if (descriptor.ChildDialogPanelDescriptors != null)
                    AddNodes(newNode.Nodes, descriptor.ChildDialogPanelDescriptors);
            }
        }
        /// <summary>
        /// Výběr větve
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void SelectNode(object sender, TreeViewEventArgs e)
        {
            SetOptionPanelTo(optionsTreeView.SelectedNode);
        }
        /// <summary>
        /// Inicializace obrázků
        /// </summary>
        protected void InitImageList()
        {
            ImageList imglist = new ImageList
            {
                ColorDepth = ColorDepth.Depth32Bit
            };
            imglist.Images.Add(IconService.GetBitmap("Icons.16x16.ClosedFolderBitmap"));
            imglist.Images.Add(IconService.GetBitmap("Icons.16x16.OpenFolderBitmap"));
            imglist.Images.Add(new Bitmap(1, 1));
            imglist.Images.Add(IconService.GetBitmap("Icons.16x16.SelectionArrow"));

            optionsTreeView.ImageList = imglist;
        }
        /// <summary>
        /// Zobrazení ikonky otevřené složky
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void ShowOpenFolderIcon(object sender, TreeViewCancelEventArgs e)
        {
            if (e.Node.Nodes.Count > 0)
                e.Node.ImageIndex = e.Node.SelectedImageIndex = 1;
        }
        /// <summary>
        /// Zobrazení ikonky zavřené složky
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void ShowClosedFolderIcon(object sender, TreeViewCancelEventArgs e)
        {
            if (e.Node.Nodes.Count > 0)
                e.Node.ImageIndex = e.Node.SelectedImageIndex = 0;
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="node">větev konfiguračního stromu</param>
        public TreeViewOptions(AddInTreeNode node)
        {
            this.Text = GResources.GetResourceText(29450408); //RC 29450408 : Nastavení
            this.InitializeComponent();

            plainFont = new Font(optionsTreeView.Font, FontStyle.Regular);
            boldFont = new Font(optionsTreeView.Font, FontStyle.Bold);

            InitImageList();

            if (node != null)
                AddNodes(optionsTreeView.Nodes, node.BuildChildItems<IDialogPanelDescriptor>(this));
        }
        /// <summary>
        /// Inicializace objektů
        /// </summary>
        protected void InitializeComponent()
        {
            System.Reflection.Assembly asm = Assembly;
            if (asm == null)
            {
                MessageService.ShowErrorFormatted(string.Join(" ", GResources.GetResourceText(29450406), GResources.GetResourceText(29450407))); //RC 29450407 : Modul není dostupný!
                return;
            }

            Owner = ProcessService.Desktop.MainForm;
            SetupLocalizedXFRM(asm.GetName().Name + ".Resources.forms.options.TreeViewOptionsDialog.xfrm", asm);

            this.optionsPanelLabel = new GradientHeaderPanel
            {
                Font = new Font("Tahoma", 14F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((System.Byte)(0))),
                TextAlign = System.Drawing.ContentAlignment.MiddleLeft,
                BorderStyle = BorderStyle.Fixed3D,
                Dock = DockStyle.Fill
            };
            ControlDictionary["headerPanel"].Controls.Add(optionsPanelLabel);
            Icon = null;
            ControlDictionary["okButton"].Click += new EventHandler(AcceptEvent);

            optionsTreeView = (TreeView)ControlDictionary["optionsTreeView"];
            optionsTreeView.Click += new EventHandler(HandleClick);
            optionsTreeView.BeforeSelect += new TreeViewCancelEventHandler(BeforeSelectNode);
            optionsTreeView.BeforeExpand += new TreeViewCancelEventHandler(ShowOpenFolderIcon);
            optionsTreeView.BeforeCollapse += new TreeViewCancelEventHandler(ShowClosedFolderIcon);
            optionsTreeView.MouseDown += new MouseEventHandler(TreeMouseDown);
        }

        /// <summary>
        /// kvůli načtení valstnosti
        /// </summary>
        /// <param name="e"></param>
        protected override void OnLoad(EventArgs e)
        {
            base.OnLoad(e);
            optionsTreeView.SelectedNode = TreeViewHelper.GetNodeByPath(optionsTreeView, PropertyService.Get("Dialogs.Options.LastSelectedCategory", "designér"));
            SetOptionPanelTo(optionsTreeView.SelectedNode);

            optionsTreeView.AfterSelect += new TreeViewEventHandler(SelectNode);
            optionsTreeView.BeforeExpand += new TreeViewCancelEventHandler(BeforeExpandNode);
        }

        protected override void OnClosing(System.ComponentModel.CancelEventArgs e)
        {
            if (optionsTreeView.SelectedNode != null)
                PropertyService.Set("Dialogs.Options.LastSelectedCategory", TreeViewHelper.GetPath(optionsTreeView.SelectedNode));

            base.OnClosing(e);
        }

        protected override void WndProc(ref Message m)
        {
            const int WM_NCLBUTTONDBLCLK = 0x00A3;

            if (m.Msg == WM_NCLBUTTONDBLCLK)
            {
                this.Size = this.MinimumSize;
                return;
            }

            base.WndProc(ref m);
        }
    }
}
