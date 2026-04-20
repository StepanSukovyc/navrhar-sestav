//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ITextHandler.cs                       </Name>
//    <Description> Rozhraní objektů obsahujících textové pole                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.Parsers.Gui;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Rozhraní objektů obsahujících textové pole
    /// </summary>
    public interface IText : IFormatting
    {
        /// <summary>
        /// Povolení změny textu
        /// </summary>
        bool EnableChangeText { get; set; }
        /// <summary>
        /// Faktor zvětšení
        /// </summary>
        float Zoom { get; }
        /// <summary>
        /// řetězec symbolů
        /// </summary>
        String Text { get; set; }
        /// <summary>
        /// Směr textu
        /// </summary>
        RotateType Orientation { get; set; }
        /// <summary>
        /// Zarovnání obsahu
        /// </summary>
        IAlign Align { get; set; }
        /// <summary>
        /// Pokud text má být víceřádkový pak TRUE
        /// </summary>
        bool MultiLine { get; set; }
        /// <summary>
        /// Zakončení textu
        /// </summary>
        IEllipsis Ellipsis { get; set; }
        /// <summary>
        /// Písmo
        /// </summary>
        ITagTextFont TextFont { get; set; }
        /// <summary>
        /// Přizpůsobení textu
        /// </summary>
        FitText Fittext { get; set; }
        /// <summary>
        /// Řádkování
        /// </summary>
        float Textleading { get; set; }

        /// <summary>
        /// Vzdálenost odstavců
        /// </summary>
        float Paragraphgap { get; set; }
    }

    /// <summary>
    /// Rozhraní pro práci s textem objektu
    /// </summary>
    public interface ITextHandler
    {
        /// <summary>
        /// Text pro zpracování
        /// </summary>
        ITagText Text { get; set; }
        /// <summary>
        /// Nastavení výšky dle obsahu
        /// </summary>
        void SetHeightByContent();
    }

    /// <summary>
    /// rozhraní ovladače písma (pohledu)
    /// </summary>
    public interface ITextFontHandler
    {
        /// <summary>
        /// změna barvy písma
        /// </summary>
        /// <param name="commit">indikuje nutnost ukončení transakce</param>
        void ChangeColor(bool commit);
        /// <summary>
        /// změna názvu písma
        /// </summary>
        /// <param name="commit">indikuje nutnost ukončení transakce</param>
        void ChangeName(bool commit);

        /// <summary>
        /// získání společné barvy písma vybraných objektů
        /// </summary>
        /// <returns></returns>
        string GetColorName();
        /// <summary>
        /// získání společného názvu písma vybraných objektů
        /// </summary>
        /// <returns>textový název písma</returns>
        string GetFontName();

        /// <summary>
        /// získání společné barvy písma vybraných objektů
        /// </summary>
        /// <returns></returns>
        string GetSize();
        /// <summary>
        /// změna velikostí písma
        /// </summary>
        /// <param name="commit">indikuje nutnost ukončení transakce</param>
        void ChangeSize(bool commit);
    }
}
