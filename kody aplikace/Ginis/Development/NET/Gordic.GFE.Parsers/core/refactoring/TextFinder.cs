//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.TextFinder.cs                            </Name>
//    <Description> Abstraktní třída hledání textu                              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Refactoring
{
    /// <summary>
    /// Abstraktní třída hledání textu
    /// </summary>
    public abstract class TextFinder
    {
        /// <summary>
        /// Příprava vstupního textu
        /// </summary>
        /// <param name="inputText">Vstupní tetx</param>
        /// <returns></returns>
        public virtual string PrepareInputText(string inputText)
        {
            return inputText;
        }
        /// <summary>
        /// Hledání textu
        /// </summary>
        /// <param name="inputText">vstupní text</param>
        /// <param name="startPosition">startovní pozice</param>
        /// <returns></returns>
        public abstract TextFinderMatch Find(string inputText, int startPosition);
    }
}
