//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GeneralPanel.cs                        </Name>
//    <Description> Hlavní nastavení Rtf designéru                              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Gui;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Hlavní nastavení Rtf designéru
    /// </summary>
    class DesignerRTFPanel : AbstractOptionPanel
    {
        CheckBox cbAlwaysAsk, cbHead, cbBody, cbFoot, cbValidateAfterInsert;

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public override void LoadPanelContents()
        {
            SetupLocalizedXFRM(AssemblyName + ".Resources.forms.options.DesignerRTFPanel.xfrm");

            cbAlwaysAsk = ((CheckBox)ControlDictionary["cbAlwaysAsk"]);
            cbAlwaysAsk.CheckedChanged += CheckedChanged;
            cbHead = ((CheckBox)ControlDictionary["cbHead"]);
            cbBody = ((CheckBox)ControlDictionary["cbBody"]);
            cbFoot = ((CheckBox)ControlDictionary["cbFoot"]);
            cbValidateAfterInsert = ((CheckBox)ControlDictionary["cbValidateAfterInsert"]);

            ReportDesignerProperties properties = ReportDesignerProperties.Instance;
            cbAlwaysAsk.Checked = !properties.RtfRegAutoInsert;
            cbHead.Checked = properties.RtfRegAutoInsertHead;
            cbBody.Checked = properties.RtfRegAutoInsertBody;
            cbFoot.Checked = properties.RtfRegAutoInsertFoot;
            cbValidateAfterInsert.Checked = properties.RtfAutoValidateAfterInsert;
            if (cbAlwaysAsk.Checked)
                CheckedChanged(cbAlwaysAsk, new EventArgs());
            ((CheckBox)ControlDictionary["cbthemedata"]).Checked = properties.RtfOpt_themedata;
            ((CheckBox)ControlDictionary["cbdatastore"]).Checked = properties.RtfOpt_datastore;
            ((CheckBox)ControlDictionary["cbcolorschememapping"]).Checked = properties.RtfOpt_colorschememapping;
            ((CheckBox)ControlDictionary["cblatentstyles"]).Checked = properties.RtfOpt_latentstyles;
            ((CheckBox)ControlDictionary["cbshprslt"]).Checked = properties.RtfOpt_shprslt;
            ((CheckBox)ControlDictionary["cbHelpComments"]).Checked = properties.RtfOpt_comments;
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
            properties.RtfRegAutoInsert = !cbAlwaysAsk.Checked;
            properties.RtfRegAutoInsertHead = cbHead.Checked;
            properties.RtfRegAutoInsertBody = cbBody.Checked;
            properties.RtfRegAutoInsertFoot = cbFoot.Checked;
            properties.RtfAutoValidateAfterInsert = cbValidateAfterInsert.Checked;

            properties.RtfOpt_themedata = ((CheckBox)ControlDictionary["cbthemedata"]).Checked;
            properties.RtfOpt_datastore = ((CheckBox)ControlDictionary["cbdatastore"]).Checked;
            properties.RtfOpt_colorschememapping = ((CheckBox)ControlDictionary["cbcolorschememapping"]).Checked;
            properties.RtfOpt_latentstyles = ((CheckBox)ControlDictionary["cblatentstyles"]).Checked;
            properties.RtfOpt_shprslt = ((CheckBox)ControlDictionary["cbshprslt"]).Checked;
            properties.RtfOpt_comments = ((CheckBox)ControlDictionary["cbHelpComments"]).Checked;
            return true;
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // DesignerRTFPanel
            // 
            this.Name = "DesignerRTFPanel";
            this.ResumeLayout(false);

        }

    }
}
