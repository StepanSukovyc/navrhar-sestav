//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.DataFormattingStrategy.cs              </Name>
//    <Description> strategie formátování datového souboru                      </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-05-16                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.StructureView;
using Gordic.TextEditor;
using Gordic.TextEditor.Actions;
using Gordic.TextEditor.Document;
using System;
using System.Collections.Generic;
using System.IO;

namespace Gordic.GFE.WinClient.DataEditor
{
    class DataFormattingStrategy : DefaultFormattingStrategy
    {
        IViewContent view;

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        /// <param name="view">pohled na datový obsah</param>
        public DataFormattingStrategy(IViewContent view)
        {
            // TODO: Complete member initialization
            this.view = view;
        }
        /// <summary>
        /// Formátování řádku
        /// </summary>
        /// <param name="textArea">Oblast textu</param>
        /// <param name="lineNr">číslo řádku</param>
        /// <param name="caretOffset">aktuální offset</param>
        /// <param name="charTyped">stisknutá klávesa</param>
        public override void FormatLine(TextArea textArea, int lineNr, int caretOffset, char charTyped)
        {
        }

        /// <summary>
        /// Nastavení úrovně odsazení v okruhu řádků daných začátkem a koncem
        /// </summary>
        /// <param name="textArea">Pracovní oblast</param>
        /// <param name="begin">Počáteční řádek odsazení</param>
        /// <param name="end">Koncový řádek odsazení</param>
        public override void IndentLines(TextArea textArea, int begin, int end)
        {
            //textArea.Document.UndoStack.StartUndoGroup();

            //try { TryIndent(textArea, begin, end); }
            //catch { }
            //finally { textArea.Document.UndoStack.EndUndoGroup(); }
        }

        #region Chytré odsazení
        void TryIndent(TextArea textArea, int begin, int end)
        {
            Stack<string> tagStack = new Stack<string>(), stack = new Stack<string>();
            IDocument document = textArea.Document;
            string currentIndentation = "", tab = Tab.GetIndentationString(document);
            int nextLine = begin;
            bool wasEmptyElement = false;
            if (CompilationService.Units[view.PrimaryFile] is CUData cu && cu.StructureViewEntry != null)
            {
                int index = -1;
                StructureViewEntry svEntry = cu.StructureViewEntry as StructureViewEntry;
                //XmlNodeType lastType = XmlNodeType.XmlDeclaration;
                using (StringReader stringReader = new StringReader(document.TextContent))
                {
                    while (stringReader.Peek() != -1)
                    {
                        string line = stringReader.ReadLine();
                        index++;
                        if (index != 0)
                        {
                            if (!string.IsNullOrEmpty(line))
                                if (wasEmptyElement)
                                {
                                    wasEmptyElement = false;
                                    if (tagStack.Count == 0)
                                        currentIndentation = "";
                                    else
                                        currentIndentation = tagStack.Pop();
                                }

                            if (stack.Count > 0)
                            {
                                string regionName = GetRegion(line, svEntry);
                                if (!string.IsNullOrEmpty(regionName) && !regionName.Equals(stack.Peek(), StringComparison.OrdinalIgnoreCase))
                                {
                                    // pokud se nejedná o vnořený region, pak se jedná o konec
                                    while (stack.Count != 0)
                                    {
                                        if (regionName.Contains('.' + stack.Peek() + '.') || regionName.StartsWith(stack.Peek() + '.'))
                                            break;

                                        currentIndentation = tagStack.Pop();
                                        stack.Pop();
                                    }

                                    // nastavení odsazení "nextLine"
                                    tagStack.Push(currentIndentation);
                                    stack.Push(regionName);
                                    if (index < begin)
                                        currentIndentation = GetIndentation(textArea, index - 1);
                                    //if (r.Name.Length < 16)
                                    //    attribIndent = currentIndentation + new String(' ', 2 + r.Name.Length);
                                    //else
                                    string attribIndent = currentIndentation + tab;
                                    currentIndentation += tab;
                                    LineSegment lineS = document.GetLineSegment(nextLine);
                                    string lineText = document.GetText(lineS);
                                    string newText = attribIndent + lineText.Trim();
                                    if (newText != lineText)
                                        document.Replace(lineS.Offset, lineS.Length, newText);
                                    nextLine++;
                                }
                            }
                            else
                            {
                                tagStack.Push(currentIndentation);
                                stack.Push(GetRegion(line, svEntry));
                            }
                            //while (r.LineNumber > nextLine)
                            //{
                            //    if (nextLine > end) break;
                            //    if (lastType == XmlNodeType.CDATA || lastType == XmlNodeType.Comment)
                            //    {
                            //        nextLine += 1;
                            //        continue;
                            //    }

                            //    // nastavení odsazení 'nextLine'
                            //    LineSegment line = document.GetLineSegment(nextLine);
                            //    string lineText = document.GetText(line);

                            //    string newText;

                            //    // speciální případ: 
                            //    // otevírací tag má zavírací závorku na dalším řádku: odstranění jednoho úrovně odsazení
                            //    if (lineText.Trim() == ">")
                            //        newText = (string)tagStack.Peek() + lineText.Trim();
                            //    else
                            //        newText = currentIndentation + lineText.Trim();

                            //    if (newText != lineText)
                            //        document.Replace(line.Offset, line.Length, newText);
                            //    nextLine += 1;
                            //}

                            //if (r.LineNumber > end)
                            //    break;

                            //wasEmptyElement = r.NodeType == XmlNodeType.Element && r.IsEmptyElement;
                            //string attribIndent = null;
                            //if (r.NodeType == XmlNodeType.Element)
                            //{
                            //    tagStack.Push(currentIndentation);
                            //    if (r.LineNumber < begin)
                            //        currentIndentation = GetIndentation(textArea, r.LineNumber - 1);
                            //    if (r.Name.Length < 16)
                            //        attribIndent = currentIndentation + new String(' ', 2 + r.Name.Length);
                            //    else
                            //        attribIndent = currentIndentation + tab;
                            //    currentIndentation += tab;
                            //}
                            //lastType = r.NodeType;
                            //if (r.NodeType == XmlNodeType.Element && r.HasAttributes)
                            //{
                            //    int startLine = r.LineNumber;
                            //    r.MoveToAttribute(0); // na první atribut
                            //    if (r.LineNumber != startLine)
                            //        attribIndent = currentIndentation;
                            //    r.MoveToAttribute(r.AttributeCount - 1);
                            //    while (r.LineNumber > nextLine)
                            //    {
                            //        if (nextLine > end) break;
                            //        // nastavení odsazení 'nextLine'
                            //        LineSegment line = document.GetLineSegment(nextLine);
                            //        string lineText = document.GetText(line);
                            //        string newText = attribIndent + lineText.Trim();
                            //        if (newText != lineText)
                            //            document.Replace(line.Offset, line.Length, newText);
                            //        nextLine += 1;
                            //    }
                            //}
                        }
                    }
                }
            }
        }

        static readonly char[] whitespaceChars = { ' ', '\t' };
        string GetRegion(string line, StructureViewEntry svEntry)
        {
            string[] splitP = line.Trim(whitespaceChars).Split('|');
            if (splitP.Length > 0)
                return CommonService.GetFullName(svEntry.Structure.Root, splitP[0]);
            return string.Empty;
        }
        #endregion
    }
}
