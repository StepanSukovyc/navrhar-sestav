//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.Solution.cs                            </Name>
//    <Description> Řešení                                                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using Gordic.GFE.Parsers.AddIns.Project;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Services;
using Gordic.General;
using System.Diagnostics;
using Gordic.Report.Interface;

namespace Gordic.GFE.WinClient.Project
{
    /// <summary>
    /// Řešení
    /// </summary>
    class Solution : SolutionFolder, IDisposable, ISolutionFolderProperties
    {
        #region IDisposable
        /// <summary>
        /// Uvolnění objektu
        /// </summary>
        public void Dispose()
        {
            foreach (IProject project in Projects)
                project.Dispose();
        }
        #endregion

        #region ISolutionFolderProperties
        /// <summary>
        /// lze vytvořít archivní soubor
        /// </summary>
        public virtual bool CanCreateArchive { get { return false; } }

        /// <summary>
        /// pomocný objekt sestavení
        /// </summary>
        public object Tag { get; set; }

        /// <summary>
        /// indikátor přítomnosti vlastnosti sestavení
        /// </summary>
        public virtual bool ShowOptions { get { return true; } }

        /// <summary>
        /// vytvoření archivního balíčku
        /// </summary>
        public virtual void CreateArchive() { }
        /// <summary>
        /// indikuje spustitelnost sestavení
        /// </summary>
        public virtual bool IsRunable { get { return Preferences != null && (Preferences.StartupTool != null || Preferences.StartupByOS); } }

        /// <summary>
        /// spuštění sestavení
        /// </summary>
        public virtual bool Run()
        {
            try
            {
                OnBeforeRun();

                if (Preferences.StartupTool != null)
                {
                    string command = Preferences.StartupTool.Command, args = Preferences.StartupTool.Arguments;

                    try
                    {
                        command = StringParser.Parse(Preferences.StartupTool.Command);
                        args = StringParser.Parse(Preferences.StartupTool.Arguments);
                    }
                    catch (Exception ex)
                    {
                        MessageService.ShowError(GResources.GetResourceText(29450430) + "'" + ex.Message + "'!"); //RC 29450430 : Spuštění nástroje selhalo
                        return false;
                    }

                    try
                    {
                        ProcessStartInfo startinfo;
                        startinfo = args == null || args.Length == 0 || args.Trim('"', ' ').Length == 0 ? new ProcessStartInfo(command) : new ProcessStartInfo(command, args);
                        startinfo.WorkingDirectory = StringParser.Parse(Preferences.StartupTool.InitialDirectory);
                        Process process = new Process
                        {
                            StartInfo = startinfo
                        };
                        process.Start();
                        return true;
                    }
                    catch (Exception ex)
                    {
                        MessageService.ShowError(GResources.GetResourceText(29450430) + "'" + command + " " + args + "'\n" + ex.Message + '!'); //RC 29450430 : Spuštění nástroje selhalo
                    }
                }

                return false;
            }
            catch (GReportAbortException ex)
            {
                if (ex.ShortMessage != "-") MessageService.ShowError(ex.ShortMessage);
                return true; //a vysledek uz nezobrazuju
            }
            catch (Exception ex)
            {
                MessageService.ShowError(GResources.GetResourceText(29450231) + ":\n" + ex.Message); //RC 29450231 : Sestavení nelze spustit
                return true; //a vysledek uz nezobrazuju
            }
        }

        /// <summary>
        /// volání před spuštěním externí funkce nad projektem
        /// </summary>
        protected virtual void OnBeforeRun()
        {
            foreach (var item in Projects)
                item.Save(false);
        }
        #endregion

        /// <summary>
        /// Volá se po načtení řešení
        /// </summary>
        public event EventHandler<EventArgs> AfterLoaded;

        /// <summary>
        /// dočasná složka sestavení
        /// </summary>
        public string TemporaryDir { get; set; }

        /// <summary>
        /// Projekty řešení
        /// </summary>
        [Browsable(false)]
        public IEnumerable<IProject> Projects
        {
            get
            {
                Stack<ISolutionFolder> stack = new Stack<ISolutionFolder>();
                Folders.ForEach(item => stack.Push(item));

                while (stack.Count > 0)
                {
                    ISolutionFolder currentFolder = stack.Pop();

                    if (currentFolder is IProject project)
                        yield return project;

                    if (currentFolder is ISolutionFolderContainer currentContainer)
                        currentContainer.Folders.ForEach(item => stack.Push(item));
                }
            }
        }

