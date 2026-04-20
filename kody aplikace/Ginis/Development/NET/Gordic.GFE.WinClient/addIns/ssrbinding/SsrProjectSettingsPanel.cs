//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SsrProjectSettingsPanel.cs             </Name>
//    <Description> panel editace SSR položky                                   </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-05-28                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Services;
using Gordic.Report.Implementation;
using Gordic.WinForms.Controls;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.Project;

namespace Gordic.GFE.WinClient.SsrBinding
{
    /// <summary>
    /// panel editace nastavení SSR projektu
    /// </summary>
    class SsrProjectSettingsPanel : AbstractPropertyPanel
    {
        #region AbstractPropertyPanel
        /// <summary>
        /// Získání nové hodnoty - PropertyGrid
        /// </summary>
        /// <returns>Nová hodnota</returns>
        public override object PropertyValue { get => null; }
        
        /// <summary>
        /// Reakce na tlačítko Výchozí hodnoty
        /// </summary>
        /// <returns>True - Nastavení provedené</returns>
        protected override void SetDefault()
        {
            dgvTag.Rows.Clear();
            currentAttributes = new Dictionary<string, Dictionary<string, string>>();
            if (fn != null && fn.Item is SsrProject)
            {
                foreach (var item in (fn.Item as SsrProject).Elements.FindAll(el=> !(el is GSsrFile)))
                {
                    cbElements.Items.Add(item.ElementName);
                    if (!currentAttributes.ContainsKey(item.ElementName))
                        currentAttributes.Add(item.ElementName, new Dictionary<string, string>());

                    foreach (var subItem in item.Attributes)
                        if (!currentAttributes[item.ElementName].ContainsKey(subItem.Key))
                            currentAttributes[item.ElementName].Add(subItem.Key, subItem.Value);
                        else currentAttributes[item.ElementName][subItem.Key] = subItem.Value;
                }

                if (cbElements.Items.Count != 0)
                    cbElements.SelectedIndex = 0;
            }
            _changeTag = false;
        }

        /// <summary>
        /// Načtení obsahu panelu
        /// </summary>
        public override void LoadPanelContents()
        {
            SetupLocalizedXFRM(AssemblyName + ".addIns.ssrbinding.SsrProjectSettingsPanel.xfrm");

            cbElements = (GLabeledComboBox)ControlDictionary["cbElements"];
            cbElements.SelectedIndexChanged += delegate { RefreshByCb(); };

            btnAdd = (Button)ControlDictionary["btnAdd"];
            btnAdd.Click += AddClick;
            btnDelete = (Button)ControlDictionary["btnDelete"];
            btnDelete.Click += DeleteClick;

            DataGridViewCellStyle dataGridViewCellStyle1 = new DataGridViewCellStyle
            {
                Alignment = DataGridViewContentAlignment.MiddleLeft,
                BackColor = SystemColors.ControlDark,
                Font = new Font("Microsoft Sans Serif", 8.25F, FontStyle.Regular, GraphicsUnit.Point, ((byte)(238))),
                ForeColor = SystemColors.WindowText,
                SelectionBackColor = SystemColors.Highlight,
                SelectionForeColor = SystemColors.HighlightText,
                WrapMode = DataGridViewTriState.True
            };

            dgvTag = (DataGridView)ControlDictionary["dgvTag"];
            dgvTag.RowHeadersDefaultCellStyle = dataGridViewCellStyle1;
            dgvTag.CellValueChanged += delegate { RefreshItems(); };
            dgvTag.RowsAdded += delegate { RefreshItems(); };
            dgvTag.RowsRemoved += delegate { RefreshItems(); };

            m_znacka = new DataGridViewTextBoxColumn
            {
                AutoSizeMode = DataGridViewAutoSizeColumnMode.Fill,
                HeaderText = GResources.GetResourceText(29450468) //RC 29450468 : značka
            };

            m_hodnota = new DataGridViewTextBoxColumn
            {
                AutoSizeMode = DataGridViewAutoSizeColumnMode.Fill,
                HeaderText = GResources.GetResourceText(29450234) //RC 29450234 : hodnota
            };

            dgvTag.Columns.AddRange(new DataGridViewColumn[] { m_znacka, m_hodnota });
            fn = LocalCommonService.SelectedObject as IFileProjectItemHandler;
            SetDefault();
        }

