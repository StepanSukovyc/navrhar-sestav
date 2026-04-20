//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ProjectService.cs                      </Name>
//    <Description> Služba pro práci s projekty                                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.ProjectBrowser;
using Gordic.GFE.WinClient.Services;
using Gordic.General;
using Gordic.GFE.WinClient.AddIns;
using System.Collections;

namespace Gordic.GFE.WinClient.Project
{
    /// <summary>
    /// Služba pro práci s projekty
    /// </summary>
    static class ProjectService
    {
        /// <summary>
        /// Událost po změně aktuálního projektu
        /// </summary>
        public static event ProjectEventHandler CurrentProjectChanged;
        /// <summary>
        /// Volá se před načtení řešení
        /// </summary>
        public static event EventHandler SolutionLoading;
        /// <summary>
        /// Volá se po načtení řešení
        /// </summary>
        public static event EventHandler<SolutionEventArgs> SolutionLoaded;

        /// <summary>
        /// Volá se po uložení řešení
        /// </summary>
        public static event EventHandler<SolutionEventArgs> SolutionSaved;

        /// <summary>
        /// Volá se před zavřením řešení
        /// </summary>
        public static event EventHandler<SolutionEventArgs> SolutionClosing;
        /// <summary>
        /// Volá se po zavření řešení
        /// </summary>
        public static event EventHandler SolutionClosed;

        /// <summary>
        /// Volá se po přidání projektu
        /// </summary>
        public static event ProjectEventHandler ProjectAdded;

        /// <summary>
        /// Volá se po odstranění složky řešení
        /// </summary>
        public static event SolutionFolderEventHandler SolutionFolderRemoved;

        /// <summary>
        /// Před uložení preferencí řešení.
        /// </summary>
        public static event EventHandler<SolutionEventArgs> SolutionPreferencesSaving;

        static bool isSolutionLoading;
        /// <summary>
        /// indikuje načtení sestavení
        /// </summary>
        public static bool IsSolutionLoading { get => isSolutionLoading; }

        static List<EventHandler<ProjectItemEventArgs>> projectItemAddedList = new List<EventHandler<ProjectItemEventArgs>>();
        static event EventHandler<ProjectItemEventArgs> _ProjectItemAdded;
        /// <summary>
        /// události na přidání položky projektu
        /// </summary>
        public static event EventHandler<ProjectItemEventArgs> ProjectItemAdded
        {
            add
            {
                if (!projectItemAddedList.Exists(val => val.Method == value.Method))
                {
                    _ProjectItemAdded += value;
                    projectItemAddedList.Add(value);
                }
            }
            remove
            {
                if (projectItemAddedList.Contains(value)) projectItemAddedList.Remove(value);
                _ProjectItemAdded -= value;
            }
        }
        public static event EventHandler<ProjectItemEventArgs> ProjectItemRemoved;

        /// <summary>
        /// Začátek kompilace projektu/sestavení
        /// </summary>
        public static event EventHandler StartBuild;
        /// <summary>
        /// Konec kompilace projektu/sestavení
        /// </summary>
        public static event EventHandler<BuildEventArgs> EndBuild;

        static Solution openSolution;
        /// <summary>
        /// Otevřené řešení
        /// </summary>
        public static Solution OpenSolution
        {
            [System.Diagnostics.DebuggerStepThrough]
            get => openSolution;
        }

        static IProject currentProject;
        /// <summary>
        /// Aktuální projekt
        /// </summary>
        public static IProject CurrentProject
        {
            [System.Diagnostics.DebuggerStepThrough]
            get => currentProject;
            set
            {
                if (currentProject != value)
                {
                    LoggingService.InfoFormatted(GResources.GetResourceText(29450405) + " - '{0}'...", (value == null ? "NULL" : value.Name)); //RC 29450405 : změna aktuálního projektu
                    currentProject = value;
                    OnCurrentProjectChanged(new ProjectEventArgs(currentProject));
                }
            }
        }

        static void OnCurrentProjectChanged(ProjectEventArgs e)
        {
            CurrentProjectChanged?.Invoke(null, e);
        }

