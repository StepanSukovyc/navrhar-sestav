//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.XmlFormattingStrategy.cs               </Name>
//    <Description> Tato třída jak vkládá uzavírací tagy tak provádí inteligentní odsazení.</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2013-01-09                                                  </Created>
//  </FileHeader>

using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Xml;
using Gordic.GFE.Parsers.Core;
using Gordic.TextEditor;
using Gordic.TextEditor.Actions;
using Gordic.TextEditor.Document;
using Microsoft.Office.Interop.Word;

namespace Gordic.GFE.Parsers.DefaultEditor
{
    /// <summary>
    /// Tato třída jak vkládá uzavírací tagy tak provádí inteligentní odsazení.
    /// </summary>
    public class XmlFormattingStrategy : DefaultFormattingStrategy
    {
        /// <summary>
        /// Formátování řádku
        /// </summary>
        /// <param name="textArea">Oblast textu</param>
        /// <param name="lineNr">číslo řádku</param>
        /// <param name="caretOffset">aktuální offset</param>
        /// <param name="charTyped">stisknutá klávesa</param>
        public override void FormatLine(TextArea textArea, int lineNr, int caretOffset, char charTyped)
        {
            textArea.Document.UndoStack.StartUndoGroup();
            LineSegment curLine = textArea.Document.GetLineSegment(lineNr);
            string terminator = textArea.TextEditorProperties.LineTerminator;

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
            catch (Exception e)
            { // kontrola
                Debug.Assert(false, e.ToString());
            }
            if (charTyped == '\n')
                textArea.Caret.Column = IndentLine(textArea, lineNr);

            if (textArea.TextEditorProperties.AutoInsertCurlyBracket)
            {
                if (charTyped == '{' && NeedCurlyBracket(textArea.Document.TextContent, '{', '}'))
                    textArea.Document.Insert(textArea.Caret.Offset, "}");
                if (charTyped == '(' && NeedCurlyBracket(textArea.Document.TextContent, '(', ')'))
                    textArea.Document.Insert(textArea.Caret.Offset, ")");
                if (charTyped == '[' && NeedCurlyBracket(textArea.Document.TextContent, '[', ']'))
                    textArea.Document.Insert(textArea.Caret.Offset, "]");
            }

            if (textArea.TextEditorProperties.AutoInsertQuotationMarks && charTyped == '=' && NeedQuotation(textArea.Document.TextContent, textArea.Caret.Offset))
            {
                textArea.Document.Insert(textArea.Caret.Offset, "\"\"");
                textArea.Caret.Position = new TextLocation(textArea.Caret.Position.Column + 1, textArea.Caret.Position.Line);
            }

            textArea.Document.UndoStack.EndUndoGroup();
        }

        bool NeedQuotation(string text, int caretOffset)
        {
            bool inString = false;
            bool inChar = false;
            bool verbatim = false;

            bool lineComment = false;
            bool blockComment = false;
            for (int i = 0; i < text.Length; ++i)
            {
                if (i == caretOffset)
                    if (inString || inChar)
                        return false;
                    else
                        return text[i] != '"';

                if (text[i] == '\r' || text[i] == '\n')
                {
                    lineComment = false;
                    inChar = false;
                    if (!verbatim) inString = false;
                }
                else if (text[i] == '/')
                {
                    if (blockComment)
                    {
                        Debug.Assert(i > 0);
                        if (text[i - 1] == '*')
                            blockComment = false;
                    }
                    if (!inString && !inChar && i + 1 < text.Length)
                    {
                        if (!blockComment && text[i + 1] == '/')
                            lineComment = true;
                        if (!lineComment && text[i + 1] == '*')
                            blockComment = true;
                    }
                }
                else if (text[i] == '"')
                {
                    if (!(inChar || lineComment || blockComment))
                    {
                        if (inString && verbatim)
                        {
                            if (i + 1 < text.Length && text[i + 1] == '"')
                            {
                                ++i;
                                inString = false;
                            }
                            else
                                verbatim = false;
                        }
                        else if (!inString && i > 0 && text[i - 1] == '@')
                            verbatim = true;
                        inString = !inString;
                    }
                }
                else if (text[i] == '\'')
                {
                    if (!(inString || lineComment || blockComment))
                        inChar = !inChar;
                }
                else if (text[i] == '\\')
                {
                    if ((inString && !verbatim) || inChar)
                        ++i; // přeskočíme další symbol
                }
            }
            return true;
        }
        bool NeedCurlyBracket(string text, char curlyBrckStart, char curlyBrckEnd)
        {
            int curlyCounter = 0;

            bool inString = false;
            bool inChar = false;
            bool verbatim = false;

            bool lineComment = false;
            bool blockComment = false;

            for (int i = 0; i < text.Length; ++i)
            {
                if (text[i] == '\r' || text[i] == '\n')
                {
                    lineComment = false;
                    inChar = false;
                    if (!verbatim) inString = false;
                }
                else
                    if (text[i] == '/')
                {
                    if (blockComment)
                    {
                        Debug.Assert(i > 0);
                        if (text[i - 1] == '*')
                            blockComment = false;
                    }
                    if (!inString && !inChar && i + 1 < text.Length)
                    {
                        if (!blockComment && text[i + 1] == '/')
                            lineComment = true;
                        if (!lineComment && text[i + 1] == '*')
                            blockComment = true;
                    }
                }
                else if (text[i] == '"')
                {
                    if (!(inChar || lineComment || blockComment))
                    {
                        if (inString && verbatim)
                        {
                            if (i + 1 < text.Length && text[i + 1] == '"')
                            {
                                ++i;
                                inString = false;
                            }
                            else
                                verbatim = false;
                        }
                        else if (!inString && i > 0 && text[i - 1] == '@')
                            verbatim = true;
                        inString = !inString;
                    }
                }
                else if (text[i] == '\'')
                {
                    if (!(inString || lineComment || blockComment))
                        inChar = !inChar;
                }
                else if (text[i] == curlyBrckStart)
                {
                    if (!(inString || inChar || lineComment || blockComment))
                        ++curlyCounter;
                }
                else if (text[i] == curlyBrckEnd)
                {
                    if (!(inString || inChar || lineComment || blockComment))
                        --curlyCounter;
                }
                else if (text[i] == '\\')
                {
                    if ((inString && !verbatim) || inChar)
                        ++i; // přeskočíme další symbol
                }
            }
            return curlyCounter > 0;
        }

