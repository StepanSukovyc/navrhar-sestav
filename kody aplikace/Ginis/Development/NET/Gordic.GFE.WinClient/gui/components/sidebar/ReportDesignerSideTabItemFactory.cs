//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ReportDesignerSideTabItemFactory.cs      </Name>
//    <Description> Fabrika na vytváření položek záložek postranní lišty        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-09                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;

namespace Gordic.GFE.WinClient.Gui
{
    /// <summary>
    /// Fabrika na vytváření položek záložek postranní lišty
    /// </summary>
    public class ReportDesignerSideTabItemFactory : ISideTabItemFactory
    {
        /// <summary>
        /// Vytvoření nové položky záložky postranní lišty
        /// </summary>
        /// <param name="name">Název vytvářené položky záložky</param>
        /// <returns></returns>
        public SideTabItem CreateSideTabItem(string name)
        {
            return new ReportDesignerSideTabItem(name);
        }
        /// <summary>
        /// Vytvoření nové položky záložky postranní lišty
        /// </summary>
        /// <param name="name">Název vytvářené položky záložky</param>
        /// <param name="tag">Tag objekt</param>
        /// <returns></returns>
        public SideTabItem CreateSideTabItem(string name, object tag)
        {
            return new ReportDesignerSideTabItem(name, tag);
        }
        /// <summary>
        /// Vytvoření položky záložky dle názvu
        /// </summary>
        /// <param name="entry">jednotka s informaci o objektu</param>
        /// <returns></returns>
        public SideTabItem CreateSideTabItem(ComponentTemplateEntry entry)
        {
            return new ReportDesignerSideTabItem(entry);
        }

        /// <summary>
        /// Vytvoření položky záložky dle názvu
        /// </summary>
        /// <param name="entry">jednotka s informaci o objektu</param>
        /// <returns></returns>
        public SideTabItem CreateSideTabItem(GFETemplate entry)
        {
            return new ReportDesignerSideTabItem(entry);
        }
    }
}
