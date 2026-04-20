//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.TokenObject.cs                           </Name>
//    <Description> třída klíčového slova                                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-08-26                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Refactoring;
using Gordic.GFE.Parsers.Services;

namespace Gordic.GFE.Parsers.Lexer
{
    /// <summary>
    /// třída klíčového slova
    /// </summary>
    public class TokenObject
    {
        readonly int imageIndex = ClassBrowserIconService.AttributeIndex;
        /// <summary>
        /// index obrázku slova
        /// </summary>
        public int ImageIndex { get { return imageIndex; } }

        readonly string word;
        /// <summary>
        /// klíčové slovo
        /// </summary>
        public string Word { get { return word; } }

        readonly string desc;
        /// <summary>
        /// popis klíčového slova
        /// </summary>
        public string Description { get { return desc; } }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="word">klíčové slovo</param>
        /// <param name="imageIndex">index obrázku klíčového slova</param>
        /// <param name="desc">popis klíčového slova</param>
        public TokenObject(string word, int imageIndex, string desc)
        {
            this.word = word;
            this.imageIndex = imageIndex;
            this.desc = desc;
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="item">položka klíčového slova</param>
        /// <param name="imageIndex">index obrázku klíčového slova</param>
        public TokenObject(TokenItem item, int imageIndex = ClassBrowserIconService.AttributeIndex)
        {
            this.word = item.Word;
            this.imageIndex = imageIndex;
            this.desc = item.Description;
        }
    }
}
