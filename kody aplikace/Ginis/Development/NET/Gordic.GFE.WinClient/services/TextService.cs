//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.TextService.cs                         </Name>
//    <Description> služba pro práci s textem                                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-04-03                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Gordic.TextEditor;
using Gordic.TextEditor.Document;
using System.IO;
using System.Drawing;
using Gordic.GFE.Parsers.DefaultEditor;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Hosting;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Utils;

namespace Gordic.GFE.WinClient.Service
{
    /// <summary>
    /// služba pro práci s textem
    /// </summary>
    public static class TextService
    {
        /// <summary>
        /// Změna řezu písma v textu speciálního formátu
        /// </summary>
        /// <param name="textAreaControl">Text speciálního formátu</param>
        /// <param name="styleAttribut">Nový řez písmas</param>
        /// <param name="newValue">Nová hodnota</param>
        /// <param name="defaultValue">Implicitní hodnota atributu</param>
        internal static void ChangeStyleAttribut(TextAreaControl textAreaControl, string styleAttribut, string newValue, string defaultValue)
        {
            if (string.IsNullOrEmpty(textAreaControl.SelectionManager.SelectedText))
                ChangeStyleAttribut(textAreaControl.TextArea, styleAttribut, newValue, textAreaControl.Document.GetLineSegmentForOffset(textAreaControl.Caret.Offset), defaultValue, true);
            else
            {
                if (!textAreaControl.SelectionManager.HasSomethingSelected)
                    return;

                ISelection selection = textAreaControl.SelectionManager.SelectionCollection[0];
                int index = selection.Offset,
                    indexBegin = selection.Offset,
                    indexEnd = selection.EndOffset;
                textAreaControl.SelectionManager.ClearSelection();

                while (index < indexEnd)
                {
                    LineSegment ls = textAreaControl.Document.GetLineSegmentForOffset(index);
                    int oldLenght = ls.Length;
                    ChangeStyleAttribut(textAreaControl.TextArea, styleAttribut, newValue, ls, defaultValue, false);

                    ls = textAreaControl.Document.GetLineSegmentForOffset(index);
                    indexEnd += ls.Length - oldLenght;
                    index = ls.Offset + ls.Length + 2;// 2 - /r/n
                }
                textAreaControl.SelectionManager.SetSelection(textAreaControl.TextArea.Document.OffsetToPosition(indexBegin), textAreaControl.TextArea.Document.OffsetToPosition(indexEnd));
            }
            textAreaControl.Parent.Refresh();
        }

        /// <summary>
        /// Změna řezu písma v textu speciálního formátu
        /// </summary>
        /// <param name="textAreaControl">Text speciálního formátu</param>
        /// <param name="fontStyle">Nový řez písma</param>
        public static void ChangeTrueFalseStyleAttribut(TextAreaControl textAreaControl, string fontStyle)
        {
            if (string.IsNullOrEmpty(textAreaControl.SelectionManager.SelectedText))
                ChangeTrueFalseStyleAttribut(textAreaControl.TextArea, fontStyle, textAreaControl.Document.GetLineSegmentForOffset(textAreaControl.Caret.Offset), true);
            else
            {
                if (!textAreaControl.SelectionManager.HasSomethingSelected)
                    return;

                ISelection selection = textAreaControl.SelectionManager.SelectionCollection[0];
                int index = selection.Offset,
                    indexBegin = selection.Offset,
                    indexEnd = selection.EndOffset;
                textAreaControl.SelectionManager.ClearSelection();

                while (index < indexEnd)
                {
                    LineSegment ls = textAreaControl.Document.GetLineSegmentForOffset(index);
                    int oldLenght = ls.Length;
                    ChangeTrueFalseStyleAttribut(textAreaControl.TextArea, fontStyle, ls, false);

                    ls = textAreaControl.Document.GetLineSegmentForOffset(index);
                    indexEnd += ls.Length - oldLenght;
                    index = ls.Offset + ls.Length + 2;// 2 - /r/n
                }
                textAreaControl.SelectionManager.SetSelection(textAreaControl.TextArea.Document.OffsetToPosition(indexBegin), textAreaControl.TextArea.Document.OffsetToPosition(indexEnd));
            }
            textAreaControl.Parent.Refresh();
        }

