//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.BackgroundImage.cs                       </Name>
//    <Description> obrázek pozadí                                              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-07-01                                                  </Created>
//  </FileHeader>

using System.ComponentModel;
using System.Drawing;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// obrázek pozadí
    /// </summary>
    public class BackgroundImage
    {
        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="image">obrázek</param>
        /// <param name="fileName">soubor obrázku</param>
        public BackgroundImage(System.Drawing.Image image, string fileName)
            : this(image, RotateType.RotateNoneFlipNone, false, false, fileName)
        {
        }
        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="image">obrázek</param>
        /// <param name="rotateType">tzp rotace obrázku</param>
        /// <param name="stretch">zúžení obrázku</param>
        /// <param name="coated">roztažení obrázkus</param>
        /// <param name="fileName">soubor obrázku</param>
        public BackgroundImage(System.Drawing.Image image, RotateType rotateType, bool stretch, bool coated, string fileName = "")
        {
            this.Image = image;
            this.Rotate = rotateType;
            this.Stretch = stretch;
            this.Coated = coated;
            this.ImageFile = fileName;
        }
        /// <summary>
        /// vytvoření kopii uvedeného obrázku
        /// </summary>
        /// <param name="backImage">Informace o obrázku</param>
        public BackgroundImage(BackgroundImage backImage)
        {
            if (backImage != null)
            {
                Image = backImage.Image != null ? new Bitmap(backImage.Image) : null;
                Rotate = backImage.Rotate;
                Stretch = backImage.Stretch;
                Coated = backImage.Coated;
                ImageFile = backImage.ImageFile;
            }
        }
        /// <summary>
        /// Obrázek pozadí
        /// </summary>
        public Image Image { get; set; }

        /// <summary>
        /// Indikuje, zda komponenta mění svou velikost dle obrázku, nebo ne
        /// </summary>
        [Description("Indikuje roztažení regionu na velikost obrázku")]
        [TypeConverter(typeof(BooleanTypeConverter))]
        public bool Coated { get; set; }
        /// <summary>
        /// Indikuje, zda obrázek vyplní celou plochu nebo zda zachová původní velikost
        /// </summary>
        [DisplayName("obrázek dle regionu")]
        [Description("Indikuje roztažení obrázku na celou plochu komponenty")]
        [TypeConverter(typeof(BooleanTypeConverter))]
        public bool Stretch { get; set; }
        /// <summary>
        /// Rotace obrázku
        /// </summary>
        [DisplayName("rotace")]
        [Description("Rotace obrázku komponenty")]
        public RotateType Rotate { get; set; }

        /// <summary>
        /// Úplná cesta k dočasnému souboru obrázku
        /// </summary>
        public string ImageFile { get; set; }

    }
}
