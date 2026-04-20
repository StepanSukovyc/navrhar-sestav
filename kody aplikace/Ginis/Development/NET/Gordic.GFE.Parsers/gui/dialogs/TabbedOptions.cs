//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.TabbedOptions.cs                         </Name>
//    <Description> Hlavní formulář dialogového okna nastavení                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections;
using System.Collections.Generic;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.XmlForms;
using Gordic.General;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Hlavní formulář dialogového okna nastavení
    /// </summary>
    public class TabbedOptions : BaseXmlForm
    {
        ArrayList panels = new ArrayList();

        void AcceptEvent(object sender, EventArgs e)
        {
            foreach (AbstractOptionPanel pane in panels)
                if (!pane.ReceiveDialogMessage(DialogMessage.ok))
                    return;

            DialogResult = DialogResult.OK;
        }

        void AddOptionPanels(IEnumerable<IDialogPanelDescriptor> dialogPanelDescriptors)
        {
            foreach (IDialogPanelDescriptor descriptor in dialogPanelDescriptors)
            {
                if (descriptor != null && descriptor.DialogPanel != null && descriptor.DialogPanel.Control != null)
                {
                    // může být NULL, pokud je pouze "cesta" (path)
                    descriptor.DialogPanel.Control.Dock = DockStyle.Fill;
                    descriptor.DialogPanel.ReceiveDialogMessage(DialogMessage.activated);
                    panels.Add(descriptor.DialogPanel);

                    TabPage page = new TabPage(descriptor.Label)
                    {
                        UseVisualStyleBackColor = true
                    };
                    page.Controls.Add(descriptor.DialogPanel.Control);
                    ((TabControl)ControlDictionary["optionPanelTabControl"]).TabPages.Add(page);
                }

                if (descriptor.ChildDialogPanelDescriptors != null)
                    AddOptionPanels(descriptor.ChildDialogPanelDescriptors);
            }
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="dialogName">název dialogu</param>
        /// <param name="node">větev konfiguračníh ostromu</param>
        public TabbedOptions(string dialogName, AddInTreeNode node)
        {
            System.Reflection.Assembly asm = Assembly;
            if (asm == null)
            {
                MessageService.ShowErrorFormatted(string.Join(" ", GResources.GetResourceText(29450406), GResources.GetResourceText(29450407))); //RC 29450407 : Modul není dostupný!
                return;
            }

            SetupLocalizedXFRM(asm.GetName().Name + ".Resources.forms.options.TabbedOptionsDialog.xfrm", asm);

            this.Text = dialogName;
            ControlDictionary["okButton"].Click += new EventHandler(AcceptEvent);
            Icon = null;
            Owner = ProcessService.Desktop.MainForm;

            AddOptionPanels(node.BuildChildItems<IDialogPanelDescriptor>(this));
        }
    }
}
