//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        GFEFormatUnknown.cs                         </Name>
//    <Description> Parser formátu (ALF) - vráceno pro neznámé  </Description>
//    <Author>      Ing. Martin Aliger                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025  </Copyright>
//    <Created>     2006-10-05                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Parser formátu (ALF) - vráceno pro neznámé
    /// </summary>
    public class GFEFormatUnknownContent : GFEFormatContent
    {
        readonly string m_Text;
        ///<summary>Text v elementu</summary>
        public string InnerText { get { return m_Text; } }

        /// <exclude/>
        internal GFEFormatUnknownContent(GFEFormatRegion r, Gordic.Report.Implementation.IGFormatContent t, Gordic.Report.Implementation.IGFormatDevTools dev)
            : base(r, t, dev)
        {
            if (t is Gordic.Report.Implementation.IGFormatTag2 t2)
            {
                t2.getInnerText(out m_Text);
            }
        }
    }
}
