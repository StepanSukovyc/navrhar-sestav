// <file>
//     <copyright see="prj:///doc/copyright.txt"/>
//     <license see="prj:///doc/license.txt"/>
//     <owner name="Mike Krüger" email="mike@icsharpcode.net"/>
//     <version>$Revision$</version>
// </file>

using System;
using System.Collections.Generic;
using System.Drawing;
using System.Text;

namespace Gordic.TextEditor.Document
{
    /// <summary>
    /// správce skládací strategie
    /// </summary>
	public class FoldingManager
	{
		List<FoldMarker>    foldMarker      = new List<FoldMarker>();
		List<FoldMarker>    foldMarkerByEnd = new List<FoldMarker>();
		IFoldingStrategy    foldingStrategy = null;
		IDocument document;

        /// <summary>
        /// seznam značek složení
        /// </summary>
        public IList<FoldMarker> FoldMarker
        {
            get { return foldMarker.AsReadOnly(); }
        }
        /// <summary>
        /// aktuální skládací strategie
        /// </summary>
        public IFoldingStrategy FoldingStrategy
        {
            get { return foldingStrategy; }
            set { foldingStrategy = value; }
        }
		
        /// <summary>
        /// konstruktor nové třídy
        /// </summary>
        /// <param name="document">dokument, s kterým se pracuje</param>
		internal FoldingManager(IDocument document)
		{
			this.document = document;
			document.DocumentChanged += new DocumentEventHandler(DocumentChanged);
		}

        void DocumentChanged(object sender, DocumentEventArgs e)
        {
            if (NeedUpdate)
            {
                UpdateFoldings(null, null);
                NeedUpdate = false;
                return;
            }

            int oldCount = foldMarker.Count;
            document.UpdateSegmentListOnDocumentChange(foldMarker, e);
            if (oldCount != foldMarker.Count)
                document.RequestUpdate(new TextAreaUpdate(TextAreaUpdateType.WholeTextArea));
        }

        public bool NeedUpdate = false;

        /// <summary>
        /// získání skládacích značek dle pozice
        /// </summary>
        /// <param name="line">řádek pozice</param>
        /// <param name="column">sloupec pozice</param>
        /// <returns>Seznam značek</returns>
        public List<FoldMarker> GetFoldingsFromPosition(int line, int column)
        {
            List<FoldMarker> foldings = new List<FoldMarker>();
            if (foldMarker != null)
                for (int i = 0; i < foldMarker.Count; ++i)
                {
                    FoldMarker fm = foldMarker[i];
                    if ((fm.StartLine == line && column > fm.StartColumn && !(fm.EndLine == line && column >= fm.EndColumn)) ||
                        (fm.EndLine == line && column < fm.EndColumn && !(fm.StartLine == line && column <= fm.StartColumn)) ||
                        (line > fm.StartLine && line < fm.EndLine))
                        foldings.Add(fm);
                }
            return foldings;
        }
		
        /// <summary>
        /// pomocná třída porovnání začátků skládacích značek
        /// </summary>
		class StartComparer : IComparer<FoldMarker>
		{
            /// <summary>
            /// instance třídy
            /// </summary>
			public readonly static StartComparer Instance = new StartComparer();
			/// <summary>
			/// porovnání dvou značek
			/// </summary>
			/// <param name="x">první značka</param>
			/// <param name="y">druhá porovnávací značka</param>
			/// <returns>výsledek porovnání</returns>
			public int Compare(FoldMarker x, FoldMarker y)
			{
				if (x.StartLine < y.StartLine)
					return -1;
				else if (x.StartLine == y.StartLine)
					return x.StartColumn.CompareTo(y.StartColumn);
				else
					return 1;
			}
		}
		/// <summary>
		/// pomocná třída pro porovnání konců značek
		/// </summary>
		class EndComparer : IComparer<FoldMarker>
		{
            /// <summary>
            /// instance třídy
            /// </summary>
			public readonly static EndComparer Instance = new EndComparer();
			/// <summary>
            /// porovnání dvou značek
			/// </summary>
            /// <param name="x">první značka</param>
            /// <param name="y">druhá porovnávací značka</param>
            /// <returns>výsledek porovnání</returns>
            public int Compare(FoldMarker x, FoldMarker y)
			{
				if (x.EndLine < y.EndLine)
					return -1;
				else if (x.EndLine == y.EndLine)
					return x.EndColumn.CompareTo(y.EndColumn);
				else
					return 1;
			}
		}

