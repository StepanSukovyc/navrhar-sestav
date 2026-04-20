//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.Program.cs                            </Name>
//    <Description> The main entry point for the application.                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-04-10                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.General;
using System.Configuration;
using Gordic.WinForms.Controls;
using System.Diagnostics;
using Gordic.General.WinApplication;
using System.IO;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers;

namespace Gordic.Gfe.FormFiller
{
    /// <summary>
    /// Prohlížeč - klientská aplikace
    /// </summary>
    [Faze("GSAGFE01", Sestavy = false, Subsystem = Gordic.General.GCommon.Subsystem.Other, TestVerzeDb = false)]
    class FormFillerMain : GWinUserProcess
    {
        internal static FormFillerMain current = null;
        /// <summary>
        /// Odkaz na stávající aplikaci
        /// </summary>
        internal static new GWinUserProcess Current { get { return current; } }

        static string[] commandLineArgs = null;
        /// <summary>
        /// Argument spuštění aplikace
        /// </summary>
        public static string[] CommandLineArgs
        {
            get { return commandLineArgs; }
        }

        /// <summary>načtení parametrů z příkazové řádky (pro automaticke prihlaseni)</summary>
        public override void ParseCommandLine()
        {
        }

        /// <summary>hlavní smyčka aplikace</summary>
        [STAThread]
        static void Main(string[] args)
        {
            commandLineArgs = args;
            try { Run(); }
            catch (Exception ex)
            {
                try { HandleMainException(ex); }
                catch (Exception loadError) { MessageBox.Show(loadError.ToString(), GResources.GetResourceText(29450033)); } //RC 29450033 : Kritická chyba (chyba služby protokolování?)!
            }
        }
        static void HandleMainException(Exception ex)
        {
            LoggingService.Fatal(ex);
            try { GMessageBox.ShowError(GResources.GetResourceText(29450034)); } //RC 29450034 : Neošetřená výjimka ukončila Prohlížeč formulářů!
            catch { MessageBox.Show(ex.ToString(), GResources.GetResourceText(29450035)); } //RC 29450035 : Kritická chyba (nelze použit GMessageBox)!
        }
        static void Run()
        {
            LoggingService.Info(GResources.GetResourceText(29450036)); //RC 29450036 : povolení vizuálních stylů pro aplikaci
            Application.EnableVisualStyles();
            LoggingService.Info(GResources.GetResourceText(29450037)); //RC 29450037 : podpora visuálních stylů - bez potřeby manifest souboru
            Application.SetCompatibleTextRenderingDefault(false);
            bool ignoreError = true;
            while (ignoreError)
            {
                try { RunApplication(); ignoreError = false; }
                catch (Exception e)
                {
                    GErrorDialog.ShowError(e, true);
                    ignoreError = MessageService.AskQuestion(GResources.GetResourceText(29450038)); //RC 29450038 : Přejete si pokračovat?
                }
                finally
                {
                    LoggingService.Info(GResources.GetResourceText(29450039)); //RC 29450039 : uvolnění instance.
                    LoggingService.Save(FileUtility.Combine(EnvironmentService.ApplicationData, RevisionClass.ApplicationName, RevisionClass.FullVersion));
                }
            };
        }


        static void RunApplication()
        {
            LoggingService.Info(GResources.GetResourceText(29450040) + "..."); //RC 29450040 : spuštění Prohlížeče formulářů

            if (current == null)
                current = new FormFillerMain();
            try
            {
                //FALSE - neprovádí automatickou autorizací
                current.Initialize(false);

                StartupSettings startup = new StartupSettings();
                RevisionClass.Assembly = typeof(FormFillerMain).Assembly;
                startup.ApplicationRootPath =
                    Path.Combine(EnvironmentService.ApplicationData, RevisionClass.ApplicationName, RevisionClass.FullVersion);
                startup.AllowUserAddIns = true;
                string configDirectory = ConfigurationManager.AppSettings["settingsPath"];
                startup.ConfigDirectory = string.IsNullOrEmpty(configDirectory)
                    ? Path.Combine(startup.ApplicationRootPath, "formfillerconfig")
                    : Path.Combine(Path.GetDirectoryName(RevisionClass.Assembly.Location), configDirectory);

                startup.AddAddInsFromDirectory(Path.Combine(startup.ApplicationRootPath, "config"));

                FormFillerHost host = new FormFillerHost(AppDomain.CurrentDomain, startup);
                host.DesktopClosed += HostDesktopClosed;

                DesktopSettings desktopSettings = new DesktopSettings
                {
                    RunOnNewThread = false
                };
                if (CommandLineArgs != null)
                    for (int i = 0; i < CommandLineArgs.Length; i++)
                        desktopSettings.InitialFileList.Add(new StartupFile(CommandLineArgs[i]));
                host.RunDesktop(desktopSettings);
            }
            finally { LoggingService.Info(GResources.GetResourceText(29450041) + " RunApplication()"); } //RC 29450041 : opuštění metody
        }

        static void HostDesktopClosed(object sender, EventArgs e)
        {
            ProcessService.DetachProcess(Process.GetCurrentProcess());
        }
    }
}
