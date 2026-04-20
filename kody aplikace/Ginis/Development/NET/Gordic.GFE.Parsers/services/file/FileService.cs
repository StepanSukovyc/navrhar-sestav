//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.FileService.cs                           </Name>
//    <Description> Služba pro práci se soubory                                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-28                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.General;
using System.Windows.Forms;
using System.Collections.Concurrent;

namespace Gordic.GFE.Parsers.Services
{
    /// <summary>
    /// Zobecnění načtení souboru
    /// </summary>
    public sealed class LoadFileWrapper
    {
        readonly IDisplayBinding binding;
        readonly bool switchToOpenedView;
        readonly NamedFileOperationOpenedFileDelegate getOpenedFile;

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="binding">Vazba na otevíraný soubor</param>
        /// <param name="switchToOpenedView">Indikuje okamžite přepnutí po vytvoření</param>
        /// <param name="getOpenedFile">delegát získání otevřeného souboru</param>
        public LoadFileWrapper(IDisplayBinding binding, bool switchToOpenedView, NamedFileOperationOpenedFileDelegate getOpenedFile)
        {
            this.binding = binding;
            this.switchToOpenedView = switchToOpenedView;
            this.getOpenedFile = getOpenedFile;
        }

        /// <summary>
        /// Načtení souboru
        /// </summary>
        /// <param name="fileName">název souboru k načtení</param>
        public void Invoke(string fileName)
        {
            if (getOpenedFile != null)
            {
                OpenedFile file = getOpenedFile.Invoke(fileName);
                IViewContent newContent = binding.CreateContent(file);
                if (newContent != null)
                {
                    DisplayBindingService.AttachSubWindows(newContent, false);
                    ProcessService.Desktop.ShowView(newContent, switchToOpenedView);
                }
                file.CloseIfAllViewsClosed();
            }
        }
    }

    /// <summary>
    /// Služba pro práci se soubory
    /// </summary>
    public static class FileService
    {
        #region Events
        /// <summary>
        /// Volá se před kopírováním souboru
        /// </summary>
        public static event EventHandler<FileRenamingEventArgs> FileCopying;
        /// <summary>
        /// Volá se po kopírování souboru
        /// </summary>
        public static event EventHandler<FileRenameEventArgs> FileCopied;
        /// <summary>
        /// Volá se po nahrazení souboru
        /// </summary>
        public static event EventHandler<FileEventArgs> FileReplaced;
        /// <summary>
        /// Volá se po vytvoření souboru
        /// </summary>
        public static event EventHandler<FileEventArgs> FileCreated;
        /// <summary>
        /// Volá se před nahrazením souboru
        /// </summary>
        public static event EventHandler<FileCancelEventArgs> FileReplacing;
        #endregion

        #region Event Handlers
        static void OnFileCopied(FileRenameEventArgs e)
        {
            FileCopied?.Invoke(null, e);
        }
        static void OnFileCopying(FileRenamingEventArgs e)
        {
            FileCopying?.Invoke(null, e);
        }
        #endregion

        static readonly ConcurrentDictionary<string, OpenedFile> openedFileDict = new ConcurrentDictionary<string, OpenedFile>(StringComparer.OrdinalIgnoreCase);

        /// <summary>
        /// Zjištění platností cesty k souboru.
        /// </summary>
        /// <param name="path">Kontrolovaná cesta</param>
        public static bool CheckFileName(string path)
        {
            if (FileUtility.IsValidPath(path))
                return true;

            MessageService.ShowMessage(StringParser.Parse(string.Join(" ", GResources.GetResourceText(29450433), "'${FileName}'", GResources.GetResourceText(29450432)), new string[,] { { "FileName", path } })); //RC 29450433 : Název souboru
            return false;
        }
        /// <summary>
        /// Kontrola platností názvu adresáře (nebo podadresáře)
        /// </summary>
        /// <param name="name">Jednoduchý (ne úplný) název souboru</param>
        public static bool CheckDirectoryEntryName(string name)
        {
            if (FileUtility.IsValidDirectoryEntryName(name))
                return true;
            MessageService.ShowMessage(StringParser.Parse(string.Join(" ", GResources.GetResourceText(29450433), "'${FileName}'", GResources.GetResourceText(29450432)), new string[,] { { "FileName", name } })); //RC 29450432 : je neplatný!
            return false;
        }
        /// <summary>
        /// Kopírování souboru
        /// </summary>
        /// <param name="oldName">Starý název</param>
        /// <param name="newName">Nový název</param>
        /// <param name="isDirectory">Indikuje, že se jedná o složku</param>
        /// <param name="overwrite">Indikuje, že v případě existencí souboru - ho přepsat</param>
        public static bool CopyFile(string oldName, string newName, bool isDirectory, bool overwrite)
        {
            if (FileUtility.IsEqualFileName(oldName, newName))
                return false;
            FileRenamingEventArgs eargs = new FileRenamingEventArgs(oldName, newName, isDirectory);
            OnFileCopying(eargs);
            if (eargs.Cancel)
                return false;
            if (!eargs.OperationAlreadyDone)
            {
                try
                {
                    if (isDirectory && Directory.Exists(oldName))
                    {
                        if (!overwrite && Directory.Exists(newName))
                        {
                            MessageService.ShowMessage(GResources.GetResourceText(29450434)); //RC 29450434 : Stejný název adresáře již existuje, zvote jiný!
                            return false;
                        }
                        FileUtility.DeepCopy(oldName, newName, overwrite);
                    }
                    else if (File.Exists(oldName))
                    {
                        if (!overwrite && File.Exists(newName))
                        {
                            MessageService.ShowMessage(GResources.GetResourceText(29450435)); //RC 29450435 : Stejný název souboru již existuje, zvote jiný!
                            return false;
                        }
                        File.Copy(oldName, newName, overwrite);
                    }
                }
                catch (Exception e)
                {
                    if (isDirectory)
                        MessageService.ShowError(e, string.Format(string.Join(" ", GResources.GetResourceText(29450437), "'{0}'", GResources.GetResourceText(29450436)), oldName)); //RC 29450437 : Adresář
                    else
                        MessageService.ShowError(e, string.Format(string.Join(" ", GResources.GetResourceText(29450132), "'{0}'", GResources.GetResourceText(29450436)), oldName)); //RC 29450132 : Soubor
                    return false;
                }
            }
            OnFileCopied(new FileRenameEventArgs(oldName, newName, isDirectory));
            return true;
        }