        /// <summary>
        /// Nastavení řezu písma v segmentu
        /// </summary>
        /// <param name="textArea">Text speciálního formátu</param>
        /// <param name="styleAttribut">Nový řez písma</param>
        /// <param name="newValue">Nová hodnota</param>
        /// <param name="lineSegment">Řádkový segment</param>
        /// <param name="defaultValue">Implicitní hodnota - pokud nová hodnota je implicitní, pak jí tam nedáme</param>
        /// <param name="recursively">TRUE - hledá nejen na daném LineSegmentu</param>
        private static void ChangeStyleAttribut(TextArea textArea, string styleAttribut, string newValue, LineSegment lineSegment, string defaultValue, bool recursively)
        {
            // zafixujeme slovo Style
            TextWord styleWord = GetStyleWord(textArea, ref lineSegment, recursively);

            // existuje slovo span STYLE
            if (styleWord != null)
            {
                LineSegment attributeLineSegment = lineSegment;//???
                // zafixujeme atribut
                // zjistíme, zda existuje slovo atributu, např. FONT-BOLD
                TextWord _tAttribut = GetAttributeWord(textArea, ref attributeLineSegment, styleAttribut, true);

                // pokud atribut nebyl nalezen, pak ho vytvoříme
                if (_tAttribut == null)
                {
                    // pokud vkládaná hodnota není implicitní, pak jí vložíme
                    if (!String.Equals(newValue, defaultValue, StringComparison.InvariantCultureIgnoreCase))
                    {
                        // najdeme pozici hned za spanem STYLE
                        int offset = lineSegment.Offset + styleWord.Offset + styleWord.Length;
                        // posuneme kurzor na pozici ZA stylem
                        textArea.Caret.Position = textArea.Document.OffsetToPosition(offset);
                        textArea.InsertString(string.Format(" {0}=\"{1}\"", styleAttribut, newValue));
                    }
                }
                // jinak atribut již existuje
                else
                {
                    // první uvozovka
                    TextWord beginQuote = null,
                        // druhá uvozovka
                        endQuote = null;

                    // pro tento účel potřebujeme získát indexy závorek
                    string oldValue = GetQuotes(textArea.Document, attributeLineSegment, _tAttribut, ref beginQuote, ref endQuote);
                    //oldValue = oldValue.ToLower().Trim();

                    // pokud stará hodnota je stejná jako vkládaná
                    if (string.Equals(oldValue, newValue, StringComparison.InvariantCultureIgnoreCase))
                    {
                        // zkontrolujeme, zda stará/vkládaná hodnota je implicitní
                        // pokud ANO, pak jí odstraníme
                        if (string.Equals(defaultValue, newValue, StringComparison.InvariantCultureIgnoreCase))
                        {
                            // odstraníme starý obsah
                            textArea.Document.Remove(attributeLineSegment.Offset + _tAttribut.Offset - 1, (attributeLineSegment.Offset + endQuote.Offset) - (attributeLineSegment.Offset + _tAttribut.Offset) + 2);
                            // posuneme kurzor na začátek atributu
                            textArea.Caret.Position = textArea.Document.OffsetToPosition(attributeLineSegment.Offset + _tAttribut.Offset - 1);
                        }
                    }
                    else
                    {
                        // zkontrolujeme, zda stará/vkládaná hodnota je implicitní
                        // pokud ANO, pak jí odstraníme
                        if (string.Equals(defaultValue, newValue, StringComparison.InvariantCultureIgnoreCase))
                        {
                            // odstraníme starý obsah
                            textArea.Document.Remove(attributeLineSegment.Offset + _tAttribut.Offset - 1, (attributeLineSegment.Offset + endQuote.Offset) - (attributeLineSegment.Offset + _tAttribut.Offset) + 2);
                            // posuneme kurzor na začátek atributu
                            textArea.Caret.Position = textArea.Document.OffsetToPosition(attributeLineSegment.Offset + _tAttribut.Offset - 1);
                        }
                        else
                        {
                            // změníme starý obsah
                            textArea.Document.Replace(attributeLineSegment.Offset + _tAttribut.Offset, (attributeLineSegment.Offset + endQuote.Offset) - (attributeLineSegment.Offset + _tAttribut.Offset) + 1, string.Format("{0}=\"{1}\"", styleAttribut, newValue));
                            // posuneme kurzor na začátek atributu
                            textArea.Caret.Position = textArea.Document.OffsetToPosition(attributeLineSegment.Offset + _tAttribut.Offset);
                        }
                    }
                }
            }
        }

