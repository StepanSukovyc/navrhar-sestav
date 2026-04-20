//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.Parser.cs                              </Name>
//    <Description> Analyzátor, který nedělá nic,                               </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-05-13                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Binding;
using Gordic.GFE.Parsers.Dom;

namespace Gordic.GFE.WinClient.DataEditor
{
    /// <summary>
    /// Analyzátor, který nedělá nic, 
    /// kromě jak vrácí prázdnou jednotku po provedení DataFoldingStrategy
    /// </summary>
    class Parser : AbstractParser
    {
        /// <summary>
        /// Zjištění, zda daný analyzátor umí zpracovat soubor
        /// </summary>
        /// <param name="fileName">Soubor k analýze</param>
        /// <param name="content">případný obsah souboru</param>
        public override bool CanParse(string fileName, string content = null)
        {
            return DataView.CanCreateContent(fileName, content);
        }

        /// <summary>
        /// Analýza souboru
        /// </summary>
        /// <param name="fileName">Název souboru</param>
        /// <param name="fileContent">Případný obsah souboru</param>
        /// <returns></returns>
        public override ICompilationUnit Parse(string fileName, string fileContent)
        {
            var cud = new CUData(fileName, fileContent);
            ThreadService.SafeThreadAsyncCall(cud.UpdateContent, fileContent, false);
            return cud;
        }
    }
}
