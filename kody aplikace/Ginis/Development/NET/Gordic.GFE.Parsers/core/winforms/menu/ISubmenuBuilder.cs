//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ISubmenuBuilder.cs                     </Name>
//    <Description> Rozhraní podpoložek                                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-03                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;

namespace Gordic.GFE.Parsers.Core.WinForm
{
    /// <summary>
    /// Rozhraní podpoložek
    /// </summary>
    public interface ISubmenuBuilder
    {
        /// <summary>
        /// Vytvoření podpoložek položky
        /// </summary>
        /// <param name="entity">Jednotka s informaci</param>
        /// <param name="owner">Vlastník</param>
        /// <returns></returns>
        ToolStripItem[] BuildSubmenu(Entity entity, object owner);
    }
}
