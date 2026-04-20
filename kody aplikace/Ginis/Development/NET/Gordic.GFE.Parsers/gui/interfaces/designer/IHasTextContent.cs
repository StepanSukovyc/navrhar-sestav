//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IHasTextContent.cs                       </Name>
//    <Description> Rozhraní pro editací objektů obsahujících text              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-03-29                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Rozhraní pro editací objektů obsahujících text
    /// </summary>
    public interface IHasTextContent
    {
        /// <summary>
        /// Dostupnost funkce zarovnání textu
        /// </summary>
        bool EnableChange { get; }

        /// <summary>
        /// Vertikální zarovnání textu nahoru
        /// </summary>
        void AlignTop();
        /// <summary>
        /// Vertikální zarovnání textu na střed
        /// </summary>
        void AlignMiddle();
        /// <summary>
        /// Vertikální zarovnání textu dolů
        /// </summary>
        void AlignBottom();
        /// <summary>
        /// Horizontální zarovnání textu doleva
        /// </summary>
        void AlignLeft();
        /// <summary>
        /// Horizontální zarovnání textu na střed
        /// </summary>
        void AlignCenter();
        /// <summary>
        /// Horizontální zarovnání textu doprava
        /// </summary>
        void AlignRight();
        /// <summary>
        /// Horizontální zarovnání textu justify
        /// </summary>
        void AlignJustify();

        /// <summary>
        /// Nastavení řezu písma na 'regular'
        /// </summary>
        void Regular();

        /// <summary>
        /// Nastavení řezu písma na 'bold'
        /// </summary>
        /// <param name="isTrue">TRUE - nastavení na 'bold' písmo, opačně - vyjmutí 'bold' písma</param>
        void Bold(bool isTrue = true);
        /// <summary>
        /// Nastavení řezu písma na 'italic'
        /// </summary>
        /// <param name="isTrue">TRUE - nastavení na 'italic' písmo, opačně - vyjmutí 'italic' písma</param>
        void Italic(bool isTrue = true);
        /// <summary>
        /// Nastavení řezu písma na 'underline'
        /// </summary>
        /// <param name="isTrue">TRUE - nastavení na 'underline' písmo, opačně - vyjmutí 'underline' písma</param>
        void Underline(bool isTrue = true);
        /// <summary>
        /// Nastavení řezu písma na 'strikeout'
        /// </summary>
        /// <param name="isTrue">TRUE - nastavení na 'strikeout' písmo, opačně - vyjmutí 'strikeout' písma</param>
        void Strikeout(bool isTrue = true);
    }
}
