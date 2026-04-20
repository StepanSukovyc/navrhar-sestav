//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.GFEFormatContentImage.cs                 </Name>
//    <Description> Obrázkový content                                           </Description>
//    <Author>      Ing. Martin Aliger                                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025                  </Copyright>
//    <Created>     2009-08-20                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Obrázkový content
    /// </summary>
    public class GFEFormatContentImage : GFEFormatContent
    {
        readonly string m_ifname;
        GFEUnit m_width;
        GFEUnit m_height;

        /// <summary>
        /// Soubor s obrázkem
        /// </summary>
        public string ImageFileName
        {
            get { return m_ifname; }
        }

        /// <summary>
        /// šíøka obrázku
        /// </summary>
        public GFEUnit ImageWidth
        {
            get { return m_width; }
        }

        /// <summary>
        /// výška obrázku
        /// </summary>
        public GFEUnit ImageHeight
        {
            get { return m_height; }
        }

        internal GFEFormatContentImage(GFEFormatRegion reg, Gordic.Report.Implementation.IGFormatContentImage t, Gordic.Report.Implementation.IGFormatDevTools dev)
            : base(reg, (Gordic.Report.Implementation.IGFormatContent)t, dev)
        {
            t.getImageFile(out m_ifname);
            t.getImageWidth(out m_width.met, out m_width.mtr);
            t.getImageHeight(out m_height.met, out m_height.mtr);
        }
    }
}
