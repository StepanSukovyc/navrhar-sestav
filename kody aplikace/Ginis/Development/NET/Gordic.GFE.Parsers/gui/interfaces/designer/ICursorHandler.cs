//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ICursorHandler.cs                        </Name>
//    <Description> Rozhraní pro kurzór                                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-05-10                                                  </Created>
//  </FileHeader>

using System.Drawing;
using System.Windows.Forms;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Rozhraní pro kurzór
    /// </summary>
    public interface ICursorHandler
    {
        /// <summary>
        /// Povolená změna vzhledu kurzóru
        /// </summary>
        bool EnableCursor { get; }

        /// <summary>
        /// Získání vzhledu kurzóru dle jeho umístění
        /// </summary>
        /// <param name="pointF">Umístění kurzóru</param>
        /// <param name="direction">Směr pohybu</param>
        Cursor GetCursor(PointF pointF, ref int direction);
    }
}
