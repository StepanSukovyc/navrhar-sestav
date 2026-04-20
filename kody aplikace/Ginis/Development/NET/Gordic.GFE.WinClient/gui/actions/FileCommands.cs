//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.FileCommands.cs                        </Name>
//    <Description> Vytvoření nového souboru                                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2026                            </Copyright>
//    <Created>     2012-10-22                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using Gordic.GFE.Parsers;
using Gordic.WinForms.Controls;
using System.IO;
using System.Diagnostics;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Internal.Templates;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.Database;
using Gordic.GFE.WinClient.StartPage;
using Gordic.General;
using Gordic.GFE.WinClient.Project;

namespace Gordic.GFE.WinClient.FileCommands
{
    /// <summary>
    /// Vytvoření nového souboru
    /// </summary>
    class CreateNewFile : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu vytvoření souboru
        /// </summary>
        public override void Run()
        {
            using (NewFileDialog nfd = new NewFileDialog(null))
                nfd.ShowDialog(SimpleDesktop.MainForm);
        }

        /// <summary>
        /// Otevření souboru
        /// </summary>
        /// <param name="sender">vlastník příkazu</param>
        /// <param name="args">argumenty příkazu</param>
        public static void OnCreate(object sender, EventArgs args)
        {
            if (!(sender is GLinkLabel link))
                return;

            if (!(link.Tag is List<FileTemplate> argument) || argument.Count == 0)
            {
                MessageService.ShowError(GResources.GetResourceText(29450437)); //RC 29450437 : Pro daný typ souboru neexistuje žádná šablona!
                return;
            }

            NewFileDialog nfd = new NewFileDialog(null);
            if (argument.Count == 1)
                nfd.CreateEvent(argument.First());
            else
            {
                // wizard na výběr šablony
            }
        }
    }

    /// <summary>
    /// Otevřit
    /// </summary>
    class OpenFile : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu Open
        /// </summary>
        public override void Run() { OnOpen(Owner, EventArgs.Empty); }

        static void OpenNew()
        {
            using (OpenFileDialog fdiag = new OpenFileDialog())
            {
                fdiag.AddExtension = true;
                fdiag.Filter = GetUnifiedFilter();
                fdiag.FilterIndex = 1;
                fdiag.Multiselect = true;
                fdiag.CheckFileExists = true;

                string initializeName = LocalCommonService.GetInitializeFormationDir();
                if (!string.IsNullOrEmpty(initializeName))
                    fdiag.InitialDirectory = FileUtility.IsDirectory(initializeName) ? initializeName : Path.GetDirectoryName(initializeName);

                if (fdiag.ShowDialog(SimpleDesktop.MainForm) == DialogResult.OK)
                    foreach (string name in fdiag.FileNames)
                        OpenReportOrSolution(name);
            }
        }

        /// <summary>
        /// Vytvoří unified filter pro sestavy a projekty (seřazené, "Vše" jako výchozí)
        /// </summary>
        static string GetUnifiedFilter()
        {
            string[] fileFilters = (string[])(AddInTree.GetTreeNode("/ReportDesigner/Desktop/OpenFileFilter").BuildChildItems(null)).ToArray(typeof(string));
            string projectFilter = ProjectService.GetAllProjectsFilter(null);

            string combinedFilters = $"{String.Join("|", fileFilters)}|{projectFilter}";
            List<FilterItem> filters = ParseFilters(combinedFilters);

            // Odstranění duplicitních "Vše" filtrů
            filters = RemoveDuplicateAllFilesFilters(filters);

            // Seřazení: "Vše" první, ostatní alfabeticky
            var sortedFilters = SortFilters(filters);

            return String.Join("|", sortedFilters.Select(f => $"{f.DisplayName}|{f.Pattern}"));
        }

        /// <summary>
        /// Parsuje filter string na jednotlivé položky
        /// </summary>
        static List<FilterItem> ParseFilters(string filterString)
        {
            List<FilterItem> result = new List<FilterItem>();
            string[] parts = filterString.Split('|');

            for (int i = 0; i < parts.Length - 1; i += 2)
            {
                result.Add(new FilterItem 
                { 
                    DisplayName = parts[i], 
                    Pattern = parts[i + 1] 
                });
            }

            return result;
        }

        /// <summary>
        /// Odstraní duplicitní "Vše" filtry - ponechá pouze první
        /// </summary>
        static List<FilterItem> RemoveDuplicateAllFilesFilters(List<FilterItem> filters)
        {
            FilterItem firstAllFiles = null;
            List<FilterItem> result = new List<FilterItem>();

            foreach (var filter in filters)
            {
                bool isAllFilesFilter = filter.Pattern.Contains("*.*") || 
                                       filter.DisplayName.Contains("Všechny") || 
                                       filter.DisplayName.Contains("All files") ||
                                       filter.DisplayName.Contains("Vše");

                if (isAllFilesFilter)
                {
                    if (firstAllFiles == null)
                    {
                        firstAllFiles = filter;
                        result.Add(filter);
                    }
                    // Další "Vše" přeskočíme
                }
                else
                {
                    result.Add(filter);
                }
            }

            return result;
        }

        /// <summary>
        /// Seřadí filtry - "Vše" první, ostatní alfabeticky
        /// </summary>
        static List<FilterItem> SortFilters(List<FilterItem> filters)
        {
            FilterItem allFilesFilter = filters.FirstOrDefault(f => 
                f.Pattern.Contains("*.*") || 
                f.DisplayName.Contains("Všechny") || 
                f.DisplayName.Contains("All files") ||
                f.DisplayName.Contains("Vše"));

            var otherFilters = filters
                .Where(f => f != allFilesFilter)
                .OrderBy(f => f.DisplayName)
                .ToList();

            List<FilterItem> sorted = new List<FilterItem>();
            if (allFilesFilter != null)
                sorted.Add(allFilesFilter);
            sorted.AddRange(otherFilters);

            return sorted;
        }

        /// <summary>
        /// Reprezentuje jednu položku filtru
        /// </summary>
        class FilterItem
        {
            public string DisplayName { get; set; }
            public string Pattern { get; set; }
        }

        /// <summary>
        /// Otevření souboru
        /// </summary>
        /// <param name="sender">vlastník příkazu</param>
        /// <param name="args">argumenty příkazu</param>
        public static void OnOpen(object sender, EventArgs args)
        {
            RecentOpenFile rof = sender is GLinkLabel ? ((GLinkLabel)sender).Tag as RecentOpenFile : null;
            if (rof != null)
                OpenReportOrSolution(rof.Path);
            else OpenNew();
        }

        /// <summary>
        /// Otevře sestavu nebo projekt podle typu souboru
        /// </summary>
        static void OpenReportOrSolution(string path)
        {
            if (string.IsNullOrEmpty(path))
                return;

            if (IsSolutionFile(path))
                ProjectService.LoadSolutionOrProject(path);
            else
                OpenByName(path);
        }

        /// <summary>
        /// Detekuje zda se jedná o soubor projektu/sestavení
        /// </summary>
        static bool IsSolutionFile(string fileName)
        {
            string extension = Path.GetExtension(fileName).ToLower();
            string[] solutionExtensions = { ".ssz", ".srz", ".gsz" };
            return solutionExtensions.Contains(extension);
        }

        private static void OpenByName(string path)
        {
            if (!string.IsNullOrEmpty(path) && Path.GetExtension(path).Equals(".alf", StringComparison.OrdinalIgnoreCase))
                FileAgent.OpenFile(path, true, !FileAgent.OpenSolutionForFile(path));
            else
                FileAgent.OpenFile(path);
        }
    }

    /// <summary>
    /// Otevření souboru z databáze
    /// </summary>
    class OpenFileDb : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu Open
        /// </summary>
        public override void Run() { OpenNew(); }

        /// <summary>
        /// Otevření souboru
        /// </summary>
        /// <param name="sender">vlastník příkazu</param>
        /// <param name="args">argumenty příkazu</param>
        public static void OnOpen(object sender, EventArgs args)
        {
            if (sender is GLinkLabel label && label.Tag is RecentOpenFile rof)
            {
                if (DatabaseService.IsAuthorized)
                    OpenFromDatabase(rof);
            }
            else
                OpenNew();
        }

        static void OpenFromDatabase(RecentOpenFile rof)
        {
            CDbImportTab import = new CDbImportTab() { Dock = DockStyle.Fill };
            import.AfterTempSaveEvent += ImportAfterTempSaveEvent;
            import.Accept(rof.IXSALV, rof.IXSFRM);
        }

        static void OpenNew()
        {
            if (DatabaseService.IsAuthorized)
            {
                PropertyDialog frm = new PropertyDialog() { PropertiesDefalut = "Dialog.DBImport" };
                CDbImportTab import = new CDbImportTab() { Dock = DockStyle.Fill };
                import.AfterTempSaveEvent += ImportAfterTempSaveEvent;
                frm.AddControl(import);
                frm.ShowDialog();
            }
        }
        static void ImportAfterTempSaveEvent(params string[] parameters)
        {
            // parameters[1] - cesta k dočasnému souboru *.alf
            if (FileUtility.TestFileExists(parameters[1]))
            {
                IViewContent content = Gordic.GFE.WinClient.Services.FileAgent.OpenFile(parameters[1], true, false);
                if (content != null && content.PrimaryFile != null)
                {
                    content.PrimaryFile.IsDatabase = true;
                    Services.FileAgent.RecentOpen.AddLastFile(new RecentOpenFile(content.PrimaryFile.FileName, true, parameters[3], parameters[4]));
                }
            }
        }
    }

    /// <summary>
    /// Otevře složku obsahující vybraný soubor.
    /// </summary>
    class OpenFolderContainingFile : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (Owner is GLinkLabel label && label.Tag is RecentOpenFile rof)
                OpenContainingFolderInExplorer(rof.Path);
        }

        /// <summary>
        /// Otevření složky obsahující uvedený soubor
        /// </summary>
        /// <param name="fileName">Název souboru</param>
        public static void OpenContainingFolderInExplorer(string fileName)
        {
            if (string.IsNullOrEmpty(fileName))
                return;

            if (!File.Exists(fileName))
                MessageService.ShowErrorFormatted($"{GResources.GetResourceText(29450220)} '{{0}}' {GResources.GetResourceText(29450438)}", fileName); //RC 29450220 : Soubor
            else
                Process.Start("explorer", $"/select,\"{fileName}\"");
        }
    }

    /// <summary>
    /// Odstraní vybraný soubor ze seznamu naposledy otevřených.
    /// </summary>
    class RemoveRecentOpen : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (Owner is GLinkLabel label && label.Tag is RecentOpenFile rof)
                Services.FileAgent.RecentOpen.FileOrProjectRemove(null, new FileEventArgs(rof.Path, false));
        }
    }

    /// <summary>
    /// Aktualizace seznamu naposledy otevřených souborů
    /// </summary>
    class RefreshRecentOpen : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            StartViewPane.Instance?.RefreshRecentOpen();
        }
    }

    /// <summary>
    /// Zavření souboru
    /// </summary>
    class CloseFile : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            SimpleDesktop.Desktop.ActiveDesktopWindow?.CloseWindow(false);
        }
    }

    /// <summary>
    /// Zavření všech oken
    /// </summary>
    class CloseAllWindows : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            SimpleDesktop.Desktop.CloseAllViews();
        }
    }

    /// <summary>
    /// Uložení souboru
    /// </summary>
    class SaveFile : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            using (AsynchronousWaitDialog monitor = AsynchronousWaitDialog.ShowWaitDialog(GResources.GetResourceText(29450660))) //RC 29450660 : uložení sestavy
                if (IsFileInCurrentProject())
                    ProjectService.SaveSolution();
                else
                    Save(SimpleDesktop.Desktop.ActiveDesktopWindow);
        }

        /// <summary>
        /// Kontroluje, zda je aktuální soubor součástí projektu
        /// </summary>
        static bool IsFileInCurrentProject() =>
            ProjectService.CurrentProject != null &&
            SimpleDesktop.Desktop.ActiveViewContent != null &&
            !string.IsNullOrEmpty(SimpleDesktop.Desktop.ActiveViewContent.PrimaryFileName) &&
            ProjectService.CurrentProject.IsFileInProject(SimpleDesktop.Desktop.ActiveViewContent.PrimaryFileName);

        /// <summary>
        /// Uložení souboru okna
        /// </summary>
        /// <param name="window">Okno s pohledem na obsah</param>
        internal static void Save(IDesktopWindow window)
        {
            window.ViewContents.ForEach(Save);
        }

        /// <summary>
        /// Uložení obsahu
        /// </summary>
        /// <param name="content">Obsah pro uložení</param>
        public static void Save(IViewContent content) { ContentService.Save(content, SimpleDesktop.MainForm); }

        /// <summary>
        /// Uložení otevřeného souboru
        /// </summary>
        /// <param name="file">otevřený soubor</param>
        public static void Save(OpenedFile file) { ContentService.Save(file, SimpleDesktop.MainForm); }

    }

    /// <summary>
    /// Uložení souboru
    /// </summary>
    class SaveFileToDatabase : AbstractMenuCommand
    {
        /// <exclude/>
        public override bool IsEnabled =>
            SimpleDesktop.Desktop.ActiveViewContent?.PrimaryFile != null;

        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run() { DatabaseService.ObservedSave(); }

        /// <summary>
        /// Uložení obsahu do databáze
        /// </summary>
        /// <param name="eventHandlerOpenedFileArgument"></param>
        internal static void Save(EventHandlerOpenedFileArgument eventHandlerOpenedFileArgument)
        {
            foreach (IViewContent content in SimpleDesktop.Desktop.ActiveDesktopWindow.ViewContents)
                Save(content, eventHandlerOpenedFileArgument);
        }

        static void Save(IViewContent content, EventHandlerOpenedFileArgument eventHandlerOpenedFileArgument)
        {
            if (content != null)
            {
                if (content is ICustomizedCommands commands)
                    if (commands.SaveToDatabaseCommand(eventHandlerOpenedFileArgument))
                        return;

                if (content.IsViewOnly)
                    return;
            }
        }
    }

    /// <summary>
    /// Příkaz Uložit jako...
    /// </summary>
    class SaveFileAs : AbstractMenuCommand
    {
        /// <exclude/>
        public override bool IsEnabled =>
            SimpleDesktop.Desktop.ActiveViewContent?.PrimaryFile != null;

        /// <summary>
        /// Spuštění příkazu Uložit jako...
        /// </summary>
        public override void Run()
        {
            Save(SimpleDesktop.Desktop.ActiveDesktopWindow);
        }

        /// <summary>
        /// Uložení obsahu okna
        /// </summary>
        /// <param name="window">Okno pro uložení</param>
        static void Save(IDesktopWindow window)
        {
            // uložime zbývající soubory najednou (zobrazení Save As dialogu)
            ContentService.Save(window.ViewContents).SelectMany(content => content.Files).Distinct().ForEach(Save);
        }

        /// <summary>
        /// Uožení souboru (s vyvoláním okna Uložit jako)
        /// </summary>
        /// <param name="file">Ukládaný soubor</param>
        public static void Save(OpenedFile file)
        {
            Debug.Assert(file != null);
            ContentService.SaveOpenedFile(file, SimpleDesktop.MainForm);
        }
    }

    /// <summary>
    /// Uložit všechny aktuálně otevřené
    /// </summary>
    class SaveAllFiles : AbstractMenuCommand
    {
        /// <summary>
        /// Uložit vše
        /// </summary>
        public static void SaveAll()
        {
            foreach (IViewContent content in SimpleDesktop.Desktop.ViewContentCollection)
                if (content is ICustomizedCommands commands && content.IsDirty)
                    commands.SaveCommand();
            foreach (OpenedFile file in FileAgent.OpenedFiles)
                if (file.IsDirty)
                    SaveFile.Save(file);
        }

        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run() { SaveAll(); }
    }

    /// <summary>
    /// konverze GRR->GRF
    /// </summary>
    class ConvertFile : AbstractMenuCommand
    {
        /// <summary>
        /// Spštění příkazu
        /// </summary>
        public override void Run()
        {
            using (ConvertFileDialog cfd = new ConvertFileDialog())
                cfd.ShowDialog(SimpleDesktop.MainForm);
        }
    }
}
