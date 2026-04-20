//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.AddNewProjectToSolution.cs             </Name>
//    <Description> Přidání nového projektu do řešení                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Project;
using Gordic.GFE.WinClient.AddIns;

namespace Gordic.GFE.WinClient.ProjectBrowser
{
    /// <summary>
    /// Přidání nového projektu do řešení
    /// </summary>
    class AddNewProjectToSolution : AbstractMenuCommand
    {
        /// <summary>
        /// spuštění příkazu
        /// </summary>
        public override void Run()
        {
            AbstractFileTreeNode node = ProjectBrowserPad.Instance.ProjectBrowserControl.SelectedNode;
            ISolutionFolderNode solutionFolderNode = node as ISolutionFolderNode;
            //if (node != null)
            //{
            //    using (NewProjectDialog npdlg = new NewProjectDialog(false))
            //    {
            //        npdlg.InitialProjectLocationDirectory = GetInitialDirectorySuggestion(solutionFolderNode);

            //        if (npdlg.ShowDialog(SimpleDesktop.MainForm) == DialogResult.OK)
            //        {
            //            if (npdlg.NewProjectLocation.Length == 0)
            //            {
            //                MessageService.ShowError("Žádný projekt nebyl vytvořen, není co přidávát.");
            //                return;
            //            }
            //            AddExitingProjectToSolution.AddProject(solutionFolderNode, npdlg.NewProjectLocation);
            //            ProjectService.SaveSolution();
            //        }
            //    }
            //}
        }

        internal static string GetInitialDirectorySuggestion(ISolutionFolderNode solutionFolderNode)
        {
            int projectCount = 0;
            string initialDirectory = null;
            foreach (ISolutionFolder folderEntry in solutionFolderNode.Container.Folders)
            {
                IProject project = folderEntry as IProject;
                if (project != null)
                {
                    if (projectCount == 0)
                        initialDirectory = project.Directory;
                    else
                        initialDirectory = FileUtility.GetCommonBaseDirectory(initialDirectory, project.Directory);
                    projectCount++;
                }
            }
            if (initialDirectory != null)
            {
                if (projectCount == 1)
                    return FileUtility.GetAbsolutePath(initialDirectory, "..");
                else
                    return initialDirectory;
            }
            else
                return solutionFolderNode.Solution.Directory;
        }
    }
}
