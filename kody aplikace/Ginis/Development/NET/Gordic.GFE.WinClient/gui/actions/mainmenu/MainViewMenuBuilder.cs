//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.MainViewMenuBuilder.cs                 </Name>
//    <Description> Nástroj vytvoření položek menu                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-07                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Core.WinForm;
using Gordic.GFE.WinClient.External;
using Gordic.GFE.WinClient.Gui;
using Gordic.General;

namespace Gordic.GFE.WinClient.Commands
{
    /// <summary>
    /// Nástroj pro vytvtoření položek menu Zobrazení
    /// </summary>
    abstract class ViewMenuBuilder : ISubmenuBuilder
    {
        class MyMenuItem : MenuCommand
        {
            PadDescriptor padDescriptor;
            /// <summary>
            /// Vytvoření nové instance třídy
            /// </summary>
            /// <param name="padDescriptor">Podložka daného menu</param>
            public MyMenuItem(PadDescriptor padDescriptor)
            {
                this.padDescriptor = padDescriptor;

                if (!string.IsNullOrEmpty(padDescriptor.Icon))
                    base.Image = IconService.GetBitmap(padDescriptor.Icon);

                if (padDescriptor.Shortcut != null)
                    ShortcutKeys = MenuCommand.ParseShortcut(padDescriptor.Shortcut);
            }

            /// <summary>
            /// Reakce na kliknutí na položku
            /// </summary>
            /// <param name="e"></param>
            protected override void OnClick(EventArgs e)
            {
                base.OnClick(e);
                padDescriptor.BringPadToFront(SimpleDesktop.Desktop.DesktopLayout);
            }

        }
        /// <summary>
        /// Kategorie položky menu
        /// </summary>
        protected abstract string Category { get; }

        /// <summary>
        /// Vytvoření podpoložek menu
        /// </summary>
        /// <param name="entity">Větev konfiguračního stromu</param>
        /// <param name="owner">Vlastník položky</param>
        /// <returns></returns>
        public ToolStripItem[] BuildSubmenu(Entity entity, object owner)
        {
            List<ToolStripItem> items = new List<ToolStripItem>();
            foreach (PadDescriptor padContent in SimpleDesktop.Desktop.PadContentCollection)
                if (padContent.Category == Category)
                {
                    var mmi = new MyMenuItem(padContent);
                    mmi.Initialize(padContent.Title);
                    items.Add(mmi);
                }

            return items.ToArray();
        }
    }

    /// <summary>
    /// Nástroj vytvoření položek menu Zobrazení
    /// </summary>
    class MainViewMenuBuilder : ViewMenuBuilder
    {
        /// <summary>
        /// Kategorie položky
        /// </summary>
        protected override string Category { get { return "Main"; } }
    }

    /// <summary>
    /// Nástroj vytvoření položek menu Nástroje položky menu Zobrazení
    /// </summary>
    class ToolsViewMenuBuilder : ViewMenuBuilder
    {
        /// <summary>
        /// Kategorie
        /// </summary>
        protected override string Category
        {
            get { return "Tools"; }
        }
    }

    class ToolMenuBuilder : ISubmenuBuilder
    {
        public ToolStripItem[] BuildSubmenu(Entity entity, object owner)
        {
            ToolStripItem[] items = new ToolStripItem[ToolLoader.Tool.Count != 0 ? ToolLoader.Tool.Count + 1 : ToolLoader.Tool.Count];
            for (int i = 0; i < ToolLoader.Tool.Count; ++i)
            {
                MenuCommand item = new MenuCommand(new EventHandler(ToolEvt));
                item.Initialize(ToolLoader.Tool[i].ToString());
                item.Description = GResources.GetResourceText(29450429) + ' ' + String.Join(String.Empty, ToolLoader.Tool[i].ToString().Split('&')); //RC 29450429 : Spuštění nástroje
                items[i] = item;
            }

            // vložení oddělovače
            if (items.Length != 0)
            {
                var ms = new MenuSeparator();
                ms.Initialize();
                items[items.Length - 1] = ms;
            }
            return items;
        }

        void ToolEvt(object sender, EventArgs e)
        {
            MenuCommand item = (MenuCommand)sender;

            for (int i = 0; i < ToolLoader.Tool.Count; ++i)
            {
                if (item.Text != ToolLoader.Tool[i].ToString()) { continue; }
                ExternalTool tool = (ExternalTool)ToolLoader.Tool[i];

                string command = tool.Command;
                string args = tool.Arguments;

                try
                {
                    command = StringParser.Parse(tool.Command);
                    args = StringParser.Parse(tool.Arguments);
                }
                catch (Exception ex)
                {
                    MessageService.ShowError(GResources.GetResourceText(29450430) + "'" + ex.Message + "'!"); //RC 29450430 : Spuštění nástroje selhalo
                    return;
                }

                try
                {
                    ProcessStartInfo startinfo;
                    if (args == null || args.Length == 0 || args.Trim('"', ' ').Length == 0)
                        startinfo = new ProcessStartInfo(command);
                    else
                        startinfo = new ProcessStartInfo(command, args);
                    startinfo.WorkingDirectory = StringParser.Parse(tool.InitialDirectory);
                    Process process = new Process();
                    process.StartInfo = startinfo;
                    process.Start();
                }
                catch (Exception ex)
                {
                    MessageService.ShowError(GResources.GetResourceText(29450430) + "'" + command + " " + args + "'\n" + ex.Message + '!'); //RC 29450430 : Spuštění nástroje selhalo
                }
                return;
            }
        }
    }

}
