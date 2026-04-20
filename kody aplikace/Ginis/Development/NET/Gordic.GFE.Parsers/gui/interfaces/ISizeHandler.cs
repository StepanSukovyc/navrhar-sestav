//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ISizeHandler.cs                          </Name>
//    <Description> Rozhraní pro změnu velikosti                                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System.Drawing;
using Gordic.GFE.Parsers.Utils;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Rozhraní pro změnu velikosti
    /// </summary>
    public interface ISizeHandler
    {
        /// <summary>
        /// šířka obsahu
        /// </summary>
        float ContentWidth { get; }
        /// <summary>
        /// pozice LEFT obsahu
        /// </summary>
        float ContentLeft { get; }

        /// <summary>
        /// Změna pozice zleva vnitřních objektů 
        /// dané komponenty
        /// </summary>
        /// <param name="value">nová pozice objektu</param>
        void ChangeLeft(float value = -1);
        /// <summary>
        /// Změna výšky vybraných objektů
        /// </summary>
        void SetHeight();
        /// <summary>
        /// nastavení šířky objektů
        /// </summary>
        /// <param name="value">nová šířka</param>
        void ChangeWidth(float value);
        /// <summary>
        /// nastavení TOP pozice objektů
        /// </summary>
        /// <param name="value">nová pozice</param>
        void ChangeTop(float value);
    }

    /// <summary>
    /// rozhraní ZOOM veličiny a pozice
    /// </summary>
    public interface IZoomSizable
    {
        /// <summary>
        /// veličina zvětšení
        /// </summary>
        float Zoom { get; }
        /// <summary>
        /// šířka - včetně Zoom hodnoty
        /// </summary>
        float WidthZoom { get; }
        /// <summary>
        /// výška - včetně Zoom
        /// </summary>
        float HeightZoom { get; }
        /// <summary>
        /// Pozice zleva objektu - včetně Zoom hodnoty
        /// </summary>
        float LeftZoom { get; }
        /// <summary>
        /// Pozice shora objektu - včetně Zoom hodnoty
        /// </summary>
        float TopZoom { get; }

        /// <summary>
        /// Velikost objektu v pixelech - se Zoom faktorem
        /// </summary>
        RectangleF BoundsInPixels { get; }
    }

    /// <summary>
    /// Rozhraní 
    /// </summary>
    public interface ISizable
    {
        /// <summary>
        /// šířka
        /// </summary>
        SizeValue Width { get; set; }
        /// <summary>
        /// výška
        /// </summary>
        SizeValue Height { get; set; }
        /// <summary>
        /// Pozice zleva objektu
        /// </summary>
        SizeValue Left { get; set; }
        /// <summary>
        /// Pozice shora objektu
        /// </summary>
        SizeValue Top { get; set; }
        /// <summary>
        /// indikuje změnu výšky
        /// </summary>
        bool IsHeightChanged { get; }
    }
}