        /// <summary>
        /// Reakce na akceptace změn
        /// </summary>
        /// <returns>TRUE- změna provedená</returns>
        protected override bool Accept()
        {
            if (fn != null)
            {
                if (_changeTag)
                {
                    RefreshItems();
                    (fn.Item as SsrProject).Elements.RemoveAll(el => !(el is GSsrFile));
                    foreach (var item in currentAttributes)
                    {
                        GSsrElement ele = new GSsrElement(item.Key);
                        ele.Attributes.AddRange(currentAttributes[item.Key]);
                        (fn.Item as SsrProject).Elements.Add(ele);
                    }
                    ProjectService.SaveSolution();
                }
            }
            return base.Accept();
        }

        /// <summary>
        /// Podmínky viditelnosti daného panelu
        /// </summary>
        /// <returns>TRUE - podmínka je splněná</returns>
        public override bool VisibleCondition()
        {
            if (fn == null)
                fn = LocalCommonService.SelectedObject as IFileProjectItemHandler;
            return fn is SsrProjectNode;
        }
        #endregion

        IFileProjectItemHandler fn;
        bool _changeTag = false;
        GLabeledComboBox cbElements;
        Button btnAdd, btnDelete;
        DataGridView dgvTag;
        DataGridViewTextBoxColumn m_znacka, m_hodnota;

        Dictionary<string, Dictionary<string, string>> currentAttributes = new Dictionary<string, Dictionary<string, string>>();
        bool isRefresh;
        void RefreshByCb()
        {
            isRefresh = true;
            string selItem = Convert.ToString(cbElements.SelectedItem);
            dgvTag.Rows.Clear();

            if (!string.IsNullOrEmpty(selItem) && currentAttributes.ContainsKey(selItem))
                foreach (var subitem in currentAttributes[selItem])
                    dgvTag.Rows.Add(new string[] { subitem.Key, subitem.Value });
            isRefresh = false;
        }
        void RefreshItems()
        {
            if (isRefresh)
                return;

            _changeTag = true;
            string selItem = Convert.ToString(cbElements.SelectedItem);
            if (!string.IsNullOrEmpty(selItem) && currentAttributes.ContainsKey(selItem))
                foreach (DataGridViewRow subitem in dgvTag.Rows)
                    if (subitem.Cells[0].Value != null)
                    {
                        if (!currentAttributes[selItem].ContainsKey(Convert.ToString(subitem.Cells[0].Value)))
                            currentAttributes[selItem].Add(Convert.ToString(subitem.Cells[0].Value), Convert.ToString(subitem.Cells[1].Value));
                        else
                            currentAttributes[selItem][Convert.ToString(subitem.Cells[0].Value)] = Convert.ToString(subitem.Cells[1].Value);
                    }
        }

        void AddClick(object sender, EventArgs e)
        {
            string result = CommonService.InputBox(GResources.GetResourceText(29451464), GResources.GetResourceText(29451465), "element-1");
            if (!string.IsNullOrEmpty(result))
            {
                result = result.Replace(" ", "_");
                if (!currentAttributes.ContainsKey(result))
                {
                    currentAttributes.Add(result, new Dictionary<string, string>());
                    cbElements.Items.Add(result);
                    cbElements.SelectedItem = result;
                    _changeTag = true;
                }
                else
                    MessageService.ShowWarning(string.Format(GResources.GetResourceText(29451466), result));
            }
        }
        void DeleteClick(object sender, EventArgs e)
        {
            if (cbElements.SelectedIndex != -1)
            {
                string selItem = Convert.ToString(cbElements.SelectedItem);
                if (MessageService.AskQuestion(string.Format(GResources.GetResourceText(29451467), selItem)))
                {
                    cbElements.Items.Remove(selItem);
                    if (currentAttributes.ContainsKey(selItem))
                        currentAttributes.Remove(selItem);

                    if (cbElements.Items.Count > 0)
                        cbElements.SelectedIndex = 0;

                    _changeTag = true;
                }
            }
        }

    }
}
