//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.GrrCompletionBinding.cs                  </Name>
//    <Description>    GRF doplnění kódu                                        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-27                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using Gordic.GFE.Parsers.DefaultEditor;
using Gordic.GFE.Parsers.Binding;
using Gordic.TextEditor;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.DefaultEditor;
using Gordic.GFE.Parsers;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// GRR doplnění kódu
    /// </summary>
    public class GrrCompletionBinding : AbstractNRefactoryResourceCodeCompletionBinding
    {
        /// <exclude/>
        protected override string Language { get { return "ALF-GRR"; } }
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
            {
                if (char.IsLetter(ch) && CodeCompletionOptions.Instance.CompleteWhenTyping)
                {
                    GrrExpressionFinder ef = CreateExpressionFinder(rdtac.FileName);
                    ThreadService.CallLater(500, delegate
                    {
                        ExpressionResult result = ef.FindExpression(rdtac.Text, rdtac.ActiveTextAreaControl.Caret.Offset);
                        var provider = new CtrlSpaceCompletionDataProvider(result.Context)
                        {
                            AllowCompleteExistingExpression = CodeCompletionOptions.Instance.AllowCompleteExistingExpression,
                            Options = CodeCompletionOptions.Instance
                        };
                        editor.ShowCompletionWindow(provider, '\0');
                        //editor.ShowCompletionWindow(new CtrlSpaceCompletionDataProvider() { ShowTemplates = true }, '\0');
                    });
                    return true;
                }
            }

            return base.HandleKeyPress(editor, ch);
        }

        static Dictionary<string, GrrExpressionFinder> finders = new Dictionary<string, GrrExpressionFinder>();

        static GrrExpressionFinder CreateExpressionFinder(string fileName)
        {
            if (!finders.ContainsKey(fileName))
                finders.Add(fileName, new GrrExpressionFinder());

            finders[fileName].SetInformation(ParserService.GetParseInformation(fileName));
            return finders[fileName];
        }
        bool IsInComment(ReportDesignerTextAreaControl editor)
        {
            GrrExpressionFinder ef = CreateExpressionFinder(editor.FileName);
            int cursor = editor.ActiveTextAreaControl.Caret.Offset - 1;
            return ef.FilterComments(editor.Document.GetText(0, cursor + 1), ref cursor) == null;
        }
    }
}
