//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.CallHelper.cs                         </Name>
//    <Description> Pomocná třída spuštění aplikace                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-22                                                  </Created>
//  </FileHeader>

using System;
using System.Diagnostics;
using System.IO;
using System.Reflection;
using System.Threading;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Core.Services;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.Commands;
using Gordic.GFE.WinClient.Core;
using Gordic.GFE.WinClient.Gui;
using Gordic.General;

namespace Gordic.GFE.WinClient
{
    /// <summary>
    /// pomocná statická třída
    /// </summary>
    static class ApplicationHelper
    {
        static string appRootDataPathKey = "AppRootDataPath";
        /// <summary>
        /// název hodnoty registru
        /// </summary>
        public static string AppRootDataPathKey { get { return appRootDataPathKey; } }

        static string appRootDataPath;
        /// <summary>
        /// kořenová složka konfiguračních dat aplikace
        /// např. C:\Users\ssukovych\AppData\Roaming
        /// </summary>
        public static string AppRootDataPath { get { return appRootDataPath; } }

        /// <summary>
        /// inicializace služby
        /// </summary>
        public static void Initialize()
        {
            appRootDataPath = RegistryService.GetAppValueFromRegistry(appRootDataPathKey);
            appRootDataPath = !string.IsNullOrEmpty(appRootDataPath) ? appRootDataPath : EnvironmentService.ApplicationData;
        }
    }
    /// <summary>
    /// Pomocná třída spuštění aplikace
    /// </summary>
    sealed class CallHelper : MarshalByRefObject
    {
        ReportDesignerHost.CallbackHelper callback;

        /// <summary>
        /// Inicializace jádra
        /// </summary>
        /// <param name="backcall">Metoda zpětného volání</param>
        /// <param name="properties">Vlastnosti spuštění</param>
        public void InitApplicationCore(ReportDesignerHost.CallbackHelper backcall, StartupSettings properties)
        {
            LoggingService.Info(GResources.GetResourceText(29450273)); //RC 29450273 : Jádro načtení aplikace
            this.callback = backcall;
            CoreStartup startup = new CoreStartup(RevisionClass.ApplicationName)
            {
                ConfigDirectory = properties.ConfigDirectory,
                DataDirectory = properties.DataDirectory
            };
            if (properties.PropertiesName != null)
                startup.PropertiesName = properties.PropertiesName;

            if (properties.ApplicationRootPath != null)
                FileUtility.ApplicationRootPath = properties.ApplicationRootPath;

            startup.StartCoreServices(ApplicationHelper.AppRootDataPath);
            ServiceManager.GraphicSettingService = ReportDesignerProperties.Instance;

            Assembly exe = RevisionClass.Assembly;
            ResourceService.RegisterStrings("Resources.StringResources", exe);
            ResourceService.RegisterImages("Gordic.GFE.WinClient.Properties.Resources", exe);
            StringParser.RegisterStringTagProvider(new CustomStringTagProvider());
            StringParser.RegisterStringTagProvider(new TemplateStringTagProvider());

            LoggingService.Info(GResources.GetResourceText(29450274) + " AddIns..."); //RC 29450274 : Hledání
            foreach (string file in properties.addInFiles)
                startup.AddAddInFile(file);
            foreach (string dir in properties.addInDirectories)
                startup.AddAddInsFromDirectory(dir);

            if (properties.AllowAddInConfigurationAndExternalAddIns)
                startup.ConfigureExternalAddIns(Path.Combine(startup.ConfigDirectory, "AddIns.xml"));
            if (properties.AllowUserConfigs)
                startup.ConfigureUserAddIns(Path.Combine(startup.ConfigDirectory, "addininstalltemp"),
                                            Path.Combine(startup.ConfigDirectory, "config"));

            LoggingService.Info(GResources.GetResourceText(29450275) + " AddInTree..."); //RC 29450275 : Načtení
            startup.RunInitialization(exe);

            FileUtility.FileLoaded += delegate(object sender, FileNameEventArgs e) { this.callback.FileLoaded(e.FileName); };
            FileUtility.FileSaved += delegate(object sender, FileNameEventArgs e) { this.callback.FileSaved(e.FileName); };
            //ProcessService.AttachProcess(Process.GetCurrentProcess(), this.GetType().Assembly, SimpleDesktop.GetActiveViewContent);
            LoggingService.Info("InitReportDesigner " + GResources.GetResourceText(29450276)); //RC 29450276 : dokončeno
        }

        /// <summary>
        /// Spuštění aplikace se zadaným nastavením
        /// </summary>
        /// <param name="settings">Nastavení spuštění</param>
        public void RunDesktop(DesktopSettings settings)
        {
            if (settings.RunOnNewThread)
            {
                Thread t = new Thread(RunDesktopInternal);
                t.SetApartmentState(ApartmentState.STA);
                t.Name = "FFmain";
                t.Start(settings);
            }
            else
                RunDesktopInternal(settings);
        }

        void RunDesktopInternal(object settings)
        {
            DesktopSettings desktopSettings = (DesktopSettings)settings;
            LoggingService.Info(GResources.GetResourceText(29450277) + "..."); //RC 29450277 : inicializace pracovní plochy
            SimpleDesktop.InitializeDesktop();
            Exception exception = null;
            if (!SimpleDesktop.NeedRestart)
            {
                LoggingService.Info(GResources.GetResourceText(29450278) + "..."); //RC 29450278 : spuštění pracovní plochy

                StartDesktopCommand wbc = new StartDesktopCommand();
                callback.BeforeRunDesktop();
                try
                {
                    if (Debugger.IsAttached)
                        wbc.Run(desktopSettings.InitialFileList);
                    else
                        wbc.Run(desktopSettings.InitialFileList);
                }
                catch (Exception ex) { exception = ex; }
            }
         
            LoggingService.Info(GResources.GetResourceText(29450279) + "..."); //RC 29450279 : uvolnění služeb
            try
            {
                SimpleDesktop.OnDesktopUnloaded();
                PropertyService.Save();
            }
            catch (Exception ex)
            {
                LoggingService.Warning(GResources.GetResourceText(29450280), ex); //RC 29450280 : výjimka v průběhu uvolnění služeb
                if (exception == null)
                    exception = ex;
            }

            LoggingService.Info(GResources.GetResourceText(29450281)); //RC 29450281 : ukončení běhu pracovní plochy
            callback.DesktopClosed();
            if (exception != null)
            {
                string errorText = GResources.GetResourceText(29450282); //RC 29450282 : neošetřená výjimka ukončí pracovní plochu
                LoggingService.Fatal(exception);
                MessageService.ShowError(exception, errorText);
                //throw new RunDesktopException(errorText, exception);
            }
        }

    }
}
