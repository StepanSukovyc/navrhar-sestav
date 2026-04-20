//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.FilePosition.cs                          </Name>
//    <Description> pozice v souboru                                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-07-26                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.Parsers.Refactoring;
using Gordic.General;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// pozice v souboru
    /// </summary>
    public struct FilePosition : IEquatable<FilePosition>
    {
        string filename;
        Location position;
        readonly ICompilationUnit compilationUnit;

        /// <summary>
        /// název souboru
        /// </summary>
        public string FileName { get { return filename; } }

        /// <summary>
        /// kompilační jednotka
        /// </summary>
        public ICompilationUnit CompilationUnit { get { return compilationUnit; } }

        /// <summary>
        /// pozice
        /// </summary>
        public Location Position { get { return position; } }

        /// <summary>
        /// řádek
        /// </summary>
        public int Line { get { return position.Y; } }
        
        /// <summary>
        /// sloupec
        /// </summary>
        public int Column { get { return position.X; } }

        /// <summary>
        /// indikuje, jestli objekt je prázdný
        /// </summary>
        public bool IsEmpty { get { return filename == null; } }

        /// <summary>
        /// prázdná pozice
        /// </summary>
        public static readonly FilePosition Empty = new FilePosition(null, Location.Empty);

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        /// <param name="compilationUnit">kompilovaná jednotka</param>
        /// <param name="line">řádek</param>
        /// <param name="column">sloupec</param>
        public FilePosition(ICompilationUnit compilationUnit, int line, int column)
        {
            this.position = new Location(column, line);
            this.compilationUnit = compilationUnit;
            if (compilationUnit != null)
                this.filename = compilationUnit.FileName;
            else
                this.filename = null;
        }

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        /// <param name="filename">název souboru</param>
        public FilePosition(string filename)
            : this(filename, Location.Empty)
        {
        }

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        /// <param name="filename">název souboru</param>
        /// <param name="line">řádek</param>
        /// <param name="column">sloupec</param>
        public FilePosition(string filename, int line, int column)
            : this(filename, new Location(column, line))
        {
        }

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        /// <param name="filename">název souboru</param>
        /// <param name="position">pozice</param>
        public FilePosition(string filename, Location position)
        {
            this.compilationUnit = null;
            this.filename = filename;
            this.position = position;
        }

        /// <summary>
        /// řetězcová prezentace daného objektu
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return String.Format("{0} : (" + GResources.GetResourceText(29450229) + " {1}, " + GResources.GetResourceText(29450230) + " {2})", //RC 29450229 : řádek
                                 filename,
                                 Line,
                                 Column);
        }

        /// <exclude/>
        public override bool Equals(object obj)
        {
            return obj is FilePosition && Equals((FilePosition)obj);
        }

        /// <exclude/>
        public bool Equals(FilePosition other)
        {
            return this.FileName == other.FileName && this.Position == other.Position;
        }

        /// <exclude/>
        public override int GetHashCode()
        {
            return filename.GetHashCode() ^ position.GetHashCode();
        }

        /// <exclude/>
        public static bool operator ==(FilePosition lhs, FilePosition rhs)
        {
            return lhs.Equals(rhs);
        }

        /// <exclude/>
        public static bool operator !=(FilePosition lhs, FilePosition rhs)
        {
            return !lhs.Equals(rhs);
        }
    }
}
