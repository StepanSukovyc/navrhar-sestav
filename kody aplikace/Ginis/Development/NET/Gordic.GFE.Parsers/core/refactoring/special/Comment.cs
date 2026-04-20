//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.Comment.cs                               </Name>
//    <Description> komentář specálu                                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-08-02                                                  </Created>
//  </FileHeader>

using Gordic.General;
using System;

namespace Gordic.GFE.Parsers.Refactoring.Special
{
    /// <summary>
    /// typy komentáře
    /// </summary>
    public enum CommentType
    {
        /// <summary>
        /// prázdný
        /// </summary>
        Block,
        /// <summary>
        /// jednoduchý řádek
        /// </summary>
        SingleLine
    }
    /// <summary>
    /// komentář specálu
    /// </summary>
    public class Comment : AbstractSpecial
    {
        CommentType commentType;
        string comment;
        /// <summary>
        /// typ komentáře
        /// </summary>
        public CommentType CommentType
        {
            get { return commentType; }
            set { commentType = value; }
        }
        /// <summary>
        /// text komentáře
        /// </summary>
        public string CommentText
        {
            get { return comment; }
            set { comment = value; }
        }

        /// <value>
        /// TRUE, pokud komentář je na začátku řádky nebo prázdné místo mezí 
        /// řádkem a začátkem komentáře
        /// </value>
        public bool CommentStartsLine { get; set; }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="commentType"></param>
        /// <param name="comment"></param>
        /// <param name="commentStartsLine"></param>
        /// <param name="startPosition"></param>
        /// <param name="endPosition"></param>
        public Comment(CommentType commentType, string comment, bool commentStartsLine, Location startPosition, Location endPosition)
            : base(startPosition, endPosition)
        {
            this.commentType = commentType;
            this.comment = comment;
            this.CommentStartsLine = commentStartsLine;
        }
        /// <exclude/>
        public override string ToString()
        {
            return String.Format(string.Join(" ", "[{0}:", GResources.GetResourceText(29450231), "={1};", GResources.GetResourceText(29450232), "={2};", GResources.GetResourceText(29450227), "={3};", GResources.GetResourceText(29450174), "={4}]"), //RC 29450174 : konec
                                 GetType().Name, CommentType, CommentText, StartPosition, EndPosition);
        }
        /// <summary>
        /// akceptace návštěvy
        /// </summary>
        /// <param name="visitor"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        public override object AcceptVisitor(ISpecialVisitor visitor, object data)
        {
            return visitor.Visit(this, data);
        }
    }
}