        /// <summary>
        /// Načtení jednoduchého projektu jako řešení.
        /// </summary>
        /// <param name="fileName">Název souboru projektu</param>
        public static void LoadProject(string fileName)
        {
            if (!Path.IsPathRooted(fileName))
                throw new ArgumentException("LoadProject:" + GResources.GetResourceText(29450406)); //RC 29450406 : Cesta musí existovat!

            string solutionFile = Path.ChangeExtension(fileName, ".gfrm");

            if (File.Exists(solutionFile))
            {
                LoadSolution(solutionFile);

                if (openSolution != null)
                {
                    bool found = false;
                    foreach (IProject p in openSolution.Projects)
                        if (FileUtility.IsEqualFileName(fileName, p.FileName))
                        {
                            found = true;
                            break;
                        }

                    if (found == false)
                    {
                        string[,] parseArgs = { { "SolutionName", Path.GetFileName(solutionFile) }, { "ProjectName", Path.GetFileName(fileName) } };
                        int res = MessageService.ShowCustomDialog(MessageService.ProductName,
                                                                  StringParser.Parse(string.Join(" ", GResources.GetResourceText(29450408), "'${SolutionName}',", GResources.GetResourceText(29450407), "'${ProjectName}'!"), parseArgs), //RC 29450408 : Návrhář načetl řešení
                                                                  0, 2,
                                                                  StringParser.Parse(string.Join(" ", GResources.GetResourceText(29450409), "'${ProjectName}'", GResources.GetResourceText(29450332), "'${SolutionName}'."), parseArgs), //RC 29450332 : do
                                                                  StringParser.Parse(GResources.GetResourceText(29450410) + " '${ProjectName}'.", parseArgs), //RC 29450410 : Vytvořit nové řešení pro
                                                                  GResources.GetResourceText(29450411)); //RC 29450411 : Ignorovat
                        if (res == 0)
                        {
                            // přidání projektu do řešení
                            AddExitingProjectToSolution.AddProject((ISolutionFolderNode)ProjectBrowserPad.Instance.SolutionNode, fileName);
                            SaveSolution();
                            return;
                        }
                        else if (res == 1)
                        {
                            CloseSolution();
                            try { File.Copy(solutionFile, Path.ChangeExtension(solutionFile, ".old.gfrm"), true); }
                            catch (IOException) { }
                        }
                        else
                            // ignorujeme, pouze otevřeme sestavení
                            return;
                    }
                    else return;
                }
                else
                    // nějaký problém během otevírání projektu, přerušeno
                    return;
            }
            Solution solution = new Solution
            {
                Name = Path.GetFileNameWithoutExtension(fileName)
            };
            ISolutionBinding binding = SolutionBindingService.GetBindingPerProjectFile(fileName);
            IProject project;
            if (binding != null)
            {
                project = SolutionBindingService.LoadProject(solution, fileName, solution.Name);
                if (project is UnknownProject)
                {
                    if (((UnknownProject)project).WarningDisplayedToUser == false)
                        ((UnknownProject)project).ShowWarningMessageBox();
                    return;
                }
            }
            else
            {
                MessageService.ShowError(StringParser.Parse(string.Join(" ", GResources.GetResourceText(29450220), "'${FileName}'", GResources.GetResourceText(29450293), GResources.GetResourceText(29450412)), new string[,] { { "FileName", fileName } })); //RC 29450220 : Soubor
                return;
            }
            solution.AddFolder(project);

            if (FileUtility.ObservedSave((NamedFileOperationDelegate)solution.Save, solutionFile) == FileOperationResult.OK)
                // načtení pouze po úspěšnem uložení
                LoadSolution(solutionFile);
        }
        /// <summary>
        /// Uložení řešení
        /// </summary>
        public static void SaveSolution()
        {
            if (openSolution != null)
            {
                foreach (IProject project in openSolution.Projects)
                    project.Save();
                //SaveAllFiles.SaveAll();
                openSolution.Save();
                OnSolutionSaved(new SolutionEventArgs(openSolution));
            }
        }

