//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.RunXslTransformCommand.cs              </Name>
//    <Description> Spuštění XSL transformaci nad aktivním XML dokumentem       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-10                                                  </Created>
//  </FileHeader>

using System;
using System.IO;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.XmlEditor.Gui.Editor;
using Gordic.General;

namespace Gordic.GFE.WinClient.XmlEditor
{
    /// <summary>
    /// Spuštění XSL transformaci nad aktivním XML dokumentem
    /// </summary>
    public class RunXslTransformCommand : AbstractCommand
    {
        /// <summary>
        /// Spuštění příkazu.
        /// </summary>
        public override void Run()
        {
            XmlView xmlView = XmlView.ActiveXmlView;
            if (xmlView != null)
            {
                if (xmlView is XslOutputView)
                    return;

                // zkontrolujeme, zda aktuální pohled odkazuje na daný styl
                if (!string.IsNullOrEmpty(xmlView.PrimaryFileName))
                {
                    XmlView associatedXmlView = GetAssociatedXmlView(xmlView.PrimaryFileName);
                    if (associatedXmlView != null)
                    {
                        LoggingService.Debug(GResources.GetResourceText(29450204)); //RC 29450204 : Použití XML přidruženého zobrazení
                        xmlView = associatedXmlView;
                    }
                }

                // přiřazení stylu.
                if (xmlView.StylesheetFileName == null)
                    xmlView.StylesheetFileName = AssignStylesheetCommand.BrowseForStylesheetFile();

                if (xmlView.StylesheetFileName != null)
                    try { xmlView.RunXslTransform(GetStylesheetContent(xmlView.StylesheetFileName)); }
                    catch (Exception ex) { MessageService.ShowError(ex); }
            }
        }

        XmlView GetAssociatedXmlView(string stylesheetFileName)
        {
            foreach (IViewContent content in SimpleDesktop.Desktop.ViewContentCollection)
            {
                if (content is XmlView view && view.StylesheetFileName != null)
                    if (FileUtility.IsEqualFileName(view.StylesheetFileName, stylesheetFileName))
                        return view;
            }
            return null;
        }

        string GetStylesheetContent(string fileName)
        {
            // soubor je již otevřen?
            if (Services.FileAgent.GetViewForFile(fileName) is XmlView view)
                return view.Text;

            // načtení obsahu.
            StreamReader reader = new StreamReader(fileName, true);
            return reader.ReadToEnd();
        }
    }
}
