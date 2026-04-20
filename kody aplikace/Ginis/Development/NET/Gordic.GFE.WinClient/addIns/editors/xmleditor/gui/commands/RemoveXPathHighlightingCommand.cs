//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.RemoveXPathHighlightingCommand.cs      </Name>
//    <Description> Skrýtí XPath výsledků                                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-10                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.XPathQuery;

namespace Gordic.GFE.WinClient.XmlEditor
{
    /// <summary>
    /// Skrýtí XPath výsledků
    /// </summary>
    public class RemoveXPathHighlightingCommand : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            XPathQueryPad pad = XPathQueryPad.Instance;
            if (pad != null)
                pad.RemoveXPathHighlighting();
        }
    }
}