        /// <summary>
        /// Nastavení řezu písma v segmentu
        /// </summary>
        /// <param name="textArea">Text speciálního formátu</param>
        /// <param name="fontStyle">Nový řez písmas</param>
        /// <param name="lineSegment">Řádkový segment</param>
        /// <param name="recursively">TRUE - hled8 nejen na dan0m LineSegmentu</param>
        private static void ChangeTrueFalseStyleAttribut(TextArea textArea, string fontStyle, LineSegment lineSegment, bool recursively)
        {
            // zafixujeme slovo Style
            TextWord styleWord = GetStyleWord(textArea, ref lineSegment, recursively);

            // existuje slovo span STYLE
            if (styleWord != null)
            {
                LineSegment attributeLineSegment = lineSegment;//???
                // zafixujeme atribut
                // zjistíme, zda existuje slovo atributu, např. FONT-BOLD
                TextWord _tAttribut = GetAttributeWord(textArea, ref attributeLineSegment, fontStyle, true);

                // pokud atribut nebyl nalezen, pak ho vytvoříme
                if (_tAttribut == null)
                {
                    // najdeme pozici hned za spanem STYLE
                    int offset = lineSegment.Offset + styleWord.Offset + styleWord.Length;
                    // posuneme kurzor na pozici ZA stylem
                    textArea.Caret.Position = textArea.Document.OffsetToPosition(offset);
                    // vložíme atribut
                    textArea.InsertString(string.Format(" {0}=\"true\"", fontStyle));
                }
                // jinak atribut již existuje
                else
                {
                    // první uvozovka
                    TextWord beginQuote = null,
                        // druhá uvozovka
                        endQuote = null;

                    // pro tento účel potřebujeme získát indexy závorek
                    string quoteText = GetQuotes(textArea.Document, attributeLineSegment, _tAttribut, ref beginQuote, ref endQuote);

                    quoteText = quoteText.ToLower().Trim();
                    bool _value = false;
                    // pokud mezi závorkami se nacházela smysluplná hodnota
                    if (bool.TryParse(quoteText, out _value))
                    {
                        // pokud hodnota atributu je TRUE, pak ho změníme na FALSE
                        if (!_value)
                        {
                            // změníme starý obsah
                            textArea.Document.Replace(attributeLineSegment.Offset + _tAttribut.Offset, (attributeLineSegment.Offset + endQuote.Offset) - (attributeLineSegment.Offset + _tAttribut.Offset) + 1, string.Format("{0}=\"true\"", fontStyle));
                            // posuneme kurzor na začátek atributu
                            textArea.Caret.Position = textArea.Document.OffsetToPosition(attributeLineSegment.Offset + _tAttribut.Offset);
                        }
                        else
                        {
                            // odstraníme starý obsah
                            textArea.Document.Remove(attributeLineSegment.Offset + _tAttribut.Offset - 1, (attributeLineSegment.Offset + endQuote.Offset) - (attributeLineSegment.Offset + _tAttribut.Offset) + 2);
                            // posuneme kurzor na začátek atributu
                            textArea.Caret.Position = textArea.Document.OffsetToPosition(attributeLineSegment.Offset + _tAttribut.Offset - 1);
                        }
                    }
                }
            }
        }

        /// <summary>
        /// Vrátí slovo STYLE
        /// </summary>
        /// <param name="textArea">Textový ovladač</param>
        /// <param name="lineSegment">Segmen, ve kterém se hledá slovo STYLE</param>
        /// <param name="recursively">TRUE - hled8 nejen v dan0m LineSegmentu</param>
        public static TextWord GetStyleWord(TextArea textArea, ref LineSegment lineSegment, bool recursively)
        {
            for (int _index = 0; _index < lineSegment.Words.Count; _index++)
                if (_index != 0 &&
                    String.Equals((lineSegment.Words[_index] as TextWord).Word, "style", StringComparison.InvariantCultureIgnoreCase) &&
                    String.Equals((lineSegment.Words[_index - 1] as TextWord).Word, "<", StringComparison.InvariantCultureIgnoreCase))
                    return (TextWord)lineSegment.Words[_index];

            if (recursively)
            {
                // pokud span STYLE nebyl nalezen, pak zkusíme ho hledát směrem nahoru
                if (lineSegment.LineNumber != 0)
                {
                    lineSegment = textArea.Document.GetLineSegment(lineSegment.LineNumber - 1);
                    return GetStyleWord(textArea, ref lineSegment, recursively);
                }
            }
            return null;
        }

