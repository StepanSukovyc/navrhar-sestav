//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.FiletypesAssociationPanel.cs           </Name>
//    <Description> změna přidruženní                                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-05                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;

namespace Gordic.GFE.WinClient.FileTypeAssociation
{
    /// <summary>
    /// změna přidruženní
    /// </summary>
    class FiletypesAssociationPanel: AbstractOptionPanel
	{
        Label captionLabel;
        CheckedListBox fileTypesListBox;

        /// <summary>
        /// jednotka seznamu
        /// </summary>
		sealed class ListEntry
		{
			internal readonly FiletypeAssociation Association;
			internal readonly bool InitiallyChecked;
			
            /// <summary>
            /// vytvoření nové insatnce třídy
            /// </summary>
            /// <param name="association">asociace</param>
			public ListEntry(FiletypeAssociation association)
			{
				this.Association = association;
				this.InitiallyChecked = FiletypesAssociationCommand.IsRegisteredToReportDesigner(association.Extension);
			}
			
            /// <exclude/>
			public override string ToString()
			{
				return Association.Text + " (." + Association.Extension + ")";
			}
		}

        /// <summary>
        /// konstrukto třídy
        /// </summary>
        public FiletypesAssociationPanel()
		{
			InitializeComponent();
			captionLabel.Text = StringParser.Parse(captionLabel.Text);
		}
		
        /// <summary>
        /// načtení obsahu
        /// </summary>
        public override void LoadPanelContents()
        {
            foreach (FiletypeAssociation assoc in FiletypeAssociationMaker.GetList())
            {
                ListEntry entry = new ListEntry(assoc);
                fileTypesListBox.Items.Add(entry, entry.InitiallyChecked);
            }
        }
		/// <summary>
		/// uložení obsahu
		/// </summary>
		/// <returns></returns>
        public override bool StorePanelContents()
        {
            for (int i = 0; i < fileTypesListBox.Items.Count; i++)
            {
                bool newChecked = fileTypesListBox.GetItemChecked(i);
                ListEntry entry = (ListEntry)fileTypesListBox.Items[i];
                if (entry.InitiallyChecked != newChecked)
                    if (newChecked)
                        FiletypesAssociationCommand.RegisterToReportDesigner(entry.Association);
                    else
                        RegistryService.UnRegisterFiletype(entry.Association.Extension);
            }
            return true;
        }
        
        void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(FiletypesAssociationPanel));
            this.captionLabel = new System.Windows.Forms.Label();
            this.fileTypesListBox = new System.Windows.Forms.CheckedListBox();
            this.SuspendLayout();
            // 
            // captionLabel
            // 
            resources.ApplyResources(this.captionLabel, "captionLabel");
            this.captionLabel.Name = "captionLabel";
            // 
            // fileTypesListBox
            // 
            resources.ApplyResources(this.fileTypesListBox, "fileTypesListBox");
            this.fileTypesListBox.Name = "fileTypesListBox";
            // 
            // FiletypesAssociationPanel
            // 
            this.Controls.Add(this.fileTypesListBox);
            this.Controls.Add(this.captionLabel);
            this.Name = "FiletypesAssociationPanel";
            resources.ApplyResources(this, "$this");
            this.ResumeLayout(false);

        }
	}
}