        /// <summary>
        /// Definuje chytré XML specifické odsazení řádku
        /// </summary>
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
        /// Nastavení úrovně odsazení v okruhu řádků daných začátkem a koncem
        /// </summary>
        /// <param name="textArea">Pracovní oblast</param>
        /// <param name="begin">Počáteční řádek odsazení</param>
        /// <param name="end">Koncový řádek odsazení</param>
        public override void IndentLines(TextArea textArea, int begin, int end)
        {
            textArea.Document.UndoStack.StartUndoGroup();

            try
            {
                TryIndent(textArea, begin, end);
                FormatTextAreaAttributes(textArea);
            }
            catch (XmlException ex) { LoggingService.Debug(ex.ToString()); }
            finally { textArea.Document.UndoStack.EndUndoGroup(); }
        }

        #region Format Attributes
        /// <summary>
        /// Na základě TextEditorProperties textArea nastaví korektní formátování attributů
        /// </summary>
        /// <param name="textArea">prvek obsahující xml text</param>
        void FormatTextAreaAttributes(TextArea textArea)
        {
            var document = textArea.Document;
            var tab = Tab.GetIndentationString(document);
            var formatting = textArea.Document.TextEditorProperties.XmlAttributesAlign;

            if (formatting == XmlAttributesAlign.KeepLine)
                return;

            using (StringReader stringReader = new StringReader(document.TextContent))
            {
                XmlTextReader r = new XmlTextReader(stringReader);

                //pro korektní získání řádku dalšího elementu si musím pamatovat kolik enterů jsem přidal/odebral
                int linesAdded = 0;
                while (r.Read())
                {
                    if (r.NodeType != XmlNodeType.Element)
                        continue;

                    r.MoveToElement();

                    LineSegment line = document.GetLineSegment(r.LineNumber - 1 + linesAdded);
                    string lineText = document.GetText(line);

                    string intent = lineText.Substring(0, lineText.IndexOf("<"));
                    lineText = intent + $"<{r.Name}";

                    string attributeSeparator = GetAttributeSeparatorWithIntend(r, formatting, intent, tab);
                    List<string[]> list = LoadAttributes(r);
                    foreach (var att in list)
                        lineText += attributeSeparator + $"{att[0]}=\"{att[1]}\"";

                    r.MoveToElement();
                    var closingTag = r.IsEmptyElement ? " />" : ">";
                    lineText += closingTag;

                    int lineLenghtToReplace = GetLineLenghtToReplace(r, document, linesAdded);
                    SetLinesAdded(r, document, formatting, lineText, ref linesAdded);

                    document.Replace(line.Offset, lineLenghtToReplace, lineText);
                }
            }
        }

        /// <summary>
        /// Vrací separator, který se aplikuje ke každému attributu
        /// </summary>
        /// <param name="r">reader</param>
        /// <param name="formatting">použité formátování řádku</param>
        /// <param name="actualElementIntend">aktuální odsazení attributu</param>
        /// <param name="tab">znak tabu</param>
        /// <returns>separator attributu</returns>
        string GetAttributeSeparatorWithIntend(XmlTextReader r, XmlAttributesAlign formatting, string actualElementIntend, string tab)
        {
            if (r.AttributeCount > 1 && formatting == XmlAttributesAlign.NewLine)
                return Environment.NewLine + actualElementIntend + tab;

            return " ";
        }

