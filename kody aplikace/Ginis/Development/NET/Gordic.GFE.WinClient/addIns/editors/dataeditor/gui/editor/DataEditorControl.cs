//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.DataEditorControl.cs                   </Name>
//    <Description> textový ovladač pro soubor DAT                              </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-05-15                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.DefaultEditor;
using Gordic.TextEditor.Document;
using System;

namespace Gordic.GFE.WinClient.DataEditor
{
    /// <summary>
    /// textový ovladač pro soubor DAT
    /// </summary>
    class DataEditorControl : ReportDesignerTextAreaControl
    {
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="view">pohled daného ovladače</param>
        public DataEditorControl(IViewContent view)
        {
            Document.HighlightingStrategy = new AdvancedHighlightingStrategy((DefaultHighlightingStrategy)Document.HighlightingStrategy, new DataHighlightingStrategy(view));

            Document.FormattingStrategy = new DataFormattingStrategy(view);
            Document.FoldingManager.FoldingStrategy = new DataFoldingStrategy(view);
            Document.FoldingManager.FoldingsUpdated += FoldingsUpdated;
        }

        void FoldingsUpdated(object sender, EventArgs e)
        {
            ThreadService.SafeThreadAsyncCall(Document.HighlightingStrategy.MarkTokens, Document);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing && Document != null && Document.FoldingManager != null)
                Document.FoldingManager.FoldingsUpdated -= FoldingsUpdated; 
            base.Dispose(disposing);
        }
    }
}
