//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IMouseComponent.cs                       </Name>
//    <Description> Rozhraní objektu grafické sestavy s reakcí na myš           </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-05-20                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Rozhraní objektu grafické sestavy s reakcí na myš
    /// </summary>
    public interface IMouseComponent
    {
        /// <summary>Kliknutí</summary>
        void Click(float x, float y);
        /// <summary>Myš již není nad objektem</summary>
        void HoverEnd();
        /// <summary>Myš nad objektem</summary>
        void Hover(float x, float y);
        /// <summary>Text nad objektem</summary>
        string Tooltip { get; }
    }
}
