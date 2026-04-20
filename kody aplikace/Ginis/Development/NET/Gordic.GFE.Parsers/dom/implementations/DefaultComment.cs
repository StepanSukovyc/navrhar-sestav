//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DefaultComment.cs                            </Name>
//    <Description> Komentáře                                                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// výchozí komentář.
    /// používá se při načtení globálního komentáře
    /// </summary>
    public class DefaultComment
    {
        /// <summary>
        /// indikuje, že se jedná o komentář změn
        /// </summary>
        public bool IsChanges { get; set; }

        string commentString;
        /// <summary>
        /// obsah komentáře
        /// </summary>
        public string CommentString { get { return commentString; } set { commentString = value; IsChanges = value.Contains("#ZMENY"); } }

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        /// <param name="comment">text komentáře</param>
        public DefaultComment(string comment) { CommentString = comment; }

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        /// <param name="comment">text komentáře</param>
        /// <param name="isChanges">indikuje, že se jedná o komentář změn</param>
        public DefaultComment(string comment, bool isChanges) { CommentString = comment; IsChanges = isChanges; }
    }
}
