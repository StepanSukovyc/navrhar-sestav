//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IBarcode.cs                              </Name>
//    <Description> rozhraní pro práci s čárovými kódy                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-07-16                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Dom;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// rozhraní pro práci s čárovými kódy
    /// </summary>
    public interface IBarcode
    {
        /// <summary>
        /// vnítřek čárového kódu
        /// </summary>
        ITextHandler Textable { get; set; }
        /// <summary>
        /// indikuje, že text lze změnít bez přetažení datové položky
        /// </summary>
        bool Editable { get; }
        /// <summary>
        /// Typ barcode
        /// </summary>
        BarcodeTypeEnum Type{ get; set; }
        /// <summary>
        /// První hodnota
        /// </summary>
        int O1 { get; set; }
        /// <summary>
        /// Druhá hodnota
        /// </summary>
        int O2 { get; set; }
        /// <summary>
        /// Třetí hodnota
        /// </summary>
        int O3 { get; set; }
        /// <summary>
        /// text čárového kódu
        /// </summary>
        string Text { get; set; }
    }
}
