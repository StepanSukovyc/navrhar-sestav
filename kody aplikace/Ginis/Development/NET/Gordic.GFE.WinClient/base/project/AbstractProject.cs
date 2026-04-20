//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.AbstractProject.cs                     </Name>
//    <Description> Výchozí implementace rozhraní IProject.                     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Diagnostics;
using System.IO;
using System.Linq;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.AddIns.Project;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.ExternalList;
using Gordic.GFE.Parsers.Utils;

namespace Gordic.GFE.WinClient.Project
{
    /// <summary>
    /// Výchozí implementace rozhraní IProject.
    /// </summary>
    abstract class AbstractProject : AbstractSolutionFolder, IProject
    {
        #region IDisposable implementace
        bool isDisposed;
        /// <summary>
        /// Indikuje, že objekt je uvolněn
        /// </summary>
        [Browsable(false)]
        public bool IsDisposed { get { return isDisposed; } }
        /// <summary>
        /// událost po uvolnění objektu
        /// </summary>
        public event EventHandler Disposed;
        /// <summary>
        /// Uvolnění objektu
        /// </summary>
        public virtual void Dispose()
        {
            ThreadService.AssertMainThread();

            isDisposed = true;
            Disposed?.Invoke(this, EventArgs.Empty);
        }
        #endregion

        #region IMementoCapable implementace
        /// <summary>
        /// seznam souboru pro otevření po otevření řešení
        /// </summary>
        internal static List<string> filesToOpenAfterSolutionLoad = new List<string>();

        /// <summary>
        /// Uložení nastavení
        /// </summary>
        public virtual Property CreateMemento()
        {
            ThreadService.AssertMainThread();

            Property properties = new Property();
            List<string> files = new List<string>();
            foreach (string fileName in Gordic.GFE.WinClient.Services.FileAgent.GetOpenFiles())
                if (fileName != null && IsFileInProject(fileName))
                    files.Add(fileName.Split(Path.DirectorySeparatorChar).Last());
            properties.Set("files", files.ToArray());
            return properties;
        }

        /// <summary>
        /// Načtení nastavení
        /// </summary>
        /// <param name="memento">vlastsnoti</param>
        public virtual void SetMemento(Property memento)
        {
            ThreadService.AssertMainThread();

            foreach (string fileName in memento.Get("files", new string[0]))
                filesToOpenAfterSolutionLoad.Add(fileName);
        }
        #endregion

        #region Filename / Directory
        volatile string fileName;
        string cachedDirectoryName;

        /// <summary>
        /// Název souboru projektu
        /// </summary>
        [ReadOnly(true)]
        public string FileName
        {
            get { return fileName ?? ""; }
            set
            {
                ThreadService.AssertMainThread();
                Debug.Assert(Path.IsPathRooted(value));

                lock (SyncRoot)
                {
                    fileName = value;
                    cachedDirectoryName = null;
                }
            }
        }

        /// <summary>
        /// TRUE pokud soubor z konataineru je pouze pro čtení
        /// </summary>
        [ReadOnly(true)]
        public virtual bool ReadOnly
        {
            get
            {
                try
                {
                    FileAttributes attributes = File.GetAttributes(FileName);
                    return ((FileAttributes.ReadOnly & attributes) == FileAttributes.ReadOnly);
                }
                catch (FileNotFoundException) { return false; }
                catch (DirectoryNotFoundException) { return true; }
            }
        }

        /// <summary>
        /// Složka souboru projektu.
        /// </summary>
        [Browsable(false)]
        public virtual string Directory
        {
            get
            {
                lock (SyncRoot)
                {
                    if (string.IsNullOrEmpty(cachedDirectoryName))
                        try { cachedDirectoryName = Path.GetDirectoryName(this.FileName); }
                        catch (Exception) { cachedDirectoryName = ""; }
                    return cachedDirectoryName;
                }
            }
        }
        #endregion

        #region ProjectSections
        readonly List<IProjectSection> projectSections = new List<IProjectSection>();

        [Browsable(false)]
        public List<IProjectSection> ProjectSections
        {
            get
            {
                ThreadService.AssertMainThread();
                return projectSections;
            }
        }

        readonly List<IProjectSection> nonActiveProjectSections = new List<IProjectSection>();

        [Browsable(false)]
        public List<IProjectSection> NonActiveProjectSections
        {
            get
            {
                ThreadService.AssertMainThread();
                return nonActiveProjectSections;
            }
        }
        #endregion

        #region Language Properties
        /// <summary>
        /// Vlastnosti jazyku
        /// </summary>
        [Browsable(false)]
        public virtual LanguageProperties LanguageProperties
        {
            get { return LanguageProperties.None; }
        }
        #endregion

        #region Save
        /// <summary>
        /// Uložení projektu
        /// </summary>
        /// <param name="changeDirty">TRUE - indikuje, že po uložení se nezmění stav souboru</param>
        public void Save(bool changeDirty = true) => Save(this.FileName, changeDirty);
        /// <summary>
        /// Uložení projektu s určitým názvem
        /// </summary>
        /// <param name="fileName">Nový název projektu</param>
        /// <param name="changeDirty">TRUE - indikuje, že po uložení se nezmění stav souboru</param>
        public virtual void Save(string fileName, bool changeDirty) { }
        #endregion

        /// <summary>
        /// Seznam položek projektu
        /// </summary>
        [Browsable(false)]
        public virtual ReadOnlyCollection<ProjectItem> Items
        {
            get { return new ReadOnlyCollection<ProjectItem>(new ProjectItem[0]); }
        }