        /// <summary>
        /// Na základě formátování ńastaví počet řádků který byl přidán nebo odebrán, 
        /// aby bylo možné korektně nahrazovat text v dokumentu
        /// </summary>
        void SetLinesAdded(XmlTextReader r, IDocument document, XmlAttributesAlign formatting, string textToReplace, ref int linesAdded)
        {
            r.MoveToElement();

            int startLine = r.LineNumber - 1 + linesAdded;
            while (r.MoveToNextAttribute()) { }
            int endLine = r.LineNumber - 1 + linesAdded;
            endLine = GetClosingTagLine(document, endLine);

            if (r.AttributeCount > 1 && formatting == XmlAttributesAlign.NewLine)
            {
                var spaces = textToReplace.Split(new[] { Environment.NewLine }, StringSplitOptions.None).Length;
                //-1 za element tag který již existuje
                spaces -= 1;

                var dif = endLine - startLine;

                //rozdíl po odebrání řádků
                if (spaces < dif)
                    dif = (dif - spaces) * -1;
                //chci rozdíl po přidání řádků
                else
                    dif = spaces - dif;

                linesAdded += dif;
            }
            else
                linesAdded -= endLine - startLine;
        }

        List<string[]> LoadAttributes(XmlTextReader r)
        {
            r.MoveToElement();

            var list = new List<string[]>(r.AttributeCount);
            while (r.MoveToNextAttribute())
                list.Add(new string[] { r.Name, r.Value });

            return list;
        }

        /// <summary>
        /// Vrátí celkovou délku která je potřeba nahradit pro aktuální node
        /// </summary>
        /// <returns>Délka k nahrazení</returns>
        int GetLineLenghtToReplace(XmlTextReader r, IDocument document, int linesAdded)
        {
            r.MoveToElement();

            int startLine = r.LineNumber - 1 + linesAdded;
            var line = document.GetLineSegment(startLine);
            int lineLenghtToReplace = line.TotalLength - Environment.NewLine.Length; //chci zachovat newLine na konci řádku

            while (r.MoveToNextAttribute()) { }
            int endLine = r.LineNumber - 1 + linesAdded;
            endLine = GetClosingTagLine(document, endLine);

            if (startLine == endLine)
                return lineLenghtToReplace;

            for (int i = startLine + 1; i <= endLine; i++)
            {
                var line2 = document.GetLineSegment(i);
                lineLenghtToReplace += line2.TotalLength;
            }

            return lineLenghtToReplace;
        }

        int GetClosingTagLine(IDocument document, int fromLine)
        {
            int closingTagLine = fromLine;
            while (document.LineSegmentCollection.Count > closingTagLine)
            {
                var line = document.GetLineSegment(closingTagLine);
                var txt = document.GetText(line);

                if (txt.Contains(">"))
                    return closingTagLine;

                closingTagLine++;
            }

            return fromLine;
        }
        #endregion

        #region Chytré odsazení
        void TryIndent(TextArea textArea, int begin, int end)
        {
            string currentIndentation = "";
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
                    XmlResolver = null
                };

                while (r.Read())
                {
                    if (wasEmptyElement)
                    {
                        wasEmptyElement = false;
                        if (tagStack.Count == 0)
                            currentIndentation = "";
                        else
                            currentIndentation = (string)tagStack.Pop();
                    }

                    if (r.NodeType == XmlNodeType.EndElement)
                    {
                        if (tagStack.Count == 0)
                            currentIndentation = "";
                        else
                            currentIndentation = (string)tagStack.Pop();
                    }

                    while (r.LineNumber > nextLine)
                    {
                        if (nextLine > end) break;
                        if (lastType == XmlNodeType.CDATA || lastType == XmlNodeType.Comment)
                        {
                            nextLine += 1;
                            continue;
                        }

                        // nastavení odsazení 'nextLine'
                        LineSegment line = document.GetLineSegment(nextLine);
                        string lineText = document.GetText(line);

                        string newText;

                        // speciální případ: 
                        // otevírací tag má zavírací závorku na dalším řádku: odstranění jednoho úrovně odsazení
                        if (lineText.Trim() == ">")
                            newText = (string)tagStack.Peek() + lineText.Trim();
                        else
                            newText = currentIndentation + lineText.Trim();

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
                        if (r.Name.Length < 16)
                            attribIndent = currentIndentation + new String(' ', 2 + r.Name.Length);
                        else
                            attribIndent = currentIndentation + tab;
                        currentIndentation += tab;
                    }

                    lastType = r.NodeType;
                    if (r.NodeType == XmlNodeType.Element && r.HasAttributes)
                    {
                        int startLine = r.LineNumber;
                        r.MoveToAttribute(0); // na první atribut

                        if (r.LineNumber != startLine)
                            attribIndent = currentIndentation;

                        r.MoveToAttribute(r.AttributeCount - 1);

                        while (r.LineNumber > nextLine)
                        {
                            if (nextLine > end)
                                break;

                            // nastavení odsazení 'nextLine'
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
