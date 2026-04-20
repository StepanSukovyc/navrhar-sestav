//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.IAdvancedHighlighter.cs                </Name>
//    <Description> Rozhraní pokročíleho zvýraznění.                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using Gordic.TextEditor;
using Gordic.TextEditor.Document;

namespace Gordic.Gfe.FormFiller.DefaultEditor
{
    /// <summary>
    /// Rozhraní pokročíleho zvýraznění.
    /// </summary>
    interface IAdvancedHighlighter : IDisposable
    {
        /// <summary>
        /// Volá se jednou po vytvoření zvýrazňovače.
        /// </summary>
        void Initialize(TextEditorControl textEditor);

        /// <summary>
        /// Před aktualizací obsahu
        /// </summary>
        /// <param name="document">Dokument s obsahem</param>
        /// <param name="inputLines">Řádky pro implikací zvýraznění</param>
        void BeginUpdate(IDocument document, IList<LineSegment> inputLines);
        /// <summary>
        /// Konec aktualizací obsahu
        /// </summary>
        void EndUpdate();

        /// <summary>
        /// Změna zvýraznění slov
        /// </summary>
        /// <param name="lineNumber">Pozice řádku v obsahu</param>
        /// <param name="currentLine">Aktuálnní řádek</param>
        /// <param name="words">Slova</param>
        void MarkLine(int lineNumber, LineSegment currentLine, List<TextWord> words);
    }
}
