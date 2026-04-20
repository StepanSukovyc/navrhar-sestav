//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ApplicationFullscreenPanel.cs          </Name>
//    <Description> nastavení chování aplikace v režimu úplné obrazovky         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-05                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;

namespace Gordic.GFE.WinClient.Gui.OptionPanels
{
    /// <summary>
    /// nastavení chování aplikace v režimu úplné obrazovky
    /// </summary>
    class ApplicationFullscreenPanel : AbstractOptionPanel
    {
        static readonly string fullscreenProperty = "Gui.FullscreenOptions";
        /// <summary>
        /// načtené obsahu
        /// </summary>
        public override void LoadPanelContents()
        {
            SetupLocalizedXFRM(AssemblyName + ".Resources.forms.options.ApplicationFullscreenPanel.xfrm");

            Property properties = PropertyService.Get(fullscreenProperty, new Property());

            Get<CheckBox>("HideMainMenu").Checked = properties.Get("HideMainMenu", false);
            Get<CheckBox>("ShowMainMenuOnMouseMove").Checked = properties.Get("ShowMainMenuOnMouseMove", true);
            Get<CheckBox>("HideToolbars").Checked = properties.Get("HideToolbars", true);
            Get<CheckBox>("HideStatusBar").Checked = properties.Get("HideStatusBar", true);
            Get<CheckBox>("ShowStatusBarOnMouseMove").Checked = properties.Get("ShowStatusBarOnMouseMove", true);

            Get<CheckBox>("HideMainMenu").CheckedChanged += delegate { RefreshStatus(); };
            Get<CheckBox>("HideStatusBar").CheckedChanged += delegate { RefreshStatus(); };

            RefreshStatus();
        }

        void RefreshStatus()
        {
            Get<CheckBox>("ShowMainMenuOnMouseMove").Enabled = Get<CheckBox>("HideMainMenu").Checked;
            Get<CheckBox>("ShowStatusBarOnMouseMove").Enabled = Get<CheckBox>("HideStatusBar").Checked;
        }
        /// <summary>
        /// Uložení obsahu panelu
        /// </summary>
        /// <returns></returns>
        public override bool StorePanelContents()
        {
            Property properties = PropertyService.Get(fullscreenProperty, new Property());

            properties.Set("HideMainMenu", Get<CheckBox>("HideMainMenu").Checked);
            properties.Set("ShowMainMenuOnMouseMove", Get<CheckBox>("ShowMainMenuOnMouseMove").Checked);
            properties.Set("HideToolbars", Get<CheckBox>("HideToolbars").Checked);
            properties.Set("HideStatusBar", Get<CheckBox>("HideStatusBar").Checked);
            properties.Set("ShowStatusBarOnMouseMove", Get<CheckBox>("ShowStatusBarOnMouseMove").Checked);

            PropertyService.Set(fullscreenProperty, properties);

            return true;
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // ApplicationFullscreenPanel
            // 
            this.Name = "ApplicationFullscreenPanel";
            this.ResumeLayout(false);

        }
    }
}
