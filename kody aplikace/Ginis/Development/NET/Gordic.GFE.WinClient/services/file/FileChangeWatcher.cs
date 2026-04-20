//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.FileChangeWatcher.cs                     </Name>
//    <Description> Hlídání změn souboru                                        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.Gui;
using Gordic.General;
using Gordic.GFE.WinClient.ProjectBrowser;
using Gordic.GFE.WinClient.Project;

namespace Gordic.GFE.WinClient.Services
{
    /// <summary>
    /// Hlídání změn souboru
    /// </summary>
    sealed class FileChangeWatcher : IDisposable
    {
        #region IDisposable
        /// <summary>
        /// Uvolnění objektu
        /// </summary>
        public void Dispose()
        {
            ThreadService.AssertMainThread();
            activeWatchers.Remove(this);
            if (file != null)
            {
                SimpleDesktop.MainForm.Activated -= mf_Activated;
                SimpleDesktop.Desktop.ActiveContentChanged -= d_ActiveContentChanged;
                FileUtility.FileSaved -= FileUtility_FileSaved;
                file.FileNameChanged -= file_FileNameChanged;
                file = null;
            }
            if (watcher != null)
            {
                watcher.Dispose();
                watcher = null;
            }
        }
        #endregion

        bool enabled = true;
        /// <summary>
        /// Pozorovátel je povolen nebo není
        /// </summary>
        public bool Enabled
        {
            get { return enabled; }
            set
            {
                enabled = value;
                SetWatcher();
            }
        }

        /// <summary>
        /// Indikuje, zda je zapotřebí hlídat externí změny
        /// </summary>
        public static bool DetectExternalChangesOption
        {
            get { return PropertyService.Get("ReportDesigner.FileChangeWatcher.DetectExternalChanges", true); }
            set
            {
                ThreadService.AssertMainThread();
                PropertyService.Set("ReportDesigner.FileChangeWatcher.DetectExternalChanges", value);
                foreach (FileChangeWatcher watcher in activeWatchers)
                    watcher.SetWatcher();
            }
        }
        /// <summary>
        /// Automatické načtení externích změn
        /// </summary>
        public static bool AutoLoadExternalChangesOption
        {
            get { return PropertyService.Get("ReportDesigner.FileChangeWatcher.AutoLoadExternalChanges", true); }
            set { PropertyService.Set("ReportDesigner.FileChangeWatcher.AutoLoadExternalChanges", value); }
        }

        static HashSet<FileChangeWatcher> activeWatchers = new HashSet<FileChangeWatcher>();
        static int globalDisableCount;

        FileSystemWatcher watcher;
        OpenedFile file;
        bool wasChangedExternally = false, fileSaved = false;

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="file">Otevřený soubor pozorovaného</param>
        public FileChangeWatcher(OpenedFile file)
        {
            if (file == null)
                throw new ArgumentNullException(GResources.GetResourceText(29451515));
            this.file = file;
            SimpleDesktop.MainForm.Activated += mf_Activated;
            SimpleDesktop.Desktop.ActiveContentChanged += d_ActiveContentChanged;
            file.FileNameChanged += file_FileNameChanged;
            FileUtility.FileSaved += FileUtility_FileSaved;
            activeWatchers.Add(this);
            SetWatcher();
        }

        void FileUtility_FileSaved(object sender, FileNameEventArgs e)
        {
            if (isConfigFile(e.FileName))
            {
                // pokud se nejedná přímo o soubor projektu (např. otevřeno SRZ a uložen byl SSR)
                // pak uložíme i SRZ
                if (!ProjectService.OpenSolution.FileName.Equals(e.FileName, StringComparison.OrdinalIgnoreCase))
                    ProjectService.CompletSolution();
                fileSaved = true;
            }
        }

        bool isConfigFile(string fileName)
        {
            return ProjectService.OpenSolution != null
                && (ProjectService.OpenSolution.FileName.Equals(fileName, StringComparison.OrdinalIgnoreCase)
                    || (ProjectService.CurrentProject != null && ProjectService.CurrentProject.FileName.Equals(fileName, StringComparison.OrdinalIgnoreCase)));
        }

