//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.ServiceService.cs                     </Name>
//    <Description> Služba pro práci se službami                                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using Gordic.Gfe.FormFiller.Gui;
using Gordic.GFE.Parsers.Hosting;

namespace Gordic.Gfe.FormFiller
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
            get
            {
                return SimpleDesktop.Desktop.ActiveViewContent is IHost ?
                    (SimpleDesktop.Desktop.ActiveViewContent as IHost).ServiceSelection : null;
            }
        }
    }
}
