//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.AdvancedHighlightingStrategy.cs        </Name>
//    <Description> Změna IHighlightingStrategy textového editoru aby bylo možné připojit</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using Gordic.TextEditor.Document;

namespace Gordic.Gfe.FormFiller.DefaultEditor.Gui.Editor
{
    /// <summary>
    /// Změna IHighlightingStrategy textového editoru aby bylo možné připojit
    /// <see cref="IAdvancedHighlighter"/>.
    /// </summary>
    class AdvancedHighlightingStrategy : DefaultHighlightingStrategy
    {
        readonly IAdvancedHighlighter highlighter;

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="baseStrategy">Výchozí zvýraznění</param>
        /// <param name="highlighter">Pokročilý zvýrazňovač</param>
        public AdvancedHighlightingStrategy(DefaultHighlightingStrategy baseStrategy, IAdvancedHighlighter highlighter)
        {
            ImportSettingsFrom(baseStrategy);
            this.highlighter = highlighter ?? throw new ArgumentNullException("highlighter");
        }

        /// <summary>
        /// Označení klíčů
        /// </summary>
        /// <param name="document">Dokument s obsahem</param>
        public override void MarkTokens(IDocument document)
        {
            highlighter.BeginUpdate(document, null);
            base.MarkTokens(document);
            highlighter.EndUpdate();
        }

        /// <summary>
        /// Oznažčení klíčových objektů
        /// </summary>
        /// <param name="document">Dokument s obsahem</param>
        /// <param name="inputLines">Řádky</param>
        public override void MarkTokens(IDocument document, List<LineSegment> inputLines)
        {
            highlighter.BeginUpdate(document, inputLines);
            base.MarkTokens(document, inputLines);
            highlighter.EndUpdate();
        }

        /// <exclude/>
        protected override void OnParsedLine(IDocument document, LineSegment currentLine, List<TextWord> words)
        {
            highlighter.MarkLine(currentLineNumber, currentLine, words);
        }
    }
}
