//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SideBarItemCommands.cs                 </Name>
//    <Description> Přejmenování položky záložky postranní lišty                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-09                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Gui;
using Gordic.General;

namespace Gordic.GFE.WinClient.SideBarCommands
{
    /// <summary>
    /// Přejmenování položky záložky postranní lišty
    /// </summary>
    class SideBarRenameTabItem : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            ReportDesignerSideBar sideBar = (ReportDesignerSideBar)Owner;
            SideTabItem item = sideBar.ActiveTab.ChoosedItem;
            if (item != null)
                sideBar.StartRenamingOf(item);
        }
    }

    /// <summary>
    /// Odstranění položky záložky postranní lišty
    /// </summary>
    class SideBarDeleteTabItem : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            ReportDesignerSideBar sideBar = (ReportDesignerSideBar)Owner;
            SideTabItem item = sideBar.ActiveTab.ChoosedItem;
            if (item != null && MessageBox.Show(
                StringParser.Parse(string.Join(" ", GResources.GetResourceText(29450431), "\"${TabItem}\"?"), new string[,] { { "TabItem", item.Name } }), //RC 29450431 : Opravdu si přejete odstranit položku
                                GResources.GetResourceText(29450263), //RC 29450263 : Dotaz
                                MessageBoxButtons.YesNo,
                                MessageBoxIcon.Question,
                                MessageBoxDefaultButton.Button2) == DialogResult.Yes)
            {
                sideBar.ActiveTab.Items.Remove(item);
                sideBar.Refresh();
            }
        }
    }
    /// <summary>
    /// Posunutí položky záložky postranní lišty nahoru
    /// </summary>
    class SideBarMoveActiveItemUp : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            ReportDesignerSideBar sideBar = (ReportDesignerSideBar)Owner;
            int index = sideBar.ActiveTab.Items.IndexOf(sideBar.ActiveTab.ChoosedItem);
            if (index > 0)
            {
                sideBar.ActiveTab.Exchange(index - 1, index);
                sideBar.Refresh();
            }
        }
    }

    /// <summary>
    /// Posunutí položky záložky postranní lišty dolů
    /// </summary>
    class SideBarMoveActiveItemDown : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            ReportDesignerSideBar sideBar = (ReportDesignerSideBar)Owner;
            int index = sideBar.ActiveTab.Items.IndexOf(sideBar.ActiveTab.ChoosedItem);
            if (index >= 0 && index < sideBar.ActiveTab.Items.Count - 1)
            {
                sideBar.ActiveTab.Exchange(index, index + 1);
                sideBar.Refresh();
            }
        }
    }

}
