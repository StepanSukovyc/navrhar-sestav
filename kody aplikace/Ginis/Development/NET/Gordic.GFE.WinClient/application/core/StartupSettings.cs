//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.StartupSettings.cs                     </Name>
//    <Description> Tato třída obsahuje vlastnosti, které konfiguruji start aplikace.</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-01-17                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.WinClient
{
    /// <summary>
    /// Tato třída obsahuje vlastnosti, které konfiguruji spuštění aplikace.
    /// Zejména v této třídě se vytvoří seznam dostupných doplňků, 
    /// které se před uložením do seznamu fyzicky vytvoří ze zdrojů.
    /// </summary>
    sealed class StartupSettings
    {
        string applicationRootPath;
        internal List<string> addInDirectories = new List<string>(), addInFiles = new List<string>();

        /// <summary>
        /// Použití souboru <see cref="ConfigDirectory"/>\AddIns.xml pro 
        /// uložení seznamu neaktivních doplňků a seznamu externích doplňků.
        /// Výchozí hodnota je true.
        /// </summary>
        public bool AllowAddInConfigurationAndExternalAddIns { get; set; } = true;

        /// <summary>
        ///  Povoluení uživatelských doplňků uložených ve složce "data aplikace".
        /// Výchozí hodnota je false.
        /// </summary>
        public bool AllowUserConfigs { get; set; }

        /// <summary>
        /// Kořenová složka aplikace.
        /// NULL (výchozí hodnota) pro použití hlavní složky FormFiller AppDomain.
        /// </summary>
        public string ApplicationRootPath
        {
            get { return applicationRootPath; }
            set
            {
                applicationRootPath = value;
                if (!string.IsNullOrEmpty(applicationRootPath))
                {
                    AddConfigsFromResources(FileUtility.Combine(applicationRootPath, "config"));
                    FileUtility.ApplicationRootPath = applicationRootPath;
                }
            }
        }

        /// <summary>
        /// Získá/Nastaví složka pro uložení vlastností a uživatelských doplňků FoemFilleru.
        /// NULL (výchozí hodnota) pro "ApplicationData\ApplicationName"
        /// </summary>
        public string ConfigDirectory { get; set; }

        /// <summary>
        /// Získá/Nastavi název datového adresáře pro načítání zdrojů.
        /// NULL (výchozí) pro "ApplicationRootPath\data".
        /// </summary>
        public string DataDirectory { get; set; }

        /// <summary>
        /// Získá/Nastavi název, používaný pro soubor vlastnosti (bez cesty a přípony).
        /// NULL (výchozí) - použije výchozí název.
        /// </summary>
        public string PropertiesName { get; set; }

        /// <summary>
        /// složka s dpňky.
        /// </summary>
        /// <param name="configDir">Přidávaná složka</param>
        public void AddConfigsFromDirectory(string configDir)
        {
            if (configDir != null)
                addInDirectories.Add(configDir);
        }

        /// <summary>
        /// Přidání specifického souboru .config.
        /// </summary>
        /// <param name="configFile">Přidávaný soubor</param>
        public void AddConfigFile(string configFile)
        {
            if (configFile != null)
                addInFiles.Add(configFile);
        }

        /// <summary>
        /// Přidání doplňků ze zdroju
        /// </summary>
        /// <param name="configDir">Složka s doplňky</param>
        internal void AddConfigsFromResources(string configDir)
        {
            FileUtility.GetOrCreateDirectory(configDir);

            ResourceService.SaveFile(typeof(ReportDesignerMain).Assembly, configDir, @"^*Resources.config.*.gconfig", "Resources.config.");
        }
    }
}
