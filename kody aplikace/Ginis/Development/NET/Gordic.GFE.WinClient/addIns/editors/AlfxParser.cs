//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.AlfxParser.cs                          </Name>
//    <Description> analyzátor ALFX souboru                                     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-07-17                                                  </Created>
//  </FileHeader>

using System;
using System.IO;
using System.Text;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Binding;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Services;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// analyzátor ALFX souboru
    /// </summary>
    class AlfxParser : IParser
    {
        #region IParser
        /// <exclude/>
        public string[] LexerTags { get => null; set { } }

        readonly Parsers.Dom.LanguageProperties language = LanguageProperties.None;
        /// <summary>
        /// vlastnosti formátu
        /// </summary>
        public Parsers.Dom.LanguageProperties Language { get { return language; } }

        /// <summary>
        /// Zjištění, zda daný analyzátor umí zpracovat soubor
        /// </summary>
        /// <param name="fileName">Soubor k analýze</param>
        /// <param name="fileContent">případný obsah souboru</param>
        /// <returns>TRUE - daný analyzátor umí analyzovat soubor</returns>
        public bool CanParse(string fileName, string fileContent = null)
        {
            return Path.GetExtension(fileName).Equals(".ALFX", StringComparison.OrdinalIgnoreCase);
        }

        /// <summary>
        /// analýza souboru buď dle názvu <paramref name="fileName"/> nebo z obsahu <paramref name="fileContent"/>.
        /// </summary>
        /// <param name="fileName">Název souboru pro analýzu</param>
        /// <param name="fileContent">Obsah souboru k analýze</param>
        /// <returns>Kompilační jednotka souboru, v případě, že uveden obsah, pak kompilační jednotka obsahu.</returns>
        public Parsers.Dom.ICompilationUnit Parse(string fileName, string fileContent)
        {
            CompilationUnit unit = new CompilationUnit();
            Encoding encoding = Encoding.Default;
            unit.Initialize(string.IsNullOrEmpty(fileContent) ? ParserService.GetParseableFileContent(fileName, ref encoding) : fileContent);
            unit.FileName = fileName;
            unit.FileEncoding = encoding;
            return unit;
        }

        /// <exclude/>
        public IExpressionFinder CreateExpressionFinder(string fileName) { return null; }

        /// <exclude/>
        public Parsers.Binding.IResolver CreateResolver() { return null; }
        #endregion
    }
}
