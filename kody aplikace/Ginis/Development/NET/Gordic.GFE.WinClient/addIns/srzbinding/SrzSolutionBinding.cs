//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SrzSolutionBinding.cs                  </Name>
//    <Description> Zpětná vazba na SRZ projekt                                 </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2026                            </Copyright>
//    <Created>     2014-06-05                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.AddIns.Project;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Project;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml;

namespace Gordic.GFE.WinClient.SrzBinding
{
    /// <summary>
    /// Zpětná vazba na SRZ projekt
    /// </summary>
    class SrzSolutionBinding : ISolutionBinding
    {
        #region ISolutionBinding
        /// <summary>
        /// typ sestavení
        /// </summary>
        public string Type => "SRZ";
        /// <summary>
        /// načtení projektu sestavení
        /// </summary>
        /// <param name="solution">sestavení</param>
        /// <param name="fileName">název souboru projektu sestavení</param>
        /// <param name="projectName">název projektu</param>
        /// <returns>projekt sestavení</returns>
        public IProject LoadProject(Solution solution, string fileName, string projectName) => null;
        /// <summary>
        /// vytvoření projektu sestavení
        /// </summary>
        /// <param name="info">informace o vytvářeném projektu</param>
        /// <returns>projekt sestavení</returns>
        public IProject CreateProject(Project.Templates.ProjectCreateInformation info) => null;

        /// <summary>
        /// načtení sestavení
        /// </summary>
        /// <param name="solution">sestavení k načtení</param>
        /// <param name="waitDialog">čekací dialogové okýnko</param>
        /// <param name="force">TRUE - v případě chyby konfiguračního souboru sestavení se nabídne oprava samotného konfiguračního souboru</param>
        /// <returns>Hlavní projektová sekce sestavení</returns>
        public void SetupSolution(Solution solution, Parsers.Gui.AsynchronousWaitDialog waitDialog, bool force)
        {
            TempProject project = new Parsers.AddIns.Project.TempProject(solution.FileName);
            solution.TemporaryDir = project.TemporaryDir.Path;
            foreach (var item in Directory.GetFiles(project.TemporaryDir.Path, "*.ssr"))
                SolutionBindingService.LoadProject(solution
                    , item
                    , Path.GetFileNameWithoutExtension(solution.FileName)
                    , waitDialog
                    , SolutionBindingService.GetBindingPerProjectFile(item));
            solution.AfterLoaded += delegate(Object sender, EventArgs e) { (sender as Solution).Folders.ForEach(itm => itm.OnAfterLoad()); };
        }

        /// <summary>
        /// načtení sestavení
        /// </summary>
        /// <param name="solution">sestavení k načtení</param>
        /// <param name="waitDialog">čekací dialogové okýnko</param>
        /// <returns>Hlavní projektová sekce sestavení</returns>
        public void ReloadSolution(Solution solution, Parsers.Gui.AsynchronousWaitDialog waitDialog)
        {
            foreach (var item in Directory.GetFiles(solution.TemporaryDir, "*.ssr"))
                SolutionBindingService.LoadProject(solution
                    , item
                    , Path.GetFileNameWithoutExtension(solution.FileName)
                    , waitDialog
                    , SolutionBindingService.GetBindingPerProjectFile(item));
        }

        /// <summary>
        /// načtení projektu dle konfiguračního objektu
        /// </summary>
        /// <param name="solution">sestavení projektu</param>
        /// <param name="item">konfigurační objekt projektu</param>
        /// <returns>jeden z projektu </returns>
        public IProject LoadProject(Solution solution, dynamic item)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// uložení sestavení
        /// </summary>
        /// <param name="solution">sestavení k uložení</param>
        /// <param name="waitDialog">čekácí dialogové okýnko</param>
        public void SaveSolution(Solution solution, Parsers.Gui.AsynchronousWaitDialog waitDialog)
        {
            List<AbstractProject> stack = CreateProjectStack(solution);
            ProcessProjectStack(stack);
            ProjectService.CompletSolution();
        }

        /// <summary>
        /// Vytvoří zásobník projektů
        /// </summary>
        List<AbstractProject> CreateProjectStack(Solution solution)
        {
            List<AbstractProject> stack = new List<AbstractProject>();
            for (int i = solution.Folders.Count - 1; i >= 0; i--)
                stack.Add(solution.Folders[i] as AbstractProject);
            return stack;
        }

        /// <summary>
        /// Zpracuje zásobník projektů
        /// </summary>
        void ProcessProjectStack(List<AbstractProject> stack)
        {
            while (stack.Count > 0)
            {
                string fileName = stack.First().FileName;
                XmlDocumentPosition xmlDoc = CreateXmlDocument();
                SaveProjectsToXml(stack, fileName, xmlDoc);
                xmlDoc.Save(fileName);
                stack.RemoveAll(f => f.FileName.Equals(fileName, StringComparison.OrdinalIgnoreCase));
            }
        }

        /// <summary>
        /// Vytvoří XML dokument
        /// </summary>
        XmlDocumentPosition CreateXmlDocument()
        {
            XmlDocumentPosition xmlDoc = new XmlDocumentPosition();
            XmlElement main = xmlDoc.CreateElement("reports", "http://www.gordic.cz/TR/ssr/1.0");
            XmlDeclaration xmlDecl = xmlDoc.CreateXmlDeclaration("1.0", "windows-1250", null);
            xmlDoc.AppendChild(xmlDecl);
            xmlDoc.AppendChild(main);
            return xmlDoc;
        }

        /// <summary>
        /// Uloží projekty do XML
        /// </summary>
        void SaveProjectsToXml(List<AbstractProject> stack, string fileName, XmlDocumentPosition xmlDoc)
        {
            XmlElement main = xmlDoc.DocumentElement;
            foreach (var item in stack.FindAll(f => f.FileName.Equals(fileName, StringComparison.OrdinalIgnoreCase)))
                item.Save(main, xmlDoc);
        }

        /// <summary>
        /// archivace sestavení
        /// </summary>
        /// <param name="solution">sestavení k archivací</param>
        /// <param name="waitDialog">čekácí dialogové okýnko</param>
        public void ArchiveSolution(Solution solution, Parsers.Gui.AsynchronousWaitDialog waitDialog)
        {
            throw new NotImplementedException();
        }
        #endregion

    }
}
