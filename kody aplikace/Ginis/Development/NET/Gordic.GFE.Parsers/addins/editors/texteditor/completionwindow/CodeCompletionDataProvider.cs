//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.CodeCompletionDataProvider.cs            </Name>
//    <Description> poskytovatel dat pro nápovědný text                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-27                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Binding;
using Gordic.TextEditor;

namespace Gordic.GFE.Parsers.DefaultEditor
{
    /// <summary>
    /// poskytovatel dat pro nápovědný text
    /// </summary>
    public class CodeCompletionDataProvider : AbstractCodeCompletionDataProvider
    {
        /// <summary>
        /// inicializace třídy.
        /// </summary>
        public CodeCompletionDataProvider() { }

        /// <summary>
        /// inicializace třídy s výrazem.
        /// </summary>
        /// <param name="expression">uvedený výraz</param>
        public CodeCompletionDataProvider(ExpressionResult expression)
        {
            this.fixedExpression = expression;
        }

        ExpressionResult fixedExpression;

        protected override void GenerateCompletionData(TextArea textArea, char charTyped)
        {
            preSelection = null;
            if (fixedExpression.Expression == null)
                GenerateCompletionData(textArea, GetExpression(textArea));
            else
                GenerateCompletionData(textArea, fixedExpression);
        }

        protected void GenerateCompletionData(TextArea textArea, ExpressionResult expressionResult)
        {
            if (expressionResult.Expression == null)
                return;
            string textContent = textArea.Document.TextContent;
            ResolveResult rr = Resolve(expressionResult, caretLineNumber, caretColumn, fileName, textContent);
            AddResolveResults(rr, expressionResult.Context);
        }

        protected virtual ResolveResult Resolve(ExpressionResult expressionResult,
                                                int caretLineNumber, int caretColumn,
                                                string fileName, string fileContent)
        {
            return ParserService.Resolve(expressionResult, caretLineNumber, caretColumn, fileName, fileContent);
        }
    }
}
