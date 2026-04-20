//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.FileService.cs                        </Name>
//    <Description> Služba zaměřená na práci se soubory                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-11                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Gordic.Gfe.FormFiller.Gui;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Utils;
using Gordic.General;

namespace Gordic.Gfe.FormFiller
{
    /// <summary>
    /// Služba zaměřená na práci se soubory
    /// </summary>
    static class FileAgent
    {
        #region RecentOpen
        static RecentOpen recentOpen = null;

        /// <summary>
        /// Naposledy otevřené soubory
        /// </summary>
        public static RecentOpen RecentOpen
        {
            get
            {
                if (recentOpen == null)
                    recentOpen = RecentOpen.FromXmlElement(PropertyService.Get("RecentOpen", new Property())
                        , FormFillerProperties.Instance.RecentOpenMaxCount);

                return recentOpen;
            }
        }
        #endregion

        static bool serviceInitialized;

        /// <summary>
        /// Po ukončení aplikaci se uloží nastavení naposledy otevřených souborů
        /// </summary>
        public static void Unload()
        {
            if (recentOpen != null)
                PropertyService.Set("RecentOpen", recentOpen.ToProperties());

            FileUtility.FileSaved -= FileSaved;
            FileUtility.FileLoaded -= FileSaved;
            serviceInitialized = false;
        }

        /// <summary>
        /// Inicializace služby
        /// </summary>
        internal static void InitializeService()
        {
            if (!serviceInitialized)
            {
                FileUtility.FileSaved += FileSaved;
                FileUtility.FileLoaded += FileSaved;
                serviceInitialized = true;
            }
        }

        static void FileSaved(object sender, FileNameEventArgs e)
        {
            if (e.AddToRecentOpen)
            {
                FileAgent.RecentOpen.GetOrCreateLastFile(e.FileName);
                FileAgent.RecentOpen.OnRecentFileChange();
            }
        }

        #region OpenedFile
        static Dictionary<string, OpenedFile> openedFileDict = new Dictionary<string, OpenedFile>(StringComparer.OrdinalIgnoreCase);

        /// <summary>
        /// Kolekce všech aktuálně otevřených souborů.
        /// Kolekce je pouze kopiemi pro čtení všech aktuálně otevřených souborů.
        /// </summary>
        public static ICollection<OpenedFile> OpenedFiles
        {
            get { return openedFileDict.Values.ToArray(); }
        }

        /// <summary>
        /// Získání otevřených souboru nebo vrácení NULL pokud soubor není otevřený.
        /// </summary>
        /// <param name="fileName">Soubor k otevření</param>
        public static OpenedFile GetOpenedFile(string fileName)
        {
            if (fileName == null)
                throw new ArgumentNullException("fileName");

            fileName = FileUtility.NormalizePath(fileName);
            openedFileDict.TryGetValue(fileName, out OpenedFile file);
            return file;
        }

        /// <summary>
        /// Vrátí nebo vytvoří soubor.
        /// </summary>
        /// <param name="fileName">Soubor k otevření</param>
        public static OpenedFile GetOrCreateOpenedFile(string fileName)
        {
            if (fileName == null)
                throw new ArgumentNullException("fileName");

            fileName = FileUtility.NormalizePath(fileName);
            if (!openedFileDict.TryGetValue(fileName, out OpenedFile file))
                openedFileDict[fileName] = file = new FileServiceOpenedFile(fileName);
            return file;
        }

        /// <summary>
        /// Volá se z OpenedFile.set_FileName pro aktualizaci seznamu.
        /// </summary>
        /// <param name="file">Otevřený soubor sestavy</param>
        /// <param name="oldName">Starý název souboru</param>
        /// <param name="newName">Nový název souboru</param>
        internal static void OpenedFileFileNameChange(OpenedFile file, string oldName, string newName)
        {
            if (oldName == null) return; // Soubor je teprvé vytvořen pomocí NewFile kde jméno bude teprvé přiděleno.

            LoggingService.Debug("OpenedFileFileNameChange: " + oldName + " => " + newName);

            if (openedFileDict[oldName] != file)
                throw new ArgumentException(string.Format(GResources.GetResourceText(29450073) + " {0}!", oldName)); //RC 29450073 : Soubor musí být registrován jako
            if (openedFileDict.ContainsKey(newName))
                throw new ArgumentException(string.Format(GResources.GetResourceText(29450074) + " {0}!", newName)); //RC 29450074 : Již existuje soubor s názvem

            openedFileDict.Remove(oldName);
            openedFileDict[newName] = file;
        }


