//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.TemplatesOptionEditFileTemplatePanel.cs  </Name>
//    <Description> panel pro úpravu šablon souborů                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-11                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Internal.Templates;
using Gordic.WinForms.Controls;

namespace Gordic.GFE.WinClient.Gui.OptionPanels
{
    /// <summary>
    /// panel pro úpravu šablon souborů
    /// </summary>
    class TOEditFileTemplatePanel : AbstractOptionPanel
    {
        /// <summary>
        /// Načtení obsahu panelu
        /// </summary>
        public override void LoadPanelContents()
        {
            SetupLocalizedXFRM(AssemblyName + ".Resources.forms.options.TOEditFileTemplatePanel.xfrm");
            ControlDictionary["templateTextBox"].Font = WinFormsResourceService.DefaultMonospacedFont;
            foreach (FileTemplate template in FileTemplate.FileTemplates)
                ((GLabeledComboBox)ControlDictionary["typeChooser"]).Items.Add(template);

            ((GLabeledComboBox)ControlDictionary["templateChooser"]).SelectedIndexChanged += new EventHandler(templateSelectedIndexChanged);
            ((GLabeledComboBox)ControlDictionary["typeChooser"]).SelectedIndexChanged += new EventHandler(typeSelectedIndexChanged);
            ((GLabeledComboBox)ControlDictionary["typeChooser"]).SelectedIndex = 0;
            ((TextBox)ControlDictionary["templateTextBox"]).TextChanged += new EventHandler(TextChangedEvent);
        }

        void templateSelectedIndexChanged(object sender, EventArgs e)
        {
            ((TextBox)ControlDictionary["templateTextBox"]).TextChanged -= new EventHandler(TextChangedEvent);
            int idx = ((GLabeledComboBox)ControlDictionary["templateChooser"]).SelectedIndex;
            if (idx >= 0)
            {
                ControlDictionary["templateTextBox"].Text = ((FileDescriptionTemplate)((GLabeledComboBox)ControlDictionary["templateChooser"]).SelectedItem).Content;
                ControlDictionary["templateTextBox"].Enabled = true;
            }
            else
            {
                ControlDictionary["templateTextBox"].Text = "";
                ControlDictionary["templateTextBox"].Enabled = false;
            }
            ((TextBox)ControlDictionary["templateTextBox"]).TextChanged += new EventHandler(TextChangedEvent);
        }
        void typeSelectedIndexChanged(object sender, EventArgs e)
        {
            ((GLabeledComboBox)ControlDictionary["templateChooser"]).Items.Clear();

            if (((GLabeledComboBox)ControlDictionary["typeChooser"]).SelectedIndex >= 0)
                foreach (FileDescriptionTemplate template in ((FileTemplate)((GLabeledComboBox)ControlDictionary["typeChooser"]).SelectedItem).FileDescriptionTemplates)
                    ((GLabeledComboBox)ControlDictionary["templateChooser"]).Items.Add(template);

            if (((GLabeledComboBox)ControlDictionary["templateChooser"]).Items.Count > 0)
                ((GLabeledComboBox)ControlDictionary["templateChooser"]).SelectedIndex = 0;
            else ((GLabeledComboBox)ControlDictionary["templateChooser"]).SelectedIndex = -1;
        }
        void TextChangedEvent(object sender, EventArgs e)
        {
            if (((GLabeledComboBox)ControlDictionary["templateChooser"]).SelectedItem != null)
                ((FileDescriptionTemplate)((GLabeledComboBox)ControlDictionary["templateChooser"]).SelectedItem).Content = ControlDictionary["templateTextBox"].Text;
        }

        /// <summary>
        /// uložení obsahu panelu
        /// </summary>
        /// <returns></returns>
        public override bool StorePanelContents()
        {
            FileTemplate.StoreTemplates();
            return true;
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // CodingOptionsEditFileTemplatePanel
            // 
            this.Name = "TemplatesOptionEditFileTemplatePanel";
            this.ResumeLayout(false);

        }
    }
}