        /// <summary>
        /// Vrátí nebo vytvoří soubor.
        /// </summary>
        /// <param name="fileName">Soubor k otevření</param>
        public static OpenedFile GetOrCreateOpenedFile(string fileName)
        {
            if (fileName == null)
                throw new ArgumentNullException("GetOrCreateOpenedFile:" + GResources.GetResourceText(29450438)); //RC 29450438 : název souboru je prázdná hodnota!

            return new FileServiceOpenedFile(FileUtility.NormalizePath(fileName));
        }
        /// <summary>
        /// Získání název nového souboru
        /// </summary>
        /// <param name="file">Aktuálně otevřený soubor</param>
        /// <param name="fileName">název souboru</param>
        /// <param name="mainForm">Ovladač dialogu</param>
        /// <returns>Název (úplný) nového souboru</returns>
        public static DialogResult GetNewName(OpenedFile file, out string fileName, System.Windows.Forms.Form mainForm = null)
        {
            Debug.Assert(file != null);
            fileName = null;
            using (SaveFileDialog fdiag = new SaveFileDialog())
            {
                fdiag.OverwritePrompt = true;
                fdiag.AddExtension = true;

                string[] fileFilters = (string[])(AddInTree.GetTreeNode("/Desktop/FileFilter").BuildChildItems(null)).ToArray(typeof(string));
                fdiag.Filter = String.Join("|", fileFilters);
                for (int i = 0; i < fileFilters.Length; ++i)
                    if (fileFilters[i].ToLowerInvariant().EndsWith(Path.GetExtension(file.FileName).ToLowerInvariant()))
                    {
                        fdiag.FilterIndex = i + 1;
                        break;
                    }

                if (fdiag.FilterIndex == -1)
                    fdiag.FilterIndex = fileFilters.Length;
                
                if (FileUtility.TestFileExists(file.ContentFileName))
                    fdiag.FileName = Path.GetFileNameWithoutExtension(file.ContentFileName);

                DialogResult result = mainForm != null ? fdiag.ShowDialog(mainForm) : fdiag.ShowDialog();
                if (result == DialogResult.OK)
                {
                    fileName = fdiag.FileName;
                    fileName = !FileService.CheckFileName(fileName) ? null : fileName;
                    return result;
                }
                return result;
            }
        }

        /// <summary>
        /// Získání název nového souboru
        /// </summary>
        /// <param name="fileFilters">filter souborů</param>
        /// <param name="fileName">název souboru</param>
        /// <param name="mainForm">Ovladač dialogu</param>
        /// <param name="oldFileName">Starý název souboru</param>
        /// <returns>Název (úplný) nového souboru</returns>
        public static DialogResult GetNewName(string[] fileFilters, out string fileName, Form mainForm = null, string oldFileName = null)
        {
            fileName = null;
            using (SaveFileDialog fdiag = new SaveFileDialog())
            {
                fdiag.FileName = oldFileName;
                fdiag.OverwritePrompt = true;
                fdiag.AddExtension = true;

                fdiag.Filter = String.Join("|", fileFilters);

                if (fdiag.FilterIndex == -1)
                    fdiag.FilterIndex = fileFilters.Length;

                DialogResult result = mainForm != null ? fdiag.ShowDialog(mainForm) : fdiag.ShowDialog();
                if (result == DialogResult.OK)
                {
                    fileName = fdiag.FileName;
                    fileName = !FileService.CheckFileName(fileName) ? null : fileName;
                    return result;
                }
                return result;
            }
        }

