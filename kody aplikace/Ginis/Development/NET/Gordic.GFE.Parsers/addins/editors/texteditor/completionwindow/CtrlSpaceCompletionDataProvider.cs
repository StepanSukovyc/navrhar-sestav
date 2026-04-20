//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.CtrlSpaceCompletionDataProvider.cs       </Name>
//    <Description> poskytovatel dat pro příkaz Ctrl + Space                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-27                                                  </Created>
//  </FileHeader>

using System;
using System.Collections;
using Gordic.GFE.Parsers.Binding;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Services;
using Gordic.TextEditor;
using Gordic.TextEditor.Gui.CompletionWindow;
using Gordic.General;

namespace Gordic.GFE.Parsers.DefaultEditor
{
    /// <summary>
    /// poskytovatel dat pro příkaz Ctrl + Space
    /// </summary>
    public class CtrlSpaceCompletionDataProvider : CodeCompletionDataProvider
    {
        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public CtrlSpaceCompletionDataProvider()
        {
        }
        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="overrideContext">kontext třídy</param>
        public CtrlSpaceCompletionDataProvider(ExpressionContext overrideContext)
        {
            this.overrideContext = overrideContext;
        }

        bool allowCompleteExistingExpression;
        /// <summary>
        /// Indikuje přepis starého doplnění.
        /// </summary>
        public bool AllowCompleteExistingExpression
        {
            get { return allowCompleteExistingExpression; }
            set { allowCompleteExistingExpression = value; }
        }

        /// <summary>
        /// indikuje zda kód šablony by měly být zahrnuty v doplňování kódu.
        /// </summary>
        public bool ShowTemplates { get; set; }

        void AddTemplates(TextArea textArea, char charTyped)
        {
            if (!ShowTemplates)
                return;

            if (completionData.Count > DefaultIndex)
            {
                ICompletionData suggestedData = DefaultIndex >= 0 ? completionData[DefaultIndex] : null;
                ICompletionData[] templateCompletionData = new TemplateCompletionDataProvider().GenerateCompletionData(fileName, textArea, charTyped);
                if (templateCompletionData == null || templateCompletionData.Length == 0)
                    return;
                for (int i = 0; i < completionData.Count; i++)
                {
                    if (completionData[i].ImageIndex == ClassBrowserIconService.KeywordIndex)
                    {
                        string text = completionData[i].Text;
                        for (int j = 0; j < templateCompletionData.Length; j++)
                            if (templateCompletionData[j] != null && templateCompletionData[j].Text == text)
                            {
                                // přepis keyword uvnitř šablony
                                completionData[i] = templateCompletionData[j];
                                templateCompletionData[j] = null;
                            }
                    }
                }
                // ne-keyword šablony
                for (int j = 0; j < templateCompletionData.Length; j++)
                    if (templateCompletionData[j] != null)
                        completionData.Add(templateCompletionData[j]);
                if (suggestedData != null)
                {
                    completionData.Sort(DefaultCompletionData.Compare);
                    DefaultIndex = completionData.IndexOf(suggestedData);
                }
            }
        }

        /// <exclude/>
        protected override void GenerateCompletionData(TextArea textArea, char charTyped)
        {
            if (!allowCompleteExistingExpression)
            {
                preSelection = "";
                if (charTyped != '\0')
                    preSelection = null;
                ExpressionContext context = overrideContext ?? ExpressionContext.Default;
                AddResolveResults(ParserService.CtrlSpace(caretLineNumber, caretColumn, fileName, textArea.Document.TextContent, context), context);
                AddTemplates(textArea, charTyped);
                return;
            }

            ExpressionResult expressionResult = GetExpression(textArea);
            LoggingService.Debug(GResources.GetResourceText(29450105) + expressionResult.ToString()); //RC 29450105 : Ctrl-Space má výraz 
            string expression = expressionResult.Expression;
            preSelection = null;
            if (expression == null || expression.Length == 0)
            {
                preSelection = "";
                if (charTyped != '\0')
                    preSelection = null;
                AddResolveResults(ParserService.CtrlSpace(caretLineNumber, caretColumn, fileName, textArea.Document.TextContent, expressionResult.Context), expressionResult.Context);
                AddTemplates(textArea, charTyped);
                return;
            }

            int idx = expression.LastIndexOf('.');
            if (idx > 0)
            {
                preSelection = expression.Substring(idx + 1);
                expressionResult.Expression = expression.Substring(0, idx);
                if (charTyped != '\0')
                    preSelection = null;
                GenerateCompletionData(textArea, expressionResult);
            }
            else
            {
                preSelection = charTyped != '\0' ? null : GetPreselection(textArea, expression);
                ArrayList results = ParserService.CtrlSpace(caretLineNumber, caretColumn, fileName, textArea.Document.TextContent, expressionResult.Context);
                AddResolveResults(results, expressionResult.Context);
                AddTemplates(textArea, charTyped);
            }
        }

        string GetPreselection(TextArea textArea, string expression)
        {
            if (expression == null)
                return null;

            // vyloučíme situaci, kdy expression == "<", nebo ">", atp.
            string result = (expression.Length > 1 || (expression.Length == 1 && Char.IsLetterOrDigit(expression[0]))) && !expression.EndsWith(" ")
                ? expression.Trim('\r', '\n', '\t')
                : string.Empty;

            int offset = textArea.Caret.Offset;
            while (Char.IsLetterOrDigit(textArea.Document.TextContent[offset])
                || textArea.Document.TextContent[offset] == '-'
                || textArea.Document.TextContent[offset] == '_')
            {
                result += textArea.Document.TextContent[offset];
                offset++;
            }
            textArea.Caret.Position = textArea.Document.OffsetToPosition(offset);
            return result;
        }

    }
}
