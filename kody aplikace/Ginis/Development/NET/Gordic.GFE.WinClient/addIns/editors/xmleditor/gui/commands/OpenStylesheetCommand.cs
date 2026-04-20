//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.OpenStylesheetCommand.cs               </Name>
//    <Description> Otevření stylů asociovaných s aktivním dokumentem           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-10                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.XmlEditor.Gui.Editor;

namespace Gordic.GFE.WinClient.XmlEditor
{
    /// <summary>
    /// Otevření stylů asociovaných s aktivním dokumentem
    /// </summary>
    public class OpenStylesheetCommand : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            XmlView xmlView = XmlView.ActiveXmlView;
            if (xmlView != null)
                if (xmlView.StylesheetFileName != null)
                    try { Gordic.GFE.WinClient.Services.FileAgent.OpenFile(xmlView.StylesheetFileName); }
                    catch (Exception ex) { MessageService.ShowError(ex); }
        }
    }
}
