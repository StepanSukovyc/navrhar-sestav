//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.Program.cs                             </Name>
//    <Description> Návrhář - tlustý klient                                     </Description>
//    <Author>      Mgr. Stepan Sukovych                                             </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025                  </Copyright>
//    <Created>     2009-06-15                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.General;
using Gordic.General.WinApplication;
using Gordic.WinForms.Controls;
using System.Configuration;
using System.Diagnostics;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core.Services;
using System.IO;
using Gordic.GFE.WinClient.Services;
using System.Resources;
using System.Runtime.InteropServices;
using System.Collections.Generic;

namespace Gordic.GFE.WinClient
{
    /// <summary>
    /// Návrhář - klientská aplikace
    /// </summary>
    [Faze("GSAGFE01", Sestavy = false, Subsystem = GCommon.Subsystem.Other, TestVerzeDb = false)]
    class ReportDesignerMain : GWinUserProcess
    {
        static StartupFile[] commandLineArgs = null;
        /// <summary>
        /// Argument spuštění aplikace
        /// </summary>
        public static StartupFile[] CommandLineArgs { get { return commandLineArgs; } }

        internal static ReportDesignerMain current = null;
        /// <summary>
        /// Odkaz na stávající aplikaci
        /// </summary>
        internal static new GWinUserProcess Current { get { return current; } }

        /// <summary>Vytvoření instance nové třídy aplikace</summary>
        public ReportDesignerMain()
        {
            // nechceme zobrazení klasického dialogového okna čekání načtení aplikace
            this.WaitDialogEnabled = false;
            // nechceme povolit automaticke reinstalace (vyzadovalo by upravy v kodu Navrhare)
            this.AcceptReinstallation = false;
        }

        private bool CommandLineParsed = false;
        /// <summary>načtení parametrů z příkazové řádky (pro automaticke prihlaseni)</summary>
        public override void ParseCommandLine()
        {
            string[] l_asParameters = Environment.GetCommandLineArgs();
            var args = new System.Collections.Generic.List<StartupFile>();
            bool isProject = false;
            bool isUntitled = false;
            // příznak spuštění aplikace ze spouštěcí lišty
            for (int i = 1; i < l_asParameters.Length; i++)
            {
                var p = l_asParameters[i];

                if (String.Equals(p, "-s", StringComparison.OrdinalIgnoreCase))
                {
                    if (!CommandLineParsed) { base.ParseCommandLine(); CommandLineParsed = true; }
                    continue;
                }

                if (String.Equals(p, "-p", StringComparison.OrdinalIgnoreCase))
                {
                    isProject = true;
                    continue;
                }
                if (String.Equals(p, "-u", StringComparison.OrdinalIgnoreCase))
                {
                    isUntitled = true;
                    continue;
                }

                if (p.Length > 50 && System.Linq.Enumerable.All(p, ch => Char.IsLower(ch)))
                {
                    if (!CommandLineParsed) { base.ParseCommandLine(); CommandLineParsed = true; }
                    continue;
                }

                args.Add(new StartupFile(p, isUntitled, isProject));
                isProject = false;
                isUntitled = false;
            }
            //if (l_asParameters.Length > 1)
            //{
            //    commandLineArgs = new string[l_asParameters.Length - 1];
            //    for (int index = 1; index < l_asParameters.Length; index++)
            //        commandLineArgs[index - 1] = l_asParameters[index];
            //}
            commandLineArgs = args.ToArray();
        }
        /// <summary>inicializace</summary>
        protected override void OnInitialize()
        {
            //vynuti nekontrolovani pritomnosti GINu
            Configuration.SetParameter(Gordic.General.ApplicationInterface.GApplicationCommon.GinPresenceRequired, false);

            // pretizeni lokalizaci
            var locoverride = Configuration.GetParameter("Localization-override");
            if (string.IsNullOrEmpty(locoverride) == false)
            {
                if (File.Exists(locoverride) == false)
                {
                    var sb = new System.Text.StringBuilder();
                    void _write1(ResourceManager m, string assemblyName, string extendedFileName)
                    {
                        var ms = m.GetResourceSet(System.Threading.Thread.CurrentThread.CurrentUICulture, true, false);
                        if (ms == null) return;
                        foreach (System.Collections.DictionaryEntry t in ms)
                            sb.AppendLine($"{assemblyName}/{extendedFileName}/{t.Key}={t.Value.ToString().Replace("\r", "").Replace("\n", "\\n")}");
                    }
                    void _write(System.Reflection.Assembly assembly, string extendedFileName = "")
                    {
                        // konstrukce názvu souboru se zdroji
                        string l_sAssemblyName = assembly.GetName().Name
                            , l_sResourceName = extendedFileName == string.Empty ? l_sAssemblyName : string.Format("{0}.{1}", l_sAssemblyName, extendedFileName);
                        ResourceManager l_oResourceManager = GResources.GetResourceManagerBase(string.Format("{0}.{1}", l_sAssemblyName, l_sResourceName), assembly);
                        _write1(l_oResourceManager, l_sAssemblyName, extendedFileName);
                    }

                    _write(typeof(Gordic.GFE.WinClient.ReportDesignerMain).Assembly);
                    _write(typeof(Gordic.GFE.Parsers.AbstractPagePanel).Assembly);
                    _write(typeof(Gordic.Report.WinClient.GPrintAction).Assembly);
                    _write(typeof(Gordic.Report.Client.GClientReport).Assembly);
                    _write(typeof(Gordic.Report.Interface.DataReader).Assembly);
                    _write(typeof(Gordic.TextEditor.Caret).Assembly);
                    File.WriteAllText(locoverride, sb.ToString());
                }
                GResources.Override = new GResourcesOverrideFile(locoverride);
            }

            base.OnInitialize();
        }

