//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.InfoSectionAttributeViewControl.cs     </Name>
//    <Description> Výplň dokovatelného okna sekce INFO                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-09-04                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Commands;
using System;
using System.Windows.Forms;

namespace Gordic.GFE.WinClient.InfoSectionView
{
    /// <summary>Výplň dokovatelného okna sekce INFO</summary>
    class InfoSectionAttributeViewControl : UserControl
    {
        InfoSectionAttributeView attributeView;

        InfoSectionViewEntry infoSection = null;
        /// <summary>
        /// Struktura dat
        /// </summary>
        public InfoSectionViewEntry InfoSection
        {
            get { return infoSection; }
            set
            {
                infoSection = value; if (value != null)
                    CustomStringTagProvider.LoadInfoTags(value.AttrList);
            }
        }

        /// <exclude/>
        protected override void OnEnabledChanged(EventArgs e)
        {
            base.OnEnabledChanged(e);
            if (!this.Enabled)
                attributeView.ClearSelection();
        }

        /// <summary>
        /// Nastavení stromu info sekce
        /// </summary>
        /// <param name="infoSection">Sekce, dle které se vytváří strom</param>
        internal void SetSection(InfoSectionViewEntry infoSection)
        {
            this.Controls.Clear();

            InfoSection = infoSection;

            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(InfoSectionViewTreeControl));
            if (this.attributeView != null)
            {
                this.Controls.Remove(this.attributeView);
                this.attributeView.Dispose();
                this.attributeView = null;
            }
            this.attributeView = new InfoSectionAttributeView(infoSection);
            // 
            // tvTree
            // 
            this.attributeView.AllowDrop = true;
            resources.ApplyResources(this.attributeView, "treeView");
            this.attributeView.Name = "treeView";
            this.Controls.Add(this.attributeView);
            attributeView.ClearSelection();
        }

        /// <summary>
        /// odstranění aktuálního atributu
        /// </summary>
        /// <returns>TRUE - byly provedeny změny v seznamu atributů</returns>
        internal bool RemoveActiveAttribute()
        {
            bool result = false;
            if (!attributeView.Enabled)
                MessageService.ShowInformation(GResources.GetResourceText(29450342)); //RC 29450342 : Příkaz odstranění atributu není dostupný!
            else if (attributeView != null && attributeView.SelectedCells.Count != 0)
                return attributeView.RemoveSelected();
            return result;
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // InfoSectionAttributeViewControl
            // 
            this.Name = "InfoSectionAttributeViewControl";
            this.ResumeLayout(false);
        }

        /// <exclude/>
        protected override void Dispose(bool disposing)
        {
            if (disposing && this.attributeView != null)
            {
                this.Controls.Remove(this.attributeView);
                this.attributeView.Dispose();
                this.attributeView = null;
            }
         
            base.Dispose(disposing);
        }
    }
}
