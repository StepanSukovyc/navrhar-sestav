//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SideBarTabCommands.cs                  </Name>
//    <Description> Odstranění záložky postranní lišty                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Gui;
using Gordic.General;
using Gordic.GFE.WinClient.Base.Gui;

namespace Gordic.GFE.WinClient.SideBarCommands
{
    /// <summary>
    /// Odstranění záložky postranní lišty
    /// </summary>
    class SideBarDeleteTabHeader : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            ReportDesignerSideBar sideBar = (ReportDesignerSideBar)Owner;
            SideTab selectedSideTab = sideBar.GetTabAt(sideBar.SideBarMousePosition.X, sideBar.SideBarMousePosition.Y);
            if (MessageBox.Show(
                StringParser.Parse(string.Join(" ", GResources.GetResourceText(29450433), "\"${TabHeader}\"", GResources.GetResourceText(29450432)), new string[,] { { "TabHeader", selectedSideTab.DisplayName } }), //RC 29450433 : Opravdu si přejete odstranit záložku
                                GResources.GetResourceText(29450263), //RC 29450263 : Dotaz
                                MessageBoxButtons.YesNo,
                                MessageBoxIcon.Question,
                                MessageBoxDefaultButton.Button2) == DialogResult.Yes)
            {
                sideBar.DeleteSideTab(selectedSideTab);
                sideBar.Refresh();
            }
        }
    }
    /// <summary>
    /// Přejmenování záložky postranní lišty
    /// </summary>
    class SideBarRenameTabHeader : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            ReportDesignerSideBar sideBar = (ReportDesignerSideBar)Owner;
            sideBar.StartRenamingOf(sideBar.GetTabAt(sideBar.SideBarMousePosition.X, sideBar.SideBarMousePosition.Y));
        }
    }

    /// <summary>
    /// Přidání záložky na postranní lištu
    /// </summary>
    class SideBarAddTabHeader : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            ReportDesignerSideBar sideBar = (ReportDesignerSideBar)Owner;
            SideTab tab = new SideTab(sideBar, GResources.GetResourceText(29450434)); //RC 29450434 : Nová záložka
            sideBar.Tabs.Add(tab);
            sideBar.StartRenamingOf(tab);
            sideBar.DoAddTab = true;
            sideBar.Refresh();
        }
    }

    /// <summary>
    /// posunutí záložky postranní lišty o jednu nahoru
    /// </summary>
    class SideBarMoveActiveTabUp : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            ReportDesignerSideBar sideBar = (ReportDesignerSideBar)Owner;
            int index = sideBar.Tabs.IndexOf(sideBar.ActiveTab);
            if (index > 0)
            {
                SideTab tab = sideBar.Tabs[index];
                sideBar.Tabs[index] = sideBar.Tabs[index - 1];
                sideBar.Tabs[index - 1] = tab;
                sideBar.Refresh();
            }
        }
    }

    /// <summary>
    /// Posunutí záložky postranní lišty o jednu dolů
    /// </summary>
    class SideBarMoveActiveTabDown : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            ReportDesignerSideBar sideBar = (ReportDesignerSideBar)Owner;
            int index = sideBar.Tabs.IndexOf(sideBar.ActiveTab);
            if (index >= 0 && index < sideBar.Tabs.Count - 1)
            {
                SideTab tab = sideBar.Tabs[index];
                sideBar.Tabs[index] = sideBar.Tabs[index + 1];
                sideBar.Tabs[index + 1] = tab;
                sideBar.Refresh();
            }
        }
    }

    /// <summary>
    /// Posunutí záložky postranní lišty o jednu nahoru
    /// </summary>
    class SideBarMoveTabUp : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            ReportDesignerSideBar sideBar = (ReportDesignerSideBar)Owner;
            int index = sideBar.GetTabIndexAt(sideBar.SideBarMousePosition.X, sideBar.SideBarMousePosition.Y);
            if (index > 0)
            {
                SideTab tab = sideBar.Tabs[index];
                sideBar.Tabs[index] = sideBar.Tabs[index - 1];
                sideBar.Tabs[index - 1] = tab;
                sideBar.Refresh();
            }
        }
    }
    /// <summary>
    /// Posunutí záložky postranní lišty o jednnu dolů
    /// </summary>
    class SideBarMoveTabDown : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            ReportDesignerSideBar sideBar = (ReportDesignerSideBar)Owner;
            int index = sideBar.GetTabIndexAt(sideBar.SideBarMousePosition.X, sideBar.SideBarMousePosition.Y);
            if (index >= 0 && index < sideBar.Tabs.Count - 1)
            {
                SideTab tab = sideBar.Tabs[index];
                sideBar.Tabs[index] = sideBar.Tabs[index + 1];
                sideBar.Tabs[index + 1] = tab;
                sideBar.Refresh();
            }

        }
    }

}
