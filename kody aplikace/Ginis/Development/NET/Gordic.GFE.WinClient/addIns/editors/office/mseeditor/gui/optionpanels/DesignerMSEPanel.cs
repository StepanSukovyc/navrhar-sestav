//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GeneralPanel.cs                        </Name>
//    <Description> Hlavní nastavení MSE designéru                              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-23                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Gui;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Hlavní nastavení MSE designéru
    /// </summary>
    class DesignerMSEPanel : AbstractOptionPanel
    {
        CheckBox cbAlwaysAsk, cbHead, cbBody, cbFoot, cbValidateAfterInsert;

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public override void LoadPanelContents()
        {
            SetupLocalizedXFRM(AssemblyName + ".Resources.forms.options.DesignerMSEPanel.xfrm");

            cbAlwaysAsk = ((CheckBox)ControlDictionary["cbAlwaysAsk"]);
            cbAlwaysAsk.CheckedChanged += CheckedChanged;
            cbHead = ((CheckBox)ControlDictionary["cbHead"]);
            cbBody = ((CheckBox)ControlDictionary["cbBody"]);
            cbFoot = ((CheckBox)ControlDictionary["cbFoot"]);
            cbValidateAfterInsert = ((CheckBox)ControlDictionary["cbValidateAfterInsert"]);

            ReportDesignerProperties properties = ReportDesignerProperties.Instance;
            cbAlwaysAsk.Checked = !properties.MseRegAutoInsert;
            cbHead.Checked = properties.MseRegAutoInsertHead;
            cbBody.Checked = properties.MseRegAutoInsertBody;
            cbFoot.Checked = properties.MseRegAutoInsertFoot;
            cbValidateAfterInsert.Checked = properties.MseAutoValidateAfterInsert;
            if (cbAlwaysAsk.Checked)
                CheckedChanged(cbAlwaysAsk, new EventArgs());
        }

        void CheckedChanged(object sender, EventArgs e)
        {
            cbHead.Enabled = cbBody.Enabled = cbFoot.Enabled = !cbAlwaysAsk.Checked;
        }

        /// <summary>
        /// Uložení obsahu panelu
        /// </summary>
        /// <returns></returns>
        public override bool StorePanelContents()
        {
            ReportDesignerProperties properties = ReportDesignerProperties.Instance;
            properties.MseRegAutoInsert = !cbAlwaysAsk.Checked;
            properties.MseRegAutoInsertHead = cbHead.Checked;
            properties.MseRegAutoInsertBody = cbBody.Checked;
            properties.MseRegAutoInsertFoot = cbFoot.Checked;
            properties.MseAutoValidateAfterInsert = cbValidateAfterInsert.Checked;
            return true;
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // DesignerMSEPanel
            // 
            this.Name = "DesignerMSEPanel";
            this.ResumeLayout(false);

        }

    }
}
