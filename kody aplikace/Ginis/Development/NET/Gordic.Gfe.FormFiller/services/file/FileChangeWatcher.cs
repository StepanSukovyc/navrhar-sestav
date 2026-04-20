//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.FileChangeWatcher.cs                  </Name>
//    <Description> Hlídání změn souboru                                        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Windows.Forms;
using Gordic.Gfe.FormFiller.Gui;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Services;
using Gordic.General;

namespace Gordic.Gfe.FormFiller
{
    /// <summary>
    /// Hlídání změn souboru
    /// </summary>
    sealed class FileChangeWatcher : IDisposable
    {
        /// <summary>
        /// Indikuje, zda je zapotřebí hlídat externí změny
        /// </summary>
        public static bool DetectExternalChangesOption
        {
            get
            {
                return PropertyService.Get("FormFiller.FileChangeWatcher.DetectExternalChanges", true);
            }
            set
            {
                ThreadService.AssertMainThread();
                PropertyService.Set("FormFiller.FileChangeWatcher.DetectExternalChanges", value);
                foreach (FileChangeWatcher watcher in activeWatchers)
                    watcher.SetWatcher();
            }
        }
        /// <summary>
        /// Automatické načtení externích změn
        /// </summary>
        public static bool AutoLoadExternalChangesOption
        {
            get
            {
                return PropertyService.Get("FormFiller.FileChangeWatcher.AutoLoadExternalChanges", true);
            }
            set
            {
                PropertyService.Set("FormFiller.FileChangeWatcher.AutoLoadExternalChanges", value);
            }
        }

        static HashSet<FileChangeWatcher> activeWatchers = new HashSet<FileChangeWatcher>();

        static int globalDisableCount;
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

        FileSystemWatcher watcher;
        bool wasChangedExternally = false;
        OpenedFile file;
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="file">Otevřený soubor pozorovaného</param>
        public FileChangeWatcher(OpenedFile file)
        {
            this.file = file ?? throw new ArgumentNullException("file");
            SimpleDesktop.MainForm.Activated += MainForm_Activated;
            file.FileNameChanged += File_FileNameChanged;
            activeWatchers.Add(this);
            SetWatcher();
        }

        void File_FileNameChanged(object sender, EventArgs e)
        {
            SetWatcher();
        }

        /// <summary>
        /// Uvolnění objektu
        /// </summary>
        public void Dispose()
        {
            ThreadService.AssertMainThread();
            activeWatchers.Remove(this);
            if (file != null)
            {
                SimpleDesktop.MainForm.Activated -= MainForm_Activated;
                file.FileNameChanged -= File_FileNameChanged;
                file = null;
            }
            if (watcher != null)
            {
                watcher.Dispose();
                watcher = null;
            }
        }

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

        void SetWatcher()
        {
            ThreadService.AssertMainThread();

            if (watcher != null)
                watcher.EnableRaisingEvents = false;

            if (!enabled)
                return;
            if (globalDisableCount > 0)
                return;
            if (DetectExternalChangesOption == false)
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
                    watcher = new FileSystemWatcher
                    {
                        SynchronizingObject = SimpleDesktop.MainForm
                    };
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
                watcher?.Dispose();
                watcher = null;
            }
        }

        void OnFileChangedEvent(object sender, FileSystemEventArgs e)
        {
            if (file == null)
                return;
            LoggingService.DebugFormatted(GResources.GetResourceText(29450044) + " '{0}' " + GResources.GetResourceText(29450083) + ": '{1}'", file.FileName, e.ChangeType); //RC 29450044 : Soubor
            if (!wasChangedExternally)
            {
                wasChangedExternally = true;
                if (SimpleDesktop.Desktop.IsActiveWindow)
                    ThreadService.CallLater(500, delegate { MainForm_Activated(this, EventArgs.Empty); });
            }
        }

        void MainForm_Activated(object sender, EventArgs e)
        {
            if (wasChangedExternally)
            {
                wasChangedExternally = false;

                if (file == null)
                    return;

                string fileName = file.FileName;
                if (!File.Exists(fileName))
                    return;

                string message = StringParser.Parse(GResources.GetResourceText(29450044) + "\n${File}\n" + GResources.GetResourceText(29450084), new string[,] { { "File", Path.GetFullPath(fileName) } }); //RC 29450044 : Soubor
                if ((AutoLoadExternalChangesOption && file.IsDirty == false)
                    || MessageBox.Show(message,
                                       GResources.GetResourceText(29450032), //RC 29450032 : Prohlížeč formulářů
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
