//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ICodeCompletionBinding.cs              </Name>
//    <Description> Rozhraní umožňující zpětné volání nápovědy po stisknutí určitých klaves.</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-08                                                  </Created>
//  </FileHeader>

using Gordic.TextEditor.Gui.CompletionWindow;

namespace Gordic.GFE.Parsers.DefaultEditor
{
    /// <summary>
    /// rozhraní editorů podporujících doplnění kódu
    /// </summary>
    public interface ICodeCompletionEditor
    {
        /// <summary>
        /// Jazyk - vázaný na daný editor
        /// </summary>
        string Language { get; }
        /// <summary>
        /// Získání slova před posuvníkem
        /// </summary>
        /// <returns></returns>
        string GetWordBeforeCaret();
        /// <summary>
        /// zobrazení okna nápovědy
        /// </summary>
        /// <param name="completionDataProvider">poskytovatel dat pro nápovědu</param>
        /// <param name="ch">symbol</param>
        void ShowCompletionWindow(ICompletionDataProvider completionDataProvider, char ch);
        /// <summary>
        /// vložení šablony
        /// </summary>
        /// <param name="template">šablona k vložení</param>
        void InsertTemplate(CodeTemplate template);
    }
    /// <summary>
    /// Rozhraní umožňující zpětné volání nápovědy po stisknutí určitých klaves.
    /// </summary>
    public interface ICodeCompletionBinding
    {
        /// <summary>
        /// Ovladač na stisknutí klávesy
        /// </summary>
        /// <param name="editor">Textový editor</param>
        /// <param name="ch">Stisknutá klávesa</param>
        /// <returns></returns>
        bool HandleKeyPress(ICodeCompletionEditor editor, char ch);
        /// <summary>
        /// Indikátor stisknutí Ctrl + Space
        /// </summary>
        /// <param name="editor">Textový editor</param>
        /// <returns></returns>
        bool CtrlSpace(ICodeCompletionEditor editor);
    }
}