        /// <summary>
        /// Vrátí slovo atributu
        /// </summary>
        /// <param name="textArea">Textový ovladač</param>
        /// <param name="lineSegment">Segment řádku ve kterém se hledá</param>
        /// <param name="atributName">Hledaný atribut</param>
        /// <param name="isFirst">Je první</param>
        public static TextWord GetAttributeWord(TextArea textArea, ref LineSegment lineSegment, string atributName, bool isFirst)
        {
            bool _existsBreak = false;
            for (int _index = 0; _index < lineSegment.Words.Count; _index++)
            {
                // pokud není to první průchod, pak hlidáme, aby nenastal konec spanu nebo začátek nového spanu
                if (!isFirst && _index != 0 &&
                    (lineSegment.Words[_index] as TextWord).Word == "<")
                    _existsBreak = true;
                else if (_index != 0 &&
                    (lineSegment.Words[_index] as TextWord).Word == ">")
                    _existsBreak = true;
                else if ((lineSegment.Words[_index] as TextWord).Word == atributName)
                    return (TextWord)lineSegment.Words[_index];
            }

            if (_existsBreak)
                return null;
            else if (lineSegment.LineNumber != textArea.Document.LineSegmentCollection.Count - 1)
            {
                lineSegment = textArea.Document.GetLineSegment(lineSegment.LineNumber + 1);
                return GetAttributeWord(textArea, ref lineSegment, atributName, false);
            }
            return null;
        }

        /// <summary>
        /// Získání uvozovek a textu mezi nimi
        /// </summary>
        /// <param name="document"></param>
        /// <param name="attributeLine">Řádek, obsahující atribut</param>
        /// <param name="atributWord">Atribut</param>
        /// <param name="beginBracket">První uvozovka</param>
        /// <param name="endBracket">Druhá uvozovka</param>
        /// <returns></returns>
        public static string GetQuotes(IDocument document, LineSegment attributeLine, TextWord atributWord, ref TextWord beginBracket, ref TextWord endBracket)
        {
            string _result = string.Empty;

            for (int i = attributeLine.Words.IndexOf(atributWord) + 1; i < attributeLine.Words.Count; i++)
            {
                if ((attributeLine.Words[i] as TextWord).Word == "\"")
                {
                    if (beginBracket == null)
                        beginBracket = attributeLine.Words[i] as TextWord;
                    else endBracket = attributeLine.Words[i] as TextWord;
                }

                if (beginBracket != null && endBracket != null)
                    return _result;

                if (beginBracket != null && (attributeLine.Words[i] as TextWord).Word != "\"")
                    _result += (attributeLine.Words[i] as TextWord).Word;
            }
            return string.Empty;
        }

        /// <summary>
        /// Vráti text začínající koncem uvedeného textu a končící uvozovkou
        /// </summary>
        /// <param name="filedata">Data ve kterých se hledá</param>
        /// <param name="stringFrom">Text od</param>
        /// <returns></returns>
        public static string GetTextAfter(byte[] filedata, string stringFrom)
        {
            string result = GetAfter(filedata, stringFrom);
            if (string.IsNullOrEmpty(result))
                result = GetAfter(filedata, "\r\n" + stringFrom);
            return result;
        }

        private static string GetAfter(byte[] filedata, string stringFrom)
        {
            if (filedata == null || filedata.Length == 0)
                return string.Empty;

            int index = 0;
            int offset = 0;
            while (index < filedata.Length)
            {
                if (Convert.ToChar(filedata[index]) == stringFrom[offset])
                    if (FindSequence(stringFrom, filedata, ref index, ref offset))
                    {
                        string value = string.Empty;
                        while (index < filedata.Length)
                        {
                            if (Convert.ToChar(filedata[index]) != '"')
                            {
                                value += Convert.ToChar(filedata[index]);
                                index++;
                            }
                            else break;
                        }
                        if (!string.IsNullOrEmpty(value))
                            return value;
                    }
                index++;
            }

            return string.Empty;
        }

        /// <summary>
        /// Nalezení sequence v směsi pole bytů
        /// </summary>
        /// <param name="type">Hledaný řetězec</param>
        /// <param name="filedata">Pole dat</param>
        /// <param name="index">Index v poli dat od kterého se hledání pokračuje</param>
        /// <param name="offset">Index v řetězci od kterého se porovnávají symboly</param>
        /// <returns></returns>
        private static bool FindSequence(string type, byte[] filedata, ref int index, ref int offset)
        {
            while (index < filedata.Length && offset < type.Length)
            {
                if (Convert.ToChar(filedata[index]) == type[offset])
                {
                    index++;
                    offset++;
                }
                else
                {
                    offset = 0;
                    return false;
                }
            }

            return offset == type.Length;
        }