        /// <summary>
        /// Volá se OpenedFile.UnregisterView pro aktualizaci slovniku.
        /// </summary>
        /// <param name="file">Název otevřeného souboru</param>
        internal static void OpenedFileClosed(OpenedFile file)
        {
            if (openedFileDict[file.FileName] != file)
                throw new ArgumentException(GResources.GetResourceText(29450075)); //RC 29450075 : Soubor musí být registrovan!

            openedFileDict.Remove(file.FileName);
            LoggingService.Debug("OpenedFileClosed: " + file.FileName);
        }
        #endregion

        /// <summary>
        /// Indikuje, zda soubor je otevřen
        /// </summary>
        /// <param name="fileName">Název souboru</param>
        /// <returns></returns>
        public static bool IsOpen(string fileName)
        {
            return GetViewForFile(fileName) != null;
        }

        /// <summary>
        /// Otevře obsah zobrazení specifického souboru a přepné se na otevřené zobrazení 
        /// a vrátí stávající zobrazení obsahu pro soubor pokud je již zobrazen
        /// </summary>
        /// <param name="fileName">Název souboru pro otevření.</param>
        /// <returns>existující nebo nové vytvořený obsah specifického souboru.</returns>
        public static IViewContent OpenFile(string fileName)
        {
            return OpenFile(fileName, true);
        }

        /// <summary>
        /// Otevře obsah zobrazení specifického souboru a přepné se na otevřené zobrazení 
        /// a vrátí stávající zobrazení obsahu pro soubor pokud je již zobrazen
        /// </summary>
        /// <param name="fileName">Název souboru pro otevření.</param>
        /// <param name="switchToOpenedView">Indikuje okamžité přepnutí na soubor po otevření.</param>
        /// <returns></returns>
        public static IViewContent OpenFile(string fileName, bool switchToOpenedView)
        {
            return OpenFile(fileName, switchToOpenedView, true);
        }
        /// <summary>
        /// Otevře obsah zobrazení specifického souboru a přepné se na otevřené zobrazení 
        /// a vrátí stávající zobrazení obsahu pro soubor pokud je již zobrazen
        /// </summary>
        /// <param name="fileName">Název souboru pro otevření.</param>
        /// <param name="switchToOpenedView">Indikuje okamžité přepnutí na soubor po otevření.</param>
        /// <param name="recentOpen">Přidání do seznamu naposledy otevřených souborů</param>
        /// <returns>Pohled na obsah souboru</returns>
        public static IViewContent OpenFile(string fileName, bool switchToOpenedView, bool recentOpen)
        {
            fileName = FileUtility.NormalizePath(fileName);
            LoggingService.Info(GResources.GetResourceText(29450042) + ' ' + fileName); //RC 29450042 : otevření souboru

            IViewContent viewContent = GetViewForFile(fileName);
            if (viewContent != null)
            {
                if (switchToOpenedView)
                    viewContent.DesktopWindow.SelectWindow();
                return viewContent;
            }

            IDisplayBinding binding = DisplayBindingService.GetBinding(fileName);

            if (binding != null)
                FileUtility.ObservedLoad(new NamedFileOperationDelegate(new LoadFileWrapper(binding, switchToOpenedView, FileAgent.GetOrCreateOpenedFile).Invoke), fileName, recentOpen);
            else
                throw new ApplicationException(string.Format(GResources.GetResourceText(29450044) + " '{0}' " + GResources.GetResourceText(29450076), fileName)); //RC 29450044 : Soubor
            return GetViewForFile(fileName);
        }

        /// <summary>
        /// Seznam primárních souborů otevřených v pohledech
        /// </summary>
        public static IList<string> GetOpenFiles()
        {
            List<string> fileNames = new List<string>();
            foreach (IViewContent content in SimpleDesktop.Desktop.ViewContentCollection)
            {
                string contentName = content.PrimaryFileName;
                if (contentName != null && !fileNames.Contains(contentName))
                    fileNames.Add(contentName);
            }
            return fileNames;
        }

        /// <summary>
        /// Získání pohledu na otevřený soubor
        /// </summary>
        /// <param name="fileName">Název souboru</param>
        /// <returns></returns>
        public static IViewContent GetViewForFile(string fileName)
        {
            if (fileName != null && fileName.Length > 0)
                foreach (IViewContent content in SimpleDesktop.Desktop.ViewContentCollection)
                {
                    string contentName = content.PrimaryFileName;
                    if (contentName != null)
                        if (FileUtility.IsEqualFileName(fileName, contentName))
                            return content;
                }
            return null;
        }