        /// <summary>
        /// Načtení řešení
        /// </summary>
        /// <param name="fileName">úplná cesta k souboru řešení</param>
        /// <param name="force">TRUE - v případě chyby konfiguračního souboru sestavení se nabídne oprava samotného konfiguračního souboru</param>
        public static void LoadSolution(string fileName, bool force = true)
        {
            isSolutionLoading = true;
            if (!Path.IsPathRooted(fileName))
                throw new ArgumentException("LoadSolution:" + GResources.GetResourceText(29450413)); //RC 29450413 : Složka musí existovat!
            BeforeLoadSolution();
            OnSolutionLoading(fileName);
            try
            {
                openSolution = Solution.Load(fileName, force);
                if (openSolution == null)
                    return;
            }
            catch (IOException ex)
            {
                LoggingService.Warning(ex);
                MessageService.ShowError(ex.Message);
                return;
            }
            catch (UnauthorizedAccessException ex)
            {
                LoggingService.Warning(ex);
                MessageService.ShowError(ex.Message);
                return;
            }

            AbstractProject.filesToOpenAfterSolutionLoad.Clear();
            try
            {
                string file = GetPreferenceFileName(openSolution.FileName);
                if (FileUtility.IsValidPath(file) && File.Exists(file))
                    (openSolution.Preferences as IMementoCapable).SetMemento(Property.Load(file));
                else
                    (openSolution.Preferences as IMementoCapable).SetMemento(new Property());
            }
            catch (Exception ex) { MessageService.ShowError(ex); }

            try { ApplyConfigurationAndReadPreferences(); }
            catch (Exception ex) { MessageService.ShowError(ex); }

            // vytvoření obsahu pro řešení
            ParserService.OnSolutionLoaded();
            OnSolutionLoaded(new SolutionEventArgs(openSolution));
            isSolutionLoading = false;
        }

        /// <summary>
        /// Uložení preferencí řešení
        /// </summary>
        public static void SaveSolutionPreferences()
        {
            if (openSolution == null)
                return;
            string directory = FileUtility.GetOrCreateDirectory(PropertyService.ConfigDirectory, "preferences");
            if (Directory.Exists(directory))
            {
                SolutionPreferencesSaving?.Invoke(null, new SolutionEventArgs(openSolution));
                Property memento = (openSolution.Preferences as IMementoCapable).CreateMemento();

                string fullFileName = GetPreferenceFileName(openSolution.FileName);
                if (FileUtility.IsValidPath(fullFileName))
                    FileUtility.ObservedSave(new NamedFileOperationDelegate(memento.Save), fullFileName, FileErrorPolicy.Inform, false);

                foreach (IProject project in OpenSolution.Projects)
                    if (!openSolution.FileName.Equals(project.FileName, StringComparison.OrdinalIgnoreCase))
                    {
                        memento = project.CreateMemento();
                        if (memento == null) continue;

                        fullFileName = GetPreferenceFileName(project.FileName);
                        if (FileUtility.IsValidPath(fullFileName))
                            FileUtility.ObservedSave(new NamedFileOperationDelegate(memento.Save), fullFileName, FileErrorPolicy.Inform, false);
                    }
            }
        }
        /// <summary>
        /// Uzavření projektu
        /// </summary>
        /// <param name="nullable">TRUE - odstraní objekt openSolution</param>
        public static void CloseSolution(bool nullable = true)
        {
            if (openSolution == null)
                return;

            LoggingService.DebugFormatted(GResources.GetResourceText(29450414) + " '{0}'...", OpenSolution.Name); //RC 29450414 : ukončení sestavení

            CurrentProject = null;
            OnSolutionClosing(new SolutionEventArgs(openSolution));

            openSolution.Dispose();
            if (nullable)
                openSolution = null;
            else
                // odstraníme všechny složky sestavení
                while (openSolution.Folders.Count != 0)
                    openSolution.RemoveFolder(openSolution.Folders.First());

            OnSolutionClosed(EventArgs.Empty);
        }

        static string GetPreferenceFileName(string projectFileName)
        {
            string directory = Path.Combine(PropertyService.ConfigDirectory, "preferences");
            return Path.Combine(directory,
                                Path.GetFileName(projectFileName)
                                + "." + projectFileName.ToLowerInvariant().GetHashCode().ToString("x")
                                + ".xml");
        }

        static void ApplyConfigurationAndReadPreferences()
        {
            foreach (IProject project in openSolution.Projects)
            {
                string file = GetPreferenceFileName(project.FileName);
                if (FileUtility.IsValidPath(file) && File.Exists(file))
                    project.SetMemento(Property.Load(file));
            }
        }

