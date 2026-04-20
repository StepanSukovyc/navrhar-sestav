//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.TextFinderMatch.cs                       </Name>
//    <Description> Shoda vyhledávaní textu                                     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Refactoring
{
    /// <summary>
    /// Shoda vyhledávaní textu
    /// </summary>
    public struct TextFinderMatch
    {
        /// <summary>
        /// pozice
        /// </summary>
        public readonly int Position;
        /// <summary>
        /// délka
        /// </summary>
        public readonly int Length;
        /// <summary>
        /// vyřešení pozice
        /// </summary>
        public readonly int ResolvePosition;
        /// <summary>
        /// prázdná hodnota
        /// </summary>
        public static readonly TextFinderMatch Empty = new TextFinderMatch(-1, 0);
        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="position">pozice</param>
        /// <param name="length">délka</param>
        public TextFinderMatch(int position, int length)
        {
            this.Position = position;
            this.Length = length;
            this.ResolvePosition = position;
        }
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="position">pozice</param>
        /// <param name="length">délka</param>
        /// <param name="resolvePosition">vyřešení pozice</param>
        public TextFinderMatch(int position, int length, int resolvePosition)
        {
            this.Position = position;
            this.Length = length;
            this.ResolvePosition = resolvePosition;
        }
    }
}