        internal void RenameProject(IProject project)
        {
            this.FileName = project.FileName;
            Name = Path.GetFileNameWithoutExtension(fileName);
        }

        string fileName = String.Empty;
        /// <summary>
        /// Název souboru řešení
        /// </summary>
        [Browsable(false)]
        public string FileName
        {
            get { return fileName; }
            set { fileName = value; }
        }

        [Browsable(false)]
        public bool ReadOnly
        {
            get
            {
                try
                {
                    FileAttributes attributes = File.GetAttributes(fileName);
                    return ((FileAttributes.ReadOnly & attributes) == FileAttributes.ReadOnly);
                }
                catch (FileNotFoundException) { return false; }
                catch (DirectoryNotFoundException) { return true; }
            }
        }

        /// <summary>
        /// Složka projektu
        /// </summary>
        [Browsable(false)]
        public string Directory { get { return Path.GetDirectoryName(fileName); } }

        /// <summary>
        /// Složky řešení
        /// </summary>
        [Browsable(false)]
        public IEnumerable<ISolutionFolder> SolutionFolders
        {
            get
            {
                Stack<ISolutionFolder> stack = new Stack<ISolutionFolder>();
                Folders.ForEach(item => stack.Push(item));

                while (stack.Count > 0)
                {
                    ISolutionFolder currentFolder = stack.Pop();
                    yield return currentFolder;

                    if (currentFolder is ISolutionFolderContainer currentContainer)
                        currentContainer.Folders.ForEach(item => stack.Push(item));
                }
            }
        }

        readonly SolutionPreferences preferences;
        /// <summary>
        /// Preference sestavení
        /// </summary>
        [Browsable(false)]
        public SolutionPreferences Preferences { get { return preferences; } }

        /// <summary>
        /// Nadřazený projekt
        /// </summary>
        [Browsable(false)]
        public override Solution ParentSolution { get { return this; } }

        /// <summary>
        /// položky sestavení
        /// </summary>
        public override ProjectSection SolutionItems
        {
            get
            {
                foreach (SolutionFolder folder in Folders)
                    if (folder.Name == GResources.GetResourceText(29450418)) //RC 29450418 : položky sestavení
                        return folder.SolutionItems;

                SolutionFolder newFolder = CreateFolder(GResources.GetResourceText(29450418)); //RC 29450418 : položky sestavení
                return newFolder.SolutionItems;
            }
        }

        static Solution solutionBeingLoaded;
        /// <summary>
        /// sestavení k načtení
        /// </summary>
        public static Solution SolutionBeingLoaded { get { return solutionBeingLoaded; } }

        readonly Dictionary<string, ISolutionFolder> guidDictionary = new Dictionary<string, ISolutionFolder>();

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        public Solution()
        {
            preferences = new SolutionPreferences(this);
        }

        /// <summary>
        /// přidání složky do sestavení
        /// </summary>
        /// <param name="folder">přidávaná složka</param>
        public override void AddFolder(ISolutionFolder folder)
        {
            base.AddFolder(folder);
            if (folder.IdGuid != null)
                guidDictionary[folder.IdGuid] = folder;
        }

