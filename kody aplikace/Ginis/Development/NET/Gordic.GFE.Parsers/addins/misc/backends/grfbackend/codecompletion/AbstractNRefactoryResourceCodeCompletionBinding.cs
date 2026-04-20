//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AbstractNRefactoryResourceCodeCompletionBinding.cs</Name>
//    <Description> Základní třída pro dokončování kódu pro vložení nějakého symbolu (pomocí NRefactory).</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-07-26                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.Parsers.DefaultEditor;
using Gordic.TextEditor;

namespace Gordic.GFE.Parsers.Binding
{
    /// <summary>
    /// Základní třída pro dokončování kódu pro vložení nějakého symbolu (pomocí NRefactory).
    /// </summary>
    public abstract class AbstractNRefactoryResourceCodeCompletionBinding : DefaultCodeCompletionBinding
    {
        /// <summary>
        /// jazyk editoru
        /// </summary>
        protected virtual string Language { get { return ""; } }
        /// <exclude/>
        public override bool HandleKeyPress(ICodeCompletionEditor editor, char ch)
        {
            if (!Language.Equals(editor.Language, StringComparison.InvariantCultureIgnoreCase))
                return false;
            if (this.CompletionPossible(editor, ch)) { }
            return false;
        }

        // ********************************************************************************************************************************

        /// <summary>
        /// Určuje, zda zadaný znak 
        /// by měl být podnětem ke doplnění kódu na aktuální pozici
        /// </summary>
        protected abstract bool CompletionPossible(ICodeCompletionEditor editor, char ch);

        ///// <summary>
        ///// Získání NRefactory ke generování kódu
        ///// </summary>
        //protected abstract IOutputAstVisitor OutputVisitor { get; }

        /// <summary>
        /// Indikátor stisknutí Ctrl + Space
        /// </summary>
        /// <param name="editor">Textový editor</param>
        /// <returns></returns>
        public override bool CtrlSpace(ICodeCompletionEditor editor)
        {
            if (editor is TextEditorControl tec && Language.Equals(tec.Document.HighlightingStrategy.Name, StringComparison.InvariantCultureIgnoreCase))
                return base.CtrlSpace(editor);

            return false;
        }
    }
}
