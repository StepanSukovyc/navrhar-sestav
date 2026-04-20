//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.ReportDesignerTextEditorProperties.cs </Name>
//    <Description> Vlastnosti výchozího textového editoru                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-11                                                  </Created>
//  </FileHeader>

using System.Drawing;
using System.Drawing.Text;
using System.Text;
using Gordic.GFE.Parsers.Core;
using Gordic.TextEditor.Document;

namespace Gordic.Gfe.FormFiller.AddIns
{
    /// <summary>
    /// Vlastnosti výchozího textového editoru
    /// </summary>
    sealed class FormFillerTextEditorProperties : ITextEditorProperties
    {
        static FormFillerTextEditorProperties textEditorProperties;
        readonly Property properties;
        readonly FontContainer fontContainer;

        /// <summary>
        /// Instance třídy
        /// </summary>
        public static FormFillerTextEditorProperties Instance
        {
            get
            {
                if (textEditorProperties == null)
                    textEditorProperties = new FormFillerTextEditorProperties();

                return textEditorProperties;
            }
        }

        private FormFillerTextEditorProperties()
        {
            properties = PropertyService.Get("FormFiller.TextEditor.Document.DefaultDocumentAggregatorProperties", new Property());
            fontContainer = new FontContainer(FontContainer.ParseFont(properties.Get("DefaultFont", WinFormsResourceService.DefaultMonospacedFont.ToString())));
            properties.PropertyChanged += new PropertyChangedEventHandler(CheckFontChange);
        }

        void CheckFontChange(object sender, PropertyChangedEventArgs e)
        {
            if (e.Key == "DefaultFont")
                fontContainer.DefaultFont = FontContainer.ParseFont(e.NewValue.ToString());
        }
        /// <summary>
        /// Odrážka
        /// </summary>
        public int TabIndent
        {
            get => properties.Get("TabIndent", 4);
            set
            {
                if (value < 1) value = 1;
                properties.Set("TabIndent", value);
            }
        }

        /// <summary>
        /// Velikost odrážky
        /// </summary>
        public int IndentationSize
        {
            get => properties.Get("IndentationSize", 4);
            set
            {
                if (value < 1) value = 1;
                properties.Set("IndentationSize", value);
                indentationString = null;
            }
        }

        string indentationString;
        /// <summary>
        /// řetězec odrážky
        /// </summary>
        public string IndentationString
        {
            get
            {
                if (indentationString == null)
                    return ConvertTabsToSpaces ? new string(' ', IndentationSize) : "\t";
                return indentationString;
            }
        }

        /// <summary>
        /// Styl odrážky
        /// </summary>
        public IndentStyle IndentStyle
        {
            get => properties.Get("IndentStyle", IndentStyle.Smart);
            set => properties.Set("IndentStyle", value);
        }
        /// <summary>
        /// režim výberu
        /// </summary>
        public DocumentSelectionMode DocumentSelectionMode
        {
            get => properties.Get("DocumentSelectionMode", DocumentSelectionMode.Normal);
            set => properties.Set("DocumentSelectionMode", value);
        }
        /// <summary>
        /// aktuální pozice
        /// </summary>
        public bool CaretLine
        {
            get => properties.Get("CaretLine", false);
            set => properties.Set("CaretLine", value);
        }

