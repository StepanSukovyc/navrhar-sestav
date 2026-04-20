//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        GFEFormatRTFRtf.cs                          </Name>
//    <Description> Parser formatu (ALF) - øádek RTF            </Description>
//    <Author>      Ing. Martin Aliger                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025  </Copyright>
//    <Created>     2006-11-28                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// 
    /// </summary>
    public class GFEFormatRTFRtf : GFEFormatTag
    {
        readonly string m_rtf;

        /// <summary>
        /// 
        /// </summary>
        public string RTF { get { return m_rtf; } }

        internal GFEFormatRTFRtf(GFEFormatRegion reg, Gordic.Report.Implementation.IGFormatRTFRTF rtf, Gordic.Report.Implementation.IGFormatDevTools dev)
            : base(reg, (Gordic.Report.Implementation.IGFormatTag)rtf, dev)
        {
            rtf.getRTF(out m_rtf);
        }
    }
}
