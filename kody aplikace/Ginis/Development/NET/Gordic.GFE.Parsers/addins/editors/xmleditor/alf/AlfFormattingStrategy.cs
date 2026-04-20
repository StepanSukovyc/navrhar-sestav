//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.XmlFormattingStrategy.cs               </Name>
//    <Description> Tato třída aktuálně vkládá koncové tagy po napsaní otevíracího tagu</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-25                                                  </Created>
//  </FileHeader>

using System;
using System.Text;
using Gordic.TextEditor.Document;
using System.Xml;
using System.IO;
using Gordic.TextEditor.Actions;
using System.Collections;
using Gordic.TextEditor;
using System.Diagnostics;

namespace Gordic.GFE.Parsers.AlfEditor
{
    /// <summary>
    /// Tato třída aktuálně vkládá koncové tagy po napsaní otevíracího tagu
    /// a vkládá chytré odsazení textu XML souborů
    /// </summary>
    public class AlfFormattingStrategy : DefaultFormattingStrategy
    {
        /// <summary>
        /// Formátvání řádku
        /// </summary>
        /// <param name="textArea">Oblast se kterou se pracuje</param>
        /// <param name="lineNr">číslo řádku</param>
        /// <param name="caretOffset">aktuální offset</param>
        /// <param name="charTyped">vytisknutá klávesa</param>
        /// <returns></returns>
        public override void FormatLine(TextArea textArea, int lineNr, int caretOffset, char charTyped)
        {
            textArea.Document.UndoStack.StartUndoGroup();
            try
            {
                if (charTyped == '>')
                {
                    StringBuilder stringBuilder = new StringBuilder();
                    int offset = Math.Min(caretOffset - 2, textArea.Document.TextLength - 1);
                    while (true)
                    {
                        if (offset < 0)
                            break;
                        
                        char ch = textArea.Document.GetCharAt(offset);
                        if (ch == '<')
                        {
                            string reversedTag = stringBuilder.ToString().Trim();
                            if (!reversedTag.StartsWith("/") && !reversedTag.EndsWith("/"))
                            {
                                bool validXml = true;
                                try
                                {
                                    XmlDocument doc = new XmlDocument();
                                    doc.LoadXml(textArea.Document.TextContent);
                                }
                                catch (Exception) { validXml = false; }
                                // pouze vložení tagu, pokud něco chybí
                                if (!validXml)
                                {
                                    StringBuilder tag = new StringBuilder();
                                    for (int i = reversedTag.Length - 1; i >= 0 && !Char.IsWhiteSpace(reversedTag[i]); --i)
                                        tag.Append(reversedTag[i]);
                                    string tagString = tag.ToString();
                                    if (tagString.Length > 0 && !tagString.StartsWith("!") && !tagString.StartsWith("?"))
                                        textArea.Document.Insert(caretOffset, "</" + tagString + ">");
                                }
                            }
                            break;
                        }
                        stringBuilder.Append(ch);
                        --offset;
                    }
                }
            }
            catch (Exception e) { Debug.Assert(false, e.ToString()); }
            if (charTyped == '\n')
                textArea.Caret.Column = IndentLine(textArea, lineNr);
            textArea.Document.UndoStack.EndUndoGroup();
        }

        /// <summary>
        /// Určuje XML specifikácí chytrého odsazení pro řádek
        /// </summary>
        /// <param name="textArea">Oblast textu se kterou se pracuje</param>
        /// <param name="lineNr">číslo řádku</param>
        /// <returns></returns>
        protected override int SmartIndentLine(TextArea textArea, int lineNr)
        {
            if (lineNr <= 0) return AutoIndentLine(textArea, lineNr);
            try
            {
                TryIndent(textArea, lineNr, lineNr);
                return GetIndentation(textArea, lineNr).Length;
            }
            catch (XmlException) { return AutoIndentLine(textArea, lineNr); }
        }

        /// <summary>
        /// Tato funkce nastavuje úroveň odsazení v řadě řádků
        /// This function sets the indentlevel in a range of lines.
        /// </summary>
        public override void IndentLines(TextArea textArea, int begin, int end)
        {
            textArea.Document.UndoStack.StartUndoGroup();
            try { TryIndent(textArea, begin, end); }
            catch (XmlException) { }
            finally { textArea.Document.UndoStack.EndUndoGroup(); }
        }

        #region Chytré odsazení
        private void TryIndent(TextArea textArea, int begin, int end)
        {
            string currentIndentation = string.Empty;
            Stack tagStack = new Stack();
            IDocument document = textArea.Document;
            string tab = Tab.GetIndentationString(document);
            int nextLine = begin;
            bool wasEmptyElement = false;
            XmlNodeType lastType = XmlNodeType.XmlDeclaration;

            using (StringReader stringReader = new StringReader(document.TextContent))
            {
                XmlTextReader r = new XmlTextReader(stringReader)
                {
                    XmlResolver = null // zabráníme XmlTextReader načítání externích DTD
                };
                while (r.Read())
                {
                    if (wasEmptyElement)
                    {
                        wasEmptyElement = false;
                        currentIndentation = tagStack.Count == 0 ? string.Empty : (string)tagStack.Pop();
                    }

                    if (r.NodeType == XmlNodeType.EndElement)
                        currentIndentation = tagStack.Count == 0 ? string.Empty : (string)tagStack.Pop();

                    while (r.LineNumber > nextLine)
                    {
                        if (nextLine > end) break;
                        if (lastType == XmlNodeType.CDATA || lastType == XmlNodeType.Comment)
                        {
                            nextLine += 1;
                            continue;
                        }
                        // nastavíme odsazení 'nextLine'
                        LineSegment line = document.GetLineSegment(nextLine);
                        string lineText = document.GetText(line);

                        string newText;
                        // speciální případ: počáteční tag má zavření na jiném řdku: je zapotřebí odstranit jednu úroveň odsazení
                        newText = lineText.Trim() == ">" ? (string)tagStack.Peek() + lineText.Trim() : currentIndentation + lineText.Trim();

                        if (newText != lineText)
                            document.Replace(line.Offset, line.Length, newText);
                        nextLine += 1;
                    }
                    if (r.LineNumber > end)
                        break;
                    wasEmptyElement = r.NodeType == XmlNodeType.Element && r.IsEmptyElement;
                    string attribIndent = null;
                    if (r.NodeType == XmlNodeType.Element)
                    {
                        tagStack.Push(currentIndentation);
                        if (r.LineNumber < begin)
                            currentIndentation = GetIndentation(textArea, r.LineNumber - 1);

                        attribIndent = r.Name.Length < 16 ? currentIndentation + new String(' ', 2 + r.Name.Length) : currentIndentation + tab;
                        currentIndentation += tab;
                    }
                    lastType = r.NodeType;
                    if (r.NodeType == XmlNodeType.Element && r.HasAttributes)
                    {
                        int startLine = r.LineNumber;
                        r.MoveToAttribute(0); // jdeme na první atribut
                        if (r.LineNumber != startLine)
                            attribIndent = currentIndentation; // změna na tab-odsazení
                        r.MoveToAttribute(r.AttributeCount - 1);
                        while (r.LineNumber > nextLine)
                        {
                            if (nextLine > end) break;
                            // nastavíme odsazení 'nextLine'
                            LineSegment line = document.GetLineSegment(nextLine);
                            string lineText = document.GetText(line);
                            string newText = attribIndent + lineText.Trim();
                            if (newText != lineText)
                                document.Replace(line.Offset, line.Length, newText);
                            nextLine += 1;
                        }
                    }
                }
                r.Close();
            }
        }
        #endregion
    }
}
