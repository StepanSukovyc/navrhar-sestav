//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.StartupSettings.cs                    </Name>
//    <Description> Tato třída obsahuje vlastnosti, které konfiguruji spuštění aplikace.</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-11                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using Gordic.GFE.Parsers.Core;

namespace Gordic.Gfe.FormFiller
{
    /// <summary>
    /// Tato třída obsahuje vlastnosti, které konfiguruji spuštění aplikace.
    /// Zejména v této třídě se vytvoří seznam dostupných doplňků, 
    /// které se před uložením do seznamu fyzicky vytvoří ze zdrojů.
    /// </summary>
    sealed class StartupSettings
    {
        string applicationRootPath;
        bool allowAddInConfigurationAndExternalAddIns = true;
        bool allowUserAddIns;
        string propertiesName;
        string configDirectory;
        string dataDirectory;
        internal List<string> addInDirectories = new List<string>();
        internal List<string> addInFiles = new List<string>();

        /// <summary>
        /// Použití souboru <see cref="ConfigDirectory"/>\AddIns.xml pro 
        /// uložení seznamu neaktivních doplňků a seznamu externích doplňků.
        /// Výchozí hodnota je true.
        /// </summary>
        public bool AllowAddInConfigurationAndExternalAddIns
        {
            get { return allowAddInConfigurationAndExternalAddIns; }
            set { allowAddInConfigurationAndExternalAddIns = value; }
        }

        /// <summary>
        ///  Povoluení uživatelských doplňků uložených ve složce "data aplikace".
        /// Výchozí hodnota je false.
        /// </summary>
        public bool AllowUserAddIns
        {
            get { return allowUserAddIns; }
            set { allowUserAddIns = value; }
        }

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
                    AddAddInFromResources(FileUtility.Combine(applicationRootPath, "config"));
                    FileUtility.ApplicationRootPath = applicationRootPath;
                }
            }
        }

        /// <summary>
        /// Získá/Nastaví složka pro uložení vlastností a uživatelských doplňků FoemFilleru.
        /// NULL (výchozí hodnota) pro "ApplicationData\ApplicationName"
        /// </summary>
        public string ConfigDirectory
        {
            get { return configDirectory; }
            set { configDirectory = value; }
        }

        /// <summary>
        /// Získá/Nastavi název datového adresáře pro načítání zdrojů.
        /// NULL (výchozí) pro "ApplicationRootPath\data".
        /// </summary>
        public string DataDirectory
        {
            get { return dataDirectory; }
            set { dataDirectory = value; }
        }

        /// <summary>
        /// Získá/Nastavi název, používaný pro soubor vlastnosti (bez cesty a přípony).
        /// NULL (výchozí) - použije výchozí název.
        /// </summary>
        public string PropertiesName
        {
            get { return propertiesName; }
            set { propertiesName = value; }
        }

        /// <summary>
        /// složka s dpňky.
        /// </summary>
        /// <param name="addInDir">Přidávaná složka</param>
        public void AddAddInsFromDirectory(string addInDir)
        {
            if (addInDir == null)
                throw new ArgumentNullException("addInDir");
            addInDirectories.Add(addInDir);
        }

        /// <summary>
        /// Přidání specifického souboru .config.
        /// </summary>
        /// <param name="addInFile">Přidávaný soubor</param>
        public void AddAddInFile(string addInFile)
        {
            if (addInFile == null)
                throw new ArgumentNullException("addInFile");
            addInFiles.Add(addInFile);
        }

        /// <summary>
        /// Přidání doplňků ze zdroju
        /// </summary>
        /// <param name="addInDir">Složka s doplňky</param>
        internal void AddAddInFromResources(string addInDir)
        {
            if (!Directory.Exists(addInDir))
                Directory.CreateDirectory(addInDir);

            ResourceService.SaveFile(typeof(FormFillerMain).Assembly, addInDir, @"^*Resources.config.*.gconfig", "Resources.config.");
        }
    }
}
