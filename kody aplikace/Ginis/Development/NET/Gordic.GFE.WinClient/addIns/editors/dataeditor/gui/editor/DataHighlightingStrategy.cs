//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.DataHighlightingStrategy.cs            </Name>
//    <Description> strategie zvýraznění sloviček datového souboru              </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-05-16                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.DefaultEditor;
using Gordic.TextEditor;
using Gordic.TextEditor.Document;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;

namespace Gordic.GFE.WinClient.DataEditor
{
    /// <summary>
    /// strategie zvýraznění sloviček datového souboru
    /// </summary>
    class DataHighlightingStrategy : IAdvancedHighlighter
    {
        #region IAdvancedHighlighter
        /// <summary>
        /// Volá se jednou po vytvoření zvýrazňovače.
        /// </summary>
        public void Initialize(TextEditorControl textEditor) { }
        /// <summary>
        /// Před aktualizací obsahu
        /// </summary>
        /// <param name="document">Dokument s obsahem</param>
        /// <param name="inputLines">Řádky pro implikací zvýraznění</param>
        public void BeginUpdate(IDocument document, IList<LineSegment> inputLines) { this.document = document; }
        /// <summary>
        /// Konec aktualizací obsahu
        /// </summary>
        public void EndUpdate() { }

        /// <summary>
        /// Oznažčení klíčových objektů řádku
        /// </summary>
        /// <param name="lineNumber">číslo řádku</param>
        /// <param name="currentLine">aktuální řádek</param>
        /// <param name="words">slova řádku</param>
        public void MarkLine(int lineNumber, LineSegment currentLine, List<TextWord> words)
        {
            List<FoldMarker> foldings = document.FoldingManager.GetFoldingsFromPosition(currentLine.LineNumber, 0);
            if (foldings.Count != 0)
            {
                GFEStructure structure = null;
                string fullRegionName = string.Empty;
                foreach (var item in foldings)
                    if (item.Bind is GFERegion reg)
                    {
                        fullRegionName += reg.Name + ".";
                        if (structure == null)
                            structure = reg.Structure;
                    }

                string[] texts = document.GetText(currentLine).Split('|');
                fullRegionName += texts.First().Trim();
                GFERegion region = CommonService.GetRegionFromStructure(structure, fullRegionName);
                bool isValid = region != null
                    && region.Items.Count == texts.Length - 2/*první je název regionu a poslední je konec*/
                    && string.IsNullOrEmpty(texts.Last().Trim())/*na koncí musí být zalomení řádku*/;

                if (!isValid)
                {
                    for (int i = 0; i < words.Count; i++)
                        words[i] = new TextWord(document, currentLine, words[i].Offset, words[i].Length, new HighlightColor(Color.Red, false, true), words[i].HasDefaultColor);
                    return;
                }
            }
            else
            {
                foldings = document.FoldingManager.GetFoldingsWithStart(currentLine.LineNumber);
                if (foldings.Count != 0)
                {
                    FoldMarker marker = foldings.Last();// je to řádek

                    if (marker.Bind is Gordic.GFE.Parsers.Core.GFERegion region)
                    {
                        string[] texts = document.GetText(currentLine).Split('|');
                        bool isValid = texts.First().Equals(region.Name)
                            && region.Items.Count == texts.Length - 2/*první je název regionu a poslední je konec*/
                            && string.IsNullOrEmpty(texts.Last().Trim())/*na koncí musí být zalomení řádku*/;

                        if (!isValid)
                        {
                            for (int i = 0; i < words.Count; i++)
                                words[i] = new TextWord(document, currentLine, words[i].Offset, words[i].Length, new HighlightColor(Color.Red, false, true), words[i].HasDefaultColor);
                            return;
                        }
                    }
                }
            }
            if (lineNumber == 0)
                for (int i = 0; i < words.Count; i++)
                    words[i] = new TextWord(document, currentLine, words[i].Offset, words[i].Length, new HighlightColor(Color.Red, true, false), words[i].HasDefaultColor);
            else if (words.Count > 0)
            {
                int index = words[0].Word.IndexOf('|');
                if (index != -1)
                {
                    string name = words[0].Word.Substring(0, index);
                    if (!string.IsNullOrEmpty(name))
                    {
                        string rest = words[0].Word.Substring(index);
                        words.RemoveAt(0);
                        words.Insert(0, new TextWord(document, currentLine, index, rest.Length, new HighlightColor(Color.Black, false, false), false));
                        words.Insert(0, new TextWord(document, currentLine, 0, name.Length, new HighlightColor(Color.Blue, true, false), false));
                    }
                }
            }
        }
        /// <summary>
        /// uvolnění objektu
        /// </summary>
        public void Dispose()
        {
            if (view != null)
                view = null;
        }
        #endregion

        IViewContent view;
        IDocument document;

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        /// <param name="view">aktuální pohled</param>
        public DataHighlightingStrategy(IViewContent view)
        {
            // TODO: Complete member initialization
            this.view = view;
        }

    }
}
