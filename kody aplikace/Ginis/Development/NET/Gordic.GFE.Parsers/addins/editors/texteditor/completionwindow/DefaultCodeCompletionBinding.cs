//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DefaultCodeCompletionBinding.cs          </Name>
//    <Description> výchozí vazba na doplnění textu                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-27                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Services;

namespace Gordic.GFE.Parsers.DefaultEditor
{
    /// <summary>
    /// výchozí vazba na doplnění textu
    /// </summary>
    public class DefaultCodeCompletionBinding : ICodeCompletionBinding
    {
        bool enableXmlCommentCompletion = true;
        bool enableDotCompletion = true;

        /// <summary>
        /// indikuje, že povoleno doplnění kódu v XML části
        /// </summary>
        public bool EnableXmlCommentCompletion
        {
            get { return enableXmlCommentCompletion; }
            set { enableXmlCommentCompletion = value; }
        }
        /// <summary>
        /// indikuje povolenost doplnění po stisknutí '.'
        /// </summary>
        public bool EnableDotCompletion
        {
            get { return enableDotCompletion; }
            set { enableDotCompletion = value; }
        }

        /// <summary>
        /// Ovladač na stisknutí klávesy
        /// </summary>
        /// <param name="editor">Textový editor</param>
        /// <param name="ch">Stisknutá klávesa</param>
        /// <returns></returns>
        public virtual bool HandleKeyPress(ICodeCompletionEditor editor, char ch)
        {
            switch (ch)
            {
                case '<':
                    if (enableXmlCommentCompletion)
                    {
                        editor.ShowCompletionWindow(new CommentCompletionDataProvider(), ch);
                        return true;
                    }
                    else
                        return false;
                case '.':
                    if (enableDotCompletion)
                    {
                        editor.ShowCompletionWindow(new CodeCompletionDataProvider(), ch);
                        return true;
                    }
                    else
                        return false;
                case ' ':
                    if (!CodeCompletionOptions.Instance.KeywordCompletionEnabled)
                        return false;
                    string word = editor.GetWordBeforeCaret();
                    if (word != null)
                        return HandleKeyword(editor, word);
                    else
                        return false;
                default:
                    return false;
            }
        }
        /// <summary>
        /// napojení Keyword
        /// </summary>
        /// <param name="editor">editor</param>
        /// <param name="word">již napsané slovo</param>
        /// <returns></returns>
        public virtual bool HandleKeyword(ICodeCompletionEditor editor, string word)
        {
            // DefaultCodeCompletionBinding nepodporuje Keyword
            return false;
        }
        /// <summary>
        /// Indikátor stisknutí Ctrl + Space
        /// </summary>
        /// <param name="editor">Textový editor</param>
        /// <returns></returns>
        public virtual bool CtrlSpace(ICodeCompletionEditor editor)
        {
            var provider = new CtrlSpaceCompletionDataProvider
            {
                AllowCompleteExistingExpression = CodeCompletionOptions.Instance.AllowCompleteExistingExpression,
                Options = CodeCompletionOptions.Instance
            };
            editor.ShowCompletionWindow(provider, '\0');
            return true;
        }
    }
}
