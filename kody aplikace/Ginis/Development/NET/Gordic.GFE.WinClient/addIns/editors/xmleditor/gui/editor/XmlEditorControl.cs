//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.XmlEditorControl.cs                    </Name>
//    <Description> Xml editor odvozený od ovladače ReportDesigner TextEditor.  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-09                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.XmlEditor;
using Gordic.TextEditor;
using Gordic.TextEditor.Actions;
using Gordic.TextEditor.Document;
using Gordic.TextEditor.Gui.CompletionWindow;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.addins.editors.texteditor.xmlFormatting;

namespace Gordic.GFE.WinClient.XmlEditor.Gui.Editor
{
    /// <summary>
    /// Xml editor odvozený od ovladače Gordic TextEditor.
    /// </summary>
    public class XmlEditorControl : TextEditorControl/*, ICodeCompletionEditor*/
    {
        //#region ICodeCompletionEditor
        ///// <exclude/>
        //public void InsertTemplate(CodeTemplate template)
        //{
        //    string selectedText = String.Empty;
        //    Document.UndoStack.StartUndoGroup();
        //    if (base.ActiveTextAreaControl.TextArea.SelectionManager.HasSomethingSelected)
        //    {
        //        selectedText = base.ActiveTextAreaControl.TextArea.SelectionManager.SelectedText;
        //        ActiveTextAreaControl.TextArea.Caret.Position = ActiveTextAreaControl.TextArea.SelectionManager.SelectionCollection[0].StartPosition;
        //        base.ActiveTextAreaControl.TextArea.SelectionManager.RemoveSelectedText();
        //    }

        //    string templateText = StringParser.Parse(template.Text, new string[,] { { "Selection", selectedText } });
        //    int finalCaretOffset = templateText.IndexOf('|');
        //    if (finalCaretOffset >= 0)
        //        templateText = templateText.Remove(finalCaretOffset, 1);
        //    else
        //        finalCaretOffset = templateText.Length;

        //    int caretOffset = ActiveTextAreaControl.TextArea.Caret.Offset;

        //    BeginUpdate();
        //    int beginLine = ActiveTextAreaControl.TextArea.Caret.Line;
        //    Document.Insert(caretOffset, templateText);

        //    ActiveTextAreaControl.TextArea.Caret.Position = Document.OffsetToPosition(caretOffset + finalCaretOffset);
        //    int endLine = Document.OffsetToPosition(caretOffset + templateText.Length).Y;

        //    IndentStyle save1 = TextEditorProperties.IndentStyle;
        //    TextEditorProperties.IndentStyle = IndentStyle.Smart;

        //    Document.FormattingStrategy.IndentLines(ActiveTextAreaControl.TextArea, beginLine, endLine);

        //    Document.UndoStack.EndUndoGroup();
        //    EndUpdate();
        //    Document.RequestUpdate(new TextAreaUpdate(TextAreaUpdateType.WholeTextArea));
        //    Document.CommitUpdate();

        //    TextEditorProperties.IndentStyle = save1;
        //}
        ///// <summary>
        ///// Získání slova před posuvníkem
        ///// </summary>
        ///// <returns></returns>
        //public string GetWordBeforeCaret()
        //{
        //    int start = TextUtilities.FindPrevWordStart(Document, ActiveTextAreaControl.TextArea.Caret.Offset);
        //    return Document.GetText(start, ActiveTextAreaControl.TextArea.Caret.Offset - start);
        //}
        ///// <exclude/>
        //public void ShowCompletionWindow(ICompletionDataProvider completionDataProvider, char ch)
        //{
        //    codeCompletionWindow = CodeCompletionWindow.ShowCompletionWindow(SimpleDesktop.MainForm, this, this.FileName, completionDataProvider, ch);
        //    if (codeCompletionWindow != null)
        //        codeCompletionWindow.Closed += new EventHandler(CloseCodeCompletionWindow);
        //}
        //void CloseCodeCompletionWindow(object sender, EventArgs e)
        //{
        //    if (codeCompletionWindow != null)
        //    {
        //        codeCompletionWindow.Closed -= new EventHandler(CloseCodeCompletionWindow);
        //        codeCompletionWindow.Dispose();
        //        codeCompletionWindow = null;
        //    }
        //}
        //#endregion

        bool IsCaretAtDocumentStart { get { return ActiveTextAreaControl.TextArea.Caret.Offset == 0; } }
        bool IsCodeCompletionEnabled { get { return CodeCompletionOptions.Instance.EnableCodeCompletion; } }
        bool IsCodeCompletionWindowOpen { get { return ((codeCompletionWindow != null) && (!codeCompletionWindow.IsDisposed)); } }

        XmlSchemaCompletionDataCollection schemaCompletionDataItems = new XmlSchemaCompletionDataCollection();
        /// <summary>
        /// Schéma používané xml editorem will use.
        /// </summary>
        /// <remarks></remarks>
        public XmlSchemaCompletionDataCollection SchemaCompletionDataItems
        {
            get { return schemaCompletionDataItems; }
            set { schemaCompletionDataItems = value; }
        }