        /// <summary>
        /// Konvertuje pole bytů do řetězce
        /// </summary>
        /// <param name="bytes">Pole bytů</param>
        /// <param name="encoding">Kódování bytů</param>
        /// <returns></returns>
        internal static string ConvertByteToString(byte[] bytes, Encoding encoding)
        {
            string output = string.Empty;
            MemoryStream ms = new MemoryStream(bytes);
            using (StreamReader sr = new StreamReader(ms, encoding))
                output = sr.ReadToEnd();
            return output;
        }

        /// <summary>
        /// Dle obsahu dat zjistí, zda prezentují strukturu dat
        /// </summary>
        /// <param name="fileData">Obsah dat</param>
        /// <returns></returns>
        internal static bool IsStructure(byte[] fileData)
        {
            int index = 0;
            int offset = 0;
            string stringFrom = @"http://www.gordic.cz/TR/xme";
            while (index < fileData.Length)
            {
                if (Convert.ToChar(fileData[index]) == stringFrom[offset])
                    if (FindSequence(stringFrom, fileData, ref index, ref offset))
                        return true;
                index++;
            }

            return false;
        }

        /// <summary>
        /// Změna řezu písma
        /// </summary>
        /// <param name="selectedObjects">Seznam objektů, nad kterýma se provedou změny</param>
        /// <param name="fontstyle">Přidávaný řez písma</param>
        internal static void ChangeFontStyleAttribut(List<object> selectedObjects, FontStyle fontstyle)
        {
            if (selectedObjects == null)
                return;

            ////projdeme všechny vybrané objekty a nastavíme jím řez na novou hodnotu
            //foreach (object item in selectedObjects)
            //    if (item is IText)
            //    {
            //        if ((item as IText).Text.Font.Style != (GfeFontStyle)(((FontStyle)(item as IText).Text.Font.Style) | fontstyle))
            //            (item as IText).Text.Font.Style = (GfeFontStyle)(((FontStyle)(item as IText).Text.Font.Style) | fontstyle);
            //        else (item as IText).Text.Font.Style = (GfeFontStyle)(((FontStyle)(item as IText).Text.Font.Style) - fontstyle);
            //    }
        }

        /// <summary>
        /// Změna atributu zarovnání textu vybraných objektů
        /// </summary>
        /// <param name="selection">Služba pro práci s vybranými objekty</param>
        /// <param name="align">Zarovnání</param>
        internal static void ChangeStyleAttribut(SelectionService selection, object align)
        {
            if (selection == null)
                return;

            ////projdeme všechny vybrané objekty a nastavíme jím řez na novou hodnotu
            //foreach (object item in selection.SelectedComponents)
            //    if (item is IText)
            //    {
            //        if (align is HAlign)
            //            (item as IText).Text.Align.Horizontal = (HAlign)align;
            //        else if (align is VAlign)
            //            (item as IText).Text.Align.Vertical = (VAlign)align;
            //    }
        }

        /// <summary>
        /// Změna atributu barva textu
        /// </summary>
        /// <param name="selection">Služba pro práci s vybranými objekty</param>
        /// <param name="color">Nová barva textu</param>
        internal static void ChangeStyleAttribut(SelectionService selection, Color color)
        {
            if (selection == null)
                return;
            
            ////projdeme všechny vybrané objekty a nastavíme jím řez na novou hodnotu
            //foreach (object item in selection.SelectedComponents)
            //    if (item is IText)
            //        (item as IText).Text.Font.ForeColor.SetColor(color);
        }

        /// <summary>
        /// Změna atributu písmo textu
        /// </summary>
        /// <param name="selection">Služba pro práci s vybranými objekty</param>
        /// <param name="font">Nové písmo textu</param>
        internal static void ChangeStyleAttribut(SelectionService selection, GFEFontFamily font)
        {
            if (selection == null || font == null)
                return;

            ////projdeme všechny vybrané objekty a nastavíme jím písmo na novou hodnotu
            //foreach (object item in selection.SelectedComponents)
            //    if (item is IText)
            //        (item as IText).Text.Font.FontFamily = new GFEFontFamily(font);
        }

        /// <summary>
        /// Změna atributu velikost textu
        /// </summary>
        /// <param name="selection">Služba pro práci s vybranými objekty</param>
        /// <param name="size">Nová velikost textu</param>
        internal static void ChangeStyleAttribut(SelectionService selection, GFEFontSize size)
        {
            if (selection == null || size == null)
                return;

            ////projdeme všechny vybrané objekty a nastavíme jím písmo na novou hodnotu
            //foreach (object item in selection.SelectedComponents)
            //    if (item is IText)
            //        (item as IText).Text.Font.Size.Value = size.Value;
        }

