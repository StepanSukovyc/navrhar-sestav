// <file>
//     <copyright see="prj:///doc/copyright.txt"/>
//     <license see="prj:///doc/license.txt"/>
//     <owner name="Mike Krüger" email="mike@icsharpcode.net"/>
//     <version>$Revision$</version>
// </file>

using System;
using System.Diagnostics;
using System.Drawing;

namespace Gordic.TextEditor.Document
{
	/// <summary>
	/// Výchozí implementace rozhraní <see cref="Gordic.TextEditor.Document.ISelection"/>.
	/// </summary>
	public class DefaultSelection : ISelection
	{
		IDocument document;
		bool      isRectangularSelection;
		TextLocation     startPosition;
		TextLocation     endPosition;

        /// <summary>
        /// Pozice začátku výběru
        /// </summary>
        public TextLocation StartPosition
        {
            get { return startPosition; }
            set
            {
                DefaultDocument.ValidatePosition(document, value);
                startPosition = value;
            }
        }

        /// <summary>
        /// Pozice konce výběru
        /// </summary>
        public TextLocation EndPosition
        {
            get { return endPosition; }
            set
            {
                DefaultDocument.ValidatePosition(document, value);
                endPosition = value;
            }
        }

        /// <summary>
        /// Offset začátku
        /// </summary>
        public int Offset { get { return document.PositionToOffset(startPosition); } }

        /// <summary>
        /// Offset konce
        /// </summary>
        public int EndOffset { get { return document.PositionToOffset(endPosition); } }
		
		/// <summary>
		/// délka části
		/// </summary>
        public int Length { get { return EndOffset - Offset; } }

        /// <value>
        /// Vrací true, pokud je výběr prázdný
        /// </value>
        public bool IsEmpty { get { return startPosition == endPosition; } }
		
		/// <value>
        /// Vrací true, pokud je výběr obdélníkový
		/// </value>
		// TODO : Je zapotřebí?
        public bool IsRectangularSelection
        {
            get { return isRectangularSelection; }
            set { isRectangularSelection = value; }
        }
		
		/// <value>
        /// Text, který je vybrán tímto výběrem.
		/// </value>
        public string SelectedText
        {
            get
            {
                if (document != null)
                    return Length < 0 ? null : document.GetText(Offset, Length);
                return null;
            }
        }
		
		/// <summary>
		/// Vytvoření nové insatnce třídy <see cref="DefaultSelection"/>
		/// </summary>
        /// <param name="document">Aktuální dokument</param>
        /// <param name="startPosition">Pozice začátku výběru</param>
        /// <param name="endPosition">Poice konce výběru</param>
		public DefaultSelection(IDocument document, TextLocation startPosition, TextLocation endPosition)
		{
			DefaultDocument.ValidatePosition(document, startPosition);
			DefaultDocument.ValidatePosition(document, endPosition);
			Debug.Assert(startPosition <= endPosition);
			this.document      = document;
			this.startPosition = startPosition;
			this.endPosition   = endPosition;
		}

        /// <summary>
        /// Vytvoření nové insatnce třídy <see cref="DefaultSelection"/>
        /// </summary>
        /// <param name="document">Aktuální dokument</param>
        /// <param name="position">Pozice začátku a konce výběru</param>
        public DefaultSelection(IDocument document, TextLocation position)
            : this(document, position, position)
        {
        }

		/// <summary>
		/// Konverze <see cref="DefaultSelection"/> na řádek (vlastní potřeby - debugg)
		/// </summary>
		public override string ToString()
		{
			return String.Format("[DefaultSelection : StartPosition={0}, EndPosition={1}]", startPosition, endPosition);
		}

        /// <summary>
        /// Zjištění, zda výběr obsahuje pozici
        /// </summary>
        /// <param name="position">Pozice pro zjištění</param>
        /// <returns>TRUE - pokud výběr obsahuje danou pozici, jinak FALSE</returns>
        public bool ContainsPosition(TextLocation position)
        {
            if (this.IsEmpty)
                return false;
            return startPosition.Y < position.Y && position.Y < endPosition.Y ||
                startPosition.Y == position.Y && startPosition.X <= position.X && (startPosition.Y != endPosition.Y || position.X <= endPosition.X) ||
                endPosition.Y == position.Y && startPosition.Y != endPosition.Y && position.X <= endPosition.X;
        }
		
        /// <summary>
        /// Indikuje, zda výběr obsahuje offset
        /// </summary>
        /// <param name="offset">Offset pro kontrolu</param>
        /// <returns>TRUE - pokud výběr obsahuje daný offset, jinak FALSE</returns>
		public bool ContainsOffset(int offset)
		{
			return Offset <= offset && offset <= EndOffset;
		}
	}
}
