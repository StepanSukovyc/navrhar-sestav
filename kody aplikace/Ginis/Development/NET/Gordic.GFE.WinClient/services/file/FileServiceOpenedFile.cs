//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.FileServiceOpenedFile.cs               </Name>
//    <Description> Služba pro práci s otevřenými soubory                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using Gordic.General;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.Parsers;

namespace Gordic.GFE.WinClient.Services
{
    /// <summary>
    /// Služba pro práci s otevřenými soubory
    /// </summary>
    sealed class FileServiceOpenedFile : OpenedFile, IDisposable
    {
        #region IDisposable

        /// <summary>
        /// uvolnění objektu
        /// </summary>
        /// <param name="disposing">indikace uvolnění</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (fileChangeWatcher != null)
                {
                    fileChangeWatcher.Dispose();
                    fileChangeWatcher = null;
                }

                if (dirChangeWatcher != null)
                {
                    dirChangeWatcher.Dispose();
                    dirChangeWatcher = null;
                }
            }
            base.Dispose(disposing);
        }
        #endregion
        List<IViewContent> registeredViews = new List<IViewContent>();
        /// <summary>
        /// Seznam pohledu na obbsah registrovaných tímto otevřeným souborem
        /// </summary>
        public override IList<IViewContent> RegisteredViewContents => registeredViews.AsReadOnly();

        FileChangeWatcher fileChangeWatcher;
        DirectoryChangeWatcher dirChangeWatcher;
        object syncRoot = new object();

        /// <summary>
        /// Vytvoření nové instane třídy
        /// </summary>
        /// <param name="fileName">úplná cesta k souboru</param>
        internal FileServiceOpenedFile(string fileName)
        {
            FileName = fileName;
            IsUntitled = false;
            fileChangeWatcher = new FileChangeWatcher(this);
            dirChangeWatcher = new DirectoryChangeWatcher(this);
        }
        /// <summary>
        /// Vytvoření nové instance třídy dle obsahu pohledu
        /// </summary>
        /// <param name="fileData">Obsah souboru</param>
        internal FileServiceOpenedFile(byte[] fileData)
        {
            FileName = null;
            SetData(fileData);
            IsUntitled = true;
            MakeDirty();
            fileChangeWatcher = new FileChangeWatcher(this);
            dirChangeWatcher = new DirectoryChangeWatcher(this);
        }

        /// <summary>
        /// Změna názvu souboru
        /// </summary>
        /// <param name="newValue">Nový název souboru</param>
        protected override void ChangeFileName(string newValue)
        {
            FileAgent.OpenedFileFileNameChange(this, this.FileName, newValue);
            base.ChangeFileName(newValue);
        }
        
        /// <summary>
        /// Inicializace pohledu
        /// </summary>
        /// <param name="view">Pohled k inicializací</param>
        public override void ForceInitializeView(IViewContent view)
        {
            if (view == null)
                throw new ArgumentNullException(GResources.GetResourceText(29450564)); //RC 29450564 : Pohled nelze inicializovat - není daný!
            if (!registeredViews.Contains(view))
                throw new ArgumentException(GResources.GetResourceText(29450565)); //RC 29450565 : Pohled nelze inicializovat - není v seznamu registrovaných pohledů!

            base.ForceInitializeView(view);
        }
        /// <summary>
        /// Regstrace pohledu
        /// </summary>
        /// <param name="view">Pohled k registraci</param>
        public override void RegisterView(IViewContent view)
        {
            if (view == null)
                throw new ArgumentNullException(GResources.GetResourceText(29450566)); //RC 29450566 : Pohled nelze registrovat - není daný!
            if (registeredViews.Contains(view))
                throw new ArgumentException(GResources.GetResourceText(29450567)); //RC 29450567 : Pohled nelze registrovat - se již nachází v seznamu registrovaných pohledů!

            registeredViews.Add(view);

            if (SimpleDesktop.Desktop != null)
            {
                SimpleDesktop.Desktop.ActiveViewContentChanged += DesktopAVCChanged;
                if (SimpleDesktop.Desktop.ActiveViewContent == view)
                    SwitchedToView(view);
            }
        }
        /// <summary>
        /// Zrušení registrace uvedeného pohledu
        /// </summary>
        /// <param name="view">Daný pohled</param>
        public override void UnregisterView(IViewContent view)
        {
            if (view == null)
            {
                LoggingService.Error(GResources.GetResourceText(29450568)); //RC 29450568 : Pohled nelze odregistrovat - není daný!
                return;
            }
            if (!registeredViews.Contains(view))
            {
                LoggingService.Error(GResources.GetResourceText(29450569)); //RC 29450569 : Pohled nelze odregistrovat - není v seznamu registrovaných pohledů!
                return;
            }

            if (SimpleDesktop.Desktop != null)
                SimpleDesktop.Desktop.ActiveViewContentChanged -= DesktopAVCChanged;

            registeredViews.Remove(view);
            if (registeredViews.Count > 0)
            {
                if (currentView == view)
                    currentView = null;
            }
            else
                // zavřeme všechny pohledy na soubor
                CloseIfAllViewsClosed();
        }
        /// <summary>
        /// Zavření všech pohledů na soubor
        /// </summary>
        public override void CloseIfAllViewsClosed()
        {
            if (registeredViews.Count == 0)
            {
                FileAgent.OpenedFileClosed(this);

                if (fileChangeWatcher != null)
                {
                    fileChangeWatcher.Dispose();
                    fileChangeWatcher = null;
                }
                if (dirChangeWatcher != null)
                {
                    dirChangeWatcher.Dispose();
                    dirChangeWatcher = null;
                }
            }
        }
        /// <summary>
        /// Uložení souboru na disk
        /// </summary>
        public override void SaveToDisk()
        {
            try
            {
                if (fileChangeWatcher != null)
                    fileChangeWatcher.Enabled = false;
                if (dirChangeWatcher != null)
                    dirChangeWatcher.Enabled = false;
                SaveToDisk(FileAgent.SaveUsingTemporaryFile);
            }
            finally
            {
                if (dirChangeWatcher != null)
                    dirChangeWatcher.Enabled = true;
                if (fileChangeWatcher != null)
                    fileChangeWatcher.Enabled = true;
            }
        }
        /// <summary>
        /// kopírování pomocných souboru v archivu (*.zip) do určeného umístění
        /// </summary>
        /// <param name="oldName">starý název sestavy</param>
        public override void CopyArchive(string oldName)
        {
            try
            {
                if (fileChangeWatcher != null)
                    fileChangeWatcher.Enabled = false;
                if (dirChangeWatcher != null)
                    dirChangeWatcher.Enabled = false;
                base.CopyArchive(oldName);
            }
            finally
            {
                if (fileChangeWatcher != null)
                    fileChangeWatcher.Enabled = true;
                if (dirChangeWatcher != null)
                    dirChangeWatcher.Enabled = true;
            }
        }

        void DesktopAVCChanged(object sender, EventArgs e)
        {
            ThreadService.SafeThreadAsyncCall(delegate
            {
                lock (syncRoot)
                {
                    IViewContent newView = SimpleDesktop.Desktop.ActiveViewContent;

                    if (registeredViews.Contains(newView))
                    {
                        // Pokusíme se přepnout na nový view
                        if (!SwitchedToView(newView))
                        {
                            // Přepnutí bylo zablokováno - vrátíme focus na původní view
                            if (currentView != null && currentView.DesktopWindow != null)
                            {
                                ThreadService.SafeThreadCall(delegate
                                {
                                    // Vracíme aktivaci na původní view
                                    currentView.DesktopWindow.ActiveViewContent = currentView;
                                });
                            }
                        }
                    }
                }
            });
        }
    }
}
