//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.DesignerInsertPanel.cs                 </Name>
//    <Description> panel pro nastavení vlastností vložení objektu do grafických sestav</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-05-24                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Gui;

namespace Gordic.GFE.WinClient.Dialogs.OptionPanels
{
    /// <summary>
    /// panel pro nastavení vlastností vložení objektu do grafických sestav
    /// </summary>
    class DesignerInsertCellPanel : AbstractOptionPanel
    {
        /// <summary>
        /// načtené obsahu
        /// </summary>
        public override void LoadPanelContents()
        {
            SetupLocalizedXFRM(AssemblyName + ".Resources.forms.options.DesignerInsertCellPanel.xfrm");

            ((CheckBox)ControlDictionary["cbInsertCell"]).CheckedChanged += delegate
            {
                if (!((RadioButton)ControlDictionary["rbInsertCellEmpty"]).Checked
                    && !((RadioButton)ControlDictionary["rbInsertCellEmptyFormat"]).Checked
                    && !((RadioButton)ControlDictionary["rbInsertCellContent"]).Checked)
                    ((RadioButton)ControlDictionary["rbInsertCellContent"]).Checked = true;

                ((RadioButton)ControlDictionary["rbInsertCellEmpty"]).Enabled = !((CheckBox)ControlDictionary["cbInsertCell"]).Checked;
                ((RadioButton)ControlDictionary["rbInsertCellEmptyFormat"]).Enabled = !((CheckBox)ControlDictionary["cbInsertCell"]).Checked;
                ((RadioButton)ControlDictionary["rbInsertCellContent"]).Enabled = !((CheckBox)ControlDictionary["cbInsertCell"]).Checked;
            };
            ((RadioButton)ControlDictionary["rbInsertCellEmpty"]).Checked = ReportDesignerProperties.Instance.GrrAutoInsertCellEmpty;
            ((RadioButton)ControlDictionary["rbInsertCellEmptyFormat"]).Checked = ReportDesignerProperties.Instance.GrrAutoInsertCellEmptyFormat;
            ((RadioButton)ControlDictionary["rbInsertCellContent"]).Checked = ReportDesignerProperties.Instance.GrrAutoInsertCellContent;
            ((CheckBox)ControlDictionary["cbInsertCell"]).Checked = !ReportDesignerProperties.Instance.GrrAutoInsertCell;

            ((CheckBox)ControlDictionary["cbReplaceContent"]).CheckedChanged += delegate
            {
                if (!((RadioButton)ControlDictionary["rbDivide"]).Checked
                    && !((RadioButton)ControlDictionary["rbReplace"]).Checked)
                    ((RadioButton)ControlDictionary["rbReplace"]).Checked = true;

                ((RadioButton)ControlDictionary["rbDivide"]).Enabled = !((CheckBox)ControlDictionary["cbReplaceContent"]).Checked;
                ((RadioButton)ControlDictionary["rbReplace"]).Enabled = !((CheckBox)ControlDictionary["cbReplaceContent"]).Checked;
            };
            ((RadioButton)ControlDictionary["rbDivide"]).Checked = ReportDesignerProperties.Instance.GrrAutoReplaceEmptyCellContentDivide;
            ((RadioButton)ControlDictionary["rbReplace"]).Checked = ReportDesignerProperties.Instance.GrrAutoReplaceEmptyCellContentReplace;
            ((CheckBox)ControlDictionary["cbReplaceContent"]).Checked = !ReportDesignerProperties.Instance.GrrAutoReplaceEmptyCellContent;

        }

        /// <summary>
        /// Uložení obsahu panelu
        /// </summary>
        /// <returns></returns>
        public override bool StorePanelContents()
        {
            ReportDesignerProperties.Instance.GrrAutoInsertCell = !((CheckBox)ControlDictionary["cbInsertCell"]).Checked;
            ReportDesignerProperties.Instance.GrrAutoInsertCellEmpty = ((RadioButton)ControlDictionary["rbInsertCellEmpty"]).Checked;
            ReportDesignerProperties.Instance.GrrAutoInsertCellEmptyFormat = ((RadioButton)ControlDictionary["rbInsertCellEmptyFormat"]).Checked;
            ReportDesignerProperties.Instance.GrrAutoInsertCellContent = ((RadioButton)ControlDictionary["rbInsertCellContent"]).Checked;

            ReportDesignerProperties.Instance.GrrAutoReplaceEmptyCellContent = !((CheckBox)ControlDictionary["cbReplaceContent"]).Checked;
            ReportDesignerProperties.Instance.GrrAutoReplaceEmptyCellContentDivide = ((RadioButton)ControlDictionary["rbDivide"]).Checked;
            ReportDesignerProperties.Instance.GrrAutoReplaceEmptyCellContentReplace = ((RadioButton)ControlDictionary["rbReplace"]).Checked;
            return true;
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // DesignerInsertCellPanel
            // 
            this.Name = "DesignerInsertCellPanel";
            this.ResumeLayout(false);

        }

    }
}