        /// <summary>
        /// Získání položky určitého typu
        /// </summary>
        public virtual IEnumerable<ProjectItem> GetItemsOfType(ItemType itemType)
        {
            foreach (ProjectItem item in this.Items)
                if (item.ItemType == itemType)
                    yield return item;
        }

        /// <summary>
        /// Získání názvu jazyka daného projektu
        /// </summary>
        [ReadOnly(true)]
        public virtual string ProjectType { get { return ""; } }

        /// <summary>
        /// Indikuje, že projekt lze spustit
        /// </summary>
        [Browsable(false)]
        public virtual bool IsStartable { get { return false; } }
        /// <summary>
        /// Spuštění projektu
        /// </summary>
        public virtual void Start()
        {
            //ProcessStartInfo psi;
            //try { psi = CreateStartInfo(); }
            //catch (Exception ex)
            //{
            //    MessageService.ShowError(ex.Message);
            //    return;
            //}
            //StartWithoutDebugging(psi);
        }

        /// <summary>
        /// Spuštění projektu
        /// </summary>
        public virtual void Run() { }

        /// <exclude/>
        public bool IsFileInProject(string fileName) { return FindFile(fileName) != null; }

        Dictionary<string, FileProjectItem> findFileCache;

        internal protected void ClearFindFileCache()
        {
            lock (SyncRoot) { findFileCache = null; }
        }

        /// <exclude/>
        public FileProjectItem FindFile(string fileName)
        {
            lock (SyncRoot)
            {
                if (findFileCache == null)
                {
                    findFileCache = new Dictionary<string, FileProjectItem>(StringComparer.OrdinalIgnoreCase);
                    foreach (ProjectItem item in this.Items)
                    {
                        if (item is FileProjectItem fileItem)
                            findFileCache[item.FileName] = fileItem;
                    }
                }
                fileName = FileUtility.NormalizePath(fileName);
                findFileCache.TryGetValue(fileName, out FileProjectItem outputItem);
                return outputItem;
            }
        }

        #region Dirty
        bool isDirty;
        /// <summary>
        /// Změna uskutečněná
        /// </summary>
        public event EventHandler DirtyChanged;

        /// <summary>
        /// Indikuje změnu
        /// </summary>
        [Browsable(false)]
        public bool IsDirty
        {
            get { return isDirty; }
            set
            {
                isDirty = value;
                DirtyChanged?.Invoke(this, EventArgs.Empty);
            }
        }
        #endregion

        /// <summary>
        /// Převod na řetězec
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return string.Format("[{0}: {1}]", GetType().Name, this.Name);
        }

        /// <summary>
        /// Získání výchozího typu položky
        /// </summary>
        /// <param name="elementName">Název typu větve souboru</param>
        /// <param name="fileName">Název Souboru</param>
        /// <returns>Výchozí typ položky</returns>
        public ItemType GetItemType(string elementName, string fileName)
        {
            switch (elementName.ToLowerInvariant())
            {
                case "data": return ItemType.Data;
                case "structure": return ItemType.Structure;
                case "format": return ItemType.Content;
                default:
                    break;
            }
            return GetDefaultItemType(fileName);
        }


        /// <summary>
        /// Výchozí typ položky.
        /// </summary>
        public virtual ItemType GetDefaultItemType(string fileName)
        {
            try
            {
                string ext = Path.GetExtension(fileName);

                foreach (var item in GlobalListLoader.GetDictionary("FileTypes"))
                    if (ext.Equals(item.Key, StringComparison.OrdinalIgnoreCase))
                        switch (item.Value)
                        {
                            case "Data": return ItemType.Data;
                            case "Content": return ItemType.Content;
                            case "Generator": return ItemType.Generator;
                            case "Transform": return ItemType.Transform;
                            case "Structure": return ItemType.Structure;
                            case "Archive": return ItemType.Archive;
                            default: return ItemType.None;
                        }
            }
            catch { }
            return ItemType.None;
        }

        /// <summary>
        /// Vytvoření nové typové položky
        /// </summary>
        public virtual ProjectItem CreateProjectItem(IProjectSection item)
        {
            return new UnknownProjectItem(this, item);
        }

        /// <summary>
        /// volá se po změně názvu větve
        /// </summary>
        /// <param name="eventArgs">argumenty volání</param>
        public virtual void AfterLabelEdit(AddIns.AfterFileNodeEditEventArgs eventArgs) { Save(); }
        /// <summary>
        /// nastavení výchozí položky
        /// </summary>
        /// <param name="item">položka k nastavení</param>
        /// <param name="withoutSave">TRUE - proběhne nastavení bez uložení</param>
        /// <param name="forceSave">TRUE - pokud položka odpovídá parametrům výchozí hodnoty, pak uloží i přesto</param>
        public virtual bool SetDefault(ProjectItem item, bool withoutSave = false, bool forceSave = false)
        {
            throw new NotImplementedException();
        }

        protected void OpenFile(ProjectItem obj)
        {
            if (obj.ItemType == ItemType.Content)
                filesToOpenAfterSolutionLoad.Add(obj.Include);
            else
                StructureView.StructureViewEntry.GetOrCreate(obj.FileName);
        }

        public override void OnAfterLoad()
        {
            List<ProjectItem> items = GetItemsOfType(ItemType.Content).ToList();
            if (items.Count == 1)
                items.ForFirst(OpenFile);
            else
                GetItemsOfType(ItemType.Structure).ForFirst(OpenFile);
            base.OnAfterLoad();
        }
    }
}
