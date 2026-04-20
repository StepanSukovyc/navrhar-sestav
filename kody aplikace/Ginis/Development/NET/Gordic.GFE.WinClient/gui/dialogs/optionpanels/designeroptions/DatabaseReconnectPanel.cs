//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.DatabaseReconnectPanel.cs              </Name>
//    <Description> panel pro změnu databázového připojení                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-09-02                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Database;
using Gordic.WinForms.Controls;
using System;

namespace Gordic.GFE.WinClient.Dialogs.OptionPanels
{
    /// <summary>
    /// panel pro změnu databázového připojení
    /// </summary>
    class DatabaseReconnectPanel : AbstractOptionPanel
    {
        /// <summary>
        /// načtené obsahu
        /// </summary>
        public override void LoadPanelContents()
        {
            SetupLocalizedXFRM(AssemblyName + ".Resources.forms.options.DatabaseReconnectPanel.xfrm");

            SetInformation();
            ((GButton)ControlDictionary["btnConnect"]).Click += btnConnectClick;
        }

        void SetInformation()
        {
            if (DatabaseService.UserProcess != null && DatabaseService.UserProcess.IsAuthorized)
            {
                ((GLabeledTextBox)ControlDictionary["tbCurrentProfile"]).Text = DatabaseService.UserProcess.LoginInfo.Database;
                ((GLabeledTextBox)ControlDictionary["tbCurrentUser"]).Text = DatabaseService.UserProcess.LoginInfo.User;
            }
        }

        void btnConnectClick(object sender, EventArgs e)
        {
            DatabaseService.Reconnect();
            SetInformation();
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // DatabaseReconnectPanel
            // 
            this.Name = "DatabaseReconnectPanel";
            this.ResumeLayout(false);

        }
    }
}
