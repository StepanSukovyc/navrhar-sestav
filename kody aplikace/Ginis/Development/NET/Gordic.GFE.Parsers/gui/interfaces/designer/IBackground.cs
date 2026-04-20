//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IBackground.cs                           </Name>
//    <Description> Rozhraní pro práci s pozadím objektu                        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System.ComponentModel;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// chování se obrázku pozadí
    /// </summary>
    [TypeConverter(typeof(ImageStretchConverter))]
    public enum ImageStretch
    {
        /// <summary>
        /// žádná akce
        /// </summary>
        None = 0,
        /// <summary>
        /// roztažení objektu dle obrázku
        /// </summary>
        ByImage = 1,
        /// <summary>
        /// roztažení obrázku dle objektu
        /// </summary>
        ByObject = 2
    }

    /// <summary>
    /// Rozhraní pro práci s pozadím objektu
    /// </summary>
    public interface IBackground
    {
        /// <summary>
        /// Barva pozadí
        /// </summary>
        IComplexColor BackColor { get; set; }
        
        /// <summary>
        /// obrázek pozadí
        /// </summary>
        BackgroundImage BackImage { get; set; }

        /// <summary>
        /// Indikuje zobrazení pozadí
        /// </summary>
        bool ShowBackground { get; set; }

        /// <summary>
        /// chování se obrázku pozadí
        /// </summary>
        ImageStretch BackImageStretch { get; set; }
    }
}
