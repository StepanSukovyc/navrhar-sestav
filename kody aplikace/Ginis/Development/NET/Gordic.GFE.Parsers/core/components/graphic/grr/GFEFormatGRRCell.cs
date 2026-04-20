//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        GFEFormatGRRCell.cs                         </Name>
//    <Description> Parser formatu (ALF) - bunka GRR            </Description>
//    <Author>      Ing. Martin Aliger                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025  </Copyright>
//    <Created>     2006-10-05                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// buòka GRR formátu
    /// </summary>
    public class GFEFormatGRRCell : GFEFormatContainer
    {
        GFEUnit m_width;
        GFEUnit m_height;
        /// <summary>
        /// 
        /// </summary>
        public GFEUnit Width { get { return m_width; } }

        /// <summary>
        /// 
        /// </summary>
        public GFEUnit Height { get { return m_height; } }

        /// <summary>
        /// konstruktor tøídy
        /// </summary>
        /// <param name="reg"></param>
        /// <param name="cell"></param>
        /// <param name="dev"></param>
        public GFEFormatGRRCell(Gordic.Report.Implementation.IGFormatGRRCell cell, GFEFormatRegion reg = null, Gordic.Report.Implementation.IGFormatDevTools dev = null)
            : base(reg, (Gordic.Report.Implementation.IGFormatContainer)cell, dev)
        {
            cell.getWidth(out m_width.met, out m_width.mtr);
            cell.getHeight(out m_height.met, out m_height.mtr);
        }
    }
}
