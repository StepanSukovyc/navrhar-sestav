//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IParser.cs                               </Name>
//    <Description> Rozhraní analyzátorů                                        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Binding;
using Gordic.GFE.Parsers.Dom;

namespace Gordic.GFE.Parsers.Services
{
    /// <summary>
    /// Rozhraní analyzátorů
    /// </summary>
    public interface IParser
    {
        /// <summary>
        /// Zjištění, zda daný analyzátor umí zpracovat soubor
        /// </summary>
        /// <param name="fileName">Soubor k analýze</param>
        /// <param name="fileContent">případný obsah souboru</param>
        bool CanParse(string fileName, string fileContent = null);

        /// <summary>
        /// Analýza souboru
        /// </summary>
        /// <param name="fileName">Název souboru</param>
        /// <param name="fileContent">Případný obsah souboru</param>
        /// <returns></returns>
        ICompilationUnit Parse(string fileName, string fileContent);
        /// <summary>
        /// získání nástroje na hledání výrazů
        /// </summary>
        /// <param name="fileName">název souboru</param>
        /// <returns></returns>
        IExpressionFinder CreateExpressionFinder(string fileName);

        /// <summary>
        /// vytvoření rozhodovače v textovém režimu
        /// </summary>
        /// <returns></returns>
        IResolver CreateResolver();

        ///// <summary>
        ///// získání obsahu pro analýzu souboru
        ///// </summary>
        ///// <param name="fileName">název souboru</param>
        ///// <returns></returns>
        //string GetParseableFileContent(string fileName);
    }
}
