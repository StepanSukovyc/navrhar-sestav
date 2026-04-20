//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.toeditinfosectionpanel.cs              </Name>
//    <Description> panel pro úpravu info sekcí                                 </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-02-19                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Internal.Templates;
using System;
using System.Windows.Forms;

namespace Gordic.GFE.WinClient.Gui.OptionPanels
{
    /// <summary>
    /// panel pro úpravu info sekcí
    /// </summary>
    class TOEditInfoSectionPanel : AbstractOptionPanel
    {
        /// <summary>
        /// Načtení obsahu panelu
        /// </summary>
        public override void LoadPanelContents()
        {
            SetupLocalizedXFRM(AssemblyName + ".Resources.forms.options.TOEditInfoSectionPanel.xfrm");

            ControlDictionary["infoTextBox"].Font = WinFormsResourceService.DefaultMonospacedFont;
            foreach (InfoSection info in InfoSection.Sections)
                ((ComboBox)ControlDictionary["infoChooser"]).Items.Add(info);
            ((ComboBox)ControlDictionary["infoChooser"]).SelectedIndexChanged += new EventHandler(SelectedIndexChanged);
            ((ComboBox)ControlDictionary["infoChooser"]).SelectedIndex = 0;
            ((TextBox)ControlDictionary["infoTextBox"]).TextChanged += new EventHandler(TextChangedEvent);
        }

        void TextChangedEvent(object sender, EventArgs e)
        {
            ((InfoSection)((ComboBox)ControlDictionary["infoChooser"]).SelectedItem).Section = ControlDictionary["infoTextBox"].Text;
        }
        void SelectedIndexChanged(object sender, EventArgs e)
        {
            ((TextBox)ControlDictionary["infoTextBox"]).TextChanged -= new EventHandler(TextChangedEvent);
            int idx = ((ComboBox)ControlDictionary["infoChooser"]).SelectedIndex;
            if (idx >= 0)
            {
                ControlDictionary["infoTextBox"].Text = ((InfoSection)((ComboBox)ControlDictionary["infoChooser"]).SelectedItem).Section;
                ControlDictionary["infoTextBox"].Enabled = true;
            }
            else
            {
                ControlDictionary["infoTextBox"].Text = "";
                ControlDictionary["infoTextBox"].Enabled = false;
            }
            ((TextBox)ControlDictionary["infoTextBox"]).TextChanged += new EventHandler(TextChangedEvent);
        }

        /// <summary>
        /// uložení obsahu panelu
        /// </summary>
        /// <returns></returns>
        public override bool StorePanelContents()
        {
            InfoSection.StoreSections();
            return true;
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // CodingOptionsEditStandardHeaderPanel
            // 
            this.Name = "TOEditInfoSectionPanel";
            this.ResumeLayout(false);

        }
    }
}
