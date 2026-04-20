//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ServiceService.cs                      </Name>
//    <Description> Služba pro práci se službami                                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Hosting;
using Gordic.GFE.WinClient.Gui;

namespace Gordic.GFE.WinClient
{
    /// <summary>
    /// Služba pro práci se službami
    /// </summary>
    static class ServiceService
    {
        /// <summary>
        /// Služba pro prácí s výběrem
        /// </summary>
        public static SelectionService ServiceSelection
        {
            get => SimpleDesktop.Desktop.ActiveViewContent is IHost ? (SimpleDesktop.Desktop.ActiveViewContent as IHost).ServiceSelection : null;
        }
    }
}
