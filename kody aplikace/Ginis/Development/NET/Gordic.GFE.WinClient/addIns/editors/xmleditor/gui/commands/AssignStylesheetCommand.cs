//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AssignStylesheetCommand.cs             </Name>
//    <Description> Umožní uživateli najit XSLT soubor stylů.                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-10                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.XmlEditor.Gui.Editor;
using Gordic.General;

namespace Gordic.GFE.WinClient.XmlEditor
{
    /// <summary>
    /// Umožní uživateli najit XSLT soubor stylů.
    /// Vybraný styl bude přiřazen danému XML dokumentu.
    /// </summary>
    public class AssignStylesheetCommand : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            // hledání aktivního XML dokumentu.
            XmlView xmlView = XmlView.ActiveXmlView;
            if (xmlView != null)
            {
                // upozornění uživatele na název souboru.
                string stylesheetFileName = BrowseForStylesheetFile();

                // přiřazení šablony stylu.
                if (stylesheetFileName != null)
                    xmlView.StylesheetFileName = stylesheetFileName;
            }
        }
        /// <summary>
        /// Hledání souboru stylů
        /// </summary>
        /// <returns></returns>
        public static string BrowseForStylesheetFile()
        {
            using (OpenFileDialog dialog = new OpenFileDialog())
            {
                dialog.AddExtension = true;
                dialog.Multiselect = false;
                dialog.CheckFileExists = true;
                dialog.Title = GResources.GetResourceText(29450203); //RC 29450203 : Přiřazení stylů XSLT

                AddInTreeNode node = AddInTree.GetTreeNode("/Desktop/FileFilter");
                if (node != null)
                {

                    string xmlFileFilter = (string)node.BuildChildItem("XML", null, null);
                    string allFilesFilter = (string)node.BuildChildItem("AllFiles", null, null);
                    string xslFileFilter = (string)node.BuildChildItem("Xsl", null, null);

                    dialog.Filter = String.Concat(xslFileFilter, "|", xmlFileFilter, "|", allFilesFilter);
                    dialog.FilterIndex = 1;
                }

                if (dialog.ShowDialog(SimpleDesktop.MainForm) == DialogResult.OK)
                    return dialog.FileName;
            }

            return null;
        }
    }
}
