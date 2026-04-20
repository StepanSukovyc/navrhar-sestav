//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SolutionFolder.cs                      </Name>
//    <Description> Složka řešení                                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.ComponentModel;
using Gordic.GFE.Parsers.AddIns.Project;

namespace Gordic.GFE.WinClient.Project
{
    /// <summary>
    /// Složka řešení
    /// </summary>
    class SolutionFolder : AbstractSolutionFolder, ISolutionFolderContainer
    {
        public const string FolderGuid = "{2150E333-8FDC-42A3-9474-1A3956D46DE8}";

        [Browsable(false)]
        public bool IsEmpty
        {
            get { return Folders.Count == 0 && SolutionItems.Items.Count == 0; }
        }
        /// <summary>
        /// Prázdný konstruktor
        /// </summary>
        protected SolutionFolder()
        {
        }

        public SolutionFolder(string name, string location, string idGuid)
        {
            this.Location = location;
            this.Name = name;
        }

        #region ISolutionFolderContainer implementace
        readonly List<ISolutionFolder> folders = new List<ISolutionFolder>();
        List<ProjectSection> sections = new List<ProjectSection>();
        /// <summary>
        /// Sekce projektu
        /// </summary>
        [Browsable(false)]
        public List<ProjectSection> Sections { get { return sections; } }
        /// <summary>
        /// Složky projektu
        /// </summary>
        [Browsable(false)]
        public List<ISolutionFolder> Folders { get { return folders; } }

        /// <summary>
        /// Položka řešení
        /// </summary>
        [Browsable(false)]
        public virtual ProjectSection SolutionItems
        {
            get
            {
                foreach (ProjectSection section in sections)
                    if (section.Name == "SolutionItems")
                        return section;
                ProjectSection solutionItems = new ProjectSection("SolutionItems", ItemType.Runable);
                sections.Add(solutionItems);
                return solutionItems;
            }
        }
        /// <summary>
        /// přidání složky
        /// </summary>
        /// <param name="folder">složka</param>
        public virtual void AddFolder(ISolutionFolder folder)
        {
            if (folder.Parent != null)
                folder.Parent.RemoveFolder(folder);

            folder.Parent = this;
            Folders.Add(folder);
        }
        /// <summary>
        /// Odstranění složky z řešení
        /// </summary>
        /// <param name="folder">složka k odstranění</param>
        public virtual void RemoveFolder(ISolutionFolder folder)
        {
            for (int i = 0; i < Folders.Count; ++i)
                if (folder.IdGuid == Folders[i].IdGuid)
                {
                    Folders.RemoveAt(i);
                    break;
                }
        }

        /// <summary>
        /// Identifikáce předchůdce
        /// </summary>
        /// <param name="folder">Složka pro identifikácí</param>
        /// <returns></returns>
        public bool IsAncestorOf(ISolutionFolder folder)
        {
            object curParent = folder;
            while (curParent != null && curParent is ISolutionFolder)
            {
                ISolutionFolder curFolder = (ISolutionFolder)curParent;
                if (curFolder == this)
                    return true;
                curParent = curFolder.Parent;
            }
            return false;
        }
        #endregion
    }
}
