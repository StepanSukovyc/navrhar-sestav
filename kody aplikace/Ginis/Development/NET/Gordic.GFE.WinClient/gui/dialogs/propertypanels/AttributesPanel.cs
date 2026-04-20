//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.AttributesPanel.cs                     </Name>
//    <Description> Panel vlastnosti atributu                                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-03-21                                                  </Created>
//  </FileHeader>

using System;
using System.Drawing;
using System.Linq;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.General;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.WinClient.Gui.PropertyPanels
{
    /// <summary>
    /// Panel vlastnosti atributu
    /// </summary>
    class AttributesPanel : AbstractPropertyPanel
    {
        #region AbstractPropertyPanel
        /// <summary>
        /// Získání nové hodnoty - PropertyGrid
        /// </summary>
        /// <returns>Nová hodnota</returns>
        public override object PropertyValue { get { return currentAttributes; } }

        /// <summary>
        /// Reakce na tlačítko Výchozí hodnoty
        /// </summary>
        /// <returns>True - Nastavení provedené</returns>
        protected override void SetDefault()
        {
            dgvTag.Rows.Clear();
            currentAttributes = new GFEAttrList();
            try
            {
                if (Service != null)
                    // projdeme všechny vybrané položky a zjistíme jejích hodnoty
                    foreach (object item in Service.SelectedComponents)
                        if (item is IAttributeHandler)
                        {
                            foreach (var subitem in (item as IAttributeHandler).AttrList)
                                dgvTag.Rows.Add(new string[] { subitem.Key, subitem.Value });

                            currentAttributes.AddRange((item as IAttributeHandler).AttrList);
                            currentAttributes.SynchronizeByOrigin();
                            //currentAttributes = new AttributeList((item as IAttributeHandler).Attributes);
                            break;
                        }

            }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29451501) + ":" + ex.Message); }
            _changeTag = false;
        }
        /// <summary>
        /// Reakce na akceptace změn
        /// </summary>
        /// <returns>TRUE- změna provedená</returns>
        protected override bool Accept()
        {
            if (Service == null)
                return true;

            if (_changeTag)
            {
                if (!UndoRedoService.IsTransactionStarted)
                    UndoRedoService.StartTransaction(GResources.GetResourceText(29450467)); //RC 29450467 : změna atributů

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

                foreach (object item in Service.SelectedComponents)
                {
                    if (item is IAttributeHandler)
                    {
                        (item as IAttributeHandler).AttrList.Clear();
                        (item as IAttributeHandler).AttrList.AddRange(currentAttributes);
                        (item as IAttributeHandler).AttrList.SynchronizeByOrigin();
                    }
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
                SetupLocalizedXFRM(AssemblyName + ".Resources.forms.property.AttributesPanel.xfrm");

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
                ThreadService.SafeThreadAsyncCall(SetDefault);
            }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29451502) + ":" + ex.Message); }
        }

        /// <summary>
        /// Podmínky viditelnosti daného panelu
        /// </summary>
        /// <returns>TRUE - podmínka je splněná</returns>
        public override bool VisibleCondition()
        {
            if (view == null)
                return base.VisibleCondition();

            return Service != null && Service.SelectedComponents.Exists(item => item is IAttributeHandler);
        }
        #endregion

        DataGridView dgvTag;
        DataGridViewTextBoxColumn m_znacka, m_hodnota;

        bool _changeTag;
        GFEAttrList currentAttributes;
    }
}
