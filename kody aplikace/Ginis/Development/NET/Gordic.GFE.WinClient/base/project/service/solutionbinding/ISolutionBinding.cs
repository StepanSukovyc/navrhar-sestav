//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ISolutionBinding.cs                    </Name>
//    <Description> Základní rozhraní dostupných jazyků                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using Gordic.GFE.WinClient.Project.Templates;
using Gordic.GFE.Parsers.AddIns.Project;
using Gordic.GFE.Parsers.Gui;

namespace Gordic.GFE.WinClient.Project
{
    /// <summary>
    /// Základní rozhraní dostupných jazyků
    /// </summary>
    interface ISolutionBinding
    {
        /// <returns>
        /// Jazyk dané vazby
        /// </returns>
        string Type { get; }

        /// <summary>
        /// Načtení projektu
        /// </summary>
        /// <param name="solution">řešení</param>
        /// <param name="fileName">úplný název souboru projektu</param>
        /// <param name="projectName">Název projektu</param>
        /// <returns></returns>
        IProject LoadProject(Solution solution, string fileName, string projectName);
        /// <summary>
        /// Vytvoření projektu dle informaci o projektu
        /// </summary>
        /// <param name="info">Dostupná informace</param>
        /// <returns></returns>
        IProject CreateProject(ProjectCreateInformation info);

        /// <summary>
        /// načtení sestavení
        /// </summary>
        /// <param name="solution">sestavení k načtení</param>
        /// <param name="waitDialog">čekací dialogové okýnko</param>
        /// <param name="force">TRUE - v případě chyby konfiguračního souboru sestavení se nabídne oprava samotného konfiguračního souboru</param>
        /// <returns></returns>
        void SetupSolution(Solution solution, AsynchronousWaitDialog waitDialog, bool force);

        /// <summary>
        /// znovu načtení sestavení
        /// </summary>
        /// <param name="solution">sestavení k načtení</param>
        /// <param name="waitDialog">čekací dialogové okýnko</param>
        /// <returns></returns>
        void ReloadSolution(Solution solution, AsynchronousWaitDialog waitDialog);

        /// <summary>
        /// načtení projektu dle konfiguračního objektu
        /// </summary>
        /// <param name="solution">sestavení projektu</param>
        /// <param name="item">konfigurační objekt projektu</param>
        /// <returns></returns>
        IProject LoadProject(Solution solution, dynamic item);

        /// <summary>
        /// uložení sestavení
        /// </summary>
        /// <param name="solution">sestavení k uložení</param>
        /// <param name="waitDialog">čekácí dialogové okýnko</param>
        void SaveSolution(Solution solution, AsynchronousWaitDialog waitDialog);
        /// <summary>
        /// archivace sestavení
        /// </summary>
        /// <param name="solution">sestavení k archivací</param>
        /// <param name="waitDialog">čekácí dialogové okýnko</param>
        void ArchiveSolution(Solution solution, AsynchronousWaitDialog waitDialog);
    }
}
