//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.SpecialTracker.cs                        </Name>
//    <Description> speciální třída lexeru                                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-08-02                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;
using Gordic.GFE.Parsers.Refactoring.Special;

namespace Gordic.GFE.Parsers.Refactoring.Parser
{
    /// <summary>
    /// speciální třída lexeru
    /// </summary>
    public class SpecialTracker
    {
        List<ISpecial> currentSpecials = new List<ISpecial>();

        CommentType currentCommentType;
        StringBuilder sb = new StringBuilder();
        Location startPosition;
        bool commentStartsLine;

        /// <summary>
        /// seznam speciálních objektů
        /// </summary>
        public List<ISpecial> CurrentSpecials { get { return currentSpecials; } }

        /// <summary>
        /// získání speciálních objektů SpecialTracker a aktualizace seznamus.
        /// </summary>
        public List<ISpecial> RetrieveSpecials()
        {
            List<ISpecial> tmp = currentSpecials;
            currentSpecials = new List<ISpecial>();
            return tmp;
        }

        /// <summary>
        /// přidání konce řádku
        /// </summary>
        /// <param name="point">pozice přidání</param>
        public void AddEndOfLine(Location point)
        {
            currentSpecials.Add(new BlankLine(point));
        }
        /// <summary>
        /// přidání speciální směrnice
        /// </summary>
        /// <param name="directive">směrnice k přidání</param>
        public void AddPreprocessingDirective(PreprocessingDirective directive)
        {
            if (directive == null)
                throw new ArgumentNullException("directive");
            currentSpecials.Add(directive);
        }

        /// <summary>
        /// používá se pro komentáře
        /// </summary>
        /// <param name="commentType"></param>
        /// <param name="commentStartsLine"></param>
        /// <param name="startPosition"></param>
        public void StartComment(CommentType commentType, bool commentStartsLine, Location startPosition)
        {
            this.currentCommentType = commentType;
            this.startPosition = startPosition;
            this.sb.Length = 0;
            this.commentStartsLine = commentStartsLine;
        }
        /// <summary>
        /// přidání symbolu
        /// </summary>
        /// <param name="c">přidávaný symbol</param>
        public void AddChar(char c) { sb.Append(c); }
        /// <summary>
        /// přidání řádku
        /// </summary>
        /// <param name="s">přidávaný řádek</param>
        public void AddString(string s) { sb.Append(s); }
        /// <summary>
        /// konec komentáře
        /// </summary>
        /// <param name="endPosition">pozice konce komentáře</param>
        public void FinishComment(Location endPosition)
        {
            currentSpecials.Add(new Comment(currentCommentType, sb.ToString(), commentStartsLine, startPosition, endPosition));
        }
    }
}
