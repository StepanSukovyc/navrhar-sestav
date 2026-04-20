//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.AlfParser.cs                           </Name>
//    <Description> analyzátor 'alf' obsahu                                     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-07-18                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Binding;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Dom.Resolver;
using Gordic.GFE.Parsers.Services;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// analyzátor 'alf' obsahu
    /// </summary>
    class AlfParser : IParser
    {
        #region IParser
        /// <summary>
        /// Zjištění, zda daný analyzátor umí zpracovat soubor
        /// </summary>
        /// <param name="fileName">Soubor k analýze</param>
        /// <param name="fileContent">případný obsah souboru</param>
        /// <returns>TRUE - daný analyzátor umí analyzovat soubor</returns>
        public bool CanParse(string fileName, string fileContent = null)
        {
            return Path.GetExtension(fileName).Equals(".ALF", StringComparison.OrdinalIgnoreCase);
        }

        CompilationUnit cachUnit = null;
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
            if (unit.ErrorsDuringCompile)
                if (cachUnit != null)
                    unit.Language = cachUnit.Language;

            if (cachUnit != null
                && cachUnit.FileName == unit.FileName
                && !unit.Language.IsKnownLanguage)
                unit.Language = cachUnit.Language;
            unit.FileEncoding = encoding;
            cachUnit = unit;
            return unit;
        }

        Dictionary<LanguageProperties, ALFExpressionFinder> cachFinder = new Dictionary<LanguageProperties, ALFExpressionFinder>();
        /// <exclude/>
        public IExpressionFinder CreateExpressionFinder(string fileName)
        {
            if (cachUnit != null)
            {
                if (!cachFinder.ContainsKey(cachUnit.Language))
                {
                    if (cachUnit.Language == LanguageProperties.GRR)
                        cachFinder.Add(cachUnit.Language, new GrrExpressionFinder(ParserService.GetParseInformation(fileName)));
                    else if (cachUnit.Language == LanguageProperties.GRF)
                        cachFinder.Add(cachUnit.Language, new GrfExpressionFinder(ParserService.GetParseInformation(fileName)));
                    else if (cachUnit.Language == LanguageProperties.RTF)
                        cachFinder.Add(cachUnit.Language, new RtfExpressionFinder(ParserService.GetParseInformation(fileName)));
                    else if (cachUnit.Language == LanguageProperties.MSE)
                        cachFinder.Add(cachUnit.Language, new MseExpressionFinder(ParserService.GetParseInformation(fileName)));
                    else cachFinder.Add(cachUnit.Language, null);
                }
                return cachFinder[cachUnit.Language];
            }
            return null;
        }


        Dictionary<LanguageProperties, NRefactoryResolver> cachLanguage = new Dictionary<LanguageProperties, NRefactoryResolver>();
        /// <exclude/>
        public Parsers.Binding.IResolver CreateResolver()
        {
            if (!cachLanguage.ContainsKey(cachUnit.Language))
                cachLanguage.Add(cachUnit.Language, new NRefactoryResolver(cachUnit.Language));

            return cachLanguage[cachUnit.Language];
        }
        #endregion
    }
}
