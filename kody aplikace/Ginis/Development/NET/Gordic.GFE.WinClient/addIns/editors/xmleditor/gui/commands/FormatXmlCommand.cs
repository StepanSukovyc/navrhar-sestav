//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.FormatXmlCommand.cs                    </Name>
//    <Description> Pěkné zobrazení XML obsahu.                                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-10                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.XmlEditor.Gui.Editor;

namespace Gordic.GFE.WinClient.XmlEditor
{
    /// <summary>
    /// Pěkné zobrazení XML obsahu.
    /// </summary>
    public class FormatXmlCommand : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            // Nalezení aktivního XmlView.
            XmlView xmlView = XmlView.ActiveXmlView;
            xmlView?.FormatXml();
        }
    }
}
