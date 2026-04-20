//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AddInManager.cs                          </Name>
//    <Description> Spravuje všechny akce prováděné v <see cref="AddIn"/>.      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Xml;
using Gordic.General;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    ///  Určuje akce pro specifické doplňky.
    /// </summary>
    public enum AddInAction
    {
        /// <summary>
        /// Povolit doplněk.
        /// </summary>
        Enable,
        /// <summary>
        /// Zakázat doplněk.
        /// </summary>
        Disable,
        /// <summary>
        ///     Instalovat doplněk.
        /// </summary>
        Install,
        /// <summary>
        ///     Odinstalovat doplněk.
        /// </summary>
        Uninstall,
        /// <summary>
        ///     Aktualizovat doplněk.
        /// </summary>
        Update,
        /// <summary>
        /// Doplněk zakázan, protože byl nainstalovat dvakrát
        /// </summary>
        InstalledTwice,
        /// <summary>
        ///     Říká, že doplněk nemůže být načten, protože ne všechny závislosti jsou správné.
        /// </summary>
        DependencyError,
        /// <summary>
        /// Chyba (např. AddIn je zakázan kvůli nějaké podmínce)
        /// </summary>
        CustomError
    }
    /// <summary>
    /// Spravuje všechny akce prováděné v <see cref="AddIn"/>.
    /// AddInManager GUI může používat metody pro instalací/odinstalací/aktualizací.
    /// <see cref="AddIn"/>.
    /// 
    /// Jsou 3 typy doplňků:
    /// - Předinstalované AddIns (přidané hostitelskou aplikací) -> lze je pouze uvolnit
    /// - Externí AddIns -> můžou byt přidáné, uvolněné a smazané
    /// 	Odstraněné doplňku se provádí pouze odstraněním referece na doplněk (*.gconfig soubor)
    ///     ale neodstraní samotný AddIn.
    /// - Uživaatelské AddIns -> se instaluji do UserAddInPath, mohou být instalované, uvolněné a odinstalované
    /// </summary>
    public static class AddInManager
    {
        /// <summary>
        /// Získá nebo nastaví cestu k uživatelským doplňkům.
        /// Toto je cesta k instalovaným uživatelským doplňkům.
        /// </summary>
        public static string UserAddInPath { get; set; }
        /// <summary>
        /// Získání nebo nastavení dočasné složky doplňků.
        /// Tato složka se používá pro uložení doplňků které se použíjí i při následujícím spuštění aplikace
        /// </summary>
        public static string AddInInstallTemp { get; set; }
        /// <summary>
        /// Získání nebo nastavení celého názvu konfiguračního souboru.
        /// V tomto souboru, AddInManager uloží seznam znepřistupněných doplňků
        /// a seznam externích doplňků.
        /// </summary>
        public static string ConfigurationFileName { get; set; }
        
        /// <summary>
        /// Instalace doplňků z AddInInstallTemp do UserAddInPath.
        /// </summary>
        /// <param name="disabled">Seznam uvolněných dplňků</param>
        public static void InstallAddIns(List<string> disabled)
        {
            if (!Directory.Exists(AddInInstallTemp))
                return;
            LoggingService.Info(string.Join(" ", GResources.GetResourceText(29450167), "AddInManager.InstallAddIns")); //RC 29450167 : Spuštění
            if (!Directory.Exists(UserAddInPath))
                Directory.CreateDirectory(UserAddInPath);
            string removeFile = Path.Combine(AddInInstallTemp, "remove.txt");
            bool allOK = true;
            List<string> notRemoved = new List<string>();
            if (File.Exists(removeFile))
            {
                using (StreamReader r = new StreamReader(removeFile))
                {
                    string addInName;
                    while ((addInName = r.ReadLine()) != null)
                    {
                        addInName = addInName.Trim();
                        if (addInName.Length == 0)
                            continue;
                        string targetDir = Path.Combine(UserAddInPath, addInName);
                        if (!UninstallAddIn(disabled, addInName, targetDir))
                        {
                            notRemoved.Add(addInName);
                            allOK = false;
                        }
                    }
                }
                if (notRemoved.Count == 0)
                {
                    LoggingService.Info(string.Join(" ", GResources.GetResourceText(29450168), "remove.txt...")); //RC 29450168 : odstranění
                    File.Delete(removeFile);
                }
                else
                {
                    LoggingService.Info(string.Join(" ", GResources.GetResourceText(29450169), "remove.txt...")); //RC 29450169 : přepis
                    using (StreamWriter w = new StreamWriter(removeFile))
                    {
                        notRemoved.ForEach(w.WriteLine);
                    }
                }
            }

            foreach (string sourceDir in Directory.GetDirectories(AddInInstallTemp))
            {
                string addInName = Path.GetFileName(sourceDir);
                string targetDir = Path.Combine(UserAddInPath, addInName);
                if (notRemoved.Contains(addInName))
                {
                    LoggingService.Info(string.Join(" ", GResources.GetResourceText(29450170), addInName, GResources.GetResourceText(29450171))); //RC 29450171 : protože deinstalace se nezdařila.
                    continue;
                }
                if (UninstallAddIn(disabled, addInName, targetDir))
                {
                    LoggingService.Info(string.Join(" ", GResources.GetResourceText(29450172), addInName + "...")); //RC 29450172 : instalace
                    Directory.Move(sourceDir, targetDir);
                }
                else
                    allOK = false;
            }
            if (allOK)
            {
                try { Directory.Delete(AddInInstallTemp, false); }
                catch (Exception ex) { LoggingService.Warning(GResources.GetResourceText(29450173), ex); } //RC 29450173 : chyba při odstraňování dočasné instalační složky!
            }
            LoggingService.Info(string.Join(" ", GResources.GetResourceText(29450174), "AddInManager.InstallAddIns")); //RC 29450174 : konec
        }
        static bool UninstallAddIn(List<string> disabled, string addInName, string targetDir)
        {
            if (Directory.Exists(targetDir))
            {
                LoggingService.Info(string.Join(" ", GResources.GetResourceText(29450168), addInName + "...")); //RC 29450168 : odstranění
                try { Directory.Delete(targetDir, true); }
                catch (Exception ex)
                {
                    disabled.Add(addInName);
                    MessageService.ShowErrorFormatted(
                        string.Join(" ", GResources.GetResourceText(29450175), "{0}:; {1};", GResources.GetResourceText(29450176), "{2}", GResources.GetResourceText(29450177)), //RC 29450177 : prozatím je uvolněn!
                        addInName, ex.Message, MessageService.ProductName);
                    return false;
                }
            }
            return true;
        }
        /// <summary>
        /// Odinstalace uživatelských doplňků po dalším startu.
        /// </summary>
        /// <param name="identity">Identifikátor doplňku pro odstranění.</param>
        public static void RemoveUserAddInOnNextStart(string identity)
        {
            List<string> removeEntries = new List<string>();
            string removeFile = Path.Combine(AddInInstallTemp, "remove.txt");
            if (File.Exists(removeFile))
            {
                using (StreamReader r = new StreamReader(removeFile))
                {
                    string addInName;
                    while ((addInName = r.ReadLine()) != null)
                    {
                        addInName = addInName.Trim();
                        if (addInName.Length > 0)
                            removeEntries.Add(addInName);
                    }
                }
                if (removeEntries.Contains(identity))
                    return;
            }
            removeEntries.Add(identity);
            if (!Directory.Exists(AddInInstallTemp))
                Directory.CreateDirectory(AddInInstallTemp);

            using (StreamWriter w = new StreamWriter(removeFile))
            {
                removeEntries.ForEach(w.WriteLine);
            }
        }
        /// <summary>
        /// Zabraňuje uživatelským doplňkům odinstalací
        /// </summary>
        /// <param name="identity">Identifikátor doplňku.</param>
        public static void AbortRemoveUserAddInOnNextStart(string identity)
        {
            string removeFile = Path.Combine(AddInInstallTemp, "remove.txt");
            if (!File.Exists(removeFile))
                return;

            List<string> removeEntries = new List<string>();
            using (StreamReader r = new StreamReader(removeFile))
            {
                string addInName;
                while ((addInName = r.ReadLine()) != null)
                {
                    addInName = addInName.Trim();
                    if (addInName.Length > 0)
                        removeEntries.Add(addInName);
                }
            }
            if (removeEntries.Remove(identity))
                using (StreamWriter w = new StreamWriter(removeFile))
                {
                    removeEntries.ForEach(w.WriteLine);
                }
        }
        /// <summary>
        /// Přidání specifického doplňku do seznamu externích doplňků
        /// </summary>
        /// <param name="addIns">
        /// seznám přidávaných doplňků.
        /// </param>
        public static void AddExternalAddIns(IList<AddIn> addIns)
        {
            List<string> addInFiles = new List<string>();
            List<string> disabled = new List<string>();
            LoadAddInConfiguration(addInFiles, disabled);

            foreach (AddIn addIn in addIns)
            {
                if (!addInFiles.Contains(addIn.FileName))
                    addInFiles.Add(addIn.FileName);
                addIn.Enabled = false;
                addIn.Action = AddInAction.Install;
                AddInTree.InsertAddIn(addIn);
            }

            SaveAddInConfiguration(addInFiles, disabled);
        }
        /// <summary>
        /// Odstranění specifických doplňků ze seznamu externích doplňků
        /// </summary>
        /// Seznam doplňku k odstranění
        public static void RemoveExternalAddIns(IList<AddIn> addIns)
        {
            List<string> addInFiles = new List<string>();
            List<string> disabled = new List<string>();
            LoadAddInConfiguration(addInFiles, disabled);

            foreach (AddIn addIn in addIns)
            {
                foreach (string identity in addIn.Manifest.Identities.Keys)
                    disabled.Remove(identity);

                addInFiles.Remove(addIn.FileName);
                addIn.Action = AddInAction.Uninstall;
                if (!addIn.Enabled)
                    AddInTree.RemoveAddIn(addIn);
            }

            SaveAddInConfiguration(addInFiles, disabled);
        }
        /// <summary>
        /// Označení specifického doplňku jako dostupný (se načte po dalším startu aplikace)
        /// </summary>
        /// <param name="addIns">Seznam označených doplňků</param>
        public static void Enable(IList<AddIn> addIns)
        {
            List<string> addInFiles = new List<string>();
            List<string> disabled = new List<string>();
            LoadAddInConfiguration(addInFiles, disabled);

            foreach (AddIn addIn in addIns)
            {
                foreach (string identity in addIn.Manifest.Identities.Keys)
                    disabled.Remove(identity);

                if (addIn.Action == AddInAction.Uninstall)
                {
                    if (FileUtility.IsBaseDirectory(UserAddInPath, addIn.FileName))
                        foreach (string identity in addIn.Manifest.Identities.Keys)
                            AbortRemoveUserAddInOnNextStart(identity);
                    else
                        if (!addInFiles.Contains(addIn.FileName))
                            addInFiles.Add(addIn.FileName);
                }
                addIn.Action = AddInAction.Enable;
            }

            SaveAddInConfiguration(addInFiles, disabled);
        }
        /// <summary>
        /// Označení specifických doplňků jako uvolněné (nutný restart).
        /// </summary>
        /// <param name="addIns">Specifické doplňky</param>
        public static void Disable(IList<AddIn> addIns)
        {
            List<string> addInFiles = new List<string>();
            List<string> disabled = new List<string>();
            LoadAddInConfiguration(addInFiles, disabled);

            foreach (AddIn addIn in addIns)
            {
                string identity = addIn.Manifest.PrimaryIdentity;
                if (identity == null)
                    throw new ArgumentException(GResources.GetResourceText(29450178)); //RC 29450178 : Doplněk není označen protože nemá identifikátor!

                if (!disabled.Contains(identity))
                    disabled.Add(identity);
                addIn.Action = AddInAction.Disable;
            }

            SaveAddInConfiguration(addInFiles, disabled);
        }
        /// <summary>
        /// Načtení konfiguračního souboru.
        /// </summary>
        /// <param name="addInFiles">seznam externích doplňků.</param>
        /// <param name="disabledAddIns">Seznam uvolněných doplňků.</param>
        public static void LoadAddInConfiguration(List<string> addInFiles, List<string> disabledAddIns)
        {
            if (!File.Exists(ConfigurationFileName))
                return;
            using (XmlTextReader reader = new XmlTextReader(ConfigurationFileName))
                while (reader.Read())
                    if (reader.NodeType == XmlNodeType.Element)
                        if (string.Equals(reader.Name, "addin", StringComparison.InvariantCultureIgnoreCase))
                        {
                            string fileName = reader.GetAttribute("file");
                            if (fileName != null && fileName.Length > 0)
                                addInFiles.Add(fileName);
                        }
                        else if (string.Equals(reader.Name, "disable", StringComparison.InvariantCultureIgnoreCase))
                        {
                            string addIn = reader.GetAttribute("addin");
                            if (addIn != null && addIn.Length > 0)
                                disabledAddIns.Add(addIn);
                        }
        }
        /// <summary>
        /// Uložení konfigurace doplňků do <see cref="LoadAddInConfiguration"/>.
        /// </summary>
        /// <param name="addInFiles">Seznam externích doplňků.</param>
        /// <param name="disabledAddIns">seznam identifikátorů uvolněných doplňků.</param>
        public static void SaveAddInConfiguration(List<string> addInFiles, List<string> disabledAddIns)
        {
            using (XmlTextWriter writer = new XmlTextWriter(ConfigurationFileName, Encoding.UTF8))
            {
                writer.Formatting = Formatting.Indented;
                writer.WriteStartDocument();
                writer.WriteStartElement("AddInConfiguration");
                foreach (string file in addInFiles)
                {
                    writer.WriteStartElement("AddIn");
                    writer.WriteAttributeString("file", file);
                    writer.WriteEndElement();
                }
                foreach (string name in disabledAddIns)
                {
                    writer.WriteStartElement("Disable");
                    writer.WriteAttributeString("addin", name);
                    writer.WriteEndElement();
                }
                writer.WriteEndDocument();
            }
        }
    }
}
