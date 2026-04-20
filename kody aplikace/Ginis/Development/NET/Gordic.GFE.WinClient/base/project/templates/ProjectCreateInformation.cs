//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ProjectCreateInformation.cs            </Name>
//    <Description> Tato třída poskytuje veškeré informace ohledně jazykové vazby pro vytvoření projektu daného jazyku.</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace Gordic.GFE.WinClient.Project.Templates
{
    /// <summary>
    /// Tato třída poskytuje veškeré informace ohledně jazykové vazby pro vytvoření projektu daného jazyku.
    /// </summary>
    class ProjectCreateInformation
    {
        /// <summary>
        /// Seznam vytvořených projektů
        /// </summary>
        internal List<IProject> createdProjects = new List<IProject>();
        /// <summary>
        /// Seznam vytvořených projektů pouze pro čtení
        /// </summary>
        public ReadOnlyCollection<IProject> CreatedProjects
        {
            get { return createdProjects.AsReadOnly(); }
        }
        /// <summary>
        /// Výstupní název soubor projektu
        /// </summary>
        public string OutputProjectFileName { get; set; }
        /// <summary>
        /// Název projektu
        /// </summary>
        public string ProjectName { get; set; }
        /// <summary>
        /// Název řešení
        /// </summary>
        public string SolutionName { get; set; }
        /// <summary>
        /// Složka řešení
        /// </summary>
        public string SolutionPath { get; set; }
        /// <summary>
        /// Základní složka projektu
        /// </summary>
        public string ProjectBasePath { get; set; }
        /// <summary>
        /// řešení, kterému patří projekt
        /// </summary>
        public Solution Solution { get; set; }
    }
}
