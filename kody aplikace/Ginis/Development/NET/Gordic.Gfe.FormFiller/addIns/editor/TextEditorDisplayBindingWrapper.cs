//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.TextEditorDisplayBindingWrapper.cs     </Name>
//    <Description> Obálka ovladače textu                                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-08                                                  </Created>
//  </FileHeader>

using System;
using System.Diagnostics;
using System.Drawing.Printing;
using System.IO;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.DefaultEditor;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.TextEditor;
using Gordic.TextEditor.Document;
using System.Xml;
using Gordic.GFE.Parsers.Core;
using Gordic.General;

namespace Gordic.Gfe.FormFiller.DefaultEditor
{
    /// <summary>
    /// Obálka ovladače textu
    /// </summary>
    class TextEditorDisplayBindingWrapper : DefaultAbstractViewContent, IMementoCapable
        , IClipboardHandler, ITextEditorControlProvider
        , IEditable, IParseInformationListener, IPrintable, IPositionable
    {
        #region AbstractViewControl
        /// <summary>
        /// Ovladač pohledu
        /// </summary>
        public override object Control { get { return textEditorControl; } }
        /// <summary>
        /// Uložení obsahu
        /// </summary>
        /// <param name="file">Soubor</param>
        /// <param name="stream">Proud v paměti</param>
        public override void Save(OpenedFile file, Stream stream)
        {
            if (file != PrimaryFile)
                throw new ArgumentException("file != PrimaryFile");

            if (!textEditorControl.CanSaveWithCurrentEncoding())
                if (MessageService.AskQuestion(string.Join(" ", GResources.GetResourceText(29450006), //RC 29450006 : Soubor nelze uložit s aktuálním kódováním
                                               textEditorControl.Encoding.EncodingName, GResources.GetResourceText(29450005)) //RC 29450005 : bez ztráty dat.
                                               + '\n' + GResources.GetResourceText(29450004))) //RC 29450004 : Chcete uložit v UTF-8 formátu?
                    textEditorControl.Encoding = System.Text.Encoding.UTF8;

            textEditorControl.SaveFile(stream);
        }

        /// <summary>
        /// NAčtení souboru
        /// </summary>
        /// <param name="file"></param>
        /// <param name="stream"></param>
        public override void Load(OpenedFile file, Stream stream)
        {
            if (file != PrimaryFile)
                throw new ArgumentException("file != PrimaryFile");

            if (!file.IsUntitled)
                textEditorControl.IsReadOnly = (File.GetAttributes(file.FileName) & FileAttributes.ReadOnly) == FileAttributes.ReadOnly;

            //bool autodetectEncoding = true;
            //textEditor.LoadFile(file.FileName, stream, true, autodetectEncoding);
            textEditorControl.LoadFile(file.FileName, stream);
            PrimaryFile.Encoding = textEditorControl.Encoding;

            ForceFoldingUpdate();
        }

        /// <summary>
        /// Indikuje, že obsah je pouze pro čtení
        /// </summary>
        public override bool IsReadOnly { get { return textEditorControl.IsReadOnly; } }

        /// <exclude/>
        protected override void _OnFileNameChanged(OpenedFile file)
        {
            base._OnFileNameChanged(file);
            Debug.Assert(file == this._Files[0]);

            string oldFileName = textEditorControl.FileName;
            string newFileName = file.FileName;

            if (Path.GetExtension(oldFileName) != Path.GetExtension(newFileName))
                if (textEditorControl.Document.HighlightingStrategy != null)
                {
                    textEditorControl.Document.HighlightingStrategy = HighlightingStrategyFactory.CreateHighlightingStrategyForFile(newFileName);
                    textEditorControl.Refresh();
                }

            SetIcon();

            ParserService.ClearParseInformation(oldFileName);
            textEditorControl.FileName = newFileName;
            ParserService.ParseViewContent(this);
        }
        /// <exclude/>
        protected override void _OnDesktopWindowChanged()
        {
            base._OnDesktopWindowChanged();
            SetIcon();
        }

        #endregion

        #region IMementoCapable
        /// <summary>
        /// Vytvoření nového memento ze stavu.
        /// </summary>
        /// <returns></returns>
        public virtual Property CreateMemento()
        {
            Property properties = new Property();
            properties.Set("CaretOffset", textEditorControl.ActiveTextAreaControl.Caret.Offset);
            properties.Set("VisibleLine", textEditorControl.ActiveTextAreaControl.TextArea.TextView.FirstVisibleLine);
            if (textEditorControl.HighlightingExplicitlySet)
                properties.Set("HighlightingLanguage", textEditorControl.Document.HighlightingStrategy.Name);
            return properties;
        }
        /// <summary>
        /// Uložení stavu do daného memento.
        /// </summary>
        /// <param name="properties">Vlastnosti, do kterých se ukládá.</param>
        public virtual void SetMemento(Property properties)
        {
            textEditorControl.ActiveTextAreaControl.Caret.Position = textEditorControl.Document.OffsetToPosition(Math.Min(textEditorControl.Document.TextLength, Math.Max(0, properties.Get("CaretOffset", textEditorControl.ActiveTextAreaControl.Caret.Offset))));

            string highlightingName = properties.Get("HighlightingLanguage", string.Empty);
            if (!string.IsNullOrEmpty(highlightingName))
            {
                if (highlightingName == textEditorControl.Document.HighlightingStrategy.Name)
                    textEditorControl.HighlightingExplicitlySet = true;
                else
                {
                    IHighlightingStrategy highlightingStrategy = HighlightingStrategyFactory.CreateHighlightingStrategy(highlightingName);
                    if (highlightingStrategy != null)
                    {
                        textEditorControl.HighlightingExplicitlySet = true;
                        textEditorControl.Document.HighlightingStrategy = highlightingStrategy;
                    }
                }
            }
            textEditorControl.ActiveTextAreaControl.TextArea.TextView.FirstVisibleLine = properties.Get("VisibleLine", 0);
        }
        #endregion

        #region IClipboardHandler
        /// <exclude/>
        public bool EnableCut
        {
            get { return !this.IsDisposed && textEditorControl.ActiveTextAreaControl.TextArea.ClipboardHandler.EnableCut; }
        }

        /// <exclude/>
        public bool EnableCopy
        {
            get { return !this.IsDisposed && textEditorControl.ActiveTextAreaControl.TextArea.ClipboardHandler.EnableCopy; }
        }

        /// <exclude/>
        public bool EnablePaste
        {
            get { return !this.IsDisposed && textEditorControl.ActiveTextAreaControl.TextArea.ClipboardHandler.EnablePaste; }
        }

        /// <exclude/>
        public bool EnableDelete
        {
            get { return !this.IsDisposed && textEditorControl.ActiveTextAreaControl.TextArea.ClipboardHandler.EnableDelete; }
        }

        /// <exclude/>
        public bool EnableSelectAll
        {
            get { return !this.IsDisposed && textEditorControl.ActiveTextAreaControl.TextArea.ClipboardHandler.EnableSelectAll; }
        }

        /// <exclude/>
        public void SelectAll()
        {
            textEditorControl.ActiveTextAreaControl.TextArea.ClipboardHandler.SelectAll(null, null);
        }

        /// <exclude/>
        public void Delete()
        {
            textEditorControl.ActiveTextAreaControl.TextArea.ClipboardHandler.Delete(null, null);
        }
        /// <exclude/>
        public void Paste()
        {
            textEditorControl.ActiveTextAreaControl.TextArea.ClipboardHandler.Paste(null, null);
        }

        /// <exclude/>
        public void Copy()
        {
            textEditorControl.ActiveTextAreaControl.TextArea.ClipboardHandler.Copy(null, null);
        }

        /// <exclude/>
        public void Cut()
        {
            textEditorControl.ActiveTextAreaControl.TextArea.ClipboardHandler.Cut(null, null);
        }
        #endregion

        #region IUndoHandler
        /// <summary>
        /// Dostupnost operace UNDO
        /// </summary>
        public bool EnableUndo { get { return textEditorControl.EnableUndo; } }
        /// <summary>
        /// Dostupnost operace REDO
        /// </summary>
        public bool EnableRedo { get { return textEditorControl.EnableRedo; } }

        /// <summary>
        /// Operace UNDO
        /// </summary>
        public void Undo() { this.textEditorControl.Undo(); }

        /// <summary>
        /// Opoerace REDO
        /// </summary>
        public void Redo() { this.textEditorControl.Redo(); }
        #endregion

        #region ITextEditorControlProvider
        /// <summary>
        /// Ovladač obsahu
        /// </summary>
        public TextEditorControl TextEditorControl { get { return textEditorControl; } }
        /// <summary>
        /// Získání dokumentu pro soubor
        /// </summary>
        /// <param name="file">Otevřený soubor</param>
        /// <returns></returns>
        public IDocument GetDocumentForFile(OpenedFile file)
        {
            return file == this.PrimaryFile ? this.TextEditorControl.Document : null;
        }
        #endregion

        #region IEditable
        /// <summary>
        /// Text dokumentu
        /// </summary>
        public string Text
        {
            get
            {
                if (ThreadService.InvokeRequired)
                    return ThreadService.SafeThreadFunction<string>(GetText);
                else
                    return GetText();
            }
            set
            {
                if (ThreadService.InvokeRequired)
                    ThreadService.SafeThreadCall(SetText, value);
                else
                    SetText(value);
            }
        }
        #endregion

        #region IParseInformationListener
        /// <summary>
        /// Aktualizace informaci analyzátoru
        /// </summary>
        /// <param name="parseInfo"></param>
        public void ParseInformationUpdated(ParseInformation parseInfo)
        {
            if (textEditorControl.TextEditorProperties.EnableFolding)
                ThreadService.SafeThreadAsyncCall(ParseInformationUpdatedInvoked, parseInfo);
        }

        #endregion

        #region IPrintable
        /// <summary>
        /// Vytisknutí obsahu dokumentu
        /// </summary>
        public PrintDocument PrintDocument { get { return textEditorControl.PrintDocument; } }
        #endregion

        #region IPositionable
        /// <summary>
        /// Nastavení posuvníka na určitou pozici, kde Y je řádek (začináje od 0).
        /// A X je sloupec (začínaje od 0 také).
        /// </summary>
        /// <param name="line">číslo řádku</param>
        /// <param name="column">číslo sloupce</param>
        public void JumpTo(int line, int column)
        {
            textEditorControl.ActiveTextAreaControl.JumpTo(line, column);

            ThreadService.SafeThreadAsyncCall(
                delegate
                {
                    textEditorControl.ActiveTextAreaControl.CenterViewOn(
                        line, (int)(0.3 * textEditorControl.ActiveTextAreaControl.TextArea.TextView.VisibleLineCount));
                });
        }
        /// <summary>
        /// Získání pozici řádku posuvníka
        /// </summary>
        public int Line { get { return textEditorControl.ActiveTextAreaControl.Caret.Line; } }
        /// <summary>
        /// Pozice sloupce posuvníka
        /// </summary>
        public int Column { get { return textEditorControl.ActiveTextAreaControl.Caret.Column; } }
        #endregion

        /// <summary>
        /// textový ovladač
        /// </summary>
        internal FormFillerTextAreaControl textEditorControl;

        /// <summary>
        /// Obsah dokumentu
        /// </summary>
        /// <returns></returns>
        string GetText() { return textEditorControl.Document.TextContent; }

        void SetText(string value) { textEditorControl.Document.Replace(0, textEditorControl.Document.TextLength, value); }

        /// <summary>
        /// Vytvoření textového editora návrháře
        /// </summary>
        /// <returns></returns>
        protected virtual FormFillerTextAreaControl CreateTextEditorControl()
        {
            return new FormFillerTextAreaControl();
        }

        /// <summary>
        /// inicializace pohledu
        /// </summary>
        /// <param name="file">Primární soubor zobrazení.</param>
        public override IViewContent Initialize(OpenedFile file)
        {
            base.Initialize(file);

            TabPageText = GResources.GetResourceText(29450007); //RC 29450007 : Zdroj

            textEditorControl = CreateTextEditorControl();
            textEditorControl.RightToLeft = RightToLeft.No;
            textEditorControl.Document.DocumentChanged += new DocumentEventHandler(TextAreaChangedEvent);
            textEditorControl.ActiveTextAreaControl.Caret.CaretModeChanged += new EventHandler(CaretModeChanged);
            textEditorControl.ActiveTextAreaControl.Enter += new EventHandler(CaretUpdate);
            textEditorControl.ActiveTextAreaControl.Caret.PositionChanged += CaretUpdate;

            textEditorControl.FileName = file.FileName;
            return this;
        }

        void TextAreaChangedEvent(object sender, DocumentEventArgs e)
        {
            this.PrimaryFile.MakeDirty();
        }

        /// <summary>
        /// Překreslení obsahu
        /// </summary>
        public override void RedrawContent()
        {
            textEditorControl.OptionsChanged();
            textEditorControl.Refresh();
        }

        /// <summary>
        /// uvolnění objektu
        /// </summary>
        /// <param name="disposing">indikuje uvolnění objektu</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (PrimaryFile != null && PrimaryFile.IsUntitled)
                    ParserService.ClearParseInformation(PrimaryFile.FileName);
                if (textEditorControl != null)
                    textEditorControl.Dispose();
            }

