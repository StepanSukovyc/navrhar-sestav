//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.ToolCommands.cs                       </Name>
//    <Description> Příkaz možnosti                                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using Gordic.Gfe.FormFiller.Gui;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.General;
using System.Drawing;

namespace Gordic.Gfe.FormFiller.ToolCommands
{
    /// <summary>
    /// Příkaz možnosti
    /// </summary>
    class OptionsCommand : AbstractMenuCommand
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
                Width = 1450,
                Height = 425,
                MinimumSize = new Size(1450, 425),
                FormBorderStyle = FormBorderStyle.Sizable,
                Icon = WinFormsResourceService.GetIcon(node.Icon)
            };
            o.ShowDialog(SimpleDesktop.MainForm);
            o.Dispose();
            return true;
        }
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            using (TreeViewOptions optionsDialog = new TreeViewOptions(AddInTree.GetTreeNode("/FormFiller/Dialogs/OptionsDialog")))
            {
                optionsDialog.FormBorderStyle = FormBorderStyle.Sizable;
                optionsDialog.MinimumSize = new Size(1450, 425);

                optionsDialog.Owner = SimpleDesktop.MainForm;
                if (optionsDialog.ShowDialog(SimpleDesktop.MainForm) == DialogResult.OK)
                    PropertyService.Save();
            }
        }
    }

    /// <summary>
    /// Vlastností
    /// </summary>
    class ShowApplicationOptions : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            ShowSettings();
        }

        /// <summary>
        /// Zobrazení nastavení aplikace
        /// </summary>
        public static bool ShowSettings()
        {
            return OptionsCommand.ShowTabbedOptions(GResources.GetResourceText(29450050) + " ...", //RC 29450050 : Nastavení aplikace
                                             AddInTree.GetTreeNode("/FormFiller/Application/OptionsDesignerDialog"));
        }
    }

    /// <summary>
    /// Náhled sestavy
    /// </summary>
    class ContentPreview : AbstractMenuCommand
    {
        /// <summary>
        /// Indikuje, zda operace je povolená či nikoliv
        /// </summary>
        public override bool IsEnabled { get { return SimpleDesktop.Desktop.ActiveViewContent is IPreviewHandler; } }

        /// <summary>
        /// Uložení souboru
        /// </summary>
        public override void Run()
        {
            if (SimpleDesktop.Desktop.ActiveViewContent is IPreviewHandler)
                (SimpleDesktop.Desktop.ActiveViewContent as IPreviewHandler).Preview();
        }
    }
    /// <summary>
    /// Export do PDF
    /// </summary>
    class PdfExport : AbstractMenuCommand
    {
        /// <summary>
        /// Indikuje, zda operace je povolená či nikoliv
        /// </summary>
        public override bool IsEnabled { get { return SimpleDesktop.Desktop.ActiveViewContent is IPDFHandler; } }

        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (SimpleDesktop.Desktop.ActiveViewContent is IPDFHandler)
                (SimpleDesktop.Desktop.ActiveViewContent as IPDFHandler).ToPDF();
        }
    }
    /// <summary>
    /// Odeslaní souboru
    /// </summary>
    class SendFile : AbstractMenuCommand
    {
        /// <summary>
        /// Indikuje, zda operace je povolená či nikoliv
        /// </summary>
        public override bool IsEnabled { get { return SimpleDesktop.Desktop.ActiveViewContent is ISendHandler c && c.CanSend; } }

        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (SimpleDesktop.Desktop.ActiveViewContent is ISendHandler)
                (SimpleDesktop.Desktop.ActiveViewContent as ISendHandler).Send(0, new DocfrmSender());
        }
    }
}
