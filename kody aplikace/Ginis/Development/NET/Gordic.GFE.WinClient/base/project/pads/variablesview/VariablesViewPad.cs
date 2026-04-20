//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.VariablesPad.cs                        </Name>
//    <Description> záložka proměnných regionu Grr sestavy                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-05-03                                                  </Created>
//  </FileHeader>

using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Linq;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Hosting;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;
using Gordic.General;

namespace Gordic.GFE.WinClient.VariablesView
{
    /// <summary>
    /// záložka proměnných regionu Grr sestavy
    /// </summary>
    class VariablesViewPad : AbstractPadContent, IHasPropertyContainer
    {
        sealed class _RichTextBox : RichTextBox
        {
            /// <summary>
            /// indikuje, že přetažení objektu do textového pole je povoleno
            /// </summary>
            public override bool AllowDrop { get { return true; } }

            /// <exclude/>
            protected override void OnDragOver(DragEventArgs drgevent)
            {
                drgevent.Effect = drgevent.Data.GetDataPresent(typeof(StructExtNode)) 
                    ? DragDropEffects.Copy : DragDropEffects.None;
            }
        }

        #region AbstractPadContent
        /// <summary>
        /// Ovladač podložky
        /// </summary>
        public override Control Control { get { return padPanel; } }
        #endregion

        #region IHasPropertyContainer
        /// <summary>
        /// kontejner pro práci s vlastnostmi objektů uvnitř záložky
        /// </summary>
        public PropertyContainer PropertyContainer { get { return variablesViewTree.PropertyContainer; } }
        #endregion

        static VariablesViewPad instance;
        /// <summary>
        /// Instance třídy
        /// </summary>
        public static VariablesViewPad Instance
        {
            get
            {
                if (instance == null)
                    SimpleDesktop.Desktop.GetPad(typeof(VariablesViewPad)).BringPadToFront(SimpleDesktop.Desktop.DesktopLayout);
                return instance;
            }
        }

        /// <summary>
        /// strom ovladače
        /// </summary>
        public VariablesViewTree Tree { get { return variablesViewTree != null ? variablesViewTree.Tree : null; } }

        Panel padPanel = new Panel();
        SplitContainer split = new SplitContainer();
        ToolStrip toolStrip;
        VariablesViewTreeControl variablesViewTree;
        _RichTextBox textBox = new _RichTextBox();
        VarExtNode activeSelected = null;
        ISelectionService previousService;

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public VariablesViewPad()
		{
            instance = this;

            padPanel.SuspendLayout();
            variablesViewTree = new VariablesViewTreeControl();
            variablesViewTree.Dock = DockStyle.Fill;
            variablesViewTree.ItemSelected += variablesViewTreeItemSelected;
            variablesViewTree.NodesChanged += delegate { textBox.Clear(); textBox.Enabled = false; };

            toolStrip = ToolbarService.CreateToolStrip(this, "/Pad/VariablesView/Toolbar");
            toolStrip.Stretch = true;
            toolStrip.GripStyle = System.Windows.Forms.ToolStripGripStyle.Hidden;
            textBox.Dock = DockStyle.Fill;
            textBox.Enabled = false;
            textBox.LostFocus += textBox_LostFocus;
            textBox.DragDrop += textBox_DragDrop;
            split.Orientation = Orientation.Horizontal;
            split.Dock = DockStyle.Fill;
            split.FixedPanel = FixedPanel.None;
            split.Panel1.Controls.AddRange(new Control[] { variablesViewTree });
            split.Panel2.Controls.AddRange(new Control[] { textBox });

            padPanel.Controls.AddRange(new Control[] { split, toolStrip });
            padPanel.ResumeLayout(false);

            SimpleDesktop.Desktop.ActiveContentChanged += DesktopActiveContentChanged;
            // může se stat, že ActiveContent se změní před ActiveViewContent.
            // pokud nový obsah není IHasPropertyContainer a my jsme naslouchali jen ActiveContentChanged,
            // můžeme zobrazit PropertyPad z již neaktivního pohledu
            SimpleDesktop.Desktop.ActiveViewContentChanged += DesktopActiveContentChanged;
            DesktopActiveContentChanged(null, null);
		}

        void textBox_DragDrop(object sender, DragEventArgs drgevent)
        {
            StructExtNode node = (StructExtNode)drgevent.Data.GetData(typeof(StructExtNode));
            if (node != null)
                if (UndoRedoService.Manager != null)
                {
                    UndoRedoService.Manager.CommandDone -= ManagerCommandDone;
                    using (UndoRedoService.StartTransaction(GResources.GetResourceText(29450399))) //RC 29450399 : změna proměnné
                    {
                        textBox.SelectedText = node.FullName;
                        UndoRedoService.Commit();
                    }
                    UndoRedoService.Manager.CommandDone += ManagerCommandDone;
                }
        }

        void ManagerCommandDone(object sender, Parsers.UndoRedoFramework.CommandDoneEventArgs e)
        {
            if (variablesViewTree != null)
                variablesViewTree.RefreshItems();
        }
        void textBox_LostFocus(object sender, EventArgs e)
        {
            if (activeSelected == null)
                return;

            if (!activeSelected.IsRoot && activeSelected.Variable != null)
                using (UndoRedoService.StartTransaction(GResources.GetResourceText(29450399))) //RC 29450399 : změna proměnné
                {
                    activeSelected.Variable.ValueScript = textBox.Text;
                    UndoRedoService.Commit();
                }
        }
        void variablesViewTreeItemSelected(object sender, TreeViewEventArgs e)
        {
            textBox.Clear();

            VariablesViewTree tree = sender as VariablesViewTree;
            if (tree == null)
                return;

            activeSelected = tree.SelectedNode as VarExtNode;
            if (activeSelected == null)
                return;

            if (!activeSelected.IsRoot && activeSelected.Variable != null)
            {
                textBox.Text = activeSelected.Variable.ValueScript;
                textBox.Enabled = true;
            }
            else
                textBox.Enabled = false;
        }
        void DesktopActiveContentChanged(object sender, EventArgs e)
        {
            IHost c = SimpleDesktop.Desktop.ActiveContent as IHost;
            if (c != null)
            {
                ISelectionService service = c.ServiceSelection;
                if (previousService != service)
                {
                    if (c != null)
                    {
                        if (previousService != null)
                            previousService.SelectionChanged -= SetActiveColletion;
                        service.SelectionChanged += SetActiveColletion;
                    }
                    previousService = service;

                    if (UndoRedoService.Manager != null)
                        UndoRedoService.Manager.CommandDone += ManagerCommandDone;
                }
            }
        }
        void SetActiveColletion(object sender, EventArgs e)
        {
            ICollection collection = ((ISelectionService)sender).GetSelectedComponents();
            if (collection != null)
            {
                object[] selArray = new object[collection.Count];
                collection.CopyTo(selArray, 0);
                List<object> regions = selArray.ToList().FindAll(itm => itm is IGRRLabel);
                if (regions.Count == 1)
                    variablesViewTree.SetVariables(regions[0] as IGRRLabel);
            }
        }
    }
}
