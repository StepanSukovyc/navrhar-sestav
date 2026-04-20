//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SsrLanguageBinding.cs                  </Name>
//    <Description> Zpětná vazba na konfigurační soubor SSR projektu            </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-05-27                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Project;
using Gordic.GFE.Parsers.AddIns.Project;
using Gordic.GFE.WinClient.Project.Templates;
using Gordic.Report.Implementation;
using System.IO;
using System.Xml;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.Parsers.Services;
using System.Windows.Forms;
using Gordic.GFE.WinClient.Gui;
using Gordic.General;

namespace Gordic.GFE.WinClient.SsrBinding
{
    /// <summary>
    /// Zpětná vazba na konfigurační soubor SSR projektu
    /// </summary>
    class SsrSolutionBinding : ISolutionBinding
    {
        /// <summary>
        /// jazyk projektu
        /// </summary>
        public string Type { get { return "SSR"; } }
        /// <summary>
        /// vytvoření projektu
        /// </summary>
        /// <param name="info">informace o projektu</param>
        /// <returns></returns>
        public IProject CreateProject(ProjectCreateInformation info)
        {
            var prj = new SsrProject();
            prj.Initialize(info);

            return prj;
        }

        /// <summary>
        /// načtení sestavení
        /// </summary>
        /// <param name="solution">sestavení k načtení</param>
        /// <param name="waitDialog">čekací dialogové okýnko</param>
        /// <param name="force">TRUE - v případě chyby konfiguračního souboru sestavení se nabídne oprava samotného konfiguračního souboru</param>
        /// <returns></returns>
        public void SetupSolution(Solution solution, AsynchronousWaitDialog waitDialog, bool force)
        {
            try
            {
                GSsr ssrSolution = new GSsr(solution.FileName);
                solution.Tag = ssrSolution;

                if (ssrSolution != null)
                    foreach (GSsrReport item in ssrSolution.Reports)
                        solution.AddFolder(SolutionBindingService.LoadProject(solution, solution.FileName, item, waitDialog, this));
            }
            catch (Exception ex)
            {
                MessageService.ShowError(ex);
                if (!force)
                    if (MessageService.AskQuestion(GResources.GetResourceText(29451468)))
                        FileAgent.OpenFile(solution.FileName);
            }
        }
        /// <summary>
        /// načtení sestavení
        /// </summary>
        /// <param name="solution">sestavení k načtení</param>
        /// <param name="waitDialog">čekací dialogové okýnko</param>
        /// <returns></returns>
        public void ReloadSolution(Solution solution, AsynchronousWaitDialog waitDialog) { SetupSolution(solution, waitDialog, true); }

        /// <summary>
        /// načtení projektu
        /// </summary>
        /// <param name="solution">sestavení</param>
        /// <param name="fileName">název soubor projektu</param>
        /// <param name="projectName">název projektu</param>
        /// <returns></returns>
        public IProject LoadProject(Solution solution, string fileName, string projectName)
        {
            try
            {
                GSsr ssrSolution = new GSsr(fileName);
                solution.Tag = ssrSolution;

                if (ssrSolution != null)
                    foreach (GSsrReport item in ssrSolution.Reports)
                        solution.AddFolder(SolutionBindingService.LoadProject(solution, fileName, item, null, this));
            }
            catch (Exception ex)
            {
                MessageService.ShowError(ex);
                FileAgent.OpenFile(fileName);
            }
            return null;
        }
        /// <summary>
        /// načtení projektu dle konfiguračního objektu
        /// </summary>
        /// <param name="solution">sestavení projektu</param>
        /// <param name="item">konfigurační objekt projektu</param>
        /// <returns></returns>
        public IProject LoadProject(Solution solution, dynamic item)
        {
            if (item is GSsrReport report)
            {
                var prj = new SsrProject();
                prj.Initialize(solution, report);

                return prj;
            }
            return new MissingProject();
        }

        /// <summary>
        /// uložení sestavení
        /// </summary>
        /// <param name="solution">sestavení k uložení</param>
        /// <param name="waitDialog">čekácí dialogové okýnko</param>
        public void SaveSolution(Solution solution, AsynchronousWaitDialog waitDialog)
        {
            string outputDirectory = Path.GetDirectoryName(solution.FileName);
            if (!System.IO.Directory.Exists(outputDirectory))
                System.IO.Directory.CreateDirectory(outputDirectory);

            Stack<ISolutionFolder> stack = new Stack<ISolutionFolder>(solution.Folders.Count);
            for (int i = solution.Folders.Count - 1; i >= 0; i--)
                stack.Push(solution.Folders[i]);

            XmlDocumentPosition xmlDoc = new XmlDocumentPosition();
            XmlElement main = xmlDoc.CreateElement("reports", "http://www.gordic.cz/TR/ssr/1.0");
            XmlDeclaration xmlDecl = xmlDoc.CreateXmlDeclaration("1.0", "windows-1250", null);
            xmlDoc.AppendChild(xmlDecl);

            xmlDoc.AppendChild(main);
            while (stack.Count > 0)
            {
                ISolutionFolder currentFolder = stack.Pop();
                if (currentFolder is SsrProject)
                    (currentFolder as SsrProject).Save(main, xmlDoc);
            }
            xmlDoc.Save(solution.FileName);
        }
        /// <summary>
        /// archivace sestavení
        /// </summary>
        /// <param name="solution">sestavení k archivací</param>
        /// <param name="waitDialog">čekácí dialogové okýnko</param>
        public void ArchiveSolution(Solution solution, AsynchronousWaitDialog waitDialog)
        {
            DialogResult result = FileService.GetNewName((string[])(AddInTree.GetTreeNode("/Desktop/ArchiveFilter").BuildChildItems(this)).ToArray(typeof(string))
                , out string archiveFileName
                , SimpleDesktop.MainForm);

            if (result == DialogResult.OK)
            {
                GFETempDir temp = new GFETempDir();

                Stack<ISolutionFolder> stack = new Stack<ISolutionFolder>(solution.Folders.Count);
                for (int i = solution.Folders.Count - 1; i >= 0; i--)
                    stack.Push(solution.Folders[i]);

                string fileName = Path.Combine(temp.Path, Path.GetFileName(solution.FileName));
                FileService.CopyFile(solution.FileName, fileName, false, true);
                while (stack.Count > 0)
                {
                    ISolutionFolder currentFolder = stack.Pop();
                    if (currentFolder is SsrProject)
                        (currentFolder as SsrProject).Copy(temp);
                }

                if (File.Exists(archiveFileName))
                    if (MessageService.AskQuestion(string.Format(GResources.GetResourceText(29451469), archiveFileName)))
                        FileAgent.RemoveFile(archiveFileName, false);
                if (!File.Exists(archiveFileName))
                {
                    GZip.ZipDirectoryContent(temp.Path, archiveFileName);
                    MessageService.ShowInformation(GResources.GetResourceText(29451470));
                }
                else MessageService.ShowWarning(GResources.GetResourceText(29451471));
            }
            else 
                MessageService.ShowWarning(GResources.GetResourceText(29451472));
        }
    }
}
