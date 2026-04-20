//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.EditStandardHeaderPanel.cs             </Name>
//    <Description> panel pro úpravu standardních hlaviček                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-11                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Internal.Templates;

namespace Gordic.GFE.WinClient.Gui.OptionPanels
{
    /// <summary>
    /// panel pro úpravu standardních hlaviček
    /// </summary>
    class TOEditStandardHeaderPanel : AbstractOptionPanel
    {
        /// <summary>
        /// Načtení obsahu panelu
        /// </summary>
        public override void LoadPanelContents()
        {
            SetupLocalizedXFRM(AssemblyName + ".Resources.forms.options.TOEditStandardHeaderPanel.xfrm");

            ControlDictionary["headerTextBox"].Font = WinFormsResourceService.DefaultMonospacedFont;
            foreach (StandardHeader header in StandardHeader.StandardHeaders)
                ((ComboBox)ControlDictionary["headerChooser"]).Items.Add(header);
            ((ComboBox)ControlDictionary["headerChooser"]).SelectedIndexChanged += new EventHandler(SelectedIndexChanged);
            ((ComboBox)ControlDictionary["headerChooser"]).SelectedIndex = 0;
            ((TextBox)ControlDictionary["headerTextBox"]).TextChanged += new EventHandler(TextChangedEvent);
        }

        void TextChangedEvent(object sender, EventArgs e)
        {
            ((StandardHeader)((ComboBox)ControlDictionary["headerChooser"]).SelectedItem).Header = ControlDictionary["headerTextBox"].Text;
        }
        void SelectedIndexChanged(object sender, EventArgs e)
        {
            ((TextBox)ControlDictionary["headerTextBox"]).TextChanged -= new EventHandler(TextChangedEvent);
            int idx = ((ComboBox)ControlDictionary["headerChooser"]).SelectedIndex;
            if (idx >= 0)
            {
                ControlDictionary["headerTextBox"].Text = ((StandardHeader)((ComboBox)ControlDictionary["headerChooser"]).SelectedItem).Header;
                ControlDictionary["headerTextBox"].Enabled = true;
            }
            else
            {
                ControlDictionary["headerTextBox"].Text = "";
                ControlDictionary["headerTextBox"].Enabled = false;
            }
            ((TextBox)ControlDictionary["headerTextBox"]).TextChanged += new EventHandler(TextChangedEvent);
        }

        /// <summary>
        /// uložení obsahu panelu
        /// </summary>
        /// <returns></returns>
        public override bool StorePanelContents()
        {
            StandardHeader.StoreHeaders();
            return true;
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // CodingOptionsEditStandardHeaderPanel
            // 
            this.Name = "CodingOptionsEditStandardHeaderPanel";
            this.ResumeLayout(false);

        }
    }
}
