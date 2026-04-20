//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IPositionable.cs                         </Name>
//    <Description> Pokud IViewContent objekt implementuje třídu IPositionable signalizuje to,</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-11                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Ovladač pozice
    /// </summary>
    public interface IPositionHandler
    {
        /// <summary>
        /// Začátek pozice
        /// </summary>
        int StartPosition { get; set; }
        /// <summary>
        /// Konec pozice
        /// </summary>
        int EndPosition { get; set; }

        /// <summary>
        /// typ objektu
        /// </summary>
        string PSType { get; }
        /// <summary>
        /// typ objektu
        /// </summary>
        bool IsInStyle { get; }

        /// <summary>
        /// indikuje, jestli stejný objekt může být vnořený
        /// </summary>
        bool CanBeSameANested { get; }
    }

    /// <summary>
    /// Pokud IViewContent objekt implementuje třídu IPositionable signalizuje to,
    /// že lze nastavit pozici v textu.
    /// </summary>
    public interface IPositionable
    {
        /// <summary>
        /// Nastavení posuvníka na určitou pozici, kde Y je řádek (začináje od 0).
        /// A X je sloupec (začínaje od 0 také).
        /// </summary>
        /// <param name="line">číslo řádku</param>
        /// <param name="column">číslo sloupce</param>
        void JumpTo(int line, int column);

        /// <summary>
        /// Získání pozici řádku posuvníka
        /// </summary>
        int Line { get; }

        /// <summary>
        /// POzice sloupce posuvníka
        /// </summary>
        int Column { get; }
    }
}
