//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.DatabaseService.cs                     </Name>
//    <Description> Služba pro práci s databází                                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-12                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.General.WinApplication;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.Parsers.Gui;
using Gordic.General;

namespace Gordic.GFE.WinClient.Database
{
    /// <summary>
    /// Služba pro práci s databází
    /// </summary>
    static class DatabaseService
    {
        static GWinUserProcess userProcess = null;
        /// <summary>
        /// uživatelský proces
        /// </summary>
        public static GWinUserProcess UserProcess { get { return userProcess; } }

        /// <summary>
        /// Uvolnění databázové služby
        /// </summary>
        public static void Unload()
        {
            if (userProcess.IsInitialized)
                userProcess.Release();
        }

        /// <summary>
        /// Indikuje autorizací
        /// </summary>
        public static bool IsAuthorized
        {
            get
            {
                if (DatabaseService.UserProcess == null)
                    userProcess = ReportDesignerMain.Current;

                if (!DatabaseService.UserProcess.IsAuthorized)
                {
                    try { DatabaseService.UserProcess.Initialize(); }
                    catch (Exception ex) { MessageService.ShowError(ex); }
                    if (DatabaseService.UserProcess.IsAuthorized)
                    {
                        string l_sAppName = userProcess.ApplicationInfo.Name.BaseValue;
                        SimpleDesktop.Desktop.Title = userProcess.GetApplicationTitle(l_sAppName);
                    }
                }

                return DatabaseService.UserProcess.IsAuthorized;
            }
        }

        /// <summary>
        /// Bezpečné uložení
        /// </summary>
        internal static void ObservedSave()
        {
            AsynchronousWaitDialog.Pause();
            try
            {
                PropertyDialog frm = new PropertyDialog()
                {
                    PropertiesDefalut = "Dialog.DBExport",
                    Icon = ImageService.BitmapToIcon(Properties.Resources.Icons__Gin__ulozit_do_databaze)
                };
                CDbExportTab export = new CDbExportTab() { Dock = DockStyle.Fill };
                frm.AddControl(export);
                frm.ShowDialog();
            }
            catch (Exception ex)
            {
                MessageService.ShowError(GResources.GetResourceText(29451295) + '\n' + ex.Message); //RC 29451295 : Tento soubor do databáze nelze uložit.
            }
            AsynchronousWaitDialog.ReStart();
        }

        /// <summary>
        /// nové připojení do databáze
        /// </summary>
        internal static void Reconnect()
        {
            if (DatabaseService.UserProcess == null)
                userProcess = ReportDesignerMain.Current;
            else if (DatabaseService.UserProcess.IsAuthorized)
                userProcess.Release();

            DatabaseService.UserProcess.Initialize();
        }
    }
}
