//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.DomRegion.cs                           </Name>
//    <Description> místo zdrojového kódu                                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-26                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.Parsers.Refactoring;

namespace Gordic.GFE.Parsers.Binding
{
    /// <summary>
    /// místo ve zdrojovém kódu
    /// </summary>
    [Serializable]
    public struct DomRegion : IEquatable<DomRegion>
    {
        readonly int beginLine;
        readonly int endLine;
        readonly int beginColumn;
        readonly int endColumn;
        /// <summary>
        /// prázdné místo
        /// </summary>
        public readonly static DomRegion Empty = new DomRegion(-1, -1);
        /// <summary>
        /// indikuje, jestli místo je prázdné
        /// </summary>
        public bool IsEmpty { get { return BeginLine <= 0; } }
        /// <summary>
        /// začátek regionu
        /// </summary>
        public int BeginLine { get { return beginLine; } }
        /// <value>
        /// pokud koncový řádek je -1 a koncový sloupec je také -1
        /// je to neznámý konec
        /// </value>
        public int EndLine { get { return endLine; } }
        /// <summary>
        /// začáteční sloupec místa
        /// </summary>
        public int BeginColumn { get { return beginColumn; } }
        /// <value>
        /// pokudkoncový sloupec je -1 a koncový řádek je také -1
        /// to znamená, že mámé na koncí neznáme číslo
        /// </value>
        public int EndColumn { get { return endColumn; } }
        /// <summary>
        /// vytvoření místa z umístění
        /// </summary>
        /// <param name="start">začátek místa</param>
        /// <param name="end">konec místa</param>
        /// <returns>region z umístění</returns>
        public static DomRegion FromLocation(Location start, Location end)
        {
            return new DomRegion(start.Y, start.X, end.Y, end.X);
        }
        /// <summary>
        /// úplný konstruktor struktury
        /// </summary>
        /// <param name="beginLine">řádek začátku</param>
        /// <param name="beginColumn">počáteční sloupec</param>
        /// <param name="endLine">řádek konce</param>
        /// <param name="endColumn">koncový sloupec</param>
        public DomRegion(int beginLine, int beginColumn, int endLine, int endColumn)
        {
            this.beginLine = beginLine;
            this.beginColumn = beginColumn;
            this.endLine = endLine;
            this.endColumn = endColumn;
        }
        /// <summary>
        /// konstruktor bez konce struktury bez konce
        /// </summary>
        /// <param name="beginLine">řádek začátku</param>
        /// <param name="beginColumn">počáteční sloupec</param>
        public DomRegion(int beginLine, int beginColumn)
        {
            this.beginLine = beginLine;
            this.beginColumn = beginColumn;
            this.endLine = -1;
            this.endColumn = -1;
        }

        /// <remarks>
        /// Vrácí TRUE, pokud dané koordinaty <paramref name="row"/> a <paramref name="column"/> jsou v regionu.
        /// Tato metoda předpokládá, že neznamý konec má koncový řádek -1
        /// </remarks>
        /// <param name="row">řádek koordinaty</param>
        /// <param name="column">sloupec hledaného umístění</param>
        /// <returns>TRUE - pokud dané koordinaty jsou v regionu</returns>
        public bool IsInside(int row, int column)
        {
            if (IsEmpty)
                return false;
            return row >= BeginLine &&
                (row <= EndLine || EndLine == -1) &&
                (row != BeginLine || column >= BeginColumn) &&
                (row != EndLine || column <= EndColumn);
        }

        /// <summary>
        /// retězcová prezentace umístění
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return String.Format("[Region: BeginLine = {0}, EndLine = {1}, BeginColumn = {2}, EndColumn = {3}]",
                                 beginLine,
                                 endLine,
                                 beginColumn,
                                 endColumn);
        }

        /// <summary>
        /// porovnání regionů s objektem
        /// </summary>
        /// <param name="obj">objekt pro porovnání</param>
        /// <returns></returns>
        public override bool Equals(object obj)
        {
            return obj is DomRegion && Equals((DomRegion)obj);
        }
        /// <summary>
        /// kvůli ToString
        /// </summary>
        /// <returns></returns>
        public override int GetHashCode()
        {
            unchecked { return BeginColumn + 1100009 * BeginLine + 1200007 * BeginColumn + 1300021 * EndColumn; }
        }

        /// <summary>
        /// porvnání daného regionu s uvedeným
        /// </summary>
        /// <param name="other">uvedený region k porovnání</param>
        /// <returns></returns>
        public bool Equals(DomRegion other)
        {
            return BeginLine == other.BeginLine && BeginColumn == other.BeginColumn
                && EndLine == other.EndLine && EndColumn == other.EndColumn;
        }

        #region operátory
        /// <summary>
        /// rovnost dvou regionů
        /// </summary>
        /// <param name="lhs"></param>
        /// <param name="rhs"></param>
        /// <returns></returns>
        public static bool operator ==(DomRegion lhs, DomRegion rhs)
        {
            return lhs.Equals(rhs);
        }
        /// <summary>
        /// nerovnost dvou regionů
        /// </summary>
        /// <param name="lhs"></param>
        /// <param name="rhs"></param>
        /// <returns></returns>
        public static bool operator !=(DomRegion lhs, DomRegion rhs)
        {
            return !lhs.Equals(rhs);
        }
        #endregion
    }
}
