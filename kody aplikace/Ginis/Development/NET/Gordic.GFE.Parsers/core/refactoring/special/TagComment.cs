//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.TagComment.cs                            </Name>
//    <Description> větev komentáře.                                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-08-02                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Refactoring.Special
{
    /// <summary>
    /// větev komentáře.	
    /// </summary>
    public class TagComment : Comment
    {
        string tag;
        /// <summary>
        /// větev
        /// </summary>
        public string Tag
        {
            get { return tag; }
            set { tag = value; }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="tag"></param>
        /// <param name="comment"></param>
        /// <param name="commentStartsLine"></param>
        /// <param name="startPosition"></param>
        /// <param name="endPosition"></param>
        public TagComment(string tag, string comment, bool commentStartsLine, Location startPosition, Location endPosition)
            : base(CommentType.SingleLine, comment, commentStartsLine, startPosition, endPosition)
        {
            this.tag = tag;
        }
    }
}
