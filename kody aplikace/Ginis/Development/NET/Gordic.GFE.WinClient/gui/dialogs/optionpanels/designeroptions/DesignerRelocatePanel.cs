//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.DesignerRelocatePanel.cs               </Name>
//    <Description> panel pro nastavení vlastností přemístění objektů do grafických sestav</Description>
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
    /// panel pro nastavení vlastností přemístění objektů do grafických sestav
    /// </summary>
    partial class DesignerRelocatePanel : AbstractOptionPanel
    {
        /// <summary>
        /// načtené obsahu
        /// </summary>
        public override void LoadPanelContents()
        {
            SetupLocalizedXFRM(AssemblyName + ".Resources.forms.options.DesignerRelocatePanel.xfrm");

            ((CheckBox)ControlDictionary["cbMoveLine"]).CheckedChanged += delegate
            {
                if (!((RadioButton)ControlDictionary["rbMoveRegion"]).Checked
                    && !((RadioButton)ControlDictionary["rbMoveGroup"]).Checked)
                    ((RadioButton)ControlDictionary["rbMoveGroup"]).Checked = true;
                ((RadioButton)ControlDictionary["rbMoveRegion"]).Enabled = !((CheckBox)ControlDictionary["cbMoveLine"]).Checked;
                ((RadioButton)ControlDictionary["rbMoveGroup"]).Enabled = !((CheckBox)ControlDictionary["cbMoveLine"]).Checked;
            };
            ((RadioButton)ControlDictionary["rbMoveRegion"]).Checked = ReportDesignerProperties.Instance.GrrAutoMoveRegion;
            ((RadioButton)ControlDictionary["rbMoveGroup"]).Checked = ReportDesignerProperties.Instance.GrrAutoMoveGroup;
            ((CheckBox)ControlDictionary["cbMoveLine"]).Checked = !ReportDesignerProperties.Instance.GrrAutoMove;
        }

        /// <summary>
        /// Uložení obsahu panelu
        /// </summary>
        /// <returns></returns>
        public override bool StorePanelContents()
        {
            ReportDesignerProperties.Instance.GrrAutoMove = !((CheckBox)ControlDictionary["cbMoveLine"]).Checked;
            ReportDesignerProperties.Instance.GrrAutoMoveRegion = ((RadioButton)ControlDictionary["rbMoveRegion"]).Checked;
            ReportDesignerProperties.Instance.GrrAutoMoveGroup = ((RadioButton)ControlDictionary["rbMoveGroup"]).Checked;
            return true;
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // DesignerRelocatePanel
            // 
            this.Name = "DesignerRelocatePanel";
            this.ResumeLayout(false);

        }
    }
}
