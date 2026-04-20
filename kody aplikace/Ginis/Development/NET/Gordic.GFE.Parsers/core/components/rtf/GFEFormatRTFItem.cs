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
    public class GFEFormatRTFItem : GFEFormatTag
    {
        readonly Report.Implementation.Grr06RTFInstance m_instance;
        readonly string m_type;
        readonly string m_format;

        /// <summary>
        /// 
        /// </summary>
        public Gordic.Report.Implementation.Grr06RTFInstance Instance
        {
            get { return m_instance; }
        }

        /// <summary>
        /// 
        /// </summary>
        public string Type { get { return m_type; } }

        /// <summary>
        /// 
        /// </summary>
        public string Format { get { return m_format; } }

        internal GFEFormatRTFItem(GFEFormatRegion reg, Gordic.Report.Implementation.IGFormatRTFItem item, Gordic.Report.Implementation.IGFormatDevTools dev)
            : base(reg, (Gordic.Report.Implementation.IGFormatTag)item, dev)
        {
	        item.getInstance(out m_instance);
            item.getType(out m_type);
            item.getRTFFormat(out m_format);
        }
    }
}
