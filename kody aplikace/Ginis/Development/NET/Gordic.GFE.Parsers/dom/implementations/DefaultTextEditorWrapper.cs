//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DefaultTextEditorWrapper.cs              </Name>
//    <Description> Výchozí obálka na textovou editací                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-28                                                  </Created>
//  </FileHeader>

using System;
using System.Diagnostics;
using System.Drawing.Printing;
using System.IO;
using System.Windows.Forms;
using System.Xml;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.DefaultEditor;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.TextEditor;
using Gordic.TextEditor.Document;
using Gordic.General;
using Gordic.GFE.Parsers.Binding;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Výchozí obálka na textovou editací
    /// </summary>
    public class DefaultTextEditorWrapper : DefaultAbstractViewContent
        , IClipboardHandler, ITextEditorControlProvider, IEditable, IPrintable
    {
        #region AbstractViewControl
        /// <summary>
        /// Ovladač pohledu
        /// </summary>
        public override object Control { get { return textEditor; } }
        /// <summary>
        /// Uložení obsahu
        /// </summary>
        /// <param name="file">Soubor</param>
        /// <param name="stream">Proud v paměti</param>
        public override void Save(OpenedFile file, Stream stream)
        {
            if (file != PrimaryFile)
                throw new ArgumentException("file != PrimaryFile");

            if (!textEditor.CanSaveWithCurrentEncoding())
                if (MessageService.AskQuestion(GResources.GetResourceText(29450317) + ' ' + //RC 29450317 : Soubor nelze uložit s aktuálním kódování
                                               textEditor.Encoding.EncodingName + ' ' + GResources.GetResourceText(29450319) + //RC 29450319 : bez ztráty dat.
                                               '\n' + GResources.GetResourceText(29450318))) //RC 29450318 : Chcete uložit v UTF-8 formátu?
                    textEditor.Encoding = System.Text.Encoding.UTF8;

            textEditor.SaveFile(stream);
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
                textEditor.IsReadOnly = (File.GetAttributes(file.FileName) & FileAttributes.ReadOnly) == FileAttributes.ReadOnly;

            bool autodetectEncoding = true;
            textEditor.LoadFile(file.FileName, stream, true, autodetectEncoding);
        }

        /// <summary>
        /// Indikuje, že obsah je pouze pro čtení
        /// </summary>
        public override bool IsReadOnly { get { return textEditor.IsReadOnly; } }

        /// <exclude/>
        protected override void _OnFileNameChanged(OpenedFile file)
        {
            base._OnFileNameChanged(file);
            Debug.Assert(file == this._Files[0]);

            string oldFileName = textEditor.FileName;
            string newFileName = file.FileName;

            if (Path.GetExtension(oldFileName) != Path.GetExtension(newFileName))
                if (textEditor.Document.HighlightingStrategy != null)
                {
                    textEditor.Document.HighlightingStrategy = HighlightingStrategyFactory.CreateHighlightingStrategyForFile(newFileName);
                    textEditor.Refresh();
                }

            textEditor.FileName = newFileName;
        }
        #endregion

        #region IClipboardHandler
        /// <exclude/>
        public bool EnableCut
        {
            get
            {
                return !this.IsDisposed && textEditor.ActiveTextAreaControl.TextArea.ClipboardHandler.EnableCut;
            }
        }

        /// <exclude/>
        public bool EnableCopy
        {
            get
            {
                return !this.IsDisposed && textEditor.ActiveTextAreaControl.TextArea.ClipboardHandler.EnableCopy;
            }
        }

        /// <exclude/>
        public bool EnablePaste
        {
            get
            {
                return !this.IsDisposed && textEditor.ActiveTextAreaControl.TextArea.ClipboardHandler.EnablePaste;
            }
        }

        /// <exclude/>
        public bool EnableDelete
        {
            get
            {
                return !this.IsDisposed && textEditor.ActiveTextAreaControl.TextArea.ClipboardHandler.EnableDelete;
            }
        }

        /// <exclude/>
        public bool EnableSelectAll
        {
            get
            {
                return !this.IsDisposed && textEditor.ActiveTextAreaControl.TextArea.ClipboardHandler.EnableSelectAll;
            }
        }

        /// <exclude/>
        public void SelectAll()
        {
            textEditor.ActiveTextAreaControl.TextArea.ClipboardHandler.SelectAll(null, null);
        }

        /// <exclude/>
        public void Delete()
        {
            textEditor.ActiveTextAreaControl.TextArea.ClipboardHandler.Delete(null, null);
        }
        /// <exclude/>
        public void Paste()
        {
            textEditor.ActiveTextAreaControl.TextArea.ClipboardHandler.Paste(null, null);
        }

        /// <exclude/>
        public void Copy()
        {
            textEditor.ActiveTextAreaControl.TextArea.ClipboardHandler.Copy(null, null);
        }

        /// <exclude/>
        public void Cut()
        {
            textEditor.ActiveTextAreaControl.TextArea.ClipboardHandler.Cut(null, null);
        }
        #endregion

        #region ITextEditorControlProvider
        /// <summary>
        /// Ovladač obsahu
        /// </summary>
        public TextEditorControl TextEditorControl { get { return textEditor; } }
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
        public virtual string Text
        {
            get { return textEditor.Document.TextContent; }
            set { textEditor.Document.Replace(0, textEditor.Document.TextLength, value); ; }
        }
        #endregion

        #region IPrintable
        /// <summary>
        /// Vytisknutí obsahu dokumentu
        /// </summary>
        public PrintDocument PrintDocument { get { return textEditor.PrintDocument; } }
        #endregion

        protected TextEditorControl textEditor;

        /// <summary>
        /// inicializace pohledu
        /// </summary>
        /// <param name="file">Primární soubor zobrazení.</param>
        public override IViewContent Initialize(OpenedFile file)
        {
            base.Initialize(file);
            TabPageText = "s";

            textEditor = new TextEditorControl
            {
                RightToLeft = RightToLeft.No
            };
            textEditor.Document.DocumentChanged += new DocumentEventHandler(TextAreaChangedEvent);

            textEditor.FileName = file.FileName;
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
            textEditor.OptionsChanged();
            textEditor.Refresh();
        }

        /// <summary>
        /// uvolnění objektu
        /// </summary>
        /// <param name="disposing">indikuje uvolnění objektu</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && textEditor != null)
                textEditor.Dispose();

            base.Dispose(disposing);
        }

        #region Navíc
        /// <summary>
        /// Nahrazení stávajícího textu novým
        /// </summary>
        /// <param name="xml">Nový text</param>
        public virtual void ReplaceAll(string xml)
        {
            string formattedXml = SimpleFormat(IndentedFormat(xml));
            textEditor.Document.Replace(0, textEditor.Document.TextLength, formattedXml);
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
            if (textEditor.TextEditorProperties.ConvertTabsToSpaces)
            {
                writer.Indentation = textEditor.TextEditorProperties.IndentationSize;
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
        #endregion
    }
}
