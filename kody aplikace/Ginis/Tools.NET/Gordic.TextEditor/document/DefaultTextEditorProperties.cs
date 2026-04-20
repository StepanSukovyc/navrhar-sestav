// <file>
//     <copyright see="prj:///doc/copyright.txt"/>
//     <license see="prj:///doc/license.txt"/>
//     <owner name="none" email=""/>
//     <version>$Revision$</version>
// </file>

using System.Drawing;
using System.Text;

namespace Gordic.TextEditor.Document
{
    public enum BracketMatchingStyle
    {
        Before,
        After
    }

    public class DefaultTextEditorProperties : ITextEditorProperties
    {
        int tabIndent = 4;
        int indentationSize = 4;
        IndentStyle indentStyle = IndentStyle.Smart;
        DocumentSelectionMode documentSelectionMode = DocumentSelectionMode.Normal;
        Encoding encoding = System.Text.Encoding.UTF8;
        BracketMatchingStyle bracketMatchingStyle = BracketMatchingStyle.After;
        FontContainer fontContainer;
        static Font DefaultFont;

        public DefaultTextEditorProperties()
        {
            if (DefaultFont == null)
                DefaultFont = new Font("Courier New", 10);

            this.fontContainer = new FontContainer(DefaultFont);
        }

        bool allowCaretBeyondEOL = false;

        bool caretLine = false;

        bool showMatchingBracket = true;
        bool showLineNumbers = true;

        bool showSpaces = false;
        bool showTabs = false;
        bool showEOLMarker = false;

        bool showInvalidLines = false;

        bool isIconBarVisible = false;
        bool enableFolding = true;
        bool showHorizontalRuler = false;
        bool showVerticalRuler = true;
        bool convertTabsToSpaces = false;
        System.Drawing.Text.TextRenderingHint textRenderingHint = System.Drawing.Text.TextRenderingHint.SystemDefault;
        bool mouseWheelScrollDown = true;
        bool mouseWheelTextZoom = true;

        bool hideMouseCursor = false;
        bool cutCopyWholeLine = true;

        int verticalRulerRow = 80;
        LineViewerStyle lineViewerStyle = LineViewerStyle.None;
        string lineTerminator = "\r\n";
        bool autoInsertCurlyBracket = true;
        bool autoInsertQuotationMarks = true;
        bool supportReadOnlySegments = false;

        public int TabIndent
        {
            get => tabIndent;
            set => tabIndent = value;
        }

        public int IndentationSize
        {
            get => indentationSize;
            set => indentationSize = value;
        }

        public IndentStyle IndentStyle
        {
            get => indentStyle;
            set => indentStyle = value;
        }

        public bool CaretLine
        {
            get => caretLine;
            set => caretLine = value;
        }

        public DocumentSelectionMode DocumentSelectionMode
        {
            get => documentSelectionMode;
            set => documentSelectionMode = value;
        }
        public bool AllowCaretBeyondEOL
        {
            get => allowCaretBeyondEOL;
            set => allowCaretBeyondEOL = value;
        }
        public bool ShowMatchingBracket
        {
            get => showMatchingBracket;
            set => showMatchingBracket = value;
        }
        public bool ShowLineNumbers
        {
            get => showLineNumbers;
            set => showLineNumbers = value;
        }
        public bool ShowSpaces
        {
            get => showSpaces;
            set => showSpaces = value;
        }
        public bool ShowTabs
        {
            get => showTabs;
            set => showTabs = value;
        }
        public bool ShowEOLMarker
        {
            get => showEOLMarker;
            set => showEOLMarker = value;
        }
        public bool ShowInvalidLines
        {
            get => showInvalidLines;
            set => showInvalidLines = value;
        }
        public bool IsIconBarVisible
        {
            get => isIconBarVisible;
            set => isIconBarVisible = value;
        }
        public bool EnableFolding
        {
            get => enableFolding;
            set => enableFolding = value;
        }
        public bool ShowHorizontalRuler
        {
            get => showHorizontalRuler;
            set => showHorizontalRuler = value;
        }
        public bool ShowVerticalRuler
        {
            get => showVerticalRuler;
            set => showVerticalRuler = value;
        }
        public bool ConvertTabsToSpaces
        {
            get => convertTabsToSpaces;
            set => convertTabsToSpaces = value;
        }
        public System.Drawing.Text.TextRenderingHint TextRenderingHint
        {
            get => textRenderingHint;
            set => textRenderingHint = value;
        }

        public bool MouseWheelScrollDown
        {
            get => mouseWheelScrollDown;
            set => mouseWheelScrollDown = value;
        }
        public bool MouseWheelTextZoom
        {
            get => mouseWheelTextZoom;
            set => mouseWheelTextZoom = value;
        }

        public bool HideMouseCursor
        {
            get => hideMouseCursor;
            set => hideMouseCursor = value;
        }

        public bool CutCopyWholeLine
        {
            get => cutCopyWholeLine;
            set => cutCopyWholeLine = value;
        }

        public Encoding Encoding
        {
            get => encoding;
            set => encoding = value;
        }
        public int VerticalRulerRow
        {
            get => verticalRulerRow;
            set => verticalRulerRow = value;
        }
        public LineViewerStyle LineViewerStyle
        {
            get => lineViewerStyle;
            set => lineViewerStyle = value;
        }
        public string LineTerminator
        {
            get => lineTerminator;
            set => lineTerminator = value;
        }
        /// <summary>
        /// automatické vložení zavírací závorky typu }, ), ]
        /// </summary>
        public bool AutoInsertCurlyBracket
        {
            get => autoInsertCurlyBracket;
            set => autoInsertCurlyBracket = value;
        }
        /// <summary>
        /// automatické vložení uvozovek
        /// </summary>
        public bool AutoInsertQuotationMarks
        {
            get => autoInsertQuotationMarks;
            set => autoInsertQuotationMarks = value;
        }

        public Font Font
        {
            get => fontContainer.DefaultFont;
            set => fontContainer.DefaultFont = value;
        }

        public FontContainer FontContainer
        {
            get => fontContainer;
        }

        public BracketMatchingStyle BracketMatchingStyle
        {
            get => bracketMatchingStyle;
            set => bracketMatchingStyle = value;
        }

        public bool SupportReadOnlySegments
        {
            get => supportReadOnlySegments;
            set => supportReadOnlySegments = value;
        }
    }
}
