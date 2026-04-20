//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ISolutionFolderNode.cs                 </Name>
//    <Description> Rozhraní větví řešení                                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using Gordic.GFE.WinClient.Project;

namespace Gordic.GFE.WinClient.ProjectBrowser
{
    /// <summary>
    /// Rozhraní větví řešení
    /// </summary>
    interface ISolutionFolderNode
    {
        /// <summary>
        /// řešení
        /// </summary>
        Solution Solution { get; }
        /// <summary>
        /// složka řešení
        /// </summary>
        ISolutionFolder Folder { get; }
        /// <summary>
        /// kontainer řešení
        /// </summary>
        ISolutionFolderContainer Container { get; }
        /// <summary>
        /// přidání nové položky
        /// </summary>
        /// <param name="fileName">cesta k souboru položky</param>
        void AddItem(string fileName);
    }
}