        /// <summary>
        /// Indikuje uložení souboru s použitím dočasných souborů
        /// </summary>
        public static bool SaveUsingTemporaryFile
        {
            get { return PropertyService.Get("FormFiller.SaveUsingTemporaryFile", true); }
            set { PropertyService.Set("FormFiller.SaveUsingTemporaryFile", value); }
        }

        /// <summary>
        /// Přejmenování nebo přesunutí souboru.
        /// </summary>
        /// <param name="oldName">Starý název</param>
        /// <param name="newName">Nový název</param>
        /// <param name="isDirectory">Indikuje, že se jedná o složku</param>
        public static bool RenameFile(string oldName, string newName, bool isDirectory)
        {
            if (FileUtility.IsEqualFileName(oldName, newName))
                return false;
            FileChangeWatcher.DisableAllChangeWatchers();
            try
            {
                FileRenamingEventArgs eargs = new FileRenamingEventArgs(oldName, newName, isDirectory);
                OnFileRenaming(eargs);
                if (eargs.Cancel)
                    return false;
                if (!eargs.OperationAlreadyDone)
                {
                    try
                    {
                        if (isDirectory && Directory.Exists(oldName))
                        {

                            if (Directory.Exists(newName))
                            {
                                MessageService.ShowMessage(GResources.GetResourceText(29450077)); //RC 29450077 : Stejný název adresáře již existuje, zvote jiný.
                                return false;
                            }
                            Directory.Move(oldName, newName);

                        }
                        else if (File.Exists(oldName))
                        {
                            if (File.Exists(newName))
                            {
                                MessageService.ShowMessage(GResources.GetResourceText(29450078)); //RC 29450078 : Stejný název souboru již existuje, zvote jiný.
                                return false;
                            }
                            File.Move(oldName, newName);
                        }
                    }
                    catch (Exception e)
                    {
                        if (isDirectory)
                            MessageService.ShowError(e, string.Format(GResources.GetResourceText(29450079) + " '{0}' " + GResources.GetResourceText(29450080), oldName)); //RC 29450080 : nelze přejmenovat!
                        else
                            MessageService.ShowError(e, string.Format(GResources.GetResourceText(29450044) + " '{0}' " + GResources.GetResourceText(29450080), oldName)); //RC 29450080 : nelze přejmenovat!
                        return false;
                    }
                }
                OnFileRenamed(new FileRenameEventArgs(oldName, newName, isDirectory));
                return true;
            }
            finally
            {
                FileChangeWatcher.EnableAllChangeWatchers();
            }
        }

        #region Event Handlers

        static void OnFileRenamed(FileRenameEventArgs e)
        {
            FileRenamed?.Invoke(null, e);
        }

        static void OnFileRenaming(FileRenamingEventArgs e)
        {
            FileRenaming?.Invoke(null, e);
        }

        #endregion Event Handlers

        #region Events
        /// <summary>
        /// Volá se před přejmenováním souboru
        /// </summary>
        public static event EventHandler<FileRenamingEventArgs> FileRenaming;
        /// <summary>
        /// Volá se po přejmenování souboru
        /// </summary>
        public static event EventHandler<FileRenameEventArgs> FileRenamed;
        #endregion Events

        /// <summary>
        /// Otevření specifického souboru na skok na určitou pozici.
        /// </summary>
        /// <param name="fileName">Soubor k otevření</param>
        /// <param name="line">Řádek pozice</param>
        /// <param name="column">Sloupec pozice</param>
        public static IViewContent JumpToFilePosition(string fileName, int line, int column)
        {
            LoggingService.InfoFormatted("FileService\n\t" + GResources.GetResourceText(29450081) + ":  [{0} : {1}x{2}]", fileName, line, column); //RC 29450081 : Skok na pozici v souboru

            if (fileName == null || fileName.Length == 0)
                return null;

            try
            {

                IViewContent content = OpenFile(fileName);
                if (content is IPositionable)
                {
                    content.DesktopWindow.ActiveViewContent = content;
                    ((IPositionable)content).JumpTo(Math.Max(0, line), Math.Max(0, column));
                }

                LoggingService.InfoFormatted("FileService\n\t" + GResources.GetResourceText(29450082) + ":  [{0} : {1}x{2}]", fileName, line, column); //RC 29450082 : Skok na pozici
                return content;
            }
            finally { }
        }

        /// <summary>
        /// otevření naposledy souboru ze seznamu naposledy otevřených souborů
        /// </summary>
        /// <param name="rof">položka seznamu naposledy otevřených souborů</param>
        internal static void OpenFile(RecentOpenFile rof)
        {
            if (rof != null)
                OpenFile(rof.Path);
        }

        internal static void OpenFile(StartupFile file)
        {
            OpenFile(Path.GetFullPath(file.Name));
        }
    }
}