        ///// <summary>
        ///// Získání seznamu atributu větve INFO
        ///// </summary>
        ///// <param name="content">Pohled na obsah</param>
        ///// <returns></returns>
        //internal static Dictionary<string, string> GetInfo(IViewContent content)
        //{
        //    int offset = -1,
        //        length = -1;
        //    return GetInfo(content, ref offset, ref length);
        //}

        ///// <summary>
        ///// Získání seznamu atributu větve INFO
        ///// </summary>
        ///// <param name="content">Pohled na obsah</param>
        ///// <param name="offsetInfo">Offset začátku sekce INFO</param>
        ///// <param name="lengthInfo">Delka sekce INFO</param>
        ///// <returns></returns>
        //internal static Dictionary<string, string> GetInfo(IViewContent content, ref int offsetInfo, ref int lengthInfo)
        //{
        //    ITextEditorControlProvider tecp = content as ITextEditorControlProvider;
        //    if (tecp != null)
        //        return GetInfo(tecp, ref offsetInfo, ref lengthInfo);
        //    IFormationHandler sh = content as IFormationHandler;
        //    if (sh != null)
        //        return sh.Info;
        //    return new Dictionary<string, string>();
        //}

        /// <summary>
        /// Získání seznamu atributu větve INFO
        /// </summary>
        /// <param name="content">Pohled na obsah</param>
        /// <param name="offsetInfo">Offset začátku sekce INFO</param>
        /// <param name="lengthInfo">Delka sekce INFO</param>
        /// <returns></returns>
        static Dictionary<string, string> GetInfo(ITextEditorControlProvider content, ref int offsetInfo, ref int lengthInfo)
        {
            offsetInfo = -1;
            Dictionary<string, string> result = new Dictionary<string, string>();
            byte[] filedata = content.TextEditorControl.TextEditorProperties.Encoding.GetBytes(content.TextEditorControl.Text);
            if (filedata == null || filedata.Length == 0)
                return result;

            string resultString = string.Empty;

            int index = 0,
                offset = 0,
                endIndex = 0;

            resultString = GetInfo(filedata, content.TextEditorControl.TextEditorProperties.Encoding, index, offset, ref offsetInfo, ref endIndex);

            do
            {
                index = 0;

                filedata = content.TextEditorControl.TextEditorProperties.Encoding.GetBytes(resultString);

                while (index < filedata.Length)
                {
                    string key = string.Empty,
                        value = string.Empty;

                    if (Convert.ToChar(filedata[index]) != ' '
                        && Convert.ToChar(filedata[index]) != '\r'
                        && Convert.ToChar(filedata[index]) != '\n'
                        && Convert.ToChar(filedata[index]) != '\t')
                    {
                        // klič
                        while (index < filedata.Length
                            && Convert.ToChar(filedata[index]) != '='
                            && Convert.ToChar(filedata[index]) != '\t'
                            && Convert.ToChar(filedata[index]) != '\r'
                            && Convert.ToChar(filedata[index]) != '\n')
                        {
                            key += content.TextEditorControl.TextEditorProperties.Encoding.GetString(new byte[] { filedata[index] });//resultString[index];//Convert.ToChar(filedata[index]);
                            index++;
                        }
                        index++;

                        // první uvozovka - otevírací
                        while (index < filedata.Length
                            && Convert.ToChar(filedata[index]) != '"'
                            && Convert.ToChar(filedata[index]) != '\'')
                            index++;

                        index++;

                        // mezí uvozovkami - hodnota
                        while (index < filedata.Length
                            && Convert.ToChar(filedata[index]) != '"'
                            && Convert.ToChar(filedata[index]) != '\'')
                        {
                            value += content.TextEditorControl.TextEditorProperties.Encoding.GetString(new byte[] { filedata[index] });//resultString[index];//Convert.ToChar(filedata[index]);
                            index++;
                        }
                        index++;

                        if (index < filedata.Length && !string.IsNullOrEmpty(key) && !result.ContainsKey(key))
                            result.Add(key, value);
                    }
                    else index++;
                }

                index = endIndex;
                int offsetinfo = -1;
                filedata = content.TextEditorControl.Document.TextEditorProperties.Encoding.GetBytes(content.TextEditorControl.Text);

                resultString = GetInfo(filedata, content.TextEditorControl.TextEditorProperties.Encoding, index, offset, ref offsetinfo, ref endIndex);

            } while (!string.IsNullOrEmpty(resultString));

            lengthInfo = endIndex - offsetInfo;
            return result;
        }

