//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IImage.cs                                </Name>
//    <Description> Typ rozměru obrázku                                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System.ComponentModel;
using System.Drawing;
using Gordic.GFE.Parsers.Utils;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Typ rozměru obrázku
    /// </summary>
    [TypeConverter(typeof(ImageSizeValueTypeConverter))]
    public enum ImageSizeValueType
    {
        /// <summary>
        /// Dle rozměrů buňky
        /// </summary>
        cell = 0,
        /// <summary>
        /// Dle rozlišení obrázku
        /// </summary>
        image = 1,
        /// <summary>
        /// Specifikovat rozměry
        /// </summary>
        spec = 2
    }

    /// <summary>
    /// Rozhraní objektů obsahujících obrázek
    /// </summary>
    public interface IImage
    {
        /// <summary>
        /// Výška obrázku
        /// </summary>
        SizeValue ContentImageHeight { get; set; }
        /// <summary>
        /// šířka obrázku
        /// </summary>
        SizeValue ContentImageWidth { get; set; }
        /// <summary>
        /// Je globální nebo není
        /// </summary>
        bool Global { get; set; }
        /// <summary>
        /// Obrázek
        /// </summary>
        Image Image { get; set; }
        /// <summary>
        /// Název obrázku (může být i cesta k souboru)
        /// </summary>
        string ImageFileName { get; set; }
        /// <summary>
        /// Typ velikosti šířky obrázku
        /// </summary>
        ImageSizeValueType WidthSizeType { get; set; }
        /// <summary>
        /// Typ velikosti výšky obrázku
        /// </summary>
        ImageSizeValueType HeightSizeType { get; set; }
    }
}
