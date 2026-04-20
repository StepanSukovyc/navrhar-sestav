//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.CoreStartup.cs                         </Name>
//    <Description> Třída, která pomáhá spuštění Gordic.GFE.Parsers.Core.     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-01-17                                                  </Created>
//  </FileHeader>

using System;
using System.IO;
using System.Collections.Generic;
using Gordic.General;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Jádro spuštění aplikace.
    /// </summary>
    public sealed class CoreStartup
    {
        /// <summary>
        /// doplňky aplikace
        /// </summary>
        List<string> addInFiles = new List<string>();

        /// <summary>
        /// zakázané doplňky
        /// </summary>
        readonly List<string> disabledAddIns = new List<string>();
        bool externalAddInsConfigured;
        string propertiesName;
        string configDirectory;
        string dataDirectory;
        readonly string applicationName;

        /// <summary>
        /// Nastaví název používaný pro vlastnosti (pouze jméno, bez cesty nebo rozšíření).
        /// Musí být nastavena před voláním StartCoreServices().
        /// </summary>
        public string PropertiesName
        {
            get { return propertiesName; }
            set
            {
                if (string.IsNullOrEmpty(value))
                    throw new ArgumentNullException("value");
                propertiesName = value;
            }
        }

        /// <summary>
        /// Nastaví název adresáře používaného pro službu vlastnosti.
        /// Musí být nastavena před voláním StartCoreServices().
        /// Použijte NULL pro výchozí cestu "%ApplicationData%\%ApplicationName%",
        /// kde %ApplicationData% je systémové nastavení pro
        /// "c:\documents and settings\username\application data"
        /// a %ApplicationName% je název aplikace, kterou jste použili při
        /// volání konstrukteru CoreStartup.
        /// </summary>
        public string ConfigDirectory
        {
            get { return configDirectory; }
            set { configDirectory = value; }
        }

        /// <summary>
        /// Nastavuje adresář dat používaný k načtení zdrojů (obrázky, texty, šablony atd.).
        /// Musí být nastavena před voláním StartCoreServices().
        /// Použijte NULL pro výchozí cestu "ApplicationRootPath\data".
        /// </summary>
        public string DataDirectory
        {
            get { return dataDirectory; }
            set { dataDirectory = value; }
        }

        /// <summary>
        /// Vytvoření nové instance třídy CoreStartup.
        /// </summary>
        /// <param name="applicationName">
        /// Název aplikace.
        /// Se používá jako výchozí název textových dialogů,
        /// výchozí název konfiguračního adresáře atd.
        /// </param>
        public CoreStartup(string applicationName)
        {
            this.applicationName = applicationName ?? throw new ArgumentNullException("applicationName");
            propertiesName = applicationName + ".Properties";
            MessageService.DefaultMessageBoxTitle = applicationName;
            MessageService.ProductName = applicationName;
        }

        /// <summary>
        /// Nalezení doplňků (dle koncovky .addin souborů) rekurzivně ve složce <paramref name="addInDir"/>.
        /// Nalezené doplňky se přidají do seznamu doplňků.
        /// </summary>
        /// <param name="addInDir">Složka pro hledání</param>
        public void AddAddInsFromDirectory(string addInDir)
        {
            if (string.IsNullOrEmpty(addInDir))
                throw new ArgumentNullException(GResources.GetResourceText(29450193)); //RC 29450193 : Název složky musí být uveden!

            addInFiles.AddRange(FileUtility.SearchDirectory(addInDir, "*.gconfig"));
        }

        /// <summary>
        /// Přidání specifického souboru .addin do seznamu AddIn souboru k načtení.
        /// </summary>
        public void AddAddInFile(string addInFile)
        {
            if (addInFile == null)
                throw new ArgumentNullException("addInFile");
            addInFiles.Add(addInFile);
        }

        /// <summary>
        /// Použití specifického konfiguračního souboru pro uložení informací o
        /// zakázaných doplňkach a externích doplňkach.
        /// Musíte volat tuto metodu na podporu <see cref="AddInManager"/>.
        /// </summary>
        /// <param name="addInConfigurationFile">
        /// Název souboru pro uložení seznamu zakázaných AddIns
        /// a seznamu insatlovaných externích AddIns.
        /// Dobrá hodnota pro tento parametr bude
        /// <c>Path.Combine(<see cref="PropertyService.ConfigDirectory"/>, "AddIns.xml")</c>.
        /// </param>
        public void ConfigureExternalAddIns(string addInConfigurationFile)
        {
            externalAddInsConfigured = true;
            AddInManager.ConfigurationFileName = addInConfigurationFile;
            AddInManager.LoadAddInConfiguration(addInFiles, disabledAddIns);
        }

        /// <summary>
        /// Konfiguruje podporu uživatelských doplňků AddIn.
        /// </summary>
        /// <param name="addInInstallTemp">
        /// dočasný instalační adresář doplňků.
        /// ConfigureUserAddIns bude instalovat AddIns z tohoto adresáře a
        /// uloží hodnotu parametru do <see cref="AddInManager.AddInInstallTemp"/>.
        /// </param>
        /// <param name="userAddInPath">
        /// Cesta s nainstalovanými uživatelskými doplňky AddIns.
        /// Z tohoto adresáře budou načteny všechny doplňky
        /// </param>
        public void ConfigureUserAddIns(string addInInstallTemp, string userAddInPath)
        {
            if (!externalAddInsConfigured)
                throw new InvalidOperationException(string.Join(" ", GResources.GetResourceText(29450195), "ConfigureExternalAddIns", GResources.GetResourceText(29450194), "ConfigureUserAddIns!")); //RC 29450195 : Metoda
            AddInManager.AddInInstallTemp = addInInstallTemp;
            AddInManager.UserAddInPath = userAddInPath;
            if (Directory.Exists(addInInstallTemp))
                AddInManager.InstallAddIns(disabledAddIns);
            if (Directory.Exists(userAddInPath))
                AddAddInsFromDirectory(userAddInPath);
        }

        /// <summary>
        /// Inicializuje systém doplňků.
        /// načtení doplňků přidaných do seznamu,
        /// pak zavolá příkaz <see cref="ICommand"/>
        /// v <c>/Workspace/Autostart</c>.
        /// </summary>
        /// <param name="defaultResAssembly"></param>
        public void RunInitialization(System.Reflection.Assembly defaultResAssembly)
        {
            AddInTree.Load(addInFiles, disabledAddIns, defaultResAssembly);

            // run workspace autostart commands
            LoggingService.Info(GResources.GetResourceText(29450196)); //RC 29450196 : spuštění automatického příkazu...
            foreach (ICommand command in AddInTree.BuildItems<ICommand>("/Workspace/Autostart", null, false))
                try { command.Run(); }
                catch (Exception ex)
                {
                    // povolíme další běh, i když některé příkazy selhali
                    MessageService.ShowError(ex);
                }
        }

        /// <summary>
        /// Spuštění základních služeb.
        /// Inicializace PropertyService a ResourceService.
        /// </summary>
        /// <param name="appDataPath">cesta ke konfigurační složce</param>
        public void StartCoreServices(string appDataPath)
        {
            if (configDirectory == null)
                configDirectory = Path.Combine(appDataPath, applicationName);
            PropertyService.InitializeService(configDirectory,
                                              dataDirectory ?? Path.Combine(FileUtility.ApplicationRootPath, "data"),
                                              propertiesName);
            PropertyService.Load();
            ResourceService.InitializeService(FileUtility.Combine(PropertyService.DataDirectory, "resources"));
            StringParser.Properties["AppName"] = applicationName;
        }
    }
}
