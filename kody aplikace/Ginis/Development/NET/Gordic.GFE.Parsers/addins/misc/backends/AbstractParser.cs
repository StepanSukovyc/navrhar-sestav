//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AbstractParser.cs                        </Name>
//    <Description> abstraktní třída analyzátoru                                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-27                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.Parsers.Services;

namespace Gordic.GFE.Parsers.Binding
{
    /// <summary>
    /// abstraktní třída analyzátoru
    /// </summary>
    public abstract class AbstractParser : IParser
    {
        #region IParser

        string[] lexerTags;
        /// <summary>
        /// štítky jazyka
        /// </summary>
        public string[] LexerTags
        {
            get { return lexerTags; }
            set { lexerTags = value; }
        }
        /// <summary>
        /// vlastnosti formátu
        /// </summary>
        public Dom.LanguageProperties Language { get { return Dom.LanguageProperties.GRF; } }
        /// <summary>
        /// Zjištění, zda daný analyzátor umí zpracovat soubor
        /// </summary>
        /// <param name="fileName">Soubor k analýze</param>
        /// <param name="fileContent">případný obsah souboru</param>
        public virtual bool CanParse(string fileName, string fileContent = null)
        {
            //if (Path.GetExtension(fileName).Equals(".ALF", StringComparison.OrdinalIgnoreCase)
            //    || Path.GetExtension(fileName).Equals(".ALFX", StringComparison.OrdinalIgnoreCase))
            //    if (ParserService.ParseFile(this, fileName, fileContent) != null)
            //        return true;
            return false;
        }
        /// <summary>
        /// Analýza souboru
        /// </summary>
        /// <param name="fileName">Název souboru</param>
        /// <param name="fileContent">Případný obsah souboru</param>
        /// <returns></returns>
        public virtual Dom.ICompilationUnit Parse(string fileName, string fileContent)
        {
            var cu = new CompilationUnit();
            cu.Initialize(fileContent);
            return cu;
        }
        /// <summary>
        /// vytvoření rozhodovače v textovém režimu
        /// </summary>
        /// <returns></returns>
        public IResolver CreateResolver()
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// získání nástroje na hledání výrazů
        /// </summary>
        /// <param name="fileName">název souboru</param>
        /// <returns></returns>
        public IExpressionFinder CreateExpressionFinder(string fileName)
        {
            throw new NotImplementedException();
        }
        ///// <summary>
        ///// získání obsahu pro analýzu souboru
        ///// </summary>
        ///// <param name="fileName">název souboru</param>
        ///// <returns></returns>
        //public virtual string GetParseableFileContent(string fileName) { return ParserService.GetParseableFileContent(fileName); }

        #endregion
    }
}
