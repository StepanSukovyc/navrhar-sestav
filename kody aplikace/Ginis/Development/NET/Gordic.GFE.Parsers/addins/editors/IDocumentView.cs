//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IDocumentView.cs                         </Name>
//    <Description> Rozhraní pohledu na dokument sestavy                        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-10                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Services;

namespace Gordic.GFE.Parsers.AddIns
{
    /// <summary>
    /// Rozhraní pohledu na dokument sestavy
    /// </summary>
    public interface IDocumentView : IControlView
    {
        /// <summary>
        /// Zobrazí zadaný XML jako strom.
        /// </summary>
        /// <param name="primaryFile">primární soubor sestavy</param>
        void LoadXml(OpenedFile primaryFile);
    }
}
