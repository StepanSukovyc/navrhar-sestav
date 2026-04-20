//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.VariablesPanel.cs                      </Name>
//    <Description> panel pro práci s proměnnými                                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-05-06                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;
using Gordic.General;
using Gordic.GFE.WinClient.Editor;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.VariablesView;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.WinClient.Base;
using Gordic.GFE.Parsers;
using Gordic.WinForms.Controls;
using Gordic.GFE.WinClient.LinkedFiles;
using Gordic.GFE.WinClient.Services;
using System.IO;

namespace Gordic.GFE.WinClient.Gui.PropertyPanels
{
    /// <summary>
    /// panel pro práci s proměnnými
    /// </summary>
    class VariablesPanel : AbstractPropertyPanel
    {
        #region AbstractPropertyPanel
        /// <summary>
        /// Získání nové hodnoty - PropertyGrid
        /// </summary>
        /// <returns>Nová hodnota</returns>
        public override object PropertyValue { get => null; }

        GrrRegion region;
        /// <summary>
        /// Reakce na tlačítko Výchozí hodnoty
        /// </summary>
        /// <returns>True - Nastavení provedené</returns>
        protected override void SetDefault()
        {
            try
            {
                if (Service != null)
                {
                    List<object> objects = Service.SelectedComponents.FindAll(itm => itm != null && itm is GrrRegion);
                    if (objects.Count != 1)
                        MessageService.ShowWarning(GResources.GetResourceText(29450487)); //RC 29450487 : Budou pozměněny proměnné pouze prvního regionu!
                    region = objects.First() as GrrRegion;
                    if (region != null && region.Variables != null)
                        foreach (var item in region.Variables)
                            lbVariables.Items.Add(new VariableNode(item));
                }
            }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450428) + " VariablesPanel:" + ex.Message); }

            changedVariable = false;
        }
        /// <summary>
        /// Reakce na akceptace změn
        /// </summary>
        /// <returns>TRUE- změna provedená</returns>
        protected override bool Accept()
        {
            if (Service == null)
                return true;

            if (_changedVariables)
            {
                if (region != null)
                {
                    if (!UndoRedoService.IsTransactionStarted)
                        UndoRedoService.StartTransaction(GResources.GetResourceText(29450488)); //RC 29450488 : změna proměnných

                    (region.Variables as ICollection<IVariable>).Clear();

                    foreach (var item in lbVariables.Items)
                        region.Variables.Add(new VariableNode(item as IVariable));
                }
            }
            return base.Accept();
        }

        /// <summary>
        /// Načtení obsahu panelu
        /// </summary>
        public override void LoadPanelContents()
        {
            try
            {
                SetupLocalizedXFRM(AssemblyName + ".Resources.forms.property.VariablesPanel.xfrm");
                lbVariables = (CustomListBox)ControlDictionary["lbVariables"];

                ltbNazev = (GLabeledTextBox)ControlDictionary["ltbNazev"];
                ltbNazev.TextChanged += delegate { if (!loadingValue) changedVariable = true; };
                ltbValue = (GLabeledTextBox)ControlDictionary["ltbValue"];
                ltbValue.TextChanged += delegate { if (!loadingValue) changedVariable = true; };
                ltbValue.DragOver += dragOver;
                ltbValue.DragDrop += dragDrop;
                ltbDataType = (GLabeledTextBox)ControlDictionary["ltbDataType"];
                ltbDataType.TextChanged += delegate { if (!loadingValue) changedVariable = true; };

                ((Button)ControlDictionary["btnApplChanges"]).Click += btnApplChanges_Click;

                lbVariables.SelectedIndexChanged += lbVariables_SelectedIndexChanged;

                lbVariables.OnAddItem += onAddItem;
                lbVariables.OnDeleteItem += onDeleteItem;
                lbVariables.OnShiftDownItem += onShiftDownItem;
                lbVariables.OnShiftUpItem += onShiftUpItem;

                ThreadService.SafeThreadAsyncCall(SetDefault);
            }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450428) + " VariablesPanel.xfrm:" + ex.Message); }
        }

        /// <summary>
        /// Podmínky viditelnosti daného panelu
        /// </summary>
        /// <returns>TRUE - podmínka je splněná</returns>
        public override bool VisibleCondition()
        {
            if (view == null)
                return base.VisibleCondition();

            return Service != null && Service.SelectedComponents.Exists(item => item is GrrRegion);
        }
        #endregion


        bool _changedVariable = false;
        /// <summary>
        /// indikuje změny
        /// </summary>
        public bool changedVariable
        {
            get { return _changedVariable; }
            set
            {
                _changedVariable = value;
                ((Button)ControlDictionary["btnApplChanges"]).Enabled = _changedVariable;
                if (value) _changedVariables = true;
            }
        }

        bool loadingValue = false, _changedVariables = false;
        CustomListBox lbVariables;
        GLabeledTextBox ltbNazev, ltbValue, ltbDataType;

        /// <exclude/>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                ltbValue.DragOver -= dragOver;
                ltbValue.DragDrop -= dragDrop;
            }
            base.Dispose(disposing);
        }

        void dragDrop(object sender, DragEventArgs drgevent)
        {
            dynamic node;
            if (drgevent.Data.GetDataPresent(typeof(StructExtNode)))
            {
                node = (StructExtNode)drgevent.Data.GetData(typeof(StructExtNode));
                ltbValue.Text = ltbValue.Text.Insert(ltbValue.CaretPosition, LocalCommonService.GetText(node.FullName));
            }
            else if (drgevent.Data.GetDataPresent(typeof(LFExtNode)))
            {
                node = (LFExtNode)drgevent.Data.GetData(typeof(LFExtNode));
                ltbValue.Text = ltbValue.Text.Insert(ltbValue.CaretPosition, LocalCommonService.GetText(node.FullName, Path.DirectorySeparatorChar));
            }
            else if (drgevent.Data.GetDataPresent(typeof(string)))
                ltbValue.Text = ltbValue.Text.Insert(ltbValue.CaretPosition, LocalCommonService.GetText((((string)drgevent.Data.GetData(typeof(string))).Split(';').Last())));
            else if (drgevent.Data.GetDataPresent(typeof(VarExtNode)))
                ltbValue.Text = ltbValue.Text.Insert(ltbValue.CaretPosition, LocalCommonService.GetText(((VarExtNode)drgevent.Data.GetData(typeof(VarExtNode)))));
        }
        void dragOver(object sender, DragEventArgs drgevent)
        {
            if (drgevent.Data.GetDataPresent(typeof(StructExtNode))
                || drgevent.Data.GetDataPresent(typeof(LFExtNode))
                || drgevent.Data.GetDataPresent(typeof(string)) 
                || drgevent.Data.GetDataPresent(typeof(VarExtNode)))
                drgevent.Effect = DragDropEffects.Copy;
        }
        void onAddItem(object sender, EventArgs e)
        {
            changedVariable = true;
            lbVariables.Items.Add(new VariableNode() { Name = GResources.GetResourceText(29451510), ValueScript = GResources.GetResourceText(29451511), Region = region });
            lbVariables.SelectedIndex = lbVariables.Items.Count - 1;
        }
        void onDeleteItem(object sender, EventArgs e)
        {
            changedVariable = true;
            int index = lbVariables.SelectedIndex;
            if (index != -1)
            {
                lbVariables.Items.RemoveAt(index);

                if (index < lbVariables.Items.Count)
                    lbVariables.SelectedIndex = index;
            }
        }
        void onShiftDownItem(object sender, EventArgs e)
        {
            changedVariable = true;
            int index = lbVariables.SelectedIndex;
            IVariable v = lbVariables.SelectedItem as IVariable;
            lbVariables.Items.RemoveAt(index);

            if (index == lbVariables.Items.Count - 1)
                lbVariables.Items.Add(v);
            else
                lbVariables.Items.Insert(index + 1, v);

            lbVariables.SelectedIndex = index + 1;
        }
        void onShiftUpItem(object sender, EventArgs e)
        {
            changedVariable = true;
            int index = lbVariables.SelectedIndex;
            IVariable v = lbVariables.SelectedItem as IVariable;
            lbVariables.Items.RemoveAt(index);
            if (lbVariables.Items.Count == 0)
                lbVariables.Items.Add(v);
            else
                lbVariables.Items.Insert(index - 1, v);

            lbVariables.SelectedIndex = index - 1;
        }
        void lbVariables_SelectedIndexChanged(object sender, EventArgs e)
        {
            loadingValue = true;
            IVariable variable = lbVariables.SelectedItem as IVariable;
            if (variable != null)
            {
                ltbNazev.Text = variable.Name;
                ltbValue.Text = variable.ValueScript;
                ltbDataType.Text = variable.DataType;
            }

            loadingValue = false;

            ((GroupBox)ControlDictionary["gbProp"]).Enabled = true;
            ((Button)ControlDictionary["btnApplChanges"]).Enabled = false;
        }
        void btnApplChanges_Click(object sender, EventArgs e)
        {
            IVariable v = lbVariables.SelectedItem as IVariable;
            v.Name = ltbNazev.Text;
            v.ValueScript = ltbValue.Text;
            v.DataType = ltbDataType.Text;

            lbVariables.RefreshSelectedItem();
            changedVariable = false;
        }

    }
}
