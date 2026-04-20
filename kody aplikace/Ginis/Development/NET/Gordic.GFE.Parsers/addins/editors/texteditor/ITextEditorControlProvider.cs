//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ITextEditorControlProvider.cs            </Name>
//    <Description> Rozhraní objektů obsahujících tetový edtor                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-10                                                  </Created>
//  </FileHeader>

using Gordic.TextEditor;

namespace Gordic.GFE.Parsers.DefaultEditor
{
    /// <summary>
    /// Rozhraní objektů obsahujících tetový edtor
    /// </summary>
    public interface ITextEditorControlProvider : IFileDocumentProvider
    {
        /// <summary>
        /// Textový editor
        /// </summary>
        TextEditorControl TextEditorControl { get; }
    }
}
