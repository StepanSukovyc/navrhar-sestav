//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IDrawing.cs                              </Name>
//    <Description> rozhraní vektorové grafiky                                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-05-23                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// rozhraní vektorové grafiky
    /// </summary>
    public interface IDrawing
    {
        /// <summary>
        /// Barva vyplně objektu
        /// </summary>
        IComplexColor Fill { get; set; }
        /// <summary>
        /// Velikost mezery
        /// </summary>
        int Gap { get; set; }
        /// <summary>
        /// Barva okrajů
        /// </summary>
        IComplexColor Edge { get; set; }
        /// <summary>
        /// Úhel objektu
        /// </summary>
        int Angle { get; set; }
        /// <summary>
        /// Tvar objektu
        /// </summary>
        string Shape { get; set; }
    }
}