        static void BeforeLoadSolution()
        {
            if (openSolution != null)
            {
                SaveSolutionPreferences();
                SimpleDesktop.Desktop.CloseAllViews(true);
                CloseSolution();
            }
        }
        static void OnSolutionLoading(string fileName)
        {
            SolutionLoading?.Invoke(fileName, EventArgs.Empty);
        }
        static void OnSolutionLoaded(SolutionEventArgs e)
        {
            e.Solution?.OnAfterLoaded();
            SolutionLoaded?.Invoke(null, e);
        }
        static void OnSolutionClosing(SolutionEventArgs e)
        {
            SolutionClosing?.Invoke(null, e);
        }
        static void OnSolutionClosed(EventArgs e)
        {
            SolutionClosed?.Invoke(null, e);
        }
        static void OnSolutionSaved(SolutionEventArgs e)
        {
            SolutionSaved?.Invoke(null, e);
        }
        static void OnProjectAdded(ProjectEventArgs e)
        {
            ProjectAdded?.Invoke(null, e);
        }
        static void OnSolutionFolderRemoved(SolutionFolderEventArgs e)
        {
            SolutionFolderRemoved?.Invoke(null, e);
        }
        static void OnProjectItemRemoved(ProjectItemEventArgs e)
        {
            ProjectItemRemoved?.Invoke(null, e);
        }
        static void OnProjectItemAdded(ProjectItemEventArgs e)
        {
            _ProjectItemAdded?.Invoke(null, e);
        }

        /// <summary>
        /// Načtení souborů projektu
        /// </summary>
        internal static void ParserServiceCreatedProjectContents()
        {
            foreach (string file in AbstractProject.filesToOpenAfterSolutionLoad)
                if (OpenSolution == null)
                {
                    if (File.Exists(file))
                        FileAgent.OpenFile(file);
                }
                else
                    foreach (IProject project in OpenSolution.Projects)
                    {
                        ProjectItem item = project.Items.FirstOrNull(
                            itm => !string.IsNullOrEmpty(itm.FileName)
                            && itm.FileName.Split(Path.DirectorySeparatorChar).Last().Equals(file, StringComparison.InvariantCultureIgnoreCase));
                        if (item != null)
                            FileAgent.OpenFile(item.FileName);
                    }
            AbstractProject.filesToOpenAfterSolutionLoad.Clear();
        }

        /// <summary>
        /// Vrácí všechny registrované formáty projektu
        /// </summary>
        /// <param name="caller">Volající objekt</param>
        /// <returns>Filter koncovek souborů</returns>
        public static string GetAllProjectsFilter(object caller)
        {
            ArrayList list = AddInTree.GetTreeNode("/ReportDesigner/Desktop/Combine/FileFilter").BuildChildItems(null);
            list.Sort();
            return String.Join("|", (string[])list.ToArray(typeof(string)));
        }

        /// <summary>
        /// Přidání projektu do řešení
        /// </summary>
        /// <param name="solutionFolderNode">větev řešení</param>
        /// <param name="newProject">nový projekt</param>
        public static void AddProject(ISolutionFolderNode solutionFolderNode, IProject newProject)
        {
            if (solutionFolderNode.Solution.SolutionFolders.Any(
                folder => string.Equals(folder.IdGuid, newProject.IdGuid, StringComparison.OrdinalIgnoreCase)))
            {
                LoggingService.Warning(string.Join(" ", "ProjectService.AddProject:", GResources.GetResourceText(29450415), "IdGuid")); //RC 29450415 : byla identyfikováná kopie
                newProject.IdGuid = Guid.NewGuid().ToString().ToUpperInvariant();
            }
            solutionFolderNode.Container.AddFolder(newProject);
            //ParserService.CreateProjectContentForAddedProject(newProject);
            //solutionFolderNode.Solution.FixSolutionConfiguration(new IProject[] { newProject });
            OnProjectAdded(new ProjectEventArgs(newProject));
        }