        /// <summary>
        /// Uložení řešení
        /// </summary>
        public void Save()
        {
            try
            {
                SolutionBindingService.SaveSolution(this);
                return;
            }
            catch (IOException ex)
            {
                MessageService.ShowErrorFormatted(GResources.GetResourceText(29450419) + " {0}:\n{1}!", fileName, ex.Message); //RC 29450419 : Nelze uložit
            }
            catch (UnauthorizedAccessException ex)
            {
                FileAttributes attributes = File.GetAttributes(fileName);
                if ((FileAttributes.ReadOnly & attributes) == FileAttributes.ReadOnly)
                    MessageService.ShowErrorFormatted(string.Join(" ", GResources.GetResourceText(29450421), "{0}!", GResources.GetResourceText(29450420)), fileName); //RC 29450421 : Nelze uložit soubor sestavení
                else
                    MessageService.ShowErrorFormatted
                        (GResources.GetResourceText(29450419) + " {0}:\n{1}\n\n" + GResources.GetResourceText(29450422), fileName, ex.Message); //RC 29450419 : Nelze uložit
            }
        }
        /// <summary>
        /// Uložení řešení s novým názvem
        /// </summary>
        /// <param name="fileName">úplný název řešení</param>
        public void Save(string fileName)
        {
            //this.fileName = fileName;
            //string outputDirectory = Path.GetDirectoryName(fileName);
            //if (!System.IO.Directory.Exists(outputDirectory))
            //    System.IO.Directory.CreateDirectory(outputDirectory);

            ////StringBuilder projectSection = new StringBuilder();
            ////StringBuilder nestedProjectsSection = new StringBuilder();

            //Stack<ISolutionFolder> stack = new Stack<ISolutionFolder>(Folders.Count);
            //for (int i = Folders.Count - 1; i >= 0; i--)
            //    stack.Push(Folders[i]);

            //while (stack.Count > 0)
            //{
            //    ISolutionFolder currentFolder = stack.Pop();
            //    if (currentFolder != null)
            //    {

            //    }
            //    //string relativeLocation;

            //    //if (currentFolder is IProject)
            //    //    currentFolder.Location = ((IProject)currentFolder).FileName;
            //    //if (Path.IsPathRooted(currentFolder.Location))
            //    //    relativeLocation = FileUtility.GetRelativePath(Path.GetDirectoryName(FileName), currentFolder.Location);
            //    //else
            //    //    relativeLocation = currentFolder.Location;

            //    //projectSection.AppendFormat
            //    //    ("Project = \"{0}\", \"{1}\", \"{2}\"",
            //    //     new object[] { currentFolder.Name, relativeLocation, currentFolder.IdGuid });
            //    //projectSection.AppendLine();
            //    //projectSection.Append("EndProject");
            //    //projectSection.Append(Environment.NewLine);
            //}

            //StringBuilder globalSection = new StringBuilder();
            //globalSection.Append("Global");
            //globalSection.Append(Environment.NewLine);
        }

        /// <summary>
        /// Načtení řešení
        /// </summary>
        /// <param name="fileName">cesta k souboru řešení</param>
        /// <param name="force">TRUE - v případě chyby konfiguračního souboru sestavení se nabídne oprava samotného konfiguračního souboru</param>
        /// <returns></returns>
        public static Solution Load(string fileName, bool force)
        {
            dynamic newSolution = null;

            Type type = SolutionBindingService.GetSolutionType(fileName);
            if (type != null)
                newSolution = Activator.CreateInstance(type);

            if (newSolution == null)
                newSolution = new Solution();

            solutionBeingLoaded = newSolution as Solution;
            newSolution.Name = Path.GetFileNameWithoutExtension(fileName);

            newSolution.fileName = fileName;

            try { if (!SolutionBindingService.SetupSolution(newSolution, force)) return null; }
            catch (ProjectLoadException ex)
            {
                LoggingService.Warning(GResources.GetResourceText(29450404), ex); //RC 29450404 : Chyba načtení projektu!
                MessageService.ShowError(ex.Message);
            }
            catch (Exception ex) { MessageService.ShowError(ex); }

            solutionBeingLoaded = null;
            return newSolution;
        }

        /// <summary>
        /// Vytvoření složky
        /// </summary>
        /// <param name="folderName">název složky</param>
        /// <returns></returns>
        public SolutionFolder CreateFolder(string folderName)
        {
            return new SolutionFolder(folderName, folderName, "{" + Guid.NewGuid().ToString().ToUpperInvariant() + "}");
        }

        /// <summary>
        /// nalezení projektu obsahujícího určitý soubor
        /// </summary>
        /// <param name="fileName">název souboru</param>
        /// <returns></returns>
        public IProject FindProjectContainingFile(string fileName)
        {
            IProject currentProject = ProjectService.CurrentProject;
            if (currentProject != null && currentProject.IsFileInProject(fileName))
                return currentProject;

            foreach (IProject project in Projects)
                if (project.IsFileInProject(fileName))
                    return project;
            return null;
        }

        /// <summary>
        /// získání složky sestavení dle jednozančného identifikátoru
        /// </summary>
        /// <param name="guid">identifikátor složky sestavení</param>
        /// <returns></returns>
        public ISolutionFolder GetSolutionFolder(string guid)
        {
            foreach (ISolutionFolder solutionFolder in SolutionFolders)
                if (solutionFolder.IdGuid == guid)
                    return solutionFolder;
            return null;
        }

        /// <summary>
        /// položka odstraněná
        /// </summary>
        /// <param name="pItem"></param>
        internal virtual void ProjectItemRemoved(FileProjectItem pItem)
        {
            if (File.Exists(pItem.FileName))
                FileAgent.RemoveFile(pItem.FileName, false);
        }

        internal void OnAfterLoaded()
        {
            AfterLoaded?.Invoke(this, EventArgs.Empty);
        }
    }
}
