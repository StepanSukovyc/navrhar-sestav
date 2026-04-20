//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.FileServiceOpenedFile.cs              </Name>
//    <Description> Služba pro práci s otevřenými soubory                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2026                            </Copyright>
//    <Created>     2013-02-11                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Diagnostics;
using Gordic.Gfe.FormFiller.Gui;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.General;

namespace Gordic.Gfe.FormFiller
{
    /// <summary>
    /// Služba pro práci s otevřenými soubory
    /// </summary>
    sealed class FileServiceOpenedFile : OpenedFile
    {
        List<IViewContent> registeredViews = new List<IViewContent>();
        FileChangeWatcher fileChangeWatcher;

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
        /// Vytvoření nové instane třídy
        /// </summary>
        /// <param name="fileName">úplná cesta k souboru</param>
        internal FileServiceOpenedFile(string fileName)
        {
            this.FileName = fileName;
            IsUntitled = false;
            fileChangeWatcher = new FileChangeWatcher(this);
        }

        /// <summary>
        /// Vytvoření nové instance třídy dle obsahu pohledu
        /// </summary>
        /// <param name="fileData">Obsah souboru</param>
        internal FileServiceOpenedFile(byte[] fileData)
        {
            this.FileName = null;
            SetData(fileData);
            IsUntitled = true;
            MakeDirty();
            fileChangeWatcher = new FileChangeWatcher(this);
        }

        /// <summary>
        /// Pro účely DOM objektů
        /// </summary>
        public FileServiceOpenedFile()
        {
            // TODO: Complete member initialization
        }

        /// <summary>
        /// Seznam pohledu na obbsah registrovaných tímto otevřeným souborem
        /// </summary>
        public override IList<IViewContent> RegisteredViewContents => registeredViews.AsReadOnly();
        /// <summary>
        /// Inicializace pohledu
        /// </summary>
        /// <param name="view">Pohled k inicializací</param>
        public override void ForceInitializeView(IViewContent view)
        {
            if (view == null)
                throw new ArgumentNullException("view");
            if (!registeredViews.Contains(view))
                throw new ArgumentException("registeredViews " + GResources.GetResourceText(29450085)); //RC 29450085 : musí obsahovat uvedený pohled!

            base.ForceInitializeView(view);
        }

        /// <summary>
        /// Regstrace pohledu
        /// </summary>
        /// <param name="view">Pohled k registraci</param>
        public override void RegisterView(IViewContent view)
        {
            if (view == null)
                throw new ArgumentNullException("view");
            if (registeredViews.Contains(view))
                throw new ArgumentException("registeredViews " + GResources.GetResourceText(29450086)); //RC 29450086 : již obsahuje uvedený pohled!

            registeredViews.Add(view);

            if (SimpleDesktop.Desktop != null)
            {
                SimpleDesktop.Desktop.ActiveViewContentChanged += DesktopActiveViewContentChanged;
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
                return;

            Debug.Assert(registeredViews.Contains(view));

            if (SimpleDesktop.Desktop != null)
                SimpleDesktop.Desktop.ActiveViewContentChanged -= DesktopActiveViewContentChanged;

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
            }
        }

        void DesktopActiveViewContentChanged(object sender, EventArgs e)
        {
            IViewContent newView = SimpleDesktop.Desktop.ActiveViewContent;

            if (!registeredViews.Contains(newView))
                return;

            // Pokusíme se přepnout na nový view
            if (!SwitchedToView(newView))
            {
                // Přepnutí bylo zablokováno - vrátíme focus na původní view
                if (currentView != null && currentView.DesktopWindow != null)
                {
                    // Vracíme aktivaci na původní view
                    currentView.DesktopWindow.ActiveViewContent = currentView;
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
                SaveToDisk(FileAgent.SaveUsingTemporaryFile);
            }
            finally
            {
                if (fileChangeWatcher != null)
                    fileChangeWatcher.Enabled = true;
            }
        }
    }
}
