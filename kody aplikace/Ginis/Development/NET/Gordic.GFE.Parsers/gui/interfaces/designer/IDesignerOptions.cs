//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IDesignerOptions.cs                      </Name>
//    <Description> Rozhraní nastavitelých hodnot designéra                     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-12                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Rozhraní nastavitelých hodnot designéra
    /// </summary>
    public interface IDesignerOptions
    {
        /// <summary>
        /// Výchozí velikost písma
        /// </summary>
        string DefaultFontSize { get; set; }
        /// <summary>
        /// Výchozí barva písma
        /// </summary>
        string DefaultFontForeColor { get; set; }
        /// <summary>
        /// Výchozí barva pozadí písma
        /// </summary>
        string DefaultFontBackColor { get; set; }
        /// <summary>
        /// Výchozí písmo
        /// </summary>
        string DefaultFontFontFamily { get; set; }

        /// <summary>
        /// Výchozí odsazení rámečku zleva
        /// </summary>
        string DefaultSpacingLeft { get; set; }
        /// <summary>
        /// Výchozí odsazení rámečku zprava
        /// </summary>
        string DefaultSpacingRight { get; set; }
        /// <summary>
        /// Výchozí odsazení rámečku shora
        /// </summary>
        string DefaultSpacingTop { get; set; }
        /// <summary>
        /// Výchozí odsazení rámečku dole
        /// </summary>
        string DefaultSpacingBottom { get; set; }

        /// <summary>
        /// Výchozí odsazení textu zleva
        /// </summary>
        string DefaultPaddingLeft { get; set; }
        /// <summary>
        /// Výchozí odsazení textu zprava
        /// </summary>
        string DefaultPaddingRight { get; set; }
        /// <summary>
        /// Výchozí odsazení textu shora
        /// </summary>
        string DefaultPaddingTop { get; set; }
        /// <summary>
        /// Výchozí odsazení textu dole
        /// </summary>
        string DefaultPaddingBottom { get; set; }

        /// <summary>
        /// Výchozí šířka objektu
        /// </summary>
        string DefaultSizeWidth { get; set; }
        /// <summary>
        /// Výchozí výška objektu
        /// </summary>
        string DefaultSizeHeight { get; set; }

    }
}
