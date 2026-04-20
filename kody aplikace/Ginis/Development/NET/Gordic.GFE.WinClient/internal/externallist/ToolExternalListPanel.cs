//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ToolExternalListPanel.cs               </Name>
//    <Description> panel editace seznamů                                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-09                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Drawing;
using System.Windows.Forms;
using Gordic.GFE.Parsers.ExternalList;
using Gordic.GFE.Parsers.Gui;
using Gordic.General;

namespace Gordic.GFE.WinClient.External
{
    /// <summary>
    /// panel editace seznamů
    /// </summary>
    class ToolExternalListPanel : AbstractOptionPanel
    {
        DataGridViewTextBoxColumn cKey, cValue;

        public override void LoadPanelContents()
        {
            SetupLocalizedXFRM(AssemblyName + ".Resources.forms.options.ToolExternalListPanel.xfrm");

            ((ListBox)ControlDictionary["listListBox"]).BeginUpdate();
            try
            {
                foreach (object o in GlobalListLoader.Lists)
                    ((ListBox)ControlDictionary["listListBox"]).Items.Add(o);
            }
            finally { ((ListBox)ControlDictionary["listListBox"]).EndUpdate(); }

            ((ListBox)ControlDictionary["listListBox"]).SelectedIndexChanged += new EventHandler(selectEvent);

            DataGridViewCellStyle dataGridViewCellStyle1 = new DataGridViewCellStyle();
            dataGridViewCellStyle1.Alignment = DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle1.BackColor = SystemColors.ControlDark;
            dataGridViewCellStyle1.Font = new Font("Microsoft Sans Serif", 8.25F, FontStyle.Regular, GraphicsUnit.Point, ((byte)(238)));
            dataGridViewCellStyle1.ForeColor = SystemColors.WindowText;
            dataGridViewCellStyle1.SelectionBackColor = SystemColors.Highlight;
            dataGridViewCellStyle1.SelectionForeColor = SystemColors.HighlightText;
            dataGridViewCellStyle1.WrapMode = DataGridViewTriState.True;

            ((DataGridView)ControlDictionary["gridValues"]).RowHeadersDefaultCellStyle = dataGridViewCellStyle1;
            ((DataGridView)ControlDictionary["gridValues"]).CellValueChanged += ToolExternalListPanel_CellValueChanged;
            ((DataGridView)ControlDictionary["gridValues"]).RowsRemoved += ToolExternalListPanel_RowsRemoved;

            cKey = new DataGridViewTextBoxColumn();
            cKey.AutoSizeMode = DataGridViewAutoSizeColumnMode.Fill;
            cKey.HeaderText = GResources.GetResourceText(29450340); //RC 29450340 : klíč

            cValue = new DataGridViewTextBoxColumn();
            cValue.AutoSizeMode = DataGridViewAutoSizeColumnMode.Fill;
            cValue.HeaderText = GResources.GetResourceText(29450234); //RC 29450234 : hodnota

            ((DataGridView)ControlDictionary["gridValues"]).Columns.AddRange(new DataGridViewColumn[] { cKey, cValue });

            selectEvent(this, EventArgs.Empty);
        }

        void ToolExternalListPanel_RowsRemoved(object sender, DataGridViewRowsRemovedEventArgs e)
        {
            gridListChaged();
        }
        void gridListChaged()
        {
            GlobalList selectedItem = ((ListBox)ControlDictionary["listListBox"]).SelectedItem as GlobalList;
            if (selectedItem != null)
            {
                selectedItem.Items.Clear();

                foreach (DataGridViewRow subitem in ((DataGridView)ControlDictionary["gridValues"]).Rows)
                    if (!string.IsNullOrEmpty(Convert.ToString(subitem.Cells[0].Value)))
                        selectedItem.Items.Add(new GlobalListItem(Convert.ToString(subitem.Cells[0].Value), Convert.ToString(subitem.Cells[1].Value)));
            }
        }

        void ToolExternalListPanel_CellValueChanged(object sender, DataGridViewCellEventArgs e)
        {
            gridListChaged();
        }

        void setNameValue(object sender, EventArgs e)
        {
            GlobalList selectedItem = ((ListBox)ControlDictionary["listListBox"]).SelectedItem as GlobalList;
            selectedItem.DisplayName = ControlDictionary["nameTextBox"].Text;            
        }

        void selectEvent(object sender, EventArgs e)
        {
            ControlDictionary["nameTextBox"].TextChanged -= new EventHandler(setNameValue);
            ((DataGridView)ControlDictionary["gridValues"]).RowsRemoved -= ToolExternalListPanel_RowsRemoved;

            ((DataGridView)ControlDictionary["gridValues"]).Rows.Clear();

            if (((ListBox)ControlDictionary["listListBox"]).SelectedItems.Count == 1)
            {
                GlobalList selectedItem = ((ListBox)ControlDictionary["listListBox"]).SelectedItem as GlobalList;
                if (selectedItem != null)
                {
                    ControlDictionary["nameTextBox"].Text = selectedItem.DisplayName;
                    ControlDictionary["idTextBox"].Text = selectedItem.ID;
                    foreach (var item in selectedItem.Items)
                        ((DataGridView)ControlDictionary["gridValues"]).Rows.Add(new string[] { item.Key, item.Value });
                }
            }
            else
            {
                ControlDictionary["nameTextBox"].Text = string.Empty;
                ControlDictionary["idTextBox"].Text = string.Empty;
            }
            ControlDictionary["nameTextBox"].TextChanged += new EventHandler(setNameValue);
            ((DataGridView)ControlDictionary["gridValues"]).RowsRemoved += ToolExternalListPanel_RowsRemoved;
        }

        /// <summary>
        /// Uložení obsahu panelu
        /// </summary>
        /// <returns></returns>
        public override bool StorePanelContents()
        {
            List<GlobalList> newlist = new List<GlobalList>();
            foreach (GlobalList tool in ((ListBox)ControlDictionary["listListBox"]).Items)
                newlist.Add(tool);

            GlobalListLoader.Lists = newlist;
            GlobalListLoader.SaveLists();

            return true;
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // ToolExternalListPanel
            // 
            this.Name = "ToolExternalListPanel";
            this.ResumeLayout(false);

        }

    }
}
