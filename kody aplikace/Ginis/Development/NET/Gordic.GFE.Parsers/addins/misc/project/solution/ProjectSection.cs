//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ProjectSection.cs                        </Name>
//    <Description> Popis ProjectSection.                                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.Text;

namespace Gordic.GFE.Parsers.AddIns.Project
{
    /// <summary>
    /// rozhraní sekce projektu
    /// </summary>
    public interface IProjectSection
    {
        /// <summary>
        /// Název sekce
        /// </summary>
        string Name { get; }
        /// <summary>
        /// typ sekce
        /// </summary>
        ItemType SectionType { get; }
        /// <summary>
        /// Položky sekce
        /// </summary>
        List<SolutionItem> Items { get; }
        
        /// <summary>
        /// Přidání sekce do projektu
        /// </summary>
        /// <param name="sb"></param>
        /// <param name="indentString"></param>
        void AppendSection(StringBuilder sb, string indentString);
    }
    /// <summary>
    /// Nějaka množina informací o jednotce projektu (může být soubor)
    /// </summary>
    public class ProjectSection : IProjectSection
    {
        #region IProjectSection
        readonly string name;
        /// <summary>
        /// Název sekce
        /// </summary>
        public string Name { get { return name; } }

        readonly List<SolutionItem> items = new List<SolutionItem>();
        /// <summary>
        /// Položky sekce
        /// </summary>
        public List<SolutionItem> Items { get { return items; } }

        readonly ItemType sectionType;
        /// <summary>
        /// typ sekce
        /// </summary>
        public ItemType SectionType { get { return sectionType; } }

        /// <summary>
        /// Přidání sekce do projektu
        /// </summary>
        /// <param name="sb"></param>
        /// <param name="indentString"></param>
        public void AppendSection(StringBuilder sb, string indentString)
        {
            foreach (SolutionItem item in items)
                item.AppendItem(sb, indentString);
        }
        #endregion

        /// <summary>
        /// Vytvoření sekce projektu
        /// </summary>
        /// <param name="name">Název sekce</param>
        /// <param name="sectionType">typ sekce</param>
        public ProjectSection(string name, ItemType sectionType)
        {
            this.name = name;
            this.sectionType = sectionType;
        }

    }
}
