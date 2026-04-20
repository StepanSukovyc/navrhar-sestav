//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IFileDocumentProvider.cs                 </Name>
//    <Description> Rozhraní pohledů na obsah, které poskytují textový editor dokumentu</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-10                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Services;
using Gordic.TextEditor.Document;

namespace Gordic.GFE.Parsers.DefaultEditor
{
    /// <summary>
    /// Rozhraní pohledů na obsah, které poskytují textový editor dokumentu
    /// pro jeden nebo více <see cref="OpenedFile"/>.
    /// </summary>
    public interface IFileDocumentProvider
    {
        /// <summary>
        /// Získání editovatelného dokumentu pro specifický otevřený soubor.
        /// </summary>
        /// <param name="file"><see cref="OpenedFile"/> pro získání dokumentu.</param>
        /// <returns></returns>
        IDocument GetDocumentForFile(OpenedFile file);
    }
}
