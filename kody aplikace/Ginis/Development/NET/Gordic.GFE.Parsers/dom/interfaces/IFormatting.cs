//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IFormatting.cs                           </Name>
//    <Description> Rozhraní pro objekty, které lze formátovát                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-06-11                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Rozhraní pro objekty, které lze formátovát
    /// </summary>
    public interface IFormatting
    {
        /// <summary>
        /// Formátování textu
        /// </summary>
        string Format { get; set; }
    }
}