        void file_SavedToDisk() { fileSaved = true; }
        void d_ActiveContentChanged(object sender, EventArgs e)
        {
            if (!ProjectService.IsSolutionLoading
                && SimpleDesktop.Desktop.ActiveContent is ProjectBrowserPad
                && fileSaved)
            {
                if (isConfigFile(file.FileName))
                {
                    string message = string.Format(GResources.GetResourceText(29451516) + "\n{0}\n" + GResources.GetResourceText(29451517), Path.GetFileName(file.FileName)); //RC 29450220 : Soubor
                    if (MessageBox.Show(message,
                                   GResources.GetResourceText(29450306), //RC 29450306 : Návrhář sestav
                                   MessageBoxButtons.YesNo,
                                   MessageBoxIcon.Question) == DialogResult.Yes)
                        ProjectService.ReloadSolution();
                }

                fileSaved = false;
            }
        }

        /// <summary>
        /// Zakázat pozorování změn
        /// </summary>
        public static void DisableAllChangeWatchers()
        {
            ThreadService.AssertMainThread();
            globalDisableCount++;
            foreach (FileChangeWatcher w in activeWatchers)
                w.SetWatcher();
        }
        /// <summary>
        /// Povolení pozorování změn
        /// </summary>
        public static void EnableAllChangeWatchers()
        {
            ThreadService.AssertMainThread();
            if (globalDisableCount == 0)
                throw new InvalidOperationException();
            globalDisableCount--;
            foreach (FileChangeWatcher w in activeWatchers)
                w.SetWatcher();
        }

        void SetWatcher()
        {
            ThreadService.AssertMainThread();

            if (watcher != null)
                watcher.EnableRaisingEvents = false;

            if (!enabled)
                return;
            if (globalDisableCount > 0)
                return;
            if (!DetectExternalChangesOption)
                return;

            string fileName = file.FileName;
            if (string.IsNullOrEmpty(fileName))
                return;
            if (FileUtility.IsUrl(fileName))
                return;
            if (!Path.IsPathRooted(fileName))
                return;

            try
            {
                if (watcher == null)
                {
                    watcher = new FileSystemWatcher();
                    watcher.SynchronizingObject = SimpleDesktop.MainForm;
                    watcher.Changed += OnFileChangedEvent;
                    watcher.Created += OnFileChangedEvent;
                    watcher.Renamed += OnFileChangedEvent;
                }
                watcher.Path = Path.GetDirectoryName(fileName);
                watcher.Filter = Path.GetFileName(fileName);
                watcher.EnableRaisingEvents = true;
            }
            catch (PlatformNotSupportedException)
            {
                if (watcher != null)
                    watcher.Dispose();
                watcher = null;
            }
        }
        void OnFileChangedEvent(object sender, FileSystemEventArgs e)
        {
            if (file == null)
                return;
            LoggingService.DebugFormatted(GResources.GetResourceText(29450220) + " '{0}' " + GResources.GetResourceText(29450562) + ": '{1}'", file.FileName, e.ChangeType); //RC 29450220 : Soubor
            if (!wasChangedExternally)
            {
                wasChangedExternally = true;
                if (SimpleDesktop.Desktop.IsActiveWindow)
                    ThreadService.CallLater(500, delegate { mf_Activated(this, EventArgs.Empty); });
            }
        }
        void file_FileNameChanged(object sender, EventArgs e) { SetWatcher(); }
        void mf_Activated(object sender, EventArgs e)
        {
            if (wasChangedExternally)
            {
                wasChangedExternally = false;

                if (file == null)
                    return;

                string fileName = file.FileName;
                if (!File.Exists(fileName))
                    return;

                string message = StringParser.Parse(GResources.GetResourceText(29450220) + "\n${File}\n" + GResources.GetResourceText(29450563), new string[,] { { "File", Path.GetFullPath(fileName) } }); //RC 29450220 : Soubor
                if ((AutoLoadExternalChangesOption && file.IsDirty == false)
                    || MessageBox.Show(message,
                                       GResources.GetResourceText(29450306), //RC 29450306 : Návrhář sestav
                                       MessageBoxButtons.YesNo,
                                       MessageBoxIcon.Question) == DialogResult.Yes)
                {
                    if (File.Exists(fileName))
                        file.ReloadFromDisk();
                }
                else
                    file.MakeDirty();
            }
        }
    }
}
