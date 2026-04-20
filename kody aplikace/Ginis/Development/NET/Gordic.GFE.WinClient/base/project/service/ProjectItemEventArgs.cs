//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ProjectItemEventArgs.cs                </Name>
//    <Description> Argument metod s informaci o projektu                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.WinClient.Project
{
    /// <summary>
    /// Argument metod s informaci o projektu
    /// </summary>
    class ProjectItemEventArgs : ProjectEventArgs
    {
        ProjectItem projectItem;
        /// <summary>
        /// Položka projektu
        /// </summary>
        public ProjectItem ProjectItem { get { return projectItem; } }

        public ProjectItemEventArgs(IProject project, ProjectItem projectItem)
            : base(project)
        {
            this.projectItem = projectItem;
        }
    }
}
