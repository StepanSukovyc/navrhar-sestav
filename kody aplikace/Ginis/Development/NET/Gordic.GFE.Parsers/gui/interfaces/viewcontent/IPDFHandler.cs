//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IPDFHandler.cs                           </Name>
//    <Description> Rozhraní pro práci s PDF formátem                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-14                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Rozhraní pro práci s PDF formátem
    /// </summary>
    public interface IPDFHandler
    {
        /// <summary>
        /// Konverze do PDF
        /// </summary>
        void ToPDF();
    }
}
