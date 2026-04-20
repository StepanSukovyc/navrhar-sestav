// <file>
//     <copyright see="prj:///doc/copyright.txt"/>
//     <license see="prj:///doc/license.txt"/>
//     <owner name="Mike Krüger" email="mike@icsharpcode.net"/>
//     <version>$Revision$</version>
// </file>

using System;

namespace Gordic.TextEditor.Document
{
    /// <summary>
    /// typy skládacích jednotek
    /// </summary>
    public enum FoldType
    {
        /// <summary>
        /// nespecifikovaný
        /// </summary>
        Unspecified,
        /// <summary>
        /// člen těla
        /// </summary>
        MemberBody,
        /// <summary>
        /// region
        /// </summary>
        Region,
        /// <summary>
        /// tělo
        /// </summary>
        TypeBody
    }

    /// <summary>
    /// jednotka skládací strategie
    /// </summary>
    public class FoldMarker : AbstractSegment, IComparable
    {
        FoldType foldType = FoldType.Unspecified;
        /// <summary>
        /// typ objektu
        /// </summary>
        public FoldType FoldType
        {
            get { return foldType; }
            set { foldType = value; }
        }

        int startLine = -1;
        /// <summary>
        /// řádek začátku skládacího objektu
        /// </summary>
        public int StartLine
        {
            get
            {
                if (startLine < 0)
                    GetPointForOffset(document, offset, out startLine, out startColumn);
                return startLine;
            }
        }

        int startColumn = -1;
        /// <summary>
        /// sloupec začátku skládacího objektu
        /// </summary>
        public int StartColumn
        {
            get
            {
                if (startLine < 0)
                    GetPointForOffset(document, offset, out startLine, out startColumn);
                return startColumn;
            }
        }

        int endLine = -1;
        /// <summary>
        /// řádek konce skládacího objektu
        /// </summary>
        public int EndLine
        {
            get
            {
                if (endLine < 0)
                    GetPointForOffset(document, offset + length, out endLine, out endColumn);
                return endLine;
            }
        }

        int endColumn = -1;
        /// <summary>
        /// sloupec konce skládacího objektu
        /// </summary>
        public int EndColumn
        {
            get
            {
                if (endLine < 0)
                    GetPointForOffset(document, offset + length, out endLine, out endColumn);
                return endColumn;
            }
        }

        /// <summary>
        /// offset začátku skládacího objektu
        /// </summary>
        public override int Offset
        {
            get { return base.Offset; }
            set
            {
                base.Offset = value;
                startLine = -1; endLine = -1;
            }
        }

        /// <summary>
        /// délka skládacího objektu
        /// </summary>
        public override int Length
        {
            get { return base.Length; }
            set
            {
                base.Length = value;
                endLine = -1;
            }
        }

        bool isFolded = false;
        /// <summary>
        /// indikuje, jestli skládací objekt je, či není složen
        /// </summary>
        public bool IsFolded
        {
            get { return isFolded; }
            set { isFolded = value; }
        }

        string foldText = "...";
        /// <summary>
        /// text složeného skládacího objektu
        /// </summary>
        public string FoldText { get { return foldText; } }

        /// <summary>
        /// celý text skládacího objektu
        /// </summary>
        public string InnerText { get { return document.GetText(offset, length); } }

