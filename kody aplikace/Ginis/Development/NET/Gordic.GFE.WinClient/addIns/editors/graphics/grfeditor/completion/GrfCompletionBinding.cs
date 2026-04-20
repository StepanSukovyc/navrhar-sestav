//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.GRFCompletionBinding.cs                  </Name>
//    <Description>    GRF doplnění kódu                                        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-27                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.Parsers.DefaultEditor;
using Gordic.GFE.Parsers.Binding;
using Gordic.TextEditor;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.DefaultEditor;
using Gordic.GFE.Parsers;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// GRF doplnění kódu
    /// </summary>
    public class GrfCompletionBinding : AbstractNRefactoryResourceCodeCompletionBinding
    {
        /// <exclude/>
        protected override string Language { get { return "ALF-GRF"; } }
        /// <summary>
        /// Určuje, zda zadaný znak 
        /// by měl být podnětem ke doplnění kódu na aktuální pozici
        /// </summary>
        protected override bool CompletionPossible(ICodeCompletionEditor editor, char ch)
        {
            return false;
        }
        /// <exclude/>
        public override bool HandleKeyPress(ICodeCompletionEditor editor, char ch)
        {
            TextEditorControl tec = editor as TextEditorControl;
            if (editor is ReportDesignerTextAreaControl rdtac && Language.Equals(rdtac.Document.HighlightingStrategy.Name, StringComparison.InvariantCultureIgnoreCase))
                if (char.IsLetter(ch) && CodeCompletionOptions.Instance.CompleteWhenTyping)
                {
                    GrfExpressionFinder ef = CreateExpressionFinder(rdtac.FileName);
                    ExpressionResult result = ef.FindExpression(rdtac.Text, rdtac.ActiveTextAreaControl.Caret.Offset);
                    editor.ShowCompletionWindow(new CtrlSpaceCompletionDataProvider(result.Context) { ShowTemplates = true }, '\0');
                    return true;
                }

            return base.HandleKeyPress(editor, ch);
        }

        bool IsInComment(ReportDesignerTextAreaControl editor)
        {
            GrfExpressionFinder ef = CreateExpressionFinder(editor.FileName);
            int cursor = editor.ActiveTextAreaControl.Caret.Offset - 1;
            return ef.FilterComments(editor.Document.GetText(0, cursor + 1), ref cursor) == null;
        }

        static GrfExpressionFinder CreateExpressionFinder(string fileName)
        {
            return new GrfExpressionFinder(ParserService.GetParseInformation(fileName));
        }
    }
}
