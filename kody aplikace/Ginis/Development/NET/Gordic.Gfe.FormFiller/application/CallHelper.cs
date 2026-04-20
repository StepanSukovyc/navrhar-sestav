//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.CallHelper.cs                         </Name>
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
using Gordic.Gfe.FormFiller.Core;
using Gordic.Gfe.FormFiller.Gui;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Core.Services;
using Gordic.General;

namespace Gordic.Gfe.FormFiller
{
    /// <summary>
    /// Pomocná třída spuštění aplikace
    /// </summary>
    sealed class CallHelper : MarshalByRefObject
    {
        FormFillerHost.CallbackHelper callback;

        /// <summary>
        /// Inicializace jádra
        /// </summary>
        /// <param name="callback">Metoda zpětného volání</param>
        /// <param name="properties">Vlastnosti spuštění</param>
        public void InitApplicationCore(FormFillerHost.CallbackHelper callback, StartupSettings properties)
        {
            ServiceManager.MessageService = WinFormsMessageService.Instance;

            LoggingService.Info(GResources.GetResourceText(29450012)); //RC 29450012 : jádro načtení aplikace
            this.callback = callback;
            CoreStartup startup = new CoreStartup(RevisionClass.ApplicationName)
            {
                ConfigDirectory = properties.ConfigDirectory,
                DataDirectory = properties.DataDirectory
            };
            if (properties.PropertiesName != null)
                startup.PropertiesName = properties.PropertiesName;

            if (properties.ApplicationRootPath != null)
                FileUtility.ApplicationRootPath = properties.ApplicationRootPath;

            startup.StartCoreServices(EnvironmentService.ApplicationData);
            ServiceManager.GraphicSettingService = FormFillerProperties.Instance;

            Assembly exe = RevisionClass.Assembly;
            ResourceService.RegisterStrings("Resources.StringResources", exe);
            ResourceService.RegisterImages("Gordic.Gfe.FormFiller.Properties.Resources", exe);
            
            LoggingService.Info(GResources.GetResourceText(29450013) + " AddIns..."); //RC 29450013 : hledání
            foreach (string file in properties.addInFiles)
                startup.AddAddInFile(file);
            foreach (string dir in properties.addInDirectories)
                startup.AddAddInsFromDirectory(dir);

            if (properties.AllowAddInConfigurationAndExternalAddIns)
                startup.ConfigureExternalAddIns(Path.Combine(startup.ConfigDirectory, "AddIns.xml"));
            if (properties.AllowUserAddIns)
                startup.ConfigureUserAddIns(Path.Combine(startup.ConfigDirectory, "addininstalltemp"),
                                            Path.Combine(startup.ConfigDirectory, "config"));

            LoggingService.Info(GResources.GetResourceText(29450014) + " AddInTree..."); //RC 29450014 : načtení
            startup.RunInitialization(exe);

            FileUtility.FileLoaded += delegate(object sender, FileNameEventArgs e) { this.callback.FileLoaded(e.FileName); };
            FileUtility.FileSaved += delegate(object sender, FileNameEventArgs e) { this.callback.FileSaved(e.FileName); };
            LoggingService.Info("InitFormFiller " + GResources.GetResourceText(29450015)); //RC 29450015 : dokončeno
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

            LoggingService.Info(GResources.GetResourceText(29450016) + "..."); //RC 29450016 : inicializace pracovní plochy
            SimpleDesktop.InitializeDesktop();

            LoggingService.Info(GResources.GetResourceText(29450017) + "..."); //RC 29450017 : spuštění pracovní plochy
            Exception exception = null;

            try
            {
                StartDesktopCommand sdc = new StartDesktopCommand();
                callback.BeforeRunDesktop();
                if (Debugger.IsAttached)
                    sdc.Run(desktopSettings.InitialFileList);
                else
                    try { sdc.Run(desktopSettings.InitialFileList); }
                    catch (Exception ex) { exception = ex; }
            }
            finally
            {
                LoggingService.Info(GResources.GetResourceText(29450018) + "..."); //RC 29450018 : uvolnění služeb
                try
                {
                    SimpleDesktop.OnDesktopUnloaded();
                    PropertyService.Save();
                }
                catch (Exception ex)
                {
                    LoggingService.Warning(GResources.GetResourceText(29450019), ex); //RC 29450019 : výjimka v průběhu uvolnění služeb
                    if (exception == null)
                        exception = ex;
                }
            }
            LoggingService.Info(GResources.GetResourceText(29450020)); //RC 29450020 : ukončení běhu pracovní plochy.
            callback.DesktopClosed();
            if (exception != null)
            {
                string errorText = GResources.GetResourceText(29450021); //RC 29450021 : Neošetřená výjimka ukončí pracovní plochu
                LoggingService.Fatal(exception);
                throw new RunDesktopException(errorText, exception);
            }
        }

    }
}
