//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.InfoSectionAttributeView.cs            </Name>
//    <Description> list informaci o info sekci                                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-09-04                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Core.WinForm;
using Gordic.GFE.WinClient.Gui;
using System;
using System.Windows.Forms;

namespace Gordic.GFE.WinClient.InfoSectionView
{
    /// <summary>
    /// list informaci o info sekci
    /// </summary>
    class InfoSectionAttributeView : DataGridView
    {
        string contextMenuPath = "/ReportDesigner/Pads/InfoSectionView/ContextMenu";

        /// <summary>
        /// sekce INFO
        /// </summary>
        public InfoSectionViewEntry InfoSection { get; set; }

        /// <summary>
        /// Prázdný konstruktor třídy
        /// </summary>
        private InfoSectionAttributeView()
            : base()
        {
            InfoSection = null;
            Initialize();
        }

        /// <summary>
        /// Vytvoření nové instance třídy dle sekce INFO
        /// </summary>
        /// <param name="infoSection">Sekce INFO</param>
        public InfoSectionAttributeView(InfoSectionViewEntry infoSection)
            : this()
        {
            InfoSection = infoSection;
            Initialize(infoSection);
        }
        void Initialize()
        {
            AllowDrop = true;
            Columns.Add("key", GResources.GetResourceText(29450340)); //RC 29450340 : klíč
            Columns.Add("value", GResources.GetResourceText(29450234)); //RC 29450234 : hodnota
            
            this.RowHeadersVisible = false;
            this.ColumnHeadersVisible = false;
            Columns[0].MinimumWidth = 50;
            CellBeginEdit += cellBeginEdit;
            CellEndEdit += cellEndEdit;
            this.MultiSelect = false;

            ContextMenuStrip strip = MenuService.CreateContextMenu(this, new Parsers.EventArgsContextMenu(contextMenuPath));
            if (strip != null)
                ContextMenuStrip = strip;
        }

        string oldCellValue = string.Empty, oldCellKey = string.Empty, oldValue = string.Empty;
        void cellBeginEdit(object sender, DataGridViewCellCancelEventArgs e)
        {
            oldValue = Convert.ToString(this.Rows[e.RowIndex].Cells[e.ColumnIndex].Value);
            oldCellKey = Convert.ToString(this.Rows[e.RowIndex].Cells[0].Value);
            oldCellValue = Convert.ToString(this.Rows[e.RowIndex].Cells[1].Value);
        }
        void cellEndEdit(object sender, DataGridViewCellEventArgs e)
        {
            if (!oldValue.Equals(Convert.ToString(this.Rows[e.RowIndex].Cells[e.ColumnIndex].Value)))
            {
                string newValue = Convert.ToString(this.Rows[e.RowIndex].Cells[e.ColumnIndex].Value);

                if (e.ColumnIndex == 1)
                {
                    InfoSection.AttrList.Remove(oldCellKey);
                    InfoSection.AttrList.Add(oldCellKey, newValue);
                }
                else
                {
                    if (string.IsNullOrEmpty(newValue))
                        MessageService.ShowError(GResources.GetResourceText(29450341)); //RC 29450341 : Klíč nesmí být prázdná hodnota!
                    else
                    {
                        InfoSection.AttrList.Remove(oldCellKey);
                        InfoSection.AttrList.Add(newValue, oldCellValue);
                    }
                }
                var davc = SimpleDesktop.Desktop.ActiveViewContent as IInfoSectionHost;
                if (davc != null)
                    davc.OnInfoPropertyChanged(this, EventArgs.Empty);
            }
        }
        void Initialize(InfoSectionViewEntry infoSection)
        {
            Rows.Clear();
            if (infoSection != null)
                foreach (var item in infoSection.AttrList)
                    this.Rows.Add(item.Key, item.Value);
        }
        /// <exclude/>
        protected override void OnResize(EventArgs e)
        {
            base.OnResize(e);
            if (VerticalScrollBar.Visible)
                Columns[1].Width = this.Width - Columns[0].Width - 20;
            else
                Columns[1].Width = this.Width - Columns[0].Width - 3;
        }
        /// <summary>
        /// aktualizace položek
        /// </summary>
        internal void RefreshItems()
        {
            if (InfoSection != null)
                Initialize(InfoSection);
        }

        internal bool RemoveSelected()
        {
            bool result = false;
            if (SelectedCells.Count != 0 && InfoSection != null)
            {
                result = InfoSection.AttrList.Remove(Convert.ToString(this.Rows[SelectedCells[0].RowIndex].Cells[0].Value));
                this.Rows.RemoveAt(SelectedCells[0].RowIndex);
            }
            return result;
        }

        /// <exclude/>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (ContextMenuStrip != null)
                    ContextMenuStrip.Dispose();
                ContextMenuStrip = null;
                if (InfoSection != null)
                    InfoSection = null;
            }

            base.Dispose(disposing);
        }
    }
}
