//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GeneralFormatPanel.cs                  </Name>
//    <Description> panel nastavení práci s formátem                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-07-18                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Gui;

namespace Gordic.GFE.WinClient.Dialogs.OptionPanels
{
    /// <summary>
    /// panel nastavení práci s formátem
    /// </summary>
    partial class GeneralFormatPanel : AbstractOptionPanel
    {
        /// <summary>
        /// načtené obsahu
        /// </summary>
        public override void LoadPanelContents()
        {
            SetupLocalizedXFRM(AssemblyName + ".Resources.forms.options.general.GeneralFormatPanel.xfrm");

            ((CheckBox)ControlDictionary["cbAutoSaveFormat"]).Checked = !ReportDesignerProperties.Instance.AlfAutoSaveFormat;
            ((CheckBox)ControlDictionary["cbAutoSaveFormat"]).CheckedChanged += delegate
            {
                if (!((RadioButton)ControlDictionary["rbSaveFormatOld"]).Checked
                    && !((RadioButton)ControlDictionary["rbSaveFormatNew"]).Checked)
                    ((RadioButton)ControlDictionary["rbSaveFormatOld"]).Checked = true;
            };
            ((RadioButton)ControlDictionary["rbSaveFormatOld"]).Checked = ReportDesignerProperties.Instance.AlfSaveFormatOld;
            ((RadioButton)ControlDictionary["rbSaveFormatNew"]).Checked = ReportDesignerProperties.Instance.AlfSaveFormatNew;
            ((CheckBox)ControlDictionary["cbShowSaveMessage"]).Checked = ReportDesignerProperties.Instance.AlfShowSaveMessage;
        }

        /// <summary>
        /// Uložení obsahu panelu
        /// </summary>
        /// <returns></returns>
        public override bool StorePanelContents()
        {
            ReportDesignerProperties.Instance.AlfAutoSaveFormat = !((CheckBox)ControlDictionary["cbAutoSaveFormat"]).Checked;
            ReportDesignerProperties.Instance.AlfSaveFormatOld = ((RadioButton)ControlDictionary["rbSaveFormatOld"]).Checked;
            ReportDesignerProperties.Instance.AlfSaveFormatNew = ((RadioButton)ControlDictionary["rbSaveFormatNew"]).Checked;
            ReportDesignerProperties.Instance.AlfShowSaveMessage = ((CheckBox)ControlDictionary["cbShowSaveMessage"]).Checked;

            return true;
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // GeneralFormatPanel
            // 
            this.Name = "GeneralFormatPanel";
            this.ResumeLayout(false);

        }

    }
}
