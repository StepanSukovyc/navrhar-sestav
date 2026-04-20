//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ISolutionFolderContainer.cs            </Name>
//    <Description> popis ISolutionFolderContainer                              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using Gordic.GFE.Parsers.AddIns.Project;

namespace Gordic.GFE.WinClient.Project
{
    /// <summary>
    /// rozhraní s položkou SSR projektu
    /// </summary>
    interface IFileProjectItemHandler
    {
        /// <summary>
        /// položka projektu
        /// </summary>
        dynamic Item { get; }
        /// <summary>
        /// indikuje existencí příkazu Výchozí
        /// </summary>
        bool CanBeDefault { get; }
        /// <summary>
        /// TRUE - položka je výchozí
        /// </summary>
        bool IsDefault { get; }
        /// <summary>
        /// nastavení výchozího souboru
        /// </summary>
        /// <param name="value">nastavovaná hodnota výchozího stavu</param>
        /// <param name="withoutSave">TRUE - proběhne nastavení bez uložení</param>
        void SetDefault(bool value, bool withoutSave = false);
    }

    /// <summary>
    /// vlastnosti projektové složky
    /// </summary>
    interface ISolutionFolderProperties
    {
        /// <summary>
        /// lze vytvořít archivní balíček
        /// </summary>
        bool CanCreateArchive { get; }
        /// <summary>
        /// pomocný objekt sestavení
        /// </summary>
        object Tag { get; set; }

        /// <summary>
        /// vytvoření archivního balíčku
        /// </summary>
        void CreateArchive();
        /// <summary>
        /// indikátor přítomnosti vlastnosti sestavení
        /// </summary>
        bool ShowOptions { get; }
        /// <summary>
        /// indikuje spustitelnost sestavení
        /// </summary>
        bool IsRunable { get; }

        /// <summary>
        /// metoda spuštění sestavení
        /// </summary>
        bool Run();
    }

    /// <summary>
    /// popis ISolutionFolderContainer
    /// </summary>
    interface ISolutionFolderContainer
    {
        /// <summary>
        /// řešení, kterému patří kontainer
        /// </summary>
        Solution ParentSolution { get; }
        /// <summary>
        /// Sekce složky
        /// </summary>
        List<ProjectSection> Sections { get; }
        /// <summary>
        /// Složky kontaineru
        /// </summary>
        List<ISolutionFolder> Folders { get; }
        /// <summary>
        /// Položka řešení
        /// </summary>
        ProjectSection SolutionItems { get; }
        /// <summary>
        /// Přidání složky
        /// </summary>
        /// <param name="folder">Přidávaná složka</param>
        void AddFolder(ISolutionFolder folder);
        /// <summary>
        /// Odstranění složky
        /// </summary>
        /// <param name="folder">Složka k odstranění</param>
        void RemoveFolder(ISolutionFolder folder);
        /// <summary>
        /// Indikuje, zda daný kontainer je předchůdcem uvedené složky
        /// </summary>
        /// <param name="folder">Uvedená složka</param>
        /// <returns></returns>
        bool IsAncestorOf(ISolutionFolder folder);
    }
}
