//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.OutputWindowOptionsPanel.cs            </Name>
//    <Description> Panel nastavení Výstupního okna.                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-09                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;

namespace Gordic.GFE.WinClient.Gui.OptionPanels
{
    /// <summary>
    /// Panel nastavení Výstupního okna.
    /// </summary>
    class OutputWindowOptionsPanel : AbstractOptionPanel
    {
        /// <summary>
        /// Indikátor vlastnosti
        /// </summary>
        public static readonly string OutputWindowsProperty = "ReportDesigner.UI.OutputWindowOptions";
        FontSelectionPanel fontSelectionPanel;

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public OutputWindowOptionsPanel()
        {
        }

        /// <summary>
        /// Načtení obsahu panelu
        /// </summary>
        public override void LoadPanelContents()
        {
            SetupLocalizedXFRM(AssemblyName + ".Resources.forms.options.OutputWindowOptionsPanel.xfrm");

            Property properties = (Property)PropertyService.Get(OutputWindowsProperty, new Property());
            fontSelectionPanel = new FontSelectionPanel();
            fontSelectionPanel.Dock = DockStyle.Fill;
            ControlDictionary["FontGroupBox"].Controls.Add(fontSelectionPanel);
            ((CheckBox)ControlDictionary["wordWrapCheckBox"]).Checked = properties.Get("WordWrap", true);

            fontSelectionPanel.CurrentFontString = properties.Get("DefaultFont", WinFormsResourceService.DefaultMonospacedFont.ToString()).ToString();
        }
        /// <summary>
        /// Uložení obsahu panelu
        /// </summary>
        /// <returns></returns>
        public override bool StorePanelContents()
        {
            Property properties = (Property)PropertyService.Get(OutputWindowsProperty, new Property());
            properties.Set("WordWrap", ((CheckBox)ControlDictionary["wordWrapCheckBox"]).Checked);
            string currentFontString = fontSelectionPanel.CurrentFontString;
            if (currentFontString != null)
                properties.Set("DefaultFont", currentFontString);

            PropertyService.Set(OutputWindowsProperty, properties);
            return true;
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // OutputWindowOptionsPanel
            // 
            this.Name = "OutputWindowOptionsPanel";
            this.ResumeLayout(false);

        }
    }
}
