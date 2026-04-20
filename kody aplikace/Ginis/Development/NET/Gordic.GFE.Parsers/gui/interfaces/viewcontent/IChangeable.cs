//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IChangeable.cs                           </Name>
//    <Description> Rozhraní objektů, co umí změnit velikost nebo pozici        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-25                                                  </Created>
//  </FileHeader>

using System.Drawing;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Rozhraní objektů, co umí změnit velikost nebo pozici
    /// </summary>
    public interface IChangeable
    {
        /// <summary>
        /// Velikost objektu v pixelech - se Zoom faktorem
        /// </summary>
        RectangleF BoundsInPixels { get; }
        /// <summary>
        /// Změna pozice
        /// </summary>
        /// <param name="xdiff">Po ose X</param>
        /// <param name="ydiff">Po ose Y</param>
        void ChangeLocation(float xdiff, float ydiff);

        /// <summary>
        /// Změna šířky objektu
        /// </summary>
        /// <param name="diff">velikost potřebné změny</param>
        void SetWidthByLeftSide(float diff);
        /// <summary>
        /// Změna šířky objektu
        /// </summary>
        /// <param name="diff">velikost potřebné změny</param>
        void SetWidthByRightSide(float diff);
        /// <summary>
        /// Změna výšky objektu
        /// </summary>
        /// <param name="diff">velikost potřebné změny</param>
        void SetHeightByTopSide(float diff);
        /// <summary>
        /// Změna výšky objektu
        /// </summary>
        /// <param name="diff">velikost potřebné změny</param>
        void SetHeightByBottomSide(float diff);       
    }
}
