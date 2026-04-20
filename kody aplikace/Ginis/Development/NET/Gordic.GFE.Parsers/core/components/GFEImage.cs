//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GFEImage.cs                            </Name>
//    <Description> Drží informace o obrázku                                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025                  </Copyright>
//    <Created>     2011-03-25                                                  </Created>
//  </FileHeader>

using System;
using System.Drawing;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Drží informace o obrázku
    /// </summary>
    public class GFEImage
    {
        Image m_image;
        /// <summary>
        /// Obrázek
        /// </summary>
        public Image Image { get { return m_image; } }

        /// <summary>
        /// Rotace obrázku
        /// </summary>
        public RotateType Rotate { get; set; }

        /// <summary>
        /// Vlastnost, která říká, zda obrázek vyplní celou plochu nebo zda zachová původní velikost
        /// </summary>
        public bool Stretch { get; set; }

        /// <summary>
        /// Vlastnost, která říká, zda komponenta změní velikost dle obrázku
        /// </summary>
        public bool Coated { get; set; }

        /// <summary>
        /// Úplná cesta k dočasnému souboru obrázku
        /// </summary>
        public String FileName { get; set; }

        /// <summary>
        /// Konstruktor třídy s prázdným parametrem
        /// </summary>
        public GFEImage()
        {
            Stretch = true;
            Rotate = RotateType.RotateNoneFlipNone;
        }

        /// <summary>
        /// Konstruktor třídy dle originálu dané třídy (kopíruje vlastnosti originálu)
        /// </summary>
        /// <param name="orig">Originál</param>
        public GFEImage(GFEImage orig)
        {
            //Pokud existuje obrázek, pak ho nakopírujme 
            if (orig.Image != null)
                SetImage(new Bitmap(orig.Image));

            Rotate = orig.Rotate;
            Stretch = orig.Stretch;
            Coated = orig.Coated;
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="image">Obrázek</param>
        public GFEImage(Image image)
            : this()
        {
            SetImage(image);
        }

        /// <summary>
        /// Nastavení obrázku pozadí
        /// </summary>
        /// <param name="image">Nastavovaný obrázek</param>
        public void SetImage(Image image)
        {
            if (m_image != null)
                m_image.Dispose();
            m_image = image;
        }

        /// <summary>
        /// Aby se nezobrazoval název třídy v tabulce vlastnosti
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return string.Empty;
        }

        /// <summary>
        /// Jenom kvůli tomu, že je přetížená metoda ToString()
        /// </summary>
        /// <returns></returns>
        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

        /// <summary>
        /// Uvolnění objektu
        /// </summary>
        public void Dispose()
        {
            if (Image != null)
                Image.Dispose();
            FileName = string.Empty;            
        }
    }
}