        List<FoldMarker> GetFoldingsByStartAfterColumn(int lineNumber, int column, bool forceFolded)
        {
            List<FoldMarker> foldings = new List<FoldMarker>();

            if (foldMarker != null)
            {
                int index = foldMarker.BinarySearch(
                    new FoldMarker(document, lineNumber, column, lineNumber, column),
                    StartComparer.Instance);

                if (index < 0) index = ~index;

                for (; index < foldMarker.Count; index++)
                {
                    FoldMarker fm = foldMarker[index];
                    if (fm.StartLine > lineNumber)
                        break;
                    if (fm.StartColumn <= column)
                        continue;
                    if (!forceFolded || fm.IsFolded)
                        foldings.Add(fm);
                }
            }
            return foldings;
        }
		/// <summary>
		/// získání značek dle začátku řádku
		/// </summary>
		/// <param name="lineNumber">číslo řádku</param>
		/// <returns>seznam dostupných zanček začínajících na uvedeném řádku.</returns>
		public List<FoldMarker> GetFoldingsWithStart(int lineNumber)
		{
			return GetFoldingsByStartAfterColumn(lineNumber, -1, false);
		}
		/// <summary>
        /// získání značek dle začátku řádku
		/// </summary>
		/// <param name="lineNumber">řádek k hledání</param>
        /// <returns>Seznam zavřených značek začínajících na uvedeném řádku</returns>
		public List<FoldMarker> GetFoldedFoldingsWithStart(int lineNumber)
		{
			return GetFoldingsByStartAfterColumn(lineNumber, -1, true);
		}
		/// <summary>
        /// získání značek začínajících na uvedeném řádku a sloupci
		/// </summary>
		/// <param name="lineNumber">uvedený řádek ke hledání</param>
		/// <param name="column">sloupec ke hledání</param>
        /// <returns>Seznam značek začínajících na uvedeném řádku a sloupci</returns>
		public List<FoldMarker> GetFoldedFoldingsWithStartAfterColumn(int lineNumber, int column)
		{
			return GetFoldingsByStartAfterColumn(lineNumber, column, true);
		}

        List<FoldMarker> GetFoldingsByEndAfterColumn(int lineNumber, int column, bool forceFolded)
        {
            List<FoldMarker> foldings = new List<FoldMarker>();

            if (foldMarker != null)
            {
                int index = 
                    foldMarkerByEnd.BinarySearch(new FoldMarker(document, lineNumber, column, lineNumber, column), EndComparer.Instance);
                if (index < 0) index = ~index;

                for (; index < foldMarkerByEnd.Count; index++)
                {
                    FoldMarker fm = foldMarkerByEnd[index];
                    if (fm.EndLine > lineNumber)
                        break;
                    if (fm.EndColumn <= column)
                        continue;
                    if (!forceFolded || fm.IsFolded)
                        foldings.Add(fm);
                }
            }
            return foldings;
        }
		
		public List<FoldMarker> GetFoldingsWithEnd(int lineNumber)
		{
			return GetFoldingsByEndAfterColumn(lineNumber, -1, false);
		}
		
		public List<FoldMarker> GetFoldedFoldingsWithEnd(int lineNumber)
		{
			return GetFoldingsByEndAfterColumn(lineNumber, -1, true);
		}
		
		public bool IsFoldStart(int lineNumber)
		{
			return GetFoldingsWithStart(lineNumber).Count > 0;
		}
		
		public bool IsFoldEnd(int lineNumber)
		{
			return GetFoldingsWithEnd(lineNumber).Count > 0;
		}

        public List<FoldMarker> GetFoldingsContainsLineNumber(int lineNumber)
        {
            List<FoldMarker> foldings = new List<FoldMarker>();
            if (foldMarker != null)
                foreach (FoldMarker fm in foldMarker)
                    if (fm.StartLine < lineNumber && lineNumber < fm.EndLine)
                        foldings.Add(fm);
            return foldings;
        }
		
		public bool IsBetweenFolding(int lineNumber)
		{
			return GetFoldingsContainsLineNumber(lineNumber).Count > 0;
		}

        public bool IsLineVisible(int lineNumber)
        {
            foreach (FoldMarker fm in GetFoldingsContainsLineNumber(lineNumber))
                if (fm.IsFolded)
                    return false;
         
            return true;
        }