        object bind;
        /// <summary>
        /// vázaný objekt
        /// </summary>
        public object Bind { get { return bind; } }
        IDocument document = null;
        /// <summary>
        /// konstruktor třídy
        /// </summary>
        /// <param name="document">dokument</param>
        /// <param name="offset">offset začátku</param>
        /// <param name="length">délka</param>
        /// <param name="foldText">text objektu</param>
        /// <param name="isFolded">indikátor složení</param>
        public FoldMarker(IDocument document, int offset, int length, string foldText, bool isFolded)
        {
            this.document = document;
            this.offset = offset;
            this.length = length;
            this.foldText = foldText;
            this.isFolded = isFolded;
        }

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        /// <param name="document"></param>
        /// <param name="startLine"></param>
        /// <param name="startColumn"></param>
        /// <param name="endLine"></param>
        /// <param name="endColumn"></param>
        public FoldMarker(IDocument document, int startLine, int startColumn, int endLine, int endColumn)
            : this(document, startLine, startColumn, endLine, endColumn, FoldType.Unspecified)
        {
        }
        /// <summary>
        /// konstruktor třídy
        /// </summary>
        /// <param name="document"></param>
        /// <param name="startLine"></param>
        /// <param name="startColumn"></param>
        /// <param name="endLine"></param>
        /// <param name="endColumn"></param>
        /// <param name="foldType"></param>
        public FoldMarker(IDocument document, int startLine, int startColumn, int endLine, int endColumn, FoldType foldType)
            : this(document, startLine, startColumn, endLine, endColumn, foldType, "...")
        {
        }

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        /// <param name="document"></param>
        /// <param name="startLine"></param>
        /// <param name="startColumn"></param>
        /// <param name="endLine"></param>
        /// <param name="endColumn"></param>
        /// <param name="foldType"></param>
        /// <param name="foldText"></param>
        public FoldMarker(IDocument document, int startLine, int startColumn, int endLine, int endColumn, FoldType foldType, string foldText)
            : this(document, startLine, startColumn, endLine, endColumn, foldType, foldText, false)
        {
        }

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        /// <param name="document"></param>
        /// <param name="startLine"></param>
        /// <param name="startColumn"></param>
        /// <param name="endLine"></param>
        /// <param name="endColumn"></param>
        /// <param name="foldType"></param>
        /// <param name="foldText"></param>
        /// <param name="isFolded"></param>
        public FoldMarker(IDocument document, int startLine, int startColumn, int endLine, int endColumn, FoldType foldType, string foldText, bool isFolded)
        {
            this.document = document;

            startLine = Math.Min(document.TotalNumberOfLines - 1, Math.Max(startLine, 0));
            ISegment startLineSegment = document.GetLineSegment(startLine);

            endLine = Math.Min(document.TotalNumberOfLines - 1, Math.Max(endLine, 0));
            ISegment endLineSegment = document.GetLineSegment(endLine);

            // Prevent the region from completely disappearing
            if (string.IsNullOrEmpty(foldText))
                foldText = "...";

            this.FoldType = foldType;
            this.foldText = foldText;
            this.offset = startLineSegment.Offset + Math.Min(startColumn, startLineSegment.Length);
            this.length = (endLineSegment.Offset + Math.Min(endColumn, endLineSegment.Length)) - this.offset;
            this.isFolded = isFolded;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="document"></param>
        /// <param name="fold"></param>
        /// <param name="endLine"></param>
        /// <param name="endColumn"></param>
        /// <param name="foldType"></param>
        public FoldMarker(IDocument document, FoldStart fold, int endLine, int endColumn, FoldType foldType)
            : this(document, fold.Line, fold.Column, endLine, endColumn, foldType, fold.FoldText)
        {
            bind = fold.Bind;
        }

        /// <summary>
        /// porovnání s jiným objektem
        /// </summary>
        /// <param name="o"></param>
        /// <returns></returns>
        public int CompareTo(object o)
        {
            if (!(o is FoldMarker))
                throw new ArgumentException();
            FoldMarker f = (FoldMarker)o;
            if (offset != f.offset)
                return offset.CompareTo(f.offset);

            return length.CompareTo(f.length);
        }

        static void GetPointForOffset(IDocument document, int offset, out int line, out int column)
        {
            if (offset > document.TextLength)
            {
                line = document.TotalNumberOfLines + 1;
                column = 1;
            }
            else if (offset < 0)
            {
                line = -1;
                column = -1;
            }
            else
            {
                line = document.GetLineNumberForOffset(offset);
                column = offset - document.GetLineSegment(line).Offset;
            }
        }

    }
}
