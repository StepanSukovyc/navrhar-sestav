//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.GFEFormatContentText.cs                  </Name>
//    <Description> Textový content                                             </Description>
//    <Author>      Ing. Martin Aliger                                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025                  </Copyright>
//    <Created>     2009-08-20                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Textový content
    /// </summary>
    public class GFEFormatContentText : GFEFormatContent
    {
        readonly string m_text;
        /// <summary>
        /// Text
        /// </summary>
        public string Text
        {
            get { return m_text; }
        }

        internal GFEFormatContentText(GFEFormatRegion reg, Gordic.Report.Implementation.IGFormatContentText t, Gordic.Report.Implementation.IGFormatDevTools dev = null)
            : base(reg, (Gordic.Report.Implementation.IGFormatContent)t, dev)
        {
            t.getText(out m_text);
        }
    }
}
