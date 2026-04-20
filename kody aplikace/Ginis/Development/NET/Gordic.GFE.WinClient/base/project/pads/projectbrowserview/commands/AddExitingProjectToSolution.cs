//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.AddExitingProjectToSolution.cs         </Name>
//    <Description> Přidání existujícího projektu do řešení                     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.IO;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Project;
using Gordic.GFE.WinClient.AddIns;

namespace Gordic.GFE.WinClient.ProjectBrowser
{
    /// <summary>
    /// Přidání existujícího projektu do řešení
    /// </summary>
    class AddExitingProjectToSolution : AbstractMenuCommand
    {
        /// <summary>
        /// Přidání projektu
        /// </summary>
        /// <param name="solutionFolderNode">Větev řešení</param>
        /// <param name="fileName">cesta k souboru</param>
        public static void AddProject(ISolutionFolderNode solutionFolderNode, string fileName)
        {
            if (solutionFolderNode == null)
                throw new ArgumentNullException("solutionFolderNode");
            AddProject(solutionFolderNode, SolutionBindingService.LoadProject(solutionFolderNode.Solution, fileName, Path.GetFileNameWithoutExtension(fileName)));
        }
        /// <summary>
        /// Přidání projektu
        /// </summary>
        /// <param name="solutionFolderNode">větev řešení</param>
        /// <param name="newProject">nový projekt</param>
        public static void AddProject(ISolutionFolderNode solutionFolderNode, IProject newProject)
        {
            if (solutionFolderNode == null)
                throw new ArgumentNullException("solutionFolderNode");
            if (newProject != null)
            {
                newProject.Location = FileUtility.GetRelativePath(solutionFolderNode.Solution.Directory, newProject.FileName);
                ProjectService.AddProject(solutionFolderNode, newProject);
                NodeBuilders.AddProjectNode((TreeNode)solutionFolderNode, newProject).EnsureVisible();
            }
        }

        public override void Run()
        {
            AbstractFileTreeNode node = ProjectBrowserPad.Instance.ProjectBrowserControl.SelectedNode;
            ISolutionFolderNode solutionFolderNode = node as ISolutionFolderNode;
            if (node != null)
            {
                using (OpenFileDialog fdiag = new OpenFileDialog())
                {
                    fdiag.AddExtension = true;
                    fdiag.Filter = ProjectService.GetAllProjectsFilter(this);
                    fdiag.Multiselect = true;
                    fdiag.CheckFileExists = true;
                    fdiag.InitialDirectory = AddNewProjectToSolution.GetInitialDirectorySuggestion(solutionFolderNode);
                    if (fdiag.ShowDialog(SimpleDesktop.MainForm) == DialogResult.OK)
                    {
                        foreach (string fileName in fdiag.FileNames)
                            AddProject(solutionFolderNode, fileName);
                        ProjectService.SaveSolution();
                    }
                }
            }
        }
    }
}
