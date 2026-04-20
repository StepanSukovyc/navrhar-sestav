//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ProjectEventHandler.cs                 </Name>
//    <Description> delegát události s argumentem projektu                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.GFE.WinClient.Project
{
    /// <summary>
    /// delegát události s argumentem projektu
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    delegate void ProjectEventHandler(object sender, ProjectEventArgs e);

    /// <summary>
    /// Argument obsahující informaci o projektu
    /// </summary>
    class ProjectEventArgs : EventArgs
    {
        IProject project;
        /// <summary>
        /// Projekt
        /// </summary>
        public IProject Project { get { return project; } }
        /// <summary>
        /// Vytvoření nové instance argumentu
        /// </summary>
        /// <param name="project">Informace o projektu</param>
        public ProjectEventArgs(IProject project)
        {
            this.project = project;
        }
    }
}
