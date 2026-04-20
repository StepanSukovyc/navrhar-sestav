//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.FileServiceOpenedFile.cs                 </Name>
//    <Description> Služba pro práci s otevřenými soubory                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-03-01                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.General;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Služba pro práci s otevřenými soubory
    /// </summary>
    sealed class FileServiceOpenedFile : OpenedFile
    {
        List<IViewContent> registeredViews = new List<IViewContent>();

        /// <summary>
        /// Změna názvu souboru
        /// </summary>
        /// <param name="newValue">Nový název souboru</param>
        protected override void ChangeFileName(string newValue)
        {
            FileService.OpenedFileFileNameChange(this, this.FileName, newValue);
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
        }
        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
            if (disposing)
            {
                if (registeredViews.Count > 0)
                    LoggingService.Error("Nejsou odregistrovány všechny pohledy!");
                registeredViews.Clear();
            }
            FileService.OpenedFileClosed(this);        
        }

        ///// <summary>
        ///// Vytvoření nové instance třídy dle obsahu pohledu
        ///// </summary>
        ///// <param name="fileData">Obsah souboru</param>
        //internal FileServiceOpenedFile(byte[] fileData)
        //{
        //    this.FileName = null;
        //    SetData(fileData);
        //    IsUntitled = true;
        //    MakeDirty();
        //}

        ///// <summary>
        ///// Pro účely DOM objektů
        ///// </summary>
        //public FileServiceOpenedFile()
        //{
        //    // TODO: Complete member initialization
        //}

        /// <summary>
        /// Seznam pohledu na obbsah registrovaných tímto otevřeným souborem
        /// </summary>
        public override IList<IViewContent> RegisteredViewContents
        {
            get { return registeredViews.AsReadOnly(); }
        }
        /// <summary>
        /// Inicializace pohledu
        /// </summary>
        /// <param name="view">Pohled k inicializací</param>
        public override void ForceInitializeView(IViewContent view)
        {
            if (view == null)
                throw new ArgumentNullException(GResources.GetResourceText(29450336)); //RC 29450336 : Pohled nelze inicializovat - není daný!
            if (!registeredViews.Contains(view))
                throw new ArgumentException(GResources.GetResourceText(29450337)); //RC 29450337 : Pohled nelze inicializovat - není v seznamu registrovaných pohledů!

            base.ForceInitializeView(view);
        }

        /// <summary>
        /// Regstrace pohledu
        /// </summary>
        /// <param name="view">Pohled k registraci</param>
        public override void RegisterView(IViewContent view)
        {
            if (view == null)
                throw new ArgumentNullException(GResources.GetResourceText(29450338)); //RC 29450338 : Pohled nelze registrovat - není daný!
            if (registeredViews.Contains(view))
                throw new ArgumentException(GResources.GetResourceText(29450339)); //RC 29450339 : Pohled nelze registrovat - ji6 se nachází v seznamu registrovaných pohledů!

            registeredViews.Add(view);
        }
        /// <summary>
        /// Zrušení registrace uvedeného pohledu
        /// </summary>
        /// <param name="view">Daný pohled</param>
        public override void UnregisterView(IViewContent view)
        {
            if (view == null)
            {
                LoggingService.Error(GResources.GetResourceText(29450340)); //RC 29450340 : Pohled nelze odregistrovat - není daný!
                return;
            }
            if (!registeredViews.Contains(view))
            {
                LoggingService.Error(GResources.GetResourceText(29450341)); //RC 29450341 : Pohled nelze odregistrovat - není v seznamu registrovaných pohledů!
                return;
            }

            registeredViews.Remove(view);
            if (currentView == view)
                currentView = null;
        }

        /// <summary>
        /// Uložení souboru na disk
        /// </summary>
        public override void SaveToDisk()
        {
            try { SaveToDisk(true); }
            catch { MessageService.ShowError(GResources.GetResourceText(29450342)); } //RC 29450342 : Chyba uložení!
        }
    }
}