            base.Dispose(disposing);
        }

        void CaretUpdate(object sender, EventArgs e)
        {
            CaretChanged(null, null);
            CaretModeChanged(null, null);
        }
        void CaretChanged(object sender, EventArgs e)
        {
            TextAreaControl activeTextAreaControl = textEditorControl.ActiveTextAreaControl;
            int line = activeTextAreaControl.Caret.Line;
            int col = activeTextAreaControl.Caret.Column;
            StatusBarService.SetCaretPosition(activeTextAreaControl.TextArea.TextView.GetVisualColumn(line, col) + 1, line + 1, col + 1);
        }
        void CaretModeChanged(object sender, EventArgs e)
        {
            StatusBarService.SetInsertMode(textEditorControl.ActiveTextAreaControl.Caret.CaretMode == CaretMode.InsertMode);
        }
        void SetIcon()
        {
            if (this.DesktopWindow != null)
            {
                System.Drawing.Icon icon = WinFormsResourceService.GetIcon(IconService.GetImageForFile(this.PrimaryFileName));
                if (icon != null)
                    this.DesktopWindow.Icon = icon;
            }
        }
        void ParseInformationUpdatedInvoked(ParseInformation parseInfo)
        {
            try
            {
                textEditorControl.Document.FoldingManager.UpdateFoldings(TitleName, parseInfo);
                textEditorControl.ActiveTextAreaControl.TextArea.Refresh(textEditorControl.ActiveTextAreaControl.TextArea.FoldMargin);
                textEditorControl.ActiveTextAreaControl.TextArea.Refresh(textEditorControl.ActiveTextAreaControl.TextArea.IconBarMargin);
            }
            catch (Exception ex) { MessageService.ShowError(ex); }
        }

        /// <summary>
        /// Aktualizace skládání
        /// </summary>
        void ForceFoldingUpdate()
        {
            if (textEditorControl.TextEditorProperties.EnableFolding)
            {
                string fileName = textEditorControl.FileName;
                ParseInformation parseInfo = ParserService.GetParseInformation(fileName);
                if (parseInfo == null)
                    parseInfo = ParserService.ParseFile(fileName, textEditorControl.Document.TextContent);
                textEditorControl.Document.FoldingManager.UpdateFoldings(fileName, parseInfo);
            }
        }

        /// <exclude/>
        public override string ToString() { return "[" + GetType().Name + " " + this.PrimaryFileName + "]"; }

        #region Navíc
        /// <summary>
        /// Nahrazení celého XML/obyčejného textu daným
        /// </summary>
        /// <param name="xml">Daný XML/obyčejný text</param>
        public void ReplaceAll(string xml)
        {
            string formattedXml = SimpleFormat(IndentedFormat(xml));
            textEditorControl.Document.Replace(0, textEditorControl.Document.TextLength, formattedXml);
            UpdateFolding();
        }
        static string SimpleFormat(string xml)
        {
            return xml.Replace("><", ">\r\n<");
        }
        string IndentedFormat(string xml)
        {
            string indentedText = String.Empty;

            try
            {
                XmlTextReader reader = new XmlTextReader(new StringReader(xml))
                {
                    WhitespaceHandling = WhitespaceHandling.None
                };

                StringWriter indentedXmlWriter = new StringWriter();
                XmlTextWriter writer = CreateXmlTextWriter(indentedXmlWriter);
                writer.WriteNode(reader, false);
                writer.Flush();

                indentedText = indentedXmlWriter.ToString();
            }
            catch (Exception) { indentedText = xml; }

            return indentedText;
        }
        XmlTextWriter CreateXmlTextWriter(TextWriter textWriter)
        {
            XmlTextWriter writer = new XmlTextWriter(textWriter);
            if (textEditorControl.TextEditorProperties.ConvertTabsToSpaces)
            {
                writer.Indentation = textEditorControl.TextEditorProperties.IndentationSize;
                writer.IndentChar = ' ';
            }
            else
            {
                writer.Indentation = 1;
                writer.IndentChar = '\t';
            }
            writer.Formatting = Formatting.Indented;
            return writer;
        }
        /// <summary>
        /// Aktualizace skládání
        /// </summary>
        protected void UpdateFolding()
        {
            textEditorControl.Document.FoldingManager.UpdateFoldings(String.Empty, null);
            RefreshMargin();
        }

        void RefreshMargin()
        {
            ThreadService.SafeThreadAsyncCall(textEditorControl.ActiveTextAreaControl.TextArea.Refresh,
                                                   textEditorControl.ActiveTextAreaControl.TextArea.FoldMargin);
        }
        #endregion
    }
}
