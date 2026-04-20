//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.MenuService.cs                         </Name>
//    <Description> Služba reakci na položky menu                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-08-22                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Windows.Forms;
using System.Collections;
using System.Drawing;
using Gordic.GFE.Parsers.Gui;
using Gordic.General;

namespace Gordic.GFE.Parsers.Core.WinForm
{
    /// <summary>
    /// Služba pro práci s položkami menu
    /// </summary>
    public static class MenuService
    {
        /// <summary>
        /// Přidání položek do menu položky
        /// </summary>
        /// <param name="collection">Kolekce, do které se přidávají položky</param>
        /// <param name="owner">Vlastník</param>
        /// <param name="addInTreePath">Větev konfiguračního stromu s popisem položek</param>
        public static void AddItemsToMenu(ToolStripItemCollection collection, object owner, string addInTreePath)
        {
            AddItemsToMenu(collection, AddInTree.BuildItems<MenuItemDescriptor>(addInTreePath, owner, false));
        }

        /// <summary>
        /// Přidání položek do kolekce menu
        /// </summary>
        /// <param name="collection">Kolekce do které se přidává</param>
        /// <param name="descriptors">Seznam popisovačů položek</param>
        static void AddItemsToMenu(ToolStripItemCollection collection, List<MenuItemDescriptor> descriptors)
        {
            foreach (MenuItemDescriptor descriptor in descriptors)
            {
                object item = CreateMenuItemFromDescriptor(descriptor);
                if (item is ToolStripItem itm)
                {
                    collection.Add(itm);
                    if (item is IStatusUpdate update)
                        update.UpdateStatus();
                }
                else
                {
                    ISubmenuBuilder submenuBuilder = (ISubmenuBuilder)item;
                    collection.AddRange(submenuBuilder.BuildSubmenu(null, descriptor.Caller));
                }
            }
        }

        static object CreateMenuItemFromDescriptor(MenuItemDescriptor descriptor)
        {
            Entity entity = descriptor.Entity;
            string type = entity.Properties.Contains("type") ? entity.Properties["type"] : "Command";
            bool createCommand = entity.Properties["loadclasslazy"] == "false";

            switch (type)
            {
                case "Separator":
                    var ms = new MenuSeparator(entity, descriptor.Caller);
                    ms.Initialize();
                    return ms;
                case "CheckBox":
                    var mcb = new MenuCheckBox(entity, descriptor.Caller);
                    mcb.Initialize();
                    return mcb;
                case "Item":
                case "Command":
                    var mc = new MenuCommand(entity, descriptor.Caller, createCommand);
                    mc.Initialize();
                    return mc;
                case "Menu":
                    var m = new Menu(entity, descriptor.Caller, ConvertSubItems(descriptor.SubItems));
                    m.Initialize();
                    return m;
                case "Builder":
                    return entity.AddIn.CreateObject(entity.Properties["class"]);
                default:
                    throw new System.NotSupportedException(GResources.GetResourceText(29450271) + ": " + type + '!'); //RC 29450271 : Nepodporovaný typ položky menu
            }
        }

        /// <summary>
        /// Převod podpoložek
        /// </summary>
        /// <param name="items">POdpoložky k převodu</param>
        /// <returns></returns>
        public static ArrayList ConvertSubItems(IList items)
        {
            ArrayList r = new ArrayList();
            if (items != null)
                foreach (MenuItemDescriptor descriptor in items)
                    r.Add(CreateMenuItemFromDescriptor(descriptor));
            return r;
        }

        /// <summary>
        /// Vytvoření kontextového menu
        /// </summary>
        /// <param name="sender">Vlastník kontextového menu</param>
        /// <param name="e">Větev konfiguračního stromu</param>
        /// <returns></returns>
        public static ContextMenuStrip CreateContextMenu(object sender, EventArgsContextMenu e)
        {
            if (e != EventArgs.Empty)
                try
                {
                    List<MenuItemDescriptor> descriptors = AddInTree.BuildItems<MenuItemDescriptor>(e.Path, sender, true);
                    ContextMenuStrip contextMenu = new ContextMenuStrip();
                    contextMenu.Items.Add(new ToolStripMenuItem("dummy"));
                    contextMenu.Opening += delegate
                    {
                        contextMenu.Items.Clear();
                        AddItemsToMenu(contextMenu.Items, descriptors);
                    };
                    contextMenu.Opened += ContextMenuOpened;
                    contextMenu.Closed += ContextMenuClosed;
                    return contextMenu;
                }
                catch (TreePathNotFoundException)
                {
                    MessageService.ShowErrorFormatted(string.Join(" ", GResources.GetResourceText(29450198), " '{0}' ", GResources.GetResourceText(29450272)), e); //RC 29450198 : Cesta
                }
            return null;
        }

