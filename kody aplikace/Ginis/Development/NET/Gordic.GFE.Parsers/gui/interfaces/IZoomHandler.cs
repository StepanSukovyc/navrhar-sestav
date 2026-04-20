//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IZoomHandler.cs                        </Name>
//    <Description> Rozhraní pro práci s lupou                                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-12-06                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Rozhraní pro práci s lupou
    /// </summary>
    public interface IZoomHandler
    {
        /// <summary>
        /// Hodnota zvětšení
        /// </summary>
        string ZoomValue { get; set; }
    }
}
