//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.Location.cs                              </Name>
//    <Description> Pozice řádek/sloupec.                                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using Gordic.General;
using System;

namespace Gordic.GFE.Parsers.Refactoring
{
    /// <summary>
    /// Pozice řádek/sloupec.
    /// </summary>
    public struct Location : IComparable<Location>, IEquatable<Location>
    {
        public static readonly Location Empty = new Location(-1, -1);

        public Location(int column, int line)
        {
            x = column;
            y = line;
        }

        int x, y;

        public int X
        {
            get { return x; }
            set { x = value; }
        }

        public int Y
        {
            get { return y; }
            set { y = value; }
        }

        public int Line
        {
            get { return y; }
            set { y = value; }
        }

        public int Column
        {
            get { return x; }
            set { x = value; }
        }

        public bool IsEmpty
        {
            get
            {
                return x <= 0 && y <= 0;
            }
        }

        public override string ToString()
        {
            return string.Format("(" + GResources.GetResourceText(29450229) + " {1}, " + GResources.GetResourceText(29450230) + " {0})", this.x, this.y); //RC 29450230 : sloupec
        }

        public override int GetHashCode()
        {
            return unchecked(87 * x.GetHashCode() ^ y.GetHashCode());
        }

        public override bool Equals(object obj)
        {
            if (!(obj is Location)) return false;
            return (Location)obj == this;
        }

        public bool Equals(Location other)
        {
            return this == other;
        }

        public static bool operator ==(Location a, Location b)
        {
            return a.x == b.x && a.y == b.y;
        }

        public static bool operator !=(Location a, Location b)
        {
            return a.x != b.x || a.y != b.y;
        }

        public static bool operator <(Location a, Location b)
        {
            if (a.y < b.y)
                return true;
            else if (a.y == b.y)
                return a.x < b.x;
            else
                return false;
        }

        public static bool operator >(Location a, Location b)
        {
            if (a.y > b.y)
                return true;
            else if (a.y == b.y)
                return a.x > b.x;
            else
                return false;
        }

        public static bool operator <=(Location a, Location b)
        {
            return !(a > b);
        }

        public static bool operator >=(Location a, Location b)
        {
            return !(a < b);
        }

        public int CompareTo(Location other)
        {
            if (this == other)
                return 0;
            if (this < other)
                return -1;
            else
                return 1;
        }
    }
}
