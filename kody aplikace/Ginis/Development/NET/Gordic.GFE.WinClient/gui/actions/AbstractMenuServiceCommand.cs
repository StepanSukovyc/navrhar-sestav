//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.AbstractMenuServiceCommand.cs          </Name>
//    <Description> obsahuje službu vybraných objektů                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-09-10                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Hosting;

namespace Gordic.GFE.WinClient.Gui
{
    /// <summary>
    /// obsahuje službu vybraných objektů
    /// </summary>
    public abstract class AbstractMenuServiceCommand : AbstractMenuCommand
    {
        /// <summary>
        /// služb apro práci s vybranými objekty
        /// </summary>
        protected SelectionService ServiceSelection
        {
            get
            {
                if (SimpleDesktop.Desktop.ActiveViewContent is IHost)
                    return (SimpleDesktop.Desktop.ActiveViewContent as IHost).ServiceSelection;
                return null;
            }
        }
    }
}
