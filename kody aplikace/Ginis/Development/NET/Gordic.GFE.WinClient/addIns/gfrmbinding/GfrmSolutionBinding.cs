//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.FormLanguageBinding.cs                 </Name>
//    <Description> Zpětná vazba na formuláře                                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-25                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.WinClient.Project;
using Gordic.GFE.WinClient.Project.Templates;
using Gordic.GFE.Parsers.AddIns.Project;
using Gordic.GFE.Parsers.Gui;
using System.IO;

namespace Gordic.GFE.WinClient.GfrmBinding
{
    /// <summary>
    /// Zpětná vazba na formuláře
    /// </summary>
    class GfrmSolutionBinding : ISolutionBinding
    {
        /// <summary>
        /// typ sestavení
        /// </summary>
        public string Type { get { return "GFRM"; } }
        /// <summary>
        /// načtení projektu sestavení
        /// </summary>
        /// <param name="solution">sestavení</param>
        /// <param name="fileName">název souboru projektu sestavení</param>
        /// <param name="projectName">název projektu</param>
        /// <returns></returns>
        public IProject LoadProject(Solution solution, string fileName, string projectName)
        {
            GfrmProject _project = new GfrmProject();
            return _project != null ? _project.Initialize(fileName, projectName) : _project;
        }
        /// <summary>
        /// vytvoření projektu sestavení
        /// </summary>
        /// <param name="info">informace o vytvářeném projektu</param>
        /// <returns></returns>
        public IProject CreateProject(ProjectCreateInformation info)
        {
            return (new GfrmProject()).Initialize(info);
        }

        /// <summary>
        /// uložení sestavení
        /// </summary>
        /// <param name="solution">sestavení k uložení</param>
        /// <param name="waitDialog">čekácí dialogové okýnko</param>
        public void SaveSolution(Solution solution, AsynchronousWaitDialog waitDialog) { }

        /// <summary>
        /// načtení sestavení
        /// </summary>
        /// <param name="solution">sestavení k načtení</param>
        /// <param name="waitDialog">čekací dialogové okýnko</param>
        /// <param name="force">TRUE - v případě chyby konfiguračního souboru sestavení se nabídne oprava samotného konfiguračního souboru</param>
        /// <returns></returns>
        public void SetupSolution(Solution solution, AsynchronousWaitDialog waitDialog, bool force)
        {
            solution.AddFolder(SolutionBindingService.LoadProject(solution, solution.FileName, Path.GetFileNameWithoutExtension(solution.FileName), waitDialog, this));
            solution.AfterLoaded += delegate (Object sender, EventArgs e) { (sender as Solution).Folders.ForEach(itm => itm.OnAfterLoad()); };
        }

        /// <summary>
        /// načtení sestavení
        /// </summary>
        /// <param name="solution">sestavení k načtení</param>
        /// <param name="waitDialog">čekací dialogové okýnko</param>
        /// <returns></returns>
        public void ReloadSolution(Solution solution, AsynchronousWaitDialog waitDialog)
        {
            solution.AddFolder(SolutionBindingService.LoadProject(solution, solution.FileName, Path.GetFileNameWithoutExtension(solution.FileName), waitDialog, this));
        }
        /// <summary>
        /// načtení projektu dle konfiguračního objektu
        /// </summary>
        /// <param name="solution">sestavení projektu</param>
        /// <param name="item">konfigurační objekt projektu</param>
        /// <returns></returns>
        public IProject LoadProject(Solution solution, dynamic item)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// archivace sestavení
        /// </summary>
        /// <param name="solution">sestavení k archivací</param>
        /// <param name="waitDialog">čekácí dialogové okýnko</param>
        public void ArchiveSolution(Solution solution, AsynchronousWaitDialog waitDialog)
        {
            throw new NotImplementedException();
        }
    }
}
