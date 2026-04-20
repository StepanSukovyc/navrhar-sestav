//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.TextEditorPlugins.cs                   </Name>
//    <Description> Rozšíření textového editoru                                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-01-09                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.Parsers;
using Gordic.TextEditor;
using Gordic.TextEditor.Document;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Rozšíření textového editoru
    /// </summary>
    public static class TextEditorPlugins
    {
        /// <summary>
        /// Vertikální zarovnání TOP
        /// </summary>
        internal static void VAlignTopSelection(TextAreaControl textAreaControl)
        {
            //1. případ, kdy není vybraná žádná část obsahu
            if (string.IsNullOrEmpty(textAreaControl.SelectionManager.SelectedText))
                //pak pracujeme s řádkem kde se nachází kurzor
                VAlignTop(textAreaControl);
        }

        /// <summary>
        /// Vertikální zarovnání TOP
        /// </summary>
        private static void VAlignTop(TextAreaControl textAreaControl)
        {
            ChangeVAlign(textAreaControl, "vertical-align", VAlign.top);
        }

        private static void ChangeVAlign(TextAreaControl textAreaControl, string _vAlign, VAlign hAlign)
        {
            LineSegment ls = textAreaControl.Document.GetLineSegmentForOffset(textAreaControl.Caret.Offset);
            // zafixujeme slovo Style
            TextWord _tStyle = null;
            // zafixujeme atribut
            TextWord _tAttribut = null;

            GetStyleWord(textAreaControl, ls, ref _tStyle);
            LineSegment lineStyle = textAreaControl.Document.GetLineSegmentForOffset(_tStyle.Offset);
            // existuje slovo span STYLE
            if (_tStyle != null)
            {
                // zjistíme, zda existuje slovo FONT-BOLD
                GetAttributeWord(textAreaControl, lineStyle, _vAlign, ref _tAttribut, true);

                // zafixujeme plochu
                TextArea _textArea = textAreaControl.TextArea;
                // pokud atribut font-bold není nalezen, pak ho vytvoříme
                if (_tAttribut == null)
                {
                    // najdeme pozici hned za spanem STYLE
                    int _bOffset = lineStyle.Offset + _tStyle.Offset + _tStyle.Length + 1;
                    // posuneme kurzor na pozici ZA stylem
                    _textArea.Caret.Position = _textArea.Document.OffsetToPosition(_bOffset);
                    // pokud nová hodnota není implicitní, pak ji zobrazíme mezi atributy
                    if (hAlign != VAlign.top)
                    {
                        if (_textArea.Caret.Position == _textArea.Document.OffsetToPosition(_bOffset - 1))
                            _textArea.InsertString(string.Format(" {0}=\"{1}\" ", _vAlign, hAlign));
                        else _textArea.InsertString(string.Format("{0}=\"{1}\" ", _vAlign, hAlign));
                    }
                }
                // jinak atribut již existuje
                else
                {
                    // první závorka
                    TextWord _tBB = null,
                        // druhá závorka
                        _tBE = null;
                    LineSegment lineAttribut = textAreaControl.Document.GetLineSegmentForOffset(_tAttribut.Offset);
                    // pro tento účel potřebujeme získát indexy závorek
                    string _boundedText = GetBouds(lineAttribut, lineAttribut.Words.IndexOf(_tAttribut), ref _tBB, ref _tBE);

                    _boundedText = _boundedText.ToLower().Trim();
                    VAlign _value = VAlign.top;

                    // pokud mezi závorkami se nacházela smysluplná hodnota
                    if (Enum.TryParse(_boundedText, true, out _value))
                    {
                        // pokud nová hodnota má být implicitní, pak ji nezobrazíme mezi atributy
                        if (hAlign == VAlign.top)
                        {
                            // odstraníme starý obsah
                            _textArea.Document.Remove(lineAttribut.Offset + _tAttribut.Offset - 1, (textAreaControl.Document.GetLineSegmentForOffset(_tBE.Offset).Offset + _tBE.Offset) - (lineAttribut.Offset + _tAttribut.Offset) + 2);
                            // posuneme kurzor na začátek atributu
                            _textArea.Caret.Position = _textArea.Document.OffsetToPosition(lineAttribut.Offset + _tAttribut.Offset - 1);
                        }
                        else
                        {
                            // změníme starý obsah
                            _textArea.Document.Replace(textAreaControl.Document.GetLineSegmentForOffset(_tAttribut.Offset).Offset + _tAttribut.Offset, (textAreaControl.Document.GetLineSegmentForOffset(_tBE.Offset).Offset + _tBE.Offset) - (lineAttribut.Offset + _tAttribut.Offset) + 1, string.Format("{0}=\"{1}\"", _vAlign, hAlign));
                            // posuneme kurzor na začátek atributu
                            _textArea.Caret.Position = _textArea.Document.OffsetToPosition(lineAttribut.Offset + _tAttribut.Offset);
                        }
                    }
                }
                textAreaControl.Parent.Refresh();// TextControl.Refresh();
            }
        }

        /// <summary>
        /// Získání závorek a textu mezi nimi
        /// </summary>
        /// <param name="line">Atribut</param>
        /// <param name="index"></param>
        /// <param name="p_tBB">První závorka</param>
        /// <param name="p_tBE">Druhá závorka</param>
        /// <returns></returns>
        private static string GetBouds(LineSegment line, int index, ref TextWord p_tBB, ref TextWord p_tBE)
        {
            string _result = string.Empty;

            for (int i = index + 1; i < line.Words.Count; i++)
            {
                if ((line.Words[i] as TextWord).Word == "\"")
                {
                    if (p_tBB == null)
                        p_tBB = line.Words[i] as TextWord;
                    else p_tBE = line.Words[i] as TextWord;
                }

                if (p_tBB != null && p_tBE != null)
                    return _result;

                if (p_tBB != null && (line.Words[i] as TextWord).Word != "\"")
                    _result += (line.Words[i] as TextWord).Word;
            }
            return string.Empty;
        }

        private static void GetAttributeWord(TextAreaControl textAreaControl, LineSegment lineSegment, string p_atribut, ref TextWord p_tAttr, bool p_first)
        {
            bool _existsBreak = false;
            for (int _index = 0; _index < lineSegment.Words.Count; _index++)
            {
                // pokud není to první průchod, pak hlidáme, aby nenastal konec spanu nebo začátek nového spanu
                if (!p_first && _index != 0 &&
                    (lineSegment.Words[_index] as TextWord).Word == "<")
                    _existsBreak = true;
                else if (_index != 0 &&
                    (lineSegment.Words[_index] as TextWord).Word == ">"
                    )
                    _existsBreak = true;
                else if ((lineSegment.Words[_index] as TextWord).Word == p_atribut)
                {
                    p_tAttr = (TextWord)lineSegment.Words[_index];
                    return;
                }
            }

            if (_existsBreak)
                return;
            else if (textAreaControl.TextArea.Document.GetLineNumberForOffset(lineSegment.Offset) != textAreaControl.TextArea.Document.LineSegmentCollection.Count - 1)
            {
                int _indexNewLine = textAreaControl.TextArea.Document.GetLineNumberForOffset(lineSegment.Offset) + 1;
                GetAttributeWord(textAreaControl, textAreaControl.TextArea.Document.GetLineSegment(_indexNewLine), p_atribut, ref p_tAttr, false);
            }
        }

        private static void GetStyleWord(TextAreaControl textAreaControl, LineSegment p_ls, ref TextWord p_tStyle)
        {
            for (int _index = 0; _index < p_ls.Words.Count; _index++)
            {
                if (_index != 0 &&
                    (p_ls.Words[_index] as TextWord).Word == "style" &&
                    (p_ls.Words[_index - 1] as TextWord).Word == "<")
                {
                    p_tStyle = (TextWord)p_ls.Words[_index];
                    return;
                }
            }
            // pokud span STYLE nebyl nalezen, pak zkusíme ho hledát směrem nahoru
            if (textAreaControl.TextArea.Document.GetLineNumberForOffset(p_ls.Offset) != 0)
            {
                int _indexNewLine = textAreaControl.TextArea.Document.GetLineNumberForOffset(p_ls.Offset) - 1;
                GetStyleWord(textAreaControl, textAreaControl.TextArea.Document.GetLineSegment(_indexNewLine), ref p_tStyle);
            }
        }

        /// <summary>
        /// Vertikální zarovnání CENTER
        /// </summary>
        internal static void VAlignCenterSelection(TextAreaControl textAreaControl)
        {
            //1. případ, kdy není vybraná žádná část obsahu
            if (string.IsNullOrEmpty(textAreaControl.SelectionManager.SelectedText))
                //pak pracujeme s řádkem kde se nachází kurzor
                VAlignCenter(textAreaControl);
        }

        /// <summary>
        /// Vertikální zarovnání CENTER
        /// </summary>
        private static void VAlignCenter(TextAreaControl textAreaControl)
        {
            ChangeVAlign(textAreaControl, "vertical-align", VAlign.center);
        }

        /// <summary>
        /// Vertikální zarovnání BOTTOM
        /// </summary>
        internal static void VAlignBottomSelection(TextAreaControl textAreaControl)
        {
            //1. případ, kdy není vybraná žádná část obsahu
            if (string.IsNullOrEmpty(textAreaControl.SelectionManager.SelectedText))
                //pak pracujeme s řádkem kde se nachází kurzor
                VAlignBottom(textAreaControl);
        }

        /// <summary>
        /// Vertikální zarovnání BOTTOM
        /// </summary>
        private static void VAlignBottom(TextAreaControl textAreaControl)
        {
            ChangeVAlign(textAreaControl, "vertical-align", VAlign.bottom);
        }

        /// <summary>
        /// Vertikální zarovnání LEFT
        /// </summary>
        internal static void HAlignLeftSelection(TextAreaControl textAreaControl)
        {
            //1. případ, kdy není vybraná žádná část obsahu
            if (string.IsNullOrEmpty(textAreaControl.SelectionManager.SelectedText))
                //pak pracujeme s řádkem kde se nachází kurzor
                HAlignLeft(textAreaControl);
        }

        /// <summary>
        /// Vertikální zarovnání LEFT
        /// </summary>
        private static void HAlignLeft(TextAreaControl textAreaControl)
        {
            ChangeHAlign(textAreaControl, "horizontal-align", HAlign.left);
        }

        private static void ChangeHAlign(TextAreaControl textAreaControl, string _hAlign, HAlign hAlign)
        {
            LineSegment ls = textAreaControl.Document.GetLineSegmentForOffset(textAreaControl.Caret.Offset);
            // zafixujeme slovo Style
            TextWord _tStyle = null;
            // zafixujeme atribut
            TextWord _tAttribut = null;

            GetStyleWord(textAreaControl, ls, ref _tStyle);
            LineSegment lineStyle = textAreaControl.Document.GetLineSegmentForOffset(_tStyle.Offset);
            // existuje slovo span STYLE
            if (_tStyle != null)
            {
                // zjistíme, zda existuje uvedený atribut
                GetAttributeWord(textAreaControl, lineStyle, _hAlign, ref _tAttribut, true);

                // zafixujeme plochu
                TextArea _textArea = textAreaControl.TextArea;
                // pokud atribut není nalezen, pak ho vytvoříme
                if (_tAttribut == null)
                {
                    // najdeme pozici hned za spanem STYLE
                    int _bOffset = lineStyle.Offset + _tStyle.Offset + _tStyle.Length + 1;
                    // posuneme kurzor na pozici ZA stylem
                    _textArea.Caret.Position = _textArea.Document.OffsetToPosition(_bOffset);
                    // pokud nová hodnota není implicitní, pak ji zobrazíme mezi atributy
                    if (hAlign != HAlign.left)
                    {
                        if (_textArea.Caret.Position == _textArea.Document.OffsetToPosition(_bOffset - 1))
                            _textArea.InsertString(string.Format(" {0}=\"{1}\" ", _hAlign, hAlign));
                        else _textArea.InsertString(string.Format("{0}=\"{1}\" ", _hAlign, hAlign));
                    }
                }
                // jinak atribut již existuje
                else
                {
                    // první závorka
                    TextWord _tBB = null,
                        // druhá závorka
                        _tBE = null;

                    LineSegment lineAttribute = textAreaControl.Document.GetLineSegmentForOffset(_tAttribut.Offset);
                    // pro tento účel potřebujeme získát indexy závorek
                    string _boundedText = GetBouds(lineAttribute, lineAttribute.Words.IndexOf(_tAttribut), ref _tBB, ref _tBE);

                    LineSegment linetBE = textAreaControl.Document.GetLineSegmentForOffset(_tBE.Offset);
                    _boundedText = _boundedText.ToLower().Trim();
                    HAlign _value = HAlign.left;

                    // pokud mezi závorkami se nacházela smysluplná hodnota
                    if (Enum.TryParse(_boundedText, true, out _value))
                    {
                        // pokud nová hodnota má být implicitní, pak ji nezobrazíme mezi atributy
                        if (hAlign == HAlign.left)
                        {
                            // odstraníme starý obsah
                            _textArea.Document.Remove(lineAttribute.Offset + _tAttribut.Offset - 1, (linetBE.Offset + _tBE.Offset) - (lineAttribute.Offset + _tAttribut.Offset) + 2);
                            // posuneme kurzor na začátek atributu
                            _textArea.Caret.Position = _textArea.Document.OffsetToPosition(lineAttribute.Offset + _tAttribut.Offset - 1);
                        }
                        else
                        {
                            // změníme starý obsah
                            _textArea.Document.Replace(lineAttribute.Offset + _tAttribut.Offset, (linetBE.Offset + _tBE.Offset) - (lineAttribute.Offset + _tAttribut.Offset) + 1, string.Format("{0}=\"{1}\"", _hAlign, hAlign));
                            // posuneme kurzor na začátek atributu
                            _textArea.Caret.Position = _textArea.Document.OffsetToPosition(lineAttribute.Offset + _tAttribut.Offset);
                        }
                    }
                }
                textAreaControl.Parent.Refresh();
            }
        }

        internal static void HAlignCenterSelection(TextAreaControl textAreaControl)
        {
            //1. případ, kdy není vybraná žádná část obsahu
            if (string.IsNullOrEmpty(textAreaControl.SelectionManager.SelectedText))
                //pak pracujeme s řádkem kde se nachází kurzor
                HAlignCenter(textAreaControl);
        }

        private static void HAlignCenter(TextAreaControl textAreaControl)
        {
            ChangeHAlign(textAreaControl, "horizontal-align", HAlign.center);
        }

        internal static void HAlignRightSelection(TextAreaControl textAreaControl)
        {
            //1. případ, kdy není vybraná žádná část obsahu
            if (string.IsNullOrEmpty(textAreaControl.SelectionManager.SelectedText))
                //pak pracujeme s řádkem kde se nachází kurzor
                HAlignRight(textAreaControl);
        }

        private static void HAlignRight(TextAreaControl textAreaControl)
        {
            ChangeHAlign(textAreaControl, "horizontal-align", HAlign.right);
        }

        internal static void BoldSelection(TextAreaControl textAreaControl)
        {
            //1. případ, kdy není vybraná žádná část obsahu
            if (string.IsNullOrEmpty(textAreaControl.SelectionManager.SelectedText))
                //pak pracujeme s řádkem kde se nachází kurzor
                Bold(textAreaControl);
        }

        private static void Bold(TextAreaControl textAreaControl)
        {
            ChangeFontStyle(textAreaControl, "font-bold");
        }

        private static void ChangeFontStyle(TextAreaControl textAreaControl, string fontStyle)
        {
            LineSegment ls = textAreaControl.Document.GetLineSegmentForOffset(textAreaControl.Caret.Offset);
            // zafixujeme slovo Style
            TextWord _tStyle = null;
            // zafixujeme atribut
            TextWord _tAttribut = null;

            GetStyleWord(textAreaControl, ls, ref _tStyle);
            LineSegment lineStyle = textAreaControl.Document.GetLineSegmentForOffset(_tStyle.Offset);

            // existuje slovo span STYLE
            if (_tStyle != null)
            {
                // zjistíme, zda existuje slovo FONT-BOLD
                GetAttributeWord(textAreaControl, lineStyle, fontStyle, ref _tAttribut, true);

                // zafixujeme plochu
                TextArea _textArea = textAreaControl.TextArea;
                // pokud atribut font-bold není nalezen, pak ho vytvoříme
                if (_tAttribut == null)
                {
                    // najdeme pozici hned za spanem STYLE
                    int _bOffset = lineStyle.Offset + _tStyle.Offset + _tStyle.Length + 1;
                    // posuneme kurzor na pozici ZA stylem
                    _textArea.Caret.Position = _textArea.Document.OffsetToPosition(_bOffset);
                    // vložíme atribut
                    if (_textArea.Caret.Position == _textArea.Document.OffsetToPosition(_bOffset - 1))
                        _textArea.InsertString(string.Format(" {0}=\"true\" ", fontStyle));
                    else _textArea.InsertString(string.Format("{0}=\"true\" ", fontStyle));
                }
                // jinak atribut již existuje
                else
                {
                    // první závorka
                    TextWord _tBB = null,
                        // druhá závorka
                        _tBE = null;

                    LineSegment lineAttribute = textAreaControl.Document.GetLineSegmentForOffset(_tAttribut.Offset);

                    // pro tento účel potřebujeme získát indexy závorek
                    string _boundedText = GetBouds(lineAttribute, lineAttribute.Words.IndexOf(_tAttribut), ref _tBB, ref _tBE);
                    LineSegment linetBE = textAreaControl.Document.GetLineSegmentForOffset(_tBE.Offset);

                    _boundedText = _boundedText.ToLower().Trim();
                    // pokud mezi závorkami se nacházela smysluplná hodnota
                    if (bool.TryParse(_boundedText, out bool _value))
                    {
                        // pokud hodnota atributu je TRUE, pak ho změníme na FALSE
                        if (_value == false)
                        {
                            // změníme starý obsah
                            _textArea.Document.Replace(lineAttribute.Offset + _tAttribut.Offset, (linetBE.Offset + _tBE.Offset) - (lineAttribute.Offset + _tAttribut.Offset) + 1, string.Format("{0}=\"true\"", fontStyle));
                            // posuneme kurzor na začátek atributu
                            _textArea.Caret.Position = _textArea.Document.OffsetToPosition(lineAttribute.Offset + _tAttribut.Offset);
                        }
                        else
                        {
                            // odstraníme starý obsah
                            _textArea.Document.Remove(lineAttribute.Offset + _tAttribut.Offset - 1, (linetBE.Offset + _tBE.Offset) - (lineAttribute.Offset + _tAttribut.Offset) + 2);
                            // posuneme kurzor na začátek atributu
                            _textArea.Caret.Position = _textArea.Document.OffsetToPosition(lineAttribute.Offset + _tAttribut.Offset - 1);
                        }
                    }
                }
                textAreaControl.Parent.Refresh();
            }
        }

        internal static void ItalicSelection(TextAreaControl textAreaControl)
        {
            //1. případ, kdy není vybraná žádná část obsahu
            if (string.IsNullOrEmpty(textAreaControl.SelectionManager.SelectedText))
                //pak pracujeme s řádkem kde se nachází kurzor
                Italic(textAreaControl);
        }

        private static void Italic(TextAreaControl textAreaControl)
        {
            ChangeFontStyle(textAreaControl, "font-italic");
        }

        internal static void UnderlineSelection(TextAreaControl textAreaControl)
        {
            //1. případ, kdy není vybraná žádná část obsahu
            if (string.IsNullOrEmpty(textAreaControl.SelectionManager.SelectedText))
                //pak pracujeme s řádkem kde se nachází kurzor
                Underline(textAreaControl);
        }

        private static void Underline(TextAreaControl textAreaControl)
        {
            ChangeFontStyle(textAreaControl, "font-underline");
        }

        internal static void StrikeoutSelection(TextAreaControl textAreaControl)
        {
            //1. případ, kdy není vybraná žádná část obsahu
            if (string.IsNullOrEmpty(textAreaControl.SelectionManager.SelectedText))
                //pak pracujeme s řádkem kde se nachází kurzor
                Strikeout(textAreaControl);
        }

        private static void Strikeout(TextAreaControl textAreaControl)
        {
            ChangeFontStyle(textAreaControl, "font-strikeout");
        }
    }
}
