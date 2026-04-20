//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.GFEFormatComment.cs                      </Name>
//    <Description> Komentáø v ALF                                              </Description>
//    <Author>      Ing. Martin Aliger                                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025                  </Copyright>
//    <Created>     2010-07-13                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Komentáø v ALF
    /// </summary>
    public class GFEFormatComment : GFEFormatTag
    {
        readonly string m_text;

        /// <summary>
        /// Text komentare
        /// </summary>
        public string CommentText { get { return m_text; } }

        internal GFEFormatComment(GFEFormatRegion r, Gordic.Report.Implementation.IGFormatComment t, Gordic.Report.Implementation.IGFormatDevTools dev)
            : base(r, (Gordic.Report.Implementation.IGFormatTag)t, dev)
        {
            Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(t.getCommentText(out m_text));
        }

    }
}