        private static string GetInfo(byte[] filedata, Encoding encoding, int index, int offset, ref int offsetInfo, ref int endIndex)
        {
            string resultString = GetInfo(filedata, encoding, index, offset, "<info ", ref offsetInfo, ref endIndex);

            if (string.IsNullOrEmpty(resultString))
                resultString = GetInfo(filedata, encoding, index, offset, "<info\r", ref offsetInfo, ref endIndex);

            if (string.IsNullOrEmpty(resultString))
                resultString = GetInfo(filedata, encoding, index, offset, "<info\n", ref offsetInfo, ref endIndex);

            if (string.IsNullOrEmpty(resultString))
                resultString = GetInfo(filedata, encoding, index, offset, "<info\t", ref offsetInfo, ref endIndex);

            return resultString;
        }

        private static string GetInfo(byte[] filedata, Encoding encoding, int index, int offset, string stringFrom, ref int offsetInfo, ref int endIndex)
        {
            string resultString = string.Empty;

            while (index < filedata.Length)
            {
                if (Convert.ToChar(filedata[index]) == stringFrom[0])
                    if (FindSequence(stringFrom, filedata, ref index, ref offset))
                    {
                        offsetInfo = index - offset;
                        if (index < filedata.Length)
                            while (index < filedata.Length)
                            {
                                if (Convert.ToChar(filedata[index]) != '>'
                                    && Convert.ToChar(filedata[index]) != '<')
                                {
                                    resultString += encoding.GetString(new byte[] { filedata[index] });//document.GetCharAt(index);//encoding.GetString(new byte[] { filedata[index] });
                                    index++;
                                }
                                else
                                {
                                    if (Convert.ToChar(filedata[index]) == '>')
                                        index++;
                                    else
                                    {
                                        index--;

                                        // jdeme zpět k poslednímu symbolu
                                        while (!Char.IsLetterOrDigit(Convert.ToChar(filedata[index]))
                                            && Convert.ToChar(filedata[index]) != '>'
                                            && Convert.ToChar(filedata[index]) != '"'
                                            && Convert.ToChar(filedata[index]) != '/')
                                            index--;
                                        index++;
                                    }
                                    endIndex = index;

                                    break;
                                }
                            }
                        else endIndex = offsetInfo + 6;
                        break;
                    }
                index++;
            }

            return /*string.IsNullOrEmpty(resultString) ? string.Empty : stringFrom + */resultString;
        }
        /*
        /// <summary>
        /// Uložení sekce INFO do pohledu na obsah 
        /// </summary>
        /// <param name="content">pohled na obsah</param>
        /// <param name="collection">Kolekce vkládaných ohodnot</param>
        /// <param name="offsetInfo">Začátek sekce INFO</param>
        /// <param name="lengthInfo">Delká stávající sekce INFO</param>
        internal static void SetInfo(TextEditorFormatWrapper content, DataGridViewRowCollection collection, int offsetInfo, int lengthInfo)
        {
            int spaces = 0;
            int tabs = GetTabsOnLine(content.TextEditorControl, offsetInfo, ref spaces);

            // 4 prázdné znaky je jeden tabulátor
            int rem = 0;
            int tabsForAttribute = Math.DivRem(spaces, 4, out rem) + 1 + tabs;

            string newinfo = "<info ";            
            foreach (DataGridViewRow item in collection)
            {
                // pokud klič není NULL nebo prázdný
                if (!string.IsNullOrEmpty(item.Cells[0].Value as string))
                    newinfo += string.Format("{0}=\"{1}\"\r\n" + GetTabsAsText(tabsForAttribute), item.Cells[0].Value as string, item.Cells[1].Value as string);
            }
            newinfo += "/>";

            content.texteditorcontrol.ActiveTextAreaControl.TextArea.Document.Replace(offsetInfo, lengthInfo, newinfo);
            content.texteditorcontrol.Refresh();
        }
        */
        /// <summary>
        /// Vrátí text, prezentující uvedený počet tabulátorů
        /// </summary>
        /// <param name="tabs">Počet tabulátorů</param>
        /// <returns></returns>
        private static string GetTabsAsText(int tabs)
        {
            string result = string.Empty;

            for (int i = 0; i < tabs; i++)
                result += '\t';
            return result;
        }

        /// <summary>
        /// získáme počet tabulátorů na začátku řádku dle offsetu
        /// </summary>
        /// <param name="textControl">Kde se hledá</param>
        /// <param name="offset">Offset řádku</param>
        /// <param name="spaces"></param>
        /// <returns></returns>
        private static int GetTabsOnLine(TextEditorControl textControl, int offset, ref int spaces)
        {
            int result = 0;
            LineSegment line = textControl.Document.GetLineSegment(textControl.Document.GetLineNumberForOffset(offset));
            int index = 0;
            while (index < line.Words.Count && (line.Words[index] is TextWord.SpaceTextWord
                || line.Words[index] is TextWord.TabTextWord))
            {
                if (line.Words[index] is TextWord.TabTextWord)
                    result++;
                else spaces++;
                index++;
            }

            return result;
        }

