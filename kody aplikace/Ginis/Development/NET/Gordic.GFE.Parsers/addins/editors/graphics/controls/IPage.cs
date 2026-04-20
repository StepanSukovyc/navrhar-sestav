//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IPage.cs                              </Name>
//    <Description> Rozhraní grafické stránky                                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-12                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.Drawing;
using Gordic.GFE.Parsers.Gui;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// Rozhraní grafické stránky
    /// </summary>
    public interface IPage : System.Collections.IList, ISizable, IZoomSizable, IBackground, IMarginable, ITowedHandler, IReadOnly
    {
        /// <summary>
        /// Indikuje, že stránka je aktivní - je vidět
        /// </summary>
        bool IsActive { get; }
        /// <summary>
        /// Formát stránky
        /// </summary>
        string Format { get; }

        /// <summary>
        /// Pozice objektu v seznamu vlastníka
        /// </summary>
        int Order { get; set; }

        /// <summary>
        /// Vlastník objektu, který má grafický ovladač
        /// </summary>
        IPageControl PagePanel { get; }

        /// <summary>
        /// Reakce na změnu čísla stránky
        /// </summary>
        event EventHandlerChangePosition ChangePosition;

        /// <summary>
        /// Kreslení stránky
        /// </summary>
        /// <param name="clipRectangle">kreslená oblast</param>
        /// <param name="graphics">Ovladač grafiky</param>
        /// <param name="args">Upřesnení co a jak vykreslovat</param>
        void Paint(Rectangle clipRectangle, Graphics graphics, PaintArgs args);
        /// <summary>
        /// Uvolnění stránky
        /// </summary>
        void Dispose();

        /// <summary>
        /// posun zleva pro kreslení
        /// </summary>
        float GraphDiffLeft { get; }
        /// <summary>
        /// posun shora pro kreslení
        /// </summary>
        float GraphDiffTop { get; }

        /// <summary>
        /// seznam zpožděného kreslení ohraničení
        /// </summary>
        List<DelayPaintItem> DelayPaintList { get; }

        /// <summary>
        /// Výpočet pozice nezávislé na ZOOM hodnotě do které se vkládá objekt 
        /// </summary>
        /// <param name="x">X</param>
        /// <param name="y">Y</param>
        /// <returns>Bod nezávislý na ZOOM hodnotě</returns>
        PointF GetInsertPoint(int x, int y);

        /// <summary>
        /// objekt pozadí
        /// </summary>
        IPageBackground BackObject { get; set; }
    }
}
