//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ISurroundeable.cs                     </Name>
//    <Description> Rozhraní orámování                                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Gui;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Rozhraní orámování
    /// </summary>
    public interface ISurroundHandler : ISurroundable
    {
        /// <summary>
        /// Změna šířky je povolená
        /// </summary>
        bool EnableSurroundWidth { get; }
        /// <summary>
        /// Změna stylu je povolená
        /// </summary>
        bool EnableSurroundDashStyle { get; }
        /// <summary>
        /// Změna barvy je povolená
        /// </summary>
        bool EnableSurroundColor { get; }
        /// <summary>
        /// Změna orámování je povolená
        /// </summary>
        bool EnableSurround { get; }

        /// <summary>
        /// Orámování dle typu orámování
        /// </summary>
        /// <param name="surroundType">Typ orámování</param>
        void SetSurround(SurroundType surroundType);
    }

    /// <summary>
    /// Rozhraní kotvících objektů
    /// </summary>
    public interface ISurroundable
    {
        /// <summary>
        /// Orámování
        /// </summary>
        IComplexSurround Surround { get; set; }

        /// <summary>
        /// Vnitřní orámování
        /// </summary>
        IInnerSurround InnerSurround { get; set; }

        /// <summary>
        /// šířka orámování
        /// </summary>
        string PropertySurroundWidth { get; set; }
        /// <summary>
        /// Barva rámečku
        /// </summary>
        IComplexColor PropertySurroundColor { get; set; }
        /// <summary>
        /// Styl rámečku
        /// </summary>
        string PropertySurroundDashStyle { get; set; }
    }
}
