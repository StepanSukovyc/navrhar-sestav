//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.BaseProject.cs                         </Name>
//    <Description> Základní projekt                                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-25                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.AddIns.Project;
using Gordic.GFE.WinClient.Project.Templates;
using Gordic.General;
using Gordic.GFE.WinClient.AddIns;
using Gordic.GFE.Parsers.Gui;
using System.Linq;

namespace Gordic.GFE.WinClient.Project
{
    /// <summary>
    /// Základní projekt
    /// </summary>
    class BaseProject : AbstractProject, IProjectItemListProvider
    {
        List<ProjectItem> items = new List<ProjectItem>();

        volatile ReadOnlyCollection<ProjectItem> itemsReadOnly;
        /// <summary>
        /// Seznam položek projektu
        /// </summary>
        public override ReadOnlyCollection<ProjectItem> Items
        {
            get
            {
                ReadOnlyCollection<ProjectItem> c = itemsReadOnly;
                if (c == null)
                {
                    lock (SyncRoot) { c = Array.AsReadOnly(items.ToArray()); }
                    itemsReadOnly = c;
                }
                return c;
            }
        }

        /// <summary>
        /// indikuje stav načítání
        /// </summary>
        protected bool isLoading;
        /// <summary>
        /// indikuje proces uložení
        /// </summary>
        protected bool isSaving;
        /// <summary>
        /// pomocný projekt sestavení
        /// </summary>
        protected TempProject project;

        /// <summary>
        /// vytvoření projektu dle dodatečných informaci
        /// </summary>
        /// <param name="information">informace o vytvářeném projektu</param>
        protected virtual void Create(ProjectCreateInformation information)
        {
            Name = information.ProjectName;
            FileName = information.OutputProjectFileName;
            base.IdGuid = "{" + Guid.NewGuid().ToString().ToUpperInvariant() + "}";
        }

        /// <summary>
        /// načtení projektu
        /// </summary>
        /// <param name="fileName">název projektu k načtení</param>
        protected IProject LoadProject(string fileName = "")
        {
            lock (SyncRoot)
            {
                isLoading = true;
                try { LoadProjectInternal(fileName); }
                finally { isLoading = false; }
            }
            return this;
        }
        /// <summary>
        /// interní načtení projektu
        /// </summary>
        /// <param name="fileName">název souboru projektu</param>
        protected virtual void LoadProjectInternal(string fileName)
        {
            if (!string.IsNullOrEmpty(fileName))
                this.FileName = fileName;
            base.IdGuid ="{" + Guid.NewGuid().ToString().ToUpperInvariant() + "}";
        }

        /// <summary>
        /// Přidání nové položky
        /// </summary>
        /// <param name="item">přidávaná položka projektu</param>
        /// <param name="fileNode">větev projektu</param>
        public virtual void AddProjectItem(ProjectItem item, AbstractFileTreeNode fileNode)
        {
            if (item == null)
                throw new ArgumentNullException("item");
            if (item.Project != this)
                throw new ArgumentException(GResources.GetResourceText(29450424), "item"); //RC 29450424 : položka nepatří tomuto projektu!

            ThreadService.AssertMainThread();

            lock (SyncRoot)
            {
                items.Add(item);
                itemsReadOnly = null;
            }
        }

        /// <summary>
        /// odstranění položky projektu
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        public virtual bool RemoveProjectItem(ProjectItem item)
        {
            if (item == null)
                throw new ArgumentNullException("item");
            if (item.Project != this)
                throw new ArgumentException(GResources.GetResourceText(29450424), "item"); //RC 29450424 : položka nepatří tomuto projektu!

            ThreadService.AssertMainThread();

            lock (SyncRoot)
            {
                if (items.Remove(item))
                {
                    itemsReadOnly = null;
                    return true;
                }
                else
                    throw new InvalidOperationException(GResources.GetResourceText(29450425)); //RC 29450425 : Očekává se, že položka je již přidaná do projektu!
            }
        }

        /// <summary>
        /// vytvoření interního seznamu položek
        /// </summary>
        internal void CreateItemsList()
        {
            ThreadService.AssertMainThread();
            lock (SyncRoot)
            {
                foreach (ProjectItem item in items)
                    item.Dispose();

                items.Clear();
                itemsReadOnly = null;

                foreach (ProjectSection item in ProjectSections.Cast<ProjectSection>())
                    items.Add(CreateProjectItem(item));
            }
        }
        /// <summary>
        /// Uložení projektu
        /// </summary>
        /// <param name="fileName">Název souboru projektu</param>
        /// <param name="changeDirty">TRUE - indikuje, že po uložení se nezmění stav souboru</param>
        public override void Save(string fileName, bool changeDirty)
        {
            isSaving = true;

            foreach (IViewContent content in Gui.SimpleDesktop.Desktop.ViewContentCollection)
                if (content.IsDirty && this.FindFile(content.PrimaryFileName) != null)
                    if (content is ICustomizedCommands commands)
                    {
                        commands.SaveCommand();
                        // pokud si nepřejeme měnit Stav souboru
                        if (!changeDirty)
                            content.PrimaryFile.IsDirty = true;
                    }
                    else
                        ContentService.Save(content, Gui.SimpleDesktop.MainForm);

            OnSaving(fileName);

            isSaving = false;
        }

        /// <summary>
        /// uložení dokumentu
        /// některé projekty potřebuji provést další operace
        /// </summary>
        /// <param name="fileName">název ukládaného souboru</param>
        protected virtual void OnSaving(string fileName) { }

        /// <summary>
        /// inicializace třídy
        /// </summary>
        public virtual IProject Initialize() { return this; }
        /// <summary>
        /// inicializace třídy dle parametrů
        /// </summary>
        /// <param name="names">parametry inicializace: první je název souboru projektu; druhý je název samotného projektu</param>
        public virtual IProject Initialize(params string[] names) { return Initialize(); }
        /// <summary>
        /// inicializace projektu dle informaci o projektu
        /// </summary>
        /// <param name="info">Informace potřebna pro vytvoření třídy</param>
        public virtual IProject Initialize(ProjectCreateInformation info) { return this; }
    }
}
