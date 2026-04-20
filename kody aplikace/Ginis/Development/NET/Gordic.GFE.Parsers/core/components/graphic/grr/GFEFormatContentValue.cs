//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.GFEFormatContentValue.cs                 </Name>
//    <Description> Hodnotový content                                           </Description>
//    <Author>      Ing. Martin Aliger                                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025                  </Copyright>
//    <Created>     2009-08-20                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Hodnotový content
    /// </summary>
    public class GFEFormatContentValue : GFEFormatContent
    {
        readonly string m_dname;
        /// <summary>
        /// Text
        /// </summary>
        public string DataName
        {
            get { return m_dname; }
        }

        internal GFEFormatContentValue(GFEFormatRegion reg, Gordic.Report.Implementation.IGFormatContentValue t, Gordic.Report.Implementation.IGFormatDevTools dev = null)
            : base(reg, (Gordic.Report.Implementation.IGFormatContent)t, dev)
        {
            t.getDataName(out m_dname);
        }

        public override string ToString()
        {
            if (string.IsNullOrEmpty(DataName)) return base.ToString();
            return StringFromTag(TagName + " name=" + DataName);
        }
    }
}
