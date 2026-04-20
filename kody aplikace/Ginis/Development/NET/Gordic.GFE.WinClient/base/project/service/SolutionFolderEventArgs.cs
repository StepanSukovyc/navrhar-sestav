//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SolutionFolderEventArgs.cs             </Name>
//    <Description> Argument obsahující informací o řešení                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.GFE.WinClient.Project
{
    delegate void SolutionFolderEventHandler(object sender, SolutionFolderEventArgs e);

    /// <summary>
    /// Argument obsahující informací o řešení
    /// </summary>
    class SolutionFolderEventArgs : EventArgs
    {
        ISolutionFolder solutionFolder;

        public ISolutionFolder SolutionFolder { get { return solutionFolder; } }

        public SolutionFolderEventArgs(ISolutionFolder solutionFolder)
        {
            this.solutionFolder = solutionFolder;
        }

    }
}
