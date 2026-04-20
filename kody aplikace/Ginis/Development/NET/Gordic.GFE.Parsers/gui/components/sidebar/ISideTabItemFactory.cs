//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ISideTabItemFactory.cs                 </Name>
//    <Description> Rozhraní farem na vytvoření položek postranní lišty         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-08                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Rozhraní farem na vytvoření položek postranní lišty
    /// </summary>
    public interface ISideTabItemFactory
    {
        /// <summary>
        /// Vytvoření položky záložky dle názvu
        /// </summary>
        /// <param name="name">Název položky záložky</param>
        /// <returns></returns>
        SideTabItem CreateSideTabItem(string name);
        /// <summary>
        /// Vytvoření položky záložky dle názvu
        /// </summary>
        /// <param name="name">Název položky záložky</param>
        /// <param name="tag">Tag objekt položky záložky</param>
        /// <returns></returns>
        SideTabItem CreateSideTabItem(string name, object tag);
        /// <summary>
        /// Vytvoření položky záložky dle názvu
        /// </summary>
        /// <param name="entry">jednotka s informaci o objektu</param>
        /// <returns></returns>
        SideTabItem CreateSideTabItem(ComponentTemplateEntry entry);
        /// <summary>
        /// Vytvoření položky záložky dle názvu
        /// </summary>
        /// <param name="entry">jednotka s informaci o objektu</param>
        /// <returns></returns>
        SideTabItem CreateSideTabItem(GFETemplate entry);
    }
}
