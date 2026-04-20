//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SsrFileNodePanel.cs                    </Name>
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
using Gordic.WinForms.Controls;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Windows.Forms;
using Gordic.GFE.Parsers.AddIns.Project;
using Gordic.GFE.WinClient.Project;

namespace Gordic.GFE.WinClient.SsrBinding
{
    /// <summary>
    /// panel editace SSR položky
    /// </summary>
    class SsrFileNodePanel : AbstractPropertyPanel
    {
        #region AbstractPropertyPanel
        /// <summary>
        /// Získání nové hodnoty - PropertyGrid
        /// </summary>
        /// <returns>Nová hodnota</returns>
        public override object PropertyValue { get { return tbTitle.Text; } }
        IFileProjectItemHandler fn;
        /// <summary>
        /// Reakce na tlačítko Výchozí hodnoty
        /// </summary>
        /// <returns>True - Nastavení provedené</returns>
        protected override void SetDefault()
        {
            dgvTag.Rows.Clear();
            currentAttributes = new GFEAttrList();
            dynamic attrs;
            if (fn != null)
            {
                List<string> exclude = new List<string>();
                if (fn.Item is SsrProject)
                {
                    tbTitle.Text = fn.Item.Title;
                    if (!string.IsNullOrEmpty(fn.Item.DefaultFormat))
                        cbDefaultFormat.SelectedItem = fn.Item.DefaultFormat;
                    else
                        cbDefaultFormat.SelectedIndex = 0;

                    exclude.AddRange(new string[2] { "default-format", "title" });
                    attrs = fn.Item.Attributes;
                }
                else
                {
                    attrs = fn.Item.Section.Attributes;
                    exclude.AddRange(new string[2] { "title", "file" });
                }

                if (fn.Item is SsrFileProjectItem)
                    tbTitle.Text = fn.Item.Section.Title;

                try
                {
                    foreach (var subitem in attrs)
                        if (!exclude.Contains(subitem.Key))
                        {
                            currentAttributes.Add(subitem.Key, subitem.Value);
                            dgvTag.Rows.Add(new string[] { subitem.Key, subitem.Value });
                        }
                    //currentAttributes.AddRange(fn.Item.Section.Element.Attributes as Dictionary<string, string>);
                    currentAttributes.SynchronizeByOrigin();
                }
                catch (Exception ex) { LoggingService.Error(ex); }
            }
            _formatChange = _titleChange = _changeTag = false;
        }

        /// <summary>
        /// Načtení obsahu panelu
        /// </summary>
        public override void LoadPanelContents()
        {
            SetupLocalizedXFRM(AssemblyName + ".addIns.ssrbinding.SsrFileNodePanel.xfrm");
            tbTitle = (GLabeledTextBox)ControlDictionary["tbTitle"];
            tbTitle.TextChanged += delegate { _titleChange = true; };

            cbDefaultFormat = (GLabeledComboBox)ControlDictionary["cbDefaultFormat"];
            cbDefaultFormat.SelectedIndexChanged += delegate { _formatChange = true; };

            gbFile = (GGroupBox)ControlDictionary["gbFile"];
            gbMeta = (GGroupBox)ControlDictionary["gbMeta"];

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
            dgvTag.CellValueChanged += delegate { _changeTag = true; };
            dgvTag.RowsAdded += delegate { _changeTag = true; };
            dgvTag.RowsRemoved += delegate { _changeTag = true; };

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

            if (fn != null)
            {
                if (fn.Item is SsrProject)
                {
                    gbMeta.Visible = true;
                    gbFile.Visible = true;
                    cbDefaultFormat.Items.Add(GResources.GetResourceText(29451461));
                    foreach (var item in (fn.Item as SsrProject).ProjectSections.FindAll(itm => itm.SectionType == ItemType.Content))
                        cbDefaultFormat.Items.Add(item.Name);
                }
                else
                {
                    cbDefaultFormat.Visible = false;
                    gbFile.Height = 64;

                    if (fn.Item.Section.SectionType == ItemType.Content)
                    {
                        gbMeta.Visible = true;
                        gbFile.Visible = true;
                        gbMeta.Top = gbFile.Top + gbFile.Height + 8;
                        gbMeta.Height = gbMeta.Parent.Height - (gbFile.Top + gbFile.Height) - 8;
                    }
                    else
                    {                        
                        gbMeta.Visible = true;
                        gbMeta.Top = 8;
                        gbMeta.Height = gbMeta.Parent.Height - 8;
                        gbFile.Visible = false;
                    }
                }
            }
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
                if (_titleChange)
                {
                    if (fn.Item is SsrProject)
                        (LocalCommonService.SelectedObject as System.Windows.Forms.TreeNode).Text = tbTitle.Text;

                    if (fn.Item is SsrProject)
                        fn.Item.Title = tbTitle.Text;
                    else
                        fn.Item.Section.Title = tbTitle.Text;
                }

                if (_formatChange)
                    if (cbDefaultFormat.SelectedIndex == 0)
                        fn.Item.DefaultFormat = null;
                    else 
                        fn.Item.DefaultFormat = Convert.ToString(cbDefaultFormat.SelectedItem);

                if (_changeTag)
                {
                    dynamic attrs;
                    if (fn.Item is SsrProject)
                        attrs = fn.Item.Attributes;
                    else
                        attrs = fn.Item.Section.Attributes;

                    int index = 0;
                    var keys = currentAttributes.Keys.ToList();
                    while (index < keys.Count)
                    {
                        string key = keys[index];
                        if (dgvTag.Rows.Count != 0)
                        {
                            bool exists = false;

                            foreach (DataGridViewRow item in dgvTag.Rows)
                                if (Convert.ToString(item.Cells[0].Value).Equals(key))
                                {
                                    exists = true;
                                    break;
                                }

                            if (exists)
                            {
                                index++;
                                continue;
                            }
                        }
                        currentAttributes.Remove(key);
                        keys.Remove(key);
                    }

                    foreach (DataGridViewRow subitem in dgvTag.Rows)
                        if (subitem.Cells[0].Value != null)
                        {
                            if (!currentAttributes.ContainsKey(Convert.ToString(subitem.Cells[0].Value)))
                                currentAttributes.Add(Convert.ToString(subitem.Cells[0].Value), Convert.ToString(subitem.Cells[1].Value));
                            else
                                currentAttributes[Convert.ToString(subitem.Cells[0].Value)] = Convert.ToString(subitem.Cells[1].Value);
                        }

                    if (attrs != null)
                    {
                        attrs.Clear();
                        foreach (KeyValuePair<string, string> item in currentAttributes)
                            attrs.Add(item.Key, item.Value);
                    }
                }

                if (_titleChange || _formatChange || _changeTag)
                    ProjectService.SaveSolution();
            }
            return base.Accept();
        }

        /// <summary>
        /// Podmínky viditelnosti daného panelu
        /// </summary>
        /// <returns>TRUE - podmínka je splněná</returns>
        public override bool VisibleCondition()
        {
            fn = LocalCommonService.SelectedObject as IFileProjectItemHandler;
            return fn != null;
        }
        #endregion

        bool _titleChange = false, _formatChange = false, _changeTag = false;
        GLabeledTextBox tbTitle;
        GLabeledComboBox cbDefaultFormat;
        GGroupBox gbFile, gbMeta;

        DataGridView dgvTag;
        DataGridViewTextBoxColumn m_znacka, m_hodnota;

        GFEAttrList currentAttributes;
    }
}