        /// <summary>
        /// Zjištění typu souboru
        /// </summary>
        /// <param name="filedata">Data souboru</param>
        /// <returns></returns>
        internal static FormatType GetFormatType(byte[] filedata)
        {
            string value = GetTextAfter(filedata, " type=\"");
            if (string.IsNullOrEmpty(value))
                return FormatType.NULL;
            // 608827129
            try { return (FormatType)Enum.Parse(typeof(FormatType), value.ToLower()); }
            catch { return FormatType.NULL; }
        }

        internal static FormatType GetFormatType(IViewContent content)
        {
            if (content is ITextEditorControlProvider)
                return GetFormatType(content as ITextEditorControlProvider);
            else return (content as ISpecificFormat).TypeFormat;
        }

        private static FormatType GetFormatType(ITextEditorControlProvider content)
        {
            byte[] filedata = content.TextEditorControl.TextEditorProperties.Encoding.GetBytes(content.TextEditorControl.Text);
            if (filedata == null || filedata.Length == 0)
                return FormatType.NULL;
            return GetFormatType(filedata);
        }

        /// <summary>
        /// nastavení datumu editace sestavy
        /// </summary>
        /// <param name="document">dokument, obsahující větev INFO.</param>
        internal static void SetLastModif(IDocument document)
        {
            bool isInfo = false;
            TextWord wordInfo = null;
            LineSegment infoLine = null;
            bool modified = false, isDatModif = false, isLastModif = false;
            string last_modif = DateTime.Now.ToString("yyyyMMddHHmm"), 
                dat_modif = DateTime.Now.ToString("yyyyMMddHHmmss");

            // je zapotřebí pozměnit datum modifikace
            // se nachází v sekci INFO
            for (int index = 0; index < document.TotalNumberOfLines; index++)
            {
                LineSegment line = document.GetLineSegment(index);
                TextWord word;
                if (line.Words.Exists(wd => wd.Word.Equals("info", StringComparison.InvariantCultureIgnoreCase)))
                {
                    infoLine = line;
                    wordInfo = line.Words.FirstOrDefault(wd => wd.Word.Equals("info", StringComparison.InvariantCultureIgnoreCase));
                    if (line.Words[line.Words.IndexOf(wordInfo) - 1].Word.Equals("<"))
                        isInfo = true;
                }

                if (isInfo)
                {
                    word = line.Words.FirstOrDefault(wd => wd.Word.Equals("last_modif", StringComparison.InvariantCultureIgnoreCase));
                    if (word == null)
                    {
                        word = line.Words.FirstOrDefault(wd => wd.Word.Equals("dat_modif", StringComparison.InvariantCultureIgnoreCase));
                        if (word != null)
                            isDatModif = true;
                    }
                    else 
                        isLastModif = true;

                    if (word != null)
                    {
                        int f = -1, ff = -1;
                        int indexWord = line.Words.IndexOf(word);
                        for (int i = indexWord; i < line.Words.Count; i++)
                        {
                            if (line.Words[i].Word.Equals("\""))
                                if (f == -1)
                                    f = i;
                                else if (ff == -1)
                                    ff = i;
                            if (f != -1 && ff != -1)
                            {
                                // případ, že mezí uvozovky je slovo
                                if (f + 2 == ff)
                                {
                                    document.Replace(line.Offset + line.Words[f + 1].Offset, line.Words[f + 1].Length, isLastModif ? last_modif : dat_modif);
                                    isLastModif = isLastModif ? false : true;
                                    isDatModif = isDatModif ? false : true;
                                    modified = true;
                                    break;
                                }
                                // případ prázdných uvozovek
                                else if (f + 1 == ff)
                                {
                                    document.Insert(line.Offset + line.Words[f + 1].Offset, isLastModif ? last_modif : dat_modif);
                                    isLastModif = isLastModif ? false : true;
                                    isDatModif = isDatModif ? false : true;
                                    modified = true;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            if (!modified && infoLine != null && wordInfo != null)
                document.Insert(infoLine.Offset + wordInfo.Offset + wordInfo.Length + 1,
                    string.Format("dat_modif=\"{0}\" ", dat_modif));
        }
    }
}
