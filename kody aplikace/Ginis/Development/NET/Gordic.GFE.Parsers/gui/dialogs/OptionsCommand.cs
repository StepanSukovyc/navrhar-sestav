//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.OptionsCommand.cs                        </Name>
//    <Description> Příkaz možnosti                                             </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-07-02                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Services;
using System;
using System.Drawing;
using System.Windows.Forms;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Příkaz možnosti
    /// </summary>
    public class OptionsCommand : AbstractMenuCommand
    {
        /// <summary>
        /// Zobrazení jmenovaných možnosti
        /// </summary>
        /// <param name="dialogTitle">titulek dialogového okna</param>
        /// <param name="node">větev konfiguračníh ostromu</param>
        public static bool ShowTabbedOptions(string dialogTitle, AddInTreeNode node)
        {
            TabbedOptions o = new TabbedOptions(dialogTitle, node)
            {
                Width = 450,
                Height = 450,
                FormBorderStyle = FormBorderStyle.Sizable,
                MinimumSize = new Size(450, 425),
                Icon = WinFormsResourceService.GetIcon(node.Icon)
            };
            o.ShowDialog(ProcessService.Desktop.MainForm);
            o.Dispose();
            return true;
        }
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            using (TreeViewOptions optionsDialog = new TreeViewOptions(AddInTree.GetTreeNode("/ReportDesigner/Dialogs/OptionsDialog")))
            {
                optionsDialog.Owner = ProcessService.Desktop.MainForm;

                var savedSize = PropertyService.Get("OptionsDialogSize", optionsDialog.MinimumSize);
                optionsDialog.Size = savedSize;

                optionsDialog.FormClosing += (s, e) =>
                {
                    PropertyService.Set("OptionsDialogSize", optionsDialog.Size);
                };

                try
                {
                    if (optionsDialog.ShowDialog(ProcessService.Desktop.MainForm) == DialogResult.OK)
                        PropertyService.Save();
                }
                catch (Exception ex)
                {
                    MessageService.ShowErrorFormatted(GResources.GetResourceText(29450740) + ":\n{0}", ex.Message);
                }
            }
        }
    }
}