        /// <summary>
        /// Povolit kurzor za koncem řádku?
        /// </summary>
        public bool AllowCaretBeyondEOL
        {
            get => properties.Get("CursorBehindEOL", false);
            set => properties.Set("CursorBehindEOL", value);
        }
        /// <summary>
        /// zobrazení chyb
        /// </summary>
        public bool UnderlineErrors
        {
            get => properties.Get("ShowErrors", true);
            set => properties.Set("ShowErrors", value);
        }
        /// <exclude/>
        public bool ShowMatchingBracket
        {
            get => properties.Get("ShowBracketHighlight", true);
            set => properties.Set("ShowBracketHighlight", value);
        }
        /// <exclude/>
        public bool ShowLineNumbers
        {
            get => properties.Get("ShowLineNumbers", true);
            set => properties.Set("ShowLineNumbers", value);
        }
        /// <exclude/>
        public bool ShowSpaces
        {
            get => properties.Get("ShowSpaces", false);
            set => properties.Set("ShowSpaces", value);
        }
        /// <exclude/>
        public bool ShowTabs
        {
            get => properties.Get("ShowTabs", false);
            set => properties.Set("ShowTabs", value);
        }
        /// <exclude/>
        public bool ShowEOLMarker
        {
            get => properties.Get("ShowEOLMarkers", false);
            set => properties.Set("ShowEOLMarkers", value);
        }
        /// <exclude/>
        public bool ShowInvalidLines
        {
            get => properties.Get("ShowInvalidLines", false);
            set => properties.Set("ShowInvalidLines", value);
        }
        /// <exclude/>
        public bool IsIconBarVisible
        {
            get => properties.Get("IconBarVisible", true);
            set => properties.Set("IconBarVisible", value);
        }
        /// <exclude/>
        public bool EnableFolding
        {
            get => properties.Get("EnableFolding", true);
            set => properties.Set("EnableFolding", value);
        }
        /// <exclude/>
        public bool ShowHorizontalRuler
        {
            get => properties.Get("ShowHRuler", false);
            set => properties.Set("ShowHRuler", value);
        }
        /// <exclude/>
        public bool ShowVerticalRuler
        {
            get => properties.Get("ShowVRuler", false);
            set => properties.Set("ShowVRuler", value);
        }
        /// <exclude/>
        public bool ConvertTabsToSpaces
        {
            get => properties.Get("TabsToSpaces", false);
            set
            {
                properties.Set("TabsToSpaces", value);
                indentationString = null;
            }
        }
        /// <exclude/>
        public bool MouseWheelScrollDown
        {
            get => properties.Get("MouseWheelScrollDown", true);
            set => properties.Set("MouseWheelScrollDown", value);
        }
        /// <exclude/>
        public bool MouseWheelTextZoom
        {
            get => properties.Get("MouseWheelTextZoom", true);
            set => properties.Set("MouseWheelTextZoom", value);
        }
        /// <exclude/>
        public bool HideMouseCursor
        {
            get => properties.Get("HideMouseCursor", false);
            set => properties.Set("HideMouseCursor", value);
        }
        /// <exclude/>
        public bool CutCopyWholeLine
        {
            get => properties.Get("CutCopyWholeLine", true);
            set => properties.Set("CutCopyWholeLine", value);
        }
        /// <exclude/>
        public Encoding Encoding
        {
            get => Encoding.GetEncoding(this.EncodingCodePage);
            set => EncodingCodePage = value.CodePage;
        }
        /// <exclude/>
        public int EncodingCodePage
        {
            get => properties.Get("Encoding", 65001);
            set => properties.Set("Encoding", value);
        }
        /// <exclude/>
        public int VerticalRulerRow
        {
            get => properties.Get("VRulerRow", 80);
            set => properties.Set("VRulerRow", value);
        }
        /// <exclude/>
        public LineViewerStyle LineViewerStyle
        {
            get => properties.Get("LineViewerStyle", LineViewerStyle.None);
            set => properties.Set("LineViewerStyle", value);
        }
        /// <exclude/>
        public string LineTerminator
        {
            get => "\r\n";
            set => throw new System.NotImplementedException();
        }
        /// <exclude/>
        public bool AutoInsertCurlyBracket
        {
            get => properties.Get("AutoInsertCurlyBracket", true);
            set => properties.Set("AutoInsertCurlyBracket", value);
        }
        /// <exclude/>
        public bool AutoInsertQuotationMarks
        {
            get => properties.Get("AutoInsertQuotationMarks", true);
            set => properties.Set("AutoInsertQuotationMarks", value);
        }
        /// <exclude/>
        public bool AutoInsertTemplates
        {
            get => properties.Get("AutoInsertTemplates", false);
            set => properties.Set("AutoInsertTemplates", value);
        }
        /// <exclude/>
        public Font Font
        {
            get => fontContainer.DefaultFont;
            set
            {
                properties.Set("DefaultFont", value.ToString());
                fontContainer.DefaultFont = value;
            }
        }
        /// <exclude/>
        public FontContainer FontContainer { get => fontContainer; }

        /// <exclude/>
        public BracketMatchingStyle BracketMatchingStyle
        {
            get => properties.Get("BracketMatchingStyle", BracketMatchingStyle.After);
            set => properties.Set("BracketMatchingStyle", value);
        }
        /// <exclude/>
        public bool SupportReadOnlySegments { get; set; }
        /// <exclude/>
        public TextRenderingHint TextRenderingHint
        {
            get => properties.Get("TextRenderingHint", TextRenderingHint.SystemDefault);
            set => properties.Set("TextRenderingHint", value);
        }
        /// <exclude/>
        public bool CreateBackupCopy
        {
            get => properties.Get("CreateBackupCopy", false);
            set => properties.Set("CreateBackupCopy", value);
        }
        /// <exclude/>
        public string Highlighting
        {
            get => properties.Get("Highlighting", "ALF-MSE");
            set => properties.Set("Highlighting", value);
        }
        /// <exclude/>
        public bool UseAntiAliasedFont
        {
            get => properties.Get("UseAntiAliasedFont", false);
            set => properties.Set("UseAntiAliasedFont", value);
        }
    }
}
