//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.XmlFormattingStrategy.cs               </Name>
//    <Description> Tato třída jak vkládá uzavírací tagy tak provádí inteligentní odsazení.</Description>
//    <Author>      Mgr. Stepan Sukovyč </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-09                                                  </Created>
//  </FileHeader>

using System;
using System.Collections;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Xml;
using Gordic.GFE.Parsers.Core;
using Gordic.TextEditor;
using Gordic.TextEditor.Actions;
using Gordic.TextEditor.Document;

namespace Gordic.GFE.Parsers.addins.editors.texteditor.xmlFormatting
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
                                    for (int i = reversedTag.Length - 1; i >= 0 && !char.IsWhiteSpace(reversedTag[i]); --i)
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
                    if (inString && !verbatim || inChar)
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
                    if (inString && !verbatim || inChar)
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
            }
            catch (XmlException ex) { LoggingService.Debug(ex.ToString()); }
            finally { textArea.Document.UndoStack.EndUndoGroup(); }
        }

        /// <summary>
        /// Nastavení úrovně odsazení v okruhu řádků daných začátkem a koncem
        /// </summary>
        /// <param name="document">Pracovní oblast</param>
        public void FormatLines(IDocument document)
        {
            document.UndoStack.StartUndoGroup();
            try
            {
                FormatTextAreaAttributes(document);
            }
            catch (XmlException ex) { LoggingService.Debug(ex.ToString()); }
            finally { document.UndoStack.EndUndoGroup(); }
        }
        #region Format Attributes

        void FormatTextAreaAttributes(IDocument document)
        {
            var tab = Tab.GetIndentationString(document);
            var formatting = ((IXmlTextEditorProperties)document.TextEditorProperties).XmlAttributesAlign;

            if (formatting == XmlAttributesAlign.KeepLine)
                return;

            using (var stringReader = new StringReader(document.TextContent))
            using (var reader = new XmlTextReader(stringReader))
            {
                int linesAdded = 0;

                while (reader.Read())
                {
                    if (reader.NodeType != XmlNodeType.Element)
                        continue;

                    reader.MoveToElement();

                    int lineIndex = reader.LineNumber - 1 + linesAdded;
                    if (lineIndex < 0 || lineIndex >= document.TotalNumberOfLines)
                        continue;

                    LineSegment line = document.GetLineSegment(lineIndex);
                    string lineText = document.GetText(line);

                    int tagStart = lineText.IndexOf("<");
                    string indent = tagStart >= 0 ? lineText.Substring(0, tagStart) : tab;

                    using (var subtree = reader.ReadSubtree())
                    {
                        subtree.Read();
                        string formatted = FormatElement(subtree, indent, tab, formatting);

                        int replaceLength = Math.Min(line.Length, GetLineLenghtToReplace(reader, document, linesAdded));
                        SetLinesAdded(reader, document, formatting, formatted, ref linesAdded);

                        int startOffset = line.Offset;
                        int endOffset = GetElementEndOffset(reader, document, linesAdded);
                        int lengthToReplace = endOffset - startOffset;

                        document.Replace(startOffset, lengthToReplace, formatted);
                    }
                }
            }
        }

        int GetElementEndOffset(XmlTextReader reader, IDocument document, int linesAdded)
        {
            int endLine = reader.LineNumber - 1 + linesAdded;
            while (endLine < document.TotalNumberOfLines)
            {
                var line = document.GetLineSegment(endLine);
                var text = document.GetText(line);
                if (text.Contains($"</{reader.Name}>") || reader.IsEmptyElement)
                    return line.Offset + line.Length;
                endLine++;
            }
            return document.TextLength;
        }

        string FormatElement(XmlReader reader, string indent, string tab, XmlAttributesAlign formatting)
        {
            string elementName = reader.Name;
            var builder = new StringBuilder();

            builder.Append(indent).Append("<").Append(elementName);

            if (reader.HasAttributes)
            {
                for (int i = 0; i < reader.AttributeCount; i++)
                {
                    reader.MoveToAttribute(i);
                    // kvůli správnému formátování je potřeba ošetřit speciální znaky
                    string formattedAttribute = $"{reader.Name}=\"{EscapeEntities(reader.Value)}\"";

                    if (formatting == XmlAttributesAlign.NewLine)
                        builder.AppendLine().Append(indent).Append(tab).Append(formattedAttribute);
                    else if (formatting == XmlAttributesAlign.NewLine)
                        builder.AppendLine().Append(indent).Append(tab).Append(formattedAttribute);
                    else
                        builder.Append(" ").Append(formattedAttribute);
                }
                reader.MoveToElement();
            }


            if (reader.IsEmptyElement)
            {
                builder.Append(" />");
                return builder.ToString();
            }

            builder.Append(">");

            string innerIndent = indent + tab;

            while (reader.Read())
            {
                switch (reader.NodeType)
                {
                    case XmlNodeType.Element:
                        builder.AppendLine().Append(FormatElement(reader, innerIndent, tab, formatting));
                        break;
                    case XmlNodeType.Text:
                        builder.Append(EscapeEntities(reader.Value));
                        break;
                    case XmlNodeType.CDATA:
                        builder.AppendLine()
                               .Append(innerIndent)
                               .Append("<![CDATA[")
                               .Append(reader.Value)
                               .Append("]]>");
                        break;
                    case XmlNodeType.Comment:
                        builder.AppendLine().Append(innerIndent).Append("<!--").Append(reader.Value).Append("-->");
                        break;
                    case XmlNodeType.EndElement:
                        builder.AppendLine().Append(indent).Append($"</{elementName}>");
                        return builder.ToString();
                }
            }
            builder.AppendLine().Append(indent).Append($"</{elementName}>");
            return builder.ToString();
        }

        string EscapeEntities(string value) => value.Replace("&", "&amp;").Replace("\"", "&quot;").Replace("<", "&lt;").Replace(">", "&gt;").Replace("\n", "&#10;").Replace("\r", "&#13;");


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
                        currentIndentation = tagStack.Count == 0 ? "" : (string)tagStack.Pop();
                    }

                    if (r.NodeType == XmlNodeType.EndElement)
                        currentIndentation = tagStack.Count == 0 ? "" : (string)tagStack.Pop();

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

                        // speciální případ: 
                        // otevírací tag má zavírací závorku na dalším řádku: odstranění jednoho úrovně odsazení
                        string newText = lineText.Trim() == ">"
                            ? (string)tagStack.Peek() + lineText.Trim()
                            : (currentIndentation + lineText.Trim());

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

                        attribIndent = r.Name.Length < 16 ? currentIndentation + new string(' ', 2 + r.Name.Length) : (currentIndentation + tab);
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
