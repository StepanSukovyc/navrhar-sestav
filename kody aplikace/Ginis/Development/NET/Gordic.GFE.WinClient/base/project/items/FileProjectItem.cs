//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.FileProjectItem.cs                     </Name>
//    <Description> Souborová položka projektu                                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using System.ComponentModel;
using System.IO;
using Gordic.GFE.Parsers.AddIns.Project;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.WinClient.Project
{
    /// <summary>
    /// Souborová položka projektu
    /// </summary>
    class FileProjectItem : ProjectItem
    {
        readonly ProjectSection item;

        /// <summary>
        /// Vytvoření nové položky projektu
        /// </summary>
        /// <param name="project">Projekt</param>
        /// <param name="itemType">Typ položky</param>
        /// <param name="include">včetně</param>
        public FileProjectItem(IProject project, ItemType itemType, string include)
            : base(project, itemType, include)
        {
        }

        /// <summary>
        /// Vytvoření nové položky projektu.
        /// </summary>
        /// <param name="project">Projekt</param>
        /// <param name="itemType">Typ položky</param>
        public FileProjectItem(IProject project, ItemType itemType)
            : base(project, itemType)
        {
        }

        /// <summary>
        /// Vytvoření nové položky projektu
        /// </summary>
        /// <param name="project">Projekt</param>
        internal FileProjectItem(IProject project)
            : this(project, ItemType.None)
        {
        }

        public FileProjectItem(IProject project, ProjectSection item)
            : this(project, item.SectionType)
        {
            // TODO: Complete member initialization
            this.item = item;
        }

        /// <summary>
        /// Název souboru
        /// </summary>
        public override string FileName
        {
            get { return base.FileName; }
            set { base.FileName = value; }
        }

        /// <summary>
        /// Název souboru ve virtuálním soubororvém systému
        /// </summary>
        [Browsable(false)]
        public string VirtualName
        {
            get
            {
                if (FileUtility.IsBaseDirectory(this.Project.Directory, this.FileName))
                    return this.Include;
                else
                    return Path.GetFileName(this.Include);
            }
        }

        /// <summary>
        /// Zkopíruje všechny meta data z této položky do cílové.
        /// </summary>
        /// <param name="targetItem">cílová položka</param>
        public virtual void CopyMetadataTo(ProjectItem targetItem)
        {
            //lock (SyncRoot)
            //{
            //    lock (targetItem.SyncRoot)
            //    {
            //        if (this.buildItem != null && targetItem.buildItem != null)
            //            this.buildItem.CopyCustomMetadataTo(targetItem.buildItem);
            //        else
            //            foreach (string name in this.MetadataNames)
            //                targetItem.SetMetadata(name, this.GetMetadata(name));
            //    }
            //}
        }

    }
}
