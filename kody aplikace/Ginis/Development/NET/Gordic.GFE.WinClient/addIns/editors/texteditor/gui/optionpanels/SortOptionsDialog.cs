//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.SortOptionsDialog.cs                   </Name>
//    <Description> Dialog pro nastavení možnosti řazení                        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-10-22                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.GFE.WinClient.DefaultTextEditorCommands;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.XmlForms;
using Gordic.General;

namespace Gordic.GFE.WinClient.Dialogs.OptionPanels
{
    /// <summary>
    /// Dialog pro nastavení možnosti řazení
    /// </summary>
    class SortOptionsDialog : BaseXmlForm
    {
        /// <summary>
        /// odstranění duplictních řádků
        /// </summary>
        public static readonly string removeDupesOption = "Gordic.GFE.WinClient.Dialogs.OptionPanels.RemoveDuplicateLines";
        /// <summary>
        /// rozlišování velkých a malých písmen
        /// </summary>
        public static readonly string caseSensitiveOption = "Gordic.GFE.WinClient.Dialogs.OptionPanels.CaseSensitive";
        /// <summary>
        /// ignorovat prázdné bílé mezery
        /// </summary>
        public static readonly string ignoreWhiteSpacesOption = "Gordic.GFE.WinClient.Dialogs.OptionPanels.IgnoreWhitespaces";
        /// <summary>
        /// řazení
        /// </summary>
        public static readonly string sortDirectionOption = "Gordic.GFE.WinClient.Dialogs.OptionPanels.SortDirection";

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public SortOptionsDialog()
        {
            System.Reflection.Assembly asm = Assembly;
            if (asm == null)
            {
                MessageService.ShowErrorFormatted(GResources.GetResourceText(29450195) + '\n' + GResources.GetResourceText(29450194)); //RC 29450195 : Nelze načíst soubory konfigurace!
                return;
            }

            SetupLocalizedXFRM(asm.GetName().Name + ".Resources.forms.options.SortOptionsDialog.xfrm");

            AcceptButton = (Button)ControlDictionary["okButton"];
            CancelButton = (Button)ControlDictionary["cancelButton"];
            ((CheckBox)ControlDictionary["removeDupesCheckBox"]).Checked = PropertyService.Get(removeDupesOption, false);
            ((CheckBox)ControlDictionary["caseSensitiveCheckBox"]).Checked = PropertyService.Get(caseSensitiveOption, true);
            ((CheckBox)ControlDictionary["ignoreWhiteSpacesCheckBox"]).Checked = PropertyService.Get(ignoreWhiteSpacesOption, false);

            ((RadioButton)ControlDictionary["ascendingRadioButton"]).Checked = PropertyService.Get(sortDirectionOption, SortSelection.SortDirection.Ascending) == SortSelection.SortDirection.Ascending;
            ((RadioButton)ControlDictionary["descendingRadioButton"]).Checked = PropertyService.Get(sortDirectionOption, SortSelection.SortDirection.Ascending) == SortSelection.SortDirection.Descending;

            // insert event handlers
            ControlDictionary["okButton"].Click += new EventHandler(OkEvent);
        }

        void OkEvent(object sender, EventArgs e)
        {
            PropertyService.Set(removeDupesOption, ((CheckBox)ControlDictionary["removeDupesCheckBox"]).Checked);
            PropertyService.Set(caseSensitiveOption, ((CheckBox)ControlDictionary["caseSensitiveCheckBox"]).Checked);
            PropertyService.Set(ignoreWhiteSpacesOption, ((CheckBox)ControlDictionary["ignoreWhiteSpacesCheckBox"]).Checked);
            if (((RadioButton)ControlDictionary["ascendingRadioButton"]).Checked)
                PropertyService.Set(sortDirectionOption, SortSelection.SortDirection.Ascending);
            else
                PropertyService.Set(sortDirectionOption, SortSelection.SortDirection.Descending);
        }
    }
}
