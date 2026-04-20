//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        GFEFormat.cs                                </Name>
//    <Description> Parser formatu (ALF)                        </Description>
//    <Author>      Ing. Martin Aliger                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025  </Copyright>
//    <Created>     2006-10-05                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// 
    /// </summary>
    public class GFEFormatRTF : GFEFormat
    {
        readonly string m_template;
        /// <summary>
        /// 
        /// </summary>
        public string TemplateName { get { return m_template; } }

        internal GFEFormatRTF(Gordic.Report.Implementation.IGFormatRTF fmt, GFETempDir temp)
            : base((Gordic.Report.Implementation.IGFormat)fmt, temp)
        {
            fmt.getTemplate(out m_template);
        }

    }
}
