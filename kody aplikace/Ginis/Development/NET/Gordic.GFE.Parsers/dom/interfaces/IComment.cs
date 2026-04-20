//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IComment.cs                              </Name>
//    <Description> rozhraní komentářů                                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-07-03                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// rozhraní komentářů
    /// </summary>
    public interface IComment
    {
        /// <summary>
        /// Text komentáře
        /// </summary>
        string CommentText { get; set; }
        /// <summary>
        /// Název větve komentáře
        /// </summary>
        string TagName { get; set; }
    }
}
