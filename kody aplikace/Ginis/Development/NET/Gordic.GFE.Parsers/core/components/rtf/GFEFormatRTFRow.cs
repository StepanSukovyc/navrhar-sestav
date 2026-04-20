//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.GFEFormatRTFRow.cs                       </Name>
//    <Description> Parser formatu (ALF) - øádek RTF                            </Description>
//    <Author>      Ing. Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2006-11-28                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// 
    /// </summary>
    public class GFEFormatRTFRow : GFEFormatTag
    {
        readonly Gordic.Report.Implementation.Grr06RTFSectAfter m_sect;

        /// <summary>
        /// 
        /// </summary>
        public Gordic.Report.Implementation.Grr06RTFSectAfter SectionAfter
        {
            get { return m_sect; }
        }

        internal GFEFormatRTFRow(GFEFormatRegion reg, Gordic.Report.Implementation.IGFormatRTFRow row, Gordic.Report.Implementation.IGFormatDevTools dev)
            : base(reg, (Gordic.Report.Implementation.IGFormatTag)row, dev)
        {
            row.getSectAfter(out m_sect);
        }
    }
}