        /// <summary>
        /// Vytvoření souboru.
        /// </summary>
        /// <param name="fileName">Název vytvářeného souboru. Jedná se o úplnou cestu.</param>
        /// <param name="isDirectory">Indikuje, že se jedná o složku</param>
        public static bool FireFileReplacing(string fileName, bool isDirectory)
        {
            FileCancelEventArgs e = new FileCancelEventArgs(fileName, isDirectory);
            FileReplacing?.Invoke(null, e);
            return !e.Cancel;
        }
        /// <summary>
        /// Nahrazení souboru.
        /// </summary>
        /// <param name="fileName">Název nového souboru. Jedná se o úplný název.</param>
        /// <param name="isDirectory">Indikuje složku</param>
        public static void FireFileReplaced(string fileName, bool isDirectory)
        {
            FileReplaced?.Invoke(null, new FileEventArgs(fileName, isDirectory));
        }
        /// <summary>
        /// Vytvoření souboru.
        /// </summary>
        /// <param name="fileName">Název nového souboru. jedná se o úplný název.</param>
        /// <param name="isDirectory">Indikuje složku</param>
        public static void FireFileCreated(string fileName, bool isDirectory)
        {
            FileCreated?.Invoke(null, new FileEventArgs(fileName, isDirectory));
        }
        /// <summary>
        /// Volá se z OpenedFile.set_FileName pro aktualizaci seznamu.
        /// </summary>
        /// <param name="file">Otevřený soubor sestavy</param>
        /// <param name="oldName">Starý název souboru</param>
        /// <param name="newName">Nový název souboru</param>
        public static void OpenedFileFileNameChange(OpenedFile file, string oldName, string newName)
        {
            if (oldName == null) return; // Soubor je teprvé vytvořen pomocí NewFile kde jméno bude teprvé přiděleno.

            LoggingService.Debug("OpenedFileFileNameChange: " + oldName + " => " + newName);

            if (openedFileDict[oldName] != file)
                throw new ArgumentException(string.Format(GResources.GetResourceText(29450439) + " {0}!", oldName)); //RC 29450439 : Soubor musí být registrován jako
            if (openedFileDict.ContainsKey(newName))
                throw new ArgumentException(string.Format(GResources.GetResourceText(29450440) + " {0}!", newName)); //RC 29450440 : Již existuje soubor s názvem

            openedFileDict.TryRemove(oldName, out _);//openedFileDict.Remove(oldName);
        }
        /// <summary>
        /// Volá se OpenedFile.UnregisterView pro aktualizaci slovniku.
        /// </summary>
        /// <param name="file">Název otevřeného souboru</param>
        internal static void OpenedFileClosed(OpenedFile file)
        {
            if (openedFileDict.TryRemove(file.FileName, out _))
                LoggingService.Debug(GResources.GetResourceText(29450515, file.FileName)); //RC 29450515 : soubor {0} byl uzavřen
        }

        /// <summary>
        /// kopírování složky z <paramref name="sourceDirName"/> do složky <paramref name="destDirName"/>
        /// </summary>
        /// <param name="sourceDirName">Cesta ke kopírováné složce</param>
        /// <param name="destDirName">Cesta k nové složce (bez názvu nové složky)</param>
        public static void DirectoryCopy(string sourceDirName, string destDirName)
        {
            // získáme podsložky specifické složky
            DirectoryInfo dir = new DirectoryInfo(sourceDirName);
            DirectoryInfo[] dirs = dir.GetDirectories();
            
            if (!dir.Exists)
                throw new DirectoryNotFoundException(
                    GResources.GetResourceText(29450518) + ":" + sourceDirName); //RC 29450518 : Zdrojová složka neexistuje nebo nebyla nalezená

            // pokud cílová složka neexistuje, vytvoříme jí 
            if (!Directory.Exists(destDirName))
                Directory.CreateDirectory(destDirName);

            // projdeme všechny soubory zdrojové složky a nakopírujeme je do cílové složky
            FileInfo[] files = dir.GetFiles();
            foreach (FileInfo file in files)
            {
                string temppath = Path.Combine(destDirName, file.Name);
                file.CopyTo(temppath, true);
            }

            // kopírujeme podsložky zdrojové složky
            foreach (DirectoryInfo subdir in dirs)
            {
                string temppath = Path.Combine(destDirName, subdir.Name);
                DirectoryCopy(subdir.FullName, temppath);
            }
        }

        /// <summary>
        /// Vytvoří FolderBrowserDialog pro výběr složky
        /// </summary>
        /// <param name="description">popis dialogov0ho okna</param>
        public static FolderBrowserDialog CreateFolderBrowserDialog(string description)
        {
            return CreateFolderBrowserDialog(description, null);
        }
        /// <summary>
        /// Vytvoří FolderBrowserDialog pro výběr složky s inicializací v uvedené složce.
        /// Pokud taková neexistuje, pak se inicializuje ve složce Plocha
        /// </summary>
        /// <param name="description">popis dialogového okna</param>
        /// <param name="selectedPath">icinializační složka</param>
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

    }
}
