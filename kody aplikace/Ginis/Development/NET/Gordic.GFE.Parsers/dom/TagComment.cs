//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.TagComment.cs                            </Name>
//    <Description> Komentář úkolu                                              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Binding;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Komentář úkolu
    /// </summary>
    public sealed class TagComment : Immutable
    {
        readonly string key;
        /// <summary>
        /// klíč
        /// </summary>
        public string Key { get { return key; } }

        readonly string commentString;
        readonly DomRegion region;
        /// <summary>
        /// text samotného komentáře
        /// </summary>
        public string CommentString { get { return commentString; } }

        /// <summary>
        /// region komentáře
        /// </summary>
        public DomRegion Region { get { return region; } }

        /// <summary>
        /// konstruktor třídy dle klíče a regionu
        /// </summary>
        /// <param name="key">klíč komentáře</param>
        /// <param name="region">region komentáře</param>
        public TagComment(string key, DomRegion region)
        {
            this.key = key;
            this.region = region;
        }
        /// <summary>
        /// úplný konstruktor třídy
        /// </summary>
        /// <param name="key">klíč komentáře</param>
        /// <param name="region">region komentáře</param>
        /// <param name="commentString">samotný text komentáře</param>
        public TagComment(string key, DomRegion region, string commentString)
        {
            this.key = key;
            this.region = region;
            this.commentString = commentString;
        }
    }
}