        public List<FoldMarker> GetTopLevelFoldedFoldings()
        {
            List<FoldMarker> foldings = new List<FoldMarker>();
            if (foldMarker != null)
            {
                Point end = new Point(0, 0);
                foreach (FoldMarker fm in foldMarker)
                    if (fm.IsFolded && (fm.StartLine > end.Y || fm.StartLine == end.Y && fm.StartColumn >= end.X))
                    {
                        foldings.Add(fm);
                        end = new Point(fm.EndColumn, fm.EndLine);
                    }
            }
            return foldings;
        }
		
		public void UpdateFoldings(string fileName, object parseInfo)
		{
			UpdateFoldings(foldingStrategy.GenerateFoldMarkers(document, fileName, parseInfo));
		}

        /// <summary>
        /// reakce na ukončení aktualizace skládání
        /// </summary>
        public event EventHandler FoldingsUpdated;
        /// <summary>
        /// Aktualizace skládání
        /// </summary>
        /// <param name="newFoldings">seznam objektů skládání</param>
        public void UpdateFoldings(List<FoldMarker> newFoldings)
        {
            int oldFoldingsCount = foldMarker.Count;
            lock (this)
            {
                if (newFoldings != null && newFoldings.Count != 0)
                {
                    newFoldings.Sort();
                    if (foldMarker.Count == newFoldings.Count)
                        for (int i = 0; i < foldMarker.Count; ++i)
                        {
                            newFoldings[i].IsFolded = foldMarker[i].IsFolded;
                            document.RequestUpdate(
                                new TextAreaUpdate(
                                    TextAreaUpdateType.LinesBetween
                                    , Math.Min(newFoldings[i].StartLine, foldMarker[i].StartLine)
                                    , Math.Max(newFoldings[i].EndLine, foldMarker[i].EndLine)
                            ));
                        }
                    else
                        for (int i = 0, j = 0; i < foldMarker.Count && j < newFoldings.Count; )
                        {
                            int n = newFoldings[j].CompareTo(foldMarker[i]);
                            if (n > 0)
                                ++i;
                            else
                            {
                                if (n == 0)
                                    newFoldings[j].IsFolded = foldMarker[i].IsFolded;
                                ++j;
                            }
                        }
                }
                if (newFoldings != null)
                {
                    foldMarker = newFoldings;
                    foldMarkerByEnd = new List<FoldMarker>(newFoldings);
                    foldMarkerByEnd.Sort(EndComparer.Instance);
                }
                else
                {
                    foldMarker.Clear();
                    foldMarkerByEnd.Clear();
                }
            }

            if (oldFoldingsCount != foldMarker.Count)
            {
                document.RequestUpdate(new TextAreaUpdate(TextAreaUpdateType.WholeTextArea));
                if (FoldingsUpdated != null)
                    FoldingsUpdated(this, EventArgs.Empty);
            }
            document.CommitUpdate();
        }

        public string SerializeToString()
        {
            StringBuilder sb = new StringBuilder();
            foreach (FoldMarker marker in this.foldMarker)
            {
                sb.Append(marker.Offset); sb.Append("\n");
                sb.Append(marker.Length); sb.Append("\n");
                sb.Append(marker.FoldText); sb.Append("\n");
                sb.Append(marker.IsFolded); sb.Append("\n");
            }
            return sb.ToString();
        }

        public void DeserializeFromString(string str)
        {
            try
            {
                string[] lines = str.Split('\n');
                for (int i = 0; i < lines.Length && lines[i].Length > 0; i += 4)
                {
                    int offset = Int32.Parse(lines[i]);
                    int length = Int32.Parse(lines[i + 1]);
                    string text = lines[i + 2];
                    bool isFolded = Boolean.Parse(lines[i + 3]);
                    bool found = false;
                    foreach (FoldMarker marker in foldMarker)
                        if (marker.Offset == offset && marker.Length == length)
                        {
                            marker.IsFolded = isFolded;
                            found = true;
                            break;
                        }
                    if (!found)
                        foldMarker.Add(new FoldMarker(document, offset, length, text, isFolded));
                }
                if (lines.Length > 0)
                    NotifyFoldingsChanged(EventArgs.Empty);
            }
            catch (Exception) { }
        }

        public void NotifyFoldingsChanged(EventArgs e)
        {
            if (FoldingsChanged != null)
                FoldingsChanged(this, e);
        }
		/// <summary>
		/// reakce na změnu skládání
		/// </summary>
		public event EventHandler FoldingsChanged;
	}
}
