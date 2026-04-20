//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ApplicationFormationPanel.cs             </Name>
//    <Description> Hlavní nastavení                                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-10-22                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Gui;

namespace Gordic.GFE.WinClient.Dialogs.OptionPanels
{
    /// <summary>
    /// nastavení sestav
    /// </summary>
    class ApplicationFormationPanel : AbstractOptionPanel
    {
        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public override void LoadPanelContents()
        {
            SetupLocalizedXFRM(AssemblyName + ".Resources.forms.options.ApplicationVariablesAndOtherPanel.xfrm");

            ((TextBox)ControlDictionary["tbAlfReportXmlns"]).Text = ReportDesignerProperties.Instance.AlfReportXmlns;
            ((TextBox)ControlDictionary["tbSsrReportXmlns"]).Text = ReportDesignerProperties.Instance.SsrReportXmlns;
            ((NumericUpDown)ControlDictionary["nudRecentOpenMaxCount"]).Value = ReportDesignerProperties.Instance.RecentOpenMaxCount;
        }

        /// <summary>
        /// Uložení obsahu panelu
        /// </summary>
        /// <returns></returns>
        public override bool StorePanelContents()
        {
            ReportDesignerProperties.Instance.AlfReportXmlns = ((TextBox)ControlDictionary["tbAlfReportXmlns"]).Text;
            ReportDesignerProperties.Instance.SsrReportXmlns = ((TextBox)ControlDictionary["tbSsrReportXmlns"]).Text;
            ReportDesignerProperties.Instance.RecentOpenMaxCount = (int)((NumericUpDown)ControlDictionary["nudRecentOpenMaxCount"]).Value;
            return true;
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // ApplicationFormationPanel
            // 
            this.Name = "ApplicationFormationPanel";
            this.ResumeLayout(false);

        }

    }
}
