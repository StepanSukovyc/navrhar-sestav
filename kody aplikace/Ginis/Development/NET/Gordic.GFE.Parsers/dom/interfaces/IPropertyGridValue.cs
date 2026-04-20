//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IPropertyGrid.cs                         </Name>
//    <Description> rozhraní tabulky vlastnosti položek                         </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-07-08                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Gui;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// rozhraní tabulky vlastnosti položek
    /// </summary>
    public interface IPropertyGridValue
    {
        /// <summary>
        /// Velikost písma
        /// </summary>
        string PropertySize { get; set; }
        /// <summary>
        /// název písma
        /// </summary>
        IComplexFontFamily PropertyFontFamily { get; set; }
        /// <summary>
        /// barva písma
        /// </summary>
        IComplexColor PropertyForeColor { get; set; }
    }
}
