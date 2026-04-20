//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.FileService.cs                         </Name>
//    <Description> Výčet všech možných načtení sestav                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Project;
using Gordic.GFE.WinClient.ProjectBrowser;
using Gordic.General;
using Gordic.GFE.WinClient.StructureView;

namespace Gordic.GFE.WinClient.Services
{
    /// <summary>
    /// Výčet všech možných načtení sestav
    /// </summary>
    [Serializable]
    public enum FileLoadStatus
    {
        /// <summary>
        /// Žádný
        /// </summary>
        none = 0,
        /// <summary>
        /// načteno ze souboru
        /// </summary>
        file = 1,
        /// <summary>
        /// načteno z databáze
        /// </summary>
        database = 2
    }

    /// <summary>
    /// Služba zaměřená na práci se soubory
    /// </summary>
    static class FileAgent
    {
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
                        , ReportDesignerProperties.Instance.RecentOpenMaxCount);

                return recentOpen;
            }
        }

        static bool serviceInitialized;
        static Dictionary<string, OpenedFile> openedFileDict = new Dictionary<string, OpenedFile>(StringComparer.OrdinalIgnoreCase);
        /// <summary>
        /// Kolekce všech aktuálně otevřených souborů.
        /// Kolekce je pouze kopiemi pro čtení všech aktuálně otevřených souborů.
        /// </summary>
        public static ICollection<OpenedFile> OpenedFiles { get => openedFileDict.Values.ToArray(); }

        /// <summary>
        /// Po ukončení aplikaci se uloží nastavení naposledy otevřených souborů
        /// </summary>
        public static void Unload()
        {
            if (recentOpen != null)
                PropertyService.Set("RecentOpen", recentOpen.ToProperties());

            ProjectService.SolutionLoaded -= SolutionLoaded;
            ProjectService.SolutionClosing -= SolutionClosing;
            ParserService.LoadSolutionProjectsThreadEnded -= LoadSolutionProjectsThreadEnded;
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
                ProjectService.SolutionLoaded += SolutionLoaded;
                ProjectService.SolutionClosing += SolutionClosing;
                ParserService.LoadSolutionProjectsThreadEnded += LoadSolutionProjectsThreadEnded;
                FileUtility.FileSaved += FileSaved;
                FileUtility.FileLoaded += FileSaved;
                serviceInitialized = true;
            }
        }

        static void SolutionClosing(object sender, SolutionEventArgs e)
        {
            if (e != null && e.Solution != null)
                OpenedFileClosed(e.Solution.FileName);
        }

        static void SolutionLoaded(object sender, SolutionEventArgs e)
        {
            RecentOpen.AddLastProject(e.Solution.FileName);
            PadDescriptor descriptor = SimpleDesktop.Desktop.GetPad(typeof(ProjectBrowserPad));
            if (descriptor != null)
                descriptor.BringPadToFront(SimpleDesktop.Desktop.DesktopLayout);
        }
        static void FileSaved(object sender, FileNameEventArgs e)
        {
            if (ProjectService.IsSolutionItem(e.FileName))
            {
                RecentOpenFile file = FileAgent.RecentOpen.RecentFileOrProject.FirstOrNull(f => f != null);
                if (file != null && !file.Path.Equals(e.FileName, StringComparison.OrdinalIgnoreCase))
                    Services.FileAgent.RecentOpen.FileOrProjectRemove(null, new FileEventArgs(e.FileName, false));
            }
            else
            {
                if (e.AddToRecentOpen)
                    RecentOpen.GetOrCreateLastFile(e.FileName);
                else
                    RecentOpen.FileOrProjectRemove(null, new FileEventArgs(e.FileName, false));

                RecentOpen.OnRecentFileChange();
            }
        }
        static bool CanAddLastFile(string fileName)
        {
            IViewContent content = GetViewForFile(fileName);
            return content == null || content.PrimaryFile == null || !content.PrimaryFile.IsDatabase;
        }
        static void LoadSolutionProjectsThreadEnded(object sender, EventArgs e)
        {
            ThreadService.SafeThreadAsyncCall(
                delegate
                {
                    foreach (IViewContent content in SimpleDesktop.Desktop.ViewContentCollection.ToArray())
                        DisplayBindingService.AttachSubWindows(content, true);
                });
        }

        #region OpenedFile

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
        /// Vytvoření nového OpenedFile bez názvu.
        /// </summary>
        /// <param name="content">Obsah souboru</param>
        /// <param name="defaultName">Výchozí název</param>
        public static OpenedFile CreateUntitledOpenedFile(string defaultName, string content)
        {
            if (defaultName == null)
                throw new ArgumentNullException(GResources.GetResourceText(29450544)); //RC 29450544 : Soubor nezle vytvořít - není daný výchozí název!

            OpenedFile file = new FileServiceOpenedFile(ParserService.DefaultFileEncoding.GetBytes(content));
            file.FileName = file.GetHashCode() + "/" + defaultName;
            ParserService.ClearParseInformation(defaultName);
            ParserService.ParseFile(file.FileName, content);
            openedFileDict[file.FileName] = file;
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
            if (oldName == null) return; // soubor je teprvé vytvořen pomocí NewFile kde jméno bude teprvé přiděleno.

            LoggingService.DebugFormatted(GResources.GetResourceText(29450545) + "\n'{0}'\n" + GResources.GetResourceText(29450546) + "\n'{1}'...", oldName, newName); //RC 29450546 : na

            if (openedFileDict[oldName] != file)
                throw new ArgumentException(string.Format(GResources.GetResourceText(29450547) + " '{0}'!", oldName)); //RC 29450547 : Soubor musí být registrován jako
            if (openedFileDict.ContainsKey(newName))
                throw new ArgumentException(string.Format(GResources.GetResourceText(29450217) + " '{0}' " + GResources.GetResourceText(29450548), newName)); //RC 29450548 : již existuje!

            openedFileDict.Remove(oldName);
            openedFileDict[newName] = file;
        }
        /// <summary>
        /// Volá se OpenedFile.UnregisterView pro aktualizaci slovniku.
        /// </summary>
        /// <param name="file">Název otevřeného souboru</param>
        internal static void OpenedFileClosed(OpenedFile file)
        {
            if (file != null)
                if (openedFileDict.ContainsKey(file.FileName)
                    && openedFileDict[file.FileName] != file)
                    LoggingService.Error(string.Format(GResources.GetResourceText(29450253) + " '{0}' " + GResources.GetResourceText(29450549) + "...", file.FileName)); //RC 29450253 : soubor
                else
                    OpenedFileClosed(file.FileName);
        }
        /// <summary>
        /// Volá se OpenedFile.UnregisterView pro aktualizaci slovniku.
        /// </summary>
        /// <param name="fileName">Název otevřeného souboru</param>
        internal static void OpenedFileClosed(string fileName)
        {
            openedFileDict.Remove(fileName);
            LoggingService.DebugFormatted(GResources.GetResourceText(29450253) + " '{0}' " + GResources.GetResourceText(29450550), fileName); //RC 29450253 : soubor
        }
        #endregion

        /// <summary>
        /// Indikuje, zda soubor je otevřen
        /// </summary>
        /// <param name="fileName">Název souboru</param>
        /// <returns></returns>
        public static bool IsOpen(string fileName) => GetViewForFile(fileName) != null;

        /// <summary>
        /// Otevře obsah zobrazení specifického souboru a přepné se na otevřené zobrazení 
        /// a vrátí stávající zobrazení obsahu pro soubor pokud je již zobrazen
        /// </summary>
        /// <param name="recentFile">Informace o naposledy otevřeném souboru.</param>
        /// <returns>existující nebo nové vytvořený obsah specifického souboru.</returns>
        public static IViewContent OpenFile(RecentOpenFile recentFile) => OpenFile(recentFile.Path, true);
        /// <summary>
        /// otevření sestavení dle souboru ALF
        /// </summary>
        /// <param name="fileName">soubor ALF</param>
        internal static bool OpenSolutionForFile(string fileName)
        {
            string dn = Path.GetDirectoryName(fileName), fn = Path.GetFileName(fileName);
            if (Directory.Exists(dn))
                foreach (var item in Directory.GetFiles(dn, "*.ssr", SearchOption.TopDirectoryOnly))
                {
                    string content = File.ReadAllText(item);
                    int lenght = content.Length;
                    if (
                        content.IndexOf("\"" + fn + "\"", 0, lenght, StringComparison.OrdinalIgnoreCase) != -1
                        || content.IndexOf("'" + fn + "'", 0, lenght, StringComparison.OrdinalIgnoreCase) != -1
                        || content.IndexOf("\\" + fn + "\"", 0, lenght, StringComparison.OrdinalIgnoreCase) != -1
                        || content.IndexOf("\\" + fn + "'", 0, lenght, StringComparison.OrdinalIgnoreCase) != -1
                        )
                    {
                        ProjectService.LoadSolution(item, false);
                        return true;
                    }
                }
            return false;
        }

        /// <summary>
        /// Otevře obsah zobrazení specifického souboru a přepné se na otevřené zobrazení 
        /// a vrátí stávající zobrazení obsahu pro soubor pokud je již zobrazen
        /// </summary>
        /// <param name="fileName">Název souboru pro otevření.</param>
        /// <returns>existující nebo nové vytvořený obsah specifického souboru.</returns>
        public static IViewContent OpenFile(string fileName) => OpenFile(fileName, true);
        /// <summary>
        /// Otevře obsah zobrazení specifického souboru a přepné se na otevřené zobrazení 
        /// a vrátí stávající zobrazení obsahu pro soubor pokud je již zobrazen
        /// </summary>
        /// <param name="fileName">Název souboru pro otevření.</param>
        /// <param name="switchToOpenedView">Indikuje okamžité přepnutí na soubor po otevření.</param>
        /// <returns></returns>
        public static IViewContent OpenFile(string fileName, bool switchToOpenedView) => OpenFile(fileName, switchToOpenedView, true);

        /// <summary>
        /// Otevře obsah zobrazení specifického souboru a přepné se na otevřené zobrazení 
        /// a vrátí stávající zobrazení obsahu pro soubor pokud je již zobrazen
        /// </summary>
        /// <param name="fileName">Název souboru pro otevření.</param>
        /// <param name="switchToOpenedView">Indikuje okamžité přepnutí na soubor po otevření.</param>
        /// <param name="rOpen">Přidání do seznamu naposledy otevřených souborů</param>
        /// <returns>Pohled na obsah souboru</returns>
        public static IViewContent OpenFile(string fileName, bool switchToOpenedView, bool rOpen)
        {
            fileName = FileUtility.NormalizePath(fileName);
            LoggingService.InfoFormatted(GResources.GetResourceText(29450292) + " '{0}'...", fileName); //RC 29450292 : otevření souboru

            IViewContent viewContent = GetViewForFile(fileName);
            if (viewContent != null)
            {
                if (switchToOpenedView && viewContent.DesktopWindow != null)
                    viewContent.DesktopWindow.SelectWindow();
                return viewContent;
            }

            IDisplayBinding binding = DisplayBindingService.GetBinding(fileName);

            if (binding != null)
            {
                binding.AfterInitialize.Add(StructureViewPad.Instance.SetOrCreateItem);
                FileUtility.ObservedLoad(new NamedFileOperationDelegate(new LoadFileWrapper(binding, switchToOpenedView, FileAgent.GetOrCreateOpenedFile).Invoke), fileName, rOpen);
            }
            else
                MessageService.ShowErrorFormatted(GResources.GetResourceText(29450220) + " '{0}' " + GResources.GetResourceText(29450551), fileName); //RC 29450220 : Soubor
            return GetViewForFile(fileName);
        }

        /// <summary>
        /// Otevření nového neuloženého souboru.
        /// </summary>
        /// <param name="defaultName">(neuložený) název k otevření</param>
        /// <param name="content">Obsah souboru k otevření</param>
        public static IViewContent NewFile(string defaultName, string content)
        {
            if (defaultName == null)
                throw new ArgumentNullException(GResources.GetResourceText(29450544)); //RC 29450544 : Soubor nezle vytvořít - není daný výchozí název!
            if (content == null)
                throw new ArgumentNullException(GResources.GetResourceText(29450552)); //RC 29450552 : Soubor nezle vytvořít - není daný obsah!

            // předpokládáme, že se soubor vytváří v UTF-8 formátu
            IDisplayBinding binding = DisplayBindingService.GetBinding(defaultName, content);

            if (binding != null)
            {
                OpenedFile file = CreateUntitledOpenedFile(defaultName, content);

                IViewContent newContent = binding.CreateContent(file);
                if (newContent == null)
                {
                    LoggingService.Warning(string.Format(GResources.GetResourceText(29450553) + " '{0}'!", defaultName)); //RC 29450553 : nepodařilo se vytvořít žádný pohled s výchozím názvem
                    file.CloseIfAllViewsClosed();
                    return null;
                }

                //DisplayBindingService.AttachSubWindows(newContent, false);

                //SimpleDesktop.Desktop.ShowView(newContent);
                return newContent;
            }
            else
                throw new ApplicationException(string.Format(GResources.GetResourceText(29450554) + " '{0}'!", defaultName)); //RC 29450554 : Nelze vytvořit vazbu pro soubor
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
        /// Indikuje odstranění souboru do systémového koše 
        /// </summary>
        public static bool DeleteToRecycleBin
        {
            get => PropertyService.Get("ReportDesigner.DeleteToRecycleBin", true);
            set { PropertyService.Set("ReportDesigner.DeleteToRecycleBin", value); }
        }
        /// <summary>
        /// Indikuje uložení souboru s použitím dočasných souborů
        /// </summary>
        public static bool SaveUsingTemporaryFile
        {
            get => PropertyService.Get("ReportDesigner.SaveUsingTemporaryFile", true);
            set { PropertyService.Set("ReportDesigner.SaveUsingTemporaryFile", value); }
        }

        /// <summary>
        /// Odstranění souboru.
        /// </summary>
        /// <param name="fileName">Název souboru</param>
        /// <param name="isDirectory">Indikuje, že daný soubor je složka</param>
        public static void RemoveFile(string fileName, bool isDirectory)
        {
            FileCancelEventArgs eargs = new FileCancelEventArgs(fileName, isDirectory);
            OnFileRemoving(eargs);
            if (eargs.Cancel)
                return;
            if (!eargs.OperationAlreadyDone)
            {
                if (isDirectory)
                {
                    try
                    {
                        if (Directory.Exists(fileName))
                        {
                            if (DeleteToRecycleBin)
                                LocalCommonService.DeleteToRecycleBin(fileName);
                            else
                                Directory.Delete(fileName, true);
                        }
                    }
                    catch (Exception e)
                    {
                        MessageService.ShowError(e, string.Format(GResources.GetResourceText(29450556) + " '{0}' " + GResources.GetResourceText(29450555), fileName)); //RC 29450556 : Složku
                    }
                }
                else
                {
                    try
                    {
                        if (File.Exists(fileName))
                        {
                            if (DeleteToRecycleBin)
                                LocalCommonService.DeleteToRecycleBin(fileName);
                            else
                                File.Delete(fileName);
                        }
                    }
                    catch (Exception e)
                    {
                        MessageService.ShowError(e, string.Format(GResources.GetResourceText(29450220) + " '{0}' " + GResources.GetResourceText(29450555), fileName)); //RC 29450220 : Soubor
                    }
                }
            }
            OnFileRemoved(new FileEventArgs(fileName, isDirectory));
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
                                MessageService.ShowMessage(GResources.GetResourceText(29450557)); //RC 29450557 : Stejný název adresáře již existuje, zvolte jiný!
                                return false;
                            }
                            Directory.Move(oldName, newName);

                        }
                        else if (File.Exists(oldName))
                        {
                            if (File.Exists(newName))
                            {
                                MessageService.ShowMessage(GResources.GetResourceText(29450558)); //RC 29450558 : Stejný název souboru již existuje, zvolte jiný!
                                return false;
                            }
                            File.Move(oldName, newName);
                        }
                    }
                    catch (Exception e)
                    {
                        if (isDirectory)
                            MessageService.ShowError(e, string.Format(GResources.GetResourceText(29450560) + " '{0}' " + GResources.GetResourceText(29450559), oldName)); //RC 29450560 : Adresář
                        else
                            MessageService.ShowError(e, string.Format(GResources.GetResourceText(29450220) + " '{0}' " + GResources.GetResourceText(29450559), oldName)); //RC 29450220 : Soubor
                        return false;
                    }
                }
                OnFileRenamed(new FileRenameEventArgs(oldName, newName, isDirectory));
                return true;
            }
            finally { FileChangeWatcher.EnableAllChangeWatchers(); }
        }

        /// <summary>
        /// Vytvoření FolderBrowserDialog pro výběr složky.
        /// pokud složka není vybraná, pak se bere Plocha
        /// </summary>
        /// <param name="description">Popis</param>
        /// <param name="selectedPath">Výchozí cesta</param>
        /// <returns></returns>
        public static FolderBrowserDialog CreateFolderBrowserDialog(string description, string selectedPath)
        {
            FolderBrowserDialog dialog = new FolderBrowserDialog
            {
                Description = StringParser.Parse(description)
            };
            if (selectedPath != null && selectedPath.Length > 0 && Directory.Exists(selectedPath))
            {
                dialog.RootFolder = Environment.SpecialFolder.MyComputer;
                dialog.SelectedPath = selectedPath;
            }
            return dialog;
        }
        /// <summary>
        /// Vytvoření FolderBrowserDialog s počátečně zvolenou složkou systémové plochy.
        /// </summary>
        /// <param name="description">Popisek dialogového okna</param>
        public static FolderBrowserDialog CreateFolderBrowserDialog(string description) => CreateFolderBrowserDialog(description, null);        

        #region Event Handlers

        static void OnFileRemoved(FileEventArgs e)
        {
            FileRemoved?.Invoke(null, e);
        }

        static void OnFileRemoving(FileCancelEventArgs e)
        {
            FileRemoving?.Invoke(null, e);
        }

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
        /// <summary>
        /// Volá se před odstraněním souboru
        /// </summary>
        public static event EventHandler<FileCancelEventArgs> FileRemoving;
        /// <summary>
        /// Volá se po odstranění souboru
        /// </summary>
        public static event EventHandler<FileEventArgs> FileRemoved;
        #endregion Events

        /// <summary>
        /// Otevření specifického souboru na skok na určitou pozici.
        /// </summary>
        /// <param name="fileName">Soubor k otevření</param>
        /// <param name="line">Řádek pozice</param>
        /// <param name="column">Sloupec pozice</param>
        public static IViewContent JumpToFilePosition(string fileName, int line, int column)
        {
            LoggingService.InfoFormatted(GResources.GetResourceText(29450561) + ":  [{0} : {1}x{2}]", fileName, line, column); //RC 29450561 : skok na pozici v souboru

            if (fileName == null || fileName.Length == 0)
                return null;

            try
            {

                IViewContent content = OpenFile(fileName);
                if (content is IPositionable positionable)
                {
                    content.DesktopWindow.ActiveViewContent = content;
                    positionable.JumpTo(Math.Max(0, line), Math.Max(0, column));
                }

                LoggingService.InfoFormatted(GResources.GetResourceText(29450561) + ":  [{0} : {1}x{2}]", fileName, line, column); //RC 29450561 : skok na pozici v souboru
                return content;
            }
            finally { }
        }

        /// <summary>
        /// otevření souboru dle argumentu commandline
        /// </summary>
        /// <param name="file"></param>
        internal static void OpenFile(StartupFile file)
        {
            if (file.IsProject)
                ProjectService.LoadSolution(file.Name);
            else
                OpenFile(Path.GetFullPath(file.Name));
        }
    }
}
