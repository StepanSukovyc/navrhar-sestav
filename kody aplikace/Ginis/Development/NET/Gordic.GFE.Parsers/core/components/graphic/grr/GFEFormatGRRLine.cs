//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        GFEFormatGRRLine.cs                         </Name>
//    <Description> Parser formatu (ALF) - bunka GRR            </Description>
//    <Author>      Ing. Martin Aliger                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025  </Copyright>
//    <Created>     2006-10-05                                  </Created>
//  </FileHeader>

using System.Collections.Generic;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// 
    /// </summary>
    public class GFEFormatGRRLine : GFEFormatContainer
    {
        readonly Gordic.Report.Implementation.Grr06PagingEvent m_evt;
        List<GFEFormatGRRCell> m_cells;

        /// <summary>
        /// 
        /// </summary>
        public List<GFEFormatGRRCell> Cells { get { return m_cells; } }

        /// <summary>
        /// 
        /// </summary>
        public Gordic.Report.Implementation.Grr06PagingEvent PagingEvent { get { return m_evt; } }

        internal GFEFormatGRRLine(GFEFormatRegion reg, Gordic.Report.Implementation.IGFormatGRRLine line, Gordic.Report.Implementation.IGFormatDevTools dev)
            : base(reg, (Gordic.Report.Implementation.IGFormatContainer)line, dev)
        {
            line.getCellCount(out int l_cnt);
            m_cells = new List<GFEFormatGRRCell>(l_cnt);
            foreach (GFEFormatTag t in Children)
                if (t is GFEFormatGRRCell) m_cells.Add((GFEFormatGRRCell)t); // end if
            //System.Diagnostics.Debug.Assert(l_cnt == m_cells.Count);
            line.getPagingEvent(out m_evt);
        }
    }
}