        /// <summary>
        /// získání třídy načtení sestavení - jedná se o zjištění dle koncovky souboru
        /// </summary>
        /// <param name="fileName">název sestavení</param>
        /// <returns>třída načtenís sestavení</returns>
        public static IProjectLoader GetProjectLoader(string fileName)
        {
            // načteme konfigurační hodnotu všech čteček sestavení
            AddInTreeNode addinTreeNode = AddInTree.GetTreeNode("/ReportDesigner/Desktop/Combine/FileFilter");
            foreach (Entity entity in addinTreeNode.Entities)
            {
                // dle koncovky
                string pattern = entity.Properties.Get("extensions", "");
                // najdmeme vhodnou třídu
                if (FileUtility.MatchesPattern(fileName, pattern) && entity.Properties.Contains("class"))
                {
                    object binding = entity.AddIn.CreateObject(entity.Properties["class"]);
                    return binding as IProjectLoader;
                }
            }
            return null;
        }
        /// <summary>
        /// odstranění složky sestavení
        /// </summary>
        /// <param name="guid">identifikátor složky</param>
        public static void RemoveSolutionFolder(string guid)
        {
            if (OpenSolution == null)
                return;
            foreach (ISolutionFolder folder in OpenSolution.SolutionFolders)
                if (folder.IdGuid == guid)
                {
                    folder.Parent.RemoveFolder(folder);
                    OnSolutionFolderRemoved(new SolutionFolderEventArgs(folder));
                    break;
                }
        }
        /// <summary>
        /// odstranění položky projektu
        /// </summary>
        /// <param name="project">projekt položky</param>
        /// <param name="item">položka projektu</param>
        public static void RemoveProjectItem(IProject project, ProjectItem item)
        {
            if (project == null) throw new ArgumentNullException("project");
            if (item == null) throw new ArgumentNullException("item");
            if (project is IProjectItemListProvider provider)
                if (provider.RemoveProjectItem(item))
                    OnProjectItemRemoved(new ProjectItemEventArgs(project, item));
        }

        /// <exclude/>
        public static void AddProjectItem(IProject project, ProjectItem item, AbstractFileTreeNode fileNode)
        {
            if (project == null) throw new ArgumentNullException("project");
            if (item == null) throw new ArgumentNullException("item");
            if (project is IProjectItemListProvider provider)
            {
                provider.AddProjectItem(item, fileNode);
                OnProjectItemAdded(new ProjectItemEventArgs(project, item));
            }
        }

        /// <summary>
        /// načtení projektu
        /// </summary>
        /// <param name="file">naposledy otevřený soubor</param>
        public static void LoadSolutionOrProject(RecentOpenFile file)
        {
            if (file == null || !FileUtility.TestFileExists(file.Path))
                MessageService.ShowErrorFormatted("LoadSolutionOrProject:" + GResources.GetResourceText(29450416)); //RC 29450416 : Projekt nelze načíst!
            else LoadSolutionOrProject(file.Path);
        }

        /// <summary>
        /// načtení sestavení nebo projektu
        /// </summary>
        /// <param name="fileName">cesta k sestavení/projektu</param>
        public static void LoadSolutionOrProject(string fileName)
        {
            IProjectLoader loader = GetProjectLoader(fileName);
            if (loader != null)
                loader.Load(fileName);
            else
                MessageService.ShowError(StringParser.Parse(string.Join(" ", GResources.GetResourceText(29450220), "'${FileName}'", GResources.GetResourceText(29450293), GResources.GetResourceText(29450417)), new string[,] { { "FileName", fileName } })); //RC 29450220 : Soubor
        }

        /// <summary>
        /// Koncovky souboru dle konfigurace
        /// </summary>
        /// <param name="key">Cesta ke konfigurační větví</param>
        /// <returns>Seznam obsahující koncovky dle konfigurace</returns>
        internal static List<string> GetExtensions(string key)
        {
            List<string> result = new List<string>();
            AddInTreeNode addinTreeNode = AddInTree.GetTreeNode(key);
            if (addinTreeNode != null)
                foreach (Entity c in addinTreeNode.Entities)
                {
                    string ext = c.Properties.Get("extensions", "");
                    if (ext != "*.*" && ext.Length > 0)
                        result.AddRange(ext.Split(';'));
                }
            return result;
        }

        static bool building;

        public static bool IsBuilding { get => building; }

        public static void RaiseEventStartBuild()
        {
            ThreadService.AssertMainThread();
            building = true;
            StartBuild?.Invoke(null, EventArgs.Empty);
        }

        public static void RaiseEventEndBuild(BuildEventArgs e)
        {
            ThreadService.AssertMainThread();
            building = false;
            EndBuild?.Invoke(null, e);
        }