        static bool isContextMenuOpen;
        /// <summary>
        /// Indikuje, zda kontextové menu je otevřené
        /// </summary>
        public static bool IsContextMenuOpen { get { return isContextMenuOpen; } }

        static void ContextMenuOpened(object sender, EventArgs e)
        {
            isContextMenuOpen = true;
            bool isFirst = true;
            ContextMenuStrip contextMenu = (ContextMenuStrip)sender;
            foreach (object item in contextMenu.Items)
            {
                if (item is IStatusUpdate update)
                    update.UpdateStatus();

                if (isFirst)
                {
                    var separ = item as MenuSeparator;
                    if (separ == null
                        && (item is MenuCommand
                        && (item as MenuCommand).Visible)
                        || (item is Menu && (item as Menu).Visible))
                        isFirst = false;
                    if (separ != null && separ.Visible)
                    {
                        separ.Visible = false;
                        isFirst = false;
                    }
                }
            }
        }

        static void ContextMenuClosed(object sender, EventArgs e)
        {
            isContextMenuOpen = false;
        }

        /// <summary>
        /// Zobrazení kontextového menu
        /// </summary>
        /// <param name="owner">Vlastník</param>
        /// <param name="addInTreePath">Cesta konfiguračního stromu</param>
        /// <param name="parent"></param>
        /// <param name="x">POzice X umístění</param>
        /// <param name="y">Pozice Y umístění</param>
        public static void ShowContextMenu(object owner, string addInTreePath, Control parent, int x, int y)
        {
            CreateContextMenu(owner, new EventArgsContextMenu(addInTreePath))?.Show(parent, new Point(x, y));
        }

        class QuickInsertMenuHandler
        {
            TextBoxBase targetControl;
            readonly string text;

            public QuickInsertMenuHandler(TextBoxBase targetControl, string text)
            {
                this.targetControl = targetControl;
                this.text = text;
            }

            public EventHandler EventHandlerQuotes { get => new EventHandler(PopupMenuHandlerQuotes); }
            public EventHandler EventHandler { get => new EventHandler(PopupMenuHandler); }
            void PopupMenuHandlerQuotes(object sender, EventArgs e) { targetControl.SelectedText += string.Format("\"{0}\"", text); }
            void PopupMenuHandler(object sender, EventArgs e) { targetControl.SelectedText += text; }
        }

        class QuickInsertHandler
        {
            Control popupControl;
            ContextMenuStrip quickInsertMenu;

            public QuickInsertHandler(Control popupControl, ContextMenuStrip quickInsertMenu)
            {
                this.popupControl = popupControl;
                this.quickInsertMenu = quickInsertMenu;

                popupControl.Click += new EventHandler(ShowQuickInsertMenu);
            }

            void ShowQuickInsertMenu(object sender, EventArgs e)
            {
                Point cords = new Point(popupControl.Width, 0);
                quickInsertMenu.Show(popupControl, cords);
            }
        }

        /// <summary>
        /// Menu rychlého vložení
        /// </summary>
        /// <param name="targetControl">cílový ovladač</param>
        /// <param name="popupControl">ovladač kontextového menu</param>
        /// <param name="quickInsertMenuItems">položky menu</param>
        /// <param name="withQuotes">indikuje nutnost avtomatického vložení uvozovek</param>
        public static void CreateQuickInsertMenu(TextBoxBase targetControl, Control popupControl, string[,] quickInsertMenuItems, bool withQuotes = true)
        {
            ContextMenuStrip contextMenu = new ContextMenuStrip();
            for (int i = 0; i < quickInsertMenuItems.GetLength(0); ++i)
                if (quickInsertMenuItems[i, 0] == "-")
                {
                    var ms = new MenuSeparator();
                    ms.Initialize();
                    contextMenu.Items.Add(ms);
                }
                else
                {
                    MenuCommand cmd = new MenuCommand(withQuotes
                                                      ? new QuickInsertMenuHandler(targetControl, quickInsertMenuItems[i, 1]).EventHandlerQuotes
                                                      : new QuickInsertMenuHandler(targetControl, quickInsertMenuItems[i, 1]).EventHandler);
                    cmd.Initialize(quickInsertMenuItems[i, 0]);
                    contextMenu.Items.Add(cmd);
                }
            new QuickInsertHandler(popupControl, contextMenu);
        }
    }
}
