//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.Parser.cs                              </Name>
//    <Description> Analyzátor, který nedělá nic,                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Binding;
using Gordic.GFE.WinClient.XmlEditor.Gui.Editor;

namespace Gordic.GFE.WinClient.XmlEditor
{
    /// <summary>
    /// Analyzátor, který nedělá nic, 
    /// kromě jak vrácí prázdnou jednotku po provedení XmlFoldingStrategy
    /// </summary>
    class Parser : AbstractParser
    {
        /// <summary>
        /// Zjištění, zda daný analyzátor umí zpracovat soubor
        /// </summary>
        /// <param name="fileName">Soubor k analýze</param>
        /// <param name="fileContent">případný obsah souboru</param>
        public override bool CanParse(string fileName, string fileContent = null) { return XmlView.IsFileNameHandled(fileName); }
        
    }
}
