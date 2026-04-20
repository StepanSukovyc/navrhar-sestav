//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.directorychangewatcher.cs              </Name>
//    <Description> hlídání změn obsahu složky                                  </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-03-04                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.Gui;
using System;
using System.Collections.Generic;
using System.IO;

namespace Gordic.GFE.WinClient.Services
{
    /// <summary>
    /// hlídání změn obsahu složky
    /// </summary>
    sealed class DirectoryChangeWatcher : IDisposable
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
                SimpleDesktop.MainForm.Activated -= MainForm_Activated;
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

        static HashSet<DirectoryChangeWatcher> activeWatchers = new HashSet<DirectoryChangeWatcher>();

        FileSystemWatcher watcher;
        OpenedFile file;
        bool wasChangedExternally = false;

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="file">Otevřený soubor, dočasná složka kterého bude pozorováná</param>
        public DirectoryChangeWatcher(OpenedFile file)
        {
            if (file == null)
                throw new ArgumentNullException(GResources.GetResourceText(29451515));
            this.file = file;
            SimpleDesktop.MainForm.Activated += MainForm_Activated;
            activeWatchers.Add(this);
            SetWatcher();
        }

        void SetWatcher()
        {
            ThreadService.AssertMainThread();

            if (watcher != null)
                watcher.EnableRaisingEvents = false;

            if (!enabled)
                return;

            string dirName = file.TemporaryDirectory.Path;
            if (string.IsNullOrEmpty(dirName))
                return;
            if (!Directory.Exists(dirName))
                return;

            try
            {
                if (watcher == null)
                {
                    watcher = new FileSystemWatcher(dirName);
                    watcher.SynchronizingObject = SimpleDesktop.MainForm;
                    watcher.Changed += OnDirectoryChangedEvent;
                    watcher.Deleted += OnDirectoryChangedEvent;
                }
                watcher.Path = dirName;
                watcher.EnableRaisingEvents = true;
            }
            catch (PlatformNotSupportedException)
            {
                if (watcher != null)
                    watcher.Dispose();
                watcher = null;
            }
        }
        void OnDirectoryChangedEvent(object sender, FileSystemEventArgs e)
        {
            if (file == null)
                return;

            //TODO - LoggingService.DebugFormatted(GResources.GetResourceText(29451518), file.TemporaryDirectory.Path);
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

                file.MakeDirty();
                LinkedFiles.LinkedFilesPad.Instance.Refresh(file);
            }
        }

    }
}
