//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.AutoHideMenuStripContainer.cs          </Name>
//    <Description> AutoHideMenuStripContainer můžeme použit uvnitř MenuStrip pro získání menu</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-12-24                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;

namespace Gordic.GFE.Parsers.Widgets
{
    /// <summary>
    /// AutoHideMenuStripContainer můžeme použit uvnitř MenuStrip pro získání menu
    /// které se automaticky skrývá a zobrazuje.
    /// </summary>
    public class AutoHideMenuStripContainer : AutoHideContainer
    {
        /// <summary>
        /// indikuje otevřenost dropdown operace
        /// </summary>
        protected bool dropDownOpened;

        Padding? defaultPadding;
        /// <summary>
        /// Přeformátování
        /// </summary>
        protected override void Reformat()
        {
            if (defaultPadding == null)
                defaultPadding = ((MenuStrip)control).Padding;
            ((MenuStrip)control).Padding = AutoHide ? Padding.Empty : (Padding)defaultPadding;
            base.Reformat();
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="menuStrip">Menu</param>
        public AutoHideMenuStripContainer(MenuStrip menuStrip)
            : base(menuStrip)
        {
            menuStrip.AutoSize = false;
            menuStrip.ItemAdded += OnMenuItemAdded;
            foreach (ToolStripMenuItem menuItem in menuStrip.Items)
                AddEventHandlersForItem(menuItem);
        }

        void OnMenuItemAdded(object sender, EventArgs e)
        {
            AddEventHandlersForItem((ToolStripMenuItem)sender);
        }

        void AddEventHandlersForItem(ToolStripMenuItem menuItem)
        {
            menuItem.DropDownOpened += delegate { dropDownOpened = true; };
            menuItem.DropDownClosed += delegate { dropDownOpened = false; if (!mouseIn) ShowOverlay = false; };
        }

        /// <exclude/>
        protected override void OnControlMouseLeave(object sender, EventArgs e)
        {
            mouseIn = false;
            if (!dropDownOpened) ShowOverlay = false;
        }
    }
}