        [DllImport("Shcore.dll")]
        static extern int SetProcessDpiAwareness(int PROCESS_DPI_AWARENESS);

        // According to https://msdn.microsoft.com/en-us/library/windows/desktop/dn280512(v=vs.85).aspx
        private enum DpiAwareness
        {
            None = 0,
            SystemAware = 1,
            PerMonitorAware = 2
        }


        /// <summary>hlavní smyčka aplikace</summary>
        [STAThread]
        static void Main()
        {
            // komaptibilita s 4k?
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            SetProcessDpiAwareness((int)DpiAwareness.PerMonitorAware);
            // komaptibilita s 4k?

#if DEBUG
            //GResources.Override = new GResourcesOverrideIds();
            //SetApplicationCulture("fr-FR");
#endif
            try { Run(); }
            catch (Exception ex)
            {
                try { HandleMainException(ex); }
                catch (Exception loadError) { MessageBox.Show(loadError.ToString(), GResources.GetResourceText(29450283)); } //RC 29450283 : Kritická chyba (chyba služby protokolování?)
            }
        }
        static void HandleMainException(Exception ex)
        {
            LoggingService.Fatal(ex);
            try { GMessageBox.ShowError(GResources.GetResourceText(29450284)); } //RC 29450284 : Neošetřená výjimka ukončila Návrhář sestav!
            catch { MessageBox.Show(ex.ToString(), GResources.GetResourceText(29450285)); } //RC 29450285 : Kritická chyba (nelze použit GMessageBox)!
        }
        static void Run()
        {
            // získáme záznam z registru ohledně umístění konfigurační složky uživatelského nastavení
            ApplicationHelper.Initialize();

            LoggingService.Info(GResources.GetResourceText(29450286)); //RC 29450286 : Podpora visuálních stylů - bez potřeby manifest souboru
            RevisionClass.Assembly = typeof(ReportDesignerMain).Assembly;
            string rootPath = Path.Combine(ApplicationHelper.AppRootDataPath, RevisionClass.ApplicationName, RevisionClass.FullVersion);

            if (CheckVersion.ShowCheckVersion(rootPath) != DialogResult.Abort)
            {
                ServiceManager.MessageService = WinFormsMessageService.Instance;
                ServiceManager.LoggingService = new List<ILoggingService>() { new FileWriterLoggingService(new FileTextWriter()), new TextWriterLoggingService(new FileTextWriter()) };

                LoggingService.Info(GResources.GetResourceText(29450287)); //RC 29450287 : Povolení vizuálních stylů pro aplikaci

                try
                {
                    while (SimpleDesktop.NeedRestart)
                    {
                        SimpleDesktop.NeedRestart = false;
                        RunApplication(rootPath);

                        if (SimpleDesktop.NeedRestart)
                            FileUtility.ObservedDelete(new System.Collections.Generic.List<string>() { config }, true);
                    }
                }
                catch (Exception e)
                {
                    try { GErrorDialog.ShowError(e); }
                    catch (Exception exc) { MessageBox.Show(GResources.GetResourceText(29450671) + "...\r\n" + exc.Message + "...\r\n" + e.Message); } //RC 29450671 : Neošetřená výjimka
                }
                finally
                {
                    LoggingService.Info(GResources.GetResourceText(29450288)); //RC 29450288 : Uvolnění instance
                    LoggingService.Save(rootPath);
                }
            }
            Application.Exit();
        }
        static string config;
        static void RunApplication(string rootPath)
        {
            LoggingService.Info(GResources.GetResourceText(29450289) + "..."); //RC 29450289 : Spuštění Návrháře sestav
            if (current == null)
                current = new ReportDesignerMain();
            try
            {
                LoggingService.Info(GResources.GetResourceText(29450290)); //RC 29450290 : Inicializace aplikace (pozdrženo otevření session -> případně až v DbImport)
                //FALSE - neprovádí automatickou autorizací
                current.Initialize(false);
                if (current.CommandLineParsed && Gordic.GFE.WinClient.Database.DatabaseService.IsAuthorized == false)
                {
                    return;
                }


                StartupSettings startup = new StartupSettings
                {
                    ApplicationRootPath = rootPath,
                    AllowUserConfigs = true
                };

                string configDirectory = ConfigurationManager.AppSettings["settingsPath"];
                startup.ConfigDirectory = string.IsNullOrEmpty(configDirectory)
                    ? Path.Combine(startup.ApplicationRootPath, "reportdesignerconfig")
                    : Path.Combine(Path.GetDirectoryName(RevisionClass.Assembly.Location), configDirectory);

                config = Path.Combine(startup.ApplicationRootPath, "config");
                startup.AddConfigsFromDirectory(config);

                ReportDesignerHost host = new ReportDesignerHost(AppDomain.CurrentDomain, startup);
                host.DesktopClosed += HostDesktopClosed;

                DesktopSettings desktopSettings = new DesktopSettings
                {
                    RunOnNewThread = false
                };
                if (CommandLineArgs != null)
                    for (int i = 0; i < CommandLineArgs.Length; i++)
                        desktopSettings.InitialFileList.Add(CommandLineArgs[i]);

                host.RunDesktop(desktopSettings);
            }
            finally { LoggingService.Info(GResources.GetResourceText(29450291) + " RunApplication()"); } //RC 29450291 : Opuštění metody
        }
        static void HostDesktopClosed(object sender, EventArgs e)
        {
            ThreadService.DeactivateCaller(SimpleDesktop.Desktop);
            ProcessService.DetachProcess(Process.GetCurrentProcess());
        }
    }
}
