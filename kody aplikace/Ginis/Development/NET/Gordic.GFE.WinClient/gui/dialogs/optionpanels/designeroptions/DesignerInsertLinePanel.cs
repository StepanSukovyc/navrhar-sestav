//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.DesignerInsertLinePanel.cs             </Name>
//    <Description> panel nastavení vložení na řádek                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-05-31                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Gui;

namespace Gordic.GFE.WinClient.Dialogs.OptionPanels
{
    /// <summary>
    /// panel nastavení vložení na řádek
    /// </summary>
    partial class DesignerInsertLinePanel : AbstractOptionPanel
    {
        /// <summary>
        /// načtené obsahu
        /// </summary>
        public override void LoadPanelContents()
        {
            SetupLocalizedXFRM(AssemblyName + ".Resources.forms.options.DesignerInsertLinePanel.xfrm");

            ((CheckBox)ControlDictionary["cbInsertLine"]).CheckedChanged += delegate
            {
                if (!((RadioButton)ControlDictionary["rbInsertLineEmpty"]).Checked
                    && !((RadioButton)ControlDictionary["rbInsertLineContent"]).Checked)
                    ((RadioButton)ControlDictionary["rbInsertLineContent"]).Checked = true;

                ((RadioButton)ControlDictionary["rbInsertLineEmpty"]).Enabled = !((CheckBox)ControlDictionary["cbInsertLine"]).Checked;
                ((RadioButton)ControlDictionary["rbInsertLineContent"]).Enabled = !((CheckBox)ControlDictionary["cbInsertLine"]).Checked;

            };
            ((RadioButton)ControlDictionary["rbInsertLineEmpty"]).Checked = ReportDesignerProperties.Instance.GrrAutoInsertLineEmpty;
            ((RadioButton)ControlDictionary["rbInsertLineContent"]).Checked = ReportDesignerProperties.Instance.GrrAutoInsertLineContent;
            ((CheckBox)ControlDictionary["cbInsertLine"]).Checked = !ReportDesignerProperties.Instance.GrrAutoInsertLine;

            ((CheckBox)ControlDictionary["cbIncludeLineContent"]).CheckedChanged += delegate
            {
                if (!((RadioButton)ControlDictionary["rbNewLineBefore"]).Checked
                    && !((RadioButton)ControlDictionary["rbNewLineAfter"]).Checked
                    && !((RadioButton)ControlDictionary["rbIncludeLine"]).Checked)
                    ((RadioButton)ControlDictionary["rbIncludeLine"]).Checked = true;

                ((RadioButton)ControlDictionary["rbNewLineBefore"]).Enabled = !((CheckBox)ControlDictionary["cbIncludeLineContent"]).Checked;
                ((RadioButton)ControlDictionary["rbNewLineAfter"]).Enabled = !((CheckBox)ControlDictionary["cbIncludeLineContent"]).Checked;
                ((RadioButton)ControlDictionary["rbIncludeLine"]).Enabled = !((CheckBox)ControlDictionary["cbIncludeLineContent"]).Checked;
            };
            ((RadioButton)ControlDictionary["rbNewLineBefore"]).Checked = ReportDesignerProperties.Instance.GrrAutoIncludeLineContentNewLineBefore;
            ((RadioButton)ControlDictionary["rbNewLineAfter"]).Checked = ReportDesignerProperties.Instance.GrrAutoIncludeLineContentNewLineAfter;
            ((RadioButton)ControlDictionary["rbIncludeLine"]).Checked = ReportDesignerProperties.Instance.GrrAutoIncludeLineContentIncludeLine;
            ((CheckBox)ControlDictionary["cbIncludeLineContent"]).Checked = !ReportDesignerProperties.Instance.GrrAutoIncludeLineContent;
        }

        /// <summary>
        /// Uložení obsahu panelu
        /// </summary>
        /// <returns></returns>
        public override bool StorePanelContents()
        {
            ReportDesignerProperties.Instance.GrrAutoInsertLine = !((CheckBox)ControlDictionary["cbInsertLine"]).Checked;
            ReportDesignerProperties.Instance.GrrAutoInsertLineEmpty = ((RadioButton)ControlDictionary["rbInsertLineEmpty"]).Checked;
            ReportDesignerProperties.Instance.GrrAutoInsertLineContent = ((RadioButton)ControlDictionary["rbInsertLineContent"]).Checked;

            ReportDesignerProperties.Instance.GrrAutoIncludeLineContent = !((CheckBox)ControlDictionary["cbIncludeLineContent"]).Checked;
            ReportDesignerProperties.Instance.GrrAutoIncludeLineContentNewLineBefore = ((RadioButton)ControlDictionary["rbNewLineBefore"]).Checked;
            ReportDesignerProperties.Instance.GrrAutoIncludeLineContentNewLineAfter = ((RadioButton)ControlDictionary["rbNewLineAfter"]).Checked;
            ReportDesignerProperties.Instance.GrrAutoIncludeLineContentIncludeLine = ((RadioButton)ControlDictionary["rbIncludeLine"]).Checked;
            return true;
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // DesignerInsertLinePanel
            // 
            this.Name = "DesignerInsertLinePanel";
            this.ResumeLayout(false);

        }
    }
}
