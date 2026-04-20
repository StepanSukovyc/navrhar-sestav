//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.GrrView.cs                             </Name>
//    <Description> Třída pro zobrazení Grr sestav                              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.DefaultEditor;
using Gordic.GFE.WinClient.GrfEditor;
using Gordic.GFE.WinClient.GrrEditor;
using Gordic.GFE.WinClient.Gui;
using Gordic.TextEditor.Document;
using System;
using System.Windows.Forms;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Třída pro zobrazení Grr sestav
    /// </summary>
    class GraphicView : AXmlView
    {
        /// <summary>
        /// inicializace objektů
        /// </summary>
        /// <param name="file">Otevřený soubor</param>
        /// <param name="category">název kategorie</param>
        public virtual void Initialize(OpenedFile file, string category)
        {
            base.Initialize(file);
            CategoryName = category;
            Language = "ALF-" + category;
            _RdEditor.Language = this.Language;

            // spuštění metody změny názvu souboru
            _OnFileNameChanged(file);
            // inicializace pohledu
            file.ForceInitializeView(this);

            switch (category)
            {
                case "GRF":
                    _GraphicView = new GrfViewContent();
                    break;
                default:
                    _GraphicView = new GrrViewContent();
                    break;
            }
            _GraphicView.Initialize(this);
            _SetPads(file);
            _SetStandardSecContent();
        }

        /// <summary>
        /// inicializace pohledu
        /// </summary>
        public override IViewContent Initialize() => Initialize(ReportDesignerTextEditorProperties.Instance);

        /// <summary>
        /// inicializace pohledu
        /// </summary>
        /// <param name="textEditorProperties">vlastnosti textového editoru</param>
        public override IViewContent Initialize(ITextEditorProperties textEditorProperties)
        {
            base.Initialize(textEditorProperties);

            _RdEditor.ActiveTextAreaControl.Caret.CaretModeChanged += pCaretModeChanged;
            _RdEditor.ActiveTextAreaControl.Caret.PositionChanged += pCaretChanged;
            _RdEditor.ActiveTextAreaControl.Enter += pCaretUpdate;
            return this;
        }
        /// <summary>
        /// uvolnění objektu
        /// </summary>
        /// <param name="disposing">indikuje uvolnění objektu</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _GraphicView?.Dispose();

                if (_RdEditor != null && _RdEditor.ActiveTextAreaControl != null)
                {
                    _RdEditor.ActiveTextAreaControl.Caret.CaretModeChanged -= pCaretModeChanged;
                    _RdEditor.ActiveTextAreaControl.Caret.PositionChanged -= pCaretChanged;
                    _RdEditor.ActiveTextAreaControl.Enter -= pCaretUpdate;
                }
                CompilationService.UnInitializeUnit(PrimaryFile);
            }

            base.Dispose(disposing);
        }

        internal void ValidateDocument(bool waitDialog)
        {
            //MessageBox.Show("Validace ALF není implementována.");
        }
    }
}
