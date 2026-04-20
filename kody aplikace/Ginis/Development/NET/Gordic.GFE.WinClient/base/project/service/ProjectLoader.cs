//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ProjectLoader.cs                       </Name>
//    <Description> Nástroj načtení projektu                                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.WinClient.Project
{
    /// <summary>
    /// Rozhraní volané pro načtení (konverzí) projektů
    /// </summary>
    interface IProjectLoader
    {
        /// <summary>
        /// Načíst/konvertovat řešení projektu
        /// </summary>
        /// <param name="fileName">Cesta k souboru projektu</param>
        void Load(string fileName);
    }

    /// <summary>
    /// Nástroj načtení souboru projektu
    /// </summary>
    class ProjectLoader : IProjectLoader
    {
        /// <summary>
        /// Načtení projektu
        /// </summary>
        /// <param name="fileName">Cesta k souboru projektu</param>
        public void Load(string fileName) { ProjectService.LoadProject(fileName); }
    }

    /// <summary>
    /// Načtení řešení
    /// </summary>
    class LoadSolution : IProjectLoader
    {
        /// <summary>
        /// načtení řešení
        /// </summary>
        /// <param name="fileName"></param>
        public void Load(string fileName) { ProjectService.LoadSolution(fileName); }
    }

}