        XmlSchemaCompletionData defaultSchemaCompletionData = null;
        /// <summary>
        /// Výchozí schéma doplňování dat
        /// </summary>
        public XmlSchemaCompletionData DefaultSchemaCompletionData
        {
            get { return defaultSchemaCompletionData; }
            set { defaultSchemaCompletionData = value; }
        }

        string defaultNamespacePrefix = String.Empty;
        /// <summary>
        /// Výchozí prefix namespace.
        /// </summary>
        public string DefaultNamespacePrefix
        {
            get { return defaultNamespacePrefix; }
            set { defaultNamespacePrefix = value; }
        }

        ContextMenuStrip contextMenuStrip;
        /// <summary>
        /// Kontextové menu ovladače
        /// </summary>
        public ContextMenuStrip TextAreaContextMenuStrip
        {
            get { return contextMenuStrip; }
            set
            {
                contextMenuStrip = value;
                if (primaryTextAreaControl != null)
                    primaryTextAreaControl.ContextMenuStrip = value;
            }
        }

        CodeCompletionWindow codeCompletionWindow;
        TextAreaControl primaryTextAreaControl;
        /// <summary>
        /// hlidač uvolnění objektu
        /// </summary>
        private bool disposed;


        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public XmlEditorControl()
        {
            XmlFormattingStrategy strategy = new XmlFormattingStrategy();
            Document.FormattingStrategy = (IFormattingStrategy)strategy;

            Document.HighlightingStrategy = HighlightingManager.Manager.FindHighlighter("XML");
            Document.FoldingManager.FoldingStrategy = new Gordic.GFE.Parsers.XmlEditor.XmlFoldingStrategy();
        }

        /// <summary>
        /// Volá se po stisknutí kombinací Ctrl+Space.
        /// </summary>
        public void ShowCompletionWindow()
        {
            if (!IsCaretAtDocumentStart)
            {
                // nalezneme symbol před kurzórem.
                char ch = GetCharacterBeforeCaret();
                HandleKeyPress(ch);
            }
        }
        /// <summary>
        /// Přidání akcí xml editoru.
        /// </summary>
        /// <param name="actions">Přidávané akce</param>
        public void AddEditActions(IEditAction[] actions)
        {
            foreach (IEditAction action in actions)
                foreach (Keys key in action.Keys)
                    editactions[key] = action;
        }

        /// <summary>
        /// Inicializace ovladače
        /// </summary>
        /// <param name="newControl">Ovladač textový</param>
        protected override void InitializeTextAreaControl(TextAreaControl newControl)
        {
            base.InitializeTextAreaControl(newControl);

            primaryTextAreaControl = newControl;

            newControl.TextArea.KeyEventHandler += new Gordic.TextEditor.KeyEventHandler(HandleKeyPress);

            newControl.ContextMenuStrip = contextMenuStrip;
            newControl.SelectionManager.SelectionChanged += new EventHandler(SelectionChanged);
            newControl.Document.DocumentChanged += new DocumentEventHandler(DocumentChanged);
            newControl.TextArea.ClipboardHandler.CopyText += new CopyTextEventHandler(ClipboardHandlerCopyText);

            newControl.MouseWheel += new MouseEventHandler(TextAreaMouseWheel);
            newControl.DoHandleMousewheel = false;
        }

        /// <summary>
        /// Zachycuje uživatelské stisknutí kláves.
        /// </summary>
        /// <param name="ch">Stisknutá klávesa</param>
        /// <remarks></remarks>
        protected bool HandleKeyPress(char ch)
        {
            if (IsCodeCompletionWindowOpen)
                if (codeCompletionWindow.ProcessKeyEvent(ch))
                    return false;

            try
            {
                switch (ch)
                {
                    case '<':
                    case ' ':
                    case '=':
                        ShowCompletionWindow(ch);
                        return false;
                    default:
                        if (XmlParser.IsAttributeValueChar(ch))
                            if (IsInsideQuotes(ActiveTextAreaControl.TextArea))
                            {
                                InsertCharacter(ch);
                                ShowCompletionWindow(ch);
                                return true;
                            }
                        break;
                }
            }
            catch (Exception e)
            {
                MessageService.ShowError(e);
            }

            return false;
        }

        #region Uvolnění objektu
        /// <summary>
        /// uvolnění instance objektu
        /// </summary>
        /// <param name="disposing"></param>
        protected override void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    if (codeCompletionWindow != null)
                    {
                        codeCompletionWindow.Dispose();
                        codeCompletionWindow = null;
                    }
                    if (primaryTextAreaControl != null)
                    {
                        primaryTextAreaControl.Dispose();
                        primaryTextAreaControl = null;
                    }
                    base.Dispose(disposing);
                }

