//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ProjectItem.cs                         </Name>
//    <Description> Položka projektu                                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using System;
using System.ComponentModel;
using System.IO;
using Gordic.GFE.Parsers.AddIns.Project;
using Gordic.GFE.Parsers.Core;
using Gordic.General;

namespace Gordic.GFE.WinClient.Project
{
    /// <summary>
    /// Položka projektu
    /// </summary>
    abstract class ProjectItem : IDisposable
    {
        IProject project;
        volatile string fileNameCache;
        string virtualInclude;
        ItemType virtualItemType;
        readonly IProjectSection projectSection;

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="project">projekt, kterému patří položka</param>
        /// <param name="item"></param>
        protected ProjectItem(IProject project, IProjectSection item)
        {
            this.project = project ?? throw new ArgumentNullException("project");
            this.projectSection = item;
        }

        /// <summary>
        /// Vytvoření položky
        /// </summary>
        /// <param name="project">Projekt, kterému patří položka</param>
        /// <param name="itemType">Typ položky</param>
        protected ProjectItem(IProject project, ItemType itemType)
            : this(project, itemType, null)
        {
        }

        /// <summary>
        /// Vytvoření položky
        /// </summary>
        /// <param name="project">Projekt, kterému patří položka</param>
        /// <param name="itemType">Typ položky</param>
        /// <param name="include"></param>
        protected ProjectItem(IProject project, ItemType itemType, string include)
        {
            this.project = project;
            virtualItemType = itemType;
            virtualInclude = include ?? "";
        }

        /// <summary>
        /// Nadřazený projekt položky
        /// </summary>
        [Browsable(false)]
        public IProject Project { get { return project; } }

        /// <summary>
        /// Objekt pro synchronizací.
        /// </summary>
        object SyncRoot { get { return project != null ? project.SyncRoot : new object(); } }

        /// <summary>
        /// Typ položky
        /// </summary>
        [Browsable(false)]
        public ItemType ItemType
        {
            get { lock (SyncRoot) { return virtualItemType; } }
            set { lock (SyncRoot) { virtualItemType = value; } }
        }

        [Browsable(false)]
        public string Include
        {
            get { lock (SyncRoot) { return virtualInclude; } }
            set
            {
                lock (SyncRoot)
                {
                    if (project is AbstractProject)
                        ((AbstractProject)project).ClearFindFileCache();

                    virtualInclude = value ?? "";
                    fileNameCache = null;
                }
            }
        }

        /// <summary>
        /// Úplný název souboru projektu
        /// </summary>
        [Browsable(false)]
        public virtual string FileName
        {
            get
            {
                if (project == null)
                    return Include;
                string fileName = fileNameCache;
                if (fileName == null)
                    lock (SyncRoot)
                    {
                        fileName = FileUtility.NormalizePath(Path.Combine(project.Directory, this.Include));
                        fileNameCache = fileName;
                    }
                return fileName;
            }
            set
            {
                if (project == null)
                    throw new NotSupportedException(GResources.GetResourceText(29450338)); //RC 29450338 : Položky bez projektu nejsou podporováné!
                this.Include = FileUtility.GetRelativePath(project.Directory, value);
            }
        }

        bool disposed;
        /// <summary>
        /// Uvolnění položka
        /// </summary>
        public virtual void Dispose() { disposed = true; }
        /// <summary>
        /// Indikuje, že položka je uvolněná
        /// </summary>
        [Browsable(false)]
        public bool IsDisposed { get { return disposed; } }
        /// <summary>
        /// Převod položky na řetězec
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return string.Format("[{0}: <{1} Include='{2}'>]",
                                 GetType().Name, this.ItemType.ItemName, this.Include);
        }
    }
}
