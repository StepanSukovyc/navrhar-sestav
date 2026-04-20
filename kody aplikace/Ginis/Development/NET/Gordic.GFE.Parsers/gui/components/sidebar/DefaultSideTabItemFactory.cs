//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.DefaultSideTabItemFactory.cs           </Name>
//    <Description> Výchozí farma vytváření položek postranní lišty             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-08                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Výchozí farma vytváření položek postranní lišty
    /// </summary>
    public class DefaultSideTabItemFactory : ISideTabItemFactory
    {
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="name">Název postranní záložky</param>
        /// <returns></returns>
        public SideTabItem CreateSideTabItem(string name)
        {
            return new SideTabItem(name);
        }
        /// <summary>
        /// Vytvoření postranní záložky
        /// </summary>
        /// <param name="name">Název</param>
        /// <param name="tag">Tag objekt</param>
        /// <returns></returns>
        public SideTabItem CreateSideTabItem(string name, object tag)
        {
            return new SideTabItem(name, tag);
        }
        /// <summary>
        /// Vytvoření položky záložky dle názvu
        /// </summary>
        /// <param name="entry">jednotka s informaci o objektu</param>
        /// <returns></returns>
        public SideTabItem CreateSideTabItem(ComponentTemplateEntry entry)
        {
            return new SideTabItem(entry);
        }

        /// <summary>
        /// Vytvoření položky záložky dle názvu
        /// </summary>
        /// <param name="entry">jednotka s informaci o objektu</param>
        /// <returns></returns>
        public SideTabItem CreateSideTabItem(GFETemplate entry)
        {
            return new SideTabItem(entry);
        }
    }
}