                // poznamenámé volání uvolnění objektu
                disposed = true;
                GC.SuppressFinalize(this);
            }
        }
        #endregion

        void ShowCompletionWindow(char ch)
        {
            if (IsCodeCompletionWindowOpen)
                codeCompletionWindow.Close();

            if (IsCodeCompletionEnabled)
            {
                XmlCompletionDataProvider completionDataProvider = new XmlCompletionDataProvider(schemaCompletionDataItems, defaultSchemaCompletionData, defaultNamespacePrefix);
                codeCompletionWindow = CodeCompletionWindow.ShowCompletionWindow(ParentForm, this, FileName, completionDataProvider, ch, XmlEditorAddInOptions.ShowSchemaAnnotation, false);

                if (codeCompletionWindow != null)
                    codeCompletionWindow.Closed += new EventHandler(CodeCompletionWindowClosed);
            }
        }
        void DocumentChanged(object sender, DocumentEventArgs e)
        {
        }
        void SelectionChanged(object sender, EventArgs e)
        {
        }
        void ClipboardHandlerCopyText(object sender, CopyTextEventArgs e)
        {
            //TextEditorSideBar.PutInClipboardRing(e.Text);
        }
        void TextAreaMouseWheel(object sender, MouseEventArgs e)
        {
            TextAreaControl textAreaControl = (TextAreaControl)sender;

            if (IsCodeCompletionWindowOpen && codeCompletionWindow.Visible)
                codeCompletionWindow.HandleMouseWheel(e);
            else
                textAreaControl.HandleMouseWheel(e);
        }
        /// <summary>
        /// Vloží znak do textového editoru na aktuální offset.
        /// </summary>
        void InsertCharacter(char ch)
        {
            ActiveTextAreaControl.TextArea.BeginUpdate();
            Document.UndoStack.StartUndoGroup();

            switch (ActiveTextAreaControl.TextArea.Caret.CaretMode)
            {
                case CaretMode.InsertMode:
                    ActiveTextAreaControl.TextArea.InsertChar(ch);
                    break;
                case CaretMode.OverwriteMode:
                    ActiveTextAreaControl.TextArea.ReplaceChar(ch);
                    break;
            }
            int currentLineNr = ActiveTextAreaControl.TextArea.Caret.Line;
            Document.FormattingStrategy.FormatLine(ActiveTextAreaControl.TextArea, currentLineNr, Document.PositionToOffset(ActiveTextAreaControl.TextArea.Caret.Position), ch);

            ActiveTextAreaControl.TextArea.EndUpdate();
            Document.UndoStack.EndUndoGroup();
        }
        void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // XmlEditorControl
            // 
            this.Name = "XmlEditorControl";
            this.ResumeLayout(false);

        }
        void CodeCompletionWindowClosed(object sender, EventArgs e)
        {
            codeCompletionWindow.Closed -= new EventHandler(CodeCompletionWindowClosed);
            codeCompletionWindow.Dispose();
            codeCompletionWindow = null;
        }

        char GetCharacterBeforeCaret()
        {
            string text = Document.GetText(ActiveTextAreaControl.TextArea.Caret.Offset - 1, 1);
            if (text.Length > 0)
                return text[0];

            return '\0';
        }

        /// <summary>
        /// Kontrolujeme, zda jsme uvnitř uvozovek (" nebo ').
        /// </summary>
        bool IsInsideQuotes(TextArea textArea)
        {
            bool inside = false;

            LineSegment line = textArea.Document.GetLineSegment(textArea.Document.GetLineNumberForOffset(textArea.Caret.Offset));
            if (line != null)
            {
                if ((line.Offset + line.Length > textArea.Caret.Offset) &&
                    (line.Offset < textArea.Caret.Offset))
                {

                    char charAfter = textArea.Document.GetCharAt(textArea.Caret.Offset);
                    char charBefore = textArea.Document.GetCharAt(textArea.Caret.Offset - 1);

                    if (((charBefore == '\'') && (charAfter == '\'')) ||
                        ((charBefore == '\"') && (charAfter == '\"')))
                        inside = true;
                }
            }

            return inside;
        }

        //#region kompletace
        //static ICodeCompletionBinding[] codeCompletionBindings;
        ///// <summary>
        ///// Vazba na kompletací textu
        ///// </summary>
        //public static ICodeCompletionBinding[] CodeCompletionBindings
        //{
        //    get
        //    {
        //        if (codeCompletionBindings == null)
        //            try
        //            {
        //                codeCompletionBindings = (ICodeCompletionBinding[])(AddInTree.GetTreeNode("/ReportDesigner/RDTextEditor/CodeCompletion").BuildChildItems(null)).ToArray(typeof(ICodeCompletionBinding));
        //            }
        //            catch (TreePathNotFoundException)
        //            {
        //                codeCompletionBindings = new ICodeCompletionBinding[] { };
        //            }
        //        return codeCompletionBindings;
        //    }
        //}

        ///// <summary>
        ///// Reakce na stisknutí Ctrl+Space
        ///// </summary>
        //public void StartCtrlSpaceCompletion()
        //{
        //    foreach (ICodeCompletionBinding ccBinding in CodeCompletionBindings)
        //        if (ccBinding.CtrlSpace(this))
        //            return;
        //}
        //#endregion
    }
}