        /// <summary>
        /// Zjištění, zda soubor s uvedeným názvěm je položkou sestavení
        /// </summary>
        /// <param name="filePath">úplný název souboru</param>
        /// <returns>TRUE - soubor je v sestavení</returns>
        internal static bool IsSolutionItem(string filePath)
        {
            if (OpenSolution == null || string.IsNullOrEmpty(filePath))
                return false;

            foreach (IProject project in OpenSolution.Projects)
            {
                if (!string.IsNullOrEmpty(project.FileName)
                    && project.FileName.Equals(filePath, StringComparison.OrdinalIgnoreCase))
                    return true;

                if (project.Items.FirstOrNull(itm => itm.FileName.Equals(filePath, StringComparison.OrdinalIgnoreCase)) != null)
                    return true;
            }

            return OpenSolution.FileName.Equals(filePath, StringComparison.OrdinalIgnoreCase);
        }

        /// <summary>
        /// znovu načtení otevřeného sestavení
        /// </summary>
        /// <param name="fileName">cesta k sestavení</param>
        internal static void ReloadSolution(string fileName = null)
        {
            CloseSolution(false);

            if (OpenSolution != null && string.IsNullOrEmpty(fileName))
                fileName = OpenSolution.FileName;

            isSolutionLoading = true;
            if (!Path.IsPathRooted(fileName))
                throw new ArgumentException("LoadSolution:" + GResources.GetResourceText(29450413)); //RC 29450413 : Složka musí existovat!

            OnSolutionLoading(fileName);

            SolutionBindingService.ReloadSolution(OpenSolution);

            AbstractProject.filesToOpenAfterSolutionLoad.Clear();
            try
            {
                string file = GetPreferenceFileName(fileName);
                if (FileUtility.IsValidPath(file) && File.Exists(file))
                    (openSolution.Preferences as IMementoCapable).SetMemento(Property.Load(file));
                else
                    (openSolution.Preferences as IMementoCapable).SetMemento(new Property());
            }
            catch (Exception ex) { MessageService.ShowError(ex); }

            try { ApplyConfigurationAndReadPreferences(); }
            catch (Exception ex) { MessageService.ShowError(ex); }

            // vytvoření obsahu pro řešení
            ParserService.OnSolutionLoaded();
            OnSolutionLoaded(new SolutionEventArgs(openSolution));
            isSolutionLoading = false;
        }

        /// <summary>
        /// kompletace souborů sestavení
        /// </summary>
        internal static void CompletSolution()
        {
            // uložení samotného sestavení
            string outputDirectory = Path.GetDirectoryName(ProjectService.OpenSolution.FileName);
            if (!Directory.Exists(outputDirectory))
                Directory.CreateDirectory(outputDirectory);
            if (Directory.Exists(ProjectService.OpenSolution.TemporaryDir))
            {
                FileAgent.RemoveFile(ProjectService.OpenSolution.FileName, false);
                GZip.Zip(Path.Combine(ProjectService.OpenSolution.TemporaryDir, "*.*"), ProjectService.OpenSolution.FileName);
                FileAgent.RecentOpen.AddLastProject(ProjectService.OpenSolution.FileName);
            }
        }
        /// <summary>
        /// načtení sestavení dle otevřeného souboru
        /// </summary>
        /// <param name="openedFile">otevřený soubor pro sestavení</param>
        internal static void LoadSolutionOrProject(OpenedFile openedFile)
        {
            if (FileUtility.TestFileExists(openedFile.FileName))
                LoadSolutionOrProject(openedFile.FileName);
            else
            // se jedná o vytvořený soubor
            {

            }
        }
    }

    /// <summary>
    /// Argument kompilace
    /// </summary>
    class BuildEventArgs : EventArgs
    {
        /// <summary>
        /// Projekt/sestavení pro kompilací.
        /// </summary>
        public readonly IBuildable Buildable;

        /// <summary>
        /// Výsledek kompilace
        /// </summary>
        public readonly BuildResults Results;

        public BuildEventArgs(IBuildable buildable)
            : this(buildable, null)
        {
        }

        public BuildEventArgs(IBuildable buildable, BuildResults results)
        {
            this.Buildable = buildable ?? throw new ArgumentNullException("buildable");
            this.Results = results;
        }

        public BuildEventArgs(BuildResults results)
        {
            this.Results = results;
        }
    }
}
